var Mode1 = function(){
	var _this = this;
	var marginLeft = 0;
	var marginTop = 0;
	var isInsideBoundingBox1 = false;
	var isInsideBoundingBox2 = false;
	var isFillerMouseDown = false;
	var diffX = 0;
	var diffY = 0;
	var isLeftLocked = false;
	var isRightLocked = false;
	var isBeakerDropArea = false;
	var isBottleDropArea = false;
	var fillerObj = {filled : false,curAttempt:0,totalAttempts:0};
	var bottleObj = {};
	var beakerObj = {};
	
	var fillerStage;
	var fillerAnimation1;
	var fillerAnimation2;
	var fillerSpriteSheet;
	
	var bottleStage;
	var bottleAnimation;
	var bottleSpriteSheet;
	
	var beakerStage;
	var beakerAnimation;
	var beakerSpriteSheet;
	
	var randomFillValues = [30,40,50,60];
	
	var isSqueezed = false;
	
	var isAnimationRunning = false;
	var isMouseCapDown = false;
	var isCapOpened = false;
	
	var bottleTopOffset = 250;
	
	var collision_1 = false;
	var collision_2 = false;
	var collision_3 = false;
	var isARDrag_1 = false;
	var isARDrag_2 = false;
	var isARDrag_3 = false;
	
	var fillerLeft = 0;
	var fillerTop = 0;
	
	var refCanvas;
	var refCanvasContext;
	
	var isLesserResolution = false;
	
	this.init = function(){
		//console.log('MODE 1 CALLED');	
		
		//if( ( screen.height>=720 && screen.height<= 864 ) && !isIPAD && !isAndroid ) {
		
		var res1 = ( screen.width==1280 && screen.height== 800 )
		var res2 = ( (screen.width==1360 || screen.width==1366) && screen.height== 768 )
		var res3 = ( (screen.width==1280) && screen.height== 768 )
		var res4 = ( (screen.width==1280) && screen.height== 720 )
		var res5 = ( (screen.width==1024) && screen.height== 768 )
		var res6 = ( (screen.width==1152) && screen.height== 864 )
		
		if( ( res1 || res2 || res3  || res4 || res5 || res6 ) && !isIPAD && !isAndroid ) {
			isLesserResolution = true;	
			$('.sm1_beaker, .sm1_dropper').css('top','370px');
		}else{
			isLesserResolution = false;
		}
		
		if(isLesserResolution){
			var htmlStr = 	'<canvas id="refCanvas" width="1024" height="768"></canvas>\
						<div style="z-index:1" id="bottle" class="sm1_bottle layer1"></div>\
						<div id="bottleCap" style="z-index:4;border:0px solid red;" class="sm1_bottle_cap"></div>\
						<div style="z-index:2;border:0px solid red;" class="sm1_bottle layer2">\
							<canvas id="bottleCanvas" width="130" height="262"></canvas>\
						</div>\
						<div style="z-index:1" id="beaker" class="sm1_beaker layer1"></div>\
						<div  style="z-index:2;border:0px solid red;" class="sm1_beaker layer2">\
							<canvas id="beakerCanvas" width="140" height="201"></canvas>\
						</div>\
						<div style="border:0px solid red;" id="filler" class="sm1_dropper">\
							<canvas id="fillerCanvas" width="49" height="196"></canvas>\
						</div>'			
		}else{
			var htmlStr = 	'<canvas id="refCanvas" width="1024" height="768"></canvas>\
						<div style="z-index:1" id="bottle" class="sm1_bottle layer1"></div>\
						<div id="bottleCap" style="z-index:4;border:0px solid red;" class="sm1_bottle_cap"></div>\
						<div style="z-index:2;border:0px solid red;" class="sm1_bottle layer2">\
							<canvas id="bottleCanvas" width="200" height="410"></canvas>\
						</div>\
						<div style="z-index:1" id="beaker" class="sm1_beaker layer1"></div>\
						<div  style="z-index:2;border:0px solid red;" class="sm1_beaker layer2">\
							<canvas id="beakerCanvas" width="187" height="270"></canvas>\
						</div>\
						<div style="border:0px solid red;" id="filler" class="sm1_dropper">\
							<canvas id="fillerCanvas" width="65" height="262"></canvas>\
						</div>'
		}
		
		$(".similuation_one").hide();
		$(".similuation_one:eq(0)").html(htmlStr).show();
		
		
		if( ( res1 || res2 || res3 || res4  || res5  || res6 ) && !isIPAD && !isAndroid ) {
			//alert('if');
			$('.sm1_beaker, .sm1_dropper').css('top','370px');
			
			$('.sm1_bottle_cap').addClass('CapClass');
			if(res4) {
				$('.sm1_beaker, .sm1_dropper').css('top','330px');
				$('.sm1_bottle_cap').css('top','255px')
				$('.similuation_one .sm1_bottle').css('top','265px')
			}else if(res5) {
				//$('.sm1_beaker, .sm1_dropper').css('top','330px');
				$('.sm1_bottle_cap').css('top','295px')
				$('.similuation_one .sm1_bottle').css('top','305px')
			}
			
		}else {
			if(isAndroid) {
				if(window.innerWidth > window.innerHeight) {
					$('.similuation_one .sm1_bottle').css('top','285px');
					$('.similuation_one .sm1_beaker, .similuation_one .sm1_dropper').css('top','340px');
					$('.sm1_bottle_cap').css({
						left: '79px',
						top: '275px',
						backgroundSize: '100% 100%',
						width:"80px",
						height:"74px"
					});
				}
			}
			
		
		} 
		
		
		if(isIPAD){
			if(window.innerWidth > window.innerHeight){
				$("#bottleCap").css({left:"80px",top:"260px",width:"80px",height:"74px", border:"0px solid red"});
			}else{
				$("#bottleCap").css({left:"80px",top:"382px",width:"80px",height:"74px", border:"0px solid red",backgroundSize:"100% 100%"});
			}
		}
		
		/* if(isAndroid){
			$("#bottleCap").css({left:"80px",top:"260px",width:"80px",height:"74px", border:"0px solid red"});
		} */
		
		refCanvas = document.getElementById("refCanvas");
		refCanvasContext = refCanvas.getContext('2d');
		
		$("#filler").data('left',$("#filler").position().left);
		$("#filler").data('top',$("#filler").position().top);
		
		$("#filler").css({cursor:'pointer'});
		
		$("#bottleCap").data('left',$("#bottleCap").position().left);
		$("#bottleCap").data('top',$("#bottleCap").position().top);
		
		//var curIndex = Math.random()*randomFillValues.length;
		
		var curIndex =  Math.round( Math.random() * (randomFillValues.length-1) );
		
		//console.log(curIndex);
		
		var curRandomValue = randomFillValues[curIndex];
		
		$(".mode_instruction").html('Transfer '+curRandomValue+' cm<sup>3</sup> of solution to the beaker.').show();
		
		//var curRandomValue = 60;
		
		//alert( curRandomValue  );
		
		$(".randomValue").html(curRandomValue);
		
		fillerObj.totalAttempts =  ( curRandomValue /  10 ) ;
		
		console.log( fillerObj.totalAttempts );
		
		marginLeft = ( $("#parentContainer").width() - $("#mode1").width() ) / 2;
		marginTop = ( $("#parentContainer").height() - $("#mode1").height() ) / 2;
		//console.log( (marginLeft/2) )
		
		if(isIPAD || isAndroid){
			$("#filler").on('touchstart',_this.onFillerMouseDown);
			$("#bottleCap").on('touchstart',_this.onCapMouseDown);
			$("#mode1").on('touchmove',_this.onMouseMove);
			$("#mode1").on('touchend',_this.onMouseUp);		
		}else{
			$("#filler").on('mousedown',_this.onFillerMouseDown);
			$("#bottleCap").on('mousedown',_this.onCapMouseDown);
			//$("#mode1").on('mousemove',_this.onMouseMove);
			$(document).on('mousemove',_this.onMouseMove);
			//$("#mode1").on('mouseup',_this.onMouseUp);	
			$(document).on('mouseup',_this.onMouseUp);	
		}
		
		$(window).on('resize',_this.onWindowResize);
		
		_this.initAnimations();
	}
	
	
	this.onWindowResize = function(){
		marginLeft = ( $("#parentContainer").width() - $("#mode1").width() ) / 2;
		marginTop = ( $("#parentContainer").height() - $("#mode1").height() ) / 2;	
	}
	
	this.arModeFunction1 = function() {
		isARDrag_1 = isARDrag_2 = isARDrag_3 = false;
	}
	
	
	this.arModeFunction = function() {
		collision_1 = false;
		collision_2 = false;
		collision_3 = false;
		
		if(collision( $("#traceDiv"), $("#filler"))) {
			//console.log('colliding-1');
			$('#currDivs').text('colliding-1');
			collision_1 = true;
			
			if(!isAnimationRunning && !fillerObj.filled && !isSqueezed){
				console.log("SQUEEZE");
				fillerAnimation2.visible = false;
				fillerAnimation1.visible = true;
				fillerAnimation1.gotoAndPlay('initial');
			}
			
		}
		if(collision( $("#traceDiv"), $("#bottle"))) {
			//console.log('colliding-2');
			$('#currDivs').text('colliding-2');
			collision_2 = true;
		} 
		if(collision( $("#traceDiv"), $("#beaker"))) {
			//console.log('colliding-3');
			$('#currDivs').text('colliding-3');
			collision_3 = true;
		}
	
		//console.log('ar mode..!');
		switch(step) {
			
			case 1:
				//console.log("step 1...!");
				if( isAnimationRunning ) return;
				
				//console.log("isCapOpened = ",isCapOpened);
				
				if(!isCapOpened) {
					if(collision_2) {
						isCapOpened = true;
						/*$('#bottleCap').animate({ left: '205px'},700,function(){
							$('#bottleCap').animate({ left: '235px', top: '495px'},1500);
						});*/
						var ang=0,topp=0,leftt=0;
						if(isLesserResolution) {
							$('#bottleCap').animate({ top: '220px'},700,function(){
								$("#bottleCap").animate({deg: 180,top:"470px",left: '218px'},{
									  duration: 1500,
									  step: function(now, fx){	
									  if(fx.prop=="deg") {
										ang = now;
									  } else if(fx.prop=="top") {
										topp = now;
									  } else if(fx.prop=="left") {
										leftt = now;
									  }
										$(this).css({"transform": "rotate("+ang+"deg)",top:topp+"px",left:leftt+"px"});
									  },
									  complete: function() {
									  }
								}); 
							});
						} else {
							
							var animVal = 582;
							if(isIPAD||isAndroid) {
								animVal = 495;
							} 
						
						
							$('#bottleCap').animate({ top: '185px'},700,function(){
							$("#bottleCap").animate({deg: 180,top:animVal+"px",left: '235px'},{
									  duration: 1500,
									  step: function(now, fx){	
									  if(fx.prop=="deg") {
										ang = now;
									  } else if(fx.prop=="top") {
										topp = now;
									  } else if(fx.prop=="left") {
										leftt = now;
									  }
										$(this).css({"transform": "rotate("+ang+"deg)",top:topp+"px",left:leftt+"px"});
									  },
									  complete: function() {
									  }
								}); 
							});
						}
					
					
						
					} 
					return;
				}
				
				this.fillerDrags();
				
				if(collision_1 && collision_2) {
					//console.log('bottle and filler');
					
					curBottleID = "bottle";
					curFillerID = "filler";
					
					
					if(isLesserResolution){
						var fixedLeft =  $("#"+curBottleID).position().left	+ 40;
					}else{
						var fixedLeft =  $("#"+curBottleID).position().left	+ 65;
					}
					var fixedTop = $("#"+curBottleID).position().top - 63; 	
					$("#"+curFillerID).css('left',fixedLeft+"px");
					$("#"+curFillerID).css('top',fixedTop+"px");
					$('#filler').addClass('fillingLiq');
					if(!fillerObj.filled && (fillerObj.curAttempt < fillerObj.totalAttempts) ){
						fillerAnimation2.visible = false;
						fillerAnimation1.visible = true;
						fillerAnimation1.gotoAndPlay("forward");
						//console.log( fillerObj.curAttempt );
						bottleAnimation.gotoAndPlay("step"+fillerObj.curAttempt);
						isAnimationRunning = true;
						
					}
					
					isInsideBoundingBox1 = true;			
					
				}
				
				//if(fillerObj.filled) step = 2;
				
				break;
			case 2:
				//console.log("step 2...!");
				if( isAnimationRunning ) return;
				this.fillerDrags();
				if(collision_1 && collision_3) {
					var fixedTop =  $("#beaker").position().top	- 63; 	
					if(isLesserResolution){
						var fixedLeft =  $("#beaker").position().left + 50;
					}else{
						var fixedLeft =  $("#beaker").position().left + 65;
					}
					
					
					$("#"+curFillerID).css('left',fixedLeft+"px");
					$("#"+curFillerID).css('top',fixedTop+"px");
					$('#filler').addClass('fillingLiq');
					if(fillerObj.filled && (fillerObj.curAttempt < fillerObj.totalAttempts) ){
						fillerAnimation1.visible = false;
						fillerAnimation2.visible = true;
						fillerAnimation2.gotoAndPlay("reverse");
						beakerAnimation.gotoAndPlay("step"+fillerObj.curAttempt);
						isAnimationRunning = true;
					} else {
						//step = 3;
					}
					
					isInsideBoundingBox1 = true;
					
				}
				
				break;
			
		
		
		}
	
	}
	
	this.fillerDrags = function() {
		marginLeft = ( $("#parentContainer").width() - $("#mode1").width() ) / 2;
		marginTop = ( $("#parentContainer").height() - $("#mode1").height() ) / 2;
		
		//if( parseInt( $("#traceDiv").css("top") )- marginTop > window.innerHeight-parseInt( $("#filler").css("height") ) || parseInt( $("#traceDiv").css("top") )- marginTop < 20 || parseInt( $("#traceDiv").css("left") )- marginLeft > window.innerWidth-parseInt( $("#filler").css("width") ) || parseInt( $("#traceDiv").css("left") )- marginTop < 20 ) {return;}
		
			var xMin = 0; 
			var xMax = $(window).width();
			
			var yMin = 0;
			var yMax = $(window).height();
			
			var curLeft = $("#traceDiv").position().left;
			var curRight = $("#traceDiv").position().left + $("#traceDiv").width();
			
			var curTop = $("#traceDiv").position().top;
			var curBottom = $("#traceDiv").position().top + $("#traceDiv").height();
			
			if( ( xMin < curLeft ) && ( xMax > curRight ) && ( yMin < curTop ) && (yMax > curBottom )  ){
			
			}else{
				return;
			}
			
		
		if(collision_1) {
			$("#filler").css({
				left: parseInt( $("#traceDiv").css("left") )-marginLeft+"px",
				top: parseInt( $("#traceDiv").css("top") )-marginTop+"px"
			});
			
			$('#mousePosDiv').text( parseInt( $("#traceDiv").css("left") )+" "+parseInt( $("#traceDiv").css("top") ) + " "+parseInt( $("#filler").css("left") )+" "+parseInt( $("#filler").css("top") ) + " ");
		}
	}
	
	this.onFillerMouseDown = function(e){
		
		//$("#mousePosDiv").html("onFillerMouseDown: "+e.originalEvent.touches[0].pageX);
		
		e.preventDefault();
		
		e.stopPropagation();

		var touch = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0];
		e = touch || e;
	
		$("#mousePosDiv").html("onFillerMouseDown: "+e.pageX);
		
		isFillerMouseDown = true;	
		
		$("#mousePosDiv").html(e.pageX+" "+e.pageY);
		
		diffX = Math.abs( e.pageX - $("#filler").position().left);
		diffY = Math.abs( e.pageY - $("#filler").position().top);
		
		//console.log( fillerObj.filled );
		
		if(!isAnimationRunning && !fillerObj.filled && !isSqueezed){
			fillerAnimation2.visible = false;
			fillerAnimation1.visible = true;
			fillerAnimation1.gotoAndPlay('initial');
		}
	}
	
	
	this.onCapMouseDown = function(e){
		e.preventDefault();
		
		e.stopPropagation();

		var touch = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0];
		e = touch || e;
	
		//$("#mousePosDiv").html("onFillerMouseDown: "+e.pageX);
		
		isMouseCapDown = true;	
		
		//$("#mousePosDiv").html(e.pageX+" "+e.pageY);
		
		diffX = Math.abs( e.pageX - $("#bottleCap").position().left);
		diffY = Math.abs( e.pageY - $("#bottleCap").position().top);
		
		
	}
	
	/* this.onMouseLeave = function(){
		
		if(!isAnimationRunning){
			$("#filler").css('left', $("#filler").data('left') );
			$("#filler").css('top', $("#filler").data('top') );
			$("#filler").css('z-index','3');
			fillerAnimation2.visible = false;
			fillerAnimation1.visible = true;
			if(!fillerObj.filled){
				isAnimationRunning = false;
				fillerAnimation1.gotoAndStop(0);
				fillerObj.filled = false;
				isSqueezed = false;
			}	
		}
		
		isFillerMouseDown = false;	
		isLeftLocked = false;
		isRightLocked = false;	
		
		isBottleDropArea = false;
		isBeakerDropArea = false;
		
		isMouseCapDown = false;	
	} */
	
	this.onMouseMove = function(e){
		
		e.preventDefault();
		
		e.stopPropagation();

		var touch = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0];
		e = touch || e;
		
		mouseX = e.pageX  - diffX;
		mouseY = e.pageY - diffY;
		
		//console.log(mouseY);
		
		// Block top position of filler
		
		if( (mouseY <= 0) &&  isFillerMouseDown){
			$("#filler").css('left',mouseX+"px");
			//$("#filler").css('top',"0px");		
			return;
		}
		
		// END
		
		// Block L , R , B of filler in Beaker
		
		var dragLeft = mouseX;
		var fillerWidth = $("#fillerCanvas").width();
		var dragRight = $("#filler").position().left + $("#fillerCanvas").width() ;
					
		var dragTop = $("#filler").position().top;
		var dragBottom = $("#filler").position().top + $("#fillerCanvas").height();
				
		var beakerLeft = $("#beaker").position().left - 30;
		var beakerRight = $("#beaker").position().left +  $("#beakerCanvas").width() - 20;
				
		var beakerTop = $("#beaker").position().top + 50; 
		var beakerBottom = $("#beaker").position().top + $("#beakerCanvas").height() + 0;
				
		var condition11 =  (beakerLeft <  dragLeft );
		var condition21 =  (beakerRight > dragLeft );
		var condition31 =  (beakerBottom > dragTop);
		var condition41 =  (beakerTop < dragTop);		
		
		var condition51 =  (beakerBottom > dragBottom);
		var condition61 =  (beakerTop < dragBottom);	
		
		//console.log(condition11+" "+condition21+" "+condition31+" "+condition41+" "+condition51+" "+condition61);
		
		//console.log(beakerLeft+" "+beakerRight+" "+dragLeft)
		
		//console.log(condition31+" "+condition41);
		//console.log(condition51+" "+condition61);
		//console.log(beakerTop+" "+beakerBottom+" "+dragTop);
		
		//console.log(isInsideBoundingBox1);	
		
		var isTopInsideBoundary = ( condition31 && condition41);
		var isBottomInsideBoundary = ( condition51 && condition61);
		
		//console.log("isTopInsideBoundary: "+isTopInsideBoundary+" isBottomInsideBoundary: "+isBottomInsideBoundary);
		
		/*refCanvasContext.clearRect(0,0,refCanvas.width,refCanvas.height);
		refCanvasContext.moveTo(beakerLeft,beakerTop);
		refCanvasContext.lineTo(beakerRight,beakerTop);
		refCanvasContext.lineTo(beakerRight,beakerBottom);
		refCanvasContext.lineTo(beakerLeft,beakerBottom);
		refCanvasContext.lineTo(beakerLeft,beakerTop);
		refCanvasContext.stroke();*/

		
		if( ( condition11 && condition21 ) && ( isTopInsideBoundary || isBottomInsideBoundary ) && isFillerMouseDown && !isInsideBoundingBox1 ){
			return;
		}else{
			
		}
		
		
		// END
		
		
		var dragLeft = mouseX;
		var fillerWidth = $("#fillerCanvas").width();
		var dragRight = $("#filler").position().left + $("#fillerCanvas").width() ;
					
		var dragTop = $("#filler").position().top;
		var dragBottom = $("#filler").position().top + $("#fillerCanvas").height();
				
		var beakerLeft = $("#bottle").position().left - 30;
		var beakerRight = $("#bottle").position().left +  $("#bottleCanvas").width() - 20;
				
		if(isIPAD || isAndroid){
			var beakerTop = $("#bottle").position().top + 100; 
		}else{
			var beakerTop = $("#bottle").position().top + 50; 
		}
		
		
		var beakerBottom = $("#bottle").position().top + $("#bottleCanvas").height();
				
		var condition11 =  (beakerLeft <  dragLeft );
		var condition21 =  (beakerRight > dragLeft );
		var condition31 =  (beakerBottom > dragTop);
		var condition41 =  (beakerTop < dragTop);		
		
		var condition51 =  (beakerBottom > dragBottom);
		var condition61 =  (beakerTop < dragBottom);	
		
		var isTopInsideBoundary = ( condition31 && condition41);
		var isBottomInsideBoundary = ( condition51 && condition61);
		
		
		/*refCanvasContext.clearRect(0,0,refCanvas.width,refCanvas.height);
		refCanvasContext.moveTo(beakerLeft,beakerTop);
		refCanvasContext.lineTo(beakerRight,beakerTop);
		refCanvasContext.lineTo(beakerRight,beakerBottom);
		refCanvasContext.lineTo(beakerLeft,beakerBottom);
		refCanvasContext.lineTo(beakerLeft,beakerTop);
		refCanvasContext.stroke();*/
		
		//console.clear();
		//console.log(condition11+" "+condition21+" "+condition31+" "+condition41+" "+condition51+" "+condition61);
		
		//console.log(beakerLeft+" "+beakerRight+" "+dragLeft)
		
		//console.log(beakerTop+" "+beakerBottom+" "+dragBottom)
		
		if( ( condition11 && condition21 ) && ( isTopInsideBoundary || isBottomInsideBoundary ) && isFillerMouseDown && !isInsideBoundingBox1 ){
			return;
		}else{
			
		}
		
		
		
		if(isFillerMouseDown && !isAnimationRunning){
			if(!isLeftLocked){			
				$("#filler").css('left',mouseX+"px");
			}
			
			if(!isRightLocked){
				$("#filler").css('top',mouseY+"px");		
			}
			
			//$("#filler").css('z-index','3');
			
			if(!isBeakerDropArea){
				curFillerID = "filler";
				
				//console.log("isBottleDropArea");
				
				var dragLeft = $("#filler").offset().left;
				var dragRight = $("#filler").offset().left + $("#fillerCanvas").width();
					
				var dragTop = $("#filler").offset().top;
				var dragBottom = $("#filler").offset().top + $("#fillerCanvas").height();
				
				var bottleLeft = $("#bottle").offset().left;
				var bottleRight = $("#bottle").offset().left + $("#bottleCanvas").width();
				var bottleTop;
				
				/* if(isIPAD || isAndroid){
					bottleTop = $("#bottle").offset().top + 30; 
				} else {
					bottleTop = $("#bottle").offset().top + 30; 
				} */
				
				bottleTop = $("#bottle").offset().top + 30; 
				
				//bottleTop = $("#bottle").offset().top + 130; 
				var bottleBottom = $("#bottle").offset().top + $("#bottleCanvas").height();
				
				var condition11 =  (bottleLeft < dragLeft);
				var condition21 =  (bottleRight > dragRight);
				var condition31 =  (bottleBottom > dragBottom) ;
				var condition41 =  (bottleTop < dragBottom) ;
				
				//console.log(condition11+" "+condition21+" "+condition31+" "+condition41);

				if(condition11 && condition21 && condition31 && condition41){
					isLeftLocked = true;	
					
					isBottleDropArea = true;
					isBeakerDropArea = false;
					
					var fixedTop =   $("#bottle").position().top; 	
					var fixedLeft =  $("#bottle").position().left;
					
					var newTop =  $("#bottle").position().top - bottleTopOffset; 	
					
					if(newTop > mouseY){
						isRightLocked = false;
					}else{
						isRightLocked = true;
					}
					
					isInsideBoundingBox1 = true;
					
				}else{
					isLeftLocked = false;
					isRightLocked = false;
					
					isBottleDropArea = false;
					isBeakerDropArea = false;
					
					isInsideBoundingBox1 = false;
					
					//console.log("ELSE");
				}
			}else{
				isBottleDropArea = false;
				isBeakerDropArea = false;	
				
				//console.log("IN3");
				
				//$("#filler").css('z-index','3');
			}
			
			if(!isBottleDropArea){
				
				curFillerID = "filler";
				
				//console.log("isBottleDropArea");
				
				var dragLeft = $("#filler").offset().left;
				var dragRight = $("#filler").offset().left + $("#fillerCanvas").width();
					
				var dragTop = $("#filler").offset().top;
				var dragBottom = $("#filler").offset().top + $("#fillerCanvas").height();
				
				var bottleLeft = $("#beaker").offset().left;
				var bottleRight = $("#beaker").offset().left + $("#beakerCanvas").width();
				
				var bottleTop = $("#beaker").offset().top + 30; 
				var bottleBottom = $("#beaker").offset().top + $("#beakerCanvas").height();
				
				var condition11 =  (bottleLeft < dragLeft);
				var condition21 =  (bottleRight > dragRight);
				var condition31 =  (bottleBottom > dragBottom) ;
				var condition41 =  (bottleTop < dragBottom) ;
				
				//console.log(condition11+" "+condition21+" "+condition31+" "+condition41);
				
				//$("#filler").css('z-index','1');
				
				if(condition11 && condition21 && condition31 && condition41){
					isLeftLocked = true;	
					
					isBottleDropArea = true;
					isBeakerDropArea = false;
					
					var fixedTop =   $("#beaker").position().top; 	
					var fixedLeft =  $("#beaker").position().left;
					
					var newTop =  $("#beaker").position().top - 50; 	
					
					//console.log(newTop+" "+mouseY)
					
					$("#filler").css('z-index','1');
					
					if(newTop > mouseY){
						isRightLocked = false;
					}else{
						isRightLocked = true;
						//$("#filler").css('left',$("#filler").data('left')+"px");
						//$("#filler").css('top',$("#filler").data('top')+"px");
						
						//$("#filler").css('left',(fixedLeft)+"px");
						//$("#filler").css('top',(fixedTop)+"px");
						
						var fixedTop =  $("#beaker").position().top	- 63; 	
						var fixedLeft =  $("#beaker").position().left + 65;
						
						$("#"+curFillerID).css('left',fixedLeft+"px");
						$("#"+curFillerID).css('top',fixedTop+"px");
					}
					
					isInsideBoundingBox1 = true;
					
				}else{
					isLeftLocked = false;
					isRightLocked = false;
					
					isBottleDropArea = false;
					isBeakerDropArea = false;
					
					isInsideBoundingBox1 = false;
					
					//console.log("ELSE");
				}
			}else{
				isBottleDropArea = false;
				isBeakerDropArea = false;	
				
				//$("#filler").css('z-index','3');
			}
			
		}else if(isMouseCapDown){
				if(!isLeftLocked){			
					$("#bottleCap").css('left',mouseX+"px");
				}
			
				if(!isRightLocked){
					$("#bottleCap").css('top',mouseY+"px");		
				}

				curFillerID = "filler";
				
				//console.log("isBottleDropArea");
				
				var dragLeft = $("#bottleCap").offset().left;
				var dragRight = $("#bottleCap").offset().left + $("#bottleCap").width();
					
				var dragTop = $("#bottleCap").offset().top;
				var dragBottom = $("#bottleCap").offset().top + $("#bottleCap").height();
				
				var bottleLeft = $("#bottle").offset().left;
				var bottleRight = $("#bottle").offset().left + $("#bottleCanvas").width();
				var bottleTop;
				
				/* if(isIPAD || isAndroid){
					bottleTop = $("#bottle").offset().top + 30; 
				} else {
					bottleTop = $("#bottle").offset().top + 30; 
				} */
				
				bottleTop = $("#bottle").offset().top + 30; 
				
				var bottleBottom = $("#bottle").offset().top + $("#bottleCanvas").height();
				
				var condition11 =  (bottleLeft < dragLeft);
				var condition21 =  (bottleRight > dragRight);
				var condition31 =  (bottleBottom > dragBottom) ;
				var condition41 =  (bottleTop < dragBottom) ;
				
				//console.log(condition11+" "+condition21+" "+condition31+" "+condition41);
				
				if(condition11 && condition21 && condition31 && condition41){
					isLeftLocked = true;	
					
					isBottleDropArea = true;
					isBeakerDropArea = false;
					
					var fixedTop =   $("#bottle").position().top; 	
					var fixedLeft =  $("#bottle").position().left;
					
					var newTop =  $("#bottle").position().top; 	
										
					/*if(isIPAD || isAndroid){
						newTop = newTop + 70;
					}else{
					
					}*/
					
					//console.log(newTop+" "+mouseY);
										
					if(newTop > mouseY){
						isRightLocked = false;
					}else{
						isRightLocked = true;
					}
				}else{
					isLeftLocked = false;
					isRightLocked = false;
					
					isBottleDropArea = false;
					isBeakerDropArea = false;
					
					//console.log("ELSE");
				}
			
		}
		
		fillerLeft = $("#filler").offset().left;
		fillerTop = $("#filler").offset().top;
	}
	
	this.onMouseUp = function(e){
		e.preventDefault();
		
		e.stopPropagation();
		
		var touch = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0];
		e = touch || e;
		
		if(isAndroid){
			mouseX = e.changedTouches[0].pageX  - diffX;
			mouseY = e.changedTouches[0].pageY - diffY;
		}else{
			mouseX = e.pageX  - diffX;
			mouseY = e.pageY - diffY;

			fillerLeft = $("#filler").offset().left;
			fillerTop = $("#filler").offset().top;
		}
		
		//$("#mousePosDiv").html("mouseX: "+e.changedTouches[0].pageX);
		
		// Bottles
		if(isCapOpened && isFillerMouseDown && !isAnimationRunning){	
			var curFillerID = "filler";
			
			var curBottleID = "bottle";
			
			var dragLeft = fillerLeft;
			var dragRight = fillerLeft + $("#fillerCanvas").width();
			
			var dragTop = fillerTop;
			var dragBottom = fillerTop + $("#fillerCanvas").height();
			
			var bottleLeft = $("#bottle").offset().left;
			var bottleRight = $("#bottle").offset().left + $("#bottleCanvas").width();
			
			var hitAreaBottom = $("#bottle").offset().top + 250; 
			var hitAreaTop = $("#bottle").offset().top - 100;
			
			var condition1 =  (bottleLeft < dragLeft);
			var condition2 =  (bottleRight > dragRight);
			var condition3 =  (hitAreaBottom > dragBottom) ;
			var condition4 =  (hitAreaTop < dragBottom) ;
			
			
			// $("#mousePosDiv").html("marginLeft: "+marginLeft+" mouseX: "+mouseX+" "+$("#filler").offset().left);
			
			// $("#mousePosDiv").html(bottleRight+" > "+dragRight+" "+hitAreaBottom+" > "+dragBottom);
			
			$("#mousePosDiv").html(condition1+" "+condition2+" "+condition3+" "+condition4);
			
			//$("#mousePosDiv").html(isCapOpened+" "+isFillerMouseDown+" "+isAnimationRunning);
			
			//console.log( (hitAreaBottom +" "+dragBottom) );
			
			//console.log(condition1+" "+condition2+" "+condition3+" "+condition4);
			
			// Test tube
			
			var bottleLeft1 = $("#beaker").offset().left;
			var bottleRight1 = $("#beaker").offset().left + $("#beakerCanvas").width();
			
			var hitAreaBottom1 = $("#beaker").offset().top + 250; 
			var hitAreaTop1 = $("#beaker").offset().top - 100;
			
			var condition11 =  (bottleLeft1 < dragLeft);
			var condition21 =  (bottleRight1 > dragRight);
			var condition31 =  (hitAreaBottom1 > dragBottom) ;
			var condition41 =  (hitAreaTop1 < dragBottom) ;
						
			//console.log(condition1+" "+condition2+" "+condition3+" "+condition4);
			//console.log(hitAreaBottom+" "+dragBottom);
						
			if(condition1 && condition2 && condition3 && condition4){
				
				$("#mousePosDiv").html("CONDITION WORKS!!!!!!!!!!!!");
				
				if(isIPAD || isAndroid){
					var fixedTop =  $("#"+curBottleID).position().top - 83; 
					
				}else{
					var fixedTop =  $("#"+curBottleID).position().top - 73; 	
				}
				
				if(isLesserResolution){
					var fixedLeft =  $("#"+curBottleID).position().left	+ 40;
				}else{
					var fixedLeft =  $("#"+curBottleID).position().left	+ 65;
				}
				
				$("#"+curFillerID).css('left',fixedLeft+"px");
				$("#"+curFillerID).css('top',fixedTop+"px");
				$("#filler").css('z-index','1');
				
				if(!fillerObj.filled && (fillerObj.curAttempt < fillerObj.totalAttempts) ){
					fillerAnimation2.visible = false;
					fillerAnimation1.visible = true;
					fillerAnimation1.gotoAndPlay("forward");
					//console.log( fillerObj.curAttempt );
					bottleAnimation.gotoAndPlay("step"+fillerObj.curAttempt);
					isAnimationRunning = true;
				}
				
				isInsideBoundingBox1 = true;
			}else if(condition11 && condition21 && condition31 && condition41){
				var fixedTop =  $("#beaker").position().top	- 63; 	
				var fixedLeft =  $("#beaker").position().left + 65;
				
				if(isLesserResolution){
					var fixedLeft =  $("#beaker").position().left + 50;
				}else{
					var fixedLeft =  $("#beaker").position().left + 65;
				}
				
				$("#"+curFillerID).css('left',fixedLeft+"px");
				$("#"+curFillerID).css('top',fixedTop+"px");
				$("#filler").css('z-index','1');
				
				if(fillerObj.filled && (fillerObj.curAttempt < fillerObj.totalAttempts) ){
					fillerAnimation1.visible = false;
					fillerAnimation2.visible = true;
					fillerAnimation2.gotoAndPlay("reverse");
					beakerAnimation.gotoAndPlay("step"+fillerObj.curAttempt);
					isAnimationRunning = true;
				}else{
					fillerAnimation2.visible = false;
					fillerAnimation1.visible = true;
					if(!fillerObj.filled){
						fillerAnimation1.gotoAndStop(0);
						isAnimationRunning = false;
						fillerObj.filled = false;
						isSqueezed = false;
					}	
				}
				
				isInsideBoundingBox1 = true;
			}else{
				if(!isBottleDropArea && !isBeakerDropArea){
					$("#filler").css('left', $("#filler").data('left') );
					$("#filler").css('top', $("#filler").data('top') );
					$("#filler").css('z-index','3');
					isInsideBoundingBox1 = false;
					fillerAnimation2.visible = false;
					fillerAnimation1.visible = true;
					if(!fillerObj.filled){
						fillerAnimation1.gotoAndStop(0);
						isAnimationRunning = false;
						fillerObj.filled = false;
						isSqueezed = false;
					}		
				}
			}
			
		}else if(isMouseCapDown){
				
				var dragLeft = $("#bottleCap").offset().left;
				var dragRight = $("#bottleCap").offset().left + $("#bottleCap").width();
				
				var dragTop = $("#bottleCap").offset().top;
				var dragBottom = $("#bottleCap").offset().top + $("#bottleCap").height();
				
				var bottleLeft = $("#bottle").offset().left;
				var bottleRight = $("#bottle").offset().left + $("#bottleCanvas").width();
				
				var hitAreaBottom = $("#bottle").offset().top + 100; 
				var hitAreaTop = $("#bottle").offset().top - 100;
				
				var condition1 =  (bottleLeft < dragLeft);
				var condition2 =  (bottleRight > dragRight);
				var condition3 =  (hitAreaBottom > dragBottom) ;
				var condition4 =  (hitAreaTop < dragBottom) ;
				
				//console.log("Test............. "+condition1+" "+condition2+" "+condition3+" "+condition4);
				
				if(condition1 && condition2 && condition3 && condition4){
					var fixedTop =  $("#bottle").position().top	- 3; 	
					var fixedLeft =  $("#bottle").position().left	+ 51;
										
					if(isAndroid){
						var fixedTop =  $("#bottle").position().top	- 10; 
						var fixedLeft =  $("#bottle").position().left + 60;
					}else if(isIPAD){
						
						if(window.innerWidth > window.innerHeight){
							//var fixedTop =  $("#bottle").position().top	+ 70;
							var fixedTop =  $("#bottle").position().top	- 10; 
							var fixedLeft =  $("#bottle").position().left + 60;
						}else{
							//var fixedTop =  $("#bottle").position().top	+ 70;
							var fixedTop =  $("#bottle").position().top	- 13; 
							var fixedLeft =  $("#bottle").position().left + 60;
						}
						
					}else if(isLesserResolution){
						var fixedTop =  $("#bottle").position().top	- 10; 
						var fixedLeft =  $("#bottle").position().left + 30;
						//console.log(11);
					}else{
						var fixedTop =  $("#bottle").position().top	- 3; 
					}
					
					$("#bottleCap").css('left',fixedLeft+"px");
					$("#bottleCap").css('top',fixedTop+"px");
					$("#bottleCap").css('transform','rotate(0deg)');
					
					//console.log("111111111 fixedTop: "+fixedTop);
					
				}else if(condition1 && condition2 && condition4){
					var fixedTop =  $("#bottle").position().top	- 3; 	
					var fixedLeft =  $("#bottle").position().left	+ 51;
					
					if(isAndroid){
						var fixedTop =  $("#bottle").position().top	- 10; 
						var fixedLeft =  $("#bottle").position().left + 51;
					}else if(isIPAD){
						if(window.innerWidth > window.innerHeight){
							//var fixedTop =  $("#bottle").position().top	+ 70;
							var fixedTop =  $("#bottle").position().top	- 10; 
							var fixedLeft =  $("#bottle").position().left + 56;
						}else{
							//var fixedTop =  $("#bottle").position().top	+ 70;
							var fixedTop =  $("#bottle").position().top	- 13; 
							var fixedLeft =  $("#bottle").position().left + 60;
						}
					}else if(isLesserResolution){
						var fixedTop =  $("#bottle").position().top	- 10; 
						var fixedLeft =  $("#bottle").position().left + 30;						
						//console.log(22);
					}else{
						var fixedTop =  $("#bottle").position().top	- 3; 
					}
					
					$("#bottleCap").css('left',fixedLeft+"px");
					$("#bottleCap").css('top',fixedTop+"px");
					$("#bottleCap").css('transform','rotate(0deg)');
					
					//console.log("222222222 fixedTop: "+fixedTop);
					
				}else{
					bottleTopOffset = 50;
					$("#bottleCap").css('transform','rotate(180deg)');  //232 505px
					var bottleLeft = $("#bottleCap").data().left + 168;
					
					//if(isAndroid){
					
					if(isIPAD || isAndroid){
						var bottleTop = $("#bottleCap").data().top + 220;
						bottleLeft = $("#bottleCap").data().left + 158;
					}else if(isLesserResolution){
						var bottleTop = $("#bottleCap").data().top + 200;
					}else{
						var bottleTop = $("#bottleCap").data().top + 280;
					}
					
					//console.log(bottleLeft+" "+bottleTop);
					
					$("#bottleCap").css({left:bottleLeft+'px',top:bottleTop+'px'});
					$("#bottleCap").off('mousedown').css({cursor:'default'});
					isCapOpened = true;
				}
				/* if(!isBottleDropArea && !isBeakerDropArea){
					$("#filler").css('left', $("#filler").data('left') );
					$("#filler").css('top', $("#filler").data('top') );
					$("#filler").css('z-index','3');
					fillerAnimation2.visible = false;
					fillerAnimation1.visible = true;
					fillerAnimation1.gotoAndStop(0);
					fillerObj.filled = false;
					isSqueezed = false;
				} */
		}else{
			
			//console.log("-----------------ËLSE--------------");
			
			if(!isAnimationRunning){
				
				$("#filler").css('left', $("#filler").data('left')+"px" );
				$("#filler").css('top', $("#filler").data('top')+"px" );
				$("#filler").css('z-index','3');
				
				fillerAnimation2.visible = false;
				fillerAnimation1.visible = true;
				isInsideBoundingBox1 = false;
				if(!fillerObj.filled){
					isAnimationRunning = false;
					fillerAnimation1.gotoAndStop(0);
					fillerObj.filled = false;
					isSqueezed = false;
				}	
			}
		}

		isFillerMouseDown = false;	
		isLeftLocked = false;
		isRightLocked = false;	
		
		isBottleDropArea = false;
		isBeakerDropArea = false;
		
		isMouseCapDown = false;
		//isInsideBoundingBox1 = false;
		
	}
	
	this.initAnimations = function(){
		
		if(isLesserResolution){
			var fillerWidth = 49;
			var fillerHeight = 196;
			var fillerSuckImagePath = "images/sim1/lower_res/DropperSuck_02.png";
			var fillerFlushImagePath = "images/sim1/lower_res/DropperFlush_02.png";
		}else{
			var fillerWidth = 65;
			var fillerHeight = 262;
			var fillerSuckImagePath = "images/sim1/DropperSuck.png";
			var fillerFlushImagePath = "images/sim1/DropperFlush.png";
		}
		
		// 1
		
		fillerStage = new createjs.Stage( document.getElementById('fillerCanvas') );
		
		fillerSpriteSheet1 = new createjs.SpriteSheet({
				"framerate" : 36,
				"images" : [
					fillerSuckImagePath
				],
				"frames": {"regX": 0, "height": fillerHeight, "count": 60, "regY": 0, "width": fillerWidth},
				"animations": {
					"initial" : [0, (30), false],
					"forward" : [30, (59), false]
				}
		});
		
		
		fillerSpriteSheet2 = new createjs.SpriteSheet({
				"framerate" : 36,
				"images" : [
					fillerFlushImagePath
				],
				"frames": {"regX": 0, "height": fillerHeight, "count": 60, "regY": 0, "width": fillerWidth},
				"animations": {
					"reverse" : [0, (59), false]
				}
		});
		
		fillerAnimation1 = new createjs.Sprite(fillerSpriteSheet1, "forward");
		fillerAnimation1.x = 0;
		fillerAnimation1.y = 0;
			
		
		fillerAnimation2 = new createjs.Sprite(fillerSpriteSheet2, "reverse");
		fillerAnimation2.x = 0;
		fillerAnimation2.y = 0;
		
		/* if( screen.height>=720 && screen.height<= 864) {
			fillerAnimation1.scaleX = 0.75;
			fillerAnimation1.scaleY = 0.75;
			fillerAnimation1.x = 5;
			fillerAnimation1.y = 0;
			fillerAnimation2.scaleX = 0.75;
			fillerAnimation2.scaleY = 0.75;
			fillerAnimation2.x = 5;
			fillerAnimation2.y = 0;
		} */
		
		fillerStage.addChild(fillerAnimation1);
		fillerStage.addChild(fillerAnimation2);
				
		fillerAnimation1.gotoAndStop(0);
		fillerAnimation2.gotoAndStop(0);
		
		fillerAnimation2.visible = false;
		
		createjs.Ticker.removeEventListener("tick", fillerStage);	
		createjs.Ticker.removeEventListener("tick", _this.handleFillerTick);	
		
		createjs.Ticker.addEventListener("tick", fillerStage);	
		createjs.Ticker.addEventListener("tick", _this.handleFillerTick);	
		
		//fillerAnimation1.addEventListener('')
		
		// 2
		
		
		if(isLesserResolution){
			var bottleWidth = 130;
			var bottleHeight = 262;
			var bottleImagePath = "images/sim1/lower_res/BottleDeFill_03.png";
		}else if(isIPAD || isAndroid){
			var bottleWidth = 160;
			var bottleHeight = 322;
			var bottleImagePath = "images/sim1/Bottle_DeFill_device.png";
		}else{
			var bottleWidth = 200;
			var bottleHeight = 403;
			var bottleImagePath = "images/sim1/Bottle_DeFill.png";
		}
		
		bottleStage = new createjs.Stage( document.getElementById('bottleCanvas') );
		
				
		//console.log("imagePath: "+imagePath);
		
		
		bottleSpriteSheet = new createjs.SpriteSheet({
				"framerate" : 36,
				"images" : [
					bottleImagePath
				],
				"frames": {"regX": 0, "height": bottleHeight, "count": 179, "regY": 0, "width": bottleWidth},
				"animations": {
					"step0" : [0, (12), false],
					"step1" : [20, (30), false],
					"step2" : [31, (40), false],
					"step3" : [41, (50), false],
					"step4" : [51, (60), false],
					"step5" : [61, (72), false],
				}
		});
				
		bottleAnimation = new createjs.Sprite(bottleSpriteSheet, "step0");
		
		if(isIPAD || isAndroid){
			bottleAnimation.scaleX = 1;
			bottleAnimation.scaleY = 1;
			bottleAnimation.x = 20;
			bottleAnimation.y = 0;
		}else{
			bottleAnimation.scaleX = 1;
			bottleAnimation.scaleY = 1;
			bottleAnimation.x = 0;
			bottleAnimation.y = 0;
		}
				
				
		bottleStage.addChild(bottleAnimation);
				
		bottleAnimation.gotoAndStop(0);

		createjs.Ticker.removeEventListener("tick", bottleStage);	
		createjs.Ticker.removeEventListener("tick", _this.handleBottleTick);	
		
		createjs.Ticker.addEventListener("tick", bottleStage);	
		createjs.Ticker.addEventListener("tick", _this.handleBottleTick);
		
		
		// 3
		if(isLesserResolution){
			var beakerWidth = 140;
			var beakerHeight = 201;
			var beakerImagePath = "images/sim1/lower_res/BeakerFill_03.png";
		}else{
			var beakerWidth = 187;
			var beakerHeight = 269;
			var beakerImagePath = "images/sim1/BeakerFill_02.png";
		}
		
		beakerStage = new createjs.Stage( document.getElementById('beakerCanvas') );
		
		beakerSpriteSheet = new createjs.SpriteSheet({
				"framerate" : 36,
				"images" : [
					beakerImagePath
				],
				"frames": {"regX": 0, "height": beakerHeight, "count": 179, "regY": 0, "width": beakerWidth},
				"animations": {
					"step0" : [0, (24), false],
					"step1" : [25, (42), false],
					"step2" : [43, (64), false],
					"step3" : [65, (87), false],
					"step4" : [88, (110), false],
					"step5" : [111, (133), false],
				}
		});
				
		beakerAnimation = new createjs.Sprite(beakerSpriteSheet, "step0");
		beakerAnimation.x = 0;
		beakerAnimation.y = 0;
			
		beakerStage.addChild(beakerAnimation);
				
		beakerAnimation.gotoAndStop(0);

		createjs.Ticker.removeEventListener("tick", beakerStage);	
		createjs.Ticker.removeEventListener("tick", _this.handleBeakerTick);	
		
		createjs.Ticker.addEventListener("tick", beakerStage);	
		createjs.Ticker.addEventListener("tick", _this.handleBeakerTick);
				
	}
	
	this.handleFillerTick = function(){
		
		//console.log( fillerAnimation1.currentFrame );
		//console.log( fillerAnimation2.currentFrame );
		
		if(fillerAnimation1.currentFrame == 26 || fillerAnimation1.currentFrame == 27 || fillerAnimation1.currentFrame == 28){
			fillerAnimation1.gotoAndStop(29);	
			isAnimationRunning = false;
			isSqueezed = true;
		}
		
		if(fillerAnimation1.currentFrame == 57 || fillerAnimation1.currentFrame == 58 || fillerAnimation1.currentFrame == 56){
			fillerAnimation1.gotoAndStop(59);
			fillerObj.filled = true;
			$('#filler').removeClass('fillingLiq');
			step = 2;
			isAnimationRunning = false;
			isSqueezed = false;
			//console.log("fillerAnimation1: "+isAnimationRunning );
		}
		
		if(fillerAnimation2.currentFrame == 57 || fillerAnimation2.currentFrame == 58 || fillerAnimation2.currentFrame == 56){
			fillerAnimation2.gotoAndStop(59);
			fillerObj.filled = false;
			isAnimationRunning = false;
			isSqueezed = false;
			step = 1;
			$('#filler').removeClass('fillingLiq');
		}
	}
	
	this.handleBottleTick = function(){
		
	}
	
	this.handleBeakerTick = function(){
		//console.log( beakerAnimation.currentFrame );
		if(beakerAnimation.currentFrame == 24 ){
			//fillerObj.filled = false;
			//beakerAnimation.gotoAndStop(40);
			//console.log(fillerObj.curAttempt);
			fillerObj.curAttempt = 1;
			
			//console.log( fillerObj.curAttempt );
		}
		
		if(beakerAnimation.currentFrame == 42 ){
			//fillerObj.filled = false;
			//beakerAnimation.gotoAndStop(80);
			//console.log(fillerObj.curAttempt);
			fillerObj.curAttempt = 2;
		}
		
		if(beakerAnimation.currentFrame == 64 ){
			//fillerObj.filled = false;
			//beakerAnimation.gotoAndStop(99);
			//console.log(fillerObj.curAttempt);
			fillerObj.curAttempt = 3;
			
			if(fillerObj.totalAttempts == 3){
				beakerAnimation.gotoAndStop(63);
				//fillerAnimation2.gotoAndStop(59);
				//fillerAnimation1.gotoAndStop(59);				
				//$("#myModal").show();
				$("#myModal").fadeIn(600,function(){
					_this.removeListeners();				
				});
				/* _this.removeListeners();
				console.log("cleared");
				console.log(fillerAnimation2.currentFrame);
				fillerAnimation2.gotoAndStop(59);
				fillerAnimation2.visible = false;
				fillerAnimation1.visible = false;
				//_this.removeListeners();
				console.log(fillerAnimation2.currentFrame); */
			}
		}
		
		if(beakerAnimation.currentFrame == 87 ){
			//fillerObj.filled = false;
			//beakerAnimation.gotoAndStop(119);
			//console.log(fillerObj.curAttempt);
			fillerObj.curAttempt = 4;
			
			if(fillerObj.totalAttempts == 4){
				beakerAnimation.gotoAndStop(86);
				//fillerAnimation2.gotoAndStop(59);
				//fillerAnimation1.gotoAndStop(59);		
				//$("#myModal").show();
				$("#myModal").fadeIn(600,function(){
					_this.removeListeners();				
				});
				//_this.removeListeners();
				//fillerAnimation2.gotoAndStop(29);
			}
		}
		
		if(beakerAnimation.currentFrame == 110 ){
			//fillerObj.filled = false;
			//beakerAnimation.gotoAndStop(139);
			//console.log(fillerObj.curAttempt);
			fillerObj.curAttempt = 5;
			
			if(fillerObj.totalAttempts == 5){
				beakerAnimation.gotoAndStop(109);
				//fillerAnimation2.gotoAndStop(59);
				//fillerAnimation1.gotoAndStop(59);		
				//$("#myModal").show();
				$("#myModal").fadeIn(600,function(){
					_this.removeListeners();				
				});
				//_this.removeListeners();
				//fillerAnimation2.gotoAndStop(29);	
			}
		}
		
		if(beakerAnimation.currentFrame == 133 ){
			//fillerObj.filled = false;
			//beakerAnimation.gotoAndStop(139);
			//console.log(fillerObj.curAttempt);
			fillerObj.curAttempt = 6;
			
			if(fillerObj.totalAttempts == 6){
				beakerAnimation.gotoAndStop(132);
				//$("#myModal").show();
				$("#myModal").fadeIn(600,function(){
					_this.removeListeners();				
				});
				//_this.removeListeners();
				//fillerAnimation2.gotoAndStop(29);
			}
		}
	}
	
	
	this.removeListeners = function(){
		//console.log('Mode1 clear listeners');
		
		if(fillerStage != undefined){
			createjs.Ticker.removeEventListener("tick", fillerStage);	
			createjs.Ticker.removeEventListener("tick", _this.handleFillerTick);	
			
			createjs.Ticker.removeEventListener("tick", beakerStage);	
			createjs.Ticker.removeEventListener("tick", _this.handleBeakerTick);	
			
			createjs.Ticker.removeEventListener("tick", bottleStage);	
			createjs.Ticker.removeEventListener("tick", _this.handleBottleTick);
			
			fillerStage = null;
			beakerStage = null;
			bottleStage = null;
			
			if(isIPAD){
				$("#filler").off('touchstart',_this.onFillerMouseDown);
				$("#mode1").off('touchmove',_this.onMouseMove);
				$("#mode1").off('touchend',_this.onMouseUp);		
			}else{
				$("#filler").off('mousedown',_this.onFillerMouseDown);
				$("#mode1").off('mousemove',_this.onMouseMove);
				$("#mode1").off('mouseup',_this.onMouseUp);
				$(document).off('mouseup',_this.onMouseUp);		
			}
			
			$(window).off('resize',_this.onWindowResize);
		}
	}
	
	_this.init();
}