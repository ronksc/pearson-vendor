<?php // RAY_curl_post_example.php
error_reporting(E_ALL);

$username = 'ralphteacher20190314a';
$password = '12345678';


// DEMONSTRATE HOW TO USE CURL POST TO START AN ASYNCHRONOUS PROCESS


function curl_post($url, $post_array=array(), $timeout=2, $error_report=FALSE, $username, $password)
{
    // PREPARE THE POST STRING
    $post_string = NULL;
    foreach ($post_array as $key => $val)
    {
        $post_string .= $key . '=' . urlencode($val) . '&';
    }
    $post_string = rtrim($post_string, '&');

    // PREPARE THE CURL CALL
    $curl = curl_init();
    curl_setopt( $curl, CURLOPT_URL,            $url         );

curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);

//    curl_setopt( $curl, CURLOPT_HEADER,         FALSE        );
    curl_setopt( $curl, CURLOPT_POST,           TRUE         );
//    curl_setopt( $curl, CURLOPT_POSTFIELDS,     $post_string );

     curl_setopt($curl, CURLOPT_HTTPHEADER, array('userName: ' . $username, 'password: ' . $password));

    curl_setopt( $curl, CURLOPT_TIMEOUT,        $timeout     );
    curl_setopt( $curl, CURLOPT_RETURNTRANSFER, TRUE         );

    // EXECUTE THE CURL CALL
    $htm = curl_exec($curl);
    $err = curl_errno($curl);
    $inf = curl_getinfo($curl);

    // ON FAILURE
    if (!$htm)
    {
        // PROCESS ERRORS HERE
        if ($error_report)
        {
            echo "CURL FAIL: $url TIMEOUT=$timeout, CURL_ERRNO=$err";
            echo "<pre>\n";
            var_dump($inf);
            echo "</pre>\n";
        }
        curl_close($curl);
        return FALSE;
    }

    // ON SUCCESS
    curl_close($curl);
    return $htm;
}

function getCURLResult($url,$httpMthod="POST",$headers=array(),$params=array()) {
		// PREPARE THE POST STRING
		$post_string = NULL;
		foreach ($params as $key => $val)
		{
			$post_string .= $key . '=' . urlencode($val) . '&';
		}
		$post_string = rtrim($post_string, '&');
		
		foreach($headers as $key => $val) {
			$header_array[] = $key.":".$val;
		}

		//return "1";
		//echo $post_string;
		//print_r($header_array);

		
		// PREPARE THE CURL CALL
		$curl = curl_init();
		curl_setopt( $curl, CURLOPT_URL, $url);
//		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
//		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
		switch ($httpMthod)  {
			case "POST":
				curl_setopt( $curl, CURLOPT_POST,TRUE);
				break;
			case "PUT":
				curl_setopt( $curl, CURLOPT_PUT,TRUE);
				break;
			case "PATCH":
				curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PATCH');
				break;
			case "GET":
				curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'GET');
				break;
			default:
				break;
		}
	
		// curl_setopt( $curl, CURLOPT_HEADER, FALSE);
		
	 	curl_setopt($curl, CURLOPT_POSTFIELDS, $post_string);
		curl_setopt($curl, CURLOPT_HTTPHEADER, $header_array);
	
		curl_setopt( $curl, CURLOPT_TIMEOUT, $timeout);
		curl_setopt( $curl, CURLOPT_RETURNTRANSFER, TRUE);
	
		// EXECUTE THE CURL CALL
		$htm = curl_exec($curl);
		$err = curl_errno($curl);
		$inf = curl_getinfo($curl);
		
		// ON FAILURE
		if (!$htm)
		{
			// PROCESS ERRORS HERE
			if (true) //($error_report)
			{
				echo "CURL FAIL: $url TIMEOUT=$timeout, CURL_ERRNO=$err";
				echo "<pre>\n";
				var_dump($inf);
				echo "</pre>\n";

				echo "<pre>\n";
				var_dump($err);
				echo "</pre>\n";
				
				echo "<pre>\n";
				var_dump($htm);
				echo "</pre>\n";

			}
			curl_close($curl);
			return FALSE;
		}
	
		// ON SUCCESS
		curl_close($curl);
		return $htm;
}


// USAGE EXAMPLE CREATES ASSOCIATIVE ARRAY OF KEY=>VALUE PAIRS
$args["name"]  = 'ralph';
$args["email"] = 'ralph.chow@pearson.com';

// ACTIVATE THIS TO SEE THE ARRAY OF ARGS
// var_dump($args);

// SET THE URL
//$url = "https://sam-stg-route.nonprod.pearsoncms.net/route/authentication/authentication/authenticate"; //Login
$url = "https://sam-stg-route.nonprod.pearsoncms.net/route/identities/identities"; //Create User

// CALL CURL TO POST THE DATA
//$htm = curl_post($url, $args, 3, TRUE, $username, $password);

$params = array("userName" => $username, "userPassword" => $password, "userFullName" => $args['name'],  "userStatus" => "Active", "countryCode" => "HK", "pearsonCreatedBy" => "pearsonhkadmin" );
$params_encode = json_encode($params);


$htm = getCURLResult($url, "POST", array("accept" => "*/*"), $params_encode);

// SHOW WHAT CAME BACK, IF ANYTHING
if ($htm)
{
/*    echo "<pre>";
 */  
	echo "Create User: " . $username . "\n\n";
    echo htmlentities($htm);


}
else
{
    //echo "NO RESPONSE YET FROM $url";
}

