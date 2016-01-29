/**
 * Ordinary Delivery Procedure (Model)
 */
define(['jquery', 'jquery.mobile', 'backbone', 'module/dev/features/generalDeliveryProcedure'], 
		function($, $mobile, Backbone, GeneralDeliveryProcedure){
	
	var OrdinaryDeliveryProcedure = GeneralDeliveryProcedure.extend({
		confirmInputSlipNo:function(){
			this.trigger("writeLog", this);
		}
	});	
	return OrdinaryDeliveryProcedure;
	
});