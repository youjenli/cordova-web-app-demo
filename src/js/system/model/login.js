/**
 * Login Module
 */
define(['jquery', 'jquery.mobile', 'backbone'], 
		function($, $mobile, Backbone){
	
	var LoginModel = Backbone.Model.extend({
		defaults:{
			userId:undefined,
			userPw:undefined
		},
		initialize:function(){
			var self = this;
			$.extend(self, Backbone.Events);
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
	
	return LoginModel;
});