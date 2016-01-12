/**
 * Product installation view
 */
define(['jquery', 'jquery.mobile', 'backbone', 
        'view/dev/features/generalDeliveryView', 'module/dev/features/productInstallation'], 
		function($, $mobile, Backbone, GeneralDeliveryView, productInstallationProcedure){
	
	var ProductInstallationView = GeneralDeliveryView.extend({
		el:"#productInstallation"
	});
	
	return new ProductInstallationView({
		model:productInstallationProcedure
	});
});