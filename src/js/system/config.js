

define([], function(){
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
});