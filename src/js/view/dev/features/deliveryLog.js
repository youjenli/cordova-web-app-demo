/**
 * Delivery log view
 */
define(['jquery', 'jquery.mobile', 'backbone', 
        'view/dev/features/generalDeliveryView', 'module/dev/features/deliveryLog'], 
		function($, $mobile, Backbone, GeneralDeliveryView, deliveryLogProcedure ){
	
	var DeliveryLogView = GeneralDeliveryView.extend({
		el:"#deliveryLog"
	});
	
	return new DeliveryLogView({
		model:deliveryLogProcedure,
//		render:function(){
//			GeneralDeliveryView.prototype.render.call(this);
//		}
	});
});