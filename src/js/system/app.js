/**
* 初始化橫跨整個應用程式生命週期的路由器
*/
define(['./config', './view/login', './model/login',
		'./view/globalWidgets','./view/mainMenu'],
	function(config, LoginView, LoginModule,
			GlobalWidgets, MainMenuView){
	
	var App = Backbone.Router.extend({
		initialize:function(){
			var self = this;
		
			var loginModule = new LoginModule();
			var loginView = new LoginView({model:loginModule});
			config.loginForm.route.view = loginView;
			
			new GlobalWidgets();
				
			var mainMenuView = new MainMenuView();
			config.mainMenu.route.view = mainMenuView;
					
			loginModule.on("login.success", function(){
				mainMenuView.render();
			});
			loginModule.on("logout", function(){
				loginView.render();
			});
			
			[config.loginForm.route, config.mainMenu.route].forEach(function(target, idx){
				self.route(target.path, target.name, function(){
					console.log("Route to " + target.path + " .");
					target.view.render();
				});		
			});
			
			self.navigate(config.loginForm.route.path, {trigger:true});
			
			console.log("Synnex app has been initialized.");
		}
	});
	
	return App;
});