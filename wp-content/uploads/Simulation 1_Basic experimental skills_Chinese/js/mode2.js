var Mode2 = function(){
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
	
	var filler1Obj = {filled : false,curAttempt:0,totalAttempts:0};
	var filler2Obj = {filled : false,curAttempt:0,totalAttempts:0};
	var filler3Obj = {filled : false,curAttempt:0,totalAttempts:0};
	var filler4Obj = {filled : false,curAttempt:0,totalAttempts:0};
	
	var curFillerID = "";
	var isAnimationRunning = false;
	
	var isFiller1Area = false;
	var isTestTubeArea = false;
	
	var filler1Stage;
	var filler1Animation1;
	var filler1Animation2;
	var filler1SpriteSheet;
	
	var filler2Stage;
	var filler2Animation1;
	var filler2Animation2;
	var filler2SpriteSheet;
	
	var filler3Stage;
	var filler3Animation1;
	var filler3Animation2;
	var filler3SpriteSheet;
		
	var filler4Stage;
	var filler4Animation1;
	var filler4Animation2;
	var filler4SpriteSheet;
	
	
	var bottle1Stage;
	var bottle1SpriteSheet;
	var bottle1Animation;
	
	var bottle2Stage;
	var bottle2SpriteSheet;
	var bottle2Animation;
	
	var bottle3Stage;
	var bottle3SpriteSheet;
	var bottle3Animation;
	
	var bottle4Stage;
	var bottle4SpriteSheet;
	var bottle4Animation;
		
	var tube1Stage;
	var tube1SpriteSheet;
	var tube1Animation;
	
	var prevSolution = "";
	var curSolution = "";
	
	var collision_1 = false;
	var collision_2 = false;
	var collision_3 = false;
	var collision_4 = false;
	var collision_5 = false;
	var curId_AR = "";
	
	var isFillerCompleted_AR_1 = false;
	var isFillerCompleted_AR_2 = false;
	var isFillerCompleted_AR_3 = false;
	var isFillerCompleted_AR_4 = false;
	
	var isARDrag_1 = false;
	var isARDrag_2 = false;
	var isARDrag_3 = false;
	
	var isBottle1Taken = false;
	var isBottle2Taken = false;
	var isBottle3Taken = false;
	var isBottle4Taken = false;
	
	
	var curAttempt = 0;
	
	
	var basePath = '';
	
	var _fillerWidth = '';
	var _fillerHeight = '';
	
	var _bottleWidth = '';
	var _bottleHeight = '';
	
	var _testTubeWidth = '';
	var _testTubeHeight = '';
	
	var _fillerOffset = '';
	
	var fillerLeft = 0;
	var fillerTop = 0;
	
	var isOutsideBottle1AfterDrag = false;
	var isOutsideBottle2AfterDrag = false;
	var isOutsideBottle3AfterDrag = false;
	var isOutsideBottle4AfterDrag = false;
	
	var isInsideBottle1AfterDrop = false;
	var isInsideBottle2AfterDrop = false;
	var isInsideBottle3AfterDrop = false;
	var isInsideBottle4AfterDrop = false;
	
	var disableTimeOutID = "";
	var pickSolutionTimeOutID = "";
	
	var isDrag1Active_AR = false;
	var isDrag2Active_AR = false;
	var isDrag3Active_AR = false;
	var isDrag4Active_AR = false;
	var isLesserResolution = false;
	
	this.init = function(){
		console.log('MODE 2 CALLED');	
		
		if( ( screen.height>=720 && screen.height<= 864 )) {
			isLesserResolution = true;		
		}else{
			isLesserResolution = false;
		}
		
		if(isIPAD || isLesserResolution){
			var htmlStr =  '<div style="z-index:1;" class="sm2_bottle1 layer1">\
			</div>\
			<div style="z-index:1;" data-target="bottle1" id="filler1" class="sm2_filler1">\
				<canvas id="filler1Canvas" width="70" height="205"></canvas>\
			</div>\
			<div style="z-index:2;" id="bottle1" class="sm2_bottle1 layer2">\
				<div class="solution_name">A</div>\
				<div id="bottle1_AR" class="intersection_Area_AR"></div>\
				<canvas id="bottle1Canvas" width="105" height="170"></canvas>\
			</div>\
			<div style="z-index:1;" class="sm2_bottle2 layer1">\
			</div>\
			<div style="z-index:1" data-target="bottle2" id="filler2" class="sm2_filler2">\
				<canvas id="filler2Canvas" width="70" height="205"></canvas>\
			</div>\
			<div style="z-index:2;" id="bottle2" class="sm2_bottle2 layer2">\
				<div class="solution_name">B</div>\
				<div id="bottle2_AR" class="intersection_Area_AR"></div>\
				<canvas id="bottle2Canvas" width="105" height="170"></canvas>\
			</div>\
            <div style="z-index:1;" class="sm2_tube layer1"></div>\
			<div style="z-index:1;" class="sm2_tube_AR layer1"></div>\
			<div style="z-index:2;" id="testTube" class="sm2_tube layer2">\
				<div class="solution_name1"></div>\
				<canvas id="tubeCanvas" width="250" height="375"></canvas>\
			</div>\
            <div style="z-index:1;" class="sm2_bottle3 layer1">\
			</div>\
			<div style="z-index:1;" data-target="bottle3" id="filler3" class="sm2_filler3">\
				<canvas id="filler3Canvas" width="70" height="205"></canvas>\
			</div>\
			<div style="z-index:2;" id="bottle3" class="sm2_bottle3 layer2">\
				<div class="solution_name">C</div>\
				<div id="bottle3_AR" class="intersection_Area_AR"></div>\
				<canvas id="bottle3Canvas" width="105" height="170"></canvas>\
			</div>\
            <div style="z-index:1;" class="sm2_bottle4 layer1">\
			</div>\
			<div style="z-index:1" data-target="bottle4" id="filler4" class="sm2_filler4">\
				<canvas id="filler4Canvas" width="70" height="205"></canvas>\
			</div>\
			<div style="z-index:2;" id="bottle4" class="sm2_bottle4 layer2">\
				<div class="solution_name">D</div>\
				<div id="bottle4_AR" class="intersection_Area_AR"></div>\
				<canvas id="bottle4Canvas" width="105" height="170"></canvas>\
			</div>'	

			basePath = 'images/sim2/ipad/';
			
			_fillerWidth = 70;
			_fillerHeight = 205;
			
			_bottleWidth = 105;
			_bottleHeight = 170;
			
			_testTubeWidth = 250;
			_testTubeHeight = 375;
			
			_fillerOffset = 87;
			
		}else{
			var htmlStr =  '<div style="z-index:1;" class="sm2_bottle1 layer1">\
			</div>\
			<div style="z-index:1;" data-target="bottle1" id="filler1" class="sm2_filler1">\
				<canvas id="filler1Canvas" width="80" height="235"></canvas>\
			</div>\
			<div style="z-index:2;" id="bottle1" class="sm2_bottle1 layer2">\
				<div class="solution_name">A</div>\
				<div id="bottle1_AR" class="intersection_Area_AR"></div>\
				<canvas id="bottle1Canvas" width="120" height="194"></canvas>\
			</div>\
			<div style="z-index:1;" class="sm2_bottle2 layer1">\
			</div>\
			<div style="z-index:1" data-target="bottle2" id="filler2" class="sm2_filler2">\
				<canvas id="filler2Canvas" width="80" height="235"></canvas>\
			</div>\
			<div style="z-index:2;" id="bottle2" class="sm2_bottle2 layer2">\
				<div class="solution_name">B</div>\
				<div id="bottle2_AR" class="intersection_Area_AR"></div>\
				<canvas id="bottle2Canvas" width="120" height="194"></canvas>\
			</div>\
            <div style="z-index:1;" class="sm2_tube layer1"></div>\
			<div style="z-index:1;" class="sm2_tube_AR layer1"></div>\
			<div style="z-index:2;" id="testTube" class="sm2_tube layer2">\
				<div class="solution_name1"></div>\
				<canvas id="tubeCanvas" width="285" height="428"></canvas>\
			</div>\
            <div style="z-index:1;" class="sm2_bottle3 layer1">\
			</div>\
			<div style="z-index:1;" data-target="bottle3" id="filler3" class="sm2_filler3">\
				<canvas id="filler3Canvas" width="80" height="235"></canvas>\
			</div>\
			<div style="z-index:2;" id="bottle3" class="sm2_bottle3 layer2">\
				<div class="solution_name">C</div>\
				<div id="bottle3_AR" class="intersection_Area_AR"></div>\
				<canvas id="bottle3Canvas" width="120" height="194"></canvas>\
			</div>\
            <div style="z-index:1;" class="sm2_bottle4 layer1">\
			</div>\
			<div style="z-index:1" data-target="bottle4" id="filler4" class="sm2_filler4">\
				<canvas id="filler4Canvas" width="80" height="235"></canvas>\
			</div>\
			<div style="z-index:2;" id="bottle4" class="sm2_bottle4 layer2">\
				<div class="solution_name">D</div>\
				<div id="bottle4_AR" class="intersection_Area_AR"></div>\
				<canvas id="bottle4Canvas" width="120" height="194"></canvas>\
			</div>'		
			
			basePath = 'images/sim2/';
			
			_fillerWidth = 80;
			_fillerHeight = 235;
			
			_bottleWidth = 120;
			_bottleHeight = 194;
			
			_testTubeWidth = 285;
			_testTubeHeight = 428;
			
			_fillerOffset = 105;
		}
		
		
				
		$(".similuation_one").hide();
		$(".similuation_one:eq(1)").html(htmlStr).show();
		
		$(".mode_instruction").html('選擇並移取兩種溶液至試管內。').show();
		
		marginLeft = ( $("#parentContainer").width() - $("#mode1").width() ) / 2;
		marginTop = ( $("#parentContainer").height() - $("#mode1").height() ) / 2;
		//console.log( (marginLeft/2) )
		
		$("#filler1,#filler2,#filler3,#filler4").each(function(){
			//console.log( $(this) );
			$(this).data('left',$(this).position().left);
			$(this).data('top',$(this).position().top);
		}); 
		
		$("#filler1,#filler2,#filler3,#filler4").css('cursor','pointer');
		
		console.log( $("#filler1").data('left') );
		
		if(isIPAD || isAndroid){
			$("#filler1,#filler2,#filler3,#filler4").on('touchstart',_this.onFillerMouseDown);
			$("#mode2").on('touchmove',_this.onMouseMove);
			$("#mode2").on('touchend',_this.onMouseUp);			
		}else{
			$("#filler1,#filler2,#filler3,#filler4").on('mousedown',_this.onFillerMouseDown);
			$(document).on('mousemove',_this.onMouseMove);
			//$("#mode2").on('mousemove',_this.onMouseMove);
			//$("#mode2").on('mouseup',_this.onMouseUp);	
			$(document).on('mouseup',_this.onMouseUp);
		}
		
		_this.initAnimations();
		
		$(window).on('resize',_this.onWindowResize);
		
	}
	
	this.onWindowResize = function(){
		marginLeft = ( $("#parentContainer").width() - $("#mode1").width() ) / 2;
		marginTop = ( $("#parentContainer").height() - $("#mode1").height() ) / 2;	
	}
	
	this.fillerDrags = function() {
		//console.log("isAnimationRunning: "+isAnimationRunning)
		if(!isAnimationRunning) {
			marginLeft = ( $("#parentContainer").width() - $("#mode2").width() ) / 2;
			marginTop = ( $("#parentContainer").height() - $("#mode2").height() ) / 2;
			$("#filler1,#filler2,#filler3,#filler4").each(function(){
				//$(this).css('left', $(this).data('left') );
				//$(this).css('top', $(this).data('top') );
			}); 
			//console.log(curId_AR);
			if(curId_AR == "" || (isFillerCompleted_AR_1 && isFillerCompleted_AR_2 && isFillerCompleted_AR_3 && isFillerCompleted_AR_4)) return;
			
			
			
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
			
			//if( parseInt( $("#traceDiv").css("top") )- marginTop > window.innerHeight-parseInt( $("#"+curId_AR).css("height") ) || parseInt( $("#traceDiv").css("top") )- marginTop < 20 || parseInt( $("#traceDiv").css("left") )- marginLeft > window.innerWidth-parseInt( $("#"+curId_AR).css("width") ) || parseInt( $("#traceDiv").css("left") )- marginTop < 20 ) {return;}
			
			/* console.log( parseInt( $("#traceDiv").css("left") ) - marginLeft );
			
			if( parseInt( $("#traceDiv").css("left") ) - marginLeft < 10 ) {
				console.log( parseInt( $("#traceDiv").css("left") ) - marginLeft );
				console.log("LOWER LEFT LIMIT REACHED");
				return;
			} */
			
			
			$("#"+curId_AR).css({
				left: parseInt( $("#traceDiv").css("left") )-marginLeft+"px",
				top: parseInt( $("#traceDiv").css("top") )-marginTop+"px"
			});
		}
	}
	this.arModeFunction1 = function() {
		isARDrag_1 = isARDrag_2 = isARDrag_3 = false;
		
		$("#filler1,#filler2,#filler3,#filler4").each(function(){
			//$(this).css('left', $(this).data('left') );
			//$(this).css('top', $(this).data('top') );
		}); 
	}
	
	this.arModeFunction = function() {
		//console.log('ar mode..!');		
		
		/* var cond1 = !collision( $("#bottle1"), $("#traceDiv") );
		var cond2 = !collision( $("#bottle2"), $("#traceDiv") );
		var cond3 = !collision( $("#bottle3"), $("#traceDiv") );
		var cond4 = !collision( $("#bottle4"), $("#traceDiv") );
		
		if(cond1 && cond2 && cond3 && cond4){
			isOutsideBottle1AfterDrag = true;	
			isInsideBottle1AfterDrop = false;

			isOutsideBottle2AfterDrag = true;
			isInsideBottle2AfterDrop = false;
			
			isOutsideBottle3AfterDrag = true;	
			isInsideBottle3AfterDrop = false;
			
			isOutsideBottle4AfterDrag = true;	
			isInsideBottle4AfterDrop = false;
		} */
		
		// 1
		
		if( !collision( $("#bottle1_AR"), $("#traceDiv") ) && !collision( $("#filler1"), $("#traceDiv") )  ){
			isOutsideBottle1AfterDrag = false;	
			isInsideBottle1AfterDrop = false;
			isDrag1Active_AR = false;
		}
		
		if( !collision( $("#bottle2_AR"), $("#traceDiv") ) && !collision( $("#filler2"), $("#traceDiv") ) ){
			isOutsideBottle2AfterDrag = false;
			isInsideBottle2AfterDrop = false;
			isDrag2Active_AR = false;
		}
		
		if( !collision( $("#bottle3_AR"), $("#traceDiv") ) && !collision( $("#filler3"), $("#traceDiv") ) ){
			isOutsideBottle3AfterDrag = false;	
			isInsideBottle3AfterDrop = false;
			isDrag3Active_AR = false;
		}
		
		if( !collision( $("#bottle4_AR"), $("#traceDiv") ) && !collision( $("#filler4"), $("#traceDiv") ) ){
			isOutsideBottle4AfterDrag = false;	
			isInsideBottle4AfterDrop = false;
			isDrag4Active_AR = false;
		}
		
		// 2
		
		if( !collision( $("#bottle1_AR"), $("#filler1") ) && collision( $("#filler1"), $("#traceDiv") )  ){
			isOutsideBottle1AfterDrag = true;	
			isInsideBottle1AfterDrop = false;
		}
		
		if( !collision( $("#bottle2_AR"), $("#filler2") ) && collision( $("#filler2"), $("#traceDiv") ) ){
			isOutsideBottle2AfterDrag = true;
			isInsideBottle2AfterDrop = false;
		}
		
		if( !collision( $("#bottle3_AR"), $("#filler3") ) && collision( $("#filler3"), $("#traceDiv") ) ){
			isOutsideBottle3AfterDrag = true;	
			isInsideBottle3AfterDrop = false;
		}
		
		if( !collision( $("#bottle4_AR"), $("#filler4") ) && collision( $("#filler4"), $("#traceDiv") ) ){
			isOutsideBottle4AfterDrag = true;	
			isInsideBottle4AfterDrop = false;
		}
		
		// 3
		
		/*if( collision( $("#bottle1"), $("#traceDiv") ) && collision( $("#filler1"), $("#traceDiv") )  ){
			isOutsideBottle1AfterDrag = false;	
			isInsideBottle1AfterDrop = true;
		}
		
		if( collision( $("#bottle2"), $("#traceDiv") ) && collision( $("#filler2"), $("#traceDiv") ) ){
			isOutsideBottle2AfterDrag = false;
			isInsideBottle2AfterDrop = true;
		}
		
		if( collision( $("#bottle3"), $("#traceDiv") ) && collision( $("#filler3"), $("#traceDiv") ) ){
			isOutsideBottle3AfterDrag = false;	
			isInsideBottle3AfterDrop = true;
		}
		
		if( collision( $("#bottle4"), $("#traceDiv") ) && collision( $("#filler4"), $("#traceDiv") ) ){
			isOutsideBottle4AfterDrag = false;	
			isInsideBottle4AfterDrop = true;
		}*/
		 
		
		 
		 
		//console.log(isOutsideBottle1AfterDrag+" "+isOutsideBottle2AfterDrag+" "+isOutsideBottle3AfterDrag+" "+isOutsideBottle4AfterDrag);
		//console.log(isInsideBottle1AfterDrop+" "+isInsideBottle2AfterDrop+" "+isInsideBottle3AfterDrop+" "+isInsideBottle4AfterDrop);
		
		$("#mousePosDiv").html(isOutsideBottle1AfterDrag+" "+isOutsideBottle2AfterDrag+" "+isOutsideBottle3AfterDrag+" "+isOutsideBottle4AfterDrag+" <br/>"+isInsideBottle1AfterDrop+" "+isInsideBottle2AfterDrop+" "+isInsideBottle3AfterDrop+" "+isInsideBottle4AfterDrop);
		
		
		collision_1 = false;
		collision_2 = false;
		collision_3 = false;
		collision_4 = false;
		collision_5 = false;
		
		//$("#currDivs").text(isFillerCompleted_AR_1+" "+isFillerCompleted_AR_2+ " "+isFillerCompleted_AR_3+" "+isFillerCompleted_AR_4+" "+isAnimationRunning);
		
		//curId_AR = "";
		
		if( collision( $("#traceDiv"), $("#filler1") ) && ( !isDrag2Active_AR && !isDrag3Active_AR && !isDrag4Active_AR  ) && !isInsideBottle1AfterDrop   ) {
			if(isFillerCompleted_AR_1 || isAnimationRunning) return;
			
			$("#filler2,#filler3,#filler4").each(function(){
				$(this).css('left', $(this).data('left') );
				$(this).css('top', $(this).data('top') );
			}); 
			
			collision_1 = true;
			isDrag1Active_AR = true;
			curId_AR = "filler1";
		} else if( collision( $("#traceDiv"), $("#filler2") ) && ( !isDrag1Active_AR && !isDrag3Active_AR && !isDrag4Active_AR  ) && !isInsideBottle2AfterDrop   ) {
			if(isFillerCompleted_AR_2 || isAnimationRunning) return;
			
			$("#filler1,#filler3,#filler4").each(function(){
				$(this).css('left', $(this).data('left') );
				$(this).css('top', $(this).data('top') );
			}); 
			
			collision_2 = true;
			isDrag2Active_AR = true;
			curId_AR = "filler2";
		} else 	if( collision( $("#traceDiv"), $("#filler3") ) && ( !isDrag1Active_AR && !isDrag2Active_AR && !isDrag4Active_AR  ) && !isInsideBottle3AfterDrop   ) {
			if(isFillerCompleted_AR_3 || isAnimationRunning) return;
			
			$("#filler1,#filler2,#filler4").each(function(){
				$(this).css('left', $(this).data('left') );
				$(this).css('top', $(this).data('top') );
			}); 
			
			collision_3 = true;
			isDrag3Active_AR = true;
			curId_AR = "filler3";
		} else 	if( collision( $("#traceDiv"), $("#filler4") ) && ( !isDrag1Active_AR && !isDrag2Active_AR && !isDrag3Active_AR  ) && !isInsideBottle4AfterDrop  ) {
			if(isFillerCompleted_AR_4 || isAnimationRunning) return;
			
			$("#filler1,#filler2,#filler3").each(function(){
				$(this).css('left', $(this).data('left') );
				$(this).css('top', $(this).data('top') );
			}); 
			
			collision_4 = true;
			isDrag4Active_AR = true;
			curId_AR = "filler4";
		}
		
		if( isOutsideBottle1AfterDrag && collision( $("#bottle1_AR"), $("#traceDiv") ) ){
			isOutsideBottle1AfterDrag = false;
			isInsideBottle1AfterDrop = true;
			collision_1 = false;
			//clearTimeout(disableTimeOutID);
			//disableTimeOutID = setTimeout(function(){
				isDrag1Active_AR = false;
			//},1000);
			curId_AR = "";
			/* filler1Animation1.gotoAndStop("forward");
			bottle1Animation.gotoAndStop("forward");
			filler1Obj.filled = false; */
			$("#filler1").css('left',$("#filler1").data('left')+"px");
			$("#filler1").css('top',$("#filler1").data('top')+"px");
			//$("#traceDiv").width(0).height(0);
			console.log("isOutsideBottle1AfterDrag: "+isOutsideBottle1AfterDrag);
		}
		
		if( isOutsideBottle2AfterDrag && collision( $("#bottle2_AR"), $("#traceDiv") ) ){
			isOutsideBottle2AfterDrag = false;
			isInsideBottle2AfterDrop = true;
			collision_2 = false;
			//clearTimeout(disableTimeOutID);
			//disableTimeOutID = setTimeout(function(){
				isDrag2Active_AR = false;
			//},1000);
			curId_AR = "";	
			/* filler2Animation1.gotoAndStop("forward");
			bottle2Animation.gotoAndStop("forward");
			filler2Obj.filled = false; */
			$("#filler2").css('left',$("#filler2").data('left')+"px");
			$("#filler2").css('top',$("#filler2").data('top')+"px");
			//$("#traceDiv").width(0).height(0);
			console.log("isOutsideBottle2AfterDrag: "+isOutsideBottle2AfterDrag);
		}
		
		if( isOutsideBottle3AfterDrag && collision( $("#bottle3_AR"), $("#traceDiv") ) ){
			isOutsideBottle3AfterDrag = false;
			isInsideBottle3AfterDrop = true;
			collision_3 = false;
			//clearTimeout(disableTimeOutID);
			//disableTimeOutID = setTimeout(function(){
				isDrag3Active_AR = false;
			//},1000);
			curId_AR = "";
			/* filler3Animation1.gotoAndStop("forward");
			bottle3Animation.gotoAndStop("forward");
			filler3Obj.filled = false; */
			$("#filler3").css('left',$("#filler3").data('left')+"px");
			$("#filler3").css('top',$("#filler3").data('top')+"px");
			//$("#traceDiv").width(0).height(0);
			console.log("isOutsideBottle3AfterDrag: "+isOutsideBottle3AfterDrag);
		}
		
		if( isOutsideBottle4AfterDrag && collision( $("#bottle4_AR"), $("#traceDiv") ) ){
			isOutsideBottle4AfterDrag = false;	
			isInsideBottle4AfterDrop = true;
			collision_4 = false;
			//clearTimeout(disableTimeOutID);
			//disableTimeOutID = setTimeout(function(){
				isDrag4Active_AR = false;
			//},1000);
			curId_AR = "";
			/* filler4Animation1.gotoAndStop("forward");
			bottle4Animation.gotoAndStop("forward");
			filler4Obj.filled = false; */
			$("#filler4").css('left',$("#filler4").data('left')+"px");
			$("#filler4").css('top',$("#filler4").data('top')+"px");
			//$("#traceDiv").width(0).height(0);
			console.log("isOutsideBottle4AfterDrag: "+isOutsideBottle4AfterDrag);
		}

		/* if( !collision( $("#filler1"), $("#traceDiv") ) && filler1Obj.filled ){
			isOutsideBottle1AfterDrag = false;	
			//isDragActive_AR = false;
		}
		
		if( !collision( $("#filler2"), $("#traceDiv") ) && filler2Obj.filled ){
			isOutsideBottle2AfterDrag = false;	
			//isDragActive_AR = false;
		}
		
		if( !collision( $("#filler3"), $("#traceDiv") ) && filler3Obj.filled ){
			isOutsideBottle3AfterDrag = false;
			//isDragActive_AR = false;
		}
		
		if( !collision( $("#filler4"), $("#traceDiv") ) && filler4Obj.filled ){
			isOutsideBottle4AfterDrag = false;	
			//isDragActive_AR = false;
		} */
		
		//console.log(collision_1+" "+collision_2+" "+collision_3+" "+collision_4);
		
		if(collision( $("#traceDiv"), $(".sm2_tube_AR"))) {
			
			isOutsideBottle1AfterDrag = false;
			isOutsideBottle2AfterDrag = false;
			isOutsideBottle3AfterDrag = false;
			isOutsideBottle4AfterDrag = false;
			
			isInsideBottle1AfterDrop = false;
			isInsideBottle2AfterDrop = false;
			isInsideBottle3AfterDrop = false;
			isInsideBottle4AfterDrop = false;
			
			isDrag1Active_AR = false;
			isDrag2Active_AR = false;
			isDrag3Active_AR = false;
			isDrag4Active_AR = false;
			
			collision_5 = true;
			//curId_AR = "";
		}
		
		switch(step) {
			
			case 1:
				//console.log("step 1...!",isFillerCompleted_AR_1,isFillerCompleted_AR_2,isFillerCompleted_AR_3);
				//console.log( collision_1, collision_2, collision_3, collision_4 );
				if( isAnimationRunning ) return;
				
				if( (curId_AR == "filler1") ){
				if(!filler1Obj.filled && !isAnimationRunning){
					isAnimationRunning = true;
					filler1Animation1.visible = true;
					filler1Animation2.visible = false;
					clearTimeout(pickSolutionTimeOutID);
					pickSolutionTimeOutID = setTimeout(function(){
						filler1Animation1.gotoAndPlay("forward");
						if(!isBottle1Taken){
							bottle1Animation.gotoAndPlay("forward");
						}else{
							bottle1Animation.gotoAndPlay("forward1");
						}
					},500);
						
					}
				}else if(curId_AR == "filler2"){
					if(!filler2Obj.filled && !isAnimationRunning){
						isAnimationRunning = true;
						filler2Animation1.visible = true;
						filler2Animation2.visible = false;
						clearTimeout(pickSolutionTimeOutID);
						pickSolutionTimeOutID = setTimeout(function(){
							filler2Animation1.gotoAndPlay("forward");
							if(!isBottle2Taken){
								bottle2Animation.gotoAndPlay("forward");
							}else{
								bottle2Animation.gotoAndPlay("forward1");
							}
						},500);
					}
				}else if(curId_AR == "filler3"){
					if(!filler3Obj.filled && !isAnimationRunning){
						isAnimationRunning = true;
						filler3Animation1.visible = true;
						filler3Animation2.visible = false;
						clearTimeout(pickSolutionTimeOutID);
						pickSolutionTimeOutID = setTimeout(function(){
							filler3Animation1.gotoAndPlay("forward");
							if(!isBottle3Taken){
								bottle3Animation.gotoAndPlay("forward");
							}else{
								bottle3Animation.gotoAndPlay("forward1");
							}
						},500);
					}
				}else if(curId_AR == "filler4"){
					if(!filler4Obj.filled && !isAnimationRunning){
						isAnimationRunning = true;
						filler4Animation1.visible = true;
						filler4Animation2.visible = false;
						clearTimeout(pickSolutionTimeOutID);
						pickSolutionTimeOutID = setTimeout(function(){
							filler4Animation1.gotoAndPlay("forward");
							if(!isBottle4Taken){
								bottle4Animation.gotoAndPlay("forward");
							}else{
								bottle4Animation.gotoAndPlay("forward1");
							}
						},500);
					}
				}
				
				if( (collision_1 || collision_2 || collision_3 || collision_4) ){
					this.fillerDrags();
				}
								
				curFillerID = curId_AR;
				if(collision_5 && (collision_1 || collision_2 || collision_3 || collision_4) ) {
					
					if(isAndroid){
						var fixedTop =  $("#testTube").position().top + 10; 
						var fixedLeft =  $("#testTube").position().left + 95;
					}else if(isIPAD){
						var fixedTop =  $("#testTube").position().top + 10; 
						var fixedLeft =  $("#testTube").position().left + _fillerOffset;
					}else{
						var fixedTop =  $("#testTube").position().top	- 63; 
						var fixedLeft =  $("#testTube").position().left + _fillerOffset;
					}
				
				
					$("#filler1,#filler2,#filler3,#filler4").css('pointer-events','none');
					
					//console.log(fixedTop+" "+fixedLeft);
					
					$("#"+curFillerID).css('left',fixedLeft+"px");
					$("#"+curFillerID).css('top',fixedTop+"px");
					
					
					this.startAnimations();
					curId_AR = "";
				}
				//if(fillerObj.filled) step = 2;
				
				break;
			case 2:
				//console.log("step 2...!");
				/*if( isAnimationRunning ) return;
				this.fillerDrags();
				if(collision_1 && collision_3) {
					var fixedTop =  $("#beaker").position().top	- 63; 	
					var fixedLeft =  $("#beaker").position().left + 65;
					
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
					
				}*/
				break;
			
		
		
		}
	}
	
	this.onFillerMouseDown = function(e){
		
		e.preventDefault();
		
		e.stopPropagation();
		
		//console.log('mouse down');
		
		var touch = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0];
		e = touch || e;
		
		isFillerMouseDown = true;	
		
		curFillerID = $(this).attr('id');
		
		diffX = Math.abs( e.pageX - $("#"+curFillerID).position().left );
		diffY = Math.abs( e.pageY - $("#"+curFillerID).position().top );
		
		var curID = $(this).attr('id');
		
		//isInsideBoundingBox1 = true;
		
		$("#filler1,#filler2,#filler3,#filler4").each(function(){
			$(this).css('left', $(this).data('left') );
			$(this).css('top', $(this).data('top') );
		}); 
		
		if(!isTestTubeArea){
			if(curID == "filler1"){
				if(!filler1Obj.filled && !isAnimationRunning){
					isAnimationRunning = true;
					filler1Animation1.visible = true;
					filler1Animation2.visible = false;
					filler1Animation1.gotoAndPlay("forward");
					console.log(isAnimationRunning)
					if(!isBottle1Taken){
						bottle1Animation.gotoAndPlay("forward");
					}else{
						bottle1Animation.gotoAndPlay("forward1");
					}
				}
			}else if(curID == "filler2"){
				if(!filler2Obj.filled && !isAnimationRunning){
					isAnimationRunning = true;
					filler2Animation1.visible = true;
					filler2Animation2.visible = false;
					filler2Animation1.gotoAndPlay("forward");
					if(!isBottle2Taken){
						bottle2Animation.gotoAndPlay("forward");
					}else{
						bottle2Animation.gotoAndPlay("forward1");
					}
				}
			}else if(curID == "filler3"){
				if(!filler3Obj.filled && !isAnimationRunning){
					isAnimationRunning = true;
					filler3Animation1.visible = true;
					filler3Animation2.visible = false;
					filler3Animation1.gotoAndPlay("forward");
					bottle3Animation.gotoAndPlay("forward");
					if(!isBottle3Taken){
						bottle3Animation.gotoAndPlay("forward");
					}else{
						bottle3Animation.gotoAndPlay("forward1");
					}
				}
			}else if(curID == "filler4"){
				if(!filler4Obj.filled && !isAnimationRunning){
					isAnimationRunning = true;
					filler4Animation1.visible = true;
					filler4Animation2.visible = false;
					filler4Animation1.gotoAndPlay("forward");
					bottle4Animation.gotoAndPlay("forward");
					if(!isBottle4Taken){
						bottle4Animation.gotoAndPlay("forward");
					}else{
						bottle4Animation.gotoAndPlay("forward1");
					}
				}
			}
		}
	}
	
	this.onMouseMove = function(e){
		
		e.preventDefault();
		
		e.stopPropagation();
		
		var touch = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0];
		e = touch || e;
		
		mouseX = e.pageX - diffX;
		mouseY = e.pageY - diffY;
		
		//console.log(mouseY);
		
		if( (mouseY <= 0) &&  isFillerMouseDown){
			$("#"+curFillerID).css('left',mouseX+"px");
			return;
		}
		
		if(isFillerMouseDown && !isAnimationRunning){
			
			if(!isLeftLocked){			
				$("#"+curFillerID).css('left',mouseX+"px");
			}
			
			if(!isRightLocked){
				$("#"+curFillerID).css('top',mouseY+"px");		
			}
			
			if(!isTestTubeArea){
				
				console.log("isTestTubeArea");
				
				var curBottleID = $("#"+curFillerID).attr('data-target');
							
				var dragLeft = $("#"+curFillerID).offset().left;
				var dragRight = $("#"+curFillerID).offset().left + $("#"+curFillerID).width();
				
				var dragTop = $("#"+curFillerID).offset().top;
				var dragBottom = $("#"+curFillerID).offset().top + $("#"+curFillerID).height();
				
				var bottleLeft = $("#"+curBottleID).offset().left;
				var bottleRight = $("#"+curBottleID).offset().left + $("#"+curBottleID).width();
				
				var bottleTop = $("#"+curBottleID).offset().top;
				var bottleBottom = $("#"+curBottleID).offset().top + $("#"+curBottleID).height();
				
				var hitAreaBottom = $("#"+curBottleID).offset().top + 10; 
				var hitAreaTop = $("#"+curBottleID).offset().top - 10;
				
				var condition1 =  (bottleLeft < dragLeft);
				var condition2 =  (bottleRight > dragRight);
				var condition3 =  (bottleBottom > dragBottom);
				var condition4 =  (bottleTop < dragBottom);
				
				//console.log(condition1+" "+condition2+" "+condition3+" "+condition4);
				
				if(condition1 && condition2 && condition3 && condition4){
					var curTop =   $("#"+curFillerID).position().top  - 63; 	
					var curLeft =  $("#"+curFillerID).position().left + 18;
					
					var fixedTop =   $("#"+curFillerID).data('top')	- 63; 	
					var fixedLeft =  $("#"+curFillerID).data('left') + 18;
					
					var newTop =   $("#"+curBottleID).position().top  - 63; 	
					
					//console.log(newTop+" "+mouseY);
					
					isLeftLocked = true;
					
					isFiller1Area = true;
					isTestTubeArea = false;
					
					//console.log(fixedTop+" "+curTop);
					
					$("#"+curFillerID).css('z-index','1');
					
					if(newTop > mouseY){
						isRightLocked = false;
						//console.log("isRightLocked: "+isRightLocked)
					}else{
						isRightLocked = true;
						//console.log("isRightLocked: "+isRightLocked)
						
						//console.log("----------------------");
						
						//console.log( $("#"+curFillerID).data('left') , $("#"+curFillerID).data('top') );
						
						$("#"+curFillerID).css('left',$("#"+curFillerID).data('left')+"px");
						$("#"+curFillerID).css('top',$("#"+curFillerID).data('top')+"px");
						
					}
					
					//$("#"+curFillerID).css('left',fixedLeft+"px");
					//$("#"+curFillerID).css('top',fixedTop+"px");
				}else{
					isLeftLocked = false;
					isRightLocked = false;
					
					isFiller1Area = false;
					isTestTubeArea = false;
					
					$("#"+curFillerID).css('z-index','3');
					
					//isInsideBoundingBox1 = false;
				}
			
			}
			
			// Test tube
			
			if(!isFiller1Area){
					
					//console.log("isFiller1Area");
					
					var dragLeft = $("#"+curFillerID).offset().left;
					var dragRight = $("#"+curFillerID).offset().left + $("#"+curFillerID).width();
					
					var dragTop = $("#"+curFillerID).offset().top;
					var dragBottom = $("#"+curFillerID).offset().top + $("#"+curFillerID).height();
					
					var bottleLeft = $("#testTube").offset().left + 50;
					var bottleRight = $("#testTube").offset().left + $("#testTube").width() - 50;
					
					if(isIPAD || isAndroid){
						var bottleTop = $("#testTube").offset().top + 100;
					}else{
						var bottleTop = $("#testTube").offset().top;
					}
										
					var bottleBottom = $("#testTube").offset().top + $("#testTube").height();
					
					var hitAreaBottom = $("#testTube").offset().top + 10; 
					var hitAreaTop = $("#testTube").offset().top - 10;
					
					var condition1 =  (bottleLeft < dragLeft);
					var condition2 =  (bottleRight > dragRight);
					var condition3 =  (bottleBottom > dragBottom);
					var condition4 =  (bottleTop < dragBottom);
					
					//console.log(condition1+" "+condition2+" "+condition3+" "+condition4);
					
					if(condition1 && condition2 && condition3 && condition4){
						
						//console.log('22222222222');
						
						var curTop =   $("#"+curFillerID).position().top  - 63; 	
						var curLeft =  $("#"+curFillerID).position().left + 18;
						
						
						
						
						
						if(isAndroid){
							var fixedLeft =  $("#testTube").position().left + 14;
							var fixedTop =   $("#testTube").position().top	- 63; 	
							var newTop =   $("#testTube").position().top; 
						}else if(isIPAD){
							var fixedLeft =  $("#testTube").position().left + 15;
							var fixedTop =   $("#testTube").position().top	- 63; 	
							var newTop =   $("#testTube").position().top; 
						}else{
							var fixedLeft =  $("#testTube").position().left + 18;
							var fixedTop =   $("#testTube").position().top	- 133; 	
							var newTop =   $("#testTube").position().top  - 63; 
						}
						
						isLeftLocked = true;
						
						isFiller1Area = false;
						isTestTubeArea = true;
						
						//console.log(newTop+" "+curTop);
						
						$("#"+curFillerID).css('z-index','1');
						
						if(newTop > mouseY){
							isRightLocked = false;
							//console.log("isRightLocked: "+isRightLocked)
						}else{
							isRightLocked = true;
							//console.log("isRightLocked: "+isRightLocked)
							
							$("#"+curFillerID).css('left',(fixedLeft+72)+"px");
							$("#"+curFillerID).css('top',(fixedTop+63)+"px");
						}
						
						//$("#"+curFillerID).css('left',fixedLeft+"px");
						//$("#"+curFillerID).css('top',fixedTop+"px");
					}else{
						isLeftLocked = false;
						isRightLocked = false;
						
						isFiller1Area = false;
						isTestTubeArea = false;
						
						$("#"+curFillerID).css('z-index','3');
						
						//isInsideBoundingBox1 = false;
					}
					
			}
			
			
			
		}
		
		if(curFillerID != ""){
			fillerLeft = $("#"+curFillerID).offset().left;
			fillerTop = $("#"+curFillerID).offset().top;
		}
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

			if(curFillerID != ""){
				fillerLeft = $("#"+curFillerID).offset().left;
				fillerTop = $("#"+curFillerID).offset().top;
			}
		}
		
		//console.log("anim",!isAnimationRunning);
		if(isFillerMouseDown && !isAnimationRunning){
			//$("#"+curFillerID).css('left',mouseX+"px");
			//$("#"+curFillerID).css('top',mouseY+"px");		
			
			// Bottles
			
			var curBottleID = $("#"+curFillerID).attr('data-target');
						
			var dragLeft = fillerLeft;
			var dragRight = fillerLeft + $("#"+curFillerID).width();
			
			var dragTop = fillerTop;
			var dragBottom = fillerTop + $("#"+curFillerID).height();
			
			var bottleLeft = $("#"+curBottleID).offset().left;
			var bottleRight = $("#"+curBottleID).offset().left + $("#"+curBottleID).width();
			
			var hitAreaBottom = $("#"+curBottleID).offset().top + 250; 
			var hitAreaTop = $("#"+curBottleID).offset().top - 100;
			
			var condition1 =  (bottleLeft < dragLeft);
			var condition2 =  (bottleRight > dragRight);
			var condition3 =  (hitAreaBottom > dragBottom) ;
			var condition4 =  (hitAreaTop < dragBottom) ;
			
			// Test tube
			
			var bottleLeft1 = $("#testTube").offset().left + 50;
			var bottleRight1 = $("#testTube").offset().left + $("#testTube").width() - 50;
			
			var hitAreaBottom1 = $("#testTube").offset().top + 250; 
			var hitAreaTop1 = $("#testTube").offset().top - 100;
			
			var condition11 =  (bottleLeft1 < dragLeft);
			var condition21 =  (bottleRight1 > dragRight);
			var condition31 =  (hitAreaBottom1 > dragBottom) ;
			var condition41 =  (hitAreaTop1 < dragBottom) ;
						
			if(condition1 && condition2 && condition3 && condition4){
				var fixedTop =  $("#"+curBottleID).position().top	- 63; 	
				var fixedLeft =  $("#"+curBottleID).position().left	+ 18;
				$("#"+curFillerID).css('left',$("#"+curFillerID).data('left')+"px");
				$("#"+curFillerID).css('top',$("#"+curFillerID).data('top')+"px");
				isInsideBoundingBox1 = true;
				//console.log('this area');
			}else if(condition11 && condition21 && condition31 && condition41){
				
				if(isAndroid){
					var fixedTop =  $("#testTube").position().top + 10; 
					var fixedLeft =  $("#testTube").position().left + 86;
					//alert('here');
				}else if(isIPAD){
					var fixedTop =  $("#testTube").position().top + 10; 
					var fixedLeft =  $("#testTube").position().left + _fillerOffset;
				}else{
					var fixedTop =  $("#testTube").position().top	- 63; 
					var fixedLeft =  $("#testTube").position().left + _fillerOffset;
				}
				
				
				$("#filler1,#filler2,#filler3,#filler4").css('pointer-events','none');
				
				//console.log(fixedTop+" "+fixedLeft);
				
				$("#"+curFillerID).css('left',fixedLeft+"px");
				$("#"+curFillerID).css('top',fixedTop+"px");
				isInsideBoundingBox1 = true;
				
				//$("#filler1,#filler2,#filler3,#filler4").css('cursor','pointer');
				
				_this.startAnimations();
				
			}else{
				$("#filler1,#filler2,#filler3,#filler4").each(function(){
					$(this).css('left', $(this).data('left') );
					$(this).css('top', $(this).data('top') );
				}); 
				
				//console.log("ORIGINAL");
			}
		}
		
		isFiller1Area = false;
		isTestTubeArea = false;
		
		isFillerMouseDown = false;	
		isLeftLocked = false;
		isRightLocked = false;	
	}
	
	this.hideTubeAnimations = function(){
		tubeAAAnimation.visible = false;
		tubeABAnimation.visible = false;
		tubeACAnimation.visible = false;
		tubeADAnimation.visible = false;
		
		tubeBAAnimation.visible = false;
		tubeBBAnimation.visible = false;
		tubeBCAnimation.visible = false;
		tubeBDAnimation.visible = false;
		
		tubeCAAnimation.visible = false;
		tubeCBAnimation.visible = false;
		tubeCCAnimation.visible = false;
		tubeCDAnimation.visible = false;
		
		tubeDAAnimation.visible = false;
		tubeDBAnimation.visible = false;
		tubeDCAnimation.visible = false;
		tubeDDAnimation.visible = false;	
	}
	
	this.startAnimations = function(){
								if(curFillerID == "filler1"){
									if(filler1Obj.filled && !isAnimationRunning){
										//console.log("Inside Test tube area");
										
										curSolution = "A";
										
										isAnimationRunning = true;
										filler1Animation1.visible = false;
										filler1Animation2.visible = true;
										filler1Animation2.gotoAndPlay("reverse");
												
										_this.hideTubeAnimations();
										
										if(prevSolution == ""){
											tubeAAAnimation.visible = true;
											tube1Stage.addChild(tubeAAAnimation);
											tubeAAAnimation.gotoAndPlay("step0");
											curAttempt = 0;
											$(".solution_name1").html("A");
										}
										
										if(prevSolution == "A"){
											tubeAAAnimation.visible = true;
											tube1Stage.addChild(tubeAAAnimation);
											tubeAAAnimation.gotoAndPlay("step1");
											curAttempt = 1;
											$(".solution_name1").html("A + A");
										}
										
										if(prevSolution == "B"){
											tubeBAAnimation.visible = true;
											tube1Stage.addChild(tubeBAAnimation);
											tubeBAAnimation.gotoAndPlay("step1");
											curAttempt = 1;
											$(".solution_name1").html("B + A");
										}
										
										if(prevSolution == "C"){
											tubeCAAnimation.visible = true;
											tube1Stage.addChild(tubeCAAnimation);
											tubeCAAnimation.gotoAndPlay("step1");
											curAttempt = 1;
											$(".solution_name1").html("C + A");
										}
										
										if(prevSolution == "D"){
											tubeDAAnimation.visible = true;
											tube1Stage.addChild(tubeDAAnimation);
											tubeDAAnimation.gotoAndPlay("step1");
											curAttempt = 1;
											$(".solution_name1").html("D + A");
										}
										
																				
										prevSolution = "A";
										
									}
								}else if(curFillerID == "filler2"){
									if(filler2Obj.filled && !isAnimationRunning){
										
										curSolution = "B";
										
										isAnimationRunning = true;
										filler2Animation1.visible = false;
										filler2Animation2.visible = true;
										filler2Animation2.gotoAndPlay("reverse");
										
										_this.hideTubeAnimations();
										
										if(prevSolution == ""){
											tubeBBAnimation.visible = true;
											tube1Stage.addChild(tubeBBAnimation);
											tubeBBAnimation.gotoAndPlay("step0");
											curAttempt = 0;
											$(".solution_name1").html("B");
										}
										
										if(prevSolution == "B"){
											tubeBBAnimation.visible = true;
											tube1Stage.addChild(tubeBBAnimation);
											tubeBBAnimation.gotoAndPlay("step1");
											curAttempt = 1;
											$(".solution_name1").html("B + B");
										}
										
										if(prevSolution == "A"){
											tubeABAnimation.visible = true;
											tube1Stage.addChild(tubeABAnimation);
											tubeABAnimation.gotoAndPlay("step1");
											curAttempt = 1;
											$(".solution_name1").html("A + B");
										}
										
										if(prevSolution == "C"){
											tubeCBAnimation.visible = true;
											tube1Stage.addChild(tubeCBAnimation);
											tubeCBAnimation.gotoAndPlay("step1");
											curAttempt = 1;
											$(".solution_name1").html("C + B");
										}
										
										if(prevSolution == "D"){
											tubeDBAnimation.visible = true;
											tube1Stage.addChild(tubeDBAnimation);
											tubeDBAnimation.gotoAndPlay("step1");
											curAttempt = 1;
											$(".solution_name1").html("D + B");
										}
																			
										prevSolution = "B";
										
									}
								}else if(curFillerID == "filler3"){
									if(filler3Obj.filled && !isAnimationRunning){
										
										curSolution = "C";
										
										isAnimationRunning = true;
										filler3Animation1.visible = false;
										filler3Animation2.visible = true;
										filler3Animation2.gotoAndPlay("reverse");
										
										_this.hideTubeAnimations();
										
										if(prevSolution == ""){
											tubeCCAnimation.visible = true;
											tube1Stage.addChild(tubeCCAnimation);
											tubeCCAnimation.gotoAndPlay("step0");
											curAttempt = 0;
											$(".solution_name1").html("C");
										}
										
										if(prevSolution == "C"){
											tubeCCAnimation.visible = true;
											tube1Stage.addChild(tubeCCAnimation);
											tubeCCAnimation.gotoAndPlay("step1");
											curAttempt = 1;
											$(".solution_name1").html("C + C");
										}
										
										
										if(prevSolution == "A"){
											tubeACAnimation.visible = true;
											tube1Stage.addChild(tubeACAnimation);
											tubeACAnimation.gotoAndPlay("step1");
											curAttempt = 1;
											$(".solution_name1").html("A + C");
										}
										
										if(prevSolution == "B"){
											tubeBCAnimation.visible = true;
											tube1Stage.addChild(tubeBCAnimation);
											tubeBCAnimation.gotoAndPlay("step1");
											curAttempt = 1;
											$(".solution_name1").html("B + C");
										}
										
										if(prevSolution == "D"){
											tubeDCAnimation.visible = true;
											tube1Stage.addChild(tubeDCAnimation);
											tubeDCAnimation.gotoAndPlay("step1");
											curAttempt = 1;
											$(".solution_name1").html("D + C");
										}
										
																				
										prevSolution = "C";
										
									}
								}else if(curFillerID == "filler4"){
									if(filler4Obj.filled && !isAnimationRunning){
										
										curSolution = "D";
										
										isAnimationRunning = true;
										filler4Animation1.visible = false;
										filler4Animation2.visible = true;
										filler4Animation2.gotoAndPlay("reverse");
										
										_this.hideTubeAnimations();
										
										
										if(prevSolution == ""){
											tubeDDAnimation.visible = true;
											tube1Stage.addChild(tubeDDAnimation);
											tubeDDAnimation.gotoAndPlay("step0");
											curAttempt = 0;
											$(".solution_name1").html("D");
										}
										
										if(prevSolution == "D"){
											tubeDDAnimation.visible = true;
											tube1Stage.addChild(tubeDDAnimation);
											tubeDDAnimation.gotoAndPlay("step1");
											curAttempt = 1;
											$(".solution_name1").html("D + D");
										}
										
										if(prevSolution == "A"){
											tubeADAnimation.visible = true;
											tube1Stage.addChild(tubeADAnimation);
											tubeADAnimation.gotoAndPlay("step1");
											curAttempt = 1;
											$(".solution_name1").html("A + D");
										}
										
										if(prevSolution == "B"){
											tubeBDAnimation.visible = true;
											tube1Stage.addChild(tubeBDAnimation);
											tubeBDAnimation.gotoAndPlay("step1");
											curAttempt = 1;
											$(".solution_name1").html("B + D");
										}
																				
										if(prevSolution == "C"){
											tubeCDAnimation.visible = true;
											tube1Stage.addChild(tubeCDAnimation);
											tubeCDAnimation.gotoAndPlay("step1");
											curAttempt = 1;
											$(".solution_name1").html("C + D");
										}
										
										
										
										prevSolution = "D";
										
									}
								}
							
	}
	
	
	this.initAnimations = function(){
		// 1
		
		filler1Stage = new createjs.Stage( document.getElementById('filler1Canvas') );
		
		filler1SpriteSheet1 = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Dropper_Green_Suck.png"
				],
				"frames": {"regX": 0, "height": _fillerHeight, "count": 60, "regY": 0, "width": _fillerWidth},
				"animations": {
					"forward" : [30, (59), false]
				}
		});
		
		
		filler1SpriteSheet2 = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Dropper_Green_Flush.png"
				],
				"frames": {"regX": 0, "height": _fillerHeight, "count": 60, "regY": 0, "width": _fillerWidth},
				"animations": {
					"reverse" : [0, (59), false]
				}
		});
		
		filler1Animation1 = new createjs.Sprite(filler1SpriteSheet1, "forward");
		filler1Animation1.x = 0;
		filler1Animation1.y = 0;
		
		filler1Animation2 = new createjs.Sprite(filler1SpriteSheet2, "reverse");
		filler1Animation2.x = 0;
		filler1Animation2.y = 0;
		
		filler1Stage.addChild(filler1Animation1);
		filler1Stage.addChild(filler1Animation2);
				
		filler1Animation1.gotoAndStop(0);
		filler1Animation2.gotoAndStop(0);
		
		filler1Animation2.visible = false;
		
		createjs.Ticker.removeEventListener("tick", filler1Stage);	
		createjs.Ticker.removeEventListener("tick", _this.handleFiller1Tick);	
		
		createjs.Ticker.addEventListener("tick", filler1Stage);	
		createjs.Ticker.addEventListener("tick", _this.handleFiller1Tick);	

		// 2 

		filler2Stage = new createjs.Stage( document.getElementById('filler2Canvas') );
		
		filler2SpriteSheet1 = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Dropper_Colorless_Suck.png"
				],
				"frames": {"regX": 0, "height": _fillerHeight, "count": 60, "regY": 0, "width": _fillerWidth},
				"animations": {
					"forward" : [30, (59), false]
				}
		});
		
		
		filler2SpriteSheet2 = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Dropper_Colorless_Flush.png"
				],
				"frames": {"regX": 0, "height": _fillerHeight, "count": 60, "regY": 0, "width": _fillerWidth},
				"animations": {
					"reverse" : [0, (59), false]
				}
		});
		
		filler2Animation1 = new createjs.Sprite(filler2SpriteSheet1, "forward");
		filler2Animation1.x = 0;
		filler2Animation1.y = 0;
		
		filler2Animation2 = new createjs.Sprite(filler2SpriteSheet2, "reverse");
		filler2Animation2.x = 0;
		filler2Animation2.y = 0;
		
		filler2Stage.addChild(filler2Animation1);
		filler2Stage.addChild(filler2Animation2);
				
		filler2Animation1.gotoAndStop(0);
		filler2Animation2.gotoAndStop(0);
		
		filler2Animation2.visible = false;
		
		createjs.Ticker.removeEventListener("tick", filler2Stage);	
		createjs.Ticker.removeEventListener("tick", _this.handleFiller2Tick);	
		
		createjs.Ticker.addEventListener("tick", filler2Stage);	
		createjs.Ticker.addEventListener("tick", _this.handleFiller2Tick);	
		
		//3
		
		filler3Stage = new createjs.Stage( document.getElementById('filler3Canvas') );
		
		filler3SpriteSheet1 = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Dropper_Colorless_Suck.png"
				],
				"frames": {"regX": 0, "height": _fillerHeight, "count": 60, "regY": 0, "width": _fillerWidth},
				"animations": {
					"forward" : [30, (59), false]
				}
		});
		
		
		filler3SpriteSheet2 = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Dropper_Colorless_Flush.png"
				],
				"frames": {"regX": 0, "height": _fillerHeight, "count": 60, "regY": 0, "width": _fillerWidth},
				"animations": {
					"reverse" : [0, (59), false]
				}
		});
		
		filler3Animation1 = new createjs.Sprite(filler3SpriteSheet1, "forward");
		filler3Animation1.x = 0;
		filler3Animation1.y = 0;
		
		filler3Animation2 = new createjs.Sprite(filler3SpriteSheet2, "reverse");
		filler3Animation2.x = 0;
		filler3Animation2.y = 0;
		
		filler3Stage.addChild(filler3Animation1);
		filler3Stage.addChild(filler3Animation2);
				
		filler3Animation1.gotoAndStop(0);
		filler3Animation2.gotoAndStop(0);
		
		filler3Animation2.visible = false;
		
		createjs.Ticker.removeEventListener("tick", filler3Stage);	
		createjs.Ticker.removeEventListener("tick", _this.handleFiller3Tick);	
		
		createjs.Ticker.addEventListener("tick", filler3Stage);	
		createjs.Ticker.addEventListener("tick", _this.handleFiller3Tick);	
		
		
		
		// 4

		filler4Stage = new createjs.Stage( document.getElementById('filler4Canvas') );
		
		filler4SpriteSheet1 = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Dropper_Blue_Suck.png"
				],
				"frames": {"regX": 0, "height": _fillerHeight, "count": 60, "regY": 0, "width": _fillerWidth},
				"animations": {
					"forward" : [30, (59), false]
				}
		});
		
		
		filler4SpriteSheet2 = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Dropper_Blue_Flush.png"
				],
				"frames": {"regX": 0, "height": _fillerHeight, "count": 60, "regY": 0, "width": _fillerWidth},
				"animations": {
					"reverse" : [0, (59), false]
				}
		});
		
		filler4Animation1 = new createjs.Sprite(filler4SpriteSheet1, "forward");
		filler4Animation1.x = 0;
		filler4Animation1.y = 0;
		
		filler4Animation2 = new createjs.Sprite(filler4SpriteSheet2, "reverse");
		filler4Animation2.x = 0;
		filler4Animation2.y = 0;
		
		filler4Stage.addChild(filler4Animation1);
		filler4Stage.addChild(filler4Animation2);
				
		filler4Animation1.gotoAndStop(0);
		filler4Animation2.gotoAndStop(0);
		
		filler4Animation2.visible = false;
		
		createjs.Ticker.removeEventListener("tick", filler4Stage);	
		createjs.Ticker.removeEventListener("tick", _this.handleFiller4Tick);	
		
		createjs.Ticker.addEventListener("tick", filler4Stage);	
		createjs.Ticker.addEventListener("tick", _this.handleFiller4Tick);

		// 1

		bottle1Stage = new createjs.Stage( document.getElementById('bottle1Canvas') );
		
		bottle1SpriteSheet = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Bottle_Green.png"
				],
				"frames": {"regX": 0, "height": _bottleHeight, "count": 31, "regY": 0, "width": _bottleWidth},
				"animations": {
					"forward" : [0, (14), false],
					"forward1" : [15, (30), false]
				}
		});

		
		bottle1Animation = new createjs.Sprite(bottle1SpriteSheet, "forward");
		bottle1Animation.x = 0;
		bottle1Animation.y = 0;
		
		bottle1Stage.addChild(bottle1Animation);
				
		bottle1Animation.gotoAndStop(0);
		
		createjs.Ticker.removeEventListener("tick", bottle1Stage);	
		createjs.Ticker.addEventListener("tick", bottle1Stage);	
		
		createjs.Ticker.removeEventListener("tick", _this.bottle1StageTick);	
		createjs.Ticker.addEventListener("tick", _this.bottle1StageTick);	

		// 2

		bottle2Stage = new createjs.Stage( document.getElementById('bottle2Canvas') );
		
		bottle2SpriteSheet = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Bottle_Colorless.png"
				],
				"frames": {"regX": 0, "height": _bottleHeight, "count": 31, "regY": 0, "width": _bottleWidth},
				"animations": {
					"forward" : [0, (14), false],
					"forward1" : [15, (30), false]
				}
		});

		
		bottle2Animation = new createjs.Sprite(bottle2SpriteSheet, "forward");
		bottle2Animation.x = 0;
		bottle2Animation.y = 0;
		
		bottle2Stage.addChild(bottle2Animation);
				
		bottle2Animation.gotoAndStop(0);
		
		createjs.Ticker.removeEventListener("tick", bottle2Stage);	
		createjs.Ticker.addEventListener("tick", bottle2Stage);		

		createjs.Ticker.removeEventListener("tick", _this.bottle2StageTick);	
		createjs.Ticker.addEventListener("tick", _this.bottle2StageTick);	
		
		// 3

		bottle3Stage = new createjs.Stage( document.getElementById('bottle3Canvas') );
		
		bottle3SpriteSheet = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Bottle_Colorless.png"
				],
				"frames": {"regX": 0, "height": _bottleHeight, "count": 31, "regY": 0, "width": _bottleWidth},
				"animations": {
					"forward" : [0, (14), false],
					"forward1" : [15, (30), false]
				}
		});

		
		bottle3Animation = new createjs.Sprite(bottle3SpriteSheet, "forward");
		bottle3Animation.x = 0;
		bottle3Animation.y = 0;
		
		bottle3Stage.addChild(bottle3Animation);
				
		bottle3Animation.gotoAndStop(0);
		
		createjs.Ticker.removeEventListener("tick", bottle3Stage);	
		createjs.Ticker.addEventListener("tick", bottle3Stage);		

		createjs.Ticker.removeEventListener("tick", _this.bottle3StageTick);	
		createjs.Ticker.addEventListener("tick", _this.bottle3StageTick);	
		
		// 4

		bottle4Stage = new createjs.Stage( document.getElementById('bottle4Canvas') );
		
		bottle4SpriteSheet = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Bottle_Blue.png"
				],
				"frames": {"regX": 0, "height": _bottleHeight, "count": 31, "regY": 0, "width": _bottleWidth},
				"animations": {
					"forward" : [0, (14), false],
					"forward1" : [15, (30), false]
				}
		});

		
		bottle4Animation = new createjs.Sprite(bottle4SpriteSheet, "forward");
		bottle4Animation.x = 0;
		bottle4Animation.y = 0;
		
		bottle4Stage.addChild(bottle4Animation);
				
		bottle4Animation.gotoAndStop(0);
		
		createjs.Ticker.removeEventListener("tick", bottle4Stage);	
		createjs.Ticker.addEventListener("tick", bottle4Stage);		
		
		createjs.Ticker.removeEventListener("tick", _this.bottle4StageTick);	
		createjs.Ticker.addEventListener("tick", _this.bottle4StageTick);	
		
		// 1
		
		tube1Stage = new createjs.Stage( document.getElementById('tubeCanvas') );
		
		
		// AA
		
		tubeAASpriteSheet = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Mix_AA.png"
				],
				"frames": {"regX": 0, "height": _testTubeHeight, "count": 90, "regY": 0, "width": _testTubeWidth},
				"animations": {
					"step0" : [0, (29), false],
					"step1" : [30, (89), false],
				}
		});

		
		tubeAAAnimation = new createjs.Sprite(tubeAASpriteSheet, "forward");
		
		if(isIPAD || isAndroid){
			tubeAAAnimation.scaleX = 0.8;
			tubeAAAnimation.scaleY = 0.8;
			tubeAAAnimation.x = 20;
			tubeAAAnimation.y = 80;
		}else{
			tubeAAAnimation.scaleX = 1;
			tubeAAAnimation.scaleY = 1;
			tubeAAAnimation.x = 0;
			tubeAAAnimation.y = 0;
		}
		
		tubeAAAnimation.visible = true;
		tube1Stage.addChild(tubeAAAnimation);
		tubeAAAnimation.gotoAndStop(0);
		// 
		
		
		// AB
		
		tubeABSpriteSheet = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Mix_AB.png"
				],
				"frames": {"regX": 0, "height": _testTubeHeight, "count": 90, "regY": 0, "width": _testTubeWidth},
				"animations": {
					"step0" : [0, (29), false],
					"step1" : [30, (89), false],
				}
		});

		
		tubeABAnimation = new createjs.Sprite(tubeABSpriteSheet, "forward");
		
		if(isIPAD || isAndroid){
			tubeABAnimation.scaleX = 0.8;
			tubeABAnimation.scaleY = 0.8;
			tubeABAnimation.x = 20;
			tubeABAnimation.y = 80;
		}else{
			tubeABAnimation.scaleX = 1;
			tubeABAnimation.scaleY = 1;
			tubeABAnimation.x = 0;
			tubeABAnimation.y = 0;
		}
		
		tubeABAnimation.visible = false;
		tube1Stage.addChild(tubeABAnimation);
		tubeABAnimation.gotoAndStop(0);
		// 
		
		// AC
		
		tubeACSpriteSheet = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Mix_AC.png"
				],
				"frames": {"regX": 0, "height": _testTubeHeight , "count": 90, "regY": 0, "width": _testTubeWidth},
				"animations": {
					"step0" : [0, (29), false],
					"step1" : [30, (89), false],
				}
		});

		
		tubeACAnimation = new createjs.Sprite(tubeACSpriteSheet, "forward");
		
		if(isIPAD || isAndroid){
			tubeACAnimation.scaleX = 0.8;
			tubeACAnimation.scaleY = 0.8;
			tubeACAnimation.x = 20;
			tubeACAnimation.y = 80;
		}else{
			tubeACAnimation.scaleX = 1;
			tubeACAnimation.scaleY = 1;
			tubeACAnimation.x = 0;
			tubeACAnimation.y = 0;
		}
			
		
		tube1Stage.addChild(tubeACAnimation);
				
		tubeACAnimation.gotoAndStop(0);
		tubeACAnimation.visible = false;
		
		//

		// AD
		
		tubeADSpriteSheet = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Mix_AD.png"
				],
				"frames": {"regX": 0, "height": _testTubeHeight, "count": 90, "regY": 0, "width": _testTubeWidth},
				"animations": {
					"step0" : [0, (29), false],
					"step1" : [30, (89), false],
				}
		});

		
		tubeADAnimation = new createjs.Sprite(tubeADSpriteSheet, "forward");
		
		if(isIPAD || isAndroid){
			tubeADAnimation.scaleX = 0.8;
			tubeADAnimation.scaleY = 0.8;
			tubeADAnimation.x = 20;
			tubeADAnimation.y = 80;
		}else{
			tubeADAnimation.scaleX = 1;
			tubeADAnimation.scaleY = 1;
			tubeADAnimation.x = 0;
			tubeADAnimation.y = 0;
		}
			
		
		tube1Stage.addChild(tubeADAnimation);
				
		tubeADAnimation.gotoAndStop(0);
		tubeADAnimation.visible = false;
		//
		
		
		// BA
		
		tubeBASpriteSheet = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Mix_BA.png"
				],
				"frames": {"regX": 0, "height": _testTubeHeight, "count": 90, "regY": 0, "width": _testTubeWidth},
				"animations": {
					"step0" : [0, (29), false],
					"step1" : [30, (89), false],
				}
		});

		
		tubeBAAnimation = new createjs.Sprite(tubeBASpriteSheet, "forward");
		
		if(isIPAD || isAndroid){
			tubeBAAnimation.scaleX = 0.8;
			tubeBAAnimation.scaleY = 0.8;
			tubeBAAnimation.x = 20;
			tubeBAAnimation.y = 80;
		}else{
			tubeBAAnimation.scaleX = 1;
			tubeBAAnimation.scaleY = 1;
			tubeBAAnimation.x = 0;
			tubeBAAnimation.y = 0;
		}
					
		tube1Stage.addChild(tubeBAAnimation);
		tubeBAAnimation.gotoAndStop(0);
		tubeBAAnimation.visible = false;	
		//
		
		
		// BB
		
		tubeBBSpriteSheet = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Mix_BB.png"
				],
				"frames": {"regX": 0, "height": _testTubeHeight, "count": 90, "regY": 0, "width": _testTubeWidth},
				"animations": {
					"step0" : [0, (29), false],
					"step1" : [30, (89), false],
				}
		});

		
		tubeBBAnimation = new createjs.Sprite(tubeBBSpriteSheet, "forward");
		
		if(isIPAD || isAndroid){
			tubeBBAnimation.scaleX = 0.8;
			tubeBBAnimation.scaleY = 0.8;
			tubeBBAnimation.x = 20;
			tubeBBAnimation.y = 80;
		}else{
			tubeBBAnimation.scaleX = 1;
			tubeBBAnimation.scaleY = 1;
			tubeBBAnimation.x = 0;
			tubeBBAnimation.y = 0;
		}
					
		tube1Stage.addChild(tubeBBAnimation);
		tubeBBAnimation.gotoAndStop(0);
		tubeBBAnimation.visible = false;	
		//
		
		
		// BC
		
		tubeBCSpriteSheet = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Mix_BC.png"
				],
				"frames": {"regX": 0, "height": _testTubeHeight, "count": 90, "regY": 0, "width": _testTubeWidth},
				"animations": {
					"step0" : [0, (29), false],
					"step1" : [30, (89), false],
				}
		});

		
		tubeBCAnimation = new createjs.Sprite(tubeBCSpriteSheet, "forward");
		
		if(isIPAD || isAndroid){
			tubeBCAnimation.scaleX = 0.8;
			tubeBCAnimation.scaleY = 0.8;
			tubeBCAnimation.x = 20;
			tubeBCAnimation.y = 80;
		}else{
			tubeBCAnimation.scaleX = 1;
			tubeBCAnimation.scaleY = 1;
			tubeBCAnimation.x = 0;
			tubeBCAnimation.y = 0;
		}
					
		tube1Stage.addChild(tubeBCAnimation);
		tubeBCAnimation.gotoAndStop(0);
		tubeBCAnimation.visible = false;	
		//
		
		// BD
		
		tubeBDSpriteSheet = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Mix_BD.png"
				],
				"frames": {"regX": 0, "height": _testTubeHeight, "count": 90, "regY": 0, "width": _testTubeWidth},
				"animations": {
					"step0" : [0, (29), false],
					"step1" : [30, (89), false],
				}
		});

		
		tubeBDAnimation = new createjs.Sprite(tubeBDSpriteSheet, "forward");
		
		if(isIPAD || isAndroid){
			tubeBDAnimation.scaleX = 0.8;
			tubeBDAnimation.scaleY = 0.8;
			tubeBDAnimation.x = 20;
			tubeBDAnimation.y = 80;
		}else{
			tubeBDAnimation.scaleX = 1;
			tubeBDAnimation.scaleY = 1;
			tubeBDAnimation.x = 0;
			tubeBDAnimation.y = 0;
		}
				
		tube1Stage.addChild(tubeBDAnimation);
				
		tubeBDAnimation.gotoAndStop(0);
		tubeBDAnimation.visible = false;	
		//
		
		// CA
		
		tubeCASpriteSheet = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Mix_CA.png"
				],
				"frames": {"regX": 0, "height": _testTubeHeight, "count": 90, "regY": 0, "width": _testTubeWidth},
				"animations": {
					"step0" : [0, (29), false],
					"step1" : [30, (89), false],
				}
		});

		
		tubeCAAnimation = new createjs.Sprite(tubeCASpriteSheet, "forward");
		
		if(isIPAD || isAndroid){
			tubeCAAnimation.scaleX = 0.8;
			tubeCAAnimation.scaleY = 0.8;
			tubeCAAnimation.x = 20;
			tubeCAAnimation.y = 80;
		}else{
			tubeCAAnimation.scaleX = 1;
			tubeCAAnimation.scaleY = 1;
			tubeCAAnimation.x = 0;
			tubeCAAnimation.y = 0;
		}
				
		tube1Stage.addChild(tubeCAAnimation);
				
		tubeCAAnimation.gotoAndStop(0);
		tubeCAAnimation.visible = false;		
		//
		
		
		// CB
		
		tubeCBSpriteSheet = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Mix_CB.png"
				],
				"frames": {"regX": 0, "height": _testTubeHeight, "count": 90, "regY": 0, "width": _testTubeWidth},
				"animations": {
					"step0" : [0, (29), false],
					"step1" : [30, (89), false],
				}
		});

		
		tubeCBAnimation = new createjs.Sprite(tubeCBSpriteSheet, "forward");
		
		if(isIPAD || isAndroid){
			tubeCBAnimation.scaleX = 0.8;
			tubeCBAnimation.scaleY = 0.8;
			tubeCBAnimation.x = 20;
			tubeCBAnimation.y = 80;
		}else{
			tubeCBAnimation.scaleX = 1;
			tubeCBAnimation.scaleY = 1;
			tubeCBAnimation.x = 0;
			tubeCBAnimation.y = 0;
		}
				
		tube1Stage.addChild(tubeCBAnimation);
				
		tubeCBAnimation.gotoAndStop(0);
		tubeCBAnimation.visible = false;		
		//
		
		// CC
		
		tubeCCSpriteSheet = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Mix_CC.png"
				],
				"frames": {"regX": 0, "height": _testTubeHeight, "count": 90, "regY": 0, "width": _testTubeWidth},
				"animations": {
					"step0" : [0, (29), false],
					"step1" : [30, (89), false],
				}
		});

		
		tubeCCAnimation = new createjs.Sprite(tubeCCSpriteSheet, "forward");
		
		if(isIPAD || isAndroid){
			tubeCCAnimation.scaleX = 0.8;
			tubeCCAnimation.scaleY = 0.8;
			tubeCCAnimation.x = 20;
			tubeCCAnimation.y = 80;
		}else{
			tubeCCAnimation.scaleX = 1;
			tubeCCAnimation.scaleY = 1;
			tubeCCAnimation.x = 0;
			tubeCCAnimation.y = 0;
		}
				
		tube1Stage.addChild(tubeCCAnimation);
				
		tubeCCAnimation.gotoAndStop(0);
		tubeCCAnimation.visible = false;		
		//
		
		
		// CD
		
		tubeCDSpriteSheet = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Mix_CD.png"
				],
				"frames": {"regX": 0, "height": _testTubeHeight, "count": 90, "regY": 0, "width": _testTubeWidth},
				"animations": {
					"step0" : [0, (29), false],
					"step1" : [30, (89), false],
				}
		});

		
		tubeCDAnimation = new createjs.Sprite(tubeCDSpriteSheet, "forward");
		
		if(isIPAD || isAndroid){
			tubeCDAnimation.scaleX = 0.8;
			tubeCDAnimation.scaleY = 0.8;
			tubeCDAnimation.x = 20;
			tubeCDAnimation.y = 80;
		}else{
			tubeCDAnimation.scaleX = 1;
			tubeCDAnimation.scaleY = 1;
			tubeCDAnimation.x = 0;
			tubeCDAnimation.y = 0;
		}
				
		tube1Stage.addChild(tubeCDAnimation);
				
		tubeCDAnimation.gotoAndStop(0);
		tubeCDAnimation.visible = false;		
		//
		
		// DA
		
		tubeDASpriteSheet = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Mix_DA.png"
				],
				"frames": {"regX": 0, "height": _testTubeHeight, "count": 90, "regY": 0, "width": _testTubeWidth},
				"animations": {
					"step0" : [0, (29), false],
					"step1" : [30, (89), false],
				}
		});

		
		tubeDAAnimation = new createjs.Sprite(tubeDASpriteSheet, "forward");
		
		if(isIPAD || isAndroid){
			tubeDAAnimation.scaleX = 0.8;
			tubeDAAnimation.scaleY = 0.8;
			tubeDAAnimation.x = 20;
			tubeDAAnimation.y = 80;
		}else{
			tubeDAAnimation.scaleX = 1;
			tubeDAAnimation.scaleY = 1;
			tubeDAAnimation.x = 0;
			tubeDAAnimation.y = 0;
		}
				
		tube1Stage.addChild(tubeDAAnimation);
				
		tubeDAAnimation.gotoAndStop(0);
		tubeDAAnimation.visible = false;		
		//
		
		// DB
		
		tubeDBSpriteSheet = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Mix_DB.png"
				],
				"frames": {"regX": 0, "height": _testTubeHeight, "count": 90, "regY": 0, "width": _testTubeWidth},
				"animations": {
					"step0" : [0, (29), false],
					"step1" : [30, (89), false],
				}
		});

		
		tubeDBAnimation = new createjs.Sprite(tubeDBSpriteSheet, "forward");
		
		if(isIPAD || isAndroid){
			tubeDBAnimation.scaleX = 0.8;
			tubeDBAnimation.scaleY = 0.8;
			tubeDBAnimation.x = 20;
			tubeDBAnimation.y = 80;
		}else{
			tubeDBAnimation.scaleX = 1;
			tubeDBAnimation.scaleY = 1;
			tubeDBAnimation.x = 0;
			tubeDBAnimation.y = 0;
		}
				
		tube1Stage.addChild(tubeDBAnimation);
				
		tubeDBAnimation.gotoAndStop(0);
		tubeDBAnimation.visible = false;		
		//
		
		// DC
		
		tubeDCSpriteSheet = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Mix_DC.png"
				],
				"frames": {"regX": 0, "height": _testTubeHeight, "count": 90, "regY": 0, "width": _testTubeWidth},
				"animations": {
					"step0" : [0, (29), false],
					"step1" : [30, (89), false],
				}
		});

		
		tubeDCAnimation = new createjs.Sprite(tubeDCSpriteSheet, "forward");
		
		if(isIPAD || isAndroid){
			tubeDCAnimation.scaleX = 0.8;
			tubeDCAnimation.scaleY = 0.8;
			tubeDCAnimation.x = 20;
			tubeDCAnimation.y = 80;
		}else{
			tubeDCAnimation.scaleX = 1;
			tubeDCAnimation.scaleY = 1;
			tubeDCAnimation.x = 0;
			tubeDCAnimation.y = 0;
		}
				
		tube1Stage.addChild(tubeDCAnimation);
				
		tubeDCAnimation.gotoAndStop(0);
		tubeDCAnimation.visible = false;		
		//
		
		// DD
		
		tubeDDSpriteSheet = new createjs.SpriteSheet({
				"framerate" : 48,
				"images" : [
					basePath+"Mix_DD.png"
				],
				"frames": {"regX": 0, "height": _testTubeHeight, "count": 90, "regY": 0, "width": _testTubeWidth},
				"animations": {
					"step0" : [0, (29), false],
					"step1" : [30, (89), false],
				}
		});

		
		tubeDDAnimation = new createjs.Sprite(tubeDDSpriteSheet, "forward");
		
		if(isIPAD || isAndroid){
			tubeDDAnimation.scaleX = 0.8;
			tubeDDAnimation.scaleY = 0.8;
			tubeDDAnimation.x = 20;
			tubeDDAnimation.y = 80;
		}else{
			tubeDDAnimation.scaleX = 1;
			tubeDDAnimation.scaleY = 1;
			tubeDDAnimation.x = 0;
			tubeDDAnimation.y = 0;
		}
				
		tube1Stage.addChild(tubeDDAnimation);
				
		tubeDDAnimation.gotoAndStop(0);
		tubeDDAnimation.visible = false;		
		//
		

		createjs.Ticker.removeEventListener("tick", tube1Stage);	
		createjs.Ticker.addEventListener("tick", tube1Stage);		

	}
	
	this.bottle1StageTick = function(){
		if( bottle1Animation.currentFrame == 12 || bottle1Animation.currentFrame == 13 || bottle1Animation.currentFrame == 14 ){
			isBottle1Taken = true;
			bottle1Animation.gotoAndStop(14);
		}
	}
	
	this.bottle2StageTick = function(){
		if( bottle2Animation.currentFrame == 12 || bottle2Animation.currentFrame == 13 || bottle2Animation.currentFrame == 14 ){
			isBottle2Taken = true;
			bottle2Animation.gotoAndStop(14);
		}
	}
	
	this.bottle3StageTick = function(){
		if( bottle3Animation.currentFrame == 12 || bottle3Animation.currentFrame == 13 || bottle3Animation.currentFrame == 14 ){
			isBottle3Taken = true;
			bottle3Animation.gotoAndStop(14);
		}
	}
	
	this.bottle4StageTick = function(){
		if( bottle4Animation.currentFrame == 12 || bottle4Animation.currentFrame == 13 || bottle4Animation.currentFrame == 14 ){
			isBottle4Taken = true;
			bottle4Animation.gotoAndStop(14);
		}
	}
	
	this.handleFiller1Tick = function(){
		
		if(filler1Animation1.currentFrame == 57 || filler1Animation1.currentFrame == 58 || filler1Animation1.currentFrame == 56){
			filler1Animation1.gotoAndStop(59);
			filler1Obj.filled = true;
			isAnimationRunning = false;
			//console.log("fillerAnimation1: "+isAnimationRunning );
		}
		
		if(filler1Animation2.currentFrame == 57 || filler1Animation2.currentFrame == 58 || filler1Animation2.currentFrame == 56){
			filler1Animation2.gotoAndStop(59);
			filler1Obj.filled = false;
			isAnimationRunning = false;
			
			$("#filler1,#filler2,#filler3,#filler4").css('pointer-events','auto');
			
			$("#filler1,#filler2,#filler3,#filler4").each(function(){
					//console.log( $(this) );
					$(this).css('left',$(this).data('left')+"px");
					$(this).css('top',$(this).data('top')+"px");
			}); 
			
			if(curAttempt == 0){
				/* $("#filler1,#filler2,#filler3,#filler4").css({'pointer-events':'none','opacity':0.5});	
				$("#filler2,#bottle2,#filler3,#bottle3,#filler4,#bottle4").css({'pointer-events':'auto','opacity':1}); */
				
				$(".mode_instruction").html('把另一種溶液移送到試管中。').show();
				
				//isFillerCompleted_AR_1 = true;
				//isFillerCompleted_AR_2 = false;
				//isFillerCompleted_AR_3 = false;
				//isFillerCompleted_AR_4 = false;
				
			}else if(curAttempt == 1){
				$("#filler1,#filler2,#filler3,#filler4").css({'pointer-events':'none'});	
				
				$(".mode_instruction").html('觀察溶液的變化。').show();
				
				isFillerCompleted_AR_1 = true;
				isFillerCompleted_AR_2 = true;
				isFillerCompleted_AR_3 = true;
				isFillerCompleted_AR_4 = true;
				
			}
			
			//console.log("fillerAnimation2: "+isAnimationRunning );
		}	
	}
	
	this.handleFiller2Tick = function(){
		if(filler2Animation1.currentFrame == 57 || filler2Animation1.currentFrame == 58 || filler2Animation1.currentFrame == 56){
			filler2Animation1.gotoAndStop(59);
			filler2Obj.filled = true;
			isAnimationRunning = false;
			//console.log("fillerAnimation1: "+isAnimationRunning );
		}
		
		if(filler2Animation2.currentFrame == 57 || filler2Animation2.currentFrame == 58 || filler2Animation2.currentFrame == 56){
			filler2Animation2.gotoAndStop(59);
			filler2Obj.filled = false;
			isAnimationRunning = false;
			
			$("#filler1,#filler2,#filler3,#filler4").css('pointer-events','auto');
			
			$("#filler1,#filler2,#filler3,#filler4").each(function(){
					//console.log( $(this) );
					$(this).css('left',$(this).data('left')+"px");
					$(this).css('top',$(this).data('top')+"px");
			}); 
						
			if(curAttempt == 0){
				/* $("#filler1,#filler2,#filler3,#filler4").css({'pointer-events':'none','opacity':0.5});	
				$("#filler3,#bottle3,#filler4,#bottle4").css({'pointer-events':'auto','opacity':1}); */
				
				//isFillerCompleted_AR_1 = true;
				//isFillerCompleted_AR_2 = true;
				//isFillerCompleted_AR_3 = false;
				//isFillerCompleted_AR_4 = false;
				
				$(".mode_instruction").html('把另一種溶液移送到試管中。').show();
				
			}else if(curAttempt == 1){
				$("#filler1,#filler2,#filler3,#filler4").css({'pointer-events':'none'});

				$(".mode_instruction").html('觀察溶液的變化。').show();
				
				isFillerCompleted_AR_1 = true;
				isFillerCompleted_AR_2 = true;
				isFillerCompleted_AR_3 = true;
				isFillerCompleted_AR_4 = true;
				
			}
			//console.log("fillerAnimation2: "+isAnimationRunning );
		}	
	}
	
	this.handleFiller3Tick = function(){
		if(filler3Animation1.currentFrame == 57 || filler3Animation1.currentFrame == 58 || filler3Animation1.currentFrame == 56){
			filler3Animation1.gotoAndStop(59);
			filler3Obj.filled = true;
			isAnimationRunning = false;
			//console.log("fillerAnimation1: "+isAnimationRunning );
		}
		
		if(filler3Animation2.currentFrame == 57 || filler3Animation2.currentFrame == 58 || filler3Animation2.currentFrame == 56){
			filler3Animation2.gotoAndStop(59);
			filler3Obj.filled = false;
			isAnimationRunning = false;
			
			$("#filler1,#filler2,#filler3,#filler4").css('pointer-events','auto');
			
			$("#filler1,#filler2,#filler3,#filler4").each(function(){
					//console.log( $(this) );
					$(this).css('left',$(this).data('left')+"px");
					$(this).css('top',$(this).data('top')+"px");
			});
			
			if(curAttempt == 0){
				/* $("#filler1,#filler2,#filler3,#filler4").css({'pointer-events':'none','opacity':0.5});	
				$("#filler4,#bottle4").css({'pointer-events':'auto','opacity':1}); */
				
				//isFillerCompleted_AR_1 = true;
				//isFillerCompleted_AR_2 = true;
				//isFillerCompleted_AR_3 = true;
				//isFillerCompleted_AR_4 = false;
				
				
				$(".mode_instruction").html('把另一種溶液移送到試管中。').show();
				
			}else if(curAttempt == 1){
				$("#filler1,#filler2,#filler3,#filler4").css({'pointer-events':'none'});	
				
				$(".mode_instruction").html('觀察溶液的變化。').show();
				
				isFillerCompleted_AR_1 = true;
				isFillerCompleted_AR_2 = true;
				isFillerCompleted_AR_3 = true;
				isFillerCompleted_AR_4 = true;
			}
			//console.log("fillerAnimation2: "+isAnimationRunning );
		}	
	}
	
	this.handleFiller4Tick = function(){
		if(filler4Animation1.currentFrame == 57 || filler4Animation1.currentFrame == 58 || filler4Animation1.currentFrame == 56){
			filler4Animation1.gotoAndStop(59);
			filler4Obj.filled = true;
			isAnimationRunning = false;
			//console.log("fillerAnimation1: "+isAnimationRunning );
		}
		
		if(filler4Animation2.currentFrame == 57 || filler4Animation2.currentFrame == 58 || filler4Animation2.currentFrame == 56){
			filler4Animation2.gotoAndStop(59);
			filler4Obj.filled = false;
			isAnimationRunning = false;
			
			$("#filler1,#filler2,#filler3,#filler4").css('pointer-events','auto');
			
			$("#filler1,#filler2,#filler3,#filler4").each(function(){
					//console.log( $(this) );
					$(this).css('left',$(this).data('left')+"px");
					$(this).css('top',$(this).data('top')+"px");
			}); 
			
			if(curAttempt == 0){
				/* $("#filler4,#bottle4").css({'pointer-events':'auto','opacity':1});
				var bottleID = $("#"+curFillerID).attr('data-target');
				$("#"+curFillerID).css({'pointer-events':'none','opacity':0.5});
				$("#"+bottleID).css({'pointer-events':'none','opacity':0.5}); */
				
				$(".mode_instruction").html('把另一種溶液移送到試管中。').show();
				
			}else if(curAttempt == 1){
				$("#filler1,#filler2,#filler3,#filler4").css({'pointer-events':'none'});	
				
				$(".mode_instruction").html('觀察溶液的變化。').show();
				
				isFillerCompleted_AR_1 = true;
				isFillerCompleted_AR_2 = true;
				isFillerCompleted_AR_3 = true;
				isFillerCompleted_AR_4 = true;
			}
			//console.log("fillerAnimation2: "+isAnimationRunning );
		}	
	}
	
	
	
	this.removeListeners = function(){
		//console.log('Mode2 clear listeners');
		
		if(tube1Stage != undefined){
				createjs.Ticker.removeEventListener("tick", bottle4Stage);	
				createjs.Ticker.removeEventListener("tick", bottle3Stage);	
				createjs.Ticker.removeEventListener("tick", bottle2Stage);	
				createjs.Ticker.removeEventListener("tick", bottle1Stage);	
				
				createjs.Ticker.removeEventListener("tick", _this.bottle1StageTick);	
				createjs.Ticker.removeEventListener("tick", _this.bottle2StageTick);	
				createjs.Ticker.removeEventListener("tick", _this.bottle3StageTick);	
				createjs.Ticker.removeEventListener("tick", _this.bottle4StageTick);	

				createjs.Ticker.removeEventListener("tick", filler4Stage);	
				createjs.Ticker.removeEventListener("tick", _this.handleFiller4Tick);	

				createjs.Ticker.removeEventListener("tick", filler3Stage);	
				createjs.Ticker.removeEventListener("tick", _this.handleFiller3Tick);	

				createjs.Ticker.removeEventListener("tick", filler2Stage);	
				createjs.Ticker.removeEventListener("tick", _this.handleFiller2Tick);	

				createjs.Ticker.removeEventListener("tick", filler1Stage);	
				createjs.Ticker.removeEventListener("tick", _this.handleFiller1Tick);	

				createjs.Ticker.removeEventListener("tick", tube1Stage);
				
				
				bottle4Stage = null;
				bottle3Stage = null;
				bottle2Stage = null;
				bottle1Stage = null;
				
				filler4Stage = null;
				filler3Stage = null;
				filler2Stage = null;
				filler1Stage = null;
				
				tube1Stage = null;
				
				if(isIPAD){
					$("#filler").off('touchstart',_this.onFillerMouseDown);
					$("#mode2").off('touchmove',_this.onMouseMove);
					$("#mode2").off('touchend',_this.onMouseUp);		
				}else{
					$("#filler").off('mousedown',_this.onFillerMouseDown);
					$("#mode2").off('mousemove',_this.onMouseMove);
					$("#mode2").off('mouseup',_this.onMouseUp);	
					$(document).off('mouseup',_this.onMouseUp);
				}
				
				$(window).off('resize',_this.onWindowResize);
		}
	}
	
	_this.init();
}