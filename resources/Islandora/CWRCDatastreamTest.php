<?php

$pid = $_REQUEST['PID'];
$root = $_SERVER['DOCUMENT_ROOT'];
$raw_properties = file($root . 'CWRCEditor/resources/Islandora/properties.txt');
foreach ($raw_properties as $property) {
  $property_parts = explode("=", $property);
  $properties[$property_parts[0]] = trim($property_parts[1]);
}

$file_url = $properties['fedora_base'] . "$pid/datastreams/CWRC/content";
$file_headers = @get_headers($file_url);
$exists = ($file_headers[0] == 'HTTP/1.1 404 Not Found')?"FALSE":"TRUE";
echo $exists;


?>
