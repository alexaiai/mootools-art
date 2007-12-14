ART.Select = new Class({
	
	Extends: ART.Button,
	
	initialize: function(options){
		
		options = $extend(options || {}, {preventActions: true});
		
		arguments.callee.parent(options, 'select');
		
	},
	
	selectMenuItem: function(menuLink, html){
		this.input.set('html', html);
		menuLink.getParent('ul').getElements('a').removeClass('art-menu-current');
		menuLink.addClass('art-menu-current');
	},
	
	load: function(select){
		
		this.select = $(select);
		
		this.select.setStyle('display', 'none');
		
		var htmlOptions = this.select.getElements('option');
		
		this.replaces(select);
		
		var data = [];
		
		htmlOptions.each(function(option){
			var html = option.get('html');
			
			var self = this;
			
			data.push({text: html, action: function(event){
				self.selectMenuItem(this, html);
			}});
			
			
		}, this);
		
		this.menu = new ART.Menu({styles: {width: this.options.styles.width}, relative: 'element', morph: {duration: 100}}).load(data);
		
		this.selectMenuItem(this.menu.links[0], this.menu.links[0].get('html'));
		
		var up = function(event){
			this.up(event);
			this.input.focus();
			this.menu.close();
		}.bind(this);
		
		var down = function(event){
			this.down(event);
			var c = this.wrapper.getCoordinates();
			this.menu.open({x: c.left - 1, y: c.bottom});
			return true;
		}.bind(this);
		
		this.input.addActions({up: up, down: down});
		
		this.draw();
		
	}

});