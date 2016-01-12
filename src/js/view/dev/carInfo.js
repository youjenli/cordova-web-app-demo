/**
 * CarInfo View
 */
define(['jquery', 'jquery.mobile', 'backbone', 'module/dev/procedure/carInfo'], function($, $mobile, Backbone, carInfoProcedure){
	
	var CarInfoView = Backbone.View.extend({
		el:"#carinfo",
		events:{
			"click #carinfo_btn_confirm":"_confirmCarInfo",
			"click #carinfo_btn_exit":"_quit"
		},
		initialize:function(){
			console.log("CarInfo view has been initialized.");
		},
		_confirmCarInfo:function(){
			var areaCode = this.$el.find("#areacode_list").val();
			var carNum = this.$el.find("#carNum").val();
			this.model.confirmCarInfo(areaCode, carNum);
		},
		_quit:function(){
			this.trigger("quit", this);
		},
		render:function(params){
			var id = "#" + this.$el.attr("id");
			$(":mobile-pagecontainer").pagecontainer("change", id, {role:"page"});
		}
	});
	
	return new CarInfoView({
		model:carInfoProcedure
	});
});