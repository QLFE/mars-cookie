!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.cookie=t():e.cookie=t()}(window,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";function n(e){return encodeURIComponent(e)}function o(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}function i(e){try{if("object"===o(e=JSON.parse(e)))return!0}catch(e){return!1}return!1}Object.defineProperty(t,"__esModule",{value:!0}),t.default={set:function(e,t){var r=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("object"===o(e))Object.keys(e).forEach(function(n){r.set(n,e[n],t)});else{if("object"===o(t))try{t=JSON.stringify(t)}catch(e){console.error("value should be string")}var u=n(e)+"="+n(t);if(i.expires){var c=void 0,s=void 0;switch(o(i.expires)){case"number":(c=new Date).setTime(c.getTime()+1e3*i.expires),s=i.expires;break;case"string":s=((c=new Date(c))-new Date)/1e3;break;default:c=i.expires,s=(i.expires-new Date)/1e3}u+="; expires="+c.toUTCString()+"; max-age="+s}i.path&&(u+="; path="+i.path),i.domain&&(u+="; domain="+i.domain),i.secure&&(u+="; secure"),document.cookie=u}return this},get:function(e){var t=this.getAll()||{};if("array"===o(e)){for(var r={},n=e.length,i=0;i<n;i++)r[e[i]]=t[e[i]];return r}return t[e]},getAll:function(){if(""===document.cookie)return null;for(var e,t=document.cookie.split("; "),r=t.length,n={},o=0;o<r;o++){var u=t[o].split("="),c=(e=u.shift(),decodeURIComponent(e)),s=u.join("=");n[c]=i(s)?JSON.parse(s):s}return n},remove:function(e){if("array"===o(e))for(var t=e.length,r=0;r<t;r++)this.remove(e[r]);else this.set(e,"",{maxAge:0});return this},empty:function(){var e=this.getAll()||{};this.remove(Object.keys(e))},has:function(e){var t=n(e)+"=";return document.cookie.indexOf(t)>-1},enabled:function(){if(navigator.cookieEnabled)return!0;var e="test"===this.set("__test__","test").get("__test__");return this.remove("__test__"),e}}}])});