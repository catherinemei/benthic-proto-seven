(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const le=(e,t)=>e===t,ae=Symbol("solid-track"),U={equals:le};let Z=ie;const E=1,I=2,z={owned:null,cleanups:null,context:null,owner:null};var b=null;let _=null,ce=null,T=null,w=null,D=null,K=0;function M(e,t){const n=T,i=b,o=e.length===0,s=t===void 0?i:t,l=o?z:{owned:null,cleanups:null,context:s?s.context:null,owner:s},r=o?e:()=>e(()=>N(()=>R(l)));b=l,T=null;try{return $(r,!0)}finally{T=n,b=i}}function P(e,t){t=t?Object.assign({},U,t):U;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},i=o=>(typeof o=="function"&&(o=o(n.value)),ne(n,o));return[te.bind(n),i]}function G(e,t,n){const i=Y(e,t,!1,E);v(i)}function pe(e,t,n){Z=he;const i=Y(e,t,!1,E);(!n||!n.render)&&(i.user=!0),D?D.push(i):v(i)}function O(e,t,n){n=n?Object.assign({},U,n):U;const i=Y(e,t,!0,0);return i.observers=null,i.observerSlots=null,i.comparator=n.equals||void 0,v(i),te.bind(i)}function N(e){if(T===null)return e();const t=T;T=null;try{return e()}finally{T=t}}function ue(e){pe(()=>N(e))}function ee(e){return b===null||(b.cleanups===null?b.cleanups=[e]:b.cleanups.push(e)),e}function te(){if(this.sources&&this.state)if(this.state===E)v(this);else{const e=w;w=null,$(()=>j(this),!1),w=e}if(T){const e=this.observers?this.observers.length:0;T.sources?(T.sources.push(this),T.sourceSlots.push(e)):(T.sources=[this],T.sourceSlots=[e]),this.observers?(this.observers.push(T),this.observerSlots.push(T.sources.length-1)):(this.observers=[T],this.observerSlots=[T.sources.length-1])}return this.value}function ne(e,t,n){let i=e.value;return(!e.comparator||!e.comparator(i,t))&&(e.value=t,e.observers&&e.observers.length&&$(()=>{for(let o=0;o<e.observers.length;o+=1){const s=e.observers[o],l=_&&_.running;l&&_.disposed.has(s),(l?!s.tState:!s.state)&&(s.pure?w.push(s):D.push(s),s.observers&&oe(s)),l||(s.state=E)}if(w.length>1e6)throw w=[],new Error},!1)),t}function v(e){if(!e.fn)return;R(e);const t=K;de(e,e.value,t)}function de(e,t,n){let i;const o=b,s=T;T=b=e;try{i=e.fn(t)}catch(l){return e.pure&&(e.state=E,e.owned&&e.owned.forEach(R),e.owned=null),e.updatedAt=n+1,se(l)}finally{T=s,b=o}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?ne(e,i):e.value=i,e.updatedAt=n)}function Y(e,t,n,i=E,o){const s={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:b,context:b?b.context:null,pure:n};return b===null||b!==z&&(b.owned?b.owned.push(s):b.owned=[s]),s}function H(e){if(e.state===0)return;if(e.state===I)return j(e);if(e.suspense&&N(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<K);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===E)v(e);else if(e.state===I){const i=w;w=null,$(()=>j(e,t[0]),!1),w=i}}function $(e,t){if(w)return e();let n=!1;t||(w=[]),D?n=!0:D=[],K++;try{const i=e();return fe(n),i}catch(i){n||(D=null),w=null,se(i)}}function fe(e){if(w&&(ie(w),w=null),e)return;const t=D;D=null,t.length&&$(()=>Z(t),!1)}function ie(e){for(let t=0;t<e.length;t++)H(e[t])}function he(e){let t,n=0;for(t=0;t<e.length;t++){const i=e[t];i.user?e[n++]=i:H(i)}for(t=0;t<n;t++)H(e[t])}function j(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const i=e.sources[n];if(i.sources){const o=i.state;o===E?i!==t&&(!i.updatedAt||i.updatedAt<K)&&H(i):o===I&&j(i,t)}}}function oe(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=I,n.pure?w.push(n):D.push(n),n.observers&&oe(n))}}function R(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),i=e.sourceSlots.pop(),o=n.observers;if(o&&o.length){const s=o.pop(),l=n.observerSlots.pop();i<o.length&&(s.sourceSlots[l]=i,o[i]=s,n.observerSlots[i]=l)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)R(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function me(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function se(e,t=b){throw me(e)}const ge=Symbol("fallback");function X(e){for(let t=0;t<e.length;t++)e[t]()}function ye(e,t,n={}){let i=[],o=[],s=[],l=0,r=t.length>1?[]:null;return ee(()=>X(s)),()=>{let h=e()||[],d,c;return h[ae],N(()=>{let y=h.length,a,g,f,u,p,m,C,L,k;if(y===0)l!==0&&(X(s),s=[],i=[],o=[],l=0,r&&(r=[])),n.fallback&&(i=[ge],o[0]=M(re=>(s[0]=re,n.fallback())),l=1);else if(l===0){for(o=new Array(y),c=0;c<y;c++)i[c]=h[c],o[c]=M(A);l=y}else{for(f=new Array(y),u=new Array(y),r&&(p=new Array(y)),m=0,C=Math.min(l,y);m<C&&i[m]===h[m];m++);for(C=l-1,L=y-1;C>=m&&L>=m&&i[C]===h[L];C--,L--)f[L]=o[C],u[L]=s[C],r&&(p[L]=r[C]);for(a=new Map,g=new Array(L+1),c=L;c>=m;c--)k=h[c],d=a.get(k),g[c]=d===void 0?-1:d,a.set(k,c);for(d=m;d<=C;d++)k=i[d],c=a.get(k),c!==void 0&&c!==-1?(f[c]=o[d],u[c]=s[d],r&&(p[c]=r[d]),c=g[c],a.set(k,c)):s[d]();for(c=m;c<y;c++)c in f?(o[c]=f[c],s[c]=u[c],r&&(r[c]=p[c],r[c](c))):o[c]=M(A);o=o.slice(0,l=y),i=h.slice(0)}return o});function A(y){if(s[c]=y,r){const[a,g]=P(c);return r[c]=g,t(h[c],a)}return t(h[c])}}}function S(e,t){return N(()=>e(t||{}))}const Ce=e=>`Stale read from <${e}>.`;function Te(e){const t="fallback"in e&&{fallback:()=>e.fallback};return O(ye(()=>e.each,e.children,t||void 0))}function be(e){const t=e.keyed,n=O(()=>e.when,void 0,{equals:(i,o)=>t?i===o:!i==!o});return O(()=>{const i=n();if(i){const o=e.children;return typeof o=="function"&&o.length>0?N(()=>o(t?i:()=>{if(!N(n))throw Ce("Show");return e.when})):o}return e.fallback},void 0,void 0)}function we(e,t,n){let i=n.length,o=t.length,s=i,l=0,r=0,h=t[o-1].nextSibling,d=null;for(;l<o||r<s;){if(t[l]===n[r]){l++,r++;continue}for(;t[o-1]===n[s-1];)o--,s--;if(o===l){const c=s<i?r?n[r-1].nextSibling:n[s-r]:h;for(;r<s;)e.insertBefore(n[r++],c)}else if(s===r)for(;l<o;)(!d||!d.has(t[l]))&&t[l].remove(),l++;else if(t[l]===n[s-1]&&n[r]===t[o-1]){const c=t[--o].nextSibling;e.insertBefore(n[r++],t[l++].nextSibling),e.insertBefore(n[--s],c),t[o]=n[s]}else{if(!d){d=new Map;let A=r;for(;A<s;)d.set(n[A],A++)}const c=d.get(t[l]);if(c!=null)if(r<c&&c<s){let A=l,y=1,a;for(;++A<o&&A<s&&!((a=d.get(t[A]))==null||a!==c+y);)y++;if(y>c-r){const g=t[l];for(;r<c;)e.insertBefore(n[r++],g)}else e.replaceChild(n[r++],t[l++])}else l++;else t[l++].remove()}}}const Q="_$DX_DELEGATE";function Ae(e,t,n,i={}){let o;return M(s=>{o=s,t===document?e():F(t,e(),t.firstChild?null:void 0,n)},i.owner),()=>{o(),t.textContent=""}}function V(e,t,n){let i;const o=()=>{const l=document.createElement("template");return l.innerHTML=e,n?l.content.firstChild.firstChild:l.content.firstChild},s=t?()=>N(()=>document.importNode(i||(i=o()),!0)):()=>(i||(i=o())).cloneNode(!0);return s.cloneNode=s,s}function Le(e,t=window.document){const n=t[Q]||(t[Q]=new Set);for(let i=0,o=e.length;i<o;i++){const s=e[i];n.has(s)||(n.add(s),t.addEventListener(s,De))}}function B(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function F(e,t,n,i){if(n!==void 0&&!i&&(i=[]),typeof t!="function")return W(e,t,i,n);G(o=>W(e,t(),o,n),i)}function De(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}});n;){const i=n[t];if(i&&!n.disabled){const o=n[`${t}Data`];if(o!==void 0?i.call(n,o,e):i.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function W(e,t,n,i,o){for(;typeof n=="function";)n=n();if(t===n)return n;const s=typeof t,l=i!==void 0;if(e=l&&n[0]&&n[0].parentNode||e,s==="string"||s==="number")if(s==="number"&&(t=t.toString()),l){let r=n[0];r&&r.nodeType===3?r.data!==t&&(r.data=t):r=document.createTextNode(t),n=x(e,n,i,r)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t;else if(t==null||s==="boolean")n=x(e,n,i);else{if(s==="function")return G(()=>{let r=t();for(;typeof r=="function";)r=r();n=W(e,r,n,i)}),()=>n;if(Array.isArray(t)){const r=[],h=n&&Array.isArray(n);if(q(r,t,n,o))return G(()=>n=W(e,r,n,i,!0)),()=>n;if(r.length===0){if(n=x(e,n,i),l)return n}else h?n.length===0?J(e,r,i):we(e,n,r):(n&&x(e),J(e,r));n=r}else if(t.nodeType){if(Array.isArray(n)){if(l)return n=x(e,n,i,t);x(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function q(e,t,n,i){let o=!1;for(let s=0,l=t.length;s<l;s++){let r=t[s],h=n&&n[s],d;if(!(r==null||r===!0||r===!1))if((d=typeof r)=="object"&&r.nodeType)e.push(r);else if(Array.isArray(r))o=q(e,r,h)||o;else if(d==="function")if(i){for(;typeof r=="function";)r=r();o=q(e,Array.isArray(r)?r:[r],Array.isArray(h)?h:[h])||o}else e.push(r),o=!0;else{const c=String(r);h&&h.nodeType===3&&h.data===c?e.push(h):e.push(document.createTextNode(c))}}return o}function J(e,t,n=null){for(let i=0,o=t.length;i<o;i++)e.insertBefore(t[i],n)}function x(e,t,n,i){if(n===void 0)return e.textContent="";const o=i||document.createTextNode("");if(t.length){let s=!1;for(let l=t.length-1;l>=0;l--){const r=t[l];if(o!==r){const h=r.parentNode===e;!s&&!l?h?e.replaceChild(o,r):e.insertBefore(o,n):h&&r.remove()}else s=!0}}else e.insertBefore(o,n);return[o]}var Ne=V("<div><ul id=home tabindex=0 aria-live=assertive>"),Ee=V("<li>None"),ke=V("<li tabindex=0><span>: </span><button>Contains</button><button>Belongs To");function Be(e){const[t,n]=P(e.nodeGraph[0].id),[i,o]=P(["0"]),[s,l]=P(new Map),[r,h]=P([e.nodeGraph[0]]),d=(a,g)=>{if(a==="-1"||g==="-1"||!a||!g)return;const f=A(a);let u=g;if(f.includes(g)){const p=i();p.pop(),o([...p,g])}else if(g===`node-${a}-belongsto`){const p=e.nodeGraph[a].parents;if(p.length===0)return;const m=p.map(L=>e.nodeGraph[L]);h(m);const C=i();C.pop(),o([...C]),u=p[0]}else if(g===`node-${a}-contains`){const p=e.nodeGraph[a].children;if(p.length===0)return;h(p.map(C=>e.nodeGraph[C]));const m=i();o([...m,a]),u=p[0]}n(u),setTimeout(()=>{const p=document.getElementById(`info-${u}`);p&&(p.hasAttribute("tabindex")||p.setAttribute("tabindex","0"),p.focus())},0)},c=O(()=>t()!==null?e.nodeGraph[t()]:e.nodeGraph[0]),A=a=>{if(i().length===1)return[];{const g=i()[i().length-2];return e.nodeGraph[g].children.filter(p=>p!==a)}},y=a=>{if(a.key==="ArrowUp"&&a.shiftKey){const f=document.activeElement?.id,u=f.split("-")[1];if(f.startsWith("info-")){const p=document.getElementById(`node-${u}-belongsto`);p&&p.click()}else a.preventDefault();a.preventDefault()}else if(a.key==="ArrowDown"&&a.shiftKey){const f=document.activeElement?.id,u=f.split("-")[1];if(f.startsWith("info-")){const p=document.getElementById(`node-${u}-contains`);p&&p.click()}else a.preventDefault();a.preventDefault()}else if(a.key==="h"){const g=document.getElementById("home"),f=i()[i().length-1],u=document.getElementById(`info-${f}`);u?u.focus():g?.focus()}else if(a.key==="Backspace")o(g=>{const f=[...g];f.pop();const u=f[f.length-1];if(u){const p=document.getElementById("undo-text");p&&p.focus(),n(u),setTimeout(()=>{const m=document.getElementById(`info-${u}`);m&&m.focus()},1e3)}return f});else if(a.key==="ArrowLeft"||a.key==="ArrowRight"||a.key==="ArrowUp"||a.key==="ArrowDown"){const g=document.activeElement,f=g?.id;if(f.startsWith("info-")||f==="home"){const u=Array.from(document.querySelectorAll("#home li")),p=u.indexOf(g);let m=p;(a.key==="ArrowLeft"||a.key==="ArrowUp")&&p>0?m=p-1:(a.key==="ArrowRight"||a.key==="ArrowDown")&&p<u.length-1&&(m=p+1);const C=u[m]?.id.split("info-")[1];if(C){const L=i();L.pop(),o([...L,C]),n(C)}u[m]?.focus(),a.preventDefault()}else if(f.startsWith("context")){const u=Array.from(document.querySelectorAll("#parent-context li")),p=u.indexOf(g);let m=p;(a.key==="ArrowLeft"||a.key==="ArrowUp")&&p>0?(m=p-1,u[m]?.focus()):(a.key==="ArrowRight"||a.key==="ArrowDown")&&p<u.length-1?(m=p+1,u[m]?.focus()):((a.key==="ArrowLeft"||a.key==="ArrowUp")&&p<=0||(a.key==="ArrowRight"||a.key==="ArrowDown")&&p>=u.length-1)&&document.getElementById("parents-group")?.focus(),a.preventDefault()}else f==="parents-group"&&Array.from(document.querySelectorAll("#option-nodes li"))[0]?.focus(),a.preventDefault()}else if(a.key==="Enter"){const f=document.activeElement?.id;if(f.startsWith("info-")){const u=e.nodeGraph[t()].children[0];if(u){o(m=>[...m,u]),n(u);const p=document.getElementById(`info-${u}`);p&&p.focus()}}else if(f.startsWith("context")){const u=f.split("-")[3];let p=i();p.pop(),p.pop(),o(C=>[...p,u,t()]),n(t());const m=document.getElementById(`info-${t()}`);m&&m.focus()}else a.preventDefault()}else a.preventDefault()};return ue(()=>{const a=Pe(e.nodeGraph);l(a),window.addEventListener("keydown",y)}),ee(()=>{window.removeEventListener("keydown",y)}),S(be,{get when(){return t()},get children(){return S(xe,{get displayedNodes(){return r()},get node(){return c()},get nodeGraph(){return e.nodeGraph},onNodeClick:d})}})}function xe(e){return(()=>{var t=Ne(),n=t.firstChild;return F(n,S(Te,{get each(){return e.displayedNodes},get fallback(){return(()=>{var i=Ee();return i.style.setProperty("color","grey"),i})()},children:i=>(()=>{var o=ke(),s=o.firstChild,l=s.firstChild,r=s.nextSibling,h=r.nextSibling;return F(s,()=>i.displayName,l),F(s,()=>i.descriptionTokens?.longDescription,null),r.$$click=()=>e.onNodeClick(i.id,`node-${i.id}-contains`),h.$$click=()=>e.onNodeClick(i.id,`node-${i.id}-belongsto`),G(d=>{var c=`info-${i.id}`,A=`Node ${i.displayName}, ${i.descriptionTokens?.longDescription} Press shift down arrow view children or shift up arrow view parents.`,y=`Contains button for ${i.displayName}. Press to navigate to its children.`,a=`node-${i.id}-contains`,g=`Belongs To button for ${i.displayName}. Press to navigate to its parents.`,f=`node-${i.id}-belongsto`;return c!==d.e&&B(o,"id",d.e=c),A!==d.t&&B(o,"aria-label",d.t=A),y!==d.a&&B(r,"aria-label",d.a=y),a!==d.o&&B(r,"id",d.o=a),g!==d.i&&B(h,"aria-label",d.i=g),f!==d.n&&B(h,"id",d.n=f),d},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0}),o})()})),t})()}function Pe(e,t="0"){const n=new Map,i=[[t,[t]]];for(;i.length>0;){const[o,s]=i.shift();if(n.has(o))continue;n.set(o,s);const l=e[o].children;for(const r of l)n.has(r)||i.push([r,[...s,r]])}return n}Le(["click"]);const Se={0:{id:"0",displayName:"Stacked Bar Chart",description:"Major Trophies for some English teams. Stacked bar chart. With axes team and sum trophies.",descriptionTokens:{label:"Stacked Bar Chart",shortDescription:"Major Trophies for some English teams.",longDescription:"Major Trophies for some English teams. Stacked bar chart. With axes team and sum trophies."},parents:[],children:["1","2","22"],priority:0},1:{id:"1",displayName:"X-axis",description:"X Axis. Arsenal, Chelsea, Liverpool, Manchester United.",descriptionTokens:{label:"X-axis",shortDescription:"Contains 4 teams.",longDescription:"Contains Arsenal, Chelsea, Liverpool, Manchester United."},parents:["0"],children:["3","4","5","6"],priority:1},2:{id:"2",displayName:"Legend",description:"Legend. Contest included: BPL, FA Cup, CL.",descriptionTokens:{label:"Legend",shortDescription:"Contains 3 contests.",longDescription:"Contains BPL, FA Cup, CL."},parents:["0"],children:["7","8","9"],priority:2},3:{id:"3",displayName:"Arsenal",description:"Team: Arsenal. Total trophies: 17. Contains: 3 contests. Bar representing the number of trophies won by Arsenal.",descriptionTokens:{label:"Arsenal",shortDescription:"Contains: 3 contests. Total trophies: 17.",longDescription:"Team: Arsenal. Total trophies: 17. Contains: 3 contests. Bar representing the number of trophies won by Arsenal."},parents:["1"],children:["10","11","12"],priority:2},4:{id:"4",displayName:"Chelsea",description:"Team: Chelsea. Total trophies: 15. Contains: 3 contests. Bar representing the number of trophies won by Chelsea.",descriptionTokens:{label:"Chelsea",shortDescription:"Contains: 3 contests. Total trophies: 15.",longDescription:"Team: Chelsea. Total trophies: 15. Contains: 3 contests. Bar representing the number of trophies won by Chelsea."},parents:["1"],children:["13","14","15"],priority:2},5:{id:"5",displayName:"Liverpool",description:"Team: Liverpool. Total trophies: 15. Contains: 3 contests. Bar representing the number of trophies won by Liverpool",descriptionTokens:{label:"Liverpool",shortDescription:"Contains: 3 contests. Total trophies: 15.",longDescription:"Team: Liverpool. Total trophies: 15. Contains: 3 contests. Bar representing the number of trophies won by Liverpool"},parents:["1"],children:["16","17","18"],priority:2},6:{id:"6",displayName:"Manchester",description:"Team: Manchester United. Total trophies: 28. Contains: 3 contests. Bar representing the number of trophies won by Manchester United.",descriptionTokens:{label:"Manchester United",shortDescription:"Contains: 3 contests. Total trophies: 28.",longDescription:"Team: Manchester United. Total trophies: 28. Contains: 3 contests. Bar representing the number of trophies won by Manchester United."},parents:["1"],children:["19","20","21"],priority:2},7:{id:"7",displayName:"BPL",description:"Contest: BPL. Total trophies: 22. Contains: 4 teams. Legend grouping for the BPL competition.",descriptionTokens:{label:"BPL",shortDescription:"Contains: 4 teams. Total trophies: 22.",longDescription:"Contest: BPL. Total trophies: 22. Contains: 4 teams. Legend grouping for the BPL competition."},parents:["2"],children:["10","13","16","19"],priority:3},8:{id:"8",displayName:"FA Cup",description:"Contest: FA Cup. Total trophies: 42. Contains: 4 teams. Legend grouping for the FA Cup competition.",descriptionTokens:{label:"FA Cup",shortDescription:"Contains: 4 teams. Total trophies: 42.",longDescription:"Contest: FA Cup. Total trophies: 42. Contains: 4 teams. Legend grouping for the FA Cup competition."},parents:["2"],children:["11","14","17","20"],priority:3},9:{id:"9",displayName:"CL",description:"Contest: CL. Total trophies: 11. Contains: 4 teams. Legend grouping for the CL competition.",descriptionTokens:{label:"CL",shortDescription:"Contains: 4 teams. Total trophies: 11.",longDescription:"Contest: CL. Total trophies: 11. Contains: 4 teams. Legend grouping for the CL competition."},parents:["2"],children:["12","15","18","21"],priority:3},10:{id:"10",displayName:"Arsenal BPL",description:"Team: Arsenal. Contest: BPL. Trophies: 3. Data point.",descriptionTokens:{label:"Arsenal BPL",shortDescription:"Trophies: 3.",longDescription:"Team: Arsenal. Contest: BPL. Trophies: 3. Data point."},parents:["3","7"],children:[],priority:4},11:{id:"11",displayName:"Arsenal FA Cup",description:"Team: Arsenal. Contest: FA Cup. Trophies: 14. Data point.",descriptionTokens:{label:"Arsenal FA Cup",shortDescription:"Trophies: 14.",longDescription:"Team: Arsenal. Contest: FA Cup. Trophies: 14. Data point."},parents:["3","8"],children:[],priority:4},12:{id:"12",displayName:"Arsenal CL",description:"Team: Arsenal. Contest: CL. Trophies: 0. Data point.",descriptionTokens:{label:"Arsenal CL",shortDescription:"Trophies: 0.",longDescription:"Team: Arsenal. Contest: CL. Trophies: 0. Data point."},parents:["3","9"],children:[],priority:4},13:{id:"13",displayName:"Chelsea BPL",description:"Team: Chelsea. Contest: BPL. Trophies: 5. Data point.",descriptionTokens:{label:"Chelsea BPL",shortDescription:"Trophies: 5.",longDescription:"Team: Chelsea. Contest: BPL. Trophies: 5. Data point."},parents:["4","7"],children:[],priority:4},14:{id:"14",displayName:"Chelsea FA Cup",description:"Team: Chelsea. Contest: FA Cup. Trophies: 8. Data point.",descriptionTokens:{label:"Chelsea FA Cup",shortDescription:"Trophies: 8.",longDescription:"Team: Chelsea. Contest: FA Cup. Trophies: 8. Data point."},parents:["4","8"],children:[],priority:4},15:{id:"15",displayName:"Chelsea CL",description:"Team: Chelsea. Contest: CL. Trophies: 2. Data point.",descriptionTokens:{label:"Chelsea CL",shortDescription:"Trophies: 2.",longDescription:"Team: Chelsea. Contest: CL. Trophies: 2. Data point."},parents:["4","9"],children:[],priority:4},16:{id:"16",displayName:"Liverpool BPL",description:"Team: Liverpool. Contest: BPL. Trophies: 1. Data point.",descriptionTokens:{label:"Liverpool BPL",shortDescription:"Trophies: 1.",longDescription:"Team: Liverpool. Contest: BPL. Trophies: 1. Data point."},parents:["5","7"],children:[],priority:4},17:{id:"17",displayName:"Liverpool FA Cup",description:"Team: Liverpool. Contest: FA Cup. Trophies: 8. Data point.",descriptionTokens:{label:"Liverpool FA Cup",shortDescription:"Trophies: 8.",longDescription:"Team: Liverpool. Contest: FA Cup. Trophies: 8. Data point."},parents:["5","8"],children:[],priority:4},18:{id:"18",displayName:"Liverpool CL",description:"Team: Liverpool. Contest: CL. Trophies: 6. Data point.",descriptionTokens:{label:"Liverpool CL",shortDescription:"Trophies: 6.",longDescription:"Team: Liverpool. Contest: CL. Trophies: 6. Data point."},parents:["5","9"],children:[],priority:4},19:{id:"19",displayName:"Manchester BPL",description:"Team: Manchester United. Contest: BPL. Trophies: 13. Data point.",descriptionTokens:{label:"Manchester United BPL",shortDescription:"Trophies: 13.",longDescription:"Team: Manchester United. Contest: BPL. Trophies: 13. Data point."},parents:["6","7"],children:[],priority:4},20:{id:"20",displayName:"Manchester FA Cup",description:"Team: Manchester United. Contest: FA Cup. Trophies: 12. Data point.",descriptionTokens:{label:"Manchester United FA Cup",shortDescription:"Trophies: 12.",longDescription:"Team: Manchester United. Contest: FA Cup. Trophies: 12. Data point."},parents:["6","8"],children:[],priority:4},21:{id:"21",displayName:"Manchester United CL",description:"Team: Manchester United. Contest: CL. Trophies: 3. Data point.",descriptionTokens:{label:"Manchester United CL",shortDescription:"Trophies: 3.",longDescription:"Team: Manchester United. Contest: CL. Trophies: 3. Data point."},parents:["6","9"],children:[],priority:4},22:{id:"22",displayName:"Y-axis",description:"Y-axis. Label: count trophies. Values range from 0 to 30 on a numerical scale.",descriptionTokens:{label:"Y-axis",shortDescription:"Y-axis. Count trophies.",longDescription:"Y-axis. Label: count trophies. Values range from 0 to 30 on a numerical scale."},parents:["0"],children:[],priority:2}},ve=()=>S(Be,{nodeGraph:Se,showHypergraph:!1}),$e=document.getElementById("root");Ae(()=>S(ve,{}),$e);
