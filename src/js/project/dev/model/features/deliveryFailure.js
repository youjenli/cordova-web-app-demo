/**
 * Delivery failure procedure (Model)
 */
define(['jquery', 'jquery.mobile', 'backbone', './generalDelivery'], 
		function($, $mobile, Backbone, GeneralDeliveryModel){
	
	var DeliveryFailureModel = GeneralDeliveryModel.extend({
		confirmInputSlipNo:function(){
			var slipNoList = this.getSlipNoList();
			console.log(slipNoList);//FIXME
			this.trigger("writeLog", [slipNoList]);
		}
	});
	return DeliveryFailureModel;
	
});