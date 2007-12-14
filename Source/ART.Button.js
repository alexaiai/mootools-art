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

ART.Button = new Class({
	
	Extends: ART.Container,
	
	options: {
		
		// onMouseDown: $empty,
		// onMouseUp: $empty,
		// onClick: $empty,
		
		theme: ART.Themes.MetalButton,
		
		input: null
	},
	
	initialize: function(options, component){
		
		this.component = component || 'button';
		
		this.bound = {
			mouseDown: this.mouseDown.bind(this),
			mouseUp: this.mouseUp.bind(this),
			mouseEnter: this.mouseEnter.bind(this),
			mouseLeave: this.mouseLeave.bind(this)
		};
		
		arguments.callee.parent(options, this.component);
		
		this.input = new Element('a', {href: '#'}).addEvent('click', function(e){
			e.preventDefault();
		});
		
		if (!this.options.preventActions) this.input.addEvents({

			keydown: function(e){
				if (e.key == 'enter' || e.key == 'space') this.mouseDown(e);
			}.bind(this),
			
			keyup: function(e){
				if (e.key == 'enter' || e.key == 'space') this.mouseUp(e);
			}.bind(this),
			
			mousedown: this.bound.mouseDown
			
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
		this.input.addEvent('mouseenter', this.bound.mouseEnter);
		this.input.addEvent('mouseleave', this.bound.mouseLeave);
		this.input.addEvent('focus', this.bound.mouseEnter);
		this.input.addEvent('blur', this.bound.mouseLeave);
	},
	
	disableFocus: function(){
		this.input.removeEvent('mouseenter', this.bound.mouseEnter);
		this.input.removeEvent('mouseleave', this.bound.mouseLeave);
		this.input.removeEvent('focus', this.bound.mouseEnter);
		this.input.removeEvent('blur', this.bound.mouseLeave);
	},
	
	mouseDown: function(e){
		e.preventDefault();

		this.disableFocus();
		this.input.focus();
		if (!this.options.preventActions) document.addEvent('mouseup', this.bound.mouseUp);

		this.draw(this.options.theme.active);
		this.wrapper.addClass('art-' + this.component + '-active');
		this.fireEvent('onMouseDown', e);
		return false;
	},
	
	mouseUp: function(e){
		this.enableFocus();
		
		if (!this.options.preventActions) document.removeEvent('mouseup', this.bound.mouseUp);
		
		if (e.target == this.input){
			this.fireEvent('onMouseUp', e).fireEvent('onClick', e);
			this.mouseEnter();
		} else {
			this.wrapper.removeClass('art-' + this.component + '-active');
			this.mouseLeave();
		}
	},
	
	mouseEnter: function(e, fake){
		this.draw(this.options.theme.over);
		this.wrapper.addClass('art-' + this.component + '-over');
	},
	
	mouseLeave: function(e){
		this.draw(this.options.theme.normal);
		this.wrapper.removeClass('art-' + this.component + '-over');
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