<?php
require_once 'encryptionUtilities.php';

date_default_timezone_set("Asia/Hong_Kong");
$loginId = isset($_POST['loginId']) ? $_POST['loginId'] : "";


$rtn['courseSectionID'] = $courseSectionID;


$userKey['username'] = $loginId;
$userKey['timestamp'] = date("Ymdhis");
$userKeyJson = json_encode($userKey);

//$hawkKey = '12345678-1234-1234-1234-9876543210ab'; //Secret key 
 
$userKeyEncoded = EncryptionUtilities::Common_AES_Encrypt($userKeyJson,$hawkKey);
$rtn['userKey'] = $userKeyEncoded;


echo 'userKeyJson: ' . $userKeyJson . '<br/>' . '<br/>';

echo 'Secret Key: ' . $hawkKey . '<br/>' . '<br/>';

echo 'userKeyEncoded: ' . $userKeyEncoded . '&nbsp;&nbsp;&nbsp;&nbsp; ';


echo '<form name="sso_testing" class="sso_testing" action="request.sso.dec.php" method="POST" target="_blank"><input type="hidden" name="token" value="' . $userKeyEncoded . '"/> <input type="submit" name="submit" value="Decrypt Token" /></form><br/> <br/>';


echo '<a href="sso.enc.php">Generate token again</a>';

?>