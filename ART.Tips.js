ART.Tips = new Class({
	
	Implements: [Events, Options],

	options: {
		onShow: function(tip){
			tip.setStyle('visibility', 'visible');
		},
		onHide: function(tip){
			tip.setStyle('visibility', 'hidden');
		},
		maxTitleChars: 30,
		showDelay: 100,
		hideDelay: 100,
		className: null,
		offsets: {'x': 16, 'y': 16},
		fixed: false,
		theme: ART.Themes.tip,
		contents: [],
		titles: [],
		statuses: []
	},

	initialize: function(elements, options){
		this.setOptions(options);
		this.elements = $$(elements);
		this.contents = this.options.contents;
		this.titles = this.options.titles;
		this.statuses = this.options.statuses;
		
		this.toolTip = new ART.Container({
			styles: {position: 'absolute'},
			theme: this.options.theme,
			className: this.options.className
		}, 'tips').setStyles({visibility: 'hidden'}).inject(document.body);
		
		this.bound = {end: this.end.bind(this), locate: this.locate.bind(this)};
		elements.each(this.build, this);
	},

	build: function(el, i){
		
		el.addEvent('mouseenter', function(event){
			this.start(el, i);
			(!this.options.fixed) ? this.locate(event) : this.position(el);
		}.bind(this));
		
		if (!this.options.fixed) el.addEvent('mousemove', this.bound.locate);
		
		el.addEvent('mouseleave', this.bound.end);
	},

	start: function(el, i){
		
		var title = this.titles[i], content = this.contents[i], status = this.statuses[i];
		
		var holder = new Element('div', {
			'class': this.options.className || '' + ' art-tips-content'
		}).setStyles({
			visibility: 'hidden',
			position: 'absolute'
		}).setContent(content).inject(this.toolTip.container);
		
		var height = holder.offsetHeight, width = holder.offsetWidth;
		
		this.toolTip.setContent(content);
		
		if (title) this.toolTip.setTitle(title);
		if (status) this.toolTip.setStatus(status);
		
		this.toolTip.draw({height: height, width: width});
		
		holder.dispose();
		
		$clear(this.timer);
		this.timer = this.show.delay(this.options.showDelay, this);
	},
	
	show: function(){
		this.fireEvent('onShow', this.toolTip);
	},

	hide: function(){
		this.fireEvent('onHide', this.toolTip);
	},

	end: function(event){
		$clear(this.timer);
		this.timer = this.hide.delay(this.options.hideDelay, this);
	},

	position: function(element){
		var pos = element.getPosition();
		this.toolTip.setStyles({
			'left': pos.x + this.options.offsets.x,
			'top': pos.y + this.options.offsets.y
		});
	},

	locate: function(event){
		var doc = window.getOffsetSize();
		var scroll = window.getScroll();
		var tip = {'x': this.toolTip.container.offsetWidth, 'y': this.toolTip.container.offsetHeight};
		var prop = {'x': 'left', 'y': 'top'};
		for (var z in prop){
			var pos = event.page[z] + this.options.offsets[z];
			if ((pos + tip[z] - scroll[z]) > doc[z]) pos = event.page[z] - this.options.offsets[z] - tip[z];
			this.toolTip.setStyle(prop[z], pos);
		}
	}
	
	
});