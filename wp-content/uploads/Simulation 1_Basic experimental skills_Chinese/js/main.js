var smoother;
var	canvas;
var	context;
var	video;
var	detector;
var fist_pos_old;
var LATENCY = 30;
var requestAnimID = null;
var timeOutID = null;
var locStream;
var isARMode = false;
var cameraStatus = false;
var isIPAD = (/iPad|iPhone/i.test(navigator.userAgent));
var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1; 
var loadedImageCount = 0;
var preloadImageArr = [];
var scalingFactor = 3.5;
var step=1;
var valueLeft = 0;
var valueTop = 0;


$(document).ready(function(){
	smoother = new Smoother([0.9995, 0.9995], [0, 0], 0);
	canvas = document.createElement('canvas');
	context = canvas.getContext('2d');
	video = document.getElementById('streamVideo');
	$("#cameraBtn").off('click').on('click',toggleARMode);
	$('#launcher').off('click').on('click',removeBanner);
	$('#instruct-close').off('click').on('click',closeInstruction);
	$('#infoBtn').off('click').on('click',showInstruction);
	$("#successButton").off('click').on('click',hideSuccessMessage);
	$("#demoVid").off('click').on('click',playVideo);
	$("#video-close").off('click').on('click',closeVideo);
	preloadAssets();
});


function preloadAssets(){
	$("#preloaderContainer").show();
	$("#parentContainer").hide();
	for(var i=0;i<preloadImageArr.length;i++){
		var imageObj = new Image();
		imageObj.src = preloadImageArr[i];
		imageObj.addEventListener('load',onImageLoad,false);
		imageObj.addEventListener('error',onImageLoad,false);
	}
}

var playVideo = function() {
	$('#videoSetUp').show();
	$('#videoPopUp')[0].load();
	$('#videoPopUp')[0].currentTime = 0;
	$('#videoPopUp')[0].play();
}

var closeVideo = function() {
	$('#videoPopUp')[0].pause();
	$('#videoSetUp').hide();
}
	
function onImageLoad(){
		//console.log(loadedImageCount);
		loadedImageCount++;	
		var curPercentage = (loadedImageCount / preloadImageArr.length) * 100;
		$("#percentageVal").html( '載入中 '+ Math.round( curPercentage) + '%');
		if(loadedImageCount == preloadImageArr.length-1){
			$("#parentContainer").show();
			$("#preloaderContainer").hide();
			initExperiments();
			$("#infoBanner").hide();
			$("#hardwareInfo").fadeIn();
		}
}


var hideSuccessMessage = function(){
	$("#myModal").fadeOut();
}


var updateInstruction = function(){
	if(cameraStatus){
		if(levelCount == 0){
			$('#info-text').html('利用滴管，把所需體積的溶液從試劑瓶移取至燒杯內。請使用右手作出特定姿勢來操作。為達至最佳效果，請把手放在純白色的背景下進行。如希望了解更多相關姿勢，請觀看以下影片。');
		}else if(levelCount == 1){
			$('#info-text').html('移取兩種溶液至試管內，看看它們混和後會發生甚麼事。請使用右手作出特定姿勢來操作。為達至最佳效果，請把手放在純白色的背景下進行。如希望了解更多相關姿勢，請觀看以下影片。');
		}else if(levelCount == 2){
			$('#info-text').html('嘗試裝置儀器來煮沸燒杯內的水。你可開啟或關閉氣孔來控制本生燈火焰。請使用右手作出特定姿勢來操作。為達至最佳效果，請把手放在純白色的背景下進行。如希望了解更多相關姿勢，請觀看以下影片。');
		}
	}else{
		if(levelCount == 0){
			$('#info-text').html('利用滴管，把所需體積的溶液從試劑瓶移取至燒杯內。');
		}else if(levelCount == 1){
			$('#info-text').html('移取兩種溶液至試管內，看看它們混和後會發生甚麼事。');
		}else if(levelCount == 2){
			$('#info-text').html('嘗試裝置儀器來煮沸燒杯內的水。你可開啟或關閉氣孔來控制本生燈火焰。');
		}		
	}
}


