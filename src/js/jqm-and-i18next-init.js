/**
 * 這個 javascript 檔案的用途是在整個應用程式於 wlCommonInit 正式初始化之前
 * 預先設定並載入 jQuery Mobile, 以避免 worklight 框架過晚初始化 jQuery Mobile,
 * 導致使用者在 dom 結構載入完成至 jqm 呈現第一個分頁之前, 短暫看到一個沒有任何樣式的網頁 
 */

require(['jquery', 'jquery.i18next'], function($, i18next){

	var i18nOpts = {
		lng:navigator.language,
		preload:['zh-TW', 'dev', 'en'],
		fallbackLng:'dev'
	};
	/**
	 * i18next 套件的初始設定
	 * lng : 語系-國碼  呼叫 i18next.lng() 可以取得語言設定, 呼叫 setLng('en-US') 可以設定語言
	 * preload : 預載入的語系, 這設定的值是陣列, 例如 : {preload:['de-DE', 'fr']} 
	 * fallbackLng : 無法根據設定找到語言時的預設語系, 例如 {fallbackLng:'en'}, 
	 * 預設語系設定是 dev, 也就是開發用的語系
	 * 
	 */
	//初始化 i18next 套件, 雖然它本身能獨立運作, 
	//但這個應用程式使用的官方版本能夠自己向 requirejs 註冊為 'jquery' 的外掛套件
	i18next.init(i18nOpts, function(t){
		console.log("i18next has been initialized with locale " + i18next.lng() + ".");
	});
	
	$(document).on('mobileinit', function() {
		
		console.log("Configure jQuery mobile after jqm trigger mobileinit event.");	
		/**
		 * Prevents all anchor click handling including the addition of
		 * active button state and alternate link bluring.
		 */
		$.mobile.linkBindingEnabled = false;
		// Disabling this will prevent jQuery Mobile from handling hash
		// changes
		$.mobile.hashListeningEnabled = false;
		
		/**
		 * jqm 預設在離開從外部載入的 jqm 分頁時, 會從 dom 結構抹除這些分頁
		 * 因此若未在第一次載入時想辦法讓 jqm 能再度找到這個分頁, 
		 * 那麼第二次切換至外部載入的 jqm 分頁時, 就會無法正常顯示
		 * 
		 * 開啟 jqm 的 dom 快取才能讓 jqm 在切換到先前曾經載入過的分頁時, 能夠找到文件內容
		 */
		$.mobile.page.prototype.options.domCache = true;
		
		/**
		 * 這裡統一設定所有的頁面在強化前要使用 i18next 外掛抽換分頁上的文字語言
		 * 目前已知在 mobileinit 的階段沒有 :mobile-pagecontainer 選擇器可以使用,
		 * 而且這時候綁定 pagecontainerload 好像也沒有任何效果,
		 * 最後發現使用 jquery 事件代理監聽所有分頁強化之前觸發的 pagebeforecreate 事件
		 * 才能在分頁第一次顯示前注入語系內容
		 */
		$(document).on("pagebeforecreate", ":jqmData(role='page')", function(evt){
			var page = $(evt.target).i18n();
			console.log("Translate words in page " + page.attr("id") + " to locale " + i18next.lng());
		});
		
	});
	
	require(['jquery.mobile'], function($mobile){
		console.log("jQuery mobile has been loaded.");
	});
});