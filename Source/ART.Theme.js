/* ART Theme */

ART.Style = function(properties){
	
	var style = $merge(ART.Styles, {$family: {name: 'art:style'}}, properties);
	
	if (!style.shadow){
		style.shadowOffsetY = 0;
		style.shadowOffsetX = 0;
	}

	style.innerHeight = style.height + style.status + style.title + (style.border * 2);
	style.innerWidth = style.width + (style.border * 2);

	style.outerHeight = (style.shadow * 2) - Math.abs(style.shadowOffsetY) + style.innerHeight;
	style.outerWidth = (style.shadow * 2) - Math.abs(style.shadowOffsetX) + style.innerWidth;

	var tl = style.topLeftRadius, tr = style.topRightRadius, bl = style.bottomLeftRadius, br = style.bottomRightRadius;

	style.topLeftRadius = $pick(tl, style.radius);
	style.topRightRadius = $pick(tr, style.radius);
	style.bottomLeftRadius = $pick(bl, style.radius);
	style.bottomRightRadius = $pick(br, style.radius);

	return style;
	
};

ART.Styles = {
	
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

	shadow: 10,
	shadowOffsetX: 0,
	shadowOffsetY: -2,
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
	
};

ART.Theme = function(properties){
	
	properties = $unlink(properties);
	
	this.normal = properties.normal;
	
	delete properties.normal;
	
	for (var p in properties) this[p] = $merge(this.normal, properties[p]);
	
};

ART.Themes = new Hash;