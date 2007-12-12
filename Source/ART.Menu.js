/* ART Menu */

ART.Themes.MetalMenu = new ART.Theme({
	
	normal: {

		radius: 4,
		reflection: 0,

		overlayColor: '#fff',
		overlayOpacity: 0.8,
		borderOpacity: 0.2

	}
	
});

ART.Menu = new Class({
	
	Extends: ART.Container,
	
	options: {
		list: null,
		theme: ART.Themes.MetalMenu,
		
		target: document,
		
		relative: 'mouse',
		
		styles: {
			position: 'absolute'
		}
	},
	
	initialize: function(options){
		arguments.callee.parent(options, 'menu');
		this.list = $(this.options.list) || new Element('ul');
		
		this.links = this.list.getElements('a');
		
		this.links.addEvents({
			
			click: function(e){
				e.preventDefault();
			},
			
			keydown: function(e){
				e.preventDefault();
			},
			
			mouseenter: this.focusItem,
			mouseleave: this.blurItem,
			focus: this.focusItem,
			blur: this.blurItem
			
		});
		
		var target = $(this.options.target), relative = this.options.relative;
		
		var up = function(event){
			if (event.key && event.key == 'tab') return;
			
			this.close();
			document.removeEvent('mouseup', up);
			document.removeEvent('keyup', up);
		}.bind(this);
		
		var down = function(event){
			var p = target.getPosition();
			this.toggle({x: p.x + 100, y: p.y + 100});
			
			document.removeEvent('mouseup', up);
			document.removeEvent('keyup', up);
			
			(function(){
				document.addEvents({mouseup: up, keyup: up});
			}).delay(300);
			event.preventDefault();
		}.bind(this);
		
		
		target.addEvents({
			mousedown: down,
			keydown: function(event){
				if (event.key == 'space') down(event);
			}
		});
		
		this.setContent(this.list);
	},
	
	focusItem: function(){
		this.addClass('art-menu-selected');
	},
	
	blurItem: function(){
		this.removeClass('art-menu-selected');
	},
	
	open: function(position){
		if (this.opened) return this;
		this.opened = true;
		
		this.inject(document.body);

		this.container.setStyle('opacity', 0);
		this.container.position(position);
		return this.morph({opacity: 1});
	},
	
	close: function(){	
		if (!this.opened) return this;
		this.opened = false;		
				
		return this.morph({opacity: 0}, function(){
			this.links.removeClass('art-menu-selected');
			this.container.dispose();
		}.bind(this));
	},
	
	toggle: function(pos){
		return (this.opened) ? this.close() : this.open(pos);
	}
	
});