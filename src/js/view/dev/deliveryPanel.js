/**
 * delivery panel view
 * 
 * 這個類別負責設定側邊選單的視圖, 注意的是它使用 jQuery 的 get 方法載入樣板至 dom 結構中,
 * 而不是用 jquery mobile pagecontainer("load", url, {role:"panel"}); 或是 jQuery 的 load(url, callback) 載入
 * 原因是前者載入的選單會在外面覆蓋上一層標記用的 div 導致後來 panel 初始化成功但仍無法使用
 * 而 jquery load 方法則會開啟一個全新的 dom 結構樹, 先前載入的樣板會完全消失,
 * 最後試出來只能使用 $.get 方法或是 $.ajax 載入選單樣板, 再自行插入 dom ,最後初始化 jqm panel 
 */
define(['jquery', 'jquery.mobile', 'backbone'], function($, $mobile, Backbone){
		
	var PanelView = Backbone.View.extend({
		el:"#deliveryPanel",
		events:{
			"click .openDeliveryPanel":"render",
			"click [data-rel='close']":"closePanel",
		},
		initialize:function(){
			var self = this;
			self.$el.panel().enhanceWithin();
			/*
				未初始化的"跨頁"側邊面板會在畫面上留下痕跡, 因此要是應用程式有跨頁的側邊面板不在應用程式開啟時就初始化, 
				那就要在側邊面板加上樣式 display:none, 然後在初始化跨頁側邊面板的程式碼中移除 display:none 樣式
			*/
			self.$el.css("display", "");
			$(document).on("click", ".openDeliveryPanel", function(){
				self.render();
			});
			console.log("delivery panel has been initialized.");
		},
		render:function(){
			this.$el.panel("toggle");
		},
		closePanel:function(){
			this.$el.panel("close");
		}
	});
	
	return new PanelView();
	
});