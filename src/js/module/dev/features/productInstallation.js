/**
 * Product installation Procedure (model)
 */
define(['jquery', 'jquery.mobile', 'backbone'
        ,'model/dev/deliveryAssignmentList', 'module/dev/features/generalDeliveryProcedure'], 
		function($, $mobile, Backbone, DeliveryAssignmentList, GeneralDeliveryProcedure){
	
	var deliveryAssignmentList = new DeliveryAssignmentList();
	var ProductInstallationProcedure = GeneralDeliveryProcedure.extend({
		confirmInputSlipNo:function(){
			this.trigger("writeLog", this);
		}
	});
	
	return new ProductInstallationProcedure({
		deliveryAssignmentList:deliveryAssignmentList
	});
	
});