Element.implement({
	
	addActions: function(actions){
		
		var doc = this.getDocument();
		
		var count = 0;
		
		var up = function(event){
			if (event.key && (event.key == 'up' || event.key == 'down')) return;
			
			actions.up.call(this, event);
			
			count = 0;

			doc.removeEvent('mouseup', up);
			doc.removeEvent('keyup', up);

		}.bind(this);
		
		var timer;
		
		var down = function(event){
			if (event.key && (event.key != 'space' && event.key != 'enter')) return;
			
			$clear(timer);
			
			actions.down.call(this, event);
			
			count = (count) ? 0 : 1;
			
			if (!count){
				up(event);
				return;
			}
			
			doc.removeEvent('mouseup', up);
			doc.removeEvent('keyup', up);

			timer = (function(){
				doc.addEvents({mouseup: up, keyup: up});
			}).delay(300);
		};
		
		this.addEvents({mousedown: down, keydown: down});
		
	}
	
});