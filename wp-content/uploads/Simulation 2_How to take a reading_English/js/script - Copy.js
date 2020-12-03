var targWidth = 65;
var targHeight = 160;
var targTop = -30;
var targLeft = 18;
var degree = 0;
var findEye = [0,0];
var video1, locStream; 
var isSubmitted = false;
var liqLevel = [0,76];
var uiLevel = [0.15,1];
var liqLevel = [0,95];
var uiLevel = [0.05,1];
var currCam = "environment";
var cameraElems;
var camSource = [];
var devId = [];
var videoDiv;
var streamStatus = false;
var observedCorArea = false;
var timeOutID;
var animFrameForDetect;
var trackingTask;
var myLatency = 200;

var measureConv = [[0.0264583333,"cm/m"],[0.0104166667,"inch/feet"]];//1px value to cm, 1px value to inch

var currMeasure = measureConv[0][0];
var currUnit = measureConv[0][1];

var multiplicationFact = 6.7368421052631575;

var totalNoOfFrames = 25;
var initTop = 211;
var finalTop = 496;
var lineDraws,lineDrawsContext;
var rejectCalls = false;

var randomSlide = [0.1,0.2,0.3,0.4,0.5,0.6,0.8,0.9];
var initSlideValue = 0.2;
var LATENCY = 2; //Final 100
var devId = [];
var detector;
var requestAnimID=null;
var smoother;
var video;
var currentCam = "";
var oneTimeShown = false;
var getParam = "";



$(document).ready(function(){
	window.cancelAnimationFrame(requestAnimID);
	requestAnimID = undefined;
	clearTimeout(timeOutID);
	initSlideValue = randomSlide[Math.floor(Math.random() * randomSlide.length)];
	lineDraws = document.getElementById("lineDraws");
	lineDrawsContext = lineDraws.getContext("2d");
	var calcs1 = Math.round((initSlideValue - initTop) * ((totalNoOfFrames-1)/(finalTop - initTop))) + 1;
	$("#eyeBall").css("background-position","0px "+(calcs1*1024)+"px");
	$("#eyeContainment, #lineDraws, #eyeBall, #draggEyes, #volOfWater").fadeOut();
	getInps();
	smoother = new Smoother([0.9999999, 0.9999999, 0.999, 0.999], [0, 0, 0, 0]);
	$('#turnOffCam').css({
		'pointer-events':'none',
		'opacity': '0.5'
	});
	video = document.getElementById('video');
	initModelLoader();	
	$("#parentContainer, #ruleBtn, #measurementConversion").hide();
	$("#submitButton").addClass('disableMode');
	currAns = ((initSlideValue-0.05) * 100) *  (liqLevel[1] - liqLevel[0]) / ( (uiLevel[1] - uiLevel[0])*100);	
	currAns = Math.round(currAns*2)/2;
	if(currAns<0)currAns=0;
	$('#volOfWater').html(currAns+" cm<sup>3</sup>");
	initTop = parseInt( $("#eyeContainment").css("top") ) + 1;
	finalTop = parseInt( $("#eyeContainment").css("height") ) + parseInt($("#eyeContainment").css("top")) - parseInt($("#draggEyes").css("height"));	
	activateFunctions();
});
var getInps = function() {
	camSource = [];	
	//camSource.push();
	//console.log('roll');
	navigator.mediaDevices.enumerateDevices().then(function(deviceInfos){
		//console.log('deviceInfos',deviceInfos);
		for(i=1;i<=deviceInfos.length;i++) {
			//console.log(deviceInfos[i-1]);
			if(deviceInfos[i-1].kind=="videoinput") {
				var currVal = 'camera_' +(camSource.length + 1);
				camSource.push(currVal);
				devId.push(deviceInfos[i-1].deviceId);
			}
		}
		//console.log('over..!');
		currentCam = devId[0];
		if(devId.length==1) {
			$('#togCam').css({
				'opacity': '0.5',
				'pointer-events': 'none'
			});
		} 
	}).then(function(){
		//console.log('ready to stream');
	});
	
	 	
	setUserMediaVariable();
}



