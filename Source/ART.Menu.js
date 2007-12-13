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
		theme: ART.Themes.MetalMenu,
		
		target: null,
		relative: null,
		
		relative: 'mouse',
		
		styles: {
			position: 'absolute'
		}
	},
	
	initialize: function(options){
		arguments.callee.parent(options, 'menu');
		
		var target = $(this.options.target), relative = this.options.relative;
		
		var up = function(event){
			if (event.key && event.key == 'up' || event.key == 'down') return;
			
			this.close();
			document.removeEvent('mouseup', up);
			document.removeEvent('keyup', up);
		}.bind(this);
		
		var down = function(event){
			var c = target.getCoordinates();
			var p = (event.page && this.options.relative == 'mouse') ? event.page : {x: c.left, y: c.bottom};
			this.toggle(p);
			
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
		
		document.addEvent('keydown', function(event){
			
			if (!this.opened || !event.key.match(/up|down/)) return;
				
			switch (event.key){
				case 'down': this.active++; break;
				case 'up': this.active--;
			}
			
			if (this.active < 0) this.active = 0;
			if (this.active > this.links.length - 1) this.active = this.links.length - 1;
			
			this.links[this.active].focus();
			
		}.bind(this));
	},
	
	load: function(data){
		
		if ($type(data) != 'array'){
			
			this.list = $(data);
			this.links = this.list.getElements('a');
			
		} else {
			
			this.list = new Element('ul');
			var links = [];
			
			data.each(function(object){

				var li = new Element('li').inject(this.list);

				var text = object.text, action = object.action;

				if (text == '-'){
					li.addClass('art-menu-separator');
					return;
				}

				var link = new Element('a', {href: '#', text: text}).inject(li);
				
				if ($type(action) == 'function'){
					action = action.bind(this);
					
					link.addEvents({
						mouseup: action,

						keyup: function(e){
							if (e.key == 'space' || e.key == 'enter') action(e);
						},

						click: function(e){
							e.preventDefault();
						},

						keydown: function(e){
							e.preventDefault();
						}
					});
				}

				links.push(link);

			}, this);
			
			this.links = $$(links);
			
		}
		
		this.links.addEvents({
			mouseenter: this.focusItem,
			mouseleave: this.blurItem,
			focus: this.focusItem,
			blur: this.blurItem
		});
		
		return this.setContent(this.list).draw();
		
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
		
		this.active = -1;
		
		this.inject(document.body);

		this.setStyle('opacity', 0).setPosition(position);
		
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