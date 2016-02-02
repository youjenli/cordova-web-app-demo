/**
 * General Delivery View 配送分頁共用功能
 */
define(['jquery', 'jquery.mobile', 'backbone'], function($, $mobile, Backbone){
	
	var GeneralDeliveryView = Backbone.View.extend({
		events:{
			"keydown .deliveryAssignmentNo":"_keyBoardInputSlipNo",
			"click .deliveryAssignmentReportList a:jqmData(icon=delete)":"_clickToRemoveSlipNoInListView"
		},
		initialize:function(){
			this.listenTo(this.model, "add", this._addSlipNoToListView);
			this.listenTo(this.model, "remove", this._removeSlipNoInListView);
			var self = this;
			/**
			 * 離開功能分頁時, 清掉頁面上的單號資料, 下次進入頁面會在 render 方法重新生成
			 * 這樣設計 view 的目地是要簡化 view <-> model <-> view 之間的設計,
			 * 讓那種橫跨多分頁的商業流程只需要設定不同功能模組 model 之間的互動關係,
			 * 而不需要有額外物件扮演不同 model 和不同 view 之間的資訊交流橋樑
			 */
			$(":mobile-pagecontainer").on("pagecontainerbeforehide", function(evt, ui){
				var prevPageId = ui.prevPage.attr("id");
				var thisPageId = self.$el.attr("id");
				if( prevPageId === thisPageId ){
					self._cleanAllSlipNoInListView();
				}
			});
		},
		_keyBoardInputSlipNo:function(evt){
			var target = evt.target;
			if (target.nodeType == 3){// defeat Safari bug NOT SURE
	    		target = target.parentNode;
	    	}
			
			var slipNo;
			if (evt.keyCode == 13) {
				var field = $(target);
        		slipNo = field.val();
        		if( slipNo != "" ){
        			field.val("");
    				this.model.addSlipNo(slipNo);
        		}
            }
		},
		_clickToRemoveSlipNoInListView:function(evt){
			var target = evt.target;
			if (target.nodeType == 3){// defeat Safari bug
	    		target = target.parentNode;
	    	}
			
			var slipNo = $(target).parent().jqmData("value");
			this.model.removeSlipNo(slipNo);
		},
		_addSlipNoToListView:function(params, refresh){
			if( arguments.length == 0 || arguments[0] == null){
				return this;
			}
			var refreshAfterModify = true;
			if( arguments.length >= 2 ){
				refreshAfterModify = refresh;
			}
			
			var self = this;
			var reportList = this.$el.find(".deliveryAssignmentReportList");
			if(params.constructor === Array){
				if(params.length == 0){
					return this;
				}
				$.each(params, function(idx, obj){
					if(obj != null){
						reportList.append(
							self._createListItem(obj.get("slipNo"))
						);
					}
				});
			}else{//NOT FINISH type handling
				reportList.append(
					self._createListItem(params.get("slipNo"))	
				);
			}
//			navigator.notification.beep(1);
//			navigator.notification.vibrate(500);
			if(refreshAfterModify){
				try {
					this.$el.find(".deliveryAssignmentReportList")
						.listview().listview("refresh");
				} catch (ex) { console.log(ex.message);}
			}
		},
		_createListItem:function(slipNo){
			var liObj = $("<li>").attr("data-value",slipNo);
			var aObj1 = $("<a>").html(slipNo);
			var aObj2 = $("<a>").attr("data-icon","delete");
			return liObj.append(aObj1).append(aObj2);
		},
		_removeSlipNoInListView:function(params, refresh){
			if(params == null || arguments.length == 0){
				return this;
			}
			var refreshAfterModify = true;
			if(arguments.length >= 2){
				refreshAfterModify = refresh;
			}
			var slipNo = params.get("slipNo");
			var list = this.$el.find(".deliveryAssignmentReportList");
			list.find("li:jqmData(value='" + slipNo + "')").remove();
			
			if(refreshAfterModify){
				try {
					list.listview().listview("refresh");
				} catch (ex) { console.log(ex.message); }
			}
		},
		_cleanAllSlipNoInListView:function($targetPage){
			this.model.cleanSlipNoList();
			var list = null;
			if($targetPage == null){
				list = this.$el.find(".deliveryAssignmentReportList");
			}else{
				list = $targetPage.find(".deliveryAssignmentReportList");
			}
			var listItems = list.find("li:gt(0)");
			if(listItems.length > 0){
				listItems.remove();
				list.listview("refresh");
				console.log("clean all slipNo in list view");//FIXME
			}
		},
		render:function(){
			var slipNoList = this.model.getSlipNoList();
			this._addSlipNoToListView(slipNoList, true);

			var id = "#" + this.$el.attr("id");
			console.log("render page id : " + id);//TODO
			$(":mobile-pagecontainer").pagecontainer("change", id, {role:"page"});
		}
	});
	
	return GeneralDeliveryView;
	
});