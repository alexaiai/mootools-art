<style type="text/css" media="screen">


	body {
		padding: 10px;
	}
	
	
	#wrapper {
		position: relative;
		overflow: hidden;
		height: 200px;
		width: 200px;
		background: #ddd;
	}
	
	#content {
		overflow: hidden;
		height: 180px;
		width: 180px;
		padding: 10px;
	}
	
	
</style>


<div id="wrapper">
	
	<div id="content">

	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

	</div>
	
</div>


<script type="text/javascript">

window.addEvent('load', function(){
	
	var scrollBar = new ART.ScrollBar('wrapper', 'content');
	
	window.win1 = new ART.Window({
		title: 'ciao',
		status: 'ciao',
		styles: {overflow: 'hidden'}
	}).setContent($('content').innerHTML).inject(document.body);
	
	win1.scrollBar = new ART.ScrollBar(win1.centerWrapper, win1.center);
	
	var updateScrollBar = function(){
		win1.scrollBar.track.setStyle('height', win1.center.offsetHeight - 4);
		win1.scrollBar.track.setStyle('top', 2);
		win1.scrollBar.track.setStyle('right', 2);
		win1.scrollBar.update();
	};
	
	win1.addEvent('onSizeChange', updateScrollBar);
	
	updateScrollBar();
	
});
	
</script>