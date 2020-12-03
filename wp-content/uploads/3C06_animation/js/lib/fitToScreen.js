//var appWidth = document.getElementById('background').offsetWidth;
//var appHeight = document.getElementById('background').offsetHeight;


var appWidth = $('#container').width();
var appHeight = $('#container').height();


var isWebkit = 'webkitRequestAnimationFrame' in window;
var scale = 0;

window.onresize = function(){
	resizeApp();
}

function resizeApp(){
	
	$("#container").css("display","block");
	var winHeight = window.innerHeight;
	var winWidth = window.innerWidth;
	var appWidth = $('#container').width();
    var appHeight = $('#container').height();
	
	winWidth = $(window).width(); //retrieve current window width
	winHeight = $(window).height(); //retrieve current window height
 
		
		scale = ((winWidth/appWidth)<(winHeight/appHeight))?(winWidth/appWidth):(winHeight/appHeight)-0.05;
		
	  /* if(scale > 1){
		 scale = 1;
	 } */
		
	
		var ua = window.navigator.userAgent
		var msie = ua.indexOf ( "MSIE " )
      
	if(msie>0 || ie_ver()){      
		//$('#all').css('zoom',scale);
		document.getElementById('container').style.msTransformOrigin = '0 0';	
		document.getElementById('container').style.msTransform = "scale("+scale+")";
		document.getElementById('container').style.TransformOrigin = '0 0';	
		document.getElementById('container').style.Transform = "scale("+scale+")";         
        
	}else{
		document.getElementById('container').style.webkitTransformOrigin = '0 0';	
		document.getElementById('container').style.webkitTransform = "scale("+scale+")";
		document.getElementById('container').style.MozTransformOrigin = '0 0';	
		document.getElementById('container').style.MozTransform = "scale("+scale+")"; 
	}
	
	var appWidth = document.getElementById('container').offsetWidth * scale;	
	document.getElementById('container').style.left = ((winWidth - appWidth )/2)+'px';
	
     
 

}

function ie_ver(){      
    var iev=0;
    var ieold = (/MSIE (\d+\.\d+);/.test(navigator.userAgent));
    var trident = !!navigator.userAgent.match(/Trident\/7.0/);
    var rv=navigator.userAgent.indexOf("rv:11.0");

    if (ieold) iev=new Number(RegExp.$1);
    if (navigator.appVersion.indexOf("MSIE 10") != -1) iev=10;
    if (trident&&rv!=-1) iev=11;

    return iev;         
}

function getDeviceInfo()
{
	var ua = navigator.userAgent;
	return /iPad/i.test(ua) || /iPhone OS 3_1_2/i.test(ua) || /iPhone OS 3_2_2/i.test(ua) || /Android/i.test(ua);
}

resizeApp();
