/**
 * Delivery failure View
 */
define(['jquery', 'jquery.mobile', 'backbone'
        ,'view/dev/features/generalDeliveryView', 'module/dev/features/deliveryFailure'], 
		function($, $mobile, Backbone, GeneralDeliveryView, deliveryFailureProcedure){
	
	var deferred = $.Deferred();
	$(":mobile-pagecontainer").pagecontainer("load", "template/dev/deliveryFailure.html", {role:"page"})
		.done(function(){
			
			var DeliveryFailureView = GeneralDeliveryView.extend({
				el:"#deliveryFailure"
			});
			
			var deliveryFailureView = new DeliveryFailureView({
				model:deliveryFailureProcedure
			});
			
			deferred.resolveWith(deliveryFailureView, [deliveryFailureView]);
		})
		.fail(function(){
			//TODO exception handling
			deferred.reject();
		});
	
	return deferred.promise();
});