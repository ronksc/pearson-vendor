<?php
/**
 * Clean up the_excerpt()
 */
//echo '<p>this is extras.php</p>'; 
 
function roots_excerpt_more() {
  return ' &hellip; <a href="' . get_permalink() . '">' . __('Continued', 'roots') . '</a>';
}
add_filter('excerpt_more', 'roots_excerpt_more');

//* Redirect Resource Archive Page to Homepage
add_action( 'template_redirect', 'wpse_128636_redirect_post' );

function wpse_128636_redirect_post() {
  $queried_post_type = get_query_var('post_type');
  if ( is_single() && 'resource' ==  $queried_post_type || is_single() && 'resourcelist' ==  $queried_post_type ) {
    wp_redirect( home_url(), 301 );
    exit;
  }
}

function wpsax_filter_option( $value, $option_name ) {
    $defaults = array(
        /**
         * Type of SAML connection bridge to use.
         *
         * 'internal' uses OneLogin bundled library; 'simplesamlphp' uses SimpleSAMLphp.
         *
         * Defaults to SimpleSAMLphp for backwards compatibility.
         *
         * @param string
         */
        'connection_type' => 'internal',
        /**
         * Configuration options for OneLogin library use.
         *
         * See comments with "Required:" for values you absolutely need to configure.
         *
         * @param array
         */
        'internal_config'        => array(
            // Validation of SAML responses is required.
            'strict'       => true,
            'debug'        => defined( 'WP_DEBUG' ) && WP_DEBUG ? true : false,
            'baseurl'      => home_url(),
            'sp'           => array(
                'entityId' => 'urn:' . parse_url( home_url(), PHP_URL_HOST ),
                'assertionConsumerService' => array(
                    'url'  => home_url(),
                    'binding' => 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
                ),
            ),
            'idp'          => array(
                // Required: Set based on provider's supplied value.
                'entityId' => 'https://ptcheckweb.pprod4.ilongman.com',
                'singleSignOnService' => array(
                    // Required: Set based on provider's supplied value.
                    'url'  => 'https://iam-stage.pearson.com:443/auth/SSORedirect/metaAlias/pearson/idp',
                    'binding' => 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
                ),
                'singleLogoutService' => array(
                    // Required: Set based on provider's supplied value.
                    'url'  => 'https://iam-stage.pearson.com:443/auth/IDPSloRedirect/metaAlias/pearson/idp',
                    'binding' => 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
                ),
                // Required: Contents of the IDP's public x509 certificate.
                // Use file_get_contents() to load certificate contents into scope.
                'x509cert' => '',
                // Optional: Instead of using the x509 cert, you can specify the fingerprint and algorithm.
                'certFingerprint' => '9bbec676cff86935b1d803596c96f1e697fdbff0',
                'certFingerprintAlgorithm' => '',
            ),
        ),
        /**
         * Path to SimpleSAMLphp autoloader.
         *
         * Follow the standard implementation by installing SimpleSAMLphp
         * alongside the plugin, and provide the path to its autoloader.
         * Alternatively, this plugin will work if it can find the
         * `SimpleSAML_Auth_Simple` class.
         *
         * @param string
         */
        'simplesamlphp_autoload' => dirname( __FILE__ ) . '/simplesamlphp/lib/_autoload.php',
        /**
         * Authentication source to pass to SimpleSAMLphp
         *
         * This must be one of your configured identity providers in
         * SimpleSAMLphp. If the identity provider isn't configured
         * properly, the plugin will not work properly.
         *
         * @param string
         */
        'auth_source'            => 'default-sp',
        /**
         * Whether or not to automatically provision new WordPress users.
         *
         * When WordPress is presented with a SAML user without a
         * corresponding WordPress account, it can either create a new user
         * or display an error that the user needs to contact the site
         * administrator.
         *
         * @param bool
         */
        'auto_provision'         => true,
        /**
         * Whether or not to permit logging in with username and password.
         *
         * If this feature is disabled, all authentication requests will be
         * channeled through SimpleSAMLphp.
         *
         * @param bool
         */
        'permit_wp_login'        => true,
        /**
         * Attribute by which to get a WordPress user for a SAML user.
         *
         * @param string Supported options are 'email' and 'login'.
         */
        'get_user_by'            => 'email',
        /**
         * SAML attribute which includes the user_login value for a user.
         *
         * @param string
         */
        'user_login_attribute'   => 'uid',
        /**
         * SAML attribute which includes the user_email value for a user.
         *
         * @param string
         */
        'user_email_attribute'   => 'mail',
        /**
         * SAML attribute which includes the display_name value for a user.
         *
         * @param string
         */
        'display_name_attribute' => 'display_name',
        /**
         * SAML attribute which includes the first_name value for a user.
         *
         * @param string
         */
        'first_name_attribute' => 'first_name',
        /**
         * SAML attribute which includes the last_name value for a user.
         *
         * @param string
         */
        'last_name_attribute' => 'last_name',
        /**
         * Default WordPress role to grant when provisioning new users.
         *
         * @param string
         */
        'default_role'           => get_option( 'default_role' ),
    );
    $value = isset( $defaults[ $option_name ] ) ? $defaults[ $option_name ] : $value;
    return $value;
}
add_filter( 'wp_saml_auth_option', 'wpsax_filter_option', 10, 2 );

function is_url_exist($url){
    $ch = curl_init($url);    
    curl_setopt($ch, CURLOPT_NOBODY, true);
    curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if($code == 200){
       $status = true;
    }else{
      $status = false;
    }
    curl_close($ch);
   return $status;
}

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}


function my_sort_slug($a, $b)
{
	if ($a->slug == $b->slug) return 0;
	return ($a->slug < $b->slug) ? -1 : 1;
}

add_action( 'wp_ajax_create-zip', 'create_zip' );
// We allow non-logged in users to access our pagination
add_action( 'wp_ajax_nopriv_create-zip', 'create_zip' );

function create_zip(){
	global $wpdb;
	$overwrite = true;
	$filepath = $_POST['filepaths'];
	$files = explode(',', $filepath);
	
	/*$filepath = wp_get_attachment_url( $file_id );
	
	$destination_path = parse_url($filepath, PHP_URL_PATH);
	
	$destination_path = $_SERVER['DOCUMENT_ROOT'].$destination_path;*/
	
	if(extension_loaded('zip')){
		$zip = new ZipArchive(); // Load zip library 
		
		date_default_timezone_set("Asia/Hong_Kong"); //Asia/Hong_Kong
		$current_date_time = date("Y-m-d-H-i-s");
		
        $zip_name = $_POST['zipname'].'-'.$current_date_time.'-'.generateRandomString().".zip";
		
		//$destination_path = parse_url('http://local.pearson-master.com/wp-content/uploads/zip/', PHP_URL_PATH);
		$destination_path = '/wp-content/uploads/zip/';
		
		$zip_name = $_SERVER['DOCUMENT_ROOT'].$destination_path.$zip_name;
		
		$result = $zip->open($zip_name, ZIPARCHIVE::CREATE | ZIPARCHIVE::OVERWRITE);
		
		if($result === TRUE){
			if(is_array($files)) {
			  foreach($files as $file) {
				//$file_path = parse_url($file, PHP_URL_PATH);
				//$file_root_path = $_SERVER['DOCUMENT_ROOT'].$file_path;
				//$onlyfilename = substr(strrchr($file_root_path, "/"), 1);
				
				$filepath = wp_get_attachment_url( $file );	
				$destination_path = parse_url($filepath, PHP_URL_PATH);				
				$destination_path = $_SERVER['DOCUMENT_ROOT'].$destination_path;
				$onlyfilename = substr(strrchr($destination_path, "/"), 1);
				
			  
				 if(file_exists($destination_path)) {
					$zip->addFile( $destination_path, $onlyfilename );
				 }
			  }
			}
			
			if ($zip->close() === false) {
				exit("Error creating ZIP file");
			};
			
			$zipfile = $zip_name;
			
			if (file_exists($zipfile)) {
				/*header('Content-Description: File Transfer');
				header('Content-Type: application/octet-stream');
				header('Content-Disposition: attachment; filename='.basename($zipfile));
				header('Expires: 0');
				header('Cache-Control: must-revalidate');
				header('Pragma: public');
				header('Content-Length: ' . filesize($zipfile));
				ob_clean();
				flush();
				readfile($zipfile);*/
				$zipfile_path_arr = explode("/",$zipfile);
				$output = array_slice($zipfile_path_arr, -4, 4);
				$output = $_SERVER['SERVER_NAME'].'/'.implode('/',$output);
				echo $output;
				exit;
			}
		}else{
			$error .=  "* Sorry ZIP creation failed at this time<br/>";
		}
	}else{
		echo 'no zip function in php';
	}
	
	exit();
}

//Commented on 20181005, updated on 20190226
add_action( 'wp_ajax_ajaxDownload', 'ajaxDownload' );
add_action( 'wp_ajax_nopriv_ajaxDownload', 'ajaxDownload' );

function ajaxDownload(){

	if (isset($_POST['file'])) {
		$file_id = $_POST['file'];
	}else{
		exit();
	}
	
	if (isset($_POST['pageid'])) {
		$page_id = $_POST['pageid'];
	}else{
		exit();
	}
	
	if (isset($_POST['sessionid'])) {
		//$SSID = $_POST['sessionid'];
		
		session_id($_POST['sessionid']);
		session_start();
	}else{
		exit();
	}
	$access_service_roles = get_field('access_service_code_with_role', $page_id);
	
	if(checkPageAccessRight($page_id) || empty($access_service_roles)){ //check media url when user have page access right
	//if(checkPageAccessRight($page_id)){
		
		$filepath = wp_get_attachment_url( $file_id );
		
		$destination_path = parse_url($filepath, PHP_URL_PATH);
		
		$destination_path = $_SERVER['DOCUMENT_ROOT'].$destination_path;
		
		// Process download
		if(file_exists($destination_path)) {
		
			$destination_path_arr = explode("/",$destination_path);
			
			$output = array_slice($destination_path_arr, -5, 5);
			
			$output = $_SERVER['SERVER_NAME'].'/'.implode('/',$output);
			
			echo $output;
			
			exit();
		}
	}
	exit();
}

//Added by Ron on 20190404
function getFileDownloadLink($downloadID, $pageID){
	//"'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$page_id.'"
	
	$link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http").'://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadID.'&pageid='.$pageID;
	
	return $link;
}

function standardizeArray($array, $column){
	$result = array();
	
	foreach($array as $array_item){
		$value = $array_item->$column;
		//echo $value;
		array_push($result, $value);
	}

	return $result;
}

function get_header_banner(){
	$frontpage_id = get_option( 'page_on_front' );

	if(have_rows('global_top_banner', $frontpage_id)):
		
		while(have_rows('global_top_banner', $frontpage_id)):the_row();
		
			if(get_row_layout() == "image"):
			
				$image = get_sub_field('image');
				$link = get_sub_field('link');
				$link_target = get_sub_field('link_target'); 
				
				echo '<div class="container-fluid">';
				echo '<div class="top-banner-container" style="background-image:url('.$image['url'].');">';
				if(!empty($link)){ 
					echo '<a href="'.$link.'" target="'.$link_target.'">';
				}
				echo '<img src="'.$image['url'].'" class="img-responsive hidden-xs hidden-sm hidden-md hidden-lg" />';
				if(!empty($link)){ 
					echo '</a>';
				}
				echo '</div>';
				echo '</div>';
					
			endif;
			
		endwhile;
	
	endif;
}

function get_main_download_file_type($resource_id){
	
	if( have_rows('downloads', $resource_id) ){
		while( have_rows('downloads', $resource_id) ): the_row();

			$downloadable_file = get_sub_field('downloadable_file');
			
			$set_as_main_download_file = get_sub_field('set_as_main_download_file');
			
			if($set_as_main_download_file){

				$filename = array_pop(explode('/', $downloadable_file['url']));

				$filetype = wp_check_filetype($filename);
				
				return $filetype['ext'];
			}
			
		endwhile;
	}
}

function getDownload_count($resource_id){
	$download_count = 0;
	if( have_rows('downloads', $resource_id) ){
		while( have_rows('downloads', $resource_id) ): the_row();
			$preview_only = get_sub_field('preview_only');
			
			if(!$preview_only){
				$download_count++;
			}
		endwhile;
	}
	
	return $download_count;
}

function filetype_thumbnail($filetype, $resource_type){
	switch($filetype){
		case 'doc':
		case 'gif':
		case 'html':
		case 'jpg':
		case 'mov':
		case 'mp4':
		case 'mpg':
		case 'pdf':
		case 'png':
		case 'ppt':
		case 'wav':
		case 'xls':
		case 'zip':
		case 'flv':
			$imgfile = $filetype.'.svg';
			break;
		default:		
			if($resource_type == 'video-file'){
				$imgfile = 'video.svg';
			}else if($resource_type == 'audio-file'){
				$imgfile = 'audio.svg';
			}else{
				$imgfile = 'default-file.svg';				
			}
			break;
	}
	
	return $imgfile;
}

function get_file_thumbnail_listing($file_type, $file_extension, $downloadable_file, $file_title, $page_id){
	$thumbnail_link = '';

	switch($file_extension){
		case 'doc':
		case 'docx':
		case 'gif':
		case 'html':
		case 'jpg':
		case 'mov':
		case 'mp4':
		case 'mpg':
		case 'pdf':
		case 'png':
		case 'ppt':
		case 'pptx':
		case 'wav':
		case 'xls':
		case 'zip':
		case 'flv':
			//$thumbnail_link = '<a href="'.get_template_directory_uri().'/templates/download.php?file='.$downloadable_file['ID'].'&pageid='.$page_id.'" class="media-file '.$file_extension.'" target="_blank" title="'.$file_title.'">'.$file_title.'</a>';
			//Commented on 20181005
			//$thumbnail_link = '<a href="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$page_id.'" class="media-file '.$file_extension.'" target="_blank" title="'.$file_title.'">'.$file_title.'</a>';
			
			
			$thumbnail_link = '<a href="'.getFileDownloadLink($downloadable_file['ID'], $page_id).'" class="media-file '.$file_extension.'" target="_blank" title="'.$file_title.'">'.$file_title.'</a>';
			break;
		default:		
			if($file_type == 'video'){
				//$thumbnail_link = '<a href="'.get_template_directory_uri().'/templates/download.php?file='.$downloadable_file['ID'].'&pageid='.$page_id.'" class="media-file video" target="_blank" title="'.$file_title.'">'.$file_title.'</a>';
				//Commented on 20181005
				//$thumbnail_link = '<a href="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$page_id.'" class="media-file video" target="_blank" title="'.$file_title.'">'.$file_title.'</a>';
				
				$thumbnail_link = '<a href="'.getFileDownloadLink($downloadable_file['ID'], $page_id).'" class="media-file video" target="_blank" title="'.$file_title.'">'.$file_title.'</a>';
			}else if($file_type == 'wav'){
				//$thumbnail_link = '<a href="'.get_template_directory_uri().'/templates/download.php?file='.$downloadable_file['ID'].'&pageid='.$page_id.'" class="media-file audio" target="_blank" title="'.$file_title.'">'.$file_title.'</a>';
				//Commented on 20181005
				//$thumbnail_link = '<a href="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$page_id.'" class="media-file audio" target="_blank" title="'.$file_title.'">'.$file_title.'</a>';
				$thumbnail_link = '<a href="'.getFileDownloadLink($downloadable_file['ID'], $page_id).'" class="media-file audio" target="_blank" title="'.$file_title.'">'.$file_title.'</a>';
			}else{
				//$thumbnail_link = '<a href="'.get_template_directory_uri().'/templates/download.php?file='.$downloadable_file['ID'].'&pageid='.$page_id.'" class="media-file default-file" target="_blank" title="'.$file_title.'">'.$file_title.'</a>';		
				//Commented on 20181005
				//$thumbnail_link = '<a href="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$page_id.'" class="media-file default-file" target="_blank" title="'.$file_title.'">'.$file_title.'</a>';		
				$thumbnail_link = '<a href="'.getFileDownloadLink($downloadable_file['ID'], $page_id).'" class="media-file default-file" target="_blank" title="'.$file_title.'">'.$file_title.'</a>';		
			}
			break;	
	}
	
	return $thumbnail_link;
}

