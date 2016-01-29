/**
* 初始化橫跨整個應用程式生命週期的路由器
*/
define(['system/view/login', 'system/model/login',
		'system/view/globalWidgets','system/view/mainMenu'],
	function(LoginView, LoginModule,
			GlobalWidgets, MainMenuView){
	
	var pathToModuleMappings = {};
	
	var App = Backbone.Router.extend({
		initialize:function(){
			var self = this;
			
			var loginModule = new LoginModule();
			var loginView = new LoginView({model:loginModule});
			pathToModuleMappings["system/view/login"] = loginView;
			
			var mainMenuView = new MainMenuView();
			pathToModuleMappings["system/view/mainMenu"]= mainMenuView;
			
			new GlobalWidgets();
			
			loginModule.on("login.success", function(){
				mainMenuView.render();
			});

			loginModule.on("logout", function(){
				loginView.render();
			});
			
			self.navigate("system/view/login", {trigger:true});
						
			console.log("Synnex app has been initialized.");
		},
		routes : {
			"system/view/:page":"_direct"
		},
		_direct:function(page){
			var routingPath = "system/view/" + page;
			console.log("Routing path : " + routingPath);//FIXME remove this line later
			var view = pathToModuleMappings[routingPath];
			if (view) {
				view.render();
				//TODO 要加入檢查換頁是否成功的機制
			} else {
				console.log("Routing path : " + routingPath + " does not exists.");
				//TODO exception handling
			}
		}
	});
	
	return App;
});