/**
 * Product installation view
 */
define(['jquery', 'jquery.mobile', 'backbone', 
        'view/dev/features/generalDeliveryView', 'module/dev/features/productInstallation'], 
		function($, $mobile, Backbone, GeneralDeliveryView, productInstallationProcedure){
	
	var deferred = $.Deferred();
	$(":mobile-pagecontainer").pagecontainer("load", "template/dev/productIntallation.html", {role:"page"})
		.done(function(){
			
			var ProductInstallationView = GeneralDeliveryView.extend({
				el:"#productInstallation"
			});
			
			var productInstallationView = new ProductInstallationView({
				model:productInstallationProcedure
			});
			
			deferred.resolveWith(productInstallationView, [productInstallationView]);
		})
		.fail(function(){
			//TODO exception handling
			deferred.reject();
		});
	
	return deferred.promise();
});