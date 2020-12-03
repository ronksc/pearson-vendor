var levelCount = 0;
var levelTextArr = ["Transfer","Mix","Boil"];
var objects = [];
var currCam="environment";
var devId = [];
var whichDevice = devId[0];
var curModeObj = "";
var curAudio = document.createElement('audio');
var audRepeat = false;

function initExperiments(){
	console.log('MODEL LOADER CALLED');
	$("#changeLevelBtn").on('click',changeExperiment);
	$('#togCam').off('click').on('click',toggleCamera);
	$('#recStop').off('click').on('click',recordVideo);
	$("#resetBtn").off('click').on('click',onResetClick);
	$(window).on('resize',resizeAll);
	getInps();
	
	whichDevice = devId[0];
	
	//$("#preloaderContainer").hide();
	//$("#parentContainer").show();
	
	//updateInstruction();
	updateExperiment();
	
	curAudio.addEventListener('ended',audioRepeat)
}

function audioRepeat() {
	curAudio.pause();
	audRepeat = true;
	curAudio.currentTime = 2;
	console.log('repeat');
	playAudio("audio/BunsenBurner_BlueFlame_SFX.mp3")
}

function resizeAll() {
	console.log('resize');
	$('#resetBtn').trigger('click');
}

function playAudio(source){
	
	if(!audRepeat){
		curAudio.src=source;
		curAudio.load();
	}
	console.log(curAudio.currentTime);
	curAudio.play();
}

function onResetClick(){
	$("#resetBtn").addClass('resetButtonClicked');
	updateExperiment();
}


function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
}


function changeExperiment(){
	$('.success_message').text('Success');
	step = 1;
	levelCount++;
	
	
	if(levelCount < 3){
		updateExperiment();
	}else{
		levelCount = 0;
		updateExperiment();
	}
}

function recordVideo() {
	if($(this).hasClass('recording')){
		$(this).removeClass('recording');
		recorder.stopRecording(stopThis);
	}else{
		$(this).addClass('recording');
		recorder = RecordRTC(locStream, {
			type: 'video'
		});
		recorder.startRecording();
		recorder.camera = locStream;
	}
}

function stopThis() {
	console.log(recorder);
	window.open(URL.createObjectURL(recorder.getBlob()));
	recorder = null;
}

function toggleCamera() {
		if(currCam=="environment") {
			currCam="user";
			whichDevice = devId[1];
		}else {
			currCam="environment";
			whichDevice = devId[0];
		}
		enableARMode();
		$("#cameraBtn").removeClass('cameraOn');
	}

function updateExperiment(){
		audRepeat = false;
		$("#changeLevelBtn").html(levelTextArr[levelCount]);
		step = 1;
		curAudio.pause();
		curAudio.currentTime = 0;
		
		if( !$("#resetBtn").hasClass('resetButtonClicked') ) {
			showInstruction();
		} 
		
		$("#resetBtn").removeClass('resetButtonClicked')
		
		switch(levelCount){
			case 0:
				if(curModeObj != ""){
					curModeObj.removeListeners();
				}
				
				var mode1Obj = new Mode1();
				curModeObj = mode1Obj;
				break;
			case 1:
				if(curModeObj != ""){
					curModeObj.removeListeners();
				}

				var mode2Obj = new Mode2();
				curModeObj = mode2Obj;
				break;
			case 2:

				if(curModeObj != ""){
					curModeObj.removeListeners();
				}

				var mode3Obj = new Mode3();
				curModeObj = mode3Obj;
				break;
		}
}


function getInps() {
	
	if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
		//console.log("enumerateDevices() not supported.");
		$('#togCam').css({'opacity':0.5,'cursor':'default'});
		return;
	}
	
	navigator.mediaDevices.enumerateDevices().then(function(deviceInfos){
		for(i=1;i<=deviceInfos.length;i++) {
			if(deviceInfos[i-1].kind=="videoinput") {
				devId.push(deviceInfos[i-1].deviceId);
				//$("#traceDiv").append( "<br/>"+deviceInfos[i-1].deviceId+"<br/>"+deviceInfos[i-1].label);
			}
		}
		whichDevice = devId[0];
	}).then(function(){
	
	});
}




















