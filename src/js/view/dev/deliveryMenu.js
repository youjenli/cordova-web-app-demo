/**
 * 
 */
define(['jquery', 'jquery.mobile', 'backbone', 'module/dev/procedure/deliveryMenu'], 
		function($, $mobile, Backbone, deliveryMenuProcedure){
	
	var deferred = $.Deferred();
	
	$(":mobile-pagecontainer").pagecontainer("load", "template/dev/deliveryMenu.html", {role:"page"})
		.done(function(){
			var DeliveryMenuView = Backbone.View.extend({
				el:"#deliveryMenu",
				events:{
					"click .quit":"_quit"
				},
				initialize:function(){
				},
				_quit:function(){
					this.trigger("quit", this);
				},
				render:function(){
					var id = "#" + this.$el.attr("id");
					$(":mobile-pagecontainer").pagecontainer("change", id, {role:"page"});
				}
			});
			var deliveryMenuView = new DeliveryMenuView({
				model:deliveryMenuProcedure
			});
			
			deferred.resolveWith(deliveryMenuView, [deliveryMenuView]);
		})
		.fail(function(){
			//TODO exception handling 
			deferred.reject();
		});
	
	return deferred.promise();
	
});