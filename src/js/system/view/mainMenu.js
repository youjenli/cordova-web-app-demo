/**
 * 
 */
define(['jquery', 'jquery.mobile', 'backbone'], function($, $mobile, Backbone){
	
	var MainMenu = Backbone.View.extend({
		el:"#mainMenu",
		initialize:function(){
			console.log("Main menu view has been initialized.");
		},
		render:function(params){
			var pageId = "#" + this.$el.attr("id");
			$(":mobile-pagecontainer").pagecontainer("change", pageId, {role:"page"});
		}
	});
		
	return MainMenu;
});