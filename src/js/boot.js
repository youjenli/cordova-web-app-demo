require(["jquery", "jqm-and-i18next-config", "jquery.mobile",
		"domReady", "backbone", "system/app", "project/dev/delivery"],
	function($, i18nOptions, $mobile,
			domReady, Backbone, App, DeliveryModule){
		domReady(function(){
			
			var app = new App();
			var delivery = new DeliveryModule();
			Backbone.history.start();
			
			app.on("activateSoftwarePackage", function(packageName){
				switch(packageName){
					case "delivery":
						delivery.start();
						break;
					default:
						console.log("The module " + packageName + " can not be recognized.");
						app.start();
						break;
				}
			});
			delivery.on("quit", function(){
				app.backToMainMenu();
			});
			
			app.start();
			console.log("boot complete.");			
		});
});