function showGridThumbnail($resource_id, $resource_thumbnail, $resource_type, $popup_image, $popup_url,$resource_slug){
	$path = get_stylesheet_directory_uri()."/assets/img/common/grid-view/";
	$filetype = get_main_download_file_type($resource_id);
	//echo '<p>filetype: '.$filetype.'</p>';

	if(!empty($resource_thumbnail)){
		switch ($resource_type) {
			case "single-file":
			case "multiple-file":
			case "audio-file":
				echo '<div class="thumb" style="background-image:url('.$resource_thumbnail.')"><img src="'.$path.'grid-view-spacer.png" class="img-responsive" /></div>';
				break;
			case "image-file":
				if(!empty($popup_image)){
					echo '<a href="'.$popup_image.'" data-fancybox class="thumb thumb_image" style="background-image:url('.$resource_thumbnail.')"><img src="'.$path.'grid-view-spacer.png" class="img-responsive" /></a>';
				}else{
					echo '<div class="thumb" style="background-image:url('.$resource_thumbnail.')"><img src="'.$path.'grid-view-spacer.png" class="img-responsive" /></div>';
				}
				break;
			case "video-file":
				if(!empty($popup_url)){
					echo '<a data-fancybox href="'.$popup_url.'" class="thumb thumb_video" style="background-image:url('.$resource_thumbnail.')"><img src="'.$path.'grid-view-spacer.png" class="img-responsive" /></a>';
				}else{
					echo '<div class="thumb" style="background-image:url('.$resource_thumbnail.')"><img src="'.$path.'grid-view-spacer.png" class="img-responsive" /></div>';
				}
				break;
			case "interactive-file":
				if(!empty($popup_url)){
					echo '<a href="'.$popup_url.'" target="_blank" class="thumb thumb_interactive" style="background-image:url('.$resource_thumbnail.')"><img src="'.$path.'grid-view-spacer.png" class="img-responsive" /></a>';
				}else{
					echo '<div class="thumb" style="background-image:url('.$resource_thumbnail.')"><img src="'.$path.'grid-view-spacer.png" class="img-responsive" /></div>';
				}
				break;
			case "article-file":
				echo '<a href="javascript:;" data-fancybox data-src="#'.$resource_slug.'-content" class="thumb thumb_article" style="background-image:url('.$resource_thumbnail.')"><img src="'.$path.'grid-view-spacer.png" class="img-responsive" /></a>';
				break;
		}
	}else{	
		switch ($resource_type) {
			case "single-file":
			case "multiple-file":
				echo '<div class="thumb" style="background-image:url('.$path.$resource_type.'.svg)"><img src="'.$path.'grid-view-spacer.png" class="img-responsive" /></div>';
				break;
			case "image-file":
				if(!empty($popup_image)){
					echo '<a href="'.$popup_image.'" data-fancybox class="thumb" style="background-image:url('.$path.filetype_thumbnail($filetype, $resource_type).')"><img src="'.$path.'grid-view-spacer.png" class="img-responsive" /></a>';
				}else{
					echo '<div class="thumb" style="background-image:url('.$path.filetype_thumbnail($filetype).'"><img src="'.$path.'grid-view-spacer.png" class="img-responsive" /></div>';
				}
				break;
			case "video-file":
				if(!empty($popup_url)){
					echo '<a data-fancybox href="'.$popup_url.'" class="thumb" style="background-image:url('.$path.filetype_thumbnail($filetype, $resource_type).')"><img src="'.$path.'grid-view-spacer.png" class="img-responsive" /></a>';
				}else{
					echo '<div class="thumb" style="background-image:url('.$path.filetype_thumbnail($filetype, $resource_type).')"><img src="'.$path.'grid-view-spacer.png" class="img-responsive" /></div>';
				}
				break;
			case "audio-file":
				echo '<div class="thumb" style="background-image:url('.$path.filetype_thumbnail($filetype, $resource_type).')"><img src="'.$path.'grid-view-spacer.png" class="img-responsive" /></div>';
				break;
			case "interactive-file":
				if(!empty($popup_url)){
					echo '<a href="'.$popup_url.'" target="_blank" class="thumb" style="background-image:url('.$path.filetype_thumbnail($filetype, $resource_type).')"><img src="'.$path.'grid-view-spacer.png" class="img-responsive" /></a>';
				}else{
					echo '<div class="thumb" style="background-image:url('.$path.filetype_thumbnail($filetype, $resource_type).')"><img src="'.$path.'grid-view-spacer.png" class="img-responsive" /></div>';
				}
				break;
			case "article-file":
				echo '<a href="javascript:;" data-fancybox data-src="#'.$resource_slug.'-content" class="thumb" style="background-image:url('.$path.filetype_thumbnail($filetype, $resource_type).')"><img src="'.$path.'grid-view-spacer.png" class="img-responsive" /></a>';
				break;
				
			default:
				echo '<div class="thumb" style="background-image:url('.$path.filetype_thumbnail($filetype, $resource_type).')"><img src="'.$path.'grid-view-spacer.png" class="img-responsive" /></div>';
				break;
		}
	}
}

function showListTitle($resource_id, $resource_type, $popup_image, $popup_url, $resource_slug){
	$resource_display_title = get_field('display_title', $resource_id);
	
	if(empty($resource_display_title)){
		$resource_display_title = get_the_title( $resource_id );
	}

	switch ($resource_type) {
		case "single-file":
		case "multiple-file":
		case "audio-file":
			echo '<span>'.$resource_display_title.'</span>';
			break;
		case "image-file":
			if(!empty($popup_image)){
				echo '<a href="'.$popup_image.'" data-fancybox>'.$resource_display_title.'</a>';
			}else{
				echo $resource_display_title;
			}
			break;
		case "video-file":
			if(!empty($popup_url)){
				echo '<a data-fancybox href="'.$popup_url.'">'.$resource_display_title.'</a>';
			}else{
				echo $resource_display_title;
			}
			break;
		case "interactive-file":
			if(!empty($popup_url)){
				echo '<a href="'.$popup_url.'" target="_blank">'.$resource_display_title.'</a>';
			}else{
				echo $resource_display_title;
			}
			break;
		case "article-file":
			echo '<a href="javascript:;" data-fancybox data-src="#'.$resource_slug.'-content">'.$resource_display_title.'</a>';
			break;
	}
}

function get_audio_preview($downloads){
	$count = is_array( $downloads ) ? count( $downloads ) : 0;
	$audio_url_array = array();
	$previewer = '';
	
	if($count > 1){
		foreach($downloads as $download){
			$file_title = $download['file_title'];
			//$file_type = $download['file_type'];
			$downloadable_file = $download['downloadable_file']['url'];
			$audio_preview = $download['audio_preview'];
			$temp_arr = [];
			
			if($audio_preview){
				$temp_arr['title'] = $file_title;
				$temp_arr['url'] = $downloadable_file;
				array_push($audio_url_array,$temp_arr);
			}
		}
	}else{
		//$file_type = $downloads[0]['file_type'];
		$file_title = $downloads[0]['file_title'];
		$downloadable_file = $downloads[0]['downloadable_file']['url'];
		$audio_preview = $downloads[0]['audio_preview'];
		$temp_arr = [];
		
		if($audio_preview){			
			$temp_arr['title'] = $file_title;
			$temp_arr['url'] = $downloadable_file;
			array_push($audio_url_array,$temp_arr);
		}
	}
	
	if(count($audio_url_array) >= 2){
		$previewer .= '<div class="audio_container two_audio">';
	}else if(count($audio_url_array) == 1){
		$previewer .= '<div class="audio_container">';
	}
	
	if(count($audio_url_array) > 0){
		foreach($audio_url_array as $audio){
			$previewer .= '<div class="audio_playback" data-source="'.$audio['url'].'" data-title="'.$audio['title'].'"></div>';
		}
		$previewer .=  '</div>';
	}
	
	return $previewer;
}

add_action( 'wp_ajax_nopriv_get_resource_pagination', 'get_resource_pagination' );
add_action( 'wp_ajax_get_resource_pagination', 'get_resource_pagination' );
function get_resource_pagination(){
	global $post;
	
	
	
	//$resource_list_id = $_POST['resource_listID'];
	
	$resource_list_temp = $_POST['resource_listID'];
	
	$resource_list_id = explode(",",$resource_list_temp);
	
	$pageID = $_POST['page_id'];
	
	if (isset($_POST['filters'])) {
		$filters = $_POST['filters'];
	}
	
	$filters_arr = explode(',', $filters);	
	$filters_arr = array_values(array_diff( $filters_arr, [0]));
	
	if(count($resource_list_id) > 1){
		$resources = get_multiple_resource_item($pageID);
	}else{
		//$resources = get_field('resources', $resource_list[0]->ID); 
		$resources = get_field('resources', $resource_list_id);
	}
	
	//$resources = get_field('resources', $resource_list_id);
	
	// Pagination variables
	$resource_match_count = 0;
	$resources_per_page  = 40; // How many features to display on each page	
	
	if( $resources ):
			
		foreach ($resources as $resource):
			$resource_id = $resource->ID;
			$term_arr = array();
			
			$terms = get_the_terms( $resource_id, 'resource_category' );
			if ($terms) {
				foreach($terms as $term) {
				  array_push($term_arr,$term->term_id);
				} 
			}
			
			$matched = false;
			
			switch(count($filters_arr)){
				case 1:
					if(in_array($filters_arr[0],$term_arr)){
						$matched = true;
					}
					break;
				case 2:
					if(in_array($filters_arr[0],$term_arr) && in_array($filters_arr[1],$term_arr)){
						$matched = true;
					}
					break;
				case 3:
					if(in_array($filters_arr[0],$term_arr) && in_array($filters_arr[1],$term_arr) && in_array($filters_arr[2],$term_arr)){
						$matched = true;
					}
					break;
				default:
					$matched = true;
					break;
			}
			
			if(!$matched){
				continue; 
			}else{
				$resource_match_count++;
			}
			
		endforeach;
	
	endif;
	
	$pages = ceil( $resource_match_count / $resources_per_page ); 
	
	
	if (isset($_POST['page'])) {
		if($_POST['page'] > $pages || $_POST['page'] == 0){
			$page = 1;
		}else{
			$page = $_POST['page'];
		}
	} else {
		$page = 1;
	}
	
	if($pages > 1): 
	
		if($page > 1):
			echo '<button class="btn_gopage_prev"></button>';
		endif;
		
		echo '<select id="pagination-select">';		
		for($i = 1; $i <= $pages; $i++){
			$selected = '';
			if($i == $page){
				$selected = 'selected="selected"';
			}
			echo '<option value="'.$i.'"'.$selected.'>'.$i.'</option>';
		}		
		echo '</select>';
		echo '<span>/'.$pages.'</span>';
	
		if($page < $pages):
			echo '<button class="btn_gopage_next"></button> ';
		endif;
	
	endif;
	
	die();
}

function get_group_all_resource_item($page_id){
	$resource_lists = get_field('resource_list', $page_id);
	$resource_arr = array();
	
	foreach($resource_lists as $resource_list):
		$resources = get_field('resources', $resource_list->ID); 
		$resource_arr = array_merge($resource_arr, $resources);
	endforeach;
	
	return $resource_arr;
}

function get_multiple_resource_item($page_id){
	$resource_lists = get_field('resource_list', $page_id);
		
	$resource_arr = array();
	
	foreach($resource_lists as $resource_list):
		if(sizeof($resource_lists) > 1){
			if(checkResourceListAccessRight($resource_list->ID)){
				$resources = get_field('resources', $resource_list->ID); 
				$resource_arr = array_merge($resource_arr, $resources);
			}
		}else{
			$resources = get_field('resources', $resource_list->ID); 
			$resource_arr = array_merge($resource_arr, $resources);
		}
	endforeach;
	
	return $resource_arr;
}

function get_all_resource_category($resource_list_id, $filters, $template){
	//echo 'filters: '.$filters;
	//echo 'template: '.$template;
	$category_arr = array();	
	//echo 'filters: '.$filters;
	
	if(isset($filters)){
		//echo 'in filter arr explode';
		$filters_arr = explode(',', $filters);	
		$filters_arr = array_values(array_diff( $filters_arr, [0]));
	}
	
	//print_r($filters_arr);
	
	switch($template){
		case 'resource_grid':
		case 'resource_list':
			//$resources = get_field('resources', $resource_list_id);
			$resources = get_multiple_resource_item($resource_list_id);
			//print_r($resources);
			break;
		case 'all_resource_grid':
		case 'all_resource_list':
			$resources = get_all_resource_page();
			break;
		case 'group_resource_grid':
		case 'group_resource_list':
			$resources = get_group_all_resource_item($resource_list_id);
			break;
	}
	
	//print_r($resources);
	
	$hide_empty_filter = get_field('hide_empty_filter', $resource_list_id);
	
	foreach ($resources as $resource):
		switch($template){
			case 'resource_grid':
			case 'resource_list':
			case 'group_resource_grid':
			case 'group_resource_list':
				$categories = get_the_terms( $resource->ID, 'resource_category');
				break;
			case 'all_resource_grid':
			case 'all_resource_list':
				//echo 'resource->resource_id: '.$resource['resource_id'];
				$categories = get_the_terms( $resource['resource_id'], 'resource_category');
				break;
		}
		//$categories = get_the_terms( $resource->ID, 'resource_category');
		$temp_arr = array();
		
		foreach($categories as $category):
			array_push($temp_arr, $category->term_id);
		endforeach;
		
		if($hide_empty_filter){
		
			$matched = false;
			
			//echo 'count intersect: '.count(array_intersect($filters_arr,$temp_arr));
			
			switch(count($filters_arr)){
				case 1:
					if(count(array_intersect($filters_arr,$temp_arr)) == 1){
						$matched = true;
					}
					break;
				case 2:
					if(count(array_intersect($filters_arr,$temp_arr)) == 2){
						$matched = true;
					}
					break;
				case 3:
					if(count(array_intersect($filters_arr,$temp_arr)) == 3){
						$matched = true;
					}
					break;
				default:
					$matched = true;
					break;
			}
			
			if(!$matched){
				continue; 
			}else{
				$category_arr = array_merge($category_arr, $temp_arr);
			}
		}else{
			$category_arr = array_merge($category_arr, $temp_arr);
		}
		
	endforeach;
	
	$result = array_values(array_unique($category_arr));
	
	return $result;
}

