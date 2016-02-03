/**
	為了讓應用程式和 nodejs 上的建置工具都能載入這分 requirejs 設定檔, 以下使用特殊的做法撰寫能在 nodejs 或瀏覽器上載入的程式
	詳情可參考 https://github.com/umdjs/umd/blob/master/templates/returnExports.js
*/
(
function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // 發現環境已是 requirejs, 就呼叫 requirejs.config
        requirejs.config(factory());
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(this, function(){
	// 用來建立模組的匿名函式
    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
	return {
		"baseUrl":"js",
		"paths":{
			"jquery":"../lib/jquery/jquery",
			"jquery.mobile":"../lib/jquery-mobile-for-synnex/jquery.mobile",
			"jquery.i18next":"../lib/jquery-i18next-plugin-for-synnex/i18next.amd.withJQuery-1.8.0",
			"underscore":"../lib/underscore/underscore",
			"backbone":"../lib/backbone/backbone",
			"domReady":"../lib/domReady/domReady"
		}
	};
})
);