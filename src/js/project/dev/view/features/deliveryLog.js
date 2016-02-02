/**
 * Delivery log view
 */
define(['jquery', 'jquery.mobile', 'backbone', './generalDelivery'], 
		function($, $mobile, Backbone, GeneralDeliveryView){
	
	var DeliveryLogView = GeneralDeliveryView.extend({
		el:"#deliveryLog"
	});
	
	return DeliveryLogView;
});