// Hook this function to WordPress' Ajax actions
add_action( 'wp_ajax_nopriv_get_resource_dependence_filter', 'get_resource_dependence_filter' );
add_action( 'wp_ajax_get_resource_dependence_filter', 'get_resource_dependence_filter' );
function get_resource_dependence_filter(){
	global $post;
	$taxonomy_name = 'resource_category';
	
	if(isset($_POST['resource_list_id_data'])){
		$resource_list_id = $_POST['resource_list_id_data'];
	}
	
	if(isset($_POST['pageID'])){
		$pageID = $_POST['pageID'];
	}
	
	if(isset($_POST['parent_filter'])){
		$parent_filter = $_POST['parent_filter'];
	}
	
	if(isset($_POST['filters'])){
		$filters = $_POST['filters'];
		
		$filters_arr = explode(',', $filters);
	}
	
	if(isset($_POST['template'])){
		/*switch($_POST['template']){
			case 'resource_grid':
			case 'resource_list':
			case 'group_resource_grid':
			case 'group_resource_list':
				$all_cat = get_all_resource_category($pageID, $filters, $_POST['template']);
				break;
			case 'all_resource_grid':
			case 'all_resource_list':
				//$all_cat = get_all_resource_category('', $filters, $_POST['template']);	*/
				$all_cat = get_all_resource_category($pageID, $filters, $_POST['template']);
				/*break;
		}*/
	}
	
	//print_r($all_cat);
	
	$resource_list_count = count(get_field('resource_list', $pageID));
	
	if($resource_list_count > 1 || $_POST['template'] == 'all_resource_grid' || $_POST['template'] == 'all_resource_list' || $_POST['template'] == 'group_resource_grid' || $_POST['template'] == 'group_resource_list'){
		$reference_id = $pageID;
	}else{
		$reference_id = $resource_list_id;
	}
	
	$filter_dependence = get_field('filter_dependence', $reference_id);
	if(empty($filter_dependence)){
		$filter_dependence = 0;
	}
	
	$dependence_filter_title = get_field('dependence_filter_title', $reference_id);
	
	$filter_title_1 = get_field('filter_title_1', $reference_id);
	$filter_1 = get_field('filter_1', $reference_id);
	
	
	$filter_title_2 = get_field('filter_title_2', $reference_id);
	$filter_2 = get_field('filter_2', $reference_id);
	
	
	$filter_title_3 = get_field('filter_title_3', $reference_id);
	$filter_3 = get_field('filter_3', $reference_id);
	
	$filter_1_count = is_array( $filter_1 ) ? count( $filter_1 ) : 0;
	$filter_2_count = is_array( $filter_2 ) ? count( $filter_2 ) : 0;
	$filter_3_count = is_array( $filter_3 ) ? count( $filter_3 ) : 0;
	
	
	if($filter_1_count > 0 && !empty($filter_title_1)):
		echo '<div class="filter-item">';
	
		echo '<select id="filter_1" class="resource_filtering" data-filter="1">';
		
		echo '<option value="0">'.$filter_title_1.'</option>';
			foreach($filter_1 as $f1):
				$term = get_term_by('id', $f1, 'resource_category');
				$name = $term->name;
				if (in_array($f1, $all_cat)) {
					echo '<option value="'.$f1.'" '.(($filters_arr[0] == $f1) ? 'selected=selected' : '').'>'.$name.'</option>';
				}
			endforeach;		
		echo '</select>';
		
		echo '</div>';
		
	endif;

	echo '<div class="filter-item" id="filter_2_container">';
	
	if(!$filter_dependence && $filter_2_count > 0 && !empty($filter_title_2)){
	
		echo '<select id="filter_2" class="resource_filtering" data-filter="2">';
		
		echo '<option value="0">'.$filter_title_2.'</option>';
			foreach($filter_2 as $f2):
				$term = get_term_by('id', $f2, 'resource_category');
				$name = $term->name;
				if (in_array($f2, $all_cat)) {
					echo '<option value="'.$f2.'" '.(($filters_arr[1] == $f2) ? 'selected=selected' : '').'>'.$name.'</option>';
				}
			endforeach;	
		echo '</select>';
	}else if($filter_dependence && isset($_POST['parent_filter'])){
		
		$term_children = get_term_children( $parent_filter, $taxonomy_name );
		
		$children = array();
		foreach ($term_children as $child) {
		  $term = get_term_by( 'id', $child, $taxonomy_name );
		  $children[$term->slug] = $term;
		}
		
		usort($children, "my_sort_slug");
		
		if(sizeof($children) > 0){
			echo '<select id="filter_2" class="resource_filtering" data-filter="2">';
			echo '<option value="0">'.$dependence_filter_title.'</option>';
				foreach($children as $f2):
					$name = $f2->name;
					if (in_array($f2->term_id, $all_cat)) {
						echo '<option value="'.$f2->term_id.'" '.(($filters_arr[1] == $f2->term_id) ? 'selected=selected' : '').'>'.$name.'</option>';
					}
				endforeach;	
			echo '</select>';
		}
	}
	
	echo '</div>';
	
	if($filter_3_count > 0 && !empty($filter_title_3)):
	
		echo '<div class="filter-item">';
		
		echo '<select id="filter_3" class="resource_filtering" data-filter="3">';
		echo '<option value="0">'.$filter_title_3.'</option>';
			foreach($filter_3 as $f3):
				$term = get_term_by('id', $f3, 'resource_category');
				$name = $term->name;
				if (in_array($f3, $all_cat)) {
					echo '<option value="'.$f3.'" '.(($filters_arr[2] == $f3) ? 'selected=selected' : '').'>'.$name.'</option>';
				}
				
			endforeach;	
			
		echo '</select>';
		
		echo '</div>';
	
	endif;

	die();
}

// Hook this function to WordPress' Ajax actions
add_action( 'wp_ajax_nopriv_get_resource_grid', 'get_resource_grid' );
add_action( 'wp_ajax_get_resource_grid', 'get_resource_grid' );
function get_resource_grid(){
	if (isset($_POST['page_id'])) {
		$page_id = $_POST['page_id'];
	}
	
	$resource_list = get_field('resource_list', $page_id);
	if(count($resource_list) > 1){
		$resources = get_multiple_resource_item($page_id);
	}else{
		$resources = get_field('resources', $resource_list[0]->ID); 
	}
	
	if (isset($_POST['page'])) {
		// Set $page to data from Ajax, if available
		$page = $_POST['page'];
	} else {
		// ... if not, set default to 1 (for initial page load)
		$page = 1;
	}
	
	if (isset($_POST['filters'])) {
		// Set $page to data from Ajax, if available
		$filters = $_POST['filters'];
	}
	
	$filters_arr = explode(',', $filters);	
	$filters_arr = array_values(array_diff( $filters_arr, [0]));
	
	// Pagination variables
	$resource_count      = 0;
	$resource_match_count = 0;
	$resources_per_page  = 40; // How many features to display on each page
	$total              = is_array( $resources ) ? count( $resources ) : 0;
	//$pages              = ceil( $total / $resources_per_page );
	$min                = ( ( $page * $resources_per_page ) - $resources_per_page ) + 1;
	$max                = ( $min + $resources_per_page ) - 1;
	
	if( $resources ):
		//$i = 1;
		//$resource_list = get_field('resource_list');
		//$resources = get_field('resources', $resource_list[0]->ID);
		
		echo '<div class="resource-container-inner">';
		
		$separator_count = 0;
		
		foreach ($resources as $resource):
			$resource_id = $resource->ID;
			$resource_type = get_field('resource_type', $resource_id);
			$resource_display_title = get_field('display_title', $resource_id);
			$resource_thumbnail = get_the_post_thumbnail_url($resource_id,'full');
			$note = get_field('note', $resource_id);
			$resource_popup_image = get_field('resource_popup_image', $resource_id);
			$resource_popup_url = get_field('resource_popup_url', $resource_id);
			$downloads = get_field('downloads', $resource_id);
			//$download_count = is_array( $downloads ) ? count( $downloads ) : 0;
			$download_count = getDownload_count($resource_id);
			
			$resource_post = get_post($resource_id); 
			$resource_slug = $resource_post->post_name;
			$term_arr = array();
			
			$terms = get_the_terms( $resource_id, 'resource_category' );
			if ($terms) {
				foreach($terms as $term) {
				  //echo '<p>'.$term->term_id.'</p>';
				  array_push($term_arr,$term->term_id);
				} 
			}
			
			$matched = false;
			
			switch(count($filters_arr)){
				case 1:
					if(in_array($filters_arr[0],$term_arr)){
						$matched = true;
					}
					break;
				case 2:
					if(in_array($filters_arr[0],$term_arr) && in_array($filters_arr[1],$term_arr)){
						$matched = true;
					}
					break;
				case 3:
					if(in_array($filters_arr[0],$term_arr) && in_array($filters_arr[1],$term_arr) && in_array($filters_arr[2],$term_arr)){
						$matched = true;
					}
					break;
				default:
					$matched = true;
					break;
			}
			
			if(!$matched){
				continue; 
			}else{
				$resource_match_count++;
			}
			
			$resource_count++;
			// Ignore this feature if $feature_count is lower than $min
			if($resource_count < $min ) { continue; }
			// Stop loop completely if $feature_count is higher than $max
			if($resource_count > $max) { break; } 
	?>
	
			<div class="col-xs-6 col-sm-3 col-md-3 resource-item">
				<div class="resource-thumbnail">
					<?php
						echo showGridThumbnail($resource_id, $resource_thumbnail, $resource_type, $resource_popup_image['url'], $resource_popup_url, $resource_slug);
						echo get_audio_preview(get_field('downloads', $resource_id));
					?>
				</div>
				<div class="resource-title-wrapper">
					<div class="resource-title">
						<?php echo showListTitle($resource_id, $resource_type, $resource_popup_image['url'], $resource_popup_url, $resource_slug);?>
					</div>
					<?php if(!empty($note)){ ?>
					<div class="resource-note">
						<a class="icon-note" data-fancybox data-src="#<?=$resource_slug.'-note'?>" href="javascript:;"></a>
						<div id="<?=$resource_slug.'-note'?>" class="hidden-content fancybox-content file-download"><?=$note?>	</div>
					</div>
					<?php } ?>
				</div>
				<!--<div class="resource-type">File Downlaod</div>-->
				<div class="resource-download-wrapper">
					<?php
						if($download_count > 1){ ?>
							<div class="multiple_download hidden-xs hidden-sm">
								<div class="multiple_dl_header"><span><?=__('Download', 'Pearson-master');?> (<?=$download_count?>)</span></div>
								<div class="multiple_dl_content">
									<ul>
									<?php	
									$downloadable_file_arr = array();
									
									if( have_rows('downloads', $resource_id) ){
										while( have_rows('downloads', $resource_id) ): the_row();
											$file_title = get_sub_field('file_title');
											$downloadable_file = get_sub_field('downloadable_file');
											$preview_only = get_sub_field('preview_only');
											//echo '<li><a href="'.$downloadable_file['url'].'" target="_blank">'.$file_title.'</a></li>';
											
											if(!$preview_only){
												//echo '<li><a href="'.get_template_directory_uri().'/templates/download.php?file='.$downloadable_file['ID'].'&pageid='.$page_id.'" target="_blank">'.$file_title.'</a></li>';
												
												//Commented on 20181005
												//echo '<li><a href="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$page_id.'" target="_blank">'.$file_title.'</a></li>';
												
												echo '<li><a href="'.getFileDownloadLink($downloadable_file['ID'], $page_id).'" target="_blank">'.$file_title.'</a></li>';
												
												array_push($downloadable_file_arr, $downloadable_file['ID']);
											}
											
											unset($file_title);
											unset($downloadable_file);
											//unset($file_type);
											unset($preview_only);
										endwhile;
										
										$downloadable_file_string = implode(',',$downloadable_file_arr);
										
										echo '<li><a href="javascript:;" data-file="'.$downloadable_file_string.'" data-filename="download" class="createzip">'.__('Download All', 'Pearson-master').' ('.$download_count.__(' files', 'Pearson-master').')</a></li>';
									}?>
									</ul>
								</div>
							</div>
							
							<?php
							if( current_user_can('manage_options') ):
								$resource_link = get_edit_post_link( $resource_id );
								echo '<a href="'.$resource_link.'" class="btn_resource_edit edit_element">Edit</a>';
							endif;
							?>
							
							<div class="hidden-md hidden-lg">
								<div class="mobile_download_wrapper">								
									<?php 
									if( have_rows('downloads', $resource_id) ){
										
										echo '<select class="mobile_download">';
										echo '<option value="default">Please select</option>';
									
										while( have_rows('downloads', $resource_id) ): the_row();
											$file_title = get_sub_field('file_title');
											$downloadable_file = get_sub_field('downloadable_file');
											$file_type = get_sub_field('file_type');
											$preview_only = get_sub_field('preview_only');
											
											if(!$preview_only){
												//echo '<a href="'.$downloadable_file['url'].'" class="media-file '.$file_type.'" target="_blank">'.$file_title.'</a>';
												
												//echo '<option value="'.get_template_directory_uri().'/templates/download.php?file='.$downloadable_file['ID'].'&pageid='.$page_id.'">'.$file_title.'</option>';
												//Commented on 20181005
																					
												//echo '<option value="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$page_id.'">'.$file_title.'</option>';
												
												echo '<option value="'.getFileDownloadLink($downloadable_file['ID'], $page_id).'">'.$file_title.'</option>';
											}
											
											unset($file_title);
											unset($downloadable_file);
											unset($file_type);
											unset($preview_only);
										endwhile;
										
										echo '</select>';
										echo '<div class="download_text">'.__('Download', 'Pearson-master').' ('.$download_count.')</div>';
									}
									?>
								</div>
							</div>
					<?php
						}else{
							if( have_rows('downloads', $resource_id) ){
								while( have_rows('downloads', $resource_id) ): the_row();
									$downloadable_file = get_sub_field('downloadable_file');
									$preview_only = get_sub_field('preview_only');
									
									if(!$preview_only){
										//echo '<a href="'.$downloadable_file['url'].'" class="btn_single_download" target="_blank">Download</a>';
										//echo '<a href="'.get_template_directory_uri().'/templates/download.php?file='.$downloadable_file['ID'].'&pageid='.$page_id.'" class="btn_single_download" target="_blank">'.__('Download', 'Pearson-master').'</a>';
										//Commented on 20181005
										//echo '<a href="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$page_id.'" class="btn_single_download" target="_blank">'.__('Download', 'Pearson-master').'</a>';
										
										echo '<a href="'.getFileDownloadLink($downloadable_file['ID'], $page_id).'" class="btn_single_download" target="_blank">'.__('Download', 'Pearson-master').'</a>';
									}
									
									unset($downloadable_file);
									unset($preview_only);
								endwhile;
							}
							
							if( current_user_can('manage_options') ):
								$resource_link = get_edit_post_link( $resource_id );
								echo '<a href="'.$resource_link.'" class="btn_resource_edit edit_element">Edit</a>';
							endif;
						}
					?>
				</div>
				<?php if($resource_type == 'article-file') {?>
				<div id="<?=$resource_slug.'-content'?>" class="hidden-content fancybox-content article-lightbox">
					<h3><?=$resource_display_title;?></h3>
					<div class="article-content">
						<div class="media-container">
							<?php 
							if( have_rows('downloads', $resource_id) ){
								while( have_rows('downloads', $resource_id) ): the_row();
									$file_title = get_sub_field('file_title');
									$downloadable_file = get_sub_field('downloadable_file');
									$file_type = get_sub_field('file_type');
									$file_extension = strtolower(substr(strrchr($downloadable_file['url'],"."),1));
									$preview_only = get_sub_field('preview_only');

									if(!$preview_only){
										echo get_file_thumbnail_listing($file_type, $file_extension, $downloadable_file, $file_title, $page_id);
									}
									
									unset($file_title);
									unset($downloadable_file);
									unset($file_type);
									unset($file_extension);
									unset($preview_only);
								endwhile;
							}							
							?>
						</div>
						<div class="clearfix">
							<?php if(!empty($resource_thumbnail)){ ?>

							<div class="img-container"><img src="<?=$resource_thumbnail?>" class="img-responsive" /></div>
							<?php } ?>
							<div class="content-container">
								<?php 
									$content_post = get_post($resource_id);
									$article_content = $content_post->post_content;
									$article_content = apply_filters('the_content', $article_content);
									echo $article_content;
								?>
							</div>
						</div>
					</div>
				</div>
				<?php } ?>
			</div>
	<?php 
			$separator_count++;
					
			if($separator_count%2 == 0 && $separator_count != 0){
				echo '<div class="clearfix hidden-sm hidden-md hidden-lg hidden-xl"></div>';
			}
			
			if($separator_count%4 == 0 && $separator_count != 0){
				echo '<div class="clearfix hidden-xs"></div>';
			}
			
		endforeach;
		
		if($resource_match_count == 0){
			echo '<p>'.__('No resources found. Please refine your filter(s).', 'Pearson-master').'</p>';
		}
	
		echo '</div>'; 
	endif; //end if ($features)
	wp_reset_postdata();
	
	die();
}

