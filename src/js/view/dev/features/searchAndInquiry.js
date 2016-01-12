/**
 * Search and query view
 * 
 * jquery mobile 的 tab 元件在 backbone router 使用以後, 會無法照官方的設定正常切換,
 * 因此需要手動寫程式讓使用者按下不同的分頁標籤時, 能切換頁面裡的內容
 * 以下切換的方法是大致的雛型, 實際上進出分頁時的按鈕顯示都還未完成, 
 * 正式版要另外強化或使用 jquery ui tab 的方法
 */
define(['jquery', 'jquery.mobile', 'backbone'], 
		function($, $mobile, Backbone){
		
	var SearchAndQueryView = Backbone.View.extend({
		el:"#searchAndQuery",
		events:{
			"click a:jqmData(rel='tab')":"_switchTab",
		},
		activeTab:undefined,
		initialize:function(){
			var self = this;
			this.$el.on("pagebeforeshow", function(){
				self.activeTab = self.$el.find(":jqmData(role='tab'):eq(0)").toggle(true);
				self.$el.find(":jqmData(role='tab'):gt(0)").toggle(false);
				self.$el.find(":jqmData(role='navbar') :jqmData(rel='tab') :eq(0)").addClass("ui-btn-active");
			});
		},
		_switchTab:function(evt){
			var target = evt.target;
			var href = $(target).attr("href");
			if( this.activeTab.is(target) == false ){
				this.activeTab.hide();
				this.activeTab = this.$el.find(href).show();
			}
		},
		render:function(){
			var id = "#" + this.$el.attr("id");
			$(":mobile-pagecontainer").pagecontainer("change", id, {role:"page"});
		}
	});
	
	return new SearchAndQueryView({
//		model:ordinaryDeliveryProcedure
	});
});