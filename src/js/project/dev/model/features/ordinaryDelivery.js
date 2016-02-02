/**
 * Ordinary Delivery Procedure (Model)
 */
define(['jquery', 'jquery.mobile', 'backbone', 'module/dev/features/generalDeliveryProcedure'], 
		function($, $mobile, Backbone, GeneralDeliveryProcedure){
	
	var OrdinaryDeliveryModel = GeneralDeliveryProcedure.extend({
		confirmInputSlipNo:function(){
			this.trigger("writeLog", this);
		}
	});	
	return OrdinaryDeliveryModel;
	
});