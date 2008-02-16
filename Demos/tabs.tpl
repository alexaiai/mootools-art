<style type="text/css" media="screen">
	#margin {
		margin: 10px;
	}
</style>
<div id="margin">

	<div id="tabContainer">
		<div class="art-tabcontainer">
			<span>Home</span>
			<span>About</span>
			<span class="art-close">Legal</span>
		</div>
		<div class="art-tabcontent">
			<div>
				Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Pellentesque sodales porta nulla. Quisque posuere magna sed erat. Duis viverra velit a turpis. Vestibulum imperdiet diam a odio. Donec lacinia tellus vitae est. Duis sed nibh id felis malesuada bibendum. Proin at elit sit amet justo suscipit tempor. Suspendisse ut felis ut libero vehicula accumsan. Donec accumsan lectus ac justo placerat vehicula. Nunc sollicitudin, lacus eget aliquam convallis, orci odio tempor lectus, id posuere massa orci cursus massa. Mauris ac justo. Aliquam mauris nulla, ullamcorper id, porttitor eget, porttitor et, nulla. Quisque nibh. 
			</div>
			<div>
				Integer enim nisl, tincidunt vel, congue sit amet, rhoncus aliquam, neque. Curabitur suscipit. Cras a eros id nisl aliquam posuere. Duis ornare eros id orci. Quisque quis neque fermentum erat ultricies imperdiet. Vestibulum nec neque. Vestibulum in ante. Suspendisse eget neque in libero vestibulum convallis. Nullam vehicula nulla eget dui. Cras non leo. Donec nec ante. Phasellus orci. Vestibulum non neque in est tristique nonummy. Curabitur at ligula. Pellentesque sed velit. Phasellus ipsum. Pellentesque placerat varius odio. In vestibulum purus nec velit. 
			</div>
			<div>
				Proin commodo quam at purus. Cras dapibus, mi ac ultricies consequat, libero nunc condimentum orci, non varius sapien sem nonummy massa. Sed nunc. Sed pretium auctor enim. Nullam a elit a diam dictum blandit. Maecenas sollicitudin lectus in ligula. Quisque aliquet rutrum elit. Curabitur condimentum mattis lacus. Etiam at nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Integer sollicitudin. Fusce adipiscing. Nam elementum euismod massa. Etiam quis risus. 
			</div>
		</div>
	</div>

	<div id="adder">
		<span>Some Title</span>
		<div>Some Text</div>
	</div>
</div>
<script>
window.addEvent('load', function(){
	var tabs = new ART.Tabs('tabContainer').open(0);
	
	tabs.add('Test', 'I\'m sooo dynamic!');
	
	tabs.add($('adder').getElement('span'), $('adder').getElement('div'), {close: true});
});
</script>

