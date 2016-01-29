/**
 * 
 */
define(['backbone', 'model/dev/deliveryAssignment'], 
		function(Backbone, DeliveryAssignment){
	
	var DeliveryAssignmentList = Backbone.Collection.extend({
		model:DeliveryAssignment
	});
	
	return DeliveryAssignmentList;
});