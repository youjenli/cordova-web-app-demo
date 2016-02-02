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
				name:"delivery/view/carInfo",
				path:"delivery/view/carInfo"
			}
		},
		carInfo:{
			route:{
				name:"delivery/view/carInfo",
				path:"delivery/view/carInfo"
			}
		},
		departure:{
			route:{
				name:"delivery/view/departure",
				path:"delivery/view/departure"
			}
		},
		menu:{
			route:{
				name:"delivery/view/menu",
				path:"delivery/view/menu"
			}
		},
		ordinaryDelivery:{
			route:{
				name:"delivery/view/ordinaryDelivery",
				path:"delivery/view/ordinaryDelivery"
			}
		},
		productInstallation:{
			route:{
				name:"delivery/view/productInstallation",
				path:"delivery/view/productInstallation"
			}
		},
		deliveryFailure:{
			route:{
				name:"delivery/view/deliveryFailure",
				path:"delivery/view/deliveryFailure"
			}
		},
		deliveryLog:{
			route:{
				name:"delivery/view/deliveryLog",
				path:"delivery/view/deliveryLog"
			}
		},
		searchAndInquiry:{
			route:{
				name:"delivery/view/searchAndInquiry",
				path:"delivery/view/searchAndInquiry"
			}
		}
	};
}));