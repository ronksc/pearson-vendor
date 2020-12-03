<?php

$plaintext = "5081t0218|1566204176977";

$password = '3sc3RLrpd17';
$method = 'aes-256-cbc';

$password = substr(hash('sha256', $password, true), 0, 32);

$iv = chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0);

$encrypted = urlencode(base64_encode(openssl_encrypt($plaintext, $method, $password, OPENSSL_RAW_DATA, $iv)));

echo $encrypted;

?>
