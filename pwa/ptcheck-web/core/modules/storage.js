;define(function(require){'use strict';var n={};var e={};n.set=function(n,r,t){if(!e.hasOwnProperty(n)){e[n]={}};e[n][r]=t};n.get=function(n,r){var t=null;if(e.hasOwnProperty(n)){if(r!=undefined){if(e[n].hasOwnProperty(r)){t=e[n][r]}}else{t=e[n]}};return t};n.clear=function(n){if(e.hasOwnProperty(n)){delete e[n]}};n.clearAll=function(){e={}};return n});