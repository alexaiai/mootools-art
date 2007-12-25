/* ART Scrollbar */

ART.Themes.ScrollBar = new ART.Theme({
	
	normal: {
		radius: 5,
		shadow: 0,
		border: 0,
		reflection: 0,
		overlayColor: '#000',
		overlayOpacity: 0.8
	}
	
});


ART.ScrollBar = new Class({

	Extends: ART.Element,

	options: {
		id: null,
		className: null,
		
		minThumbSize: 10,
		wheel: 8,
		
		morph: {duration: 200, link: 'cancel'},
		theme: ART.Themes.ScrollBar
	},

	initialize: function(container, content, options){
		
		this.setOptions(options);

		this.container = $(container);
		this.document = this.container.getDocument();
		
		this.content = $(content);
		
		this.track = new Element('div').addClass('art-scrollbar').inject(this.container).setStyle('opacity', 0);
		
		if (this.options.id) this.track.set('id', this.options.id);
		if (this.options.className) this.track.addClass(this.options.className);
		
		this.thumb = new Element('div', {
			'class': 'art-scrollbar-thumb'
		}).inject(this.track);
		
		this.paint = new ART.Paint().setStyles({position: 'absolute', top: 0, left: 0}).inject(this.thumb);
		
		this.scroller = new Fx.Scroll(this.content, this.options.morph);
		
		this.morphTrack = new Fx.Morph(this.track, this.options.morph);
		this.morphThumb = new Fx.Morph(this.thumb, this.options.morph);
		
		this.selection = (Browser.Engine.trident) ? 'selectstart' : 'mousedown';
		
		this.bound = {
			start: this.start.bind(this),
			end: this.end.bind(this),
			drag: this.drag.bind(this),
			wheel: this.wheel.bind(this),
			page: this.page.bind(this),
			show: this.show.bind(this),
			hide: this.hide.bind(this),
			stopSelection: $lambda(false)
		};
		
		this.mousedown = false;

		this.position = {};
		this.mouse = {};
		
		this.update();
		this.attach();
	},

	attach: function(){
		
		this.container.addEvent('mouseenter', this.bound.show);
		this.container.addEvent('mouseleave', this.bound.hide);
		
		this.thumb.addEvent('mousedown', this.bound.start);
		if (this.options.wheel) this.container.addEvent('mousewheel', this.bound.wheel);
		this.track.addEvent('mouseup', this.bound.page);
	},
	
	show: function(force){
		if (!this.mousedown && (force === true || this.check())) this.morphTrack.start({opacity: 1});
	},
	
	hide: function(force){
		if (!this.mousedown && (force === true || this.check())) this.morphTrack.start({opacity: 0});
	},
	
	check: function(){
		return !(this.thumbSize == this.trackSize);
	},

	update: function(){

		this.contentSize = this.content.offsetHeight;
		this.contentScrollSize = this.content.scrollHeight;
		this.trackSize = this.track.offsetHeight;

		this.contentRatio = this.contentSize / this.contentScrollSize;

		this.thumbSize = (this.trackSize * this.contentRatio).limit(this.options.minThumbSize, this.trackSize);

		this.scrollRatio = this.contentScrollSize / this.trackSize;

		this.thumb.setStyle('height', this.thumbSize);
		
		if (!this.check()){
			this.hide(true);
			return;
		}

		this.updateThumbFromContentScroll();
		this.updateContentFromThumbPosition();
		
		this.paint.draw($extend({height: this.thumb.offsetHeight, width: this.thumb.offsetWidth}, this.options.theme.normal));
	},

	updateContentFromThumbPosition: function(){
		this.content.scrollTop = this.position.now * this.scrollRatio;
	},

	updateThumbFromContentScroll: function(scroll){
		var scrollValue = $pick(scroll, this.content.scrollTop);
		this.position.now = (scrollValue / this.scrollRatio).limit(0, (this.trackSize - this.thumbSize));
		if ($defined(scroll)) this.morphThumb.start({top: this.position.now});
		else this.thumb.setStyles({top: this.position.now});
	},

	wheel: function(event){
		this.content.scrollTop -= event.wheel * this.options.wheel;
		this.updateThumbFromContentScroll();
	},

	page: function(option){
		if ($type(option) == 'event' && option.target != this.track) return;
		var height = this.content.offsetHeight;
		var page = (($type(option) == 'event' && option.page.y > this.thumb.getPosition().y) || option == 'down') ? height : -height;
		var scroll = this.content.scrollTop + page;
		this.scroller.start(0, scroll);
		this.updateThumbFromContentScroll(scroll);
	},

	start: function(event){
		this.mousedown = true;
		this.mouse.start = event.page.y;
		this.position.start = this.thumb.getStyle('top').toInt();
		document.addEvent('mousemove', this.bound.drag);
		document.addEvent('mouseup', this.bound.end);
		
		this.document.addEvent(this.selection, this.bound.stopSelection);
	},

	end: function(event){
		this.mousedown = false;
		if (event.target != this.container && !this.container.hasChild(event.target)) this.hide();
		this.document.removeEvent('mousemove', this.bound.drag);
		this.document.removeEvent('mouseup', this.bound.end);
		this.document.removeEvent(this.selection, this.bound.stopSelection);
	},

	drag: function(event){
		this.mouse.now = event.page.y;
		this.position.now = (this.position.start + (this.mouse.now - this.mouse.start)).limit(0, (this.trackSize - this.thumbSize));
		this.updateContentFromThumbPosition();
		this.updateThumbFromContentScroll();
	}

});