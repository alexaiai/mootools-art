<h1>The Selectbox</h1>

<style type="text/css" media="screen">
	
	#content {
		padding: 50px;
		background: #aaa;
	}
	
</style>

<div id="content">
	
	<select id="realselect">

		<option>option 1</option>
		<option>option 2 is not that cool</option>
		<option>option 3 is the best</option>

	</select>
	
	<select id="realselect2">

		<option>option 1</option>
		<option>option 2 is not that cool</option>
		<option>option 3 is the best</option>

	</select>
	
</div>

<script type="text/javascript">

window.addEvent('load', function(){
	new ART.Select().load('realselect');
});
	
</script>