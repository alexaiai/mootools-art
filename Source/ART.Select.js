ART.Select = new Class({
	
	Extends: ART.Button,
	
	initialize: function(options){
		
		options = $extend(options || {}, {preventActions: true});
		
		arguments.callee.parent(options, 'select');
		
	},
	
	select: function(link){
		this.input.set('html', link.get('html'));
		link.getParent('ul').getElements('a').removeClass('art-menu-current');
		link.addClass('art-menu-current');
	},
	
	load: function(data){
		
		var select = false;
		
		if ($type(data) != 'array'){
			
			select = $(data);
			data = [];
			
			select.getElements('option').each(function(option){
				data.push({text: option.get('html')});
			});
			
			select.setStyle('display', 'none');
		}
		
		this.menu = new ART.Menu({styles: {width: this.options.styles.width}, relative: 'element', morph: {duration: 100}}).load(data);
		
		this.menu.links.each(function(link){
			
			link.addEvent('mouseup', function(){
				this.select(link);
			}.bind(this));
			
			link.addEvent('keyup', function(e){
				if (e.key == 'enter' || e.key == 'space') this.select(link);
			}.bind(this));
			
		}, this);
		
		this.select(this.menu.links[0]);

		
		this.input.addActions({
			
			up: function(event){
				this.menu.close();
				this.up(event);
			}.bind(this),

			down: function(event){
				this.down(event);
				var c = this.wrapper.getCoordinates();
				this.menu.open({x: c.left - 1, y: c.bottom});
				return true;
			}.bind(this)
		});
		
		if (select) this.inject(select, 'after');
		
		return this;
	}

});