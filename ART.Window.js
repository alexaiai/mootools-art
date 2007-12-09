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
		
		$$(win.top, win.bottom, win.maxi, win.mini, win.close, win.handle).addEvent('mousedown', function(){
			ART.WM.refocus(win);
		});
		
		ART.WM.init();
		ART.WM.refocus(win);
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

ART.Themes.MetalWindow = {};

ART.Themes.MetalWindow.normal = {

	radius: 4,
	
	titleColor: ['#DDD', '#AAA'],
	
	statusColor: ['#DDD', '#AAA'],
	
	overlayColor: '#FFF',
	
	shadowColor: '#000',
	shadowOpacity: 1,

	borderColor: ['#333', '#000'],
	borderOpacity: 0.3,

	reflectionColors: ['#F6F6F6', '#EEEEEE'],

	lineColors: ['#999', '#AAA']

};

ART.Themes.MetalWindow.blur = {
	
	titleColor: '#EEE',
	statusColor: '#EEE',

	shadowColor: '#000',
	shadowOpacity: 0.5,

	borderColor: '#000',
	borderOpacity: 0.1,

	reflectionColors: ['#FFF', '#FFF'],

	lineColors: ['#DDD', '#DDD']
};

ART.Themes.HUD = {};

ART.Themes.HUD.normal = {
	
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
};

ART.Themes.HUD.blur = {
	
	overlayColor: '#111',
	overlayOpacity: 0.8,

	reflection: 0,

	borderColor: '#777',
	borderOpacity: 0.4,

	radius: 5,

	titleColor: '#111',
	titleOpacity: 0.8,

	lineColors: ['#333', '#333'],

	statusColor: '#111',
	statusOpacity: 0.8,

	shadowOpacity: 0.5
	
};

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
		
		limit: {x: [200, 400], y: [200, 300]},
		
		mask: {
			opacity: 0.5,
			color: '#9A9FA3',
			borderColor: '#454D59'
		},
		
		buttons: {
			close: true,
			mini: true,
			maxi: true
		},
		
		blurTheme: ART.Themes.MetalWindow.blur,
		theme: ART.Themes.MetalWindow.normal

	},
	
	initialize: function(options){

		arguments.callee.parent(options, 'window');

		var buttons = this.options.buttons;
		
		if (buttons){
			
			this.buttonsWrapper = new Element('div', {
				'class': 'art-window-buttons'
			}).setStyles({position: 'absolute', overflow: 'hidden'}).inject(this.wrapper);
			
			for (var button in buttons){
				if (!buttons[button]) continue;
				this[button] = new Element('div', {
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
			
			this.mask = new Element('div', {'class': 'art-window-mask', styles: {
				'position': 'absolute',
				'display': 'none',
				'opacity': this.options.mask.opacity,
				'border-style': 'solid',
				'border-color': this.options.mask.borderColor,
				'background-color': this.options.mask.color
			}}).inject(this.container);
			
		}
		
		ART.WM.include(this);
	},
	
	onInject: function(){
		this.computeSizes();
		if (this.options.buttons) this.attachButtonEvents();
		if (this.options.draggable) this.makeDraggable();
		if (this.options.resizable) this.makeResizable();
		arguments.callee.parent();
	},
	
	hideOverflow: function(){
		this.center.setStyle('overflow', 'hidden');
	},
	
	showOverflow: function(){
		this.center.setStyle('overflow', this.options.styles.overflow);
	},
	
	focus: function(){
		if (this.focused) return;
		this.focused = true;
		
		this.wrapper.removeClass('art-window-blur');
		this.showOverflow();
		this.draw(this.options.theme);
	},
	
	blur: function(){
		if (!this.focused) return;
		this.focused = false;
		
		this.wrapper.addClass('art-window-blur');
		this.hideOverflow();
		this.draw(this.options.blurTheme);
	},
	
	showMask: function(){
		
		var border = this.theme.border;
		
		this.mask.setStyles({
			'height': this.wrapper.offsetHeight,
			'width': this.wrapper.offsetWidth,
			'top': this.wrapper.style.top.toInt() - border,
			'left': this.wrapper.style.left.toInt() - border,
			'border-width': border,
			'display': 'block'
		});
	},
	
	remask: function(drawShadow){
		this.draw({
			height: this.mask.clientHeight - this.top.offsetHeight - this.bottom.offsetHeight,
			width: this.mask.clientWidth, drawShadow: drawShadow
		});
	},
	
	hideMask: function(){
		this.mask.setStyles({display: 'none'});
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
		
		var stop = function(){
			return false;
		};
		
		if (buttons.maxi) this.maxi.addEvents({
			mousedown: stop,
			mouseup: function(){
				self.morph({height: lim.y[1], width: lim.x[1]});
			}
		});
		
		if (buttons.mini) this.mini.addEvents({
			mousedown: stop,
			mouseup: function(){
				self.morph({height: lim.y[0], width: lim.x[0]});
			}
		});
		
		if (buttons.close) this.close.addEvents({
			mousedown: stop,
			mouseup: function(){
				self.container.dispose();
			}
		});
	},
	
	makeResizable: function(){
		
		if (this.madeResizable) return;
		this.madeResizable = true;
		
		var self = this;
		
		self.mask.setStyle('visibility', 'hidden');
		
		new Drag(this.mask, {
			limit: {x: [this.minw, this.maxw], y: [this.minh, this.maxh]},
			modifiers: {x: 'width', y: 'height'},
			onBeforeStart: function(){
				self.hideOverflow();
				self.showMask();
				self.draw({drawShadow: false});
			},
			onCancel: function(){
				self.showOverflow();
				self.hideMask();
			},
			onDrag: function(){
				self.remask(false);
			},
			onComplete: function(){
				self.remask(true);
				self.hideMask();
				self.showOverflow();
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