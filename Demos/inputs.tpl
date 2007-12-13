<style type="text/css" media="screen">

	#toast {
		padding: 20px;
		width: 318px;
		background-color: #768092;
	}
	
	#debug {
		white-space: pre;
		background: #ccc;
		color: #000;
		padding: 10px;
	}
	
	textarea {
		height: 120px;
		width: 300px;
	}
	
	input.text-input {
		width: 212px;
	}
	
	label {
		width: 80px;
		float: left;
		font-family: Verdana;
		font-size: 11px;
		padding: 4px 4px;
		color: #fff;
		font-weight: bold;
		line-height: 1.5;
	}
	
	.art-button, .art-textinput, .art-select {
		float: left;
	}
	
	.first-button {
		margin-right: 26px;
	}
	
	.last-button {
		margin-right: 0;
	}
	
	.art-button-content {
		
		line-height: 1 !important;
		line-height: 1.2;
	}
	
	span.clr {
		display: block;
		height: 10px;
		width: 100%;
		clear: both;
	}
	
	span.noh {
		height: 0;
	}
	
	.art-tooltip-content, .art-tooltip-title, .art-tooltip-status {
		color: #333;
	}
	
	.form-holder .art-window-content {
		padding: 0;
	}
	
	.form-holder .art-window-title {
		text-align: center;
	}
	
	.form-holder .art-window-buttons {
		right: auto;
		left: 7px;
	}
	
	.form-holder .art-window-button-close {
		right: auto;
		left: 0;
	}
	
	.form-holder .art-window-blur .art-window-title {
		color: #555;
	}
	
</style>


<div id="toast">
	<label>real name:</label><input id="real3" class="text-input" type="text" value="" />
	<span class="clr"></span>
	<label>fake name:</label><input id="real6" class="text-input" type="text" value="" />
	<span class="clr"></span>
	<label>about you:</label>
	<textarea id="real5"></textarea>
	<span class="clr"></span>
	<label>destiny:</label>
	<select id="realselect">

		<option>Slow Death</option>
		<option>Fast Death</option>
		<option>Eternal Life</option>

	</select>
	<span class="clr"></span>
	<input id="real" type="submit" value="Cancel&hellip;" title="if you press here you will die" />
	<input id="real2" type="submit" value="Send&hellip;" title="if you press here you will live" />
	<span class="clr noh"></span>
</div>


<script type="text/javascript">

window.addEvent('load', function(){

	var real = $('real');
	var real2 = $('real2');
	
	button1 = new ART.Button({input: real, className: 'first-button', styles: {width: 140}});
	button2 = new ART.Button({input: real2, className: 'last-button', styles: {width: 140}});
	
	new ART.TextInput({input: 'real3'});
	var textarea = new ART.TextInput({input: 'real5'});
	
	textarea.addEvent('onChange', function(){
		console.log(this.getValue());
	});
	
	button1.addEvent('onClick', function(){
		console.log('clicked cancel');
	});
	
	button2.addEvent('onClick', function(){
		console.log('clicked ok');
	});
	
	new ART.Select({styles: {width: 224}}).load('realselect');
	
	new ART.TextInput({input: 'real6'});
	
});

</script>