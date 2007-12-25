/* ART Menu */

ART.Themes.MetalMenu = new ART.Theme({
	
	normal: {

		radius: 4,
		reflection: 0,

		overlayColor: '#fff',
		overlayOpacity: 0.9,
		borderOpacity: 0.2

	}
	
});

ART.Menu = new Class({
	
	Extends: ART.Container,
	
	options: {
		theme: ART.Themes.MetalMenu,
		
		target: null,
		relative: null,
		
		relative: 'mouse'
	},
	
	initialize: function(options){
		arguments.callee.parent($merge(options, {styles: {position: 'absolute'}}), 'menu');
		
		var target = $(this.options.target), relative = this.options.relative;
		
		if (target) target.addActions({
			
			up: function(event){
				this.close();
			}.bind(this),
			
			down: function(event){
				event.preventDefault();
				var c = target.getCoordinates();
				var p = (event.page && this.options.relative == 'mouse') ? event.page : {x: c.left, y: c.bottom};
				this.open(p);
			}.bind(this)
			
		});
		
		document.addEvent('keydown', function(event){
			if (this.opened) this.moveFocus(event);
		}.bind(this));
		
	},
	
	moveFocus: function(event){
		if (!event.key.match(/up|down/)) return;
		switch (event.key){
			case 'down': this.active++; break;
			case 'up': this.active--;
		}
		
		if (this.active < 0) this.active = 0;
		if (this.active > this.links.length - 1) this.active = this.links.length - 1;
		
		this.focusItem(this.links[this.active], true);
	},
	
	load: function(data){
		
		if (this.list) this.list.destroy();
		
		if ($type(data) != 'array'){
			
			this.list = $(data);
			this.links = this.list.getElements('a');
			this.lis = this.list.getElements('li');
			
		} else {
			
			this.list = new Element('ul');
			var links = [], lis = [];
			
			data.each(function(object){

				var li = new Element('li').inject(this.list);
				
				lis.push(li);

				var text = object.text, action = object.action;

				if (text == '-'){
					li.addClass('art-menu-separator');
					return;
				}

				var link = new Element('a', {href: '#', html: text}).inject(li);
				
				if ($type(action) == 'function'){
					
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
			this.lis = $$(lis);
			
		}
		
		var self = this;
		
		this.links.addEvents({
			mouseenter: function(){
				self.focusItem(this, true);
			},
			mouseleave: function(){
				self.blurItem(this, true);
			},
			focus: function(){
				self.focusItem(this, false);
			},
			blur: function(){
				self.blurItem(this, false);
			}
		});
		
		return this.setContent(this.list).draw();
		
	},
	
	focusItem: function(link, force){
		if (!this.opened) return;
		if (force) link.forceFocus();
		link.getParent('li').addClass('art-menu-selected');
	},
	
	blurItem: function(link, force){
		if (!this.opened) return;
		if (force) link.forceBlur();
		link.getParent('li').removeClass('art-menu-selected');
	},
	
	open: function(position){
		if (this.opened) return this;
		this.opened = true;
		
		this.active = -1;
		
		this.links.each(function(link){
			this.blurItem(link, true);
		}, this);
		
		this.inject(document.body);

		this.setStyle('opacity', 0).setPosition(position);
		
		return this.morpher.start({opacity: 1});
	},
	
	close: function(){
		if (!this.opened) return this;
		this.opened = false;		
				
		return this.morpher.start({opacity: 0}).chain(function(){
			this.links.removeClass('art-menu-selected');
			this.container.dispose();
		}.bind(this));
	}
	
});