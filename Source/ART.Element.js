/* ART Element */

var ART = {};

Element.implement({
	
	setContent: function(content){
		return (typeof content == 'string') ? this.set('html', content) : this.adopt(content);
	},
	
	forceFocus: function(){
		this.blur();
		this.focus();
	},
	
	forceBlur: function(){
		this.focus();
		this.blur();
	}
	
});

ART.Element = new Class({
	
	Implements: [Events, Options],
	
	options: {
		/* onInject: $empty,
		onDispose: $empty,
		onGrab: $empty,*/
		subject: null,
		grabber: null
	},
	
	initialize: function(options){
		this.setOptions(options);
		this.subject = $(this.options.subject);
		this.grabber = (this.options.grabber) ? $(this.options.grabber) : this.subject;
	},
	
	inject: function(element, how){
		this.subject.inject(element, how);
		this.fireEvent('onInject', [element, this.subject]);
		return this;
	},
	
	grab: function(element, how){
		this.grabber.grab(element, how);
		this.fireEvent('onGrab', [element, this.grabber]);
		return this;
	},
	
	replaces: function(element){
		this.subject.replaces(element);
		return this;
	},
	
	adopt: function(){
		Array.flatten(arguments).each(function(element){
			this.grab(element);
		}, this);
		return this;
	},
	
	dispose: function(){
		this.fireEvent('onDispose', this.subject);
		this.subject.dispose();
		return this;
	},
	
	setStyle: function(style, value){
		this.subject.setStyle(style, value);
		return this;
	},
	
	setStyles: function(properties){
		this.subject.setStyles(properties);
		return this;
	},
	
	resize: function(size){
		this.subject.height = size.height;
		this.subject.width = size.width;
		return this;
	}

});
