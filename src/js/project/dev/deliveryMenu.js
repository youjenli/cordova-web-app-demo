/**
 * Delivery menu model
 */
define(['backbone', 'model/dev/deliveryAssignmentList',
		'view/dev/features/ordinaryDelivery', 'module/dev/features/ordinaryDelivery',
		'view/dev/features/productInstallation', 'module/dev/features/productInstallation',
		'view/dev/features/deliveryFailure', 'module/dev/features/deliveryFailure', 
		'view/dev/features/deliveryLog', 'module/dev/features/deliveryLog',
		'view/dev/features/searchAndInquiry'], 
		function(Backbone, DeliveryAssignmentList,
				OrdinaryDeliveryView, OrdinaryDeliveryFeature,
				ProductInstallationView, ProductInstallationFeature,
				DeliveryFailureView, DeliveryFailureFeature,
				DeliveryLogView, DeliveryLogFeature,
				SearchAndInquiryView){
	
	var DeliveryMenuRouter = Backbone.Router.extend({
		initialize:function(){
			var self = this;
			var ordinaryDeliveryFeature = new OrdinaryDeliveryFeature({
					deliveryAssignmentList:new DeliveryAssignmentList()
				}),
				productInstallationFeature = new ProductInstallationFeature({
					deliveryAssignmentList:new DeliveryAssignmentList()
				}),
				deliveryFailureFeature = new DeliveryFailureFeature({
					deliveryAssignmentList:new DeliveryAssignmentList()
				}),
				deliveryLogFeature = new DeliveryLogFeature({
					deliveryAssignmentList:new DeliveryAssignmentList()
				}),
				ordinaryDeliveryView = new OrdinaryDeliveryView({
					model:ordinaryDeliveryFeature
				}),
				productInstallationView = new ProductInstallationView({
					model:productInstallationFeature
				}),
				deliveryFailureView = new DeliveryFailureView({
					model:deliveryFailureFeature
				}),
				deliveryLogView = new DeliveryLogView({
					model:deliveryLogFeature
				})
				;
			
			/** TODO
			 * 當使用者在正常配達, 安裝到達, 配送異常按下處理記錄功能時, 
			 * 系統會 1. 轉移資料至處理紀錄功能 2. 切換至處理紀錄頁面 
			*/
			var handler = function(module){
				if(module != null ){
					//1. 轉移資料至處理紀錄功能
					deliveryLog.setSlipNoList(module.getSlipNoList());
					module.cleanSlipNoList();
					//2. 切換至處理紀錄頁面 TODO
					var router = self.get("routerOfDelivery");
					router.navigate("view/dev/features/deliveryLog", {trigger:true});
				}
			};
			deliveryLog.listenTo(ordinaryDelivery, "writeLog", handler);
			deliveryLog.listenTo(productionInstallation, "writeLog", handler);
			deliveryLog.listenTo(deliveryFailure, "writeLog", handler);
			
			this.set({
				ordinaryDeliveryView:ordinaryDeliveryView,
				productInstallationView:productInstallationView,
				deliveryFailureView:deliveryFailureView,
				deliveryLogView:deliveryLogView
			});
		},
		routes:{
			"view/dev/features/:func":"_direct"
		},
		_direct:function(func){
			console.log("Routing path : view/dev/features/" + func);
			var self = this;
			var view = selt.get(func + "View");
			if (view) {
				view.render();
				//TODO 要加入檢查換頁是否成功的機制
			} else {
				console.log("Routing path : view/dev/features/" + func + " could not be found in router of delivery.");
				//TODO exception handling
			}
		}
	});
	
	return DeliveryMenuRouter;
});