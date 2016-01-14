/**
 * 
 */
define([ 'jquery', 'jquery.mobile', 'jquery.i18next', 'backbone', 'utility/globalRouter'], 
		function($, $mobile, i18next, Backbone, globalRouter){
	
	var LoginView = Backbone.View.extend({
		el:"#login",
		events:{
			"click #confirm_login_btn":"_executeLogin",
			"change #login_language":"_changeUserLocale"
		},
		initialize:function(){
			this._resetSelectMenuToCurrentLanguage();
		},
		_executeLogin:function(){
			var userId = this.$el.find("#login_usr").val();
			var userPw = this.$el.find("#login_pw").val();
			this.model.verifyUserIdentity(userId, userPw);
		},
		render:function(){
			console.log("Render login page.");
			var id = "#" + this.$el.attr("id");
			$(":mobile-pagecontainer").pagecontainer("change", id, {role:"page"});
			globalRouter.navigate("view/login", {trigger:false});
			return this;
		},
		_resetSelectMenuToCurrentLanguage:function(){
			var lngOnView = $("#login_language").val();
			var currentLng = i18next.lng();
			if( lngOnView != currentLng ){
				console.log("set locale " + lngOnView + " on login view to i18next locale " + currentLng);
				$("#login_language")
					.find("option[value='" + currentLng + "']").attr("selected", true)
					.end().find("option[value='" + lngOnView + "']").attr("selected", false);
					//.end().selectmenu("refresh");
			}
		},
		_changeUserLocale:function(){
			var locale = $("#login_language").val();
			if(locale != i18next.lng()){
				i18next.setLng(locale, function(t){
					$("body").i18n();
					console.log("Application locale has been switched to locale " + locale);
				});
			}
		}
	});
	
	return LoginView;

});