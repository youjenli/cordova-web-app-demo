/**
 * 
 */
define(['jquery', 'jquery.mobile', 'backbone'], 
		function($, $mobile, Backbone){
	
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

	return DeliveryMenuView;
	
});