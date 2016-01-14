/**
 * 
 */
define(["backbone"], function(Backbone){
	
	var GlobalRouter = Backbone.Router.extend({
		
		initialize:function(){
			Backbone.history.start();
			console.log("Global router has been initialized.");
		},
		routes : {
			"module/*path":"_executeModule"
		},
		_executeModule:function(path){
			var self = this;
			var routingPath = "module/" + path;
			console.log("Routing path : " + routingPath);//FIXME remove this line later
			require([routingPath], function(module){
				module.once("quit", function(){
					self.trigger("module.quit", module);
				}, self);
				module.execute();
			});
		}
	});
	
	return new GlobalRouter();
});