<?php global $wp_query; ?>
<?php get_template_part('templates/page', 'header'); ?>
<div class="container">
  <?php get_search_form(); ?>
  <?php if (!have_posts()) : ?>
  <div class="alert alert-warning">
    <?php _e('Sorry, no results were found.', 'roots'); ?>
  </div>
  <?php //get_search_form(); ?>
  <?php endif; ?>
  <h2>Result found: <?php echo $wp_query->found_posts; ?></h2>
	<div class="page-template-template-resource-list">
		<div class="resource-container clearfix">
			<div class="resource-container-inner">
  <?php while (have_posts()) : the_post(); ?>
  <?php
	
	$resource_id = $post->ID;
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

	$matched = false;?>
	
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
						echo get_file_thumbnail_listing($file_type, $file_extension, $downloadable_file, $file_title, $page_id, $resource->parentlist);
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
									echo '<option value="'.getFileDownloadLink($downloadable_file['ID'], $page_id, $resource->parentlist).'">'.$file_title.'</option>';
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
							echo get_file_thumbnail_listing($file_type, $file_extension, $downloadable_file, $file_title, $page_id, $resource->parentlist);
							echo '</div>';

							echo '<div class="file-download-wrapper hidden-md hidden-lg">';
							//echo '<a href="'.$downloadable_file['url'].'" class="media-file all" target="_blank">Download</a>';; 

							//echo '<a href="'.get_template_directory_uri().'/templates/download.php?file='.$downloadable_file['ID'].'&pageid='.$page_id.'" class="media-file all" target="_blank">'.__('Download', 'Pearson-master').'</a>';
							//Commented on 20181005
							//echo '<a href="'.(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . '://'.$_SERVER['SERVER_NAME'].'?pageaction=filedownload&file='.$downloadable_file['ID'].'&pageid='.$page_id.'" class="media-file all" target="_blank">'.__('Download', 'Pearson-master').'</a>';

							echo '<a href="'.getFileDownloadLink($downloadable_file['ID'], $page_id, $resource->parentlist).'" class="media-file all" target="_blank">'.__('Download', 'Pearson-master').'</a>';

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
									echo get_file_thumbnail_listing($file_type, $file_extension, $downloadable_file, $file_title, $page_id, $resource->parentlist);
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
  <?php endwhile; ?>
		</div>
	</div>
</div>
  <?php if ($wp_query->max_num_pages > 1) : ?>
  <nav class="post-nav">
    <ul class="pager">
      <li class="previous">
        <?php next_posts_link(__('&larr; Older posts', 'roots')); ?>
      </li>
      <li class="next">
        <?php previous_posts_link(__('Newer posts &rarr;', 'roots')); ?>
      </li>
    </ul>
  </nav>
  <?php endif; ?>
</div>
