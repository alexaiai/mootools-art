ART.Themes.MetalSelect = new ART.Theme({
	
	normal: {
		shadow: 2,
		reflection: 0,
		shadowColor: '#FFF',
		shadowOpacity: 1,
		overlayColor: ['#fafafa', '#a9a9a9'],
		borderColor: ['#000', '#222'],
		borderOpacity: 0.5,
		shadowOffsetY: -1,
		overlayOpacity: 1,
		radius: 4
	},
	
	active: {},
	
	over: {
		borderOpacity: 0.7,
		borderColor: ['#0C81CE', '#0C81CE'],
		overlayOpacity: 0.95
	},
	
	disabled: {
		overlayOpacity: 0.5,
		borderOpacity: 0.25
	}
	
});


ART.Select = new Class({
	
	Extends: ART.Button,
	
	options: {
		theme: ART.Themes.MetalSelect	
	},
	
	initialize: function(options){
		
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
			
			data.push({text: html, action: function(){
				this.input.set('html', html);
				this.draw();
			}.bind(this)});
			
			
		}, this);
		
		this.menu = new ART.Menu({relative: 'element', target: this.input, morph: {duration: 100}}).load(data);
		
		this.draw();
		
	}

});