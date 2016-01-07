/**
 * Ordinary Delivery Procedure (Model)
 */
define(['jquery', 'jquery.mobile', 'backbone'
        , 'model/dev/deliveryAssignmentList', 'module/dev/features/generalDeliveryProcedure'], 
		function($, $mobile, Backbone, DeliveryAssignmentList, GeneralDeliveryProcedure){
	
	var deliveryAssignmentList = new DeliveryAssignmentList();
	var OrdinaryDeliveryProcedure = GeneralDeliveryProcedure.extend({
		confirmInputSlipNo:function(){
			this.trigger("writeLog", this);
		}
	});
	
	return new OrdinaryDeliveryProcedure({
		deliveryAssignmentList:deliveryAssignmentList
	});
	
});