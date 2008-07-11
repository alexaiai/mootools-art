ART.Checkbox = new Class({
	Extends: ART.Container,
	
	options: {
		theme: ART.Themes.MetalButton,
		caption: '',
		captionStyle: {},
		label: false
	},
	
	initialize: function(options, component){
		this.bound = {
			toggle: this.toggle.bind(this)
		};
		
		this.parent(options, component || 'checkbox');
		
		this.input = new Element('a', {href: '#'}).addEvent('click', (function(e){
			if (!this.disabled) this.toggle();
			e.preventDefault();
		}).bind(this));
		this.handle = new Element('div', {'class': this.component+'-button'}).setStyles({'position': 'absolute', 'background-repeat': 'no-repeat'}).inject(this.input);
		this.setContent(this.input);
	},
	
	load: function(input){
		input = $(input);
		
		if (this.options.label)
			var parent = $(this.options.label) || input.getParent();
		
		if (input && input.get('tag') == 'input'){
			this.elementInput = input.setStyle('display', 'none');
			if(input.parentNode) this.replaces(this.elementInput);
			this.input.adopt(this.elementInput);
			if(this.elementInput.checked) this.check();
		}
		
		if (this.options.caption)
			new Element('div', {'class': this.component.trim()+'-caption', text: this.options.caption, styles: $merge({marginLeft: this.subject.getSize().x+5}, this.options.captionStyle)}).addEvent('click', this.bound.toggle).inject(this.subject);
			
		if (parent) parent.addEvent('click', this.bound.toggle);
		return this;
	},
	
	toggle: function(){
		this[(this.elementInput.checked ? 'un' : '')+'check']();
	},
	
	check: function(){
		this.handle.addClass(this.component.trim()+'-checked');
		this.elementInput.checked = true;
	},
	
	uncheck: function(){
		this.handle.removeClass(this.component.trim()+'-checked');
		this.elementInput.checked = false;
	},
	
	enable: function(){
		if (!this.disabled) return this;
		this.disabled = false;
		this.draw(this.options.theme.normal);
		this.wrapper.removeClass(this.component.trim()+'-disabled');
		return this;
	},
	
	disable: function(){
		if (this.disabled) return this;
		this.disabled = true;
		this.draw(this.options.theme.disabled);
		this.wrapper.addClass(this.component.trim()+'-disabled');
		return this;
	},
	
	getValue: function(){
		return (this.elementInput.checked) ? this.elementInput.get('value') : false;
	}
});