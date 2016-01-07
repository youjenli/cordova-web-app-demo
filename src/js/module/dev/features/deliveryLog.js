/**
 * Delivery Log Procedure (Model)
 */
define(['jquery', 'jquery.mobile', 'backbone'
        ,'model/dev/deliveryAssignmentList', 'module/dev/features/generalDeliveryProcedure'], 
		function($, $mobile, Backbone, DeliveryAssignmentList, GeneralDeliveryProcedure){
	
	var deliveryAssignmentList = new DeliveryAssignmentList();
	var DeliveryLogProcedure = GeneralDeliveryProcedure.extend({
	});
	
	return new DeliveryLogProcedure({
		deliveryAssignmentList:deliveryAssignmentList
	});
	
});