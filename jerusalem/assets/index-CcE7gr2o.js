(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Vc="170",rf=0,Nl=1,af=2,Ru=1,Cu=2,Qn=3,li=0,Yt=1,At=2,ai=0,ys=1,Sa=2,Fl=3,Ol=4,of=5,Xi=100,cf=101,lf=102,hf=103,uf=104,df=200,ff=201,pf=202,mf=203,qo=204,Yo=205,gf=206,bf=207,_f=208,xf=209,vf=210,Mf=211,yf=212,Sf=213,Ef=214,Ko=0,Jo=1,Zo=2,ws=3,Qo=4,$o=5,ec=6,tc=7,Pu=0,Tf=1,Af=2,Ri=0,Iu=1,Lu=2,Du=3,Wc=4,wf=5,Uu=6,Nu=7,zl="attached",Rf="detached",Fu=300,Rs=301,Cs=302,Ea=303,nc=304,Oa=306,An=1e3,Fn=1001,Ta=1002,Kt=1003,Ou=1004,rr=1005,It=1006,da=1007,On=1008,hi=1009,zu=1010,Bu=1011,gr=1012,Xc=1013,Zi=1014,Qt=1015,$t=1016,jc=1017,qc=1018,Ps=1020,ku=35902,Hu=1021,Gu=1022,un=1023,Vu=1024,Wu=1025,Ss=1026,Is=1027,Yc=1028,Kc=1029,Xu=1030,Jc=1031,Zc=1033,fa=33776,pa=33777,ma=33778,ga=33779,ic=35840,sc=35841,rc=35842,ac=35843,oc=36196,cc=37492,lc=37496,hc=37808,uc=37809,dc=37810,fc=37811,pc=37812,mc=37813,gc=37814,bc=37815,_c=37816,xc=37817,vc=37818,Mc=37819,yc=37820,Sc=37821,ba=36492,Ec=36494,Tc=36495,ju=36283,Ac=36284,wc=36285,Rc=36286,qu=2200,Yu=2201,Cf=2202,br=2300,_r=2301,no=2302,xs=2400,vs=2401,Aa=2402,Qc=2500,Pf=2501,If=0,Ku=1,Cc=2,Lf=3200,Df=3201,Ju=0,Uf=1,Ti="",St="srgb",Gt="srgb-linear",za="linear",ht="srgb",is=7680,Bl=519,Nf=512,Ff=513,Of=514,Zu=515,zf=516,Bf=517,kf=518,Hf=519,Pc=35044,kl="300 es",si=2e3,wa=2001;class $i{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Ot=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Hl=1234567;const lr=Math.PI/180,Ls=180/Math.PI;function Tn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ot[i&255]+Ot[i>>8&255]+Ot[i>>16&255]+Ot[i>>24&255]+"-"+Ot[e&255]+Ot[e>>8&255]+"-"+Ot[e>>16&15|64]+Ot[e>>24&255]+"-"+Ot[t&63|128]+Ot[t>>8&255]+"-"+Ot[t>>16&255]+Ot[t>>24&255]+Ot[n&255]+Ot[n>>8&255]+Ot[n>>16&255]+Ot[n>>24&255]).toLowerCase()}function Tt(i,e,t){return Math.max(e,Math.min(t,i))}function $c(i,e){return(i%e+e)%e}function Gf(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Vf(i,e,t){return i!==e?(t-i)/(e-i):0}function hr(i,e,t){return(1-t)*i+t*e}function Wf(i,e,t,n){return hr(i,e,1-Math.exp(-t*n))}function Xf(i,e=1){return e-Math.abs($c(i,e*2)-e)}function jf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function qf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Yf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Kf(i,e){return i+Math.random()*(e-i)}function Jf(i){return i*(.5-Math.random())}function Zf(i){i!==void 0&&(Hl=i);let e=Hl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Qf(i){return i*lr}function $f(i){return i*Ls}function ep(i){return(i&i-1)===0&&i!==0}function tp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function np(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ip(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),d=r((e-n)/2),u=a((e-n)/2),f=r((n-e)/2),p=a((n-e)/2);switch(s){case"XYX":i.set(o*h,c*d,c*u,o*l);break;case"YZY":i.set(c*u,o*h,c*d,o*l);break;case"ZXZ":i.set(c*d,c*u,o*h,o*l);break;case"XZX":i.set(o*h,c*p,c*f,o*l);break;case"YXY":i.set(c*f,o*h,c*p,o*l);break;case"ZYZ":i.set(c*p,c*f,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Mn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ut(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Dn={DEG2RAD:lr,RAD2DEG:Ls,generateUUID:Tn,clamp:Tt,euclideanModulo:$c,mapLinear:Gf,inverseLerp:Vf,lerp:hr,damp:Wf,pingpong:Xf,smoothstep:jf,smootherstep:qf,randInt:Yf,randFloat:Kf,randFloatSpread:Jf,seededRandom:Zf,degToRad:Qf,radToDeg:$f,isPowerOfTwo:ep,ceilPowerOfTwo:tp,floorPowerOfTwo:np,setQuaternionFromProperEuler:ip,normalize:ut,denormalize:Mn};class ue{constructor(e=0,t=0){ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qe{constructor(e,t,n,s,r,a,o,c,l){qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],_=s[0],g=s[3],m=s[6],v=s[1],x=s[4],b=s[7],E=s[2],S=s[5],A=s[8];return r[0]=a*_+o*v+c*E,r[3]=a*g+o*x+c*S,r[6]=a*m+o*b+c*A,r[1]=l*_+h*v+d*E,r[4]=l*g+h*x+d*S,r[7]=l*m+h*b+d*A,r[2]=u*_+f*v+p*E,r[5]=u*g+f*x+p*S,r[8]=u*m+f*b+p*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=h*a-o*l,u=o*c-h*r,f=l*r-a*c,p=t*d+n*u+s*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=d*_,e[1]=(s*l-h*n)*_,e[2]=(o*n-s*a)*_,e[3]=u*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(io.makeScale(e,t)),this}rotate(e){return this.premultiply(io.makeRotation(-e)),this}translate(e,t){return this.premultiply(io.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const io=new qe;function Qu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function xr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function sp(){const i=xr("canvas");return i.style.display="block",i}const Gl={};function ar(i){i in Gl||(Gl[i]=!0,console.warn(i))}function rp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function ap(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function op(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Qe={enabled:!0,workingColorSpace:Gt,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===ht&&(i.r=oi(i.r),i.g=oi(i.g),i.b=oi(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===ht&&(i.r=Es(i.r),i.g=Es(i.g),i.b=Es(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ti?za:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function oi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Es(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Vl=[.64,.33,.3,.6,.15,.06],Wl=[.2126,.7152,.0722],Xl=[.3127,.329],jl=new qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ql=new qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Qe.define({[Gt]:{primaries:Vl,whitePoint:Xl,transfer:za,toXYZ:jl,fromXYZ:ql,luminanceCoefficients:Wl,workingColorSpaceConfig:{unpackColorSpace:St},outputColorSpaceConfig:{drawingBufferColorSpace:St}},[St]:{primaries:Vl,whitePoint:Xl,transfer:ht,toXYZ:jl,fromXYZ:ql,luminanceCoefficients:Wl,outputColorSpaceConfig:{drawingBufferColorSpace:St}}});let ss;class cp{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ss===void 0&&(ss=xr("canvas")),ss.width=e.width,ss.height=e.height;const n=ss.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ss}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=xr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=oi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(oi(t[n]/255)*255):t[n]=oi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let lp=0;class $u{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:lp++}),this.uuid=Tn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(so(s[a].image)):r.push(so(s[a]))}else r=so(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function so(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?cp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let hp=0;class wt extends $i{constructor(e=wt.DEFAULT_IMAGE,t=wt.DEFAULT_MAPPING,n=Fn,s=Fn,r=It,a=On,o=un,c=hi,l=wt.DEFAULT_ANISOTROPY,h=Ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:hp++}),this.uuid=Tn(),this.name="",this.source=new $u(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Fu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case An:e.x=e.x-Math.floor(e.x);break;case Fn:e.x=e.x<0?0:1;break;case Ta:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case An:e.y=e.y-Math.floor(e.y);break;case Fn:e.y=e.y<0?0:1;break;case Ta:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}wt.DEFAULT_IMAGE=null;wt.DEFAULT_MAPPING=Fu;wt.DEFAULT_ANISOTROPY=1;class st{constructor(e=0,t=0,n=0,s=1){st.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],p=c[9],_=c[2],g=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(p+g)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(l+1)/2,b=(f+1)/2,E=(m+1)/2,S=(h+u)/4,A=(d+_)/4,R=(p+g)/4;return x>b&&x>E?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=S/n,r=A/n):b>E?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=S/s,r=R/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=A/r,s=R/r),this.set(n,s,r,t),this}let v=Math.sqrt((g-p)*(g-p)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(d-_)/v,this.z=(u-h)/v,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class up extends $i{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new st(0,0,e,t),this.scissorTest=!1,this.viewport=new st(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:It,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new wt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new $u(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fn extends up{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ed extends wt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class dp extends wt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jt{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3];const u=r[a+0],f=r[a+1],p=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=u,e[t+1]=f,e[t+2]=p,e[t+3]=_;return}if(d!==_||c!==u||l!==f||h!==p){let g=1-o;const m=c*u+l*f+h*p+d*_,v=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const E=Math.sqrt(x),S=Math.atan2(E,m*v);g=Math.sin(g*S)/E,o=Math.sin(o*S)/E}const b=o*v;if(c=c*g+u*b,l=l*g+f*b,h=h*g+p*b,d=d*g+_*b,g===1-o){const E=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=E,l*=E,h*=E,d*=E}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],p=r[a+3];return e[t]=o*p+h*d+c*f-l*u,e[t+1]=c*p+h*u+l*d-o*f,e[t+2]=l*p+h*f+o*u-c*d,e[t+3]=h*p-o*d-c*u-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),d=o(r/2),u=c(n/2),f=c(s/2),p=c(r/2);switch(a){case"XYZ":this._x=u*h*d+l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d+u*f*p;break;case"YZX":this._x=u*h*d+l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d-u*f*p;break;case"XZY":this._x=u*h*d-l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d+u*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Tt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),d=Math.sin((1-t)*h)/l,u=Math.sin(t*h)/l;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(e=0,t=0,n=0){z.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Yl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Yl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+c*l+a*d-o*h,this.y=n+c*h+o*l-r*d,this.z=s+c*d+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ro.copy(this).projectOnVector(e),this.sub(ro)}reflect(e){return this.sub(ro.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ro=new z,Yl=new Jt;class wn{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(bn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(bn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=bn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,bn):bn.fromBufferAttribute(r,a),bn.applyMatrix4(e.matrixWorld),this.expandByPoint(bn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Lr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Lr.copy(n.boundingBox)),Lr.applyMatrix4(e.matrixWorld),this.union(Lr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,bn),bn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ys),Dr.subVectors(this.max,Ys),rs.subVectors(e.a,Ys),as.subVectors(e.b,Ys),os.subVectors(e.c,Ys),mi.subVectors(as,rs),gi.subVectors(os,as),Ui.subVectors(rs,os);let t=[0,-mi.z,mi.y,0,-gi.z,gi.y,0,-Ui.z,Ui.y,mi.z,0,-mi.x,gi.z,0,-gi.x,Ui.z,0,-Ui.x,-mi.y,mi.x,0,-gi.y,gi.x,0,-Ui.y,Ui.x,0];return!ao(t,rs,as,os,Dr)||(t=[1,0,0,0,1,0,0,0,1],!ao(t,rs,as,os,Dr))?!1:(Ur.crossVectors(mi,gi),t=[Ur.x,Ur.y,Ur.z],ao(t,rs,as,os,Dr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const jn=[new z,new z,new z,new z,new z,new z,new z,new z],bn=new z,Lr=new wn,rs=new z,as=new z,os=new z,mi=new z,gi=new z,Ui=new z,Ys=new z,Dr=new z,Ur=new z,Ni=new z;function ao(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ni.fromArray(i,r);const o=s.x*Math.abs(Ni.x)+s.y*Math.abs(Ni.y)+s.z*Math.abs(Ni.z),c=e.dot(Ni),l=t.dot(Ni),h=n.dot(Ni);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const fp=new wn,Ks=new z,oo=new z;class Hn{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):fp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ks.subVectors(e,this.center);const t=Ks.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ks,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(oo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ks.copy(e.center).add(oo)),this.expandByPoint(Ks.copy(e.center).sub(oo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const qn=new z,co=new z,Nr=new z,bi=new z,lo=new z,Fr=new z,ho=new z;class Ba{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qn.copy(this.origin).addScaledVector(this.direction,t),qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){co.copy(e).add(t).multiplyScalar(.5),Nr.copy(t).sub(e).normalize(),bi.copy(this.origin).sub(co);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Nr),o=bi.dot(this.direction),c=-bi.dot(Nr),l=bi.lengthSq(),h=Math.abs(1-a*a);let d,u,f,p;if(h>0)if(d=a*c-o,u=a*o-c,p=r*h,d>=0)if(u>=-p)if(u<=p){const _=1/h;d*=_,u*=_,f=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u<=-p?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l):u<=p?(d=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(co).addScaledVector(Nr,u),f}intersectSphere(e,t){qn.subVectors(e.center,this.origin);const n=qn.dot(this.direction),s=qn.dot(qn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,qn)!==null}intersectTriangle(e,t,n,s,r){lo.subVectors(t,e),Fr.subVectors(n,e),ho.crossVectors(lo,Fr);let a=this.direction.dot(ho),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;bi.subVectors(this.origin,e);const c=o*this.direction.dot(Fr.crossVectors(bi,Fr));if(c<0)return null;const l=o*this.direction.dot(lo.cross(bi));if(l<0||c+l>a)return null;const h=-o*bi.dot(ho);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ze{constructor(e,t,n,s,r,a,o,c,l,h,d,u,f,p,_,g){ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,h,d,u,f,p,_,g)}set(e,t,n,s,r,a,o,c,l,h,d,u,f,p,_,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ze().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/cs.setFromMatrixColumn(e,0).length(),r=1/cs.setFromMatrixColumn(e,1).length(),a=1/cs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=a*h,f=a*d,p=o*h,_=o*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=f+p*l,t[5]=u-_*l,t[9]=-o*c,t[2]=_-u*l,t[6]=p+f*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*h,f=c*d,p=l*h,_=l*d;t[0]=u+_*o,t[4]=p*o-f,t[8]=a*l,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-p,t[6]=_+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*h,f=c*d,p=l*h,_=l*d;t[0]=u-_*o,t[4]=-a*d,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*h,t[9]=_-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*h,f=a*d,p=o*h,_=o*d;t[0]=c*h,t[4]=p*l-f,t[8]=u*l+_,t[1]=c*d,t[5]=_*l+u,t[9]=f*l-p,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,f=a*l,p=o*c,_=o*l;t[0]=c*h,t[4]=_-u*d,t[8]=p*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*d+p,t[10]=u-_*d}else if(e.order==="XZY"){const u=a*c,f=a*l,p=o*c,_=o*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=u*d+_,t[5]=a*h,t[9]=f*d-p,t[2]=p*d-f,t[6]=o*h,t[10]=_*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(pp,e,mp)}lookAt(e,t,n){const s=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),_i.crossVectors(n,nn),_i.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),_i.crossVectors(n,nn)),_i.normalize(),Or.crossVectors(nn,_i),s[0]=_i.x,s[4]=Or.x,s[8]=nn.x,s[1]=_i.y,s[5]=Or.y,s[9]=nn.y,s[2]=_i.z,s[6]=Or.z,s[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],_=n[6],g=n[10],m=n[14],v=n[3],x=n[7],b=n[11],E=n[15],S=s[0],A=s[4],R=s[8],M=s[12],y=s[1],P=s[5],U=s[9],T=s[13],w=s[2],L=s[6],O=s[10],V=s[14],N=s[3],q=s[7],W=s[11],ne=s[15];return r[0]=a*S+o*y+c*w+l*N,r[4]=a*A+o*P+c*L+l*q,r[8]=a*R+o*U+c*O+l*W,r[12]=a*M+o*T+c*V+l*ne,r[1]=h*S+d*y+u*w+f*N,r[5]=h*A+d*P+u*L+f*q,r[9]=h*R+d*U+u*O+f*W,r[13]=h*M+d*T+u*V+f*ne,r[2]=p*S+_*y+g*w+m*N,r[6]=p*A+_*P+g*L+m*q,r[10]=p*R+_*U+g*O+m*W,r[14]=p*M+_*T+g*V+m*ne,r[3]=v*S+x*y+b*w+E*N,r[7]=v*A+x*P+b*L+E*q,r[11]=v*R+x*U+b*O+E*W,r[15]=v*M+x*T+b*V+E*ne,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],f=e[14],p=e[3],_=e[7],g=e[11],m=e[15];return p*(+r*c*d-s*l*d-r*o*u+n*l*u+s*o*f-n*c*f)+_*(+t*c*f-t*l*u+r*a*u-s*a*f+s*l*h-r*c*h)+g*(+t*l*d-t*o*f-r*a*d+n*a*f+r*o*h-n*l*h)+m*(-s*o*h-t*c*d+t*o*u+s*a*d-n*a*u+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],f=e[11],p=e[12],_=e[13],g=e[14],m=e[15],v=d*g*l-_*u*l+_*c*f-o*g*f-d*c*m+o*u*m,x=p*u*l-h*g*l-p*c*f+a*g*f+h*c*m-a*u*m,b=h*_*l-p*d*l+p*o*f-a*_*f-h*o*m+a*d*m,E=p*d*c-h*_*c-p*o*u+a*_*u+h*o*g-a*d*g,S=t*v+n*x+s*b+r*E;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/S;return e[0]=v*A,e[1]=(_*u*r-d*g*r-_*s*f+n*g*f+d*s*m-n*u*m)*A,e[2]=(o*g*r-_*c*r+_*s*l-n*g*l-o*s*m+n*c*m)*A,e[3]=(d*c*r-o*u*r-d*s*l+n*u*l+o*s*f-n*c*f)*A,e[4]=x*A,e[5]=(h*g*r-p*u*r+p*s*f-t*g*f-h*s*m+t*u*m)*A,e[6]=(p*c*r-a*g*r-p*s*l+t*g*l+a*s*m-t*c*m)*A,e[7]=(a*u*r-h*c*r+h*s*l-t*u*l-a*s*f+t*c*f)*A,e[8]=b*A,e[9]=(p*d*r-h*_*r-p*n*f+t*_*f+h*n*m-t*d*m)*A,e[10]=(a*_*r-p*o*r+p*n*l-t*_*l-a*n*m+t*o*m)*A,e[11]=(h*o*r-a*d*r-h*n*l+t*d*l+a*n*f-t*o*f)*A,e[12]=E*A,e[13]=(h*_*s-p*d*s+p*n*u-t*_*u-h*n*g+t*d*g)*A,e[14]=(p*o*s-a*_*s-p*n*c+t*_*c+a*n*g-t*o*g)*A,e[15]=(a*d*s-h*o*s+h*n*c-t*d*c-a*n*u+t*o*u)*A,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,d=o+o,u=r*l,f=r*h,p=r*d,_=a*h,g=a*d,m=o*d,v=c*l,x=c*h,b=c*d,E=n.x,S=n.y,A=n.z;return s[0]=(1-(_+m))*E,s[1]=(f+b)*E,s[2]=(p-x)*E,s[3]=0,s[4]=(f-b)*S,s[5]=(1-(u+m))*S,s[6]=(g+v)*S,s[7]=0,s[8]=(p+x)*A,s[9]=(g-v)*A,s[10]=(1-(u+_))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=cs.set(s[0],s[1],s[2]).length();const a=cs.set(s[4],s[5],s[6]).length(),o=cs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],_n.copy(this);const l=1/r,h=1/a,d=1/o;return _n.elements[0]*=l,_n.elements[1]*=l,_n.elements[2]*=l,_n.elements[4]*=h,_n.elements[5]*=h,_n.elements[6]*=h,_n.elements[8]*=d,_n.elements[9]*=d,_n.elements[10]*=d,t.setFromRotationMatrix(_n),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=si){const c=this.elements,l=2*r/(t-e),h=2*r/(n-s),d=(t+e)/(t-e),u=(n+s)/(n-s);let f,p;if(o===si)f=-(a+r)/(a-r),p=-2*a*r/(a-r);else if(o===wa)f=-a/(a-r),p=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=p,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=si){const c=this.elements,l=1/(t-e),h=1/(n-s),d=1/(a-r),u=(t+e)*l,f=(n+s)*h;let p,_;if(o===si)p=(a+r)*d,_=-2*d;else if(o===wa)p=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-p,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const cs=new z,_n=new ze,pp=new z(0,0,0),mp=new z(1,1,1),_i=new z,Or=new z,nn=new z,Kl=new ze,Jl=new Jt;class en{constructor(e=0,t=0,n=0,s=en.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Tt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Tt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Tt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Tt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Tt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Tt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Kl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Kl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Jl.setFromEuler(this),this.setFromQuaternion(Jl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}en.DEFAULT_ORDER="XYZ";class td{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let gp=0;const Zl=new z,ls=new Jt,Yn=new ze,zr=new z,Js=new z,bp=new z,_p=new Jt,Ql=new z(1,0,0),$l=new z(0,1,0),eh=new z(0,0,1),th={type:"added"},xp={type:"removed"},hs={type:"childadded",child:null},uo={type:"childremoved",child:null};class Mt extends $i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gp++}),this.uuid=Tn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mt.DEFAULT_UP.clone();const e=new z,t=new en,n=new Jt,s=new z(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ze},normalMatrix:{value:new qe}}),this.matrix=new ze,this.matrixWorld=new ze,this.matrixAutoUpdate=Mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new td,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ls.setFromAxisAngle(e,t),this.quaternion.multiply(ls),this}rotateOnWorldAxis(e,t){return ls.setFromAxisAngle(e,t),this.quaternion.premultiply(ls),this}rotateX(e){return this.rotateOnAxis(Ql,e)}rotateY(e){return this.rotateOnAxis($l,e)}rotateZ(e){return this.rotateOnAxis(eh,e)}translateOnAxis(e,t){return Zl.copy(e).applyQuaternion(this.quaternion),this.position.add(Zl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ql,e)}translateY(e){return this.translateOnAxis($l,e)}translateZ(e){return this.translateOnAxis(eh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?zr.copy(e):zr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Js.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(Js,zr,this.up):Yn.lookAt(zr,Js,this.up),this.quaternion.setFromRotationMatrix(Yn),s&&(Yn.extractRotation(s.matrixWorld),ls.setFromRotationMatrix(Yn),this.quaternion.premultiply(ls.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(th),hs.child=e,this.dispatchEvent(hs),hs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(xp),uo.child=e,this.dispatchEvent(uo),uo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(th),hs.child=e,this.dispatchEvent(hs),hs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Js,e,bp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Js,_p,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=s,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Mt.DEFAULT_UP=new z(0,1,0);Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const xn=new z,Kn=new z,fo=new z,Jn=new z,us=new z,ds=new z,nh=new z,po=new z,mo=new z,go=new z,bo=new st,_o=new st,xo=new st;class yn{constructor(e=new z,t=new z,n=new z){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),xn.subVectors(e,t),s.cross(xn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){xn.subVectors(s,t),Kn.subVectors(n,t),fo.subVectors(e,t);const a=xn.dot(xn),o=xn.dot(Kn),c=xn.dot(fo),l=Kn.dot(Kn),h=Kn.dot(fo),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(l*c-o*h)*u,p=(a*h-o*c)*u;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Jn)===null?!1:Jn.x>=0&&Jn.y>=0&&Jn.x+Jn.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Jn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Jn.x),c.addScaledVector(a,Jn.y),c.addScaledVector(o,Jn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return bo.setScalar(0),_o.setScalar(0),xo.setScalar(0),bo.fromBufferAttribute(e,t),_o.fromBufferAttribute(e,n),xo.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(bo,r.x),a.addScaledVector(_o,r.y),a.addScaledVector(xo,r.z),a}static isFrontFacing(e,t,n,s){return xn.subVectors(n,t),Kn.subVectors(e,t),xn.cross(Kn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),xn.cross(Kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return yn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return yn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return yn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return yn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return yn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;us.subVectors(s,n),ds.subVectors(r,n),po.subVectors(e,n);const c=us.dot(po),l=ds.dot(po);if(c<=0&&l<=0)return t.copy(n);mo.subVectors(e,s);const h=us.dot(mo),d=ds.dot(mo);if(h>=0&&d<=h)return t.copy(s);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(us,a);go.subVectors(e,r);const f=us.dot(go),p=ds.dot(go);if(p>=0&&f<=p)return t.copy(r);const _=f*l-c*p;if(_<=0&&l>=0&&p<=0)return o=l/(l-p),t.copy(n).addScaledVector(ds,o);const g=h*p-f*d;if(g<=0&&d-h>=0&&f-p>=0)return nh.subVectors(r,s),o=(d-h)/(d-h+(f-p)),t.copy(s).addScaledVector(nh,o);const m=1/(g+_+u);return a=_*m,o=u*m,t.copy(n).addScaledVector(us,a).addScaledVector(ds,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const nd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xi={h:0,s:0,l:0},Br={h:0,s:0,l:0};function vo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Te{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=St){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Qe.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Qe.workingColorSpace){if(e=$c(e,1),t=Tt(t,0,1),n=Tt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=vo(a,r,e+1/3),this.g=vo(a,r,e),this.b=vo(a,r,e-1/3)}return Qe.toWorkingColorSpace(this,s),this}setStyle(e,t=St){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=St){const n=nd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=oi(e.r),this.g=oi(e.g),this.b=oi(e.b),this}copyLinearToSRGB(e){return this.r=Es(e.r),this.g=Es(e.g),this.b=Es(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=St){return Qe.fromWorkingColorSpace(zt.copy(this),e),Math.round(Tt(zt.r*255,0,255))*65536+Math.round(Tt(zt.g*255,0,255))*256+Math.round(Tt(zt.b*255,0,255))}getHexString(e=St){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.fromWorkingColorSpace(zt.copy(this),t);const n=zt.r,s=zt.g,r=zt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Qe.workingColorSpace){return Qe.fromWorkingColorSpace(zt.copy(this),t),e.r=zt.r,e.g=zt.g,e.b=zt.b,e}getStyle(e=St){Qe.fromWorkingColorSpace(zt.copy(this),e);const t=zt.r,n=zt.g,s=zt.b;return e!==St?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(xi),this.setHSL(xi.h+e,xi.s+t,xi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(xi),e.getHSL(Br);const n=hr(xi.h,Br.h,t),s=hr(xi.s,Br.s,t),r=hr(xi.l,Br.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zt=new Te;Te.NAMES=nd;let vp=0;class zn extends $i{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:vp++}),this.uuid=Tn(),this.name="",this.blending=ys,this.side=li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qo,this.blendDst=Yo,this.blendEquation=Xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Te(0,0,0),this.blendAlpha=0,this.depthFunc=ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=is,this.stencilZFail=is,this.stencilZPass=is,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ys&&(n.blending=this.blending),this.side!==li&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==qo&&(n.blendSrc=this.blendSrc),this.blendDst!==Yo&&(n.blendDst=this.blendDst),this.blendEquation!==Xi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ws&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==is&&(n.stencilFail=this.stencilFail),this.stencilZFail!==is&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==is&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ri extends zn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.combine=Pu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ni=Mp();function Mp(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let c=0;c<256;++c){const l=c-127;l<-27?(n[c]=0,n[c|256]=32768,s[c]=24,s[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,s[c]=-l-1,s[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,s[c]=13,s[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,s[c]=24,s[c|256]=24):(n[c]=31744,n[c|256]=64512,s[c]=13,s[c|256]=13)}const r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;(l&8388608)===0;)l<<=1,h-=8388608;l&=-8388609,h+=947912704,r[c]=l|h}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:a,offsetTable:o}}function yp(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=Tt(i,-65504,65504),ni.floatView[0]=i;const e=ni.uint32View[0],t=e>>23&511;return ni.baseTable[t]+((e&8388607)>>ni.shiftTable[t])}function Sp(i){const e=i>>10;return ni.uint32View[0]=ni.mantissaTable[ni.offsetTable[e]+(i&1023)]+ni.exponentTable[e],ni.floatView[0]}const kr={toHalfFloat:yp,fromHalfFloat:Sp},Et=new z,Hr=new ue;class vt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Pc,this.updateRanges=[],this.gpuType=Qt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Hr.fromBufferAttribute(this,t),Hr.applyMatrix3(e),this.setXY(t,Hr.x,Hr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Mn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Mn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Mn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Mn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Mn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array),r=ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Pc&&(e.usage=this.usage),e}}class el extends vt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class id extends vt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ve extends vt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Ep=0;const ln=new ze,Mo=new Mt,fs=new z,sn=new wn,Zs=new wn,Pt=new z;class mt extends $i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ep++}),this.uuid=Tn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Qu(e)?id:el)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new qe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ln.makeRotationFromQuaternion(e),this.applyMatrix4(ln),this}rotateX(e){return ln.makeRotationX(e),this.applyMatrix4(ln),this}rotateY(e){return ln.makeRotationY(e),this.applyMatrix4(ln),this}rotateZ(e){return ln.makeRotationZ(e),this.applyMatrix4(ln),this}translate(e,t,n){return ln.makeTranslation(e,t,n),this.applyMatrix4(ln),this}scale(e,t,n){return ln.makeScale(e,t,n),this.applyMatrix4(ln),this}lookAt(e){return Mo.lookAt(e),Mo.updateMatrix(),this.applyMatrix4(Mo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fs).negate(),this.translate(fs.x,fs.y,fs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ve(n,3))}else{for(let n=0,s=t.count;n<s;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];sn.setFromBufferAttribute(r),this.morphTargetsRelative?(Pt.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(Pt),Pt.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(Pt)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){const n=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Zs.setFromBufferAttribute(o),this.morphTargetsRelative?(Pt.addVectors(sn.min,Zs.min),sn.expandByPoint(Pt),Pt.addVectors(sn.max,Zs.max),sn.expandByPoint(Pt)):(sn.expandByPoint(Zs.min),sn.expandByPoint(Zs.max))}sn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Pt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Pt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Pt.fromBufferAttribute(o,l),c&&(fs.fromBufferAttribute(e,l),Pt.add(fs)),s=Math.max(s,n.distanceToSquared(Pt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new vt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let R=0;R<n.count;R++)o[R]=new z,c[R]=new z;const l=new z,h=new z,d=new z,u=new ue,f=new ue,p=new ue,_=new z,g=new z;function m(R,M,y){l.fromBufferAttribute(n,R),h.fromBufferAttribute(n,M),d.fromBufferAttribute(n,y),u.fromBufferAttribute(r,R),f.fromBufferAttribute(r,M),p.fromBufferAttribute(r,y),h.sub(l),d.sub(l),f.sub(u),p.sub(u);const P=1/(f.x*p.y-p.x*f.y);isFinite(P)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(P),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(P),o[R].add(_),o[M].add(_),o[y].add(_),c[R].add(g),c[M].add(g),c[y].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let R=0,M=v.length;R<M;++R){const y=v[R],P=y.start,U=y.count;for(let T=P,w=P+U;T<w;T+=3)m(e.getX(T+0),e.getX(T+1),e.getX(T+2))}const x=new z,b=new z,E=new z,S=new z;function A(R){E.fromBufferAttribute(s,R),S.copy(E);const M=o[R];x.copy(M),x.sub(E.multiplyScalar(E.dot(M))).normalize(),b.crossVectors(S,M);const P=b.dot(c[R])<0?-1:1;a.setXYZW(R,x.x,x.y,x.z,P)}for(let R=0,M=v.length;R<M;++R){const y=v[R],P=y.start,U=y.count;for(let T=P,w=P+U;T<w;T+=3)A(e.getX(T+0)),A(e.getX(T+1)),A(e.getX(T+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new vt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new z,r=new z,a=new z,o=new z,c=new z,l=new z,h=new z,d=new z;if(e)for(let u=0,f=e.count;u<f;u+=3){const p=e.getX(u+0),_=e.getX(u+1),g=e.getX(u+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,p),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),o.add(h),c.add(h),l.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Pt.fromBufferAttribute(e,t),Pt.normalize(),e.setXYZ(t,Pt.x,Pt.y,Pt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h);let f=0,p=0;for(let _=0,g=c.length;_<g;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*h;for(let m=0;m<h;m++)u[p++]=l[f++]}return new vt(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new mt,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=e(u,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],d=r[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ih=new ze,Fi=new Ba,Gr=new Hn,sh=new z,Vr=new z,Wr=new z,Xr=new z,yo=new z,jr=new z,rh=new z,qr=new z;class et extends Mt{constructor(e=new mt,t=new ri){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){jr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],d=r[c];h!==0&&(yo.fromBufferAttribute(d,e),a?jr.addScaledVector(yo,h):jr.addScaledVector(yo.sub(t),h))}t.add(jr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Gr.copy(n.boundingSphere),Gr.applyMatrix4(r),Fi.copy(e.ray).recast(e.near),!(Gr.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(Gr,sh)===null||Fi.origin.distanceToSquared(sh)>(e.far-e.near)**2))&&(ih.copy(r).invert(),Fi.copy(e.ray).applyMatrix4(ih),!(n.boundingBox!==null&&Fi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Fi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,_=u.length;p<_;p++){const g=u[p],m=a[g.materialIndex],v=Math.max(g.start,f.start),x=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let b=v,E=x;b<E;b+=3){const S=o.getX(b),A=o.getX(b+1),R=o.getX(b+2);s=Yr(this,m,e,n,l,h,d,S,A,R),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const p=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const v=o.getX(g),x=o.getX(g+1),b=o.getX(g+2);s=Yr(this,a,e,n,l,h,d,v,x,b),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let p=0,_=u.length;p<_;p++){const g=u[p],m=a[g.materialIndex],v=Math.max(g.start,f.start),x=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let b=v,E=x;b<E;b+=3){const S=b,A=b+1,R=b+2;s=Yr(this,m,e,n,l,h,d,S,A,R),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const p=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const v=g,x=g+1,b=g+2;s=Yr(this,a,e,n,l,h,d,v,x,b),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function Tp(i,e,t,n,s,r,a,o){let c;if(e.side===Yt?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===li,o),c===null)return null;qr.copy(o),qr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(qr);return l<t.near||l>t.far?null:{distance:l,point:qr.clone(),object:i}}function Yr(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Vr),i.getVertexPosition(c,Wr),i.getVertexPosition(l,Xr);const h=Tp(i,e,t,n,Vr,Wr,Xr,rh);if(h){const d=new z;yn.getBarycoord(rh,Vr,Wr,Xr,d),s&&(h.uv=yn.getInterpolatedAttribute(s,o,c,l,d,new ue)),r&&(h.uv1=yn.getInterpolatedAttribute(r,o,c,l,d,new ue)),a&&(h.normal=yn.getInterpolatedAttribute(a,o,c,l,d,new z),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new z,materialIndex:0};yn.getNormal(Vr,Wr,Xr,u.normal),h.face=u,h.barycoord=d}return h}class Bn extends mt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],d=[];let u=0,f=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,s,a,2),p("x","z","y",1,-1,e,n,-t,s,a,3),p("x","y","z",1,-1,e,t,n,s,r,4),p("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Ve(l,3)),this.setAttribute("normal",new Ve(h,3)),this.setAttribute("uv",new Ve(d,2));function p(_,g,m,v,x,b,E,S,A,R,M){const y=b/A,P=E/R,U=b/2,T=E/2,w=S/2,L=A+1,O=R+1;let V=0,N=0;const q=new z;for(let W=0;W<O;W++){const ne=W*P-T;for(let oe=0;oe<L;oe++){const Me=oe*y-U;q[_]=Me*v,q[g]=ne*x,q[m]=w,l.push(q.x,q.y,q.z),q[_]=0,q[g]=0,q[m]=S>0?1:-1,h.push(q.x,q.y,q.z),d.push(oe/A),d.push(1-W/R),V+=1}}for(let W=0;W<R;W++)for(let ne=0;ne<A;ne++){const oe=u+ne+L*W,Me=u+ne+L*(W+1),J=u+(ne+1)+L*(W+1),$=u+(ne+1)+L*W;c.push(oe,Me,$),c.push(Me,J,$),N+=6}o.addGroup(f,N,M),f+=N,u+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ds(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Wt(i){const e={};for(let t=0;t<i.length;t++){const n=Ds(i[t]);for(const s in n)e[s]=n[s]}return e}function Ap(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function sd(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const vr={clone:Ds,merge:Wt};var wp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Rp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Lt extends zn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wp,this.fragmentShader=Rp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ds(e.uniforms),this.uniformsGroups=Ap(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class rd extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ze,this.projectionMatrix=new ze,this.projectionMatrixInverse=new ze,this.coordinateSystem=si}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const vi=new z,ah=new ue,oh=new ue;class jt extends rd{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ls*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(lr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ls*2*Math.atan(Math.tan(lr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vi.x,vi.y).multiplyScalar(-e/vi.z),vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(vi.x,vi.y).multiplyScalar(-e/vi.z)}getViewSize(e,t){return this.getViewBounds(e,ah,oh),t.subVectors(oh,ah)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(lr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ps=-90,ms=1;class Cp extends Mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new jt(ps,ms,e,t);s.layers=this.layers,this.add(s);const r=new jt(ps,ms,e,t);r.layers=this.layers,this.add(r);const a=new jt(ps,ms,e,t);a.layers=this.layers,this.add(a);const o=new jt(ps,ms,e,t);o.layers=this.layers,this.add(o);const c=new jt(ps,ms,e,t);c.layers=this.layers,this.add(c);const l=new jt(ps,ms,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===si)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===wa)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class ad extends wt{constructor(e,t,n,s,r,a,o,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:Rs,super(e,t,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Pp extends fn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new ad(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:It}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Bn(5,5,5),r=new Lt({name:"CubemapFromEquirect",uniforms:Ds(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Yt,blending:ai});r.uniforms.tEquirect.value=t;const a=new et(s,r),o=t.minFilter;return t.minFilter===On&&(t.minFilter=It),new Cp(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const So=new z,Ip=new z,Lp=new qe;class Vi{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=So.subVectors(n,t).cross(Ip.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(So),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Lp.getNormalMatrix(e),s=this.coplanarPoint(So).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Oi=new Hn,Kr=new z;class tl{constructor(e=new Vi,t=new Vi,n=new Vi,s=new Vi,r=new Vi,a=new Vi){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=si){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],h=s[5],d=s[6],u=s[7],f=s[8],p=s[9],_=s[10],g=s[11],m=s[12],v=s[13],x=s[14],b=s[15];if(n[0].setComponents(c-r,u-l,g-f,b-m).normalize(),n[1].setComponents(c+r,u+l,g+f,b+m).normalize(),n[2].setComponents(c+a,u+h,g+p,b+v).normalize(),n[3].setComponents(c-a,u-h,g-p,b-v).normalize(),n[4].setComponents(c-o,u-d,g-_,b-x).normalize(),t===si)n[5].setComponents(c+o,u+d,g+_,b+x).normalize();else if(t===wa)n[5].setComponents(o,d,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Oi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Oi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Oi)}intersectsSprite(e){return Oi.center.set(0,0,0),Oi.radius=.7071067811865476,Oi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Oi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Kr.x=s.normal.x>0?e.max.x:e.min.x,Kr.y=s.normal.y>0?e.max.y:e.min.y,Kr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Kr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function od(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Dp(i){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const h=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){const p=d[u],_=d[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){const _=d[f];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}class Gn extends mt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,d=e/o,u=t/c,f=[],p=[],_=[],g=[];for(let m=0;m<h;m++){const v=m*u-a;for(let x=0;x<l;x++){const b=x*d-r;p.push(b,-v,0),_.push(0,0,1),g.push(x/o),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let v=0;v<o;v++){const x=v+l*m,b=v+l*(m+1),E=v+1+l*(m+1),S=v+1+l*m;f.push(x,b,S),f.push(b,E,S)}this.setIndex(f),this.setAttribute("position",new Ve(p,3)),this.setAttribute("normal",new Ve(_,3)),this.setAttribute("uv",new Ve(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gn(e.width,e.height,e.widthSegments,e.heightSegments)}}var Up=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Np=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Fp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Op=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,kp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Hp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Vp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,qp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Yp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Kp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Jp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$p=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,em=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,tm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,nm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,im=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,sm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,rm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,am=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,om=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hm="gl_FragColor = linearToOutputTexel( gl_FragColor );",um=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,dm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,fm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,pm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,mm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,bm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_m=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Mm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ym=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Em=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Am=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,wm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Im=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Lm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Dm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Um=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Nm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Om=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,km=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Vm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ym=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Km=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Jm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Qm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,$m=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,e0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,t0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,n0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,i0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,s0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,r0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,a0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,o0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,c0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,l0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,h0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,u0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,d0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,f0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,p0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,m0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,g0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,b0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,_0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,x0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,v0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,M0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,y0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,S0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,E0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,T0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,A0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,w0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,R0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,C0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,P0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,I0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,L0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const D0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,U0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,z0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,B0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,k0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,H0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,G0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,V0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,W0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,X0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,j0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,q0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Y0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,K0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,J0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Z0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Q0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,eg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,tg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ng=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ig=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,sg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ag=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,og=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,cg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ug=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ke={alphahash_fragment:Up,alphahash_pars_fragment:Np,alphamap_fragment:Fp,alphamap_pars_fragment:Op,alphatest_fragment:zp,alphatest_pars_fragment:Bp,aomap_fragment:kp,aomap_pars_fragment:Hp,batching_pars_vertex:Gp,batching_vertex:Vp,begin_vertex:Wp,beginnormal_vertex:Xp,bsdfs:jp,iridescence_fragment:qp,bumpmap_pars_fragment:Yp,clipping_planes_fragment:Kp,clipping_planes_pars_fragment:Jp,clipping_planes_pars_vertex:Zp,clipping_planes_vertex:Qp,color_fragment:$p,color_pars_fragment:em,color_pars_vertex:tm,color_vertex:nm,common:im,cube_uv_reflection_fragment:sm,defaultnormal_vertex:rm,displacementmap_pars_vertex:am,displacementmap_vertex:om,emissivemap_fragment:cm,emissivemap_pars_fragment:lm,colorspace_fragment:hm,colorspace_pars_fragment:um,envmap_fragment:dm,envmap_common_pars_fragment:fm,envmap_pars_fragment:pm,envmap_pars_vertex:mm,envmap_physical_pars_fragment:Am,envmap_vertex:gm,fog_vertex:bm,fog_pars_vertex:_m,fog_fragment:xm,fog_pars_fragment:vm,gradientmap_pars_fragment:Mm,lightmap_pars_fragment:ym,lights_lambert_fragment:Sm,lights_lambert_pars_fragment:Em,lights_pars_begin:Tm,lights_toon_fragment:wm,lights_toon_pars_fragment:Rm,lights_phong_fragment:Cm,lights_phong_pars_fragment:Pm,lights_physical_fragment:Im,lights_physical_pars_fragment:Lm,lights_fragment_begin:Dm,lights_fragment_maps:Um,lights_fragment_end:Nm,logdepthbuf_fragment:Fm,logdepthbuf_pars_fragment:Om,logdepthbuf_pars_vertex:zm,logdepthbuf_vertex:Bm,map_fragment:km,map_pars_fragment:Hm,map_particle_fragment:Gm,map_particle_pars_fragment:Vm,metalnessmap_fragment:Wm,metalnessmap_pars_fragment:Xm,morphinstance_vertex:jm,morphcolor_vertex:qm,morphnormal_vertex:Ym,morphtarget_pars_vertex:Km,morphtarget_vertex:Jm,normal_fragment_begin:Zm,normal_fragment_maps:Qm,normal_pars_fragment:$m,normal_pars_vertex:e0,normal_vertex:t0,normalmap_pars_fragment:n0,clearcoat_normal_fragment_begin:i0,clearcoat_normal_fragment_maps:s0,clearcoat_pars_fragment:r0,iridescence_pars_fragment:a0,opaque_fragment:o0,packing:c0,premultiplied_alpha_fragment:l0,project_vertex:h0,dithering_fragment:u0,dithering_pars_fragment:d0,roughnessmap_fragment:f0,roughnessmap_pars_fragment:p0,shadowmap_pars_fragment:m0,shadowmap_pars_vertex:g0,shadowmap_vertex:b0,shadowmask_pars_fragment:_0,skinbase_vertex:x0,skinning_pars_vertex:v0,skinning_vertex:M0,skinnormal_vertex:y0,specularmap_fragment:S0,specularmap_pars_fragment:E0,tonemapping_fragment:T0,tonemapping_pars_fragment:A0,transmission_fragment:w0,transmission_pars_fragment:R0,uv_pars_fragment:C0,uv_pars_vertex:P0,uv_vertex:I0,worldpos_vertex:L0,background_vert:D0,background_frag:U0,backgroundCube_vert:N0,backgroundCube_frag:F0,cube_vert:O0,cube_frag:z0,depth_vert:B0,depth_frag:k0,distanceRGBA_vert:H0,distanceRGBA_frag:G0,equirect_vert:V0,equirect_frag:W0,linedashed_vert:X0,linedashed_frag:j0,meshbasic_vert:q0,meshbasic_frag:Y0,meshlambert_vert:K0,meshlambert_frag:J0,meshmatcap_vert:Z0,meshmatcap_frag:Q0,meshnormal_vert:$0,meshnormal_frag:eg,meshphong_vert:tg,meshphong_frag:ng,meshphysical_vert:ig,meshphysical_frag:sg,meshtoon_vert:rg,meshtoon_frag:ag,points_vert:og,points_frag:cg,shadow_vert:lg,shadow_frag:hg,sprite_vert:ug,sprite_frag:dg},fe={common:{diffuse:{value:new Te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},envMapRotation:{value:new qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new Te(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},Un={basic:{uniforms:Wt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:Wt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Te(0)}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:Wt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Te(0)},specular:{value:new Te(1118481)},shininess:{value:30}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:Wt([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new Te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:Wt([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new Te(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:Wt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:Wt([fe.points,fe.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:Wt([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:Wt([fe.common,fe.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:Wt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:Wt([fe.sprite,fe.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qe}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distanceRGBA:{uniforms:Wt([fe.common,fe.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distanceRGBA_vert,fragmentShader:Ke.distanceRGBA_frag},shadow:{uniforms:Wt([fe.lights,fe.fog,{color:{value:new Te(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};Un.physical={uniforms:Wt([Un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new Te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new Te(0)},specularColor:{value:new Te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const Jr={r:0,b:0,g:0},zi=new en,fg=new ze;function pg(i,e,t,n,s,r,a){const o=new Te(0);let c=r===!0?0:1,l,h,d=null,u=0,f=null;function p(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?t:e).get(x)),x}function _(v){let x=!1;const b=p(v);b===null?m(o,c):b&&b.isColor&&(m(b,1),x=!0);const E=i.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(v,x){const b=p(x);b&&(b.isCubeTexture||b.mapping===Oa)?(h===void 0&&(h=new et(new Bn(1,1,1),new Lt({name:"BackgroundCubeMaterial",uniforms:Ds(Un.backgroundCube.uniforms),vertexShader:Un.backgroundCube.vertexShader,fragmentShader:Un.backgroundCube.fragmentShader,side:Yt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,S,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),zi.copy(x.backgroundRotation),zi.x*=-1,zi.y*=-1,zi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(zi.y*=-1,zi.z*=-1),h.material.uniforms.envMap.value=b,h.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(fg.makeRotationFromEuler(zi)),h.material.toneMapped=Qe.getTransfer(b.colorSpace)!==ht,(d!==b||u!==b.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,d=b,u=b.version,f=i.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new et(new Gn(2,2),new Lt({name:"BackgroundMaterial",uniforms:Ds(Un.background.uniforms),vertexShader:Un.background.vertexShader,fragmentShader:Un.background.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=Qe.getTransfer(b.colorSpace)!==ht,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||u!==b.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,d=b,u=b.version,f=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,x){v.getRGB(Jr,sd(i)),n.buffers.color.setClear(Jr.r,Jr.g,Jr.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(v,x=1){o.set(v),c=x,m(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,m(o,c)},render:_,addToRenderList:g}}function mg(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(y,P,U,T,w){let L=!1;const O=d(T,U,P);r!==O&&(r=O,l(r.object)),L=f(y,T,U,w),L&&p(y,T,U,w),w!==null&&e.update(w,i.ELEMENT_ARRAY_BUFFER),(L||a)&&(a=!1,b(y,P,U,T),w!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(w).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function d(y,P,U){const T=U.wireframe===!0;let w=n[y.id];w===void 0&&(w={},n[y.id]=w);let L=w[P.id];L===void 0&&(L={},w[P.id]=L);let O=L[T];return O===void 0&&(O=u(c()),L[T]=O),O}function u(y){const P=[],U=[],T=[];for(let w=0;w<t;w++)P[w]=0,U[w]=0,T[w]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:U,attributeDivisors:T,object:y,attributes:{},index:null}}function f(y,P,U,T){const w=r.attributes,L=P.attributes;let O=0;const V=U.getAttributes();for(const N in V)if(V[N].location>=0){const W=w[N];let ne=L[N];if(ne===void 0&&(N==="instanceMatrix"&&y.instanceMatrix&&(ne=y.instanceMatrix),N==="instanceColor"&&y.instanceColor&&(ne=y.instanceColor)),W===void 0||W.attribute!==ne||ne&&W.data!==ne.data)return!0;O++}return r.attributesNum!==O||r.index!==T}function p(y,P,U,T){const w={},L=P.attributes;let O=0;const V=U.getAttributes();for(const N in V)if(V[N].location>=0){let W=L[N];W===void 0&&(N==="instanceMatrix"&&y.instanceMatrix&&(W=y.instanceMatrix),N==="instanceColor"&&y.instanceColor&&(W=y.instanceColor));const ne={};ne.attribute=W,W&&W.data&&(ne.data=W.data),w[N]=ne,O++}r.attributes=w,r.attributesNum=O,r.index=T}function _(){const y=r.newAttributes;for(let P=0,U=y.length;P<U;P++)y[P]=0}function g(y){m(y,0)}function m(y,P){const U=r.newAttributes,T=r.enabledAttributes,w=r.attributeDivisors;U[y]=1,T[y]===0&&(i.enableVertexAttribArray(y),T[y]=1),w[y]!==P&&(i.vertexAttribDivisor(y,P),w[y]=P)}function v(){const y=r.newAttributes,P=r.enabledAttributes;for(let U=0,T=P.length;U<T;U++)P[U]!==y[U]&&(i.disableVertexAttribArray(U),P[U]=0)}function x(y,P,U,T,w,L,O){O===!0?i.vertexAttribIPointer(y,P,U,w,L):i.vertexAttribPointer(y,P,U,T,w,L)}function b(y,P,U,T){_();const w=T.attributes,L=U.getAttributes(),O=P.defaultAttributeValues;for(const V in L){const N=L[V];if(N.location>=0){let q=w[V];if(q===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(q=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(q=y.instanceColor)),q!==void 0){const W=q.normalized,ne=q.itemSize,oe=e.get(q);if(oe===void 0)continue;const Me=oe.buffer,J=oe.type,$=oe.bytesPerElement,ge=J===i.INT||J===i.UNSIGNED_INT||q.gpuType===Xc;if(q.isInterleavedBufferAttribute){const de=q.data,Le=de.stride,Fe=q.offset;if(de.isInstancedInterleavedBuffer){for(let Ge=0;Ge<N.locationSize;Ge++)m(N.location+Ge,de.meshPerAttribute);y.isInstancedMesh!==!0&&T._maxInstanceCount===void 0&&(T._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let Ge=0;Ge<N.locationSize;Ge++)g(N.location+Ge);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let Ge=0;Ge<N.locationSize;Ge++)x(N.location+Ge,ne/N.locationSize,J,W,Le*$,(Fe+ne/N.locationSize*Ge)*$,ge)}else{if(q.isInstancedBufferAttribute){for(let de=0;de<N.locationSize;de++)m(N.location+de,q.meshPerAttribute);y.isInstancedMesh!==!0&&T._maxInstanceCount===void 0&&(T._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let de=0;de<N.locationSize;de++)g(N.location+de);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let de=0;de<N.locationSize;de++)x(N.location+de,ne/N.locationSize,J,W,ne*$,ne/N.locationSize*de*$,ge)}}else if(O!==void 0){const W=O[V];if(W!==void 0)switch(W.length){case 2:i.vertexAttrib2fv(N.location,W);break;case 3:i.vertexAttrib3fv(N.location,W);break;case 4:i.vertexAttrib4fv(N.location,W);break;default:i.vertexAttrib1fv(N.location,W)}}}}v()}function E(){R();for(const y in n){const P=n[y];for(const U in P){const T=P[U];for(const w in T)h(T[w].object),delete T[w];delete P[U]}delete n[y]}}function S(y){if(n[y.id]===void 0)return;const P=n[y.id];for(const U in P){const T=P[U];for(const w in T)h(T[w].object),delete T[w];delete P[U]}delete n[y.id]}function A(y){for(const P in n){const U=n[P];if(U[y.id]===void 0)continue;const T=U[y.id];for(const w in T)h(T[w].object),delete T[w];delete U[y.id]}}function R(){M(),a=!0,r!==s&&(r=s,l(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:M,dispose:E,releaseStatesOfGeometry:S,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:g,disableUnusedAttributes:v}}function gg(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function a(l,h,d){d!==0&&(i.drawArraysInstanced(n,l,h,d),t.update(h,n,d))}function o(l,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let f=0;for(let p=0;p<d;p++)f+=h[p];t.update(f,n,1)}function c(l,h,d,u){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<l.length;p++)a(l[p],h[p],u[p]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,d);let p=0;for(let _=0;_<d;_++)p+=h[_]*u[_];t.update(p,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function bg(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==un&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const R=A===$t&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==hi&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Qt&&!R)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=t.logarithmicDepthBuffer===!0,u=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),x=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=p>0,S=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:v,maxVaryings:x,maxFragmentUniforms:b,vertexTextures:E,maxSamples:S}}function _g(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Vi,o=new qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const p=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,m=i.get(d);if(!s||p===null||p.length===0||r&&!g)r?h(null):l();else{const v=r?0:n,x=v*4;let b=m.clippingState||null;c.value=b,b=h(p,u,x,f);for(let E=0;E!==x;++E)b[E]=t[E];m.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,p){const _=d!==null?d.length:0;let g=null;if(_!==0){if(g=c.value,p!==!0||g===null){const m=f+_*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<m)&&(g=new Float32Array(m));for(let x=0,b=f;x!==_;++x,b+=4)a.copy(d[x]).applyMatrix4(v,o),a.normal.toArray(g,b),g[b+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function xg(i){let e=new WeakMap;function t(a,o){return o===Ea?a.mapping=Rs:o===nc&&(a.mapping=Cs),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ea||o===nc)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Pp(c.height);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class ka extends rd{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ms=4,ch=[.125,.215,.35,.446,.526,.582],ji=20,Eo=new ka,lh=new Te;let To=null,Ao=0,wo=0,Ro=!1;const Wi=(1+Math.sqrt(5))/2,gs=1/Wi,hh=[new z(-Wi,gs,0),new z(Wi,gs,0),new z(-gs,0,Wi),new z(gs,0,Wi),new z(0,Wi,-gs),new z(0,Wi,gs),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)];class Ic{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){To=this._renderer.getRenderTarget(),Ao=this._renderer.getActiveCubeFace(),wo=this._renderer.getActiveMipmapLevel(),Ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(To,Ao,wo),this._renderer.xr.enabled=Ro,e.scissorTest=!1,Zr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Rs||e.mapping===Cs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),To=this._renderer.getRenderTarget(),Ao=this._renderer.getActiveCubeFace(),wo=this._renderer.getActiveMipmapLevel(),Ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:It,minFilter:It,generateMipmaps:!1,type:$t,format:un,colorSpace:Gt,depthBuffer:!1},s=uh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=uh(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=vg(r)),this._blurMaterial=Mg(r,e,t)}return s}_compileMaterial(e){const t=new et(this._lodPlanes[0],e);this._renderer.compile(t,Eo)}_sceneToCubeUV(e,t,n,s){const o=new jt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(lh),h.toneMapping=Ri,h.autoClear=!1;const f=new ri({name:"PMREM.Background",side:Yt,depthWrite:!1,depthTest:!1}),p=new et(new Bn,f);let _=!1;const g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,_=!0):(f.color.copy(lh),_=!0);for(let m=0;m<6;m++){const v=m%3;v===0?(o.up.set(0,c[m],0),o.lookAt(l[m],0,0)):v===1?(o.up.set(0,0,c[m]),o.lookAt(0,l[m],0)):(o.up.set(0,c[m],0),o.lookAt(0,0,l[m]));const x=this._cubeSize;Zr(s,v*x,m>2?x:0,x,x),h.setRenderTarget(s),_&&h.render(p,o),h.render(e,o)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=u,h.autoClear=d,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Rs||e.mapping===Cs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=fh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new et(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;Zr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Eo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=hh[(s-r-1)%hh.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new et(this._lodPlanes[s],l),u=l.uniforms,f=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ji-1),_=r/p,g=isFinite(r)?1+Math.floor(h*_):ji;g>ji&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ji}`);const m=[];let v=0;for(let A=0;A<ji;++A){const R=A/_,M=Math.exp(-R*R/2);m.push(M),A===0?v+=M:A<g&&(v+=2*M)}for(let A=0;A<m.length;A++)m[A]=m[A]/v;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=m,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:x}=this;u.dTheta.value=p,u.mipInt.value=x-n;const b=this._sizeLods[s],E=3*b*(s>x-Ms?s-x+Ms:0),S=4*(this._cubeSize-b);Zr(t,E,S,3*b,2*b),c.setRenderTarget(t),c.render(d,Eo)}}function vg(i){const e=[],t=[],n=[];let s=i;const r=i-Ms+1+ch.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>i-Ms?c=ch[a-i+Ms-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,p=6,_=3,g=2,m=1,v=new Float32Array(_*p*f),x=new Float32Array(g*p*f),b=new Float32Array(m*p*f);for(let S=0;S<f;S++){const A=S%3*2/3-1,R=S>2?0:-1,M=[A,R,0,A+2/3,R,0,A+2/3,R+1,0,A,R,0,A+2/3,R+1,0,A,R+1,0];v.set(M,_*p*S),x.set(u,g*p*S);const y=[S,S,S,S,S,S];b.set(y,m*p*S)}const E=new mt;E.setAttribute("position",new vt(v,_)),E.setAttribute("uv",new vt(x,g)),E.setAttribute("faceIndex",new vt(b,m)),e.push(E),s>Ms&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function uh(i,e,t){const n=new fn(i,e,t);return n.texture.mapping=Oa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Zr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Mg(i,e,t){const n=new Float32Array(ji),s=new z(0,1,0);return new Lt({name:"SphericalGaussianBlur",defines:{n:ji,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function dh(){return new Lt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function fh(){return new Lt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function nl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function yg(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===Ea||c===nc,h=c===Rs||c===Cs;if(l||h){let d=e.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new Ic(i)),d=l?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return l&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new Ic(i)),d=l?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Sg(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&ar("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Eg(i,e,t,n){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const p in u.attributes)e.remove(u.attributes[p]);for(const p in u.morphAttributes){const _=u.morphAttributes[p];for(let g=0,m=_.length;g<m;g++)e.remove(_[g])}u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function c(d){const u=d.attributes;for(const p in u)e.update(u[p],i.ARRAY_BUFFER);const f=d.morphAttributes;for(const p in f){const _=f[p];for(let g=0,m=_.length;g<m;g++)e.update(_[g],i.ARRAY_BUFFER)}}function l(d){const u=[],f=d.index,p=d.attributes.position;let _=0;if(f!==null){const v=f.array;_=f.version;for(let x=0,b=v.length;x<b;x+=3){const E=v[x+0],S=v[x+1],A=v[x+2];u.push(E,S,S,A,A,E)}}else if(p!==void 0){const v=p.array;_=p.version;for(let x=0,b=v.length/3-1;x<b;x+=3){const E=x+0,S=x+1,A=x+2;u.push(E,S,S,A,A,E)}}else return;const g=new(Qu(u)?id:el)(u,1);g.version=_;const m=r.get(d);m&&e.remove(m),r.set(d,g)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function Tg(i,e,t){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,f){i.drawElements(n,f,r,u*a),t.update(f,n,1)}function l(u,f,p){p!==0&&(i.drawElementsInstanced(n,f,r,u*a,p),t.update(f,n,p))}function h(u,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,p);let g=0;for(let m=0;m<p;m++)g+=f[m];t.update(g,n,1)}function d(u,f,p,_){if(p===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<u.length;m++)l(u[m]/a,f[m],_[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,_,0,p);let m=0;for(let v=0;v<p;v++)m+=f[v]*_[v];t.update(m,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Ag(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function wg(i,e,t){const n=new WeakMap,s=new st;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let M=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",M)};u!==void 0&&u.texture.dispose();const f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let x=0;f===!0&&(x=1),p===!0&&(x=2),_===!0&&(x=3);let b=o.attributes.position.count*x,E=1;b>e.maxTextureSize&&(E=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const S=new Float32Array(b*E*4*d),A=new ed(S,b,E,d);A.type=Qt,A.needsUpdate=!0;const R=x*4;for(let y=0;y<d;y++){const P=g[y],U=m[y],T=v[y],w=b*E*4*y;for(let L=0;L<P.count;L++){const O=L*R;f===!0&&(s.fromBufferAttribute(P,L),S[w+O+0]=s.x,S[w+O+1]=s.y,S[w+O+2]=s.z,S[w+O+3]=0),p===!0&&(s.fromBufferAttribute(U,L),S[w+O+4]=s.x,S[w+O+5]=s.y,S[w+O+6]=s.z,S[w+O+7]=0),_===!0&&(s.fromBufferAttribute(T,L),S[w+O+8]=s.x,S[w+O+9]=s.y,S[w+O+10]=s.z,S[w+O+11]=T.itemSize===4?s.w:1)}}u={count:d,texture:A,size:new ue(b,E)},n.set(o,u),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];const p=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",p),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Rg(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,d=e.get(c,h);if(s.get(d)!==l&&(e.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;s.get(u)!==l&&(u.update(),s.set(u,l))}return d}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}class cd extends wt{constructor(e,t,n,s,r,a,o,c,l,h=Ss){if(h!==Ss&&h!==Is)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ss&&(n=Zi),n===void 0&&h===Is&&(n=Ps),super(null,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Kt,this.minFilter=c!==void 0?c:Kt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const ld=new wt,ph=new cd(1,1),hd=new ed,ud=new dp,dd=new ad,mh=[],gh=[],bh=new Float32Array(16),_h=new Float32Array(9),xh=new Float32Array(4);function Bs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=mh[s];if(r===void 0&&(r=new Float32Array(s),mh[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Rt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ct(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ha(i,e){let t=gh[e];t===void 0&&(t=new Int32Array(e),gh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Cg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Pg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2fv(this.addr,e),Ct(t,e)}}function Ig(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;i.uniform3fv(this.addr,e),Ct(t,e)}}function Lg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4fv(this.addr,e),Ct(t,e)}}function Dg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;xh.set(n),i.uniformMatrix2fv(this.addr,!1,xh),Ct(t,n)}}function Ug(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;_h.set(n),i.uniformMatrix3fv(this.addr,!1,_h),Ct(t,n)}}function Ng(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ct(t,e)}else{if(Rt(t,n))return;bh.set(n),i.uniformMatrix4fv(this.addr,!1,bh),Ct(t,n)}}function Fg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Og(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2iv(this.addr,e),Ct(t,e)}}function zg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;i.uniform3iv(this.addr,e),Ct(t,e)}}function Bg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4iv(this.addr,e),Ct(t,e)}}function kg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Hg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2uiv(this.addr,e),Ct(t,e)}}function Gg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;i.uniform3uiv(this.addr,e),Ct(t,e)}}function Vg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4uiv(this.addr,e),Ct(t,e)}}function Wg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ph.compareFunction=Zu,r=ph):r=ld,t.setTexture2D(e||r,s)}function Xg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ud,s)}function jg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||dd,s)}function qg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||hd,s)}function Yg(i){switch(i){case 5126:return Cg;case 35664:return Pg;case 35665:return Ig;case 35666:return Lg;case 35674:return Dg;case 35675:return Ug;case 35676:return Ng;case 5124:case 35670:return Fg;case 35667:case 35671:return Og;case 35668:case 35672:return zg;case 35669:case 35673:return Bg;case 5125:return kg;case 36294:return Hg;case 36295:return Gg;case 36296:return Vg;case 35678:case 36198:case 36298:case 36306:case 35682:return Wg;case 35679:case 36299:case 36307:return Xg;case 35680:case 36300:case 36308:case 36293:return jg;case 36289:case 36303:case 36311:case 36292:return qg}}function Kg(i,e){i.uniform1fv(this.addr,e)}function Jg(i,e){const t=Bs(e,this.size,2);i.uniform2fv(this.addr,t)}function Zg(i,e){const t=Bs(e,this.size,3);i.uniform3fv(this.addr,t)}function Qg(i,e){const t=Bs(e,this.size,4);i.uniform4fv(this.addr,t)}function $g(i,e){const t=Bs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function eb(i,e){const t=Bs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function tb(i,e){const t=Bs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function nb(i,e){i.uniform1iv(this.addr,e)}function ib(i,e){i.uniform2iv(this.addr,e)}function sb(i,e){i.uniform3iv(this.addr,e)}function rb(i,e){i.uniform4iv(this.addr,e)}function ab(i,e){i.uniform1uiv(this.addr,e)}function ob(i,e){i.uniform2uiv(this.addr,e)}function cb(i,e){i.uniform3uiv(this.addr,e)}function lb(i,e){i.uniform4uiv(this.addr,e)}function hb(i,e,t){const n=this.cache,s=e.length,r=Ha(t,s);Rt(n,r)||(i.uniform1iv(this.addr,r),Ct(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||ld,r[a])}function ub(i,e,t){const n=this.cache,s=e.length,r=Ha(t,s);Rt(n,r)||(i.uniform1iv(this.addr,r),Ct(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ud,r[a])}function db(i,e,t){const n=this.cache,s=e.length,r=Ha(t,s);Rt(n,r)||(i.uniform1iv(this.addr,r),Ct(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||dd,r[a])}function fb(i,e,t){const n=this.cache,s=e.length,r=Ha(t,s);Rt(n,r)||(i.uniform1iv(this.addr,r),Ct(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||hd,r[a])}function pb(i){switch(i){case 5126:return Kg;case 35664:return Jg;case 35665:return Zg;case 35666:return Qg;case 35674:return $g;case 35675:return eb;case 35676:return tb;case 5124:case 35670:return nb;case 35667:case 35671:return ib;case 35668:case 35672:return sb;case 35669:case 35673:return rb;case 5125:return ab;case 36294:return ob;case 36295:return cb;case 36296:return lb;case 35678:case 36198:case 36298:case 36306:case 35682:return hb;case 35679:case 36299:case 36307:return ub;case 35680:case 36300:case 36308:case 36293:return db;case 36289:case 36303:case 36311:case 36292:return fb}}class mb{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Yg(t.type)}}class gb{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=pb(t.type)}}class bb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Co=/(\w+)(\])?(\[|\.)?/g;function vh(i,e){i.seq.push(e),i.map[e.id]=e}function _b(i,e,t){const n=i.name,s=n.length;for(Co.lastIndex=0;;){const r=Co.exec(n),a=Co.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){vh(t,l===void 0?new mb(o,i,e):new gb(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new bb(o),vh(t,d)),t=d}}}class _a{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);_b(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Mh(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const xb=37297;let vb=0;function Mb(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const yh=new qe;function yb(i){Qe._getMatrix(yh,Qe.workingColorSpace,i);const e=`mat3( ${yh.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(i)){case za:return[e,"LinearTransferOETF"];case ht:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Sh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Mb(i.getShaderSource(e),a)}else return s}function Sb(i,e){const t=yb(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Eb(i,e){let t;switch(e){case Iu:t="Linear";break;case Lu:t="Reinhard";break;case Du:t="Cineon";break;case Wc:t="ACESFilmic";break;case Uu:t="AgX";break;case Nu:t="Neutral";break;case wf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Qr=new z;function Tb(){Qe.getLuminanceCoefficients(Qr);const i=Qr.x.toFixed(4),e=Qr.y.toFixed(4),t=Qr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ab(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(or).join(`
`)}function wb(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Rb(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function or(i){return i!==""}function Eh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Th(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Cb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lc(i){return i.replace(Cb,Ib)}const Pb=new Map;function Ib(i,e){let t=Ke[e];if(t===void 0){const n=Pb.get(e);if(n!==void 0)t=Ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Lc(t)}const Lb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ah(i){return i.replace(Lb,Db)}function Db(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function wh(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Ub(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ru?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Cu?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Qn&&(e="SHADOWMAP_TYPE_VSM"),e}function Nb(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Rs:case Cs:e="ENVMAP_TYPE_CUBE";break;case Oa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Fb(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Cs:e="ENVMAP_MODE_REFRACTION";break}return e}function Ob(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Pu:e="ENVMAP_BLENDING_MULTIPLY";break;case Tf:e="ENVMAP_BLENDING_MIX";break;case Af:e="ENVMAP_BLENDING_ADD";break}return e}function zb(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Bb(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Ub(t),l=Nb(t),h=Fb(t),d=Ob(t),u=zb(t),f=Ab(t),p=wb(r),_=s.createProgram();let g,m,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(or).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(or).join(`
`),m.length>0&&(m+=`
`)):(g=[wh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(or).join(`
`),m=[wh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ri?"#define TONE_MAPPING":"",t.toneMapping!==Ri?Ke.tonemapping_pars_fragment:"",t.toneMapping!==Ri?Eb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,Sb("linearToOutputTexel",t.outputColorSpace),Tb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(or).join(`
`)),a=Lc(a),a=Eh(a,t),a=Th(a,t),o=Lc(o),o=Eh(o,t),o=Th(o,t),a=Ah(a),o=Ah(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===kl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===kl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=v+g+a,b=v+m+o,E=Mh(s,s.VERTEX_SHADER,x),S=Mh(s,s.FRAGMENT_SHADER,b);s.attachShader(_,E),s.attachShader(_,S),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(P){if(i.debug.checkShaderErrors){const U=s.getProgramInfoLog(_).trim(),T=s.getShaderInfoLog(E).trim(),w=s.getShaderInfoLog(S).trim();let L=!0,O=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(L=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,E,S);else{const V=Sh(s,E,"vertex"),N=Sh(s,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+U+`
`+V+`
`+N)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(T===""||w==="")&&(O=!1);O&&(P.diagnostics={runnable:L,programLog:U,vertexShader:{log:T,prefix:g},fragmentShader:{log:w,prefix:m}})}s.deleteShader(E),s.deleteShader(S),R=new _a(s,_),M=Rb(s,_)}let R;this.getUniforms=function(){return R===void 0&&A(this),R};let M;this.getAttributes=function(){return M===void 0&&A(this),M};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(_,xb)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=vb++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=S,this}let kb=0;class Hb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Gb(e),t.set(e,n)),n}}class Gb{constructor(e){this.id=kb++,this.code=e,this.usedTimes=0}}function Vb(i,e,t,n,s,r,a){const o=new td,c=new Hb,l=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.vertexTextures;let f=s.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return l.add(M),M===0?"uv":`uv${M}`}function g(M,y,P,U,T){const w=U.fog,L=T.geometry,O=M.isMeshStandardMaterial?U.environment:null,V=(M.isMeshStandardMaterial?t:e).get(M.envMap||O),N=V&&V.mapping===Oa?V.image.height:null,q=p[M.type];M.precision!==null&&(f=s.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const W=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,ne=W!==void 0?W.length:0;let oe=0;L.morphAttributes.position!==void 0&&(oe=1),L.morphAttributes.normal!==void 0&&(oe=2),L.morphAttributes.color!==void 0&&(oe=3);let Me,J,$,ge;if(q){const lt=Un[q];Me=lt.vertexShader,J=lt.fragmentShader}else Me=M.vertexShader,J=M.fragmentShader,c.update(M),$=c.getVertexShaderID(M),ge=c.getFragmentShaderID(M);const de=i.getRenderTarget(),Le=i.state.buffers.depth.getReversed(),Fe=T.isInstancedMesh===!0,Ge=T.isBatchedMesh===!0,j=!!M.map,B=!!M.matcap,Z=!!V,F=!!M.aoMap,ae=!!M.lightMap,ee=!!M.bumpMap,ce=!!M.normalMap,me=!!M.displacementMap,Oe=!!M.emissiveMap,Ee=!!M.metalnessMap,D=!!M.roughnessMap,C=M.anisotropy>0,X=M.clearcoat>0,ie=M.dispersion>0,re=M.iridescence>0,te=M.sheen>0,De=M.transmission>0,_e=C&&!!M.anisotropyMap,Ae=X&&!!M.clearcoatMap,tt=X&&!!M.clearcoatNormalMap,le=X&&!!M.clearcoatRoughnessMap,we=re&&!!M.iridescenceMap,Be=re&&!!M.iridescenceThicknessMap,ke=te&&!!M.sheenColorMap,Re=te&&!!M.sheenRoughnessMap,$e=!!M.specularMap,Ye=!!M.specularColorMap,ft=!!M.specularIntensityMap,k=De&&!!M.transmissionMap,be=De&&!!M.thicknessMap,Q=!!M.gradientMap,se=!!M.alphaMap,ye=M.alphaTest>0,xe=!!M.alphaHash,We=!!M.extensions;let yt=Ri;M.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(yt=i.toneMapping);const Ft={shaderID:q,shaderType:M.type,shaderName:M.name,vertexShader:Me,fragmentShader:J,defines:M.defines,customVertexShaderID:$,customFragmentShaderID:ge,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Ge,batchingColor:Ge&&T._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&T.instanceColor!==null,instancingMorph:Fe&&T.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:de===null?i.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:Gt,alphaToCoverage:!!M.alphaToCoverage,map:j,matcap:B,envMap:Z,envMapMode:Z&&V.mapping,envMapCubeUVHeight:N,aoMap:F,lightMap:ae,bumpMap:ee,normalMap:ce,displacementMap:u&&me,emissiveMap:Oe,normalMapObjectSpace:ce&&M.normalMapType===Uf,normalMapTangentSpace:ce&&M.normalMapType===Ju,metalnessMap:Ee,roughnessMap:D,anisotropy:C,anisotropyMap:_e,clearcoat:X,clearcoatMap:Ae,clearcoatNormalMap:tt,clearcoatRoughnessMap:le,dispersion:ie,iridescence:re,iridescenceMap:we,iridescenceThicknessMap:Be,sheen:te,sheenColorMap:ke,sheenRoughnessMap:Re,specularMap:$e,specularColorMap:Ye,specularIntensityMap:ft,transmission:De,transmissionMap:k,thicknessMap:be,gradientMap:Q,opaque:M.transparent===!1&&M.blending===ys&&M.alphaToCoverage===!1,alphaMap:se,alphaTest:ye,alphaHash:xe,combine:M.combine,mapUv:j&&_(M.map.channel),aoMapUv:F&&_(M.aoMap.channel),lightMapUv:ae&&_(M.lightMap.channel),bumpMapUv:ee&&_(M.bumpMap.channel),normalMapUv:ce&&_(M.normalMap.channel),displacementMapUv:me&&_(M.displacementMap.channel),emissiveMapUv:Oe&&_(M.emissiveMap.channel),metalnessMapUv:Ee&&_(M.metalnessMap.channel),roughnessMapUv:D&&_(M.roughnessMap.channel),anisotropyMapUv:_e&&_(M.anisotropyMap.channel),clearcoatMapUv:Ae&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:tt&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Be&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:ke&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Re&&_(M.sheenRoughnessMap.channel),specularMapUv:$e&&_(M.specularMap.channel),specularColorMapUv:Ye&&_(M.specularColorMap.channel),specularIntensityMapUv:ft&&_(M.specularIntensityMap.channel),transmissionMapUv:k&&_(M.transmissionMap.channel),thicknessMapUv:be&&_(M.thicknessMap.channel),alphaMapUv:se&&_(M.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(ce||C),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:T.isPoints===!0&&!!L.attributes.uv&&(j||se),fog:!!w,useFog:M.fog===!0,fogExp2:!!w&&w.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Le,skinning:T.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:oe,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:yt,decodeVideoTexture:j&&M.map.isVideoTexture===!0&&Qe.getTransfer(M.map.colorSpace)===ht,decodeVideoTextureEmissive:Oe&&M.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(M.emissiveMap.colorSpace)===ht,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===At,flipSided:M.side===Yt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:We&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(We&&M.extensions.multiDraw===!0||Ge)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Ft.vertexUv1s=l.has(1),Ft.vertexUv2s=l.has(2),Ft.vertexUv3s=l.has(3),l.clear(),Ft}function m(M){const y=[];if(M.shaderID?y.push(M.shaderID):(y.push(M.customVertexShaderID),y.push(M.customFragmentShaderID)),M.defines!==void 0)for(const P in M.defines)y.push(P),y.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(v(y,M),x(y,M),y.push(i.outputColorSpace)),y.push(M.customProgramCacheKey),y.join()}function v(M,y){M.push(y.precision),M.push(y.outputColorSpace),M.push(y.envMapMode),M.push(y.envMapCubeUVHeight),M.push(y.mapUv),M.push(y.alphaMapUv),M.push(y.lightMapUv),M.push(y.aoMapUv),M.push(y.bumpMapUv),M.push(y.normalMapUv),M.push(y.displacementMapUv),M.push(y.emissiveMapUv),M.push(y.metalnessMapUv),M.push(y.roughnessMapUv),M.push(y.anisotropyMapUv),M.push(y.clearcoatMapUv),M.push(y.clearcoatNormalMapUv),M.push(y.clearcoatRoughnessMapUv),M.push(y.iridescenceMapUv),M.push(y.iridescenceThicknessMapUv),M.push(y.sheenColorMapUv),M.push(y.sheenRoughnessMapUv),M.push(y.specularMapUv),M.push(y.specularColorMapUv),M.push(y.specularIntensityMapUv),M.push(y.transmissionMapUv),M.push(y.thicknessMapUv),M.push(y.combine),M.push(y.fogExp2),M.push(y.sizeAttenuation),M.push(y.morphTargetsCount),M.push(y.morphAttributeCount),M.push(y.numDirLights),M.push(y.numPointLights),M.push(y.numSpotLights),M.push(y.numSpotLightMaps),M.push(y.numHemiLights),M.push(y.numRectAreaLights),M.push(y.numDirLightShadows),M.push(y.numPointLightShadows),M.push(y.numSpotLightShadows),M.push(y.numSpotLightShadowsWithMaps),M.push(y.numLightProbes),M.push(y.shadowMapType),M.push(y.toneMapping),M.push(y.numClippingPlanes),M.push(y.numClipIntersection),M.push(y.depthPacking)}function x(M,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),M.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),M.push(o.mask)}function b(M){const y=p[M.type];let P;if(y){const U=Un[y];P=vr.clone(U.uniforms)}else P=M.uniforms;return P}function E(M,y){let P;for(let U=0,T=h.length;U<T;U++){const w=h[U];if(w.cacheKey===y){P=w,++P.usedTimes;break}}return P===void 0&&(P=new Bb(i,y,M,r),h.push(P)),P}function S(M){if(--M.usedTimes===0){const y=h.indexOf(M);h[y]=h[h.length-1],h.pop(),M.destroy()}}function A(M){c.remove(M)}function R(){c.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:b,acquireProgram:E,releaseProgram:S,releaseShaderCache:A,programs:h,dispose:R}}function Wb(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Xb(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Rh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Ch(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d,u,f,p,_,g){let m=i[e];return m===void 0?(m={id:d.id,object:d,geometry:u,material:f,groupOrder:p,renderOrder:d.renderOrder,z:_,group:g},i[e]=m):(m.id=d.id,m.object=d,m.geometry=u,m.material=f,m.groupOrder=p,m.renderOrder=d.renderOrder,m.z=_,m.group=g),e++,m}function o(d,u,f,p,_,g){const m=a(d,u,f,p,_,g);f.transmission>0?n.push(m):f.transparent===!0?s.push(m):t.push(m)}function c(d,u,f,p,_,g){const m=a(d,u,f,p,_,g);f.transmission>0?n.unshift(m):f.transparent===!0?s.unshift(m):t.unshift(m)}function l(d,u){t.length>1&&t.sort(d||Xb),n.length>1&&n.sort(u||Rh),s.length>1&&s.sort(u||Rh)}function h(){for(let d=e,u=i.length;d<u;d++){const f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function jb(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Ch,i.set(n,[a])):s>=r.length?(a=new Ch,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function qb(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new z,color:new Te};break;case"SpotLight":t={position:new z,direction:new z,color:new Te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new Te,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new Te,groundColor:new Te};break;case"RectAreaLight":t={color:new Te,position:new z,halfWidth:new z,halfHeight:new z};break}return i[e.id]=t,t}}}function Yb(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Kb=0;function Jb(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Zb(i){const e=new qb,t=Yb(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new z);const s=new z,r=new ze,a=new ze;function o(l){let h=0,d=0,u=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,p=0,_=0,g=0,m=0,v=0,x=0,b=0,E=0,S=0,A=0;l.sort(Jb);for(let M=0,y=l.length;M<y;M++){const P=l[M],U=P.color,T=P.intensity,w=P.distance,L=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=U.r*T,d+=U.g*T,u+=U.b*T;else if(P.isLightProbe){for(let O=0;O<9;O++)n.probe[O].addScaledVector(P.sh.coefficients[O],T);A++}else if(P.isDirectionalLight){const O=e.get(P);if(O.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const V=P.shadow,N=t.get(P);N.shadowIntensity=V.intensity,N.shadowBias=V.bias,N.shadowNormalBias=V.normalBias,N.shadowRadius=V.radius,N.shadowMapSize=V.mapSize,n.directionalShadow[f]=N,n.directionalShadowMap[f]=L,n.directionalShadowMatrix[f]=P.shadow.matrix,v++}n.directional[f]=O,f++}else if(P.isSpotLight){const O=e.get(P);O.position.setFromMatrixPosition(P.matrixWorld),O.color.copy(U).multiplyScalar(T),O.distance=w,O.coneCos=Math.cos(P.angle),O.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),O.decay=P.decay,n.spot[_]=O;const V=P.shadow;if(P.map&&(n.spotLightMap[E]=P.map,E++,V.updateMatrices(P),P.castShadow&&S++),n.spotLightMatrix[_]=V.matrix,P.castShadow){const N=t.get(P);N.shadowIntensity=V.intensity,N.shadowBias=V.bias,N.shadowNormalBias=V.normalBias,N.shadowRadius=V.radius,N.shadowMapSize=V.mapSize,n.spotShadow[_]=N,n.spotShadowMap[_]=L,b++}_++}else if(P.isRectAreaLight){const O=e.get(P);O.color.copy(U).multiplyScalar(T),O.halfWidth.set(P.width*.5,0,0),O.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=O,g++}else if(P.isPointLight){const O=e.get(P);if(O.color.copy(P.color).multiplyScalar(P.intensity),O.distance=P.distance,O.decay=P.decay,P.castShadow){const V=P.shadow,N=t.get(P);N.shadowIntensity=V.intensity,N.shadowBias=V.bias,N.shadowNormalBias=V.normalBias,N.shadowRadius=V.radius,N.shadowMapSize=V.mapSize,N.shadowCameraNear=V.camera.near,N.shadowCameraFar=V.camera.far,n.pointShadow[p]=N,n.pointShadowMap[p]=L,n.pointShadowMatrix[p]=P.shadow.matrix,x++}n.point[p]=O,p++}else if(P.isHemisphereLight){const O=e.get(P);O.skyColor.copy(P.color).multiplyScalar(T),O.groundColor.copy(P.groundColor).multiplyScalar(T),n.hemi[m]=O,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=fe.LTC_FLOAT_1,n.rectAreaLTC2=fe.LTC_FLOAT_2):(n.rectAreaLTC1=fe.LTC_HALF_1,n.rectAreaLTC2=fe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const R=n.hash;(R.directionalLength!==f||R.pointLength!==p||R.spotLength!==_||R.rectAreaLength!==g||R.hemiLength!==m||R.numDirectionalShadows!==v||R.numPointShadows!==x||R.numSpotShadows!==b||R.numSpotMaps!==E||R.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=b+E-S,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=A,R.directionalLength=f,R.pointLength=p,R.spotLength=_,R.rectAreaLength=g,R.hemiLength=m,R.numDirectionalShadows=v,R.numPointShadows=x,R.numSpotShadows=b,R.numSpotMaps=E,R.numLightProbes=A,n.version=Kb++)}function c(l,h){let d=0,u=0,f=0,p=0,_=0;const g=h.matrixWorldInverse;for(let m=0,v=l.length;m<v;m++){const x=l[m];if(x.isDirectionalLight){const b=n.directional[d];b.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(g),d++}else if(x.isSpotLight){const b=n.spot[f];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(g),b.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(g),f++}else if(x.isRectAreaLight){const b=n.rectArea[p];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(g),a.identity(),r.copy(x.matrixWorld),r.premultiply(g),a.extractRotation(r),b.halfWidth.set(x.width*.5,0,0),b.halfHeight.set(0,x.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),p++}else if(x.isPointLight){const b=n.point[u];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(g),u++}else if(x.isHemisphereLight){const b=n.hemi[_];b.direction.setFromMatrixPosition(x.matrixWorld),b.direction.transformDirection(g),_++}}}return{setup:o,setupView:c,state:n}}function Ph(i){const e=new Zb(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Qb(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Ph(i),e.set(s,[o])):r>=a.length?(o=new Ph(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class $b extends zn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Lf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class e_ extends zn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const t_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,n_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function i_(i,e,t){let n=new tl;const s=new ue,r=new ue,a=new st,o=new $b({depthPacking:Df}),c=new e_,l={},h=t.maxTextureSize,d={[li]:Yt,[Yt]:li,[At]:At},u=new Lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:t_,fragmentShader:n_}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const p=new mt;p.setAttribute("position",new vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new et(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ru;let m=this.type;this.render=function(S,A,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;const M=i.getRenderTarget(),y=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),U=i.state;U.setBlending(ai),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const T=m!==Qn&&this.type===Qn,w=m===Qn&&this.type!==Qn;for(let L=0,O=S.length;L<O;L++){const V=S[L],N=V.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;s.copy(N.mapSize);const q=N.getFrameExtents();if(s.multiply(q),r.copy(N.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,N.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,N.mapSize.y=r.y)),N.map===null||T===!0||w===!0){const ne=this.type!==Qn?{minFilter:Kt,magFilter:Kt}:{};N.map!==null&&N.map.dispose(),N.map=new fn(s.x,s.y,ne),N.map.texture.name=V.name+".shadowMap",N.camera.updateProjectionMatrix()}i.setRenderTarget(N.map),i.clear();const W=N.getViewportCount();for(let ne=0;ne<W;ne++){const oe=N.getViewport(ne);a.set(r.x*oe.x,r.y*oe.y,r.x*oe.z,r.y*oe.w),U.viewport(a),N.updateMatrices(V,ne),n=N.getFrustum(),b(A,R,N.camera,V,this.type)}N.isPointLightShadow!==!0&&this.type===Qn&&v(N,R),N.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(M,y,P)};function v(S,A){const R=e.update(_);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new fn(s.x,s.y)),u.uniforms.shadow_pass.value=S.map.texture,u.uniforms.resolution.value=S.mapSize,u.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(A,null,R,u,_,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(A,null,R,f,_,null)}function x(S,A,R,M){let y=null;const P=R.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(P!==void 0)y=P;else if(y=R.isPointLight===!0?c:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const U=y.uuid,T=A.uuid;let w=l[U];w===void 0&&(w={},l[U]=w);let L=w[T];L===void 0&&(L=y.clone(),w[T]=L,A.addEventListener("dispose",E)),y=L}if(y.visible=A.visible,y.wireframe=A.wireframe,M===Qn?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:d[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,R.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const U=i.properties.get(y);U.light=R}return y}function b(S,A,R,M,y){if(S.visible===!1)return;if(S.layers.test(A.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&y===Qn)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,S.matrixWorld);const T=e.update(S),w=S.material;if(Array.isArray(w)){const L=T.groups;for(let O=0,V=L.length;O<V;O++){const N=L[O],q=w[N.materialIndex];if(q&&q.visible){const W=x(S,q,M,y);S.onBeforeShadow(i,S,A,R,T,W,N),i.renderBufferDirect(R,null,T,W,S,N),S.onAfterShadow(i,S,A,R,T,W,N)}}}else if(w.visible){const L=x(S,w,M,y);S.onBeforeShadow(i,S,A,R,T,L,null),i.renderBufferDirect(R,null,T,L,S,null),S.onAfterShadow(i,S,A,R,T,L,null)}}const U=S.children;for(let T=0,w=U.length;T<w;T++)b(U[T],A,R,M,y)}function E(S){S.target.removeEventListener("dispose",E);for(const R in l){const M=l[R],y=S.target.uuid;y in M&&(M[y].dispose(),delete M[y])}}}const s_={[Ko]:Jo,[Zo]:ec,[Qo]:tc,[ws]:$o,[Jo]:Ko,[ec]:Zo,[tc]:Qo,[$o]:ws};function r_(i,e){function t(){let k=!1;const be=new st;let Q=null;const se=new st(0,0,0,0);return{setMask:function(ye){Q!==ye&&!k&&(i.colorMask(ye,ye,ye,ye),Q=ye)},setLocked:function(ye){k=ye},setClear:function(ye,xe,We,yt,Ft){Ft===!0&&(ye*=yt,xe*=yt,We*=yt),be.set(ye,xe,We,yt),se.equals(be)===!1&&(i.clearColor(ye,xe,We,yt),se.copy(be))},reset:function(){k=!1,Q=null,se.set(-1,0,0,0)}}}function n(){let k=!1,be=!1,Q=null,se=null,ye=null;return{setReversed:function(xe){if(be!==xe){const We=e.get("EXT_clip_control");be?We.clipControlEXT(We.LOWER_LEFT_EXT,We.ZERO_TO_ONE_EXT):We.clipControlEXT(We.LOWER_LEFT_EXT,We.NEGATIVE_ONE_TO_ONE_EXT);const yt=ye;ye=null,this.setClear(yt)}be=xe},getReversed:function(){return be},setTest:function(xe){xe?de(i.DEPTH_TEST):Le(i.DEPTH_TEST)},setMask:function(xe){Q!==xe&&!k&&(i.depthMask(xe),Q=xe)},setFunc:function(xe){if(be&&(xe=s_[xe]),se!==xe){switch(xe){case Ko:i.depthFunc(i.NEVER);break;case Jo:i.depthFunc(i.ALWAYS);break;case Zo:i.depthFunc(i.LESS);break;case ws:i.depthFunc(i.LEQUAL);break;case Qo:i.depthFunc(i.EQUAL);break;case $o:i.depthFunc(i.GEQUAL);break;case ec:i.depthFunc(i.GREATER);break;case tc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}se=xe}},setLocked:function(xe){k=xe},setClear:function(xe){ye!==xe&&(be&&(xe=1-xe),i.clearDepth(xe),ye=xe)},reset:function(){k=!1,Q=null,se=null,ye=null,be=!1}}}function s(){let k=!1,be=null,Q=null,se=null,ye=null,xe=null,We=null,yt=null,Ft=null;return{setTest:function(lt){k||(lt?de(i.STENCIL_TEST):Le(i.STENCIL_TEST))},setMask:function(lt){be!==lt&&!k&&(i.stencilMask(lt),be=lt)},setFunc:function(lt,mn,Wn){(Q!==lt||se!==mn||ye!==Wn)&&(i.stencilFunc(lt,mn,Wn),Q=lt,se=mn,ye=Wn)},setOp:function(lt,mn,Wn){(xe!==lt||We!==mn||yt!==Wn)&&(i.stencilOp(lt,mn,Wn),xe=lt,We=mn,yt=Wn)},setLocked:function(lt){k=lt},setClear:function(lt){Ft!==lt&&(i.clearStencil(lt),Ft=lt)},reset:function(){k=!1,be=null,Q=null,se=null,ye=null,xe=null,We=null,yt=null,Ft=null}}}const r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let h={},d={},u=new WeakMap,f=[],p=null,_=!1,g=null,m=null,v=null,x=null,b=null,E=null,S=null,A=new Te(0,0,0),R=0,M=!1,y=null,P=null,U=null,T=null,w=null;const L=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,V=0;const N=i.getParameter(i.VERSION);N.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(N)[1]),O=V>=1):N.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),O=V>=2);let q=null,W={};const ne=i.getParameter(i.SCISSOR_BOX),oe=i.getParameter(i.VIEWPORT),Me=new st().fromArray(ne),J=new st().fromArray(oe);function $(k,be,Q,se){const ye=new Uint8Array(4),xe=i.createTexture();i.bindTexture(k,xe),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let We=0;We<Q;We++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(be,0,i.RGBA,1,1,se,0,i.RGBA,i.UNSIGNED_BYTE,ye):i.texImage2D(be+We,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ye);return xe}const ge={};ge[i.TEXTURE_2D]=$(i.TEXTURE_2D,i.TEXTURE_2D,1),ge[i.TEXTURE_CUBE_MAP]=$(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ge[i.TEXTURE_2D_ARRAY]=$(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ge[i.TEXTURE_3D]=$(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),de(i.DEPTH_TEST),a.setFunc(ws),ee(!1),ce(Nl),de(i.CULL_FACE),F(ai);function de(k){h[k]!==!0&&(i.enable(k),h[k]=!0)}function Le(k){h[k]!==!1&&(i.disable(k),h[k]=!1)}function Fe(k,be){return d[k]!==be?(i.bindFramebuffer(k,be),d[k]=be,k===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=be),k===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=be),!0):!1}function Ge(k,be){let Q=f,se=!1;if(k){Q=u.get(be),Q===void 0&&(Q=[],u.set(be,Q));const ye=k.textures;if(Q.length!==ye.length||Q[0]!==i.COLOR_ATTACHMENT0){for(let xe=0,We=ye.length;xe<We;xe++)Q[xe]=i.COLOR_ATTACHMENT0+xe;Q.length=ye.length,se=!0}}else Q[0]!==i.BACK&&(Q[0]=i.BACK,se=!0);se&&i.drawBuffers(Q)}function j(k){return p!==k?(i.useProgram(k),p=k,!0):!1}const B={[Xi]:i.FUNC_ADD,[cf]:i.FUNC_SUBTRACT,[lf]:i.FUNC_REVERSE_SUBTRACT};B[hf]=i.MIN,B[uf]=i.MAX;const Z={[df]:i.ZERO,[ff]:i.ONE,[pf]:i.SRC_COLOR,[qo]:i.SRC_ALPHA,[vf]:i.SRC_ALPHA_SATURATE,[_f]:i.DST_COLOR,[gf]:i.DST_ALPHA,[mf]:i.ONE_MINUS_SRC_COLOR,[Yo]:i.ONE_MINUS_SRC_ALPHA,[xf]:i.ONE_MINUS_DST_COLOR,[bf]:i.ONE_MINUS_DST_ALPHA,[Mf]:i.CONSTANT_COLOR,[yf]:i.ONE_MINUS_CONSTANT_COLOR,[Sf]:i.CONSTANT_ALPHA,[Ef]:i.ONE_MINUS_CONSTANT_ALPHA};function F(k,be,Q,se,ye,xe,We,yt,Ft,lt){if(k===ai){_===!0&&(Le(i.BLEND),_=!1);return}if(_===!1&&(de(i.BLEND),_=!0),k!==of){if(k!==g||lt!==M){if((m!==Xi||b!==Xi)&&(i.blendEquation(i.FUNC_ADD),m=Xi,b=Xi),lt)switch(k){case ys:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Sa:i.blendFunc(i.ONE,i.ONE);break;case Fl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ol:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case ys:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Sa:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Fl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ol:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}v=null,x=null,E=null,S=null,A.set(0,0,0),R=0,g=k,M=lt}return}ye=ye||be,xe=xe||Q,We=We||se,(be!==m||ye!==b)&&(i.blendEquationSeparate(B[be],B[ye]),m=be,b=ye),(Q!==v||se!==x||xe!==E||We!==S)&&(i.blendFuncSeparate(Z[Q],Z[se],Z[xe],Z[We]),v=Q,x=se,E=xe,S=We),(yt.equals(A)===!1||Ft!==R)&&(i.blendColor(yt.r,yt.g,yt.b,Ft),A.copy(yt),R=Ft),g=k,M=!1}function ae(k,be){k.side===At?Le(i.CULL_FACE):de(i.CULL_FACE);let Q=k.side===Yt;be&&(Q=!Q),ee(Q),k.blending===ys&&k.transparent===!1?F(ai):F(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),r.setMask(k.colorWrite);const se=k.stencilWrite;o.setTest(se),se&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Oe(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?de(i.SAMPLE_ALPHA_TO_COVERAGE):Le(i.SAMPLE_ALPHA_TO_COVERAGE)}function ee(k){y!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),y=k)}function ce(k){k!==rf?(de(i.CULL_FACE),k!==P&&(k===Nl?i.cullFace(i.BACK):k===af?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Le(i.CULL_FACE),P=k}function me(k){k!==U&&(O&&i.lineWidth(k),U=k)}function Oe(k,be,Q){k?(de(i.POLYGON_OFFSET_FILL),(T!==be||w!==Q)&&(i.polygonOffset(be,Q),T=be,w=Q)):Le(i.POLYGON_OFFSET_FILL)}function Ee(k){k?de(i.SCISSOR_TEST):Le(i.SCISSOR_TEST)}function D(k){k===void 0&&(k=i.TEXTURE0+L-1),q!==k&&(i.activeTexture(k),q=k)}function C(k,be,Q){Q===void 0&&(q===null?Q=i.TEXTURE0+L-1:Q=q);let se=W[Q];se===void 0&&(se={type:void 0,texture:void 0},W[Q]=se),(se.type!==k||se.texture!==be)&&(q!==Q&&(i.activeTexture(Q),q=Q),i.bindTexture(k,be||ge[k]),se.type=k,se.texture=be)}function X(){const k=W[q];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function ie(){try{i.compressedTexImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function re(){try{i.compressedTexImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function te(){try{i.texSubImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function De(){try{i.texSubImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function _e(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ae(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function tt(){try{i.texStorage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function le(){try{i.texStorage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function we(){try{i.texImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Be(){try{i.texImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ke(k){Me.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),Me.copy(k))}function Re(k){J.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),J.copy(k))}function $e(k,be){let Q=l.get(be);Q===void 0&&(Q=new WeakMap,l.set(be,Q));let se=Q.get(k);se===void 0&&(se=i.getUniformBlockIndex(be,k.name),Q.set(k,se))}function Ye(k,be){const se=l.get(be).get(k);c.get(be)!==se&&(i.uniformBlockBinding(be,se,k.__bindingPointIndex),c.set(be,se))}function ft(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},q=null,W={},d={},u=new WeakMap,f=[],p=null,_=!1,g=null,m=null,v=null,x=null,b=null,E=null,S=null,A=new Te(0,0,0),R=0,M=!1,y=null,P=null,U=null,T=null,w=null,Me.set(0,0,i.canvas.width,i.canvas.height),J.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:de,disable:Le,bindFramebuffer:Fe,drawBuffers:Ge,useProgram:j,setBlending:F,setMaterial:ae,setFlipSided:ee,setCullFace:ce,setLineWidth:me,setPolygonOffset:Oe,setScissorTest:Ee,activeTexture:D,bindTexture:C,unbindTexture:X,compressedTexImage2D:ie,compressedTexImage3D:re,texImage2D:we,texImage3D:Be,updateUBOMapping:$e,uniformBlockBinding:Ye,texStorage2D:tt,texStorage3D:le,texSubImage2D:te,texSubImage3D:De,compressedTexSubImage2D:_e,compressedTexSubImage3D:Ae,scissor:ke,viewport:Re,reset:ft}}function Ih(i,e,t,n){const s=a_(n);switch(t){case Hu:return i*e;case Vu:return i*e;case Wu:return i*e*2;case Yc:return i*e/s.components*s.byteLength;case Kc:return i*e/s.components*s.byteLength;case Xu:return i*e*2/s.components*s.byteLength;case Jc:return i*e*2/s.components*s.byteLength;case Gu:return i*e*3/s.components*s.byteLength;case un:return i*e*4/s.components*s.byteLength;case Zc:return i*e*4/s.components*s.byteLength;case fa:case pa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ma:case ga:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case sc:case ac:return Math.max(i,16)*Math.max(e,8)/4;case ic:case rc:return Math.max(i,8)*Math.max(e,8)/2;case oc:case cc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case lc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case hc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case uc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case dc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case fc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case pc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case mc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case gc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case bc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case _c:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case xc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case vc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Mc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case yc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Sc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ba:case Ec:case Tc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ju:case Ac:return Math.ceil(i/4)*Math.ceil(e/4)*8;case wc:case Rc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function a_(i){switch(i){case hi:case zu:return{byteLength:1,components:1};case gr:case Bu:case $t:return{byteLength:2,components:1};case jc:case qc:return{byteLength:2,components:4};case Zi:case Xc:case Qt:return{byteLength:4,components:1};case ku:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function o_(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ue,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(D,C){return f?new OffscreenCanvas(D,C):xr("canvas")}function _(D,C,X){let ie=1;const re=Ee(D);if((re.width>X||re.height>X)&&(ie=X/Math.max(re.width,re.height)),ie<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const te=Math.floor(ie*re.width),De=Math.floor(ie*re.height);d===void 0&&(d=p(te,De));const _e=C?p(te,De):d;return _e.width=te,_e.height=De,_e.getContext("2d").drawImage(D,0,0,te,De),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+te+"x"+De+")."),_e}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),D;return D}function g(D){return D.generateMipmaps}function m(D){i.generateMipmap(D)}function v(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(D,C,X,ie,re=!1){if(D!==null){if(i[D]!==void 0)return i[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let te=C;if(C===i.RED&&(X===i.FLOAT&&(te=i.R32F),X===i.HALF_FLOAT&&(te=i.R16F),X===i.UNSIGNED_BYTE&&(te=i.R8)),C===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(te=i.R8UI),X===i.UNSIGNED_SHORT&&(te=i.R16UI),X===i.UNSIGNED_INT&&(te=i.R32UI),X===i.BYTE&&(te=i.R8I),X===i.SHORT&&(te=i.R16I),X===i.INT&&(te=i.R32I)),C===i.RG&&(X===i.FLOAT&&(te=i.RG32F),X===i.HALF_FLOAT&&(te=i.RG16F),X===i.UNSIGNED_BYTE&&(te=i.RG8)),C===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(te=i.RG8UI),X===i.UNSIGNED_SHORT&&(te=i.RG16UI),X===i.UNSIGNED_INT&&(te=i.RG32UI),X===i.BYTE&&(te=i.RG8I),X===i.SHORT&&(te=i.RG16I),X===i.INT&&(te=i.RG32I)),C===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(te=i.RGB8UI),X===i.UNSIGNED_SHORT&&(te=i.RGB16UI),X===i.UNSIGNED_INT&&(te=i.RGB32UI),X===i.BYTE&&(te=i.RGB8I),X===i.SHORT&&(te=i.RGB16I),X===i.INT&&(te=i.RGB32I)),C===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(te=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(te=i.RGBA16UI),X===i.UNSIGNED_INT&&(te=i.RGBA32UI),X===i.BYTE&&(te=i.RGBA8I),X===i.SHORT&&(te=i.RGBA16I),X===i.INT&&(te=i.RGBA32I)),C===i.RGB&&X===i.UNSIGNED_INT_5_9_9_9_REV&&(te=i.RGB9_E5),C===i.RGBA){const De=re?za:Qe.getTransfer(ie);X===i.FLOAT&&(te=i.RGBA32F),X===i.HALF_FLOAT&&(te=i.RGBA16F),X===i.UNSIGNED_BYTE&&(te=De===ht?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT_4_4_4_4&&(te=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(te=i.RGB5_A1)}return(te===i.R16F||te===i.R32F||te===i.RG16F||te===i.RG32F||te===i.RGBA16F||te===i.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function b(D,C){let X;return D?C===null||C===Zi||C===Ps?X=i.DEPTH24_STENCIL8:C===Qt?X=i.DEPTH32F_STENCIL8:C===gr&&(X=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===Zi||C===Ps?X=i.DEPTH_COMPONENT24:C===Qt?X=i.DEPTH_COMPONENT32F:C===gr&&(X=i.DEPTH_COMPONENT16),X}function E(D,C){return g(D)===!0||D.isFramebufferTexture&&D.minFilter!==Kt&&D.minFilter!==It?Math.log2(Math.max(C.width,C.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?C.mipmaps.length:1}function S(D){const C=D.target;C.removeEventListener("dispose",S),R(C),C.isVideoTexture&&h.delete(C)}function A(D){const C=D.target;C.removeEventListener("dispose",A),y(C)}function R(D){const C=n.get(D);if(C.__webglInit===void 0)return;const X=D.source,ie=u.get(X);if(ie){const re=ie[C.__cacheKey];re.usedTimes--,re.usedTimes===0&&M(D),Object.keys(ie).length===0&&u.delete(X)}n.remove(D)}function M(D){const C=n.get(D);i.deleteTexture(C.__webglTexture);const X=D.source,ie=u.get(X);delete ie[C.__cacheKey],a.memory.textures--}function y(D){const C=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(C.__webglFramebuffer[ie]))for(let re=0;re<C.__webglFramebuffer[ie].length;re++)i.deleteFramebuffer(C.__webglFramebuffer[ie][re]);else i.deleteFramebuffer(C.__webglFramebuffer[ie]);C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer[ie])}else{if(Array.isArray(C.__webglFramebuffer))for(let ie=0;ie<C.__webglFramebuffer.length;ie++)i.deleteFramebuffer(C.__webglFramebuffer[ie]);else i.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&i.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let ie=0;ie<C.__webglColorRenderbuffer.length;ie++)C.__webglColorRenderbuffer[ie]&&i.deleteRenderbuffer(C.__webglColorRenderbuffer[ie]);C.__webglDepthRenderbuffer&&i.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const X=D.textures;for(let ie=0,re=X.length;ie<re;ie++){const te=n.get(X[ie]);te.__webglTexture&&(i.deleteTexture(te.__webglTexture),a.memory.textures--),n.remove(X[ie])}n.remove(D)}let P=0;function U(){P=0}function T(){const D=P;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),P+=1,D}function w(D){const C=[];return C.push(D.wrapS),C.push(D.wrapT),C.push(D.wrapR||0),C.push(D.magFilter),C.push(D.minFilter),C.push(D.anisotropy),C.push(D.internalFormat),C.push(D.format),C.push(D.type),C.push(D.generateMipmaps),C.push(D.premultiplyAlpha),C.push(D.flipY),C.push(D.unpackAlignment),C.push(D.colorSpace),C.join()}function L(D,C){const X=n.get(D);if(D.isVideoTexture&&me(D),D.isRenderTargetTexture===!1&&D.version>0&&X.__version!==D.version){const ie=D.image;if(ie===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(X,D,C);return}}t.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+C)}function O(D,C){const X=n.get(D);if(D.version>0&&X.__version!==D.version){J(X,D,C);return}t.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+C)}function V(D,C){const X=n.get(D);if(D.version>0&&X.__version!==D.version){J(X,D,C);return}t.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+C)}function N(D,C){const X=n.get(D);if(D.version>0&&X.__version!==D.version){$(X,D,C);return}t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+C)}const q={[An]:i.REPEAT,[Fn]:i.CLAMP_TO_EDGE,[Ta]:i.MIRRORED_REPEAT},W={[Kt]:i.NEAREST,[Ou]:i.NEAREST_MIPMAP_NEAREST,[rr]:i.NEAREST_MIPMAP_LINEAR,[It]:i.LINEAR,[da]:i.LINEAR_MIPMAP_NEAREST,[On]:i.LINEAR_MIPMAP_LINEAR},ne={[Nf]:i.NEVER,[Hf]:i.ALWAYS,[Ff]:i.LESS,[Zu]:i.LEQUAL,[Of]:i.EQUAL,[kf]:i.GEQUAL,[zf]:i.GREATER,[Bf]:i.NOTEQUAL};function oe(D,C){if(C.type===Qt&&e.has("OES_texture_float_linear")===!1&&(C.magFilter===It||C.magFilter===da||C.magFilter===rr||C.magFilter===On||C.minFilter===It||C.minFilter===da||C.minFilter===rr||C.minFilter===On)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,q[C.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,q[C.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,q[C.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,W[C.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,W[C.minFilter]),C.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,ne[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===Kt||C.minFilter!==rr&&C.minFilter!==On||C.type===Qt&&e.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");i.texParameterf(D,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,s.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function Me(D,C){let X=!1;D.__webglInit===void 0&&(D.__webglInit=!0,C.addEventListener("dispose",S));const ie=C.source;let re=u.get(ie);re===void 0&&(re={},u.set(ie,re));const te=w(C);if(te!==D.__cacheKey){re[te]===void 0&&(re[te]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,X=!0),re[te].usedTimes++;const De=re[D.__cacheKey];De!==void 0&&(re[D.__cacheKey].usedTimes--,De.usedTimes===0&&M(C)),D.__cacheKey=te,D.__webglTexture=re[te].texture}return X}function J(D,C,X){let ie=i.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(ie=i.TEXTURE_2D_ARRAY),C.isData3DTexture&&(ie=i.TEXTURE_3D);const re=Me(D,C),te=C.source;t.bindTexture(ie,D.__webglTexture,i.TEXTURE0+X);const De=n.get(te);if(te.version!==De.__version||re===!0){t.activeTexture(i.TEXTURE0+X);const _e=Qe.getPrimaries(Qe.workingColorSpace),Ae=C.colorSpace===Ti?null:Qe.getPrimaries(C.colorSpace),tt=C.colorSpace===Ti||_e===Ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,C.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,C.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt);let le=_(C.image,!1,s.maxTextureSize);le=Oe(C,le);const we=r.convert(C.format,C.colorSpace),Be=r.convert(C.type);let ke=x(C.internalFormat,we,Be,C.colorSpace,C.isVideoTexture);oe(ie,C);let Re;const $e=C.mipmaps,Ye=C.isVideoTexture!==!0,ft=De.__version===void 0||re===!0,k=te.dataReady,be=E(C,le);if(C.isDepthTexture)ke=b(C.format===Is,C.type),ft&&(Ye?t.texStorage2D(i.TEXTURE_2D,1,ke,le.width,le.height):t.texImage2D(i.TEXTURE_2D,0,ke,le.width,le.height,0,we,Be,null));else if(C.isDataTexture)if($e.length>0){Ye&&ft&&t.texStorage2D(i.TEXTURE_2D,be,ke,$e[0].width,$e[0].height);for(let Q=0,se=$e.length;Q<se;Q++)Re=$e[Q],Ye?k&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,Re.width,Re.height,we,Be,Re.data):t.texImage2D(i.TEXTURE_2D,Q,ke,Re.width,Re.height,0,we,Be,Re.data);C.generateMipmaps=!1}else Ye?(ft&&t.texStorage2D(i.TEXTURE_2D,be,ke,le.width,le.height),k&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,le.width,le.height,we,Be,le.data)):t.texImage2D(i.TEXTURE_2D,0,ke,le.width,le.height,0,we,Be,le.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){Ye&&ft&&t.texStorage3D(i.TEXTURE_2D_ARRAY,be,ke,$e[0].width,$e[0].height,le.depth);for(let Q=0,se=$e.length;Q<se;Q++)if(Re=$e[Q],C.format!==un)if(we!==null)if(Ye){if(k)if(C.layerUpdates.size>0){const ye=Ih(Re.width,Re.height,C.format,C.type);for(const xe of C.layerUpdates){const We=Re.data.subarray(xe*ye/Re.data.BYTES_PER_ELEMENT,(xe+1)*ye/Re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,xe,Re.width,Re.height,1,we,We)}C.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,Re.width,Re.height,le.depth,we,Re.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Q,ke,Re.width,Re.height,le.depth,0,Re.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ye?k&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,Re.width,Re.height,le.depth,we,Be,Re.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Q,ke,Re.width,Re.height,le.depth,0,we,Be,Re.data)}else{Ye&&ft&&t.texStorage2D(i.TEXTURE_2D,be,ke,$e[0].width,$e[0].height);for(let Q=0,se=$e.length;Q<se;Q++)Re=$e[Q],C.format!==un?we!==null?Ye?k&&t.compressedTexSubImage2D(i.TEXTURE_2D,Q,0,0,Re.width,Re.height,we,Re.data):t.compressedTexImage2D(i.TEXTURE_2D,Q,ke,Re.width,Re.height,0,Re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?k&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,Re.width,Re.height,we,Be,Re.data):t.texImage2D(i.TEXTURE_2D,Q,ke,Re.width,Re.height,0,we,Be,Re.data)}else if(C.isDataArrayTexture)if(Ye){if(ft&&t.texStorage3D(i.TEXTURE_2D_ARRAY,be,ke,le.width,le.height,le.depth),k)if(C.layerUpdates.size>0){const Q=Ih(le.width,le.height,C.format,C.type);for(const se of C.layerUpdates){const ye=le.data.subarray(se*Q/le.data.BYTES_PER_ELEMENT,(se+1)*Q/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,se,le.width,le.height,1,we,Be,ye)}C.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,we,Be,le.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ke,le.width,le.height,le.depth,0,we,Be,le.data);else if(C.isData3DTexture)Ye?(ft&&t.texStorage3D(i.TEXTURE_3D,be,ke,le.width,le.height,le.depth),k&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,we,Be,le.data)):t.texImage3D(i.TEXTURE_3D,0,ke,le.width,le.height,le.depth,0,we,Be,le.data);else if(C.isFramebufferTexture){if(ft)if(Ye)t.texStorage2D(i.TEXTURE_2D,be,ke,le.width,le.height);else{let Q=le.width,se=le.height;for(let ye=0;ye<be;ye++)t.texImage2D(i.TEXTURE_2D,ye,ke,Q,se,0,we,Be,null),Q>>=1,se>>=1}}else if($e.length>0){if(Ye&&ft){const Q=Ee($e[0]);t.texStorage2D(i.TEXTURE_2D,be,ke,Q.width,Q.height)}for(let Q=0,se=$e.length;Q<se;Q++)Re=$e[Q],Ye?k&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,we,Be,Re):t.texImage2D(i.TEXTURE_2D,Q,ke,we,Be,Re);C.generateMipmaps=!1}else if(Ye){if(ft){const Q=Ee(le);t.texStorage2D(i.TEXTURE_2D,be,ke,Q.width,Q.height)}k&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,we,Be,le)}else t.texImage2D(i.TEXTURE_2D,0,ke,we,Be,le);g(C)&&m(ie),De.__version=te.version,C.onUpdate&&C.onUpdate(C)}D.__version=C.version}function $(D,C,X){if(C.image.length!==6)return;const ie=Me(D,C),re=C.source;t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+X);const te=n.get(re);if(re.version!==te.__version||ie===!0){t.activeTexture(i.TEXTURE0+X);const De=Qe.getPrimaries(Qe.workingColorSpace),_e=C.colorSpace===Ti?null:Qe.getPrimaries(C.colorSpace),Ae=C.colorSpace===Ti||De===_e?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,C.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,C.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const tt=C.isCompressedTexture||C.image[0].isCompressedTexture,le=C.image[0]&&C.image[0].isDataTexture,we=[];for(let se=0;se<6;se++)!tt&&!le?we[se]=_(C.image[se],!0,s.maxCubemapSize):we[se]=le?C.image[se].image:C.image[se],we[se]=Oe(C,we[se]);const Be=we[0],ke=r.convert(C.format,C.colorSpace),Re=r.convert(C.type),$e=x(C.internalFormat,ke,Re,C.colorSpace),Ye=C.isVideoTexture!==!0,ft=te.__version===void 0||ie===!0,k=re.dataReady;let be=E(C,Be);oe(i.TEXTURE_CUBE_MAP,C);let Q;if(tt){Ye&&ft&&t.texStorage2D(i.TEXTURE_CUBE_MAP,be,$e,Be.width,Be.height);for(let se=0;se<6;se++){Q=we[se].mipmaps;for(let ye=0;ye<Q.length;ye++){const xe=Q[ye];C.format!==un?ke!==null?Ye?k&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ye,0,0,xe.width,xe.height,ke,xe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ye,$e,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ye?k&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ye,0,0,xe.width,xe.height,ke,Re,xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ye,$e,xe.width,xe.height,0,ke,Re,xe.data)}}}else{if(Q=C.mipmaps,Ye&&ft){Q.length>0&&be++;const se=Ee(we[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,be,$e,se.width,se.height)}for(let se=0;se<6;se++)if(le){Ye?k&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,we[se].width,we[se].height,ke,Re,we[se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,$e,we[se].width,we[se].height,0,ke,Re,we[se].data);for(let ye=0;ye<Q.length;ye++){const We=Q[ye].image[se].image;Ye?k&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ye+1,0,0,We.width,We.height,ke,Re,We.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ye+1,$e,We.width,We.height,0,ke,Re,We.data)}}else{Ye?k&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,ke,Re,we[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,$e,ke,Re,we[se]);for(let ye=0;ye<Q.length;ye++){const xe=Q[ye];Ye?k&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ye+1,0,0,ke,Re,xe.image[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ye+1,$e,ke,Re,xe.image[se])}}}g(C)&&m(i.TEXTURE_CUBE_MAP),te.__version=re.version,C.onUpdate&&C.onUpdate(C)}D.__version=C.version}function ge(D,C,X,ie,re,te){const De=r.convert(X.format,X.colorSpace),_e=r.convert(X.type),Ae=x(X.internalFormat,De,_e,X.colorSpace),tt=n.get(C),le=n.get(X);if(le.__renderTarget=C,!tt.__hasExternalTextures){const we=Math.max(1,C.width>>te),Be=Math.max(1,C.height>>te);re===i.TEXTURE_3D||re===i.TEXTURE_2D_ARRAY?t.texImage3D(re,te,Ae,we,Be,C.depth,0,De,_e,null):t.texImage2D(re,te,Ae,we,Be,0,De,_e,null)}t.bindFramebuffer(i.FRAMEBUFFER,D),ce(C)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,re,le.__webglTexture,0,ee(C)):(re===i.TEXTURE_2D||re>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ie,re,le.__webglTexture,te),t.bindFramebuffer(i.FRAMEBUFFER,null)}function de(D,C,X){if(i.bindRenderbuffer(i.RENDERBUFFER,D),C.depthBuffer){const ie=C.depthTexture,re=ie&&ie.isDepthTexture?ie.type:null,te=b(C.stencilBuffer,re),De=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=ee(C);ce(C)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_e,te,C.width,C.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,_e,te,C.width,C.height):i.renderbufferStorage(i.RENDERBUFFER,te,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,De,i.RENDERBUFFER,D)}else{const ie=C.textures;for(let re=0;re<ie.length;re++){const te=ie[re],De=r.convert(te.format,te.colorSpace),_e=r.convert(te.type),Ae=x(te.internalFormat,De,_e,te.colorSpace),tt=ee(C);X&&ce(C)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,tt,Ae,C.width,C.height):ce(C)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,tt,Ae,C.width,C.height):i.renderbufferStorage(i.RENDERBUFFER,Ae,C.width,C.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Le(D,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,D),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ie=n.get(C.depthTexture);ie.__renderTarget=C,(!ie.__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),L(C.depthTexture,0);const re=ie.__webglTexture,te=ee(C);if(C.depthTexture.format===Ss)ce(C)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,re,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,re,0);else if(C.depthTexture.format===Is)ce(C)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,re,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function Fe(D){const C=n.get(D),X=D.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==D.depthTexture){const ie=D.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),ie){const re=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,ie.removeEventListener("dispose",re)};ie.addEventListener("dispose",re),C.__depthDisposeCallback=re}C.__boundDepthTexture=ie}if(D.depthTexture&&!C.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");Le(C.__webglFramebuffer,D)}else if(X){C.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)if(t.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer[ie]),C.__webglDepthbuffer[ie]===void 0)C.__webglDepthbuffer[ie]=i.createRenderbuffer(),de(C.__webglDepthbuffer[ie],D,!1);else{const re=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=C.__webglDepthbuffer[ie];i.bindRenderbuffer(i.RENDERBUFFER,te),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,te)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=i.createRenderbuffer(),de(C.__webglDepthbuffer,D,!1);else{const ie=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=C.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,re),i.framebufferRenderbuffer(i.FRAMEBUFFER,ie,i.RENDERBUFFER,re)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ge(D,C,X){const ie=n.get(D);C!==void 0&&ge(ie.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&Fe(D)}function j(D){const C=D.texture,X=n.get(D),ie=n.get(C);D.addEventListener("dispose",A);const re=D.textures,te=D.isWebGLCubeRenderTarget===!0,De=re.length>1;if(De||(ie.__webglTexture===void 0&&(ie.__webglTexture=i.createTexture()),ie.__version=C.version,a.memory.textures++),te){X.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(C.mipmaps&&C.mipmaps.length>0){X.__webglFramebuffer[_e]=[];for(let Ae=0;Ae<C.mipmaps.length;Ae++)X.__webglFramebuffer[_e][Ae]=i.createFramebuffer()}else X.__webglFramebuffer[_e]=i.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){X.__webglFramebuffer=[];for(let _e=0;_e<C.mipmaps.length;_e++)X.__webglFramebuffer[_e]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(De)for(let _e=0,Ae=re.length;_e<Ae;_e++){const tt=n.get(re[_e]);tt.__webglTexture===void 0&&(tt.__webglTexture=i.createTexture(),a.memory.textures++)}if(D.samples>0&&ce(D)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let _e=0;_e<re.length;_e++){const Ae=re[_e];X.__webglColorRenderbuffer[_e]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[_e]);const tt=r.convert(Ae.format,Ae.colorSpace),le=r.convert(Ae.type),we=x(Ae.internalFormat,tt,le,Ae.colorSpace,D.isXRRenderTarget===!0),Be=ee(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,Be,we,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,X.__webglColorRenderbuffer[_e])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),de(X.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(te){t.bindTexture(i.TEXTURE_CUBE_MAP,ie.__webglTexture),oe(i.TEXTURE_CUBE_MAP,C);for(let _e=0;_e<6;_e++)if(C.mipmaps&&C.mipmaps.length>0)for(let Ae=0;Ae<C.mipmaps.length;Ae++)ge(X.__webglFramebuffer[_e][Ae],D,C,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ae);else ge(X.__webglFramebuffer[_e],D,C,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);g(C)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(De){for(let _e=0,Ae=re.length;_e<Ae;_e++){const tt=re[_e],le=n.get(tt);t.bindTexture(i.TEXTURE_2D,le.__webglTexture),oe(i.TEXTURE_2D,tt),ge(X.__webglFramebuffer,D,tt,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,0),g(tt)&&m(i.TEXTURE_2D)}t.unbindTexture()}else{let _e=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(_e=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(_e,ie.__webglTexture),oe(_e,C),C.mipmaps&&C.mipmaps.length>0)for(let Ae=0;Ae<C.mipmaps.length;Ae++)ge(X.__webglFramebuffer[Ae],D,C,i.COLOR_ATTACHMENT0,_e,Ae);else ge(X.__webglFramebuffer,D,C,i.COLOR_ATTACHMENT0,_e,0);g(C)&&m(_e),t.unbindTexture()}D.depthBuffer&&Fe(D)}function B(D){const C=D.textures;for(let X=0,ie=C.length;X<ie;X++){const re=C[X];if(g(re)){const te=v(D),De=n.get(re).__webglTexture;t.bindTexture(te,De),m(te),t.unbindTexture()}}}const Z=[],F=[];function ae(D){if(D.samples>0){if(ce(D)===!1){const C=D.textures,X=D.width,ie=D.height;let re=i.COLOR_BUFFER_BIT;const te=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,De=n.get(D),_e=C.length>1;if(_e)for(let Ae=0;Ae<C.length;Ae++)t.bindFramebuffer(i.FRAMEBUFFER,De.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,De.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,De.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,De.__webglFramebuffer);for(let Ae=0;Ae<C.length;Ae++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(re|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(re|=i.STENCIL_BUFFER_BIT)),_e){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,De.__webglColorRenderbuffer[Ae]);const tt=n.get(C[Ae]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,tt,0)}i.blitFramebuffer(0,0,X,ie,0,0,X,ie,re,i.NEAREST),c===!0&&(Z.length=0,F.length=0,Z.push(i.COLOR_ATTACHMENT0+Ae),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Z.push(te),F.push(te),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,F)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Z))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),_e)for(let Ae=0;Ae<C.length;Ae++){t.bindFramebuffer(i.FRAMEBUFFER,De.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,De.__webglColorRenderbuffer[Ae]);const tt=n.get(C[Ae]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,De.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,tt,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,De.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&c){const C=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[C])}}}function ee(D){return Math.min(s.maxSamples,D.samples)}function ce(D){const C=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function me(D){const C=a.render.frame;h.get(D)!==C&&(h.set(D,C),D.update())}function Oe(D,C){const X=D.colorSpace,ie=D.format,re=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||X!==Gt&&X!==Ti&&(Qe.getTransfer(X)===ht?(ie!==un||re!==hi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),C}function Ee(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=T,this.resetTextureUnits=U,this.setTexture2D=L,this.setTexture2DArray=O,this.setTexture3D=V,this.setTextureCube=N,this.rebindTextures=Ge,this.setupRenderTarget=j,this.updateRenderTargetMipmap=B,this.updateMultisampleRenderTarget=ae,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=ce}function c_(i,e){function t(n,s=Ti){let r;const a=Qe.getTransfer(s);if(n===hi)return i.UNSIGNED_BYTE;if(n===jc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===qc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ku)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===zu)return i.BYTE;if(n===Bu)return i.SHORT;if(n===gr)return i.UNSIGNED_SHORT;if(n===Xc)return i.INT;if(n===Zi)return i.UNSIGNED_INT;if(n===Qt)return i.FLOAT;if(n===$t)return i.HALF_FLOAT;if(n===Hu)return i.ALPHA;if(n===Gu)return i.RGB;if(n===un)return i.RGBA;if(n===Vu)return i.LUMINANCE;if(n===Wu)return i.LUMINANCE_ALPHA;if(n===Ss)return i.DEPTH_COMPONENT;if(n===Is)return i.DEPTH_STENCIL;if(n===Yc)return i.RED;if(n===Kc)return i.RED_INTEGER;if(n===Xu)return i.RG;if(n===Jc)return i.RG_INTEGER;if(n===Zc)return i.RGBA_INTEGER;if(n===fa||n===pa||n===ma||n===ga)if(a===ht)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===fa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===pa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===fa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===pa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ma)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ga)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ic||n===sc||n===rc||n===ac)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ic)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===sc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===rc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ac)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===oc||n===cc||n===lc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===oc||n===cc)return a===ht?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===lc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===hc||n===uc||n===dc||n===fc||n===pc||n===mc||n===gc||n===bc||n===_c||n===xc||n===vc||n===Mc||n===yc||n===Sc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===hc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===uc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===dc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===pc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===mc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===gc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===bc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===_c)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===xc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===vc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Mc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Sc)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ba||n===Ec||n===Tc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ba)return a===ht?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ec)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Tc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ju||n===Ac||n===wc||n===Rc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===ba)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ac)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===wc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Rc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ps?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class l_ extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Sn extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const h_={type:"move"};class Po{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Sn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Sn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Sn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),m=this._getHandJoint(l,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;l.inputState.pinching&&u>f+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=f-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(h_)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Sn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const u_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,d_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class f_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new wt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Lt({vertexShader:u_,fragmentShader:d_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new et(new Gn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class p_ extends $i{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,p=null;const _=new f_,g=t.getContextAttributes();let m=null,v=null;const x=[],b=[],E=new ue;let S=null;const A=new jt;A.viewport=new st;const R=new jt;R.viewport=new st;const M=[A,R],y=new l_;let P=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let $=x[J];return $===void 0&&($=new Po,x[J]=$),$.getTargetRaySpace()},this.getControllerGrip=function(J){let $=x[J];return $===void 0&&($=new Po,x[J]=$),$.getGripSpace()},this.getHand=function(J){let $=x[J];return $===void 0&&($=new Po,x[J]=$),$.getHandSpace()};function T(J){const $=b.indexOf(J.inputSource);if($===-1)return;const ge=x[$];ge!==void 0&&(ge.update(J.inputSource,J.frame,l||a),ge.dispatchEvent({type:J.type,data:J.inputSource}))}function w(){s.removeEventListener("select",T),s.removeEventListener("selectstart",T),s.removeEventListener("selectend",T),s.removeEventListener("squeeze",T),s.removeEventListener("squeezestart",T),s.removeEventListener("squeezeend",T),s.removeEventListener("end",w),s.removeEventListener("inputsourceschange",L);for(let J=0;J<x.length;J++){const $=b[J];$!==null&&(b[J]=null,x[J].disconnect($))}P=null,U=null,_.reset(),e.setRenderTarget(m),f=null,u=null,d=null,s=null,v=null,Me.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(J){l=J},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",T),s.addEventListener("selectstart",T),s.addEventListener("selectend",T),s.addEventListener("squeeze",T),s.addEventListener("squeezestart",T),s.addEventListener("squeezeend",T),s.addEventListener("end",w),s.addEventListener("inputsourceschange",L),g.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(E),s.renderState.layers===void 0){const $={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,$),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new fn(f.framebufferWidth,f.framebufferHeight,{format:un,type:hi,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let $=null,ge=null,de=null;g.depth&&(de=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,$=g.stencil?Is:Ss,ge=g.stencil?Ps:Zi);const Le={colorFormat:t.RGBA8,depthFormat:de,scaleFactor:r};d=new XRWebGLBinding(s,t),u=d.createProjectionLayer(Le),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),v=new fn(u.textureWidth,u.textureHeight,{format:un,type:hi,depthTexture:new cd(u.textureWidth,u.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Me.setContext(s),Me.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function L(J){for(let $=0;$<J.removed.length;$++){const ge=J.removed[$],de=b.indexOf(ge);de>=0&&(b[de]=null,x[de].disconnect(ge))}for(let $=0;$<J.added.length;$++){const ge=J.added[$];let de=b.indexOf(ge);if(de===-1){for(let Fe=0;Fe<x.length;Fe++)if(Fe>=b.length){b.push(ge),de=Fe;break}else if(b[Fe]===null){b[Fe]=ge,de=Fe;break}if(de===-1)break}const Le=x[de];Le&&Le.connect(ge)}}const O=new z,V=new z;function N(J,$,ge){O.setFromMatrixPosition($.matrixWorld),V.setFromMatrixPosition(ge.matrixWorld);const de=O.distanceTo(V),Le=$.projectionMatrix.elements,Fe=ge.projectionMatrix.elements,Ge=Le[14]/(Le[10]-1),j=Le[14]/(Le[10]+1),B=(Le[9]+1)/Le[5],Z=(Le[9]-1)/Le[5],F=(Le[8]-1)/Le[0],ae=(Fe[8]+1)/Fe[0],ee=Ge*F,ce=Ge*ae,me=de/(-F+ae),Oe=me*-F;if($.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Oe),J.translateZ(me),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Le[10]===-1)J.projectionMatrix.copy($.projectionMatrix),J.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const Ee=Ge+me,D=j+me,C=ee-Oe,X=ce+(de-Oe),ie=B*j/D*Ee,re=Z*j/D*Ee;J.projectionMatrix.makePerspective(C,X,ie,re,Ee,D),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function q(J,$){$===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices($.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let $=J.near,ge=J.far;_.texture!==null&&(_.depthNear>0&&($=_.depthNear),_.depthFar>0&&(ge=_.depthFar)),y.near=R.near=A.near=$,y.far=R.far=A.far=ge,(P!==y.near||U!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),P=y.near,U=y.far),A.layers.mask=J.layers.mask|2,R.layers.mask=J.layers.mask|4,y.layers.mask=A.layers.mask|R.layers.mask;const de=J.parent,Le=y.cameras;q(y,de);for(let Fe=0;Fe<Le.length;Fe++)q(Le[Fe],de);Le.length===2?N(y,A,R):y.projectionMatrix.copy(A.projectionMatrix),W(J,y,de)};function W(J,$,ge){ge===null?J.matrix.copy($.matrixWorld):(J.matrix.copy(ge.matrixWorld),J.matrix.invert(),J.matrix.multiply($.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy($.projectionMatrix),J.projectionMatrixInverse.copy($.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Ls*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(J){c=J,u!==null&&(u.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let ne=null;function oe(J,$){if(h=$.getViewerPose(l||a),p=$,h!==null){const ge=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let de=!1;ge.length!==y.cameras.length&&(y.cameras.length=0,de=!0);for(let Fe=0;Fe<ge.length;Fe++){const Ge=ge[Fe];let j=null;if(f!==null)j=f.getViewport(Ge);else{const Z=d.getViewSubImage(u,Ge);j=Z.viewport,Fe===0&&(e.setRenderTargetTextures(v,Z.colorTexture,u.ignoreDepthValues?void 0:Z.depthStencilTexture),e.setRenderTarget(v))}let B=M[Fe];B===void 0&&(B=new jt,B.layers.enable(Fe),B.viewport=new st,M[Fe]=B),B.matrix.fromArray(Ge.transform.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale),B.projectionMatrix.fromArray(Ge.projectionMatrix),B.projectionMatrixInverse.copy(B.projectionMatrix).invert(),B.viewport.set(j.x,j.y,j.width,j.height),Fe===0&&(y.matrix.copy(B.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),de===!0&&y.cameras.push(B)}const Le=s.enabledFeatures;if(Le&&Le.includes("depth-sensing")){const Fe=d.getDepthInformation(ge[0]);Fe&&Fe.isValid&&Fe.texture&&_.init(e,Fe,s.renderState)}}for(let ge=0;ge<x.length;ge++){const de=b[ge],Le=x[ge];de!==null&&Le!==void 0&&Le.update(de,$,l||a)}ne&&ne(J,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),p=null}const Me=new od;Me.setAnimationLoop(oe),this.setAnimationLoop=function(J){ne=J},this.dispose=function(){}}}const Bi=new en,m_=new ze;function g_(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,sd(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,v,x,b){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m)):m.isMeshStandardMaterial?(r(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,b)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),_(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?c(g,m,v,x):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Yt&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Yt&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const v=e.get(m),x=v.envMap,b=v.envMapRotation;x&&(g.envMap.value=x,Bi.copy(b),Bi.x*=-1,Bi.y*=-1,Bi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Bi.y*=-1,Bi.z*=-1),g.envMapRotation.value.setFromMatrix4(m_.makeRotationFromEuler(Bi)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,v,x){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*v,g.scale.value=x*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,v){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Yt&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const v=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function b_(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,x){const b=x.program;n.uniformBlockBinding(v,b)}function l(v,x){let b=s[v.id];b===void 0&&(p(v),b=h(v),s[v.id]=b,v.addEventListener("dispose",g));const E=x.program;n.updateUBOMapping(v,E);const S=e.render.frame;r[v.id]!==S&&(u(v),r[v.id]=S)}function h(v){const x=d();v.__bindingPointIndex=x;const b=i.createBuffer(),E=v.__size,S=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,E,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,b),b}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){const x=s[v.id],b=v.uniforms,E=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let S=0,A=b.length;S<A;S++){const R=Array.isArray(b[S])?b[S]:[b[S]];for(let M=0,y=R.length;M<y;M++){const P=R[M];if(f(P,S,M,E)===!0){const U=P.__offset,T=Array.isArray(P.value)?P.value:[P.value];let w=0;for(let L=0;L<T.length;L++){const O=T[L],V=_(O);typeof O=="number"||typeof O=="boolean"?(P.__data[0]=O,i.bufferSubData(i.UNIFORM_BUFFER,U+w,P.__data)):O.isMatrix3?(P.__data[0]=O.elements[0],P.__data[1]=O.elements[1],P.__data[2]=O.elements[2],P.__data[3]=0,P.__data[4]=O.elements[3],P.__data[5]=O.elements[4],P.__data[6]=O.elements[5],P.__data[7]=0,P.__data[8]=O.elements[6],P.__data[9]=O.elements[7],P.__data[10]=O.elements[8],P.__data[11]=0):(O.toArray(P.__data,w),w+=V.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,x,b,E){const S=v.value,A=x+"_"+b;if(E[A]===void 0)return typeof S=="number"||typeof S=="boolean"?E[A]=S:E[A]=S.clone(),!0;{const R=E[A];if(typeof S=="number"||typeof S=="boolean"){if(R!==S)return E[A]=S,!0}else if(R.equals(S)===!1)return R.copy(S),!0}return!1}function p(v){const x=v.uniforms;let b=0;const E=16;for(let A=0,R=x.length;A<R;A++){const M=Array.isArray(x[A])?x[A]:[x[A]];for(let y=0,P=M.length;y<P;y++){const U=M[y],T=Array.isArray(U.value)?U.value:[U.value];for(let w=0,L=T.length;w<L;w++){const O=T[w],V=_(O),N=b%E,q=N%V.boundary,W=N+q;b+=q,W!==0&&E-W<V.storage&&(b+=E-W),U.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=b,b+=V.storage}}}const S=b%E;return S>0&&(b+=E-S),v.__size=b,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function g(v){const x=v.target;x.removeEventListener("dispose",g);const b=a.indexOf(x.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function m(){for(const v in s)i.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:c,update:l,dispose:m}}class __{constructor(e={}){const{canvas:t=sp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const p=new Uint32Array(4),_=new Int32Array(4);let g=null,m=null;const v=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=St,this.toneMapping=Ri,this.toneMappingExposure=1;const b=this;let E=!1,S=0,A=0,R=null,M=-1,y=null;const P=new st,U=new st;let T=null;const w=new Te(0);let L=0,O=t.width,V=t.height,N=1,q=null,W=null;const ne=new st(0,0,O,V),oe=new st(0,0,O,V);let Me=!1;const J=new tl;let $=!1,ge=!1;const de=new ze,Le=new ze,Fe=new z,Ge=new st,j={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let B=!1;function Z(){return R===null?N:1}let F=n;function ae(I,H){return t.getContext(I,H)}try{const I={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Vc}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",ye,!1),t.addEventListener("webglcontextcreationerror",xe,!1),F===null){const H="webgl2";if(F=ae(H,I),F===null)throw ae(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(I){throw console.error("THREE.WebGLRenderer: "+I.message),I}let ee,ce,me,Oe,Ee,D,C,X,ie,re,te,De,_e,Ae,tt,le,we,Be,ke,Re,$e,Ye,ft,k;function be(){ee=new Sg(F),ee.init(),Ye=new c_(F,ee),ce=new bg(F,ee,e,Ye),me=new r_(F,ee),ce.reverseDepthBuffer&&u&&me.buffers.depth.setReversed(!0),Oe=new Ag(F),Ee=new Wb,D=new o_(F,ee,me,Ee,ce,Ye,Oe),C=new xg(b),X=new yg(b),ie=new Dp(F),ft=new mg(F,ie),re=new Eg(F,ie,Oe,ft),te=new Rg(F,re,ie,Oe),ke=new wg(F,ce,D),le=new _g(Ee),De=new Vb(b,C,X,ee,ce,ft,le),_e=new g_(b,Ee),Ae=new jb,tt=new Qb(ee),Be=new pg(b,C,X,me,te,f,c),we=new i_(b,te,ce),k=new b_(F,Oe,ce,me),Re=new gg(F,ee,Oe),$e=new Tg(F,ee,Oe),Oe.programs=De.programs,b.capabilities=ce,b.extensions=ee,b.properties=Ee,b.renderLists=Ae,b.shadowMap=we,b.state=me,b.info=Oe}be();const Q=new p_(b,F);this.xr=Q,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const I=ee.get("WEBGL_lose_context");I&&I.loseContext()},this.forceContextRestore=function(){const I=ee.get("WEBGL_lose_context");I&&I.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(I){I!==void 0&&(N=I,this.setSize(O,V,!1))},this.getSize=function(I){return I.set(O,V)},this.setSize=function(I,H,Y=!0){if(Q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=I,V=H,t.width=Math.floor(I*N),t.height=Math.floor(H*N),Y===!0&&(t.style.width=I+"px",t.style.height=H+"px"),this.setViewport(0,0,I,H)},this.getDrawingBufferSize=function(I){return I.set(O*N,V*N).floor()},this.setDrawingBufferSize=function(I,H,Y){O=I,V=H,N=Y,t.width=Math.floor(I*Y),t.height=Math.floor(H*Y),this.setViewport(0,0,I,H)},this.getCurrentViewport=function(I){return I.copy(P)},this.getViewport=function(I){return I.copy(ne)},this.setViewport=function(I,H,Y,K){I.isVector4?ne.set(I.x,I.y,I.z,I.w):ne.set(I,H,Y,K),me.viewport(P.copy(ne).multiplyScalar(N).round())},this.getScissor=function(I){return I.copy(oe)},this.setScissor=function(I,H,Y,K){I.isVector4?oe.set(I.x,I.y,I.z,I.w):oe.set(I,H,Y,K),me.scissor(U.copy(oe).multiplyScalar(N).round())},this.getScissorTest=function(){return Me},this.setScissorTest=function(I){me.setScissorTest(Me=I)},this.setOpaqueSort=function(I){q=I},this.setTransparentSort=function(I){W=I},this.getClearColor=function(I){return I.copy(Be.getClearColor())},this.setClearColor=function(){Be.setClearColor.apply(Be,arguments)},this.getClearAlpha=function(){return Be.getClearAlpha()},this.setClearAlpha=function(){Be.setClearAlpha.apply(Be,arguments)},this.clear=function(I=!0,H=!0,Y=!0){let K=0;if(I){let G=!1;if(R!==null){const he=R.texture.format;G=he===Zc||he===Jc||he===Kc}if(G){const he=R.texture.type,ve=he===hi||he===Zi||he===gr||he===Ps||he===jc||he===qc,Ce=Be.getClearColor(),Pe=Be.getClearAlpha(),He=Ce.r,Xe=Ce.g,Ie=Ce.b;ve?(p[0]=He,p[1]=Xe,p[2]=Ie,p[3]=Pe,F.clearBufferuiv(F.COLOR,0,p)):(_[0]=He,_[1]=Xe,_[2]=Ie,_[3]=Pe,F.clearBufferiv(F.COLOR,0,_))}else K|=F.COLOR_BUFFER_BIT}H&&(K|=F.DEPTH_BUFFER_BIT),Y&&(K|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",ye,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),Ae.dispose(),tt.dispose(),Ee.dispose(),C.dispose(),X.dispose(),te.dispose(),ft.dispose(),k.dispose(),De.dispose(),Q.dispose(),Q.removeEventListener("sessionstart",wl),Q.removeEventListener("sessionend",Rl),Di.stop()};function se(I){I.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function ye(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const I=Oe.autoReset,H=we.enabled,Y=we.autoUpdate,K=we.needsUpdate,G=we.type;be(),Oe.autoReset=I,we.enabled=H,we.autoUpdate=Y,we.needsUpdate=K,we.type=G}function xe(I){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",I.statusMessage)}function We(I){const H=I.target;H.removeEventListener("dispose",We),yt(H)}function yt(I){Ft(I),Ee.remove(I)}function Ft(I){const H=Ee.get(I).programs;H!==void 0&&(H.forEach(function(Y){De.releaseProgram(Y)}),I.isShaderMaterial&&De.releaseShaderCache(I))}this.renderBufferDirect=function(I,H,Y,K,G,he){H===null&&(H=j);const ve=G.isMesh&&G.matrixWorld.determinant()<0,Ce=tf(I,H,Y,K,G);me.setMaterial(K,ve);let Pe=Y.index,He=1;if(K.wireframe===!0){if(Pe=re.getWireframeAttribute(Y),Pe===void 0)return;He=2}const Xe=Y.drawRange,Ie=Y.attributes.position;let nt=Xe.start*He,pt=(Xe.start+Xe.count)*He;he!==null&&(nt=Math.max(nt,he.start*He),pt=Math.min(pt,(he.start+he.count)*He)),Pe!==null?(nt=Math.max(nt,0),pt=Math.min(pt,Pe.count)):Ie!=null&&(nt=Math.max(nt,0),pt=Math.min(pt,Ie.count));const gt=pt-nt;if(gt<0||gt===1/0)return;ft.setup(G,K,Ce,Y,Pe);let Zt,rt=Re;if(Pe!==null&&(Zt=ie.get(Pe),rt=$e,rt.setIndex(Zt)),G.isMesh)K.wireframe===!0?(me.setLineWidth(K.wireframeLinewidth*Z()),rt.setMode(F.LINES)):rt.setMode(F.TRIANGLES);else if(G.isLine){let Ue=K.linewidth;Ue===void 0&&(Ue=1),me.setLineWidth(Ue*Z()),G.isLineSegments?rt.setMode(F.LINES):G.isLineLoop?rt.setMode(F.LINE_LOOP):rt.setMode(F.LINE_STRIP)}else G.isPoints?rt.setMode(F.POINTS):G.isSprite&&rt.setMode(F.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)rt.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(ee.get("WEBGL_multi_draw"))rt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Ue=G._multiDrawStarts,Xn=G._multiDrawCounts,at=G._multiDrawCount,gn=Pe?ie.get(Pe).bytesPerElement:1,ns=Ee.get(K).currentProgram.getUniforms();for(let tn=0;tn<at;tn++)ns.setValue(F,"_gl_DrawID",tn),rt.render(Ue[tn]/gn,Xn[tn])}else if(G.isInstancedMesh)rt.renderInstances(nt,gt,G.count);else if(Y.isInstancedBufferGeometry){const Ue=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Xn=Math.min(Y.instanceCount,Ue);rt.renderInstances(nt,gt,Xn)}else rt.render(nt,gt)};function lt(I,H,Y){I.transparent===!0&&I.side===At&&I.forceSinglePass===!1?(I.side=Yt,I.needsUpdate=!0,Ir(I,H,Y),I.side=li,I.needsUpdate=!0,Ir(I,H,Y),I.side=At):Ir(I,H,Y)}this.compile=function(I,H,Y=null){Y===null&&(Y=I),m=tt.get(Y),m.init(H),x.push(m),Y.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),I!==Y&&I.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),m.setupLights();const K=new Set;return I.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const he=G.material;if(he)if(Array.isArray(he))for(let ve=0;ve<he.length;ve++){const Ce=he[ve];lt(Ce,Y,G),K.add(Ce)}else lt(he,Y,G),K.add(he)}),x.pop(),m=null,K},this.compileAsync=function(I,H,Y=null){const K=this.compile(I,H,Y);return new Promise(G=>{function he(){if(K.forEach(function(ve){Ee.get(ve).currentProgram.isReady()&&K.delete(ve)}),K.size===0){G(I);return}setTimeout(he,10)}ee.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let mn=null;function Wn(I){mn&&mn(I)}function wl(){Di.stop()}function Rl(){Di.start()}const Di=new od;Di.setAnimationLoop(Wn),typeof self<"u"&&Di.setContext(self),this.setAnimationLoop=function(I){mn=I,Q.setAnimationLoop(I),I===null?Di.stop():Di.start()},Q.addEventListener("sessionstart",wl),Q.addEventListener("sessionend",Rl),this.render=function(I,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),Q.enabled===!0&&Q.isPresenting===!0&&(Q.cameraAutoUpdate===!0&&Q.updateCamera(H),H=Q.getCamera()),I.isScene===!0&&I.onBeforeRender(b,I,H,R),m=tt.get(I,x.length),m.init(H),x.push(m),Le.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),J.setFromProjectionMatrix(Le),ge=this.localClippingEnabled,$=le.init(this.clippingPlanes,ge),g=Ae.get(I,v.length),g.init(),v.push(g),Q.enabled===!0&&Q.isPresenting===!0){const he=b.xr.getDepthSensingMesh();he!==null&&to(he,H,-1/0,b.sortObjects)}to(I,H,0,b.sortObjects),g.finish(),b.sortObjects===!0&&g.sort(q,W),B=Q.enabled===!1||Q.isPresenting===!1||Q.hasDepthSensing()===!1,B&&Be.addToRenderList(g,I),this.info.render.frame++,$===!0&&le.beginShadows();const Y=m.state.shadowsArray;we.render(Y,I,H),$===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=g.opaque,G=g.transmissive;if(m.setupLights(),H.isArrayCamera){const he=H.cameras;if(G.length>0)for(let ve=0,Ce=he.length;ve<Ce;ve++){const Pe=he[ve];Pl(K,G,I,Pe)}B&&Be.render(I);for(let ve=0,Ce=he.length;ve<Ce;ve++){const Pe=he[ve];Cl(g,I,Pe,Pe.viewport)}}else G.length>0&&Pl(K,G,I,H),B&&Be.render(I),Cl(g,I,H);R!==null&&(D.updateMultisampleRenderTarget(R),D.updateRenderTargetMipmap(R)),I.isScene===!0&&I.onAfterRender(b,I,H),ft.resetDefaultState(),M=-1,y=null,x.pop(),x.length>0?(m=x[x.length-1],$===!0&&le.setGlobalState(b.clippingPlanes,m.state.camera)):m=null,v.pop(),v.length>0?g=v[v.length-1]:g=null};function to(I,H,Y,K){if(I.visible===!1)return;if(I.layers.test(H.layers)){if(I.isGroup)Y=I.renderOrder;else if(I.isLOD)I.autoUpdate===!0&&I.update(H);else if(I.isLight)m.pushLight(I),I.castShadow&&m.pushShadow(I);else if(I.isSprite){if(!I.frustumCulled||J.intersectsSprite(I)){K&&Ge.setFromMatrixPosition(I.matrixWorld).applyMatrix4(Le);const ve=te.update(I),Ce=I.material;Ce.visible&&g.push(I,ve,Ce,Y,Ge.z,null)}}else if((I.isMesh||I.isLine||I.isPoints)&&(!I.frustumCulled||J.intersectsObject(I))){const ve=te.update(I),Ce=I.material;if(K&&(I.boundingSphere!==void 0?(I.boundingSphere===null&&I.computeBoundingSphere(),Ge.copy(I.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Ge.copy(ve.boundingSphere.center)),Ge.applyMatrix4(I.matrixWorld).applyMatrix4(Le)),Array.isArray(Ce)){const Pe=ve.groups;for(let He=0,Xe=Pe.length;He<Xe;He++){const Ie=Pe[He],nt=Ce[Ie.materialIndex];nt&&nt.visible&&g.push(I,ve,nt,Y,Ge.z,Ie)}}else Ce.visible&&g.push(I,ve,Ce,Y,Ge.z,null)}}const he=I.children;for(let ve=0,Ce=he.length;ve<Ce;ve++)to(he[ve],H,Y,K)}function Cl(I,H,Y,K){const G=I.opaque,he=I.transmissive,ve=I.transparent;m.setupLightsView(Y),$===!0&&le.setGlobalState(b.clippingPlanes,Y),K&&me.viewport(P.copy(K)),G.length>0&&Pr(G,H,Y),he.length>0&&Pr(he,H,Y),ve.length>0&&Pr(ve,H,Y),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function Pl(I,H,Y,K){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[K.id]===void 0&&(m.state.transmissionRenderTarget[K.id]=new fn(1,1,{generateMipmaps:!0,type:ee.has("EXT_color_buffer_half_float")||ee.has("EXT_color_buffer_float")?$t:hi,minFilter:On,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace}));const he=m.state.transmissionRenderTarget[K.id],ve=K.viewport||P;he.setSize(ve.z,ve.w);const Ce=b.getRenderTarget();b.setRenderTarget(he),b.getClearColor(w),L=b.getClearAlpha(),L<1&&b.setClearColor(16777215,.5),b.clear(),B&&Be.render(Y);const Pe=b.toneMapping;b.toneMapping=Ri;const He=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),m.setupLightsView(K),$===!0&&le.setGlobalState(b.clippingPlanes,K),Pr(I,Y,K),D.updateMultisampleRenderTarget(he),D.updateRenderTargetMipmap(he),ee.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let Ie=0,nt=H.length;Ie<nt;Ie++){const pt=H[Ie],gt=pt.object,Zt=pt.geometry,rt=pt.material,Ue=pt.group;if(rt.side===At&&gt.layers.test(K.layers)){const Xn=rt.side;rt.side=Yt,rt.needsUpdate=!0,Il(gt,Y,K,Zt,rt,Ue),rt.side=Xn,rt.needsUpdate=!0,Xe=!0}}Xe===!0&&(D.updateMultisampleRenderTarget(he),D.updateRenderTargetMipmap(he))}b.setRenderTarget(Ce),b.setClearColor(w,L),He!==void 0&&(K.viewport=He),b.toneMapping=Pe}function Pr(I,H,Y){const K=H.isScene===!0?H.overrideMaterial:null;for(let G=0,he=I.length;G<he;G++){const ve=I[G],Ce=ve.object,Pe=ve.geometry,He=K===null?ve.material:K,Xe=ve.group;Ce.layers.test(Y.layers)&&Il(Ce,H,Y,Pe,He,Xe)}}function Il(I,H,Y,K,G,he){I.onBeforeRender(b,H,Y,K,G,he),I.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,I.matrixWorld),I.normalMatrix.getNormalMatrix(I.modelViewMatrix),G.onBeforeRender(b,H,Y,K,I,he),G.transparent===!0&&G.side===At&&G.forceSinglePass===!1?(G.side=Yt,G.needsUpdate=!0,b.renderBufferDirect(Y,H,K,G,I,he),G.side=li,G.needsUpdate=!0,b.renderBufferDirect(Y,H,K,G,I,he),G.side=At):b.renderBufferDirect(Y,H,K,G,I,he),I.onAfterRender(b,H,Y,K,G,he)}function Ir(I,H,Y){H.isScene!==!0&&(H=j);const K=Ee.get(I),G=m.state.lights,he=m.state.shadowsArray,ve=G.state.version,Ce=De.getParameters(I,G.state,he,H,Y),Pe=De.getProgramCacheKey(Ce);let He=K.programs;K.environment=I.isMeshStandardMaterial?H.environment:null,K.fog=H.fog,K.envMap=(I.isMeshStandardMaterial?X:C).get(I.envMap||K.environment),K.envMapRotation=K.environment!==null&&I.envMap===null?H.environmentRotation:I.envMapRotation,He===void 0&&(I.addEventListener("dispose",We),He=new Map,K.programs=He);let Xe=He.get(Pe);if(Xe!==void 0){if(K.currentProgram===Xe&&K.lightsStateVersion===ve)return Dl(I,Ce),Xe}else Ce.uniforms=De.getUniforms(I),I.onBeforeCompile(Ce,b),Xe=De.acquireProgram(Ce,Pe),He.set(Pe,Xe),K.uniforms=Ce.uniforms;const Ie=K.uniforms;return(!I.isShaderMaterial&&!I.isRawShaderMaterial||I.clipping===!0)&&(Ie.clippingPlanes=le.uniform),Dl(I,Ce),K.needsLights=sf(I),K.lightsStateVersion=ve,K.needsLights&&(Ie.ambientLightColor.value=G.state.ambient,Ie.lightProbe.value=G.state.probe,Ie.directionalLights.value=G.state.directional,Ie.directionalLightShadows.value=G.state.directionalShadow,Ie.spotLights.value=G.state.spot,Ie.spotLightShadows.value=G.state.spotShadow,Ie.rectAreaLights.value=G.state.rectArea,Ie.ltc_1.value=G.state.rectAreaLTC1,Ie.ltc_2.value=G.state.rectAreaLTC2,Ie.pointLights.value=G.state.point,Ie.pointLightShadows.value=G.state.pointShadow,Ie.hemisphereLights.value=G.state.hemi,Ie.directionalShadowMap.value=G.state.directionalShadowMap,Ie.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ie.spotShadowMap.value=G.state.spotShadowMap,Ie.spotLightMatrix.value=G.state.spotLightMatrix,Ie.spotLightMap.value=G.state.spotLightMap,Ie.pointShadowMap.value=G.state.pointShadowMap,Ie.pointShadowMatrix.value=G.state.pointShadowMatrix),K.currentProgram=Xe,K.uniformsList=null,Xe}function Ll(I){if(I.uniformsList===null){const H=I.currentProgram.getUniforms();I.uniformsList=_a.seqWithValue(H.seq,I.uniforms)}return I.uniformsList}function Dl(I,H){const Y=Ee.get(I);Y.outputColorSpace=H.outputColorSpace,Y.batching=H.batching,Y.batchingColor=H.batchingColor,Y.instancing=H.instancing,Y.instancingColor=H.instancingColor,Y.instancingMorph=H.instancingMorph,Y.skinning=H.skinning,Y.morphTargets=H.morphTargets,Y.morphNormals=H.morphNormals,Y.morphColors=H.morphColors,Y.morphTargetsCount=H.morphTargetsCount,Y.numClippingPlanes=H.numClippingPlanes,Y.numIntersection=H.numClipIntersection,Y.vertexAlphas=H.vertexAlphas,Y.vertexTangents=H.vertexTangents,Y.toneMapping=H.toneMapping}function tf(I,H,Y,K,G){H.isScene!==!0&&(H=j),D.resetTextureUnits();const he=H.fog,ve=K.isMeshStandardMaterial?H.environment:null,Ce=R===null?b.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Gt,Pe=(K.isMeshStandardMaterial?X:C).get(K.envMap||ve),He=K.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Xe=!!Y.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Ie=!!Y.morphAttributes.position,nt=!!Y.morphAttributes.normal,pt=!!Y.morphAttributes.color;let gt=Ri;K.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(gt=b.toneMapping);const Zt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,rt=Zt!==void 0?Zt.length:0,Ue=Ee.get(K),Xn=m.state.lights;if($===!0&&(ge===!0||I!==y)){const cn=I===y&&K.id===M;le.setState(K,I,cn)}let at=!1;K.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==Xn.state.version||Ue.outputColorSpace!==Ce||G.isBatchedMesh&&Ue.batching===!1||!G.isBatchedMesh&&Ue.batching===!0||G.isBatchedMesh&&Ue.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Ue.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Ue.instancing===!1||!G.isInstancedMesh&&Ue.instancing===!0||G.isSkinnedMesh&&Ue.skinning===!1||!G.isSkinnedMesh&&Ue.skinning===!0||G.isInstancedMesh&&Ue.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ue.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Ue.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Ue.instancingMorph===!1&&G.morphTexture!==null||Ue.envMap!==Pe||K.fog===!0&&Ue.fog!==he||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==le.numPlanes||Ue.numIntersection!==le.numIntersection)||Ue.vertexAlphas!==He||Ue.vertexTangents!==Xe||Ue.morphTargets!==Ie||Ue.morphNormals!==nt||Ue.morphColors!==pt||Ue.toneMapping!==gt||Ue.morphTargetsCount!==rt)&&(at=!0):(at=!0,Ue.__version=K.version);let gn=Ue.currentProgram;at===!0&&(gn=Ir(K,H,G));let ns=!1,tn=!1,js=!1;const bt=gn.getUniforms(),Cn=Ue.uniforms;if(me.useProgram(gn.program)&&(ns=!0,tn=!0,js=!0),K.id!==M&&(M=K.id,tn=!0),ns||y!==I){me.buffers.depth.getReversed()?(de.copy(I.projectionMatrix),ap(de),op(de),bt.setValue(F,"projectionMatrix",de)):bt.setValue(F,"projectionMatrix",I.projectionMatrix),bt.setValue(F,"viewMatrix",I.matrixWorldInverse);const fi=bt.map.cameraPosition;fi!==void 0&&fi.setValue(F,Fe.setFromMatrixPosition(I.matrixWorld)),ce.logarithmicDepthBuffer&&bt.setValue(F,"logDepthBufFC",2/(Math.log(I.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&bt.setValue(F,"isOrthographic",I.isOrthographicCamera===!0),y!==I&&(y=I,tn=!0,js=!0)}if(G.isSkinnedMesh){bt.setOptional(F,G,"bindMatrix"),bt.setOptional(F,G,"bindMatrixInverse");const cn=G.skeleton;cn&&(cn.boneTexture===null&&cn.computeBoneTexture(),bt.setValue(F,"boneTexture",cn.boneTexture,D))}G.isBatchedMesh&&(bt.setOptional(F,G,"batchingTexture"),bt.setValue(F,"batchingTexture",G._matricesTexture,D),bt.setOptional(F,G,"batchingIdTexture"),bt.setValue(F,"batchingIdTexture",G._indirectTexture,D),bt.setOptional(F,G,"batchingColorTexture"),G._colorsTexture!==null&&bt.setValue(F,"batchingColorTexture",G._colorsTexture,D));const qs=Y.morphAttributes;if((qs.position!==void 0||qs.normal!==void 0||qs.color!==void 0)&&ke.update(G,Y,gn),(tn||Ue.receiveShadow!==G.receiveShadow)&&(Ue.receiveShadow=G.receiveShadow,bt.setValue(F,"receiveShadow",G.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(Cn.envMap.value=Pe,Cn.flipEnvMap.value=Pe.isCubeTexture&&Pe.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&H.environment!==null&&(Cn.envMapIntensity.value=H.environmentIntensity),tn&&(bt.setValue(F,"toneMappingExposure",b.toneMappingExposure),Ue.needsLights&&nf(Cn,js),he&&K.fog===!0&&_e.refreshFogUniforms(Cn,he),_e.refreshMaterialUniforms(Cn,K,N,V,m.state.transmissionRenderTarget[I.id]),_a.upload(F,Ll(Ue),Cn,D)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(_a.upload(F,Ll(Ue),Cn,D),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&bt.setValue(F,"center",G.center),bt.setValue(F,"modelViewMatrix",G.modelViewMatrix),bt.setValue(F,"normalMatrix",G.normalMatrix),bt.setValue(F,"modelMatrix",G.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const cn=K.uniformsGroups;for(let fi=0,pi=cn.length;fi<pi;fi++){const Ul=cn[fi];k.update(Ul,gn),k.bind(Ul,gn)}}return gn}function nf(I,H){I.ambientLightColor.needsUpdate=H,I.lightProbe.needsUpdate=H,I.directionalLights.needsUpdate=H,I.directionalLightShadows.needsUpdate=H,I.pointLights.needsUpdate=H,I.pointLightShadows.needsUpdate=H,I.spotLights.needsUpdate=H,I.spotLightShadows.needsUpdate=H,I.rectAreaLights.needsUpdate=H,I.hemisphereLights.needsUpdate=H}function sf(I){return I.isMeshLambertMaterial||I.isMeshToonMaterial||I.isMeshPhongMaterial||I.isMeshStandardMaterial||I.isShadowMaterial||I.isShaderMaterial&&I.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(I,H,Y){Ee.get(I.texture).__webglTexture=H,Ee.get(I.depthTexture).__webglTexture=Y;const K=Ee.get(I);K.__hasExternalTextures=!0,K.__autoAllocateDepthBuffer=Y===void 0,K.__autoAllocateDepthBuffer||ee.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(I,H){const Y=Ee.get(I);Y.__webglFramebuffer=H,Y.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(I,H=0,Y=0){R=I,S=H,A=Y;let K=!0,G=null,he=!1,ve=!1;if(I){const Pe=Ee.get(I);if(Pe.__useDefaultFramebuffer!==void 0)me.bindFramebuffer(F.FRAMEBUFFER,null),K=!1;else if(Pe.__webglFramebuffer===void 0)D.setupRenderTarget(I);else if(Pe.__hasExternalTextures)D.rebindTextures(I,Ee.get(I.texture).__webglTexture,Ee.get(I.depthTexture).__webglTexture);else if(I.depthBuffer){const Ie=I.depthTexture;if(Pe.__boundDepthTexture!==Ie){if(Ie!==null&&Ee.has(Ie)&&(I.width!==Ie.image.width||I.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(I)}}const He=I.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(ve=!0);const Xe=Ee.get(I).__webglFramebuffer;I.isWebGLCubeRenderTarget?(Array.isArray(Xe[H])?G=Xe[H][Y]:G=Xe[H],he=!0):I.samples>0&&D.useMultisampledRTT(I)===!1?G=Ee.get(I).__webglMultisampledFramebuffer:Array.isArray(Xe)?G=Xe[Y]:G=Xe,P.copy(I.viewport),U.copy(I.scissor),T=I.scissorTest}else P.copy(ne).multiplyScalar(N).floor(),U.copy(oe).multiplyScalar(N).floor(),T=Me;if(me.bindFramebuffer(F.FRAMEBUFFER,G)&&K&&me.drawBuffers(I,G),me.viewport(P),me.scissor(U),me.setScissorTest(T),he){const Pe=Ee.get(I.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+H,Pe.__webglTexture,Y)}else if(ve){const Pe=Ee.get(I.texture),He=H||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Pe.__webglTexture,Y||0,He)}M=-1},this.readRenderTargetPixels=function(I,H,Y,K,G,he,ve){if(!(I&&I.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=Ee.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&ve!==void 0&&(Ce=Ce[ve]),Ce){me.bindFramebuffer(F.FRAMEBUFFER,Ce);try{const Pe=I.texture,He=Pe.format,Xe=Pe.type;if(!ce.textureFormatReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ce.textureTypeReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=I.width-K&&Y>=0&&Y<=I.height-G&&F.readPixels(H,Y,K,G,Ye.convert(He),Ye.convert(Xe),he)}finally{const Pe=R!==null?Ee.get(R).__webglFramebuffer:null;me.bindFramebuffer(F.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(I,H,Y,K,G,he,ve){if(!(I&&I.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=Ee.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&ve!==void 0&&(Ce=Ce[ve]),Ce){const Pe=I.texture,He=Pe.format,Xe=Pe.type;if(!ce.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ce.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=I.width-K&&Y>=0&&Y<=I.height-G){me.bindFramebuffer(F.FRAMEBUFFER,Ce);const Ie=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Ie),F.bufferData(F.PIXEL_PACK_BUFFER,he.byteLength,F.STREAM_READ),F.readPixels(H,Y,K,G,Ye.convert(He),Ye.convert(Xe),0);const nt=R!==null?Ee.get(R).__webglFramebuffer:null;me.bindFramebuffer(F.FRAMEBUFFER,nt);const pt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await rp(F,pt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Ie),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,he),F.deleteBuffer(Ie),F.deleteSync(pt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(I,H=null,Y=0){I.isTexture!==!0&&(ar("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,I=arguments[1]);const K=Math.pow(2,-Y),G=Math.floor(I.image.width*K),he=Math.floor(I.image.height*K),ve=H!==null?H.x:0,Ce=H!==null?H.y:0;D.setTexture2D(I,0),F.copyTexSubImage2D(F.TEXTURE_2D,Y,0,0,ve,Ce,G,he),me.unbindTexture()},this.copyTextureToTexture=function(I,H,Y=null,K=null,G=0){I.isTexture!==!0&&(ar("WebGLRenderer: copyTextureToTexture function signature has changed."),K=arguments[0]||null,I=arguments[1],H=arguments[2],G=arguments[3]||0,Y=null);let he,ve,Ce,Pe,He,Xe,Ie,nt,pt;const gt=I.isCompressedTexture?I.mipmaps[G]:I.image;Y!==null?(he=Y.max.x-Y.min.x,ve=Y.max.y-Y.min.y,Ce=Y.isBox3?Y.max.z-Y.min.z:1,Pe=Y.min.x,He=Y.min.y,Xe=Y.isBox3?Y.min.z:0):(he=gt.width,ve=gt.height,Ce=gt.depth||1,Pe=0,He=0,Xe=0),K!==null?(Ie=K.x,nt=K.y,pt=K.z):(Ie=0,nt=0,pt=0);const Zt=Ye.convert(H.format),rt=Ye.convert(H.type);let Ue;H.isData3DTexture?(D.setTexture3D(H,0),Ue=F.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(D.setTexture2DArray(H,0),Ue=F.TEXTURE_2D_ARRAY):(D.setTexture2D(H,0),Ue=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,H.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,H.unpackAlignment);const Xn=F.getParameter(F.UNPACK_ROW_LENGTH),at=F.getParameter(F.UNPACK_IMAGE_HEIGHT),gn=F.getParameter(F.UNPACK_SKIP_PIXELS),ns=F.getParameter(F.UNPACK_SKIP_ROWS),tn=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,gt.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,gt.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Pe),F.pixelStorei(F.UNPACK_SKIP_ROWS,He),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Xe);const js=I.isDataArrayTexture||I.isData3DTexture,bt=H.isDataArrayTexture||H.isData3DTexture;if(I.isRenderTargetTexture||I.isDepthTexture){const Cn=Ee.get(I),qs=Ee.get(H),cn=Ee.get(Cn.__renderTarget),fi=Ee.get(qs.__renderTarget);me.bindFramebuffer(F.READ_FRAMEBUFFER,cn.__webglFramebuffer),me.bindFramebuffer(F.DRAW_FRAMEBUFFER,fi.__webglFramebuffer);for(let pi=0;pi<Ce;pi++)js&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ee.get(I).__webglTexture,G,Xe+pi),I.isDepthTexture?(bt&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ee.get(H).__webglTexture,G,pt+pi),F.blitFramebuffer(Pe,He,he,ve,Ie,nt,he,ve,F.DEPTH_BUFFER_BIT,F.NEAREST)):bt?F.copyTexSubImage3D(Ue,G,Ie,nt,pt+pi,Pe,He,he,ve):F.copyTexSubImage2D(Ue,G,Ie,nt,pt+pi,Pe,He,he,ve);me.bindFramebuffer(F.READ_FRAMEBUFFER,null),me.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else bt?I.isDataTexture||I.isData3DTexture?F.texSubImage3D(Ue,G,Ie,nt,pt,he,ve,Ce,Zt,rt,gt.data):H.isCompressedArrayTexture?F.compressedTexSubImage3D(Ue,G,Ie,nt,pt,he,ve,Ce,Zt,gt.data):F.texSubImage3D(Ue,G,Ie,nt,pt,he,ve,Ce,Zt,rt,gt):I.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,G,Ie,nt,he,ve,Zt,rt,gt.data):I.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,G,Ie,nt,gt.width,gt.height,Zt,gt.data):F.texSubImage2D(F.TEXTURE_2D,G,Ie,nt,he,ve,Zt,rt,gt);F.pixelStorei(F.UNPACK_ROW_LENGTH,Xn),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,at),F.pixelStorei(F.UNPACK_SKIP_PIXELS,gn),F.pixelStorei(F.UNPACK_SKIP_ROWS,ns),F.pixelStorei(F.UNPACK_SKIP_IMAGES,tn),G===0&&H.generateMipmaps&&F.generateMipmap(Ue),me.unbindTexture()},this.copyTextureToTexture3D=function(I,H,Y=null,K=null,G=0){return I.isTexture!==!0&&(ar("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Y=arguments[0]||null,K=arguments[1]||null,I=arguments[2],H=arguments[3],G=arguments[4]||0),ar('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(I,H,Y,K,G)},this.initRenderTarget=function(I){Ee.get(I).__webglFramebuffer===void 0&&D.setupRenderTarget(I)},this.initTexture=function(I){I.isCubeTexture?D.setTextureCube(I,0):I.isData3DTexture?D.setTexture3D(I,0):I.isDataArrayTexture||I.isCompressedArrayTexture?D.setTexture2DArray(I,0):D.setTexture2D(I,0),me.unbindTexture()},this.resetState=function(){S=0,A=0,R=null,me.reset(),ft.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}class il{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Te(e),this.density=t}clone(){return new il(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class x_ extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new en,this.environmentIntensity=1,this.environmentRotation=new en,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class v_{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Pc,this.updateRanges=[],this.version=0,this.uuid=Tn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Vt=new z;class sl{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Mn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Mn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Mn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Mn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Mn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array),r=ut(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new vt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new sl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Lh=new z,Dh=new st,Uh=new st,M_=new z,Nh=new ze,$r=new z,Io=new Hn,Fh=new ze,Lo=new Ba;class Ga extends et{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=zl,this.bindMatrix=new ze,this.bindMatrixInverse=new ze,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new wn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,$r),this.boundingBox.expandByPoint($r)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Hn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,$r),this.boundingSphere.expandByPoint($r)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Io.copy(this.boundingSphere),Io.applyMatrix4(s),e.ray.intersectsSphere(Io)!==!1&&(Fh.copy(s).invert(),Lo.copy(e.ray).applyMatrix4(Fh),!(this.boundingBox!==null&&Lo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Lo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new st,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===zl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Rf?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;Dh.fromBufferAttribute(s.attributes.skinIndex,e),Uh.fromBufferAttribute(s.attributes.skinWeight,e),Lh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=Uh.getComponent(r);if(a!==0){const o=Dh.getComponent(r);Nh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(M_.copy(Lh).applyMatrix4(Nh),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class fd extends Mt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class rl extends wt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Kt,h=Kt,d,u){super(null,a,o,c,l,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Oh=new ze,y_=new ze;class Va{constructor(e=[],t=[]){this.uuid=Tn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new ze)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ze;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:y_;Oh.multiplyMatrices(o,t[r]),Oh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Va(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new rl(t,e,e,un,Qt);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new fd),this.bones.push(a),this.boneInverses.push(new ze().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=n[s];e.boneInverses.push(o.toArray())}return e}}class Dc extends vt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const bs=new ze,zh=new ze,ea=[],Bh=new wn,S_=new ze,Qs=new et,$s=new Hn;class Ra extends et{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Dc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,S_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new wn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,bs),Bh.copy(e.boundingBox).applyMatrix4(bs),this.boundingBox.union(Bh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Hn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,bs),$s.copy(e.boundingSphere).applyMatrix4(bs),this.boundingSphere.union($s)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Qs.geometry=this.geometry,Qs.material=this.material,Qs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$s.copy(this.boundingSphere),$s.applyMatrix4(n),e.ray.intersectsSphere($s)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,bs),zh.multiplyMatrices(n,bs),Qs.matrixWorld=zh,Qs.raycast(e,ea);for(let a=0,o=ea.length;a<o;a++){const c=ea[a];c.instanceId=r,c.object=this,t.push(c)}ea.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Dc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new rl(new Float32Array(s*this.count),s,this.count,Yc,Qt));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class pd extends zn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Te(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ca=new z,Pa=new z,kh=new ze,er=new Ba,ta=new Hn,Do=new z,Hh=new z;class al extends Mt{constructor(e=new mt,t=new pd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ca.fromBufferAttribute(t,s-1),Pa.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ca.distanceTo(Pa);e.setAttribute("lineDistance",new Ve(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ta.copy(n.boundingSphere),ta.applyMatrix4(s),ta.radius+=r,e.ray.intersectsSphere(ta)===!1)return;kh.copy(s).invert(),er.copy(e.ray).applyMatrix4(kh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let _=f,g=p-1;_<g;_+=l){const m=h.getX(_),v=h.getX(_+1),x=na(this,e,er,c,m,v);x&&t.push(x)}if(this.isLineLoop){const _=h.getX(p-1),g=h.getX(f),m=na(this,e,er,c,_,g);m&&t.push(m)}}else{const f=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let _=f,g=p-1;_<g;_+=l){const m=na(this,e,er,c,_,_+1);m&&t.push(m)}if(this.isLineLoop){const _=na(this,e,er,c,p-1,f);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function na(i,e,t,n,s,r){const a=i.geometry.attributes.position;if(Ca.fromBufferAttribute(a,s),Pa.fromBufferAttribute(a,r),t.distanceSqToSegment(Ca,Pa,Do,Hh)>n)return;Do.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Do);if(!(c<e.near||c>e.far))return{distance:c,point:Hh.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const Gh=new z,Vh=new z;class E_ extends al{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Gh.fromBufferAttribute(t,s),Vh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Gh.distanceTo(Vh);e.setAttribute("lineDistance",new Ve(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class T_ extends al{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class md extends zn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Te(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Wh=new ze,Uc=new Ba,ia=new Hn,sa=new z;class Nc extends Mt{constructor(e=new mt,t=new md){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ia.copy(n.boundingSphere),ia.applyMatrix4(s),ia.radius+=r,e.ray.intersectsSphere(ia)===!1)return;Wh.copy(s).invert(),Uc.copy(e.ray).applyMatrix4(Wh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){const u=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let p=u,_=f;p<_;p++){const g=l.getX(p);sa.fromBufferAttribute(d,g),Xh(sa,g,c,s,e,t,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let p=u,_=f;p<_;p++)sa.fromBufferAttribute(d,p),Xh(sa,p,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Xh(i,e,t,n,s,r,a){const o=Uc.distanceSqToPoint(i);if(o<t){const c=new z;Uc.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Tr extends wt{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class di{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);const h=n[s],u=n[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new ue:new z);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new z,s=[],r=[],a=[],o=new z,c=new ze;for(let f=0;f<=e;f++){const p=f/e;s[f]=this.getTangentAt(p,new z)}r[0]=new z,a[0]=new z;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),u<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(Tt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,p))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Tt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let p=1;p<=e;p++)r[p].applyMatrix4(c.makeRotationAxis(s[p],f*p)),a[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class gd extends di{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new ue){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=c-this.aX,f=l-this.aY;c=u*h-f*d+this.aX,l=u*d+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class A_ extends gd{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function ol(){let i=0,e=0,t=0,n=0;function s(r,a,o,c){i=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,d){let u=(a-r)/l-(o-r)/(l+h)+(o-a)/h,f=(o-a)/h-(c-a)/(h+d)+(c-o)/d;u*=h,f*=h,s(a,o,u,f)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const ra=new z,Uo=new ol,No=new ol,Fo=new ol;class bd extends di{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new z){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(ra.subVectors(s[0],s[1]).add(s[0]),l=ra);const d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(ra.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=ra),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(l.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),Uo.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,p,_,g),No.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,p,_,g),Fo.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,p,_,g)}else this.curveType==="catmullrom"&&(Uo.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),No.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),Fo.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return n.set(Uo.calc(c),No.calc(c),Fo.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new z().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function jh(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*i+t}function w_(i,e){const t=1-i;return t*t*e}function R_(i,e){return 2*(1-i)*i*e}function C_(i,e){return i*i*e}function ur(i,e,t,n){return w_(i,e)+R_(i,t)+C_(i,n)}function P_(i,e){const t=1-i;return t*t*t*e}function I_(i,e){const t=1-i;return 3*t*t*i*e}function L_(i,e){return 3*(1-i)*i*i*e}function D_(i,e){return i*i*i*e}function dr(i,e,t,n,s){return P_(i,e)+I_(i,t)+L_(i,n)+D_(i,s)}class U_ extends di{constructor(e=new ue,t=new ue,n=new ue,s=new ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ue){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(dr(e,s.x,r.x,a.x,o.x),dr(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class N_ extends di{constructor(e=new z,t=new z,n=new z,s=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new z){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(dr(e,s.x,r.x,a.x,o.x),dr(e,s.y,r.y,a.y,o.y),dr(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class F_ extends di{constructor(e=new ue,t=new ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class O_ extends di{constructor(e=new z,t=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new z){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new z){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class z_ extends di{constructor(e=new ue,t=new ue,n=new ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ue){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ur(e,s.x,r.x,a.x),ur(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class _d extends di{constructor(e=new z,t=new z,n=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new z){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ur(e,s.x,r.x,a.x),ur(e,s.y,r.y,a.y),ur(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class B_ extends di{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(jh(o,c.x,l.x,h.x,d.x),jh(o,c.y,l.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new ue().fromArray(s))}return this}}var k_=Object.freeze({__proto__:null,ArcCurve:A_,CatmullRomCurve3:bd,CubicBezierCurve:U_,CubicBezierCurve3:N_,EllipseCurve:gd,LineCurve:F_,LineCurve3:O_,QuadraticBezierCurve:z_,QuadraticBezierCurve3:_d,SplineCurve:B_});class cl extends mt{constructor(e=[new ue(0,-.5),new ue(.5,0),new ue(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Tt(s,0,Math.PI*2);const r=[],a=[],o=[],c=[],l=[],h=1/t,d=new z,u=new ue,f=new z,p=new z,_=new z;let g=0,m=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:g=e[v+1].x-e[v].x,m=e[v+1].y-e[v].y,f.x=m*1,f.y=-g,f.z=m*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:g=e[v+1].x-e[v].x,m=e[v+1].y-e[v].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(p)}for(let v=0;v<=t;v++){const x=n+v*h*s,b=Math.sin(x),E=Math.cos(x);for(let S=0;S<=e.length-1;S++){d.x=e[S].x*b,d.y=e[S].y,d.z=e[S].x*E,a.push(d.x,d.y,d.z),u.x=v/t,u.y=S/(e.length-1),o.push(u.x,u.y);const A=c[3*S+0]*b,R=c[3*S+1],M=c[3*S+0]*E;l.push(A,R,M)}}for(let v=0;v<t;v++)for(let x=0;x<e.length-1;x++){const b=x+v*e.length,E=b,S=b+e.length,A=b+e.length+1,R=b+1;r.push(E,S,R),r.push(A,R,S)}this.setIndex(r),this.setAttribute("position",new Ve(a,3)),this.setAttribute("uv",new Ve(o,2)),this.setAttribute("normal",new Ve(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cl(e.points,e.segments,e.phiStart,e.phiLength)}}class Wa extends mt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new z,h=new ue;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){const f=n+d/t*s;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,c.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Ve(a,3)),this.setAttribute("normal",new Ve(o,3)),this.setAttribute("uv",new Ve(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wa(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Rn extends mt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],f=[];let p=0;const _=[],g=n/2;let m=0;v(),a===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new Ve(d,3)),this.setAttribute("normal",new Ve(u,3)),this.setAttribute("uv",new Ve(f,2));function v(){const b=new z,E=new z;let S=0;const A=(t-e)/n;for(let R=0;R<=r;R++){const M=[],y=R/r,P=y*(t-e)+e;for(let U=0;U<=s;U++){const T=U/s,w=T*c+o,L=Math.sin(w),O=Math.cos(w);E.x=P*L,E.y=-y*n+g,E.z=P*O,d.push(E.x,E.y,E.z),b.set(L,A,O).normalize(),u.push(b.x,b.y,b.z),f.push(T,1-y),M.push(p++)}_.push(M)}for(let R=0;R<s;R++)for(let M=0;M<r;M++){const y=_[M][R],P=_[M+1][R],U=_[M+1][R+1],T=_[M][R+1];(e>0||M!==0)&&(h.push(y,P,T),S+=3),(t>0||M!==r-1)&&(h.push(P,U,T),S+=3)}l.addGroup(m,S,0),m+=S}function x(b){const E=p,S=new ue,A=new z;let R=0;const M=b===!0?e:t,y=b===!0?1:-1;for(let U=1;U<=s;U++)d.push(0,g*y,0),u.push(0,y,0),f.push(.5,.5),p++;const P=p;for(let U=0;U<=s;U++){const w=U/s*c+o,L=Math.cos(w),O=Math.sin(w);A.x=M*O,A.y=g*y,A.z=M*L,d.push(A.x,A.y,A.z),u.push(0,y,0),S.x=L*.5+.5,S.y=O*.5*y+.5,f.push(S.x,S.y),p++}for(let U=0;U<s;U++){const T=E+U,w=P+U;b===!0?h.push(w,w+1,T):h.push(w+1,w,T),R+=3}l.addGroup(m,R,b===!0?1:2),m+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ks extends Rn{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new ks(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ll extends mt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),l(n),h(),this.setAttribute("position",new Ve(r,3)),this.setAttribute("normal",new Ve(r.slice(),3)),this.setAttribute("uv",new Ve(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const x=new z,b=new z,E=new z;for(let S=0;S<t.length;S+=3)f(t[S+0],x),f(t[S+1],b),f(t[S+2],E),c(x,b,E,v)}function c(v,x,b,E){const S=E+1,A=[];for(let R=0;R<=S;R++){A[R]=[];const M=v.clone().lerp(b,R/S),y=x.clone().lerp(b,R/S),P=S-R;for(let U=0;U<=P;U++)U===0&&R===S?A[R][U]=M:A[R][U]=M.clone().lerp(y,U/P)}for(let R=0;R<S;R++)for(let M=0;M<2*(S-R)-1;M++){const y=Math.floor(M/2);M%2===0?(u(A[R][y+1]),u(A[R+1][y]),u(A[R][y])):(u(A[R][y+1]),u(A[R+1][y+1]),u(A[R+1][y]))}}function l(v){const x=new z;for(let b=0;b<r.length;b+=3)x.x=r[b+0],x.y=r[b+1],x.z=r[b+2],x.normalize().multiplyScalar(v),r[b+0]=x.x,r[b+1]=x.y,r[b+2]=x.z}function h(){const v=new z;for(let x=0;x<r.length;x+=3){v.x=r[x+0],v.y=r[x+1],v.z=r[x+2];const b=g(v)/2/Math.PI+.5,E=m(v)/Math.PI+.5;a.push(b,1-E)}p(),d()}function d(){for(let v=0;v<a.length;v+=6){const x=a[v+0],b=a[v+2],E=a[v+4],S=Math.max(x,b,E),A=Math.min(x,b,E);S>.9&&A<.1&&(x<.2&&(a[v+0]+=1),b<.2&&(a[v+2]+=1),E<.2&&(a[v+4]+=1))}}function u(v){r.push(v.x,v.y,v.z)}function f(v,x){const b=v*3;x.x=e[b+0],x.y=e[b+1],x.z=e[b+2]}function p(){const v=new z,x=new z,b=new z,E=new z,S=new ue,A=new ue,R=new ue;for(let M=0,y=0;M<r.length;M+=9,y+=6){v.set(r[M+0],r[M+1],r[M+2]),x.set(r[M+3],r[M+4],r[M+5]),b.set(r[M+6],r[M+7],r[M+8]),S.set(a[y+0],a[y+1]),A.set(a[y+2],a[y+3]),R.set(a[y+4],a[y+5]),E.copy(v).add(x).add(b).divideScalar(3);const P=g(E);_(S,y+0,v,P),_(A,y+2,x,P),_(R,y+4,b,P)}}function _(v,x,b,E){E<0&&v.x===1&&(a[x]=v.x-1),b.x===0&&b.z===0&&(a[x]=E/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ll(e.vertices,e.indices,e.radius,e.details)}}class Xa extends ll{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Xa(e.radius,e.detail)}}class Hs extends mt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],d=new z,u=new z,f=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){const v=[],x=m/n;let b=0;m===0&&a===0?b=.5/t:m===n&&c===Math.PI&&(b=-.5/t);for(let E=0;E<=t;E++){const S=E/t;d.x=-e*Math.cos(s+S*r)*Math.sin(a+x*o),d.y=e*Math.cos(a+x*o),d.z=e*Math.sin(s+S*r)*Math.sin(a+x*o),p.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),g.push(S+b,1-x),v.push(l++)}h.push(v)}for(let m=0;m<n;m++)for(let v=0;v<t;v++){const x=h[m][v+1],b=h[m][v],E=h[m+1][v],S=h[m+1][v+1];(m!==0||a>0)&&f.push(x,b,S),(m!==n-1||c<Math.PI)&&f.push(b,E,S)}this.setIndex(f),this.setAttribute("position",new Ve(p,3)),this.setAttribute("normal",new Ve(_,3)),this.setAttribute("uv",new Ve(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Qi extends mt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],c=[],l=[],h=new z,d=new z,u=new z;for(let f=0;f<=n;f++)for(let p=0;p<=s;p++){const _=p/s*r,g=f/n*Math.PI*2;d.x=(e+t*Math.cos(g))*Math.cos(_),d.y=(e+t*Math.cos(g))*Math.sin(_),d.z=t*Math.sin(g),o.push(d.x,d.y,d.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),u.subVectors(d,h).normalize(),c.push(u.x,u.y,u.z),l.push(p/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=s;p++){const _=(s+1)*f+p-1,g=(s+1)*(f-1)+p-1,m=(s+1)*(f-1)+p,v=(s+1)*f+p;a.push(_,g,v),a.push(g,m,v)}this.setIndex(a),this.setAttribute("position",new Ve(o,3)),this.setAttribute("normal",new Ve(c,3)),this.setAttribute("uv",new Ve(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qi(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class hl extends mt{constructor(e=new _d(new z(-1,-1,0),new z(-1,1,0),new z(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new z,c=new z,l=new ue;let h=new z;const d=[],u=[],f=[],p=[];_(),this.setIndex(p),this.setAttribute("position",new Ve(d,3)),this.setAttribute("normal",new Ve(u,3)),this.setAttribute("uv",new Ve(f,2));function _(){for(let x=0;x<t;x++)g(x);g(r===!1?t:0),v(),m()}function g(x){h=e.getPointAt(x/t,h);const b=a.normals[x],E=a.binormals[x];for(let S=0;S<=s;S++){const A=S/s*Math.PI*2,R=Math.sin(A),M=-Math.cos(A);c.x=M*b.x+R*E.x,c.y=M*b.y+R*E.y,c.z=M*b.z+R*E.z,c.normalize(),u.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,d.push(o.x,o.y,o.z)}}function m(){for(let x=1;x<=t;x++)for(let b=1;b<=s;b++){const E=(s+1)*(x-1)+(b-1),S=(s+1)*x+(b-1),A=(s+1)*x+b,R=(s+1)*(x-1)+b;p.push(E,S,R),p.push(S,A,R)}}function v(){for(let x=0;x<=t;x++)for(let b=0;b<=s;b++)l.x=x/t,l.y=b/s,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new hl(new k_[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class H_ extends Lt{static get type(){return"RawShaderMaterial"}constructor(e){super(e),this.isRawShaderMaterial=!0}}class dt extends zn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ju,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class pn extends dt{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Tt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Te(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Te(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Te(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function aa(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function G_(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function V_(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function qh(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=i[o+c]}return s}function xd(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}class Ar{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break t}a=t.length;break n}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class W_ extends Ar{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:xs,endingEnd:xs}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case vs:r=e,o=2*t-n;break;case Aa:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case vs:a=e,c=2*n-t;break;case Aa:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,p=(n-t)/(s-t),_=p*p,g=_*p,m=-u*g+2*u*_-u*p,v=(1+u)*g+(-1.5-2*u)*_+(-.5+u)*p+1,x=(-1-f)*g+(1.5+f)*_+.5*p,b=f*g-f*_;for(let E=0;E!==o;++E)r[E]=m*a[h+E]+v*a[l+E]+x*a[c+E]+b*a[d+E];return r}}class vd extends Ar{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(s-t),d=1-h;for(let u=0;u!==o;++u)r[u]=a[l+u]*d+a[c+u]*h;return r}}class X_ extends Ar{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Vn{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=aa(t,this.TimeBufferType),this.values=aa(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:aa(e.times,Array),values:aa(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new X_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new vd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new W_(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case br:t=this.InterpolantFactoryMethodDiscrete;break;case _r:t=this.InterpolantFactoryMethodLinear;break;case no:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return br;case this.InterpolantFactoryMethodLinear:return _r;case this.InterpolantFactoryMethodSmooth:return no}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&G_(s))for(let o=0,c=s.length;o!==c;++o){const l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===no,r=e.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(s)c=!0;else{const d=o*n,u=d-n,f=d+n;for(let p=0;p!==n;++p){const _=t[d+p];if(_!==t[u+p]||_!==t[f+p]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const d=o*n,u=a*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}Vn.prototype.TimeBufferType=Float32Array;Vn.prototype.ValueBufferType=Float32Array;Vn.prototype.DefaultInterpolation=_r;class Gs extends Vn{constructor(e,t,n){super(e,t,n)}}Gs.prototype.ValueTypeName="bool";Gs.prototype.ValueBufferType=Array;Gs.prototype.DefaultInterpolation=br;Gs.prototype.InterpolantFactoryMethodLinear=void 0;Gs.prototype.InterpolantFactoryMethodSmooth=void 0;class Md extends Vn{}Md.prototype.ValueTypeName="color";class Us extends Vn{}Us.prototype.ValueTypeName="number";class j_ extends Ar{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t);let l=e*o;for(let h=l+o;l!==h;l+=4)Jt.slerpFlat(r,0,a,l-o,a,l,c);return r}}class Ns extends Vn{InterpolantFactoryMethodLinear(e){return new j_(this.times,this.values,this.getValueSize(),e)}}Ns.prototype.ValueTypeName="quaternion";Ns.prototype.InterpolantFactoryMethodSmooth=void 0;class Vs extends Vn{constructor(e,t,n){super(e,t,n)}}Vs.prototype.ValueTypeName="string";Vs.prototype.ValueBufferType=Array;Vs.prototype.DefaultInterpolation=br;Vs.prototype.InterpolantFactoryMethodLinear=void 0;Vs.prototype.InterpolantFactoryMethodSmooth=void 0;class Fs extends Vn{}Fs.prototype.ValueTypeName="vector";class Fc{constructor(e="",t=-1,n=[],s=Qc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Tn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Y_(n[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(Vn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const h=V_(c);c=qh(c,1,h),l=qh(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Us(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],h=l.name.match(r);if(h&&h.length>1){const d=h[1];let u=s[d];u||(s[d]=u=[]),u.push(l)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,u,f,p,_){if(f.length!==0){const g=[],m=[];xd(f,g,m,p),g.length!==0&&_.push(new d(u,g,m))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let d=0;d<l.length;d++){const u=l[d].keys;if(!(!u||u.length===0))if(u[0].morphTargets){const f={};let p;for(p=0;p<u.length;p++)if(u[p].morphTargets)for(let _=0;_<u[p].morphTargets.length;_++)f[u[p].morphTargets[_]]=-1;for(const _ in f){const g=[],m=[];for(let v=0;v!==u[p].morphTargets.length;++v){const x=u[p];g.push(x.time),m.push(x.morphTarget===_?1:0)}s.push(new Us(".morphTargetInfluence["+_+"]",g,m))}c=f.length*a}else{const f=".bones["+t[d].name+"]";n(Fs,f+".position",u,"pos",s),n(Ns,f+".quaternion",u,"rot",s),n(Fs,f+".scale",u,"scl",s)}}return s.length===0?null:new this(r,c,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function q_(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Us;case"vector":case"vector2":case"vector3":case"vector4":return Fs;case"color":return Md;case"quaternion":return Ns;case"bool":case"boolean":return Gs;case"string":return Vs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Y_(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=q_(i.type);if(i.times===void 0){const t=[],n=[];xd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const wi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class yd{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){const d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){const f=l[d],p=l[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null}}}const K_=new yd;class es{constructor(e){this.manager=e!==void 0?e:K_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}es.DEFAULT_MATERIAL_NAME="__DEFAULT";const Zn={};class J_ extends Error{constructor(e,t){super(e),this.response=t}}class ul extends es{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=wi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Zn[e]!==void 0){Zn[e].push({onLoad:t,onProgress:n,onError:s});return}Zn[e]=[],Zn[e].push({onLoad:t,onProgress:n,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Zn[e],d=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=u?parseInt(u):0,p=f!==0;let _=0;const g=new ReadableStream({start(m){v();function v(){d.read().then(({done:x,value:b})=>{if(x)m.close();else{_+=b.byteLength;const E=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let S=0,A=h.length;S<A;S++){const R=h[S];R.onProgress&&R.onProgress(E)}m.enqueue(b),v()}},x=>{m.error(x)})}}});return new Response(g)}else throw new J_(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o===void 0)return l.text();{const d=/charset="?([^;"\s]*)"?/i.exec(o),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return l.arrayBuffer().then(p=>f.decode(p))}}}).then(l=>{wi.add(e,l);const h=Zn[e];delete Zn[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=Zn[e];if(h===void 0)throw this.manager.itemError(e),l;delete Zn[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Z_ extends es{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=wi.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=xr("img");function c(){h(),wi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(d){h(),s&&s(d),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class Q_ extends es{constructor(e){super(e)}load(e,t,n,s){const r=this,a=new rl,o=new ul(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(r.withCredentials),o.load(e,function(c){let l;try{l=r.parse(c)}catch(h){if(s!==void 0)s(h);else{console.error(h);return}}l.image!==void 0?a.image=l.image:l.data!==void 0&&(a.image.width=l.width,a.image.height=l.height,a.image.data=l.data),a.wrapS=l.wrapS!==void 0?l.wrapS:Fn,a.wrapT=l.wrapT!==void 0?l.wrapT:Fn,a.magFilter=l.magFilter!==void 0?l.magFilter:It,a.minFilter=l.minFilter!==void 0?l.minFilter:It,a.anisotropy=l.anisotropy!==void 0?l.anisotropy:1,l.colorSpace!==void 0&&(a.colorSpace=l.colorSpace),l.flipY!==void 0&&(a.flipY=l.flipY),l.format!==void 0&&(a.format=l.format),l.type!==void 0&&(a.type=l.type),l.mipmaps!==void 0&&(a.mipmaps=l.mipmaps,a.minFilter=On),l.mipmapCount===1&&(a.minFilter=It),l.generateMipmaps!==void 0&&(a.generateMipmaps=l.generateMipmaps),a.needsUpdate=!0,t&&t(a,l)},n,s),a}}class Sd extends es{constructor(e){super(e)}load(e,t,n,s){const r=new wt,a=new Z_(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class ja extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Te(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class $_ extends ja{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Te(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Oo=new ze,Yh=new z,Kh=new z;class dl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.map=null,this.mapPass=null,this.matrix=new ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new tl,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new st(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Yh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Yh),Kh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Kh),t.updateMatrixWorld(),Oo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Oo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Oo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ex extends dl{constructor(){super(new jt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Ls*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class tx extends ja{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new ex}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Jh=new ze,tr=new z,zo=new z;class nx extends dl{constructor(){super(new jt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ue(4,2),this._viewportCount=6,this._viewports=[new st(2,1,1,1),new st(0,1,1,1),new st(3,1,1,1),new st(1,1,1,1),new st(3,0,1,1),new st(1,0,1,1)],this._cubeDirections=[new z(1,0,0),new z(-1,0,0),new z(0,0,1),new z(0,0,-1),new z(0,1,0),new z(0,-1,0)],this._cubeUps=[new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,0,1),new z(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),tr.setFromMatrixPosition(e.matrixWorld),n.position.copy(tr),zo.copy(n.position),zo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(zo),n.updateMatrixWorld(),s.makeTranslation(-tr.x,-tr.y,-tr.z),Jh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jh)}}class Ed extends ja{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new nx}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class ix extends dl{constructor(){super(new ka(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Td extends ja{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new ix}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class fr{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class sx extends es{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=wi.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return wi.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),wi.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});wi.add(e,c),r.manager.itemStart(e)}}class Ad{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Zh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Zh();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Zh(){return performance.now()}class rx{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,a;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,s=this.valueSize,r=e*s+s;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)n[r+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,r,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const c=t*this._origIndex;this._mixBufferRegion(n,s,c,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){o.setValue(n,s);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,a=s;r!==a;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,s){Jt.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){const a=this._workIndex*r;Jt.multiplyQuaternionsFlat(e,a,e,t,e,n),Jt.slerpFlat(e,t,e,t,e,a,s)}_lerp(e,t,n,s,r){const a=1-s;for(let o=0;o!==r;++o){const c=t+o;e[c]=e[c]*a+e[n+o]*s}}_lerpAdditive(e,t,n,s,r){for(let a=0;a!==r;++a){const o=t+a;e[o]=e[o]+e[n+a]*s}}}const fl="\\[\\]\\.:\\/",ax=new RegExp("["+fl+"]","g"),pl="[^"+fl+"]",ox="[^"+fl.replace("\\.","")+"]",cx=/((?:WC+[\/:])*)/.source.replace("WC",pl),lx=/(WCOD+)?/.source.replace("WCOD",ox),hx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",pl),ux=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",pl),dx=new RegExp("^"+cx+lx+hx+ux+"$"),fx=["material","materials","bones","map"];class px{constructor(e,t,n){const s=n||ct.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ct{constructor(e,t,n){this.path=t,this.parsedPath=n||ct.parseTrackName(t),this.node=ct.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ct.Composite(e,t,n):new ct(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ax,"")}static parseTrackName(e){const t=dx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);fx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=ct.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[s];if(a===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ct.Composite=px;ct.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ct.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ct.prototype.GetterByBindingType=[ct.prototype._getValue_direct,ct.prototype._getValue_array,ct.prototype._getValue_arrayElement,ct.prototype._getValue_toArray];ct.prototype.SetterByBindingTypeAndVersioning=[[ct.prototype._setValue_direct,ct.prototype._setValue_direct_setNeedsUpdate,ct.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_array,ct.prototype._setValue_array_setNeedsUpdate,ct.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_arrayElement,ct.prototype._setValue_arrayElement_setNeedsUpdate,ct.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_fromArray,ct.prototype._setValue_fromArray_setNeedsUpdate,ct.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class mx{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;const r=t.tracks,a=r.length,o=new Array(a),c={endingStart:xs,endingEnd:xs};for(let l=0;l!==a;++l){const h=r[l].createInterpolant(null);o[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Yu,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const s=this._clip.duration,r=e._clip.duration,a=r/s,o=s/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const s=this._mixer,r=s.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);const c=o.parameterPositions,l=o.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/a,l[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case Pf:for(let h=0,d=c.length;h!==d;++h)c[h].evaluate(a),l[h].accumulateAdditive(o);break;case Qc:default:for(let h=0,d=c.length;h!==d;++h)c[h].evaluate(a),l[h].accumulate(s,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let s=this.time+e,r=this._loopCount;const a=n===Cf;if(e===0)return r===-1?s:a&&(r&1)===1?t-s:s;if(n===qu){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=t||s<0){const o=Math.floor(s/t);s-=t*o,r+=Math.abs(o);const c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){const l=e<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=s;if(a&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){const s=this._interpolantSettings;n?(s.endingStart=vs,s.endingEnd=vs):(e?s.endingStart=this.zeroSlopeAtStart?vs:xs:s.endingStart=Aa,t?s.endingEnd=this.zeroSlopeAtEnd?vs:xs:s.endingEnd=Aa)}_scheduleFading(e,t,n){const s=this._mixer,r=s.time;let a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,c=a.sampleValues;return o[0]=r,c[0]=t,o[1]=r+e,c[1]=n,this}}const gx=new Float32Array(1);class Ia extends $i{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,a=e._propertyBindings,o=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let h=l[c];h===void 0&&(h={},l[c]=h);for(let d=0;d!==r;++d){const u=s[d],f=u.name;let p=h[f];if(p!==void 0)++p.referenceCount,a[d]=p;else{if(p=a[d],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,c,f));continue}const _=t&&t._propertyBindings[d].binding.parsedPath;p=new rx(ct.create(n,f,_),u.ValueTypeName,u.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,c,f),a[d]=p}o[d].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const s=this._actions,r=this._actionsByClip;let a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=s.length,s.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,a=this._actionsByClip,o=a[r],c=o.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;const d=o.actionByRoot,u=(e._localRoot||this._root).uuid;delete d[u],c.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const s=this._bindingsByRootAndName,r=this._bindings;let a=s[t];a===void 0&&(a={},s[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[s],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[s]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new vd(new Float32Array(2),new Float32Array(2),1,gx),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const s=t||this._root,r=s.uuid;let a=typeof e=="string"?Fc.findByName(s,e):e;const o=a!==null?a.uuid:e,c=this._actionsByClip[o];let l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Qc),c!==void 0){const d=c.actionByRoot[r];if(d!==void 0&&d.blendMode===n)return d;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;const h=new mx(this,a,t,n);return this._bindAction(h,l),this._addInactiveAction(h,o,r),h}existingAction(e,t){const n=t||this._root,s=n.uuid,r=typeof e=="string"?Fc.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(s,e,r,a);const o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){const a=r.knownActions;for(let o=0,c=a.length;o!==c;++o){const l=a[o];this._deactivateAction(l);const h=l._cacheIndex,d=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,d._cacheIndex=h,t[h]=d,t.pop(),this._removeInactiveBindingsForAction(l)}delete s[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,c=o[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(const a in r){const o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Vc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Vc);function wd(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new mt;let l=0;for(let h=0;h<i.length;++h){const d=i[h];let u=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(e){let f;if(t)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(t){let h=0;const d=[];for(let u=0;u<i.length;++u){const f=i[u].index;for(let p=0;p<f.count;++p)d.push(f.getX(p)+h);h+=i[u].attributes.position.count}c.setIndex(d)}for(const h in r){const d=Qh(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,d)}for(const h in a){const d=a[h][0].length;if(d===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let _=0;_<a[h].length;++_)f.push(a[h][_][u]);const p=Qh(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(p)}}return c}function Qh(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){const h=i[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}const a=new e(r),o=new vt(a,t,n);let c=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const d=c/t;for(let u=0,f=h.count;u<f;u++)for(let p=0;p<t;p++){const _=h.getComponent(u,p);o.setComponent(u+d,p,_)}}else a.set(h.array,c);c+=h.count*t}return s!==void 0&&(o.gpuType=s),o}function $h(i,e){if(e===If)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Cc||e===Ku){let t=i.getIndex();if(t===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===Cc)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class bx extends es{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new yx(t)}),this.register(function(t){return new Sx(t)}),this.register(function(t){return new Lx(t)}),this.register(function(t){return new Dx(t)}),this.register(function(t){return new Ux(t)}),this.register(function(t){return new Tx(t)}),this.register(function(t){return new Ax(t)}),this.register(function(t){return new wx(t)}),this.register(function(t){return new Rx(t)}),this.register(function(t){return new Mx(t)}),this.register(function(t){return new Cx(t)}),this.register(function(t){return new Ex(t)}),this.register(function(t){return new Ix(t)}),this.register(function(t){return new Px(t)}),this.register(function(t){return new xx(t)}),this.register(function(t){return new Nx(t)}),this.register(function(t){return new Fx(t)})}load(e,t,n,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=fr.extractUrlBase(e);a=fr.resolveURL(l,this.path)}else a=fr.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new ul(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Rd){try{a[Je.KHR_BINARY_GLTF]=new Ox(e)}catch(d){s&&s(d);return}r=JSON.parse(a[Je.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new Jx(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const d=this.pluginCallbacks[h](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[d.name]=d,a[d.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const d=r.extensionsUsed[h],u=r.extensionsRequired||[];switch(d){case Je.KHR_MATERIALS_UNLIT:a[d]=new vx;break;case Je.KHR_DRACO_MESH_COMPRESSION:a[d]=new zx(r,this.dracoLoader);break;case Je.KHR_TEXTURE_TRANSFORM:a[d]=new Bx;break;case Je.KHR_MESH_QUANTIZATION:a[d]=new kx;break;default:u.indexOf(d)>=0&&o[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function _x(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const Je={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class xx{constructor(e){this.parser=e,this.name=Je.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const h=new Te(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Gt);const d=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Td(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Ed(h),l.distance=d;break;case"spot":l=new tx(h),l.distance=d,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,ei(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class vx{constructor(){this.name=Je.KHR_MATERIALS_UNLIT}getMaterialType(){return ri}extendParams(e,t,n){const s=[];e.color=new Te(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Gt),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,St))}return Promise.all(s)}}class Mx{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class yx{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:pn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ue(o,o)}return Promise.all(r)}}class Sx{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:pn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class Ex{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:pn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class Tx{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:pn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Te(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Gt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,St)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class Ax{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:pn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class wx{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:pn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Te().setRGB(o[0],o[1],o[2],Gt),Promise.all(r)}}class Rx{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:pn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Cx{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:pn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Te().setRGB(o[0],o[1],o[2],Gt),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,St)),Promise.all(r)}}class Px{constructor(e){this.parser=e,this.name=Je.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:pn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class Ix{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:pn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class Lx{constructor(e){this.parser=e,this.name=Je.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class Dx{constructor(e){this.parser=e,this.name=Je.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Ux{constructor(e){this.parser=e,this.name=Je.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Nx{constructor(e){this.name=Je.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=s.byteOffset||0,l=s.byteLength||0,h=s.count,d=s.byteStride,u=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,d,u,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*d);return a.decodeGltfBuffer(new Uint8Array(f),h,d,u,s.mode,s.filter),f})})}else return null}}class Fx{constructor(e){this.name=Je.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==hn.TRIANGLES&&l.mode!==hn.TRIANGLE_STRIP&&l.mode!==hn.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const h=l.pop(),d=h.isGroup?h.children:[h],u=l[0].count,f=[];for(const p of d){const _=new ze,g=new z,m=new Jt,v=new z(1,1,1),x=new Ra(p.geometry,p.material,u);for(let b=0;b<u;b++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,b),c.ROTATION&&m.fromBufferAttribute(c.ROTATION,b),c.SCALE&&v.fromBufferAttribute(c.SCALE,b),x.setMatrixAt(b,_.compose(g,m,v));for(const b in c)if(b==="_COLOR_0"){const E=c[b];x.instanceColor=new Dc(E.array,E.itemSize,E.normalized)}else b!=="TRANSLATION"&&b!=="ROTATION"&&b!=="SCALE"&&p.geometry.setAttribute(b,c[b]);Mt.prototype.copy.call(x,p),this.parser.assignFinalMaterial(x),f.push(x)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Rd="glTF",nr=12,eu={JSON:1313821514,BIN:5130562};class Ox{constructor(e){this.name=Je.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,nr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Rd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-nr,r=new DataView(e,nr);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===eu.JSON){const l=new Uint8Array(e,nr+a,o);this.content=n.decode(l)}else if(c===eu.BIN){const l=nr+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class zx{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Je.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const h in a){const d=Oc[h]||h.toLowerCase();o[d]=a[h]}for(const h in e.attributes){const d=Oc[h]||h.toLowerCase();if(a[h]!==void 0){const u=n.accessors[e.attributes[h]],f=Ts[u.componentType];l[d]=f.name,c[d]=u.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(d,u){s.decodeDracoFile(h,function(f){for(const p in f.attributes){const _=f.attributes[p],g=c[p];g!==void 0&&(_.normalized=g)}d(f)},o,l,Gt,u)})})}}class Bx{constructor(){this.name=Je.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class kx{constructor(){this.name=Je.KHR_MESH_QUANTIZATION}}class Cd extends Ar{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=s-t,d=(n-t)/h,u=d*d,f=u*d,p=e*l,_=p-l,g=-2*f+3*u,m=f-u,v=1-g,x=m-u+d;for(let b=0;b!==o;b++){const E=a[_+b+o],S=a[_+b+c]*h,A=a[p+b+o],R=a[p+b]*h;r[b]=v*E+x*S+g*A+m*R}return r}}const Hx=new Jt;class Gx extends Cd{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return Hx.fromArray(r).normalize().toArray(r),r}}const hn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ts={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},tu={9728:Kt,9729:It,9984:Ou,9985:da,9986:rr,9987:On},nu={33071:Fn,33648:Ta,10497:An},Bo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Oc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Mi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Vx={CUBICSPLINE:void 0,LINEAR:_r,STEP:br},ko={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Wx(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new dt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:li})),i.DefaultMaterial}function ki(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ei(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Xx(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){const d=e[l];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){const d=e[l];if(n){const u=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):i.attributes.position;a.push(u)}if(s){const u=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):i.attributes.normal;o.push(u)}if(r){const u=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):i.attributes.color;c.push(u)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const h=l[0],d=l[1],u=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=d),r&&(i.morphAttributes.color=u),i.morphTargetsRelative=!0,i})}function jx(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function qx(i){let e;const t=i.extensions&&i.extensions[Je.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Ho(t.attributes):e=i.indices+":"+Ho(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Ho(i.targets[n]);return e}function Ho(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function zc(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Yx(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Kx=new ze;class Jx{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new _x,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new Sd(this.options.manager):this.textureLoader=new sx(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ul(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return ki(r,o,s),ei(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,h]of a.children.entries())r(h,o.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Je.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(fr.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=Bo[s.type],o=Ts[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new vt(l,a,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=Bo[s.type],l=Ts[s.componentType],h=l.BYTES_PER_ELEMENT,d=h*c,u=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,p=s.normalized===!0;let _,g;if(f&&f!==d){const m=Math.floor(u/f),v="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+m+":"+s.count;let x=t.cache.get(v);x||(_=new l(o,m*f,s.count*f/h),x=new v_(_,f/h),t.cache.add(v,x)),g=new sl(x,c,u%f/h,p)}else o===null?_=new l(s.count*c):_=new l(o,u,s.count*c),g=new vt(_,c,p);if(s.sparse!==void 0){const m=Bo.SCALAR,v=Ts[s.sparse.indices.componentType],x=s.sparse.indices.byteOffset||0,b=s.sparse.values.byteOffset||0,E=new v(a[1],x,s.sparse.count*m),S=new l(a[2],b,s.sparse.count*c);o!==null&&(g=new vt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let A=0,R=E.length;A<R;A++){const M=E[A];if(g.setX(M,S[A*c]),c>=2&&g.setY(M,S[A*c+1]),c>=3&&g.setZ(M,S[A*c+2]),c>=4&&g.setW(M,S[A*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const u=(r.samplers||{})[a.sampler]||{};return h.magFilter=tu[u.magFilter]||It,h.minFilter=tu[u.minFilter]||On,h.wrapS=nu[u.wrapS]||An,h.wrapT=nu[u.wrapT]||An,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Kt&&h.minFilter!==It,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const a=s.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(d){l=!0;const u=new Blob([d],{type:a.mimeType});return c=o.createObjectURL(u),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(d){return new Promise(function(u,f){let p=u;t.isImageBitmapLoader===!0&&(p=function(_){const g=new wt(_);g.needsUpdate=!0,u(g)}),t.load(fr.resolveURL(d,r.path),p,void 0,f)})}).then(function(d){return l===!0&&o.revokeObjectURL(c),ei(d,a),d.userData.mimeType=a.mimeType||Yx(a.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),d});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Je.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Je.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[Je.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new md,zn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new pd,zn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return dt}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let a;const o={},c=r.extensions||{},l=[];if(c[Je.KHR_MATERIALS_UNLIT]){const d=s[Je.KHR_MATERIALS_UNLIT];a=d.getMaterialType(),l.push(d.extendParams(o,r,t))}else{const d=r.pbrMetallicRoughness||{};if(o.color=new Te(1,1,1),o.opacity=1,Array.isArray(d.baseColorFactor)){const u=d.baseColorFactor;o.color.setRGB(u[0],u[1],u[2],Gt),o.opacity=u[3]}d.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",d.baseColorTexture,St)),o.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,o.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",d.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",d.metallicRoughnessTexture))),a=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=At);const h=r.alphaMode||ko.OPAQUE;if(h===ko.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===ko.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==ri&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new ue(1,1),r.normalTexture.scale!==void 0)){const d=r.normalTexture.scale;o.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&a!==ri&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==ri){const d=r.emissiveFactor;o.emissive=new Te().setRGB(d[0],d[1],d[2],Gt)}return r.emissiveTexture!==void 0&&a!==ri&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,St)),Promise.all(l).then(function(){const d=new a(o);return r.name&&(d.name=r.name),ei(d,r),t.associations.set(d,{materials:e}),r.extensions&&ki(s,d,r),d})}createUniqueName(e){const t=ct.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[Je.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return iu(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],h=qx(l),d=s[h];if(d)a.push(d.promise);else{let u;l.extensions&&l.extensions[Je.KHR_DRACO_MESH_COMPRESSION]?u=r(l):u=iu(new mt,l,t),s[h]={primitive:l,promise:u},a.push(u)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const h=a[c].material===void 0?Wx(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],d=[];for(let f=0,p=h.length;f<p;f++){const _=h[f],g=a[f];let m;const v=l[f];if(g.mode===hn.TRIANGLES||g.mode===hn.TRIANGLE_STRIP||g.mode===hn.TRIANGLE_FAN||g.mode===void 0)m=r.isSkinnedMesh===!0?new Ga(_,v):new et(_,v),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),g.mode===hn.TRIANGLE_STRIP?m.geometry=$h(m.geometry,Ku):g.mode===hn.TRIANGLE_FAN&&(m.geometry=$h(m.geometry,Cc));else if(g.mode===hn.LINES)m=new E_(_,v);else if(g.mode===hn.LINE_STRIP)m=new al(_,v);else if(g.mode===hn.LINE_LOOP)m=new T_(_,v);else if(g.mode===hn.POINTS)m=new Nc(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&jx(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),ei(m,r),g.extensions&&ki(s,m,g),t.assignFinalMaterial(m),d.push(m)}for(let f=0,p=d.length;f<p;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return r.extensions&&ki(s,d[0],r),d[0];const u=new Sn;r.extensions&&ki(s,u,r),t.associations.set(u,{meshes:e});for(let f=0,p=d.length;f<p;f++)u.add(d[f]);return u})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new jt(Dn.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new ka(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ei(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),a=s,o=[],c=[];for(let l=0,h=a.length;l<h;l++){const d=a[l];if(d){o.push(d);const u=new ze;r!==null&&u.fromArray(r.array,l*16),c.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Va(o,c)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let d=0,u=s.channels.length;d<u;d++){const f=s.channels[d],p=s.samplers[f.sampler],_=f.target,g=_.node,m=s.parameters!==void 0?s.parameters[p.input]:p.input,v=s.parameters!==void 0?s.parameters[p.output]:p.output;_.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",m)),c.push(this.getDependency("accessor",v)),l.push(p),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(d){const u=d[0],f=d[1],p=d[2],_=d[3],g=d[4],m=[];for(let v=0,x=u.length;v<x;v++){const b=u[v],E=f[v],S=p[v],A=_[v],R=g[v];if(b===void 0)continue;b.updateMatrix&&b.updateMatrix();const M=n._createAnimationTracks(b,E,S,A,R);if(M)for(let y=0;y<M.length;y++)m.push(M[y])}return new Fc(r,void 0,m)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const h=l[0],d=l[1],u=l[2];u!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(u,Kx)});for(let f=0,p=d.length;f<p;f++)h.add(d[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new fd:l.length>1?h=new Sn:l.length===1?h=l[0]:h=new Mt,h!==l[0])for(let d=0,u=l.length;d<u;d++)h.add(l[d]);if(r.name&&(h.userData.name=r.name,h.name=a),ei(h,r),r.extensions&&ki(n,h,r),r.matrix!==void 0){const d=new ze;d.fromArray(r.matrix),h.applyMatrix4(d)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new Sn;n.name&&(r.name=s.createUniqueName(n.name)),ei(r,n),n.extensions&&ki(t,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,d=c.length;h<d;h++)r.add(c[h]);const l=h=>{const d=new Map;for(const[u,f]of s.associations)(u instanceof zn||u instanceof wt)&&d.set(u,f);return h.traverse(u=>{const f=s.associations.get(u);f!=null&&d.set(u,f)}),d};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){const a=[],o=e.name?e.name:e.uuid,c=[];Mi[r.path]===Mi.weights?e.traverse(function(u){u.morphTargetInfluences&&c.push(u.name?u.name:u.uuid)}):c.push(o);let l;switch(Mi[r.path]){case Mi.weights:l=Us;break;case Mi.rotation:l=Ns;break;case Mi.position:case Mi.scale:l=Fs;break;default:switch(n.itemSize){case 1:l=Us;break;case 2:case 3:default:l=Fs;break}break}const h=s.interpolation!==void 0?Vx[s.interpolation]:_r,d=this._getArrayFromAccessor(n);for(let u=0,f=c.length;u<f;u++){const p=new l(c[u]+"."+Mi[r.path],t.array,d,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(p),a.push(p)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=zc(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof Ns?Gx:Cd;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Zx(i,e,t){const n=e.attributes,s=new wn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new z(c[0],c[1],c[2]),new z(l[0],l[1],l[2])),o.normalized){const h=zc(Ts[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new z,c=new z;for(let l=0,h=r.length;l<h;l++){const d=r[l];if(d.POSITION!==void 0){const u=t.json.accessors[d.POSITION],f=u.min,p=u.max;if(f!==void 0&&p!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),u.normalized){const _=zc(Ts[u.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new Hn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function iu(i,e,t){const n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(const a in n){const o=Oc[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){const a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return Qe.workingColorSpace!==Gt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Qe.workingColorSpace}" not supported.`),ei(i,e),Zx(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?Xx(i,e.targets,t):i})}var Qx=(function(){var i="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var s=WebAssembly.validate(t)?e:i,r,a=WebAssembly.instantiate(o(s),{}).then(function(m){r=m.instance,r.exports.__wasm_call_ctors()});function o(m){for(var v=new Uint8Array(m.length),x=0;x<m.length;++x){var b=m.charCodeAt(x);v[x]=b>96?b-97:b>64?b-39:b+4}for(var E=0,x=0;x<m.length;++x)v[E++]=v[x]<60?n[v[x]]:(v[x]-60)*64+v[++x];return v.buffer.slice(0,E)}function c(m,v,x,b,E,S){var A=r.exports.sbrk,R=x+3&-4,M=A(R*b),y=A(E.length),P=new Uint8Array(r.exports.memory.buffer);P.set(E,y);var U=m(M,x,b,y,E.length);if(U==0&&S&&S(M,R,b),v.set(P.subarray(M,M+x*b)),A(M-A(0)),U!=0)throw new Error("Malformed buffer data: "+U)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},h={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},d=[],u=0;function f(m){var v={object:new Worker(m),pending:0,requests:{}};return v.object.onmessage=function(x){var b=x.data;v.pending-=b.count,v.requests[b.id][b.action](b.value),delete v.requests[b.id]},v}function p(m){for(var v="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(o(s))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+c.toString()+g.toString(),x=new Blob([v],{type:"text/javascript"}),b=URL.createObjectURL(x),E=0;E<m;++E)d[E]=f(b);URL.revokeObjectURL(b)}function _(m,v,x,b,E){for(var S=d[0],A=1;A<d.length;++A)d[A].pending<S.pending&&(S=d[A]);return new Promise(function(R,M){var y=new Uint8Array(x),P=u++;S.pending+=m,S.requests[P]={resolve:R,reject:M},S.object.postMessage({id:P,count:m,size:v,source:y,mode:b,filter:E},[y.buffer])})}function g(m){a.then(function(){var v=m.data;try{var x=new Uint8Array(v.count*v.size);c(r.exports[v.mode],x,v.count,v.size,v.source,r.exports[v.filter]),self.postMessage({id:v.id,count:v.count,action:"resolve",value:x},[x.buffer])}catch(b){self.postMessage({id:v.id,count:v.count,action:"reject",value:b})}})}return{ready:a,supported:!0,useWorkers:function(m){p(m)},decodeVertexBuffer:function(m,v,x,b,E){c(r.exports.meshopt_decodeVertexBuffer,m,v,x,b,r.exports[l[E]])},decodeIndexBuffer:function(m,v,x,b){c(r.exports.meshopt_decodeIndexBuffer,m,v,x,b)},decodeIndexSequence:function(m,v,x,b){c(r.exports.meshopt_decodeIndexSequence,m,v,x,b)},decodeGltfBuffer:function(m,v,x,b,E,S){c(r.exports[h[E]],m,v,x,b,r.exports[l[S]])},decodeGltfBufferAsync:function(m,v,x,b,E){return d.length>0?_(m,v,x,h[b],l[E]):a.then(function(){var S=new Uint8Array(m*v);return c(r.exports[h[b]],S,m,v,x,r.exports[l[E]]),S})}}})();class $x extends Q_{constructor(e){super(e),this.type=$t}parse(e){const a=function(R,M){switch(R){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(M||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(M||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(M||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(M||""))}},d=function(R,M,y){M=M||1024;let U=R.pos,T=-1,w=0,L="",O=String.fromCharCode.apply(null,new Uint16Array(R.subarray(U,U+128)));for(;0>(T=O.indexOf(`
`))&&w<M&&U<R.byteLength;)L+=O,w+=O.length,U+=128,O+=String.fromCharCode.apply(null,new Uint16Array(R.subarray(U,U+128)));return-1<T?(R.pos+=w+T+1,L+O.slice(0,T)):!1},u=function(R){const M=/^#\?(\S+)/,y=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,P=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,U=/^\s*FORMAT=(\S+)\s*$/,T=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,w={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let L,O;for((R.pos>=R.byteLength||!(L=d(R)))&&a(1,"no header found"),(O=L.match(M))||a(3,"bad initial token"),w.valid|=1,w.programtype=O[1],w.string+=L+`
`;L=d(R),L!==!1;){if(w.string+=L+`
`,L.charAt(0)==="#"){w.comments+=L+`
`;continue}if((O=L.match(y))&&(w.gamma=parseFloat(O[1])),(O=L.match(P))&&(w.exposure=parseFloat(O[1])),(O=L.match(U))&&(w.valid|=2,w.format=O[1]),(O=L.match(T))&&(w.valid|=4,w.height=parseInt(O[1],10),w.width=parseInt(O[2],10)),w.valid&2&&w.valid&4)break}return w.valid&2||a(3,"missing format specifier"),w.valid&4||a(3,"missing image size specifier"),w},f=function(R,M,y){const P=M;if(P<8||P>32767||R[0]!==2||R[1]!==2||R[2]&128)return new Uint8Array(R);P!==(R[2]<<8|R[3])&&a(3,"wrong scanline width");const U=new Uint8Array(4*M*y);U.length||a(4,"unable to allocate buffer space");let T=0,w=0;const L=4*P,O=new Uint8Array(4),V=new Uint8Array(L);let N=y;for(;N>0&&w<R.byteLength;){w+4>R.byteLength&&a(1),O[0]=R[w++],O[1]=R[w++],O[2]=R[w++],O[3]=R[w++],(O[0]!=2||O[1]!=2||(O[2]<<8|O[3])!=P)&&a(3,"bad rgbe scanline format");let q=0,W;for(;q<L&&w<R.byteLength;){W=R[w++];const oe=W>128;if(oe&&(W-=128),(W===0||q+W>L)&&a(3,"bad scanline data"),oe){const Me=R[w++];for(let J=0;J<W;J++)V[q++]=Me}else V.set(R.subarray(w,w+W),q),q+=W,w+=W}const ne=P;for(let oe=0;oe<ne;oe++){let Me=0;U[T]=V[oe+Me],Me+=P,U[T+1]=V[oe+Me],Me+=P,U[T+2]=V[oe+Me],Me+=P,U[T+3]=V[oe+Me],T+=4}N--}return U},p=function(R,M,y,P){const U=R[M+3],T=Math.pow(2,U-128)/255;y[P+0]=R[M+0]*T,y[P+1]=R[M+1]*T,y[P+2]=R[M+2]*T,y[P+3]=1},_=function(R,M,y,P){const U=R[M+3],T=Math.pow(2,U-128)/255;y[P+0]=kr.toHalfFloat(Math.min(R[M+0]*T,65504)),y[P+1]=kr.toHalfFloat(Math.min(R[M+1]*T,65504)),y[P+2]=kr.toHalfFloat(Math.min(R[M+2]*T,65504)),y[P+3]=kr.toHalfFloat(1)},g=new Uint8Array(e);g.pos=0;const m=u(g),v=m.width,x=m.height,b=f(g.subarray(g.pos),v,x);let E,S,A;switch(this.type){case Qt:A=b.length/4;const R=new Float32Array(A*4);for(let y=0;y<A;y++)p(b,y*4,R,y*4);E=R,S=Qt;break;case $t:A=b.length/4;const M=new Uint16Array(A*4);for(let y=0;y<A;y++)_(b,y*4,M,y*4);E=M,S=$t;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:v,height:x,data:E,header:m.string,gamma:m.gamma,exposure:m.exposure,type:S}}setDataType(e){return this.type=e,this}load(e,t,n,s){function r(a,o){switch(a.type){case Qt:case $t:a.colorSpace=Gt,a.minFilter=It,a.magFilter=It,a.generateMipmaps=!1,a.flipY=!0;break}t&&t(a,o)}return super.load(e,r,n,s)}}const Pd={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Ws{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ev=new ka(-1,1,1,-1,0,1);class tv extends mt{constructor(){super(),this.setAttribute("position",new Ve([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ve([0,2,0,0,2,0],2))}}const nv=new tv;class ml{constructor(e){this._mesh=new et(nv,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ev)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Id extends Ws{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Lt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=vr.clone(e.uniforms),this.material=new Lt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new ml(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class su extends Ws{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class iv extends Ws{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class sv{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ue);this._width=n.width,this._height=n.height,t=new fn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:$t}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Id(Pd),this.copyPass.material.blending=ai,this.clock=new Ad}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}su!==void 0&&(a instanceof su?n=!0:a instanceof iv&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ue);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class rv extends Ws{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Te}render(e,t,n){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}const av={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Te(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Os extends Ws{constructor(e,t,n,s){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new ue(e.x,e.y):new ue(256,256),this.clearColor=new Te(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new fn(r,a,{type:$t}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const u=new fn(r,a,{type:$t});u.texture.name="UnrealBloomPass.h"+d,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const f=new fn(r,a,{type:$t});f.texture.name="UnrealBloomPass.v"+d,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),a=Math.round(a/2)}const o=av;this.highPassUniforms=vr.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Lt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new ue(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new z(1,1,1),new z(1,1,1),new z(1,1,1),new z(1,1,1),new z(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Pd;this.copyUniforms=vr.clone(h.uniforms),this.blendMaterial=new Lt({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Sa,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Te,this.oldClearAlpha=1,this.basic=new ri,this.fsQuad=new ml(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ue(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=Os.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Os.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Lt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ue(.5,.5)},direction:{value:new ue(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new Lt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Os.BlurDirectionX=new ue(1,0);Os.BlurDirectionY=new ue(0,1);const ov={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class cv extends Ws{constructor(){super();const e=ov;this.uniforms=vr.clone(e.uniforms),this.material=new H_({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new ml(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Qe.getTransfer(this._outputColorSpace)===ht&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Iu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Lu?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Du?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Wc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Uu?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Nu&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}function lv(i,e){const t=new Set;let n=!1,s=!1,r=!1,a=!1;const o={x:0,y:0};let c=0;addEventListener("keydown",u=>{t.add(u.code),u.code==="Space"&&(n=!0,u.preventDefault()),(u.code==="KeyF"||u.code==="KeyK")&&(s=!0),(u.code==="KeyE"||u.code==="Enter")&&(r=!0)}),addEventListener("keyup",u=>t.delete(u.code)),addEventListener("blur",()=>t.clear());const l=new Map;i.addEventListener("pointerdown",u=>{l.set(u.pointerId,{x:u.clientX,y:u.clientY}),i.setPointerCapture(u.pointerId)}),i.addEventListener("pointermove",u=>{const f=l.get(u.pointerId);if(!f)return;const p=u.pointerType==="mouse"?.005:.0065;o.x+=(u.clientX-f.x)*p,o.y+=(u.clientY-f.y)*p,f.x=u.clientX,f.y=u.clientY});const h=u=>l.delete(u.pointerId);i.addEventListener("pointerup",h),i.addEventListener("pointercancel",h),i.addEventListener("wheel",u=>{c+=Math.sign(u.deltaY)*.8,u.preventDefault()},{passive:!1}),i.addEventListener("contextmenu",u=>u.preventDefault());const d={x:0,y:0};if(e){const u=document.querySelector("#stick"),f=document.querySelector("#knob");let p=null,_=0,g=0;const m=52,v=(S,A)=>{f.style.transform=`translate(${S}px,${A}px)`};u.addEventListener("pointerdown",S=>{p=S.pointerId,u.setPointerCapture(p);const A=u.getBoundingClientRect();_=A.left+A.width/2,g=A.top+A.height/2}),u.addEventListener("pointermove",S=>{if(S.pointerId!==p)return;let A=S.clientX-_,R=S.clientY-g;const M=Math.hypot(A,R);M>m&&(A=A/M*m,R=R/M*m),v(A,R),d.x=A/m,d.y=-R/m});const x=S=>{S.pointerId===p&&(p=null,d.x=d.y=0,v(0,0))};u.addEventListener("pointerup",x),u.addEventListener("pointercancel",x);const b=(S,A,R)=>{const M=document.querySelector(S);M.addEventListener("pointerdown",y=>{y.stopPropagation(),A(M)})};b("#bJump",()=>{n=!0}),b("#bKneel",()=>{s=!0}),b("#bAct",()=>{r=!0});let E=!1;b("#bRun",S=>{E=!E,a=E,S.classList.toggle("on",E)})}return{poll(){let u=d.x,f=d.y;(t.has("KeyA")||t.has("ArrowLeft"))&&(u-=1),(t.has("KeyD")||t.has("ArrowRight"))&&(u+=1),(t.has("KeyW")||t.has("ArrowUp"))&&(f+=1),(t.has("KeyS")||t.has("ArrowDown"))&&(f-=1);const p={ix:u,iy:f,run:t.has("ShiftLeft")||t.has("ShiftRight")||a,jump:n,kneel:s,interact:r,look:{x:o.x,y:o.y},zoom:c};return n=s=r=!1,o.x=o.y=0,c=0,p}}}const gl=/^(upperarm|lowerarm|hand|thumb|index|middle|ring|pinky)/,bl=/^(hand|thumb|index|middle|ring|pinky)/,_l=/^(neck|Head)/;function wr(i,e,t,{srgb:n=!0,repeat:s=[1,1]}={}){const r=document.createElement("canvas");r.width=i,r.height=e;const a=r.getContext("2d");t(a,i,e);const o=new Tr(r);return o.wrapS=o.wrapT=An,o.repeat.set(...s),o.anisotropy=4,n&&(o.colorSpace=St),o}const vn=(()=>{let i=7;return()=>(i=i*16807%2147483647)/2147483647})();function qa(i,e,t,n,s,r=2){const a=i.getImageData(0,0,e,t),o=a.data;for(let c=0;c<t;c++)for(let l=0;l<e;l++){const h=(c*e+l)*4,d=(l%r===0?-1:0)+(c%r===0?-1:0),u=(vn()-.5)*s+d*s*.35;o[h]=Math.max(0,Math.min(255,o[h]+u)),o[h+1]=Math.max(0,Math.min(255,o[h+1]+u)),o[h+2]=Math.max(0,Math.min(255,o[h+2]+u))}i.putImageData(a,0,0)}function ru(){return wr(256,256,(i,e,t)=>{i.fillStyle="#ece3cc",i.fillRect(0,0,e,t);for(let n=0;n<18;n++)i.fillStyle=`rgba(170,150,110,${.04+vn()*.05})`,i.beginPath(),i.ellipse(vn()*e,vn()*t,20+vn()*40,10+vn()*30,vn()*3,0,7),i.fill();qa(i,e,t,0,9,2)})}function hv(){return wr(128,128,(i,e,t)=>{const n=i.createImageData(e,t);for(let s=0;s<t;s++)for(let r=0;r<e;r++){const a=(s*e+r)*4,o=((r+(s>>1))%2?10:-10)+(vn()-.5)*8,c=((s+(r>>1))%2?10:-10)+(vn()-.5)*8;n.data[a]=128+o,n.data[a+1]=128+c,n.data[a+2]=240,n.data[a+3]=255}i.putImageData(n,0,0)},{srgb:!1,repeat:[1,1]})}function Ld(){return wr(256,512,(i,e,t)=>{i.fillStyle="#8a5a33",i.fillRect(0,0,e,t);const n=[[.06,.05,"#5a361b"],[.16,.02,"#e2cfa4"],[.2,.03,"#5a361b"],[.46,.08,"#6e4424"],[.72,.03,"#5a361b"],[.77,.02,"#e2cfa4"],[.86,.05,"#5a361b"]];for(const[r,a,o]of n)i.fillStyle=o,i.fillRect(r*e,0,a*e,t);for(const r of[.075,.105,.895,.925])i.fillStyle="#4a2c15",i.fillRect(0,r*t,e,t*.012);qa(i,e,t,0,30,2);const s=Math.round(t*.06);for(const[r,a]of[[0,1],[t-1,-1]]){i.clearRect(0,a>0?0:t-s,e,s);for(let o=0;o<e;o+=4){const c=s*(.65+vn()*.35);i.fillStyle=vn()<.15?"#e8dcc0":"#7a4c28",i.fillRect(o+1,a>0?s-c:t-s,2,c)}}})}let Hi=null;function uv(){if(Hi)return Hi;const i=Ld().image,e=document.createElement("canvas");e.width=i.width,e.height=i.height;const t=e.getContext("2d");t.drawImage(i,0,0);const n=t.getImageData(0,0,e.width,e.height),s=n.data;for(let r=0;r<s.length;r+=4){const a=Math.min(255,(s[r]*.3+s[r+1]*.59+s[r+2]*.11)*1.9);s[r]=s[r+1]=s[r+2]=a}return t.putImageData(n,0,0),Hi=new Tr(e),Hi.wrapS=Hi.wrapT=An,Hi.colorSpace=St,Hi}function dv(){return wr(128,64,(i,e,t)=>{i.fillStyle="#a0723f",i.fillRect(0,0,e,t);for(const[n,s,r]of[[.1,.12,"#6b4322"],[.42,.16,"#c49a5c"],[.78,.12,"#6b4322"]])i.fillStyle=r,i.fillRect(0,n*t,e,s*t);qa(i,e,t,0,26,2)})}function fv(){return wr(64,64,(i,e,t)=>{i.fillStyle="#6a4022",i.fillRect(0,0,e,t),qa(i,e,t,0,30,3)})}function pv(i){const e=i.geometry,t=e.attributes.position,n=e.attributes.normal,s=e.attributes.skinIndex,r=e.attributes.skinWeight,a=e.attributes.uv,o=i.skeleton.bones.map(u=>u.name),c=t.count,l=new Array(c),h=new Float32Array(c*3);for(let u=0;u<c;u++){h[u*3]=t.getX(u),h[u*3+1]=t.getY(u),h[u*3+2]=t.getZ(u);const f=[r.getX(u),r.getY(u),r.getZ(u),r.getW(u)],p=[s.getX(u),s.getY(u),s.getZ(u),s.getW(u)];let _=0;for(let g=1;g<4;g++)f[g]>f[_]&&(_=g);l[u]=o[p[_]]||""}const d={};return i.skeleton.bones.forEach((u,f)=>{d[u.name]=new z().setFromMatrixPosition(i.skeleton.boneInverses[f].clone().invert())}),{g:e,P:t,N:n,SI:s,SW:r,UV:a,names:o,n:c,dom:l,pos:h,bone:d}}function oa(i,e,t=.05){const n=new Map,s=(r,a,o)=>`${r},${a},${o}`;for(let r=0;r<i.n;r++){if(!e(r))continue;const a=s(Math.floor(i.pos[r*3]/t),Math.floor(i.pos[r*3+1]/t),Math.floor(i.pos[r*3+2]/t));(n.get(a)??n.set(a,[]).get(a)).push(r)}return{map:n,cell:t,key:s}}function mv(i,e,t,n,s,r=6){const a=Math.floor(t/e.cell),o=Math.floor(n/e.cell),c=Math.floor(s/e.cell),l=[];for(let h=0;h<12&&l.length<r;h++){for(let d=-h;d<=h;d++)for(let u=-h;u<=h;u++)for(let f=-h;f<=h;f++){if(Math.max(Math.abs(d),Math.abs(u),Math.abs(f))!==h)continue;const p=e.map.get(e.key(a+d,o+u,c+f));if(p)for(const _ of p)l.push([_,Math.hypot(i.pos[_*3]-t,i.pos[_*3+1]-n,i.pos[_*3+2]-s)])}if(l.length>=r){h++;for(let d=-h;d<=h;d++)for(let u=-h;u<=h;u++)for(let f=-h;f<=h;f++){if(Math.max(Math.abs(d),Math.abs(u),Math.abs(f))!==h)continue;const p=e.map.get(e.key(a+d,o+u,c+f));if(p)for(const _ of p)l.push([_,Math.hypot(i.pos[_*3]-t,i.pos[_*3+1]-n,i.pos[_*3+2]-s)])}break}}return l.sort((h,d)=>h[1]-d[1]),l.slice(0,r)}function Mr(i,e,t,n=6){const s=t.length/3,r=new Uint16Array(s*4),a=new Float32Array(s*4),o=(c,l)=>[c.getX(l),c.getY(l),c.getZ(l),c.getW(l)];for(let c=0;c<s;c++){const l=mv(i,e,t[c*3],t[c*3+1],t[c*3+2],n),h=new Map;for(const[f,p]of l){const _=1/(p+.01)**2,g=o(i.SI,f),m=o(i.SW,f);for(let v=0;v<4;v++)m[v]>0&&h.set(g[v],(h.get(g[v])||0)+_*m[v])}const d=[...h].sort((f,p)=>p[1]-f[1]).slice(0,4),u=d.reduce((f,p)=>f+p[1],0)||1;d.forEach(([f,p],_)=>{r[c*4+_]=f,a[c*4+_]=p/u})}return{si:r,sw:a}}function xl(i,e,t,n,s=40,r){const a=new Float32Array(s).fill(-1);let o=0,c=0,l=0;const h=[];for(let u=0;u<i.n;u++){const f=i.pos[u*3+1];Math.abs(f-e)>t||!n(u)||(h.push(u),o+=i.pos[u*3],c+=i.pos[u*3+2],l++)}if(!l)return null;r?(o=r[0],c=r[1]):(o/=l,c/=l);for(const u of h){const f=i.pos[u*3]-o,p=i.pos[u*3+2]-c,_=(Math.atan2(p,f)+Math.PI*2)%(Math.PI*2),g=Math.floor(_/(Math.PI*2)*s)%s;a[g]=Math.max(a[g],Math.hypot(f,p))}for(let u=0;u<s;u++){let f=!1;for(let p=0;p<s;p++)if(a[p]<0){const _=a[(p+s-1)%s],g=a[(p+1)%s];(_>=0||g>=0)&&(a[p]=_>=0&&g>=0?(_+g)/2:Math.max(_,g),f=!0)}if(!f)break}const d=Float32Array.from(a);for(let u=0;u<s;u++)d[u]=Math.max(a[u],(a[(u+s-1)%s]+a[(u+1)%s])/2);return{r:d,cx:o,cz:c,bins:s}}const vl=(i,e)=>{const t=(e%(Math.PI*2)+Math.PI*2)%(Math.PI*2)/(Math.PI*2)*i.bins,n=Math.floor(t)%i.bins,s=(n+1)%i.bins,r=t-Math.floor(t);return i.r[n]*(1-r)+i.r[s]*r};function Ii(i,e,{positions:t,uvs:n,index:s,si:r,sw:a},o){const c=new mt;c.setAttribute("position",new Ve(t,3)),c.setAttribute("uv",new Ve(n,2)),c.setAttribute("skinIndex",new el(r,4)),c.setAttribute("skinWeight",new Ve(a,4)),c.setIndex(s),c.computeVertexNormals();const l=new Ga(c,o);return l.castShadow=!0,l.receiveShadow=!0,l.frustumCulled=!1,l.position.copy(e.position),l.quaternion.copy(e.quaternion),l.scale.copy(e.scale),e.parent.add(l),l.bind(e.skeleton,e.bindMatrix),(e.userData.garments??=[]).push(l),l}function La(i,e,t){const n=[],s=t?e:e-1;for(let r=0;r<i-1;r++)for(let a=0;a<s;a++){const o=r*e+a,c=r*e+(a+1)%e,l=(r+1)*e+a,h=(r+1)*e+(a+1)%e;n.push(o,l,c,c,l,h)}return n}function gv(i,e,t){const n=i.bone,s=Math.abs(n.lowerarm_l.x),r=Math.abs(n.hand_l.x),a=Math.abs(n.upperarm_l.x),o=s+(r-s)*.45,c=n.neck_01.y+.015,l=n.pelvis.y-.12,h=y=>{const P=i.dom[y],U=Math.abs(i.pos[y*3]),T=i.pos[y*3+1];return!(bl.test(P)||_l.test(P)&&T>c||T>c||T<l||U>o)},d=y=>{const P=Math.abs(i.pos[y*3]);return P>a+.04?.022+.04*Math.min(1,(P-a)/(o-a)):.03},u=i.g.index.array,f=new Map,p=[],_=[],g=[],m=[],v=[],x=y=>{if(f.has(y))return f.get(y);const P=p.length/3,U=d(y);return p.push(i.pos[y*3]+i.N.getX(y)*U,i.pos[y*3+1]+i.N.getY(y)*U,i.pos[y*3+2]+i.N.getZ(y)*U),_.push(i.pos[y*3]*1.5,i.pos[y*3+1]*1.5+i.pos[y*3+2]*1.5),g.push(i.SI.getX(y),i.SI.getY(y),i.SI.getZ(y),i.SI.getW(y)),m.push(i.SW.getX(y),i.SW.getY(y),i.SW.getZ(y),i.SW.getW(y)),f.set(y,P),b.push(y),P},b=[];for(let y=0;y<u.length;y+=3){const[P,U,T]=[u[y],u[y+1],u[y+2]];h(P)&&h(U)&&h(T)&&v.push(x(P),x(U),x(T))}const E=p.length/3,S=Array.from({length:E},()=>new Set),A=new Map;for(let y=0;y<v.length;y+=3)for(let P=0;P<3;P++){const U=v[y+P],T=v[y+(P+1)%3];S[U].add(T),S[T].add(U);const w=U<T?`${U}_${T}`:`${T}_${U}`;A.set(w,(A.get(w)||0)+1)}const R=new Uint8Array(E);for(const[y,P]of A)if(P===1){const[U,T]=y.split("_").map(Number);R[U]=R[T]=1}const M=Float32Array.from(p);for(let y=0;y<10;y++){const P=Float32Array.from(p);for(let U=0;U<E;U++){if(R[U]||!S[U].size)continue;const w=Math.abs(M[U*3])>a+.06?.25:.6;let L=0,O=0,V=0;for(const q of S[U])L+=P[q*3],O+=P[q*3+1],V+=P[q*3+2];const N=S[U].size;p[U*3]+=(L/N-P[U*3])*w,p[U*3+1]+=(O/N-P[U*3+1])*w,p[U*3+2]+=(V/N-P[U*3+2])*w}}for(let y=0;y<E;y++){const P=b[y],U=i.N.getX(P),T=i.N.getY(P),w=i.N.getZ(P),O=.026-((p[y*3]-i.pos[P*3])*U+(p[y*3+1]-i.pos[P*3+1])*T+(p[y*3+2]-i.pos[P*3+2])*w);O>0&&(p[y*3]+=U*O,p[y*3+1]+=T*O,p[y*3+2]+=w*O)}return Ii(i,e,{positions:p,uvs:_,index:v,si:new Uint16Array(g),sw:new Float32Array(m)},t)}function bv(i,e,t,n){const s=i.bone,r=s.pelvis.y+.1,a=s.foot_l.y+.05,o=30,c=44,l=v=>!gl.test(i.dom[v])&&!_l.test(i.dom[v])&&!/^clavicle/.test(i.dom[v]),h=[];for(let v=0;v<o;v++){const x=r+(a-r)*(v/(o-1));h.push(xl(i,x,.035,l,c,[0,0])||h[h.length-1])}const d=[];for(let v=0;v<o;v++){const x=[];for(let E=0;E<c;E++){const S=E/c*Math.PI*2;let A=vl(h[v],S);v>0&&(A=Math.max(A,d[v-1][E]*.995)),x.push(A)}const b=x.map((E,S)=>(x[(S+c-1)%c]+2*E+x[(S+1)%c])/4);d.push(b)}const u=[],f=[];for(let v=0;v<o;v++){const x=v/(o-1),b=r+(a-r)*x;for(let E=0;E<c;E++){const S=E/c*Math.PI*2,A=1+(.02+.07*x)*Math.sin(S*7+.6)*.5+.018*x*Math.sin(S*13),R=(d[v][E]+.045+.12*x*x)*A;u.push(Math.cos(S)*R,b,Math.sin(S)*R),f.push(E/c*2.5,x*1.6)}}const{si:p,sw:_}=Mr(i,t,u,8),g=i.names.indexOf("pelvis");for(let v=0;v<u.length/3;v++){const x=Math.floor(v/c)/(o-1),b=.32-.2*x,E=new Map;for(let R=0;R<4;R++)_[v*4+R]>0&&E.set(p[v*4+R],(E.get(p[v*4+R])||0)+_[v*4+R]*(1-b));E.set(g,(E.get(g)||0)+b);const S=[...E].sort((R,M)=>M[1]-R[1]).slice(0,4),A=S.reduce((R,M)=>R+M[1],0);for(let R=0;R<4;R++)p[v*4+R]=S[R]?S[R][0]:0,_[v*4+R]=S[R]?S[R][1]/A:0}const m=Ii(i,e,{positions:u,uvs:f,index:La(o,c,!0),si:p,sw:_},n);return m.userData.radius=(v,x)=>{const b=Dn.clamp((v-r)/(a-r),0,1),E=Math.round(b*(o-1)),S=Math.round((x%(Math.PI*2)+Math.PI*2)%(Math.PI*2)/(Math.PI*2)*c)%c;return d[E][S]+.045+.12*b*b},m.userData.yTop=r,m}function _v(i,e,t,n,s){const r=i.bone,a=r.pelvis.y+.07,o=.1,c=40,l=4,h=g=>!gl.test(i.dom[g])&&!_l.test(i.dom[g]),d=[],u=[];for(let g=0;g<l;g++){const m=a+o*(g/(l-1)-.5),v=xl(i,m,.03,h,c,[0,0]);for(let x=0;x<c;x++){const b=x/c*Math.PI*2,E=Math.max(vl(v,b)+.05,s.userData.radius(s.userData.yTop,b)+.012);d.push(Math.cos(b)*E,m,Math.sin(b)*E),u.push(x/c*6,g/(l-1))}}const f=La(l,c,!0);for(const[g,m]of[[1.05,.42],[1.25,.34]]){const v=d.length/3,x=8,b=3;for(let E=0;E<x;E++){const S=a-o/2-m*(E/(x-1));for(let A=0;A<b;A++){const R=g+(A-1)*.06,M=s.userData.radius(S,R)+.016;d.push(Math.cos(R)*M,S,Math.sin(R)*M),u.push(A/(b-1),1+E*.6)}}for(let E=0;E<x-1;E++)for(let S=0;S<b-1;S++){const A=v+E*b+S;f.push(A,A+b,A+1,A+1,A+b,A+b+1)}}const{si:p,sw:_}=Mr(i,t,d,8);return Ii(i,e,{positions:d,uvs:u,index:f,si:p,sw:_},n)}function xv(i,e,t,n){const s=i.bone,r=o=>!gl.test(i.dom[o])&&!/^Head/.test(i.dom[o]),a=[];{const o=[],h=s.calf_l.y+.06;for(let g=0;g<9;g++)o.push(.035+(.235-.035)*(g/8));const d=[];for(const g of o){const v=new Float32Array(60).fill(-9),x=new Float32Array(60).fill(9);let b=0;for(let N=0;N<i.n;N++){const q=i.pos[N*3],W=i.pos[N*3+1],ne=i.pos[N*3+2];if(Math.abs(q-g)>.03||W<.3||!(r(N)||/^upperarm/.test(i.dom[N])&&q<.26)||/^Head/.test(i.dom[N]))continue;const oe=Math.min(59,Math.floor(W/1.8*60));v[oe]=Math.max(v[oe],ne),x[oe]=Math.min(x[oe],ne),W>b&&!/^neck/.test(i.dom[N])&&(b=W)}for(let N=58;N>=0;N--)v[N+1]>-9&&(v[N]=Math.max(v[N],v[N+1]-.004)),x[N+1]<9&&(x[N]=Math.min(x[N],x[N+1]+.004));const E=.045+.02*(g-.035)/.2,S=[],A=N=>v[Math.min(59,Math.max(0,Math.floor(N/1.8*60)))]+E,R=N=>x[Math.min(59,Math.max(0,Math.floor(N/1.8*60)))]-E,M=b-.1;for(let N=h;N<=M;N+=.03)S.push([N,A(N)]);const y=A(M),P=R(M),U=(y+P)/2,T=(y-P)/2,w=b+E-M;for(let N=1;N<12;N++){const q=N/12*Math.PI;S.push([M+Math.sin(q)*w,U+Math.cos(q)*T])}for(let N=M;N>=h-.04;N-=.03)S.push([N,R(N)]);const L=[0];for(let N=1;N<S.length;N++)L.push(L[N-1]+Math.hypot(S[N][0]-S[N-1][0],S[N][1]-S[N-1][1]));const O=L[L.length-1],V=[];for(let N=0;N<46;N++){const q=N/45*O;let W=1;for(;W<L.length-1&&L[W]<q;)W++;const ne=(q-L[W-1])/Math.max(1e-6,L[W]-L[W-1]);V.push([g,S[W-1][0]+(S[W][0]-S[W-1][0])*ne,S[W-1][1]+(S[W][1]-S[W-1][1])*ne])}d.push(V)}const u=[],f=[];for(let g=0;g<46;g++)for(let m=0;m<9;m++){const v=d[m][g];u.push(v[0],v[1],v[2]),f.push(m/8,g/45)}const{si:p,sw:_}=Mr(i,t,u,8);a.push(Ii(i,e,{positions:u,uvs:f,index:La(46,9,!1),si:p,sw:_},n))}{const l=s.spine_03.y+.02,h=s.pelvis.y-.02,d=.3,u=[],f=[];for(let g=0;g<7;g++)for(let m=0;m<48;m++){const v=m/48*Math.PI*2,b=h+(l-h)*(1+Math.cos(v))/2+d*(g/6-.5)*(.85+.15*Math.cos(v)),E=xl(i,b,.03,r,40,[0,0]),S=(E?vl(E,v):.18)+.06+.012*Math.sin(v*9+g);u.push(Math.cos(v)*S,b,Math.sin(v)*S),f.push(g/6*.5+.25,m/48*2.2)}const{si:p,sw:_}=Mr(i,t,u,8);a.push(Ii(i,e,{positions:u,uvs:f,index:La(7,48,!0),si:p,sw:_},n))}return a}function vv(i,e,t,n){const s=[];for(const m of["l","r"]){const v=new RegExp(`^(foot|ball)_${m}`);let x=9,b=-9,E=9,S=-9,A=9;for(let ne=0;ne<i.n;ne++)if(v.test(i.dom[ne])){const oe=i.pos[ne*3],Me=i.pos[ne*3+1],J=i.pos[ne*3+2];Me<.05&&(x=Math.min(x,oe),b=Math.max(b,oe),E=Math.min(E,J),S=Math.max(S,J)),A=Math.min(A,Me)}const R=(x+b)/2,M=(E+S)/2,y=(b-x)/2+.012,P=(S-E)/2+.015,U=20,T=[],w=[],L=[],O=A-.018,V=A+.006;for(const ne of[V,O])for(let oe=0;oe<U;oe++){const Me=oe/U*Math.PI*2,J=Math.cos(Me),$=Math.sin(Me),ge=1-.18*Math.max(0,-$);T.push(R+J*y*ge,ne,M+$*P),w.push(J*.5+.5,$*.5+.5)}const N=T.length/3;T.push(R,V,M,R,O,M),w.push(.5,.5,.5,.5);for(let ne=0;ne<U;ne++){const oe=ne,Me=(ne+1)%U;L.push(N,Me,oe),L.push(N+1,U+oe,U+Me),L.push(oe,Me,U+oe,Me,U+Me,U+oe)}const{si:q,sw:W}=Mr(i,t,T,6);s.push(Ii(i,e,{positions:T,uvs:w,index:L,si:q,sw:W},n))}const r=i.bone,a=r.foot_l.y,o=[[a-.01,a+.025],[.035,.055]],c=m=>{const v=i.dom[m];if(!/^(foot|ball|calf)_/.test(v))return!1;const x=i.pos[m*3+1];return o.some(([b,E])=>x>=b&&x<=E)},l=i.g.index.array,h=new Map,d=[],u=[],f=[],p=[],_=[],g=m=>{if(h.has(m))return h.get(m);const v=d.length/3,x=.008;return d.push(i.pos[m*3]+i.N.getX(m)*x,i.pos[m*3+1]+i.N.getY(m)*x,i.pos[m*3+2]+i.N.getZ(m)*x),u.push(i.pos[m*3]*8,i.pos[m*3+1]*8),f.push(i.SI.getX(m),i.SI.getY(m),i.SI.getZ(m),i.SI.getW(m)),p.push(i.SW.getX(m),i.SW.getY(m),i.SW.getZ(m),i.SW.getW(m)),h.set(m,v),v};for(let m=0;m<l.length;m+=3){const[v,x,b]=[l[m],l[m+1],l[m+2]];c(v)&&c(x)&&c(b)&&_.push(g(v),g(x),g(b))}return s.push(Ii(i,e,{positions:d,uvs:u,index:_,si:new Uint16Array(f),sw:new Float32Array(p)},n)),s}function Mv(i,e,t){const n=i.bone;let s=0;for(let g=0;g<i.n;g++)/^Head/.test(i.dom[g])&&(s=Math.max(s,i.pos[g*3+1]));const r=n.Head.z,a=n.spine_03.y-.03,o=g=>{const m=i.dom[g],v=i.pos[g*3+1],x=i.pos[g*3+2],b=Math.abs(i.pos[g*3]);return!(!/^(Head|neck|spine_03|spine_02|clavicle|upperarm)/.test(m)||v<a||b>.24||x>r+.035&&v<s-.045&&v>n.Head.y-.06&&b<.075)},c=i.g.index.array,l=new Map,h=[],d=[],u=[],f=[],p=[],_=g=>{if(l.has(g))return l.get(g);const m=h.length/3,v=i.pos[g*3+1],x=v>n.Head.y-.02?.05:.055;return h.push(i.pos[g*3]+i.N.getX(g)*x,v+i.N.getY(g)*x,i.pos[g*3+2]+i.N.getZ(g)*x),d.push(i.pos[g*3]*2+.5,v*2),u.push(i.SI.getX(g),i.SI.getY(g),i.SI.getZ(g),i.SI.getW(g)),f.push(i.SW.getX(g),i.SW.getY(g),i.SW.getZ(g),i.SW.getW(g)),l.set(g,m),m};for(let g=0;g<c.length;g+=3){const[m,v,x]=[c[g],c[g+1],c[g+2]];o(m)&&o(v)&&o(x)&&p.push(_(m),_(v),_(x))}return Ii(i,e,{positions:h,uvs:d,index:p,si:new Uint16Array(u),sw:new Float32Array(f)},t)}function yv(i,e){const t=i.bone,n=Math.abs(t.lowerarm_l.x),s=Math.abs(t.hand_l.x),r=n+(s-n)*.4,a=e.geometry.attributes.position,o=t.neck_01.y-.01,c=t.foot_l.y+.08;for(let l=0;l<i.n;l++){const h=i.dom[l],d=Math.abs(i.pos[l*3]),u=i.pos[l*3+1];if(bl.test(h)||/^(Head|neck|foot|ball)/.test(h)||u>o||u<c||d>r)continue;const f=/^thigh/.test(h)?.065:/^calf/.test(h)?u>c+.12?.035:.01:.028;a.setXYZ(l,i.pos[l*3]-i.N.getX(l)*f,u-i.N.getY(l)*f,i.pos[l*3+2]-i.N.getZ(l)*f)}a.needsUpdate=!0}function Sv(i){const e=new Map;for(const t of i.userData.garments||[])(e.get(t.material)??e.set(t.material,[]).get(t.material)).push(t);for(const[t,n]of e){if(n.length<2)continue;const s=wd(n.map(a=>a.geometry),!1),r=new Ga(s,t);r.castShadow=!0,r.receiveShadow=!0,r.frustumCulled=!1,r.position.copy(i.position),r.quaternion.copy(i.quaternion),r.scale.copy(i.scale),i.parent.add(r),r.bind(i.skeleton,i.bindMatrix);for(const a of n)a.removeFromParent(),a.geometry.dispose()}i.userData.garments=[]}function au(i,e,t,n){const s=[];i.traverse(a=>{a.isSkinnedMesh&&s.push(a)});const r={};e.skeleton.bones.forEach(a=>{r[a.name]=a});for(const a of s){const o=a.skeleton.bones.map(d=>r[d.name]||r.Head),c=new Va(o,a.skeleton.boneInverses.map(d=>d.clone())),l=a.material.clone();t&&(l.color=new Te(t),l.roughness=.75),l.side=At,l.alphaTest=Math.max(l.alphaTest||0,.35),l.transparent=!1;const h=new Ga(a.geometry,l);h.castShadow=!0,h.frustumCulled=!1,h.userData.part=n,h.position.copy(e.position),h.quaternion.copy(e.quaternion),h.scale.copy(e.scale),e.parent.add(h),h.bind(c,e.bindMatrix)}}function Dd({baseGltf:i,hairGltf:e,beardGltf:t,female:n=!1,cover:s=!1,colors:r={}}){const a=i.scene;a.updateMatrixWorld(!0);let o=null;a.traverse(E=>{E.isSkinnedMesh&&(!o||E.geometry.attributes.position.count>o.geometry.attributes.position.count)&&(o=E)}),a.traverse(E=>{E.isMesh&&(E.castShadow=!0,E.receiveShadow=!0,E.frustumCulled=!1)});const c=pv(o),l=hv(),h=new dt({name:"tunic",map:ru(),normalMap:l,normalScale:new ue(.12,.12),roughness:.92,side:At,color:r.tunic??16777215}),d=new dt({name:"mantle",map:Ld(),normalMap:l,normalScale:new ue(.5,.5),roughness:.96,side:At,alphaTest:.5,color:r.mantle??16777215}),u=new dt({name:"sash",map:dv(),normalMap:l,normalScale:new ue(.4,.4),roughness:.9,side:At,color:r.sash??16777215}),f=new dt({name:"leather",map:fv(),roughness:.65}),p=new dt({name:"veil",map:ru(),normalMap:l,normalScale:new ue(.2,.2),roughness:.95,side:At,color:r.veil??10465480}),g=oa(c,E=>!bl.test(c.dom[E])&&!/^Head/.test(c.dom[E])),m=oa(c,E=>/^(spine|pelvis|clavicle|neck)/.test(c.dom[E])),v=oa(c,E=>/^(pelvis|spine_01|thigh|calf|foot|ball)/.test(c.dom[E]));gv(c,o,h);const x=bv(c,o,v,h);_v(c,o,g,u,x),xv(c,o,m,d),vv(c,o,oa(c,E=>/^(foot|ball|calf)_/.test(c.dom[E]),.03),f),s&&Mv(c,o,p),yv(c,o),Sv(o);const b=r.hair??2759184;return e&&!s&&au(e.scene,o,b,"hair"),t&&au(t.scene,o,b,"beard"),a.traverse(E=>{E.isMesh&&/Hair/.test(E.material?.name||"")&&(E.material=E.material.clone(),E.material.color=new Te(b))}),a.userData.body=o,a}const Bc=.55,Ev=1.75;class Tv{constructor(e,t=10){this.heightAt=e,this.cell=t,this.grid=new Map,this.list=[],this.stamp=0}key(e,t){return e*65536+t}add(e){e.cos=Math.cos(e.rot||0),e.sin=Math.sin(e.rot||0),e.mark=0;const t=Math.hypot(e.hx,e.hz),n=Math.floor((e.x-t)/this.cell),s=Math.floor((e.x+t)/this.cell),r=Math.floor((e.z-t)/this.cell),a=Math.floor((e.z+t)/this.cell);for(let o=n;o<=s;o++)for(let c=r;c<=a;c++){const l=this.key(o,c);(this.grid.get(l)??this.grid.set(l,[]).get(l)).push(e)}return this.list.push(e),e}local(e,t,n){const s=t-e.x,r=n-e.z;return[e.cos*s-e.sin*r,e.sin*s+e.cos*r]}top(e,t,n){if(!e.rampAxis)return e.y1;const s=e.rampAxis==="x"?(t/e.hx+1)/2:(n/e.hz+1)/2;return e.rampA+(e.rampB-e.rampA)*Math.min(1,Math.max(0,s))}near(e,t,n,s){const r=++this.stamp,a=Math.floor((e-n)/this.cell),o=Math.floor((e+n)/this.cell),c=Math.floor((t-n)/this.cell),l=Math.floor((t+n)/this.cell);for(let h=a;h<=o;h++)for(let d=c;d<=l;d++){const u=this.grid.get(this.key(h,d));if(u)for(const f of u)f.mark!==r&&(f.mark=r,s(f))}}groundAt(e,t,n=1/0,s=Bc){let r=this.heightAt(e,t);return this.near(e,t,0,a=>{const[o,c]=this.local(a,e,t);if(Math.abs(o)>a.hx||Math.abs(c)>a.hz)return;const l=this.top(a,o,c);l<=n+s&&l>r&&(r=l)}),r}resolve(e,t,n,s){for(let r=0;r<3;r++){let a=!1;if(this.near(e,t,s+1,o=>{const[c,l]=this.local(o,e,t);if(Math.abs(c)>o.hx+s||Math.abs(l)>o.hz+s||this.top(o,Math.max(-o.hx,Math.min(o.hx,c)),Math.max(-o.hz,Math.min(o.hz,l)))<=n+Bc||o.y0>=n+Ev)return;const d=Math.max(-o.hx,Math.min(o.hx,c)),u=Math.max(-o.hz,Math.min(o.hz,l));let f=c-d,p=l-u,_=Math.hypot(f,p),g=c,m=l;if(_>1e-5){if(_>=s)return;g=d+f/_*s,m=u+p/_*s}else{const v=o.hx-Math.abs(c),x=o.hz-Math.abs(l);v<x?g=Math.sign(c||1)*(o.hx+s):m=Math.sign(l||1)*(o.hz+s)}e=o.x+o.cos*g+o.sin*m,t=o.z-o.sin*g+o.cos*m,a=!0}),!a)break}return[e,t]}blocked(e,t,n){if(t<this.heightAt(e,n)+.25)return!0;let s=!1;return this.near(e,n,0,r=>{if(s)return;const[a,o]=this.local(r,e,n);Math.abs(a)>r.hx||Math.abs(o)>r.hz||t>r.y0&&t<this.top(r,a,o)+.2&&(s=!0)}),s}}const Av={ashlar:["large_sandstone_blocks_01",4,15785920],temple:["white_sandstone_blocks_02",3,16775146],walls:["white_sandstone_bricks",3,15390388],marble:["marble_01",3,16777215],plaster:["white_plaster_rough_01",3,15853526],plasterWarm:["plastered_stone_wall",3.5,14929840],clay:["clay_plaster",3,14203030],paving:["white_sandstone_blocks_02",2.4,16181974],rock:["rock_wall_08",4,14074789],cliff:["cliff_side",7,13224914],wood:["medieval_wood",2,13214330],field:["dry_ground_rocks",5,16777215]};function Ml(i,e,t,n=!0){const s=document.createElement("canvas");s.width=i,s.height=e,t(s.getContext("2d"),i,e);const r=new Tr(s);return r.wrapS=r.wrapT=An,r.anisotropy=4,n&&(r.colorSpace=St),r}let ou=11;const xa=()=>(ou=ou*16807%2147483647)/2147483647;function wv(){return Ml(256,512,(i,e,t)=>{const n=["#2c3f8f","#6b2a6e","#a8242a","#efe6d0","#a8242a","#6b2a6e","#2c3f8f"];n.forEach((r,a)=>{i.fillStyle=r,i.fillRect(0,a/n.length*t,e,t/n.length+1)}),i.strokeStyle="#e4c063",i.lineWidth=2;for(let r=0;r<n.length;r++)for(let a=0;a<4;a++){const o=(a+.5)*e/4,c=(r+.5)*t/n.length,l=14;i.beginPath(),i.moveTo(o,c-l),i.lineTo(o+l,c),i.lineTo(o,c+l),i.lineTo(o-l,c),i.closePath(),i.stroke(),i.beginPath(),i.arc(o,c,4,0,7),i.stroke()}const s=i.getImageData(0,0,e,t);for(let r=0;r<s.data.length;r+=4){const a=(xa()-.5)*18;s.data[r]+=a,s.data[r+1]+=a,s.data[r+2]+=a}i.putImageData(s,0,0)})}function Rv(){return Ml(128,128,(i,e,t)=>{const n=i.createImageData(e,t),s=Array.from({length:60},()=>[xa()*e,xa()*t,4+xa()*8]);for(let r=0;r<t;r++)for(let a=0;a<e;a++){let o=0,c=0;for(const[h,d,u]of s){let f=a-h,p=r-d;f-=Math.round(f/e)*e,p-=Math.round(p/t)*t;const _=Math.hypot(f,p);_<u&&(o+=f/u*(1-_/u),c+=p/u*(1-_/u))}const l=(r*e+a)*4;n.data[l]=128+o*60,n.data[l+1]=128+c*60,n.data[l+2]=230,n.data[l+3]=255}i.putImageData(n,0,0)},!1)}function Cv(){return Ml(256,64,(i,e,t)=>{[["#b8432e","#e8d4a8"],["#2f5e8e","#e8d4a8"],["#c08a2e","#7a3b1f"],["#5b7d3a","#e8d4a8"]].forEach((s,r)=>{for(let a=0;a<8;a++)i.fillStyle=s[a%2],i.fillRect(r*64+a*8,0,8,t)})})}async function Pv(i,{anisotropy:e=8}={}){const t=(a,o)=>i.loadAsync(a).then(c=>(c.wrapS=c.wrapT=An,c.anisotropy=e,o&&(c.colorSpace=St),c)),n={};await Promise.all(Object.entries(Av).map(async([a,[o,c,l]])=>{const[h,d,u]=await Promise.all([t(`assets/tex/${o}/diff.webp`,!0),t(`assets/tex/${o}/nor.webp`),t(`assets/tex/${o}/arm.webp`)]);n[a]=new dt({map:h,normalMap:d,roughnessMap:u,aoMap:u,aoMapIntensity:.8,color:l,roughness:1,metalness:0}),n[a].userData.tile=c}));const s={};for(const[a,o]of[["grass","aerial_grass_rock"],["dry","dry_ground_rocks"],["road","rocky_trail"],["pave","cobblestone_floor_01"],["rock","cliff_side"]])s[a]=await t(`assets/tex/${o}/diff.webp`,!0);s.grassN=await t("assets/tex/aerial_grass_rock/nor.webp");const r=Rv();return n.gold=new dt({color:15905340,metalness:1,roughness:.34,normalMap:r,normalScale:new ue(.15,.15),envMapIntensity:.9,emissive:4860422,emissiveIntensity:.6}),n.gold.userData.tile=3,n.bronze=new dt({color:11565630,metalness:.85,roughness:.42,normalMap:r,normalScale:new ue(.12,.12),emissive:2757638,emissiveIntensity:.5}),n.bronze.userData.tile=4,n.veil=new dt({map:wv(),roughness:.85,side:At}),n.veil.userData.tile=0,n.void=new ri({color:919814}),n.void.userData.tile=1,n.window=new dt({color:2759182,emissive:16752704,emissiveIntensity:0,roughness:1}),n.window.userData.tile=1,n.lit=new dt({color:3810322,emissive:16753992,emissiveIntensity:1.6,roughness:1}),n.lit.userData.tile=1,n.awning=new dt({map:Cv(),roughness:.9,side:At}),n.awning.userData.tile=0,n.linen=new dt({color:15919832,roughness:.9}),n.linen.userData.tile=1,n.darkWood=n.wood.clone(),n.darkWood.color=new Te(7031344),n.darkWood.userData.tile=2,n.roof=n.plaster.clone(),n.roof.color=new Te(14272424),n.roof.userData.tile=3,n.stoneDark=n.walls.clone(),n.stoneDark.color=new Te(11902588),n.stoneDark.userData.tile=3,n.fieldStone=n.rock.clone(),n.fieldStone.color=new Te(15917766),n.fieldStone.userData.tile=2.5,n.water=new pn({color:4885148,roughness:.18,metalness:0,transparent:!0,opacity:.85,clearcoat:.5,envMapIntensity:.7}),{M:n,ground:s}}const cu=new ze,Iv=new Jt,Lv=new z,Dv=new z(1,1,1),Uv=new en;class Nv{constructor(e,t){this.M=e,this.solids=t,this.parts=new Map,this.noShadow=new Set(["void","window","lit","water"])}push(e,t){if(!this.M[e])throw new Error("material "+e);(this.parts.get(e)??this.parts.set(e,[]).get(e)).push(t)}tile(e){return this.M[e].userData.tile??3}box(e,t,n,s,r,a,o,c=0,{solid:l=!0,uv:h}={}){const d=o-a;if(d<=0||s<=0||r<=0)return;const u=new Bn(s,d,r),f=this.tile(e),p=u.attributes.uv;if(f>0){const _=[[r,d],[r,d],[s,r],[s,r],[s,d],[s,d]],g=(t*.37+n*.61)%7/f,m=a/f;for(let v=0;v<6;v++)for(let x=0;x<4;x++){const b=v*4+x;p.setXY(b,p.getX(b)*_[v][0]/f+g,p.getY(b)*_[v][1]/f+(v<2||v>3?m:0))}}else if(h)for(let _=0;_<p.count;_++)p.setXY(_,h[0]+p.getX(_)*h[2],h[1]+p.getY(_)*h[3]);cu.compose(Lv.set(t,(a+o)/2,n),Iv.setFromEuler(Uv.set(0,c,0)),Dv.set(1,1,1)),u.applyMatrix4(cu),this.push(e,u),l&&this.solids&&this.solids.add({x:t,z:n,hx:s/2,hz:r/2,rot:c,y0:a,y1:o})}cyl(e,t,n,s,r,a,{r1:o=s,seg:c=12,solid:l=!0,open:h=!1}={}){const d=a-r,u=new Rn(o,s,d,c,1,h),f=this.tile(e),p=u.attributes.uv;if(f>0)for(let _=0;_<p.count;_++)p.setXY(_,p.getX(_)*(2*Math.PI*Math.max(s,o))/f,p.getY(_)*d/f);u.translate(t,(r+a)/2,n),this.push(e,u),l&&this.solids&&this.solids.add({x:t,z:n,hx:s*.85,hz:s*.85,rot:0,y0:r,y1:a})}geom(e,t,n){n&&t.applyMatrix4(n),this.push(e,t.index?t:lu(t))}stairs(e,t,n,s,r,a,o,c=0,{n:l}={}){const h=l??Math.max(2,Math.round((o-a)/.3)),d=(o-a)/h,u=r/h,f=Math.cos(c),p=Math.sin(c);for(let _=0;_<h;_++){const g=-r/2+u*(_+.5);this.box(e,t+p*g,n+f*g,s,u+.02,a-.6,a+d*(_+1),c)}}finish(e,{shadows:t=!0}={}){const n={};for(const[s,r]of this.parts){const a=wd(r.map(c=>c.index?c:lu(c)),!1);if(r.forEach(c=>c.dispose()),!a)continue;a.computeBoundingSphere();const o=new et(a,this.M[s]);o.castShadow=t&&!this.noShadow.has(s),o.receiveShadow=!0,o.matrixAutoUpdate=!1,o.updateMatrix(),e.add(o),n[s]=o}return this.parts.clear(),n}}function lu(i){const e=i.attributes.position.count,t=new Array(e);for(let n=0;n<e;n++)t[n]=n;return i.setIndex(t),i}const ts={x0:-20,x1:92,z0:-60,z1:50,y:21},yl={x0:-24,x1:8,z0:-86,z1:-60},Ud={x0:-145,x1:-100,z0:15,z1:60},yr={x:18,z:122,w:18,d:10},Bt={x:-84,z:-132,r:22,h:10},Ht={x:-40,z:-150},an={x:180,z:-10},on={x:128,z:-6},dn={x:262,z:40},Sr={x:250,z:49,rot:-Math.PI/2},Ji=i=>114+Math.sin(i*.018)*7,Xt=[[-150,-80],[-24,-80],[92,-60],[92,50],[72,92],[38,132],[-14,142],[-72,120],[-132,96],[-150,60]],Nd=new Set([1,2]),Fv=[{seg:0,t:.47,name:"Porta de Genate"},{seg:9,t:.407,name:"Porta de Jafa"},{seg:4,t:.44,name:"Porta da Fonte"},{seg:5,t:.85,name:"Porta dos Essênios"}],Fd=[{w:4.5,pts:[[-91,-80],[-92,-96],[-86,-110],[-70,-116],[-56,-122],[-44,-129]]},{w:3.2,pts:[[-92,-100],[-104,-112],[-106,-128],[-98,-146],[-86,-150],[-80,-140]]},{w:5,pts:[[57,110],[78,112],[100,92],[112,60],[116,30],[124,8],[140,-4],[156,-12],[168,-20],[176,-18],[180,-10]]},{w:4.5,pts:[[-6,141],[10,168],[60,182],[110,184],[132,176]]},{w:4.5,pts:[[-150,3],[-190,6],[-240,0],[-300,-8]]},{w:4,pts:[[180,-10],[204,2],[226,20],[242,40],[262,40]]}],va=[{w:6,pts:[[-150,3],[-100,2],[-60,0],[-34,2],[-28,10]]},{w:6,pts:[[-91,-80],[-84,-40],[-78,0],[-64,50],[-40,100],[-6,140]]},{w:5,pts:[[-34,60],[-10,70],[10,92],[18,116]]},{w:5,pts:[[-78,-40],[-50,-55],[-28,-66]]},{w:5,pts:[[-64,50],[-30,58],[0,62],[20,64]]},{w:5,pts:[[10,92],[40,100],[57,110]]}],Ya=[{id:"templo",name:"Templo de Herodes",x:36,z:-4,r:50,spawn:[62,-42],look:[24,-7]},{id:"atrio",name:"Átrio das Mulheres",x:60,z:-7,r:9,spawn:[77,-7],look:[20,-7]},{id:"antonia",name:"Fortaleza Antônia",x:-8,z:-73,r:16},{id:"golgota",name:"Gólgota, o Lugar da Caveira",x:Bt.x,z:Bt.z,r:34,spawn:[-80,-104],look:[-84,-134]},{id:"sepulcro",name:"O Sepulcro no Jardim",x:Ht.x,z:Ht.z+14,r:18,spawn:[-46,-124],look:[-40,-142]},{id:"mirante",name:"Monte das Oliveiras",x:an.x,z:an.z,r:30,spawn:[an.x-5.5,an.z+1],look:[30,-7]},{id:"getsemani",name:"Getsêmani",x:on.x,z:on.z,r:18,spawn:[121,6],look:[131,-4]},{id:"cedrom",name:"Vale do Cedrom",x:114,z:40,r:18},{id:"siloe",name:"Tanque de Siloé",x:yr.x,z:yr.z,r:14,spawn:[10,108],look:[18,124]},{id:"palacio",name:"Palácio de Herodes",x:-122,z:30,r:26},{id:"betania",name:"Betânia",x:dn.x,z:dn.z,r:34,spawn:[244,40],look:[262,40]},{id:"cidade",name:"Cidade Alta",x:-80,z:10,r:60,spawn:[-78,4],look:[30,-6]}];function Da(i,e,t){let n=!1;for(let s=0,r=t.length-1;s<t.length;r=s++){const[a,o]=t[s],[c,l]=t[r];o>e!=l>e&&i<(c-a)*(e-o)/(l-o)+a&&(n=!n)}return n}function Od(i,e,t,n,s,r){const a=s-t,o=r-n,c=a*a+o*o,l=c?Math.max(0,Math.min(1,((i-t)*a+(e-n)*o)/c)):0;return Math.hypot(i-(t+a*l),e-(n+o*l))}function zd(i,e,t){let n=1/0;for(let s=0;s<t.length-1;s++)n=Math.min(n,Od(i,e,t[s][0],t[s][1],t[s+1][0],t[s+1][1]));return n}function rn(i,e,t=Fd){let n=1/0;for(const s of t)n=Math.min(n,zd(i,e,s.pts)-s.w/2);return n}const As=(i,e,t,n=0)=>i>t.x0-n&&i<t.x1+n&&e>t.z0-n&&e<t.z1+n,Ua=(i,e)=>Da(i,e,Xt)||As(i,e,ts)||As(i,e,yl),ca=(i,e)=>{const t=Math.sin(i*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},hu=i=>i*i*(3-2*i);function Ov(i,e){const t=Math.floor(i),n=Math.floor(e),s=i-t,r=e-n,a=ca(t,n),o=ca(t+1,n),c=ca(t,n+1),l=ca(t+1,n+1),h=hu(s),d=hu(r);return a+(o-a)*h+(c-a)*d+(a-o-c+l)*h*d}const Ut=(i,e,t=4)=>{let n=0,s=.5,r=1;for(let a=0;a<t;a++)n+=s*Ov(i*r,e*r),r*=2,s*=.5;return n},En=(i,e,t)=>{const n=Math.min(1,Math.max(0,(t-i)/(e-i)));return n*n*(3-2*n)},qi=(i,e,t,n,s,r)=>{const a=((i-t)/s)**2+((e-n)/r)**2;return Math.exp(-a*1.6)},zv=[[-185,-60],[-178,40],[-150,128],[-90,158],[-10,178],[60,172],[105,140],[Ji(140),140]];function Bd(i,e){let n=9+((Ut(i*.008+3,e*.008-7)-.5)*9+(Ut(i*.03,e*.03)-.5)*2.2)*.8;n+=6*qi(i,e,-100,15,85,95),n+=5*qi(i,e,30,-10,80,90);const s=Ji(e),r=i-s;n-=10*Math.exp(-((r/30)**2)),n-=1.3*(1-En(1.2,3.4,Math.abs(r))),n+=55*Math.exp(-(((i-225)/85)**2))*Math.exp(-(((e+10)/190)**2))*(1+.08*Math.sin(e*.017)),n+=3*qi(i,e,an.x,an.z,30,30);const a=zd(i,e,zv);n-=8*Math.exp(-((a/20)**2)),n+=Bt.h*qi(i,e,Bt.x,Bt.z,Bt.r,Bt.r*.85),n+=8*qi(i,e,Ht.x,Ht.z-8,30,15),n-=Math.max(0,-i-230)*.16,n+=Math.max(0,Math.hypot(i,e)-300)*.05*(i>0?1:0);const o=rn(i,e);return o<1.5&&(n-=.25*(1-En(-1,1.5,o))),n}const Bv=[[an.x,an.z,18],[on.x,on.z,19],[dn.x,dn.z,36],[96,150,13],[128,128,10],[168,82,9]].map(([i,e,t])=>({x:i,z:e,r:t,h:kv(i,e)}));function kv(i,e){return Bd(i,e)}function kd(i,e){let t=Bd(i,e);for(const n of Bv){const s=Math.hypot(i-n.x,e-n.z);s<n.r*2.2&&(t+=(n.h-t)*.85*Math.exp(-((s/(n.r*.75))**2)))}return t}const kc=kd(Ht.x,Ht.z+10.5)-.1,Hv=()=>kc;function pe(i,e){let t=kd(i,e);const n=Math.abs(i-Ht.x),s=e-(Ht.z+8.5);return n<3.2&&s>-8.2&&s<1.5?t=Math.min(t,kc-.4):n<12&&s>=0&&s<9&&(t=Math.min(t,kc+Math.max(0,s-4)*.15+Math.max(0,n-9)*.3)),t}function Gv(i,e,{lowQuality:t}){const s=t?250:320,r=new Gn(620,620,s,s).rotateX(-Math.PI/2);r.translate(20,0,0);const a=r.attributes.position,o=a.count,c=r.attributes.uv;for(let p=0;p<o;p++){const _=a.getX(p),g=a.getZ(p);a.setY(p,pe(_,g)),c.setXY(p,_/6,g/6)}r.computeVertexNormals();const l=r.attributes.normal,h=new Float32Array(o*4),d=new Float32Array(o*4);for(let p=0;p<o;p++){const _=a.getX(p),g=a.getZ(p);a.getY(p);const m=l.getY(p),v=Ua(_,g)&&!As(_,g,ts,-1),x=1-En(-.6,1.2,rn(_,g)),b=v?1-En(-.8,1.4,rn(_,g,va)):0,E=1-En(.6,.8,m),S=qi(_,g,Bt.x+6,Bt.z+10,16,12)*1.4,A=qi(_,g,Ht.x,Ht.z-6,16,6),R=Math.min(1,Math.max(E,S*.9,A)),M=Ut(_*.02+40,g*.02);let y=En(.55,.72,M)*.85+(Ua(_,g)?.6:0);const P=Math.max(ir(_,g,160,58,16,10,.35),ir(_,g,92,124,13,9,-.2),ir(_,g,186,120,12,16,.1)),U=Math.max(ir(_,g,178,142,26,18,.15),ir(_,g,60,160,22,12,-.1));h[p*4]=Math.min(1,y),h[p*4+1]=R,h[p*4+2]=Math.max(x*(v?.3:1),0),h[p*4+3]=v?Math.max(.55,b):0,d[p*4]=P,d[p*4+1]=U,d[p*4+2]=0,d[p*4+3]=0}r.setAttribute("aSplatA",new vt(h,4)),r.setAttribute("aSplatB",new vt(d,4));const u=new dt({map:e.grass,normalMap:e.grassN,normalScale:new ue(.6,.6),roughness:.97});u.onBeforeCompile=p=>{Object.assign(p.uniforms,{tDry:{value:e.dry},tRock:{value:e.rock},tRoad:{value:e.road},tPave:{value:e.pave}}),p.vertexShader=`attribute vec4 aSplatA; attribute vec4 aSplatB; varying vec4 vA; varying vec4 vB; varying vec3 vW;
`+p.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 vA = aSplatA; vB = aSplatB; vW = (modelMatrix * vec4(position,1.)).xyz;`),p.fragmentShader=`uniform sampler2D tDry, tRock, tRoad, tPave; varying vec4 vA; varying vec4 vB; varying vec3 vW;
`+p.fragmentShader.replace("#include <map_fragment>",`
        vec2 uv = vMapUv;
        float lum = dot(texture2D(map, uv).rgb, vec3(.333)) / .36;
        float big = texture2D(map, vW.xz * .009).g, big2 = texture2D(map, vW.xz * .027 + .3).r;
        // pasto de primavera: verde-oliva com manchas douradas
        vec3 grass = mix(vec3(.30,.46,.13), vec3(.55,.62,.20), smoothstep(.3,.75,big));
        grass = mix(grass, vec3(.78,.68,.30), smoothstep(.6,.9,big2) * .55);
        grass *= .7 + lum * .45;
        vec3 dry = texture2D(tDry, uv * .9).rgb * vec3(1.08, .98, .86);
        vec3 rock = texture2D(tRock, uv * .55).rgb * vec3(1.05, .97, .85);
        vec3 road = texture2D(tRoad, uv * .8).rgb * vec3(1.12, 1.0, .82);
        vec3 pave = texture2D(tPave, vW.xz / 2.2).rgb * vec3(1.06, .98, .86);
        // campo arado: sulcos marrom-avermelhados
        float furrow = .5 + .5 * sin(vW.x * 2.6 + vW.z * .9);
        vec3 plowed = mix(vec3(.50,.32,.20), vec3(.66,.46,.30), furrow) * (.85 + lum * .25);
        vec3 wheat = mix(vec3(.80,.66,.28), vec3(.92,.82,.42), big2) * (.85 + lum * .25);
        vec3 c = grass;
        c = mix(c, dry, smoothstep(.2,.8, vA.x));
        c = mix(c, plowed, smoothstep(.3,.7, vB.x));
        c = mix(c, wheat, smoothstep(.3,.7, vB.y));
        c = mix(c, pave, smoothstep(.3,.7, vA.w));
        c = mix(c, road, smoothstep(.25,.75, vA.z));
        c = mix(c, rock, smoothstep(.3,.75, vA.y));
        diffuseColor *= vec4(c, 1.);
      `)};const f=new et(r,u);return f.receiveShadow=!0,i.add(f),f}function ir(i,e,t,n,s,r,a){const o=Math.cos(a),c=Math.sin(a),l=i-t,h=e-n,d=o*l-c*h,u=c*l+o*h;return(1-En(s-2,s,Math.abs(d)))*(1-En(r-2,r,Math.abs(u)))}function Vv(i){const r=[],a=[],o=[],c=new Te(9079381),l=new Te(10128040),h=new Te(13218954),d=new Te;for(let g=0;g<=40;g++){const m=g/40,v=290+1910*m*m;for(let x=0;x<128;x++){const b=x/128*Math.PI*2,E=20+Math.cos(b)*v,S=Math.sin(b)*v,A=Math.max(0,-Math.cos(b));let R=(Ut(E*.004+9,S*.004)-.35)*120*En(0,.3,m)+20;R=v<340?Math.min(R,pe(E,S)-2):R,R-=A**1.5*En(380,900,v)*260,r.push(E,R,S),d.copy(c).lerp(l,En(.1,.8,m)),R<-18&&d.copy(h),a.push(d.r,d.g,d.b)}}for(let g=0;g<40;g++)for(let m=0;m<128;m++){const v=g*128+m,x=g*128+(m+1)%128,b=(g+1)*128+m,E=(g+1)*128+(m+1)%128;o.push(v,x,b,x,E,b)}const u=new mt;u.setAttribute("position",new Ve(r,3)),u.setAttribute("color",new Ve(a,3)),u.setIndex(o),u.computeVertexNormals();const f=new et(u,new dt({vertexColors:!0,roughness:1}));f.receiveShadow=!1,i.add(f);const p=Sl(7),_=new et(new Gn(9e3,9e3).rotateX(-Math.PI/2),new pn({color:4026266,roughness:.08,metalness:0,normalMap:p,normalScale:new ue(.25,.25),clearcoat:1,envMapIntensity:1.2}));return _.position.y=-22,i.add(_),{far:f,sea:_,wn:p}}function Sl(i=6){const t=document.createElement("canvas");t.width=t.height=256;const n=t.getContext("2d"),s=n.createImageData(256,256),r=(o,c)=>Math.sin(o*6.2832*3)*.5+Math.sin(c*6.2832*4+o*6.2832)*.5+Math.sin((o+c)*6.2832*5)*.35+Math.sin((o-c)*6.2832*7)*.2;for(let o=0;o<256;o++)for(let c=0;c<256;c++){const l=c/256,h=o/256,d=1/256,u=r(l+d,h)-r(l-d,h),f=r(l,h+d)-r(l,h-d),p=(o*256+c)*4;s.data[p]=128+u*40,s.data[p+1]=128+f*40,s.data[p+2]=255,s.data[p+3]=255}n.putImageData(s,0,0);const a=new Tr(t);return a.wrapS=a.wrapT=An,a.repeat.set(i,i),a}function Wv(i,e){const t=[];for(let d=-300;d<=300;d+=4)t.push([Ji(d),d]);const s=[],r=[],a=[];t.forEach(([d,u],f)=>{const[p,_]=t[Math.min(t.length-1,f+1)],[g,m]=t[Math.max(0,f-1)],v=p-g,x=_-m,b=Math.hypot(v,x),E=-x/b,S=v/b,A=pe(d,u)+.45;if(s.push(d+E*2.6,A,u+S*2.6,d-E*2.6,A,u-S*2.6),r.push(0,f*.8,1,f*.8),f<t.length-1){const R=f*2;a.push(R,R+2,R+1,R+1,R+2,R+3)}});const o=new mt;o.setAttribute("position",new Ve(s,3)),o.setAttribute("uv",new Ve(r,2)),o.setIndex(a),o.computeVertexNormals();const c=Sl(1);c.repeat.set(1,1);const l=e.water.clone();l.normalMap=c,l.normalScale=new ue(.6,.6),l.color=new Te(4028040),l.roughness=.3,l.clearcoat=.3,l.envMapIntensity=.45,l.opacity=.8;const h=new et(o,l);return h.receiveShadow=!0,i.add(h),{mesh:h,wn:c}}const je=ts.y,Ne=je+1.8,it=Ne+4.5,Ze=it+3.6,Se=-7,uu=(i,e,t,n)=>{let s=1/0;for(let r=i;r<=e;r+=4)for(let a=t;a<=n;a+=4)s=Math.min(s,pe(r,a));return s};function Go(i,e,t,n,s,r=.42,a=!0){i.box("temple",e,t,r*3,r*3,n,n+.45,0,{solid:!1}),i.cyl("marble",e,t,r,n+.45,n+s-1,{r1:r*.9,seg:10}),i.cyl(a?"gold":"temple",e,t,r*.9,n+s-1,n+s-.3,{r1:r*1.55,seg:10,solid:!1}),i.box("temple",e,t,r*3.4,r*3.4,n+s-.3,n+s,0,{solid:!1})}function du(i,e,t,n,s,r){i.box("bronze",e,t,.12,2.6,n,n+s,r,{solid:!1});const a=Math.cos(r),o=Math.sin(r);for(const c of[-.075,.075])for(let l=0;l<4;l++)for(const h of[-.6,.6])i.box("gold",e+o*h+a*c,t+a*h-o*c,.05,.9,n+.5+l*(s-.8)/4,n+.5+l*(s-.8)/4+(s-1.4)/4,r,{solid:!1})}function Pn(i,e,t,n,s,r,a=.6){const o=Math.hypot(n-e,s-t),c=Math.max(1,Math.floor(o/a));for(let l=0;l<=c;l++){const h=l/c,d=new ks(.05,.55,5);d.translate(e+(n-e)*h,r+.27,t+(s-t)*h),i.geom("gold",d)}}function yi(i,e,t,n,s,r,a,o,c,l=[],h=7){const d=[s,...l.flat(),r];for(let u=0;u<d.length-1;u++){const f=d[u],p=d[u+1],g=u%2===0?o:o+h;p-f<=.01||g>=c||(t==="x"?i.box(e,(f+p)/2,n,p-f,a,g,c):i.box(e,n,(f+p)/2,a,p-f,g,c))}}function Xv(i,e){const{x0:t,x1:n,z0:s,z1:r}=ts,a=(t+n)/2,o=(s+r)/2,c=n-t,l=r-s,h=uu(t,n,s,r)-3;i.box("ashlar",a,o,c,l,h,je),i.box("paving",a,o,c-.2,l-.2,je-.05,je+.03,0,{solid:!1});for(const[B,Z,F,ae]of[[a,s,c+.6,.6],[a,r,c+.6,.6],[t,o,.6,l+.6],[n,o,.6,l+.6]])i.box("ashlar",B,Z,F,ae,je-1.2,je-.6,0,{solid:!1});const d=10,u=12,f=1.6,p=je+d,_=[[a-6,a+6]],g=[[24,34]];yi(i,"ashlar","x",s+f/2,t,n,f,je,p+1.2,[],7),yi(i,"ashlar","x",r-f/2,t,n,f,je,p+6.2,_,8),yi(i,"ashlar","z",t+f/2,s,r,f,je,p+1.2,g,7),yi(i,"ashlar","z",n-f/2,s,r,f,je,p+1.2,[],7);for(let B=t+2;B<n-1;B+=3.6)i.box("ashlar",B,s-.2,1.1,.4,je-9,p+1.2,0,{solid:!1}),Math.abs(B-a)>7&&i.box("ashlar",B,r+.2,1.1,.4,je-9,p+6.2,0,{solid:!1});for(let B=s+2;B<r-1;B+=3.6)i.box("ashlar",n+.2,B,.4,1.1,je-9,p+1.2,0,{solid:!1}),(B<22||B>36)&&i.box("ashlar",t-.2,B,.4,1.1,je-9,p+1.2,0,{solid:!1});const m=4,v=(B,Z,F,ae,ee)=>{for(const me of[u*.45,u-.8]){const Oe=Z+F*me;for(let Ee=ae;Ee<=ee;Ee+=m)B==="x"?Go(i,Ee,Oe,je,d,.42):Go(i,Oe,Ee,je,d,.42);B==="x"?i.box("temple",(ae+ee)/2,Oe,ee-ae+1.4,1.1,p-.05,p+.8,0,{solid:!1}):i.box("temple",Oe,(ae+ee)/2,1.1,ee-ae+1.4,p-.05,p+.8,0,{solid:!1})}const ce=Z+F*u/2;B==="x"?(i.box("darkWood",(ae+ee)/2,ce,ee-ae+2,u,p+.8,p+1.1,0,{solid:!1}),i.box("roof",(ae+ee)/2,ce,ee-ae+2,u+.4,p+1.1,p+1.6)):(i.box("darkWood",ce,(ae+ee)/2,u,ee-ae+2,p+.8,p+1.1,0,{solid:!1}),i.box("roof",ce,(ae+ee)/2,u+.4,ee-ae+2,p+1.1,p+1.6))};v("x",s+f,1,t+14,n-14),v("z",n-f,-1,s+14,r-24),v("z",t+f,1,s+14,r-24);{const B=[r-f-3,r-f-8,r-f-14,r-f-19.5],Z=[d,d+5,d+5,d];B.forEach((F,ae)=>{for(let ee=t+4;ee<=n-4;ee+=m)Go(i,ee,F,je,Z[ae],ae===1||ae===2?.55:.45)}),i.box("darkWood",a,r-f-4.5,c-4,7,p-.2,p+.2,0,{solid:!1}),i.box("roof",a,r-f-2.6,c-2,6.4,p+.2,p+.8),i.box("roof",a,r-f-17,c-2,6.6,p+.2,p+.8);for(const F of[r-f-6.4,r-f-15.6]){i.box("temple",a,F,c-6,.9,p+5,p+9);for(let ae=t+6;ae<n-6;ae+=4)i.box("void",ae,F,1.4,1,p+6,p+8.2,0,{solid:!1})}i.box("darkWood",a,r-f-11,c-6,10,p+8.8,p+9.1,0,{solid:!1}),i.box("roof",a,r-f-11,c-5,10.6,p+9.1,p+9.8),Pn(i,t+3,r-f-6,n-3,r-f-6,p+9.8,2.2)}for(const[B,Z]of[[t+7,s+7],[n-7,s+7]])i.box("roof",B,Z,14,14,p+1.1,p+1.6);const x={x0:0,x1:74,z0:-34,z1:20},b=x.x0-4,E=x.x1+4,S=x.z0-4,A=x.z1+4,R=(B,Z,F,ae)=>{const ee=Math.hypot(F-B,ae-Z),ce=Math.floor(ee/1.4);for(let Oe=0;Oe<=ce;Oe++){const Ee=Oe/ce;i.box("temple",B+(F-B)*Ee,Z+(ae-Z)*Ee,.25,.25,je,je+1.3,0,{solid:!1})}const me=Math.atan2(F-B,ae-Z);i.box("temple",(B+F)/2,(Z+ae)/2,.3,ee,je+1.15,je+1.4,me),i.box("temple",(B+F)/2,(Z+ae)/2,.3,ee,je+.1,je+.3,me,{solid:!1})};R(b,S,50,S),R(62,S,E,S),R(b,A,50,A),R(62,A,E,A),R(E,S,E,Se-9),R(E,Se+9,E,A),R(b,S,b,A),i.box("paving",(x.x0+x.x1)/2,(x.z0+x.z1)/2,x.x1-x.x0,x.z1-x.z0,je-.5,Ne),i.stairs("paving",x.x1+1.5,Se,16,3,je,Ne,-Math.PI/2),i.stairs("paving",56,x.z0-1.5,8,3,je,Ne,0),i.stairs("paving",56,x.z1+1.5,8,3,je,Ne,Math.PI);const M={x0:4,x1:70,z0:-30,z1:16},y=12,P=2,U=[[54,59]],T=[[54,59]];yi(i,"temple","x",M.z0+P/2,M.x0,M.x1,P,Ne,Ne+y,U,8),yi(i,"temple","x",M.z1-P/2,M.x0,M.x1,P,Ne,Ne+y,T,8),yi(i,"temple","z",M.x1-P/2,M.z0,M.z1,P,Ne,Ne+y,[[Se-3,Se+3]],9),i.box("temple",M.x0+P/2,(M.z0+M.z1)/2,P,M.z1-M.z0,Ne,Ne+y);const w=(B,Z,F,ae)=>{i.box("temple",B,Z,F,ae,Ne+9,Ne+y+4),i.box("gold",B,Z,F+.3,ae+.3,Ne+y+4,Ne+y+4.5,0,{solid:!1}),Pn(i,B-F/2,Z-ae/2,B+F/2,Z-ae/2,Ne+y+4.5,1),Pn(i,B-F/2,Z+ae/2,B+F/2,Z+ae/2,Ne+y+4.5,1)};w(M.x1-1,Se,4,10),w(56.5,M.z0+1,9,4),w(56.5,M.z1-1,9,4);for(const B of[18,32])for(const Z of[M.z0+1,M.z1-1])w(B,Z,7,4);for(const B of[-1,1])du(i,M.x1-P-.12,Se+B*4.3,Ne,8.4,B*.1);i.box("gold",(M.x0+M.x1)/2,M.z0-.15,M.x1-M.x0,.4,Ne+y-.6,Ne+y-.2,0,{solid:!1}),i.box("gold",(M.x0+M.x1)/2,M.z1+.15,M.x1-M.x0,.4,Ne+y-.6,Ne+y-.2,0,{solid:!1}),i.box("gold",M.x1+.15,(M.z0+M.z1)/2,.4,M.z1-M.z0,Ne+y-.6,Ne+y-.2,0,{solid:!1});const L=52;for(const[B,Z]of[[M.x1-5,M.z0+5],[M.x1-5,M.z1-5],[L+5,M.z0+5],[L+5,M.z1-5]])i.box("temple",B,Z,7,7,Ne,Ne+6.5),i.box("void",B+(B>60?-3.55:3.55),Z,.2,1.6,Ne,Ne+2.6,0,{solid:!1});for(const[B,Z]of[[L+6,Se-9],[L+6,Se+9],[M.x1-8,Se-9],[M.x1-8,Se+9]]){i.box("temple",B,Z,1.4,1.4,Ne,Ne+.6),i.cyl("gold",B,Z,.16,Ne+.6,Ne+11,{seg:8});for(const[F,ae]of[[.8,0],[-.8,0],[0,.8],[0,-.8]])i.box("gold",B+F/2,Z+ae/2,Math.abs(F)+.12,Math.abs(ae)+.12,Ne+10.4,Ne+10.55,0,{solid:!1}),i.cyl("gold",B+F,Z+ae,.18,Ne+10.55,Ne+10.95,{r1:.38,seg:8,solid:!1}),e.flames.push([B+F,Ne+11.25,Z+ae,.45])}for(let B=Se-13;B<=Se+13;B+=2.2)if(Math.abs(B-Se)>4)for(const Z of[M.x1-P-.7])i.cyl("bronze",Z,B,.35,Ne,Ne+.9,{r1:.18,seg:8,solid:!1});yi(i,"temple","z",L,M.z0+P,M.z1-P,2,Ne,Ne+y,[[Se-3,Se+3]],4.5+7.5),i.box("temple",L,Se,3,12,Ne+4.5+7.5,Ne+y+5),i.box("gold",L+1.7,Se,.3,12.4,Ne+y+4.4,Ne+y+5,0,{solid:!1}),Pn(i,L+1.5,Se-6,L+1.5,Se+6,Ne+y+5,.8);for(const B of[-1,1])du(i,L-1.15,Se+B*4.3,it,7.2,B*.1);for(let B=0;B<15;B++){const Z=9-B*.38,F=Ne+.3*(B+1),ae=new Rn(Z,Z,F-Ne+.5,28,1,!1,0,Math.PI),ee=ae.attributes.uv;for(let ce=0;ce<ee.count;ce++)ee.setXY(ce,ee.getX(ce)*Z*3.1/3,ee.getY(ce));ae.translate(L,(Ne-.5+F)/2,Se),i.geom("paving",ae),i.solids.add({x:L+Z*.35,z:Se,hx:Z*.35,hz:Z*.92,rot:0,y0:Ne-.5,y1:F}),i.solids.add({x:L+Z*.8,z:Se,hx:Z*.15,hz:Z*.55,rot:0,y0:Ne-.5,y1:F})}i.box("paving",(M.x0+L)/2+1,Se+0,L-M.x0-P,M.z1-M.z0-P*2,Ne-.2,it);for(const[B,Z]of[[M.z0+P,Se-2.5],[Se+2.5,M.z1-P]])i.box("temple",47,(B+Z)/2,.4,Z-B,it,it+1);for(const B of[M.z0+P+3,M.z1-P-3])for(const Z of[10,18,26])i.box("plasterWarm",Z+2,B,7,5.5,it,it+7),i.box("void",Z+2,B+(B<0?2.8:-2.8),1.4,.1,it,it+2.4,0,{solid:!1});const O=42,V=it+4.2;i.box("rock",O,Se,9,9,it,it+1.6),i.box("rock",O,Se,8,8,it+1.6,V),i.box("stoneDark",O,Se,6,6,V,V+.25,0,{solid:!1});for(const[B,Z]of[[-3.6,-3.6],[3.6,-3.6],[-3.6,3.6],[3.6,3.6]])i.box("rock",O+B,Se+Z,.8,.8,V,V+.9);i.solids.add({x:O,z:Se+4.5+7,hx:1.7,hz:7,rot:0,y0:it-.3,y1:V,rampAxis:"z",rampA:V,rampB:it});{const B=new Bn(3.4,1,14),Z=B.attributes.position;for(let ae=0;ae<Z.count;ae++){const ee=Z.getZ(ae),ce=Z.getY(ae),me=(ee+7)/14;Z.setY(ae,ce>0?V-(V-it)*me-it:-.3)}B.computeVertexNormals();const F=B.attributes.uv;for(let ae=0;ae<F.count;ae++)F.setXY(ae,F.getX(ae)*2,F.getY(ae)*2);B.translate(O,it,Se+4.5+7),i.geom("rock",B)}e.flames.push([O-1.2,V+.6,Se,1.4],[O+1.2,V+.5,Se+.8,1.1],[O+.3,V+.6,Se-1.1,1.2]),e.smoke.push([O,V+1.5,Se]),e.lights.push([O,V+2.5,Se,16742954,26]),i.cyl("bronze",38,Se+9,1.2,it,it+1.1,{r1:.8,seg:16}),i.cyl("bronze",38,Se+9,.8,it+1.1,it+2,{r1:1.7,seg:16,solid:!1});for(let B=0;B<4;B++)for(let Z=0;Z<2;Z++){const F=38+B*2.6,ae=M.z0+P+4+Z*3;i.cyl("temple",F,ae,.22,it,it+3,{seg:8}),i.box("darkWood",F,ae,.25,3.2,it+2.8,it+3.1,0,{solid:!1})}for(let B=0;B<6;B++)i.box("bronze",38+B*1.6,M.z0+P+10,.5,.5,it,it+.12,0,{solid:!1});const N=32,q=8,W=26,ne=Se-15,oe=Se+15,Me=Se-10,J=Se+10,$=Ze+28,ge=Ze+22;i.box("marble",(4+N)/2,Se,N-4,30,it-.2,Ze),i.stairs("marble",N+1.8,Se,20,3.6,it,Ze,-Math.PI/2),i.box("marble",(q+W)/2,Se,W-q,J-Me,Ze,ge);for(const B of[-1,1]){i.box("marble",(q+W)/2,Se+B*(10+2.5),W-q,5,Ze,Ze+15);for(let Z=0;Z<3;Z++)for(let F=q+2;F<W-1;F+=3.2)i.box("void",F,Se+B*15.05,.7,.1,Ze+2.5+Z*4.6,Ze+4+Z*4.6,0,{solid:!1});i.box("gold",(q+W)/2,Se+B*15.1,W-q,.3,Ze+14.6,Ze+15.2,0,{solid:!1})}i.box("marble",q-2,Se,4,30,Ze,Ze+15);for(const B of[-1,1])for(let Z=q+3;Z<W-2;Z+=4)i.box("void",Z,Se+B*10.05,.9,.1,Ze+17,Ze+19.5,0,{solid:!1});i.box("gold",(q+W)/2,Se,W-q+.8,J-Me+.8,ge-1.2,ge,0,{solid:!1}),Pn(i,q,Me,W,Me,ge),Pn(i,q,J,W,J,ge),Pn(i,q,Me,q,J,ge);const de=Se-4.5,Le=Se+4.5,Fe=Ze+18;i.box("marble",(W+N)/2,(ne+de)/2,N-W,de-ne,Ze,$),i.box("marble",(W+N)/2,(Le+oe)/2,N-W,oe-Le,Ze,$),i.box("marble",(W+N)/2,Se,N-W,Le-de,Fe,$);for(let B=de+.6;B<Le;B+=1.6)i.box("gold",(W+N)/2,B,N-W,.3,Fe-.5,Fe,0,{solid:!1});i.box("gold",W+.1,Se,.25,8,Ze,Ze+12,0,{solid:!1}),i.box("void",W+.25,Se,.1,5.6,Ze,Ze+10.5,0,{solid:!1});for(const B of[-1,1])i.box("gold",W+1.4,Se+B*3.7,2.6,.18,Ze,Ze+10.5,B*.6,{solid:!1});for(const B of[-1,1])i.box("veil",W+.42+.12*(B+1),Se+B*1.55,.06,2.55,Ze,Ze+10.3,B*.1,{uv:[B<0?0:.5,0,.5,1],solid:!1});i.solids.add({x:W+.5,z:Se,hx:.3,hz:2.8,rot:0,y0:Ze,y1:Ze+10.3}),e.veil=[W+1.2,Ze,Se];{const B=[];for(let Z=0;Z<=40;Z++){const F=Z/40;B.push(new z(W+.35,Ze+12.6+Math.sin(F*Math.PI*5)*.45,Se-6+12*F))}i.geom("gold",new hl(new bd(B),80,.09,5));for(let Z=0;Z<46;Z++){const F=Z/46,ae=Se-6+12*F,ee=Ze+12.6+Math.sin(F*Math.PI*5)*.45+(Z%2?.45:-.45),ce=new Wa(.32,5);if(ce.rotateY(Math.PI/2),ce.rotateX(Z*1.7%1.2-.6),ce.translate(W+.45,ee,ae),i.geom("gold",ce),Z%4===0)for(let me=0;me<7;me++){const Oe=new Hs(.11,6,4);Oe.translate(W+.5,ee-.35-me%3*.16,ae+(me*.37%.4-.2)),i.geom("gold",Oe)}}}for(const B of[ne+.8,ne+5.5,de-1.4,Le+1.4,oe-5.5,oe-.8])i.box("marble",N+.25,B,.5,1.4,Ze,$-3.2,0,{solid:!1}),i.box("gold",N+.35,B,.7,1.8,$-3.2,$-2.2,0,{solid:!1});for(const B of[Ze+9,Fe+.2])i.box("gold",N+.2,Se,.4,30.2,B,B+.35,0,{solid:!1});i.box("gold",N+.3,Se,.6,30.6,$-2.2,$-.6,0,{solid:!1}),i.box("gold",(W+N)/2,ne-.25,N-W+.6,.5,$-2.2,$-.6,0,{solid:!1}),i.box("gold",(W+N)/2,oe+.25,N-W+.6,.5,$-2.2,$-.6,0,{solid:!1}),i.box("gold",N+.2,de-.3,.4,.6,Ze,Fe+.6,0,{solid:!1}),i.box("gold",N+.2,Le+.3,.4,.6,Ze,Fe+.6,0,{solid:!1}),i.box("marble",(W+N)/2,Se,N-W+.4,30.4,$-.6,$+.9,0,{solid:!1}),Pn(i,N+.1,ne,N+.1,oe,$+.9,.75),Pn(i,W,ne,N,ne,$+.9,.75),Pn(i,W,oe,N,oe,$+.9,.75);for(const B of[de-3,Le+3]){const Z=new Qi(.8,.12,6,18);Z.rotateY(Math.PI/2),Z.translate(N+.55,Fe-3,B),i.geom("gold",Z)}const Ge=pe(a,r+14);i.stairs("walls",a,r+7,12,14,Ge,je,Math.PI);for(const B of[-1,1])i.box("ashlar",a+B*6.8,r+7,1.6,14,Ge-1,je+1.1);const j=pe(t-7,54);i.stairs("walls",t-6,44,7,20,j,je,Math.PI),i.box("ashlar",t-6,29,8,10,j-4,je);for(let B=0;B<3;B++)i.box("ashlar",t-6,54-B*7,7.6,1.4,j-4,j+2+B*1.5,0,{solid:!1});i.box("ashlar",t-9.6,37,.8,34,j,je+1.1);{const B=yl,Z=(B.x0+B.x1)/2,F=(B.z0+B.z1)/2,ae=uu(B.x0,B.x1,B.z0,B.z1)-2,ee=je+13;i.box("walls",Z,F,B.x1-B.x0,B.z1-B.z0,ae,ee),i.box("stoneDark",Z,F,B.x1-B.x0+.6,B.z1-B.z0+.6,ee-.6,ee,0,{solid:!1});const ce=[[B.x0+3.5,B.z0+3.5,10],[B.x1-3.5,B.z0+3.5,10],[B.x0+3.5,B.z1-3.5,10],[B.x1-3.5,B.z1-3.5,16]];for(const[me,Oe,Ee]of ce){i.box("walls",me,Oe,7,7,ae,ee+Ee);for(let D=0;D<4;D++)for(let C=-1;C<=1;C++){const X=D<2?D?3.3:-3.3:C*2.2,ie=D<2?C*2.2:D===2?3.3:-3.3;i.box("walls",me+X,Oe+ie,1.1,1.1,ee+Ee,ee+Ee+1.2,0,{solid:!1})}for(let D=0;D<3;D++)i.box("void",me+3.55,Oe,.1,.6,ee-6+D*5,ee-4.5+D*5,0,{solid:!1})}for(let me=B.x0+8;me<B.x1-7;me+=2)for(const Oe of[B.z0+.3,B.z1-.3])i.box("walls",me,Oe,1,.6,ee,ee+1.1,0,{solid:!1});i.stairs("walls",B.x1-9,B.z1+4.5,5,9,je,je+6,Math.PI),i.box("void",B.x1-9,B.z1+.05,3,.1,je+6,je+9,0,{solid:!1}),i.box("walls",B.x1-9,B.z1+.9,5,1.8,je,je+6)}return{ZC:Se,levels:{Y0:je,CHEL:Ne,ISRAEL:it,PORCH:Ze}}}let fu=4242;const ot=()=>(fu=fu*16807%2147483647)/2147483647,jv=i=>i[Math.floor(ot()*i.length)],Ma=10,la=3.2,Hd=(i,e,t,n,s)=>{const r=Math.cos(s),a=Math.sin(s);let o=1/0,c=-1/0;for(const[l,h]of[[-1,-1],[1,-1],[-1,1],[1,1],[0,0]]){const d=l*t/2,u=h*n/2,f=pe(i+r*d+a*u,e-a*d+r*u);o=Math.min(o,f),c=Math.max(c,f)}return[o,c]},xt=(i,e,t,n,s)=>[i+Math.cos(t)*n+Math.sin(t)*s,e-Math.sin(t)*n+Math.cos(t)*s];function qv(i,e){const t=Fv.map(n=>{const[s,r]=Xt[n.seg],[a,o]=Xt[(n.seg+1)%Xt.length];return{...n,x:s+(a-s)*n.t,z:r+(o-r)*n.t}});e.gates=t;for(let n=0;n<Xt.length;n++){let m=function(x,b){const E=s+l*(x+b)/2,S=r+h*(x+b)/2,A=b-x+.05,R=Math.min(pe(s+l*x,r+h*x),pe(s+l*b,r+h*b),pe(E,S)),y=Math.max(pe(s+l*x,r+h*x),pe(s+l*b,r+h*b),pe(E,S))+Ma;i.box("walls",E,S,A,la,R-3,y,d),i.box("stoneDark",E+u*1.9,S+f*1.9,A,.8,R-3,R+1.8,d,{solid:!1}),i.box("walls",E+u*1.75,S+f*1.75,A,.5,y-.8,y-.3,d,{solid:!1});const P=Math.floor(A/2);for(let U=0;U<P;U++){const T=x+(U+.5)*(A/P);i.box("walls",s+l*T+u*1.3,r+h*T+f*1.3,1.1,.6,y,y+1.3,d)}i.box("walls",E-u*1.45,S-f*1.45,A,.3,y,y+.5,d,{solid:!1})};if(Nd.has(n))continue;const[s,r]=Xt[n],[a,o]=Xt[(n+1)%Xt.length],c=Math.hypot(a-s,o-r),l=(a-s)/c,h=(o-r)/c,d=Math.atan2(l,h)+Math.PI/2;let u=h,f=-l;Da((s+a)/2+u*6,(r+o)/2+f*6,Xt)&&(u=-u,f=-f);const p=t.find(x=>x.seg===n),_=p?p.t*c:-99,g=Math.ceil(c/9);for(let x=0;x<g;x++){const b=x/g*c,E=(x+1)/g*c;if(p&&E>_-3&&b<_+3){for(const[S,A]of[[b,_-3],[_+3,E]])A-S>.2&&m(S,A);continue}m(b,E)}const v=Math.max(1,Math.round(c/36));for(let x=0;x<=v;x++){const b=x/v*c;p&&Math.abs(b-_)<9||pu(i,s+l*b+u*1.5,r+h*b+f*1.5,d,8,5.5)}if(p){for(const U of[-1,1])pu(i,p.x+l*U*6.5+u*2,p.z+h*U*6.5+f*2,d,7,7);const x=pe(p.x,p.z),b=x+Ma+1;i.box("walls",p.x,p.z,6.2,la+.4,x+6.2,b,d);const E=new Qi(3.05,.35,6,16,Math.PI);E.rotateY(d+Math.PI/2),E.translate(p.x+u*1.9,x+3.6,p.z+f*1.9),i.geom("stoneDark",E);for(const U of[-1,1])i.box("darkWood",p.x+l*U*2.6-u*.5,p.z+h*U*2.6-f*.5,.2,1.4,x,x+5.8,d+U*1.2,{solid:!1});const S=p.x+l*13-u*(la/2+1.4),A=p.z+h*13-f*(la/2+1.4),R=pe(S,A),M=x+Ma-R,y=M/.3*.42,P=Math.atan2(l,h);i.stairs("walls",S+l*y/2,A+h*y/2,2.6,y,R,R+M,P)}}}function pu(i,e,t,n,s,r){const[a,o]=Hd(e,t,s,s,n),c=o+Ma+r;i.box("walls",e,t,s,s,a-3,c,n),i.box("stoneDark",e,t,s+.5,s+.5,c-1.4,c-.9,n,{solid:!1});for(let l=0;l<4;l++)for(let h=-1;h<=1;h++){const d=l<2?(l?1:-1)*(s/2-.4):h*s/3.2,u=l<2?h*s/3.2:(l===2?1:-1)*(s/2-.4),[f,p]=xt(e,t,n,d,u);i.box("walls",f,p,1.1,1.1,c,c+1.3,n,{solid:!1})}for(let l=1;l<=2;l++)for(const h of[-1,1]){const[d,u]=xt(e,t,n,h*(s/2+.02),0);i.box("void",d,u,.1,.5,o+l*4.5,o+l*4.5+1.4,n,{solid:!1})}}function Yv(i,e){for(const[a,o,c,l,h]of[[-142,-14,9,26,"Hípico"],[-133,-30,11,32,"Fasael"],[-121,-44,8,23,"Mariamne"]]){const d=pe(a,o);i.box("ashlar",a,o,c,c,d-2,d+l*.55),i.box("walls",a,o,c-1.2,c-1.2,d+l*.55,d+l),i.box("stoneDark",a,o,c+.3,c+.3,d+l*.55-.3,d+l*.55+.4,0,{solid:!1});for(let u=0;u<3;u++)for(const[f,p]of[[0,c/2-.58],[0,-c/2+.58],[c/2-.58,0],[-c/2+.58,0]])i.box(u===1&&h==="Fasael"?"lit":"void",a+f*1.01,o+p*1.01,f?.1:1,p?.1:1,d+l*.6+u*3.5,d+l*.6+u*3.5+1.6,0,{solid:!1});for(let u=-2;u<=2;u++)for(const[f,p]of[[u,1],[u,-1],[1,u],[-1,u]])i.box("walls",a+f*(f===1||f===-1?(c-1.2)/2-.3:(c-1.2)/5.5),o+p*(p===1||p===-1?(c-1.2)/2-.3:(c-1.2)/5.5),.9,.9,d+l,d+l+1.2,0,{solid:!1})}const t=Ud,n=Math.min(pe(t.x0,t.z0),pe(t.x1,t.z1),pe(t.x0,t.z1),pe(t.x1,t.z0))-1,s=n+12;i.box("plaster",(t.x0+t.x1)/2,t.z0+5,t.x1-t.x0,10,n,s),i.box("plaster",(t.x0+t.x1)/2,t.z1-5,t.x1-t.x0,10,n,s),i.box("plaster",t.x0+4,(t.z0+t.z1)/2,8,t.z1-t.z0-20,n,s);for(const[a,o]of[[t.z0+10,33],[40,t.z1-10]])i.box("walls",t.x1-.8,(a+o)/2,1.6,o-a,n,n+6);i.box("roof",(t.x0+t.x1)/2,t.z0+5,t.x1-t.x0+.6,10.6,s,s+.4),i.box("roof",(t.x0+t.x1)/2,t.z1-5,t.x1-t.x0+.6,10.6,s,s+.4),i.box("roof",t.x0+4,(t.z0+t.z1)/2,8.6,t.z1-t.z0-20,s,s+.4);for(const a of[t.z0+.05,t.z1-.05,t.z0+10.05,t.z1-10.05])for(let o=t.x0+3;o<t.x1-2;o+=3.5)i.box(ot()<.2?"lit":"void",o,a,1,.12,n+7.5,n+9.5,0,{solid:!1});const r=n+.3;i.box("paving",(t.x0+t.x1)/2+4,(t.z0+t.z1)/2,t.x1-t.x0-8,t.z1-t.z0-20,n-1,r);for(let a=t.x0+11;a<t.x1-2;a+=3.4)for(const o of[t.z0+12,t.z1-12])i.box("marble",a,o,.9,.9,r,r+.4,0,{solid:!1}),i.cyl("marble",a,o,.3,r+.4,r+5.6,{seg:8}),i.box("gold",a,o,.8,.8,r+5.6,r+6,0,{solid:!1});i.box("roof",(t.x0+t.x1)/2+4,t.z0+11.6,t.x1-t.x0-8,3.6,r+6,r+6.4,0,{solid:!1}),i.box("roof",(t.x0+t.x1)/2+4,t.z1-11.6,t.x1-t.x0-8,3.6,r+6,r+6.4,0,{solid:!1});for(const a of[(t.z0+t.z1)/2-5,(t.z0+t.z1)/2+5])i.box("marble",-116,a,14,5,r,r+.5),e.pools.push([-116,a,12.6,3.6,r+.38]);e.palaceGarden={x0:t.x0+10,x1:t.x1-3,z0:t.z0+14,z1:t.z1-14}}function Kv(i,e){const{x:t,z:n,w:s,d:r}=yr,a=pe(t,n),o=a+1.2;for(let c=0;c<3;c++)i.box("walls",t,n,s+6-c*1,r+6-c*1,a-1,a+.4*(c+1));i.box("walls",t,n,s+3,r+3,a-1,o),i.box("paving",t,n,s,r,a-1.5,a+.25);for(let c=0;c<2;c++)i.box("paving",t,n,s+2-c*1,r+2-c*1,a-1,a+.25+(2-c)*.3,0,{solid:!1});e.pools.push([t,n,s+2.6,r+2.6,a+.85]);for(let c=0;c<=6;c++)for(const l of[-1,1]){const h=t-s/2-2+(s+4)*(c/6);i.cyl("marble",h,n+l*(r/2+4),.3,a,a+4.6,{seg:8})}for(const c of[-1,1])i.box("roof",t,n+c*(r/2+4),s+6,2.2,a+4.6,a+5.1,0,{solid:!1})}function mu(i,e,t,n,s,r,a,o,c){const[l,h]=Hd(e,t,n,s,a),d=l-1.5,u=h+r*3.1+.4;i.box(o,e,t,n,s,d,u,a),i.box("roof",e,t,n+.3,s+.3,u,u+.28,a);const f=.22,p=.75;for(const[b,E,S,A]of[[0,s/2-f/2,n,f],[0,-s/2+f/2,n,f],[n/2-f/2,0,f,s],[-n/2+f/2,0,f,s]]){const[R,M]=xt(e,t,a,b,E);i.box(o,R,M,S,A,u+.28,u+.28+p,a,{solid:!1})}const _=(ot()-.5)*(n-2.4);let[g,m]=xt(e,t,a,_,s/2+.03);const v=pe(g,m);i.box("void",g,m,1.15,.08,v-.2,v+2.15,a,{solid:!1}),[g,m]=xt(e,t,a,_,s/2+.1),i.box("darkWood",g,m,1.6,.22,v+2.15,v+2.4,a,{solid:!1});const x=1+Math.floor(ot()*3);for(let b=0;b<x;b++){const E=Math.floor(ot()*4),S=Math.min(r,1+Math.floor(ot()*r)),A=h+S*3.1-1.6;if(A+.8>u)continue;const R=ot()<.12?"lit":"void",M=(ot()-.5)*.6,[y,P,U,T]=E===0?[M*n,s/2+.03,.55,.08]:E===1?[M*n,-s/2-.03,.55,.08]:E===2?[n/2+.03,M*s,.08,.55]:[-n/2-.03,M*s,.08,.55],[w,L]=xt(e,t,a,y,P);i.box(R,w,L,U,T,A,A+.8,a,{solid:!1})}if(ot()<.3&&r<=2){const b=ot()<.5?1:-1,E=Math.min(s-.6,(u-l)/.3*.33),[S,A]=xt(e,t,a,b*(n/2+.65),0);i.stairs(o,S,A,1.2,E,l,u+.28,a+Math.PI)}if(ot()<.22){const b=Math.min(3.4,n-1),E=Math.min(3,s-1);for(const[S,A]of[[-1,-1],[1,-1],[-1,1],[1,1]]){const[R,M]=xt(e,t,a,S*b/2+n/4-.3,A*E/2);i.box("darkWood",R,M,.16,.16,u+.28,u+2.5,a,{solid:!1})}for(let S=-2;S<=2;S++){const[A,R]=xt(e,t,a,n/4-.3+S*b/5,0);i.box("darkWood",A,R,.12,E+.6,u+2.4,u+2.55,a,{solid:!1})}if(ot()<.6){const[S,A]=xt(e,t,a,n/4-.3,0);i.box("awning",S,A,b,E,u+2.55,u+2.6,a,{solid:!1,uv:[Math.floor(ot()*4)/4,0,.25,1]})}}if(ot()<.25)for(let b=0;b<3;b++){const[E,S]=xt(e,t,a,-n/2+.8+b*.7,-s/2+.8);i.cyl("clay",E,S,.28,u+.28,u+1.05,{r1:.18,seg:8,solid:!1})}if(ot()<.18){const[b,E]=xt(e,t,a,_,s/2+.9),S=new Gn(2.6,1.8);S.rotateX(-Math.PI/2+.35),S.rotateY(a);const A=S.attributes.uv,R=Math.floor(ot()*4)/4;for(let M=0;M<A.count;M++)A.setXY(M,R+A.getX(M)*.25,A.getY(M));S.translate(b,v+2.7,E),i.geom("awning",S)}if(ot()<.12){const[b,E]=xt(e,t,a,n/2-.8,-s/2+.8);c.smoke.push([b,u+.8,E])}}function Jv(i,e){const n=[];for(let o=0;o<Xt.length;o++)Nd.has(o)||n.push([...Xt[o],...Xt[(o+1)%Xt.length]]);const s=(o,c)=>Math.min(...n.map(([l,h,d,u])=>Od(o,c,l,h,d,u))),r=[(o,c)=>As(o,c,ts,9),(o,c)=>As(o,c,yl,7),(o,c)=>As(o,c,Ud,6),(o,c)=>Math.hypot(o-yr.x,c-yr.z)<18,(o,c)=>o>-36&&o<-14&&c>16&&c<60,(o,c)=>o<-112&&c<-4&&c>-54];let a=0;for(let o=-150;o<92;o+=8.2)for(let c=-80;c<142;c+=8.2){const l=o+(ot()-.5)*3,h=c+(ot()-.5)*3;if(!Da(l,h,Xt)||r.some(E=>E(l,h)))continue;const d=5.2+ot()*3.2,u=5+ot()*3,f=Math.max(d,u)/2;if(rn(l,h,va)<f+.6||s(l,h)<f+3.6)continue;let p=1/0,_=l,g=h+1;for(const E of va)for(let S=0;S<E.pts.length-1;S++){const[A,R]=E.pts[S],[M,y]=E.pts[S+1],P=M-A,U=y-R,T=P*P+U*U,w=Math.max(0,Math.min(1,((l-A)*P+(h-R)*U)/T)),L=A+P*w,O=R+U*w,V=Math.hypot(l-L,h-O);V<p&&(p=V,_=L,g=O)}const m=Math.atan2(_-l,g-h),v=p<28?m+(ot()-.5)*.08:Math.floor(ot()*4)*Math.PI/2,x=ot()<.55?1:ot()<.8?2:3,b=ot()<.55?"plaster":ot()<.75?"plasterWarm":"walls";if(mu(i,l,h,d,u,x,v,b,e),ot()<.25){const[E,S]=xt(l,h,v,d/2+1.6,-u/4);rn(E,S,va)>3&&Da(E,S,Xt)&&mu(i,E,S,3.2,u/2,1,v,b,e)}a++}return a}function Zv(i){for(let e=-66;e<-38;e+=4.2)for(const t of[-1,1]){if(ot()<.25)continue;const n=1+t*4.6,s=pe(e,n);i.box("darkWood",e,n,3,1.2,s,s+.9,0,{solid:!0});for(const[c,l]of[[-1.4,-.6],[1.4,-.6],[-1.4,.6],[1.4,.6]])i.box("darkWood",e+c,n+l*t,.1,.1,s,s+2.4,0,{solid:!1});const r=new Gn(3.4,2);r.rotateX(-Math.PI/2+t*.25);const a=r.attributes.uv,o=Math.floor(ot()*4)/4;for(let c=0;c<a.count;c++)a.setXY(c,o+a.getX(c)*.25,a.getY(c));r.translate(e,s+2.5,n),i.geom("awning",r);for(let c=0;c<4;c++)i.cyl(jv(["clay","darkWood"]),e-1+c*.65,n,.22,s+.9,s+1.2,{r1:.28,seg:8,solid:!1})}}function Qv(i,e){return qv(i,e),Yv(i,e),Kv(i,e),Zv(i),Jv(i,e)}let gu=99;const _t=()=>(gu=gu*16807%2147483647)/2147483647;function zs(i,e,t,n,s,r=.8,a="cliff"){const o=new Xa(s,1),c=o.attributes.position;for(let h=0;h<c.count;h++){const d=c.getX(h),u=c.getY(h),f=c.getZ(h),p=.75+Ut(d*.8+e,f*.8+u+n,3)*.6;c.setXYZ(h,d*p,u*p*r,f*p)}o.computeVertexNormals();const l=o.attributes.uv;for(let h=0;h<l.count;h++)l.setXY(h,l.getX(h)*s*2,l.getY(h)*s);o.translate(e,t,n),i.geom(a,o)}function Na(i,e,t,n,s,r,a,o=[],c="cliff"){const l=new Gn(s,r,40,22),h=l.attributes.position;for(let u=0;u<h.count;u++){const f=h.getX(u),p=h.getY(u);let _=(Ut(f*.28+e,p*.3+t,4)-.5)*4.2+(Ut(f*1.2,p*1.6,3)-.5)*1.1+Math.sin(p*1.7+f*.3)*.18;const g=Math.min(1,(s/2-Math.abs(f))/3);_-=(1-g)*2.5,_-=Math.max(0,(p/(r/2))**3)*1.6;for(const m of o){const v=((f-m.x)/m.rx)**2+((p-m.y)/m.ry)**2;v<1&&(_-=m.depth*(1-v)**.7)}h.setZ(u,_)}l.computeVertexNormals();const d=l.attributes.uv;for(let u=0;u<d.count;u++)d.setXY(u,d.getX(u)*s/6,d.getY(u)*r/6);l.translate(0,a+r/2,0),l.rotateY(n),l.translate(e,0,t),i.geom(c,l)}function Vo(i,e,t,n,s=0){const r=pe(e,t);i.box("darkWood",e,t,.26,.26,r-.6,r+n,s),i.box("darkWood",e,t,2.3,.22,r+n-1.25,r+n-.98,s,{solid:!1});for(let a=0;a<4;a++)zs(i,e+Math.cos(a*1.6)*.5,r+.05,t+Math.sin(a*1.6)*.5,.32,.6,"fieldStone")}function $v(i,e){const{x:t,z:n}=Bt,s=.55,r=t+9,a=n+13.5,o=pe(r+3,a+4)-1.5;Na(i,r,a,s,26,13,o,[{x:-4.2,y:1.4,rx:2.5,ry:2.1,depth:3.6},{x:4,y:1.6,rx:2.4,ry:2.2,depth:3.6},{x:.2,y:-1.2,rx:.9,ry:1.6,depth:1.4},{x:0,y:-4.2,rx:5.5,ry:.7,depth:1.2}]);for(const[l,h]of[[-4.2,1.4],[4,1.6]]){const d=new Wa(1.15,14);d.scale(1.15,1,1),d.translate(l,o+6.5+h,-3.3),d.rotateY(s),d.translate(r,0,a);const u=d.attributes.position;let f=!0;for(let p=0;p<u.count;p++)if(pe(u.getX(p),u.getZ(p))<u.getY(p)+.3){f=!1;break}f?i.geom("void",d):d.dispose()}i.solids.add({x:r-Math.sin(s)*2,z:a-Math.cos(s)*2,hx:12.5,hz:2.5,rot:s,y0:o-2,y1:o+12});for(let l=0;l<12;l++)zs(i,r+(_t()-.5)*22,o+.3,a+2+_t()*4,.6+_t()*1.4,.7);Vo(i,t-3.4,n-1,4.4,.08),Vo(i,t,n,5.4),Vo(i,t+3.4,n+.8,4.4,-.06);const c=pe(t,n);e.golgotha={cross:[t,c+1,n],top:c,face:[r,a,s,o]},i.box("wood",t,n+.16,.9,.06,c+5.55,c+5.95,0,{solid:!1});for(let l=0;l<18;l++){const h=_t()*6.28,d=4+_t()*10;zs(i,t+Math.cos(h)*d,pe(t+Math.cos(h)*d,n+Math.sin(h)*d),n+Math.sin(h)*d,.4+_t()*.9,.6)}}function eM(i,e){const t=Ht.x,n=Ht.z+8.5,s=Hv(),r=n-7.5,a=n-1,o=s+7;i.box("cliff",t-6.5,n-5,8,10,s-2,o),i.box("cliff",t+6.5,n-5,8,10,s-2,o),i.box("cliff",t,r-1.25,5,2.5,s-2,o),i.box("cliff",t,(r+n)/2,5,n-r,s+2.4,o),i.box("cliff",t-1.625,a+.5,1.75,1,s-2,s+2.4,0,{solid:!1}),i.box("cliff",t+1.625,a+.5,1.75,1,s-2,s+2.4,0,{solid:!1}),i.box("cliff",t,a+.5,1.5,1,s+2.05,s+2.4,0,{solid:!1}),i.solids.add({x:t-1.65,z:a+.5,hx:.85,hz:.5,rot:0,y0:s-2,y1:s+2.4}),i.solids.add({x:t+1.65,z:a+.5,hx:.85,hz:.5,rot:0,y0:s-2,y1:s+2.4}),i.solids.add({x:t,z:a+.5,hx:.8,hz:.5,rot:0,y0:s+2.05,y1:s+2.4}),i.box("cliff",t,(r+a)/2,5,a-r,s-1,s+.02),i.box("cliff",t-1.75,(r+a)/2-.4,1.5,4.8,s,s+.7),i.box("cliff",t+1.4,r+.6,2.2,1.2,s,s+.7),i.box("linen",t-1.75,r+2.4,.42,1.7,s+.7,s+.78,.04,{solid:!1}),i.box("linen",t-1.7,r+1,.36,.28,s+.7,s+.86,-.2,{solid:!1}),i.box("stoneDark",t-1.2,n+.35,7.5,.7,s-.3,s+.12,0,{solid:!1});{const u=new Rn(1.15,1.15,.45,22);u.rotateX(Math.PI/2);const f=u.attributes.uv;for(let p=0;p<f.count;p++)f.setXY(p,f.getX(p)*1.2,f.getY(p)*1.2);u.translate(t-3.6,s+1.15,n+.35),i.geom("cliff",u),i.solids.add({x:t-3.6,z:n+.35,hx:1.1,hz:.3,rot:0,y0:s,y1:s+2.3})}for(let u=0;u<16;u++)zs(i,t+(_t()-.5)*20,o-.5+_t(),n-3-_t()*8,1.4+_t()*1.8,.6);for(const u of[-1,1])for(let f=0;f<4;f++)zs(i,t+u*(10+_t()*2),s+f*1.6,n-2-_t()*6,1.5+_t(),.8);Na(i,t,n-.05,0,21,3.2,o-1.6,[],"cliff");for(const u of[-1,1])Na(i,t+u*6.6,n+.4,0,8.4,o-s+1.5,s-1.2,[],"cliff");e.tomb={X:t,FZ:n,g:s,stone:[t-3.6,s+1.1,n+.6],linen:[t-1.75,s+.8,r+1.8]},e.lights.push([t-.5,s+1.6,r+2.5,16769968,7,.6]);const c=(u,f,p,_)=>{const g=Math.hypot(p-u,_-f),m=Math.atan2(p-u,_-f)+Math.PI/2,v=(u+p)/2,x=(f+_)/2,b=pe(v,x);i.box("fieldStone",v,x,g,.6,b-.6,b+.9,m)};c(t-22,n+18,t-4,n+18),c(t+4,n+18,t+20,n+18),c(t+20,n+18,t+20,n+2);const l=t+9,h=n+9,d=pe(l,h);i.cyl("fieldStone",l,h,1.1,d-.5,d+.8,{seg:14}),i.box("darkWood",l,h,2.4,.12,d+2.1,d+2.25,0,{solid:!1});for(const u of[-1,1])i.box("darkWood",l+u*1.1,h,.12,.12,d+.8,d+2.25,0,{solid:!1});i.box("fieldStone",t-8,n+6,2,.6,pe(t-8,n+6),pe(t-8,n+6)+.5),e.gardens.push({x:t,z:n+9,r:14})}function tM(i,e){const{x:t,z:n}=an,s=pe(t,n)+.2,r=s+1.5;i.box("walls",t,n,16,14,s-3,r),i.stairs("walls",t-2,n+8.2,4,2.4,s-.4,r,Math.PI);for(const[l,h,d,u]of[[-7.8,0,.5,14],[0,-6.8,16,.5],[-6.1,6.8,3.8,.5],[3.8,6.8,8.4,.5],[7.8,0,.5,14]])i.box("walls",t+l,n+h,d,u,r,r+1);i.box("stoneDark",t-6.6,n,.8,7,r,r+.45,0,{solid:!1});const a=t+4,o=n-2.5,c=r+7;i.box("walls",a,o,5,5,r,c),i.box("stoneDark",a,o,5.4,5.4,c-.5,c,0,{solid:!1});for(const[l,h,d,u]of[[a,o-2.35,5,.3],[a+2.35,o,.3,5],[a,o+2.35,5,.3],[a-2.35,o+1.1,.3,2.8]])i.box("walls",l,h,d,u,c,c+1.05);for(let l=-2;l<=2;l++)for(const[h,d]of[[l*1.1,-2.35],[l*1.1,2.35],[2.35,l*1.1]])i.box("walls",a+h,o+d,.5,.45,c+1.05,c+1.6,0,{solid:!1});i.box("void",a-2.52,o+1.2,.08,1.1,r,r+2.1,0,{solid:!1}),i.stairs("walls",a+.6,o+3.4,1.6,4.4,r,r+3.5,-Math.PI/2),i.box("walls",a-3.7,o+3.4,3,1.8,r,r+3.5),i.stairs("walls",a-3.4,o+.5,1.6,4.8,r+3.5,c,Math.PI),i.box("walls",a-3.4,o-2.2,1.8,.7,r,c),i.box("walls",a-3.4,o-2.7,1.8,.3,c,c+1.05),i.box("walls",a-4.45,o-2.2,.3,.7,c,c+1.05),e.viewpoint=[a,c+1.6,o]}function nM(i,e){const{x:t,z:n}=on,s=pe(t,n);i.cyl("fieldStone",t+3,n+2,1.7,s-.3,s+.75,{seg:18});const r=new Rn(.85,.85,.42,18);r.rotateZ(Math.PI/2),r.translate(t+3.4,s+1.6,n+2),i.geom("fieldStone",r),i.box("darkWood",t+3,n+2,3.6,.2,s+1.55,s+1.75,.3,{solid:!1}),i.cyl("darkWood",t+3,n+2,.15,s+.75,s+2.2,{seg:6,solid:!1}),zs(i,t-4,s+.2,n-3,1.6,.45,"fieldStone");const a=(x,b,E,S)=>{const A=Math.hypot(E-x,S-b),R=Math.ceil(A/4);for(let M=0;M<R;M++){const y=M/R,P=(M+1)/R,U=x+(E-x)*(y+P)/2,T=b+(S-b)*(y+P)/2,w=pe(U,T);if(rn(U,T)<2.5)continue;const L=pe(x+(E-x)*y,b+(S-b)*y),O=pe(x+(E-x)*P,b+(S-b)*P);i.box("fieldStone",U,T,A/R+.1,.7,Math.min(L,O,w)-.5,Math.max(L,O,w)+.8,Math.atan2(E-x,S-b)+Math.PI/2)}};a(t-16,n-14,t+16,n-14),a(t+16,n-14,t+16,n+14),a(t-16,n+14,t+16,n+14),a(t-16,n-14,t-16,n+14),e.groves.push({x:t,z:n,r:14,n:16,old:!0});const o=Ji(-34)-12,c=-34,l=pe(o,c);i.box("rock",o,c,6.5,6.5,l-1,l+6.5);for(const[x,b]of[[-3.3,-1.5],[-3.3,1.5],[3.3,-1.5],[3.3,1.5],[-1.5,-3.3],[1.5,-3.3],[-1.5,3.3],[1.5,3.3]])i.cyl("rock",o+x,c+b,.25,l,l+5.6,{seg:8,solid:!1});i.box("rock",o,c,6.9,6.9,l+5.6,l+6.6,0,{solid:!1}),i.box("rock",o,c,5,5,l+6.6,l+8.4),i.cyl("rock",o,c,2.2,l+8.4,l+9.4,{seg:16});const h=new ks(2,5.5,18),d=h.attributes.position;for(let x=0;x<d.count;x++){const b=d.getY(x),E=.75+.25*((b+2.75)/5.5);d.setX(x,d.getX(x)*(1-(1-E)*1.2)),d.setZ(x,d.getZ(x)*(1-(1-E)*1.2))}h.computeVertexNormals(),h.translate(o,l+12.15,c),i.geom("rock",h);for(let x=0;x<5;x++){const b=-70+x*13,E=Ji(b)-18,S=pe(E,b);Na(i,E,b,Math.PI/2,9,5,S-1,[{x:0,y:-.6,rx:.7,ry:1,depth:1.6}],"cliff")}const u=22,f=117.8,p=pe(Ji(u),u)+.9,_=1.22;i.box("fieldStone",f,u,8.5,4.4,p,p+.55,_);for(const x of[-1,1]){const[b,E]=xt(f,u,_,x*3.8,0);i.box("fieldStone",b,E,1.2,4.6,p-2.5,p+.55,_,{solid:!1})}const g=Ji(56)-7,m=56,v=pe(g,m);i.box("fieldStone",g,m,3.2,1.2,v-.3,v+.75),e.pools.push([g,m,2.6,.7,v+.62])}function iM(i,e){const t=[];for(let d=0;d<26&&t.length<15;d++){const u=_t()*6.28,f=6+_t()*24,p=dn.x+Math.cos(u)*f,_=dn.z+Math.sin(u)*f;t.some(([g,m])=>Math.hypot(g-p,m-_)<9)||rn(p,_)<5||Math.hypot(p-Sr.x,_-Sr.z)<11||t.push([p,_])}for(const[d,u]of t){const f=_t()*.6-.3+(_t()<.5?0:Math.PI/2),p=5+_t()*2.5,_=4.5+_t()*2,[g,m]=[Math.min(...[[-1,-1],[1,1],[1,-1],[-1,1]].map(([E,S])=>pe(...xt(d,u,f,E*p/2,S*_/2)))),Math.max(...[[-1,-1],[1,1],[1,-1],[-1,1]].map(([E,S])=>pe(...xt(d,u,f,E*p/2,S*_/2))))],v=m+3.2;i.box("clay",d,u,p,_,g-1,v,f),i.box("roof",d,u,p+.4,_+.4,v,v+.3,f);let[x,b]=xt(d,u,f,0,_/2+.03);if(i.box("void",x,b,1.1,.08,pe(x,b)-.2,pe(x,b)+2,f,{solid:!1}),[x,b]=xt(d,u,f,p/2+.03,0),i.box(_t()<.4?"lit":"void",x,b,.08,.5,m+1.4,m+2.1,f,{solid:!1}),_t()<.7){for(const[M,y,P,U]of[[-p/2,_/2+2.5,.4,5],[p/2,_/2+2.5,.4,5],[-p/4-.6,_/2+5,p/2-1.2,.4]]){const[T,w]=xt(d,u,f,M,y),L=pe(T,w);i.box("clay",T,w,P,U,L-.5,L+1.4,f)}const[E,S]=xt(d,u,f,p/2-1,_/2+3),A=pe(E,S),R=new Hs(.75,10,6,0,Math.PI*2,0,Math.PI/2);R.translate(E,A,S),i.geom("clay",R),_t()<.5&&e.smoke.push([E,A+.8,S])}if(_t()<.45){const[E,S]=xt(d,u,f,-p/2-1.6,0),A=pe(E,S);for(const[R,M]of[[-1,-1],[1,-1],[-1,1],[1,1]]){const[y,P]=xt(E,S,f,R*1.2,M*1.6);i.box("darkWood",y,P,.15,.15,A,A+2.4,f,{solid:!1})}i.box("darkWood",E,S,2.6,3.4,A+2.35,A+2.5,f,{solid:!1}),e.vines.push([E,A+2.55,S,f])}}const n=96,s=150;pe(n,s);for(let d=0;d<22;d++){const u=d/22*Math.PI*2,f=(d+1)/22*Math.PI*2;if(d===5||d===6)continue;const p=n+Math.cos((u+f)/2)*8,_=s+Math.sin((u+f)/2)*8,g=pe(p,_);i.box("fieldStone",p,_,2.4,.7,g-.5,g+1.25,(u+f)/2+Math.PI/2)}i.box("fieldStone",n-10,s-4,3.4,3,pe(n-10,s-4)-.5,pe(n-10,s-4)+2.2),i.box("darkWood",n-10,s-4,4,3.6,pe(n-10,s-4)+2.2,pe(n-10,s-4)+2.45),e.pens.push({x:n,z:s,r:6.5});const r=128,a=128,o=pe(r,a);i.cyl("paving",r,a,6.5,o-.4,o+.15,{seg:26}),i.cyl("fieldStone",r,a,6.9,o-.4,o+.35,{seg:26,open:!0,solid:!1});for(let d=0;d<7;d++){const u=_t()*6.28,f=_t()*4;i.cyl("field",r+Math.cos(u)*f,a+Math.sin(u)*f,.45,o+.15,o+1.1,{r1:.3,seg:8,solid:!1})}const c=168,l=82,h=pe(c,l);i.cyl("fieldStone",c,l,2.6,h-1,h+5.5,{seg:16}),i.cyl("fieldStone",c,l,2.9,h+5.5,h+6.1,{seg:16,solid:!1}),i.box("void",c,l+2.62,.9,.1,h,h+1.8,0,{solid:!1}),e.vineyard={x:c,z:l,w:34,d:22};for(let d=18;d<66;d+=4.6){let u=null;for(let f=-110;f<=130;f+=3){let p=120,_=215;if(pe(p,f)>d||pe(_,f)<d){u=null;continue}for(let m=0;m<18;m++){const v=(p+_)/2;pe(v,f)<d?p=v:_=v}const g=(p+_)/2;if(u&&Math.hypot(u[0]-g,u[1]-f)<6&&rn(g,f)>3&&Math.abs(f-an.z)+Math.abs(g-an.x)>22&&Math.hypot(g-on.x,f-on.z)>18){const m=(u[0]+g)/2,v=(u[1]+f)/2,x=Math.hypot(u[0]-g,u[1]-f),b=pe(m,v),E=pe(u[0],u[1]),S=pe(g,f);Ut(g*.05,f*.05+d)>.36&&i.box("walls",m,v,x+.2,.5,Math.min(E,S,b)-.5,Math.max(E,S,b)+.4,Math.atan2(g-u[0],f-u[1])+Math.PI/2,{solid:!1})}u=[g,f]}}for(const[d,u]of[[-96,-104],[108,70],[30,176],[-200,6],[182,-22]]){const f=pe(d,u);i.cyl("fieldStone",d,u,.35,f-.2,f+1.4,{seg:8})}}function sM(i,e){const{x:t,z:n,rot:s}=Sr,r=5.4,a=4.4,o=.35,c=2.8,l=(v,x)=>xt(t,n,s,v,x);let h=1/0,d=-1/0;for(let v=-1;v<=1;v+=.5)for(let x=-1;x<=1;x+=.5){const b=pe(...l(v*r/2,x*a/2));h=Math.min(h,b),d=Math.max(d,b)}const u=d+.06,f=u+c,p=(v,x,b,E,S=h-1.2,A=f)=>{const[R,M]=l(v,x);i.box("clay",R,M,b,E,S,A,s)};p(0,-a/2-o/2,r+2*o,o),p(-r/2-o/2,0,o,a),p(r/2+o/2,0,o,a),p(-r/4-.35,a/2+o/2,r/2+.3,o),p(r/2-.65,a/2+o/2,1.3,o),p(.6,a/2+o/2,1.75,o,u+2.15,f);{const[v,x]=l(0,0);i.box("clay",v,x,r,a,h-1.2,u,s),i.box("roof",v,x,r+2*o+.3,a+2*o+.3,f,f+.3,s),i.box("darkWood",v,x,r,a,f-.18,f,s,{solid:!1})}for(let v=-2;v<=2;v++){const[x,b]=l(v*1.1,0);i.box("darkWood",x,b,.16,a+.6,f-.36,f-.18,s,{solid:!1})}{const[v,x]=l(.6,a/2+o+.05);i.box("darkWood",v,x,1.6,.2,u+2.15,u+2.35,s,{solid:!1})}{const[v,x]=l(-r/2-o-.01,-.6);i.box("void",v,x,.05,.6,u+1.6,u+2.1,s,{solid:!1})}const _=-.6,g=-a/2+.5;{const[v,x]=l(_,g);i.box("darkWood",v,x,2,.95,u,u+.38,s),i.box("linen",v,x,1.95,.9,u+.38,u+.47,s,{solid:!1});const[b,E]=l(_-.45,g);i.box("awning",b,E,1,.95,u+.47,u+.52,s,{solid:!1,uv:[.5,0,.25,1]})}{const[v,x]=l(r/2-.5,-a/2+.5);i.box("darkWood",v,x,.7,.6,u,u+.6,s),i.cyl("clay",v,x,.09,u+.6,u+.68,{r1:.06,seg:8,solid:!1}),e.flames.push([v,u+.74,x,.12]),e.lights.push([v,u+1,x,16756838,9,.5])}{const[v,x]=l(r/2-.45,.9);i.cyl("clay",v,x,.24,u,u+.7,{r1:.14,seg:10})}{const[v,x]=l(.6,.6);i.box("awning",v,x,1.4,.9,u,u+.02,s,{solid:!1,uv:[.75,0,.25,1]})}const m=s;e.intro={sit:[...l(_+.2,g+.62),u],yaw:m,door:l(.6,a/2-.2),out:l(.6,a/2+3.2),out2:l(.6,a/2+6.5),camIn:[...l(r/2-.4,a/2-.4),u+1.7],floor:u,houseW:l(0,0)}}function rM(i,e){sM(i,e),$v(i,e),eM(i,e),tM(i,e),nM(i,e),iM(i,e)}const El={value:0},aM=El;function oM(i,{tint:e,wind:t=0,fill:n=.18,alpha:s}){const r=i.clone();r.side=At,s!==void 0&&(r.alphaTest=s),r.map&&n&&(r.emissiveMap=r.map,r.emissive=new Te(n,n,n));const a=e?new Te(e):null;return r.onBeforeCompile=o=>{if(o.uniforms.uTime=El,a&&(o.uniforms.uTint={value:a}),o.vertexShader=`uniform float uTime;
`+o.vertexShader.replace("#include <begin_vertex>",`
      #include <begin_vertex>
      #ifdef USE_INSTANCING
        vec2 wp = vec2(instanceMatrix[3].x, instanceMatrix[3].z);
      #else
        vec2 wp = vec2(0.);
      #endif
      float sway = max(position.y, 0.) * ${t.toFixed(3)};
      float ph = uTime * 1.5 + wp.x * .31 + wp.y * .23;
      transformed.x += sin(ph) * sway + sin(uTime * 3.3 + position.y * 2. + wp.x) * sway * .3;
      transformed.z += cos(ph * .8) * sway * .7;`),a){const c=`
        vec4 texel = texture2D(map, vMapUv);
        float l = dot(texel.rgb, vec3(.3,.59,.11));
        diffuseColor *= vec4(uTint * (.3 + l * 1.35), texel.a);`;o.fragmentShader=`uniform vec3 uTint;
`+o.fragmentShader.replace("#include <map_fragment>",c).replace("#include <emissivemap_fragment>",`#ifdef USE_EMISSIVEMAP
 totalEmissiveRadiance *= uTint * (.3 + dot(texture2D(emissiveMap, vEmissiveMapUv).rgb, vec3(.3,.59,.11)) * 1.35);
#endif`)}},r.customProgramCacheKey=()=>`v_${e}_${t}`,r}const ha=new Te;function cM({blades:i=7,h:e=.8,w:t=.07,spread:n=.22,base:s,tip:r,ear:a,bloom:o,center:c,seed:l=1}){let h=l*9301+49297;const d=()=>(h=h*16807%2147483647)/2147483647,u=[],f=[],p=(m,v,x,b)=>{u.push(m,v,x),ha.set(b),f.push(ha.r,ha.g,ha.b)};for(let m=0;m<i;m++){const v=d()*6.283,x=Math.sqrt(d())*n,b=Math.cos(v)*x,E=Math.sin(v)*x,S=e*(.6+d()*.5),A=.15+d()*.3,R=d()*6.283,M=b+Math.cos(R)*S*A,y=E+Math.sin(R)*S*A,P=v+1.57,U=Math.cos(P)*t/2,T=Math.sin(P)*t/2;if(p(b-U,0,E-T,s),p(b+U,0,E+T,s),p(M,S,y,r),a){const w=S*.82,L=b+(M-b)*.82,O=E+(y-E)*.82,V=.035;p(L-U*.9,w,O-T*.9,a),p(L+U*.9,w,O+T*.9,a),p(M,S+.14,y,a),p(L+U*.9,w,O+T*.9,a),p(L-U*.9,w,O-T*.9,a),p(L,w-V*3,O,a)}if(o&&m%2===0){const w=.07+d()*.03;for(let L=0;L<5;L++){const O=L/5*6.283,V=(L+1)/5*6.283;p(M,S+.01,y,c),p(M+Math.cos(O)*w,S+.03,y+Math.sin(O)*w,o),p(M+Math.cos(V)*w,S+.03,y+Math.sin(V)*w,o)}}}const _=new mt;_.setAttribute("position",new Ve(u,3)),_.setAttribute("color",new Ve(f,3));const g=new Float32Array(u.length);for(let m=0;m<g.length;m+=3)g[m+1]=1;return _.setAttribute("normal",new vt(g,3)),_}function lM(i,e){const t=new dt({vertexColors:!0,side:At,roughness:.92,name:e});return t.onBeforeCompile=n=>{n.uniforms.uTime=El,n.vertexShader=`uniform float uTime;
`+n.vertexShader.replace("#include <begin_vertex>",`
      #include <begin_vertex>
      vec2 wp = vec2(instanceMatrix[3].x, instanceMatrix[3].z);
      float sway = max(position.y, 0.) * ${i.toFixed(3)};
      float ph = uTime * 1.7 + wp.x * .29 + wp.y * .21;
      transformed.x += (sin(ph) + .4 * sin(uTime * 3.7 + wp.y)) * sway; transformed.z += cos(ph * .8) * sway * .7;`)},t.customProgramCacheKey=()=>"wind"+i,t}function hM(i,e,t,n,{lowQuality:s}){const r={};for(const T of e.scenes){T.updateMatrixWorld(!0);for(const w of T.children){const L=[];w.traverse(O=>{O.isMesh&&L.push({geometry:O.geometry,material:O.material,matrix:O.matrixWorld.clone()})}),r[w.name]=L}}{const T=[];for(let V=0;V<=12;V++){const N=V/12;T.push(new ue(Math.max(.02,Math.sin(Math.PI*Math.pow(N,.75))*1.05*(1-N*.35)),1.2+N*8.8))}const w=new cl(T,9),L=w.attributes.position;for(let V=0;V<L.count;V++){const N=L.getX(V),q=L.getY(V),W=L.getZ(V),ne=1+Math.sin(q*3.1+Math.atan2(W,N)*3)*.13+Math.sin(q*7.3)*.06;L.setX(V,N*ne),L.setZ(V,W*ne)}w.computeVertexNormals();const O=new Rn(.12,.18,1.6,6).translate(0,.8,0);r.Cypress=[{geometry:w,material:new dt({name:"CypressFoliage",color:2901543,roughness:.9,flatShading:!0,emissive:726024}),matrix:new ze},{geometry:O,material:new dt({name:"CypressBark",color:5126698,roughness:1}),matrix:new ze}]}const a=(T,w,L)=>{r[T]=[{geometry:cM(w),material:lM(L,T),matrix:new ze}]};a("GrassClump",{blades:7,h:.75,base:5204514,tip:12173914,seed:1},.16),a("DryClump",{blades:6,h:.7,w:.05,base:8221760,tip:14733190,seed:2},.18),a("WheatClump",{blades:9,h:1,w:.04,spread:.18,base:10259002,tip:14269788,ear:15518570,seed:3},.2),a("PoppyClump",{blades:6,h:.42,w:.03,spread:.18,base:5204514,tip:7309874,bloom:14168607,center:1708040,seed:4},.16),a("AnemoneClump",{blades:6,h:.36,w:.03,spread:.18,base:5204514,tip:7309874,bloom:10640592,center:2758720,seed:5},.16),a("MustardClump",{blades:8,h:.55,w:.03,spread:.2,base:5795882,tip:8230452,bloom:15914042,center:13081114,seed:6},.16);const o=T=>/leav|leaf|grass|plant|fern|clover|petal|flower|bush/i.test(T.name||""),c=new Map,l=(T,w)=>{const L=T.uuid+JSON.stringify(w);return T.vertexColors?T:(c.has(L)||c.set(L,o(T)?oM(T,w):(()=>{const O=T.clone();return w.bark&&(O.color=new Te(w.bark)),w.plain&&(O.map=null,O.flatShading=!0,O.roughness=.95),O})()),c.get(L))},h={olive:{models:["CommonTree_5","CommonTree_3"],leaf:{tint:10726804,wind:.02,fill:.2},bark:10127992,shadow:!0},oldOlive:{models:["CommonTree_2"],leaf:{tint:10134924,wind:.018,fill:.16},bark:9075304,shadow:!0},cypress:{models:["Cypress"],shadow:!0},almond:{models:["CommonTree_5"],leaf:{tint:15976404,wind:.02,fill:.3},bark:8018504,shadow:!0},bush:{models:["Bush_Common_Flowers"],leaf:{tint:7307077,wind:.03},shadow:!0},vine:{models:["Plant_7"],leaf:{tint:6261294,wind:.05},shadow:!1},grass:{models:["GrassClump"],shadow:!1},dryGrass:{models:["DryClump"],shadow:!1},wheat:{models:["WheatClump"],shadow:!1},poppy:{models:["PoppyClump"],shadow:!1},anemone:{models:["AnemoneClump"],shadow:!1},mustard:{models:["MustardClump"],shadow:!1},rock:{models:["Rock_Medium_1","Rock_Medium_2","Rock_Medium_3"],bark:13483942,plain:!0,shadow:!0},pebble:{models:["Pebble_Round_1","Pebble_Round_2","Pebble_Round_3"],bark:13220252,plain:!0,shadow:!1}},d=300,u=new Map;let f=2024;const p=()=>(f=f*16807%2147483647)/2147483647,_=new Jt,g=new en,m=new z,v=new z,x=n.reserved||[],b=(T,w,L)=>Math.hypot(T-Sr.x,w-Sr.z)>5.5&&!x.some(([O,V,N])=>Math.hypot(T-O,w-V)<N+1.5)&&!t.blocked(T,L+.6,w)&&!t.blocked(T+1.2,L+.6,w)&&!t.blocked(T-1.2,L+.6,w);function E(T,w,L,O,{sy:V=1,tilt:N=.05,y:q}={}){const W=h[T],ne=W.models[Math.floor(p()*W.models.length)],oe=q??pe(w,L),Me=new ze().compose(m.set(w,oe-.05,L),_.setFromEuler(g.set((p()-.5)*N,p()*6.283,(p()-.5)*N)),v.set(O,O*V,O)),J=`${T}|${ne}|${Math.floor(w/d)},${Math.floor(L/d)}`;(u.get(J)??u.set(J,[]).get(J)).push(Me)}function S(T,w,L,O,V,N){let q=0,W=0;for(;q<w&&W++<w*30;){const ne=L.x0+p()*(L.x1-L.x0),oe=L.z0+p()*(L.z1-L.z0),Me=pe(ne,oe);O(ne,oe,Me)&&(E(T,ne,oe,V[0]+p()*(V[1]-V[0]),N),q++)}}const A=(T,w)=>!Ua(T,w)&&rn(T,w)>2.5,R=(T,w)=>Math.hypot(T-an.x,w-an.z)>16&&Math.hypot(T-Bt.x,w-Bt.z)>13&&!(Math.abs(T-Ht.x)<13&&w>Ht.z-12&&w<Ht.z+12),M={x0:-280,x1:320,z0:-300,z1:300},y=s?.6:1;S("olive",150*y,{x0:122,x1:260,z0:-120,z1:140},(T,w,L)=>A(T,w)&&R(T,w)&&L>6&&Ut(T*.03,w*.03)>.38&&b(T,w,L)&&Math.hypot(T-dn.x,w-dn.z)>34,[.62,.9],{sy:.72}),S("olive",70*y,M,(T,w,L)=>A(T,w)&&R(T,w)&&Ut(T*.02+5,w*.02)>.55&&b(T,w,L)&&L>-2,[.6,.85],{sy:.7});for(const T of n.groves)S("oldOlive",T.n,{x0:T.x-T.r,x1:T.x+T.r,z0:T.z-T.r,z1:T.z+T.r},(w,L,O)=>rn(w,L)>2.5&&Math.hypot(w-T.x-3,L-T.z-2)>3.5&&b(w,L,O),[.85,1.05],{sy:.62});for(const T of n.gardens)S("olive",6,{x0:T.x-T.r,x1:T.x+T.r,z0:T.z-T.r*.6,z1:T.z+T.r*.6},(w,L,O)=>b(w,L,O)&&Math.abs(w-Ht.x)>3,[.55,.7],{sy:.72}),S("cypress",4,{x0:T.x-T.r,x1:T.x+T.r,z0:T.z-2,z1:T.z+T.r*.6},(w,L,O)=>b(w,L,O),[.9,1.1],{sy:1}),S("poppy",40,{x0:T.x-T.r,x1:T.x+T.r,z0:T.z-T.r*.5,z1:T.z+T.r*.6},(w,L,O)=>b(w,L,O),[1,1.4]),S("anemone",30,{x0:T.x-T.r,x1:T.x+T.r,z0:T.z-T.r*.5,z1:T.z+T.r*.6},(w,L,O)=>b(w,L,O),[1,1.4]);if(n.palaceGarden){const T=n.palaceGarden;S("cypress",10,T,(w,L,O)=>!t.blocked(w,O+3,L),[.8,1],{sy:1,tilt:.02})}S("cypress",40*y,M,(T,w,L)=>A(T,w)&&rn(T,w)<9&&R(T,w)&&b(T,w,L),[.8,1.15],{sy:1,tilt:.02}),S("almond",34,{x0:112,x1:146,z0:110,z1:146},(T,w,L)=>A(T,w)&&b(T,w,L)&&Math.hypot(T-128,w-128)>9,[.48,.62],{sy:.8}),S("almond",20*y,M,(T,w,L)=>A(T,w)&&R(T,w)&&b(T,w,L)&&Ut(T*.05,w*.05)>.62,[.45,.6],{sy:.8}),S("bush",120*y,M,(T,w,L)=>A(T,w)&&R(T,w)&&b(T,w,L),[.7,1.4]),S("rock",160*y,M,(T,w,L)=>A(T,w)&&b(T,w,L)&&(Ut(T*.04,w*.04)>.5||L>40),[.5,1.6]),S("rock",26,{x0:Bt.x-22,x1:Bt.x+22,z0:Bt.z-22,z1:Bt.z+22},(T,w,L)=>R(T,w)&&b(T,w,L),[.6,1.8]),S("pebble",260*y,M,(T,w,L)=>!Ua(T,w)&&b(T,w,L),[.8,2.2]);for(const[T,w,L,O,V,N]of[[178,142,24,16,.15,3600],[60,160,20,10,-.1,1800]]){const q=Math.cos(V),W=Math.sin(V);for(let ne=0;ne<N*y;ne++){const oe=(p()-.5)*2*L,Me=(p()-.5)*2*O,J=T+q*oe+W*Me,$=w-W*oe+q*Me;rn(J,$)<2||E("wheat",J,$,.85+p()*.3,{sy:1.1,tilt:.15})}}if(S("grass",s?6e3:11e3,M,(T,w,L)=>A(T,w)&&b(T,w,L)&&Ut(T*.05+2,w*.05)>.4&&Math.hypot(T-20,w)<300,[.9,1.5],{tilt:.15}),S("dryGrass",s?2e3:3800,M,(T,w,L)=>A(T,w)&&b(T,w,L)&&Ut(T*.04+8,w*.04)>.5,[.8,1.3],{tilt:.2}),S("poppy",1100*y,M,(T,w,L)=>A(T,w)&&b(T,w,L)&&Ut(T*.06+20,w*.06)>.52,[.9,1.4],{tilt:.2}),S("anemone",600*y,M,(T,w,L)=>A(T,w)&&b(T,w,L)&&Ut(T*.06-20,w*.06)>.55,[.9,1.3],{tilt:.2}),S("mustard",600*y,M,(T,w,L)=>A(T,w)&&b(T,w,L)&&Ut(T*.05+50,w*.05)>.56,[.9,1.3],{tilt:.2}),n.vineyard){const T=n.vineyard;for(let w=-T.w/2;w<T.w/2;w+=2.6)for(let L=-T.d/2;L<T.d/2;L+=1.4){const O=T.x+w,V=T.z+L+6;Math.hypot(O-T.x,V-T.z)<4||rn(O,V)<2||E("vine",O,V,.45+p()*.15,{tilt:.1})}}for(const[T,w,L]of n.vines)for(let O=0;O<4;O++)E("vine",T+(p()-.5)*2,L+(p()-.5)*2.6,.5,{y:w});const P=new ze;let U=0;for(const[T,w]of u){const[L,O]=T.split("|"),V=h[L];for(const N of r[O]||[]){const q=new Ra(N.geometry,l(N.material,V.leaf&&o(N.material)?V.leaf:{bark:V.bark,plain:V.plain}),w.length);w.forEach((W,ne)=>q.setMatrixAt(ne,P.multiplyMatrices(W,N.matrix))),q.instanceMatrix.needsUpdate=!0,q.computeBoundingSphere(),q.castShadow=V.shadow,q.receiveShadow=!0,i.add(q),U++}}return{drawn:U,count:[...u.values()].reduce((T,w)=>T+w.length,0)}}function Tl(i){const e=new Map,t=new Map,n=i.clone();return Gd(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;const r=s,a=e.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Gd(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Gd(i.children[n],e.children[n],t)}let bu=777;const Dt=()=>(bu=bu*16807%2147483647)/2147483647;function uM(i,{sheepGltf:e,donkeyGltf:t},n,s){const r=[],a=e.scene,o=new wn().setFromObject(a),c=o.getSize(new z),l=1.15/Math.max(c.x,c.z);a.traverse(M=>{M.isMesh&&(M.castShadow=!0,M.receiveShadow=!0,M.material=M.material.clone(),M.material.roughness=.95,M.material.color.r>.3&&M.material.color.setRGB(.93,.9,.84))});const h=[...n.pens.map(M=>({...M,n:12})),{x:70,z:200,r:14,n:14},{x:-120,z:-175,r:12,n:9}],d=[];a.updateMatrixWorld(!0),a.traverse(M=>{M.isMesh&&d.push(M)});const u=[];for(const M of h)for(let y=0;y<M.n;y++){const P=Dt()*6.28,U=Math.sqrt(Dt())*M.r,T=M.x+Math.cos(P)*U,w=M.z+Math.sin(P)*U,L=l*(.85+Dt()*.3);u.push({x:T,z:w,s:L,y:pe(T,w)-o.min.y*L,rot:Dt()*6.28,ph:Dt()*10})}const f=d.map(M=>{const y=new Ra(M.geometry,M.material,u.length);return y.castShadow=!0,y.receiveShadow=!0,y.frustumCulled=!1,i.add(y),{im:y,local:M.matrixWorld.clone()}}),p=new ze,_=new Jt,g=new en,m=new z,v=new z,x=new ze;let b=0;r.push(M=>{if(!(b++%2)){u.forEach((y,P)=>{const U=Math.max(0,Math.sin(M*.5+y.ph));p.compose(m.set(y.x,y.y-U*.04,y.z),_.setFromEuler(g.set(U*.12,y.rot+Math.sin(M*.07+y.ph)*.4,0)),v.set(y.s,y.s,y.s));for(const{im:T,local:w}of f)T.setMatrixAt(P,x.multiplyMatrices(p,w))});for(const{im:y}of f)y.instanceMatrix.needsUpdate=!0}});const E=Object.fromEntries(t.animations.map(M=>[M.name,M])),S=new wn().setFromObject(t.scene),A=1.35/S.getSize(new z).y,R=()=>{const M=Tl(t.scene);return M.scale.setScalar(A),M.traverse(y=>{y.isMesh&&(y.castShadow=!0,y.frustumCulled=!1)}),i.add(M),M};for(const[M,y,P]of[[dn.x+4,dn.z+13,"Eating"],[dn.x+13,dn.z-9,"Idle_Headlow"],[-86,-96,"Idle"]]){const U=R();U.position.set(M,pe(M,y),y),U.rotation.y=Dt()*6.28;const T=new Ia(U);T.clipAction(E[P]||t.animations[0]).play(),T.update(Dt()*3),r.push((w,L)=>T.update(L))}{const M=Fd[3].pts,y=R(),P=new Ia(y);P.clipAction(E.Walk).play();const U=[];let T=0;for(let O=0;O<M.length-1;O++){const V=Math.hypot(M[O+1][0]-M[O][0],M[O+1][1]-M[O][1]);U.push(V),T+=V}let w=30,L=1;r.push((O,V)=>{P.update(V),w+=L*V*1.1,w>T-2?(w=T-2,L=-1):w<2&&(w=2,L=1);let N=w,q=0;for(;q<U.length-1&&N>U[q];)N-=U[q],q++;const[W,ne]=M[q],[oe,Me]=M[q+1],J=N/U[q],$=W+(oe-W)*J+1.2,ge=ne+(Me-ne)*J;y.position.set($,pe($,ge),ge),y.rotation.y=Math.atan2((oe-W)*L,(Me-ne)*L)})}{const y=new mt;y.setAttribute("position",new Ve([0,0,.18,-.45,.05,-.05,0,0,-.12,0,0,.18,.45,.05,-.05,0,0,-.12],3)),y.computeVertexNormals();const P=new Ra(y,new dt({color:15921128,side:At,roughness:.8}),26);P.frustumCulled=!1,i.add(P);const U=Array.from({length:26},()=>({r:25+Dt()*35,h:ts.y+30+Dt()*25,sp:.15+Dt()*.12,ph:Dt()*6.28,f:6+Dt()*4})),T=new ze,w=new Jt,L=new en,O=new z,V=new z;r.push(N=>{U.forEach((q,W)=>{const ne=N*q.sp+q.ph,oe=30+Math.cos(ne)*q.r,Me=-8+Math.sin(ne)*q.r*.8,J=q.h+Math.sin(N*.7+q.ph)*3,$=Math.sin(N*q.f+q.ph);T.compose(O.set(oe,J,Me),w.setFromEuler(L.set(0,-ne,$*.05)),V.set(1.6,1+$*2.2,1.6)),P.setMatrixAt(W,T)}),P.instanceMatrix.needsUpdate=!0})}return(M,y)=>r.forEach(P=>P(M,y))}function _u(i){const e=document.createElement("canvas");e.width=e.height=64;const t=e.getContext("2d"),n=t.createRadialGradient(32,32,0,32,32,32);return i.forEach(([s,r])=>n.addColorStop(s,r)),t.fillStyle=n,t.fillRect(0,0,64,64),new Tr(e)}function dM(i,e,t){const n=[];if(e.flames.length){const a=e.flames.length*7,o=new Float32Array(a*3),c=new Float32Array(a),l=new Float32Array(a);e.flames.forEach(([f,p,_,g],m)=>{for(let v=0;v<7;v++){const x=m*7+v;o.set([f+(Dt()-.5)*g*.5,p,_+(Dt()-.5)*g*.5],x*3),c[x]=Dt()*10,l[x]=g*(2.4+Dt()*1.6)}});const h=new mt;h.setAttribute("position",new vt(o,3)),h.setAttribute("aSeed",new vt(c,1)),h.setAttribute("aSize",new vt(l,1));const d=new Lt({uniforms:{uTime:{value:0},uTex:{value:_u([[0,"#fff6d0"],[.25,"#ffc050"],[.6,"rgba(255,90,20,.55)"],[1,"rgba(255,40,0,0)"]])}},vertexShader:`attribute float aSeed; attribute float aSize; uniform float uTime; varying float vA;
        void main(){ float t = fract(uTime * (.9 + fract(aSeed) * .6) + aSeed);
          vec3 p = position + vec3(sin(aSeed*7. + uTime*3.)*.08, t * aSize * .35, cos(aSeed*5. + uTime*2.)*.08);
          vA = (1. - t) * smoothstep(0., .15, t);
          vec4 mv = modelViewMatrix * vec4(p, 1.); gl_PointSize = aSize * (1. - t * .6) * 220. / -mv.z; gl_Position = projectionMatrix * mv; }`,fragmentShader:"uniform sampler2D uTex; varying float vA; void main(){ vec4 c = texture2D(uTex, gl_PointCoord); gl_FragColor = vec4(c.rgb * 2.2, c.a * vA); }",transparent:!0,depthWrite:!1,blending:Sa}),u=new Nc(h,d);u.frustumCulled=!1,i.add(u),n.push(f=>{d.uniforms.uTime.value=f})}if(e.smoke.length){const a=e.smoke.length*10,o=new Float32Array(a*3),c=new Float32Array(a);e.smoke.forEach(([u,f,p],_)=>{for(let g=0;g<10;g++){const m=_*10+g;o.set([u,f,p],m*3),c[m]=g/10+Dt()*.05}});const l=new mt;l.setAttribute("position",new vt(o,3)),l.setAttribute("aSeed",new vt(c,1));const h=new Lt({uniforms:{uTime:{value:0},uTex:{value:_u([[0,"rgba(235,225,215,.55)"],[.6,"rgba(210,200,195,.22)"],[1,"rgba(200,190,190,0)"]])}},vertexShader:`attribute float aSeed; uniform float uTime; varying float vA;
        void main(){ float t = fract(uTime * .07 + aSeed);
          vec3 p = position + vec3(t * 5. + sin(t * 6. + aSeed * 20.) * .6, t * 16., t * 2.);
          vA = (1. - t) * smoothstep(0., .1, t);
          vec4 mv = modelViewMatrix * vec4(p, 1.); gl_PointSize = (2. + t * 9.) * 260. / -mv.z; gl_Position = projectionMatrix * mv; }`,fragmentShader:"uniform sampler2D uTex; varying float vA; void main(){ vec4 c = texture2D(uTex, gl_PointCoord); gl_FragColor = vec4(c.rgb, c.a * vA * .8); }",transparent:!0,depthWrite:!1,fog:!1}),d=new Nc(l,h);d.frustumCulled=!1,i.add(d),n.push(u=>{h.uniforms.uTime.value=u})}const s=Sl(2);for(const[r,a,o,c,l]of e.pools){const h=t.water.clone();h.normalMap=s,h.normalScale=new ue(.3,.3);const d=new et(new Gn(o,c).rotateX(-Math.PI/2),h);d.position.set(r,l,a),d.receiveShadow=!0,i.add(d)}n.push(r=>{s.offset.set(r*.02,r*.013)});for(const[r,a,o,c,l,h=1]of e.lights){const d=new Ed(c,40*h,l,1.6);d.position.set(r,a,o),i.add(d);const u=d.intensity;n.push(f=>{d.intensity=u*(.85+Math.sin(f*9+r)*.08+Math.sin(f*23+o)*.07)})}return r=>n.forEach(a=>a(r))}function Vd(i){const e=i.intro,t=i.golgotha,n=i.tomb,s=e.out,r=[e.out[0]-1.6*Math.sin(e.yaw+Math.PI/2),e.out[1]-1.6*Math.cos(e.yaw+Math.PI/2)];return[{id:"casa",name:"A dona da casa",kind:"female",at:[r[0]-1.2,r[1]+1.2],face:s,colors:{tunic:14207142,veil:9084088,mantle:11575440},lines:["Até que enfim acordou. Você gemia no sono... de novo a sexta-feira, não é?","Ninguém nesta casa dorme direito desde que o desceram da cruz.","Cléopas passou aqui antes do sol. Disse que vai esperar você na Porta de Jafa, do outro lado da cidade. Querem ir para Emaús ainda hoje.","E falou mais uma coisa, sem fôlego: umas mulheres foram ao sepulcro de madrugada e voltaram contando coisas. Vá. Escute o que estão dizendo em Jerusalém."],then:"cleopas"},{id:"pastor",name:"Pastor",kind:"male",at:[88,146],face:[96,150],colors:{tunic:12562060,mantle:10129280},lines:["Conto as ovelhas toda manhã. Hoje estão todas aqui.",'Ele dizia: "Ferirei o pastor, e as ovelhas se dispersarão." E foi assim. Os amigos dele sumiram como ovelhas no escuro.',"Mas pastor bom não abandona o rebanho. É o que eu acho."]},{id:"horto",name:"Homem do horto",kind:"male",at:[on.x-3,on.z+7],face:[on.x-4,on.z-3],colors:{tunic:11049080,mantle:8030832},lines:["Foi aqui, na quinta à noite. Eu dormia ali, perto da prensa.","Vieram com tochas, espadas e paus. Um dos doze ia na frente... e o cumprimentou com um beijo.","Um rapaz fugiu nu, largando o lençol na mão dos guardas. Todos fugiram. Todos."]},{id:"soldado",name:"Soldado romano",kind:"soldier",at:[t.cross[0]+4.5,t.cross[2]+3],face:[t.cross[0],t.cross[2]],lines:["Circule, galileu. Não há mais nada para ver aqui.","...Três crucificados na sexta. O do meio morreu depressa. Não amaldiçoou ninguém. Pediu perdão por nós.",'Ao meio-dia o sol escureceu por três horas. O centurião bateu no peito e disse: "Este era mesmo o Filho de Deus." Desde então, não fala com ninguém.']},{id:"guarda",name:"Guarda do sepulcro",kind:"soldier",at:[n.X+7.5,n.FZ+9],face:[n.X,n.FZ],lines:["Eu não vi nada! A gente estava dormindo. É isso. Dormindo.","Se alguém perguntar: os discípulos dele vieram de noite e levaram o corpo. Foi o que nos mandaram dizer... quer dizer, foi o que aconteceu.","A terra tremeu. Uma luz... Não. Não vou falar disso."]},{id:"mulher",name:"Mulher no jardim",kind:"female",at:[n.X-6,n.FZ+8],face:[n.X,n.FZ],colors:{tunic:13351316,veil:14866628,mantle:10125162},lines:["Viemos ao amanhecer com os perfumes, para o corpo. No caminho a gente se perguntava: quem vai rolar a pedra?","A pedra já estava rolada. O túmulo, vazio.",'Dois homens com roupas que brilhavam como relâmpago nos disseram: "Por que vocês procuram entre os mortos aquele que vive?"',"Contamos aos onze. Acharam que era delírio de mulher. Entre ali. Veja você mesmo."]},{id:"sacerdote",name:"Sacerdote",kind:"priest",at:[66,-42],face:[30,-7],y:ts.y,lines:["Paz, peregrino. A festa acabou e você ainda está aqui?","Sexta, na hora do sacrifício da tarde, a terra tremeu. O véu do santuário se rasgou de alto a baixo.","De alto a baixo, entende? Não de baixo para cima, como mão de homem rasgaria. Mandaram calar.","E hoje cedo vieram dizer que o túmulo daquele galileu está vazio. Os chefes já estão reunidos."]},{id:"mercador",name:"Mercador",kind:"male",at:[-49.4,9.5],face:[-49.4,0],colors:{tunic:13677696,mantle:8014442,sash:11567184},lines:["Tâmaras! Figos de Betfagé! ...Ah, você é um dos galileus dele, não é? Fala como eles.",'O povo gritou "Barrabás!" e Pilatos lavou as mãos. Barrabás passou por aqui ontem, rindo, com um figo meu na mão.',"Agora dizem que os discípulos roubaram o corpo. Vocês? Um de vocês negou o mestre diante de uma criada!"]},{id:"pretorio",name:"Mulher no pretório",kind:"female",at:[-35,-61],face:[-30,-65],colors:{tunic:12560778,veil:6969978,mantle:9075306},lines:["Eu estava aqui quando o trouxeram ao pretório. Açoitaram até não sobrar pele nas costas.",'Os soldados trançaram uma coroa de espinhos e o vestiram de púrpura. Ajoelhavam e cuspiam: "Salve, rei dos judeus!"',"Ele não respondeu nada. Como cordeiro diante de quem o tosquia."]},{id:"cleopas",name:"Cléopas",proper:!0,kind:"male",at:[-140,6],face:[-120,4],colors:{tunic:14735040,mantle:7307162},final:!0,lines:["Até que enfim! Pensei que você não vinha.","Você ouviu? As mulheres dizem que o túmulo está vazio. Alguns dos nossos correram até lá e encontraram tudo como elas disseram. Mas a ele, ninguém viu.","Nós esperávamos que fosse ele quem ia libertar Israel... e hoje já é o terceiro dia desde que tudo aconteceu.","Vamos para Emaús. São sessenta estádios. No caminho a gente conversa sobre tudo isso."]}]}function Wd(i){const e=i.golgotha,t=i.tomb,n=i.veil;return[{id:"cruz",name:"a cruz do meio",at:e.cross,r:2.6,lines:['A madeira ainda tem manchas escuras. No alto, a placa em hebraico, grego e latim: "Jesus Nazareno, Rei dos Judeus".','Dois ladrões morreram ao lado dele. A um deles, dizem, ele prometeu: "Hoje estarás comigo no paraíso."']},{id:"tunica",name:"a túnica",at:[-71,null,-113],r:2.2,mesh:"tunic",lines:["Uma túnica sem costura, tecida de alto a baixo numa peça só.","Ao lado, dados de osso. Os soldados tiraram a sorte por ela, para não rasgá-la."]},{id:"coroa",name:"a coroa de espinhos",at:[-30,null,-65],r:2.2,mesh:"crown",lines:["Uma coroa trançada de espinhos, jogada no chão do pátio.","Os espinhos ainda têm sangue seco."]},{id:"pedra",name:"a pedra",at:t.stone,r:2.8,lines:["A pedra é enorme. Seriam precisos vários homens para rolá-la.","E o selo romano que a prendia está partido."]},{id:"lencois",name:"os lençóis",at:t.linen,r:1.9,lines:["Os lençóis de linho estão aqui, no lugar onde o corpo foi posto. O lenço que cobria a cabeça está dobrado, à parte.","Quem rouba um corpo e deixa as faixas arrumadas?"]},{id:"veu",name:"o véu",at:n,r:3.2,lines:["O véu do santuário: azul, púrpura, escarlate e linho fino.","Rasgado de alto a baixo."]}]}function fM(i){const e=new Sn,t=new dt({color:4863268,roughness:.9});for(let n=0;n<3;n++){const s=new et(new Qi(.14+n*.006,.012,5,22),t);s.rotation.x=Math.PI/2+(n-1)*.12,s.rotation.y=n,e.add(s)}for(let n=0;n<46;n++){const s=n/46*Math.PI*2,r=new et(new ks(.006,.06,4),t);r.position.set(Math.cos(s)*.145,(n%3-1)*.012,Math.sin(s)*.145),r.lookAt(Math.cos(s)*.4,(n%5-2)*.2,Math.sin(s)*.4),r.rotateX(Math.PI/2),e.add(r)}return e.rotation.x=.25,e}function pM(i){const e=new Sn,t=new et(new Xa(.6,1),i.cliff);t.scale.set(1.3,.45,1),t.position.y=.1,e.add(t);const n=new et(new Bn(.7,.07,.5),new dt({color:15129796,roughness:.95}));n.position.set(0,.36,0),n.rotation.y=.3,e.add(n);const s=n.clone();s.scale.set(.8,1,.85),s.position.y=.42,s.rotation.y=.2,e.add(s);const r=new dt({color:15327433,roughness:.6});for(let a=0;a<3;a++){const o=new et(new Bn(.03,.03,.03),r);o.position.set(.45+a*.06,.32,.25-a*.05),o.rotation.set(a,a*2,0),e.add(o)}return e}function mM(i){const e=new Sn,t=new et(new Rn(.022,.026,2.3,6),i.darkWood);t.position.y=1.15,e.add(t);const n=new et(new ks(.04,.3,6),i.bronze);return n.position.y=2.45,e.add(n),e.rotation.z=.12,e}function gM(i,e,t,n){i.traverse(o=>{if(!o.isMesh)return;e==="soldier"&&(o.userData.part==="hair"||o.userData.part==="beard")&&(o.visible=!1);const c=o.material?.name,l=e==="soldier"?{tunic:11022890,mantle:9054754,sash:5913120}:e==="priest"?{tunic:16052454,mantle:15262420,sash:5917344}:t||{};c&&l[c]!==void 0&&(o.material=o.material.clone(),o.material.color=new Te(l[c]),c==="mantle"&&(o.material.map=uv()))}),i.updateMatrixWorld(!0);let s=null;if(i.traverse(o=>{o.isBone&&o.name==="Head"&&(s=o)}),!s)return;const r=new z;s.getWorldPosition(r);const a=(o,c)=>{o.position.set(r.x,r.y+c,r.z),i.add(o),o.updateMatrixWorld(!0),s.attach(o)};if(e==="soldier"){const o=new et(new Hs(.135,14,8,0,Math.PI*2,0,Math.PI*.55),n.bronze);o.scale.set(1,1.05,1.12),a(o,.075);const c=new et(new Bn(.035,.09,.26),new dt({color:10496544,roughness:.9}));a(c,.22);const l=new et(new Qi(.14,.014,5,20),n.bronze);l.rotation.x=Math.PI/2,a(l,.075)}if(e==="priest"){const o=new dt({color:16184040,roughness:.9}),c=new et(new Rn(.125,.13,.13,14),o);a(c,.17);for(let l=0;l<3;l++){const h=new et(new Qi(.13,.022,6,18),o);h.rotation.x=Math.PI/2,a(h,.12+l*.045)}}}function bM(i){return[...Vd(i).map(e=>[e.at[0],e.at[1],2.6]),...Wd(i).map(e=>[e.at[0],e.at[2],3])]}function _M(i){const{scene:e,camera:t,solids:n,heightAt:s,extras:r,clips:a,maleTpl:o,femaleTpl:c,M:l,player:h,hero:d,play:u,grade:f,isTouch:p}=i,_=j=>document.querySelector(j),g={talk:_("#talk"),name:_("#talkName"),text:_("#talkText"),prompt:_("#prompt"),act:_("#bAct"),obj:_("#objective"),cap:_("#caption"),skip:_("#skip")},m=Vd(r).map(j=>{const B=Tl(j.kind==="female"?c:o);gM(B,j.kind,j.colors,l),B.traverse(ce=>{ce.isMesh&&(ce.castShadow=!1,ce.receiveShadow=!0,ce.frustumCulled=!1)});const Z=j.y??s(j.at[0],j.at[1]);B.position.set(j.at[0],Z,j.at[1]),B.rotation.y=Math.atan2(j.face[0]-j.at[0],j.face[1]-j.at[1]),e.add(B);const F=new Ia(B),ae=F.clipAction(a[j.idle||"Idle_Loop"]),ee=F.clipAction(a.Idle_Talking_Loop);if(ae.play(),F.update(Math.random()*3),n.add({x:j.at[0],z:j.at[1],hx:.32,hz:.32,rot:0,y0:Z-.5,y1:Z+1.7}),j.kind==="soldier"){const ce=mM(l);ce.position.set(j.at[0]+.55,Z,j.at[1]+.2),e.add(ce)}return{...j,root:B,mixer:F,idle:ae,talk:ee,y:Z,baseYaw:B.rotation.y,kind:"npc",heard:!1}}),v=Wd(r).map(j=>{const B=[j.at[0],j.at[1]??s(j.at[0],j.at[2]),j.at[2]];if(j.mesh){const Z=j.mesh==="crown"?fM():pM(l);Z.position.set(B[0],s(B[0],B[2])+(j.mesh==="crown"?.03:0),B[2]),Z.traverse(F=>{F.isMesh&&(F.castShadow=!0,F.receiveShadow=!0)}),e.add(Z)}return{...j,at:B,kind:"obj",heard:!1}}),x=new et(new Rn(1.15,1.15,.45,22).rotateX(Math.PI/2),l.cliff);x.position.set(r.tomb.X,r.tomb.g+1.15,r.tomb.FZ+.4),x.visible=!1,e.add(x);const b=m.filter(j=>!j.final&&j.id!=="casa").length+v.length;let E="";const S=()=>[...m,...v].filter(j=>j.heard&&!j.final&&j.id!=="casa").length;function A(j){E=j,R()}function R(){if(!E){g.obj.hidden=!0;return}g.obj.hidden=!1,g.obj.innerHTML=`<b>${E}</b><span>Relatos ouvidos: ${S()} de ${b}</span>`}let M=null;const y=46;function P(j){M={who:j,lines:j.lines,i:0,shown:0},g.talk.hidden=!1,g.name.textContent=j.kind==="npc"?j.name:`Você examina ${j.name}`,g.prompt.hidden=!0,g.act.hidden=!0,j.kind==="npc"&&j.idle.crossFadeTo(j.talk.reset().play(),.3,!1)}function U(){if(!M)return;const j=M.lines[M.i];if(M.shown<j.length){M.shown=j.length;return}M.i++,M.shown=0,M.i>=M.lines.length&&T()}function T(){const j=M.who;M=null,g.talk.hidden=!0,j.kind==="npc"&&j.talk.crossFadeTo(j.idle.reset().play(),.4,!1);const B=!j.heard;j.heard=!0,j.id==="casa"&&B?A("Encontre Cléopas na Porta de Jafa. No caminho, ouça o que dizem em Jerusalém."):R(),j.final&&Le()}g.talk.addEventListener("pointerdown",j=>{j.stopPropagation(),U()});let w=null;const L=r.intro,O=r.golgotha,V=r.tomb,N=(j,B,Z)=>new z(j,B,Z),q=N(L.sit[0],L.sit[2],L.sit[1]),W=(j,B)=>s(j,B),ne=on.x,oe=on.z,Me=[{dur:5.2,fade:[1,1],caps:[[.4,"Primeiro dia da semana."],[2.6,"Betânia, ao amanhecer."]],cam:()=>[N(L.camIn[0],L.camIn[2],L.camIn[1]),q.clone().add(N(0,1,0))]},{dur:4.4,caps:[[.3,"Três dias. E eu não consigo parar de ver..."]],cam:j=>[N(L.camIn[0],L.camIn[2]-j*.1,L.camIn[1]),q.clone().add(N(0,1.05,0))]},{dur:3.8,mem:1,dark:.55,caps:[[.3,"Tochas no horto. Um beijo."]],cam:j=>[N(ne-13+j*2.5,W(ne,oe)+3,oe+11-j*2),N(ne,W(ne,oe)+2,oe)]},{dur:3.8,mem:1,dark:.2,caps:[[.3,'O pretório. A coroa de espinhos. "Crucifica-o!"']],cam:j=>[N(-31.6+j*.15,W(-31.6,-62.6)+1.05-j*.12,-62.6-j*.1),N(-30,W(-30,-65)+.05,-65)]},{dur:4.4,mem:1,dark:.45,caps:[[.3,"Ao meio-dia, trevas sobre a terra."],[2.2,'"Está consumado."']],cam:j=>[N(O.cross[0]+8-j,O.top+1.2,O.cross[2]+8-j),N(O.cross[0],O.top+4.2,O.cross[2])]},{dur:3.8,mem:1,dark:.3,sealed:1,caps:[[.3,"Uma pedra sobre a entrada. O sábado em silêncio."]],cam:j=>[N(V.X+.6,V.g+1.3,V.FZ+3.6-j*.3),N(V.X,V.g+1,V.FZ)]},{dur:3.4,caps:[[.4,"...e mesmo assim, algo está estranho."]],player:"Sitting_Exit",cam:j=>[N(L.camIn[0],L.camIn[2],L.camIn[1]),q.clone().add(N(0,1+j*.15,0))]},{dur:4.6,walk:[L.door,L.out],cam:()=>{const j=L.out2;return[N(j[0]+1.5,W(j[0],j[1])+2.4,j[1]+1.5),h.position.clone().add(N(0,1.4,0))]}}];function J(){w={shots:Me,i:0,t:0,onEnd:$},document.body.classList.add("cine"),g.skip.hidden=!1,h.position.copy(q),d.rotation.y=0,h.rotation.y=0,i.setHeroYaw(L.yaw),u("Sitting_Idle_Loop",{fade:0}),ge()}function $(){x.visible=!1,w=null,document.body.classList.remove("cine"),g.skip.hidden=!0,g.cap.classList.remove("on"),f.uMem.value=0,f.uFade.value=0,f.uDark.value=0;const j=L.out;h.position.set(j[0],n.groundAt(j[0],j[1],s(j[0],j[1])+1),j[1]),i.setHeroYaw(L.yaw),i.resetCam(L.yaw+Math.PI),A("Fale com a dona da casa.")}function ge(){const j=w.shots[w.i];w.t=0,w.capI=0,g.cap.classList.remove("on"),f.uFlash.value=j.mem||w.shots[w.i-1]?.mem?1:0,x.visible=!!j.sealed,j.player&&u(j.player,{once:!0,fade:.2}),j.walk&&(w.walk={pts:j.walk,k:0},u("Walk_Loop",{fade:.3}))}function de(j){const B=w.shots[w.i];for(w.t+=j,Math.min(1,w.t/B.dur),f.uMem.value=Dn.damp(f.uMem.value,B.mem?1:0,6,j),f.uDark.value=Dn.damp(f.uDark.value,B.dark||0,4,j),f.uFlash.value=Math.max(0,f.uFlash.value-j*2.4),B.black?f.uFade.value=1:B.fade?f.uFade.value=1-Math.min(1,Math.max(0,(w.t-2.2)/1.6)):B.end?f.uFade.value=Math.min(1,w.t/.8):f.uFade.value=Math.max(0,f.uFade.value-j*2);B.caps&&w.capI<B.caps.length&&w.t>=B.caps[w.capI][0];)g.cap.textContent=B.caps[w.capI][1],g.cap.classList.add("on"),w.capI++;if(w.t>B.dur-.5&&g.cap.classList.remove("on"),w.walk){const ae=w.walk,ee=ae.pts[ae.k],ce=h.position,me=ee[0]-ce.x,Oe=ee[1]-ce.z,Ee=Math.hypot(me,Oe);if(Ee<.15)ae.k<ae.pts.length-1?ae.k++:(w.walk=null,u("Idle_Loop"));else{const D=Math.min(Ee,1.6*j);ce.x+=me/Ee*D,ce.z+=Oe/Ee*D,ce.y=n.groundAt(ce.x,ce.z,ce.y),i.setHeroYaw(Math.atan2(me,Oe))}}const[Z,F]=B.cam(w.t);if(w.t>=B.dur){if(w.i++,w.i>=w.shots.length){const ae=w.onEnd;return ae(),null}ge()}return{pos:Z,look:F}}function Le(){const j={pos:t.position.clone(),look:h.position.clone().add(N(0,1.4,0))};w={shots:[{dur:1.2,end:1,cam:()=>[j.pos,j.look]},{dur:7.5,cam:()=>[j.pos,j.look],caps:[[.3,"Naquele mesmo dia, dois deles iam para um povoado chamado Emaús..."],[4.2,"...e conversavam sobre tudo o que tinha acontecido."]],black:1},{dur:3.2,cam:()=>[j.pos,j.look],caps:[[.4,"Continua."]],black:1}],i:0,t:0,onEnd:()=>{w=null,document.body.classList.remove("cine"),g.cap.classList.remove("on"),f.uFade.value=0,A("Prólogo concluído. Explore Jerusalém à vontade.")}},document.body.classList.add("cine"),ge()}g.skip.addEventListener("click",()=>{w&&w.onEnd===$&&$()});const Fe=new z;function Ge(j,B,Z){for(const ee of m){const ce=ee.root.position.distanceTo(h.position);ee.root.visible=ce<95||!!w,ee.root.visible&&ee.mixer.update(j);let Oe=(M?.who===ee?Math.atan2(h.position.x-ee.root.position.x,h.position.z-ee.root.position.z):ee.baseYaw)-ee.root.rotation.y;Oe=Math.atan2(Math.sin(Oe),Math.cos(Oe)),ee.root.rotation.y+=Oe*Math.min(1,j*4)}if(w)return w.shots[w.i]?.black&&(f.uFade.value=1),{lock:!0,cam:de(j)};if(M){if(M.shown=Math.min(M.lines[M.i].length,M.shown+j*y),g.text.textContent=M.lines[M.i].slice(0,Math.floor(M.shown)),g.talk.classList.toggle("ready",M.shown>=M.lines[M.i].length),(B.interact||B.jump)&&U(),M?.who){const ee=M.who,ce=ee.kind==="npc"?ee.root.position:Fe.set(ee.at[0],0,ee.at[2]);i.setHeroYaw(Math.atan2(ce.x-h.position.x,ce.z-h.position.z))}return{lock:!0}}let F=null,ae=1/0;for(const ee of m){const ce=Math.hypot(ee.root.position.x-h.position.x,ee.root.position.z-h.position.z);ce<2.6&&Math.abs(ee.y-h.position.y)<2&&ce<ae&&(ae=ce,F=ee)}for(const ee of v){const ce=Math.hypot(ee.at[0]-h.position.x,ee.at[2]-h.position.z);ce<ee.r&&Math.abs(ee.at[1]-h.position.y)<2.6&&ce<ae&&(ae=ce,F=ee)}if(F){const ee=F.kind==="npc"?"Falar com":"Examinar";g.prompt.hidden=!1,g.prompt.innerHTML=`${p?"":"<kbd>E</kbd> "}${ee} <b>${F.kind==="npc"&&!F.proper?F.name.toLowerCase():F.name}</b>${F.heard?" <i>·</i>":""}`,g.act.hidden=!p,g.act.textContent=F.kind==="npc"?"FALAR":"OLHAR",B.interact&&P(F)}else g.prompt.hidden=!0,g.act.hidden=!0;return{lock:!1}}return{update:Ge,startIntro:J,skipIntro:()=>$(),npcs:m,objs:v,get busy(){return!!w||!!M},setObjective:A}}const Ka=matchMedia("(pointer: coarse)").matches||"ontouchstart"in window;Ka&&document.body.classList.add("touch");const pr=new URLSearchParams(location.search),Xs=Ka||pr.has("low"),xu=document.querySelector("#msg"),Rr=i=>{xu&&(xu.textContent=i)},Ja=()=>new Promise(i=>setTimeout(i,0)),kt=new __({antialias:!1,powerPreference:"high-performance"});kt.setPixelRatio(Math.min(devicePixelRatio,Xs?1.35:2));kt.setSize(innerWidth,innerHeight);kt.shadowMap.enabled=!0;kt.shadowMap.type=Cu;kt.toneMapping=Wc;kt.toneMappingExposure=.92;document.body.appendChild(kt.domElement);const Nt=new x_,Xd=new Te(15125439);Nt.fog=new il(Xd,.0016);const jd=i=>i<1?55+(1-i)*40:55,qt=new jt(jd(innerWidth/innerHeight),innerWidth/innerHeight,.1,3200),Al=document.querySelector("#bar i"),Za=new yd;Za.onProgress=(i,e,t)=>{Al.style.width=`${e/t*80}%`};const xM=new bx(Za).setMeshoptDecoder(Qx),vM=new Sd(Za);let vu=0;const MM=i=>(vu++,Al.style.width=`${Math.min(80,vu*8)}%`,i),Si=async i=>MM(await xM.loadAsync(`assets/models/${i}.glb`));async function yM(){return new $x(Za).loadAsync("assets/sky/sunset.hdr")}Rr("carregando modelos e texturas…");const[SM,EM,TM,AM,wM,RM,CM,PM,qd,IM]=await Promise.all([Si("nature"),Si("hero_base"),Si("hair_long"),Si("hair_beard"),Si("animations"),Si("donkey"),Si("sheep"),Si("hero_female"),yM(),Pv(vM,{anisotropy:Xs?4:8})]),{M:Cr,ground:LM}=IM,Yd=new z(.78,.5,.4).normalize();qd.mapping=Ea;const DM=new Ic(kt);Nt.environment=DM.fromEquirectangular(qd).texture;Nt.environmentIntensity=.6;const ui=new Td(16765856,3.6);ui.castShadow=!0;const Mu=Xs?1536:2048;ui.shadow.mapSize.set(Mu,Mu);Object.assign(ui.shadow.camera,{left:-70,right:70,top:70,bottom:-70,near:1,far:400});ui.shadow.bias=-4e-4;ui.shadow.normalBias=.08;Nt.add(ui,ui.target);Nt.add(new $_(13025516,9335642,.85));const Kd={uTime:{value:0},uSun:{value:Yd.clone()},uFog:{value:Xd}},Qa=new et(new Hs(2800,40,20),new Lt({uniforms:Kd,side:Yt,depthWrite:!1,fog:!1,vertexShader:"varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }",fragmentShader:`
    uniform vec3 uSun, uFog; uniform float uTime; varying vec3 vD;
    float h2(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
    float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return mix(mix(h2(i),h2(i+vec2(1,0)),f.x), mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),f.x), f.y); }
    float fbm(vec2 p){ float s=0., a=.5; for(int i=0;i<5;i++){ s+=a*vn(p); p*=2.07; a*=.5; } return s; }
    vec3 lin(vec3 c){ return pow(c, vec3(2.2)); }
    void main(){
      vec3 d = normalize(vD); float h = max(d.y, 0.);
      vec3 s = normalize(uSun); float toward = dot(normalize(d.xz + 1e-4), normalize(s.xz)) * .5 + .5;
      vec3 zen = lin(vec3(.26,.32,.62)), mid = lin(vec3(.62,.58,.80));
      vec3 horSun = lin(vec3(1.0,.72,.45)), horAnti = lin(vec3(.93,.70,.76)), shadowBand = lin(vec3(.62,.62,.78));
      vec3 hor = mix(horAnti, horSun, smoothstep(.25,.95,toward));
      vec3 col = mix(hor, mid, smoothstep(.02,.35,h));
      col = mix(col, zen, smoothstep(.3,.95,h));
      col = mix(col, shadowBand, (1.-toward) * (1. - smoothstep(0.,.06,h)) * .6);
      float sd = max(dot(d, s), 0.);
      col += lin(vec3(1.,.82,.55)) * pow(sd, 6.) * .55 + lin(vec3(1.,.93,.75)) * pow(sd, 60.) * .9;
      col += vec3(1.,.95,.85) * smoothstep(.9993,.9997, sd) * 4.;
      vec2 uv = d.xz / (h + .22); uv *= vec2(.55, 1.6);
      float n = fbm(uv * 1.3 + vec2(uTime * .004, 0.));
      float cl = smoothstep(.52, .70, n) * smoothstep(.01,.12,h) * (1. - smoothstep(.45,.85,h));
      float rim = smoothstep(.5,.95,toward);
      vec3 cloud = mix(lin(vec3(.70,.60,.78)), lin(vec3(1.,.62,.48)), rim * .9);
      cloud = mix(cloud, lin(vec3(1.,.86,.66)), pow(sd, 4.) * .8);
      col = mix(col, cloud, cl * .9);
      float st = step(.9975, h2(floor(d.xz / (d.y + .2) * 180.))) * smoothstep(.45,.9,h) * (1. - toward) * .6;
      col += vec3(st);
      col = mix(uFog, col, smoothstep(-.01, .16, d.y));   // funde com a névoa do horizonte
      gl_FragColor = vec4(col, 1.);
    }`}));Qa.frustumCulled=!1;Qa.renderOrder=-10;Nt.add(Qa);Rr("erguendo Jerusalém…");await Ja();Gv(Nt,LM,{lowQuality:Xs});const UM=Vv(Nt),NM=Wv(Nt,Cr),Ci=new Tv(pe),$a=new Nv(Cr,Ci),kn={flames:[],smoke:[],lights:[],pools:[],gardens:[],groves:[],vines:[],pens:[]};Xv($a,kn);Rr("construindo a cidade…");await Ja();const yu=Qv($a,kn);rM($a,kn);$a.finish(Nt);Rr("plantando oliveiras…");await Ja();kn.reserved=bM(kn);const Su=hM(Nt,SM,Ci,kn,{lowQuality:Xs}),FM=uM(Nt,{sheepGltf:CM,donkeyGltf:RM},kn),OM=dM(Nt,kn,Cr);Cr.lit.emissiveIntensity=2.2;Rr("vestindo o peregrino…");await Ja();const Li=Dd({baseGltf:EM,hairGltf:TM,beardGltf:AM}),zM=Tl(Li),BM=Dd({baseGltf:PM,cover:!0,colors:{tunic:14207142,veil:9084088,mantle:11575440}}),Pi=new Sn;Pi.add(Li);Nt.add(Pi);const Jd=new Ia(Li),Zd=Object.fromEntries(wM.animations.map(i=>[i.name,i])),kM={},HM=i=>kM[i]??=Jd.clipAction(Zd[i]);let ua=null;function Yi(i,{once:e=!1,fade:t=.2,speed:n=1}={}){const s=HM(i);return s.timeScale=n,ua===s||(s.reset(),s.setLoop(e?qu:Yu,1/0),s.clampWhenFinished=e,s.enabled=!0,ua&&ua.crossFadeTo(s,t,!1),s.play(),ua=s),s}Yi("Idle_Loop");const GM=lv(kt.domElement,Ka);let Ln=0,Ai=.18,Nn=6.5,ii=0,$n=0,Ei=!0,Wo=0,_s=!1,In=0,Ki=0;const ti=new z,Eu=new z;function eo(i,e,t,n,s){const r=s??Ci.groundAt(i,e,pe(i,e)+30);Pi.position.set(i,r,e),Ki=r,ii=Math.atan2(t-i,n-e),Li.rotation.y=ii,Ln=ii+Math.PI,$n=0,Ei=!0,_s=!1,ti.set(i,r+1.55,e),qt.position.set(i-Math.sin(ii)*Nn,r+3,e-Math.cos(ii)*Nn)}const Tu=Ya.find(i=>i.id==="mirante"),VM=()=>{eo(Tu.spawn[0],Tu.spawn[1],30,-7),Ai=.26,Nn=8.5};VM();const WM=new fn(innerWidth,innerHeight,{type:$t,samples:Xs?2:4}),ci=new sv(kt,WM),Er={tDiffuse:{value:null},uMem:{value:0},uFade:{value:0},uFlash:{value:0},uDark:{value:0},uTime:{value:0}};ci.addPass(new rv(Nt,qt));ci.addPass(new Os(new ue(innerWidth/2,innerHeight/2),.22,.55,.95));ci.addPass(new cv);const Qd=new Id({uniforms:Er,vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }",fragmentShader:`uniform sampler2D tDiffuse; uniform float uMem, uFade, uFlash, uDark, uTime; varying vec2 vUv;
    float rnd(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233)) + uTime * 7.) * 43758.5453); }
    void main(){ vec4 c = texture2D(tDiffuse, vUv); float l = dot(c.rgb, vec3(.299,.587,.114));
      c.rgb = mix(vec3(l), c.rgb, 1.14);
      c.rgb += vec3(.03,.012,-.012) * smoothstep(.45,1.,l);
      c.rgb += vec3(-.01,-.004,.03) * (1. - smoothstep(.0,.42,l));
      vec3 mem = vec3(l) * vec3(1.08,.82,.66); mem = (mem - .5) * 1.25 + .5;
      c.rgb = mix(c.rgb, mem, uMem) * (1. - uDark * .6);
      c.rgb += (rnd(vUv * 900.) - .5) * .09 * uMem;
      vec2 d = vUv - .5; c.rgb *= 1. - dot(d,d) * (.7 + uMem * 1.6);
      c.rgb = mix(c.rgb, vec3(1.,.97,.9), uFlash * .85);
      c.rgb *= 1. - uFade; gl_FragColor = c; }`});ci.addPass(Qd);for(const i of Object.keys(Er))Er[i]=Qd.uniforms[i];addEventListener("resize",()=>{kt.setSize(innerWidth,innerHeight),ci.setSize(innerWidth,innerHeight),qt.aspect=innerWidth/innerHeight,qt.fov=jd(qt.aspect),qt.updateProjectionMatrix()});const Hc=document.querySelector("#place");let Au=null,Gc=0;const XM=i=>{Hc.querySelector("b").textContent=i.name,Hc.classList.add("on"),Gc=4},Fa=document.querySelector("#menu"),jM=document.querySelector("#places");for(const i of Ya.filter(e=>e.spawn)){const e=document.createElement("button");e.type="button",e.textContent=i.name,e.addEventListener("click",()=>{eo(i.spawn[0],i.spawn[1],...i.look||[i.x,i.z]),Fa.hidden=!0}),jM.appendChild(e)}document.querySelector("#mapBtn").addEventListener("click",()=>{Fa.hidden=!Fa.hidden});document.querySelector("#closeMenu").addEventListener("click",()=>{Fa.hidden=!0});const mr=_M({scene:Nt,camera:qt,solids:Ci,heightAt:pe,extras:kn,clips:Zd,maleTpl:zM,femaleTpl:BM,M:Cr,player:Pi,hero:Li,play:Yi,grade:Er,isTouch:Ka,setHeroYaw:i=>{ii=i,Li.rotation.y=i},resetCam:i=>{Ln=i,Ai=.22,Nn=6.5,ti.copy(Pi.position).add(cr.set(0,1.55,0)),Ki=Pi.position.y}}),Xo=1.7,jo=4.2,wu=7,qM=.36,ya=new Ad,Gi=new z,cr=new z,sr=new z;function $d(i){const e=GM.poll(),t=mr.update(i,e,ya.elapsedTime);Er.uTime.value=ya.elapsedTime,t.lock&&(e.ix=e.iy=0,e.jump=!1,e.kneel=!1,t.cam&&(e.look.x=e.look.y=0)),Ln-=e.look.x,Ai=Dn.clamp(Ai+e.look.y,-.35,1.25),Nn=Dn.clamp(Nn+e.zoom,2.5,22),e.kneel&&(_s=!_s);const n=Math.min(1,Math.hypot(e.ix,e.iy));n>.1&&(_s=!1),Gi.set(0,0,0).addScaledVector(cr.set(-Math.sin(Ln),0,-Math.cos(Ln)),e.iy).addScaledVector(cr.set(Math.cos(Ln),0,-Math.sin(Ln)),e.ix),Gi.lengthSq()>1e-4&&Gi.normalize();const s=n<.05?0:n<.5?Xo:e.run?wu:jo;In=Dn.damp(In,s,10,i);const r=Pi.position;if(t.cam&&(In=0),In>.05){let d=r.x+Gi.x*In*i,u=r.z+Gi.z*In*i;const f=pe(d,u)-pe(r.x,r.z),p=Math.hypot(d-r.x,u-r.z);p>1e-4&&f/p>1.25&&pe(d,u)>r.y+Bc&&(d=r.x,u=r.z),[d,u]=Ci.resolve(d,u,r.y,qM);const _=Math.hypot(d-20,u);_>285&&(d=20+(d-20)*285/_,u=u*285/_),r.x=d,r.z=u;let m=Math.atan2(Gi.x,Gi.z)-ii;m=Math.atan2(Math.sin(m),Math.cos(m)),ii+=m*Math.min(1,i*12),Li.rotation.y=ii}const a=t.cam?r.y:Ci.groundAt(r.x,r.z,r.y);if(e.jump&&Ei&&!_s&&($n=6.6,Ei=!1),Ei&&a<r.y-.65&&(Ei=!1),Ei?r.y=a>r.y?a:Dn.damp(r.y,a,18,i):($n-=20*i,r.y+=$n*i,r.y<=a&&$n<=0&&(r.y=a,Ei=!0,Wo=$n<-7?.35:.15,$n=0)),Ki=Dn.damp(Ki,r.y,22,i),Math.abs(Ki-r.y)>1.2&&(Ki=r.y),Li.position.y=Ki-r.y,Wo-=i,!t.cam)if(_s)Yi("Fixing_Kneeling",{fade:.4,speed:.15});else if(!Ei)Yi($n>1?"Jump_Start":"Jump_Loop",{once:$n>1,fade:.12});else if(Wo>0)Yi("Jump_Land",{once:!0,fade:.08});else if(In>.15){const d=In>jo+.8?"Sprint_Loop":In>Xo+.9?"Jog_Fwd_Loop":"Walk_Loop",u=d==="Sprint_Loop"?wu:d==="Jog_Fwd_Loop"?jo:Xo;Yi(d,{speed:Dn.clamp(In/u,.6,1.3)})}else Yi("Idle_Loop");Jd.update(i),ti.lerp(cr.set(r.x,r.y+1.55,r.z),1-Math.exp(-12*i)),sr.set(Math.sin(Ln)*Math.cos(Ai),Math.sin(Ai),Math.cos(Ln)*Math.cos(Ai));let o=Nn;for(let d=1;d<=14;d++){const u=d/14*Nn;if(Ci.blocked(ti.x+sr.x*u,ti.y+sr.y*u,ti.z+sr.z*u)){o=Math.max(.6,u-.5);break}}Eu.copy(ti).addScaledVector(sr,o),t.cam?(qt.position.copy(t.cam.pos),qt.lookAt(t.cam.look),ti.copy(r).add(cr.set(0,1.55,0))):(qt.position.lerp(Eu,o<Nn?1:1-Math.exp(-14*i)),qt.lookAt(ti)),ui.position.copy(r).addScaledVector(Yd,180),ui.target.position.copy(r);const c=ya.elapsedTime;Kd.uTime.value=c,Qa.position.copy(qt.position),aM.value=c,UM.wn.offset.set(c*.004,c*.003),NM.wn.offset.set(0,-c*.25),FM(c,i),OM(c);let l=null,h=1/0;for(const d of Ya){const u=Math.hypot(r.x-d.x,r.z-d.z);u<d.r&&u/d.r<h&&(h=u/d.r,l=d)}l&&l!==Au&&!t.cam&&XM(l),Au=l,Gc-=i,Gc<0&&Hc.classList.remove("on")}function ef(){const i=Math.min(ya.getDelta(),.05);$d(i),ci.render(),requestAnimationFrame(ef)}Al.style.width="100%";document.querySelector("#loading").classList.add("done");if(pr.has("at")){mr.skipIntro();const i=Ya.find(e=>e.id===pr.get("at"));i?.spawn&&eo(i.spawn[0],i.spawn[1],...i.look||[i.x,i.z])}else pr.get("intro")==="0"?mr.skipIntro():mr.startIntro();window.__game={player:Pi,camera:qt,scene:Nt,solids:Ci,extras:kn,houses:yu,flora:Su,teleport:eo,story:mr,setCam:(i,e,t)=>{Ln=i,Ai=e,Nn=t},advance:(i=1,e=1/30)=>{for(let t=0;t<i;t++)$d(e);ci.render()},view:(i,e,t,n,s,r)=>{qt.position.set(i,e,t),qt.lookAt(n,s,r),ci.render()},info:()=>{kt.info.autoReset=!1,kt.info.reset(),ci.render();const i={houses:yu,flora:Su.drawn,calls:kt.info.render.calls,tris:kt.info.render.triangles};return kt.info.autoReset=!0,i}};pr.has("shot")||ef();
