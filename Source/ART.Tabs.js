ART.Themes.MetalTab = new ART.Theme($merge(ART.Themes.MetalButton, {

	normal: {
		radius: 0,
		topLeftRadius: 4,
		topRightRadius: 4
	},

	active: {
		radius: 0,
		topLeftRadius: 4,
		topRightRadius: 4
	},

	focus: {
		radius: 0,
		topLeftRadius: 4,
		topRightRadius: 4
	},

	disabled: {
		radius: 0,
		topLeftRadius: 4,
		topRightRadius: 4
	},

	blur: {
		overlayColor: ['#EEE', '#EEE'],

		borderColor: '#000',
		borderOpacity: 0.1
	}

}));

ART.TabElement = new Class({

	Extends: ART.Button,

	options: {
		theme: ART.Themes.MetalTab,
		close: false
	},

	initialize: function(options, tabs, index){
		this.tabs = tabs;
		this.index = index;

		this.parent(options, 'tab');
	},

	load: function(input){
		input = $(input);

		if (input.hasClass('art-close')) this.options.close = true;

		this.input.set('html', input.get('text'));

		if (this.options.close) {
			new Element('img', {
				'class': 'art-tab-button-close',
				events: {
					mouseup: this.close.bind(this)
				}
			}).inject(this.input, 'top');
		}

		this.parent(input, true);

		return this;
	},

	show: function(){
		this.draw(this.options.theme.normal);
		this.wrapper.removeClass('art-tab-blur');
		this.opened = true;

		this.tabs.contentElements.each(function(el, i){
			el.setStyle('display', this.index==i ? '' : 'none');
		}, this);

		return this;
	},

	hide: function(){
		this.draw(this.options.theme.blur);
		this.wrapper.addClass('art-tab-blur');
		this.opened = false;

		return this;
	},

	close: function(){
		this.tabs.remove(this.index);
	},

	focus: function(){
		this.parent();
	},

	blur: function(){
		this.draw(this.options.theme[this.opened ? 'normal' : 'blur']);
	},

	down: function(e){
		this.tabs.open(this.index);

		this.parent(e);
		return false;
	}

});

ART.Tabs = new Class({

	Implements: [Options],

	options: {
		tabOptions: {}
	},

	initialize: function(el, options){
		this.setOptions(options);

		this.el = $(el);
		this.container = this.el.getElement('.art-tabcontainer');
		this.content = this.el.getElement('.art-tabcontent');
		this.contentElements = this.content.getChildren().setStyle('display', 'none');
		this.children = [];

		this.container.getChildren().each(function(el, i){
			this.children.push(new ART.TabElement(this.options.tabOptions, this, i).load(el));
		}, this);
	},

	open: function(index){
		if(!this.children[index])
			return this;

		this.children.each(function(child, i){
			child[index==i ? 'show' : 'hide']();
		}, this);

		return this;
	},

	add: function(title, content, options){
		this.children.push(new ART.TabElement(options || this.options.tabOptions, this, this.children.length).load((typeof title == 'string' ? new Element('span', {text: title}) : $(title)).inject(this.container)).hide());
		this.contentElements.push((typeof content == 'string' ? new Element('div', {html: content}) : $(content)).setStyle('display', 'none').inject(this.content));

		return this;
	},

	remove: function(index){
		var opened;
		if (!this.children[index])
			return this;

		if (this.children[index].opened)
			opened = true;

		this.children[index].container.dispose();

		this.children.erase(this.children[index]);
		this.contentElements.erase(this.contentElements[index].dispose());

		this.children.each(function(child, i){
			this.children[i].index = i;
		}, this);

		if(opened && this.children.length) this.open(0);

		return this;
	}

});