/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can 
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */

(function($) {

// Use this variable to set up the common and page specific functions. If you 
// rename this variable, you will also need to rename the namespace below.
var Roots = {
  // All pages
  common: {
    init: function() {
      // JavaScript to be fired on all pages
	  //console.log('JS!');
	  var myWindow;
	  
	  
	  function initNavbarToggle(){
		$('.navbar-toggle').unbind('click');
		$('.navbar-toggle').click(function(){
			if($(this).hasClass('collapsed')){
				$(this).removeClass('collapsed');
				$('.menu_bg').fadeIn();
			}else{
				$(this).addClass('collapsed');
				$('.menu_bg').fadeOut();
			}
		});
	  }
	  
	  $(document).ready(function(){
		initMultipleDownload();			
		initNavbarToggle();
		
		$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
			event.preventDefault(); 
			event.stopPropagation(); 
			$(this).parent().siblings().removeClass('open');
			$(this).parent().toggleClass('open');
			
			$( '.dropdown' ).on( 'show.bs.dropdown', function() {
				$( this ).find( '.dropdown-menu' ).first().stop( true, true ).slideDown( 150 );
			  } );
		});
	  });
    }
  },
  // Home page
  home: {
    init: function() {
      // JavaScript to be fired on the home page
	  function initSlider(){
		  if($('.home-slider').length > 0){
			  $('.home-slider').slick({
				dots: true,	
				arrows: false
			  });
		  }
	  }
	  
	  $(document).ready(function(){
		initSlider();						 
	  });
    }
  },
  // About us page, note the change from about-us to about_us.
  about_us: {
    init: function() {
      // JavaScript to be fired on the about us page
    }
  },
  page_template_template_resource:{
	init: function() {	
		function ajax_action_grid(pageNum){
			var ajaxurl = '/wp-admin/admin-ajax.php';
			
			var filter_1 = 0,
				filter_2 = 0,
				filter_3 = 0;
			
			if($('#filter_1').length > 0){
				filter_1 = $('#filter_1').val();
			}
			
			if($('#filter_2').length > 0){
				filter_2 = $('#filter_2').val();
			}
			
			if($('#filter_3').length > 0){
				filter_3 = $('#filter_3').val();
			}
			
			$('.resource-container-inner').fadeOut();
			$('.pagination').fadeOut();
			
			var result1;
			var result2;
			$.when(
				$.ajax({
				  url: ajaxurl,
				  type: 'post',
				  data: {
					action: 'get_resource_grid', 
					page: pageNum,
					resource_listID: resource_listID, 
					filters: filter_1+','+filter_2+','+filter_3
				  },
				  success: function( result ) {
					result1 = result;
				  },
				  error: function(MLHttpRequest, textStatus, errorThrown){
					alert('Sorry, something went wrong. Please try again.');
				  }
				}),
				
				$.ajax({
				  url: ajaxurl,
				  type: 'post',
				  data: {
					action: 'get_resource_pagination', 
					page: pageNum,
					resource_listID: resource_listID, 
					filters: filter_1+','+filter_2+','+filter_3
				  },
				  success: function( result ) {
					result2 = result;
				  },
				  error: function(MLHttpRequest, textStatus, errorThrown){
					alert('Sorry, something went wrong. Please try again.');
				  }
				})
			).then(function(){
				//update resource
				$('.resource-container-inner').html(result1);
				$('.resource-container-inner').fadeIn();
				initMultipleDownload();
				initAudioSetup();
				createZip();
				
				//update pagination
				$('.pagination').html(result2);
				$('.pagination').fadeIn();
				get_post_grid();
				
				if(typeof pageNum !== 'undefined'){
					currentPageNum = pageNum;
				}else{
					currentPageNum = 1;
				}
			});
		}
		
		function get_post_grid(){
			
			if($('.btn_gopage_next').length > 0){
				$('.btn_gopage_next').unbind('click');	
				$('.btn_gopage_next').on('click touchstart', function(){
					//console.log('currentPageNum: '+currentPageNum);
					
					var lastValue = $('#pagination-select option:last-child').val();
					var newPageNum = 0;
					
					if(parseInt(currentPageNum) < lastValue){
						newPageNum = parseInt(currentPageNum)+1;
					}
					
					//console.log('newPageNum: '+newPageNum);
					ajax_action_grid(newPageNum);
				});
			}
			
			if($('.btn_gopage_prev').length > 0){
				$('.btn_gopage_prev').unbind('click');	
				$('.btn_gopage_prev').on('click touchstart', function(){
					currentPageNum = $('#pagination-select').val();
					//console.log('currentPageNum: '+currentPageNum);
					var newPageNum = 0;
					
					if(parseInt(currentPageNum) > 1){
						newPageNum = parseInt(currentPageNum)-1;
					}
					
					//console.log('newPageNum: '+newPageNum);
					ajax_action_grid(newPageNum);
				});
			}
			
			$('.resource_filtering').unbind('change');
			$('.resource_filtering').on('change', function(){
				ajax_action_grid();									   
			});
			
			$('#pagination-select').unbind('change');
			$('#pagination-select').on('change', function(){			
				ajax_action_grid($(this).val());									   
			});
		}
		
		$('document').ready(function(){
			initAudioSetup();
			createZip();
			get_post_grid();
		});
	}
  },
  page_template_template_resource_list:{
	init: function() {
		function ajax_action_list(pageNum){			
			var ajaxurl = '/wp-admin/admin-ajax.php';
			
			var filter_1 = 0,
				filter_2 = 0,
				filter_3 = 0;
			
			if($('#filter_1').length > 0){
				filter_1 = $('#filter_1').val();
			}
			
			if($('#filter_2').length > 0){
				filter_2 = $('#filter_2').val();
			}
			
			if($('#filter_3').length > 0){
				filter_3 = $('#filter_3').val();
			}
			
			$('.resource-container-inner').fadeOut();
			$('.pagination').fadeOut();
			
			var result1;
			var result2;
			$.when(
				$.ajax({
				  url: ajaxurl,
				  type: 'post',
				  data: {
					action: 'get_resource_list', 
					page: pageNum,
					resource_listID: resource_listID, 
					filters: filter_1+','+filter_2+','+filter_3
				  },
				  success: function( result ) {
					result1 = result;
				  },
				  error: function(MLHttpRequest, textStatus, errorThrown){
					alert('Sorry, something went wrong. Please try again.');
				  }
				}),
				
				$.ajax({
				  url: ajaxurl,
				  type: 'post',
				  data: {
					action: 'get_resource_pagination', 
					page: pageNum,
					resource_listID: resource_listID, 
					filters: filter_1+','+filter_2+','+filter_3
				  },
				  success: function( result ) {
					result2 = result;
				  },
				  error: function(MLHttpRequest, textStatus, errorThrown){
					alert('Sorry, something went wrong. Please try again.');
				  }
				})
			).then(function(){
				//update resource
				$('.resource-container-inner').html(result1);
				$('.resource-container-inner').fadeIn();
				initMultipleDownload();
				initAudioSetup();
				createZip();
				
				//update pagination
				$('.pagination').html(result2);
				$('.pagination').fadeIn();
				get_post_list();
				
				if(typeof pageNum !== 'undefined'){
					currentPageNum = pageNum;
				}else{
					currentPageNum = 1;
				}
			});
		}
		
		function get_post_list(){
			if($('.btn_gopage_next').length > 0){
				$('.btn_gopage_next').unbind('click');	
				$('.btn_gopage_next').on('click touchstart', function(){
					//console.log('currentPageNum: '+currentPageNum);
					
					var lastValue = $('#pagination-select option:last-child').val();
					var newPageNum = 0;
					
					if(parseInt(currentPageNum) < lastValue){
						newPageNum = parseInt(currentPageNum)+1;
					}
					
					//console.log('newPageNum: '+newPageNum);
					ajax_action_list(newPageNum);
				});
			}
			
			if($('.btn_gopage_prev').length > 0){
				$('.btn_gopage_prev').unbind('click');	
				$('.btn_gopage_prev').on('click touchstart', function(){
					currentPageNum = $('#pagination-select').val();
					//console.log('currentPageNum: '+currentPageNum);
					var newPageNum = 0;
					
					if(parseInt(currentPageNum) > 1){
						newPageNum = parseInt(currentPageNum)-1;
					}
					
					//console.log('newPageNum: '+newPageNum);
					ajax_action_list(newPageNum);
				});
			}
			
			$('.resource_filtering').unbind('change');
			$('.resource_filtering').on('change', function(){
				ajax_action_list();									   
			});
			
			$('#pagination-select').unbind('change');
			$('#pagination-select').on('change', function(){			
				ajax_action_list($(this).val());									   
			});
		}
		
		$('document').ready(function(){
			initAudioSetup();
			get_post_list();
			createZip();
		});
	}
  },
  page_template_template_all_resources:{
	init: function() {
		function ajax_action_grid(pageNum){			
			var ajaxurl = '/wp-admin/admin-ajax.php';
			
			var filter_1 = 0,
				filter_2 = 0,
				filter_3 = 0;
			
			if($('#filter_1').length > 0){
				filter_1 = $('#filter_1').val();
			}
			
			if($('#filter_2').length > 0){
				filter_2 = $('#filter_2').val();
			}
			
			if($('#filter_3').length > 0){
				filter_3 = $('#filter_3').val();
			}
			
			$('.resource-container-inner').fadeOut();
			$('.pagination').fadeOut();
			
			var result1;
			var result2;
			$.when(
				$.ajax({
				  url: ajaxurl,
				  type: 'post',
				  data: {
					action: 'get_all_resources_grid', 
					page: pageNum,
					//resource_listID: resource_listID, 
					filters: filter_1+','+filter_2+','+filter_3
				  },
				  success: function( result ) {
					result1 = result;
				  },
				  error: function(MLHttpRequest, textStatus, errorThrown){
					alert('Sorry, something went wrong. Please try again.');
				  }
				}),
				
				$.ajax({
				  url: ajaxurl,
				  type: 'post',
				  data: {
					action: 'get_all_resource_pagination', 
					page: pageNum,
					//resource_listID: resource_listID, 
					filters: filter_1+','+filter_2+','+filter_3
				  },
				  success: function( result ) {
					result2 = result;
				  },
				  error: function(MLHttpRequest, textStatus, errorThrown){
					alert('Sorry, something went wrong. Please try again.');
				  }
				})
			).then(function(){
				//update resource
				$('.resource-container-inner').html(result1);
				$('.resource-container-inner').fadeIn();
				initMultipleDownload();
				initAudioSetup();
				createZip();
				
				//update pagination
				$('.pagination').html(result2);
				$('.pagination').fadeIn();
				get_all_resources();
				
				if(typeof pageNum !== 'undefined'){
					currentPageNum = pageNum;
				}else{
					currentPageNum = 1;
				}
			});
		}
		
		function get_all_resources(){
			if($('.btn_gopage_next').length > 0){
				$('.btn_gopage_next').unbind('click');	
				$('.btn_gopage_next').on('click touchstart', function(){
					//console.log('currentPageNum: '+currentPageNum);
					
					var lastValue = $('#pagination-select option:last-child').val();
					var newPageNum = 0;
					
					if(parseInt(currentPageNum) < lastValue){
						newPageNum = parseInt(currentPageNum)+1;
					}
					
					//console.log('newPageNum: '+newPageNum);
					ajax_action_grid(newPageNum);
				});
			}
			
			if($('.btn_gopage_prev').length > 0){
				$('.btn_gopage_prev').unbind('click');	
				$('.btn_gopage_prev').on('click touchstart', function(){
					currentPageNum = $('#pagination-select').val();
					//console.log('currentPageNum: '+currentPageNum);
					var newPageNum = 0;
					
					if(parseInt(currentPageNum) > 1){
						newPageNum = parseInt(currentPageNum)-1;
					}
					
					//console.log('newPageNum: '+newPageNum);
					ajax_action_grid(newPageNum);
				});
			}
			
			$('.resource_filtering').unbind('change');
			$('.resource_filtering').on('change', function(){
				ajax_action_grid();									   
			});
			
			$('#pagination-select').unbind('change');
			$('#pagination-select').on('change', function(){			
				ajax_action_grid($(this).val());									   
			});
		}
		
		$('document').ready(function(){
			initAudioSetup();
			createZip();
			get_all_resources();
		});
	}
  },
  page_template_template_all_resources_list:{
	init: function() {
		function ajax_action_list(pageNum){			
			var ajaxurl = '/wp-admin/admin-ajax.php';
			
			var filter_1 = 0,
				filter_2 = 0,
				filter_3 = 0;
			
			if($('#filter_1').length > 0){
				filter_1 = $('#filter_1').val();
			}
			
			if($('#filter_2').length > 0){
				filter_2 = $('#filter_2').val();
			}
			
			if($('#filter_3').length > 0){
				filter_3 = $('#filter_3').val();
			}
			
			$('.resource-container-inner').fadeOut();
			$('.pagination').fadeOut();
			
			var result1;
			var result2;
			$.when(
				$.ajax({
				  url: ajaxurl,
				  type: 'post',
				  data: {
					action: 'get_all_resources_list', 
					page: pageNum,
					//resource_listID: resource_listID, 
					filters: filter_1+','+filter_2+','+filter_3
				  },
				  success: function( result ) {
					result1 = result;
				  },
				  error: function(MLHttpRequest, textStatus, errorThrown){
					alert('Sorry, something went wrong. Please try again.');
				  }
				}),
				
				$.ajax({
				  url: ajaxurl,
				  type: 'post',
				  data: {
					action: 'get_all_resource_pagination', 
					page: pageNum,
					//resource_listID: resource_listID, 
					filters: filter_1+','+filter_2+','+filter_3
				  },
				  success: function( result ) {
					result2 = result;
				  },
				  error: function(MLHttpRequest, textStatus, errorThrown){
					alert('Sorry, something went wrong. Please try again.');
				  }
				})
			).then(function(){
				//update resource
				$('.resource-container-inner').html(result1);
				$('.resource-container-inner').fadeIn();
				initMultipleDownload();
				initAudioSetup();
				createZip();
				
				//update pagination
				$('.pagination').html(result2);
				$('.pagination').fadeIn();
				get_all_resources_list();
				
				if(typeof pageNum !== 'undefined'){
					currentPageNum = pageNum;
				}else{
					currentPageNum = 1;
				}
			});
		}
		
		function get_all_resources_list(){
			if($('.btn_gopage_next').length > 0){
				$('.btn_gopage_next').unbind('click');	
				$('.btn_gopage_next').on('click touchstart', function(){
					//console.log('currentPageNum: '+currentPageNum);
					
					var lastValue = $('#pagination-select option:last-child').val();
					var newPageNum = 0;
					
					if(parseInt(currentPageNum) < lastValue){
						newPageNum = parseInt(currentPageNum)+1;
					}
					
					//console.log('newPageNum: '+newPageNum);
					ajax_action_list(newPageNum);
				});
			}
			
			if($('.btn_gopage_prev').length > 0){
				$('.btn_gopage_prev').unbind('click');	
				$('.btn_gopage_prev').on('click touchstart', function(){
					currentPageNum = $('#pagination-select').val();
					//console.log('currentPageNum: '+currentPageNum);
					var newPageNum = 0;
					
					if(parseInt(currentPageNum) > 1){
						newPageNum = parseInt(currentPageNum)-1;
					}
					
					//console.log('newPageNum: '+newPageNum);
					ajax_action_list(newPageNum);
				});
			}
			
			$('.resource_filtering').unbind('change');
			$('.resource_filtering').on('change', function(){
				ajax_action_list();
			});
			
			$('#pagination-select').unbind('change');
			$('#pagination-select').on('change', function(){			
				ajax_action_list($(this).val());									   
			});
		}
		
		$('document').ready(function(){
			initAudioSetup();
			get_all_resources_list();
			createZip();
		});
	}
  },
  page_template_template_group_resource:{
	init: function() {
		function ajax_action_grid(){			
			var ajaxurl = '/wp-admin/admin-ajax.php';
			
			var filter_1 = 0,
				filter_2 = 0,
				filter_3 = 0;
			
			if($('#filter_1').length > 0){
				filter_1 = $('#filter_1').val();
			}
			
			if($('#filter_2').length > 0){
				filter_2 = $('#filter_2').val();
			}
			
			if($('#filter_3').length > 0){
				filter_3 = $('#filter_3').val();
			}
			
			$('.group-resource-container').fadeOut();
			
			var result1;
		
			$.when(
				$.ajax({
				  url: ajaxurl,
				  type: 'post',
				  data: {
					action: 'get_group_resources_grid', 
					pageID: pageID,
					filters: filter_1+','+filter_2+','+filter_3
				  },
				  success: function( result ) {
					result1 = result;
				  },
				  error: function(MLHttpRequest, textStatus, errorThrown){
					alert('Sorry, something went wrong. Please try again.');
				  }
				})
			).then(function(){
				//update resource
				$('.group-resource-container').html(result1);
				$('.group-resource-container').fadeIn();
				initMultipleDownload();
				initAudioSetup();
				createZip();
			});
		}
		
		function get_group_resources(){
			$('.resource_filtering').unbind('change');
			$('.resource_filtering').on('change', function(){
				ajax_action_grid();									   
			});
		}
		
		$('document').ready(function(){
			initAudioSetup();
			createZip();
			get_group_resources();
		});
	}
  },
  page_template_template_group_resource_list:{
	init: function() {
		function ajax_action_list(){
			var ajaxurl = '/wp-admin/admin-ajax.php';
			
			var filter_1 = 0,
				filter_2 = 0,
				filter_3 = 0;
			
			if($('#filter_1').length > 0){
				filter_1 = $('#filter_1').val();
			}
			
			if($('#filter_2').length > 0){
				filter_2 = $('#filter_2').val();
			}
			
			if($('#filter_3').length > 0){
				filter_3 = $('#filter_3').val();
			}
			
			$('.group-resource-container').fadeOut();
			
			var result1;
		
			$.when(
				$.ajax({
				  url: ajaxurl,
				  type: 'post',
				  data: {
					action: 'get_group_resources_list', 
					pageID: pageID,
					filters: filter_1+','+filter_2+','+filter_3
				  },
				  success: function( result ) {
					result1 = result;
				  },
				  error: function(MLHttpRequest, textStatus, errorThrown){
					alert('Sorry, something went wrong. Please try again.');
				  }
				})
			).then(function(){
				//update resource
				$('.group-resource-container').html(result1);
				$('.group-resource-container').fadeIn();
				initMultipleDownload();
				initAudioSetup();
				createZip();
			});
		}
		
		function get_group_resources_list(){
			$('.resource_filtering').unbind('change');
			$('.resource_filtering').on('change', function(){
				ajax_action_list();									   
			});
		}
		
		$('document').ready(function(){
			initAudioSetup();
			createZip();
			get_group_resources_list();
		});
	}
  }
};

// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var UTIL = {
  fire: function(func, funcname, args) {
    var namespace = Roots;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
      namespace[func][funcname](args);
    }
  },
  loadEvents: function() {
    UTIL.fire('common');

    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
      UTIL.fire(classnm);
    });
  }
};

function createZip(){
	$('.createzip').unbind('click');
	
	$('.createzip').click(function(){
		//console.log('in createZip');
		var ajaxurl = '/wp-admin/admin-ajax.php';
		
		var filepath = $(this).attr('data-file');
		var filename = $(this).attr('data-filename');
		
		var data = {
			filepaths: filepath,
			zipname: filename,
			action: 'create-zip'
		};
		
		$.post(ajaxurl, data, function(response) {
			console.log('createzip done');
			
	    }).done(function(response){
			console.log(window.location.protocol + "//" + response);
			//window.location.href = response;
			
			window.location.href = window.location.protocol + "//" + response;
	    }).fail(function(response){
			//console.log('createzip fail');
	    });
		
	});
}

function initAudioSetup(){
	function stopAllAudio(obj){
		$('.audio_playback').each(function(){
			if($(obj) !== $(this)){
				var audio = $(this).find('.player audio').get(0);
			
				audio.pause();
				
				//$(this).find(".playtoggle").removeClass('playing');
			}
		});
	}
	
	function initAudioPlayer(obj, source, title){	
		var supportsAudio = !!document.createElement('audio').canPlayType,
				audio,
				loadingIndicator,
				positionIndicator,
				timeleft,
				loaded = false,
				manualSeek = false;
	
		if (supportsAudio) {
			
			//var episodeTitle = $('body')[0].id;
			
			var player = '<p class="player">';
			player += '<span class="playtoggle"><a href="javascript:;">'+title+'</a></span>';
			player += '<span class="gutter">';
			player += '<span class="loading" />';
			player += '<span class="handle ui-slider-handle" />';
			player += '</span>';
			player += '<span class="timeleft" />';
			player += '<audio preload="metadata">';
			player += '<source src="' + source + '" type="audio/wav"></source>';
			player += '</audio>';
			player += '</p>';
			
			$(player).appendTo(obj);
			
			/*audio = $('.player audio').get(0);
			loadingIndicator = $('.player .loading');
			positionIndicator = $('.player .handle');
			timeleft = $('.player .timeleft');*/
			
			audio = $(obj).find('.player audio').get(0);
			loadingIndicator = $(obj).find('.player .loading');
			positionIndicator = $(obj).find('.player .handle');
			timeleft = $(obj).find('.player .timeleft');
			
			
			//timeleft.text('-' + mins + ':' + (secs < 10 ? '0' + secs : secs) + '/' + fl_mins + ':' + (fl_secs < 10 ? '0' + fl_secs : fl_secs));
			
			if ((audio.buffered !== undefined) && (audio.buffered.length !== 0)) {
				$(audio).bind('progress', function() {
					var loaded = parseInt(((audio.buffered.end(0) / audio.duration) * 100), 10);
					loadingIndicator.css({width: loaded + '%'});
				});
			}
			else {
				loadingIndicator.remove();
			}
			
			$(audio).bind('timeupdate', function() {
				
				var rem = parseInt(audio.duration - audio.currentTime, 10),
						pos = (audio.currentTime / audio.duration) * 100,
						mins = Math.floor(rem/60,10),
						secs = rem - mins*60;
						
				var full_length = audio.duration,
					fl_mins = Math.floor(full_length/60,10),
					fl_secs = Math.floor(full_length-fl_mins*60,10);
				
				timeleft.text('-' + mins + ':' + (secs < 10 ? '0' + secs : secs) + '/' + fl_mins + ':' + (fl_secs < 10 ? '0' + fl_secs : fl_secs));
				if (!manualSeek) { positionIndicator.css({left: pos + '%'}); }
				if (!loaded) {
					loaded = true;
					
					$('.player .gutter').slider({
							value: 0,
							step: 0.01,
							orientation: "horizontal",
							range: "min",
							max: audio.duration,
							animate: true,					
							slide: function(){							
								manualSeek = true;
							},
							stop:function(e,ui){
								manualSeek = false;	
								audio.currentTime = ui.value;
							}
						});
				}
				
			}).bind('play',function(){
				$('.audio_playback .playtoggle').removeClass('pause');
				$('.audio_playback .playtoggle').removeClass('playing');
				
				$(obj).find(".playtoggle").removeClass('pause');
				$(obj).find(".playtoggle").addClass('playing');
				
				
			}).bind('pause', function() {
				$(obj).find(".playtoggle").addClass('pause');
			}).bind('ended', function() {
				$(obj).find(".playtoggle").removeClass('pause');
				$(obj).find(".playtoggle").removeClass('playing');		
			});		
			
			$(obj).find(".playtoggle").click(function() {
				if (audio.paused) {
					stopAllAudio(obj);
					audio.play();
				} 
				else { 
					audio.pause();
				}	
			});
		}
	}
	
	$('.audio_playback').each(function(){
		var source = $(this).attr('data-source');
		var title = $(this).attr('data-title');
		//console.log(source);
		initAudioPlayer($(this), source, title);
	});
}

function initMultipleDownload(){
  //console.log('initMultipleDownload start');
  
  function resetEvent(){
	$('.multiple_download').each(function(){
		$(this).find('.multiple_dl_header').unbind('click');			
	});
  }		  
  resetEvent();
  
  $('.multiple_download').each(function(){
	$(this).find('.multiple_dl_header').click(function(){
		if(!$(this).parent().hasClass('opened')){
			$(this).parent().addClass('opened');	
		}
	});
  });
  
  $('.mobile_download').each(function(){
	$(this).change(function(){
		var url = $(this).val(); // get selected value
		//console.log(url);
		if (url) { // require a URL
			window.location = url; // redirect
		}
		return false;						
	});
  });
  
  $(window).on('click touchend', function(event) {
	var target = $(event.target);
	if (target.parents('div.multiple_download').length) {
		//console.log('it is in multiple_download');	
	}else{
		if($('.multiple_download').hasClass('opened')) {
			$('.multiple_download').removeClass('opened');
		}		
	}				
  });
  
  //console.log('initMultipleDownload end');
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
