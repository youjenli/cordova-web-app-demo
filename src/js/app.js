/**
* 初始化橫跨整個應用程式生命週期的路由器
*/
define(['jquery', 'view/login', 'module/login', 
		'view/globalWidgets','view/mainMenu'],
	function(LoginView, LoginModule,
			GlobalWidgets, MainMenuView){
	
	var App = Backbone.Router.extend({
		initialize:function(){
			var self = this;
			Backbone.history.start();
			
			var loginModule = new LoginModule();
			var loginView = new LoginView({model:loginModule});
			var mainMenuView = new MainMenuView();
			new GlobalWidgets();
			
			self.set({
				loginView:loginView,
				mainMenuView:mainMenuView
			});
			
			self.set("pathToModuleMappings", {
				"module/dev/delivery":DeliveryModule
			});
			
			loginModule.on("login.success", function(){
				mainMenuView.render();
			});
		
			loginModule.on("logout", function(){
				loginView.render();
			});
			
			self.navigate("view/login", {trigger:true});
						
			console.log("Synnex app has been initialized.");
		},
		routes : {
			"view/:page":"_direct",
			"module/*path":"_executeModule"			
		},
		_direct:function(page){
			var routingPath = "view/" + page;
			console.log("Routing path : " + routingPath);//FIXME remove this line later
			var view = this.get(page + "View");
			if (view) {
				view.render();
				//TODO 要加入檢查換頁是否成功的機制
			} else {
				console.log("Routing path : " + routingPath + " could not be found in router of delivery.");
				//TODO exception handling
			}
		},
		_executeModule:function(path){
			var self = this;
			var routingPath = "module/" + path;
			console.log("Routing path : " + routingPath);//FIXME remove this line later
			require([routingPath], function(Module){
				var module = new Module();
				self.listenToOnce(module, "quit", function(){
					self.navigate("view/mainMenu", {trigger:true});
				});
			});			
		}
	});
	
	return App;
});