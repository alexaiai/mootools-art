//MooCanvas, My Object Oriented Canvas Element. Copyright (c) 2008 Olmo Maldonado, <http://ibolmo.com/>, MIT Style License.


if (Browser.Engine.trident){
	Element.Constructors.canvas = function(props){
		return new Canvas(props);
	};
	document.createStyleSheet().cssText = 
		'canvas {text-align:left;display:inline-block;}' +
		'canvas div, canvas div * {position:absolute;overflow:hidden}' +
		'canvas div * {width:10px;height:10px;}' +
		'v\\:*, o\\:*{behavior:url(#default#VML)}';
}

var Canvas = new Class({

	initialize: function(){
		var params = Array.link(arguments, {properties: Object.type, element: $defined});
		var props = $extend({width: 300, height: 150}, params.properties);
		var el = (params.element || document.newElement('canvas')).set(props);
		if (el.getContext) return el;
		el.attachEvent('onpropertychange', this.changeproperty);
		el.attachEvent('onresize', this.resize);
		el.getContext = function(){
			return this.context = this.context || new CanvasRenderingContext2D(el);
		};
		return el.setStyles({
			width: props.width,
			height: props.height
		});
	},

	changeproperty: function(e){
		var property = e.propertyName;
		if (property == 'width' || property == 'height'){
			e = e.srcElement;
			e.style[property] = e[property];
			e.getContext().clearRect();
		}
	},

	resize: function(e){
		e = e.srcElement;
		var efC = e.firstChild;
		if (efC){
			efC.style.width = e.width;
			efC.style.height = e.height;
		}
	}

});
var CanvasRenderingContext2D = new Class({

	initialize: function(el){
		this.element = new Element('div').setStyles({
			width: el.clientWidth,
			height: el.clientHeight
		}).inject(el);

		this.m = [
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1]
		];
		this.l = 0;
		this.rot = 0;
		this.state = [];
		this.path = [];

		// from excanvas, subpixel rendering.
		this.Z = 10;
		this.Z2 = this.Z / 2;
		this.miterLimit = this.Z * 1;
	},
    
	arcScaleX: 1,
	arcScaleY: 1,
	currentX: 0,
	currentY: 0,
	lineWidth: 1,
	strokeStyle: '#000',
	fillStyle: '#fff',
	globalAlpha: 1,
	globalCompositeOperation: 'source-over',
	lineCap: 'butt',
	lineJoin: 'miter',
	shadowBlur: 0,
	shadowColor: '#000',
	shadowOffsetX: 0,
	shadowOffsetY: 0,

	getCoords: function(x,y){
		var m = this.m, Z = this.Z, Z2 = this.Z2,
		coord = {
			x: Z * (x * m[0][0] + y * m[1][0] + m[2][0]) - Z2,
			y: Z * (x * m[0][1] + y * m[1][1] + m[2][1]) - Z2
		};
		coord.toString = function(){ return this.x.round() + ',' + this.y.round() };
		return coord;
	}

});

