/* ART Ink */

ART.Ink = new Class({
	
	Extends: ART.Element,

	initialize: function(props){
		props = props || {};
		props.id = props.id || 'ART_Box_' + Native.UID++;
		var element = new Element('canvas', props);
		if (window.G_vmlCanvasManager) element = G_vmlCanvasManager.initElement(element);
		this.paint = element;
		this.canvas = this.paint.getContext('2d');
		this.parent({subject: this.paint});
		this.save();
	},
	
	save: function(){
		this.canvas.save();
		return this;
	},
	
	restore: function(){
		this.canvas.restore();
		return this;
	},

	begin: function(p){
		this.canvas.beginPath();
		this.canvas.moveTo(p.x, p.y);
		return this;
	},

	close: function(){
		this.canvas.closePath();
		return this;
	},

	translate: function(p){
		this.canvas.translate(p.x, p.y);
		return this;
	},

	line: function(p){
		this.canvas.lineTo(p.x, p.y);
		return this;
	},

	curve: function(p, c){
		this.canvas.quadraticCurveTo(c.x, c.y, p.x, p.y);
		return this;
	},

	box: function(options){
		options = $extend({radius: 5, height: 200, width: 200}, options);
		
		var radius = options.radius, height = options.height, width = options.width, fill = options.fill;

		var tl = options['top-left-radius'];
		var tr = options['top-right-radius'];
		var bl = options['bottom-left-radius'];
		var br = options['bottom-right-radius'];

		tl = $pick(tl, radius);
		tr = $pick(tr, radius);
		bl = $pick(bl, radius);
		br = $pick(br, radius);

		this.begin({x: 0, y: height - tl});
		this.line({x: 0, y: tl}).curve({x: tl, y: 0}, {x: 0, y: 0});
		this.line({x: width - tr, y: 0}).curve({x: width, y: tr}, {x: width, y: 0});
		this.line({x: width, y: height - br}).curve({x: width - br, y: height}, {x: width, y: height});
		this.line({x: bl, y: height}).curve({x: 0, y: height - bl}, {x: 0, y: height});

		this.close();
		
		return this.fill(fill, height);
	},
	
	arc: function(center, radius, start, end, fill){
		this.canvas.arc(center.x, center.y, radius, Math.radians(start), Math.radians(end), false);
		return this.fill(fill, radius * 2);
	},
	
	block: function(options){
		this.fill(options.fill, options.height);
		this.canvas.fillRect(0, 0, options.width, options.height);
		return this;
	},
	
	draw: function(instructions){
		for (var method in instructions) this[method].run(instructions[method], this);
		return this;
	},

	fill: function(color, height){
		if (typeof color != 'string'){
			var gradient = this.canvas.createLinearGradient(0, 0, 0, height);
			var len = color.length;
			color.each(function(color, i){
				gradient.addColorStop(i / (len - 1), color);
			});
			color = gradient;
		}
		this.canvas.fillStyle = color;
		this.canvas.fill();
		return this;
	}

});

Math.radians = function(degrees){
	return degrees * (Math.PI / 180);
};