/**
 * Departure model
 */
define(['jquery', 'jquery.mobile', 'backbone', 'module/dev/procedure/carInfo'], function($, $mobile, Backbone, carInfoProcedure){
	
	var DepartureProcedure = Backbone.Model.extend({
		attributes:{
			areaCode:undefined,
			deliveryAssignment:undefined,
			carNum:undefined
		},
		initialize:function(){
			this._updateCarInfo();
			this.getDeliveryAssignment();
			
			this.listenTo(carInfoProcedure, "change:carNum", function(){
				this._updateCarInfo();
				this.getDeliveryAssignment();
			});
			console.log("Departure model has been initialized.");
		},
		_updateCarInfo:function(){
			var carNum = carInfoProcedure.get("carNum");
			var areaCode = carInfoProcedure.get("areaCode");
			this.set({ carNum:carNum, areaCode:areaCode });
		},
		getDeliveryAssignment:function(){
			var carNum = this.get("carNum");
			var deliveryAssignment = ( carNum != undefined ? parseInt(carNum) + 10 : 0 );
			this.set("deliveryAssignment", deliveryAssignment);
			
			return deliveryAssignment;
		},
		confirmDeparture:function(){
			this.trigger("departure.confirmed");
		},
		loginOnly:function(){
			this.trigger("departure.loginOnly");
		}
	});
	
	return new DepartureProcedure();
});