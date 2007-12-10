ART.Themes.MetalTextInput = {};

ART.Themes.MetalTextInput.normal = {
	shadow: 2,
	reflection: 1,
	reflectionColors: ['#ccc', '#ccc'],
	shadowColor: '#FFF',
	shadowOpacity: 1,
	overlayColor: '#fff',
	borderColor: ['#000', '#333'],
	borderOpacity: 0.5,
	shadowOffsetY: -1,
	radius: 1
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
		type: null,
		changeDelay: 500
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
			blur: this.onBlur.bind(this),
			keyup: this.checkChange.bind(this)
		});
		
		(this.input.parentNode) ? this.wraps(this.input) : this.setContent(this.input);
		
		this.value = this.getValue();
	},
	
	getValue: function(){
		return this.input.value.trim();
	},
	
	focus: function(){
		this.input.focus();
		this.onFocus();
	},
	
	checkChange: function(e){
		if (!this.$events.onChange) return;
		$clear(this.changeTimer);
		if (this.value != this.getValue()) this.changeTimer = this.onChange.delay(this.options.changeDelay, this);
	},
	
	onChange: function(){
		this.value = this.getValue();
		this.fireEvent('onChange');
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