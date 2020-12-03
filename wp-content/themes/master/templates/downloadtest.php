<?php

require('../../../../wp-blog-header.php');
require_once("../../../../wp-config.php");
require_once("../../../../wp-includes/wp-db.php");

// Load WP components, no themes
define('WP_USE_THEMES', false);
require('../../../../wp-load.php');

        echo '<p>Session start</p>';

        var_dump($_SESSION['accessRight']);

        echo '<p>Session end</p>';

?>
