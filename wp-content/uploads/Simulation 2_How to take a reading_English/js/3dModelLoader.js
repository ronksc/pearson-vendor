var currentFluidLevelPosObj =  null;
var waterMeshModelObj = null;
var tubeMeshObj = null;
var camera = null;
var controls = null;
var scene = null;
var renderer = null;
var zoomFactor = 0.1;
var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var mouseX = 0;
var mouseXOnMouseDown = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var sliderVal = 0;
var currGammaValue = 0;
var currBetaValue = 0;

function initModelLoader(){
	console.log('MODEL LOADER CALLED');
	
	$("#rotateBtn").on('click',rotate3DObject);
	$("#zoomInBtn").on('click',zoomInObject);
	$("#zoomOutBtn").on('click',zoomOutObject);	
	scene = new THREE.Scene();			
	camera = new THREE.PerspectiveCamera( 30, window.innerWidth/window.innerHeight, 0.1, 1000 );
	camera.fov = 21.434787;
	//camera.fov = 17.36217747;
	camera.updateProjectionMatrix();
	
	renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});	
	light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
	light.position.set(0, 1, 0);
	scene.add(light);
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.target.set( 0, 0, 0 );
	controls.enabled = false;
	controls.noZoom = true;
	controls.noPan = true;
	controls.minPolarAngle = Math.PI/2; // radians
	controls.maxPolarAngle = Math.PI/2; // radians
	controls.update();
	
	renderer.setSize( window.innerWidth, window.innerHeight );
	$("#3dContainer").append( renderer.domElement );
	
	var size = 28;
	var divisions = 28;

	var gridHelper = new THREE.GridHelper( size, divisions );
	var manager = new THREE.LoadingManager();
	
	manager.onProgress = function( item, loaded, total ) {
		console.log( item, loaded, total );
	};

	var onProgress = function( xhr ) {
		if ( xhr.lengthComputable ) {
			
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
			$('#percentageVal').text('Loading Models 1 of 1');
		}
	};

	var onError = function( xhr ) {
		console.error( xhr );
	};

	var loader = new THREE.FBXLoader( manager );
				
	loader.load( 'models/fbx/FluidCylinder_TopSurfaceTest03.fbx', function( object ) {
		
		scene.add( object );
		
		console.log("object = ",object);
		
		tubeMeshObj = object;
		
		$('#preloaderContainer').hide();
		if (window.DeviceOrientationEvent) {
			window.addEventListener('deviceorientation', deviceOrientationHandler, false);
			document.getElementById("doeSupported").innerText = "Supported!";
			
		}
				
		scene.add( object );
		
		camera.position.set(2.44,1.41,7.90);
		camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
		camera.rotation.set(-0.05,-0.19,-0.009);
		
		var boundingBox = new THREE.Box3();

		boundingBox.setFromObject( object );
		var center = boundingBox.getCenter();

		 // set camera to rotate around center of object
		controls.target = center;
		
		waterMeshModelObj = scene.getObjectByName( "Fluid_MESH", true );
		
		waterMeshModelObj.material.depthTest = false;
		
		//waterMeshModelObj.scale.y  = 0.2;
		waterMeshModelObj.scale.set(1,initSlideValue,1);
		//console.log(waterMeshModelObj);
		
		$('#levelFiller').css("width",(initSlideValue*100)+"%");
		sliderVal = initSlideValue;
		
		waterMeshModelObj.matrixWorldNeedsUpdate = true;
		
		waterMeshTopModelObj = scene.getObjectByName( "Fluid_Top", true );
		
		waterMeshTopModelObj.matrixWorldNeedsUpdate = true;

		scene.updateMatrixWorld(true);
		
		
		//scene.rotation.y = -180;
		//tubeMeshObj.rotation.y = 20;

		var vector = new THREE.Vector3();
		vector.setFromMatrixPosition( waterMeshTopModelObj.matrixWorld );
		
	
		var curPos = getScreenCoordinates(waterMeshTopModelObj,camera,renderer);
			
		
		animate();	
		
		waterMeshModelObj.scale.set(1,initSlideValue,1);

		//waterMeshModelObj.matrixWorldNeedsUpdate = true;

		//waterMeshTopModelObj.matrixWorldNeedsUpdate = true;

		//waterMeshModelObj.updateMatrix();

		var curPos = getScreenCoordinates(waterMeshTopModelObj,camera,renderer);

		$("#refLine").css({left:(curPos.x-20)+"px",top:curPos.y+"px"});


		waterMeshTopModelObj2 = scene.getObjectByName( "Fluid_TopRing", true );

		var curPos = getScreenCoordinates(waterMeshTopModelObj2,camera,renderer);

		$("#refLine1").css({left:(curPos.x-20)+"px",top:curPos.y+"px"});

		console.log(curPos);
									
		
		setFluidLevelInPixels(curPos);
		
		//

		//window.addEventListener( 'resize', onWindowResize, false );
		
		setInterval(onWindowResize,1);
		
		calculatePositionForSlider(initSlideValue);
		
	}, onProgress, onError );
	
			
	var animate = function () {
		//console.log('trefasd');
		requestAnimationFrame( animate );
		//tubeMeshObj.rotation.y += ( targetRotation - tubeMeshObj.rotation.y ) * 0.05;
		renderer.render( scene, camera );
		
		//$("#webgazerVideoCanvas").attr('width',window.innerWidth);
		//$("#webgazerVideoCanvas").attr('height',window.innerHeight);
		
		//console.log(camera);
	};
		
	
		
	
	
	sliderWholeSet();
	
	$("#waterLevelSlider").slider({value:initSlideValue});
	
	//$("#refLine").css({left: "615.729px",top: "535.029px"});
	//console.log(lineDrawsContext);
}

