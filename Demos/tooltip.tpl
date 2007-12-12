<a href="http://mootools.net">mootools</a>
<a href="http://jquefy.com">jquery</a>
<a href="http://prototypical.org">prototype</a>

<script type="text/javascript">

window.addEvent('domready', function(){
	
	var elements = $$('a');

	var t = new ART.ToolTip(elements, {contents: elements.get('html')});
});

</script>