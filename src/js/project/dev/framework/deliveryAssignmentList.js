/**
 * 
 */
define(['backbone', './deliveryAssignment'], 
		function(Backbone, DeliveryAssignment){
	
	var DeliveryAssignmentList = Backbone.Collection.extend({
		model:DeliveryAssignment
	});
	
	return DeliveryAssignmentList;
});