function sliderWholeSet() {
	$("#waterLevelSlider").slider({
		step:0.001,
		min : 0,
		max : 1,
		start: function() {
			$("#waterLevelSlider").addClass('sliding');
			$('#volOfWater').removeClass('stableValue');
		},
		slide :function(e,ui){
			//console.log(ui.value);
			//waterMeshModelObj.scale.y = ui.value;
			/*if($('#volOfWater').hasClass('stableValue')) {
				//console.log(ui.value);
				e.preventDefault();
				//drawVerLine();
				return;
			}*/
			$('#volOfWater').removeClass('stableValue');
			calculatePositionForSlider(ui.value);
			
			
			if(sliderVal<0.05) {
				currAns = 0;
			} else {
				//currAns = ((sliderVal-0.15) * 100) *  (liqLevel[1] - liqLevel[0]) / ( (uiLevel[1] - uiLevel[0])*100);
				currAns = ((sliderVal-0.05) * 100) *  (liqLevel[1] - liqLevel[0]) / ( (uiLevel[1] - uiLevel[0])*100);
				if(streamStatus) {
					currAns = Math.round(currAns);
				} else {
					currAns = Math.round(currAns*2)/2;
				}
				
				console.log("currAns = ",currAns);
			}
			//currAns = Math.round(currAns);
			
			/*$('#volOfWater').html(Math.round(currAns)+" cm<sup>3</sup>").css({
				left: parseInt($('#refLine').css("left"))+100+"px",
				top: parseInt($('#refLine').css("top"))
			});*/
		},
		stop: function() {
			//alert('stop Triggered');
			$('#volOfWater').removeClass('stableValue');
			drawVerLine();
			$("#waterLevelSlider").removeClass('sliding');
		}
	});
}

function calculatePositionForSlider(val){
										waterMeshModelObj.scale.set(1,val,1);
										
										waterMeshModelObj.matrixWorldNeedsUpdate = true;
										
										waterMeshTopModelObj.matrixWorldNeedsUpdate = true;
										
										waterMeshModelObj.updateMatrix();
										
																				
										var curPos = getScreenCoordinates(waterMeshTopModelObj,camera,renderer);
										
										var top1 = curPos.y;
										
										$("#refLine").css({left:(curPos.x-20)+"px",top:curPos.y+"px"});
										//console.log(curPos.x,curPos.y);
										
										
										waterMeshTopModelObj2 = scene.getObjectByName( "Fluid_TopRing", true );
										
										var curPos = getScreenCoordinates(waterMeshTopModelObj2,camera,renderer);
										
										var top2 = curPos.y;
										
										//$("#refLine1").css({left:(curPos.x-20)+"px",top:curPos.y+"px"});
										
										var diffY = 3.6*(top2 - top1);
										//console.log(diffY);
										
										$("#refLine").css({left:(curPos.x-20)+"px",top:(curPos.y-diffY)+"px"});
										
										//var curPos = getScreenCoordinates(ballMeshObj,camera,renderer);
										
										//$("#refLine").css({left:curPos.x+"px",top:curPos.y+"px"});
										
										//console.log(curPos)
										
										//waterMeshModelObj.geometry.computeBoundingSphere();
		
										//var vector = waterMeshModelObj.geometry.boundingSphere.center;		
										
										//console.log(vector)
										
										//waterMeshTopModelObj.geometry.computeBoundingSphere();
		
										//var vector = waterMeshTopModelObj.geometry.boundingSphere.center;		
										
										setFluidLevelInPixels(curPos);										
										
										$('#levelFiller').css("width",(val*100)+"%");
										//console.log(ui.value);
										sliderVal = val;
										drawVerLine();

}



