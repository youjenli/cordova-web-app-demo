/**
 * Delivery failure View
 */
define(['jquery', 'jquery.mobile', 'backbone', 'view/dev/features/generalDeliveryView'],
		function($, $mobile, Backbone, GeneralDeliveryView){
	
	var DeliveryFailureView = GeneralDeliveryView.extend({
		el:"#deliveryFailure"
	});
	
	return DeliveryFailureView;
});