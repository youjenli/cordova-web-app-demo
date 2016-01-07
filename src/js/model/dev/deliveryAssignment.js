/**
 * 
 */
define(['backbone'], function(Backbone){
	
	var DeliveryAssignment = Backbone.Model.extend({
		attributes:{
			slipNo:undefined,
			isNew:true
		}
	});
	
	return DeliveryAssignment;
});