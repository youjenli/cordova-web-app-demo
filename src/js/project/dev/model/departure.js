/**
 * Departure model
 */
define(['jquery', 'jquery.mobile', 'backbone'], function($, $mobile, Backbone){
	
	var DepartureModel = Backbone.Model.extend({
		defaults:{
			areaCode:undefined,
			carNum:undefined,
			deliveryAssignment:undefined
		},
		initialize:function(){
			var self = this;
			
			self.on("change:carNum", function(){
				var carNum = self.get("carNum");
				var deliveryAssignment = ( carNum != undefined ? parseInt(carNum) + 10 : 0 );
				self.set("deliveryAssignment", deliveryAssignment);
			});
			console.log("Departure model has been initialized.");
		},
		confirmDeparture:function(){
			this.trigger("departure.confirmed");
		},
		loginOnly:function(){
			this.trigger("departure.loginOnly");
		}
	});
	
	return DepartureModel;
});