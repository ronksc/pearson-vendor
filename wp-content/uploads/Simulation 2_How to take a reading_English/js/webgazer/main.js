//var elms = window.onload = function() {
var elms = function() {

    //start the webgazer tracker
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
          //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
          //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        })
        .begin()
        .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */

    var width = window.innerWidth;
    var height = window.innerHeight;
    var topDist = '0px';
    var leftDist = '0px';

    //Set up the webgazer video feedback.
    var setup = function() {
        //Set up video variable to store the camera feedback
        //var video = document.getElementById('video');
       var video = document.getElementById('webgazerVideoFeed');
		
		if(video){
			//Position the camera feedback to the top left corner.
			video.style.display = 'block';
			video.style.position = 'absolute';
			video.style.top = topDist;
			video.style.left = leftDist;

			//Set up the video feedback box size
			//video.width = width;
			//video.height = height;
			video.style.margin = '0px';
			//video.style.background = '#222222';
			//webgazer.params.imgWidth = window.innerWidth;
			//webgazer.params.imgHeight = window.innerHeight;
		}

        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var overlay = document.createElement('canvas');
        overlay.id = 'overlay';
		
		if(overlay){
			//Setup the size of canvas
			overlay.style.position = 'fixed';
			overlay.width = width;
			overlay.height = height;
			overlay.style.top = topDist;
			overlay.style.left = leftDist;
			overlay.style.margin = '0px';
		
		
			//Draw the face overlay on the camera video feedback
			/*var faceOverlay = document.createElement('face_overlay');
			faceOverlay.id = 'faceOverlay';
			faceOverlay.style.position = 'fixed';
			faceOverlay.style.top = '59px';
			faceOverlay.style.left = '107px';
			faceOverlay.style.border = 'solid';*/

			document.body.appendChild(overlay);
			/* document.body.appendChild(faceOverlay); */
			
			/* var canvas = document.getElementById("plotting_canvas");
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			canvas.style.position = 'fixed'; */

			var cl = webgazer.getTracker().clm;

			//This function draw the face of the user frame.
			function drawLoop() {
				animFrameForDetect = requestAnimFrame(drawLoop);
				overlay.getContext('2d').clearRect(0,0,overlay.width,overlay.height);
				if (cl.getCurrentPosition()) {
					cl.draw(overlay);
				}
			}
			drawLoop();
		}
		console.log('hello');
    };

    function checkIfReady() {
		console.log('here');
        if (webgazer.isReady()) {
             setTimeout(setup, 1000);
        } else {
			if(!rejectCalls)setTimeout(checkIfReady, 100);
        }
    }
    setTimeout(checkIfReady,100);
};

window.onbeforeunload = function() {
    //webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
    window.localStorage.clear(); //Comment out if you want to save data across different sessions
}

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart(){
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    ClearCalibration();
    PopUpInstruction();
}
