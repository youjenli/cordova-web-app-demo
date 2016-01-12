/**
 * Delivery failure View
 */
define(['jquery', 'jquery.mobile', 'backbone'
        ,'view/dev/features/generalDeliveryView', 'module/dev/features/deliveryFailure'], 
		function($, $mobile, Backbone, GeneralDeliveryView, deliveryFailureProcedure){
	
	var DeliveryFailureView = GeneralDeliveryView.extend({
		el:"#deliveryFailure"
	});
	
	return new DeliveryFailureView({
		model:deliveryFailureProcedure
	});
});