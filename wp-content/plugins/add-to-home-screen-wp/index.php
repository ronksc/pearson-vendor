<?php
/*
    Plugin Name: Add to home screen WP
    Plugin URI: http://tulipemedia.com/en/add-to-home-screen-wordpress-plugin/
    Description: Allow your visitors to add your WordPress blog on their iOS home screen (iPhone, iPod touch, iPad).
    Version: 1.8
    Author: Ziyad Bachalany
    Author URI: http://tulipemedia.com
*/
if(!class_exists('adhsOptions')) :
// DEFINE PLUGIN ID
define('adhsOptions_ID', 'add_to_home_screen');
// DEFINE PLUGIN NICK
define('adhsOptions_NICK', 'ATHS Options');
function adhs_init() {
  load_plugin_textdomain( 'adhs', false, dirname( plugin_basename( __FILE__ ) ) .'/languages' );
}
add_action('plugins_loaded', 'adhs_init');
    class adhsOptions
    {
		/** function/method
		* Usage: return absolute file path
		* Arg(1): string
		* Return: string
		*/
		public static function file_path($file)
		{
			return ABSPATH.'wp-content/plugins/'.str_replace(basename( __FILE__),"",plugin_basename(__FILE__)).$file;
		}
		/** function/method
		* Usage: hooking the plugin options/settings
		* Arg(0): null
		* Return: void
		*/
		public static function register()
		{
			register_setting(adhsOptions_ID.'_options', 'returningvisitor');
			register_setting(adhsOptions_ID.'_options', 'message');
			register_setting(adhsOptions_ID.'_options', 'animationin');
			register_setting(adhsOptions_ID.'_options', 'animationout');
			register_setting(adhsOptions_ID.'_options', 'startdelay');
			register_setting(adhsOptions_ID.'_options', 'lifespan');
			register_setting(adhsOptions_ID.'_options', 'bottomoffset');
			register_setting(adhsOptions_ID.'_options', 'expire');
			register_setting(adhsOptions_ID.'_options', 'touchicon');
			register_setting(adhsOptions_ID.'_options', 'touchicon_url');
			register_setting(adhsOptions_ID.'_options', 'touch_startup_url');
			register_setting(adhsOptions_ID.'_options', 'addmetawebcapabletitle');
			register_setting(adhsOptions_ID.'_options', 'pagetarget');
			register_setting(adhsOptions_ID.'_options', 'aths_touchicon_precomposed');
			register_setting(adhsOptions_ID.'_options', 'touchicon_url72');
			register_setting(adhsOptions_ID.'_options', 'touchicon_url114');
			register_setting(adhsOptions_ID.'_options', 'touchicon_url144');
			register_setting(adhsOptions_ID.'_options', 'aths_increaseslot');
		}
		/** function/method
		* Usage: hooking (registering) the plugin menu
		* Arg(0): null
		* Return: void
		*/
		public static function menu()
		{
			// Create menu tab
			add_options_page(adhsOptions_NICK.' Plugin Options', adhsOptions_NICK, 'manage_options', adhsOptions_ID.'_options', array('adhsOptions', 'options_page'));
		}
		/** function/method
		* Usage: show options/settings form page
		* Arg(0): null
		* Return: void
		*/
		public static function options_page()
		{
			if (!current_user_can('manage_options'))
			{
				wp_die( __('You do not have sufficient permissions to access this page.') );
			}

			$plugin_id = adhsOptions_ID;
			// display options page
			include(self::file_path('options.php'));
		}
    }
    if ( is_admin() )
	{
		add_action('admin_init', array('adhsOptions', 'register'));
		add_action('admin_menu', array('adhsOptions', 'menu'));
	}
	
	add_filter('plugin_action_links', 'aths_plugin_action_links', 10, 2);
	function aths_plugin_action_links($links, $file) {
		static $this_plugin;

		if (!$this_plugin) {
			$this_plugin = plugin_basename(__FILE__);
		}

		if ($file == $this_plugin) {
			// The "page" query string value must be equal to the slug
			// of the Settings admin page we defined earlier, which in
			// this case equals "myplugin-settings".
			$settings_link = '<a href="' . get_bloginfo('wpurl') . '/wp-admin/options-general.php?page=add_to_home_screen_options">Settings</a>';
			array_unshift($links, $settings_link);
		}
    return $links;
	}
	
	
	//custom script in header
	function add2homecustom() {
    echo'<script type="text/javascript">';
	echo'var addToHomeConfig = {';
	if (get_option('message')) { $str = preg_replace("(\r\n|\n|\r)", " ", get_option('message')); echo'message:\''; echo addslashes($str); echo'\','; }
	if (get_option('returningvisitor') == true) { echo 'returningVisitor: \'true\','; }
	echo 'animationIn:\''; echo get_option('animationin', 'fade'); echo'\',';
	echo 'animationOut:\''; echo get_option('animationout', 'fade'); echo'\',';
	echo 'startdelay:'; if (!get_option('startdelay')) { echo'2000'; } else { echo get_option('startdelay'); } echo',';
	echo 'lifespan:'; if (!get_option('lifespan')) { echo'20000'; } else { echo get_option('lifespan'); } echo',';
	echo 'expire:'; if (!get_option('expire')) { echo'0'; } else { echo get_option('expire'); } echo',';
	echo 'touchIcon:'; if (get_option('touchicon') == true) { echo 'true'; } else {echo'false';}
	echo'}';
	echo'</script>';
	}
	add_action('wp_head', 'add2homecustom', 8);
	
	//add css file
