Element.implement({
	
	addActions: function(actions){
		
		var doc = this.getDocument();
		
		var up = function(event){
			
			if (actions.up.call(this, event) === false) return;

			doc.removeEvent('mouseup', up);
			doc.removeEvent('keyup', up);

		}.bind(this);
		
		var down = function(event){
			if (actions.down.call(this, event) === false) return;

			doc.removeEvent('mouseup', up);
			doc.removeEvent('keyup', up);

			(function(){
				doc.addEvents({mouseup: up, keyup: up});
			}).delay(300);
		};
		
		this.addEvents({mousedown: down, keydown: down});
		
	}
	
});