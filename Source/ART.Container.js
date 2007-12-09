ART.Container = new Class({
	
	Extends: ART.Element,
	
	options: {
		id: null,
		className: null,
		
		title: null,
		content: null,
		status: null,
		
		styles: {
			height: 'auto',
			width: 'auto',
			position: 'relative',
			overflow: 'hidden'
		},
		
		theme: {},
		morph: {link: 'cancel'}
	},
	
	initialize: function(options, component){
		this.component = (component) ? ' art-' + component : '';
		this.setOptions(options);
		options = this.options;
		this.theme = options.theme;
		
		var absZero = {position: 'absolute', top: 0, left: 0};
		
		this.container = new Element('div', {'class': 'art-container' + this.component}).setStyles({
			position: options.styles.position, top: options.styles.top, left: options.styles.left
		});
		if (options.id) this.container.set('id', options.id);
		if (options.className) $splat(options.className).each(function(cn){
			this.container.addClass(cn);
		}, this);
		
		this.paint = new ART.Paint().setStyles(absZero).inject(this.container);
		
		this.wrapper = new Element('div').setStyles(absZero).inject(this.container);

		this.top = {offsetHeight: 0};
		this.bottom = {offsetHeight: 0};
		this.center = new Element('div').inject(this.wrapper);
		
		this.center.setStyles({width: options.styles.width, height: options.styles.height, overflow: options.styles.overflow});
		
		if (options.title) this.setTitle(options.title);
		if (options.content) this.setContent(options.content);
		if (options.status) this.setStatus(options.status);
		
		this.pfx = new Fx.Draw(this, this.options.morph);
		this.sfx = new Fx.Morph(this.container, this.options.morph);
		
		arguments.callee.parent({
			subject: this.container,
			onInject: this.onInject
		});
		
	},
	
	wraps: function(element){
		element = $(element);
		if (!element) return this;
		this.container.replaces(element);
		this.setContent(element);
		this.draw();
		return this;
	},
	
	replaces: function(element){
		arguments.callee.parent(element);
		return this.draw();
	},
	
	setTitle: function(content){
		if ($type(this.top) != 'element') this.top = new Element('div').inject(this.wrapper, 'top');
		this.process('title', content, this.top);
		return this;
	},
	
	setContent: function(content){
		this.process('content', content, this.center);
		this.grabber = this.content;
		return this;
	},
	
	setStatus: function(content){
		if ($type(this.bottom) != 'element') this.bottom = new Element('div').inject(this.wrapper, 'bottom');
		this.process('status', content, this.bottom);
		return this;
	},
	
	onInject: function(){
		this.draw();
	},

	process: function(name, part, container){
		var where = this[name];
		if (where) where.dispose();
		if (!part) return;
		where = new Element('div', {'class': 'art-' + this.component + '-' + name}).inject(container);
		where.setContent(part);
		this[name] = where;
	},
	
	draw: function(theme){
		this.container.setStyle('width', '100%');
		if (theme){
			if (theme.height) this.center.setStyles({height: theme.height});
			if (theme.width) this.center.setStyles({width: theme.width});
		}
		theme = this.theme = new ART.Theme($merge(this.theme, theme, {
			title: this.top.offsetHeight,
			status: this.bottom.offsetHeight,
			height: this.center.offsetHeight,
			width: this.center.offsetWidth
		}));
		this.container.setStyles({height: theme.outerHeight, width: theme.outerWidth});
		var shadow = theme.shadow, border = theme.border;
		
		this.wrapper.setStyles({
			top: shadow + border + ((theme.shadowOffsetY > 0) ? 0 : theme.shadowOffsetY),
			left: shadow + border + ((theme.shadowOffsetX > 0) ? 0 : theme.shadowOffsetX)
		});
		
		this.paint.draw(theme);
		return this;
	},
	
	morph: function(properties){
		if (!properties) return this;
		var pstyle = {};
		for (var p in this.theme){
			var pp = properties[p];
			if ($defined(pp)){
				pstyle[p] = properties[p];
				delete properties[p];
			}
		}
		
		if (Hash.getLength(pstyle)){
			this.draw({drawShadow: false});
			this.pfx.start(pstyle).chain(function(){
				this.draw({drawShadow: true});
			}.bind(this));
		} 
		
		var opacity = properties.opacity;
		if (Browser.Engine.trident && $chk(opacity)){
			this.container.setStyle('opacity', opacity);
			delete properties.opacity;
		}
		
		if (Hash.getLength(properties)) this.sfx.start(properties);
		return this;
	}
	
});