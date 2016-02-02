/**
	為了讓建置應用程式的指令稿能載入這分設定檔, 以下使用特殊的做法撰寫能在 nodejs 或瀏覽器上載入的程式
	詳情可參考 https://github.com/umdjs/umd/blob/master/templates/returnExports.js
*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(this, function () {
	// 建立模組的匿名函式
    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
	return {
		init:{
			route:{
				name:"system/view/login",
				path:"system/view/login"
			}
		},
		loginForm:{
			route:{
				name:"system/view/login",
				path:"system/view/login"
			}
		},
		mainMenu:{
			route:{
				name:"system/view/mainMenu",
				path:"system/view/mainMenu"
			}
		},
		activateSoftwarePackage:{
			route:{
				name:"system/activateModule",
				path:"system/module/:module"
			}
		}
	};
}));