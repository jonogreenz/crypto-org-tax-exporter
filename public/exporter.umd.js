!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e||self).cryptoOrgTaxExporter={})}(this,function(e){var t="undefined"!=typeof globalThis&&globalThis||"undefined"!=typeof self&&self||void 0!==t&&t,r={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(r.arrayBuffer)var n=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],o=ArrayBuffer.isView||function(e){return e&&n.indexOf(Object.prototype.toString.call(e))>-1};function i(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e)||""===e)throw new TypeError('Invalid character in header field name: "'+e+'"');return e.toLowerCase()}function s(e){return"string"!=typeof e&&(e=String(e)),e}function a(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return r.iterable&&(t[Symbol.iterator]=function(){return t}),t}function u(e){this.map={},e instanceof u?e.forEach(function(e,t){this.append(t,e)},this):Array.isArray(e)?e.forEach(function(e){this.append(e[0],e[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function c(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function f(e){return new Promise(function(t,r){e.onload=function(){t(e.result)},e.onerror=function(){r(e.error)}})}function h(e){var t=new FileReader,r=f(t);return t.readAsArrayBuffer(e),r}function d(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function y(){return this.bodyUsed=!1,this._initBody=function(e){var t;this.bodyUsed=this.bodyUsed,this._bodyInit=e,e?"string"==typeof e?this._bodyText=e:r.blob&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:r.formData&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:r.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():r.arrayBuffer&&r.blob&&(t=e)&&DataView.prototype.isPrototypeOf(t)?(this._bodyArrayBuffer=d(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):r.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(e)||o(e))?this._bodyArrayBuffer=d(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):r.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},r.blob&&(this.blob=function(){var e=c(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?c(this)||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer)):this.blob().then(h)}),this.text=function(){var e,t,r,n=c(this);if(n)return n;if(this._bodyBlob)return e=this._bodyBlob,r=f(t=new FileReader),t.readAsText(e),r;if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),r=new Array(t.length),n=0;n<t.length;n++)r[n]=String.fromCharCode(t[n]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},r.formData&&(this.formData=function(){return this.text().then(b)}),this.json=function(){return this.text().then(JSON.parse)},this}u.prototype.append=function(e,t){e=i(e),t=s(t);var r=this.map[e];this.map[e]=r?r+", "+t:t},u.prototype.delete=function(e){delete this.map[i(e)]},u.prototype.get=function(e){return e=i(e),this.has(e)?this.map[e]:null},u.prototype.has=function(e){return this.map.hasOwnProperty(i(e))},u.prototype.set=function(e,t){this.map[i(e)]=s(t)},u.prototype.forEach=function(e,t){for(var r in this.map)this.map.hasOwnProperty(r)&&e.call(t,this.map[r],r,this)},u.prototype.keys=function(){var e=[];return this.forEach(function(t,r){e.push(r)}),a(e)},u.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),a(e)},u.prototype.entries=function(){var e=[];return this.forEach(function(t,r){e.push([r,t])}),a(e)},r.iterable&&(u.prototype[Symbol.iterator]=u.prototype.entries);var l=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function p(e,t){if(!(this instanceof p))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');var r,n,o=(t=t||{}).body;if(e instanceof p){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new u(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,o||null==e._bodyInit||(o=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new u(t.headers)),this.method=(n=(r=t.method||this.method||"GET").toUpperCase(),l.indexOf(n)>-1?n:r),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(o),!("GET"!==this.method&&"HEAD"!==this.method||"no-store"!==t.cache&&"no-cache"!==t.cache)){var i=/([?&])_=[^&]*/;i.test(this.url)?this.url=this.url.replace(i,"$1_="+(new Date).getTime()):this.url+=(/\?/.test(this.url)?"&":"?")+"_="+(new Date).getTime()}}function b(e){var t=new FormData;return e.trim().split("&").forEach(function(e){if(e){var r=e.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");t.append(decodeURIComponent(n),decodeURIComponent(o))}}),t}function m(e,t){if(!(this instanceof m))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');t||(t={}),this.type="default",this.status=void 0===t.status?200:t.status,this.ok=this.status>=200&&this.status<300,this.statusText=void 0===t.statusText?"":""+t.statusText,this.headers=new u(t.headers),this.url=t.url||"",this._initBody(e)}p.prototype.clone=function(){return new p(this,{body:this._bodyInit})},y.call(p.prototype),y.call(m.prototype),m.prototype.clone=function(){return new m(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new u(this.headers),url:this.url})},m.error=function(){var e=new m(null,{status:0,statusText:""});return e.type="error",e};var v=[301,302,303,307,308];m.redirect=function(e,t){if(-1===v.indexOf(t))throw new RangeError("Invalid status code");return new m(null,{status:t,headers:{location:e}})};var w=t.DOMException;try{new w}catch(e){(w=function(e,t){this.message=e,this.name=t;var r=Error(e);this.stack=r.stack}).prototype=Object.create(Error.prototype),w.prototype.constructor=w}function g(e,n){return new Promise(function(o,i){var a=new p(e,n);if(a.signal&&a.signal.aborted)return i(new w("Aborted","AbortError"));var c=new XMLHttpRequest;function f(){c.abort()}c.onload=function(){var e,t,r={status:c.status,statusText:c.statusText,headers:(e=c.getAllResponseHeaders()||"",t=new u,e.replace(/\r?\n[\t ]+/g," ").split("\r").map(function(e){return 0===e.indexOf("\n")?e.substr(1,e.length):e}).forEach(function(e){var r=e.split(":"),n=r.shift().trim();if(n){var o=r.join(":").trim();t.append(n,o)}}),t)};r.url="responseURL"in c?c.responseURL:r.headers.get("X-Request-URL");var n="response"in c?c.response:c.responseText;setTimeout(function(){o(new m(n,r))},0)},c.onerror=function(){setTimeout(function(){i(new TypeError("Network request failed"))},0)},c.ontimeout=function(){setTimeout(function(){i(new TypeError("Network request failed"))},0)},c.onabort=function(){setTimeout(function(){i(new w("Aborted","AbortError"))},0)},c.open(a.method,function(e){try{return""===e&&t.location.href?t.location.href:e}catch(t){return e}}(a.url),!0),"include"===a.credentials?c.withCredentials=!0:"omit"===a.credentials&&(c.withCredentials=!1),"responseType"in c&&(r.blob?c.responseType="blob":r.arrayBuffer&&a.headers.get("Content-Type")&&-1!==a.headers.get("Content-Type").indexOf("application/octet-stream")&&(c.responseType="arraybuffer")),!n||"object"!=typeof n.headers||n.headers instanceof u?a.headers.forEach(function(e,t){c.setRequestHeader(t,e)}):Object.getOwnPropertyNames(n.headers).forEach(function(e){c.setRequestHeader(e,s(n.headers[e]))}),a.signal&&(a.signal.addEventListener("abort",f),c.onreadystatechange=function(){4===c.readyState&&a.signal.removeEventListener("abort",f)}),c.send(void 0===a._bodyInit?null:a._bodyInit)})}g.polyfill=!0,t.fetch||(t.fetch=g,t.Headers=u,t.Request=p,t.Response=m);var A=self.fetch.bind(self);function T(e,t,r){if(!e.s){if(r instanceof _){if(!r.s)return void(r.o=T.bind(null,e,t));1&t&&(t=r.s),r=r.v}if(r&&r.then)return void r.then(T.bind(null,e,t),T.bind(null,e,2));e.s=t,e.v=r;const n=e.o;n&&n(e)}}var _=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(t,r){var n=new e,o=this.s;if(o){var i=1&o?t:r;if(i){try{T(n,1,i(this.v))}catch(e){T(n,2,e)}return n}return this}return this.o=function(e){try{var o=e.v;1&e.s?T(n,1,t?t(o):o):r?T(n,1,r(o)):T(n,2,o)}catch(e){T(n,2,e)}},n},e}();function B(e){return e instanceof _&&1&e.s}var E=function(e,t){try{return console.log(A),Promise.resolve(A("https://crypto.org/explorer/api/v1/accounts/"+e+"/transactions?page="+t+"&limit=1000")).then(function(e){return Promise.resolve(e.json()).then(function(e){if(!e)throw Error("Failed to fetch");return[e.result,e.pagination]})})}catch(e){return Promise.reject(e)}};function C(e){if("string"==typeof e)return(1e-8*parseInt(e,10)).toFixed(8);var t=e.denom,r=parseInt(e.amount,10);if("basecro"===t)return(1e-8*r).toFixed(8);throw new Error("Unsupported currency type")}e.extractHistory=function(e){return Promise.resolve(function(e){return Promise.resolve(E(e,1)).then(function(t){var r=t[0],n=t[1],o=r,i=2,s=function(e,t,r){for(var n;;){var o=e();if(B(o)&&(o=o.v),!o)return i;if(o.then){n=0;break}var i=r();if(i&&i.then){if(!B(i)){n=1;break}i=i.s}if(t){var s=t();if(s&&s.then&&!B(s)){n=2;break}}}var a=new _,u=T.bind(null,a,2);return(0===n?o.then(f):1===n?i.then(c):s.then(h)).then(void 0,u),a;function c(n){i=n;do{if(t&&(s=t())&&s.then&&!B(s))return void s.then(h).then(void 0,u);if(!(o=e())||B(o)&&!o.v)return void T(a,1,i);if(o.then)return void o.then(f).then(void 0,u);B(i=r())&&(i=i.v)}while(!i||!i.then);i.then(c).then(void 0,u)}function f(e){e?(i=r())&&i.then?i.then(c).then(void 0,u):c(i):T(a,1,i)}function h(){(o=e())?o.then?o.then(f).then(void 0,u):f(o):T(a,1,i)}}(function(){return i<n.total_page},function(){return i++},function(){return Promise.resolve(E(e,i)).then(function(e){o=[].concat(r,e[0])})});return s&&s.then?s.then(function(){return o}):o})}(e)).then(function(t){return Promise.resolve(function(e,t){try{var r=t.filter(function(e){return e.success}).flatMap(function(t){return t.messages.map(function(r){var n={date:t.blockTime,memo:t.memo?t.memo+" "+t.hash:t.hash};switch(r.type){case"/cosmos.bank.v1beta1.MsgSend":r.content.fromAddress===e?(n.type="send",n.sendCurrency="CRO",n.sendAmount=C(r.content.amount[0]),n.feeCurrency="CRO",n.feeAmount=C(t.fee[0])):(n.type="receive",n.receiveCurrency="CRO",n.receiveAmount=C(r.content.amount[0]));break;case"/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward":n.type="reward",n.receiveCurrency="CRO",n.receiveAmount=C(r.content.amount[0]);break;case"/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission":n.type="mining",n.receiveCurrency="CRO",n.receiveAmount=C(r.content.amount[0]);break;case"/cosmos.staking.v1beta1.MsgDelegate":case"/cosmos.staking.v1beta1.MsgBeginRedelegate":case"/cosmos.staking.v1beta1.MsgUndelegate":n.type="reward",n.receiveCurrency="CRO",n.receiveAmount=C(r.content.autoClaimedRewards.amount);break;case"/cosmos.ibc.v1beta1.MsgTransfer":r.content.params.receiver===e?(n.type="send",n.sendCurrency="CRO",n.sendAmount=C(r.content.params.packetData.amount),n.feeCurrency="CRO",n.feeAmount=C(t.fee[0])):(n.type="receive",n.receiveCurrency="CRO",n.receiveAmount=C(r.content.amount[0]))}return n})});return Promise.resolve(r)}catch(e){return Promise.reject(e)}}(e,t))})},e.formatCsvCryptoCom=function(e){return"Date,Type,Received Currency,Received Amount,Received Net Worth,Sent Currency,Sent Amount,Sent Net Worth,Fee Currency,Fee Amount,Fee Net Worth,Description\n"+e.map(function(e){return[(t=e.date,r=new Date(t),r.getFullYear()+"-"+("0"+(r.getMonth()+1)).slice(-2)+"-"+("0"+r.getDate()).slice(-2)+" "+("0"+r.getHours()).slice(-2)+":"+("0"+r.getMinutes()).slice(-2)+":"+("0"+r.getSeconds()).slice(-2)),e.type,e.receiveCurrency||"",e.receiveAmount||"","",e.sendCurrency||"",e.sendAmount||"","",e.feeCurrency||"",e.feeAmount||"","",e.memo].join(",");var t,r}).join("\n")}});
//# sourceMappingURL=exporter.umd.js.map