function get_all_resource_page(){
	$args = [
		'post_type' => 'page',
		'fields' => 'ids',
		'nopaging' => true,
		'meta_key' => '_wp_page_template',
		'meta_value' => array('template-resource.php','template-resource-list.php', 'template-group-resource.php', 'template-group-resource-list.php'),
		'hierarchical' => 0,
		'suppress_filters' => false
	];
	
	$all_resources = [];
	
	$check_resources_exist = [];
	
	$all_resources_pages = get_posts( $args );
	foreach ( $all_resources_pages as $resources_page ):
		$temp_arr = [];
		
		if(checkPageAccessRight($resources_page)):
			
			$temp_resource_lists = get_field('resource_list', $resources_page);
			//$temp_resource_list_count = is_array( $temp_resource_list ) ? count( $temp_resource_list ) : 0;
			foreach($temp_resource_lists as $temp_resource_list):
				$temp_resources = get_field('resources', $temp_resource_list->ID);
				
				if(!empty($temp_resources)):
				
					foreach($temp_resources	as $key => $temp_resource):
					
						if(!in_array($temp_resource->ID, $check_resources_exist)){
					
							$temp_arr['pageid'] = $resources_page;
							
							$temp_arr['resource_id'] = $temp_resource->ID;
							
							array_push($check_resources_exist, $temp_resource->ID);
							
							array_push($all_resources, $temp_arr);
							
						}
						
					endforeach;
					
				endif;
				
			endforeach;
		
		endif;
		
	endforeach;
	
	return $all_resources;
}

add_action( 'wp_ajax_nopriv_get_all_resource_pagination', 'get_all_resource_pagination' );
add_action( 'wp_ajax_get_all_resource_pagination', 'get_all_resource_pagination' );
function get_all_resource_pagination(){
	global $post;
	
	//$resource_list_id = $_POST['resource_listID'];
	
	if (isset($_POST['filters'])) {
		$filters = $_POST['filters'];
	}
	
	$filters_arr = explode(',', $filters);	
	$filters_arr = array_values(array_diff( $filters_arr, [0]));
	
	//$resources = get_field('resources', $resource_list_id);
	
	// Pagination variables
	$resource_match_count = 0;
	$resources_per_page  = 40; // How many features to display on each page	
	
	$all_resources = get_all_resource_page();
	
	if( $all_resources ):
			
		foreach ($all_resources as $resource):
			$resource_id = $resource->ID;
			$term_arr = array();
			
			$terms = get_the_terms( $resource_id, 'resource_category' );
			if ($terms) {
				foreach($terms as $term) {
				  array_push($term_arr,$term->term_id);
				} 
			}
			
			$matched = false;
			
			switch(count($filters_arr)){
				case 1:
					if(in_array($filters_arr[0],$term_arr)){
						$matched = true;
					}
					break;
				case 2:
					if(in_array($filters_arr[0],$term_arr) && in_array($filters_arr[1],$term_arr)){
						$matched = true;
					}
					break;
				case 3:
					if(in_array($filters_arr[0],$term_arr) && in_array($filters_arr[1],$term_arr) && in_array($filters_arr[2],$term_arr)){
						$matched = true;
					}
					break;
				default:
					$matched = true;
					break;
			}
			
			if(!$matched){
				continue; 
			}else{
				$resource_match_count++;
			}
			
		endforeach;
	
	endif;
	
	$pages = ceil( $resource_match_count / $resources_per_page ); 
	
	
	if (isset($_POST['page'])) {
		if($_POST['page'] > $pages || $_POST['page'] == 0){
			$page = 1;
		}else{
			$page = $_POST['page'];
		}
	} else {
		$page = 1;
	}
	
	if($pages > 1): 
	
		if($page > 1):
			echo '<button class="btn_gopage_prev"></button>';
		endif;
		
		echo '<select id="pagination-select">';		
		for($i = 1; $i <= $pages; $i++){
			$selected = '';
			if($i == $page){
				$selected = 'selected="selected"';
			}
			echo '<option value="'.$i.'"'.$selected.'>'.$i.'</option>';
		}		
		echo '</select>';
		echo '<span>/'.$pages.'</span>';
	
		if($page < $pages):
			echo '<button class="btn_gopage_next"></button> ';
		endif;
	
	endif;
	
	die();
}

add_action( 'wp_ajax_nopriv_get_all_resources_grid', 'get_all_resources_grid' );
add_action( 'wp_ajax_get_all_resources_grid', 'get_all_resources_grid' );
function get_all_resources_grid(){
	global $post;
	
	/*if ($post->ID) {
		// On initial page load, just grab the post ID...
		//$page_id = $post->ID;
		$resource_list_id = get_field('resource_list',$post->ID);
	} else {
		// ... but once you're using Ajax, need to get the ID via Ajax
		$resource_list_id = $_POST['resource_listID'];
	}*/
	
	if (isset($_POST['page'])) {
		// Set $page to data from Ajax, if available
		$page = $_POST['page'];
	} else {
		// ... if not, set default to 1 (for initial page load)
		$page = 1;
	}
	
	if (isset($_POST['filters'])) {
		// Set $page to data from Ajax, if available
		$filters = $_POST['filters'];
	}
	
	//echo $filters;
	
	$filters_arr = explode(',', $filters);	
	$filters_arr = array_values(array_diff( $filters_arr, [0]));
	
	//print_r($filters_arr);
	
	//$resources = get_field('resources', $resource_list_id);
	
	$all_resources = get_all_resource_page();
	
	//print_r($all_resources);
	
	// Pagination variables
	$resource_count      = 0;
	$resource_match_count = 0;
	$resources_per_page  = 40; // How many features to display on each page
	$total              = is_array( $all_resources ) ? count( $all_resources ) : 0;
	//$pages              = ceil( $total / $resources_per_page );
	$min                = ( ( $page * $resources_per_page ) - $resources_per_page ) + 1;
	$max                = ( $min + $resources_per_page ) - 1;
	
	if( $all_resources ):
		//$i = 1;
		//$resource_list = get_field('resource_list');
		//$resources = get_field('resources', $resource_list[0]->ID);
		
		echo '<div class="resource-container-inner">';
		
		$separator_count = 0;
		
		foreach ($all_resources as $resource):
			$resource_parent = $resource['pageid'];
			$resource_id = $resource['resource_id'];
			
			$resource_type = get_field('resource_type', $resource_id);
			$resource_display_title = get_field('display_title', $resource_id);
			$resource_thumbnail = get_the_post_thumbnail_url($resource_id,'full');
			$note = get_field('note', $resource_id);
			$resource_popup_image = get_field('resource_popup_image', $resource_id);
			$resource_popup_url = get_field('resource_popup_url', $resource_id);
			$downloads = get_field('downloads', $resource_id);
			//$download_count = is_array( $downloads ) ? count( $downloads ) : 0;
			$download_count = getDownload_count($resource_id);
			
			$resource_post = get_post($resource_id); 
			$resource_slug = $resource_post->post_name;
			$term_arr = array();
			
			$terms = get_the_terms( $resource_id, 'resource_category' );
			if ($terms) {
				foreach($terms as $term) {
				  //echo '<p>'.$term->term_id.'</p>';
				  array_push($term_arr,$term->term_id);
				} 
			}
			
			$matched = false;
			
			switch(count($filters_arr)){
				case 1:
					if(in_array($filters_arr[0],$term_arr)){
						$matched = true;
					}
					break;
				case 2:
					if(in_array($filters_arr[0],$term_arr) && in_array($filters_arr[1],$term_arr)){
						$matched = true;
					}
					break;
				case 3:
					if(in_array($filters_arr[0],$term_arr) && in_array($filters_arr[1],$term_arr) && in_array($filters_arr[2],$term_arr)){
						$matched = true;
					}
					break;
				default:
					$matched = true;
					break;
			}
			
			if(!$matched){
				continue; 
			}else{
				$resource_match_count++;
			}
			
			$resource_count++;
			// Ignore this feature if $feature_count is lower than $min
			if($resource_count < $min ) { continue; }
			// Stop loop completely if $feature_count is higher than $max
			if($resource_count > $max) { break; } 
	?>
	
			<div class="col-xs-6 col-sm-3 col-md-3 resource-item">
				<div class="resource-thumbnail">
					<?php
						echo showGridThumbnail($resource_id, $resource_thumbnail, $resource_type, $resource_popup_image['url'], $resource_popup_url, $resource_slug);
						echo get_audio_preview(get_field('downloads', $resource_id));
					?>
				</div>
				<div class="resource-title-wrapper">
					<div class="resource-title">
						<?php echo showListTitle($resource_id, $resource_type, $resource_popup_image['url'], $resource_popup_url, $resource_slug);?>
					</div>
					<?php if(!empty($note)){ ?>
					<div class="resource-note">
						<a class="icon-note" data-fancybox data-src="#<?=$resource_slug.'-note'?>" href="javascript:;"></a>
						<div id="<?=$resource_slug.'-note'?>" class="hidden-content fancybox-content file-download"><?=$note?>	</div>
					</div>
					<?php } ?>
				</div>
				<div class="resource-type"><?php echo get_the_title($resource_parent);?></div>
				<div class="resource-download-wrapper">
					<?php
						if($download_count > 1){ ?>
							<div class="multiple_download hidden-xs hidden-sm">
								<div class="multiple_dl_header"><span><?=__('Download', 'Pearson-master');?> (<?=$download_count?>)</span></div>
								<div class="multiple_dl_content">
									<ul>
									<?php	
									$downloadable_file_arr = array();
									
									if( have_rows('downloads', $resource_id) ){
										while( have_rows('downloads', $resource_id) ): the_row();
											$file_title = get_sub_field('file_title');
											$downloadable_file = get_sub_field('downloadable_file');
											$preview_only = get_sub_field('preview_only');
											//echo '<li><a href="'.$downloadable_file['url'].'" target="_blank">'.$file_title.'</a></li>';
											
											if(!$preview_only){
												//echo '<li><a href="'.get_template_directory_uri().'/templates/download.php?file='.$downloadable_file['ID'].'&pageid='.$resource_parent.'">'.$file_title.'</a></li>';
												//Commented on 20181005
												//echo '<li><a href="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$resource_parent.'" target="_blank">'.$file_title.'</a></li>';
												
												
												echo '<li><a href="'.getFileDownloadLink($downloadable_file['ID'], $resource_parent).'" target="_blank">'.$file_title.'</a></li>';
												
												
												array_push($downloadable_file_arr, $downloadable_file['ID']);
											}
											
											unset($file_title);
											unset($downloadable_file);
											unset($preview_only);
										endwhile;
										
										$downloadable_file_string = implode(',',$downloadable_file_arr);
										
										echo '<li><a href="javascript:;" data-file="'.$downloadable_file_string.'" data-filename="download" class="createzip">'.__('Download All', 'Pearson-master').' ('.$download_count.__(' files', 'Pearson-master').')</a></li>';
										
										unset($downloadable_file_arr);
										unset($downloadable_file_string);
									}?>
									</ul>
								</div>
							</div>
							
							<?php
							if( current_user_can('manage_options') ):
								$resource_link = get_edit_post_link( $resource_id );
								echo '<a href="'.$resource_link.'" class="btn_resource_edit edit_element">Edit</a>';
							endif;
							?>
							
							<div class="hidden-md hidden-lg">
								<div class="mobile_download_wrapper">
									<?php 
									if( have_rows('downloads', $resource_id) ){
										
										echo '<select class="mobile_download">';
										echo '<option value="default">Please select</option>';
									
										while( have_rows('downloads', $resource_id) ): the_row();
											$file_title = get_sub_field('file_title');
											$downloadable_file = get_sub_field('downloadable_file');
											$file_type = get_sub_field('file_type');
											$preview_only = get_sub_field('preview_only');
											
											if(!$preview_only){
												//Commented on 20181005
												//echo '<option value="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$resource_parent.'">'.$file_title.'</option>';
												
												echo '<option value="'.getFileDownloadLink($downloadable_file['ID'], $resource_parent).'">'.$file_title.'</option>';
											}
											
											unset($file_title);
											unset($downloadable_file);
											unset($file_type);
											unset($preview_only);
										endwhile;
										
										echo '</select>';
										
										echo '<div class="download_text">'.__('Download', 'Pearson-master').' ('.$download_count.')</div>';
									}
									
									if( current_user_can('manage_options') ):
										$resource_link = get_edit_post_link( $resource_id );
										echo '<a href="'.$resource_link.'" class="btn_resource_edit edit_element">Edit</a>';
									endif;
									?>
								</div>
							</div>
					<?php
						}else{
							if( have_rows('downloads', $resource_id) ){
								while( have_rows('downloads', $resource_id) ): the_row();
									$downloadable_file = get_sub_field('downloadable_file');
									$preview_only = get_sub_field('preview_only');
									//echo '<a href="'.$downloadable_file['url'].'" class="btn_single_download" target="_blank">Download</a>';
									if(!$preview_only){
										//echo '<a href="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$resource_parent.'" target="_blank" class="btn_single_download">'.__('Download', 'Pearson-master').'</a>';
										
										echo '<a href="'.getFileDownloadLink($downloadable_file['ID'], $resource_parent).'" target="_blank" class="btn_single_download">'.__('Download', 'Pearson-master').'</a>';
									}
									
									unset($downloadable_file);
									unset($preview_only);
								endwhile;
							}
						}
					?>
				</div>
				<?php if($resource_type == 'article-file') {?>
				<div id="<?=$resource_slug.'-content'?>" class="hidden-content fancybox-content article-lightbox">
					<h3><?=$resource_display_title;?></h3>
					<div class="article-content">
						<div class="media-container">
							<?php 
							if( have_rows('downloads', $resource_id) ){
								while( have_rows('downloads', $resource_id) ): the_row();
									$file_title = get_sub_field('file_title');
									$downloadable_file = get_sub_field('downloadable_file');
									$file_type = get_sub_field('file_type');
									$file_extension = strtolower(substr(strrchr($downloadable_file['url'],"."),1));
									$preview_only = get_sub_field('preview_only');

									if(!$preview_only){
										echo get_file_thumbnail_listing($file_type, $file_extension, $downloadable_file, $file_title, $resource_parent);
									}
									
									unset($file_title);
									unset($downloadable_file);
									unset($file_type);
									unset($file_extension);
									unset($preview_only);
								endwhile;
							}									
							?>
						</div>
						<div class="clearfix">
							<div class="content-container">
								<?php 
									$content_post = get_post($resource_id);
									$article_content = $content_post->post_content;
									$article_content = apply_filters('the_content', $article_content);
									echo $article_content;
								?>
							</div>
						</div>
					</div>
				</div>
				<?php } ?>
			</div>
	<?php 
		
			$separator_count++;
					
			if($separator_count%2 == 0 && $separator_count != 0){
				echo '<div class="clearfix hidden-sm hidden-md hidden-lg hidden-xl"></div>';
			}
			
			if($separator_count%4 == 0 && $separator_count != 0){
				echo '<div class="clearfix hidden-xs"></div>';
			}
		
		endforeach;
		
		if($resource_match_count == 0){
			echo '<p>'.__('No resources found. Please refine your filter(s).', 'Pearson-master').'</p>';
		}
	
		echo '</div>'; 
	endif; //end if ($features)
	wp_reset_postdata();
	
	die();
}

