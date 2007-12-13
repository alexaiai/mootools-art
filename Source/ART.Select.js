ART.Select = new Class({
	
	Extends: ART.Button,
	
	initialize: function(options){
		
		options = $extend(options || {}, {preventActions: true});
		
		arguments.callee.parent(options, 'select');
		
	},
	
	load: function(select){
		
		this.select = $(select);
		
		this.select.setStyle('display', 'none');
		
		var htmlOptions = this.select.getElements('option');

		this.input.set('html', htmlOptions[0].get('html'));
		
		this.replaces(select);
		
		var data = [];
		
		htmlOptions.each(function(option){
			var html = option.get('html');
			
			data.push({text: html, action: function(e){
				this.input.set('html', html).focus();
			}.bind(this)});
			
			
		}, this);
		
		this.menu = new ART.Menu({styles: {width: this.options.styles.width}, relative: 'element', morph: {duration: 100}}).load(data);
		
		this.input.addActions({
			
			up: function(event){
				if (event.key && (event.key == 'up' || event.key == 'down')) return false;
				this.mouseUp(event);
				this.mouseEnter(event);
				this.menu.close();
				return true;
			}.bind(this),
			
			down: function(event){
				if (event.key && (event.key != 'space' && event.key != 'enter')) return false;
				this.mouseDown(event);
				var c = this.wrapper.getCoordinates();
				this.menu.open({x: c.left - 1, y: c.bottom});
				return true;
			}.bind(this)
			
		});
		
		this.draw();
		
	}

});