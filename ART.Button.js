ART.Themes.Button = {};

ART.Themes.Button.normal = {
	shadow: 2,
	reflection: 0,
	shadowColor: '#FFF',
	shadowOpacity: 2,
	overlayColor: ['#fefefe', '#a9a9a9'],
	borderColor: ['#000', '#222'],
	borderOpacity: 0.4,
	shadowOffsetY: -1,
	radius: 5
};

ART.Themes.Button.active = {
	overlayColor: ['#555', '#bbb'],
	borderOpacity: 0.7,
	borderColor: ['#000', '#444'],
	reflectionColors: ['#999', '#666']
};


ART.Themes.Button.over = {
	borderOpacity: 0.6
};

ART.Button = new Class({
	
	Extends: ART.Container,
	
	options: {
		
		// onMouseDown: $empty,
		// onMouseUp: $empty,
		// onMouseEnter: $empty,
		// onMouseLeave: $empty,
		
		theme: ART.Themes.Button.normal,
		activeTheme: ART.Themes.Button.active,
		overTheme: ART.Themes.Button.over
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
	},
	
	mouseDown: function(e){
		document.addEvent('mouseup', this.bound.mouseUp);
		this.center.removeEvent('mouseleave', this.bound.mouseLeave);
		this.center.removeEvent('mouseenter', this.bound.mouseEnter);
		if (this.options.activeTheme) this.draw(this.options.activeTheme);
		this.container.addClass('art-button-active');
		this.fireEvent('onMouseDown', e);
		return false;
	},
	
	mouseUp: function(e){
		this.center.addEvent('mouseleave', this.bound.mouseLeave);
		this.center.addEvent('mouseenter', this.bound.mouseEnter);
		if (e.target == this.container || this.container.hasChild(e.target)){
			this.draw(this.options.theme);
			this.fireEvent('onMouseUp', e);
			this.mouseEnter(e);
		} else {
			this.draw(this.options.theme);
			this.container.removeClass('art-button-active');
		}
		
		document.removeEvent('mouseup', this.bound.mouseUp);
	},
	
	mouseEnter: function(e){
		if (this.options.overTheme) this.draw(this.options.overTheme);
		this.container.addClass('art-button-over');
		this.fireEvent('onMouseEnter', e);
	},
	
	mouseLeave: function(e){
		if (this.options.overTheme) this.draw(this.options.theme);
		this.container.removeClass('art-button-over');
		this.fireEvent('onMouseLeave', e);
	}
	
});