ART.Window = new Class({
	
	Extends: ART.Container,
	
	options: {
		
		width: 200,
		height: 200,
		
		overflow: 'auto',
		position: 'absolute',
		
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
		}
	},
	
	initialize: function(options){
		arguments.callee.parent(options, 'window');

		var buttons = this.options.buttons;
		
		if (buttons){
			
			this.buttonsWrapper = new Element('div', {
				'class': 'art-window-buttons'
			}).setStyles({position: 'absolute', overflow: 'hidden'}).inject(this.top);
			
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
			}).inject(this.bottom);
			
			this.mask = new Element('div', {'class': 'art-window-mask', styles: {
				'position': 'absolute',
				'display': 'none',
				'opacity': this.options.mask.opacity,
				'border-width': this.style.border + 'px',
				'border-style': 'solid',
				'border-color': this.options.mask.borderColor,
				'background-color': this.options.mask.color,
				'-webkit-border-radius': this.style.radius + 1 + 'px'
			}}).inject(this.container);
			
		}
		
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
		this.center.setStyle('overflow', this.options.overflow);
	},
	
	showMask: function(){
		
		var border = this.style.border;
		
		this.mask.setStyles({
			height: this.wrapper.offsetHeight,
			width: this.wrapper.offsetWidth,
			top: this.wrapper.style.top.toInt() - border,
			left: this.wrapper.style.left.toInt() - border,
			display: 'block'
		});
	},
	
	remask: function(){
		this.draw({
			height: this.mask.clientHeight - this.top.offsetHeight - this.bottom.offsetHeight,
			width: this.mask.clientWidth
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
				self.draw({height: lim.y[1], width: lim.x[1]});
			}
		});
		
		if (buttons.mini) this.mini.addEvents({
			mousedown: stop,
			mouseup: function(){
				self.draw({height: lim.y[0], width: lim.x[0]});
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
		
		new Drag(this.mask, {
			limit: {x: [this.minw, this.maxw], y: [this.minh, this.maxh]},
			modifiers: {x: 'width', y: 'height'},
			onBeforeStart: function(){
				self.hideOverflow();
				self.showMask();
			},
			onCancel: function(){
				self.showOverflow();
				self.hideMask();
			},
			onComplete: function(){
				self.remask();
				self.hideMask();
				self.showOverflow();
			},
			handle: this.handle
		});
		
	},
	
	makeDraggable: function(){
		
		if (this.madeDraggable) return;
		this.madeDraggable = true;
		
		new Drag.Move(this.container, {handle: this.top});
		new Drag.Move(this.container, {handle: this.bottom});
		
	}
	
});