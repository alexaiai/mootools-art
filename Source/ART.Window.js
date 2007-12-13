/* ART Window */

ART.WM = {
	
	windows: [],
	
	init: function(){
		
		if (ART.WM.initialized) return;
		ART.WM.initialized = true;
		
		document.addEvent('mousedown', function(e){
			
			var found = false;
			
			ART.WM.windows.each(function(win){
				if (found) return;
				if (ART.WM.checkAgainst(win.wrapper, e)){
					found = true;
					ART.WM.refocus(win);
				}
			});
			
			if (!found) ART.WM.refocus();
			
		});
	},
	
	checkAgainst: function(el, event){
		el = el.getCoordinates();
		var now = {x: event.page.x, y: event.page.y};
		return (now.x > el.left && now.x < el.right && now.y < el.bottom && now.y > el.top);
	},
	
	include: function(win){
		ART.WM.init();
		ART.WM.refocus(win);
	},
	
	remove: function(win){
		ART.WM.windows.remove(win);
	},
	
	refocus: function(win){
		if (win){
			ART.WM.windows.remove(win).unshift(win);
			win.focus();
		}
		ART.WM.windows.each(function(w, i){
			w.container.setStyle('z-index', ART.WM.windows.length - i + 1);
			if (w != win) w.blur();
		});
	}
	
};

ART.Themes.MetalWindow = new ART.Theme({
	
	normal: {
		radius: 5,

		titleColor: ['#DDD', '#AAA'],

		statusColor: ['#DDD', '#AAA'],

		overlayColor: '#FFF',

		shadowColor: '#000',
		shadowOpacity: 1,

		borderColor: ['#333', '#000'],
		borderOpacity: 0.3,

		reflectionColors: ['#F6F6F6', '#EEEEEE'],

		lineColors: ['#999', '#AAA']
	},
	
	blur: {
		titleColor: '#EEE',
		statusColor: '#EEE',

		shadowColor: '#000',
		shadowOpacity: 0.5,

		borderColor: '#000',
		borderOpacity: 0.1,

		reflectionColors: ['#FFF', '#FFF'],

		lineColors: ['#DDD', '#DDD']
	}
	
});

ART.Themes.HUDWindow = new ART.Theme({
	
	normal: {
		radius: 5,

		overlayColor: '#111',
		overlayOpacity: 0.9,

		reflection: 0,

		borderColor: '#777',
		borderOpacity: 0.6,

		titleColor: ['#444', '#222'],
		titleOpacity: 0.9,

		lineColors: ['#333', '#555'],

		statusColor: ['#444', '#222'],
		statusOpacity: 0.9,

		shadow: 10,
		shadowOpacity: 1
	},
	
	blur: {
		overlayColor: '#111',
		overlayOpacity: 0.8,

		borderColor: '#777',
		borderOpacity: 0.3,

		titleColor: '#111',
		titleOpacity: 0.8,

		lineColors: ['#333', '#333'],

		statusColor: '#111',
		statusOpacity: 0.8,

		shadowOpacity: 0.5
	}
	
});

