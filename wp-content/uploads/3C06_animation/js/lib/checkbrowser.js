var audioExtension = '';
var audioType = '';
var videoExtension = '';
var videoType = '';
var splitId="";
var isFirefox = testBrowser_Fn('MozBoxSizing'); // FF 0.8+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
// At least Safari 3+: "[object HTMLElementConstructor]"
var isChrome = !isSafari && testBrowser_Fn('WebkitTransform'); // Chrome 1+
var isIE = /*@cc_on!@*/ false || testBrowser_Fn('msTransform'); // At least IE6
var isIPAD = (/iPad|iPhone/i.test(navigator.userAgent)); // IPAD
var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1; //&& ua.indexOf("mobile");
var isMac=navigator.appVersion.indexOf("Mac")!=-1//MAC
var isiPhone = navigator.userAgent.toLowerCase().indexOf("iphone") > -1;
var isiPod = navigator.userAgent.toLowerCase().indexOf("ipod") > -1;

var isTouchDevice;

function testBrowser_Fn(prop)
{
    return prop in document.documentElement.style;
}

if(isIE)
{
	//$('*').disableSelection();
}

function audioExt_Fn()
{
    if (isFirefox) 
	{
		audioExtension = 'mp3';
		audioType = 'audio/mp3';
	}
    else
	{
		audioExtension = 'mp3';
		audioType = 'audio/mpeg';
	}
}

function videoExt_Fn()
{
	if(isFirefox)
	{
		videoExtension = 'mp4';
		videoType = 'video/mp4';
	}
	else
	{
		videoExtension = 'mp4';
		videoType = 'video/mp4';
	}
}

function isTouch() 							// It return the boolean value whether it is touch device or not
{
	if (isIPAD || isAndroid || isiPhone || isiPod) 
	{
		isTouchDevice = true;
	} 
	else 
	{
		isTouchDevice = false;
	}

	return isTouchDevice;
}

_event = isTouch() ? {
        _down: "touchstart",
        _move: "touchmove",
        _end: "touchend",
        _out:"touchend"
    } : {
        _down: "mousedown",
        _move: "mousemove",
        _end: "mouseup",
        _out:"mouseout",
		_over:"mouseover"
    };

isTouch();
audioExt_Fn();
videoExt_Fn();
