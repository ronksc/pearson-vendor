;define(function(){var n='callback',e=0;function t(n){var e,t;e=document.createElement('script');e.type='text/javascript';e.async=!0;e.src=n;t=document.getElementsByTagName('script')[0];t.parentNode.insertBefore(e,t)};function r(e,r){var c=/!(.+)/,t=e.replace(c,''),a=(c.test(e))?e.replace(/.+!/,''):n;t+=(t.indexOf('?')<0)?'?':'&';return t+a+'='+r};function c(){e+=1;return'__async_req_'+e+'__'};return{load:function(e,n,a,l){if(l.isBuild){a(null)}else{var i=c();window[i]=a;t(r(n.toUrl(e),i))}}}});