ART.Window = new Class({
	
	Extends: ART.Container,
	
	options: {
		
		styles: {
			width: 200,
			height: 200,
			overflow: 'auto',
			position: 'absolute'
		},
		
		resizable: true,
		draggable: true,
		showContentWhileResizing: true,
		
		limit: {x: [200, 400], y: [200, 300]},
		
		buttons: {
			close: true,
			mini: true,
			maxi: true
		},
		
		theme: ART.Themes.MetalWindow

	},
	
	initialize: function(options){

		arguments.callee.parent(options, 'window');

		var buttons = this.options.buttons;
		
		if (buttons){
			
			this.buttons = {};
			
			this.buttonsWrapper = new Element('div', {
				'class': 'art-window-buttons'
			}).setStyles({position: 'absolute', overflow: 'hidden'}).inject(this.wrapper);
			
			for (var button in buttons){
				if (!buttons[button]) continue;
				this.buttons[button] = new Element('div', {
					'class': 'art-window-button art-window-button-' + button
				}).setStyles({overflow: 'hidden', position: 'absolute', 'background-repeat': 'no-repeat'}).inject(this.buttonsWrapper);
			}
			
		}
		
		if (this.options.resizable){
			
			this.handle = new Element('div', {
				'class': 'art-window-button-handle'
			}).setStyles({
				position: 'absolute',
				overflow: 'hidden',
				bottom: 0,
				right: 0
			}).inject(this.wrapper);
			
			this.mask = new Element('div', {styles: {
				position: 'absolute',
				display: 'none'
			}}).inject(this.container);
			
		}
		
		this.draw();
	},
	
	onInject: function(){
		this.computeSizes();
		if (this.options.buttons) this.attachButtonEvents();
		if (this.options.draggable) this.makeDraggable();
		if (this.options.resizable) this.makeResizable();
		arguments.callee.parent();
	},
	
	focus: function(){
		if (this.focused) return;
		this.focused = true;
		
		ART.WM.refocus(this);
		
		this.wrapper.removeClass('art-window-blur');
		this.showOverflow();
		this.draw(this.options.theme.normal);
	},
	
	blur: function(){
		if (!this.focused) return;
		this.focused = false;
		
		this.wrapper.addClass('art-window-blur');
		this.hideOverflow();
		this.draw(this.options.theme.blur);
	},
	
	open: function(element, position){
		
		if (this.opened) return this;
		this.opened = true;
		ART.WM.include(this);
		
		this.hideOverflow();
		this.setStyle('opacity', 0).inject(element);
		
		position = position || {x: 0, y: 0};
		
		this.setPosition({x: position.x, y: position.y - 10});
		
		return this.morph({opacity: 1, top: position.y}, function(){
			this.showOverflow();
		});
	},
	
	close: function(){
		if (!this.opened) return this;
		this.opened = false;
		
		ART.WM.remove(this);
		
		this.hideOverflow();
		
		var position = this.container.getRelativePosition();
		
		this.container.setStyle('opacity', 1);
		return this.morph({opacity: 0, top: position.y + 10}, function(){
			this.container.position({x: position.x, y: position.y}).dispose();
		}.bind(this));
	},
	
	maximize: function(){
		var size = window.getSize();
		document.body.setStyle('overflow', 'hidden');
		var oversize = this.bottom.offsetHeight + this.top.offsetHeight;
		return this.morph({
			height: size.y - oversize,
			width: size.x,
			top: -1,
			left: -1
		});
	},
	
	showMask: function(){
		
		var border = this.theme.border;
		
		this.mask.setStyles({
			height: this.wrapper.offsetHeight,
			width: this.wrapper.offsetWidth,
			top: this.wrapper.style.top.toInt(),
			left: this.wrapper.style.left.toInt(),
			display: 'block'
		});
	},
	
	hideMask: function(){
		this.mask.setStyles({display: 'none'});
	},
	
	showCenter: function(){
		this.center.setStyle('visibility', 'visible');
	},
	
	hideCenter: function(){
		this.center.setStyle('visibility', 'hidden');
	},
	
	hideOverflow: function(){
		if (Browser.Engine.gecko && Browser.Platform.mac) this.center.setStyle('overflow', 'hidden');
	},
	
	showOverflow: function(){
		if (this.focused) this.center.setStyle('overflow', this.options.styles.overflow);
	},
	
	remask: function(drawShadow){
		this.draw({
			height: this.mask.clientHeight - this.top.offsetHeight - this.bottom.offsetHeight,
			width: this.mask.clientWidth, drawShadow: (Browser.Engine.webkit420) ? true : drawShadow
		});
	},
	
	computeSizes: function(){
		var tbh = this.top.offsetHeight + this.bottom.offsetHeight, lim = this.options.limit;
		this.minh = lim.y[0] + tbh;
		this.maxh = lim.y[1] + tbh;
		this.minw = lim.x[0];
		this.maxw = lim.x[1];
	},
	
	attachButtonEvents: function(){
		var self = this, lim = this.options.limit, buttons = this.options.buttons;
		
		if (buttons.maxi) this.buttons.maxi.addEvents({
			mouseup: function(){
				self.morph({height: lim.y[1], width: lim.x[1]});
			}
		});
		
		if (buttons.mini) this.buttons.mini.addEvents({
			mouseup: function(){
				self.morph({height: lim.y[0], width: lim.x[0]});
			}
		});
		
		if (buttons.close) this.buttons.close.addEvents({
			mouseup: function(){
				self.close();
			}
		});
	},
	
	makeResizable: function(){
		
		if (this.madeResizable) return;
		this.madeResizable = true;
		
		var self = this;
		
		new Drag(this.mask, {
			limit: {x: [this.minw, this.maxw], y: [this.minh, this.maxh]},
			modifiers: {x: 'width', y: 'height'},
			onBeforeStart: function(){
				self.showMask();
			},
			onStart: function(){
				if (!self.options.showContentWhileResizing) self.hideCenter();
				self.hideOverflow();
			},
			onCancel: function(){
				self.hideMask();
			},
			onDrag: function(){
				self.remask(false);
			},
			onComplete: function(){
				self.showCenter();
				self.showOverflow();
				self.remask(true);
				self.hideMask();
			},
			handle: this.handle
		});
		
	},
	
	makeDraggable: function(){
		
		if (this.madeDraggable) return;
		this.madeDraggable = true;
		
		new Drag.Move(this.container, {handle: [this.top, this.bottom]});
		
	}
	
});