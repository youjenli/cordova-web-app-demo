/**
 * Product installation Procedure (model)
 */
define(['jquery', 'jquery.mobile', 'backbone', 'module/dev/features/generalDeliveryProcedure'], 
		function($, $mobile, Backbone, GeneralDeliveryProcedure){
	
	var ProductInstallationProcedure = GeneralDeliveryProcedure.extend({
		confirmInputSlipNo:function(){
			this.trigger("writeLog", this);
		}
	});
	
	return ProductInstallationProcedure;
});