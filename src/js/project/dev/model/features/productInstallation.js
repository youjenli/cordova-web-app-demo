/**
 * Product installation model
 */
define(['jquery', 'jquery.mobile', 'backbone', './generalDelivery'], 
		function($, $mobile, Backbone, GeneralDeliveryModel){
	
	var ProductInstallationModel = GeneralDeliveryModel.extend({
		confirmInputSlipNo:function(){
			this.trigger("writeLog", this);
		}
	});
	
	return ProductInstallationModel;
});