// Hook this function to WordPress' Ajax actions
add_action( 'wp_ajax_nopriv_get_resource_list', 'get_resource_list' );
add_action( 'wp_ajax_get_resource_list', 'get_resource_list' );
function get_resource_list(){
	if (isset($_POST['page_id'])) {
		$page_id = $_POST['page_id'];
	}
	
	$resource_list = get_field('resource_list', $page_id);
	
	//echo 'resource_list: ';
	//print_r($resource_list);
	
	if(count($resource_list) > 1){
		$resources = get_multiple_resource_item($page_id);
	}else{
		$resources = get_field('resources', $resource_list[0]->ID); 
	}
	
	if (isset($_POST['page'])) {
		// Set $page to data from Ajax, if available
		$page = $_POST['page'];
	} else {
		// ... if not, set default to 1 (for initial page load)
		$page = 1;
	}
	
	if (isset($_POST['filters'])) {
		// Set $page to data from Ajax, if available
		$filters = $_POST['filters'];
	}
	
	$filters_arr = explode(',', $filters);	
	$filters_arr = array_values(array_diff( $filters_arr, [0]));
	
	//$resources = get_field('resources', $resource_list_id);
	
	//print_r($resources);
	
	// Pagination variables
	$resource_count      = 0;
	$resource_match_count = 0;
	$resources_per_page  = 40; // How many features to display on each page
	$total              = is_array( $resources ) ? count( $resources ) : 0;
	//$pages              = ceil( $total / $resources_per_page );
	$min                = ( ( $page * $resources_per_page ) - $resources_per_page ) + 1;
	$max                = ( $min + $resources_per_page ) - 1;
	
	if( $resources ):
		//$i = 1;
		//$resource_list = get_field('resource_list');
		//$resources = get_field('resources', $resource_list[0]->ID);
		
		echo '<div class="resource-container-inner">';
		
		echo '<div class="resource-header">';
		echo '<div class="header-item">'.__('Items', 'Pearson-master').'</div>';
		echo '<div class="header-download">'.__('Download', 'Pearson-master').'</div>';
		echo '<div class="header-download-all hidden-xs hidden-sm"></div>';
		echo '</div>';
		
		foreach ($resources as $resource):
			$resource_id = $resource->ID;
			$resource_type = get_field('resource_type', $resource_id);
			$resource_display_title = get_field('display_title', $resource_id);
			$resource_thumbnail = get_the_post_thumbnail_url($resource_id,'full');
			$note = get_field('note', $resource_id);
			$resource_popup_image = get_field('resource_popup_image', $resource_id);
			$resource_popup_url = get_field('resource_popup_url', $resource_id);
			$downloads = get_field('downloads', $resource_id);
			//$download_count = is_array( $downloads ) ? count( $downloads ) : 0;
			$download_count = getDownload_count($resource_id);
			
			$resource_post = get_post($resource_id); 
			$resource_slug = $resource_post->post_name;
			$term_arr = array();
			
			$terms = get_the_terms( $resource_id, 'resource_category' );
			if ($terms) {
				foreach($terms as $term) {
				  //echo '<p>'.$term->term_id.'</p>';
				  array_push($term_arr,$term->term_id);
				} 
			}
			
			$matched = false;
			
			switch(count($filters_arr)){
				case 1:
					if(in_array($filters_arr[0],$term_arr)){
						$matched = true;
					}
					break;
				case 2:
					if(in_array($filters_arr[0],$term_arr) && in_array($filters_arr[1],$term_arr)){
						$matched = true;
					}
					break;
				case 3:
					if(in_array($filters_arr[0],$term_arr) && in_array($filters_arr[1],$term_arr) && in_array($filters_arr[2],$term_arr)){
						$matched = true;
					}
					break;
				default:
					$matched = true;
					break;
			}
			
			if(!$matched){
				continue; 
			}else{
				$resource_match_count++;
			}
			
			$resource_count++;
			// Ignore this feature if $feature_count is lower than $min
			if($resource_count < $min) { continue; }
			// Stop loop completely if $feature_count is higher than $max
			if($resource_count > $max) { break; } 
	?>
	
			<div class="resource-item <?=$resource_type?>">
				<div class="resource-title-wrapper">
					<div class="clearfix">
						<table cellpadding="0" cellspacing="0" border="0" width="90%">
							<tr>
								<td class="title">
									<div class="resource-title-div">
										<div class="resource-title">
											<?php echo showListTitle($resource_id, $resource_type, $resource_popup_image['url'], $resource_popup_url, $resource_slug);?>
										</div>
										<!--<div class="resource-type"><?=$resource_type?></div>-->
									</div>
								</td>
								<td class="audio">
									<?php echo get_audio_preview(get_field('downloads', $resource_id));?>
								</td>
							</tr>
						</table>
						<?php if(!empty($note)){ ?>
						<div class="resource-note">
							<a class="icon-note" data-fancybox data-src="#<?=$resource_slug.'-note'?>" href="javascript:;"></a>
							<div id="<?=$resource_slug.'-note'?>" class="hidden-content fancybox-content file-download"><?=$note?>	</div>
						</div>
						<?php } ?>
					</div>
					
					<?php if( current_user_can('manage_options') ):
						$resource_link = get_edit_post_link( $resource_id );
						echo '<a href="'.$resource_link.'" class="btn_resource_edit edit_element">Edit</a>';
					endif; ?>
				</div>
				<?php if($download_count > 1): 
			
				$downloadable_file_arr = array();
				if( have_rows('downloads', $resource_id) ){
					echo '<div class="file-download-wrapper no-padding hidden-xs hidden-sm item-'.$download_count.'">';
					while( have_rows('downloads', $resource_id) ): the_row();
						
						$file_title = get_sub_field('file_title');
						$downloadable_file = get_sub_field('downloadable_file');
						$file_type = get_sub_field('file_type');
						$file_extension = strtolower(substr(strrchr($downloadable_file['url'],"."),1));
						$preview_only = get_sub_field('preview_only');
						
						if(!$preview_only){
							echo get_file_thumbnail_listing($file_type, $file_extension, $downloadable_file, $file_title, $page_id);
							array_push($downloadable_file_arr, $downloadable_file['ID']);
						}
						
						unset($file_title);
						unset($downloadable_file);
						unset($file_type);
						unset($file_extension);
						unset($preview_only);	
					endwhile;
					echo '</div>';
					echo '<div class="file-download-all hidden-xs hidden-sm">';
					$downloadable_file_string = implode(',',$downloadable_file_arr);
					
					echo '<a href="javascript:;" data-file="'.$downloadable_file_string.'" data-filename="download" class="media-file all createzip">'.__('Download All', 'Pearson-master').'</a>';
					
					unset($downloadable_file_arr);
					unset($downloadable_file_string);
					echo '</div>';
				}
				
				?>
					
				<div class="file-download-wrapper no-padding hidden-md hidden-lg">
					<div class="mobile_download_wrapper">
						<select class="mobile_download">
							<?php 
							if( have_rows('downloads', $resource_id) ){
								while( have_rows('downloads', $resource_id) ): the_row();
									$file_title = get_sub_field('file_title');
									$downloadable_file = get_sub_field('downloadable_file');
									$file_type = get_sub_field('file_type');
									$preview_only = get_sub_field('preview_only');
									
									if(!$preview_only){
										//echo '<a href="'.$downloadable_file['url'].'" class="media-file '.$file_type.'" target="_blank">'.$file_title.'</a>';
										//echo '<option val="'.$downloadable_file['url'].'">'.$file_title.'</option>';
										
										//echo '<option val="'.get_template_directory_uri().'/templates/download.php?file='.$downloadable_file['ID'].'&pageid='.$page_id.'">'.$file_title.'</option>';
										//Commented on 20181005
										//echo '<option value="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$page_id.'">'.$file_title.'</option>';
										echo '<option value="'.getFileDownloadLink($downloadable_file['ID'], $page_id).'">'.$file_title.'</option>';
									}
									
									unset($file_title);
									unset($downloadable_file);
									unset($file_type);
									unset($preview_only);
								endwhile;
							}
							?>
							<!--<option>Download All</option>-->
						</select>
						<div class="download_text"><?=__('Download');?></div>
					</div>
				</div>
				<?php else:
					if( have_rows('downloads', $resource_id) ):
						$numrows = count( get_sub_field( 'downloads' ) );
						
						$count = 0;
					
						while( have_rows('downloads', $resource_id) ): the_row();
							$file_title = get_sub_field('file_title');
							$downloadable_file = get_sub_field('downloadable_file'); 
							$file_type = get_sub_field('file_type');
							$file_extension = strtolower(substr(strrchr($downloadable_file['url'],"."),1));
							$preview_only = get_sub_field('preview_only');
							
							if(!$preview_only){
								echo '<div class="file-download-wrapper hidden-xs hidden-sm item-'.$download_count.'">';
								echo get_file_thumbnail_listing($file_type, $file_extension, $downloadable_file, $file_title, $page_id);
								echo '</div>';
								
								echo '<div class="file-download-wrapper hidden-md hidden-lg">';
								//echo '<a href="'.$downloadable_file['url'].'" class="media-file all" target="_blank">Download</a>';; 
								
								//echo '<a href="'.get_template_directory_uri().'/templates/download.php?file='.$downloadable_file['ID'].'&pageid='.$page_id.'" class="media-file all" target="_blank">'.__('Download', 'Pearson-master').'</a>';
								//Commented on 20181005
								//echo '<a href="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$page_id.'" class="media-file all" target="_blank">'.__('Download', 'Pearson-master').'</a>';
								
								echo '<a href="'.getFileDownloadLink($downloadable_file['ID'], $page_id).'" class="media-file all" target="_blank">'.__('Download', 'Pearson-master').'</a>';
								
								echo '</div>'; 
								
								echo '<div class="file-download-all hidden-xs hidden-sm"></div>';
								
								$count++;
							}
							
							unset($file_title);
							unset($downloadable_file);
							unset($file_type);
							unset($file_extension);
							unset($preview_only);
				 
						endwhile;
						
						if($numrows > $count){
							echo '<div class="file-download-wrapper hidden-xs hidden-sm item-'.$download_count.'"></div>';
							echo '<div class="file-download-wrapper hidden-md hidden-lg"></div>';
							echo '<div class="file-download-all hidden-xs hidden-sm"></div>';
						}
							
						unset($count);
					 else:
						echo '<div class="file-download-wrapper hidden-xs hidden-sm item-'.$download_count.'"></div>';
						echo '<div class="file-download-wrapper hidden-md hidden-lg"></div>';
						echo '<div class="file-download-all hidden-xs hidden-sm"></div>';
					 endif;
				endif; ?>
				<!--</div>-->
				
				<?php if($resource_type == 'article-file') {?>
				<div id="<?=$resource_slug.'-content'?>" class="hidden-content fancybox-content article-lightbox">
					<h3><?=$resource_display_title;?></h3>
					<div class="article-content">
						<div class="media-container">
							<?php 
							if( have_rows('downloads', $resource_id) ){
								
								echo '<div class="media-container">';
								
								while( have_rows('downloads', $resource_id) ): the_row();
									$file_title = get_sub_field('file_title');
									$downloadable_file = get_sub_field('downloadable_file');
									$file_type = get_sub_field('file_type');
									$file_extension = strtolower(substr(strrchr($downloadable_file['url'],"."),1));
									$preview_only = get_sub_field('preview_only');
									if(!$preview_only){
										echo get_file_thumbnail_listing($file_type, $file_extension, $downloadable_file, $file_title, $page_id);
									}
									
									unset($file_title);
									unset($downloadable_file);
									unset($file_type);
									unset($file_extension);
									unset($preview_only);
								endwhile;
								
								echo '</div>';
							}					
							?>
						</div>
						<div class="clearfix">
							<?php if(!empty($resource_thumbnail)){ ?>
							<div class="img-container"><img src="<?=$resource_thumbnail?>" class="img-responsive" /></div>
							<?php } ?>
							<div class="content-container">
								<?php 
									$content_post = get_post($resource_id);
									$article_content = $content_post->post_content;
									$article_content = apply_filters('the_content', $article_content);
									echo $article_content;
								?>
							</div>
						</div>
					</div>
				</div>
				<?php } ?>
			</div>
	<?php endforeach;
			
		if($resource_match_count == 0){
			echo '<p>'.__('No resources found. Please refine your filter(s).', 'Pearson-master').'</p>';
		}
	
		echo '</div>'; 
	endif; //end if ($features)
	wp_reset_postdata();
	
	die();
}

