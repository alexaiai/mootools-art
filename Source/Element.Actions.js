Element.implement({
	
	addActions: function(actions){
		
		var doc = this.getDocument();
		
		var up = function(event){
			
			if (actions.up.call(this, event) === false) return;

			doc.removeEvent('mouseup', actions.up);
			doc.removeEvent('keyup', actions.up);

		}.bind(this);
		
		var down = function(event){
			if (actions.down.call(this, event) === false) return;

			doc.removeEvent('mouseup', actions.up);
			doc.removeEvent('keyup', actions.up);

			(function(){
				doc.addEvents({mouseup: actions.up, keyup: actions.up});
			}).delay(300);
		};
		
		this.addEvents({mousedown: down, keydown: down});
		
	}
	
});