<div class="wrap">
 <style type="text/css">

	input {
    border:1px solid #aaa;
    background: #fff;
}
input:focus {
    background: #fff;
    border:1px solid #555;
    box-shadow: 0px 0px 3px #ccc, 0 10px 15px #eee inset;
    border-radius:2px;
}
label {
width:100%;
   margin-bottom: 18px;
    display:inline-block;
	font-size:12px;
}
p, h2, h3 {
font-family: "Lucida Sans", "Lucida Grande", "Lucida Sans Unicode", sans-serif;
}
h3 {
margin-top:0px;
}

.adhs_description_field {
width:470px;
float: left;
margin-right:50px;
margin-bottom:20px;
line-height: 1.5em;
text-align: justify;
}
.adhs_description_field_touch {
width:280px;
float: left;
margin-right:30px;
margin-bottom:-5px;
}

.adhs_description_field span {
font-size:13px;
}

 </style>
    <?php screen_icon(); ?>

	<form action="options.php" method="post" id="<?php echo $plugin_id; ?>_options_form" name="<?php echo $plugin_id; ?>_options_form">

	<?php settings_fields($plugin_id.'_options'); ?>

    <h2><?php _e('ATHS Options &raquo; Settings', 'adhs'); ?></h2>
	<div style="width:780px; height:415px; background-color: #F2FBFD; margin-left: auto; margin-right: auto; margin-bottom: 20px; margin-top: 20px; padding: 16px; border: 1px solid #B7E9E9;">
	<h3 align="center"><?php _e('Keep in touch with me.', 'adhs'); ?></h3>
		<div style="width:300px; float: left; margin-right:20px;">
			<a href="https://twitter.com/ziyadbachalany" class="twitter-follow-button" data-show-count="true" data-lang="en" data-size="large">Follow @ziyadbachalany</a>
			<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
			<br /><br />
			<div id="fb-root"></div>
				<script>(function(d, s, id) {
					var js, fjs = d.getElementsByTagName(s)[0];
					if (d.getElementById(id)) return;
					js = d.createElement(s); js.id = id;
					js.src = "//connect.facebook.net/fr_FR/all.js#xfbml=1&appId=222667281101667";
					fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk'));</script>
			<div class="fb-like-box" data-href="http://www.facebook.com/tulipemedia" data-width="240" data-show-faces="false" data-stream="false" data-header="true"></div>
			<h4 style="margin-bottom:4px;"><?php _e('Let me know that you are using my plugin!', 'adhs'); ?></h4>
			<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://tulipemedia.com/en/add-to-home-screen-wordpress-plugin/" data-lang="en" data-hashtags="iPhone,iPad,Apple,iOS" data-text="Using the Add to home screen #WordPress #plugin by @ziyadbachalany!">Spread the word!</a>
			<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
			<p><a href="https://instagram.com/ziyadbachalany" target="_blank">Instagram</a> & <a href="https://www.facebook.com/ziyadbachalany" target="_blank">Facebook</a></p>
			<p>Blog: <a href="https://tulipemedia.com">www.tulipemedia.com</a></p>
			<p>🙌❤️</p>
		</div>
		<div style="width:300px; display: block; padding:0; float: right;">
			<div class="LI-profile-badge"  data-version="v1" data-size="medium" data-locale="fr_FR" data-type="vertical" data-theme="light" data-vanity="ziyadbachalany"><a class="LI-simple-link" href='https://fr.linkedin.com/in/ziyadbachalany?trk=profile-badge'>Ziyad Bachalany</a></div>
		</div>
	</div>
    <table class="widefat">
		<thead>
		   <tr>
			 <th><input type="submit" name="submit" value="<?php _e('Save Settings', 'adhs'); ?>" class="button-primary" /></th>
		   </tr>
		</thead>
		<tfoot>
		   <tr>
			 <th><input type="submit" name="submit" value="<?php _e('Save Settings', 'adhs'); ?>" class="button-primary"></th>
		   </tr>
		</tfoot>
		<tbody>
		   <tr>
			 <td style="padding:25px; font-size: 25px;">
			 <h2 style="margin-bottom:15px;"><?php _e('Floating bubble options', 'adhs'); ?></h2>
				 <label for="returningvisitor">
				 <h3><?php _e('Show to returning visitors only', 'adhs'); ?></h3>
					<div class="adhs_description_field">
						<span><?php _e('Set this to true and the message won\'t be shown the first time one user visits your blog. It can be useful to target only returning visitors and not irritate first time visitors. <i>I recommend to check this value</i>.', 'adhs'); ?></span>
					</div>
					<input type="checkbox" name="returningvisitor" <?php checked( get_option('returningvisitor') == 'on',true); ?> />
                 </label>
                 <label for="message">
				 <h3><?php _e('Custom message', 'adhs'); ?></h3>
                    <div class="adhs_description_field">
						<span><?php _e('Type the custom message that you want appearing in the balloon. You can also display default message in the language of your choice by typing the locale (e.g: en_us).', 'adhs'); ?></span>
						<span><br /><?php _e('<i>Use %device to show user\'s device on message, %icon to display the first add icon, and %add to display the second add to home screen icon.</i>', 'adhs'); ?></span>
					</div>
                    <textarea style="width:380px" rows="3" cols="50" name="message"/><?php echo get_option('message'); ?></textarea>
                 </label>
				 <label for="animationin">
				  <h3><?php _e('Animation in', 'adhs'); ?></h3>
					<div class="adhs_description_field">
						<span><?php _e('The animation the balloon appears with.', 'adhs'); ?></span>
					</div>
					<select name="animationin" id="animationin">
						<option value="drop"<?php echo selected(get_option('animationin'),drop); ?>>drop</option>
						<option value="bubble"<?php echo selected(get_option('animationin'),bubble); ?>>bubble</option>
						<option value="fade"<?php echo selected(get_option('animationin'),fade); ?>>fade</option>
					</select>
                 </label>
				 <label for="animationout">
					<h3><?php _e('Animation out', 'adhs'); ?></h3>
					<div class="adhs_description_field">
						<span><?php _e('The animation the balloon exits with.', 'adhs'); ?></span>
					</div>
					<select name="animationout" id="animationout">
						<option value="drop"<?php echo selected(get_option('animationout'),drop); ?>>drop</option>
						<option value="bubble"<?php echo selected(get_option('animationout'),bubble); ?>>bubble</option>
						<option value="fade"<?php echo selected(get_option('animationout'),fade); ?>>fade</option>
					</select>
                 </label>
                 <label for="startdelay">
					<h3><?php _e('Start delay', 'adhs'); ?></h3>
					<div class="adhs_description_field">
						<span><?php _e('Milliseconds to wait before showing the message. Default: 2000', 'adhs'); ?></span>
					</div>
                     <input type="text" name="startdelay" value="<?php echo get_option('startdelay'); ?>"  />
                 </label>
                 <label for="lifespan">
					<h3><?php _e('Lifespan', 'adhs'); ?></h3>
					<div class="adhs_description_field">
						<span><?php _e('Milliseconds to wait before hiding the message. Default: 20000', 'adhs'); ?></span>
					</div>
					<input type="text" name="lifespan" value="<?php echo get_option('lifespan'); ?>"  />
                 </label>
                 <label for="bottomoffset">
					<h3><?php _e('Bottom offset', 'adhs'); ?></h3>
					<div class="adhs_description_field">
						<span><?php _e('Distance in pixels from the bottom (iPhone) or the top (iPad). Default: 14', 'adhs'); ?></span>
                    </div>
					<input type="text" name="bottomoffset" value="<?php echo get_option('bottomoffset'); ?>"  />
                 </label>
                 <label for="expire">
					<h3><?php _e('Expire timeframe', 'adhs'); ?></h3>
					<div class="adhs_description_field">
						<span><?php _e('Minutes before displaying the message again. Default: 0 (=always show). It\'s highly recommended to set a timeframe in order to prevent showing message at each and every page load for those who didn\'t add the Web App to their homescreen or those who added it but load the blog on Safari!<br /><i>Recommended values: 43200 for one month or 525600 for one year.</i>', 'adhs'); ?></span>
					</div>
                    <input type="text" name="expire" value="<?php echo get_option('expire'); ?>"  />
                 </label>
				 <hr style="color:#F2F3F3; background-color:#F2F3F3">
				 <h2 style="margin-bottom:15px;"><?php _e('iOs touch icons', 'adhs'); ?></h2>
                 <label for="touchicon">
					<h3><?php _e('Touch icon', 'adhs'); ?></h3>
					<div class="adhs_description_field">
						<span><?php _e('If checked, the script checks for link rel="apple-touch-icon" in the page HEAD and displays the application icon next to the message.', 'adhs'); ?></span>
					</div>
                    <input type="checkbox" name="touchicon" <?php checked( get_option('touchicon') == 'on',true); ?> />
                 </label>
                <label for="aths_touchicon_precomposed">
					<h3><?php _e('Precomposed icons', 'adhs'); ?></h3>
					<div class="adhs_description_field">
						<span><?php _e('If checked, icons will display without the Apple gloss effect.', 'adhs'); ?></span>
					</div>
                    <input type="checkbox" name="aths_touchicon_precomposed" <?php checked( get_option('aths_touchicon_precomposed') == 'on',true); ?> />
                </label>
				<label style="margin-bottom:-5px;">
				<h3><?php _e('Touch icons URLs', 'adhs'); ?></h3>
				<div class="adhs_description_field">
				<span><?php _e('If mentionned, those fields add <i>link rel="apple-touch-icon"</i> in the page HEAD (convenient for those who have no touch icon). Just paste the URLs of your icons.', 'adhs'); ?></span>
				</div>
				</label>
				<label for="touchicon_url">
					<div class="adhs_description_field_touch">
						<span><?php _e('57x57 touch icon URL (for iPhone 3GS and 2011 iPod Touch).', 'adhs'); ?></span>
					</div>
					<input type="url" size="60" name="touchicon_url" value="<?php echo get_option('touchicon_url'); ?>"  />
                </label>
				<label for="touchicon_url72">
					<div class="adhs_description_field_touch">
						<span><?php _e('72x72 touch icon URL (for 1st generation iPad, iPad 2 and iPad mini).', 'adhs'); ?></span>
					</div>
					<input type="url" size="60" name="touchicon_url72" value="<?php echo get_option('touchicon_url72'); ?>"  />
                </label>
				<label for="touchicon_url114">
					<div class="adhs_description_field_touch">
						<span><?php _e('114x114 touch icon URL (for iPhone 4, 4S, 5 and 2012 iPod Touch).', 'adhs'); ?></span>
					</div>
					<input type="url" size="60" name="touchicon_url114" value="<?php echo get_option('touchicon_url114'); ?>"  />
                </label>
				<label for="touchicon_url144">
					<div class="adhs_description_field_touch">
						<span><?php _e('144x144 touch icon URL (for iPad 3rd and 4th generation).', 'adhs'); ?></span>
					</div>
					<input type="url" size="60" name="touchicon_url144" value="<?php echo get_option('touchicon_url144'); ?>"  />
                </label>
				
				<label for="addmetawebcapabletitle" style="margin-top:15px">
				<h3><?php _e('Title of your Web App', 'adhs'); ?></h3>
					<div class="adhs_description_field">
						<span class="adhs_description_field"><?php _e('Type the name of your blog (max: 12 characters !). Default: it takes the default title of the page.', 'adhs'); ?></span>
					</div>
					 <input type="text" name="addmetawebcapabletitle" value="<?php echo get_option('addmetawebcapabletitle'); ?>"  />
                </label>
				<label for="pagetarget">
				<h3><?php _e('On which page the balloon should appear?', 'adhs'); ?></h3>
					<div class="adhs_description_field">
						<span class="adhs_description_field"><?php _e('Keep in mind that if someone adds your blog to home screen from a single article page for instance, the web app will load this page and not the homepage of the blog. That\'s why you could choose to open the floating balloon on homepage only and not on all pages of your blog.', 'adhs'); ?></span>
					</div>
					<select name="pagetarget" id="pagetarget">
						<option value="homeonly"<?php echo selected(get_option('pagetarget'),homeonly); ?>><?php _e('Home only', 'adhs'); ?></option>
						<option value="allpages"<?php echo selected(get_option('pagetarget'),allpages); ?>><?php _e('All pages', 'adhs'); ?></option>
					</select>
                </label>
             </td>
		   </tr>
		</tbody>
	</table>

	</form>
<script type="text/javascript" src="https://platform.linkedin.com/badges/js/profile.js" async defer></script>
</div>