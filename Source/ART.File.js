ART.File = new Class({
	
	Extends: ART.Button,
	
	options: {
		caption: '',
		showValue: false,
	},
	
	initialize: function(options){
		arguments.callee.parent(options);
	},
	
	load: function(input){
		this.file = $(input).clone().setOpacity(0).addClass('art-file');
		if(this.options.caption) this.input.set('html', this.options.caption);
		arguments.callee.parent(input);
		this.content.adopt(this.file);
		var el = this.file;
		this.container.addEvent('mousemove', function(e){
			var pos = this.getCoordinates();
			el.setStyles({
				top: (e.page.y-pos.top-pos.height)-(el.offsetHeight/2)+5+'px',
				left: (e.page.x-pos.left)-(el.offsetWidth - 30)+'px'
			});
		});
		if($(this.options.showValue)){
			this.updateValue = $(this.options.showValue);
			this.check.create({periodical: 500, bind: this})();
		}
	},
	
	check: function(){
		if(!this.file.value || this.updateValue.get('text')==this.file.value)
			return;
		
		this.updateValue.set('text', this.file.value);
	}
});