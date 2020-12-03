<footer class="content-info" role="contentinfo">
  <div class="container">
    <?php //dynamic_sidebar('sidebar-footer'); ?>
	<div class="footer-wrapper">
		<div class="footer-links clearfix">
			<?php wp_nav_menu( array( 'theme_location' => 'footer-menu' ) ); ?>
			<!--<a href="#" target="_blank">Pearson Hong Kong</a>
			<a href="#" target="_blank">Terms of Use</a>
			<a href="#" target="_blank">Privacy Policy</a>
			<a href="#" target="_blank">Accessibility</a>-->
		</div>
		<div class="footer-copyright">
			<?php
			 $footer='&copy; Pearson Education Asia Limited ' . date('Y') . '. All Rights Reserved.';
			 echo __($footer, 'Pearson-master'); 
			?>
		</div>
	</div>
  </div>
</footer>

<?php wp_footer(); ?>
