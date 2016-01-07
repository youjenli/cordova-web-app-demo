/**
 *  common/view
 *  
 *  Backbone.View 可以協助我們組織與頁面操作有關的邏輯以利後續維護
 *  主要包含 DOM 操作, 事件綁定與後送 Model 前的處理
 *  
 *  開發人員在 el 指定不同畫面 DOM 的根節點元素, 或是元素 id 與 class 
 *  然後在 events 裡面指定 el 元素子節點要綁定的各種事件
 *  Backbone 會透過 jQuery.on("event", function) 這個方法實現綁定
 *  但要注意 events 裡面選擇的元素必須是 el 的子孫節點, 
 *  否則執行時會找不到對應元素而綁定失敗
 *  
 *  initialize 方法是這個 View 的初始化程式碼撰寫的區域, 
 *  當其他人呼叫 new View() 的時候即會執行 initialize 函式,  
 *  有點類似 java 產生實例前執行的建構式
 *  
 *  更下面的其他方法由開發人員視需求自訂, 產生 View 的實例以後可以從外部直接呼叫,
 *  相當於 java 類別非靜態的 public 方法
 */
define(['jquery', 'jquery.mobile', 'backbone'], 
		function($, $mobile, Backbone){

	var GlobalWidgets = Backbone.View.extend({
		el:document,
		events:{
		},
		initialize:function(){
			this.$el.find("#globalPopup").popup().enhanceWithin();
		},
		showPopup:function(msg){
			var id = "#globalPopup";
			this.$el.find(id + " .popupContent").text(msg);
			this.$el.find(id).popup('open');
		},
		closePopup:function(){
			this.$el.find("#globalPopup").popup('close');
		}
	});
	
	var deferred = $.Deferred();
	deferred.resolveWith(GlobalWidgets, [GlobalWidgets]);
	
	return deferred.promise();
});