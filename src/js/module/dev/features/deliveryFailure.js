/**
 * Delivery failure procedure (Model)
 */
define(['jquery', 'jquery.mobile', 'backbone'
        ,'model/dev/deliveryAssignmentList', 'module/dev/features/generalDeliveryProcedure'], 
		function($, $mobile, Backbone, DeliveryAssignmentList, GeneralDeliveryProcedure){
	
	var deliveryAssignmentList = new DeliveryAssignmentList();
	var DeliveryFailureProcedure = GeneralDeliveryProcedure.extend({
		confirmInputSlipNo:function(){
			var slipNoList = this.getSlipNoList();
			console.log(slipNoList);//FIXME
			this.trigger("writeLog", [slipNoList]);
		}
	});
	
	return new DeliveryFailureProcedure({
		deliveryAssignmentList:deliveryAssignmentList
	});
	
});