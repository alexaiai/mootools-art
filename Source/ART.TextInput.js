ART.Themes.MetalTextInput = {};

ART.Themes.MetalTextInput.normal = {
	shadow: 2,
	reflection: 1,
	reflectionColors: ['#ccc', '#ccc'],
	shadowColor: '#FFF',
	shadowOpacity: 1,
	overlayColor: '#fff',
	borderColor: ['#000', '#555'],
	borderOpacity: 0.5,
	shadowOffsetY: -1,
	radius: 2
};

ART.Themes.MetalTextInput.focus = {
	borderOpacity: 0.7,
	borderColor: ['#0C81CE', '#2BA2F1']
};

ART.TextInput = new Class({
	
	Extends: ART.Container,
	
	options: {
		theme: ART.Themes.MetalTextInput.normal,
		focusTheme: ART.Themes.MetalTextInput.focus,
		input: null,
		name: null,
		type: null
	},
	
	initialize: function(options){
		arguments.callee.parent(options, 'textinput');
		this.input = $(this.options.input) || new Element('input', {type: this.options.type || 'text', name: this.options.name || ''});
		
		this.input.setStyles({
			outline: 'none',
			background: 'none',
			resize: 'none',
			border: 0,
			margin: 0
		}).addEvents({
			focus: this.onFocus.bind(this),
			blur: this.onBlur.bind(this)
		});
		
		(this.input.parentNode) ? this.wraps(this.input) : this.setContent(this.input);
	},
	
	focus: function(){
		this.input.focus();
		this.onFocus();
	},
	
	blur: function(){
		this.input.blur();
		this.onBlur();
	},
	
	onFocus: function(){
		this.wrapper.addClass('art-textinput-focus');
		return this.draw(this.options.focusTheme);
	},
	
	onBlur: function(){
		this.wrapper.removeClass('art-textinput-focus');
		return this.draw(this.options.theme);
	}
	
});