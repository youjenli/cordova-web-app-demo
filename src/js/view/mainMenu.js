/**
 * 
 */
define(['jquery', 'jquery.mobile', 'backbone', 'utility/globalRouter'], function($, $mobile, Backbone, globalRouter){
	
	var MainMenu = Backbone.View.extend({
		el:"#mainMenu",
		initialize:function(){
			console.log("Main menu view has been initialized.");
		},
		render:function(params){
			var pageId = "#" + this.$el.attr("id");
			$(":mobile-pagecontainer").pagecontainer("change", pageId, {role:"page"});
			globalRouter.navigate("view/mainMenu", {trigger:false});
		}
	});
		
	return MainMenu;
});