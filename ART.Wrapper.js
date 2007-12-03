ART.Wrapper = new Class({
	
	Extends: ART.Container,
	
	initialize: function(element, options){
		this.element = $(element);

		arguments.callee.parent($merge(options, {
			content: null,
			height: this.element.offsetHeight,
			width: this.element.offsetWidth
		}), 'wrapper');
		
		this.container.replaces(this.element);
		this.setContent(this.element);
	}
	
});