<?php

$root = $_SERVER['DOCUMENT_ROOT'];
$raw_properties = file($root . 'CWRCEditor/resources/Islandora/properties.txt');
foreach ($raw_properties as $property) {
  $property_parts = explode("=", $property);
  $properties[$property_parts[0]] = trim($property_parts[1]);
}
$data = stripslashes($_REQUEST['text']);
$file_pid = ($_REQUEST['file_pid']);
$filename = $properties['filedir']. $file_pid;
file_put_contents($filename, $data);
echo "Success";
?>
