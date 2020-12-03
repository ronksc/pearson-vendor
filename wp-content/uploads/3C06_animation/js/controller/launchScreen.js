var screenLaunch = function(config){
    var _this = this;
    var currentScreen, instance = '';
    this.totalScreens = [];
    this.stepCount = 0;  //for previous and next;
    this.screenInc = -1;
    this.loadImageCount = 0;
    this.videoEl = $(config.selectorList.videoEl)[0];
    this.videoEl_1 = $(config.selectorList.videoEl_1)[0];
    this.currentPoster = '';
    this.currentVideoSrc = '';
    this.startInit = function(){
       
        this.addScreen(config.allScreensFunctions);
        this.changeScreen();        
        this.bindClick();
        this.disablePrevNext(this.stepCount);        
        this.reloadCurrentScreen();
        $(config.selectorList.preloaderContainer).fadeOut('slow');

    }

    this.initAudio = function(){

        audioPlayer.alternateExtensions = ["mp3"];
        audioPlayer1.alternateExtensions = ["mp3"];
		if(isIE)
		{ 
            audioPlayer.registerPlugins([createjs.HTMLAudioPlugin]);
            audioPlayer1.registerPlugins([createjs.HTMLAudioPlugin]);
        }
        _this.registerSound(config.audioSrc);
    }

    this.registerSound = function(audioSrc){

        if(typeof audioSrc == 'object'){
            
            for (var i = 0, len = audioSrc.length; i < len; i++) {                
                var obj = audioSrc[i];
                audioPlayer.registerSound(config.assetsPath.audio + obj.src, obj.id); //register sound and id
                audioPlayer1.registerSound(config.assetsPath.audio + obj.src, obj.id); //register sound and id
                
            }
        }
    }

    this.prevNextFunction = function(value , isAutomatic){

        this.stopAll(); 
        var beforeInc = value + this.stepCount;
       
        if(beforeInc >= 0 && beforeInc < this.currentPage.allFunc.length){

            this.stepCount += value;
            if(!isAutomatic){
                _this.playAudio1('btnSound');
            }
            
            // load individual function
            var indFn = _this.currentPage.allFunc[this.stepCount].fn; 
            config.screens[currentScreen][indFn]();
            this.playVideoAudioControl("showPause");
            
        }

        // disabling button styles

        var prev = config.selectorList.prevBtnDis.replace(/[#.]/,'');
        var next = config.selectorList.nextBtnDis.replace(/[#.]/,'');
        if(this.stepCount <= 0 || this.stepCount >= this.currentPage.allFunc.length-1){
            _this.disablePrevNext( this.stepCount  );
        }else{
            $(config.selectorList.prevBtn + ',' + config.selectorList.nextBtn).css('pointer-events','all').removeClass(prev+' '+next);
        }

       
       
    }
    
    this.disablePrevNext = function(value){
        var prev = config.selectorList.prevBtnDis.replace(/[#.]/,'');
        var next = config.selectorList.nextBtnDis.replace(/[#.]/,'');
        if(value == 0){
            $(config.selectorList.prevBtn).addClass(prev).css({'pointer-events':'none','user-select':"none"});
        }else{
            $(config.selectorList.nextBtn).addClass(next).css({'pointer-events':'none','user-select':"none"});
        }

    }

    this.stepEnd = function(){

        this.stopAll();
        this.prevNextFunction(1,"automatic");
    }

    this.bindClick = function(){
        var clickHandler = ('ontouchstart' in document.documentElement ? "touchstart" : "click");
        if(config.selectorList.prevBtn) $(config.selectorList.prevBtn).unbind().bind(clickHandler,function(){_this.prevNextFunction(-1)});
        if(config.selectorList.nextBtn) $(config.selectorList.nextBtn).unbind().bind(clickHandler,function(){_this.prevNextFunction(1)});
        if(config.selectorList.play) $(config.selectorList.play + ','+ config.selectorList.pause).unbind().bind(clickHandler, _this.playPause);
                
        if(_this.videoEl) _this.videoEl.addEventListener('ended',_this.videoEnded,false);
        if(_this.videoEl_1) _this.videoEl_1.addEventListener('ended',_this.fbVideoEnd,false);
        if(_this.videoEl) _this.videoEl.addEventListener('canplaythrough',_this.videoLoad,false);
        if(_this.videoEl_1) _this.videoEl_1.addEventListener('canplaythrough',_this.videoLoad,false);
    }

    this.addScreen = function(allScreen){

        if(typeof allScreen == 'object'){
            for(var sc in allScreen){

                this.totalScreens.push({screen : sc, allFunc : allScreen[sc]});
                
             }
        }
        
    }

    this.changeScreen = function(){

        this.stopAll();
        
        if(this.screenInc < this.totalScreens.length ){
            this.stepCount = 0;
            this.currentPage = this.totalScreens[this.screenInc+1];
        }
        currentScreen = _this.currentPage.screen; 
        
        // //call individual screen init function
        //  if(typeof config.screens[currentScreen].init == 'function'){
        //      config.screens[currentScreen].init();
        //  }   
        
        
    }
    this.getType = function(){
        return _this.currentPage.allFunc;
    }

    

    this.preloadImages = function(callback){
        //preload audio
        this.initAudio();
        this.dummyVideo();

        for(var i = 0;i<imgArr.length;i++){
            var image = new Image();
            image.src = imgArr[i];
            image.addEventListener('load',_this.onImageLoad.bind(null,callback),false);
            image.addEventListener('error',_this.onImageLoad.bind(null,callback),false);
        }
    }
    this.onImageLoad = function(callback){
        
        _this.loadImageCount++;        
        var curPercentage = (_this.loadImageCount / imgArr.length) * 100; 
        if(config.selectorList.preloaderText){
            $(config.selectorList.preloaderText).html('載入中 ' + curPercentage.toFixed(0) + '%');
        }
        if(_this.loadImageCount == imgArr.length){

            callback();
        }
    }
    //audio functionalities
    this.playAudio = function(id){

        //passing value if true pause icon will show other wise play icon will show.
        $('.content_part').css('pointer-events','none');
        _this.playVideoAudioControl("showPause");
        instance = audioPlayer.play(id);  // play using id.  Could also use full source path or event.src.
        instance.on("complete", _this.audioEnded.bind(null,id));     

    }
    this.stopAudio = function(){
       audioPlayer.stop();

    }
    this.playAudio1 = function(id){

        $('.content_part').css('pointer-events','none');
        instance = audioPlayer1.play(id);
        instance.on("complete", _this.effectAudioEnded);  
    }
    this.effectAudioEnded = function()
    {
        $('.content_part').css('pointer-events','auto'); 
    }
    this.stopAudio1 = function(){

        audioPlayer1.stop();
    }
    this.stopAudioAll = function(){

        audioPlayer.stop();
        audioPlayer1.stop();
    }

    this.stopAll = function(){
        this.playVideoAudioControl("showPlay");
        this.stopAudioAll();
        this.pauseVideo();
        this.pauseVideo1();
    }

    //video functionalities

    this.playVideo = function(src, poster, fromStart){

        _this.commonPlayVideo(_this.videoEl, src, poster, fromStart)
       
    }
    this.commonPlayVideo = function(el, src, poster, fromStart){

        fromStart = fromStart || true;
        if(!el){
            return false;
        }

        $(el).show();
        if(src){
            _this.currentVideoSrc = src;
            el.src = config.assetsPath.video + src;
        }
        if(fromStart && el && el.currentTime && el.currentTime > 0){
            el.currentTime = 0;
        }
        if(poster){
            _this.currentPoster = poster;
             el.setAttribute('poster', config.assetsPath.videoPoster + poster);
             $(el).css('background-image','url('+config.assetsPath.videoPoster + poster+')');
        }
        if(el.src){    
            el.load();
          //  _this.videoLoad();
           el.muted = false;
            
        }

    }
    this.playVideo1 = function(src, poster, fromStart){

        _this.commonPlayVideo(_this.videoEl_1, src, poster, fromStart);
       
    }

    this.videoLoad = function(){
        var playPromise;
       if(_this.currentPage.allFunc[_this.stepCount].type == "video" || this.id == "feedbackVideo"){
         playPromise = this.play(); 
       };
                  
            if (playPromise !== undefined) {
                playPromise.then(function() {
                    _this.playVideoAudioControl("showPause");
                    
                    // Automatic playback started!
                }).catch(function(error) {
                    
                    // Automatic playback failed.
                    // Show a UI element to let the user manually start playback.
                });
        }else{
            _this.playVideoAudioControl("showPause");
        }
      

    }
   
    this.hideVideo = function(){
        $(_this.videoEl).hide();
        $(_this.videoEl_1).hide();
    }
    

    this.pauseVideo = function(){        
        if(_this.videoEl)
        _this.videoEl.pause();

    }
    this.pauseVideo1 = function(){        
        if(_this.videoEl_1)
        _this.videoEl_1.pause();

    }

    this.videoEnded = function(){
        if(config.screens[currentScreen].videoEnded){
            config.screens[currentScreen].videoEnded();
          //  _this.playAudio('test');
         }
         
    }

    this.fbVideoEnd = function(){
        if(config.screens[currentScreen].fbVideoEnd){
            config.screens[currentScreen].fbVideoEnd();
          //  _this.playAudio('test');
         }
    }

    this.audioEnded = function(id){
        $('.content_part').css('pointer-events','auto');
        if(config.screens[currentScreen].audioEnded){
            config.screens[currentScreen].audioEnded(id);
         }
    }

    this.hideShowPlayPause = function(el){

        _this.stopAll();
        $(config.selectorList.play + ',' + config.selectorList.pause).hide();
        var getClass = config.selectorList.play.replace(/[#.]/,'');
        _this.playAudio1('btnSound');
       if(el.hasClass(getClass)){

            _this.reloadCurrentScreen()
            $(config.selectorList.pause).show();

       }else{
       
             $(config.selectorList.play).show();

       }

    }
    this.playVideoAudioControl = function(value){
        $(config.selectorList.play + ',' + config.selectorList.pause).hide();
        
        if(value == "showPause"){
            $(config.selectorList.pause).show();
        }else{
            $(config.selectorList.play).show();
        }
    }
    this.playPause = function(){
        
        _this.hideShowPlayPause($(this));
    
    }

    this.dummyVideo = function(){
        if(!isIE){
            $('body').append('<iframe width="1" height="1" src="'+ config.assetsPath.video +'dummy.mp4" id="dummy" onload = "controller.dummyEnd()" style="position:absolute;top:-9999px;left:-9999px;z-index:-2;"></iframe>');
        }
        
    }
    this.dummyEnd = function(){

        var myframe = window.frames['dummy'].contentWindow;
        var dummyVideo =  myframe.document.getElementsByTagName('video')[0];
        dummyVideo.onended = function(){
            $('#dummy').remove();
        };

    }

    this.reloadCurrentScreen = function(){
        var indFn = _this.currentPage.allFunc[this.stepCount].fn; 
        if(indFn)
            config.screens[currentScreen][indFn]();

    }

    this.dynamicBg = function(id,dynamicBg){
        $(id).on('mouseenter',function() {
            if(dynamicBg && dynamicBg.hover) {
                $(this).css('background-image', "url(" + config.assetsPath.image + dynamicBg.hover + ")");
            }
        }).on('mouseleave',function() {
            if(dynamicBg && dynamicBg.out){
                $(this).css('background-image', "url(" + config.assetsPath.image + dynamicBg.out + ")");
            }
        }).on('mousedown',function() {
            if(dynamicBg && dynamicBg.down){
                $(this).css('background-image', "url(" + config.assetsPath.image + dynamicBg.down + ")");
            }
        });
    }
    
     //drag and drop functionalities
        
     this.setDrag = function(ele,obj)
     {
            
        var dragclick = {x:0,y:0};
        var dragParent = '';
        var dragPos = '';     
        $(ele).draggable(obj);
         
     }
    
     this.setDrop = function(ele,obj)
     {
         
         $(ele).droppable(obj);
         
     }


}