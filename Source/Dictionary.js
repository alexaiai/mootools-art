var Dictionary = new Native({
	
	name: 'Dictionary',
	
	initialize: function(){
		this.keys = [];
		this.values = [];
	}
	
});


Dictionary.implement({
	
	getKey: function(value){
		var idx = this.values.indexOf(value);
		return (idx > -1) ? this.keys[idx] : null;
	},
		
	getValue: function(key){
		var idx = this.keys.indexOf(key);
		return (idx > -1) ? this.values[idx] : null;
	},
		
	forEach: function(fn){
		for (var i = 0, l = this.keys.length; i < l; i++){
			fn.call(this, this.values[i], this.keys[i], this);
		}
	},
	
	set: function(key, value, noforce){
		if (!noforce) this.erase(key);
		else if (this.getValue(key)) return this;
		this.keys.push(key);
		this.values.push(value);
		return this;
	},
	
	include: function(key, value){
		return this.set(key, value, true);
	},
	
	erase: function(key){
		var kIdx = this.keys.indexOf(key);
		if (kIdx > -1){
			this.values.splice(kIdx, 1);
			this.keys.splice(kIdx, 1);
		}
		return this;
	}
	
});

Dictionary.alias('getValue', 'get');
Dictionary.alias('forEach', 'each');