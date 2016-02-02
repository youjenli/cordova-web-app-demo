/**
 * Product installation Procedure (model)
 */
define(['jquery', 'jquery.mobile', 'backbone', 'module/dev/features/generalDeliveryProcedure'], 
		function($, $mobile, Backbone, GeneralDeliveryModel){
	
	var ProductInstallationModel = GeneralDeliveryModel.extend({
		confirmInputSlipNo:function(){
			this.trigger("writeLog", this);
		}
	});
	
	return ProductInstallationModel;
});