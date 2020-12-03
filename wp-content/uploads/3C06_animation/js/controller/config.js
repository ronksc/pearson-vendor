var configAll = function(){
    var _this = {}

    /* assets directory */
    _this.assetsPath = {
        video:'assets/media/video/',
        audio:'assets/media/audio/',
        image:'assets/media/images/',
        videoPoster:'assets/media/video/poster/'
    }

    /* Load all audios with playback ID  */

    _this.audioSrc = [
        {src:"btnClick.mp3" , id:'btnSound'},
        {src:"scene_13_01.mp3" , id:'screen13Intro'},
        {src:"scene_13_06.mp3" , id:'screen13Outro'},
        {src:"scene_13_02_wrong_01.mp3" , id:'attempt1'},
        {src:"scene_13_02_wrong_02.mp3" , id:'attempt2'},
        {src:"scene_16_01.mp3" , id:'screen16Intro'},
        {src:"scene_13_03_correct_01.mp3" , id:'correct1'},
        {src:"scene_13_03_correct_02.mp3" , id:'correct2'}
    ];

    /* Prev and Next button Click ID or Class */

    _this.selectorList = {
        preloaderText:"#percentageVal",
        preloaderContainer:"#imgContainer",
        prevBtn : '.previous_btn',
        prevBtnDis:'.prev_disable',
        nextBtn : '.next_btn',
        nextBtnDis:'.next_disable',
        videoEl : '#video',
        videoEl_1 : '#feedbackVideo',
        play : '.play_btn',
        pause:'.paus_btn',
        feedbackVideo:'#feedbackVideo'

    }


    /* load all screens */

    _this.screens = {
        screenone : new Screen1()
    } 
    
    /* pass all individual screen functions to controller controller*/

    _this.allScreensFunctions = {
        screenone : [{fn:"init",type:"video"},
                     {fn:"step1",type:"video"},
                     {fn:"step2",type:"video"},
                     {fn:"step3",type:"video"},
                     {fn:"step4",type:"video"},
                     {fn:"step5",type:"video"},
                     {fn:"step6",type:"video"},
                     {fn:"step7",type:"video"},
                     {fn:"step8",type:"video"},
                     {fn:"step9",type:"video"},
                     {fn:"step10",type:"video"},
                     {fn:"step11",type:"video"},
                     {fn:"step12",type:"interactivity1"},
                     {fn:"step13",type:"video"},
                     {fn:"step14",type:"video"},
                     {fn:"step15",type:"interactivity2"},
                     {fn:"step16",type:"video"},
                     {fn:"step17",type:"video"},
                     {fn:"step18",type:"video"}
                    ]
    }

   
    return _this;

}

// Instruction :

    /* 
        video:
            play:
                call the play video function ---> controller.playVideo(src, posterImage, fromStart) 
                 src: 
                    pass video src eg.test.mp3.  
                    
                 poster:
                    pass poster image (optional)

                 fromStart : 
                    Optional (mention true or false to start video from start or resume)      
                    Default : video start play from initial

                 no need to give full path (path must be mentioned in -->self.assetsPath )
            pause:
                 pause video --> controller.pauseVideo()

        audio:
            play:
                call the play video function ---> controller.playAudio(id) 
                 pass audio reference id eg. 'rightSound'(please use the id of self.audioSrc) 
            stop:
                 stop audio --> controller.stopAudio()
                 stop all audio --> controller.stopAudioAll()
      
        Extra audio:
            play:
                call the play video function ---> controller.playAudio1(id) 
                 pass audio reference id eg. 'rightSound'(please use the id of self.audioSrc) 
            stop:
                 stop audio --> controller.stopAudio1()

        audio && video:
        
            stop all audio and video --> controller.stopAll();

        dynamicBg: (element mouseover out and down)

            call the function --> controller.dynamicBg(id/class, object)
            id/class:
                
                element id or class
            object:
                pass object eg {hover:'sample.png',out:'sampleout.png',down:'sampledown.png'}
                no need to give full path (path must be mentioned in -->self.assetsPath )

        
        Nextfunction or activity

            call next function --> controller.stepEnd()

        self.navigateBtn --> add all id or class element to this object
        
        self.audioSrc --> add all audio name and id here to load all audio.
    
                */