var activateFunctions = function() {
		$("#scaleElem").draggable({start:dragStart,drag:dragActive,stop:dragStop, containment:"#dragContainment"});
		$("#botDragger").draggable({start:botdragStart,drag:botdragActive,stop:botdragStop/*, containment:"#scaleElem" */,axis:'y',containment:"#bottomContainment"});
		$('#drag_rotate').off('click').on('click',toggleDrag);
		$('#mode_1').off('click').on('click',modeChange);
		$('#rotationEnab').draggable({handle:".rotScale",drag:rotateDivs, containment:"#dragContainment"});
		$('.closeMod, #tryButton').off("click").on("click",toggleModals);
		$('#waterLev').off('keyup').on('keyup',validateInps);
		$('#waterLev').off('change').on('change',disableSubmits);
		$('#submitButton').off('click').on('click',submitValue);
		$('#togCam').off('click').on('click',toggleCamera);
		$('#turnOffCam').off('click').on('click',vidOff);
		//$('#turnOnCam').off('click').on('click',vidOnn);
		//$('#recStop').off('click').on('click',recordVideo);
		$('#recStop').off('click').on('click',opacityLow);
		$('#measurementConversion').off('click').on('click',convertMeasure);
		$("#lineDraws").attr("width",window.innerWidth).attr("height",window.innerHeight);
		$('#draggEyes').draggable({start:eyeDragStart,drag:eyeDragEvent,stop:eyeStopEvent,containment:'#eyeContainment',axis:'y'});
		$(window).on('resize',resizingDivs);
		$('#launcher').off('click').on('click',removeBanner);
		$('#instruct-close').off('click').on('click',closeInstruction);
		$('#infoBtn').off('click').on('click',showInstruction);
		$('#reset_activity').off('click').on('click',resetActivity);
	}
	
	var opacityLow = function() {
		if($("#video").css('opacity')==1) {
			$("#video").css('opacity',0);
		} else {
			$("#video").css('opacity',1);
		}
	}
	
	var resetActivity = function() {
		$('#draggEyes, #eyeBall').css("top","");
		initSlideValue = randomSlide[Math.floor(Math.random() * randomSlide.length)];
		var calcs1 = Math.round((initSlideValue - initTop) * ((totalNoOfFrames-1)/(finalTop - initTop))) + 1;
		$("#eyeBall").css("background-position","0px "+(calcs1*1024)+"px");
		console.log("initSlideValue = ",initSlideValue,$("#waterLevelSlider").slider("value"));
		if(initSlideValue == $("#waterLevelSlider").slider("value")) {
			console.log('same value');
			$('#reset_activity').trigger('click');
			return;
		}
		//$("#eyeContainment, #lineDraws, #eyeBall, #draggEyes, #volOfWater").fadeOut();	


		observedCorArea = false;
		$("#draggEyes, #eyeBall, #waterLevelSlider").css({
			'pointer-events': 'auto',
			'opacity':'1'
		});
		
		$("#parentContainer, #ruleBtn, #measurementConversion").hide();
		$("#submitButton").addClass('disableMode');	
		$('#waterLev').val('');
		$("#waterLevelSlider").slider({value:initSlideValue});
		waterMeshModelObj.scale.set(1,initSlideValue,1);
		$('#levelFiller').css("width",(initSlideValue*100)+"%");
		sliderVal = initSlideValue;		
		waterMeshModelObj.matrixWorldNeedsUpdate = true;		
		waterMeshTopModelObj = scene.getObjectByName( "Fluid_Top", true );		
		waterMeshTopModelObj.matrixWorldNeedsUpdate = true;
		scene.updateMatrixWorld(true);
		camera.fov = 21.434787;
		$('#volOfWater').removeClass('stableValue');
		$('#waterLevelSlider').slider({disabled:false});
		camera.updateProjectionMatrix();
		camera.position.set(2.44,1.41,7.90);
		camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
		camera.rotation.set(-0.05,-0.19,-0.009);
		calculatePositionForSlider(initSlideValue);
		$('#zoomInBtn, #zoomOutBtn').css({
			'opacity': '1',
			'pointer-events':'auto'			
		});
		if($('#rotateBtn').hasClass('rotating3D')) {
			$('#rotateBtn').trigger('click');
		}
		//camera.rotation.set(-0.05,-0.19,-0.009);
		
		currAns = ((initSlideValue-0.05) * 100) *  (liqLevel[1] - liqLevel[0]) / ( (uiLevel[1] - uiLevel[0])*100);
		currAns = Math.round(currAns*2)/2;
		if(currAns<0)currAns = 0;
		$('#volOfWater').html(currAns+" cm<sup>3</sup>");
		initTop = parseInt( $("#eyeContainment").css("top") ) + 1;
		finalTop = parseInt( $("#eyeContainment").css("height") ) + parseInt($("#eyeContainment").css("top")) - parseInt($("#draggEyes").css("height"));
		isSubmitted = false;
		$("#myModal .modal-body p").removeClass('ansCorrect');
		drawVerLine();
	}
	
	
