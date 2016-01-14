require(["jquery", "jqm-and-i18next-config", "jquery.mobile",
			"app", "module/dev/delivery"],
	function($, jqmAndi18nextConfig, $mobile, App, DeliveryModule){
		console.log("boot complete.");
		$(document).on("mobileinit", function(){
			new App();
		});
});