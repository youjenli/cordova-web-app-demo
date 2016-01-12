/**
 * 
 */
define(['jquery', 'jquery.mobile', 'backbone', 'utility/globalRouter',
        "view/dev/carInfo", 'module/dev/procedure/carInfo',
        'view/dev/departure', 'module/dev/procedure/departure',
        'view/dev/deliveryMenu', 'view/dev/deliveryPanel'], function(
        		$, $mobile, Backbone, globalRouter,
        		carInfoView, carInfoProcedure, 
       		 	departureView, departureProcedure, 
       		 	deliveryMenuView, deliveryPanelView){
        
	var DeliveryModule = Backbone.Model.extend({
		initialize:function(){
			/**
			 * 初始化 Router
			 * */
			globalRouter.route("view/dev/*path", "delivery", function(path){
				console.log("Route to path : view/dev/" + path);
				require(["view/dev/" + path], function(view){
					view.render();
					//TODO 檢查換頁是否成功的機制
				});
			});
		},//配送模組初始化結束
		execute:function(){
			/**
			 * 開始執行配送模組的流程
			 * */
			var self = this;
			/**
			 * 進入配送模組時, 1. 確認車次登入頁面已初始化, 然後 2. 顯示車次登入畫面, 
			 * 等待使用者操作 (輸入車次與物流地點或離開)
			 */
			//1. 跳轉至車次登入畫面
			globalRouter.navigate("view/dev/carInfo", {trigger:true});
				
			/**
			 * 若使用者在車次登入頁面按下離開, 就會離開配送模組
			*/
			self.listenTo(carInfoView, "quit", function(){
				self.trigger("quit");
			});
				
			/**
			 *	若使用者確認輸入車次與物流地點, 系統會顯示出車相關資訊, 然後等待使用者的後續操作 (確認出車或僅登入)
			 */
			self.listenTo(carInfoProcedure, "confirmed", function(){
				//顯示出車相關資訊
				globalRouter.navigate("view/dev/departure", {trigger:true});
			});
				
			/**
			 * 當使用者出車確認或僅登入時, 系統會顯示配送功能選單畫面, 等待使用者後續操作
			 */
			self.listenTo(departureProcedure, "departure.confirmed departure.loginOnly", function(){
				console.log("departure confirmed or login.");
				
				//跳轉至配送功能主選單, 等待使用者操作
				globalRouter.navigate("view/dev/deliveryMenu", {trigger:true});
				
				/**
				 * 當使用者在正常配達, 安裝到達, 配送異常按下處理記錄功能時, 
				 * 系統會 1. 轉移資料至處理紀錄功能 2. 切換至處理紀錄頁面 
				 */
				require(['module/dev/features/ordinaryDelivery', 'module/dev/features/productInstallation'
				         ,'module/dev/features/deliveryFailure', 'module/dev/features/deliveryLog'],
				         function(ordinaryDeliveryModule, productionInstallationModule, 
				        		 deliveryFailureModule, deliveryLogModule){
					var handler = function(module){
						if(module != null ){
							//1. 轉移資料至處理紀錄功能
							deliveryLogModule.setSlipNoList(module.getSlipNoList());
							module.cleanSlipNoList();
							//2. 切換至處理紀錄頁面
							globalRouter.navigate("view/dev/features/deliveryLog", {trigger:true});
						}
					};
					deliveryLogModule.listenTo(ordinaryDeliveryModule, "writeLog", handler);
					deliveryLogModule.listenTo(productionInstallationModule, "writeLog", handler);
					deliveryLogModule.listenTo(deliveryFailureModule, "writeLog", handler);
				});
				
				/**
				 *	當使用者在配送主功能表按下離開, 就會觸發配送模組的離開事件
				 */
				self.listenTo(deliveryMenuView, "quit", function(){
					self.trigger("quit");
				});
			});
			
		}
	});
	
	return new DeliveryModule();
});