var setUserMediaVariable =  function(){

  if (navigator.mediaDevices === undefined) {
	navigator.mediaDevices = {};
  }

  if (navigator.mediaDevices.getUserMedia === undefined) {
	navigator.mediaDevices.getUserMedia = function(constraints) {

	  // gets the alternative old getUserMedia is possible
	  var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

	  // set an error message if browser doesn't support getUserMedia
	  if (!getUserMedia) {
		return Promise.reject(new Error("Unfortunately, your browser does not support access to the webcam through the getUserMedia API. Try to use Google Chrome, Mozilla Firefox, Opera, or Microsoft Edge instead."));
	  }

	  // uses navigator.getUserMedia for older browsers
	  return new Promise(function(resolve, reject) {
		getUserMedia.call(navigator, options, resolve, reject);
	  });
	}
  }
}
	
	
	var showInstruction = function() {
		$('#infoBtn').addClass('infoClicked');
		if(streamStatus) {
			$('#info-text').html('Take the reading of the water level. To keep the upright position of the measuring cylinder, you may rotate the tablet to adjust its orientation. The camera will detect your eye level to the cylinder at the same time. Answer and submit to check if it is correct.');
			$('#videoPopUp').show();
			$('#videoPopUp')[0].load();
			$('#videoPopUp')[0].play();
			$('#info-content').addClass('contentClasss');
			$('#info-text').addClass('textClasss');
			} else {
			$('#info-text').html('Drag the eye up and down to adjust the eye level for taking the reading of water. Answer and submit to check if it is correct.');
			$("#demoVid").hide();
			$('#videoPopUp').hide();
			$('#videoPopUp')[0].pause();
			$('#info-content').removeClass('contentClasss');
			$('#info-text').removeClass('textClasss');
		}
		$('#infoBanner').fadeIn();
	}
	
	var closeInstruction = function() {
		$('#infoBanner').fadeOut();
		//console.log(streamStatus,"=streamStatus");
		if ($('#infoBtn').hasClass('infoClicked')) return;
		if(streamStatus) detectionElems();
	}
	
	var removeBanner = function() {
		$('#hardwareInfo').fadeOut();
		var curPos = getScreenCoordinates(waterMeshModelObj,camera,renderer);										
		if( navigator.appVersion.indexOf('Edge') > -1 ) {
			getParam =  { video: {facingMode: 'user'} };
			currCam = "user";
		} else	if(navigator.userAgent.match(/iPad/i)) {
			getParam =  { video: {deviceId: {exact: devId[1]} }};
			currCam = "user";
			currentCam = devId[1];
		} else {
			getParam =  { video: {deviceId: {exact: devId[0]} }};
			currCam = "user";
			currentCam = devId[0];
		}
		elms(); //Test remove
		console.log("streamStatus = ",streamStatus);
	}
	
	var elms = function() {
		console.log('after hardware section..!');
		if (locStream) {
			console.log('clearing');
			locStream.getTracks().forEach(function(track) {
			  track.stop();
			});
			video.src="";			
		}
		navigator.mediaDevices.getUserMedia( getParam )
		.then(function(stream){ 
			var oneSecDelay;
			console.log('Video stream created');
			streamStatus = true;
			$("#demoVid").show();
			videoStream = stream;
			locStream = stream;	  
			video.srcObject = stream;
			clearTimeout(oneSecDelay);
			$('#videoPopUp').show();
			$('#videoPopUp')[0].load();
			$('#videoPopUp')[0].play();
			$('#info-content').addClass('contentClasss');
			$('#info-text').addClass('textClasss');
			oneSecDelay = setTimeout(function(){
				clearTimeout(oneSecDelay);
				videoSuccess();
			},1000);	  
		}).catch(function(err) { // error handling
			console.log('No Stream..!');
			streamStatus = false;
			$("#demoVid").hide();
			onFail();
			$('#videoPopUp').hide();
			$('#videoPopUp')[0].pause();
			$('#info-content').removeClass('contentClasss');
			$('#info-text').removeClass('textClasss');
			locStream = "";
		});
		// $('#video, #canvas').attr('width',720);
		//$('#video, #canvas').attr('height',480); 
		/*$('#video, #canvas').attr('width',1280);
		$('#video, #canvas').attr('height',720);*/
	}
	
	var videoSuccess = function() {
		$('#turnOffCam').css({
			'pointer-events':'auto',
			'opacity': '1'
		});
		if(!oneTimeShown) {
			oneTimeShown = true;
			$('#infoBanner').fadeIn();
			$("#demoVid").show();
			$('#info-text').html('Take the reading of the water level. To keep the upright position of the measuring cylinder, you may rotate the tablet to adjust its orientation. The camera will detect your eye level to the cylinder at the same time. Answer and submit to check if it is correct.');	
		} else {
			if(streamStatus) detectionElems();
		}
		
	}
	
	var onFail = function() {	
			tubeMeshObj.rotation.x = 0;
			var curPos = getScreenCoordinates(waterMeshTopModelObj,camera,renderer);										
			var top1 = curPos.y;		
			waterMeshTopModelObj2 = scene.getObjectByName( "Fluid_TopRing", true );		
			var curPos = getScreenCoordinates(waterMeshTopModelObj2,camera,renderer);		
			var top2 = curPos.y;		
			var diffY = 3.5*(top2 - top1);
			$("#refLine").css({left:(curPos.x-20)+"px",top:(curPos.y-diffY)+"px"});
			streamStatus=false;
			$("#demoVid").hide();
			$("#turnOffCam").addClass("arOn");
			$("#turnOffCam, #recStop, #togCam").removeClass("arOff").css({
				pointerEvents: "none",
				opacity: "0.5"
			});
			//window.cancelAnimationFrame(animFrameForDetect);
			//animFrameForDetect = undefined;
			drawVerLine();
			$("#eyeContainment, #lineDraws, #eyeBall, #draggEyes, #volOfWater").fadeIn();
			$('#infoBanner').fadeIn();
			$('#info-text').html('Drag the eye up and down to adjust the eye level for taking the reading of water. Answer and submit to check if it is correct.');
	}
	
	var detectionElems = function() 
	{
		
		
		var canvasDetection = document.querySelector('#canvasDetection');
        canvasDetection.width = 320;
        canvasDetection.height = 240;
        var context = canvasDetection.getContext('2d');
		
		console.log("detectionElems");
		
		console.log( $('#video').css('height') );
		
		var tracker = new tracking.LandmarksTracker();
        tracker.setEdgesDensity(0.1);
        tracker.setInitialScale(2);
        tracker.setStepSize(1);
        var videoElement = document.querySelector('#video')
        trackingTask = tracking.track(videoElement, tracker);
		
		
		var landmarksPerFace = 30
         var landmarkFeatures = {
                /*jaw : {
                        first: 0,
                        last: 8,
                        fillStyle: 'white',
                        closed: false,
                },
                nose : {
                        first:15,
                        last: 18,
                        fillStyle: 'green',
                        closed: true,
                },
                mouth : {
                        first:27,
                        last: 30,
                        fillStyle: 'red',
                        closed: true,
                },*/
                eyeL : {
                        first:19,
                        last: 22,
                        fillStyle: 'purple',
                        closed: false,
                },
                eyeR : {
                        first:23,
                        last: 26,
                        fillStyle: 'purple',
                        closed: false,
                }/*,
                eyeBrowL : {
                        first: 9,
                        last: 11,
                        fillStyle: 'yellow',
                        closed: false,
                },
                eyeBrowR : {
                        first:12,
                        last: 14,
                        fillStyle: 'yellow',
                        closed: false,
                },*/
        }
		
		var parameters = {
                landmarkLerpFactor : 0.7,
                boundinBoxVisible : true,
                jawVisible : true,
                eyeBrowLVisible : true,
                eyeBrowRVisible : true,
                noseVisible : true,
                eyeLVisible : true,
                eyeRVisible : true,
                mouthVisible : true,
        }
		
		var lerpedFacesLandmarks = []
		
		var widthFactor;
		var heightFactor;
		
		tracker.on('track', function(event) {
			context.clearRect(0,0,canvasDetection.width, canvasDetection.height);

			if( event.data === undefined ) return;
			
			if( event.data.landmarks.length == 0 ){
					document.getElementById('threeDArea').style.top = "-100px";
					document.getElementById('faceBox').style.top = "-999px";
			}
			
			widthFactor = window.innerWidth / 320 ;
			heightFactor = window.innerHeight / 240 ;
			
			document.getElementById('video').style.transform = 'scale('+widthFactor+','+heightFactor+')';
			document.getElementById('canvasDetection').style.transform = 'scale('+widthFactor+','+heightFactor+')';
		
			//console.log(widthFactor+" "+heightFactor);
			
			event.data.faces.forEach(function(boundingBox, faceIndex) {
					var faceLandmarks = event.data.landmarks[faceIndex]

					if( parameters.boundinBoxVisible === true ) displayFaceLandmarksBoundingBox(boundingBox, faceIndex)
				
					// lerpFacesLandmarks
					lerpFacesLandmarks(faceLandmarks)
					
					// display each faceLandmarks
					displayFaceLandmarksDot(lerpedFacesLandmarks)
			});
			eyeValue();
        })
		
		function lerpFacesLandmarks(newFaceLandmarks){
                // init lerpFacesLandmarks if needed
                for(var i = 0; i < newFaceLandmarks.length; i++){
                        if( lerpedFacesLandmarks[i] !== undefined ) continue
                        lerpedFacesLandmarks[i] = [
                                newFaceLandmarks[i][0],
                                newFaceLandmarks[i][1],
                        ]                        
                }

                // init lerpFacesLandmarks if needed
                for(var i = 0; i < newFaceLandmarks.length; i++){
                        var lerpFactor = parameters.landmarkLerpFactor
                        lerpedFacesLandmarks[i][0] = newFaceLandmarks[i][0] * lerpFactor  + lerpedFacesLandmarks[i][0] * (1-lerpFactor)
                        lerpedFacesLandmarks[i][1] = newFaceLandmarks[i][1] * lerpFactor  + lerpedFacesLandmarks[i][1] * (1-lerpFactor)
                }
        }

        //////////////////////////////////////////////////////////////////////////////
        //                Code Separator
        //////////////////////////////////////////////////////////////////////////////
        function displayFaceLandmarksBoundingBox(boundingBox, faceIndex){
                // display the box
                //context.lineWidth = 0.5;
				//context.strokeStyle = '#0087a7';
                //context.strokeRect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height);
				
				document.getElementById('faceBox').style.left = boundingBox.x * widthFactor + "px";
				document.getElementById('faceBox').style.top = boundingBox.y * heightFactor + "px";
				document.getElementById('faceBox').style.width = boundingBox.width * widthFactor + "px";
				document.getElementById('faceBox').style.height = boundingBox.height * heightFactor + "px";
				document.getElementById('faceBox').style.display = "block";
				
				//$('#trackValue').text(boundingBox.x * widthFactor+" "+ boundingBox.y * heightFactor);
				
                // display the size of the box
                context.font = '11px Helvetica';
                context.fillStyle = "#fff";
               // context.fillText('idx: '+faceIndex, boundingBox.x + boundingBox.width + 5, boundingBox.y + 11);
               // context.fillText('x: ' + boundingBox.x + 'px', boundingBox.x + boundingBox.width + 5, boundingBox.y + 22);
               // context.fillText('y: ' + boundingBox.y + 'px', boundingBox.x + boundingBox.width + 5, boundingBox.y + 33);
        }
        
        function displayFaceLandmarksDot(faceLandmarks){
                Object.keys(landmarkFeatures).forEach(function(featureLabel){
                        if( parameters[featureLabel+'Visible'] === false )      return
                        displayFaceLandmarksFeature(faceLandmarks, featureLabel)
                })
        }
        function displayFaceLandmarksFeature(faceLandmarks, featureLabel){
                var feature = landmarkFeatures[featureLabel]
                
                // draw dots
                context.fillStyle = feature.fillStyle
                for(var i = feature.first; i <= feature.last; i++){
                        var xy = faceLandmarks[i]
                        //context.beginPath();
                        //context.arc(xy[0],xy[1],1,0,2*Math.PI);
                        //context.fill();    
						
						document.getElementById('video').style.transform = 'scale('+widthFactor+','+heightFactor+')';
						document.getElementById('canvasDetection').style.transform = 'scale('+widthFactor+','+heightFactor+')';
						
						$("#threeDArea").css({left:'0px',width:'100%',height:'2px',top: (xy[1] * heightFactor)+"px",display:'block'});
						
                }                
                
                // draw lines
                var feature = landmarkFeatures[featureLabel]
                context.strokeStyle = feature.fillStyle
                context.beginPath();
                for(var i = feature.first; i <= feature.last; i++){
                        var x = faceLandmarks[i][0]
                        var y = faceLandmarks[i][1]
                        if( i === 0 ){
                                //context.moveTo(x, y)
                        }else{
                                //context.lineTo(x, y)
                        }
                }                
                if( feature.closed === true ){
                        var x = faceLandmarks[feature.first][0]
                        var y = faceLandmarks[feature.first][1]
                        //context.lineTo(x, y)
                }

                //context.stroke();

        }
		
		
		
		
		
	}
	
	
	var resizingDivs = function() {
		console.log('resizing..!');
		//waterMeshModelObj.matrixWorldNeedsUpdate = true;										
		//waterMeshTopModelObj.matrixWorldNeedsUpdate = true;		
		//waterMeshModelObj.updateMatrix();
		$('#lineDraws').attr('width',window.innerWidth).attr('height',window.innerHeight);
		var curPos = getScreenCoordinates(waterMeshTopModelObj,camera,renderer);
										
		var top1 = curPos.y;
		
		$("#refLine").css({left:(curPos.x-20)+"px",top:curPos.y+"px"});
		//console.log(curPos.x,curPos.y);
		
		
		waterMeshTopModelObj2 = scene.getObjectByName( "Fluid_TopRing", true );
		
		var curPos = getScreenCoordinates(waterMeshTopModelObj2,camera,renderer);
		
		var top2 = curPos.y;
		
		//$("#refLine1").css({left:(curPos.x-20)+"px",top:curPos.y+"px"});
		
		var diffY = 3.5*(top2 - top1);
		
		$("#refLine").css({left:(curPos.x-20)+"px",top:(curPos.y-diffY)+"px"});
		$('#draggEyes').css('top','288px');
		finalTop = parseInt( $("#eyeContainment").css("height") ) + parseInt($("#eyeContainment").css("top")) - parseInt($("#draggEyes").css("height"));
		var calcs = Math.round(($("#waterLevelSlider").slider("value") - initTop) * ((totalNoOfFrames-1)/(finalTop - initTop))) + 1;
		$("#eyeBall").css("background-position","0px "+(calcs*1024)+"px");
		$("#eyeBall").css({
			top:(parseInt($('#draggEyes').css('top'))-48)+"px"
		});	
		drawVerLine();
	}
	
	var eyeDragStart = function() {
		lineDrawsContext.clearRect(0,0,$("#lineDraws").attr("width"),$("#lineDraws").attr("height"));
		$('#draggEyes').addClass('dragIsActive');
	}
	
	var eyeDragEvent = function(e,ui) {
		
		if(observedCorArea) {
			drawVerLine();
			e.preventDefault();
			return;
		}
		comDrags(e,ui);
	}
	
	var eyeStopEvent = function(e,ui) {
		$('#draggEyes').removeClass('dragIsActive');
		comDrags(e,ui);
		var setPos;
		clearTimeout(setPos);
		setPos = setTimeout(function(){
			clearTimeout(setPos);
			console.log('cal at last');
			$("#eyeBall").css({
				top:(parseInt($("#draggEyes").css("top"))-48)+"px"
			});
		},50);
		
	}
	var comDrags = function(e,ui) {
		$("#eyeBall").css({
			top:(ui.position.top-48)+"px"
		});		
		var calcs = Math.round((ui.position.top - initTop) * ((totalNoOfFrames-1)/(finalTop - initTop))) + 1;
		//console.log(calcs,ui.position.top,ui.position.top - initTop);
		$("#eyeBall").css("background-position","0px "+(calcs*1024)+"px");
		drawVerLine();
	}
	
	var drawVerLine = function() {
		//console.log('rara');
		lineDrawsContext.clearRect(0,0,$("#lineDraws").attr("width"),$("#lineDraws").attr("height"));
		var value_1 = parseInt($("#draggEyes").css("left")) + parseInt($("#draggEyes").css("width"));
		var value_2 = parseInt($("#draggEyes").css("top")) + parseInt($("#draggEyes").css("height")) / 2;
		var value_3 = parseInt($("#refLine").css("left")) + parseInt($("#refLine").css("width")) - 1 ;
		var value_4 = parseInt($("#refLine").css("top"));
		//console.log(Math.round(value_2),value_4);
		//console.log(value_1,value_2,value_3,value_4);
		lineDrawsContext.lineWidth = "3";
		lineDrawsContext.strokeStyle = "#0087a7";
		lineDrawsContext.strokeStyle = "#39FF14";
		lineDrawsContext.beginPath();
		lineDrawsContext.setLineDash([15, 5]);
		lineDrawsContext.moveTo( value_1, value_2 );
		lineDrawsContext.lineTo( value_3, value_4 );
		lineDrawsContext.stroke();
			var secOperand = "";
			var thirdOperand = "";
		if($("#waterLevelSlider").hasClass('sliding')) {
			secOperand = (value_4-5);
			thirdOperand = (value_4+5);
		} else {
			secOperand = (value_4-1);
			thirdOperand = (value_4+1);
		}
		
		
		
		/*if(value_2>= secOperand && value_2 <= thirdOperand && streamStatus) {
		//if(Math.round(value_2) == value_4) {
			$("#myModal, #blackScreen").fadeIn();
			console.log('hell');
			$("#myModal .modal-body p").text('Water level observed by the user.').css('line-height','120px');
			$("#myModal .modal-body").addClass('observeClass');
			observedCorArea = true;
			clearTimeout(hideModElem);
			hideModElem = setTimeout(function(){
				$("#myModal, #blackScreen").fadeOut();
				observedCorArea = false;
			},1000);
		}*/
			
			var slidingLev = $("#waterLevelSlider").slider("value");
			currAns = ((slidingLev-0.05) * 100) *  (liqLevel[1] - liqLevel[0]) / ( (uiLevel[1] - uiLevel[0])*100);
			currAns = (((slidingLev-0.05)*100).toFixed(1));
			
			//var calcs = currAns + (value_2-value_4)*0.01;
			var calcs = currAns - ((value_2-value_4)*0.02).toFixed(1);
			calcs = Math.round(calcs*2)/2;
			
			if(calcs<0)calcs=0;
			//console.log("calcs = ",calcs);
			if(!$('#volOfWater').hasClass('stableValue')) {
				if(calcs<0)calcs=0;
				$('#volOfWater').html(calcs+" cm<sup>3</sup>");
			} else {
				console.log('else part');
				var currAns = ((slidingLev-0.05) * 100);
				currAns = (((slidingLev-0.05)*100).toFixed(1));	
				currAns = Math.round(currAns*2)/2;
				if(currAns<0) currAns = 0;
				$('#volOfWater').html(currAns+" cm<sup>3</sup>");
				freezingMode();
			}
			
			$('#volOfWater').css({
				left: parseInt($('#refLine').css("left"))+100+"px",
				top: parseInt($('#refLine').css("top"))
			});
			
			
		if(value_2>= secOperand && value_2 <= thirdOperand && !streamStatus && !$('#volOfWater').hasClass('stableValue')  ) {
			console.log('observed..!');
			$('#volOfWater').addClass('stableValue');
			//$('#draggEyes').trigger('mouseup');
			
			freezingMode();
			
			//$('#waterLevelSlider').slider({disabled:true}); //For test Ela
			setTimeout(function(){
				var currAns = ((slidingLev-0.05) * 100);
				currAns = (((slidingLev-0.05)*100).toFixed(1));	
				currAns = Math.round(currAns*2)/2;
				if(currAns<0) currAns = 0;
				$('#volOfWater').html(currAns+" cm<sup>3</sup>");
			},500);
			
		}
		
		
	}
	
	var freezingMode  = function() {
		if( $('#draggEyes').hasClass('dragIsActive') ) {
			observedCorArea = true;
			$("#draggEyes, #eyeBall, #waterLevelSlider").css({
				'pointer-events': 'none',
				'opacity':'0.5'
			});
			
			$("#eyeBall").css({
				top:(parseInt($("#draggEyes").css("top"))-48)+"px"
			});
			
		}
	}
	
	
	var convertMeasure = function() {
		
		if(!$(this).hasClass('inchAdded')) {
			$(this).text("cm/m");
			$('#scaleElem').addClass('inchScale');
			currMeasure = measureConv[1][0];
			currUnit = measureConv[1][1];
		} else {
			$(this).text("inch/feet");
			$('#scaleElem').removeClass('inchScale');
			currMeasure = measureConv[0][0];
			currUnit = measureConv[0][1];
		}
		$(this).toggleClass('inchAdded');
		$("#pxMonitor").text((parseInt($("#scaleElem").css("height")) * currMeasure * multiplicationFact).toFixed(2)+" "+currUnit);
	}
	
	var recordVideo = function() {
		if($(this).hasClass('recording')) 
		{
			$(this).removeClass('recording');
			recorder.stopRecording(stopThis);
			//console.log();
			
		} else {
			$(this).addClass('recording');
			recorder = RecordRTC(locStream, {
				type: 'video'
			});
			//setSrcObject(locStream, videoDiv);
			recorder.startRecording();
			// release camera on stopRecording
			recorder.camera = locStream;
		}
	}
	
	var stopThis = function() {
		console.log(recorder);
			//videoDiv.src = URL.createObjectURL(recorder.getBlob());
			
			window.open(URL.createObjectURL(recorder.getBlob()));
			
			recorder = null;
	}
	
	var toggleModals = function() {
		$('#myModal, #blackScreen').toggle();
		isSubmitted = false;
		if($("#myModal .modal-body p").hasClass('ansCorrect')) {
			$("#myModal .modal-body p").removeClass('ansCorrect');
			$('#waterLev').val('');
			$('#submitButton').addClass('disableMode');
		}
		
	}
	
	var rotateDivs = function(event) {
		pw = document.getElementById('rotationEnab'),
		pwBox = pw.getBoundingClientRect(),
		center_x = (pwBox.left + pwBox.right) / 2,
		center_y = (pwBox.top + pwBox.bottom) / 2,
		// get mouse position
		mouse_x = event.pageX,
		mouse_y = event.pageY,
		radians = Math.atan2(mouse_x - center_x, mouse_y - center_y),
		degree = Math.round((radians * (180 / Math.PI) * -1) + 180);
		
	
		
		
		
		//console.log(degree);
		$('#rotationEnab, #scaleElem, #bottomContainment').css({
			'transform':'rotate('+degree+'deg)'/* ,
			'transform-origin': '0 0' */
		});
	}
	
	var dragStart = function() {
		
	}
	
	var dragActive = function(ev,ui) {
		//console.log(ui.position.top,ui.position.left);
		$("#rotationEnab").css({
			left: ui.position.left+"px",
			top: ui.position.top+"px"
		});
		$('#bottomContainment').css({
			left: ui.position.left+"px"
		});
		
		$(this).draggable('option', 'cursorAt', {
            top: parseInt($(this).css('height')) / 2,
            left: parseInt($(this).css('width')) / 2
        });
	}
	
	var dragStop = function(ev,ui) {
		$("#rotationEnab").css({
			left: ui.position.left+"px",
			top: ui.position.top+"px"
		});
		$('#bottomContainment').css({
			left: ui.position.left+"px"
		});
	}
	var botdragStart = function() {
		
	}
	
	var botdragActive = function(event,ui) {
		//console.log(event,ui);
		$("#scaleElem, #rotationEnab").css({
			height: ((ui.position.top)+80)+"px"
		});
		
		$("#pxMonitor").text((parseInt(((ui.position.top)+80)) * currMeasure * multiplicationFact).toFixed(2)+" "+currUnit);
	}
	
	var botdragStop = function(event,ui) {
		$("#pxMonitor").text((parseInt(((ui.position.top)+80)) * currMeasure * multiplicationFact).toFixed(2)+" "+currUnit);
	}
	
	var vidOnn = function() {
		video1 = document.getElementById('webgazerVideoFeed');
		if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ video: {facingMode: 'environment'} }).then(function(stream) {
				video1.src = ""
				video1.src = window.URL.createObjectURL(stream);
				locStream = stream;
				video1.play();
				$('#turnOnCam').hide();
				$('#turnOffCam').show();
			});
		}
	}
	
	var vidOff = function() 
	{
		//console.log($(this).hasClass("arOn"));		
		$('#waterLevelSlider').slider({disabled:false});
		$('#volOfWater').removeClass('stableValue');
		$('#threeDArea').hide();
		observedCorArea = false;
		$("#draggEyes, #eyeBall, #waterLevelSlider").css({
			'pointer-events': 'auto',
			'opacity':'1'
		});
		tubeMeshObj.rotation.x = 0;
		var curPos = getScreenCoordinates(waterMeshTopModelObj,camera,renderer);										
		var top1 = curPos.y;		
		waterMeshTopModelObj2 = scene.getObjectByName( "Fluid_TopRing", true );		
		var curPos = getScreenCoordinates(waterMeshTopModelObj2,camera,renderer);		
		var top2 = curPos.y;		
		var diffY = 3.5*(top2 - top1);
		$("#refLine").css({left:(curPos.x-20)+"px",top:(curPos.y-diffY)+"px"});
		if($(this).hasClass("arOff")) 
		{
			if (locStream) {
				console.log('clearing');
				locStream.getTracks().forEach(function(track) {
				  track.stop();
				});
				video.src="";
				
			}
			if(streamStatus) {
				streamStatus=false;
				window.cancelAnimationFrame(requestAnimID);
				requestAnimID = undefined;
				clearTimeout(timeOutID);
				$('#faceBox').fadeOut();
				trackingTask.stop();
			}
			
			drawVerLine();
			$("#eyeContainment, #lineDraws, #eyeBall, #draggEyes, #volOfWater").fadeIn();
			$('#recStop, #togCam').css({
				pointerEvents: "none",
				opacity: "0.5"
			});
		} else 
		{
			$('#turnOffCam').css({
				'pointer-events':'none',
				'opacity': '0.5'
			});
			//toggleCamera();
			elms();
			$("#turnOffCam").addClass('initiateAll');
			$("#eyeContainment, #lineDraws, #eyeBall, #draggEyes, #volOfWater").fadeOut();
			$('#recStop, #togCam').css({
				pointerEvents: "auto",
				opacity: "1"
			});
		}
		$(this).toggleClass("arOn");
		$(this).toggleClass("arOff");
	}
	
	var toggleDrag = function() {
		if($(this).hasClass("dragNow")) {
			$(this).toggleClass('dragNow');
			$(this).toggleClass('rotateNow');
			$('#rotationEnab').show();
			$(this).text('Drag');
			$('#dragContainment').css({
				top: $("#scaleElem").css("top"),
				left: $("#scaleElem").css("left"),
				width:$("#scaleElem").css("width"),
				height:$("#scaleElem").css("height")
			});
		} else {
			$(this).toggleClass('dragNow');
			$(this).toggleClass('rotateNow');
			$('#rotationEnab').hide();
			$(this).text('Rotate');
			/* $('#dragContainment').css({
				top: "",
				left: "",
				width: "",
				height: ""
			}) */
			
			
			var changer_1 = (99-targWidth)/90;
			var changer_2 = -(99-targHeight)/90;
			var changer_3 = (0-targTop)/90;
			var changer_4 = (0-targLeft)/90;
			
			 if((degree>=0 && degree<=90) || (degree>=180 && degree<=270)) {
				if(degree>90) degree = degree % 90;
				console.log(degree);
				$("#dragContainment").css({
					width: (99-(degree*changer_1))+"%",
					height: ( 100+ (degree*changer_2))+"%",
					top: -(degree*changer_3)+"%",
					left: -(degree*changer_4)+"%"
				});
				
			} else {
				console.log('exception');
				if(degree>90) degree = degree % 90;
				$("#dragContainment").css({
					width: (targWidth + ((degree%90)*changer_1))+"%",
					height: ( targHeight - ((degree%90)*changer_2))+"%",
					top: (targTop +  ((degree%90)*changer_3))+"%",
					left: (targLeft + ((degree%90)*changer_4))+"%"
				});
				console.log(targHeight - ((degree%90)*changer_2));
			}
			
			
		}
	}
	
	
	var modeChange = function() {
		if($(this).hasClass("measuring")) {
			$('#rotateBtn').show();
			$('#ruleBtn, #measurementConversion').hide();
			$(this).text("Reading");
			$('#parentContainer, #drag_rotate').hide();
			//hide3DArea();
			show3DArea();
			$('#overlay').show();
			arrangeElems();
		} else {
			$('#rotateBtn').hide();
			$('#ruleBtn, #measurementConversion').show();
			$(this).text("Measure");
			$('#parentContainer, #drag_rotate').show();
			hide3DArea();
			$('#overlay').hide();
			reArrangeElemes();
			//show3DArea();
		}
		$(this).toggleClass('measuring');
		$(this).toggleClass('virtualScale');
	}
	
	var arrangeElems = function() {
		$('#zoomInBtn').removeClass('zoomInLeft');
		$('#zoomOutBtn').removeClass('zoomOutLeft');
		$('#bottomContainer').removeClass('nonARMode');
	}
	
	var reArrangeElemes = function() {
		$('#bottomContainer').addClass('nonARMode');
		$('#zoomInBtn').addClass('zoomInLeft');
		$('#zoomOutBtn').addClass('zoomOutLeft');
	}
	
	var hideModElem;
	var eyeValue = function() {
		//console.log(findEye);
		//console.log( getFluidLevelInPixels().y );
		
		if(isSubmitted) return;
		
		var eyeTop = parseInt($("#threeDArea").css("top"));
		var minLimit = ( eyeTop - 5 ) <( $("#refLine").offset().top -10 );
		var maxLimit =   ( eyeTop + 15 ) > ( $("#refLine").offset().top - 10 );
		//console.log($("#refLine").offset().top,eyeTop,minLimit,maxLimit);
		
		if( ( minLimit ) && ( maxLimit )  ){
			var isDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
			isDevice = /webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
			var comps="";
			if(window.innerHeight > window.innerWidth){
				comps =  (currBetaValue>=75 && currGammaValue<=105) ;
			} else {
				comps = ( (currGammaValue>=-90 && currGammaValue<=-75) || (currGammaValue<=90 && currGammaValue>=75) );
			}
			console.log('observed');
			if(isDevice && !comps) {
				return;
			}
		
			console.log("Water Level Observed");
			//if($('#mode_1').hasClass("virtualScale")){
				
				$("#myModal, #blackScreen").show();
				$("#myModal .modal-body p").text('Water level observed by the user.').css('line-height','95px');
				$('#modContent').addClass('minPopUpClass');
				$('#modContent modal-body p').addClass('lineClass');
				$("#myModal .modal-body").addClass('observeClass');
				clearTimeout(hideModElem);
				hideModElem = setTimeout(function(){
					$("#myModal, #blackScreen").hide();
				},1000);
			//}
			
		}else{
			
		}
		
	}
	
	var validateInps = function(ev) {
		var entered = ev.which || ev.keycode;
		//console.log(entered);
		var currAns = 0;
		if(entered==13 && $(this).val().length>0) {
			inputProcess($(this));			
		} else {
			console.log('else key');
		}
		if($(this).val().length>0) {
			$("#submitButton").removeClass('disableMode');
		} else {
			$("#submitButton").addClass('disableMode');
		}
	}
	
	var disableSubmits = function() {
		if($(this).val().length>0) {
			$("#submitButton").removeClass('disableMode');
		} else {
			$("#submitButton").addClass('disableMode');
		}
	}
	
	var submitValue = function() {
		inputProcess($("#waterLev"));
	}
	
	var inputProcess = function(getVal) {
		isSubmitted = true;
		clearTimeout(hideModElem);
		$("#myModal, #blackScreen").show();
		console.log('enter key');
		getVal.blur();
		
		if(sliderVal<0.05) {
			currAns = 0;
		} else {
			//currAns = ((sliderVal-0.15) * 100) *  (liqLevel[1] - liqLevel[0]) / ( (uiLevel[1] - uiLevel[0])*100);
			currAns = ((sliderVal-0.05) * 100) *  (liqLevel[1] - liqLevel[0]) / ( (uiLevel[1] - uiLevel[0])*100);
			currAns = (((sliderVal-0.05)*100).toFixed(1));
		}
		//currAns = Math.round(currAns);
		
		
		currAns = Math.round(currAns*2)/2;
		
		//$('#volOfWater').html(currAns+" cm<sup>3</sup>");
		console.log("currAns = ",currAns);
		$("#myModal .modal-body").removeClass('observeClass');
		$('#modContent').removeClass('minPopUpClass');
		$('#modContent modal-body p').removeClass('lineClass');
		if(currAns == getVal.val()) {
			console.log('correct');
			$("#myModal .modal-body p").html('You are correct!<br/>Congratulation!<input type="button" id=tryButton tabindex="0" value="Ok">').css('line-height','');
			$("#myModal .modal-body p").addClass('ansCorrect');
			$('#tryButton').focus();
			
		} else {
			console.log('wrong');
			$("#myModal .modal-body p").html('The answer is not correct!<br/><input type="button" id=tryButton tabindex="0" value="Try again">').css('line-height','60px');
			$('#tryButton').focus();
		}
		$('.closeMod, #tryButton').off("click").on("click",toggleModals);
	}
	
	var toggleCamera = function() {
		console.log(currCam);
		if(currentCam==devId[0]) {
			currCam="user";
			currentCam =  devId[1];
			
		}else {
			currCam="environment";
			currentCam =  devId[0];
		}	
		
		if( navigator.appVersion.indexOf('Edge') > -1 ) {
			getParam =  { video: {facingMode: 'user'} };
			currCam = "user";
		} else	if(navigator.userAgent.match(/iPad/i)) {
			getParam =  { video: {deviceId: {exact: currentCam} }};		
			currCam = "user";
		} else {
			getParam =  { video: {deviceId: {exact: currentCam} }};		
			currCam = "user";
		}
		
		
		elms(); //Test remove
	}