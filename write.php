#!/usr/bin/php

<?php
$data = $_GET["d"];

$xml_output = "<?xml version=\"1.0\"?>\n";
$xml_output .= "<ranks>\n\t" .$data. "</ranks>\n";

file_put_contents('rankings2.xml', $xml_output);
?>