/*
Loading of the Add to Home Screen Floating Layer by Matteo Spinelli.
[Official homepage](http://cubiq.org/add-to-home-screen)
## License

This software is released under the MIT License.

Copyright (c) 2013 Matteo Spinelli, http://cubiq.org/

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/
	add_action( 'wp_enqueue_scripts', 'addtohomecss' );
	function addtohomecss() {
		if ((get_option('pagetarget') == 'homeonly') ) {
			if ( is_home() || is_front_page() ) {
				wp_register_style( 'adhs', plugins_url('add2home.css', __FILE__) );
				wp_enqueue_style( 'adhs' );
			}
		} elseif (get_option('pagetarget') == 'allpages') {
			wp_register_style( 'adhs', plugins_url('add2home.css', __FILE__) );
			wp_enqueue_style( 'adhs' );
		}
		else {
			wp_register_style( 'adhs', plugins_url('add2home.css', __FILE__) );
			wp_enqueue_style( 'adhs' );
		}
    }
	
	//add js file
	add_action( 'wp_enqueue_scripts', 'addtohomejs', 10 );
	function addtohomejs()
	{
		if ((get_option('pagetarget') == 'homeonly') ) {
			if ( is_home() || is_front_page() ) {
				// Register the script:
				wp_register_script( 'adhs', plugins_url('add2home.js', __FILE__) );
				// Enqueue the script:
				wp_enqueue_script( 'adhs' );
			}
		} elseif (get_option('pagetarget') == 'allpages') {
			// Register the script:
			wp_register_script( 'adhs', plugins_url('add2home.js', __FILE__) );
			// Enqueue the script:
			wp_enqueue_script( 'adhs' );
		}
		else {
			// Register the script:
			wp_register_script( 'adhs', plugins_url('add2home.js', __FILE__) );
			// Enqueue the script:
			wp_enqueue_script( 'adhs' );
		}
	}
	
	function addmetawebcapable() { ?>
    <meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<? }
	if (get_option('browseraths') == 'fullscreenmode')
	{
	add_action('wp_head', 'addmetawebcapable', 3);
	}
	
	function addmetawebcapable_title() { ?>
    <meta name="apple-mobile-web-app-title" content="<?php if (get_option('addmetawebcapabletitle')) { echo get_option('addmetawebcapabletitle'); } else { echo wp_title(''); } ?>">
	<? }
	add_action('wp_head', 'addmetawebcapable_title', 2);
	
	function addtouchicon_url() {
	echo'<link rel="apple-touch-icon'; if (get_option('aths_touchicon_precomposed')) { echo'-precomposed'; } echo'" href="';
	echo get_option('touchicon_url');
	echo'">';
	}
	function addtouchicon_url72() {
	echo'<link rel="apple-touch-icon'; if (get_option('aths_touchicon_precomposed')) { echo'-precomposed'; } echo'" sizes="72x72" href="';
	echo get_option('touchicon_url72');
	echo'">';
	}
	function addtouchicon_url114() {
	echo'<link rel="apple-touch-icon'; if (get_option('aths_touchicon_precomposed')) { echo'-precomposed'; } echo'" sizes="114x114" href="';
	echo get_option('touchicon_url114');
	echo'">';
	}
	function addtouchicon_url144() {
	echo'<link rel="apple-touch-icon'; if (get_option('aths_touchicon_precomposed')) { echo'-precomposed'; } echo'" sizes="144x144" href="';
	echo get_option('touchicon_url144');
	echo'">';
	}
	if (get_option('touchicon_url')) {
	add_action('wp_head', 'addtouchicon_url', 4);
	}
	if (get_option('touchicon_url72')) {
	add_action('wp_head', 'addtouchicon_url72', 4);
	}
	if (get_option('touchicon_url114')) {
	add_action('wp_head', 'addtouchicon_url114', 4);
	}
	if (get_option('touchicon_url144')) {
	add_action('wp_head', 'addtouchicon_url144', 4);
	}
	
	function touch_startup_url() { 
	echo'<link rel="apple-touch-startup-image" href="';
	echo get_option('touch_startup_url');
	echo'" media="screen and (max-device-width : 320px)">';
	}
	function touch_startup_url920() { 
	echo'<link rel="apple-touch-startup-image" href="';
	echo get_option('touch_startup_url920');
	echo'" media="(max-device-width : 480px) and (-webkit-min-device-pixel-ratio : 2)">';
	}
	function touch_startup_url1096() { 
	echo'<link rel="apple-touch-startup-image" href="';
	echo get_option('touch_startup_url1096');
	echo'" media="(max-device-width : 548px) and (-webkit-min-device-pixel-ratio : 2)">';
	}
	function touch_startup_url748() { 
	echo'<link rel="apple-touch-startup-image" sizes="1024x748" href="';
	echo get_option('touch_startup_url748');
	echo'" media="screen and (min-device-width : 481px) and (max-device-width : 1024px) and (orientation : landscape)">';
	}
	function touch_startup_url1004() { 
	echo'<link rel="apple-touch-startup-image" sizes="768x1004" href="';
	echo get_option('touch_startup_url1004');
	echo'" media="screen and (min-device-width : 481px) and (max-device-width : 1024px) and (orientation : portrait)">';
	}
	if (get_option('touch_startup_url')) {
	add_action('wp_head', 'touch_startup_url', 5);
	}
	if (get_option('touch_startup_url920')) {
	add_action('wp_head', 'touch_startup_url920', 5);
	}
	if (get_option('touch_startup_url1096')) {
	add_action('wp_head', 'touch_startup_url1096', 5);
	}
	if (get_option('touch_startup_url748')) {
	add_action('wp_head', 'touch_startup_url748', 5);
	}
	if (get_option('touch_startup_url1004')) {
	add_action('wp_head', 'touch_startup_url1004', 5);
	}
	
	function addmetawebcapablelinks() { ?>
		<script type="text/javascript">
		(function(document,navigator,standalone) {
            // prevents links from apps from oppening in mobile safari
            // this javascript must be the first script in your <head>
            if ((standalone in navigator) && navigator[standalone]) {
                var curnode, location=document.location, stop=/^(a|html)$/i;
                document.addEventListener('click', function(e) {
                    curnode=e.target;
                    while (!(stop).test(curnode.nodeName)) {
                        curnode=curnode.parentNode;
                    }
                    // Condidions to do this only on links to your own app
                    // if you want all links, use if('href' in curnode) instead.
                    if('href' in curnode && ( curnode.href.indexOf('http') || ~curnode.href.indexOf(location.host) ) ) {
                        e.preventDefault();
                        location.href = curnode.href;
                    }
                },false);
            }
        })(document,window.navigator,'standalone');
		</script>
	<?php }
	if (!get_option('addmetawebcapablelinks')) {
	add_action('wp_head', 'addmetawebcapablelinks', 3);
	}
	
	function aths_track() { ?>
		<script>
  if (window.navigator.standalone == true && ( navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) )) {
  		_gaq.push(['_setCustomVar', 5, 'webapp', 'yes', 2 ]);
      }
  else {
  		_gaq.push(['_setCustomVar', 5, 'webapp', 'no', 2 ]);
      }
		</script>
	<?php }
	if (get_option('aths_track')) {
	add_action('wp_head', 'aths_track', 4);
	}

function addbottommenu() { ?>	
	<script>
if (window.navigator.standalone == true) {
 document.write('<div id="backforward"><div id="backnav"><a href="javascript:history.back();"><span> </span></a></div><div id="nextnav"><a href="javascript:history.forward();"><span></span></a></div><div id="refreshnav"><A HREF="javascript:history.go(0)"><span>&#x21bb;</span></A></div></div>');
}else{
 document.write('');
}
</script>
	<?php }
	if ((get_option('browseraths') == 'fullscreenmode') AND(!get_option('webappnavbar')))
	{
	add_action('wp_footer', 'addbottommenu', 15);
	}
	
endif;
?>