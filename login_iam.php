<?php

// IAM Integration
require_once('/data/webdoc/website_pt/iam_saml_functions.php');

//$auth = new \SimpleSAML\Auth\Simple('default-sp');
$auth = new SimpleSAML_HK_IAM('default-sp');
$redirectUrl = 'https://ptcheckweb.pprod4.ilongman.com/';


if ($_SERVER['QUERY_STRING']=='logout') {
	setcookie("SSOToken", "", time()+3600, "/", "ilongman.com", true, true);
	unset($_COOKIE["SSOToken"]);
	error_log('CLEAR SESSION');
	error_log('BYEBYE');
	$auth->logout('/');
	error_log('BYEBYEX');
	header('Location: '. $redirectUrl);
	die('Logout successful');
} else {
        $auth->requireAuth(array('saml:sp:NameID'=>'ralpgggggg'));
        $username = $auth->__get('UserName');
error_log('RALPH After Login: '  . $username);
        //if (isset($attrs) && isset($attrs['UserName']) && isset($attrs['UserName'][0])) {
         //       $username = $attrs['UserName'][0];
        //}
//	if ($username)
//	        header('Location: '. $redirectUrl . 'redirect.php?u=' . $username . '&r=' . $redirectUrl);
header('Location: ' . $redirectUrl);
//	else
//		header('Location: '.$redirectUrl);
//	header('Location: '.$redirectUrl);

}
?>
