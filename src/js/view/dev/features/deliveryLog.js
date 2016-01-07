/**
 * Delivery log view
 */
define(['jquery', 'jquery.mobile', 'backbone', 
        'view/dev/features/generalDeliveryView', 'module/dev/features/deliveryLog'], 
		function($, $mobile, Backbone, GeneralDeliveryView, deliveryLogProcedure ){
	
	var deferred = $.Deferred();
	$(":mobile-pagecontainer").pagecontainer("load", "template/dev/deliveryLog.html", {role:"page"})
		.done(function(){
			
			var DeliveryLogView = GeneralDeliveryView.extend({
				el:"#deliveryLog"
			});
			
			var deliveryLogView = new DeliveryLogView({
				model:deliveryLogProcedure,
//				render:function(){
//					GeneralDeliveryView.prototype.render.call(this);
//				}
			});
			
			deferred.resolveWith(deliveryLogView, [deliveryLogView]);
		})
		.fail(function(){
			//TODO exception handling
			deferred.reject();
		});
	
	return deferred.promise();
});