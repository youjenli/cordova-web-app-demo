/**
 * Login Module
 */
define(['jquery', 'jquery.mobile', 'backbone', 'utility/globalRouter'], 
		function($, $mobile, Backbone, globalRouter){
	
	var LoginModule = Backbone.Model.extend({
		attributes:{
			userId:undefined,
			userPw:undefined
		},
		initialize:function(){
			var self = this;
			$.extend(self, Backbone.Events);
			globalRouter.route("logout", "logout", function(){
				self.logout.apply(self);
			});
			console.log("Login module has been initialized");
		},
		verifyUserIdentity:function(userId, userPw){
			if(userId == "app" && userPw == "123"){
				console.log("login success");
				this.set({
					userId:userId,
					userPw:userPw
				});
				this.trigger("login.success");
			}else{
				this.trigger("login.failure");
			}
		},
		logout:function(){
			this.set({
				userId:undefined,
				userPw:undefined
			});
			this.trigger("logout");
		}
	});
	
	return LoginModule;
});