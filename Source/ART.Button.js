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
		borderColor: ['#0C81CE', '#0C81CE']
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
	
	initialize: function(options){
		
		this.bound = {
			mouseDown: this.mouseDown.bind(this),
			mouseUp: this.mouseUp.bind(this),
			mouseEnter: this.mouseEnter.bind(this),
			mouseLeave: this.mouseLeave.bind(this)
		};
		
		arguments.callee.parent(options, 'button');
		
		this.input = new Element('a', {href: '#'}).addEvents({
			
			click: function(e){
				e.preventDefault();
			},
			
			keydown: function(e){
				if (e.key == 'enter' || e.key == 'space') this.bound.mouseDown(e);
			}.bind(this),
			
			keyup: function(e){
				if (e.key == 'enter' || e.key == 'space') this.bound.mouseUp(e);
			}.bind(this),
			
			focus: this.bound.mouseEnter,
			blur: this.bound.mouseLeave,
			
			mousedown: this.bound.mouseDown,
			mouseenter: this.bound.mouseEnter,
			mouseleave: this.bound.mouseLeave
		});
		
		var input = this.options.input;
		
		switch ($type(input)){
			case 'text': this.input.set('html', input); break;
			case 'element': this.input.set('html', input.value);
		};
		
		this.setContent(this.input);
		if ($type(input) == 'element' && input.parentNode) this.replaces(input);
	},
	
	mouseDown: function(e){
		this.center.addEvent('mouseup', this.bound.mouseUp);
		this.input.focus();
		this.draw(this.options.theme.active);
		this.wrapper.addClass('art-button-active');
		this.fireEvent('onMouseDown', e);
		return false;
	},
	
	mouseUp: function(e){
		if (e.target == this.input){
			this.fireEvent('onMouseUp', e).fireEvent('onClick', e);
			this.mouseEnter(e);
		} else {
			this.draw(this.options.theme.normal);
			this.wrapper.removeClass('art-button-active');
		}
		
		this.center.removeEvent('mouseup', this.bound.mouseUp);
	},
	
	mouseEnter: function(e){
		this.draw(this.options.theme.over);
		this.wrapper.addClass('art-button-over');
	},
	
	mouseLeave: function(e){
		this.center.removeEvent('mouseup', this.bound.mouseUp);
		this.draw(this.options.theme.normal);
		this.wrapper.removeClass('art-button-over');
	},
	
	enable: function(){
		if (!this.disabled) return this;
		this.disabled = false;
		this.draw(this.options.theme);
		this.wrapper.removeClass('art-button-disabled');
		return this;
	},
	
	disable: function(){
		if (this.disabled) return this;
		this.disabled = true;
		this.draw(this.options.theme.disabled);
		this.wrapper.addClass('art-button-disabled');
		return this;
	}
	
});