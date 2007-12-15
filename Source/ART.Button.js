/* ART Button */

ART.Themes.MetalButton = new ART.Theme({
	
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
	
	active: {
		reflection: 1,
		reflectionColors: ['#444'],
		overlayColor: ['#555', '#bbb'],
		borderOpacity: 0.7,
		borderColor: ['#000', '#444']
	},
	
	focus: {
		borderOpacity: 0.7,
		borderColor: ['#0C81CE', '#0C81CE'],
		overlayOpacity: 0.95
	},
	
	disabled: {
		overlayOpacity: 0.5,
		borderOpacity: 0.25
	}
	
});

ART.Button = new Class({
	
	Extends: ART.Container,
	
	options: {
		
		// onAction: $empty,
		
		theme: ART.Themes.MetalButton,
		
		input: null
	},
	
	initialize: function(options, component){
		
		this.component = component || 'button';
		
		this.bound = {
			down: this.down.bind(this),
			up: this.up.bind(this),
			focus: this.focus.bind(this),
			blur: this.blur.bind(this)
		};
		
		arguments.callee.parent(options, this.component);
		
		this.input = new Element('a', {href: '#'}).addEvent('click', function(e){
			e.preventDefault();
		});
		
		if (!this.options.preventActions) this.input.addEvents({

			keydown: function(e){
				if (e.key == 'enter' || e.key == 'space') this.down(e);
			}.bind(this),
			
			keyup: function(e){
				if (e.key == 'enter' || e.key == 'space') this.up(e);
			}.bind(this),
			
			mousedown: this.bound.down
			
		});
		
		this.enableFocus();
		
		var input = this.options.input;
		
		switch ($type(input)){
			case 'text': this.input.set('html', input); break;
			case 'element': this.input.set('html', input.value);
		};
		
		this.setContent(this.input);
		if ($type(input) == 'element' && input.parentNode) this.replaces(input);
	},
	
	enableFocus: function(){
		this.input.addEvent('focus', this.bound.focus);
		this.input.addEvent('blur', this.bound.blur);
	},
	
	disableFocus: function(){
		this.input.removeEvent('focus', this.bound.focus);
		this.input.removeEvent('blur', this.bound.blur);
	},
	
	down: function(e){
		e.preventDefault();

		this.disableFocus();
		this.input.forceFocus();
		
		if (!this.options.preventActions) document.addEvent('mouseup', this.bound.up);

		this.draw(this.options.theme.active);
		this.wrapper.addClass('art-' + this.component + '-active');
		return false;
	},
	
	up: function(e){
		if (!this.options.preventActions) document.removeEvent('mouseup', this.bound.up);
		this.input.forceFocus();
		this.enableFocus();
		this.focus();
		
		this.wrapper.removeClass('art-' + this.component + '-active');
		if (e.target == this.input) this.fireEvent('onAction', e);
	},
	
	focus: function(){
		this.draw(this.options.theme.focus);
		this.wrapper.addClass('art-' + this.component + '-focus');
	},
	
	blur: function(){
		this.draw(this.options.theme.normal);
		this.wrapper.removeClass('art-' + this.component + '-focus');
	},
	
	enable: function(){
		if (!this.disabled) return this;
		this.disabled = false;
		this.draw(this.options.theme);
		this.wrapper.removeClass('art-' + this.component + '-disabled');
		return this;
	},
	
	disable: function(){
		if (this.disabled) return this;
		this.disabled = true;
		this.draw(this.options.theme.disabled);
		this.wrapper.addClass('art-' + this.component + '-disabled');
		return this;
	}
	
});