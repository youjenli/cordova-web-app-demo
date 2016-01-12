/**
 * Ordinary Delivery View
 */
define(['jquery', 'jquery.mobile', 'backbone', 
        'view/dev/features/generalDeliveryView', 'module/dev/features/ordinaryDelivery'], 
		function($, $mobile, Backbone, GeneralDeliveryView, ordinaryDeliveryProcedure){
	
	var OrdinaryDeliveryView = GeneralDeliveryView.extend({
		el:"#ordinaryDelivery",
		events:$.extend({
			"click .writeLogBtn":"confirmOrdinaryDeliveryAssignment"
		}, GeneralDeliveryView.prototype.events),
		confirmOrdinaryDeliveryAssignment:function(){
			this.model.confirmInputSlipNo();
		}
	});
	
	return new OrdinaryDeliveryView({
		model:ordinaryDeliveryProcedure
	});
});