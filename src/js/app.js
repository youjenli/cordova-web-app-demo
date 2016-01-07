/**
 * 
 */
define(['jquery', 'backbone'], function($, Backbone){
	
	var App = Backbone.Model.extend({
		attributes:{
			globalWidgets:undefined,
			globalRouter:undefined,
			mainMenuView:undefined
		},
		initialize:function(){
			var self = this;
			
			/**
			 * 初始化橫跨整個應用程式生命週期的路由器
			 */
			require(['utility/globalRouter'], function(router){
				self.set("globalRouter", router);
				self.listenTo(router, "module.quit", function(){
					self.backToMainMenu();
				});
			});

			require(['jquery.mobile'], function($mobile) {
				/**
				 * 確定 jquery mobile 載入完成後, 設定應用程式與使用者一系列的互動流程
				 */
				
				require(['view/globalWidgets'],function(loadGlobalWidgets){
					loadGlobalWidgets.done(function(GlobalWidgets){
						var globalWidgets = new GlobalWidgets();
						self.set("globalWidgets", globalWidgets);
					});
				});
				
				require(['view/login', 'module/login', 'view/mainMenu'], function(loadLoginView, loginModule, loadMainMenu){
					
					loadLoginView.done(function(LoginView){
						var loginView = new LoginView({model:loginModule});
						loginView.render();
						
						self.listenTo(loginModule, "login.success", function(){
							loadMainMenu.done(function(MainMenuView){
								var mainMenuView = new MainMenuView();
								self.set("mainMenuView", mainMenuView);
								mainMenuView.render();
							});
						});
						self.listenTo(loginModule, "logout", function(){
							loginView.render();
						});
						
					}).fail(function(){
						//TODO exception handling
					});
					
				});
			});
		},
		backToMainMenu:function(){
			var mainMenuView = this.get("mainMenuView"); 
			mainMenuView.render();
		}
	});
	
	return new App();
});