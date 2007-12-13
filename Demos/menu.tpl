<style type="text/css" media="screen">

	body {
		background: url(images/mandolux.jpg);
	}

	#container {
		background: none;
	}
	
	#toggler {
		display: block;
		height: 100px;
		width: 100px;
		background: #ff3300;
		color: #fff;
	}
	
</style>

<a id="toggler" href="#"></a>

<ul id="menu">
	<li><a href="#">New Folder</a></li>
	
	<li><a href="#">New Burn Folder</a></li>
	
	<li class="art-menu-separator"></li>
	
	<li><a href="#">Get Info</a></li>
	
	<li class="art-menu-separator"></li>
	
	<li><a href="#">Change Desktop Background&hellip;</a></li>
	<li><a href="#">Keep Arranged By</a></li>
	<li><a href="#">Show View Options</a></li>
	
	<li class="art-menu-separator"></li>
	
	<li><a href="#">More</a></li>
	
</ul>


<script type="text/javascript">

window.addEvent('load', function(){
	
	var menu = new ART.Menu({morph: {duration: 150}, target: 'toggler'}).load([
		
		{text: 'New Folder', action: function(){console.log('new folder');}},
		{text: 'New Burn Folder', action: function(){console.log('new burn folder');}},
		{text: '-'},
		{text: 'Get Info', action: function(){console.log('get info');}}
	
	]);
	
});

</script>