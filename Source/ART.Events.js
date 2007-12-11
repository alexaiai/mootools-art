/* (SM)ART Events */

(function(){

var toggleAdd = function(type){
	
	return function(){
		var self = this, doc = this.getDocument();

		var up = this.retrieve(type + ':toggle:up', function(event){
			doc.removeEvent(type + 'up', up);
			self.fireEvent(type + ':off', event);
		});

		var down = this.retrieve(type + ':toggle:down', function(event){
			this.fireEvent(type + ':on', event);

			var timer = (function(){
				doc.addEvent(type + 'up', up);
				doc.removeEvent(type + 'up', canceler);
			}).delay(200);

			var canceler = function(event){
				if (self != doc && event.target != self && !self.hasChild(event.target)) up(event);
				$clear(timer);
				doc.removeEvent(type + 'up', canceler);
			};

			doc.addEvent(type + 'up', canceler);

		});

		this.addEvent(type + 'down', down);
	};
	
};

var toggleRemove = function(type){
	return function(){
		var down = this.retrieve(type + ':toggle:down');
		if (down) this.removeEvent(type + 'down', down);
	};
};

Element.Events['mouse:on'] = {
	onAdd: toggleAdd('mouse'),
	onRemove: toggleRemove('mouse')
};

Element.Events['key:on'] = {
	onAdd: toggleAdd('key'),
	onRemove: toggleRemove('key')
};

})();