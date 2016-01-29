/**
* 初始化橫跨整個應用程式生命週期的路由器
*/
define(['./view/login', './model/login',
		'./view/globalWidgets','./view/mainMenu',
		'project/dev/delivery'],
	function(LoginView, LoginModule,
			GlobalWidgets, MainMenuView,
			DeliveryRouter){
	
	var App = Backbone.Router.extend({
		initialize:function(){
			var self = this;
			
			var loginModule = new LoginModule();
			var loginView = new LoginView({model:loginModule});
			var loginViewRoutingPath = "system/view/login";
			self.route(loginViewRoutingPath, "login", function(){
				console.log("Route to login view.");
				loginView.render();
			});
			
			new GlobalWidgets();
			
			var mainMenuView = new MainMenuView();
			var mainMenuRoutingPath = "system/view/mainMenu";
			self.route(mainMenuRoutingPath, "mainMenu", function(){
				console.log("Route to system main menu.");
				mainMenuView.render();
			});
			
			loginModule.on("login.success", function(){
				mainMenuView.render();
			});
			loginModule.on("logout", function(){
				loginView.render();
			});
			
			self.navigate(loginViewRoutingPath, {trigger:true});
			
			var deliveryRouter = new DeliveryRouter();
			deliveryRouter.on("quit", function(){
				self.navigate(mainMenuRoutingPath, {trigger:true});
			});
			
			console.log("Synnex app has been initialized.");
		}
	});
	
	return App;
});