/* ART Container */

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
		
		theme: null,
		morph: {link: 'cancel'}
	},
	
	initialize: function(options, component){
		this.component = (component) ? ' art-' + component : '';
		this.setOptions(options);
		options = this.options;
		
		var absZero = {position: 'absolute', top: 0, left: 0};
		
		this.container = new Element('div', {'class': 'art-container' + this.component}).setStyles({
			position: options.styles.position, top: 0, left: 0
		});
		
		if (!this.component) this.component = 'art-container';
		
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
		
		this.morpher = new Fx.Morph(this.container, this.options.morph);
		
		this.parent({
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
		this.parent(element);
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
		where = new Element('div', {'class': this.component + '-' + name}).inject(container);
		where.setContent(part);
		this[name] = where;
	},
	
	draw: function(theme){
		
		theme = $unlink(theme || {});
		
		this.container.setStyles({width: '100%'});
		
		var height = theme.height, width = theme.width;
		
		if ($chk(height)) this.center.setStyles({height: height});
		if ($chk(width)) this.center.setStyles({width: width});
		
		theme = $merge(this.options.theme.normal, theme, {
			title: this.top.offsetHeight,
			status: this.bottom.offsetHeight,
			height: this.center.offsetHeight,
			width: this.center.offsetWidth
		});
		
		theme = ART.Style(theme);
		
		this.container.setStyles({height: theme.outerHeight, width: theme.outerWidth});
		var shadow = theme.shadow, border = theme.border;
		
		this.offsets = {
			x: shadow + ((theme.shadowOffsetX > 0) ? 0 : theme.shadowOffsetX),
			y: shadow + ((theme.shadowOffsetY > 0) ? 0 : theme.shadowOffsetY)
		};
		
		this.wrapper.setStyles({left: this.offsets.x + border, top: this.offsets.y + border});
		
		this.paint.draw(theme);
		return this;
	},
	
	setPosition: function(position){
		this.container.position({x: position.x - this.offsets.x, y: position.y - this.offsets.y});
		return this;
	}
	
});