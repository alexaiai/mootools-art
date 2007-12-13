<style type="text/css">

	body {
		background: url(images/mandolux.jpg);
	}
	
	#container {
		background: none;
	}
	
	/*title*/
	
	.art-window-title h4 {
		font-size: 12px;
	}
	
	/*hud*/
	
	
	.hud .art-window-button-close {
		background-image: url(images/button-close-hud.png);
	}
	
	.hud .art-window-button-maxi {
		background-image: url(images/button-maxi-hud.png);
	}
	
	.hud .art-window-button-mini {
		background-image: url(images/button-mini-hud.png);
	}
	
	.hud .art-window-title h4 {
		color: #ccc;
		font-size: 11px;
	}
	
	.hud .art-window-content {
		color: #aaa;
	}
	
	.hud .art-window-status {
		color: #888;
	}
	
	.hud .art-window-buttons {
		top: 4px;
		opacity: 0.8;
	}
	
	.hud .art-window-blur .art-window-buttons {
		opacity: 0.4;
	}
	
</style>

<script type="text/javascript">

window.addEvent('load', function(){
	
	window.win1 = new ART.Window({

		content: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
		title: '<h4>Window 1</h4>',
		status: 'dolor sit amet',
		
		styles: {
			height: 200,
			width: 300
		},
		
		className: 'normal'
		
	}).open(document.body, {x: 10, y: 10});
	
	window.win2 = new ART.Window({

		content: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
		title: '<h4>Window 2</h4>',
		status: 'dolor sit amet',
		
		styles: {
			height: 200,
			width: 200
		},
		
		className: 'normal'
		
	}).open(document.body, {x: 60, y: 60});
	
	window.win3 = new ART.Window({

		content: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
		title: '<h4>Window 3</h4>',
		
		styles: {
			height: 200,
			width: 400,
			overflow: 'hidden'
		},
		
		limit: {x: [400, 500], y: [200, 400]},
		
		theme: ART.Themes.HUDWindow,
		
		className: 'hud'
		
	}).open(document.body, {x: 110, y: 110});
	
});
	
</script>