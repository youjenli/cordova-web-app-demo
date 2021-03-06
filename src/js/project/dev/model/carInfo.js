/**
 * CarInfo Model
 */
define(['jquery', 'jquery.mobile', 'backbone'], function($, $mobile, Backbone){
	
	var CarInfoModel = Backbone.Model.extend({
		defaults:{
			areaCode:undefined,
			carNum:undefined
		},
		intialize:function(){
		},
		confirmCarInfo:function(areaCode, carNum){
			this.set({
				areaCode:areaCode,
				carNum:carNum
			});
			this.trigger("confirmed", this);
		}
	});
	
	return CarInfoModel;
});