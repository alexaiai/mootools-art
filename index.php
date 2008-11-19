<?php

$file = $_GET['file'];

if (!preg_match('/^[a-z]+$/', $file)) die('Oh Oh');

$content = @file_get_contents('Demos/' . $file . '.tpl');

if (!$content) die('Invalid file: ' . $file);

$keys = array(
	'{URI}',
	'{TITLE}'
);
$values = array(
	'.',
	'Demo - ' . $file
);

echo str_replace($keys, $values, file_get_contents('Demos/head.tpl'));

echo str_replace($keys, $values, $content);

?>
<body>

</body>
</html>