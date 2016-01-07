/**
 * General Delivery Procedure
 */
define(['jquery', 'jquery.mobile', 'backbone'], 
		function($, $mobile, Backbone){
	
	var GeneralDeliveryProcedure = Backbone.Model.extend({
		attributes:{
			deliveryAssignmentList:undefined
		},
		initialize:function(){
			var self = this;
			var assignmentList = self.get("deliveryAssignmentList");
			/**
			 * Backbone collection 觸發事件後回傳的參數物件是 Backbone 的 Model 物件
			 * 但若 stringify 這個物件只會得到像 {"slipNo":"abc"} 這種的物件, 可見 Backbone 有額外處理過 Model 的 toJSON 方法
			*/
			self.listenTo(assignmentList, "add", function(assignmentAddedToList){
				self.trigger("add", assignmentAddedToList);
			});
			self.listenTo(assignmentList, "remove", function(assignmentRemovedInList){
				self.trigger("remove", assignmentRemovedInList);
			});
		},
		addSlipNo:function(params){
			if(params != null){
				var list = this.get("deliveryAssignmentList");
				if(params.contructor === Array){
					for(var i = 0 ; i < params.length ; i ++){
						var slipNo = params[i];
						params[i] = {
							slipNo:slipNo
						};
					}
					list.add(params);
				}else if (typeof params == 'string' || params instanceof String){
					list.add({ slipNo:params });
				}
			}
			return this;
		},
		removeSlipNo:function(slipNo){
			var list = this.get("deliveryAssignmentList");
			var model = list.findWhere({
				slipNo:slipNo
			});
			if(model != undefined){
				list.remove(model);
			}
			return this;
		},
		getSlipNoList:function(){
			return this.get("deliveryAssignmentList").models;
		},
		setSlipNoList:function(slipNoList){
			if(slipNoList != null){
				this.get("deliveryAssignmentList").set(slipNoList);
			}
			return this;
		},
		cleanSlipNoList:function(){
			this.get("deliveryAssignmentList").reset([]);
			return this;
		}
	});
	
	return GeneralDeliveryProcedure;
});