add_action( 'wp_ajax_nopriv_get_all_resources_list', 'get_all_resources_list' );
add_action( 'wp_ajax_get_all_resources_list', 'get_all_resources_list' );
function get_all_resources_list(){
	global $post;
	
	if ($post->ID) {
		// On initial page load, just grab the post ID...
		//$page_id = $post->ID;
		$resource_list_id = get_field('resource_list',$post->ID);
	} else {
		// ... but once you're using Ajax, need to get the ID via Ajax
		$resource_list_id = $_POST['resource_listID'];
	}
	
	if (isset($_POST['page'])) {
		// Set $page to data from Ajax, if available
		$page = $_POST['page'];
	} else {
		// ... if not, set default to 1 (for initial page load)
		$page = 1;
	}
	
	if (isset($_POST['filters'])) {
		// Set $page to data from Ajax, if available
		$filters = $_POST['filters'];
	}
	
	//echo $filters;
	
	$filters_arr = explode(',', $filters);	
	$filters_arr = array_values(array_diff( $filters_arr, [0]));
	
	//$resources = get_field('resources', $resource_list_id);
	
	$all_resources = get_all_resource_page();
	
	//print_r($resources);
	
	// Pagination variables
	$resource_count      = 0;
	$resource_match_count = 0;
	$resources_per_page  = 40; // How many features to display on each page
	$total              = is_array( $all_resources ) ? count( $all_resources ) : 0;
	//$pages              = ceil( $total / $resources_per_page );
	$min                = ( ( $page * $resources_per_page ) - $resources_per_page ) + 1;
	$max                = ( $min + $resources_per_page ) - 1;
	
	if( $all_resources ):
		//$i = 1;
		//$resource_list = get_field('resource_list');
		//$resources = get_field('resources', $resource_list[0]->ID);
		
		echo '<div class="resource-container-inner">';
		
		echo '<div class="resource-header">';
		echo '<div class="header-item">'.__('Items', 'Pearson-master').'</div>';
		echo '<div class="header-download">'.__('Download', 'Pearson-master').'</div>';
		echo '<div class="header-download-all hidden-xs hidden-sm"></div>';
		echo '</div>';
		
		foreach ($all_resources as $resource):
			$resource_parent = $resource['pageid'];
			$resource_id = $resource['resource_id'];
			
			$resource_type = get_field('resource_type', $resource_id);
			$resource_display_title = get_field('display_title', $resource_id);
			$resource_thumbnail = get_the_post_thumbnail_url($resource_id,'full');
			$note = get_field('note', $resource_id);
			$resource_popup_image = get_field('resource_popup_image', $resource_id);
			$resource_popup_url = get_field('resource_popup_url', $resource_id);
			$downloads = get_field('downloads', $resource_id);
			//$download_count = is_array( $downloads ) ? count( $downloads ) : 0;
			$download_count = getDownload_count($resource_id);
			
			$resource_post = get_post($resource_id); 
			$resource_slug = $resource_post->post_name;
			$term_arr = array();
			
			$terms = get_the_terms( $resource_id, 'resource_category' );
			if ($terms) {
				foreach($terms as $term) {
				  //echo '<p>'.$term->term_id.'</p>';
				  array_push($term_arr,$term->term_id);
				} 
			}
			
			$matched = false;
			
			switch(count($filters_arr)){
				case 1:
					if(in_array($filters_arr[0],$term_arr)){
						$matched = true;
					}
					break;
				case 2:
					if(in_array($filters_arr[0],$term_arr) && in_array($filters_arr[1],$term_arr)){
						$matched = true;
					}
					break;
				case 3:
					if(in_array($filters_arr[0],$term_arr) && in_array($filters_arr[1],$term_arr) && in_array($filters_arr[2],$term_arr)){
						$matched = true;
					}
					break;
				default:
					$matched = true;
					break;
			}
			
			if(!$matched){
				continue; 
			}else{
				$resource_match_count++;
			}
			
			$resource_count++;
			// Ignore this feature if $feature_count is lower than $min
			if($resource_count < $min) { continue; }
			// Stop loop completely if $feature_count is higher than $max
			if($resource_count > $max) { break; } 
	?>
	
			<div class="resource-item <?=$resource_type?>">
				<div class="resource-title-wrapper">
					<div class="clearfix">
						<table cellpadding="0" cellspacing="0" border="0" width="90%">
							<tr>
								<td class="title">
									<div class="resource-title-div">
										<div class="resource-title">
											<?php echo showListTitle($resource_id, $resource_type, $resource_popup_image['url'], $resource_popup_url, $resource_slug);?>
										</div>
										<div class="resource-type"><?php echo get_the_title($resource_parent);?></div>
									</div>
								</td>
								<td class="audio">
									<?php echo get_audio_preview(get_field('downloads', $resource_id));?>
								</td>
							</tr>
						</table>
						<?php if(!empty($note)){ ?>
						<div class="resource-note">
							<a class="icon-note" data-fancybox data-src="#<?=$resource_slug.'-note'?>" href="javascript:;"></a>
							<div id="<?=$resource_slug.'-note'?>" class="hidden-content fancybox-content file-download"><?=$note?>	</div>
						</div>
						<?php } ?>
					</div>
					
					<?php if( current_user_can('manage_options') ):
						$resource_link = get_edit_post_link( $resource_id );
						echo '<a href="'.$resource_link.'" class="btn_resource_edit edit_element">Edit</a>';
					endif; ?>
				</div>
				<!--<div class="col-xs-3 col-sm-2 col-md-7 file-download-wrapper no-padding">-->
					<?php if($download_count > 1): 
						$downloadable_file_arr = array();
						
						if( have_rows('downloads', $resource_id) ){
							echo '<div class="file-download-wrapper no-padding hidden-xs hidden-sm item-'.$download_count.'">';
							while( have_rows('downloads', $resource_id) ): the_row();
								$file_title = get_sub_field('file_title');
								$downloadable_file = get_sub_field('downloadable_file');
								$file_type = get_sub_field('file_type');
								$file_extension = strtolower(substr(strrchr($downloadable_file['url'],"."),1));
								$preview_only = get_sub_field('preview_only');
								
								if(!$preview_only){
									echo get_file_thumbnail_listing($file_type, $file_extension, $downloadable_file, $file_title, $resource_parent);
									array_push($downloadable_file_arr, $downloadable_file['ID']);
								}
								
								unset($file_title);
								unset($downloadable_file);
								unset($file_type);
								unset($file_extension);
								unset($preview_only);	
							endwhile;
							echo '</div>';
							echo '<div class="file-download-all hidden-xs hidden-sm">';
							$downloadable_file_string = implode(',',$downloadable_file_arr);
							
							echo '<a href="javascript:;" data-file="'.$downloadable_file_string.'" data-filename="download" class="media-file all createzip">'.__('Download All', 'Pearson-master').'</a>';
							
							unset($downloadable_file_arr);
							unset($downloadable_file_string);
							echo '</div>';
						}
						?>
						<!--<a href="#" class="media-file all">All</a>-->
					<!--</div>-->
					
					<div class="file-download-wrapper no-padding hidden-md hidden-lg">
						<div class="mobile_download_wrapper">
							
								<?php 
								$downloadable_file_arr = array();
								
								if( have_rows('downloads', $resource_id) ){
								
									echo '<select class="mobile_download">';
									echo '<option value="default">Please select</option>';
									
									while( have_rows('downloads', $resource_id) ): the_row();
										$file_title = get_sub_field('file_title');
										$downloadable_file = get_sub_field('downloadable_file');
										$file_type = get_sub_field('file_type');
										$preview_only = get_sub_field('preview_only');
										
										if(!$preview_only){
											//echo '<option val="'.get_template_directory_uri().'/templates/download.php?file='.$downloadable_file['ID'].'&pageid='.$page_id.'">'.$file_title.'</option>';
											//Commented on 20181005
											//echo '<option value="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$resource_parent.'">'.$file_title.'</option>';
											
											echo '<option value="'.getFileDownloadLink($downloadable_file['ID'], $resource_parent).'">'.$file_title.'</option>';
											
											array_push($downloadable_file_arr, $downloadable_file['ID']);
										}
										
										unset($file_title);
										unset($downloadable_file);
										unset($file_type);
										unset($preview_only);
									endwhile;
									
									$downloadable_file_string = implode(',',$downloadable_file_arr);
							
									if(sizeof($downloadable_file_arr) > 1){
										echo '<option data-file="'.$downloadable_file_string.'" data-filename="download" value="createzip">'.__('Download All', 'Pearson-master').' ('.$download_count.__(' files', 'Pearson-master').')</option>';
									}
									
									echo '</select>';
									echo '<div class="download_text">'.__('Download', 'Pearson-master').'</div>';
									
									unset($downloadable_file_arr);
									unset($downloadable_file_string);
								}
								?>
								<!--<option>Download All</option>-->
							
						</div>
					</div>
					<?php else:
						if( have_rows('downloads', $resource_id) ):
							$numrows = count( get_sub_field( 'downloads' ) );
						
							$count = 0;
						
							while( have_rows('downloads', $resource_id) ): the_row();
								$file_title = get_sub_field('file_title');
								$downloadable_file = get_sub_field('downloadable_file'); 
								$file_type = get_sub_field('file_type');
								$file_extension = strtolower(substr(strrchr($downloadable_file['url'],"."),1));
								$preview_only = get_sub_field('preview_only');
								
								if(!$preview_only){
									echo '<div class="file-download-wrapper hidden-xs hidden-sm item-'.$download_count.'">';
									echo get_file_thumbnail_listing($file_type, $file_extension, $downloadable_file, $file_title, $resource_parent);
									echo '</div>';
									
									echo '<div class="file-download-wrapper hidden-md hidden-lg">';
									//echo '<a href="'.$downloadable_file['url'].'" class="media-file all" target="_blank">Download</a>';
									//Commented on 20181005
									//echo '<a href="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$resource_parent.'" class="media-file all" target="_blank">'.__('Download', 'Pearson-master').'</a>';
									
									echo '<a href="'.getFileDownloadLink($downloadable_file['ID'], $resource_parent).'" class="media-file all" target="_blank">'.__('Download', 'Pearson-master').'</a>';
									
									echo '</div>'; 
									
									echo '<div class="file-download-all hidden-xs hidden-sm"></div>';
									
									$count++;
								}
								
								unset($file_title);
								unset($downloadable_file);
								unset($file_type);
								unset($preview_only);
					 
					 		endwhile;
							
							if($numrows > $count){
								echo '<div class="file-download-wrapper hidden-xs hidden-sm item-'.$download_count.'"></div>';
								echo '<div class="file-download-wrapper hidden-md hidden-lg"></div>';
								echo '<div class="file-download-all hidden-xs hidden-sm"></div>';
							}
							
							unset($count);
						 else:
							echo '<div class="file-download-wrapper hidden-xs hidden-sm item-'.$download_count.'"></div>';
							echo '<div class="file-download-wrapper hidden-md hidden-lg"></div>';
							echo '<div class="file-download-all hidden-xs hidden-sm"></div>';
						 endif;
				endif; ?>
				<!--</div>-->
				
				<?php if($resource_type == 'article-file') {?>
				<div id="<?=$resource_slug.'-content'?>" class="hidden-content fancybox-content article-lightbox">
					<h3><?=$resource_display_title;?></h3>
					<div class="article-content">
						<div class="media-container">
							<?php 
							if( have_rows('downloads', $resource_id) ){
								
								echo '<div class="media-container">';
								
								while( have_rows('downloads', $resource_id) ): the_row();
									$file_title = get_sub_field('file_title');
									$downloadable_file = get_sub_field('downloadable_file');
									$file_type = get_sub_field('file_type');
									$file_extension = strtolower(substr(strrchr($downloadable_file['url'],"."),1));
									$preview_only = get_sub_field('preview_only');
									if(!$preview_only){
										echo get_file_thumbnail_listing($file_type, $file_extension, $downloadable_file, $file_title, $resource_parent);
									}
									
									unset($file_title);
									unset($downloadable_file);
									unset($file_type);
									unset($file_extension);
									unset($preview_only);
								endwhile;
								
								echo '</div>';
							}				
							?>
						</div>
						<div class="clearfix">
							<?php if(!empty($resource_thumbnail)){ ?>
							<div class="img-container"><img src="<?=$resource_thumbnail?>" class="img-responsive" /></div>
							<?php } ?>
							<div class="content-container">
								<?php 
									$content_post = get_post($resource_id);
									$article_content = $content_post->post_content;
									$article_content = apply_filters('the_content', $article_content);
									echo $article_content;
								?>
							</div>
						</div>
					</div>
				</div>
				<?php } ?>
			</div>
	<?php endforeach;
			
		if($resource_match_count == 0){
			echo '<p>'.__('No resources found. Please refine your filter(s).', 'Pearson-master').'</p>';
		}
	
		echo '</div>'; 
	endif; //end if ($features)
	wp_reset_postdata();
	
	die();
}