function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
	
	//$('#webgazerVideoCanvas,#webgazerVideoCanvas,#overlay').attr("width",window.innerWidth);
	//$('#webgazerVideoCanvas,#webgazerVideoCanvas,#overlay').attr("height",window.innerHeight);
}


function getScreenCoordinates(obj,camera,renderer){
	//renderer.setSize( window.innerWidth, window.innerHeight );
	//console.log(renderer.context.canvas.height);

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.render( scene, camera );
    var vector = new THREE.Vector3(0,0,0);
	
	//console.log(vector);
	//console.log(renderer.context.canvas.width,renderer.context.canvas.height);
    var widthHalf = 0.5*renderer.context.canvas.width;
    var heightHalf = 0.5*renderer.context.canvas.height;

	//console.log("camera: "+obj.matrixWorld);
	
    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);
	
	//console.log(vector);
	
    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;
	//console.log(vector);
    return { 
        x: vector.x,
        y: vector.y
    };

};

function show3DArea(){
	$("#3dArea").show();
}


function hide3DArea(){
	$("#3dArea").hide();
}


function setFluidLevelInPixels(val){
	currentFluidLevelPosObj = val;
}


function getFluidLevelInPixels(){
	return currentFluidLevelPosObj;
}


function deviceOrientationHandler(event)
{
	
	if($("#turnOffCam").hasClass("arOn")) return;
	
	if($("#waterLev").is(":focus")) {
		tubeMeshObj.rotation.x = 0;
		return;
	}
	
	document.getElementById("doeSupported").innerText = Math.round( event.alpha )+" "+Math.round( event.beta )+" "+Math.round( event.gamma );
	currGammaValue = Math.round( event.gamma );
	currBetaValue = Math.round( event.beta );
	if(tubeMeshObj != undefined){
		/* if( (event.gamma > -90)  ){
			document.getElementById("doeSupported").innerText = "CASE 1  "+event.gamma + 90;
			tubeMeshObj.rotation.x =   Math.round( event.gamma) * Math.PI / 180;
		}else{
			document.getElementById("doeSupported").innerText = "CASE 2  "+event.gamma + 90;
		} */
		
		if(window.innerHeight > window.innerWidth){
			//portrait
			if( (event.beta > 0) && (event.beta < 90)  ){
				tubeMeshObj.rotation.x =   -1 * Math.round(90 - event.beta) * Math.PI / 180;
			}else if( (event.beta < 180) && (event.beta > 90) ){
				tubeMeshObj.rotation.x =   Math.round(event.beta-90) * Math.PI / 180;
				document.getElementById("doeSupported").innerText = Math.round( event.alpha )+" "+Math.round( event.beta )+" "+Math.round( event.gamma )+" hello00000";
			}
			
		} else {
			//landscape
			if( (event.gamma > -90) && (event.gamma < 0)  ){
				tubeMeshObj.rotation.x =   -1 * Math.round( event.gamma + 90) * Math.PI / 180;
				document.getElementById("doeSupported").innerText = Math.round( event.alpha )+" "+Math.round( event.beta )+" "+Math.round( event.gamma )+" "+tubeMeshObj.rotation.x+" "+" hellopor";
			}else if( (event.gamma > 0) && (event.gamma < 90) ){
				tubeMeshObj.rotation.x =   Math.round( 90 - event.gamma ) * Math.PI / 180;
				document.getElementById("doeSupported").innerText = Math.round( event.alpha )+" "+Math.round( event.beta )+" "+Math.round( event.gamma )+" "+tubeMeshObj.rotation.x+" "+" hellopor2";
			}
		}
		
		
		
		
		
										var curPos = getScreenCoordinates(waterMeshTopModelObj,camera,renderer);
										
										var top1 = curPos.y;
										
										waterMeshTopModelObj2 = scene.getObjectByName( "Fluid_TopRing", true );
										
										var curPos = getScreenCoordinates(waterMeshTopModelObj2,camera,renderer);
										
										var top2 = curPos.y;
										
										var diffY = 3.5*(top2 - top1);
										
										$("#refLine").css({left:(curPos.x-20)+"px",top:(curPos.y-diffY)+"px"});
										currAns = Math.round(currAns) / 2;
										if(currAns<0) currAns = 0;
										$('#volOfWater').html(currAns+" cm<sup>3</sup>").css({
											left: parseInt($('#refLine').css("left"))+100+"px",
											top: parseInt($('#refLine').css("top"))
										});
		
		
		drawVerLine();
		
		//var curSliderVal = $("#waterLevelSlider").val();
		
		//document.getElementById("doeSupported").innerText = curSliderVal;
		
		//calculatePositionForSlider(curSliderVal)
		
		//tubeMeshObj.rotation.y = Math.round( event.beta ) * Math.PI / 180;
		//tubeMeshObj.rotation.y = Math.round( event.beta );
		//tubeMeshObj.rotation.z = Math.round( event.alpha ) * Math.PI / 180;
		//tubeMeshObj.rotation.y = Math.round( event.beta) * Math.PI / 180;
		//console.log(tubeMeshObj.rotation.x,tubeMeshObj.rotation.y,tubeMeshObj.rotation.z);
	}
}


