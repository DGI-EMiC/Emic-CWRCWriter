<?php

$pid = $_REQUEST['PID'];

$root = $_SERVER['DOCUMENT_ROOT'];
$raw_properties = file($root . 'CWRCEditor/resources/Islandora/properties.txt');
if ($properties['datastream'] == 'CWRC') {
  header('Content-type: text/xml');
}
foreach ($raw_properties as $property) {
  $property_parts = explode("=", $property);
  $properties[$property_parts[0]] = trim($property_parts[1]);
}
//$pid = 'islandora:1709-006';
$file_url = $properties['fedora_base'] . "$pid/datastreams/" . $properties['datastream'] . "/content";
$lines = @file($file_url);
foreach ($lines as $line) {
  echo $line . '<br />';
}

?>
