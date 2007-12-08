ART.Themes.ToolTip = {};

ART.Themes.ToolTip.yellow = {
	
	shadow: 5,
	shadowOpacity: 0.3,
	topLeftRadius: 0,
	topRightRadius: 3,
	bottomLeftRadius: 3,
	bottomRightRadius: 3,
	titleColor: '#F9F4DE',
	overlayColor: ['#F9F4DE', '#F9EFBD'],
	statusColor: '#F9EFBD',
	reflectionColors: ['#F9F8F3', '#F9F8F3']
	
};


ART.ToolTip = new Class({
	
	Extends: ART.Container,

	options: {
		
		onShow: function(){
			this.setStyle('visibility', 'visible');
		},
		
		onHide: function(){
			this.setStyle('visibility', 'hidden');
		},
		
		// onStart: $empty,
		
		showDelay: 200,
		hideDelay: 100,

		offsets: {'x': 16, 'y': 16},
		fixed: false,
		
		theme: ART.Themes.ToolTip.yellow,
		
		contents: [],
		titles: [],
		statuses: []
	},

	initialize: function(elements, options){
		
		arguments.callee.parent(options, 'tooltip');
		
		this.elements = $$(elements);
		this.contents = this.options.contents;
		this.titles = this.options.titles;
		this.statuses = this.options.statuses;
		
		this.setStyles({position: 'absolute', visibility: 'hidden'}).inject(document.body);
		
		this.bound = {end: this.end.bind(this), locate: this.locate.bind(this), hide: this.hide.bind(this)};
		this.elements.each(this.build, this);
		
		this.fireEvent('onStart');
	},

	build: function(el, i){
		
		var enter = function(event){
			this.start(el, i);
			
			if (!this.options.fixed){
				this.locate(event);
				el.addEvent('mousemove', this.bound.locate);
			} else {
				this.position(el);
			}
		}.bind(this);
		
		var leave = this.end.bind(this, el);

		el.addEvents({
			mouseenter: enter,
			mousedown: leave,
			mouseleave: leave
		});
	},

	start: function(el, i){
		
		var title = this.titles[i], content = this.contents[i], status = this.statuses[i];
		
		this.setContent(content);
		
		if (title) this.setTitle(title);
		if (status) this.setStatus(status);
		
		this.draw();
		
		$clear(this.timer);
		this.timer = this.show.delay(this.options.showDelay, this);
	},

	end: function(el){
		el.removeEvent('mousemove', this.bound.locate);
		$clear(this.timer);
		this.timer = this.hide.delay(this.options.hideDelay, this);
	},
	
	show: function(){
		this.fireEvent('onShow');
	},

	hide: function(){
		this.fireEvent('onHide');
	},

	position: function(element){
		var pos = element.getPosition();
		this.setStyles({
			'left': pos.x + this.options.offsets.x,
			'top': pos.y + this.options.offsets.y
		});
	},

	locate: function(event){
		var doc = window.getOffsetSize();
		var scroll = window.getScroll();
		var tip = {'x': this.container.offsetWidth, 'y': this.container.offsetHeight};
		var prop = {'x': 'left', 'y': 'top'};
		for (var z in prop){
			var pos = event.page[z] + this.options.offsets[z];
			if ((pos + tip[z] - scroll[z]) > doc[z]) pos = event.page[z] - this.options.offsets[z] - tip[z];
			this.setStyle(prop[z], pos);
		}
	}
	
	
});