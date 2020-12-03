<?php

$str = "success" . "|" . "Ebook4_PC_Offline_CN_LEAP" . "|" . "https://preprimary.pearson.com.hk/download/fee?~!@$#@$%$^&^(*&%(&";

echo hash_hmac('sha256', $str, 'secret');

?>


