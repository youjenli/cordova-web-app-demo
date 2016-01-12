/**
* 初始化橫跨整個應用程式生命週期的路由器
*/
require(['utility/globalRouter', 'jquery.mobile', 
		'view/login', 'module/login',
		'view/globalWidgets','view/mainMenu'], 
	function(router, $mobile, loginView, loginModule, globalWidgets, mainMenuView){
	
	loginView.render();
	
	loginModule.on("login.success", function(){
		mainMenuView.render();
	});
	
	router.on("module.quit", function(){
		mainMenuView.render();
	});
		
	loginModule.on("logout", function(){
		loginView.render();
	});
	
});