function rotate3DObject(){
	//tubeMeshObj.rotation.x = tubeMeshObj.rotation.x + 1;

	/*var curAngleInDeg = camera.rotation.x * 180 / Math.PI;  
	curAngleInDeg = curAngleInDeg + 1;
	var curAngleInRad = curAngleInDeg * Math.PI / 180;  
	camera.rotation.x = curAngleInRad;
	console.log(curAngleInDeg);*/
	
	console.log( controls );
	
	if(!controls.enabled){
		controls.enabled = true;
		
	}else{
		controls.enabled = false;
	}
	$(this).toggleClass('rotating3D');
}


function zoomInObject(){
	if(camera.fov > 18){
		var curZoom = -1 * ( camera.fov * zoomFactor );
		camera.fov = camera.fov + curZoom;
		camera.updateProjectionMatrix();
		console.log(camera.fov);
		$(this).css({'cursor':'pointer','opacity':1});
		$("#zoomOutBtn").css({'cursor':'pointer','opacity':1});
	}else{
		$(this).css({'cursor':'default','opacity':0.5});
	}
	
	var curPos = getScreenCoordinates(waterMeshTopModelObj,camera,renderer);

	var top1 = curPos.y;

	waterMeshTopModelObj2 = scene.getObjectByName( "Fluid_TopRing", true );

	var curPos = getScreenCoordinates(waterMeshTopModelObj2,camera,renderer);

	var top2 = curPos.y;

	//$("#refLine1").css({left:(curPos.x-20)+"px",top:curPos.y+"px"});

	var diffY = 3.5*(top2 - top1);

	$("#refLine").css({left:(curPos.x-20)+"px",top:(curPos.y-diffY)+"px"});
	if(streamStatus) {
		currAns = Math.round(currAns);
	} else {
		currAns = Math.round(currAns*2)/2;
	}
	if(currAns<0) currAns = 0;
	$('#volOfWater').html(currAns+" cm<sup>3</sup>").css({
		left: parseInt($('#refLine').css("left"))+100+"px",
		top: parseInt($('#refLine').css("top"))
	});


	drawVerLine();
}


function zoomOutObject(){
	if(camera.fov < 46){
		var curZoom = 1 * ( camera.fov * zoomFactor );
		camera.fov = camera.fov + curZoom;
		camera.updateProjectionMatrix();
		console.log(camera.fov);
		$(this).css({'cursor':'pointer','opacity':1});
		$("#zoomInBtn").css({'cursor':'pointer','opacity':1});
	}else{
		$(this).css({'cursor':'default','opacity':0.5});
	}
		var curPos = getScreenCoordinates(waterMeshTopModelObj,camera,renderer);

	var top1 = curPos.y;

	waterMeshTopModelObj2 = scene.getObjectByName( "Fluid_TopRing", true );

	var curPos = getScreenCoordinates(waterMeshTopModelObj2,camera,renderer);

	var top2 = curPos.y;

	//$("#refLine1").css({left:(curPos.x-20)+"px",top:curPos.y+"px"});

	var diffY = 3.5*(top2 - top1);

	$("#refLine").css({left:(curPos.x-20)+"px",top:(curPos.y-diffY)+"px"});
	if(streamStatus) {
		currAns = Math.round(currAns);
	} else {
		currAns = Math.round(currAns*2)/2;
	}
	if(currAns<0) currAns = 0;
	$('#volOfWater').html(currAns+" cm<sup>3</sup>").css({
		left: parseInt($('#refLine').css("left"))+100+"px",
		top: parseInt($('#refLine').css("top"))
	});


	drawVerLine();
}

























