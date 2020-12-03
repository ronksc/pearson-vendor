<?php

$method = "POST"; 
$url = "/v1.0/resources/permissions"; 
$salt = 'Sdfsdw39(*)&&sdf@#$dsfk_+)*sdf#$'; 
$time = time(); 

$str = $time . ":" . strtolower($url) . ":" . strtolower($method) . ":" . $salt; 
echo $time;
echo "\n";
echo $str;
echo "\n";
echo $time . ":" . hash("sha256", $str);

echo "\n";


?>