var showInstruction = function() {
	if(cameraStatus) {
		//$('#info-text').html('Kindly use the right hand as the gesture to perform the simulation and to know more about this gesture, watch the quick demo video below.');
		updateInstruction();
		$('#info-content').addClass('infoContClass');
		$('#info-text').addClass('infoTextClass');
		$('#videoPopUp, #demoVid').show();
		$('#videoPopUp')[0].load();
		$('#videoPopUp')[0].play();
	}else{
		//$('#info-text').html('Instruction needs to be updated.');
		updateInstruction();
		$('#info-content').removeClass('infoContClass');
		$('#info-text').removeClass('infoTextClass');
		$('#videoPopUp, #demoVid').hide();
	}
	$('#infoBanner').fadeIn();
}
	
var closeInstruction = function() {
	$('#infoBanner').fadeOut();
	$('#videoPopUp')[0].pause();
}

var removeBanner = function() {
	$('#hardwareInfo').fadeOut();
	$('#cameraBtn').trigger('click');
	playAudio("audio/blank.mp3");
}


function enableARMode(){
		isARMode = true;
		////alert('ar mode');
		
		$('#traceDiv').hide();
		
		if (locStream) {
			locStream.getTracks().forEach(function(track) {
			  track.stop();
			});
			video.src="";
		}
		
		try {
			
			var getVid = "";
			if( navigator.appVersion.indexOf('Edge') > -1 ) {
				getVid = {facingMode: 'user'};
			} else if(isIPAD){
				getVid = {facingMode: currCam};
				//alert(currCam)
			}else{
				getVid = {deviceId: {exact: whichDevice} };
			}
			
			compatibility.getUserMedia({ audio:false, video: getVid }, function(stream) {
				try {
					//alert('try block0');
					//video.src = compatibility.URL.createObjectURL(stream);
					video.srcObject = stream;
					locStream = stream;
					cameraStatus = true;
					//$('#demoVid').show();
					$('#infoBanner').fadeIn();
					$('#info-text').html('Kindly use the right hand as the gesture to perform the simulation and to know more about this gesture, watch the quick demo video below.');
					console.log('stream created');
					updateInstruction();
					$('#traceDiv').show();
					$('#info-content').addClass('infoContClass');
					$('#info-text').addClass('infoTextClass');
					$('#videoPopUp, #demoVid').show();
					$('#videoPopUp')[0].load();
					$('#videoPopUp')[0].play();
				} catch (error) {
					//alert('catch block0');
					video.src = stream;
					locStream = stream;
					cameraStatus = true;
					$('#traceDiv').show();
					$('#videoPopUp, #demoVid').show();
					
				}
				
				requestAnimID = compatibility.requestAnimationFrame(function () {
					timeOutID = setTimeout(play, LATENCY)
				});
				
				//backgroundMesh.visible = false;
				
			}, function (error) {
				cameraStatus = false;				
				//backgroundMesh.visible = false;
				$('#cameraBtn').trigger('click');
				$('#cameraBtn, #recStop, #togCam').css({
					'pointer-events': 'none',
					'opacity': '0.5'
				});
				$('#infoBanner').fadeIn();
				$('#info-text').html('Instruction needs to be updated.');
				updateInstruction();
				console.log('no stream');
				$('#traceDiv').hide();
				$('#info-content').removeClass('infoContClass');
				$('#info-text').removeClass('infoTextClass');
				$('#videoPopUp, #demoVid').hide();
				//$('#demoVid').hide();
			});
		} catch (error) {
				cameraStatus = false;
				console.log('no stream');
				$('#traceDiv').hide();
				$('#info-text').html('Instruction needs to be updated.');
				updateInstruction();
				$('#info-content').removeClass('infoContClass');
				$('#info-text').removeClass('infoTextClass');
				$('#videoPopUp, #demoVid').hide();
		}
}



function enableNonARMode(){
		//alert(1);
		isARMode = false;
		$('#traceDiv').hide();
		window.cancelAnimationFrame(requestAnimID);
		//alert(2);
		clearTimeout(timeOutID);
		//alert(21);
		canvas.width = canvas.width;
		//alert(22);
		//backgroundMesh.visible = true;
		//alert(3);
		updateExperiment();
		//alert(4);
}



