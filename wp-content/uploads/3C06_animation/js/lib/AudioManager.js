/**
 * Created by is4823 on 11/18/2015.
 */
var curTimeoutID;
var AudioManager = function() {
}

AudioManager._audioElement;

AudioManager.createAudio = function(){
    AudioManager._audioElement = document.createElement('audio');
}

AudioManager.playAudio = function(currentAudioPath){

    var supportLevel = AudioManager._audioElement.canPlayType('audio/mp4');

    if( (supportLevel == "probably") || (supportLevel == "maybe") ){
        currentAudioPath = currentAudioPath + ".mp3";
    }else{
        currentAudioPath = currentAudioPath + ".ogg";
    }
	//console.log(currentAudioPath);
    $(AudioManager._audioElement).attr('src',"");
    $(AudioManager._audioElement).attr('src',currentAudioPath);
    AudioManager._audioElement.load();

    curTimeoutID = setTimeout(function(){
        AudioManager._audioElement.play();
    }, 300);

}

AudioManager.stopAudio = function(){
	clearTimeout(curTimeoutID);
    AudioManager._audioElement.pause();
    //AudioManager._audioElement.currentTime = 0;
}

AudioManager._audioElement1;

AudioManager.createAudio1 = function(){
    AudioManager._audioElement1 = document.createElement('audio');
}

AudioManager.playAudio1 = function(currentAudioPath){

    var supportLevel1 = AudioManager._audioElement1.canPlayType('audio/mp4');

    if( (supportLevel1 == "probably") || (supportLevel1 == "maybe") ){
        currentAudioPath = currentAudioPath + ".mp3";
    }else{
        currentAudioPath = currentAudioPath + ".ogg";
    }

  //  console.log(currentAudioPath);

    $(AudioManager._audioElement1).attr('src',"");
    $(AudioManager._audioElement1).attr('src',currentAudioPath);
    AudioManager._audioElement1.load();
	
    setTimeout(function(){
        AudioManager._audioElement1.play();
    }, 300);
}

AudioManager.stopAudio1 = function(){
    AudioManager._audioElement1.pause();
  //  AudioManager._audioElement1.currentTime = 0;
}
