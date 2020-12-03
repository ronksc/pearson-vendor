var FBPublication=FBPublication||{};FBPublication.search=function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=118)}({118:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0}),e.HighlighterPresenter=e.HighlighterModel=e.LocalSearchProvider=void 0;var i=n(119),o=r(i),s=n(120),a=r(s),l=n(122),u=r(l);e.LocalSearchProvider=u["default"],e.HighlighterModel=o["default"],e.HighlighterPresenter=a["default"]},119:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t,e,n,r){var i,o,s,a,l,u,h,c="R"===t[1];c?(i=t[2]/10,o=t[3]/10,s=t[4]/1e3,a=t[5]/10):(i=t[1]/10,o=t[2]/10,s=t[3]/1e3,a=t[4]/10),l=n+(r-1),u=0===n?0:e[n-1]/10,h=e[l]/10-u,this.y=o,this.x=i+(c?-u-h:u),this.width=h,this.height=a,this.angle=s,this.rotatePadding=u-(c?h:0)}function o(t,e){this.pageModel=t,this.searchCharactersLimit=e,this._data=null}Object.defineProperty(e,"__esModule",{value:!0});var s=n(33),a=r(s),l=window.FBPublication.build,u=l.fbUtils,h=l._;o.prototype.getQueryHighlights=function(t,e){var n=this;h.isNull(this._data)?this._loadHighlightIndex(function(r,i){r?e(r):(n._data=i,n._parseHighlightData(t,e))}):this._parseHighlightData(t,e)},o.prototype._loadHighlightIndex=function(t){u.loadXML([this.pageModel.getSearchInfoUrl()],function(e){t(null,e)},function(e){t(e)})},o.prototype._parseHighlightData=function(t,e){var n=[];try{var r,o,s,l,c;r=this._data.split("\n"),t=t.toLowerCase()||"",t=u.split(t,0);for(var f=1,d=r.length;f<d;f++){o=r[f],s=0;for(var p=0,g=t.length;p<g;p++){if(l=t[p],c=o.split(String.fromCharCode(2)),l.length<this.searchCharactersLimit){var y=h.isUndefined(r[f-1])?"":r[f-1].split(String.fromCharCode(2))[0],v=h.isUndefined(r[f])?"":r[f].split(String.fromCharCode(2))[0],m=h.isUndefined(r[f+1])?"":r[f+1].split(String.fromCharCode(2))[0],_=y+" "+v,x=v+" "+m,b=t[p-1]||"",w=t[p],C=t[p+1]||"",S=b+" "+w,L=w+" "+C,I=!1;""!==b&&a["default"].findIndexes(_,S)&&(I=!0),""!==C&&a["default"].findIndexes(x,L)&&(I=!0)}else I=!0;var F=a["default"].findIndexes(c[0],l);if(s=F?F[0]:-1,s!==-1&&I){var P=o.split(String.fromCharCode(4)),M=[],R=[];if(P.length>1){for(var z=0,O=P.length;z<O;z++)M[z]=P[z].split(String.fromCharCode(2)),z>0&&M[z].unshift(M[0][0]),R[z]=M[z][5].split(String.fromCharCode(3));for(var T=s,q=s+l.length,B=0,j=M.length;B<j;B++){var E;R[B].length<=T?(T-=R[B].length,q-=R[B].length):(q>R[B].length?(E=R[B].length,q-=R[B].length):(E=q,q=0),T>0&&(E-=T),n.push(new i(M[B],R[B],T,E)),T=0)}}else R="R"===c[1]?c[6].split(String.fromCharCode(3)):c[5].split(String.fromCharCode(3)),n.push(new i(c,R,s,l.length))}}}}catch(H){e(H)}e(null,n)},e["default"]=o},120:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t){this.model=t,this._cancelled=!1}Object.defineProperty(e,"__esModule",{value:!0});var o=n(121),s=r(o),a=window.FBPublication.build,l=a._;i.prototype.getSearchHighlightViews=function(t,e){var n=this;this.model.getQueryHighlights(t,function(t,r){n._cancelled||(t?e(t):(n.views=l.map(r,function(t){return new s["default"](this).init(t)}),e(null,l.map(n.views,function(t){return t.getViewDOMElement()}))))})},i.prototype.offset=function(t){l.each(this.views,function(e){e.offset(t)})},i.prototype.scale=function(t){l.each(this.views,function(e){e.scale(t)})},i.prototype.cancelAllRequests=function(){this._cancelled=!0},e["default"]=i},121:function(t,e,n){"use strict";function r(t){this.presenter=t}Object.defineProperty(e,"__esModule",{value:!0});var i=window.FBPublication.build,o=i.html5Lib,s=i._,a=i.el;r.prototype.init=function(t,e){var n={offsetFactor:0,scaleFactor:1};return s.extend(n,e),this.offsetFactor=n.offsetFactor,this.scaleFactor=n.scaleFactor,this.item=t,this.view=a.createElement("div",{"class":"highlight-element",styles:{position:"absolute"}}),this._place(),this},r.prototype.getViewDOMElement=function(){return this.view},r.prototype.offset=function(t){this.offsetFactor=t,this._place()},r.prototype.scale=function(t){this.scaleFactor=t,this._place()},r.prototype._place=function(){a.css(this.view,{top:this.item.y*this.scaleFactor+"px",left:(this.item.x+this.offsetFactor)*this.scaleFactor+"px",width:this.item.width*this.scaleFactor+"px",height:this.item.height*this.scaleFactor+"px"}),this.item.angle&&(o.origin(this.view,0,0),o.rotate(this.view,this.item.angle+"rad",0,0,1,!0))},e["default"]=r},122:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){this.normalized={},t=t||{},this.searchCharactersLimit=t.searchCharactersLimit,this.exactMatch=t.exactMatch,this.maxTextResultLength=t.maxTextResultLength||90,this.chunkSize=66,this.searchInterval=33,this.currentQuery="",this.searchIndex=null,this.result=null,this.indexLoadStarted=!1,this._pageTable=e;var n=this;this.on("change:query",function(){n.set("result",null)})}Object.defineProperty(e,"__esModule",{value:!0});var o=n(123),s=r(o),a=n(33),l=r(a),u=window.FBPublication.build,h=u._,c=u.FBRouter,f=u.FBLocator,d=u.fbUtils;i.prototype=new s["default"],i.prototype.constructor=i,i.prototype.getResultsAsync=function(t,e,n){var r=this;if(h.isEmpty(this.query)||!this.isQueryValid())return[];if(!h.isNull(this.result)){if(this.query===this.currentQuery)return void n(this.result.slice(t*e,t*e+e),!0);this.result=null}var i=function(){h.defer(function(){r._run_search(function(i){n(r.result.slice(t*e,t*e+e),i)})})};this.loadSearchIndex(function(){i()})},i.prototype.getResultsCountSync=function(){return h.isNull(this.result)?void 0:this.result.length},i.prototype._getBold=function(t,e){var n=l["default"].findIndexes(t,e);return n?t.substring(0,n[0])+"<b>"+t.substring(n[0],n[1]+1)+"</b>"+t.substring(n[1]+1,t.length):t},i.prototype.loadSearchIndex=function(t){function e(t,e){for(var n=[];t.length;)n.push(t.splice(0,e));return n}var n=this;return this.callback=t||function(){},this.isIndexLoaded()?void this.callback():void(this.indexLoadStarted||(this.indexLoadStarted=!0,d.loadJSON([c().translatePath("assets/common/search/searchtext.js")],function(t){n.searchIndex=e(t.pages.page,n.chunkSize),n.callback()})))},i.prototype._sendSearchEvent=h.debounce(function(t,e){f().get(f.API).trigger("search",{query:t,success:e.length>0,quantity:e.length})},2500),i.prototype.normalize=function(t,e){if(!this.normalized.hasOwnProperty(t)){var n=l["default"].toLowerCase(l["default"].normalize(e));this.normalized[t]=null!==e?n:null}return this.normalized[t]},i.prototype._run_search=function(t){function e(t){for(var e in t)if(h.has(t,e)){var o=t[e],s=o["#text"];if(null!==s){var l=n._searchFullCoincidence(a,s,o["@ID"],!0),f=!1;if(h.isNull(l)||(r.push(l),f=!0),!n.exactMatch)if(c>1){var d=n._searchPartiallyCoincidence(u,s,o["@ID"],c,a.length);h.isNull(d)||(f?r[r.length-1].count+=d.count-r[r.length-1].count*c:r.push(d))}else if(1===c){var p=n._searchFullCoincidence(u[0],s,o["@ID"],!1);h.isNull(p)||(f?r[r.length-1].count=p.count:r.push(p))}}}i++}var n=this,r=[],i=0,o=0,s=this.query,a=l["default"].toLowerCase(l["default"].normalize(this.query)),u=d.split(a,this.searchCharactersLimit),c=u.length;this.currentQuery=s,h.isUndefined(this.searchTimer)||clearTimeout(this.searchTimer),this.searchTimer=setTimeout(function f(){n.currentQuery===s&&(i>0&&(n.result=r.sort(n._sortFunc.bind(n)),t(i===n.searchIndex.length)),i<n.searchIndex.length?(h.defer(e,n.searchIndex[o]),o++,n.searchTimer=setTimeout(f,n.searchInterval)):n._sendSearchEvent(a,r))},0)},i.prototype._buildSearchText=function(t,e,n){n=n||[];var r=e-this.maxTextResultLength/2;r=r<0?0:r;var i=l["default"].normalize(t.substr(r,parseInt(this.maxTextResultLength,10)+6));if(i="..."+i+"...",i=d.screening(i),n.length>0)for(var o=0;o<n.length;o++)i=this._getBold(i,n[o]);else i=this._getBold(i,this.query);return i},i.prototype._buildIndexes=function(t,e,n){for(var r=[],i=0;i<e;i++){for(var o=[],s=t[i],a=0,l=-2;l!==-1;)l>=0&&o.push(l),l=n.indexOf(s,a),a=l+this.searchCharactersLimit;o.length>0&&r.push(o)}return r},i.prototype._searchFullCoincidence=function(t,e,n,r){for(var i=-1,o=this.normalize(n,e),a=null;(i=o.indexOf(t,i+1))>=0;)i===-1||0!==i&&!d.isSplitter(o.charAt(i-1))||i+t.length!==o.length&&!d.isSplitter(o.charAt(i+t.length))?a?a.count++:a=new s["default"].SearchResult(n,this._buildSearchText(e,i,[t]),r?2:3,i,i+t.length,r,1):a?(a.count++,a.relevance=r?0:1):a=new s["default"].SearchResult(n,this._buildSearchText(e,i,[t]),r?0:1,i,i+t.length,r,1);return a},i.prototype._searchPartiallyCoincidence=function(t,e,n,r){var i=this.normalize(n,e),o=this._buildIndexes(t,r,i);if(null===o||0===o.length)return null;for(var a=0,l=new Array(o.length),u=0,h=0;h<o.length;h++)l[h]=o[h][0],u+=o[h].length;for(var c=0;c<o.length-1;c++){var f=1e3,d=o[c],p=o[c+1];if(null===d||null===p)break;for(var g=d.length,y=p.length,v=0;v<g;v++)for(var m=0;m<y;m++){var _=d[v],x=p[m],b=x>_?1:2,w=x>_?x-_:_-x,C=w*b;C<f&&(l[c]=_,l[c+1]=x,f=C)}a+=f}for(var S=1e4,L=0,I=0;null!==l&&I<l.length;I++)S=Math.min(S,l[I]),L=Math.max(L,l[I]);return a+=1e3*(r-o.length),i=null,new s["default"].SearchResult(n,this._buildSearchText(e,S,t),a+4,S,L,(!1),u)},i.prototype._sortFunc=function(t,e){return t.relevance-e.relevance||t.pageId-e.pageId},i.prototype.getMinimumQueryLength=function(){return this.searchCharactersLimit},i.prototype.isIndexLoaded=function(){return!h.isNull(this.searchIndex)},i.prototype.deleteIndex=function(){this.searchIndex=null,this.indexLoadStarted=!1},e["default"]=i},123:function(t,e,n){"use strict";function r(){this.query=null}Object.defineProperty(e,"__esModule",{value:!0});var i=window.FBPublication.build,o=i.Events;r.prototype=new o,r.prototype.constructor=r,r.prototype.getResultsSync=function(t,e){throw new Error("is an abstract method")},r.prototype.getResultsAsync=function(t,e,n){throw new Error("is an abstract method")},r.prototype.getResultsCountSync=function(){throw new Error("is an abstract method")},r.prototype.getResultsCountAsync=function(t){throw new Error("is an abstract method")},r.prototype.setQuery=function(t){this.set("query",t)},r.prototype.isQueryValid=function(){return!!this.query&&this.query.length>=this.getMinimumQueryLength()},r.prototype.getMinimumQueryLength=function(){return 1},r.prototype.isIndexLoaded=function(){return!1},r.SearchResult=function(t,e,n,r,i,o,s){this.pageId=t,this.text=e,this.relevance=n,this.startPos=r,this.stopPos=i,this.fullText=o,this.count=s},e["default"]=r},33:function(t,e,n){"use strict";function r(){}Object.defineProperty(e,"__esModule",{value:!0});var i=/[\u0300-\u036f]/g,o={"ı":"i","ё":"е"},s=new RegExp(Object.keys(o).join("|"),"gi");r.normalize=function(t){return String.prototype.normalize||console.error("String does'nt have normalize function"),t.normalize("NFKD")},r.toLowerCase=function(t){return t.toLowerCase().replace(i,"").replace(s,function(t){return o[t]})},r.findIndexes=function(t,e){for(var n=0,i=0,o=!1,s=0;s<t.length;s++)if(0!==r.toLowerCase(t.charAt(s)).length){if(o)break;r.toLowerCase(r.normalize(t.charAt(s)))===r.toLowerCase(r.normalize(e.charAt(i)))?i++:(n=s+1,i=0),i===e.length&&(o=!0)}return i===e.length?[n,s-1]:null},e["default"]=r}});