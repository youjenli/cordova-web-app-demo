require(["jquery", "jqm-and-i18next-config", "jquery.mobile"]);

require(["domReady", "backbone", "system/app"],
	function(domReady, Backbone, App){
		domReady(function(){
			console.log("boot complete.");
			new App();
			Backbone.history.start();
		});
});