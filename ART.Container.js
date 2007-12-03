ART.Container = new Class({
	
	Extends: ART.Element,
	
	options: {
		id: null,
		className: null,
		
		title: null,
		content: null,
		status: null,
		
		height: 200,
		width: 300,
		
		position: 'relative',
		overflow: 'hidden',
		
		style: ART.Paint.Styles.window
	},
	
	initialize: function(options, component){
		this.component = component || 'container';
		this.setOptions(options);
		options = this.options;
		this.style = $extend(options.style, {height: options.height, width: options.width});
		
		var absZero = {position: 'absolute', top: 0, left: 0};
		
		this.container = new Element('div', {'class': 'art-' + this.component}).setStyles({position: options.position});
		if (options.className) $splat(options.className).each(function(cn){
			this.container.addClass(cn);
		}, this);
		if (options.id) this.container.set('id', options.id);
		
		this.paint = new ART.Paint().setStyles(absZero).inject(this.container);
		
		this.wrapper = new Element('div').setStyles(absZero).inject(this.container);
		
		['top', 'center', 'bottom'].each(function(part){
			this[part] = new Element('div').inject(this.wrapper);
		}, this);
		
		this.center.setStyles({width: this.style.width, height: this.style.height, overflow: options.overflow});
		
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
		$extend(this.style, {height: element.offsetHeight, width: element.offsetWidth});
		this.inject(element, 'after');
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
	
	draw: function(style){
		this.style = $merge(this.style, style, {title: this.top.offsetHeight, status: this.bottom.offsetHeight});
		style = new ART.Paint.Style(this.style);
		this.center.setStyles({height: style.height, width: style.width});
		this.container.setStyles({height: style.outerHeight, width: style.outerWidth});
		var shadow = style.shadow, border = style.border;
		this.wrapper.setStyles({
			top: shadow + border + (shadow * (style.shadowOffsetY > 0 ? 0 : style.shadowOffsetY)),
			left: shadow + border + (shadow * (style.shadowOffsetX > 0 ? 0 : style.shadowOffsetX))
		});
		this.paint.draw(style);
		return this;
	}
	
});