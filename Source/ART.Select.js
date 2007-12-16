ART.Select = new Class({
	
	Extends: ART.Element,
	
	options: {
		buttonTheme: ART.Themes.MetalButton,
		menuTheme: ART.Themes.MetalMenu,
		className: '',
		morph: {duration: 150}
	},
	
	initialize: function(options){
		
		this.setOptions(options, {className: this.options.className + ' art-select'});
		
		this.button = new ART.Button($merge(this.options, {
			theme: this.options.buttonTheme,
			preventActions: true
		}));
		
		this.menu = new ART.Menu($merge(this.options, {
			theme: this.options.menuTheme,
			relative: 'element'
		}));
		
		arguments.callee.parent({
			subject: this.button.container,
			onInject: this.onInject
		});
		
	},
	
	onInject: function(){
		this.button.draw();
	},
	
	select: function(link){
		this.button.input.set('html', link.get('html'));
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
		
		this.menu.load(data);
		
		this.menu.links.each(function(link){
			
			link.addEvent('mouseup', function(){
				this.select(link);
			}.bind(this));
			
			link.addEvent('keyup', function(e){
				if (e.key == 'enter' || e.key == 'space') this.select(link);
			}.bind(this));
			
		}, this);
		
		this.select(this.menu.links[0]);

		
		this.button.input.addActions({
			
			up: function(event){
				this.menu.close();
				this.button.up(event);
			}.bind(this),

			down: function(event){
				this.button.down(event);
				var c = this.button.wrapper.getCoordinates();
				this.menu.open({x: c.left - 1, y: c.bottom});
			}.bind(this)
		});
		
		if (select) this.inject(select, 'after');
		
		return this;
	}

});