// Hook this function to WordPress' Ajax actions
add_action( 'wp_ajax_nopriv_get_group_resources_grid', 'get_group_resources_grid' );
add_action( 'wp_ajax_get_group_resources_grid', 'get_group_resources_grid' );
function get_group_resources_grid(){
	global $post;
	
	if (isset($_POST['pageID'])) {
		$pageID = $_POST['pageID'];
	}
	
	//echo 'pageID: '.$pageID;
	
	if (isset($_POST['filters'])) {
		// Set $page to data from Ajax, if available
		$filters = $_POST['filters'];
	}
		
	$filters_arr = explode(',', $filters);	
	$filters_arr = array_values(array_diff( $filters_arr, [0]));
	
	//echo 'filters_arr: '.$filters_arr;
	
	$resource_lists = get_field('resource_list', intval($pageID));
	
	//print_r($resource_lists);
	
	
	
	foreach($resource_lists as $resource_list):
	
		$resource_match_count = 0;
	
		$separator_count = 0;
			
		echo '<div class="resource-container clearfix">';
		
		echo '<div class="group-title">';
				
		$resource_list_display_title = get_field('display_title', $resource_list->ID);
			
		if(empty($resource_list_display_title)){
			echo get_the_title($resource_list->ID);
		}else{
			echo $resource_list_display_title;
		}
		
		echo '</div>';
	
		echo '<div class="resource-container-inner">';
		
		if(checkResourceListAccessRight($resource_list->ID)){
	
			$resources = get_field('resources', $resource_list->ID); 
			
			foreach ($resources as $resource):
				$resource_id = $resource->ID;
				$resource_type = get_field('resource_type', $resource_id);
				$resource_display_title = get_field('display_title', $resource_id);
				$resource_thumbnail = get_the_post_thumbnail_url($resource_id,'full');
				$note = get_field('note', $resource_id);
				$resource_popup_image = get_field('resource_popup_image', $resource_id);
				$resource_popup_url = get_field('resource_popup_url', $resource_id);
				$downloads = get_field('downloads', $resource_id);
				//$download_count = is_array( $downloads ) ? count( $downloads ) : 0;
				$download_count = getDownload_count($resource_id);
				
				$resource_post = get_post($resource_id); 
				$resource_slug = $resource_post->post_name; 
				
				$term_arr = array();
				
				$terms = get_the_terms( $resource_id, 'resource_category' );
				if ($terms) {
					foreach($terms as $term) {
					 // echo '<p>'.$term->term_id.'</p>';
					  array_push($term_arr,$term->term_id);
					} 
				}
				
				$matched = false;
				
				switch(count($filters_arr)){
					case 1:
						if(in_array($filters_arr[0],$term_arr)){
							$matched = true;
						}
						break;
					case 2:
						if(in_array($filters_arr[0],$term_arr) && in_array($filters_arr[1],$term_arr)){
							$matched = true;
						}
						break;
					case 3:
						if(in_array($filters_arr[0],$term_arr) && in_array($filters_arr[1],$term_arr) && in_array($filters_arr[2],$term_arr)){
							$matched = true;
						}
						break;
					default:
						$matched = true;
						break;
				}
				
				if(!$matched){
					continue; 
				}else{
					$resource_match_count++;
				}
					
			?>
				
				<div class="col-xs-6 col-sm-3 col-md-3 resource-item">
					<div class="resource-thumbnail">
						<?php
							//echo '<p>file type: '.get_main_download_file($resource_id).'</p>';
						
							echo showGridThumbnail($resource_id, $resource_thumbnail, $resource_type, $resource_popup_image['url'], $resource_popup_url, $resource_slug);
							echo get_audio_preview(get_field('downloads', $resource_id));
						?>
					</div>
					<div class="resource-title-wrapper">
						<div class="resource-title">
							<?php echo showListTitle($resource_id, $resource_type, $resource_popup_image['url'], $resource_popup_url, $resource_slug);?>
						</div>
						<?php if(!empty($note)){ ?>
						<div class="resource-note">
							<a class="icon-note" data-fancybox data-src="#<?=$resource_slug.'-note'?>" href="javascript:;"></a>
							<div id="<?=$resource_slug.'-note'?>" class="hidden-content fancybox-content file-download"><?=$note?>	</div>
						</div>
						<?php } ?>
					</div>
					<!--<div class="resource-type">File Downlaod</div>-->
					<div class="resource-download-wrapper">
						<?php
							if($download_count > 1){ ?>
								<div class="multiple_download hidden-xs hidden-sm">
									<div class="multiple_dl_header"><span><?=__('Download', 'Pearson-master');?> (<?=$download_count?>)</span></div>
									<div class="multiple_dl_content">
										<ul>
										<?php	
										$downloadable_file_arr = array();
										
										if( have_rows('downloads', $resource_id) ){
											while( have_rows('downloads', $resource_id) ): the_row();
												$file_title = get_sub_field('file_title');
												$downloadable_file = get_sub_field('downloadable_file');
												$set_as_main_download_file = get_sub_field('set_as_main_download_file');
												$preview_only = get_sub_field('preview_only');
												
												if(!$preview_only){
													//echo '<li><a href="'.get_template_directory_uri().'/templates/download.php?file='.$downloadable_file['ID'].'&pageid='.$pageID.'" target="_blank">'.$file_title.'</a></li>';
													//Commented on 20181005
													
													//echo '<li><a href="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$pageID.'" target="_blank">'.$file_title.'</a></li>';
													echo '<li><a href="'.getFileDownloadLink($downloadable_file['ID'], $pageID).'" target="_blank">'.$file_title.'</a></li>';
	
													//echo '<li><a href="'.$downloadable_file['url'].'" target="_blank">'.$file_title.'</a></li>';
													
													array_push($downloadable_file_arr, $downloadable_file['ID']);
												}
												
												unset($file_title);
												unset($downloadable_file);
												unset($file_type);
												unset($preview_only);
											endwhile;
											
											$downloadable_file_string = implode(',',$downloadable_file_arr);
											
											echo '<li><a href="javascript:;" data-file="'.$downloadable_file_string.'" data-filename="download" class="createzip">'.__('Download All', 'Pearson-master').' ('.$download_count.__(' files', 'Pearson-master').')</a></li>';
											
											unset($downloadable_file_arr);
											unset($downloadable_file_string);
										}?>
										</ul>
									</div>
								</div>
								
								<?php
								if( current_user_can('manage_options') ):
									$resource_link = get_edit_post_link( $resource_id );
									echo '<a href="'.$resource_link.'" class="btn_resource_edit edit_element">Edit</a>';
								endif;
								?>
								
								<div class="hidden-md hidden-lg">
									<div class="mobile_download_wrapper">
										<select class="mobile_download">
											<?php 
											if( have_rows('downloads', $resource_id) ){
												while( have_rows('downloads', $resource_id) ): the_row();
													$file_title = get_sub_field('file_title');
													$downloadable_file = get_sub_field('downloadable_file');
													$file_type = get_sub_field('file_type');
													$preview_only = get_sub_field('preview_only');
													
													if(!$preview_only){
														//echo '<a href="'.$downloadable_file['url'].'" class="media-file '.$file_type.'" target="_blank">'.$file_title.'</a>';
														//echo '<option value="'.get_template_directory_uri().'/templates/download.php?file='.$downloadable_file['ID'].'&pageid='.$pageID.'">'.$file_title.'</option>';
														//Commented on 20181005
														//echo '<option value="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$pageID.'">'.$file_title.'</option>';
														echo '<option value="'.getFileDownloadLink($downloadable_file['ID'], $pageID).'">'.$file_title.'</option>';
														
													}
													
													unset($file_title);
													unset($downloadable_file);
													unset($file_type);
													unset($preview_only);
												endwhile;
											}
											?>
											<!--<option>Download All</option>-->
										</select>
										<div class="download_text"><?=__('Download', 'Pearson-master');?> (<?=$download_count?>)</div>
									</div>
								</div>
						<?php
							}else{
								if( have_rows('downloads', $resource_id) ){
									while( have_rows('downloads', $resource_id) ): the_row();
										$downloadable_file = get_sub_field('downloadable_file');
										$preview_only = get_sub_field('preview_only');
										
										if(!$preview_only){
											//Commented on 20181005
											//echo '<a href="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$pageID.'" class="btn_single_download" target="_blank">'.__('Download', 'Pearson-master').'</a>';
											
											echo '<a href="'.getFileDownloadLink($downloadable_file['ID'], $pageID).'" class="btn_single_download" target="_blank">'.__('Download', 'Pearson-master').'</a>';
										}
										
										unset($downloadable_file);
										unset($preview_only);
									endwhile;
								}
								
								if( current_user_can('manage_options') ):
									$resource_link = get_edit_post_link( $resource_id );
									echo '<a href="'.$resource_link.'" class="btn_resource_edit edit_element">Edit</a>';
								endif;
							}
						?>
					</div>
					<?php if($resource_type == 'article-file') {?>
					<div id="<?=$resource_slug.'-content'?>" class="hidden-content fancybox-content article-lightbox">
						<h3><?=$resource_display_title;?></h3>
						<div class="article-content">
							<div class="media-container">
								<?php 
								if( have_rows('downloads', $resource_id) ){
									while( have_rows('downloads', $resource_id) ): the_row();
										$file_title = get_sub_field('file_title');
										$downloadable_file = get_sub_field('downloadable_file');
										$file_type = get_sub_field('file_type');
										$file_extension = strtolower(substr(strrchr($downloadable_file['url'],"."),1));
										$preview_only = get_sub_field('preview_only');
	
										if(!$preview_only){
											echo get_file_thumbnail_listing($file_type, $file_extension, $downloadable_file, $file_title, $pageID);
										}
										
										unset($file_title);
										unset($downloadable_file);
										unset($file_type);
										unset($file_extension);
										unset($preview_only);
									endwhile;
								}									
								?>
							</div>
							<div class="clearfix">
								<?php //if(!empty($resource_thumbnail)){ ?>
								<!--<div class="img-container"><img src="<? //=$resource_thumbnail?>" class="img-responsive" /></div>-->
								<?php //} ?>
								<div class="content-container">
									<?php 
										$content_post = get_post($resource_id);
										$article_content = $content_post->post_content;
										$article_content = apply_filters('the_content', $article_content);
										echo $article_content;
									?>
								</div>
							</div>
						</div>
					</div>
					<?php } ?>
				</div>
				
		<?php 
			
				$separator_count++;
						
				if($separator_count%2 == 0 && $separator_count != 0){
					echo '<div class="clearfix hidden-sm hidden-md hidden-lg hidden-xl"></div>';
				}
				
				if($separator_count%4 == 0 && $separator_count != 0){
					echo '<div class="clearfix hidden-xs"></div>';
				}
			
			endforeach; 
		
			if($resource_match_count == 0){
				echo '<p>'.__('No resources found. Please refine your filter(s).', 'Pearson-master').'</p>';
			}
		
			echo '</div>';

			echo '</div>';
			
			echo '<div class="resource-footer">';
					
			echo '<div class="download_all">';
			
			$download_all = get_field('download_all',$resource_list->ID);
			
			if(!empty($download_all)):
				echo '<a href="'.get_template_directory_uri().'/templates/download.php?file='.$download_all['ID'].'&pageid='.$post->ID.'" class="btn_single_download" target="_blank">'.__('Download All').'</a>';
				//Commented on 20181005
				//echo '<a href="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$download_all['ID'].'&pageid='.$pageID.'" class="btn_single_download" target="_blank">'.__('Download All', 'Pearson-master').'</a>';
			endif;
		
			echo '</div>';
			
			echo '</div>';
			
		}
	
	endforeach;
	
	wp_reset_postdata();
	
	die();
}

