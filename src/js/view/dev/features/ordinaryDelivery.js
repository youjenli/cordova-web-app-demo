/**
 * Ordinary Delivery View
 */
define(['jquery', 'jquery.mobile', 'backbone', 
        'view/dev/features/generalDeliveryView', 'module/dev/features/ordinaryDelivery'], 
		function($, $mobile, Backbone, GeneralDeliveryView, ordinaryDeliveryProcedure){
	
	var deferred = $.Deferred();
	$(":mobile-pagecontainer").pagecontainer("load", "template/dev/ordinaryDelivery.html", {role:"page"})
		.done(function(){
			
			var OrdinaryDeliveryView = GeneralDeliveryView.extend({
				el:"#ordinaryDelivery",
				events:$.extend({
					"click .writeLogBtn":"confirmOrdinaryDeliveryAssignment"
				}, GeneralDeliveryView.prototype.events),
				confirmOrdinaryDeliveryAssignment:function(){
					this.model.confirmInputSlipNo();
				}
			});
			
			var ordinaryDeliveryView = new OrdinaryDeliveryView({
				model:ordinaryDeliveryProcedure
			});
			
			deferred.resolveWith(ordinaryDeliveryView, [ordinaryDeliveryView]);
		})
		.fail(function(){
			//TODO exception handling
			deferred.reject();
		});
	
	return deferred.promise();
});