function toggleARMode(){
		//alert(0);
		//alert(isARMode);
	if(!isARMode){
		enableARMode();
		$(this).removeClass('cameraOn');
		
		$("#recStop,#togCam").css({'pointer-events':'auto',opacity:'1'});
		
	}else{
		$("#threeDArea").css({left:"0px",top:"0px"});
		cameraStatus = false;
		enableNonARMode();
		$(this).addClass('cameraOn');
		
		$("#recStop,#togCam").css({'pointer-events':'none',opacity:'0.5'});
	}
	
	if (locStream) {
		console.log('clearing');
		locStream.getTracks().forEach(function(track) {
		  track.stop();
		});
		video.src="";
	}

}


 function collision($div1, $div2) {
  var x1 = $div1.offset().left;
  var y1 = $div1.offset().top;
  var h1 = $div1.outerHeight(true);
  var w1 = $div1.outerWidth(true);
  var b1 = y1 + h1;
  var r1 = x1 + w1;
  var x2 = $div2.offset().left;
  var y2 = $div2.offset().top;
  var h2 = $div2.outerHeight(true);
  var w2 = $div2.outerWidth(true);
  var b2 = y2 + h2;
  var r2 = x2 + w2;
	
  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}

function play() {
	
	 //$("#traceDiv").html( "Entered:  "+ $("#parentContainer").height() +"  "+ $("#streamVideo").height() );
	
	 requestAnimID = compatibility.requestAnimationFrame(function () {
		timeOutID = setTimeout(play, LATENCY)
	 })
     
	 if (video.paused) video.play();
	 
	 // Draw video overlay:
     //canvas.width = ~~(1024 * video.videoWidth / video.videoHeight);
     //canvas.height = 768;
	 
	 //canvas.width = $("#threeDContainer canvas").width();
     //canvas.height = $("#threeDContainer canvas").height();
	 
     //context.drawImage(video, 0, 0, canvas.clientWidth, canvas.clientHeight);
     
	  $("#parentContainer").height( $('body').height() );
	  
	  //$("#traceDiv").html( "Entered:  "+ $("#parentContainer").height() +"  "+ $("#streamVideo").height() );
	  
     if (video.readyState === video.HAVE_ENOUGH_DATA && video.videoWidth > 0){
     	// Prepare the detector once the video dimensions are known:
	    if (!detector) {
		  	var width = ~~(80 * video.videoWidth / video.videoHeight);
			var height = 80;
		    //detector = new objectdetect.detector(width, height, 1.1, objectdetect.frontalface);
		    detector = new objectdetect.detector(width, height, 1.1, objectdetect.handfist);
		}
		
		//$("#traceDiv").html( $("#parentContainer").height() +"  "+ $("#streamVideo").height() );
		
		//$("#streamVideo").css({'position':'absolute','min-width':'100%','min-height':'100%','top':0,'bottom':0});
		
        // Perform the actual detection:
     	var coords = detector.detect(video, 1);
		var overCanvas = document.getElementById("overlayCanvas");
		var canvasCont = overCanvas.getContext('2d');
		if (coords[0]) {
     		var coord = coords[0];
     		// Rescale coordinates from detector to video coordinate space:
     		coord[0] *= video.videoWidth / detector.canvas.width;
     		coord[1] *= video.videoHeight / detector.canvas.height;
     		coord[2] *= video.videoWidth / detector.canvas.width;
     		coord[3] *= video.videoHeight / detector.canvas.height;
			
			//var leftPos = Math.round( (coord[0] + coord[2] * 1.0/8 + video.offsetLeft) );
			//var topPos = Math.round( (coord[1] + coord[3] * 0.8/8 + video.offsetTop) );
			
			var xVal = ( $("#streamVideo").width()  / video.videoWidth ) * coord[0] ;
			var yVal = ( $("#streamVideo").height()  / video.videoWidth ) * coord[1] ;
			
			canvasCont.clearRect(0,0,window.innerWidth,window.innerHeight);
			//canvasCont.strokeStyle="red";
			//canvasCont.strokeRect(coord[0],coord[1],coord[2],coord[3]);
			
			
			/* if(valueLeft)
			{					
				var minValue = (coord[0])*scalingFactor + ($("#streamVideo").offset().left) - 15;
				var maxValue = (coord[0])*scalingFactor + ($("#streamVideo").offset().left) + 15;
				
				if( valueLeft < minValue || valueLeft > maxValue) {
					valueLeft = (coord[0])*scalingFactor + ($("#streamVideo").offset().left) + 50;
				} else {
					return;
				}					
				
			} else {
				valueLeft = (coord[0])*scalingFactor + ($("#streamVideo").offset().left) + 50;
			}
			
			if(valueTop)
			{					
				var minValue = coord[1]*scalingFactor+ ($("#streamVideo").offset().top)+ 50 - 15;
				var maxValue = coord[1]*scalingFactor+ ($("#streamVideo").offset().top)+ 50 + 15;
				
				if( valueTop < minValue || valueTop > maxValue) {
					valueTop = coord[1]*scalingFactor+ ($("#streamVideo").offset().top)+ 50;
				} else {
					return;
				}					
				
			} else {
				valueTop = coord[1]*scalingFactor+ ($("#streamVideo").offset().top)+ 50;
			} */
			
			var yellowBoxWidth = 0;
			var yellowBoxHeight = 0;
			if(levelCount == 0){
				yellowBoxWidth = 150;
				yellowBoxHeight = 250;
			}else if(levelCount == 1){
				yellowBoxWidth = 75;
				yellowBoxHeight = 250;
			}else{
				yellowBoxWidth = 100;
				yellowBoxHeight = 250;
			}
			
			
			
			$("#traceDiv").html("").css({
					left: (coord[0])*scalingFactor + ($("#streamVideo").offset().left) + 50+"px",
					top: coord[1]*scalingFactor+ ($("#streamVideo").offset().top)+ 50+"px",
					/*width: coord[2]*scalingFactor+"px",
					height: coord[3]*scalingFactor+"px",*/
					width:200+"px",
					width:yellowBoxWidth+"px",
					height: yellowBoxHeight+"px",
					border: "1px solid yellow",
					background: 'none',
					display: 'block'
			});
			
			/* if( ( xMin < curLeft ) && ( xMax > curRight ) && ( yMin < curTop ) && (yMax > curBottom )  ){
				curModeObj.arModeFunction();
				console.log("WITHIN THE LIMIT");	
			}else{
				console.log("OUT OF THE LIMIT");
			} */
			
			curModeObj.arModeFunction();
			
			//$("#traceDiv").html(coord[2]);
			
			/*if( (coord[0] >= 0) && (coord[0] <= 100) ){
				showNucleusModel();
			}else if( (coord[0] > 100) && (coord[0] <= 250) ){
				showCellModel();
			}else if( (coord[0] > 300) && (coord[0] <= 400) ){
				showTissueModel();
			}else if( (coord[0] > 400) ){
				showSkinModel();
			}*/
			
						
			/*if( (coord[2] >= 0) && (coord[2] <= 310) ){
				showSkinModel();
			}else if( (coord[2] > 310) && (coord[2] <= 330) ){
				showTissueModel();
			}else if( (coord[2] > 330) && (coord[2] <= 350) ){
				showCellModel();
			}else if( (coord[2] > 350) ){
				showNucleusModel();
			}*/
			
			//console.log(mouse);
			
			//console.log(curModelObj)
			
			//$("#3dArea").css({left:( coord[0] + (coord[2]/2) )+"px" , top : ( coord[1] - (coord[3]/2) )+"px" });
			
			     		
			// Draw coordinates on video overlay:
     		/* context.beginPath();
     		context.lineWidth = '2';
			context.strokeStyle = '#0087a7';
     		context.rect(coord[0] / video.videoWidth * canvas.clientWidth,coord[1] / video.videoHeight * canvas.clientHeight,coord[2] / video.videoWidth * canvas.clientWidth,coord[3] / video.videoHeight * canvas.clientHeight);
     		context.stroke(); */
			
			//console.log("Hand recognized!!!!!!!!!!!");	
			
     	}else{  
			
			curModeObj.arModeFunction1();
			
			$("#traceDiv").html('').hide();
			canvasCont.clearRect(0,0,window.innerWidth,window.innerHeight);
			//console.log("Hand Not recognized!!!!!!!!!!!");		
		};
     }		
}
