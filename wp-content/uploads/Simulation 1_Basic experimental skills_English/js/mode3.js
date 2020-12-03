var Mode3 = function(){
	var _this = this;
	
	var beakerStage1;
	var beakerStageSprite1;
	var beakerAnimation1;
	
	var flameStage;
	
	var blueFlameSprite;
	var blueFlameAnimation;

	var yellowFlameSprite;
	var yellowFlameAnimation;
	
	var lighterStage;
	var lighterAnimation;
	
	var isAirHoleClosed = false;
	var isGasHoleClosed = false;
	
	var isGasLighterTurnedOn = false;
	var isCorrectlyDropped = false;
	
	var isTableCorrectlyPlaced = false;
	var isBeakerCorrectlyPlaced = false;
	var isFlameStarted = false;
	var isAnimationRunning = false;
	
	var collision_1 = false;
	var collision_2 = false;
	var collision_3 = false;
	var collision_4 = false;
	var collision_5 = false;
	var collision_6 = false;
	var collision_7 = false;
	
	var curFrameRate = 48;
	
	var isARDrag_1 = false;
	var isARDrag_2 = false;
	var isARDrag_3 = false;
	
	var airAccess = false;
	var secondsAccess = true;
	
	var isActivityCompleted = false;
	
	var isLesserResolution = false;
	
	this.init = function(){
		//console.log('MODE 3 CALLED');	
		
		var htmlStr = 	'<div id="m3Beaker" class="sm3_beaker">\
				<canvas id="beakerCanvas1" width="150" height="250"></canvas>\
			</div>\
			<div id="bunsenBurner" class="sm3_bunsen_burner">\
				<canvas class="flame_canvas" id="flameCanvas" width="35" height="75"></canvas>\
				<div id="gasHoleBtn" class="sm3_gas_hole"></div>\
			</div>\
			<div id="airHoleBtn" class="sm3_air_hole"></div>\
			<div id="tableStand" class="sm3_stand">\
				<div id="tableDropArea" class="table_drop_area"></div>\
			</div>\
			<div id="lighter" class="sm3_lighter">\
				<canvas id="lighterCanvas" width="24" height="70"></canvas>\
			</div>'
		
		$(".similuation_one").hide();
		$(".similuation_one:eq(2)").html(htmlStr).show();
		
		if( ( screen.height>=720 && screen.height<= 864 ) && !isIPAD && !isAndroid ) {
			isLesserResolution = true;	
			if(screen.height == 768){
				$("#bunsenBurner").css({top:"335px"});//430px
				$("#airHoleBtn").css({top:"430px"}); 
			}
		}else{
			isLesserResolution = false;
		}
		
		
		$(".mode_instruction").html('Set up apparatus and boil the water.').show();
		
		$("#airHoleBtn").on('click',_this.onAirHoleClick);
		$("#gasHoleBtn").on('click',_this.onGasHoleClick);
		
		$("#m3Beaker").data('left',$("#m3Beaker").position().left );
		$("#m3Beaker").data('top',$("#m3Beaker").position().top );
		
		$("#tableStand").data('left',$("#tableStand").position().left );
		$("#tableStand").data('top',$("#tableStand").position().top );
		
		$("#lighter").data('left',$("#lighter").position().left );
		$("#lighter").data('top',$("#lighter").position().top );
				
		$("#m3Beaker").draggable({
									zIndex:3,
									drag : function(){
										isCorrectlyDropped = false;
									},
									stop : function(){
										if(!isCorrectlyDropped){
											$("#m3Beaker").css('left',$("#m3Beaker").data().left );
											$("#m3Beaker").css('top',$("#m3Beaker").data().top );
										}else{
											$("#m3Beaker").css('zIndex',3);
										}
									}
									
		});  //bunsenBurner
		
		
		$("#tableStand").draggable({
									zIndex:2,
									drag : function(){
										isCorrectlyDropped = false;
									},
									stop : function(){
										if(!isCorrectlyDropped){
											$("#tableStand").css('left',$("#tableStand").data().left );
											$("#tableStand").css('top',$("#tableStand").data().top );
										}else{
											$("#tableStand").css({'zIndex':'2'});
										}
									}
									
		});
		
		$("#lighter").draggable({
									zIndex:2,
									drag : function(){
										isCorrectlyDropped = false;
									},
									stop : function(){
										if(!isCorrectlyDropped){
											$("#lighter").css('left',$("#lighter").data().left );
											$("#lighter").css('top',$("#lighter").data().top );
										}
									}
									
		});
		
		
		$("#tableDropArea").droppable({
										tolerance : 'touch',
										drop : function(e,ui){
											//console.log('DROP');
											
											console.log('TABLE DROP');
											
											if(!isTableCorrectlyPlaced){
												return;
											}
											
											isCorrectlyDropped = true;
											var curID = $(ui.draggable).attr('id');
											if(curID == 'm3Beaker'){
												$("#m3Beaker").addClass('settled');
												if(isIPAD){
													if(window.innerWidth>window.innerHeight) {
														$("#m3Beaker").draggable('disable').css({left:'414px',top:'141px'});
													} else {
														$("#m3Beaker").draggable('disable').css({left:'352px',top:'355px'});
													}
												} else if(screen.height>=720 && screen.height <= 864) {
													$("#m3Beaker").draggable('disable').css({left:'414px',top:'86px'});
												}else{
													$("#m3Beaker").draggable('disable').css({left:'414px',top:'154px'});
												}
												
												isBeakerCorrectlyPlaced = true;
												
												if(isFlameStarted && !isAnimationRunning){
													isAnimationRunning = true;
													beakerAnimation1.gotoAndPlay("forward");
												}
											}
										}
		});
		
		$("#bunsenBurner").droppable({
										tolerance : 'touch',
										drop : function(e,ui){
											console.log('FLAME DROP');
											var curID = $(ui.draggable).attr('id');
											console.log(curID);
											if(curID == 'tableStand'){
												if(isIPAD){
													if(window.innerWidth>window.innerHeight) {
														$("#tableStand").draggable('disable').css({left:'356px',top:'325px'});
													} else {
														$("#tableStand").draggable('disable').css({left:'296px',top:'539px'});
													}
													
												}else if(screen.height>=720 && screen.height <= 864) {
													$("#tableStand").draggable('disable').css({left:'358px',top:'268px'});
												} else {
													$("#tableStand").draggable('disable').css({left:'358px',top:'338px'});
												}
												isTableCorrectlyPlaced = true;
												isCorrectlyDropped = true;
												$("#tableStand").addClass('settled')
											}
										}
		});
		
		$("#flameCanvas").droppable({
										tolerance : 'touch',
										drop : function(e,ui){
											
											var curID = $(ui.draggable).attr('id');
											console.log('FLAME CANVAS DROP',isCorrectlyDropped,curID);
											if(curID == 'lighter'){
												//$("#lighter").css({left:'825px',top:'615px'});
												console.log('entered');
												//$("#lighter").css('left',$("#lighter").data().left );
												//$("#lighter").css('top',$("#lighter").data().top );
												$("#lighter").addClass('settled');
												$("#lighter").css({
													left: "498px",
													top: "426px",
													pointerEvents: 'none',
													cursor: 'auto'
												});
												
												if(isIPAD) {
													
													
													if(window.innerWidth>window.innerHeight) {
														$("#lighter").css({
															top: "422px",
															left: "500px"
														});
													} else {
														$("#lighter").css({
															top: "636px",
															left: "450px"
														});
													}
												} else if(screen.height>=720 && screen.height <= 864) {
													$("#lighter").css({
														left: "498px",
														top: "359px",
														pointerEvents: 'none',
														cursor: 'auto'
													});
												}
												
												isCorrectlyDropped = true;
												
												isGasLighterTurnedOn = true;
												
												lighterAnimation.visible = true;
												lighterAnimation.gotoAndPlay("forward");
												
												if(isGasHoleClosed){
													//isGasLighterTurnedOn = true;
													_this.checkForAnimationChange();
												}
											}
										}
		});
		
		
		_this.initAnimations();
	}
	
	this.arModeFunction1 = function() {
		isARDrag_1 = isARDrag_2 = isARDrag_3 = false;
	}
	
	this.enableAirHole = function() {
		
		if(airAccess) return
		
		console.log( (parseInt($('#traceDiv').css('left'))  - $('#mode3').offset().left < 360) || (parseInt($('#traceDiv').css('left')) - $('#mode3').offset().left > 510) || (parseInt($('#traceDiv').css('top')) < 306) );
		
		if( (parseInt($('#traceDiv').css('left'))  - $('#mode3').offset().left < 360) || (parseInt($('#traceDiv').css('left')) - $('#mode3').offset().left > 510) || (parseInt($('#traceDiv').css('top')) < 306) ) {
			airAccess = true;
		}
	
	}
	
	
	this.arModeFunction = function() {
		_this.enableAirHole();
		//console.log('mode 3..!');
		collision_1 = false;
		collision_2 = false;
		collision_3 = false;
		collision_4 = false;
		collision_5 = false;
		collision_6 = false;
		collision_7 = false;
		
		if(collision( $("#traceDiv"), $("#tableStand"))) {
			//if( $("#tableStand").hasClass('settled') ) return;
			collision_1 = true;
		}  
		if(collision( $("#traceDiv"), $("#m3Beaker"))) {
			//if( $("#m3Beaker").hasClass('settled') ) return;
			collision_3 = true;
		} 
		if(collision( $("#traceDiv"), $("#lighter"))) {
			if( $("#lighter").hasClass('settled') ) return;
			collision_6 = true;
		}
		
		if(collision( $("#traceDiv"), $("#bunsenBurner"))) {
			collision_2 = true;
		}
		
		if(collision( $("#traceDiv"), $("#gasHoleBtn"))) {
			collision_4 = true;
		} 
		if(collision( $("#traceDiv"), $("#airHoleBtn"))) {
			collision_5 = true;
		}
		
		if(collision( $("#traceDiv"), $("#flameCanvas"))) {
			collision_7 = true;
		} 
		
		marginLeft = ( $("#parentContainer").width() - $("#mode2").width() ) / 2;
		marginTop = ( $("#parentContainer").height() - $("#mode2").height() ) / 2;
		
		//console.log( collision_3, !$("#m3Beaker").hasClass('settled') )
		if(collision_1 && !$("#tableStand").hasClass('settled')) {
			//isARDrag = true;
			
			if(!isARDrag_2 && !isARDrag_3 ) isARDrag_1 = true;
			if(!isARDrag_1) return;
			
			console.log(parseInt( $("#traceDiv").css("top") )-marginTop,window.innerHeight-parseInt( $("#tableStand").css("height") ));
			
			if( parseInt( $("#traceDiv").css("top") )- marginTop > window.innerHeight-parseInt( $("#tableStand").css("height") ) || parseInt( $("#traceDiv").css("top") )- marginTop < 20 || parseInt( $("#traceDiv").css("left") )- marginLeft > window.innerWidth-parseInt( $("#tableStand").css("width") ) || parseInt( $("#traceDiv").css("left") )- marginTop < 20 ) {return;}
			
			$("#tableStand").css({
				left: parseInt( $("#traceDiv").css("left") )-marginLeft+"px",
				top: parseInt( $("#traceDiv").css("top") )-marginTop+"px"
			});
			
			if(collision_1 && collision_2 && !$("#tableStand").hasClass('settled')) {
				$("#tableStand").addClass('settled');
				isARDrag_1 = false;
				isTableCorrectlyPlaced = true;
												if(isIPAD){
													if(window.innerWidth>window.innerHeight) {
														$("#tableStand").draggable('disable').css({left:'356px',top:'325px'});
													} else {
														$("#tableStand").draggable('disable').css({left:'296px',top:'539px'});
													}
												} else if(screen.height>=720 && screen.height <= 864) {
													$("#tableStand").draggable('disable').css({left:'358px',top:'268px'});
												}else{
													$("#tableStand").draggable('disable').css({left:'358px',top:'338px'});
												}
				$('#tableStand').css('z-index',2);
			}
			
			
		}

		if(collision_3 && !$("#m3Beaker").hasClass('settled')) {
			if(!isARDrag_1 && !isARDrag_3 ) isARDrag_2 = true;
			if(!isARDrag_2) return;
			
			if( parseInt( $("#traceDiv").css("top") )- marginTop > window.innerHeight-parseInt( $("#m3Beaker").css("height") ) || parseInt( $("#traceDiv").css("top") )- marginTop < 20 || parseInt( $("#traceDiv").css("left") )- marginLeft > window.innerWidth-parseInt( $("#m3Beaker").css("width") ) || parseInt( $("#traceDiv").css("left") )- marginTop < 20 ) {return;}
			
			
			$("#m3Beaker").css({
				left: parseInt( $("#traceDiv").css("left") )-marginLeft+"px",
				top: parseInt( $("#traceDiv").css("top") )-marginTop+"px"
			});
			
			if(collision_3 && collision_1 && !$("#m3Beaker").hasClass('settled') && $("#tableStand").hasClass('settled')) {
				$("#m3Beaker").addClass('settled');
				isBeakerCorrectlyPlaced = true;
				isARDrag_2 = false;
												if(isIPAD){
													if(window.innerWidth>window.innerHeight) {
														$("#m3Beaker").draggable('disable').css({left:'414px',top:'141px'});
													} else {
														$("#m3Beaker").draggable('disable').css({left:'352px',top:'355px'});
													}
													
												} else if(screen.height>=720 && screen.height <= 864) {
													$("#m3Beaker").draggable('disable').css({left:'414px',top:'86px'});
												}else{
													$("#m3Beaker").draggable('disable').css({left:'414px',top:'154px'});
												}
												this.checkForAnimationChange();
				$("#m3Beaker").css('z-index',3);
				
			}
			
		} 
		
		if(collision_4 && !$('#gasHoleBtn').hasClass('settled')) {
			// Gas hole on code here...!
			//isGasLighterTurnedOn = false;
				$('#gasHoleBtn').addClass('settled');
				isGasHoleClosed = false;
				_this.onGasHoleClick();
				this.checkForAnimationChange();
			//},500);
		}
		
		if(collision_5) {
			// Air hole on code here...!
			//isGasLighterTurnedOn = false;
			//isAirHoleClosed = !isAirHoleClosed;
				
				if(airAccess && secondsAccess) {
					airAccess = false;
					secondsAccess = false;
					var airHoleEnable;
					clearTimeout(airHoleEnable);
					airHoleEnable = setTimeout(function(){
						clearTimeout(airHoleEnable);
						secondsAccess = true;
					},3000);
					_this.onAirHoleClick(); 
				}
				
			
		}
		
		if(collision_6) {
			// Air hole on code here...!
			//isGasLighterTurnedOn = false;
			//isAirHoleClosed = !isAirHoleClosed;
			if(!isARDrag_2 && !isARDrag_1 ) isARDrag_3 = true;
			if(!isARDrag_3) return;
			
			
			if( parseInt( $("#traceDiv").css("top") )- marginTop > window.innerHeight-parseInt( $("#lighter").css("height") ) || parseInt( $("#traceDiv").css("top") )- marginTop < 20 || parseInt( $("#traceDiv").css("left") )- marginLeft > window.innerWidth-parseInt( $("#lighter").css("width") ) || parseInt( $("#traceDiv").css("left") )- marginTop < 20 ) {return;}
			
			$("#lighter").css({
				left: parseInt( $("#traceDiv").css("left") )-marginLeft+"px",
				top: parseInt( $("#traceDiv").css("top") )-marginTop+"px"
			});
			
			if( collision_6 && collision_7 && !$("#lighter").hasClass('settled')) {
				isARDrag_3 = false;
				/*$("#lighter").css('left',$("#lighter").data().left );
				$("#lighter").css('top',$("#lighter").data().top );*/
				$("#lighter").css({
					left: "498px",
					top: "426px",
					pointerEvents: 'none',
					cursor: 'auto'
				});
				$("#lighter").addClass('settled');
				if(isIPAD) {													
					if(window.innerWidth>window.innerHeight) {
						$("#lighter").css({
							top: "422px",
							left: "500px"
						});
					} else {
						$("#lighter").css({
							top: "636px",
							left: "450px"
						});
					}
				}else if(screen.height>=720 && screen.height <= 864) {
					$("#lighter").css({
						left: "498px",
						top: "359px",
						pointerEvents: 'none',
						cursor: 'auto'
					});
				}
				isGasLighterTurnedOn = true;
				console.log(isGasLighterTurnedOn);
				this.checkForAnimationChange();
				
				lighterAnimation.visible = true;
				lighterAnimation.gotoAndPlay("forward");
			
				
			}
		}
	}
	
	
	
	this.onAirHoleClick = function(){
		isAirHoleClosed =  !isAirHoleClosed;
		
		//isAnimationRunning = false;
		
		if(isAirHoleClosed && isGasHoleClosed){
			//$("#bunsenBurner").css('background','url("images/sim3/Buner_G01_A01.png")');	
			$("#bunsenBurner").css('background-position','-1050px 0px');
		}else if(!isAirHoleClosed && !isGasHoleClosed){
			//$("#bunsenBurner").css('background','url("images/sim3/Buner_G00_A00.png")');	
			$("#bunsenBurner").css('background-position','0px 0px');
		}else if(!isAirHoleClosed && isGasHoleClosed){
			//$("#bunsenBurner").css('background','url("images/sim3/Buner_G01_A00.png")');	
			$("#bunsenBurner").css('background-position','-700px 0px');
		}else if(isAirHoleClosed && !isGasHoleClosed){
			//$("#bunsenBurner").css('background','url("images/sim3/Buner_G00_A01.png")');	
			$("#bunsenBurner").css('background-position','-350px 0px');
		}
		
		_this.checkForAnimationChange();
	}
	
	this.onGasHoleClick = function(){
		isGasHoleClosed = !isGasHoleClosed;	
		if(!isGasHoleClosed){
			isGasLighterTurnedOn = false;
		}
		
		if(isAirHoleClosed && isGasHoleClosed){
			//$("#bunsenBurner").css('background','url("images/sim3/Buner_G01_A01.png")');	
			$("#bunsenBurner").css('background-position','-1050px 0px');
		}else if(!isAirHoleClosed && !isGasHoleClosed){
			//$("#bunsenBurner").css('background','url("images/sim3/Buner_G00_A00.png")');	
			$("#bunsenBurner").css('background-position','0px 0px');
		}else if(!isAirHoleClosed && isGasHoleClosed){
			//$("#bunsenBurner").css('background','url("images/sim3/Buner_G01_A00.png")');	
			$("#bunsenBurner").css('background-position','-700px 0px');
		}else if(isAirHoleClosed && !isGasHoleClosed){
			//$("#bunsenBurner").css('background','url("images/sim3/Buner_G00_A01.png")');	
			$("#bunsenBurner").css('background-position','-350px 0px');
		}
		
		//console.log('isGasLighterTurnedOn',isGasLighterTurnedOn);
		_this.checkForAnimationChange();
		
	}
	
	
	this.checkForAnimationChange = function(){
				
		if(isGasLighterTurnedOn && isGasHoleClosed){
			$("#lighter").addClass('settled');			
			$("#lighter").css('left',$("#lighter").data().left );
			$("#lighter").css('top',$("#lighter").data().top );
			$("#lighter").css({
				pointerEvents: 'auto',
				cursor: ''
			});
			
			lighterAnimation.gotoAndStop(0);
			lighterAnimation.visible = false;
			var hideDelay;
			clearTimeout(hideDelay);
			hideDelay = setTimeout(function(){
				clearTimeout(hideDelay);
				lighterAnimation.gotoAndStop(0);
				lighterAnimation.visible = false;
			},500)
			
			if(!isAirHoleClosed){
				blueFlameAnimation.gotoAndStop(0);
				blueFlameAnimation.visible = false;
				
				yellowFlameAnimation.visible = true;
				yellowFlameAnimation.gotoAndPlay(0);
				
				isFlameStarted = true;
				
				if(isBeakerCorrectlyPlaced && !isAnimationRunning){
					isAnimationRunning = true;
					curFrameRate = 24;
					beakerAnimation1.gotoAndPlay("forward");
				}
				
				console.log('stopping');
				curAudio.pause();
				curAudio.currentTime = 0;
				
				//console.log("YELLOW ANIMATION");
			}else{
				yellowFlameAnimation.gotoAndStop(0);
				yellowFlameAnimation.visible = false;
				
				blueFlameAnimation.visible = true;
				blueFlameAnimation.gotoAndPlay(0);
				
				curAudio.pause();
				curAudio.currentTime = 0;
				console.log('starting');
				playAudio("audio/BunsenBurner_BlueFlame_SFX.mp3");
							
				
				isFlameStarted = true;
				
				
				
				if(isBeakerCorrectlyPlaced && !isAnimationRunning){
					isAnimationRunning = true;
					curFrameRate = 48;
					beakerAnimation1.gotoAndPlay("fastforward");
				}
				
				//console.log("BLUE ANIMATION");
			}
		}else{
			isFlameStarted = false;		
			isAnimationRunning = false;
			//if( !$('#lighter').hasClass('settled') ) isGasLighterTurnedOn = false;
			blueFlameAnimation.visible = false;
			yellowFlameAnimation.visible = false;

			beakerAnimation1.gotoAndStop(0);
			blueFlameAnimation.gotoAndStop(0);
			yellowFlameAnimation.gotoAndStop(0);
			console.log('stopp');
			curAudio.pause();
			curAudio.currentTime = 0;
		}
	}
	
	
	this.initAnimations = function(){
		// 1

		beakerStage1 = new createjs.Stage( document.getElementById('beakerCanvas1') );
		
		beakerStageSprite1 = new createjs.SpriteSheet({
				"framerate" : 24,
				"images" : [
					"images/sim3/Beaker_BoilingWater.png"
				],
				"frames": {"regX": 0, "height": 250, "count": 422, "regY": 0, "width": 150},
				"animations": {
					"forward" : [0, (421), false],
					"fastforward" : [130,421,false],
					"smoke" : [300,421,true],
				}
		});

		
		beakerAnimation1 = new createjs.Sprite(beakerStageSprite1, "forward");
		beakerAnimation1.x = 0;
		beakerAnimation1.y = 0;
		
		beakerStage1.addChild(beakerAnimation1);
				
		beakerAnimation1.gotoAndStop(0);
		
		//beakerAnimation1.gotoAndPlay(0);
		
		createjs.Ticker.removeEventListener("tick", beakerStage1);	
		createjs.Ticker.addEventListener("tick", beakerStage1);	
		
		createjs.Ticker.removeEventListener("tick", _this.handleBeakerTicker);	
		createjs.Ticker.addEventListener("tick", _this.handleBeakerTicker);	
				
		// 2

		flameStage = new createjs.Stage( document.getElementById('flameCanvas') );
		
		blueFlameSprite = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					"images/sim3/BlueFlame03.png"
				],
				"frames": {"regX": 0, "height": 70, "count": 151, "regY": 0, "width": 24},
				"animations": {
					"forward" : [0, (150), true]
				}
		});
		
		
		yellowFlameSprite = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					"images/sim3/RedFlame02.png"
				],
				"frames": {"regX": 0, "height": 70, "count": 151, "regY": 0, "width": 35},
				"animations": {
					"forward" : [0, (150), true]
				}
		});
		
		blueFlameAnimation = new createjs.Sprite(blueFlameSprite, "forward");
		blueFlameAnimation.x = 5;
		blueFlameAnimation.y = 0;
		
		yellowFlameAnimation = new createjs.Sprite(yellowFlameSprite, "forward");
		yellowFlameAnimation.x = 0;
		yellowFlameAnimation.y = 0;
				
		flameStage.addChild(yellowFlameAnimation);
		flameStage.addChild(blueFlameAnimation);
		
		yellowFlameAnimation.visible = false;
		blueFlameAnimation.visible = false;
		
		yellowFlameAnimation.gotoAndStop(0);
		blueFlameAnimation.gotoAndStop(0);
		
		createjs.Ticker.removeEventListener("tick", flameStage);	
		createjs.Ticker.addEventListener("tick", flameStage);	
		
		// 3
		
		lighterStage = new createjs.Stage( document.getElementById('lighterCanvas') );
		
		lighterStageSprite1 = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					"images/sim3/lighter_flame_03.png"
				],
				"frames": {"regX": 0, "height": 70, "count": 151, "regY": 0, "width": 24},
				"animations": {
					"forward" : [0, (150), true]
				}
		});

		
		lighterAnimation = new createjs.Sprite(lighterStageSprite1, "forward");
		lighterAnimation.x = 0;
		lighterAnimation.y = 0;
		
		lighterStage.addChild(lighterAnimation);
				
		lighterAnimation.gotoAndStop(0);
		lighterAnimation.visible = false;
		
		//beakerAnimation1.gotoAndPlay(0);
		
		createjs.Ticker.removeEventListener("tick", lighterStage);	
		createjs.Ticker.addEventListener("tick", lighterStage);	
		
	}
	
	this.handleBeakerTicker = function(){
		//console.log( beakerAnimation.currentFrame )
		if( beakerAnimation1.currentFrame == 418 || beakerAnimation1.currentFrame == 419 || beakerAnimation1.currentFrame == 420){
			//beakerAnimation1.gotoAndStop(421);
			//yellowFlameAnimation.gotoAndStop(0);
			//blueFlameAnimation.gotoAndStop(0);	
			console.log('astop;l');			
			//curAudio.pause();
			//curAudio.currentTime = 0;
			
			beakerAnimation1.gotoAndPlay("smoke");
			
			$('.success_message').text('The water is boiled!');
			if(!isActivityCompleted){
				isActivityCompleted = true;
				$("#myModal").fadeIn();
			}
		}
	}
	
	this.removeListeners = function(){
		console.log('Mode3 clear listeners');
		
		createjs.Ticker.removeEventListener("tick", _this.beakerStage);	
		createjs.Ticker.removeEventListener("tick", _this.handleBeakerTicker);	
		
		createjs.Ticker.removeEventListener("tick", flameStage);

		flameStage = null;
		beakerStage1 = null;
	}
	
	_this.init();
}