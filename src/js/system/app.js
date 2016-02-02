/**
* 初始化橫跨整個應用程式生命週期的路由器
*/
define(['./config', './view/login', './model/login',
		'./view/globalWidgets','./view/mainMenu'],
	function(config, LoginView, LoginModule,
			GlobalWidgets, MainMenuView){
	
	var pathToViewMappings = {};
	
	var App = Backbone.Router.extend({
		initialize:function(){
			var self = this;
			self.once("moduleInit", function(){
	
				var loginModule = new LoginModule();
				var loginView = new LoginView({model:loginModule});
				pathToViewMappings[config.loginForm.route.name] = loginView;
				
				new GlobalWidgets();
					
				var mainMenuView = new MainMenuView();
				pathToViewMappings[config.mainMenu.route.name] = mainMenuView;
						
				loginModule.on("login.success", function(){
					mainMenuView.render();
				});
				loginModule.on("logout", function(){
					loginView.render();
				});
				
				[config.loginForm.route, config.mainMenu.route].forEach(function(target, idx){
					if(pathToViewMappings[target.name]){
						self.route(target.path, target.name, function(){
							console.log("Route to " + target.path + " .");
							pathToViewMappings[target.name].render();
						});
					}else{
						//TODO error handling
					}
				});
				self.route(config.activateSoftwarePackage.route.path,
							config.activateSoftwarePackage.route.name, function(packageName){
								console.log("Trigger activateSoftwarePackage event : " + packageName);//TODO remove later
								self.trigger("activateSoftwarePackage", packageName);
							});
				console.log("System module has been initialized.");
			});
		},
		start:function(){
			var self = this;
			self.trigger("moduleInit");
			self.navigate(config.init.route.path, {trigger:true});
		},
		backToMainMenu:function(){
			var self = this;
			self.navigate(config.mainMenu.route.path, {trigger:true});
		}
	});
	
	return App;
});