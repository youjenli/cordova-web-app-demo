/**
 * Delivery failure View
 */
define(['jquery', 'jquery.mobile', 'backbone', './generalDelivery'],
		function($, $mobile, Backbone, GeneralDeliveryView){
	
	var DeliveryFailureView = GeneralDeliveryView.extend({
		el:"#deliveryFailure"
	});
	
	return DeliveryFailureView;
});