CanvasRenderingContext2D.implement({

	beginPath: function(){
		this.l = 0;
		this.path.length = 0;
	},
	moveTo: function(x, y){
		this.path[this.l++] = 'm';
		this.path[this.l++] = this.getCoords(x, y);
		this.currentX = x;
		this.currentY = y;
	},
	closePath: function(){
		this.path[this.l++] = 'x';
	},
	lineTo: function(x, y){
		this.path[this.l++] = 'l';
		this.path[this.l++] = this.getCoords(x,y);
		this.currentX = x;
		this.currentY = y;
	},
	quadraticCurveTo: function(cpx, cpy, x, y){
		var cx = 2 * cpx,
			cy = 2 * cpy;

		this.bezierCurveTo(
			(cx + this.currentX) / 3,
			(cy + this.currentY) / 3,
			(cx + x) / 3,
			(cy + y) / 3,
			x,
			y
		);
	},
	bezierCurveTo: function(cp0x, cp0y, cp1x, cp1y, x, y){
		this.path[this.l++] = ' c ' + [
			this.getCoords(cp0x, cp0y),
			this.getCoords(cp1x, cp1y),
			this.getCoords(x,y)
		].join(',');

		this.currentX = x;
		this.currentY = y;
	},
	arcTo: Function.empty,
	arc: function(x, y, rad, a0, a1, cw){
		rad *= this.Z;

		var x0 = a0.cos() * rad, y0 = a0.sin() * rad,
			x1 = a1.cos() * rad, y1 = a1.sin() * rad;

		if (x0 == x1 && !cw) x0 += 0.125;
	
        var Z2 = this.Z2,
            c = this.getCoords(x, y),
			aSXr = this.arcScaleX * rad,
			aSYr = this.arcScaleY * rad;
		
		x -= Z2;
		y -= Z2;

		this.path[this.l++] = [
			cw ? 'at ' : 'wa ',
			(c.x - aSXr).round() + ',' + (c.y - aSYr).round(), ' ',
			(c.x + aSXr).round() + ',' + (c.y + aSYr).round(), ' ',
			this.getCoords(x0 + x, y0 + y), ' ',
			this.getCoords(x1 + x, y1 + y),
		].join('');
	},
	rect: function(x, y, w, h){
		this.moveTo(x, y);
		this.lineTo(x + w, y);
		this.lineTo(x + w, y + h);
		this.lineTo(x, y + h);
		this.closePath();
	},
	fill: function(){
		this.stroke(true);
	},

	stroke: function(fill){
		if(!this.path.length) return;

		var size = this.Z * 10,
			fS = this.fillStyle,
			rgb = String.type(fS),
			color = this.processColor(fill && rgb ? fS : this.strokeStyle),
			a = (fill) ?
				['filled="true" stroked="',
				['<v:fill', !rgb ? this.processColorObject(fS) : 'color="' + color.color + '" opacity="' + color.opacity, '"></v:fill>']]
			:
				['strokeweight=' + 0.8 * this.lineWidth * this.m[0][0] + ' filled="',
				['<v:stroke',
					'endcap=', (this.lineCap == 'butt') ? 'flat' : this.lineCap,
					'joinstyle=', this.lineJoin,
					'color=', color.color,
					'opacity="', color.opacity, '" />']];

		this.element.insertAdjacentHTML('beforeEnd', [
			'<v:shape path="', this.path.join(''), '" coordorigin="0 0" coordsize="' + size + ' ' + size + '" ', a[0], 'false">',
				a[1].join(' '),
			'</v:shape>'
		].join(''));

		if(fill && fS.img) this.element.getLast().fill.alignshape = false; // not sure why this has to be called explicitly

		this.beginPath();
	},
	clip: Function.empty,
	isPointInPath: Function.empty,

	processColor: function(col){
		var a = this.globalAlpha;
		if (col.substr(0, 3) == 'rgb'){
			if (col.charAt(3) == "a") a *= col.match(/([\d.]*)\)$/)[1];
			col = col.rgbToHex();
		}
		return {
			color: col,
			opacity: a
		};
	},
	processColorObject: function(obj){
		var ret = '';
		if(obj.addColorStop){
			var oc0 = obj.col0, oc1 = obj.col1, stops = '';
			if(obj.stops) for (var i = 0, j = obj.stops.length; i < j; i++) stops += (100 * obj.stops[i][0]).round() + '% ' + obj.stops[i][1];
			ret += ((obj.r0) ?
				'type=gradientradial focusposition="0.2,0.2" focussize="0.2,0.2"'
			:
				'type=gradient method=linear focus=0 angle=' + 180 * (1 + obj.angle / Math.PI) + ' '
			) + [
				'color="' + oc0.color,
				'opacity="' + oc0.opacity * 100 + '%',
				'color2="' + oc1.color,
				'o:opacity2="' + oc1.opacity * 100 + '%',
				'colors="' + stops
			].join('" ');
		}

		return (obj.img) ?  'type="tile" src="' + obj.img.src : ret;
	}

});

