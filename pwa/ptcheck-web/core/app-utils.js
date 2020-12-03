;define(function(require){'use strict';var n=require('root/config'),a=require('core/lib/hooks'),r={};r.log=function(){if(console&&n.debug_mode=='on'){console.log.apply(console,arguments)}};r.addParamToUrl=function(e,r,n){var a='',t=new RegExp('([?&])'+r+'=.*?(&|$)','i'),i=e.indexOf('?')!==-1?'&':'?';if(e.match(t)){a=e.replace(t,'$1'+r+'='+n+'$2')}else{a=e+i+r+'='+n};return a};r.addTrailingSlash=function(e){if(e.substr(-1)!=='/'){e+='/'};return e};r.removeTrailingSlash=function(e){return e.replace(/\/$/,'')};r.trimFragment=function(e){e=e.replace('#','');e=this.removeTrailingSlash(e);return e};r.isInternalUrl=function(e){var r=e.indexOf('http')!==0;r=a.applyFilters('is_internal_url',r,[e]);return r};r.extractRouteFromUrlPath=function(e){var r='';if(n.app_path.length>0){if(e.indexOf('/')===0){e=e.replace(/^\/+/,'')};if(e.indexOf(n.app_path)===0){r=e.replace(n.app_path,'')}else{r=e}}else{if(e.indexOf('/')===0){r=e.replace(/^\/+/,'')}else{r=e}};return r};r.getAjaxErrorType=function(e,r,a){var n='unknown-error';r=(r!==null)?r:'unknown';switch(e.status){case 404:if(r=='error'){n='url-not-found'}else{n='404:'+r};break;case 200:if(r=='parsererror'){n='parse-error-in-json-answer'}else{n='200:'+r};break;default:n=e.status+':'+r;break};return n};return r});