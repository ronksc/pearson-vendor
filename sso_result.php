<?php

$launch_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}";

//echo $launch_url . '<br/><br/>';

$token = isset($_POST['oauth_signature']) ? $_POST['oauth_signature'] : "";
$secret = "secret$%#@#$";

  $ok = true;
// Check it is a POST request
  $ok = $ok && $_SERVER['REQUEST_METHOD'] === 'POST';

  // Check the LTI message type
  $ok = $ok && isset($_POST['lti_message_type']) && ($_POST['lti_message_type'] === 'basic-lti-launch-request');

  // Check the LTI version
  $ok = $ok && isset($_POST['lti_version']) && ($_POST['lti_version'] === 'LTI-1p0');

  // Check a consumer key exists
  $ok = $ok && !empty($_POST['oauth_consumer_key']);

  // Check a resource link ID exists
  $ok = $ok && !empty($_POST['resource_link_id']);

  // Check for a user ID
  $ok = $ok && !empty($_POST['user_id']);

  // Check for a role
  $ok = $ok && !empty($_POST['roles']);

  if ($ok) {
    // Check that the user is either a Learner or an Instructor
    $roles = parseRoles($_POST['roles']);
    $ok = in_array('urn:lti:role:ims/lis/Learner', $roles) || in_array('urn:lti:role:ims/lis/Instructor', $roles);
  }  
/*
echo '<br/><br/>';
print_r($_POST);
echo '<br/><br/>';
*/
$launch_data = array();  
$launch_data = $_POST;
array_slice($launch_data, 24, 1);

$launch_data_keys = array_keys($launch_data);
sort($launch_data_keys);

/*
echo '<br/><br/>';
print_r($launch_data_keys);
echo '<br/><br/>';
*/
$launch_params = array();
foreach ($launch_data_keys as $key) {
	if ($key <> 'oauth_signature') {
		//echo 'Key: ' . $key . '<br/>';
		array_push($launch_params, $key . "=" . rawurlencode($launch_data[$key]));
	}
}


$base_string = "POST&" . urlencode($launch_url) . "&" . rawurlencode(implode("&", $launch_params));
//echo '<br/><br/>';
//echo 'Base String xxx: ' . $base_string;
//echo '<br/><br/>';
$secret = urlencode($secret) . "&";
$signature = base64_encode(hash_hmac("sha1", $base_string, $secret, true));

  
if ($ok === true && $token == $signature) {
  echo 'Result: LTI SSO Success<br/>';
  echo 'user_id: '. $launch_data['user_id'] .'<br/>';
  echo 'roles: ' . $launch_data['roles'] .'<br/>';
} else
  echo 'Result: LTI SSO Fail';


function parseRoles($rolesString) {

$rolesArray = explode(',', $rolesString);
$roles = array();
foreach ($rolesArray as $role) {
  $role = trim($role);
  if (!empty($role)) {
	if (substr($role, 0, 4) !== 'urn:') {
	  $role = "urn:lti:role:ims/lis/{$role}";
	}
	$roles[] = $role;
  }
}

return array_unique($roles);

}  
?>
