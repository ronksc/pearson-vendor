<?php

$hawkKey = '12345678-1234-1234-1234-9876543210ef'; //Secret key 

class EncryptionUtilities
{

	public static function Common_AES_Encrypt($data, $key="", $method='AES-256-CBC')
	{
        $ivSize = openssl_cipher_iv_length($method);
        //$iv = openssl_random_pseudo_bytes($ivSize);
    
        $encrypted = @openssl_encrypt($data, $method, $key, OPENSSL_RAW_DATA/*, $iv*/);
        
        // For storage/transmission, we simply concatenate the IV and cipher text
        $encrypted = base64_encode(/*$iv . */$encrypted);
    
        return $encrypted;
        
        /*
		$size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_CBC);
		
		$iv = mcrypt_create_iv($size, MCRYPT_RAND);
		//$iv = mcrypt_create_iv($size, MCRYPT_DEV_URANDOM);
		
		$text .= chr(3).chr(3).chr(3);

		return bin2hex(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $password, $text, MCRYPT_MODE_ECB, $iv));
		*/
	}

	public static function Common_AES_Decrypt($data, $key="", $method='AES-256-CBC')
	{
        $data = base64_decode($data);
        //$ivSize = openssl_cipher_iv_length($method);
        //$iv = substr($data, 0, $ivSize);
        $data = @openssl_decrypt(/*substr($data, $ivSize)*/$data, $method, $key, OPENSSL_RAW_DATA/*, $iv*/);
    
        return $data;
        
        /*
		$size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_CBC);

		$iv = mcrypt_create_iv($size, MCRYPT_RAND);
		//$iv = mcrypt_create_iv($size, MCRYPT_DEV_URANDOM);

		preg_match('/([\x20-\x7E]*)/',mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $password, pack("H*", $encrypted_text), MCRYPT_MODE_ECB, $iv), $a);
		return $a[0];
		*/
	}

}

?>
