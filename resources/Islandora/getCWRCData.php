<?php

$pid = $_REQUEST['PID'];
header('Content-type: text/xml');
$root = $_SERVER['DOCUMENT_ROOT'];
$raw_properties = file($root . 'CWRCEditor/resources/Islandora/properties.txt');
foreach ($raw_properties as $property) {
  $property_parts = explode("=", $property);
  $properties[$property_parts[0]] = trim($property_parts[1]);
}

$file_url = $properties['fedora_base'] . "$pid/datastreams/CWRC/content";
$file = file_get_contents($file_url);
echo $file;
?>