// Hook this function to WordPress' Ajax actions
add_action( 'wp_ajax_nopriv_get_group_resources_list', 'get_group_resources_list' );
add_action( 'wp_ajax_get_group_resources_list', 'get_group_resources_list' );
function get_group_resources_list(){
	global $post;
	
	if (isset($_POST['pageID'])) {
		$pageID = $_POST['pageID'];
	}
	
	//echo 'pageID: '.$pageID;
	
	if (isset($_POST['filters'])) {
		// Set $page to data from Ajax, if available
		$filters = $_POST['filters'];
	}
		
	$filters_arr = explode(',', $filters);	
	$filters_arr = array_values(array_diff( $filters_arr, [0]));
	
	//echo 'filters_arr: '.$filters_arr;
	
	$resource_lists = get_field('resource_list', intval($pageID));
	
	//print_r($resource_lists);
	
	foreach($resource_lists as $resource_list):
	
		if(checkResourceListAccessRight($resource_list->ID)){
			
			$resource_match_count = 0;
				
			echo '<div class="resource-container clearfix">';
								
			echo '<div class="group-title">';
					
			$resource_list_display_title = get_field('display_title', $resource_list->ID);
				
			if(empty($resource_list_display_title)){
				echo get_the_title($resource_list->ID);
			}else{
				echo $resource_list_display_title;
			}
			
			echo '</div>';
			
			$resources = get_field('resources', $resource_list->ID);
			
			echo '<div class="resource-container-inner">';
			
			echo '<div class="resource-header">';
			echo '<div class="header-item">'.__('Items', 'Pearson-master').'</div>';
			echo '<div class="header-download">'.__('Download', 'Pearson-master').'</div>';
			echo '<div class="header-download-all hidden-xs hidden-sm"></div>';
			echo '</div>';
			
			foreach ($resources as $resource):
				$resource_id = $resource->ID;
				$resource_type = get_field('resource_type', $resource_id);
				$resource_display_title = get_field('display_title', $resource_id);
				$note = get_field('note', $resource_id);
				$resource_popup_image = get_field('resource_popup_image', $resource_id);
				$resource_popup_url = get_field('resource_popup_url', $resource_id);
				$downloads = get_field('downloads', $resource_id);
				//$download_count = is_array( $downloads ) ? count( $downloads ) : 0;
				$download_count = getDownload_count($resource_id);
				
				$resource_post = get_post($resource_id); 
				$resource_slug = $resource_post->post_name;
				
				$term_arr = array();
				
				$terms = get_the_terms( $resource_id, 'resource_category' );
				if ($terms) {
					foreach($terms as $term) {
					  //echo '<p>'.$term->term_id.'</p>';
					  array_push($term_arr,$term->term_id);
					} 
				}
				
				$matched = false;
				
				switch(count($filters_arr)){
					case 1:
						if(in_array($filters_arr[0],$term_arr)){
							$matched = true;
						}
						break;
					case 2:
						if(in_array($filters_arr[0],$term_arr) && in_array($filters_arr[1],$term_arr)){
							$matched = true;
						}
						break;
					case 3:
						if(in_array($filters_arr[0],$term_arr) && in_array($filters_arr[1],$term_arr) && in_array($filters_arr[2],$term_arr)){
							$matched = true;
						}
						break;
					default:
						$matched = true;
						break;
				}
				
				if(!$matched){
					continue; 
				}else{
					$resource_match_count++;
				}
					
			?>
				
				<div class="resource-item <?=$resource_type?>">
					<div class="resource-title-wrapper">
						<div class="clearfix">
							<table cellpadding="0" cellspacing="0" border="0" width="90%">
								<tr>
									<td class="title">
										<div class="resource-title-div">
											<div class="resource-title">
												<?php echo showListTitle($resource_id, $resource_type, $resource_popup_image['url'], $resource_popup_url, $resource_slug);?>
											</div>
											<!--<div class="resource-type"><? //=$resource_type?></div>-->
										</div>
									</td>
									<td class="audio">
										<?php echo get_audio_preview(get_field('downloads', $resource_id));?>
									</td>
								</tr>
							</table>
							<?php if(!empty($note)){ ?>
							<div class="resource-note">
								<a class="icon-note" data-fancybox data-src="#<?=$resource_slug.'-note'?>" href="javascript:;"></a>
								<div id="<?=$resource_slug.'-note'?>" class="hidden-content fancybox-content file-download"><?=$note?>	</div>
							</div>
							<?php } ?>
						</div>
						
						<?php if( current_user_can('manage_options') ):
							$resource_link = get_edit_post_link( $resource_id );
							echo '<a href="'.$resource_link.'" class="btn_resource_edit edit_element">Edit</a>';
						endif; ?>
					</div>
					
					<?php if($download_count > 1): 
						$downloadable_file_arr = array();
						
						if( have_rows('downloads', $resource_id) ){
							echo '<div class="file-download-wrapper no-padding hidden-xs hidden-sm item-'.$download_count.'">';
							
							while( have_rows('downloads', $resource_id) ): the_row();
								$file_title = get_sub_field('file_title');
								$downloadable_file = get_sub_field('downloadable_file');
								$file_type = get_sub_field('file_type');
								$file_extension = strtolower(substr(strrchr($downloadable_file['url'],"."),1));
								$preview_only = get_sub_field('preview_only');
								
								if(!$preview_only){
									echo get_file_thumbnail_listing($file_type, $file_extension, $downloadable_file, $file_title, $page_id);
									array_push($downloadable_file_arr, $downloadable_file['ID']);
								}
								
								unset($file_title);
								unset($downloadable_file);
								unset($file_type);
								unset($file_extension);
								unset($preview_only);	
							endwhile;
							echo '</div>';
							echo '<div class="file-download-all hidden-xs hidden-sm">';
							$downloadable_file_string = implode(',',$downloadable_file_arr);
							
							echo '<a href="javascript:;" data-file="'.$downloadable_file_string.'" data-filename="download" class="media-file all createzip">'.__('Download All', 'Pearson-master').'</a>';
							
							unset($downloadable_file_arr);
							unset($downloadable_file_string);
							echo '</div>';
						}
						?>
						
						<div class="file-download-wrapper no-padding hidden-md hidden-lg">
							<div class="mobile_download_wrapper">
								<select class="mobile_download">
									<?php 
									$downloadable_file_arr = array();
									
									if( have_rows('downloads', $resource_id) ){
										while( have_rows('downloads', $resource_id) ): the_row();
											$file_title = get_sub_field('file_title');
											$downloadable_file = get_sub_field('downloadable_file');
											$file_type = get_sub_field('file_type');
											$preview_only = get_sub_field('preview_only');
											
											if(!$preview_only){
												//Commented on 20181005
												//echo '<option value="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$pageID.'">'.$file_title.'</option>';
												
												echo '<option value="'.getFileDownloadLink($downloadable_file['ID'], $pageID).'">'.$file_title.'</option>';
												
												array_push($downloadable_file_arr, $downloadable_file['ID']);
											}
											
											unset($file_title);
											unset($downloadable_file);
											unset($file_type);
											unset($preview_only);
										endwhile;
										
										$downloadable_file_string = implode(',',$downloadable_file_arr);
									
										if(sizeof($downloadable_file_arr) > 1){
											echo '<option data-file="'.$downloadable_file_string.'" data-filename="download" value="createzip">'.__('Download All', 'Pearson-master').' ('.$download_count.__(' files', 'Pearson-master').')</option>';
										}
										
										echo '</select>';
										echo '<div class="download_text">'.__('Download', 'Pearson-master').'</div>';
										
										unset($downloadable_file_arr);
										unset($downloadable_file_string);
									}
									?>
									<!--<option>Download All</option>-->
								
							</div>
						</div>
						<?php else:
							if( have_rows('downloads', $resource_id) ):
								$numrows = count( get_sub_field( 'downloads' ) );
							
								$count = 0;
							
								while( have_rows('downloads', $resource_id) ): the_row();
									$file_title = get_sub_field('file_title');
									$downloadable_file = get_sub_field('downloadable_file'); 
									$file_type = get_sub_field('file_type');
									$file_extension = strtolower(substr(strrchr($downloadable_file['url'],"."),1));
									$preview_only = get_sub_field('preview_only');
									
									if(!$preview_only){
										echo '<div class="file-download-wrapper hidden-xs hidden-sm item-'.$download_count.'">';
										echo get_file_thumbnail_listing($file_type, $file_extension, $downloadable_file, $file_title, $pageID);
										echo '</div>';
										
										echo '<div class="file-download-wrapper hidden-md hidden-lg">';
										//Commented on 20181005
										//echo '<a href="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$pageID.'" class="media-file all" target="_blank">'.__('Download', 'Pearson-master').'</a>';
										
										echo '<a href="'.getFileDownloadLink($downloadable_file['ID'], $pageID).'" class="media-file all" target="_blank">'.__('Download', 'Pearson-master').'</a>';
										
										echo '</div>'; 
										
										echo '<div class="file-download-all hidden-xs hidden-sm"></div>';
										
										$count++;
									}
									
									unset($file_title);
									unset($downloadable_file);
									unset($file_type);
									unset($file_extension);
									unset($preview_only);
						 
								endwhile;
									
									if($numrows > $count){
										echo '<div class="file-download-wrapper hidden-xs hidden-sm item-'.$download_count.'"></div>';
										echo '<div class="file-download-wrapper hidden-md hidden-lg"></div>';
										echo '<div class="file-download-all hidden-xs hidden-sm"></div>';
									}
									
									unset($count);
								 else:
									echo '<div class="file-download-wrapper hidden-xs hidden-sm item-'.$download_count.'"></div>';
									echo '<div class="file-download-wrapper hidden-md hidden-lg"></div>';
									echo '<div class="file-download-all hidden-xs hidden-sm"></div>';
								 endif;
	
						endif; ?>
					<!--</div>-->
					
					<?php if($resource_type == 'article-file') {?>
						<div id="<?=$resource_slug.'-content'?>" class="hidden-content fancybox-content article-lightbox">
							<h3><?=$resource_display_title;?></h3>
							<div class="article-content">
								<div class="media-container">
									<?php 
									if( have_rows('downloads', $resource_id) ){
									
										echo '<div class="media-container">';
										
										while( have_rows('downloads', $resource_id) ): the_row();
											$file_title = get_sub_field('file_title');
											$downloadable_file = get_sub_field('downloadable_file');
											$file_type = get_sub_field('file_type');
											$file_extension = strtolower(substr(strrchr($downloadable_file['url'],"."),1));
											$preview_only = get_sub_field('preview_only');
											if(!$preview_only){
												echo get_file_thumbnail_listing($file_type, $file_extension, $downloadable_file, $file_title, $pageID);
											}
											
											unset($file_title);
											unset($downloadable_file);
											unset($file_type);
											unset($file_extension);
											unset($preview_only);
										endwhile;
										
										echo '</div>';
									}							
									?>
								</div>
								<div class="clearfix">
									<?php //if(!empty($resource_thumbnail)){ ?>
										<!--<div class="img-container"><img src="<? //=$resource_thumbnail?>" class="img-responsive" /></div>-->
										<?php //} ?>
									<div class="content-container">
										<?php 
											$content_post = get_post($resource_id);
											$article_content = $content_post->post_content;
											$article_content = apply_filters('the_content', $article_content);
											echo $article_content;
										?>
									</div>
								</div>
							</div>
						</div>
						<?php } ?>
				</div>
				
		<?php endforeach; 
		
			if($resource_match_count == 0){
				echo '<p>'.__('No resources found. Please refine your filter(s).', 'Pearson-master').'</p>';
			}
		
			echo '</div>';
			
			echo '<div class="resource-footer">';
				
			echo '<div class="download_all">';
			
			$download_all = get_field('download_all',$resource_list->ID);
			
			
			if(!empty($download_all)):
				//Commented on 20181005
				//echo '<a href="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$download_all['ID'].'&pageid='.$pageID.'" class="btn_single_download" target="_blank">'.__('Download All').'</a>';
				
				echo '<a href="'.getFileDownloadLink($download_all['ID'], $pageID).'" class="btn_single_download" target="_blank">'.__('Download All').'</a>';
			endif;
	
			echo '</div>';
			
			echo '</div>';
			
		}
	
	endforeach;
		

	
	wp_reset_postdata();
	
	die();
}


define('ACSGATE',	'http://leap.beta.ilongman.com/acs-web/App/ACSGateway.do?');

function xml2php($file) {



	// Open file connection

	$handle = fopen($file, "rb");

	if (isset($handle) && $handle!=null && $handle!='')  {



		$contents = '';

		while (!feof($handle)) {

		  $contents .= fread($handle, 8192);

		}

	} else {

		echo 'Cannot get data returned from ACSGateway.';

		exit;

	}

	fclose($handle);


	// Start parsing the XML file 

   	$xml_parser = xml_parser_create();

	$contents = ltrim ($contents);

	if (!xml_parse_into_struct($xml_parser, $contents, $arr_vals, $index)) {

		   sprintf("XML error: %s at line %d",

					   xml_error_string(xml_get_error_code($xml_parser)),

					   xml_get_current_line_number($xml_parser));

		$arr_vals = 'Failed parsing XML from ACSGateway' ."\n";

		if (count($arr_val)==0) $arr_vals .= 'XML return from ACSGateway has no value';

  	}

   	xml_parser_free($xml_parser);

	

   	return $arr_vals;

}

function openACS($inMethod, $inAsMethod, $inParameter, $inNode, $inDetailArray, $tempXML) {

	$tgetURL = ACSGATE  . 'method=' . $inMethod . '&asMethod=' . $inAsMethod  . $inParameter ;
	//echo $tgetURL . "\n";

	// Churn XML into php array
	$array = xml2php($tgetURL);
	//$array = xml2php('http://leap.beta.ilongman.com/acs-web/App/ACSGateway.do?method=getAccessRights&asMethod=getByUser&loginId=tp12175582&applicationId=481');

	// tokenize nodes into array

	$inNodePieces = explode("/", $inNode);

	$result = [];

	$j=0;

	for($i = 0; $i < count($array); $i++) {
		// Getting into the desire in node first
		if ( strcasecmp($inNodePieces[count($inNodePieces)-1], $array[$i]['tag']) ==0 && $array[$i]['type']=='open') {

			while ($array[$i+1]['type'] != 'close' && $array[$i+1]['type'] != 'open') {

				$result_inner[$array[$i+1]['tag']] = $array[$i+1]['value'];

				$result[$j] = $result_inner;

				$i++;

			}

			$j++;

		}

	}
	return $result;
}

function acsGetAccessRight($inLoginId){

	$method = 'getAccessRights';

	$asmethod = 'getByUser';

	//$inputparameter = '&loginId='. $inLoginId . '&applicationId=438';
	
	$inputparameter = '&loginId='. $inLoginId . '&applicationId=481';

	$node = 'AccessRights/Access';

	$result = openACS($method, $asmethod, $inputparameter, $node, '','' );

	return $result;
}

function standardizePageAccess($arr){
	$newArr = array();

	foreach($arr as $a):
	
		$temp_arr['ROLEID'] = $a['ROLEID'];
		
		$temp_arr['SERVICECODE'] = $a['SERVICECODE']->post_title;
		
		array_push($newArr, $temp_arr);
		
	endforeach;
	
	return $newArr;
}

function checkPageAccessRight($page_id, $dir = false){

	//session_start();

	$redirection = (!$dir) ? false : true;
	
	$haveright = false;
	
	//echo '<p>checking page id: '.$page_id.'</p>';
	
	//get acf field - access_service_code_with_role
	$access_service_roles = get_field('access_service_code_with_role', $page_id);
	
	if(!empty($access_service_roles)){ //not empty, check access right
	
		$page_access_arr = standardizePageAccess($access_service_roles);
		
		//print_r($page_access_arr);
		
		//print_r($access_service_roles);
		
		foreach($_SESSION['accessRight'] as $accessRight){
			
			/*echo '<p>--- accessRight start ---</p>';
			print_r($accessRight);
			echo '<p>--- accessRight end ---</p>';*/
			
			foreach($page_access_arr as $page_access){
				/*echo '<p>--- page_access start ---</p>';
				print_r($page_access);
				echo '<p>--- page_access end ---</p>';*/
			
				if($page_access['SERVICECODE'] == $accessRight['SERVICECODE'] && $page_access['ROLEID'] == $accessRight['ROLEID']){
					$haveright = true;
				}else{
					continue;
				}
			}
		}
		
		//echo '<p>haveright(page have service code): '. var_dump($haveright) .'</p>';
		
		//echo '<p>redirection: '. home_url() .'</p>'; 
		//$permission_page_id = 291;
		//$frontpage_id = get_option( 'page_on_front' );
		//$no_permission_url = get_permalink($frontpage_id);
		
		if($redirection && !$haveright) {
			//echo '<p>Got it</p>';
			echo '<META HTTP-EQUIV=REFRESH CONTENT="0; '.home_url().'">';
			//wp_redirect( home_url(), 301 );
			exit;
		}
		
		//return false;
		return $haveright;
	}else{
		//return true;
		$haveright = true;
		
		//echo '<p>haveright(page without service code): '.$haveright.'</p>';
		return $haveright;
	}
}

function checkResourceListAccessRight($resource_list_id){	
	$haveright = false;
	
	$access_service_roles = get_field('access_service_code_with_role', $resource_list_id);
	
	if(!empty($access_service_roles)){ //not empty, check access right
	
		$page_access_arr = standardizePageAccess($access_service_roles);
		
		foreach($_SESSION['accessRight'] as $accessRight){			
			foreach($page_access_arr as $page_access){
			
				if($page_access['SERVICECODE'] == $accessRight['SERVICECODE'] && $page_access['ROLEID'] == $accessRight['ROLEID']){
					$haveright = true;
				}else{
					continue;
				}
			}
		}
		
		return $haveright;
	}else{
		$haveright = true;
		
		return $haveright;
	}
}

function initAccessRightChecking($inLoginId){

	session_start();
	if(empty($GLOBALS['SSID'])){
		$GLOBALS['SSID'] = session_id(); ?>
		
		<script type="text/javascript"> //added on 20190408
			var ssid = '<?=$GLOBALS['SSID']?>';
	    </script>
		
	<?php }
	
	$current_post_id = get_the_ID();
	
	//echo '<p>initAccessRightChecking start</p>';

	if(!isset($_SESSION['accessRight'])){ //session NOT EXIST
	
		//echo "<p>SESSION['accessRight'] not found</p>";
		
		$result = acsGetAccessRight($inLoginId);
		//print_r($result);
		
		if(!empty($result)){
			
			$_SESSION['accessRight'] = $result;
			
			//echo "<p>SESSION['accessRight'] added</p>";
			
		}
		
		checkPageAccessRight($current_post_id, true);
		
	}else{ //session EXIST
	
		//echo "<p>SESSION['accessRight'] found</p>";
		
		checkPageAccessRight($current_post_id, true);
		
		//print_r($_SESSION['accessRight']);
	}
	
	//echo '<p>initAccessRightChecking end</p>';
}

function wp_get_exclude_menu($current_menu) {
 	//session_start();
 
    $array_menu = wp_get_nav_menu_items($current_menu);
    $menu = array();
		
	foreach ($array_menu as $m) {
	
		$access_service_roles = get_field('access_service_code_with_role', $m->object_id);
		
		if(!empty($access_service_roles)){ //not empty, check access right
		
			$page_access_arr = standardizePageAccess($access_service_roles);
			$matched_servicecode = 0;
			foreach($_SESSION['accessRight'] as $accessRight){
				
				foreach($page_access_arr as $page_access){
					
					if($page_access['SERVICECODE'] == $accessRight['SERVICECODE'] && $page_access['ROLEID'] == $accessRight['ROLEID']){
						$matched_servicecode++;
						
						//echo $matched_servicecode;
					}
				}
				
			}
			//echo $matched_servicecode;
			if($matched_servicecode < 1){
				if (!in_array($m->object_id, $menu)) {
					array_push($menu, $m->object_id);	
				}
			}
		}
    }
	
	return $menu;
}

