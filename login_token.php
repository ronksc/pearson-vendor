<?php

/*Get the POST value token parameter and put to cookie
  ?token=AQIC5wM2LY4Sfcxzlgiy7FQ-y1qTwcw3g1ou1fHQAYFfnyo.*AAJTSQACMDIAAlNLABM0Njc5MDkzOTYwNzYxMzE5NTkxAAJTMQACMjU.*

*/
$type = isset($_REQUEST['longmanpluslogintype'])?$_REQUEST['longmanpluslogintype']:'';
$tokenvalue = isset($_REQUEST['token'])?$_REQUEST['token']:'';
$back = isset($_REQUEST['back'])?$_REQUEST['back']:'';

if ($type == 'p') {
        setcookie("SSOToken", "", time(), "/", "ilongman.com", true, true);
        setcookie("PSSOToken", $tokenvalue, time()+3600, "/", "ilongman.com", true, true);

} else {
        setcookie("SSOToken", $tokenvalue, time()+3600, "/", "ilongman.com", true, true);
        setcookie("PSSOToken", "", time(), "/", "ilongman.com", true, true);
}


header("Location: https://" . $_SERVER['HTTP_HOST'] . '/' . $back);
?>
