<?php
/* Don't remove this line. */
//require('../../../../wp-blog-header.php');
//include get_template_directory() . 'lib/extras.php';
require('../../../../wp-blog-header.php');
require_once("../../../../wp-config.php");
require_once("../../../../wp-includes/wp-db.php");

// Load WP components, no themes
define('WP_USE_THEMES', false);
require('../../../../wp-load.php');

if(!empty($_GET["file"]) && !empty($_GET["pageid"])){
    // Get parameters
    $file_id = urldecode($_GET["file"]); // Decode URL-encoded string
	
	$page_id = urldecode($_GET["pageid"]); // Decode URL-encoded string
	
	$access_service_roles = get_field('access_service_code_with_role', $page_id);
	
	//echo '<p>Session start</p>';
	
	//var_dump($_SESSION['accessRight']);
	
	//echo '<p>Session end</p>';
	
	if(checkPageAccessRight($page_id) || empty($access_service_roles)){ //check media url when user have page access right
		
		$filepath = wp_get_attachment_url( $file_id );
		
		$destination_path = parse_url($filepath, PHP_URL_PATH);
		
		$destination_path = $_SERVER['DOCUMENT_ROOT'].$destination_path;
		
		/* Figure out the MIME type (if not specified) */
		$known_mime_types=array(
			"pdf" => "application/pdf",
			"txt" => "text/plain",
			"html" => "text/html",
			"htm" => "text/html",
			"exe" => "application/octet-stream",
			"zip" => "application/zip",
			"doc" => "application/msword",
			"ppt" => "application/vnd.ms-powerpoint",
			"xls" => "application/vnd.ms-excel",
			'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'pptx' => 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
			'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			"gif" => "image/gif",
			"png" => "image/png",
			"jpeg"=> "image/jpg",
			"jpg" =>  "image/jpg",
			"php" => "text/plain",
		);
		 
		if($mime_type==''){
			$file_extension = strtolower(substr(strrchr($destination_path,"."),1));
			if(array_key_exists($file_extension, $known_mime_types)){
				$mime_type=$known_mime_types[$file_extension];
			} else {
				$mime_type="application/force-download";
			};
		};
		
		// Process download
		if(file_exists($destination_path)) {
			header('Content-Description: File Transfer');
			header('Content-Type: '.$mime_type);
			header('Content-Disposition: attachment; filename="'.basename($destination_path).'"');
			header('Expires: 0');
			header('Cache-Control: must-revalidate');
			header('Pragma: public');
			header('Content-Length: ' . filesize($destination_path));
			
			flush(); // Flush system output buffer
			readfile($destination_path);
			//echo 'destination_path: '.$destination_path;
		}
	}else{
		echo '<p>You do not have access right for this file.</p>';
		exit;
	}
}else{
	echo '<p>You do not have access right for this file.</p>';
	exit;
}
?>
<html> 
<body>
<script>
	//window.open('', '_self', '');
	//window.close();
</script>
</body> 
</html> 