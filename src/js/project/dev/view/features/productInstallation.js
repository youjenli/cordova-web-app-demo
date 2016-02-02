/**
 * Product installation view
 */
define(['jquery', 'jquery.mobile', 'backbone', './generalDelivery'], 
		function($, $mobile, Backbone, GeneralDeliveryView){
	
	var ProductInstallationView = GeneralDeliveryView.extend({
		el:"#productInstallation"
	});
	
	return ProductInstallationView;
});