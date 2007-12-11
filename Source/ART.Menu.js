ART.Themes.MetalMenu = {
	
	radius: 4,
	reflection: 0,
	
	overlayColor: '#fff',
	overlayOpacity: 0.8,
	borderOpacity: 0.2
	
};

ART.Menu = new Class({
	
	Extends: ART.Container,
	
	options: {
		list: null,
		theme: ART.Themes.MetalMenu,
		
		styles: {
			position: 'absolute'
		}
	},
	
	initialize: function(options){
		arguments.callee.parent(options, 'menu');
		this.list = $(this.options.list) || new Element('ul');
		this.setContent(this.list);
	},
	
	addItem: function(text){
		var li = new Element('li').inject(this.list);
		var a = new Element('a').inject(li);
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
			this.container.dispose();
		}.bind(this));
	}
	
});