/**
 * Delivery log view
 */
define(['jquery', 'jquery.mobile', 'backbone', 'view/dev/features/generalDeliveryView'], 
		function($, $mobile, Backbone, GeneralDeliveryView){
	
	var DeliveryLogView = GeneralDeliveryView.extend({
		el:"#deliveryLog"
	});
	
	return DeliveryLogView;
});