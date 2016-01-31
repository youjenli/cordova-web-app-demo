/**
 * 
 */
 
define(['backbone', './config', './framework/deliveryAssignmentList',
		'./view/carInfo', './model/carInfo',
		'./view/departure', './model/departure',
		'./view/deliveryMenu',
		'./view/deliveryPanel',
		'./view/features/ordinaryDelivery', './model/features/ordinaryDelivery',
		'./view/features/productInstallation', './model/features/productInstallation',
		'./view/features/deliveryFailure', './model/features/deliveryFailure',
		'./view/features/deliveryLog', './model/features/deliveryLog',
		'./view/features/searchAndInquiry'], function(
        		Backbone, config, DeliveryAssignmentList,
        		CarInfoView, CarInfoModel,
       		 	DepartureView, DepartureModel,
				DeliveryMenuView, 
				DeliveryPanelView,
				OrdinaryDeliveryView, OrdinaryDeliveryFeature,
				ProductInstallationView, ProductInstallationFeature,
				DeliveryFailureView, DeliveryFailureFeature,
				DeliveryLogView, DeliveryLogFeature,
				SearchAndInquiryView){
	
	var pathToViewMappings = {};
	
	var DeliveryRouter = Backbone.Router.extend({
		initialize:function(){
			self.on("moduleInit", function(){
				var carInfoModel = new CarInfoModel();
				var carInfoView = new CarInfoView({model:carInfoModel});
				pathToViewMappings[config.carInfo.route.name] = carInfoView;
				
				var departureModel = new DepartureModel();			
				var departureView = new DepartureView({model:departureModel});
				pathToViewMappings[config.departure.route.name] = departureView;
				
				var deliveryMenuView = new DeliveryMenuView();
				var deliveryPanelView = new DeliveryPanelView();
				config.menu.route.target = deliveryMenuView;
				
				[config.carInfo.route, 
				config.departure.route,
				config.menu.route
				].forEach(function(target, idx){
					if(pathToViewMappings[target.name] != null){
						self.route(target.path, target.name, function(){
							console.log("Route to " + target.path + " .");
							pathToViewMappings[target.name].render();
						});
					}else{
						//TODO error handling
					}				
				});
				
				/**
				*	若使用者確認輸入車次與物流地點, 系統會顯示出車相關資訊, 然後等待使用者的後續操作 (確認出車或僅登入)
				*/
				carInfoModel.on("confirmed", function(){
					//顯示出車相關資訊
					self.navigate(config.departure.route.path, {trigger:true});
				});
	
				/**
				* 若使用者在車次登入頁面按下離開, 就會離開配送模組
				*/
				carInfoView.on("quit", function(){
					self.trigger("quit");
				});
				
				/**
				* 當使用者出車確認或僅登入時, 系統會顯示配送功能選單畫面, 等待使用者後續操作
				*/
				departureModel.on("departure.confirmed departure.loginOnly", function(){
					console.log("departure confirmed or login.");
					//跳轉至配送功能主選單, 等待使用者操作
					self.navigate(config.menu.route.path, {trigger:true});
				});
				
				/**
				*	當使用者在配送功能選單按下離開時, 會觸發這個 Router 的 quit 事件讓應用程式回到主功能頁面
				*/
				deliveryMenuView.on("quit", function(){
					self.trigger("quit");
				});
				
				/*
				*	當配送模組第一次登入或查看時, 初始化管理配送功能選單
				*/
				departureModel.once("departure.confirmed departure.loginOnly", function(){
					var ordinaryDeliveryFeature = new OrdinaryDeliveryFeature({
							deliveryAssignmentList:new DeliveryAssignmentList()
						});
					var ordinaryDeliveryView = new OrdinaryDeliveryView({model:ordinaryDeliveryFeature});
					config.ordinaryDelivery.route.target = ordinaryDeliveryView;
					
					var	productInstallationFeature = new ProductInstallationFeature({
							deliveryAssignmentList:new DeliveryAssignmentList()
						});
					var productInstallationView = new ProductInstallationView({model:productInstallationFeature});
					config.productionInstallation.route.target = productInstallationView;
					
					var deliveryFailureFeature = new DeliveryFailureFeature({
							deliveryAssignmentList:new DeliveryAssignmentList()
						});
					var deliveryFailureView = new DeliveryFailureView({model:deliveryFailureFeature});
					config.deliveryFailure.route.target = deliveryFailureView;
					
					var deliveryLogFeature = new DeliveryLogFeature({
							deliveryAssignmentList:new DeliveryAssignmentList()
						});
					var deliveryLogView = new DeliveryLogView({model:deliveryLogFeature});
					config.deliveryLog.route.target = deliveryLogView;
					
					[config.ordinaryDelivery.route, 
					config.productionInstallation.route,
					config.deliveryFailure.route,
					config.deliveryLog.route
					].forEach(function(target, idx){
						self.route(target.path, target.name, function(){
							console.log("Route to " + target.path + " .");
							target.view.render();
						});
					});
					
					/**
					* 當使用者在正常配達, 安裝到達, 配送異常按下處理記錄功能時, 
					* 系統會 1. 轉移資料至處理紀錄功能 2. 切換至處理紀錄頁面 
					*/
					var handler = function(module){
						if(module != null ){
							//1. 轉移資料至處理紀錄功能
							deliveryLogFeature.setSlipNoList(module.getSlipNoList());
							module.cleanSlipNoList();
							//2. 切換至處理紀錄頁面
							self.navigate(config.deliveryLog.route.path, {trigger:true});
						}
					};
					deliveryLogFeature.listenTo(ordinaryDeliveryFeature, "writeLog", handler);
					deliveryLogFeature.listenTo(productionInstallationFeature, "writeLog", handler);
					deliveryLogFeature.listenTo(deliveryFailureFeature, "writeLog", handler);
				});
				//配送模組初始化結束
			});		
		},
		start:function(){
			var self = this;
			/**
			 * 進入配送模組時跳轉至車次登入畫面, 然後等待使用者操作 (輸入車次與物流地點或離開)
			 */
			self.trigger("moduleInit");
			self.navigate(config.carInfo.route.path, {trigger:true});
		}
	});

	return DeliveryRouter;
});