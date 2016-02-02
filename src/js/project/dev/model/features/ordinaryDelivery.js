/**
 * Ordinary Delivery Procedure (Model)
 */
define(['jquery', 'jquery.mobile', 'backbone', './generalDelivery'], 
		function($, $mobile, Backbone, GeneralDeliveryModel){
	
	var OrdinaryDeliveryModel = GeneralDeliveryModel.extend({
		confirmInputSlipNo:function(){
			this.trigger("writeLog", this);
		}
	});	
	return OrdinaryDeliveryModel;
	
});