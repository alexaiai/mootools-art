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
			width: 300
		},
		
		position: 'relative',
		overflow: 'hidden',
		
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
		if (options.className) $splat(options.className).each(function(cn){
			this.container.addClass(cn);
		}, this);
		if (options.id) this.container.set('id', options.id);
		
		this.paint = new ART.Paint().setStyles(absZero).inject(this.container);
		
		this.wrapper = new Element('div').setStyles(absZero).inject(this.container);
		
		['top', 'center', 'bottom'].each(function(part){
			this[part] = new Element('div').inject(this.wrapper);
		}, this);
		
		this.center.setStyles({width: options.styles.width, height: options.styles.height, overflow: options.styles.overflow});
		
		if (options.title) this.setTitle(options.title, true);
		if (options.content) this.setContent(options.content, true);
		if (options.status) this.setStatus(options.status, true);
		
		arguments.callee.parent({
			subject: this.container,
			grabber: this.content,
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
	
	setTitle: function(content, init){
		this.process('title', content, this.top, init);
		return this;
	},
	
	setContent: function(content, init){
		this.process('content', content, this.center, init);
		return this;
	},
	
	setStatus: function(content, init){
		this.process('status', content, this.bottom, init);
		return this;
	},
	
	onInject: function(){
		this.draw();
	},

	process: function(name, part, container, init){
		var where = this[name];
		if (where) where.dispose();
		if (!part) return;
		where = new Element('div', {'class': 'art-' + this.component + '-' + name}).inject(container);
		($type(part) == 'string') ?  where.set('html', part) : where.adopt(part);
		this[name] = where;
		if (!init) this.draw();
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