ART.Paint = new Class({
	
	Extends: ART.Ink,
	
	options: {
		id: false
	},
	
	initialize: function(options){
		this.setOptions(options);
		arguments.callee.parent({id: this.options.id});
	},
	
	colorize: function(color, alpha){
		
		var rgba = function(rgb, a){
			rgb = rgb.hexToRgb(true);
			return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + (a).round(5) + ')';
		};
		
		switch ($type(color)){
			case 'string': return rgba(color, alpha);
			case 'array': return [rgba(color[0], alpha), rgba(color[1], alpha)];
		}
		
		return '#000';
	},
	
	draw: function(style){
		
		this.resize({height: style.outerHeight, width: style.outerWidth});
		
		var tl = style.topLeftRadius, tr = style.topRightRadius, bl = style.bottomLeftRadius, br = style.bottomRightRadius;
		
		var shadow = style.shadow, border = style.border, radius = style.radius, height = style.height, width = style.width;
		
		var s2 = shadow * 1.5;
		
		var trs = tr + s2, tls = tl + s2, brs = br + s2, bls = bl + s2;
		
		//shadow
		
		if (style.drawShadow) (shadow).times(function(i){
			var alpha = Fx.Transitions.Quad.easeIn(i / shadow) / shadow * style.shadowOpacity;
			this.box({
				'width': style.outerWidth - i * 2,
				'height': style.outerHeight - i * 2,
				'top-left-radius': tls - i,
				'top-right-radius': trs - i,
				'bottom-left-radius': bls - i,
				'bottom-right-radius': brs - i,
				'fill': this.colorize(style.shadowColor, alpha)
			});
			this.translate({x: 1, y: 1});
		}, this);
		else this.translate({x: shadow, y: shadow});
		
		this.translate({x: shadow * (style.shadowOffsetX > 0 ? 0 : style.shadowOffsetX), y: shadow * (style.shadowOffsetY > 0 ? 0 : style.shadowOffsetY)});
		
		//border
		
		if (style.border) this.box({
			'width': style.innerWidth ,
			'height': style.innerHeight,
			'top-left-radius': tl + border,
			'top-right-radius': tr + border,
			'bottom-left-radius': bl + border,
			'bottom-right-radius': br + border,
			'fill': this.colorize(style.borderColor, style.borderOpacity)
		}).translate({x: border, y: border});
		
		//main overlay
		
		if (style.overlay){
			
			if (!style.title && style.reflection){
				this.box({
					'width': width,
					'height': height,
					'top-left-radius': tl,
					'top-right-radius': tr,
					'bottom-left-radius': bl,
					'bottom-right-radius': br,
					'fill': this.colorize(style.reflectionColors[0], style.overlayOpacity)
				}).translate({x: 0, y: style.reflection});
			}
			
			var mh = (!style.title) ? style.reflection : 0;

			this.translate({x: 0, y: style.title}).box({
				'width': width,
				'height': height - mh,
				'bottom-left-radius': style.status ? 0 : bl,
				'bottom-right-radius': style.status ? 0 : br,
				'top-left-radius': style.title ? 0 : tl,
				'top-right-radius': style.title ? 0 : tr,
				'fill': this.colorize(style.overlayColor, style.overlayOpacity)
			}).translate({x: 0, y: -style.title});

		}
		
		if (style.title){
			
			if (style.reflection) this.box({
				'width': width,
				'height': style.title,
				'top-left-radius': tl,
				'top-right-radius': tr,
				'bottom-left-radius': 0,
				'bottom-right-radius': 0,
				'fill': this.colorize(style.reflectionColors[0], style.titleOpacity)
			}).translate({x: 0, y: style.reflection});
					
			this.box({
				'width': width,
				'height': style.title - style.reflection,
				'top-left-radius': tl,
				'top-right-radius': tr,
				'bottom-left-radius': 0,
				'bottom-right-radius': 0,
				'fill': this.colorize(style.titleColor, style.titleOpacity)
			}).translate({x: 0, y: -style.reflection});
			
			if (style.line) this.translate({x: 0, y: style.title - style.line}).box({
				'width': width,
				'height': style.line,
				'radius': 0,
				'fill': this.colorize(style.lineColors[0], style.titleOpacity)
			}).translate({x: 0, y: - style.title + style.line});
			
		}
		
		if (style.status){
			
			console.log('bad!');
		
			this.translate({x: 0, y: height + style.title}).box({
				'width': width,
				'height': style.status,
				'bottom-left-radius': bl,
				'bottom-right-radius': br,
				'top-left-radius': 0,
				'top-right-radius': 0,
				'fill': this.colorize(style.statusColor, style.statusOpacity)
			});
			
			if (style.line){
				
				this.box({
					'width': width, 'height': style.line, 'radius': 0, 'fill': this.colorize(style.lineColors[1], style.statusOpacity)
				});
				
				if (style.reflection) this.translate({x: 0, y: style.line}).box({
					'width': width, 'height': style.reflection, 'radius': 0, 'fill': this.colorize(style.reflectionColors[1], style.statusOpacity)
				});
				
			}
			
		}
		
		return this;
	}
	
});