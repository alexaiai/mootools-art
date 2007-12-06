ART.Container = new Class({
	
	Extends: ART.Element,
	
	options: {
		id: null,
		className: null,
		
		title: null,
		content: null,
		status: null,
		
		styles: {
			height: 200,
			width: 300,
			position: 'relative',
			overflow: 'hidden'
		},
		
		theme: ART.Themes.window.focus
	},
	
	initialize: function(options, component){
		this.component = component || 'container';
		this.setOptions(options);
		options = this.options;
		this.theme = options.theme;
		
		var absZero = {position: 'absolute', top: 0, left: 0};
		
		this.container = new Element('div', {'class': 'art-' + this.component}).setStyles({
			position: options.styles.position, top: options.styles.top, left: options.styles.left
		});
		if (options.id) this.container.set('id', options.id);
		
		this.paint = new ART.Paint().setStyles(absZero).inject(this.container);
		
		this.wrapper = new Element('div').setStyles(absZero).inject(this.container);
		
		if (options.className) $splat(options.className).each(function(cn){
			this.wrapper.addClass(cn);
		}, this);

		this.top = {offsetHeight: 0};
		this.bottom = {offsetHeight: 0};
		this.center = new Element('div').inject(this.wrapper);
		
		this.center.setStyles({width: options.styles.width, height: options.styles.height, overflow: options.styles.overflow});
		
		if (options.title) this.setTitle(options.title);
		if (options.content) this.setContent(options.content);
		if (options.status) this.setStatus(options.status);
		
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
		return this;
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
		if (theme){
			if (theme.height) this.center.setStyles({height: theme.height});
			if (theme.width) this.center.setStyles({width: theme.width});
		}
		theme = new ART.Theme($merge(this.theme, theme, {
			title: this.top.offsetHeight,
			status: this.bottom.offsetHeight,
			height: this.center.offsetHeight,
			width: this.center.offsetWidth
		}));
		this.container.setStyles({height: theme.outerHeight, width: theme.outerWidth});
		var shadow = theme.shadow, border = theme.border;
		this.wrapper.setStyles({
			top: shadow + border + (shadow * (theme.shadowOffsetY > 0 ? 0 : theme.shadowOffsetY)),
			left: shadow + border + (shadow * (theme.shadowOffsetX > 0 ? 0 : theme.shadowOffsetX))
		});
		this.paint.draw(theme);
		return this;
	}
	
});