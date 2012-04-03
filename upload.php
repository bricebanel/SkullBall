#!/usr/bin/php

<?php
$tmp_file_name = $_FILES['Filedata']['tmp_name'];
$ok = move_uploaded_file($tmp_file_name, 'results.xml');

// This message will be passed to 'oncomplete' function
echo $ok ? "File Uploaded as 'results.xml'" : "The file could not be uploaded";
?>