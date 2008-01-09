ART.Checkbox = new Class({
	Extends: ART.Container,
	
	options: {
		theme: ART.Themes.MetalButton,
		
	},
	
	initialize: function(options){
		arguments.callee.parent(options, 'checkbox');
		
		this.input = new Element('a', {href: '#'}).addEvent('click', (function(e){
			if(!this.disabled) this.toggle();
			e.preventDefault();
		}).bind(this));
		this.handle = new Element('div', {'class': 'art-checkbox-button'}).setStyles({'position': 'absolute', 'background-repeat': 'no-repeat'}).inject(this.input);
		this.setContent(this.input);
	},
	
	load: function(input){
		var input = $(input);
		if (input && input.get('tag')=='input'){
			this.checkbox = input.setStyle('display', 'none');
			this.replaces(this.checkbox);
			if(this.checkbox.checked) this.check();
		}
		return this;
	},
	
	toggle: function(){
		this[(this.checkbox.checked ? 'un' : '')+'check']();
	},
	
	check: function(){
		this.handle.addClass('art-checkbox-checked');
		this.checkbox.checked = 'checked';
	},
	
	uncheck: function(){
		this.handle.removeClass('art-checkbox-checked');
		this.checkbox.checked = false;
	},
	
	enable: function(){
		if (!this.disabled) return this;
		this.disabled = false;
		this.draw(this.options.theme.normal);
		this.wrapper.removeClass('art-checkbox-disabled');
		return this;
	},
	
	disable: function(){
		if (this.disabled) return this;
		this.disabled = true;
		this.draw(this.options.theme.disabled);
		this.wrapper.addClass('art-checkbox-disabled');
		return this;
	}
});