CanvasRenderingContext2D.implement({
	clearRect: function(x, y, w, h){
		this.element.innerHTML = '';
		this.m = [
			[1, 0 ,0],
			[0, 1, 0],
			[0, 0, 1]
		];
	},
	fillRect: function(x, y, w, h){
		this.rect(x, y, w, h);
		this.fill();
	},
	strokeRect: function(x, y, w, h){
		this.rect(x, y, w, h);
		this.stroke();
	}

});
CanvasRenderingContext2D.implement({
  
	scale: function(x,y){
		this.arcScaleX *= x;
		this.arcScaleY *= y;

		this.matMult([
			[x, 0, 0],
			[0, y, 0],
			[0, 0, 1]
		]);
	},

  
	rotate: function(ang){
		this.rot += ang;
		var c = ang.cos(),
			s = ang.sin();
		
		this.matMult([
			[ c, s, 0],
			[-s, c, 0],
			[ 0, 0, 1]
		]);
	},

  
	translate: function(x, y){
		this.matMult([
			[1, 0, 0],
			[0, 1, 0],
			[x, y, 1]
		]);
	},

  
 	transform: function(m11, m12, m21, m22, dx, dy){
		this.matMult([
			[m11, m21, dx],
			[m12, m22, dy],
			[  0,   0,  1]
		]);
	},

  
	setTransform: function(){
		this.m = [
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1]
		];

		this.transform.apply(this, arguments);
	},
	matMult: function(b){
		var m = this.m,
			o = [[0, 0, 0],
				 [0, 0, 0],
				 [0, 0, 0]];

		for (var i = 3; i--;){
			var b0 = b[0][i], b1 = b[1][i], b2 = b[2][i];
			if (b0) this.sum(o[0], this.dotmult(b0, m[i]));
			if (b1) this.sum(o[1], this.dotmult(b1, m[i]));
			if (b2) this.sum(o[2], this.dotmult(b2, m[i]));
		}

		this.m = o;
	},

	dotmult: function(x,y){
		return y.map(function(val){ return x * val; });
	},

	sum: function(o,v){
		o[0] += v[0];
		o[1] += v[1];
		o[2] += v[2];
	}

});
CanvasRenderingContext2D.implement({

	drawImage: function (image){
		var args = arguments, length = args.length, off = (length == 9) ? 4 : 0;

		var irS = image.runtimeStyle, w0 = irS.width, h0 = irS.height;
		irS.width = 'auto';
		irS.height = 'auto';

		var w = image.width, h = image.height;
		irS.width = w0;
		irS.height = h0;

		var sx = 0, sy = 0, 
			sw = w, sh = h,
			dx = args[++off], dy = args[++off],
			dw = args[++off] || w, dh = args[++off] || h;

		if (length == 9){
			sx = args[1]; sy = args[2];
			sw = args[3]; sh = args[4];
		}

		var syh = sy / h, sxw = sx / w,
			m = this.m,
			Z = this.Z,
			d = $H(this.getCoords(dx, dy)).map(function(val){ return (val / Z).round(); });
		var props = (!m[0][1] && m[0][0] == 1) ?
			'top:' + d.y + ';left:' + d.x : [
			'filter:progid:DXImageTransform.Microsoft.Matrix(',
				'M11=', m[0][0], 'M12=', m[1][0],
				'M21=', m[0][1], 'M22=', m[1][1],
				'Dx=', d.x, 'Dy=', d.y, 
			')'
		].join(' ');
			
		this.element.insertAdjacentHTML('beforeEnd', [
			'<v:group style="', props, '" coordsize="', Z * 10, ',', Z * 10, '">',[
				'<v:image',
					'src=', image.src, 'style=width:' + Z * dw + ';height:' + Z * dh,
					'croptop=', syh,
					'cropright=', 1 - sxw - sw/w,
					'cropbottom=', 1 - syh - sh/h,
					'cropleft=', sxw,
				'/>'].join(' '),
			'</v:group>'
		].join(' '));
	},

	drawImageFromRect: Function.empty,
	getImageData: Function.empty,
	putImageData: Function.empty

});
CanvasRenderingContext2D.implement({

	states: [
	    'arcScaleX',
	    'arcScaleY',
	    'currentX',
	    'currentY',
	    
		'strokeStyle',
		'fillStyle',
		'globalAlpha',
		'lineWidth',
		'lineCap',
		'lineJoin',
		'miterLimit',
		'shadowOffsetX',
		'shadowOffsetY',
		'shadowBlur',
		'shadowColor',
		'globalCompositeOperation'
	],
	save: function(){
		var copy = {};
		this.states.each(function(prop){
			copy[prop] = this[prop];
		}, this);
		this.dStack.push(copy);
		this.mStack.push(this.m);
	},
	restore: function(){
		var saved = this.dStack.pop();
		this.states.each(function(prop){
			this[prop] = saved[prop];
		}, this);
		this.m = this.mStack.pop();
	},

	mStack: [],
	dStack: []
});
CanvasRenderingContext2D.implement({

	createLinearGradient: function(x0, y0, x1, y1){
		return new CanvasGradient(x0, y0, x1, y1, this);
	},
	createRadialGradient: function(x0, y0, r0, x1, y1, r1){
		return $extend(new CanvasGradient(x0, y0, x1, y1, this), {
			r0: r0,
			r1: r1
		});
	}

});
var CanvasGradient = new Class({

	initialize: function(x0, y0, x1, y1, ctx){
		this.angle = ((y1 - y0) / ((x1 - x0).pow(2) + (y1 - y0).pow(2)).sqrt()).acos();
		this.ctx = ctx;
	},
	addColorStop: function(off, col){
		col = this.processColor(col);

		if (off == 1 || off == 0){
			this['col' + off] = col;
		} else {
			if(!this.stops) this.stops = [];
			this.stops.push([off, col.color]);
		}
	},

	processColor: function(col){ //path
		var a = this.ctx.globalAlpha || 1;
		if (col.substr(0, 3) == 'rgb'){
			if (col.charAt(3) == "a") a*= col.match(/([\d.]*)\)$/)[1];
			col = col.rgbToHex();
		}
		return {
			color: col,
			opacity: a
		};
	}

});

CanvasRenderingContext2D.implement({
	createPattern: function(img, rep){
		return new CanvasPattern(img, rep);
	}

});
var CanvasPattern = new Class({

	initialize: function(img, rep){
		this.img = img;
		this.rep = rep;
	}

});