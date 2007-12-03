ART.Paint.Style = function(properties){
	
	var style = $extend({

		radius: 0,

		title: 0,
		titleColor: '#CCC',
		titleOpacity: 1,

		status: 0,
		statusColor: '#CCC',
		statusOpacity: 1,

		overlay: true,
		overlayColor: '#FFF',
		overlayOpacity: 1,

		shadow: 20,
		shadowOffsetX: 0,
		shadowOffsetY: -0.2,
		shadowColor: '#000',
		shadowOpacity: 0.5,
		drawShadow: true,

		border: 1,
		borderColor: '#000',
		borderOpacity: 0.4,

		reflection: 1,
		reflectionColors: ['#FFF', '#FFF'],

		line: 1,
		lineColors: ['#AAA', '#AAA']

	}, properties);
	
	style.innerHeight = style.height + style.status + style.title + (style.border * 2);
	style.innerWidth = style.width + (style.border * 2);
	
	style.outerHeight = (style.shadow * 2) - (style.shadow * Math.abs(style.shadowOffsetY)) + style.innerHeight;
	style.outerWidth = (style.shadow * 2) - (style.shadow * Math.abs(style.shadowOffsetX)) + style.innerWidth;
	
	var tl = style.topLeftRadius, tr = style.topRightRadius, bl = style.bottomLeftRadius, br = style.bottomRightRadius;
	
	style.topLeftRadius = $pick(tl, style.radius);
	style.topRightRadius = $pick(tr, style.radius);
	style.bottomLeftRadius = $pick(bl, style.radius);
	style.bottomRightRadius = $pick(br, style.radius);
	
	return style;
};

ART.Paint.Styles = new Hash({
	
	window: {
	
		radius: 4,
		
		titleColor: ['#CCC', '#969696'],
		titleOpacity: 1,

		statusColor: ['#CCC', '#969696'],
		statusOpacity: 1,

		overlay: true,
		overlayColor: '#FFF',
		overlayOpacity: 1,

		shadow: 10,
		shadowColor: '#000',
		shadowOpacity: 0.5,

		border: 1,
		borderColor: ['#333', '#000'],
		borderOpacity: 0.4,

		reflection: 1,
		reflectionColors: ['#EEE', '#DDD'],

		line: 1,
		lineColors: ['#777', '#AAA']

	},
	
	hud: {
		
		overlayColor: '#000',
		overlayOpacity: 0.8,
		
		reflection: 0,
		
		borderColor: '#777',
		borderOpacity: 0.5,
		
		radius: 5,
		
		titleColor: '#000',
		titleOpacity: 0.83,
		
		line: 1,
		lineColors: ['#222', '#222'],
		
		statusColor: '#000',
		statusOpacity: 0.83,
		
		shadow: 12,
		shadowOpacity: 0.6
	},
	
	button: {
		shadow: 2,
		reflection: 0,
		shadowColor: '#FFF',
		shadowOpacity: 2,
		overlayColor: ['#fefefe', '#a9a9a9'],
		borderOpacity: 0.55,
		radius: 2
	},
	
	menu: {
		overlayColor: '#FFF',
		overlayOpacity: 0.9,
		reflection: 0,
		shadow: 10,
		shadowOpacity: 0.4,
		borderOpacity: 0.3,
		radius: 3
	}
});