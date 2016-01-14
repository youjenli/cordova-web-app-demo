/**
 * Product installation view
 */
define(['jquery', 'jquery.mobile', 'backbone', 'view/dev/features/generalDeliveryView'], 
		function($, $mobile, Backbone, GeneralDeliveryView){
	
	var ProductInstallationView = GeneralDeliveryView.extend({
		el:"#productInstallation"
	});
	
	return ProductInstallationView;
});