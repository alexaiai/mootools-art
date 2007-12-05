ART.Theme = function(properties){
	
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

ART.Themes = new Hash({
	
	window: {
		
		focus: {
			radius: 4,

			titleColor: ['#DDD', '#AAA'],
			titleOpacity: 1,

			statusColor: ['#DDD', '#AAA'],
			statusOpacity: 1,

			overlay: true,
			overlayColor: '#FFF',
			overlayOpacity: 1,

			shadow: 20,
			shadowColor: '#000',
			shadowOpacity: 1.5,

			border: 1,
			borderColor: ['#333', '#000'],
			borderOpacity: 0.3,

			reflection: 1,
			reflectionColors: ['#F6F6F6', '#EEEEEE'],

			line: 1,
			lineColors: ['#999', '#AAA']
		},
		
		blur: {
			radius: 4,

			titleColor: '#EEE',
			titleOpacity: 1,

			statusColor: '#EEE',
			statusOpacity: 1,

			overlay: true,
			overlayColor: '#FFF',
			overlayOpacity: 1,

			shadow: 20,
			shadowColor: '#000',
			shadowOpacity: 0.8,

			border: 1,
			borderColor: '#555',
			borderOpacity: 0.3,

			reflection: 1,
			reflectionColors: ['#FFF', '#FFF'],

			line: 1,
			lineColors: ['#DDD', '#DDD']
		}

	},
	
	hud: {
		
		focus: {
			
			overlayColor: '#111',
			overlayOpacity: 0.9,

			reflection: 0,

			borderColor: '#777',
			borderOpacity: 0.6,

			radius: 5,

			titleColor: ['#444', '#222'],
			titleOpacity: 0.9,

			line: 1,
			lineColors: ['#333', '#555'],

			statusColor: ['#444', '#222'],
			statusOpacity: 0.9,

			shadow: 20,
			shadowOpacity: 1.5
			
		},
		
		blur: {
			
			overlayColor: '#111',
			overlayOpacity: 0.8,

			reflection: 0,

			borderColor: '#777',
			borderOpacity: 0.4,

			radius: 5,

			titleColor: '#111',
			titleOpacity: 0.8,

			line: 1,
			lineColors: ['#333', '#333'],

			statusColor: '#111',
			statusOpacity: 0.8,

			shadow: 20,
			shadowOpacity: 0.8
			
		}

	},
	
	tip: {
		shadow: 5,
		shadowOpacity: 0.3,
		topLeftRadius: 0,
		titleColor: '#F9F4DE',
		overlayColor: ['#F9F4DE', '#F9EFBD'],
		statusColor: '#F9EFBD',
		reflectionColors: ['#F9F8F3', '#F9F8F3']
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