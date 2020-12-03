/**
* This function occurs on resizing the frame
* clears the canvas & then resizes it (as plots have moved position, can't resize without clear)
*/
function resize() {
    
	console.log('WEB GAZER RESIZE')
	
	var canvas = document.getElementById('overlay');
	if(canvas) {
		var context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		
		console.log( $("#webgazerVideoFeed").height() )
		
		//webgazer.params.imgWidth = window.innerWidth;
		//webgazer.params.imgHeight = window.innerHeight;
	}
    
	
};
window.addEventListener('resize', resize, false);
