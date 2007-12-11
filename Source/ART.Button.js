/* ART Button */

ART.Themes.MetalButton = {};

ART.Themes.MetalButton.normal = {
	shadow: 2,
	reflection: 0,
	shadowColor: '#FFF',
	shadowOpacity: 1,
	overlayColor: ['#fafafa', '#a9a9a9'],
	borderColor: ['#000', '#222'],
	borderOpacity: 0.5,
	shadowOffsetY: -1,
	radius: 4
};

ART.Themes.MetalButton.active = {
	reflection: 1,
	reflectionColors: ['#444'],
	overlayColor: ['#555', '#bbb'],
	borderOpacity: 0.7,
	borderColor: ['#000', '#444']
};


ART.Themes.MetalButton.over = {
	borderOpacity: 0.7,
	borderColor: ['#0C81CE', '#0C81CE']
};

ART.Button = new Class({
	
	Extends: ART.Container,
	
	options: {
		
		// onMouseDown: $empty,
		// onMouseUp: $empty,
		// onMouseEnter: $empty,
		// onMouseLeave: $empty,
		
		theme: ART.Themes.MetalButton.normal,
		activeTheme: ART.Themes.MetalButton.active,
		overTheme: ART.Themes.MetalButton.over,
		
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
		this.center.addEvents({
			mousedown: this.bound.mouseDown,
			mouseenter: this.bound.mouseEnter,
			mouseleave: this.bound.mouseLeave
		});
		
		this.input = new Element('a', {href: '#'}).addEvents({
			click: function(e){
				e.preventDefault();
			},
			focus: this.bound.mouseEnter,
			blur: this.bound.mouseLeave,
			keydown: function(e){
				if (e.key == 'enter' || e.key == 'space') this.bound.mouseDown(e);
			}.bind(this),
			keyup: function(e){
				if (e.key == 'enter' || e.key == 'space') this.bound.mouseUp(e);
			}.bind(this)
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
		document.addEvent('mouseup', this.bound.mouseUp);
		this.center.removeEvent('mouseleave', this.bound.mouseLeave);
		this.center.removeEvent('mouseenter', this.bound.mouseEnter);
		if (this.options.activeTheme) this.draw(this.options.activeTheme);
		this.input.focus();
		this.wrapper.addClass('art-button-active');
		this.fireEvent('onMouseDown', e);
		return false;
	},
	
	mouseUp: function(e){
		this.center.addEvent('mouseleave', this.bound.mouseLeave);
		this.center.addEvent('mouseenter', this.bound.mouseEnter);
		if (e.target == this.container || this.container.hasChild(e.target)){
			this.draw(this.options.theme);
			this.fireEvent('onMouseUp', e).fireEvent('onClick', e);
			this.mouseEnter(e);
		} else {
			this.draw(this.options.theme);
			this.wrapper.removeClass('art-button-active');
		}
		
		document.removeEvent('mouseup', this.bound.mouseUp);
	},
	
	mouseEnter: function(e){
		if (this.options.overTheme) this.draw(this.options.overTheme);
		this.wrapper.addClass('art-button-over');
		this.fireEvent('onMouseEnter', e);
	},
	
	mouseLeave: function(e){
		if (this.options.overTheme) this.draw(this.options.theme);
		this.wrapper.removeClass('art-button-over');
		this.fireEvent('onMouseLeave', e);
	},
	
	enable: function(){
		
	},
	
	disable: function(){
		
	}
	
});