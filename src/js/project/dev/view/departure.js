/**
 * departure view
 */
define(['jquery', 'jquery.mobile','backbone'], function($, $mobile, Backbone){
			
	var DepartureView = Backbone.View.extend({
		el:"#departure",
		events:{
			"click #departure_btn_confirm":"_confirmDeparture",
			"click #login_only":"_loginOnly",
		},
		initialize:function(){
			console.log("Departure view has been initialized.");
		},
		render:function(params){
			if(params == undefined){
				params = {};
			}
			var carNum = this.model.get("carNum") || params.areaCode;
			var deliveryAssignment = this.model.get("deliveryAssignment") || params.deliveryAssignment;
			
			this.$el.find(".carNum").text(carNum);
			this.$el.find(".deliveryAssignment").text(deliveryAssignment);
			
			var id = "#" + this.$el.attr("id");
			$(":mobile-pagecontainer").pagecontainer("change", id, {role:"dialog"});
		},
		_confirmDeparture:function(){
			this.model.confirmDeparture();
		},
		_loginOnly:function(){
			this.model.loginOnly();
		}
	});
	return DepartureView;
	
});