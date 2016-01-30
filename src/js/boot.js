require(["jquery", "jqm-and-i18next-config", "jquery.mobile"]);

require(["domReady", "backbone", "system/app", "project/dev/delivery"],
	function(domReady, Backbone, App, DeliveryModule){
		domReady(function(){
			console.log("boot complete.");
			var app = new App();
			var delivery = new DeliveryModule();
			Backbone.history.start();
			delivery.on("quit", function(){
				app.navigate("system/mainMenu");
			});
		});
});