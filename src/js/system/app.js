/**
* 初始化橫跨整個應用程式生命週期的路由器
*/
define(['./view/login', './model/login',
		'./view/globalWidgets','./view/mainMenu'],
	function(LoginView, LoginModule,
			GlobalWidgets, MainMenuView){
	
	var App = Backbone.Router.extend({
		initialize:function(){
			var self = this;
			
			var loginModule = new LoginModule();
			var loginView = new LoginView({model:loginModule});
			self.route("system/view/login", "login", function(){
				console.log("Route to login view.");
				loginView.render();
			});
			
			var mainMenuView = new MainMenuView();
			self.route("system/view/mainMenu", "mainMenu", function(){
				console.log("Route to system main menu.");
				mainMenuView.render();
			});
			
			new GlobalWidgets();
			
			loginModule.on("login.success", function(){
				mainMenuView.render();
			});
			loginModule.on("logout", function(){
				loginView.render();
			});
			
			self.navigate("system/view/login", {trigger:true});
			console.log("Synnex app has been initialized.");
		}
	});
	
	return App;
});