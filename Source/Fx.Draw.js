/* Fx Draw */

Fx.Draw = new Class({
	
	Extends: Fx,
	
	initialize: function(paint, options){
		this.paint = paint;
		this.parent(options);
	},
	
	set: function(style){
		this.paint.draw(style);
		return this;
	},
	
	compute: function(from, to, delta){
		var now = {};
		for (var p in from) now[p] = this.parent(from[p], to[p], delta);
		return now;
	},
	
	start: function(properties){
		if (!this.check(properties)) return this;
		var from = {}, to = {};
		for (var p in properties){
			from[p] = this.paint.theme[p];
			to[p] = properties[p];
		}
		return this.parent(from, to);
	}
	
});