ART.Themes.MetalRadio = new ART.Theme($merge(ART.Themes.MetalButton, {
	
	normal: {
		radius: 7
	},
	
	active: {
		radius: 7
	},
	
	focus: {
		radius: 7
	},
	
	disabled: {
		radius: 7
	}
	
}));

ART.Radio = new Class({
	Extends: ART.Checkbox,
	
	options: {
		theme: ART.Themes.MetalRadio
	},
	
	initialize: function(options, list){
		this.parent(options, 'radio');
		
		this.list = list || [];
	},
	
	loadElements: function(input){
		input = $(input);
		if (input){
			if (input.get('tag') == 'input' && input.get('type')=='radio')
				this.list.push(input);
			else
				this.list = input.getElements('input[type="radio"]');
		}
		if (this.list.length)
			this.list.each(function(v, i){
				var options = $unlink(this.options);
				if(options.options[i])
					options = $merge(options, options.options[i]);
				v.store('art:radio', new ART.Radio(options, this.list).load(v));
			}, this);
		
		return this;
	},
	
	load: function(input){
		this.parent(input);
		return this;
	},
	
	check: function(){
		this.list.each(function(el){
			if (!el.checked) return;
			el.checked = false;
			// This is to make sure the list element already has been created!
			if (el.retrieve('art:radio'))
				el.retrieve('art:radio').uncheck(true);
		});
		this.parent();
	},
	
	uncheck: function(force){
		if(force) this.parent();
	},
	
	getValue: function(){
		var value = false;
		this.list.each(function(el){
			if(el.checked) value = el.get('value');
		});
		return value;
	}
	
});