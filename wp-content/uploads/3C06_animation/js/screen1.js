var Screen1 = function(){
    var scope = this;
    var dragObj,dropObj;
    var dragEle,dropEle,dragParentEle,dragParentHtml,isDroppable = false,dropped = false;
    scope.dragEnable = false; 
    scope.dragEnd = false;
    scope.dragScreen = false;
    scope.currentAudio = "";
    this.init = function(){      
        //main.playAudio('test');    
        scope.hideAll();      
        controller.playVideo('scene_01.mp4','scene_01_poster.png');        
    }
    this.hideAll = function()
    {
        
        $('.dragdrop_1').removeClass('dragdrop_1');
        $('.dragdrop_2').removeClass('dragdrop_2');
        $('.dragdrop_1_1').removeClass('dragdrop_1_1');
        $('#drag_interactivity_1,#drag_interactivity_2').css('display','none');
        scope.dropCount = [];
        console.log("stepNo:"+controller.stepCount);
        controller.hideVideo();
        scope.revertDrag();
        scope.dragEnable = false;
        scope.dragEnd = false;
        scope.dragScreen = false;
        scope.currentAudio = "";
    }

    this.step1 = function(){
        scope.hideAll();
        controller.playVideo('scene_02.mp4','scene_02_poster.png');   
        
    }
    this.step2 = function(){
        scope.hideAll();
        controller.playVideo('scene_03.mp4','scene_03_poster.png');  
    }
    this.step3 = function(){
        scope.hideAll();
        controller.playVideo('scene_04.mp4','scene_04_poster.png');  
    }
    this.step4 = function(){
        scope.hideAll();
        controller.playVideo('scene_05.mp4','scene_05_poster.png');  
    }
    this.step5 = function(){
        scope.hideAll();
        controller.playVideo('scene_06.mp4','scene_06_poster.png');  
    }
    this.step6 = function(){
        scope.hideAll();
        controller.playVideo('scene_07.mp4','scene_07_poster.png');  
    }
    this.step7 = function(){
        scope.hideAll();
        controller.playVideo('scene_08.mp4','scene_08_poster.png');  
    }
    this.step8 = function(){
        scope.hideAll();
        controller.playVideo('scene_09.mp4','scene_09_poster.png');  
    }
    this.step9 = function(){
        scope.hideAll();
        controller.playVideo('scene_10.mp4','scene_10_poster.png');  
    }
    this.step10 = function(){
        scope.hideAll();
        controller.playVideo('scene_11.mp4','scene_11_poster.png');  
    }
    this.step11 = function(){
        scope.hideAll();
        controller.playVideo('scene_12.mp4','scene_12_poster.png'); 
    }
    this.step12 = function(){
        if(scope.dragEnable)
        {
            scope.generateFeedback() 
        }
        else if(scope.dragEnd)
        {
           scope.fbVideoEnd();
        }
        else if(!scope.dragScreen)
        {
            scope.hideAll(); 
            controller.hideVideo();
            $('#bgContainer').addClass('dragdrop_1_1');
            $('#drag_interactivity_1').fadeIn(500)
            $('#bgContainer').removeClass('dragdrop_1_1').addClass('dragdrop_1');
            controller.playAudio('screen13Intro');
        }
        else
        {
            
        }
    }
    this.step13 = function(){
        scope.hideAll();
        controller.playVideo('scene_14.mp4','scene_14_poster.png');
    }
    this.step14 = function(){
        scope.hideAll();
        controller.playVideo('scene_15.mp4','scene_15_poster.png');
    }
    this.step15 = function(){
        if(!scope.dragEnable)
        {
            scope.hideAll();
            $('#bgContainer').addClass('dragdrop_2');
            $('#drag_interactivity_2').css('display','block');
            controller.hideVideo();
            controller.playAudio('screen16Intro');
        }
        else
        {
            scope.generateFeedbackAudio(scope.currentAudio)
        }
    }
    this.step16 = function(){
        scope.hideAll();
        controller.playVideo('scene_17.mp4','scene_17_poster.png');
    }
    this.step17 = function(){
        scope.hideAll();
        controller.playVideo('scene_18.mp4','scene_18_poster.png');
    }
    this.step18 = function(){
        scope.hideAll();
        controller.playVideo('end.mp4','end.png');
    }
    this.videoEnded = function(){
        controller.stepEnd();
    }
    this.fbVideoEnd = function()
    {
        scope.dragEnable = false;
        scope.dragScreen = true;
        $('#drag_interactivity_1').css('display','block');
        $(controller.videoEl_1).hide();
        if(scope.dropCount.length == 3)
        {
            scope.dragEnd = true;
            scope.dragScreen = false;
            controller.playAudio('screen13Outro');
        }
       
    }
    this.interactivityEndController = function()
    {
        if(scope.dropCount.length == 3 && controller.getType()[controller.stepCount].type == "interactivity1")
        {
            scope.dropCount = [];
            controller.stepEnd(); 
        }
        else if(scope.dropCount.length == 2 && controller.getType()[controller.stepCount].type == "interactivity2")
        {
            scope.dropCount = [];
            setTimeout(function(){ controller.stepEnd();},500);
        }
    }
    this.audioEnded = function(id){
        if(scope.dropCount.length == 0)
        {
                if(id == "screen13Intro")
                { 
                    var cursor = {
                        start:"grab",
                        drag:"grabbing",
                        end:"auto"
                        }
                scope.dragEnable = true;
                scope.screenDraggable('#drag_interactivity_1 .drag',cursor);
                scope.screen1Droppable('#drag_interactivity_1 .drop',cursor);
                controller.setDrag('#drag_interactivity_1 .drag',dragObj);
                controller.setDrop('#drag_interactivity_1 .drop',dropObj);
                }
            else
            {
                var cursor = {
                    start:"grab",
                    drag:"grabbing",
                    end:"auto"
                }
                scope.dragEnable = true;
                scope.screenDraggable('#drag_interactivity_2 .drag',cursor);
                scope.screen2Droppable('#drag_interactivity_2 .drop',cursor);
                controller.setDrag('#drag_interactivity_2 .drag',dragObj);
                controller.setDrop('#drag_interactivity_2 .drop',dropObj);
            }
        
        }
        scope.interactivityEndController();
        console.log(".............",controller.getType()[controller.stepCount].type);
    
    }
    this.revertDrag = function()
     {
         $('#'+dragParentEle).html("").html(dragParentHtml);
     }
     scope.refreshVariables = function(ele)
    {
        dragEle = $(ele);
        dragParentEle = $(ele).parent().attr('id');
        dragParentHtml = $('#'+dragParentEle).html();
    }
    scope.dropCount = [],scope.attempt = 0;
    scope.dropFeedbackArr = [{video:'scene_13_act_1_fdbk_2.mp4',poster:'scene_13_act_1_fdbk_2_poster.png'},{video:'scene_13_act_1_fdbk_1.mp4',poster:'scene_13_act_1_fdbk_1_poster.png'},{video:'scene_13_act_1_fdbk_3.mp4',poster:'scene_13_act_1_fdbk_3_poster.png'}];
    scope.dropAudioArr = ['test','test','test'];
    //scope.feedbackAudio = ["attempt1","attempt2","correct"];
    // scope.wrongSoundValidation = function()
    // {
    //     if(scope.attempt<2)
    //     {
    //     controller.playAudio1(scope.feedbackAudio[scope.attempt])
    //     scope.attempt++;
    //     }
    //     else
    //     {
    //     scope.attempt = 0;
    //     }
    // }
    this.screenDraggable = function(ele,cursor)
    {
        var dragclick = {x:0,y:0};
        var dragParent = '';
        var dragPos = '';
        var startPos = {};
        scope.refreshVariables(ele);
        $(ele).css('cursor',cursor.start);
        dragObj = {
            revert: function(){
                //scope.wrongSoundValidation();
                $(this).css('cursor',cursor.start);
                if(isDroppable){
                    // $(this).css(dragPos);
                    // $(dragParent).append($(this));
                   //console.log(dragParent)
                }
                else
                {                   
                    $(this).css(startPos);
                    if(!dropped)
                    {
                    var audioArr = ["attempt1","attempt2"];
                    var index = Math.ceil(Math.random() * audioArr.length-1);
                    console.log(index)
                    controller.playAudio1(audioArr[index]);
                    }
                }
                
            },
            start:function(event,ui)
            {
                startPos = {
                    top:$(this).css('top'),
                    left:$(this).css('left')
                }
                dragclick.x = event.clientX;
                dragclick.y = event.clientY;
                dragPos = {
                    left:ui.position.left,
                    top:ui.position.top

                }
                $(this).data('dataPos',dragPos);
                //console.log(dragPos);
                
            },
            drag:function(event,ui)
            {
                dragParent = $(this).parent();
                dropId = $(this).data('dropid');
                if($(this).data('answer'))
                isDroppable = false;
                var zoom = scale;
                var original = ui.originalPosition;
                ui.position = {
                    left: (event.clientX - dragclick.x + original.left) / zoom + Number(2),
                    top:  (event.clientY - dragclick.y + original.top ) / zoom + Number(2)
                };
               
               
            }
        }
    }
    this.screen1Droppable = function(ele,cursor)
    {
        dropEle =  $(ele);
         dropParentEle = $(ele).parent();
        dropObj = {
            drop: function(event,ui){
                $(ele).css('cursor',cursor.end);
                if($(this).data('dropped'))
                {
                    dropped = true;
                }
                else
                {
                    dropped = false;
                }
                if( dropId == $(this).attr('id'))
                {
                    var audioArr = ["correct1","correct2"];
                    var index = Math.ceil(Math.random() * audioArr.length-1);
                    console.log(index)
                    controller.playAudio1(audioArr[index]);
                  isDroppable = true;
                  var arrayIndex = parseInt($(this).attr('id').split('p')[1]) - 1;
                  if(scope.dropCount.indexOf(arrayIndex) == -1)
                  {
                    scope.dropCount.push(arrayIndex);
                  }

                  setTimeout(function(){scope.generateFeedback(scope.dropFeedbackArr[arrayIndex].video,scope.dropFeedbackArr[arrayIndex].poster);},1000)
                  console.log("left:",ui.draggable.position().left,"top:",ui.draggable.position().top);
                  $(ui.draggable).css({top:$(this).height()/2,left:$(this).width()/2,transform: "translate(-40%, -50%)"});
                  $(this).append($(ui.draggable));
                  $(this).attr('data-dropped',true);
                  $(ui.draggable).draggable('disable');
                }
               
            }
        }
    }
    this.screen2Droppable = function(ele,cursor)
    {
        dropEle =  $(ele);
         dropParentEle = $(ele).parent();
        dropObj = {
            drop: function(event,ui){
                if($(this).data('dropped'))
                {
                    dropped = true;
                }
                else
                {
                    dropped = false;
                }
                $(ele).css('cursor',cursor.end);
                if(dropId == $(this).attr('id'))
                {
                    var audioArr = ["correct1","correct2"];
                    var index = Math.ceil(Math.random() * audioArr.length-1);
                    console.log(index)
                    controller.playAudio1(audioArr[index]);  
                    isDroppable = true;

                  var arrayIndex = parseInt($(this).attr('id').split('p')[1]) - 1;

                  if(scope.dropCount.indexOf(arrayIndex) == -1)
                  {
                    scope.dropCount.push(arrayIndex);
                  }
                  setTimeout(function(){scope.generateFeedbackAudio(scope.dropAudioArr[arrayIndex]);},1000)
                  $(ui.draggable).css({top:$(this).height()/2,left:$(this).width()/2,transform: "translate(-50%, -40%)"});
                  $(this).append($(ui.draggable));
                  $(this).attr('data-dropped',true);
                  $(ui.draggable).draggable('disable');
                }
            }
        }
    } 
    this.generateFeedback = function(video,poster)
    {
        
        scope.dragEnable = true;
        setTimeout(function(){
            controller.playVideo1(video,poster);
            $('#drag_interactivity_1').css('display','none');
        },500);
    }
    this.generateFeedbackAudio = function(audio)
    {
        //scope.currentAudio = audio;    
        //controller.playAudio(audio);
        scope.interactivityEndController();
    }
    
}

