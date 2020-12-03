<?php
require_once 'encryptionUtilities.php';

//$subjectId = HttpRequest::getParameter('subjectId', null);
date_default_timezone_set("Asia/Hong_Kong");
$token = isset($_POST['token']) ? $_POST['token'] : "";


 
$userKeyDecoded = EncryptionUtilities::Common_AES_Decrypt($token, $hawkKey);


echo 'Token: ' . $token . '<br/>' . '<br/>';

echo 'Secret Key: ' . $hawkKey . '<br/>' . '<br/>';

echo 'userKeyDecoded: ' . $userKeyDecoded . '<br/>' . '<br/>';

?>