require(["jquery", "jqm-and-i18next-config", "jquery.mobile"]);

require(["domReady", "app", "module/dev/delivery"],
	function(domReady, App, DeliveryModule){
		domReady(function(){
			console.log("boot complete.");
			new App();
		});
});