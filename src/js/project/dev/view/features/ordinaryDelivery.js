/**
 * Ordinary Delivery View
 */
define(['jquery', 'jquery.mobile', 'backbone', 'view/dev/features/generalDeliveryView'], 
		function($, $mobile, Backbone, GeneralDeliveryView){
	
	var OrdinaryDeliveryView = GeneralDeliveryView.extend({
		el:"#ordinaryDelivery",
		events:$.extend({
			"click .writeLogBtn":"confirmOrdinaryDeliveryAssignment"
		}, GeneralDeliveryView.prototype.events),
		confirmOrdinaryDeliveryAssignment:function(){
			this.model.confirmInputSlipNo();
		}
	});
	
	return OrdinaryDeliveryView;
});