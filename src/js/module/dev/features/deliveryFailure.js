/**
 * Delivery failure procedure (Model)
 */
define(['jquery', 'jquery.mobile', 'backbone', 'module/dev/features/generalDeliveryProcedure'], 
		function($, $mobile, Backbone, GeneralDeliveryProcedure){
	
	var DeliveryFailureProcedure = GeneralDeliveryProcedure.extend({
		confirmInputSlipNo:function(){
			var slipNoList = this.getSlipNoList();
			console.log(slipNoList);//FIXME
			this.trigger("writeLog", [slipNoList]);
		}
	});
	return DeliveryFailureProcedure;
	
});