(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const al="170",If=0,Zl=1,Lf=2,Ju=1,Zu=2,Qn=3,li=0,Zt=1,Et=2,ai=0,Cs=1,Fa=2,Ql=3,$l=4,Df=5,qi=100,Uf=101,Nf=102,Ff=103,Of=104,zf=200,Bf=201,kf=202,Hf=203,cc=204,lc=205,Gf=206,Vf=207,Wf=208,Xf=209,qf=210,jf=211,Yf=212,Kf=213,Jf=214,hc=0,uc=1,dc=2,Us=3,fc=4,pc=5,mc=6,gc=7,Qu=0,Zf=1,Qf=2,Ci=0,$u=1,ed=2,td=3,ol=4,$f=5,nd=6,id=7,eh="attached",ep="detached",sd=300,Ns=301,Fs=302,Oa=303,bc=304,Ja=306,Cn=1e3,Bn=1001,za=1002,Qt=1003,rd=1004,fr=1005,Lt=1006,wa=1007,kn=1008,hi=1009,ad=1010,od=1011,Er=1012,cl=1013,Qi=1014,nn=1015,sn=1016,ll=1017,hl=1018,Os=1020,cd=35902,ld=1021,hd=1022,mn=1023,ud=1024,dd=1025,Ps=1026,zs=1027,ul=1028,dl=1029,fd=1030,fl=1031,pl=1033,Ta=33776,Aa=33777,Ra=33778,Ca=33779,_c=35840,xc=35841,vc=35842,Mc=35843,yc=36196,Sc=37492,Ec=37496,wc=37808,Tc=37809,Ac=37810,Rc=37811,Cc=37812,Pc=37813,Ic=37814,Lc=37815,Dc=37816,Uc=37817,Nc=37818,Fc=37819,Oc=37820,zc=37821,Pa=36492,Bc=36494,kc=36495,pd=36283,Hc=36284,Gc=36285,Vc=36286,md=2200,gd=2201,tp=2202,wr=2300,Tr=2301,go=2302,Ts=2400,As=2401,Ba=2402,ml=2500,np=2501,ip=0,bd=1,Wc=2,sp=3200,rp=3201,_d=0,ap=1,Ti="",yt="srgb",Wt="srgb-linear",Za="linear",dt="srgb",as=7680,th=519,op=512,cp=513,lp=514,xd=515,hp=516,up=517,dp=518,fp=519,Xc=35044,nh="300 es",si=2e3,ka=2001;class ts{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ih=1234567;const br=Math.PI/180,Bs=180/Math.PI;function An(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Bt[i&255]+Bt[i>>8&255]+Bt[i>>16&255]+Bt[i>>24&255]+"-"+Bt[e&255]+Bt[e>>8&255]+"-"+Bt[e>>16&15|64]+Bt[e>>24&255]+"-"+Bt[t&63|128]+Bt[t>>8&255]+"-"+Bt[t>>16&255]+Bt[t>>24&255]+Bt[n&255]+Bt[n>>8&255]+Bt[n>>16&255]+Bt[n>>24&255]).toLowerCase()}function Tt(i,e,t){return Math.max(e,Math.min(t,i))}function gl(i,e){return(i%e+e)%e}function pp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function mp(i,e,t){return i!==e?(t-i)/(e-i):0}function _r(i,e,t){return(1-t)*i+t*e}function gp(i,e,t,n){return _r(i,e,1-Math.exp(-t*n))}function bp(i,e=1){return e-Math.abs(gl(i,e*2)-e)}function _p(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function xp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function vp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Mp(i,e){return i+Math.random()*(e-i)}function yp(i){return i*(.5-Math.random())}function Sp(i){i!==void 0&&(ih=i);let e=ih+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ep(i){return i*br}function wp(i){return i*Bs}function Tp(i){return(i&i-1)===0&&i!==0}function Ap(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Rp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Cp(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),d=r((e-n)/2),u=a((e-n)/2),f=r((n-e)/2),p=a((n-e)/2);switch(s){case"XYX":i.set(o*h,c*d,c*u,o*l);break;case"YZY":i.set(c*u,o*h,c*d,o*l);break;case"ZXZ":i.set(c*d,c*u,o*h,o*l);break;case"XZX":i.set(o*h,c*p,c*f,o*l);break;case"YXY":i.set(c*f,o*h,c*p,o*l);break;case"ZYZ":i.set(c*p,c*f,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function wn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ft(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Fn={DEG2RAD:br,RAD2DEG:Bs,generateUUID:An,clamp:Tt,euclideanModulo:gl,mapLinear:pp,inverseLerp:mp,lerp:_r,damp:gp,pingpong:bp,smoothstep:_p,smootherstep:xp,randInt:vp,randFloat:Mp,randFloatSpread:yp,seededRandom:Sp,degToRad:Ep,radToDeg:wp,isPowerOfTwo:Tp,ceilPowerOfTwo:Ap,floorPowerOfTwo:Rp,setQuaternionFromProperEuler:Cp,normalize:ft,denormalize:wn};class fe{constructor(e=0,t=0){fe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Je{constructor(e,t,n,s,r,a,o,c,l){Je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],_=s[0],g=s[3],m=s[6],v=s[1],x=s[4],b=s[7],E=s[2],S=s[5],T=s[8];return r[0]=a*_+o*v+c*E,r[3]=a*g+o*x+c*S,r[6]=a*m+o*b+c*T,r[1]=l*_+h*v+d*E,r[4]=l*g+h*x+d*S,r[7]=l*m+h*b+d*T,r[2]=u*_+f*v+p*E,r[5]=u*g+f*x+p*S,r[8]=u*m+f*b+p*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=h*a-o*l,u=o*c-h*r,f=l*r-a*c,p=t*d+n*u+s*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=d*_,e[1]=(s*l-h*n)*_,e[2]=(o*n-s*a)*_,e[3]=u*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(bo.makeScale(e,t)),this}rotate(e){return this.premultiply(bo.makeRotation(-e)),this}translate(e,t){return this.premultiply(bo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const bo=new Je;function vd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ar(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Pp(){const i=Ar("canvas");return i.style.display="block",i}const sh={};function pr(i){i in sh||(sh[i]=!0,console.warn(i))}function Ip(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Lp(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Dp(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const tt={enabled:!0,workingColorSpace:Wt,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===dt&&(i.r=oi(i.r),i.g=oi(i.g),i.b=oi(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===dt&&(i.r=Is(i.r),i.g=Is(i.g),i.b=Is(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ti?Za:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function oi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Is(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const rh=[.64,.33,.3,.6,.15,.06],ah=[.2126,.7152,.0722],oh=[.3127,.329],ch=new Je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lh=new Je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);tt.define({[Wt]:{primaries:rh,whitePoint:oh,transfer:Za,toXYZ:ch,fromXYZ:lh,luminanceCoefficients:ah,workingColorSpaceConfig:{unpackColorSpace:yt},outputColorSpaceConfig:{drawingBufferColorSpace:yt}},[yt]:{primaries:rh,whitePoint:oh,transfer:dt,toXYZ:ch,fromXYZ:lh,luminanceCoefficients:ah,outputColorSpaceConfig:{drawingBufferColorSpace:yt}}});let os;class Up{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{os===void 0&&(os=Ar("canvas")),os.width=e.width,os.height=e.height;const n=os.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=os}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ar("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=oi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(oi(t[n]/255)*255):t[n]=oi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Np=0;class Md{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Np++}),this.uuid=An(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(_o(s[a].image)):r.push(_o(s[a]))}else r=_o(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function _o(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Up.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Fp=0;class Rt extends ts{constructor(e=Rt.DEFAULT_IMAGE,t=Rt.DEFAULT_MAPPING,n=Bn,s=Bn,r=Lt,a=kn,o=mn,c=hi,l=Rt.DEFAULT_ANISOTROPY,h=Ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fp++}),this.uuid=An(),this.name="",this.source=new Md(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new fe(0,0),this.repeat=new fe(1,1),this.center=new fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Cn:e.x=e.x-Math.floor(e.x);break;case Bn:e.x=e.x<0?0:1;break;case za:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Cn:e.y=e.y-Math.floor(e.y);break;case Bn:e.y=e.y<0?0:1;break;case za:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Rt.DEFAULT_IMAGE=null;Rt.DEFAULT_MAPPING=sd;Rt.DEFAULT_ANISOTROPY=1;class at{constructor(e=0,t=0,n=0,s=1){at.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],p=c[9],_=c[2],g=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(p+g)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(l+1)/2,b=(f+1)/2,E=(m+1)/2,S=(h+u)/4,T=(d+_)/4,A=(p+g)/4;return x>b&&x>E?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=S/n,r=T/n):b>E?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=S/s,r=A/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=T/r,s=A/r),this.set(n,s,r,t),this}let v=Math.sqrt((g-p)*(g-p)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(d-_)/v,this.z=(u-h)/v,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Op extends ts{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Lt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Rt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Md(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class bn extends Op{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class yd extends Rt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class zp extends Rt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $t{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3];const u=r[a+0],f=r[a+1],p=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=u,e[t+1]=f,e[t+2]=p,e[t+3]=_;return}if(d!==_||c!==u||l!==f||h!==p){let g=1-o;const m=c*u+l*f+h*p+d*_,v=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const E=Math.sqrt(x),S=Math.atan2(E,m*v);g=Math.sin(g*S)/E,o=Math.sin(o*S)/E}const b=o*v;if(c=c*g+u*b,l=l*g+f*b,h=h*g+p*b,d=d*g+_*b,g===1-o){const E=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=E,l*=E,h*=E,d*=E}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],p=r[a+3];return e[t]=o*p+h*d+c*f-l*u,e[t+1]=c*p+h*u+l*d-o*f,e[t+2]=l*p+h*f+o*u-c*d,e[t+3]=h*p-o*d-c*u-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),d=o(r/2),u=c(n/2),f=c(s/2),p=c(r/2);switch(a){case"XYZ":this._x=u*h*d+l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d+u*f*p;break;case"YZX":this._x=u*h*d+l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d-u*f*p;break;case"XZY":this._x=u*h*d-l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d+u*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Tt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),d=Math.sin((1-t)*h)/l,u=Math.sin(t*h)/l;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,n=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(hh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(hh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+c*l+a*d-o*h,this.y=n+c*h+o*l-r*d,this.z=s+c*d+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return xo.copy(this).projectOnVector(e),this.sub(xo)}reflect(e){return this.sub(xo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xo=new N,hh=new $t;class Pn{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Mn):Mn.fromBufferAttribute(r,a),Mn.applyMatrix4(e.matrixWorld),this.expandByPoint(Mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Gr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Gr.copy(n.boundingBox)),Gr.applyMatrix4(e.matrixWorld),this.union(Gr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Mn),Mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter($s),Vr.subVectors(this.max,$s),cs.subVectors(e.a,$s),ls.subVectors(e.b,$s),hs.subVectors(e.c,$s),gi.subVectors(ls,cs),bi.subVectors(hs,ls),Ni.subVectors(cs,hs);let t=[0,-gi.z,gi.y,0,-bi.z,bi.y,0,-Ni.z,Ni.y,gi.z,0,-gi.x,bi.z,0,-bi.x,Ni.z,0,-Ni.x,-gi.y,gi.x,0,-bi.y,bi.x,0,-Ni.y,Ni.x,0];return!vo(t,cs,ls,hs,Vr)||(t=[1,0,0,0,1,0,0,0,1],!vo(t,cs,ls,hs,Vr))?!1:(Wr.crossVectors(gi,bi),t=[Wr.x,Wr.y,Wr.z],vo(t,cs,ls,hs,Vr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const qn=[new N,new N,new N,new N,new N,new N,new N,new N],Mn=new N,Gr=new Pn,cs=new N,ls=new N,hs=new N,gi=new N,bi=new N,Ni=new N,$s=new N,Vr=new N,Wr=new N,Fi=new N;function vo(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Fi.fromArray(i,r);const o=s.x*Math.abs(Fi.x)+s.y*Math.abs(Fi.y)+s.z*Math.abs(Fi.z),c=e.dot(Fi),l=t.dot(Fi),h=n.dot(Fi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Bp=new Pn,er=new N,Mo=new N;class Gn{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Bp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;er.subVectors(e,this.center);const t=er.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(er,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Mo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(er.copy(e.center).add(Mo)),this.expandByPoint(er.copy(e.center).sub(Mo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const jn=new N,yo=new N,Xr=new N,_i=new N,So=new N,qr=new N,Eo=new N;class Ur{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(jn.copy(this.origin).addScaledVector(this.direction,t),jn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){yo.copy(e).add(t).multiplyScalar(.5),Xr.copy(t).sub(e).normalize(),_i.copy(this.origin).sub(yo);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Xr),o=_i.dot(this.direction),c=-_i.dot(Xr),l=_i.lengthSq(),h=Math.abs(1-a*a);let d,u,f,p;if(h>0)if(d=a*c-o,u=a*o-c,p=r*h,d>=0)if(u>=-p)if(u<=p){const _=1/h;d*=_,u*=_,f=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u<=-p?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l):u<=p?(d=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(yo).addScaledVector(Xr,u),f}intersectSphere(e,t){jn.subVectors(e.center,this.origin);const n=jn.dot(this.direction),s=jn.dot(jn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,jn)!==null}intersectTriangle(e,t,n,s,r){So.subVectors(t,e),qr.subVectors(n,e),Eo.crossVectors(So,qr);let a=this.direction.dot(Eo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;_i.subVectors(this.origin,e);const c=o*this.direction.dot(qr.crossVectors(_i,qr));if(c<0)return null;const l=o*this.direction.dot(So.cross(_i));if(l<0||c+l>a)return null;const h=-o*_i.dot(Eo);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class He{constructor(e,t,n,s,r,a,o,c,l,h,d,u,f,p,_,g){He.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,h,d,u,f,p,_,g)}set(e,t,n,s,r,a,o,c,l,h,d,u,f,p,_,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new He().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/us.setFromMatrixColumn(e,0).length(),r=1/us.setFromMatrixColumn(e,1).length(),a=1/us.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=a*h,f=a*d,p=o*h,_=o*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=f+p*l,t[5]=u-_*l,t[9]=-o*c,t[2]=_-u*l,t[6]=p+f*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*h,f=c*d,p=l*h,_=l*d;t[0]=u+_*o,t[4]=p*o-f,t[8]=a*l,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-p,t[6]=_+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*h,f=c*d,p=l*h,_=l*d;t[0]=u-_*o,t[4]=-a*d,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*h,t[9]=_-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*h,f=a*d,p=o*h,_=o*d;t[0]=c*h,t[4]=p*l-f,t[8]=u*l+_,t[1]=c*d,t[5]=_*l+u,t[9]=f*l-p,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,f=a*l,p=o*c,_=o*l;t[0]=c*h,t[4]=_-u*d,t[8]=p*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*d+p,t[10]=u-_*d}else if(e.order==="XZY"){const u=a*c,f=a*l,p=o*c,_=o*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=u*d+_,t[5]=a*h,t[9]=f*d-p,t[2]=p*d-f,t[6]=o*h,t[10]=_*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kp,e,Hp)}lookAt(e,t,n){const s=this.elements;return on.subVectors(e,t),on.lengthSq()===0&&(on.z=1),on.normalize(),xi.crossVectors(n,on),xi.lengthSq()===0&&(Math.abs(n.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),xi.crossVectors(n,on)),xi.normalize(),jr.crossVectors(on,xi),s[0]=xi.x,s[4]=jr.x,s[8]=on.x,s[1]=xi.y,s[5]=jr.y,s[9]=on.y,s[2]=xi.z,s[6]=jr.z,s[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],_=n[6],g=n[10],m=n[14],v=n[3],x=n[7],b=n[11],E=n[15],S=s[0],T=s[4],A=s[8],M=s[12],y=s[1],C=s[5],U=s[9],w=s[13],P=s[2],L=s[6],F=s[10],W=s[14],O=s[3],j=s[7],X=s[11],se=s[15];return r[0]=a*S+o*y+c*P+l*O,r[4]=a*T+o*C+c*L+l*j,r[8]=a*A+o*U+c*F+l*X,r[12]=a*M+o*w+c*W+l*se,r[1]=h*S+d*y+u*P+f*O,r[5]=h*T+d*C+u*L+f*j,r[9]=h*A+d*U+u*F+f*X,r[13]=h*M+d*w+u*W+f*se,r[2]=p*S+_*y+g*P+m*O,r[6]=p*T+_*C+g*L+m*j,r[10]=p*A+_*U+g*F+m*X,r[14]=p*M+_*w+g*W+m*se,r[3]=v*S+x*y+b*P+E*O,r[7]=v*T+x*C+b*L+E*j,r[11]=v*A+x*U+b*F+E*X,r[15]=v*M+x*w+b*W+E*se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],f=e[14],p=e[3],_=e[7],g=e[11],m=e[15];return p*(+r*c*d-s*l*d-r*o*u+n*l*u+s*o*f-n*c*f)+_*(+t*c*f-t*l*u+r*a*u-s*a*f+s*l*h-r*c*h)+g*(+t*l*d-t*o*f-r*a*d+n*a*f+r*o*h-n*l*h)+m*(-s*o*h-t*c*d+t*o*u+s*a*d-n*a*u+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],f=e[11],p=e[12],_=e[13],g=e[14],m=e[15],v=d*g*l-_*u*l+_*c*f-o*g*f-d*c*m+o*u*m,x=p*u*l-h*g*l-p*c*f+a*g*f+h*c*m-a*u*m,b=h*_*l-p*d*l+p*o*f-a*_*f-h*o*m+a*d*m,E=p*d*c-h*_*c-p*o*u+a*_*u+h*o*g-a*d*g,S=t*v+n*x+s*b+r*E;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/S;return e[0]=v*T,e[1]=(_*u*r-d*g*r-_*s*f+n*g*f+d*s*m-n*u*m)*T,e[2]=(o*g*r-_*c*r+_*s*l-n*g*l-o*s*m+n*c*m)*T,e[3]=(d*c*r-o*u*r-d*s*l+n*u*l+o*s*f-n*c*f)*T,e[4]=x*T,e[5]=(h*g*r-p*u*r+p*s*f-t*g*f-h*s*m+t*u*m)*T,e[6]=(p*c*r-a*g*r-p*s*l+t*g*l+a*s*m-t*c*m)*T,e[7]=(a*u*r-h*c*r+h*s*l-t*u*l-a*s*f+t*c*f)*T,e[8]=b*T,e[9]=(p*d*r-h*_*r-p*n*f+t*_*f+h*n*m-t*d*m)*T,e[10]=(a*_*r-p*o*r+p*n*l-t*_*l-a*n*m+t*o*m)*T,e[11]=(h*o*r-a*d*r-h*n*l+t*d*l+a*n*f-t*o*f)*T,e[12]=E*T,e[13]=(h*_*s-p*d*s+p*n*u-t*_*u-h*n*g+t*d*g)*T,e[14]=(p*o*s-a*_*s-p*n*c+t*_*c+a*n*g-t*o*g)*T,e[15]=(a*d*s-h*o*s+h*n*c-t*d*c-a*n*u+t*o*u)*T,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,d=o+o,u=r*l,f=r*h,p=r*d,_=a*h,g=a*d,m=o*d,v=c*l,x=c*h,b=c*d,E=n.x,S=n.y,T=n.z;return s[0]=(1-(_+m))*E,s[1]=(f+b)*E,s[2]=(p-x)*E,s[3]=0,s[4]=(f-b)*S,s[5]=(1-(u+m))*S,s[6]=(g+v)*S,s[7]=0,s[8]=(p+x)*T,s[9]=(g-v)*T,s[10]=(1-(u+_))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=us.set(s[0],s[1],s[2]).length();const a=us.set(s[4],s[5],s[6]).length(),o=us.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],yn.copy(this);const l=1/r,h=1/a,d=1/o;return yn.elements[0]*=l,yn.elements[1]*=l,yn.elements[2]*=l,yn.elements[4]*=h,yn.elements[5]*=h,yn.elements[6]*=h,yn.elements[8]*=d,yn.elements[9]*=d,yn.elements[10]*=d,t.setFromRotationMatrix(yn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=si){const c=this.elements,l=2*r/(t-e),h=2*r/(n-s),d=(t+e)/(t-e),u=(n+s)/(n-s);let f,p;if(o===si)f=-(a+r)/(a-r),p=-2*a*r/(a-r);else if(o===ka)f=-a/(a-r),p=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=p,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=si){const c=this.elements,l=1/(t-e),h=1/(n-s),d=1/(a-r),u=(t+e)*l,f=(n+s)*h;let p,_;if(o===si)p=(a+r)*d,_=-2*d;else if(o===ka)p=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-p,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const us=new N,yn=new He,kp=new N(0,0,0),Hp=new N(1,1,1),xi=new N,jr=new N,on=new N,uh=new He,dh=new $t;class rn{constructor(e=0,t=0,n=0,s=rn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Tt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Tt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Tt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Tt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Tt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Tt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return uh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(uh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return dh.setFromEuler(this),this.setFromQuaternion(dh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}rn.DEFAULT_ORDER="XYZ";class bl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Gp=0;const fh=new N,ds=new $t,Yn=new He,Yr=new N,tr=new N,Vp=new N,Wp=new $t,ph=new N(1,0,0),mh=new N(0,1,0),gh=new N(0,0,1),bh={type:"added"},Xp={type:"removed"},fs={type:"childadded",child:null},wo={type:"childremoved",child:null};class xt extends ts{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gp++}),this.uuid=An(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xt.DEFAULT_UP.clone();const e=new N,t=new rn,n=new $t,s=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new He},normalMatrix:{value:new Je}}),this.matrix=new He,this.matrixWorld=new He,this.matrixAutoUpdate=xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new bl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ds.setFromAxisAngle(e,t),this.quaternion.multiply(ds),this}rotateOnWorldAxis(e,t){return ds.setFromAxisAngle(e,t),this.quaternion.premultiply(ds),this}rotateX(e){return this.rotateOnAxis(ph,e)}rotateY(e){return this.rotateOnAxis(mh,e)}rotateZ(e){return this.rotateOnAxis(gh,e)}translateOnAxis(e,t){return fh.copy(e).applyQuaternion(this.quaternion),this.position.add(fh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ph,e)}translateY(e){return this.translateOnAxis(mh,e)}translateZ(e){return this.translateOnAxis(gh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Yr.copy(e):Yr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),tr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(tr,Yr,this.up):Yn.lookAt(Yr,tr,this.up),this.quaternion.setFromRotationMatrix(Yn),s&&(Yn.extractRotation(s.matrixWorld),ds.setFromRotationMatrix(Yn),this.quaternion.premultiply(ds.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(bh),fs.child=e,this.dispatchEvent(fs),fs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Xp),wo.child=e,this.dispatchEvent(wo),wo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(bh),fs.child=e,this.dispatchEvent(fs),fs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tr,e,Vp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tr,Wp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=s,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}xt.DEFAULT_UP=new N(0,1,0);xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Sn=new N,Kn=new N,To=new N,Jn=new N,ps=new N,ms=new N,_h=new N,Ao=new N,Ro=new N,Co=new N,Po=new at,Io=new at,Lo=new at;class pn{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Sn.subVectors(e,t),s.cross(Sn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Sn.subVectors(s,t),Kn.subVectors(n,t),To.subVectors(e,t);const a=Sn.dot(Sn),o=Sn.dot(Kn),c=Sn.dot(To),l=Kn.dot(Kn),h=Kn.dot(To),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(l*c-o*h)*u,p=(a*h-o*c)*u;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Jn)===null?!1:Jn.x>=0&&Jn.y>=0&&Jn.x+Jn.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Jn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Jn.x),c.addScaledVector(a,Jn.y),c.addScaledVector(o,Jn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return Po.setScalar(0),Io.setScalar(0),Lo.setScalar(0),Po.fromBufferAttribute(e,t),Io.fromBufferAttribute(e,n),Lo.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Po,r.x),a.addScaledVector(Io,r.y),a.addScaledVector(Lo,r.z),a}static isFrontFacing(e,t,n,s){return Sn.subVectors(n,t),Kn.subVectors(e,t),Sn.cross(Kn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Sn.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),Sn.cross(Kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return pn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return pn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return pn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return pn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return pn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;ps.subVectors(s,n),ms.subVectors(r,n),Ao.subVectors(e,n);const c=ps.dot(Ao),l=ms.dot(Ao);if(c<=0&&l<=0)return t.copy(n);Ro.subVectors(e,s);const h=ps.dot(Ro),d=ms.dot(Ro);if(h>=0&&d<=h)return t.copy(s);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(ps,a);Co.subVectors(e,r);const f=ps.dot(Co),p=ms.dot(Co);if(p>=0&&f<=p)return t.copy(r);const _=f*l-c*p;if(_<=0&&l>=0&&p<=0)return o=l/(l-p),t.copy(n).addScaledVector(ms,o);const g=h*p-f*d;if(g<=0&&d-h>=0&&f-p>=0)return _h.subVectors(r,s),o=(d-h)/(d-h+(f-p)),t.copy(s).addScaledVector(_h,o);const m=1/(g+_+u);return a=_*m,o=u*m,t.copy(n).addScaledVector(ps,a).addScaledVector(ms,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Sd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vi={h:0,s:0,l:0},Kr={h:0,s:0,l:0};function Do(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ie{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,tt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=tt.workingColorSpace){if(e=gl(e,1),t=Tt(t,0,1),n=Tt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Do(a,r,e+1/3),this.g=Do(a,r,e),this.b=Do(a,r,e-1/3)}return tt.toWorkingColorSpace(this,s),this}setStyle(e,t=yt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){const n=Sd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=oi(e.r),this.g=oi(e.g),this.b=oi(e.b),this}copyLinearToSRGB(e){return this.r=Is(e.r),this.g=Is(e.g),this.b=Is(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return tt.fromWorkingColorSpace(kt.copy(this),e),Math.round(Tt(kt.r*255,0,255))*65536+Math.round(Tt(kt.g*255,0,255))*256+Math.round(Tt(kt.b*255,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.fromWorkingColorSpace(kt.copy(this),t);const n=kt.r,s=kt.g,r=kt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=tt.workingColorSpace){return tt.fromWorkingColorSpace(kt.copy(this),t),e.r=kt.r,e.g=kt.g,e.b=kt.b,e}getStyle(e=yt){tt.fromWorkingColorSpace(kt.copy(this),e);const t=kt.r,n=kt.g,s=kt.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(vi),this.setHSL(vi.h+e,vi.s+t,vi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(vi),e.getHSL(Kr);const n=_r(vi.h,Kr.h,t),s=_r(vi.s,Kr.s,t),r=_r(vi.l,Kr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const kt=new Ie;Ie.NAMES=Sd;let qp=0;class Rn extends ts{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qp++}),this.uuid=An(),this.name="",this.blending=Cs,this.side=li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=cc,this.blendDst=lc,this.blendEquation=qi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ie(0,0,0),this.blendAlpha=0,this.depthFunc=Us,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=th,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=as,this.stencilZFail=as,this.stencilZPass=as,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Cs&&(n.blending=this.blending),this.side!==li&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==cc&&(n.blendSrc=this.blendSrc),this.blendDst!==lc&&(n.blendDst=this.blendDst),this.blendEquation!==qi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Us&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==th&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==as&&(n.stencilFail=this.stencilFail),this.stencilZFail!==as&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==as&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ri extends Rn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.combine=Qu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ni=jp();function jp(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let c=0;c<256;++c){const l=c-127;l<-27?(n[c]=0,n[c|256]=32768,s[c]=24,s[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,s[c]=-l-1,s[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,s[c]=13,s[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,s[c]=24,s[c|256]=24):(n[c]=31744,n[c|256]=64512,s[c]=13,s[c|256]=13)}const r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;(l&8388608)===0;)l<<=1,h-=8388608;l&=-8388609,h+=947912704,r[c]=l|h}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:a,offsetTable:o}}function Yp(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=Tt(i,-65504,65504),ni.floatView[0]=i;const e=ni.uint32View[0],t=e>>23&511;return ni.baseTable[t]+((e&8388607)>>ni.shiftTable[t])}function Kp(i){const e=i>>10;return ni.uint32View[0]=ni.mantissaTable[ni.offsetTable[e]+(i&1023)]+ni.exponentTable[e],ni.floatView[0]}const Jr={toHalfFloat:Yp,fromHalfFloat:Kp},wt=new N,Zr=new fe;class Mt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Xc,this.updateRanges=[],this.gpuType=nn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Zr.fromBufferAttribute(this,t),Zr.applyMatrix3(e),this.setXY(t,Zr.x,Zr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ft(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array),r=ft(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Xc&&(e.usage=this.usage),e}}class _l extends Mt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ed extends Mt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class qe extends Mt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Jp=0;const dn=new He,Uo=new xt,gs=new N,cn=new Pn,nr=new Pn,It=new N;class mt extends ts{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jp++}),this.uuid=An(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(vd(e)?Ed:_l)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Je().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return dn.makeRotationFromQuaternion(e),this.applyMatrix4(dn),this}rotateX(e){return dn.makeRotationX(e),this.applyMatrix4(dn),this}rotateY(e){return dn.makeRotationY(e),this.applyMatrix4(dn),this}rotateZ(e){return dn.makeRotationZ(e),this.applyMatrix4(dn),this}translate(e,t,n){return dn.makeTranslation(e,t,n),this.applyMatrix4(dn),this}scale(e,t,n){return dn.makeScale(e,t,n),this.applyMatrix4(dn),this}lookAt(e){return Uo.lookAt(e),Uo.updateMatrix(),this.applyMatrix4(Uo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gs).negate(),this.translate(gs.x,gs.y,gs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new qe(n,3))}else{for(let n=0,s=t.count;n<s;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(It.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(It),It.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(It)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];nr.setFromBufferAttribute(o),this.morphTargetsRelative?(It.addVectors(cn.min,nr.min),cn.expandByPoint(It),It.addVectors(cn.max,nr.max),cn.expandByPoint(It)):(cn.expandByPoint(nr.min),cn.expandByPoint(nr.max))}cn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)It.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(It));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)It.fromBufferAttribute(o,l),c&&(gs.fromBufferAttribute(e,l),It.add(gs)),s=Math.max(s,n.distanceToSquared(It))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let A=0;A<n.count;A++)o[A]=new N,c[A]=new N;const l=new N,h=new N,d=new N,u=new fe,f=new fe,p=new fe,_=new N,g=new N;function m(A,M,y){l.fromBufferAttribute(n,A),h.fromBufferAttribute(n,M),d.fromBufferAttribute(n,y),u.fromBufferAttribute(r,A),f.fromBufferAttribute(r,M),p.fromBufferAttribute(r,y),h.sub(l),d.sub(l),f.sub(u),p.sub(u);const C=1/(f.x*p.y-p.x*f.y);isFinite(C)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(C),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(C),o[A].add(_),o[M].add(_),o[y].add(_),c[A].add(g),c[M].add(g),c[y].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let A=0,M=v.length;A<M;++A){const y=v[A],C=y.start,U=y.count;for(let w=C,P=C+U;w<P;w+=3)m(e.getX(w+0),e.getX(w+1),e.getX(w+2))}const x=new N,b=new N,E=new N,S=new N;function T(A){E.fromBufferAttribute(s,A),S.copy(E);const M=o[A];x.copy(M),x.sub(E.multiplyScalar(E.dot(M))).normalize(),b.crossVectors(S,M);const C=b.dot(c[A])<0?-1:1;a.setXYZW(A,x.x,x.y,x.z,C)}for(let A=0,M=v.length;A<M;++A){const y=v[A],C=y.start,U=y.count;for(let w=C,P=C+U;w<P;w+=3)T(e.getX(w+0)),T(e.getX(w+1)),T(e.getX(w+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Mt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new N,r=new N,a=new N,o=new N,c=new N,l=new N,h=new N,d=new N;if(e)for(let u=0,f=e.count;u<f;u+=3){const p=e.getX(u+0),_=e.getX(u+1),g=e.getX(u+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,p),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),o.add(h),c.add(h),l.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)It.fromBufferAttribute(e,t),It.normalize(),e.setXYZ(t,It.x,It.y,It.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h);let f=0,p=0;for(let _=0,g=c.length;_<g;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*h;for(let m=0;m<h;m++)u[p++]=l[f++]}return new Mt(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new mt,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=e(u,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],d=r[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const xh=new He,Oi=new Ur,Qr=new Gn,vh=new N,$r=new N,ea=new N,ta=new N,No=new N,na=new N,Mh=new N,ia=new N;class Ge extends xt{constructor(e=new mt,t=new ri){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){na.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],d=r[c];h!==0&&(No.fromBufferAttribute(d,e),a?na.addScaledVector(No,h):na.addScaledVector(No.sub(t),h))}t.add(na)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Qr.copy(n.boundingSphere),Qr.applyMatrix4(r),Oi.copy(e.ray).recast(e.near),!(Qr.containsPoint(Oi.origin)===!1&&(Oi.intersectSphere(Qr,vh)===null||Oi.origin.distanceToSquared(vh)>(e.far-e.near)**2))&&(xh.copy(r).invert(),Oi.copy(e.ray).applyMatrix4(xh),!(n.boundingBox!==null&&Oi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Oi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,_=u.length;p<_;p++){const g=u[p],m=a[g.materialIndex],v=Math.max(g.start,f.start),x=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let b=v,E=x;b<E;b+=3){const S=o.getX(b),T=o.getX(b+1),A=o.getX(b+2);s=sa(this,m,e,n,l,h,d,S,T,A),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const p=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const v=o.getX(g),x=o.getX(g+1),b=o.getX(g+2);s=sa(this,a,e,n,l,h,d,v,x,b),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let p=0,_=u.length;p<_;p++){const g=u[p],m=a[g.materialIndex],v=Math.max(g.start,f.start),x=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let b=v,E=x;b<E;b+=3){const S=b,T=b+1,A=b+2;s=sa(this,m,e,n,l,h,d,S,T,A),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const p=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){const v=g,x=g+1,b=g+2;s=sa(this,a,e,n,l,h,d,v,x,b),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function Zp(i,e,t,n,s,r,a,o){let c;if(e.side===Zt?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===li,o),c===null)return null;ia.copy(o),ia.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(ia);return l<t.near||l>t.far?null:{distance:l,point:ia.clone(),object:i}}function sa(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,$r),i.getVertexPosition(c,ea),i.getVertexPosition(l,ta);const h=Zp(i,e,t,n,$r,ea,ta,Mh);if(h){const d=new N;pn.getBarycoord(Mh,$r,ea,ta,d),s&&(h.uv=pn.getInterpolatedAttribute(s,o,c,l,d,new fe)),r&&(h.uv1=pn.getInterpolatedAttribute(r,o,c,l,d,new fe)),a&&(h.normal=pn.getInterpolatedAttribute(a,o,c,l,d,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new N,materialIndex:0};pn.getNormal($r,ea,ta,u.normal),h.face=u,h.barycoord=d}return h}class en extends mt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],d=[];let u=0,f=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,s,a,2),p("x","z","y",1,-1,e,n,-t,s,a,3),p("x","y","z",1,-1,e,t,n,s,r,4),p("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new qe(l,3)),this.setAttribute("normal",new qe(h,3)),this.setAttribute("uv",new qe(d,2));function p(_,g,m,v,x,b,E,S,T,A,M){const y=b/T,C=E/A,U=b/2,w=E/2,P=S/2,L=T+1,F=A+1;let W=0,O=0;const j=new N;for(let X=0;X<F;X++){const se=X*C-w;for(let pe=0;pe<L;pe++){const de=pe*y-U;j[_]=de*v,j[g]=se*x,j[m]=P,l.push(j.x,j.y,j.z),j[_]=0,j[g]=0,j[m]=S>0?1:-1,h.push(j.x,j.y,j.z),d.push(pe/T),d.push(1-X/A),W+=1}}for(let X=0;X<A;X++)for(let se=0;se<T;se++){const pe=u+se+L*X,de=u+se+L*(X+1),Q=u+(se+1)+L*(X+1),te=u+(se+1)+L*X;c.push(pe,de,te),c.push(de,Q,te),O+=6}o.addGroup(f,O,M),f+=O,u+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new en(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ks(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function qt(i){const e={};for(let t=0;t<i.length;t++){const n=ks(i[t]);for(const s in n)e[s]=n[s]}return e}function Qp(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function wd(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const Rr={clone:ks,merge:qt};var $p=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,em=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Dt extends Rn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$p,this.fragmentShader=em,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ks(e.uniforms),this.uniformsGroups=Qp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Td extends xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new He,this.projectionMatrix=new He,this.projectionMatrixInverse=new He,this.coordinateSystem=si}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Mi=new N,yh=new fe,Sh=new fe;class Yt extends Td{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Bs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(br*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Bs*2*Math.atan(Math.tan(br*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Mi.x,Mi.y).multiplyScalar(-e/Mi.z),Mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Mi.x,Mi.y).multiplyScalar(-e/Mi.z)}getViewSize(e,t){return this.getViewBounds(e,yh,Sh),t.subVectors(Sh,yh)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(br*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const bs=-90,_s=1;class tm extends xt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Yt(bs,_s,e,t);s.layers=this.layers,this.add(s);const r=new Yt(bs,_s,e,t);r.layers=this.layers,this.add(r);const a=new Yt(bs,_s,e,t);a.layers=this.layers,this.add(a);const o=new Yt(bs,_s,e,t);o.layers=this.layers,this.add(o);const c=new Yt(bs,_s,e,t);c.layers=this.layers,this.add(c);const l=new Yt(bs,_s,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===si)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ka)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Ad extends Rt{constructor(e,t,n,s,r,a,o,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:Ns,super(e,t,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class nm extends bn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Ad(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Lt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new en(5,5,5),r=new Dt({name:"CubemapFromEquirect",uniforms:ks(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Zt,blending:ai});r.uniforms.tEquirect.value=t;const a=new Ge(s,r),o=t.minFilter;return t.minFilter===kn&&(t.minFilter=Lt),new tm(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const Fo=new N,im=new N,sm=new Je;class Wi{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Fo.subVectors(n,t).cross(im.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Fo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||sm.getNormalMatrix(e),s=this.coplanarPoint(Fo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zi=new Gn,ra=new N;class xl{constructor(e=new Wi,t=new Wi,n=new Wi,s=new Wi,r=new Wi,a=new Wi){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=si){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],h=s[5],d=s[6],u=s[7],f=s[8],p=s[9],_=s[10],g=s[11],m=s[12],v=s[13],x=s[14],b=s[15];if(n[0].setComponents(c-r,u-l,g-f,b-m).normalize(),n[1].setComponents(c+r,u+l,g+f,b+m).normalize(),n[2].setComponents(c+a,u+h,g+p,b+v).normalize(),n[3].setComponents(c-a,u-h,g-p,b-v).normalize(),n[4].setComponents(c-o,u-d,g-_,b-x).normalize(),t===si)n[5].setComponents(c+o,u+d,g+_,b+x).normalize();else if(t===ka)n[5].setComponents(o,d,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),zi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),zi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(zi)}intersectsSprite(e){return zi.center.set(0,0,0),zi.radius=.7071067811865476,zi.applyMatrix4(e.matrixWorld),this.intersectsSphere(zi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(ra.x=s.normal.x>0?e.max.x:e.min.x,ra.y=s.normal.y>0?e.max.y:e.min.y,ra.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ra)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Rd(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function rm(i){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const h=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){const p=d[u],_=d[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){const _=d[f];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}class In extends mt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,d=e/o,u=t/c,f=[],p=[],_=[],g=[];for(let m=0;m<h;m++){const v=m*u-a;for(let x=0;x<l;x++){const b=x*d-r;p.push(b,-v,0),_.push(0,0,1),g.push(x/o),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let v=0;v<o;v++){const x=v+l*m,b=v+l*(m+1),E=v+1+l*(m+1),S=v+1+l*m;f.push(x,b,S),f.push(b,E,S)}this.setIndex(f),this.setAttribute("position",new qe(p,3)),this.setAttribute("normal",new qe(_,3)),this.setAttribute("uv",new qe(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new In(e.width,e.height,e.widthSegments,e.heightSegments)}}var am=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,om=`#ifdef USE_ALPHAHASH
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
#endif`,cm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,lm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,um=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,dm=`#ifdef USE_AOMAP
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
#endif`,fm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pm=`#ifdef USE_BATCHING
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
#endif`,mm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,gm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,bm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_m=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,xm=`#ifdef USE_IRIDESCENCE
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
#endif`,vm=`#ifdef USE_BUMPMAP
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
#endif`,Mm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ym=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Em=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Tm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Am=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Rm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Cm=`#define PI 3.141592653589793
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
} // validated`,Pm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Im=`vec3 transformedNormal = objectNormal;
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
#endif`,Lm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Dm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Um=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Nm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Fm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Om=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zm=`#ifdef USE_ENVMAP
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
#endif`,Bm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,km=`#ifdef USE_ENVMAP
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
#endif`,Hm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gm=`#ifdef USE_ENVMAP
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
#endif`,Vm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Wm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Xm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jm=`#ifdef USE_GRADIENTMAP
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
}`,Ym=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Km=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Jm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Zm=`uniform bool receiveShadow;
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
#endif`,Qm=`#ifdef USE_ENVMAP
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
#endif`,$m=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,e0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,t0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,n0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,i0=`PhysicalMaterial material;
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
#endif`,s0=`struct PhysicalMaterial {
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
}`,r0=`
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
#endif`,a0=`#if defined( RE_IndirectDiffuse )
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
#endif`,o0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,c0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,l0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,h0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,u0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,d0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,f0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,p0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,m0=`#if defined( USE_POINTS_UV )
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
#endif`,g0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,b0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,x0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,v0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,M0=`#ifdef USE_MORPHTARGETS
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
#endif`,y0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,S0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,E0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,w0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,T0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,A0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,R0=`#ifdef USE_NORMALMAP
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
#endif`,C0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,P0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,I0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,L0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,D0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,U0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,N0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,F0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,O0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,z0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,B0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,k0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,H0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,G0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,V0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,W0=`float getShadowMask() {
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
}`,X0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,q0=`#ifdef USE_SKINNING
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
#endif`,j0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Y0=`#ifdef USE_SKINNING
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
#endif`,K0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,J0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Z0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Q0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,$0=`#ifdef USE_TRANSMISSION
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
#endif`,eg=`#ifdef USE_TRANSMISSION
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
#endif`,tg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ng=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const rg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ag=`uniform sampler2D t2D;
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
}`,og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ug=`#include <common>
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
}`,dg=`#if DEPTH_PACKING == 3200
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
}`,fg=`#define DISTANCE
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
}`,pg=`#define DISTANCE
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
}`,mg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bg=`uniform float scale;
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
}`,_g=`uniform vec3 diffuse;
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
}`,xg=`#include <common>
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
}`,vg=`uniform vec3 diffuse;
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
}`,Mg=`#define LAMBERT
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
}`,yg=`#define LAMBERT
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
}`,Sg=`#define MATCAP
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
}`,Eg=`#define MATCAP
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
}`,wg=`#define NORMAL
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
}`,Tg=`#define NORMAL
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
}`,Ag=`#define PHONG
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
}`,Rg=`#define PHONG
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
}`,Cg=`#define STANDARD
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
}`,Pg=`#define STANDARD
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
}`,Ig=`#define TOON
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
}`,Lg=`#define TOON
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
}`,Dg=`uniform float size;
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
}`,Ug=`uniform vec3 diffuse;
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
}`,Ng=`#include <common>
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
}`,Fg=`uniform vec3 color;
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
}`,Og=`uniform float rotation;
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
}`,zg=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:am,alphahash_pars_fragment:om,alphamap_fragment:cm,alphamap_pars_fragment:lm,alphatest_fragment:hm,alphatest_pars_fragment:um,aomap_fragment:dm,aomap_pars_fragment:fm,batching_pars_vertex:pm,batching_vertex:mm,begin_vertex:gm,beginnormal_vertex:bm,bsdfs:_m,iridescence_fragment:xm,bumpmap_pars_fragment:vm,clipping_planes_fragment:Mm,clipping_planes_pars_fragment:ym,clipping_planes_pars_vertex:Sm,clipping_planes_vertex:Em,color_fragment:wm,color_pars_fragment:Tm,color_pars_vertex:Am,color_vertex:Rm,common:Cm,cube_uv_reflection_fragment:Pm,defaultnormal_vertex:Im,displacementmap_pars_vertex:Lm,displacementmap_vertex:Dm,emissivemap_fragment:Um,emissivemap_pars_fragment:Nm,colorspace_fragment:Fm,colorspace_pars_fragment:Om,envmap_fragment:zm,envmap_common_pars_fragment:Bm,envmap_pars_fragment:km,envmap_pars_vertex:Hm,envmap_physical_pars_fragment:Qm,envmap_vertex:Gm,fog_vertex:Vm,fog_pars_vertex:Wm,fog_fragment:Xm,fog_pars_fragment:qm,gradientmap_pars_fragment:jm,lightmap_pars_fragment:Ym,lights_lambert_fragment:Km,lights_lambert_pars_fragment:Jm,lights_pars_begin:Zm,lights_toon_fragment:$m,lights_toon_pars_fragment:e0,lights_phong_fragment:t0,lights_phong_pars_fragment:n0,lights_physical_fragment:i0,lights_physical_pars_fragment:s0,lights_fragment_begin:r0,lights_fragment_maps:a0,lights_fragment_end:o0,logdepthbuf_fragment:c0,logdepthbuf_pars_fragment:l0,logdepthbuf_pars_vertex:h0,logdepthbuf_vertex:u0,map_fragment:d0,map_pars_fragment:f0,map_particle_fragment:p0,map_particle_pars_fragment:m0,metalnessmap_fragment:g0,metalnessmap_pars_fragment:b0,morphinstance_vertex:_0,morphcolor_vertex:x0,morphnormal_vertex:v0,morphtarget_pars_vertex:M0,morphtarget_vertex:y0,normal_fragment_begin:S0,normal_fragment_maps:E0,normal_pars_fragment:w0,normal_pars_vertex:T0,normal_vertex:A0,normalmap_pars_fragment:R0,clearcoat_normal_fragment_begin:C0,clearcoat_normal_fragment_maps:P0,clearcoat_pars_fragment:I0,iridescence_pars_fragment:L0,opaque_fragment:D0,packing:U0,premultiplied_alpha_fragment:N0,project_vertex:F0,dithering_fragment:O0,dithering_pars_fragment:z0,roughnessmap_fragment:B0,roughnessmap_pars_fragment:k0,shadowmap_pars_fragment:H0,shadowmap_pars_vertex:G0,shadowmap_vertex:V0,shadowmask_pars_fragment:W0,skinbase_vertex:X0,skinning_pars_vertex:q0,skinning_vertex:j0,skinnormal_vertex:Y0,specularmap_fragment:K0,specularmap_pars_fragment:J0,tonemapping_fragment:Z0,tonemapping_pars_fragment:Q0,transmission_fragment:$0,transmission_pars_fragment:eg,uv_pars_fragment:tg,uv_pars_vertex:ng,uv_vertex:ig,worldpos_vertex:sg,background_vert:rg,background_frag:ag,backgroundCube_vert:og,backgroundCube_frag:cg,cube_vert:lg,cube_frag:hg,depth_vert:ug,depth_frag:dg,distanceRGBA_vert:fg,distanceRGBA_frag:pg,equirect_vert:mg,equirect_frag:gg,linedashed_vert:bg,linedashed_frag:_g,meshbasic_vert:xg,meshbasic_frag:vg,meshlambert_vert:Mg,meshlambert_frag:yg,meshmatcap_vert:Sg,meshmatcap_frag:Eg,meshnormal_vert:wg,meshnormal_frag:Tg,meshphong_vert:Ag,meshphong_frag:Rg,meshphysical_vert:Cg,meshphysical_frag:Pg,meshtoon_vert:Ig,meshtoon_frag:Lg,points_vert:Dg,points_frag:Ug,shadow_vert:Ng,shadow_frag:Fg,sprite_vert:Og,sprite_frag:zg},Se={common:{diffuse:{value:new Ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Je}},envmap:{envMap:{value:null},envMapRotation:{value:new Je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Je},normalScale:{value:new fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0},uvTransform:{value:new Je}},sprite:{diffuse:{value:new Ie(16777215)},opacity:{value:1},center:{value:new fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}}},On={basic:{uniforms:qt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:qt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Ie(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:qt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Ie(0)},specular:{value:new Ie(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:qt([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new Ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:qt([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new Ie(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:qt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:qt([Se.points,Se.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:qt([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:qt([Se.common,Se.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:qt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:qt([Se.sprite,Se.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Je}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:qt([Se.common,Se.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:qt([Se.lights,Se.fog,{color:{value:new Ie(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};On.physical={uniforms:qt([On.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Je},clearcoatNormalScale:{value:new fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Je},sheen:{value:0},sheenColor:{value:new Ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Je},transmissionSamplerSize:{value:new fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Je},attenuationDistance:{value:0},attenuationColor:{value:new Ie(0)},specularColor:{value:new Ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Je},anisotropyVector:{value:new fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Je}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const aa={r:0,b:0,g:0},Bi=new rn,Bg=new He;function kg(i,e,t,n,s,r,a){const o=new Ie(0);let c=r===!0?0:1,l,h,d=null,u=0,f=null;function p(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?t:e).get(x)),x}function _(v){let x=!1;const b=p(v);b===null?m(o,c):b&&b.isColor&&(m(b,1),x=!0);const E=i.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(v,x){const b=p(x);b&&(b.isCubeTexture||b.mapping===Ja)?(h===void 0&&(h=new Ge(new en(1,1,1),new Dt({name:"BackgroundCubeMaterial",uniforms:ks(On.backgroundCube.uniforms),vertexShader:On.backgroundCube.vertexShader,fragmentShader:On.backgroundCube.fragmentShader,side:Zt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,S,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Bi.copy(x.backgroundRotation),Bi.x*=-1,Bi.y*=-1,Bi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Bi.y*=-1,Bi.z*=-1),h.material.uniforms.envMap.value=b,h.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Bg.makeRotationFromEuler(Bi)),h.material.toneMapped=tt.getTransfer(b.colorSpace)!==dt,(d!==b||u!==b.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,d=b,u=b.version,f=i.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new Ge(new In(2,2),new Dt({name:"BackgroundMaterial",uniforms:ks(On.background.uniforms),vertexShader:On.background.vertexShader,fragmentShader:On.background.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=tt.getTransfer(b.colorSpace)!==dt,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||u!==b.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,d=b,u=b.version,f=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,x){v.getRGB(aa,wd(i)),n.buffers.color.setClear(aa.r,aa.g,aa.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(v,x=1){o.set(v),c=x,m(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,m(o,c)},render:_,addToRenderList:g}}function Hg(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(y,C,U,w,P){let L=!1;const F=d(w,U,C);r!==F&&(r=F,l(r.object)),L=f(y,w,U,P),L&&p(y,w,U,P),P!==null&&e.update(P,i.ELEMENT_ARRAY_BUFFER),(L||a)&&(a=!1,b(y,C,U,w),P!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(P).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function d(y,C,U){const w=U.wireframe===!0;let P=n[y.id];P===void 0&&(P={},n[y.id]=P);let L=P[C.id];L===void 0&&(L={},P[C.id]=L);let F=L[w];return F===void 0&&(F=u(c()),L[w]=F),F}function u(y){const C=[],U=[],w=[];for(let P=0;P<t;P++)C[P]=0,U[P]=0,w[P]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:U,attributeDivisors:w,object:y,attributes:{},index:null}}function f(y,C,U,w){const P=r.attributes,L=C.attributes;let F=0;const W=U.getAttributes();for(const O in W)if(W[O].location>=0){const X=P[O];let se=L[O];if(se===void 0&&(O==="instanceMatrix"&&y.instanceMatrix&&(se=y.instanceMatrix),O==="instanceColor"&&y.instanceColor&&(se=y.instanceColor)),X===void 0||X.attribute!==se||se&&X.data!==se.data)return!0;F++}return r.attributesNum!==F||r.index!==w}function p(y,C,U,w){const P={},L=C.attributes;let F=0;const W=U.getAttributes();for(const O in W)if(W[O].location>=0){let X=L[O];X===void 0&&(O==="instanceMatrix"&&y.instanceMatrix&&(X=y.instanceMatrix),O==="instanceColor"&&y.instanceColor&&(X=y.instanceColor));const se={};se.attribute=X,X&&X.data&&(se.data=X.data),P[O]=se,F++}r.attributes=P,r.attributesNum=F,r.index=w}function _(){const y=r.newAttributes;for(let C=0,U=y.length;C<U;C++)y[C]=0}function g(y){m(y,0)}function m(y,C){const U=r.newAttributes,w=r.enabledAttributes,P=r.attributeDivisors;U[y]=1,w[y]===0&&(i.enableVertexAttribArray(y),w[y]=1),P[y]!==C&&(i.vertexAttribDivisor(y,C),P[y]=C)}function v(){const y=r.newAttributes,C=r.enabledAttributes;for(let U=0,w=C.length;U<w;U++)C[U]!==y[U]&&(i.disableVertexAttribArray(U),C[U]=0)}function x(y,C,U,w,P,L,F){F===!0?i.vertexAttribIPointer(y,C,U,P,L):i.vertexAttribPointer(y,C,U,w,P,L)}function b(y,C,U,w){_();const P=w.attributes,L=U.getAttributes(),F=C.defaultAttributeValues;for(const W in L){const O=L[W];if(O.location>=0){let j=P[W];if(j===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(j=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(j=y.instanceColor)),j!==void 0){const X=j.normalized,se=j.itemSize,pe=e.get(j);if(pe===void 0)continue;const de=pe.buffer,Q=pe.type,te=pe.bytesPerElement,Ee=Q===i.INT||Q===i.UNSIGNED_INT||j.gpuType===cl;if(j.isInterleavedBufferAttribute){const xe=j.data,he=xe.stride,Te=j.offset;if(xe.isInstancedInterleavedBuffer){for(let We=0;We<O.locationSize;We++)m(O.location+We,xe.meshPerAttribute);y.isInstancedMesh!==!0&&w._maxInstanceCount===void 0&&(w._maxInstanceCount=xe.meshPerAttribute*xe.count)}else for(let We=0;We<O.locationSize;We++)g(O.location+We);i.bindBuffer(i.ARRAY_BUFFER,de);for(let We=0;We<O.locationSize;We++)x(O.location+We,se/O.locationSize,Q,X,he*te,(Te+se/O.locationSize*We)*te,Ee)}else{if(j.isInstancedBufferAttribute){for(let xe=0;xe<O.locationSize;xe++)m(O.location+xe,j.meshPerAttribute);y.isInstancedMesh!==!0&&w._maxInstanceCount===void 0&&(w._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let xe=0;xe<O.locationSize;xe++)g(O.location+xe);i.bindBuffer(i.ARRAY_BUFFER,de);for(let xe=0;xe<O.locationSize;xe++)x(O.location+xe,se/O.locationSize,Q,X,se*te,se/O.locationSize*xe*te,Ee)}}else if(F!==void 0){const X=F[W];if(X!==void 0)switch(X.length){case 2:i.vertexAttrib2fv(O.location,X);break;case 3:i.vertexAttrib3fv(O.location,X);break;case 4:i.vertexAttrib4fv(O.location,X);break;default:i.vertexAttrib1fv(O.location,X)}}}}v()}function E(){A();for(const y in n){const C=n[y];for(const U in C){const w=C[U];for(const P in w)h(w[P].object),delete w[P];delete C[U]}delete n[y]}}function S(y){if(n[y.id]===void 0)return;const C=n[y.id];for(const U in C){const w=C[U];for(const P in w)h(w[P].object),delete w[P];delete C[U]}delete n[y.id]}function T(y){for(const C in n){const U=n[C];if(U[y.id]===void 0)continue;const w=U[y.id];for(const P in w)h(w[P].object),delete w[P];delete U[y.id]}}function A(){M(),a=!0,r!==s&&(r=s,l(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:M,dispose:E,releaseStatesOfGeometry:S,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:g,disableUnusedAttributes:v}}function Gg(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function a(l,h,d){d!==0&&(i.drawArraysInstanced(n,l,h,d),t.update(h,n,d))}function o(l,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let f=0;for(let p=0;p<d;p++)f+=h[p];t.update(f,n,1)}function c(l,h,d,u){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<l.length;p++)a(l[p],h[p],u[p]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,d);let p=0;for(let _=0;_<d;_++)p+=h[_]*u[_];t.update(p,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Vg(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(T){return!(T!==mn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const A=T===sn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==hi&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==nn&&!A)}function c(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=t.logarithmicDepthBuffer===!0,u=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),x=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=p>0,S=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:v,maxVaryings:x,maxFragmentUniforms:b,vertexTextures:E,maxSamples:S}}function Wg(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Wi,o=new Je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const p=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,m=i.get(d);if(!s||p===null||p.length===0||r&&!g)r?h(null):l();else{const v=r?0:n,x=v*4;let b=m.clippingState||null;c.value=b,b=h(p,u,x,f);for(let E=0;E!==x;++E)b[E]=t[E];m.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,p){const _=d!==null?d.length:0;let g=null;if(_!==0){if(g=c.value,p!==!0||g===null){const m=f+_*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<m)&&(g=new Float32Array(m));for(let x=0,b=f;x!==_;++x,b+=4)a.copy(d[x]).applyMatrix4(v,o),a.normal.toArray(g,b),g[b+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function Xg(i){let e=new WeakMap;function t(a,o){return o===Oa?a.mapping=Ns:o===bc&&(a.mapping=Fs),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Oa||o===bc)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new nm(c.height);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Qa extends Td{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Rs=4,Eh=[.125,.215,.35,.446,.526,.582],ji=20,Oo=new Qa,wh=new Ie;let zo=null,Bo=0,ko=0,Ho=!1;const Xi=(1+Math.sqrt(5))/2,xs=1/Xi,Th=[new N(-Xi,xs,0),new N(Xi,xs,0),new N(-xs,0,Xi),new N(xs,0,Xi),new N(0,Xi,-xs),new N(0,Xi,xs),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class qc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){zo=this._renderer.getRenderTarget(),Bo=this._renderer.getActiveCubeFace(),ko=this._renderer.getActiveMipmapLevel(),Ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ch(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(zo,Bo,ko),this._renderer.xr.enabled=Ho,e.scissorTest=!1,oa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ns||e.mapping===Fs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),zo=this._renderer.getRenderTarget(),Bo=this._renderer.getActiveCubeFace(),ko=this._renderer.getActiveMipmapLevel(),Ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Lt,minFilter:Lt,generateMipmaps:!1,type:sn,format:mn,colorSpace:Wt,depthBuffer:!1},s=Ah(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ah(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=qg(r)),this._blurMaterial=jg(r,e,t)}return s}_compileMaterial(e){const t=new Ge(this._lodPlanes[0],e);this._renderer.compile(t,Oo)}_sceneToCubeUV(e,t,n,s){const o=new Yt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(wh),h.toneMapping=Ci,h.autoClear=!1;const f=new ri({name:"PMREM.Background",side:Zt,depthWrite:!1,depthTest:!1}),p=new Ge(new en,f);let _=!1;const g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,_=!0):(f.color.copy(wh),_=!0);for(let m=0;m<6;m++){const v=m%3;v===0?(o.up.set(0,c[m],0),o.lookAt(l[m],0,0)):v===1?(o.up.set(0,0,c[m]),o.lookAt(0,l[m],0)):(o.up.set(0,c[m],0),o.lookAt(0,0,l[m]));const x=this._cubeSize;oa(s,v*x,m>2?x:0,x,x),h.setRenderTarget(s),_&&h.render(p,o),h.render(e,o)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=u,h.autoClear=d,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Ns||e.mapping===Fs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ch()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ge(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;oa(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Oo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Th[(s-r-1)%Th.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Ge(this._lodPlanes[s],l),u=l.uniforms,f=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ji-1),_=r/p,g=isFinite(r)?1+Math.floor(h*_):ji;g>ji&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${ji}`);const m=[];let v=0;for(let T=0;T<ji;++T){const A=T/_,M=Math.exp(-A*A/2);m.push(M),T===0?v+=M:T<g&&(v+=2*M)}for(let T=0;T<m.length;T++)m[T]=m[T]/v;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=m,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:x}=this;u.dTheta.value=p,u.mipInt.value=x-n;const b=this._sizeLods[s],E=3*b*(s>x-Rs?s-x+Rs:0),S=4*(this._cubeSize-b);oa(t,E,S,3*b,2*b),c.setRenderTarget(t),c.render(d,Oo)}}function qg(i){const e=[],t=[],n=[];let s=i;const r=i-Rs+1+Eh.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>i-Rs?c=Eh[a-i+Rs-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,p=6,_=3,g=2,m=1,v=new Float32Array(_*p*f),x=new Float32Array(g*p*f),b=new Float32Array(m*p*f);for(let S=0;S<f;S++){const T=S%3*2/3-1,A=S>2?0:-1,M=[T,A,0,T+2/3,A,0,T+2/3,A+1,0,T,A,0,T+2/3,A+1,0,T,A+1,0];v.set(M,_*p*S),x.set(u,g*p*S);const y=[S,S,S,S,S,S];b.set(y,m*p*S)}const E=new mt;E.setAttribute("position",new Mt(v,_)),E.setAttribute("uv",new Mt(x,g)),E.setAttribute("faceIndex",new Mt(b,m)),e.push(E),s>Rs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ah(i,e,t){const n=new bn(i,e,t);return n.texture.mapping=Ja,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function oa(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function jg(i,e,t){const n=new Float32Array(ji),s=new N(0,1,0);return new Dt({name:"SphericalGaussianBlur",defines:{n:ji,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:vl(),fragmentShader:`

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
		`,blending:ai,depthTest:!1,depthWrite:!1})}function Rh(){return new Dt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vl(),fragmentShader:`

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
		`,blending:ai,depthTest:!1,depthWrite:!1})}function Ch(){return new Dt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function vl(){return`

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
	`}function Yg(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===Oa||c===bc,h=c===Ns||c===Fs;if(l||h){let d=e.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new qc(i)),d=l?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return l&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new qc(i)),d=l?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Kg(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&pr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Jg(i,e,t,n){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const p in u.attributes)e.remove(u.attributes[p]);for(const p in u.morphAttributes){const _=u.morphAttributes[p];for(let g=0,m=_.length;g<m;g++)e.remove(_[g])}u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function c(d){const u=d.attributes;for(const p in u)e.update(u[p],i.ARRAY_BUFFER);const f=d.morphAttributes;for(const p in f){const _=f[p];for(let g=0,m=_.length;g<m;g++)e.update(_[g],i.ARRAY_BUFFER)}}function l(d){const u=[],f=d.index,p=d.attributes.position;let _=0;if(f!==null){const v=f.array;_=f.version;for(let x=0,b=v.length;x<b;x+=3){const E=v[x+0],S=v[x+1],T=v[x+2];u.push(E,S,S,T,T,E)}}else if(p!==void 0){const v=p.array;_=p.version;for(let x=0,b=v.length/3-1;x<b;x+=3){const E=x+0,S=x+1,T=x+2;u.push(E,S,S,T,T,E)}}else return;const g=new(vd(u)?Ed:_l)(u,1);g.version=_;const m=r.get(d);m&&e.remove(m),r.set(d,g)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function Zg(i,e,t){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,f){i.drawElements(n,f,r,u*a),t.update(f,n,1)}function l(u,f,p){p!==0&&(i.drawElementsInstanced(n,f,r,u*a,p),t.update(f,n,p))}function h(u,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,p);let g=0;for(let m=0;m<p;m++)g+=f[m];t.update(g,n,1)}function d(u,f,p,_){if(p===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<u.length;m++)l(u[m]/a,f[m],_[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,_,0,p);let m=0;for(let v=0;v<p;v++)m+=f[v]*_[v];t.update(m,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Qg(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function $g(i,e,t){const n=new WeakMap,s=new at;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let M=function(){T.dispose(),n.delete(o),o.removeEventListener("dispose",M)};u!==void 0&&u.texture.dispose();const f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let x=0;f===!0&&(x=1),p===!0&&(x=2),_===!0&&(x=3);let b=o.attributes.position.count*x,E=1;b>e.maxTextureSize&&(E=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const S=new Float32Array(b*E*4*d),T=new yd(S,b,E,d);T.type=nn,T.needsUpdate=!0;const A=x*4;for(let y=0;y<d;y++){const C=g[y],U=m[y],w=v[y],P=b*E*4*y;for(let L=0;L<C.count;L++){const F=L*A;f===!0&&(s.fromBufferAttribute(C,L),S[P+F+0]=s.x,S[P+F+1]=s.y,S[P+F+2]=s.z,S[P+F+3]=0),p===!0&&(s.fromBufferAttribute(U,L),S[P+F+4]=s.x,S[P+F+5]=s.y,S[P+F+6]=s.z,S[P+F+7]=0),_===!0&&(s.fromBufferAttribute(w,L),S[P+F+8]=s.x,S[P+F+9]=s.y,S[P+F+10]=s.z,S[P+F+11]=w.itemSize===4?s.w:1)}}u={count:d,texture:T,size:new fe(b,E)},n.set(o,u),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];const p=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",p),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function eb(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,d=e.get(c,h);if(s.get(d)!==l&&(e.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;s.get(u)!==l&&(u.update(),s.set(u,l))}return d}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}class Cd extends Rt{constructor(e,t,n,s,r,a,o,c,l,h=Ps){if(h!==Ps&&h!==zs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ps&&(n=Qi),n===void 0&&h===zs&&(n=Os),super(null,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Qt,this.minFilter=c!==void 0?c:Qt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Pd=new Rt,Ph=new Cd(1,1),Id=new yd,Ld=new zp,Dd=new Ad,Ih=[],Lh=[],Dh=new Float32Array(16),Uh=new Float32Array(9),Nh=new Float32Array(4);function Xs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Ih[s];if(r===void 0&&(r=new Float32Array(s),Ih[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Ct(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Pt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function $a(i,e){let t=Lh[e];t===void 0&&(t=new Int32Array(e),Lh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function tb(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function nb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;i.uniform2fv(this.addr,e),Pt(t,e)}}function ib(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ct(t,e))return;i.uniform3fv(this.addr,e),Pt(t,e)}}function sb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;i.uniform4fv(this.addr,e),Pt(t,e)}}function rb(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,n))return;Nh.set(n),i.uniformMatrix2fv(this.addr,!1,Nh),Pt(t,n)}}function ab(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,n))return;Uh.set(n),i.uniformMatrix3fv(this.addr,!1,Uh),Pt(t,n)}}function ob(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,n))return;Dh.set(n),i.uniformMatrix4fv(this.addr,!1,Dh),Pt(t,n)}}function cb(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function lb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;i.uniform2iv(this.addr,e),Pt(t,e)}}function hb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;i.uniform3iv(this.addr,e),Pt(t,e)}}function ub(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;i.uniform4iv(this.addr,e),Pt(t,e)}}function db(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function fb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;i.uniform2uiv(this.addr,e),Pt(t,e)}}function pb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;i.uniform3uiv(this.addr,e),Pt(t,e)}}function mb(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;i.uniform4uiv(this.addr,e),Pt(t,e)}}function gb(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ph.compareFunction=xd,r=Ph):r=Pd,t.setTexture2D(e||r,s)}function bb(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Ld,s)}function _b(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Dd,s)}function xb(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Id,s)}function vb(i){switch(i){case 5126:return tb;case 35664:return nb;case 35665:return ib;case 35666:return sb;case 35674:return rb;case 35675:return ab;case 35676:return ob;case 5124:case 35670:return cb;case 35667:case 35671:return lb;case 35668:case 35672:return hb;case 35669:case 35673:return ub;case 5125:return db;case 36294:return fb;case 36295:return pb;case 36296:return mb;case 35678:case 36198:case 36298:case 36306:case 35682:return gb;case 35679:case 36299:case 36307:return bb;case 35680:case 36300:case 36308:case 36293:return _b;case 36289:case 36303:case 36311:case 36292:return xb}}function Mb(i,e){i.uniform1fv(this.addr,e)}function yb(i,e){const t=Xs(e,this.size,2);i.uniform2fv(this.addr,t)}function Sb(i,e){const t=Xs(e,this.size,3);i.uniform3fv(this.addr,t)}function Eb(i,e){const t=Xs(e,this.size,4);i.uniform4fv(this.addr,t)}function wb(i,e){const t=Xs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Tb(i,e){const t=Xs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Ab(i,e){const t=Xs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Rb(i,e){i.uniform1iv(this.addr,e)}function Cb(i,e){i.uniform2iv(this.addr,e)}function Pb(i,e){i.uniform3iv(this.addr,e)}function Ib(i,e){i.uniform4iv(this.addr,e)}function Lb(i,e){i.uniform1uiv(this.addr,e)}function Db(i,e){i.uniform2uiv(this.addr,e)}function Ub(i,e){i.uniform3uiv(this.addr,e)}function Nb(i,e){i.uniform4uiv(this.addr,e)}function Fb(i,e,t){const n=this.cache,s=e.length,r=$a(t,s);Ct(n,r)||(i.uniform1iv(this.addr,r),Pt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Pd,r[a])}function Ob(i,e,t){const n=this.cache,s=e.length,r=$a(t,s);Ct(n,r)||(i.uniform1iv(this.addr,r),Pt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Ld,r[a])}function zb(i,e,t){const n=this.cache,s=e.length,r=$a(t,s);Ct(n,r)||(i.uniform1iv(this.addr,r),Pt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Dd,r[a])}function Bb(i,e,t){const n=this.cache,s=e.length,r=$a(t,s);Ct(n,r)||(i.uniform1iv(this.addr,r),Pt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Id,r[a])}function kb(i){switch(i){case 5126:return Mb;case 35664:return yb;case 35665:return Sb;case 35666:return Eb;case 35674:return wb;case 35675:return Tb;case 35676:return Ab;case 5124:case 35670:return Rb;case 35667:case 35671:return Cb;case 35668:case 35672:return Pb;case 35669:case 35673:return Ib;case 5125:return Lb;case 36294:return Db;case 36295:return Ub;case 36296:return Nb;case 35678:case 36198:case 36298:case 36306:case 35682:return Fb;case 35679:case 36299:case 36307:return Ob;case 35680:case 36300:case 36308:case 36293:return zb;case 36289:case 36303:case 36311:case 36292:return Bb}}class Hb{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=vb(t.type)}}class Gb{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=kb(t.type)}}class Vb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Go=/(\w+)(\])?(\[|\.)?/g;function Fh(i,e){i.seq.push(e),i.map[e.id]=e}function Wb(i,e,t){const n=i.name,s=n.length;for(Go.lastIndex=0;;){const r=Go.exec(n),a=Go.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Fh(t,l===void 0?new Hb(o,i,e):new Gb(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Vb(o),Fh(t,d)),t=d}}}class Ia{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Wb(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Oh(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Xb=37297;let qb=0;function jb(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const zh=new Je;function Yb(i){tt._getMatrix(zh,tt.workingColorSpace,i);const e=`mat3( ${zh.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(i)){case Za:return[e,"LinearTransferOETF"];case dt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Bh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+jb(i.getShaderSource(e),a)}else return s}function Kb(i,e){const t=Yb(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Jb(i,e){let t;switch(e){case $u:t="Linear";break;case ed:t="Reinhard";break;case td:t="Cineon";break;case ol:t="ACESFilmic";break;case nd:t="AgX";break;case id:t="Neutral";break;case $f:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ca=new N;function Zb(){tt.getLuminanceCoefficients(ca);const i=ca.x.toFixed(4),e=ca.y.toFixed(4),t=ca.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Qb(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(mr).join(`
`)}function $b(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function e_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function mr(i){return i!==""}function kh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const t_=/^[ \t]*#include +<([\w\d./]+)>/gm;function jc(i){return i.replace(t_,i_)}const n_=new Map;function i_(i,e){let t=Ze[e];if(t===void 0){const n=n_.get(e);if(n!==void 0)t=Ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return jc(t)}const s_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gh(i){return i.replace(s_,r_)}function r_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Vh(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function a_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ju?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Zu?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Qn&&(e="SHADOWMAP_TYPE_VSM"),e}function o_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ns:case Fs:e="ENVMAP_TYPE_CUBE";break;case Ja:e="ENVMAP_TYPE_CUBE_UV";break}return e}function c_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Fs:e="ENVMAP_MODE_REFRACTION";break}return e}function l_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Qu:e="ENVMAP_BLENDING_MULTIPLY";break;case Zf:e="ENVMAP_BLENDING_MIX";break;case Qf:e="ENVMAP_BLENDING_ADD";break}return e}function h_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function u_(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=a_(t),l=o_(t),h=c_(t),d=l_(t),u=h_(t),f=Qb(t),p=$b(r),_=s.createProgram();let g,m,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(mr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(mr).join(`
`),m.length>0&&(m+=`
`)):(g=[Vh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(mr).join(`
`),m=[Vh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ci?"#define TONE_MAPPING":"",t.toneMapping!==Ci?Ze.tonemapping_pars_fragment:"",t.toneMapping!==Ci?Jb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,Kb("linearToOutputTexel",t.outputColorSpace),Zb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(mr).join(`
`)),a=jc(a),a=kh(a,t),a=Hh(a,t),o=jc(o),o=kh(o,t),o=Hh(o,t),a=Gh(a),o=Gh(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===nh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===nh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=v+g+a,b=v+m+o,E=Oh(s,s.VERTEX_SHADER,x),S=Oh(s,s.FRAGMENT_SHADER,b);s.attachShader(_,E),s.attachShader(_,S),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function T(C){if(i.debug.checkShaderErrors){const U=s.getProgramInfoLog(_).trim(),w=s.getShaderInfoLog(E).trim(),P=s.getShaderInfoLog(S).trim();let L=!0,F=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(L=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,E,S);else{const W=Bh(s,E,"vertex"),O=Bh(s,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+U+`
`+W+`
`+O)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(w===""||P==="")&&(F=!1);F&&(C.diagnostics={runnable:L,programLog:U,vertexShader:{log:w,prefix:g},fragmentShader:{log:P,prefix:m}})}s.deleteShader(E),s.deleteShader(S),A=new Ia(s,_),M=e_(s,_)}let A;this.getUniforms=function(){return A===void 0&&T(this),A};let M;this.getAttributes=function(){return M===void 0&&T(this),M};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(_,Xb)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=qb++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=S,this}let d_=0;class f_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new p_(e),t.set(e,n)),n}}class p_{constructor(e){this.id=d_++,this.code=e,this.usedTimes=0}}function m_(i,e,t,n,s,r,a){const o=new bl,c=new f_,l=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.vertexTextures;let f=s.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return l.add(M),M===0?"uv":`uv${M}`}function g(M,y,C,U,w){const P=U.fog,L=w.geometry,F=M.isMeshStandardMaterial?U.environment:null,W=(M.isMeshStandardMaterial?t:e).get(M.envMap||F),O=W&&W.mapping===Ja?W.image.height:null,j=p[M.type];M.precision!==null&&(f=s.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const X=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,se=X!==void 0?X.length:0;let pe=0;L.morphAttributes.position!==void 0&&(pe=1),L.morphAttributes.normal!==void 0&&(pe=2),L.morphAttributes.color!==void 0&&(pe=3);let de,Q,te,Ee;if(j){const ut=On[j];de=ut.vertexShader,Q=ut.fragmentShader}else de=M.vertexShader,Q=M.fragmentShader,c.update(M),te=c.getVertexShaderID(M),Ee=c.getFragmentShaderID(M);const xe=i.getRenderTarget(),he=i.state.buffers.depth.getReversed(),Te=w.isInstancedMesh===!0,We=w.isBatchedMesh===!0,$e=!!M.map,k=!!M.matcap,ne=!!W,z=!!M.aoMap,be=!!M.lightMap,_e=!!M.bumpMap,Ue=!!M.normalMap,we=!!M.displacementMap,Ve=!!M.emissiveMap,Le=!!M.metalnessMap,D=!!M.roughnessMap,R=M.anisotropy>0,q=M.clearcoat>0,re=M.dispersion>0,ce=M.iridescence>0,ie=M.sheen>0,B=M.transmission>0,K=R&&!!M.anisotropyMap,oe=q&&!!M.clearcoatMap,ve=q&&!!M.clearcoatNormalMap,$=q&&!!M.clearcoatRoughnessMap,me=ce&&!!M.iridescenceMap,Y=ce&&!!M.iridescenceThicknessMap,le=ie&&!!M.sheenColorMap,ue=ie&&!!M.sheenRoughnessMap,De=!!M.specularMap,ze=!!M.specularColorMap,st=!!M.specularIntensityMap,H=B&&!!M.transmissionMap,ye=B&&!!M.thicknessMap,ee=!!M.gradientMap,ae=!!M.alphaMap,Pe=M.alphaTest>0,Ae=!!M.alphaHash,je=!!M.extensions;let St=Ci;M.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(St=i.toneMapping);const zt={shaderID:j,shaderType:M.type,shaderName:M.name,vertexShader:de,fragmentShader:Q,defines:M.defines,customVertexShaderID:te,customFragmentShaderID:Ee,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:We,batchingColor:We&&w._colorsTexture!==null,instancing:Te,instancingColor:Te&&w.instanceColor!==null,instancingMorph:Te&&w.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:xe===null?i.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:Wt,alphaToCoverage:!!M.alphaToCoverage,map:$e,matcap:k,envMap:ne,envMapMode:ne&&W.mapping,envMapCubeUVHeight:O,aoMap:z,lightMap:be,bumpMap:_e,normalMap:Ue,displacementMap:u&&we,emissiveMap:Ve,normalMapObjectSpace:Ue&&M.normalMapType===ap,normalMapTangentSpace:Ue&&M.normalMapType===_d,metalnessMap:Le,roughnessMap:D,anisotropy:R,anisotropyMap:K,clearcoat:q,clearcoatMap:oe,clearcoatNormalMap:ve,clearcoatRoughnessMap:$,dispersion:re,iridescence:ce,iridescenceMap:me,iridescenceThicknessMap:Y,sheen:ie,sheenColorMap:le,sheenRoughnessMap:ue,specularMap:De,specularColorMap:ze,specularIntensityMap:st,transmission:B,transmissionMap:H,thicknessMap:ye,gradientMap:ee,opaque:M.transparent===!1&&M.blending===Cs&&M.alphaToCoverage===!1,alphaMap:ae,alphaTest:Pe,alphaHash:Ae,combine:M.combine,mapUv:$e&&_(M.map.channel),aoMapUv:z&&_(M.aoMap.channel),lightMapUv:be&&_(M.lightMap.channel),bumpMapUv:_e&&_(M.bumpMap.channel),normalMapUv:Ue&&_(M.normalMap.channel),displacementMapUv:we&&_(M.displacementMap.channel),emissiveMapUv:Ve&&_(M.emissiveMap.channel),metalnessMapUv:Le&&_(M.metalnessMap.channel),roughnessMapUv:D&&_(M.roughnessMap.channel),anisotropyMapUv:K&&_(M.anisotropyMap.channel),clearcoatMapUv:oe&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:ve&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Y&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:le&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:ue&&_(M.sheenRoughnessMap.channel),specularMapUv:De&&_(M.specularMap.channel),specularColorMapUv:ze&&_(M.specularColorMap.channel),specularIntensityMapUv:st&&_(M.specularIntensityMap.channel),transmissionMapUv:H&&_(M.transmissionMap.channel),thicknessMapUv:ye&&_(M.thicknessMap.channel),alphaMapUv:ae&&_(M.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(Ue||R),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:w.isPoints===!0&&!!L.attributes.uv&&($e||ae),fog:!!P,useFog:M.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:he,skinning:w.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:se,morphTextureStride:pe,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:St,decodeVideoTexture:$e&&M.map.isVideoTexture===!0&&tt.getTransfer(M.map.colorSpace)===dt,decodeVideoTextureEmissive:Ve&&M.emissiveMap.isVideoTexture===!0&&tt.getTransfer(M.emissiveMap.colorSpace)===dt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Et,flipSided:M.side===Zt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:je&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(je&&M.extensions.multiDraw===!0||We)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return zt.vertexUv1s=l.has(1),zt.vertexUv2s=l.has(2),zt.vertexUv3s=l.has(3),l.clear(),zt}function m(M){const y=[];if(M.shaderID?y.push(M.shaderID):(y.push(M.customVertexShaderID),y.push(M.customFragmentShaderID)),M.defines!==void 0)for(const C in M.defines)y.push(C),y.push(M.defines[C]);return M.isRawShaderMaterial===!1&&(v(y,M),x(y,M),y.push(i.outputColorSpace)),y.push(M.customProgramCacheKey),y.join()}function v(M,y){M.push(y.precision),M.push(y.outputColorSpace),M.push(y.envMapMode),M.push(y.envMapCubeUVHeight),M.push(y.mapUv),M.push(y.alphaMapUv),M.push(y.lightMapUv),M.push(y.aoMapUv),M.push(y.bumpMapUv),M.push(y.normalMapUv),M.push(y.displacementMapUv),M.push(y.emissiveMapUv),M.push(y.metalnessMapUv),M.push(y.roughnessMapUv),M.push(y.anisotropyMapUv),M.push(y.clearcoatMapUv),M.push(y.clearcoatNormalMapUv),M.push(y.clearcoatRoughnessMapUv),M.push(y.iridescenceMapUv),M.push(y.iridescenceThicknessMapUv),M.push(y.sheenColorMapUv),M.push(y.sheenRoughnessMapUv),M.push(y.specularMapUv),M.push(y.specularColorMapUv),M.push(y.specularIntensityMapUv),M.push(y.transmissionMapUv),M.push(y.thicknessMapUv),M.push(y.combine),M.push(y.fogExp2),M.push(y.sizeAttenuation),M.push(y.morphTargetsCount),M.push(y.morphAttributeCount),M.push(y.numDirLights),M.push(y.numPointLights),M.push(y.numSpotLights),M.push(y.numSpotLightMaps),M.push(y.numHemiLights),M.push(y.numRectAreaLights),M.push(y.numDirLightShadows),M.push(y.numPointLightShadows),M.push(y.numSpotLightShadows),M.push(y.numSpotLightShadowsWithMaps),M.push(y.numLightProbes),M.push(y.shadowMapType),M.push(y.toneMapping),M.push(y.numClippingPlanes),M.push(y.numClipIntersection),M.push(y.depthPacking)}function x(M,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),M.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),M.push(o.mask)}function b(M){const y=p[M.type];let C;if(y){const U=On[y];C=Rr.clone(U.uniforms)}else C=M.uniforms;return C}function E(M,y){let C;for(let U=0,w=h.length;U<w;U++){const P=h[U];if(P.cacheKey===y){C=P,++C.usedTimes;break}}return C===void 0&&(C=new u_(i,y,M,r),h.push(C)),C}function S(M){if(--M.usedTimes===0){const y=h.indexOf(M);h[y]=h[h.length-1],h.pop(),M.destroy()}}function T(M){c.remove(M)}function A(){c.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:b,acquireProgram:E,releaseProgram:S,releaseShaderCache:T,programs:h,dispose:A}}function g_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function b_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Wh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Xh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d,u,f,p,_,g){let m=i[e];return m===void 0?(m={id:d.id,object:d,geometry:u,material:f,groupOrder:p,renderOrder:d.renderOrder,z:_,group:g},i[e]=m):(m.id=d.id,m.object=d,m.geometry=u,m.material=f,m.groupOrder=p,m.renderOrder=d.renderOrder,m.z=_,m.group=g),e++,m}function o(d,u,f,p,_,g){const m=a(d,u,f,p,_,g);f.transmission>0?n.push(m):f.transparent===!0?s.push(m):t.push(m)}function c(d,u,f,p,_,g){const m=a(d,u,f,p,_,g);f.transmission>0?n.unshift(m):f.transparent===!0?s.unshift(m):t.unshift(m)}function l(d,u){t.length>1&&t.sort(d||b_),n.length>1&&n.sort(u||Wh),s.length>1&&s.sort(u||Wh)}function h(){for(let d=e,u=i.length;d<u;d++){const f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function __(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Xh,i.set(n,[a])):s>=r.length?(a=new Xh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function x_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new Ie};break;case"SpotLight":t={position:new N,direction:new N,color:new Ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new Ie,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new Ie,groundColor:new Ie};break;case"RectAreaLight":t={color:new Ie,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function v_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let M_=0;function y_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function S_(i){const e=new x_,t=v_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);const s=new N,r=new He,a=new He;function o(l){let h=0,d=0,u=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,p=0,_=0,g=0,m=0,v=0,x=0,b=0,E=0,S=0,T=0;l.sort(y_);for(let M=0,y=l.length;M<y;M++){const C=l[M],U=C.color,w=C.intensity,P=C.distance,L=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=U.r*w,d+=U.g*w,u+=U.b*w;else if(C.isLightProbe){for(let F=0;F<9;F++)n.probe[F].addScaledVector(C.sh.coefficients[F],w);T++}else if(C.isDirectionalLight){const F=e.get(C);if(F.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const W=C.shadow,O=t.get(C);O.shadowIntensity=W.intensity,O.shadowBias=W.bias,O.shadowNormalBias=W.normalBias,O.shadowRadius=W.radius,O.shadowMapSize=W.mapSize,n.directionalShadow[f]=O,n.directionalShadowMap[f]=L,n.directionalShadowMatrix[f]=C.shadow.matrix,v++}n.directional[f]=F,f++}else if(C.isSpotLight){const F=e.get(C);F.position.setFromMatrixPosition(C.matrixWorld),F.color.copy(U).multiplyScalar(w),F.distance=P,F.coneCos=Math.cos(C.angle),F.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),F.decay=C.decay,n.spot[_]=F;const W=C.shadow;if(C.map&&(n.spotLightMap[E]=C.map,E++,W.updateMatrices(C),C.castShadow&&S++),n.spotLightMatrix[_]=W.matrix,C.castShadow){const O=t.get(C);O.shadowIntensity=W.intensity,O.shadowBias=W.bias,O.shadowNormalBias=W.normalBias,O.shadowRadius=W.radius,O.shadowMapSize=W.mapSize,n.spotShadow[_]=O,n.spotShadowMap[_]=L,b++}_++}else if(C.isRectAreaLight){const F=e.get(C);F.color.copy(U).multiplyScalar(w),F.halfWidth.set(C.width*.5,0,0),F.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=F,g++}else if(C.isPointLight){const F=e.get(C);if(F.color.copy(C.color).multiplyScalar(C.intensity),F.distance=C.distance,F.decay=C.decay,C.castShadow){const W=C.shadow,O=t.get(C);O.shadowIntensity=W.intensity,O.shadowBias=W.bias,O.shadowNormalBias=W.normalBias,O.shadowRadius=W.radius,O.shadowMapSize=W.mapSize,O.shadowCameraNear=W.camera.near,O.shadowCameraFar=W.camera.far,n.pointShadow[p]=O,n.pointShadowMap[p]=L,n.pointShadowMatrix[p]=C.shadow.matrix,x++}n.point[p]=F,p++}else if(C.isHemisphereLight){const F=e.get(C);F.skyColor.copy(C.color).multiplyScalar(w),F.groundColor.copy(C.groundColor).multiplyScalar(w),n.hemi[m]=F,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Se.LTC_FLOAT_1,n.rectAreaLTC2=Se.LTC_FLOAT_2):(n.rectAreaLTC1=Se.LTC_HALF_1,n.rectAreaLTC2=Se.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const A=n.hash;(A.directionalLength!==f||A.pointLength!==p||A.spotLength!==_||A.rectAreaLength!==g||A.hemiLength!==m||A.numDirectionalShadows!==v||A.numPointShadows!==x||A.numSpotShadows!==b||A.numSpotMaps!==E||A.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=b+E-S,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=T,A.directionalLength=f,A.pointLength=p,A.spotLength=_,A.rectAreaLength=g,A.hemiLength=m,A.numDirectionalShadows=v,A.numPointShadows=x,A.numSpotShadows=b,A.numSpotMaps=E,A.numLightProbes=T,n.version=M_++)}function c(l,h){let d=0,u=0,f=0,p=0,_=0;const g=h.matrixWorldInverse;for(let m=0,v=l.length;m<v;m++){const x=l[m];if(x.isDirectionalLight){const b=n.directional[d];b.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(g),d++}else if(x.isSpotLight){const b=n.spot[f];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(g),b.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(g),f++}else if(x.isRectAreaLight){const b=n.rectArea[p];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(g),a.identity(),r.copy(x.matrixWorld),r.premultiply(g),a.extractRotation(r),b.halfWidth.set(x.width*.5,0,0),b.halfHeight.set(0,x.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),p++}else if(x.isPointLight){const b=n.point[u];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(g),u++}else if(x.isHemisphereLight){const b=n.hemi[_];b.direction.setFromMatrixPosition(x.matrixWorld),b.direction.transformDirection(g),_++}}}return{setup:o,setupView:c,state:n}}function qh(i){const e=new S_(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function E_(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new qh(i),e.set(s,[o])):r>=a.length?(o=new qh(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class w_ extends Rn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=sp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class T_ extends Rn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const A_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,R_=`uniform sampler2D shadow_pass;
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
}`;function C_(i,e,t){let n=new xl;const s=new fe,r=new fe,a=new at,o=new w_({depthPacking:rp}),c=new T_,l={},h=t.maxTextureSize,d={[li]:Zt,[Zt]:li,[Et]:Et},u=new Dt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new fe},radius:{value:4}},vertexShader:A_,fragmentShader:R_}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const p=new mt;p.setAttribute("position",new Mt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ge(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ju;let m=this.type;this.render=function(S,T,A){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;const M=i.getRenderTarget(),y=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),U=i.state;U.setBlending(ai),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const w=m!==Qn&&this.type===Qn,P=m===Qn&&this.type!==Qn;for(let L=0,F=S.length;L<F;L++){const W=S[L],O=W.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const j=O.getFrameExtents();if(s.multiply(j),r.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/j.x),s.x=r.x*j.x,O.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/j.y),s.y=r.y*j.y,O.mapSize.y=r.y)),O.map===null||w===!0||P===!0){const se=this.type!==Qn?{minFilter:Qt,magFilter:Qt}:{};O.map!==null&&O.map.dispose(),O.map=new bn(s.x,s.y,se),O.map.texture.name=W.name+".shadowMap",O.camera.updateProjectionMatrix()}i.setRenderTarget(O.map),i.clear();const X=O.getViewportCount();for(let se=0;se<X;se++){const pe=O.getViewport(se);a.set(r.x*pe.x,r.y*pe.y,r.x*pe.z,r.y*pe.w),U.viewport(a),O.updateMatrices(W,se),n=O.getFrustum(),b(T,A,O.camera,W,this.type)}O.isPointLightShadow!==!0&&this.type===Qn&&v(O,A),O.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(M,y,C)};function v(S,T){const A=e.update(_);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new bn(s.x,s.y)),u.uniforms.shadow_pass.value=S.map.texture,u.uniforms.resolution.value=S.mapSize,u.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(T,null,A,u,_,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(T,null,A,f,_,null)}function x(S,T,A,M){let y=null;const C=A.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(C!==void 0)y=C;else if(y=A.isPointLight===!0?c:o,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const U=y.uuid,w=T.uuid;let P=l[U];P===void 0&&(P={},l[U]=P);let L=P[w];L===void 0&&(L=y.clone(),P[w]=L,T.addEventListener("dispose",E)),y=L}if(y.visible=T.visible,y.wireframe=T.wireframe,M===Qn?y.side=T.shadowSide!==null?T.shadowSide:T.side:y.side=T.shadowSide!==null?T.shadowSide:d[T.side],y.alphaMap=T.alphaMap,y.alphaTest=T.alphaTest,y.map=T.map,y.clipShadows=T.clipShadows,y.clippingPlanes=T.clippingPlanes,y.clipIntersection=T.clipIntersection,y.displacementMap=T.displacementMap,y.displacementScale=T.displacementScale,y.displacementBias=T.displacementBias,y.wireframeLinewidth=T.wireframeLinewidth,y.linewidth=T.linewidth,A.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const U=i.properties.get(y);U.light=A}return y}function b(S,T,A,M,y){if(S.visible===!1)return;if(S.layers.test(T.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&y===Qn)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,S.matrixWorld);const w=e.update(S),P=S.material;if(Array.isArray(P)){const L=w.groups;for(let F=0,W=L.length;F<W;F++){const O=L[F],j=P[O.materialIndex];if(j&&j.visible){const X=x(S,j,M,y);S.onBeforeShadow(i,S,T,A,w,X,O),i.renderBufferDirect(A,null,w,X,S,O),S.onAfterShadow(i,S,T,A,w,X,O)}}}else if(P.visible){const L=x(S,P,M,y);S.onBeforeShadow(i,S,T,A,w,L,null),i.renderBufferDirect(A,null,w,L,S,null),S.onAfterShadow(i,S,T,A,w,L,null)}}const U=S.children;for(let w=0,P=U.length;w<P;w++)b(U[w],T,A,M,y)}function E(S){S.target.removeEventListener("dispose",E);for(const A in l){const M=l[A],y=S.target.uuid;y in M&&(M[y].dispose(),delete M[y])}}}const P_={[hc]:uc,[dc]:mc,[fc]:gc,[Us]:pc,[uc]:hc,[mc]:dc,[gc]:fc,[pc]:Us};function I_(i,e){function t(){let H=!1;const ye=new at;let ee=null;const ae=new at(0,0,0,0);return{setMask:function(Pe){ee!==Pe&&!H&&(i.colorMask(Pe,Pe,Pe,Pe),ee=Pe)},setLocked:function(Pe){H=Pe},setClear:function(Pe,Ae,je,St,zt){zt===!0&&(Pe*=St,Ae*=St,je*=St),ye.set(Pe,Ae,je,St),ae.equals(ye)===!1&&(i.clearColor(Pe,Ae,je,St),ae.copy(ye))},reset:function(){H=!1,ee=null,ae.set(-1,0,0,0)}}}function n(){let H=!1,ye=!1,ee=null,ae=null,Pe=null;return{setReversed:function(Ae){if(ye!==Ae){const je=e.get("EXT_clip_control");ye?je.clipControlEXT(je.LOWER_LEFT_EXT,je.ZERO_TO_ONE_EXT):je.clipControlEXT(je.LOWER_LEFT_EXT,je.NEGATIVE_ONE_TO_ONE_EXT);const St=Pe;Pe=null,this.setClear(St)}ye=Ae},getReversed:function(){return ye},setTest:function(Ae){Ae?xe(i.DEPTH_TEST):he(i.DEPTH_TEST)},setMask:function(Ae){ee!==Ae&&!H&&(i.depthMask(Ae),ee=Ae)},setFunc:function(Ae){if(ye&&(Ae=P_[Ae]),ae!==Ae){switch(Ae){case hc:i.depthFunc(i.NEVER);break;case uc:i.depthFunc(i.ALWAYS);break;case dc:i.depthFunc(i.LESS);break;case Us:i.depthFunc(i.LEQUAL);break;case fc:i.depthFunc(i.EQUAL);break;case pc:i.depthFunc(i.GEQUAL);break;case mc:i.depthFunc(i.GREATER);break;case gc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ae=Ae}},setLocked:function(Ae){H=Ae},setClear:function(Ae){Pe!==Ae&&(ye&&(Ae=1-Ae),i.clearDepth(Ae),Pe=Ae)},reset:function(){H=!1,ee=null,ae=null,Pe=null,ye=!1}}}function s(){let H=!1,ye=null,ee=null,ae=null,Pe=null,Ae=null,je=null,St=null,zt=null;return{setTest:function(ut){H||(ut?xe(i.STENCIL_TEST):he(i.STENCIL_TEST))},setMask:function(ut){ye!==ut&&!H&&(i.stencilMask(ut),ye=ut)},setFunc:function(ut,xn,Wn){(ee!==ut||ae!==xn||Pe!==Wn)&&(i.stencilFunc(ut,xn,Wn),ee=ut,ae=xn,Pe=Wn)},setOp:function(ut,xn,Wn){(Ae!==ut||je!==xn||St!==Wn)&&(i.stencilOp(ut,xn,Wn),Ae=ut,je=xn,St=Wn)},setLocked:function(ut){H=ut},setClear:function(ut){zt!==ut&&(i.clearStencil(ut),zt=ut)},reset:function(){H=!1,ye=null,ee=null,ae=null,Pe=null,Ae=null,je=null,St=null,zt=null}}}const r=new t,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let h={},d={},u=new WeakMap,f=[],p=null,_=!1,g=null,m=null,v=null,x=null,b=null,E=null,S=null,T=new Ie(0,0,0),A=0,M=!1,y=null,C=null,U=null,w=null,P=null;const L=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,W=0;const O=i.getParameter(i.VERSION);O.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(O)[1]),F=W>=1):O.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),F=W>=2);let j=null,X={};const se=i.getParameter(i.SCISSOR_BOX),pe=i.getParameter(i.VIEWPORT),de=new at().fromArray(se),Q=new at().fromArray(pe);function te(H,ye,ee,ae){const Pe=new Uint8Array(4),Ae=i.createTexture();i.bindTexture(H,Ae),i.texParameteri(H,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(H,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let je=0;je<ee;je++)H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?i.texImage3D(ye,0,i.RGBA,1,1,ae,0,i.RGBA,i.UNSIGNED_BYTE,Pe):i.texImage2D(ye+je,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Pe);return Ae}const Ee={};Ee[i.TEXTURE_2D]=te(i.TEXTURE_2D,i.TEXTURE_2D,1),Ee[i.TEXTURE_CUBE_MAP]=te(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ee[i.TEXTURE_2D_ARRAY]=te(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ee[i.TEXTURE_3D]=te(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),xe(i.DEPTH_TEST),a.setFunc(Us),_e(!1),Ue(Zl),xe(i.CULL_FACE),z(ai);function xe(H){h[H]!==!0&&(i.enable(H),h[H]=!0)}function he(H){h[H]!==!1&&(i.disable(H),h[H]=!1)}function Te(H,ye){return d[H]!==ye?(i.bindFramebuffer(H,ye),d[H]=ye,H===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ye),H===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ye),!0):!1}function We(H,ye){let ee=f,ae=!1;if(H){ee=u.get(ye),ee===void 0&&(ee=[],u.set(ye,ee));const Pe=H.textures;if(ee.length!==Pe.length||ee[0]!==i.COLOR_ATTACHMENT0){for(let Ae=0,je=Pe.length;Ae<je;Ae++)ee[Ae]=i.COLOR_ATTACHMENT0+Ae;ee.length=Pe.length,ae=!0}}else ee[0]!==i.BACK&&(ee[0]=i.BACK,ae=!0);ae&&i.drawBuffers(ee)}function $e(H){return p!==H?(i.useProgram(H),p=H,!0):!1}const k={[qi]:i.FUNC_ADD,[Uf]:i.FUNC_SUBTRACT,[Nf]:i.FUNC_REVERSE_SUBTRACT};k[Ff]=i.MIN,k[Of]=i.MAX;const ne={[zf]:i.ZERO,[Bf]:i.ONE,[kf]:i.SRC_COLOR,[cc]:i.SRC_ALPHA,[qf]:i.SRC_ALPHA_SATURATE,[Wf]:i.DST_COLOR,[Gf]:i.DST_ALPHA,[Hf]:i.ONE_MINUS_SRC_COLOR,[lc]:i.ONE_MINUS_SRC_ALPHA,[Xf]:i.ONE_MINUS_DST_COLOR,[Vf]:i.ONE_MINUS_DST_ALPHA,[jf]:i.CONSTANT_COLOR,[Yf]:i.ONE_MINUS_CONSTANT_COLOR,[Kf]:i.CONSTANT_ALPHA,[Jf]:i.ONE_MINUS_CONSTANT_ALPHA};function z(H,ye,ee,ae,Pe,Ae,je,St,zt,ut){if(H===ai){_===!0&&(he(i.BLEND),_=!1);return}if(_===!1&&(xe(i.BLEND),_=!0),H!==Df){if(H!==g||ut!==M){if((m!==qi||b!==qi)&&(i.blendEquation(i.FUNC_ADD),m=qi,b=qi),ut)switch(H){case Cs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fa:i.blendFunc(i.ONE,i.ONE);break;case Ql:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case $l:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case Cs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fa:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ql:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case $l:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}v=null,x=null,E=null,S=null,T.set(0,0,0),A=0,g=H,M=ut}return}Pe=Pe||ye,Ae=Ae||ee,je=je||ae,(ye!==m||Pe!==b)&&(i.blendEquationSeparate(k[ye],k[Pe]),m=ye,b=Pe),(ee!==v||ae!==x||Ae!==E||je!==S)&&(i.blendFuncSeparate(ne[ee],ne[ae],ne[Ae],ne[je]),v=ee,x=ae,E=Ae,S=je),(St.equals(T)===!1||zt!==A)&&(i.blendColor(St.r,St.g,St.b,zt),T.copy(St),A=zt),g=H,M=!1}function be(H,ye){H.side===Et?he(i.CULL_FACE):xe(i.CULL_FACE);let ee=H.side===Zt;ye&&(ee=!ee),_e(ee),H.blending===Cs&&H.transparent===!1?z(ai):z(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),a.setFunc(H.depthFunc),a.setTest(H.depthTest),a.setMask(H.depthWrite),r.setMask(H.colorWrite);const ae=H.stencilWrite;o.setTest(ae),ae&&(o.setMask(H.stencilWriteMask),o.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),o.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Ve(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?xe(i.SAMPLE_ALPHA_TO_COVERAGE):he(i.SAMPLE_ALPHA_TO_COVERAGE)}function _e(H){y!==H&&(H?i.frontFace(i.CW):i.frontFace(i.CCW),y=H)}function Ue(H){H!==If?(xe(i.CULL_FACE),H!==C&&(H===Zl?i.cullFace(i.BACK):H===Lf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):he(i.CULL_FACE),C=H}function we(H){H!==U&&(F&&i.lineWidth(H),U=H)}function Ve(H,ye,ee){H?(xe(i.POLYGON_OFFSET_FILL),(w!==ye||P!==ee)&&(i.polygonOffset(ye,ee),w=ye,P=ee)):he(i.POLYGON_OFFSET_FILL)}function Le(H){H?xe(i.SCISSOR_TEST):he(i.SCISSOR_TEST)}function D(H){H===void 0&&(H=i.TEXTURE0+L-1),j!==H&&(i.activeTexture(H),j=H)}function R(H,ye,ee){ee===void 0&&(j===null?ee=i.TEXTURE0+L-1:ee=j);let ae=X[ee];ae===void 0&&(ae={type:void 0,texture:void 0},X[ee]=ae),(ae.type!==H||ae.texture!==ye)&&(j!==ee&&(i.activeTexture(ee),j=ee),i.bindTexture(H,ye||Ee[H]),ae.type=H,ae.texture=ye)}function q(){const H=X[j];H!==void 0&&H.type!==void 0&&(i.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function re(){try{i.compressedTexImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ce(){try{i.compressedTexImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ie(){try{i.texSubImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function B(){try{i.texSubImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function K(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function oe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ve(){try{i.texStorage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function $(){try{i.texStorage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function me(){try{i.texImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Y(){try{i.texImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function le(H){de.equals(H)===!1&&(i.scissor(H.x,H.y,H.z,H.w),de.copy(H))}function ue(H){Q.equals(H)===!1&&(i.viewport(H.x,H.y,H.z,H.w),Q.copy(H))}function De(H,ye){let ee=l.get(ye);ee===void 0&&(ee=new WeakMap,l.set(ye,ee));let ae=ee.get(H);ae===void 0&&(ae=i.getUniformBlockIndex(ye,H.name),ee.set(H,ae))}function ze(H,ye){const ae=l.get(ye).get(H);c.get(ye)!==ae&&(i.uniformBlockBinding(ye,ae,H.__bindingPointIndex),c.set(ye,ae))}function st(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},j=null,X={},d={},u=new WeakMap,f=[],p=null,_=!1,g=null,m=null,v=null,x=null,b=null,E=null,S=null,T=new Ie(0,0,0),A=0,M=!1,y=null,C=null,U=null,w=null,P=null,de.set(0,0,i.canvas.width,i.canvas.height),Q.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:xe,disable:he,bindFramebuffer:Te,drawBuffers:We,useProgram:$e,setBlending:z,setMaterial:be,setFlipSided:_e,setCullFace:Ue,setLineWidth:we,setPolygonOffset:Ve,setScissorTest:Le,activeTexture:D,bindTexture:R,unbindTexture:q,compressedTexImage2D:re,compressedTexImage3D:ce,texImage2D:me,texImage3D:Y,updateUBOMapping:De,uniformBlockBinding:ze,texStorage2D:ve,texStorage3D:$,texSubImage2D:ie,texSubImage3D:B,compressedTexSubImage2D:K,compressedTexSubImage3D:oe,scissor:le,viewport:ue,reset:st}}function jh(i,e,t,n){const s=L_(n);switch(t){case ld:return i*e;case ud:return i*e;case dd:return i*e*2;case ul:return i*e/s.components*s.byteLength;case dl:return i*e/s.components*s.byteLength;case fd:return i*e*2/s.components*s.byteLength;case fl:return i*e*2/s.components*s.byteLength;case hd:return i*e*3/s.components*s.byteLength;case mn:return i*e*4/s.components*s.byteLength;case pl:return i*e*4/s.components*s.byteLength;case Ta:case Aa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ra:case Ca:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case xc:case Mc:return Math.max(i,16)*Math.max(e,8)/4;case _c:case vc:return Math.max(i,8)*Math.max(e,8)/2;case yc:case Sc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ec:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case wc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Tc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ac:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Rc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Cc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Pc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ic:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Lc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Dc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Uc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Nc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Fc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Oc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case zc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Pa:case Bc:case kc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case pd:case Hc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Gc:case Vc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function L_(i){switch(i){case hi:case ad:return{byteLength:1,components:1};case Er:case od:case sn:return{byteLength:2,components:1};case ll:case hl:return{byteLength:2,components:4};case Qi:case cl:case nn:return{byteLength:4,components:1};case cd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function D_(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new fe,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(D,R){return f?new OffscreenCanvas(D,R):Ar("canvas")}function _(D,R,q){let re=1;const ce=Le(D);if((ce.width>q||ce.height>q)&&(re=q/Math.max(ce.width,ce.height)),re<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const ie=Math.floor(re*ce.width),B=Math.floor(re*ce.height);d===void 0&&(d=p(ie,B));const K=R?p(ie,B):d;return K.width=ie,K.height=B,K.getContext("2d").drawImage(D,0,0,ie,B),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ce.width+"x"+ce.height+") to ("+ie+"x"+B+")."),K}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ce.width+"x"+ce.height+")."),D;return D}function g(D){return D.generateMipmaps}function m(D){i.generateMipmap(D)}function v(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(D,R,q,re,ce=!1){if(D!==null){if(i[D]!==void 0)return i[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let ie=R;if(R===i.RED&&(q===i.FLOAT&&(ie=i.R32F),q===i.HALF_FLOAT&&(ie=i.R16F),q===i.UNSIGNED_BYTE&&(ie=i.R8)),R===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(ie=i.R8UI),q===i.UNSIGNED_SHORT&&(ie=i.R16UI),q===i.UNSIGNED_INT&&(ie=i.R32UI),q===i.BYTE&&(ie=i.R8I),q===i.SHORT&&(ie=i.R16I),q===i.INT&&(ie=i.R32I)),R===i.RG&&(q===i.FLOAT&&(ie=i.RG32F),q===i.HALF_FLOAT&&(ie=i.RG16F),q===i.UNSIGNED_BYTE&&(ie=i.RG8)),R===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(ie=i.RG8UI),q===i.UNSIGNED_SHORT&&(ie=i.RG16UI),q===i.UNSIGNED_INT&&(ie=i.RG32UI),q===i.BYTE&&(ie=i.RG8I),q===i.SHORT&&(ie=i.RG16I),q===i.INT&&(ie=i.RG32I)),R===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(ie=i.RGB8UI),q===i.UNSIGNED_SHORT&&(ie=i.RGB16UI),q===i.UNSIGNED_INT&&(ie=i.RGB32UI),q===i.BYTE&&(ie=i.RGB8I),q===i.SHORT&&(ie=i.RGB16I),q===i.INT&&(ie=i.RGB32I)),R===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(ie=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(ie=i.RGBA16UI),q===i.UNSIGNED_INT&&(ie=i.RGBA32UI),q===i.BYTE&&(ie=i.RGBA8I),q===i.SHORT&&(ie=i.RGBA16I),q===i.INT&&(ie=i.RGBA32I)),R===i.RGB&&q===i.UNSIGNED_INT_5_9_9_9_REV&&(ie=i.RGB9_E5),R===i.RGBA){const B=ce?Za:tt.getTransfer(re);q===i.FLOAT&&(ie=i.RGBA32F),q===i.HALF_FLOAT&&(ie=i.RGBA16F),q===i.UNSIGNED_BYTE&&(ie=B===dt?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT_4_4_4_4&&(ie=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(ie=i.RGB5_A1)}return(ie===i.R16F||ie===i.R32F||ie===i.RG16F||ie===i.RG32F||ie===i.RGBA16F||ie===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function b(D,R){let q;return D?R===null||R===Qi||R===Os?q=i.DEPTH24_STENCIL8:R===nn?q=i.DEPTH32F_STENCIL8:R===Er&&(q=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):R===null||R===Qi||R===Os?q=i.DEPTH_COMPONENT24:R===nn?q=i.DEPTH_COMPONENT32F:R===Er&&(q=i.DEPTH_COMPONENT16),q}function E(D,R){return g(D)===!0||D.isFramebufferTexture&&D.minFilter!==Qt&&D.minFilter!==Lt?Math.log2(Math.max(R.width,R.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?R.mipmaps.length:1}function S(D){const R=D.target;R.removeEventListener("dispose",S),A(R),R.isVideoTexture&&h.delete(R)}function T(D){const R=D.target;R.removeEventListener("dispose",T),y(R)}function A(D){const R=n.get(D);if(R.__webglInit===void 0)return;const q=D.source,re=u.get(q);if(re){const ce=re[R.__cacheKey];ce.usedTimes--,ce.usedTimes===0&&M(D),Object.keys(re).length===0&&u.delete(q)}n.remove(D)}function M(D){const R=n.get(D);i.deleteTexture(R.__webglTexture);const q=D.source,re=u.get(q);delete re[R.__cacheKey],a.memory.textures--}function y(D){const R=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(R.__webglFramebuffer[re]))for(let ce=0;ce<R.__webglFramebuffer[re].length;ce++)i.deleteFramebuffer(R.__webglFramebuffer[re][ce]);else i.deleteFramebuffer(R.__webglFramebuffer[re]);R.__webglDepthbuffer&&i.deleteRenderbuffer(R.__webglDepthbuffer[re])}else{if(Array.isArray(R.__webglFramebuffer))for(let re=0;re<R.__webglFramebuffer.length;re++)i.deleteFramebuffer(R.__webglFramebuffer[re]);else i.deleteFramebuffer(R.__webglFramebuffer);if(R.__webglDepthbuffer&&i.deleteRenderbuffer(R.__webglDepthbuffer),R.__webglMultisampledFramebuffer&&i.deleteFramebuffer(R.__webglMultisampledFramebuffer),R.__webglColorRenderbuffer)for(let re=0;re<R.__webglColorRenderbuffer.length;re++)R.__webglColorRenderbuffer[re]&&i.deleteRenderbuffer(R.__webglColorRenderbuffer[re]);R.__webglDepthRenderbuffer&&i.deleteRenderbuffer(R.__webglDepthRenderbuffer)}const q=D.textures;for(let re=0,ce=q.length;re<ce;re++){const ie=n.get(q[re]);ie.__webglTexture&&(i.deleteTexture(ie.__webglTexture),a.memory.textures--),n.remove(q[re])}n.remove(D)}let C=0;function U(){C=0}function w(){const D=C;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),C+=1,D}function P(D){const R=[];return R.push(D.wrapS),R.push(D.wrapT),R.push(D.wrapR||0),R.push(D.magFilter),R.push(D.minFilter),R.push(D.anisotropy),R.push(D.internalFormat),R.push(D.format),R.push(D.type),R.push(D.generateMipmaps),R.push(D.premultiplyAlpha),R.push(D.flipY),R.push(D.unpackAlignment),R.push(D.colorSpace),R.join()}function L(D,R){const q=n.get(D);if(D.isVideoTexture&&we(D),D.isRenderTargetTexture===!1&&D.version>0&&q.__version!==D.version){const re=D.image;if(re===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q(q,D,R);return}}t.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+R)}function F(D,R){const q=n.get(D);if(D.version>0&&q.__version!==D.version){Q(q,D,R);return}t.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+R)}function W(D,R){const q=n.get(D);if(D.version>0&&q.__version!==D.version){Q(q,D,R);return}t.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+R)}function O(D,R){const q=n.get(D);if(D.version>0&&q.__version!==D.version){te(q,D,R);return}t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+R)}const j={[Cn]:i.REPEAT,[Bn]:i.CLAMP_TO_EDGE,[za]:i.MIRRORED_REPEAT},X={[Qt]:i.NEAREST,[rd]:i.NEAREST_MIPMAP_NEAREST,[fr]:i.NEAREST_MIPMAP_LINEAR,[Lt]:i.LINEAR,[wa]:i.LINEAR_MIPMAP_NEAREST,[kn]:i.LINEAR_MIPMAP_LINEAR},se={[op]:i.NEVER,[fp]:i.ALWAYS,[cp]:i.LESS,[xd]:i.LEQUAL,[lp]:i.EQUAL,[dp]:i.GEQUAL,[hp]:i.GREATER,[up]:i.NOTEQUAL};function pe(D,R){if(R.type===nn&&e.has("OES_texture_float_linear")===!1&&(R.magFilter===Lt||R.magFilter===wa||R.magFilter===fr||R.magFilter===kn||R.minFilter===Lt||R.minFilter===wa||R.minFilter===fr||R.minFilter===kn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,j[R.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,j[R.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,j[R.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,X[R.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,X[R.minFilter]),R.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,se[R.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(R.magFilter===Qt||R.minFilter!==fr&&R.minFilter!==kn||R.type===nn&&e.has("OES_texture_float_linear")===!1)return;if(R.anisotropy>1||n.get(R).__currentAnisotropy){const q=e.get("EXT_texture_filter_anisotropic");i.texParameterf(D,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,s.getMaxAnisotropy())),n.get(R).__currentAnisotropy=R.anisotropy}}}function de(D,R){let q=!1;D.__webglInit===void 0&&(D.__webglInit=!0,R.addEventListener("dispose",S));const re=R.source;let ce=u.get(re);ce===void 0&&(ce={},u.set(re,ce));const ie=P(R);if(ie!==D.__cacheKey){ce[ie]===void 0&&(ce[ie]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,q=!0),ce[ie].usedTimes++;const B=ce[D.__cacheKey];B!==void 0&&(ce[D.__cacheKey].usedTimes--,B.usedTimes===0&&M(R)),D.__cacheKey=ie,D.__webglTexture=ce[ie].texture}return q}function Q(D,R,q){let re=i.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&(re=i.TEXTURE_2D_ARRAY),R.isData3DTexture&&(re=i.TEXTURE_3D);const ce=de(D,R),ie=R.source;t.bindTexture(re,D.__webglTexture,i.TEXTURE0+q);const B=n.get(ie);if(ie.version!==B.__version||ce===!0){t.activeTexture(i.TEXTURE0+q);const K=tt.getPrimaries(tt.workingColorSpace),oe=R.colorSpace===Ti?null:tt.getPrimaries(R.colorSpace),ve=R.colorSpace===Ti||K===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,R.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,R.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);let $=_(R.image,!1,s.maxTextureSize);$=Ve(R,$);const me=r.convert(R.format,R.colorSpace),Y=r.convert(R.type);let le=x(R.internalFormat,me,Y,R.colorSpace,R.isVideoTexture);pe(re,R);let ue;const De=R.mipmaps,ze=R.isVideoTexture!==!0,st=B.__version===void 0||ce===!0,H=ie.dataReady,ye=E(R,$);if(R.isDepthTexture)le=b(R.format===zs,R.type),st&&(ze?t.texStorage2D(i.TEXTURE_2D,1,le,$.width,$.height):t.texImage2D(i.TEXTURE_2D,0,le,$.width,$.height,0,me,Y,null));else if(R.isDataTexture)if(De.length>0){ze&&st&&t.texStorage2D(i.TEXTURE_2D,ye,le,De[0].width,De[0].height);for(let ee=0,ae=De.length;ee<ae;ee++)ue=De[ee],ze?H&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ue.width,ue.height,me,Y,ue.data):t.texImage2D(i.TEXTURE_2D,ee,le,ue.width,ue.height,0,me,Y,ue.data);R.generateMipmaps=!1}else ze?(st&&t.texStorage2D(i.TEXTURE_2D,ye,le,$.width,$.height),H&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,$.width,$.height,me,Y,$.data)):t.texImage2D(i.TEXTURE_2D,0,le,$.width,$.height,0,me,Y,$.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){ze&&st&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,le,De[0].width,De[0].height,$.depth);for(let ee=0,ae=De.length;ee<ae;ee++)if(ue=De[ee],R.format!==mn)if(me!==null)if(ze){if(H)if(R.layerUpdates.size>0){const Pe=jh(ue.width,ue.height,R.format,R.type);for(const Ae of R.layerUpdates){const je=ue.data.subarray(Ae*Pe/ue.data.BYTES_PER_ELEMENT,(Ae+1)*Pe/ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,Ae,ue.width,ue.height,1,me,je)}R.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,ue.width,ue.height,$.depth,me,ue.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,le,ue.width,ue.height,$.depth,0,ue.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ze?H&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,ue.width,ue.height,$.depth,me,Y,ue.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,le,ue.width,ue.height,$.depth,0,me,Y,ue.data)}else{ze&&st&&t.texStorage2D(i.TEXTURE_2D,ye,le,De[0].width,De[0].height);for(let ee=0,ae=De.length;ee<ae;ee++)ue=De[ee],R.format!==mn?me!==null?ze?H&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,ue.width,ue.height,me,ue.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,le,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?H&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ue.width,ue.height,me,Y,ue.data):t.texImage2D(i.TEXTURE_2D,ee,le,ue.width,ue.height,0,me,Y,ue.data)}else if(R.isDataArrayTexture)if(ze){if(st&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,le,$.width,$.height,$.depth),H)if(R.layerUpdates.size>0){const ee=jh($.width,$.height,R.format,R.type);for(const ae of R.layerUpdates){const Pe=$.data.subarray(ae*ee/$.data.BYTES_PER_ELEMENT,(ae+1)*ee/$.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ae,$.width,$.height,1,me,Y,Pe)}R.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,me,Y,$.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,le,$.width,$.height,$.depth,0,me,Y,$.data);else if(R.isData3DTexture)ze?(st&&t.texStorage3D(i.TEXTURE_3D,ye,le,$.width,$.height,$.depth),H&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,me,Y,$.data)):t.texImage3D(i.TEXTURE_3D,0,le,$.width,$.height,$.depth,0,me,Y,$.data);else if(R.isFramebufferTexture){if(st)if(ze)t.texStorage2D(i.TEXTURE_2D,ye,le,$.width,$.height);else{let ee=$.width,ae=$.height;for(let Pe=0;Pe<ye;Pe++)t.texImage2D(i.TEXTURE_2D,Pe,le,ee,ae,0,me,Y,null),ee>>=1,ae>>=1}}else if(De.length>0){if(ze&&st){const ee=Le(De[0]);t.texStorage2D(i.TEXTURE_2D,ye,le,ee.width,ee.height)}for(let ee=0,ae=De.length;ee<ae;ee++)ue=De[ee],ze?H&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,me,Y,ue):t.texImage2D(i.TEXTURE_2D,ee,le,me,Y,ue);R.generateMipmaps=!1}else if(ze){if(st){const ee=Le($);t.texStorage2D(i.TEXTURE_2D,ye,le,ee.width,ee.height)}H&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,me,Y,$)}else t.texImage2D(i.TEXTURE_2D,0,le,me,Y,$);g(R)&&m(re),B.__version=ie.version,R.onUpdate&&R.onUpdate(R)}D.__version=R.version}function te(D,R,q){if(R.image.length!==6)return;const re=de(D,R),ce=R.source;t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+q);const ie=n.get(ce);if(ce.version!==ie.__version||re===!0){t.activeTexture(i.TEXTURE0+q);const B=tt.getPrimaries(tt.workingColorSpace),K=R.colorSpace===Ti?null:tt.getPrimaries(R.colorSpace),oe=R.colorSpace===Ti||B===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,R.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,R.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);const ve=R.isCompressedTexture||R.image[0].isCompressedTexture,$=R.image[0]&&R.image[0].isDataTexture,me=[];for(let ae=0;ae<6;ae++)!ve&&!$?me[ae]=_(R.image[ae],!0,s.maxCubemapSize):me[ae]=$?R.image[ae].image:R.image[ae],me[ae]=Ve(R,me[ae]);const Y=me[0],le=r.convert(R.format,R.colorSpace),ue=r.convert(R.type),De=x(R.internalFormat,le,ue,R.colorSpace),ze=R.isVideoTexture!==!0,st=ie.__version===void 0||re===!0,H=ce.dataReady;let ye=E(R,Y);pe(i.TEXTURE_CUBE_MAP,R);let ee;if(ve){ze&&st&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,De,Y.width,Y.height);for(let ae=0;ae<6;ae++){ee=me[ae].mipmaps;for(let Pe=0;Pe<ee.length;Pe++){const Ae=ee[Pe];R.format!==mn?le!==null?ze?H&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Pe,0,0,Ae.width,Ae.height,le,Ae.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Pe,De,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ze?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Pe,0,0,Ae.width,Ae.height,le,ue,Ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Pe,De,Ae.width,Ae.height,0,le,ue,Ae.data)}}}else{if(ee=R.mipmaps,ze&&st){ee.length>0&&ye++;const ae=Le(me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ye,De,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if($){ze?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,me[ae].width,me[ae].height,le,ue,me[ae].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,De,me[ae].width,me[ae].height,0,le,ue,me[ae].data);for(let Pe=0;Pe<ee.length;Pe++){const je=ee[Pe].image[ae].image;ze?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Pe+1,0,0,je.width,je.height,le,ue,je.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Pe+1,De,je.width,je.height,0,le,ue,je.data)}}else{ze?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,le,ue,me[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,De,le,ue,me[ae]);for(let Pe=0;Pe<ee.length;Pe++){const Ae=ee[Pe];ze?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Pe+1,0,0,le,ue,Ae.image[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Pe+1,De,le,ue,Ae.image[ae])}}}g(R)&&m(i.TEXTURE_CUBE_MAP),ie.__version=ce.version,R.onUpdate&&R.onUpdate(R)}D.__version=R.version}function Ee(D,R,q,re,ce,ie){const B=r.convert(q.format,q.colorSpace),K=r.convert(q.type),oe=x(q.internalFormat,B,K,q.colorSpace),ve=n.get(R),$=n.get(q);if($.__renderTarget=R,!ve.__hasExternalTextures){const me=Math.max(1,R.width>>ie),Y=Math.max(1,R.height>>ie);ce===i.TEXTURE_3D||ce===i.TEXTURE_2D_ARRAY?t.texImage3D(ce,ie,oe,me,Y,R.depth,0,B,K,null):t.texImage2D(ce,ie,oe,me,Y,0,B,K,null)}t.bindFramebuffer(i.FRAMEBUFFER,D),Ue(R)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,re,ce,$.__webglTexture,0,_e(R)):(ce===i.TEXTURE_2D||ce>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ce<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,re,ce,$.__webglTexture,ie),t.bindFramebuffer(i.FRAMEBUFFER,null)}function xe(D,R,q){if(i.bindRenderbuffer(i.RENDERBUFFER,D),R.depthBuffer){const re=R.depthTexture,ce=re&&re.isDepthTexture?re.type:null,ie=b(R.stencilBuffer,ce),B=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=_e(R);Ue(R)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,K,ie,R.width,R.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,K,ie,R.width,R.height):i.renderbufferStorage(i.RENDERBUFFER,ie,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,B,i.RENDERBUFFER,D)}else{const re=R.textures;for(let ce=0;ce<re.length;ce++){const ie=re[ce],B=r.convert(ie.format,ie.colorSpace),K=r.convert(ie.type),oe=x(ie.internalFormat,B,K,ie.colorSpace),ve=_e(R);q&&Ue(R)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ve,oe,R.width,R.height):Ue(R)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ve,oe,R.width,R.height):i.renderbufferStorage(i.RENDERBUFFER,oe,R.width,R.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function he(D,R){if(R&&R.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,D),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const re=n.get(R.depthTexture);re.__renderTarget=R,(!re.__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)&&(R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0),L(R.depthTexture,0);const ce=re.__webglTexture,ie=_e(R);if(R.depthTexture.format===Ps)Ue(R)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ce,0,ie):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ce,0);else if(R.depthTexture.format===zs)Ue(R)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ce,0,ie):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ce,0);else throw new Error("Unknown depthTexture format")}function Te(D){const R=n.get(D),q=D.isWebGLCubeRenderTarget===!0;if(R.__boundDepthTexture!==D.depthTexture){const re=D.depthTexture;if(R.__depthDisposeCallback&&R.__depthDisposeCallback(),re){const ce=()=>{delete R.__boundDepthTexture,delete R.__depthDisposeCallback,re.removeEventListener("dispose",ce)};re.addEventListener("dispose",ce),R.__depthDisposeCallback=ce}R.__boundDepthTexture=re}if(D.depthTexture&&!R.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");he(R.__webglFramebuffer,D)}else if(q){R.__webglDepthbuffer=[];for(let re=0;re<6;re++)if(t.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer[re]),R.__webglDepthbuffer[re]===void 0)R.__webglDepthbuffer[re]=i.createRenderbuffer(),xe(R.__webglDepthbuffer[re],D,!1);else{const ce=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=R.__webglDepthbuffer[re];i.bindRenderbuffer(i.RENDERBUFFER,ie),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,ie)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer===void 0)R.__webglDepthbuffer=i.createRenderbuffer(),xe(R.__webglDepthbuffer,D,!1);else{const re=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=R.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ce),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,ce)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function We(D,R,q){const re=n.get(D);R!==void 0&&Ee(re.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&Te(D)}function $e(D){const R=D.texture,q=n.get(D),re=n.get(R);D.addEventListener("dispose",T);const ce=D.textures,ie=D.isWebGLCubeRenderTarget===!0,B=ce.length>1;if(B||(re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture()),re.__version=R.version,a.memory.textures++),ie){q.__webglFramebuffer=[];for(let K=0;K<6;K++)if(R.mipmaps&&R.mipmaps.length>0){q.__webglFramebuffer[K]=[];for(let oe=0;oe<R.mipmaps.length;oe++)q.__webglFramebuffer[K][oe]=i.createFramebuffer()}else q.__webglFramebuffer[K]=i.createFramebuffer()}else{if(R.mipmaps&&R.mipmaps.length>0){q.__webglFramebuffer=[];for(let K=0;K<R.mipmaps.length;K++)q.__webglFramebuffer[K]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(B)for(let K=0,oe=ce.length;K<oe;K++){const ve=n.get(ce[K]);ve.__webglTexture===void 0&&(ve.__webglTexture=i.createTexture(),a.memory.textures++)}if(D.samples>0&&Ue(D)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let K=0;K<ce.length;K++){const oe=ce[K];q.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[K]);const ve=r.convert(oe.format,oe.colorSpace),$=r.convert(oe.type),me=x(oe.internalFormat,ve,$,oe.colorSpace,D.isXRRenderTarget===!0),Y=_e(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,Y,me,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,q.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),xe(q.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ie){t.bindTexture(i.TEXTURE_CUBE_MAP,re.__webglTexture),pe(i.TEXTURE_CUBE_MAP,R);for(let K=0;K<6;K++)if(R.mipmaps&&R.mipmaps.length>0)for(let oe=0;oe<R.mipmaps.length;oe++)Ee(q.__webglFramebuffer[K][oe],D,R,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,oe);else Ee(q.__webglFramebuffer[K],D,R,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);g(R)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(B){for(let K=0,oe=ce.length;K<oe;K++){const ve=ce[K],$=n.get(ve);t.bindTexture(i.TEXTURE_2D,$.__webglTexture),pe(i.TEXTURE_2D,ve),Ee(q.__webglFramebuffer,D,ve,i.COLOR_ATTACHMENT0+K,i.TEXTURE_2D,0),g(ve)&&m(i.TEXTURE_2D)}t.unbindTexture()}else{let K=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(K=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(K,re.__webglTexture),pe(K,R),R.mipmaps&&R.mipmaps.length>0)for(let oe=0;oe<R.mipmaps.length;oe++)Ee(q.__webglFramebuffer[oe],D,R,i.COLOR_ATTACHMENT0,K,oe);else Ee(q.__webglFramebuffer,D,R,i.COLOR_ATTACHMENT0,K,0);g(R)&&m(K),t.unbindTexture()}D.depthBuffer&&Te(D)}function k(D){const R=D.textures;for(let q=0,re=R.length;q<re;q++){const ce=R[q];if(g(ce)){const ie=v(D),B=n.get(ce).__webglTexture;t.bindTexture(ie,B),m(ie),t.unbindTexture()}}}const ne=[],z=[];function be(D){if(D.samples>0){if(Ue(D)===!1){const R=D.textures,q=D.width,re=D.height;let ce=i.COLOR_BUFFER_BIT;const ie=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,B=n.get(D),K=R.length>1;if(K)for(let oe=0;oe<R.length;oe++)t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,B.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,B.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,B.__webglFramebuffer);for(let oe=0;oe<R.length;oe++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(ce|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(ce|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,B.__webglColorRenderbuffer[oe]);const ve=n.get(R[oe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ve,0)}i.blitFramebuffer(0,0,q,re,0,0,q,re,ce,i.NEAREST),c===!0&&(ne.length=0,z.length=0,ne.push(i.COLOR_ATTACHMENT0+oe),D.depthBuffer&&D.resolveDepthBuffer===!1&&(ne.push(ie),z.push(ie),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,z)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ne))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let oe=0;oe<R.length;oe++){t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,B.__webglColorRenderbuffer[oe]);const ve=n.get(R[oe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,B.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.TEXTURE_2D,ve,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,B.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&c){const R=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[R])}}}function _e(D){return Math.min(s.maxSamples,D.samples)}function Ue(D){const R=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function we(D){const R=a.render.frame;h.get(D)!==R&&(h.set(D,R),D.update())}function Ve(D,R){const q=D.colorSpace,re=D.format,ce=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||q!==Wt&&q!==Ti&&(tt.getTransfer(q)===dt?(re!==mn||ce!==hi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),R}function Le(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=w,this.resetTextureUnits=U,this.setTexture2D=L,this.setTexture2DArray=F,this.setTexture3D=W,this.setTextureCube=O,this.rebindTextures=We,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=k,this.updateMultisampleRenderTarget=be,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=Ue}function U_(i,e){function t(n,s=Ti){let r;const a=tt.getTransfer(s);if(n===hi)return i.UNSIGNED_BYTE;if(n===ll)return i.UNSIGNED_SHORT_4_4_4_4;if(n===hl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===cd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ad)return i.BYTE;if(n===od)return i.SHORT;if(n===Er)return i.UNSIGNED_SHORT;if(n===cl)return i.INT;if(n===Qi)return i.UNSIGNED_INT;if(n===nn)return i.FLOAT;if(n===sn)return i.HALF_FLOAT;if(n===ld)return i.ALPHA;if(n===hd)return i.RGB;if(n===mn)return i.RGBA;if(n===ud)return i.LUMINANCE;if(n===dd)return i.LUMINANCE_ALPHA;if(n===Ps)return i.DEPTH_COMPONENT;if(n===zs)return i.DEPTH_STENCIL;if(n===ul)return i.RED;if(n===dl)return i.RED_INTEGER;if(n===fd)return i.RG;if(n===fl)return i.RG_INTEGER;if(n===pl)return i.RGBA_INTEGER;if(n===Ta||n===Aa||n===Ra||n===Ca)if(a===dt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ta)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ta)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Aa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ra)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ca)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===_c||n===xc||n===vc||n===Mc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===_c)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===xc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===vc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Mc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===yc||n===Sc||n===Ec)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===yc||n===Sc)return a===dt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ec)return a===dt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===wc||n===Tc||n===Ac||n===Rc||n===Cc||n===Pc||n===Ic||n===Lc||n===Dc||n===Uc||n===Nc||n===Fc||n===Oc||n===zc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===wc)return a===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Tc)return a===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ac)return a===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Rc)return a===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Cc)return a===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Pc)return a===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ic)return a===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Lc)return a===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Dc)return a===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Uc)return a===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Nc)return a===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Fc)return a===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Oc)return a===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===zc)return a===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Pa||n===Bc||n===kc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Pa)return a===dt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Bc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===kc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===pd||n===Hc||n===Gc||n===Vc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Pa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Hc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Gc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Vc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Os?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class N_ extends Yt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class At extends xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const F_={type:"move"};class Vo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new At,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new At,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new At,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),m=this._getHandJoint(l,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;l.inputState.pinching&&u>f+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=f-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(F_)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new At;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const O_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,z_=`
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

}`;class B_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Rt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Dt({vertexShader:O_,fragmentShader:z_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ge(new In(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class k_ extends ts{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,p=null;const _=new B_,g=t.getContextAttributes();let m=null,v=null;const x=[],b=[],E=new fe;let S=null;const T=new Yt;T.viewport=new at;const A=new Yt;A.viewport=new at;const M=[T,A],y=new N_;let C=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let te=x[Q];return te===void 0&&(te=new Vo,x[Q]=te),te.getTargetRaySpace()},this.getControllerGrip=function(Q){let te=x[Q];return te===void 0&&(te=new Vo,x[Q]=te),te.getGripSpace()},this.getHand=function(Q){let te=x[Q];return te===void 0&&(te=new Vo,x[Q]=te),te.getHandSpace()};function w(Q){const te=b.indexOf(Q.inputSource);if(te===-1)return;const Ee=x[te];Ee!==void 0&&(Ee.update(Q.inputSource,Q.frame,l||a),Ee.dispatchEvent({type:Q.type,data:Q.inputSource}))}function P(){s.removeEventListener("select",w),s.removeEventListener("selectstart",w),s.removeEventListener("selectend",w),s.removeEventListener("squeeze",w),s.removeEventListener("squeezestart",w),s.removeEventListener("squeezeend",w),s.removeEventListener("end",P),s.removeEventListener("inputsourceschange",L);for(let Q=0;Q<x.length;Q++){const te=b[Q];te!==null&&(b[Q]=null,x[Q].disconnect(te))}C=null,U=null,_.reset(),e.setRenderTarget(m),f=null,u=null,d=null,s=null,v=null,de.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Q){l=Q},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",w),s.addEventListener("selectstart",w),s.addEventListener("selectend",w),s.addEventListener("squeeze",w),s.addEventListener("squeezestart",w),s.addEventListener("squeezeend",w),s.addEventListener("end",P),s.addEventListener("inputsourceschange",L),g.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(E),s.renderState.layers===void 0){const te={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,te),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new bn(f.framebufferWidth,f.framebufferHeight,{format:mn,type:hi,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let te=null,Ee=null,xe=null;g.depth&&(xe=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=g.stencil?zs:Ps,Ee=g.stencil?Os:Qi);const he={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:r};d=new XRWebGLBinding(s,t),u=d.createProjectionLayer(he),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),v=new bn(u.textureWidth,u.textureHeight,{format:mn,type:hi,depthTexture:new Cd(u.textureWidth,u.textureHeight,Ee,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),de.setContext(s),de.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function L(Q){for(let te=0;te<Q.removed.length;te++){const Ee=Q.removed[te],xe=b.indexOf(Ee);xe>=0&&(b[xe]=null,x[xe].disconnect(Ee))}for(let te=0;te<Q.added.length;te++){const Ee=Q.added[te];let xe=b.indexOf(Ee);if(xe===-1){for(let Te=0;Te<x.length;Te++)if(Te>=b.length){b.push(Ee),xe=Te;break}else if(b[Te]===null){b[Te]=Ee,xe=Te;break}if(xe===-1)break}const he=x[xe];he&&he.connect(Ee)}}const F=new N,W=new N;function O(Q,te,Ee){F.setFromMatrixPosition(te.matrixWorld),W.setFromMatrixPosition(Ee.matrixWorld);const xe=F.distanceTo(W),he=te.projectionMatrix.elements,Te=Ee.projectionMatrix.elements,We=he[14]/(he[10]-1),$e=he[14]/(he[10]+1),k=(he[9]+1)/he[5],ne=(he[9]-1)/he[5],z=(he[8]-1)/he[0],be=(Te[8]+1)/Te[0],_e=We*z,Ue=We*be,we=xe/(-z+be),Ve=we*-z;if(te.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Ve),Q.translateZ(we),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),he[10]===-1)Q.projectionMatrix.copy(te.projectionMatrix),Q.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const Le=We+we,D=$e+we,R=_e-Ve,q=Ue+(xe-Ve),re=k*$e/D*Le,ce=ne*$e/D*Le;Q.projectionMatrix.makePerspective(R,q,re,ce,Le,D),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function j(Q,te){te===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(te.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let te=Q.near,Ee=Q.far;_.texture!==null&&(_.depthNear>0&&(te=_.depthNear),_.depthFar>0&&(Ee=_.depthFar)),y.near=A.near=T.near=te,y.far=A.far=T.far=Ee,(C!==y.near||U!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),C=y.near,U=y.far),T.layers.mask=Q.layers.mask|2,A.layers.mask=Q.layers.mask|4,y.layers.mask=T.layers.mask|A.layers.mask;const xe=Q.parent,he=y.cameras;j(y,xe);for(let Te=0;Te<he.length;Te++)j(he[Te],xe);he.length===2?O(y,T,A):y.projectionMatrix.copy(T.projectionMatrix),X(Q,y,xe)};function X(Q,te,Ee){Ee===null?Q.matrix.copy(te.matrixWorld):(Q.matrix.copy(Ee.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(te.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(te.projectionMatrix),Q.projectionMatrixInverse.copy(te.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Bs*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(Q){c=Q,u!==null&&(u.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let se=null;function pe(Q,te){if(h=te.getViewerPose(l||a),p=te,h!==null){const Ee=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let xe=!1;Ee.length!==y.cameras.length&&(y.cameras.length=0,xe=!0);for(let Te=0;Te<Ee.length;Te++){const We=Ee[Te];let $e=null;if(f!==null)$e=f.getViewport(We);else{const ne=d.getViewSubImage(u,We);$e=ne.viewport,Te===0&&(e.setRenderTargetTextures(v,ne.colorTexture,u.ignoreDepthValues?void 0:ne.depthStencilTexture),e.setRenderTarget(v))}let k=M[Te];k===void 0&&(k=new Yt,k.layers.enable(Te),k.viewport=new at,M[Te]=k),k.matrix.fromArray(We.transform.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale),k.projectionMatrix.fromArray(We.projectionMatrix),k.projectionMatrixInverse.copy(k.projectionMatrix).invert(),k.viewport.set($e.x,$e.y,$e.width,$e.height),Te===0&&(y.matrix.copy(k.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),xe===!0&&y.cameras.push(k)}const he=s.enabledFeatures;if(he&&he.includes("depth-sensing")){const Te=d.getDepthInformation(Ee[0]);Te&&Te.isValid&&Te.texture&&_.init(e,Te,s.renderState)}}for(let Ee=0;Ee<x.length;Ee++){const xe=b[Ee],he=x[Ee];xe!==null&&he!==void 0&&he.update(xe,te,l||a)}se&&se(Q,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),p=null}const de=new Rd;de.setAnimationLoop(pe),this.setAnimationLoop=function(Q){se=Q},this.dispose=function(){}}}const ki=new rn,H_=new He;function G_(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,wd(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,v,x,b){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m)):m.isMeshStandardMaterial?(r(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,b)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),_(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?c(g,m,v,x):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Zt&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Zt&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const v=e.get(m),x=v.envMap,b=v.envMapRotation;x&&(g.envMap.value=x,ki.copy(b),ki.x*=-1,ki.y*=-1,ki.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ki.y*=-1,ki.z*=-1),g.envMapRotation.value.setFromMatrix4(H_.makeRotationFromEuler(ki)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,v,x){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*v,g.scale.value=x*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,v){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Zt&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const v=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function V_(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,x){const b=x.program;n.uniformBlockBinding(v,b)}function l(v,x){let b=s[v.id];b===void 0&&(p(v),b=h(v),s[v.id]=b,v.addEventListener("dispose",g));const E=x.program;n.updateUBOMapping(v,E);const S=e.render.frame;r[v.id]!==S&&(u(v),r[v.id]=S)}function h(v){const x=d();v.__bindingPointIndex=x;const b=i.createBuffer(),E=v.__size,S=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,E,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,b),b}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){const x=s[v.id],b=v.uniforms,E=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let S=0,T=b.length;S<T;S++){const A=Array.isArray(b[S])?b[S]:[b[S]];for(let M=0,y=A.length;M<y;M++){const C=A[M];if(f(C,S,M,E)===!0){const U=C.__offset,w=Array.isArray(C.value)?C.value:[C.value];let P=0;for(let L=0;L<w.length;L++){const F=w[L],W=_(F);typeof F=="number"||typeof F=="boolean"?(C.__data[0]=F,i.bufferSubData(i.UNIFORM_BUFFER,U+P,C.__data)):F.isMatrix3?(C.__data[0]=F.elements[0],C.__data[1]=F.elements[1],C.__data[2]=F.elements[2],C.__data[3]=0,C.__data[4]=F.elements[3],C.__data[5]=F.elements[4],C.__data[6]=F.elements[5],C.__data[7]=0,C.__data[8]=F.elements[6],C.__data[9]=F.elements[7],C.__data[10]=F.elements[8],C.__data[11]=0):(F.toArray(C.__data,P),P+=W.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,x,b,E){const S=v.value,T=x+"_"+b;if(E[T]===void 0)return typeof S=="number"||typeof S=="boolean"?E[T]=S:E[T]=S.clone(),!0;{const A=E[T];if(typeof S=="number"||typeof S=="boolean"){if(A!==S)return E[T]=S,!0}else if(A.equals(S)===!1)return A.copy(S),!0}return!1}function p(v){const x=v.uniforms;let b=0;const E=16;for(let T=0,A=x.length;T<A;T++){const M=Array.isArray(x[T])?x[T]:[x[T]];for(let y=0,C=M.length;y<C;y++){const U=M[y],w=Array.isArray(U.value)?U.value:[U.value];for(let P=0,L=w.length;P<L;P++){const F=w[P],W=_(F),O=b%E,j=O%W.boundary,X=O+j;b+=j,X!==0&&E-X<W.storage&&(b+=E-X),U.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=b,b+=W.storage}}}const S=b%E;return S>0&&(b+=E-S),v.__size=b,v.__cache={},this}function _(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function g(v){const x=v.target;x.removeEventListener("dispose",g);const b=a.indexOf(x.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function m(){for(const v in s)i.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:c,update:l,dispose:m}}class W_{constructor(e={}){const{canvas:t=Pp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const p=new Uint32Array(4),_=new Int32Array(4);let g=null,m=null;const v=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=yt,this.toneMapping=Ci,this.toneMappingExposure=1;const b=this;let E=!1,S=0,T=0,A=null,M=-1,y=null;const C=new at,U=new at;let w=null;const P=new Ie(0);let L=0,F=t.width,W=t.height,O=1,j=null,X=null;const se=new at(0,0,F,W),pe=new at(0,0,F,W);let de=!1;const Q=new xl;let te=!1,Ee=!1;const xe=new He,he=new He,Te=new N,We=new at,$e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let k=!1;function ne(){return A===null?O:1}let z=n;function be(I,G){return t.getContext(I,G)}try{const I={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${al}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",Pe,!1),t.addEventListener("webglcontextcreationerror",Ae,!1),z===null){const G="webgl2";if(z=be(G,I),z===null)throw be(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(I){throw console.error("THREE.WebGLRenderer: "+I.message),I}let _e,Ue,we,Ve,Le,D,R,q,re,ce,ie,B,K,oe,ve,$,me,Y,le,ue,De,ze,st,H;function ye(){_e=new Kg(z),_e.init(),ze=new U_(z,_e),Ue=new Vg(z,_e,e,ze),we=new I_(z,_e),Ue.reverseDepthBuffer&&u&&we.buffers.depth.setReversed(!0),Ve=new Qg(z),Le=new g_,D=new D_(z,_e,we,Le,Ue,ze,Ve),R=new Xg(b),q=new Yg(b),re=new rm(z),st=new Hg(z,re),ce=new Jg(z,re,Ve,st),ie=new eb(z,ce,re,Ve),le=new $g(z,Ue,D),$=new Wg(Le),B=new m_(b,R,q,_e,Ue,st,$),K=new G_(b,Le),oe=new __,ve=new E_(_e),Y=new kg(b,R,q,we,ie,f,c),me=new C_(b,ie,Ue),H=new V_(z,Ve,Ue,we),ue=new Gg(z,_e,Ve),De=new Zg(z,_e,Ve),Ve.programs=B.programs,b.capabilities=Ue,b.extensions=_e,b.properties=Le,b.renderLists=oe,b.shadowMap=me,b.state=we,b.info=Ve}ye();const ee=new k_(b,z);this.xr=ee,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const I=_e.get("WEBGL_lose_context");I&&I.loseContext()},this.forceContextRestore=function(){const I=_e.get("WEBGL_lose_context");I&&I.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(I){I!==void 0&&(O=I,this.setSize(F,W,!1))},this.getSize=function(I){return I.set(F,W)},this.setSize=function(I,G,J=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=I,W=G,t.width=Math.floor(I*O),t.height=Math.floor(G*O),J===!0&&(t.style.width=I+"px",t.style.height=G+"px"),this.setViewport(0,0,I,G)},this.getDrawingBufferSize=function(I){return I.set(F*O,W*O).floor()},this.setDrawingBufferSize=function(I,G,J){F=I,W=G,O=J,t.width=Math.floor(I*J),t.height=Math.floor(G*J),this.setViewport(0,0,I,G)},this.getCurrentViewport=function(I){return I.copy(C)},this.getViewport=function(I){return I.copy(se)},this.setViewport=function(I,G,J,Z){I.isVector4?se.set(I.x,I.y,I.z,I.w):se.set(I,G,J,Z),we.viewport(C.copy(se).multiplyScalar(O).round())},this.getScissor=function(I){return I.copy(pe)},this.setScissor=function(I,G,J,Z){I.isVector4?pe.set(I.x,I.y,I.z,I.w):pe.set(I,G,J,Z),we.scissor(U.copy(pe).multiplyScalar(O).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(I){we.setScissorTest(de=I)},this.setOpaqueSort=function(I){j=I},this.setTransparentSort=function(I){X=I},this.getClearColor=function(I){return I.copy(Y.getClearColor())},this.setClearColor=function(){Y.setClearColor.apply(Y,arguments)},this.getClearAlpha=function(){return Y.getClearAlpha()},this.setClearAlpha=function(){Y.setClearAlpha.apply(Y,arguments)},this.clear=function(I=!0,G=!0,J=!0){let Z=0;if(I){let V=!1;if(A!==null){const ge=A.texture.format;V=ge===pl||ge===fl||ge===dl}if(V){const ge=A.texture.type,Re=ge===hi||ge===Qi||ge===Er||ge===Os||ge===ll||ge===hl,Ne=Y.getClearColor(),Fe=Y.getClearAlpha(),Xe=Ne.r,Ye=Ne.g,Oe=Ne.b;Re?(p[0]=Xe,p[1]=Ye,p[2]=Oe,p[3]=Fe,z.clearBufferuiv(z.COLOR,0,p)):(_[0]=Xe,_[1]=Ye,_[2]=Oe,_[3]=Fe,z.clearBufferiv(z.COLOR,0,_))}else Z|=z.COLOR_BUFFER_BIT}G&&(Z|=z.DEPTH_BUFFER_BIT),J&&(Z|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",Pe,!1),t.removeEventListener("webglcontextcreationerror",Ae,!1),oe.dispose(),ve.dispose(),Le.dispose(),R.dispose(),q.dispose(),ie.dispose(),st.dispose(),H.dispose(),B.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",Vl),ee.removeEventListener("sessionend",Wl),Ui.stop()};function ae(I){I.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function Pe(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const I=Ve.autoReset,G=me.enabled,J=me.autoUpdate,Z=me.needsUpdate,V=me.type;ye(),Ve.autoReset=I,me.enabled=G,me.autoUpdate=J,me.needsUpdate=Z,me.type=V}function Ae(I){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",I.statusMessage)}function je(I){const G=I.target;G.removeEventListener("dispose",je),St(G)}function St(I){zt(I),Le.remove(I)}function zt(I){const G=Le.get(I).programs;G!==void 0&&(G.forEach(function(J){B.releaseProgram(J)}),I.isShaderMaterial&&B.releaseShaderCache(I))}this.renderBufferDirect=function(I,G,J,Z,V,ge){G===null&&(G=$e);const Re=V.isMesh&&V.matrixWorld.determinant()<0,Ne=Rf(I,G,J,Z,V);we.setMaterial(Z,Re);let Fe=J.index,Xe=1;if(Z.wireframe===!0){if(Fe=ce.getWireframeAttribute(J),Fe===void 0)return;Xe=2}const Ye=J.drawRange,Oe=J.attributes.position;let rt=Ye.start*Xe,gt=(Ye.start+Ye.count)*Xe;ge!==null&&(rt=Math.max(rt,ge.start*Xe),gt=Math.min(gt,(ge.start+ge.count)*Xe)),Fe!==null?(rt=Math.max(rt,0),gt=Math.min(gt,Fe.count)):Oe!=null&&(rt=Math.max(rt,0),gt=Math.min(gt,Oe.count));const bt=gt-rt;if(bt<0||bt===1/0)return;st.setup(V,Z,Ne,J,Fe);let tn,ot=ue;if(Fe!==null&&(tn=re.get(Fe),ot=De,ot.setIndex(tn)),V.isMesh)Z.wireframe===!0?(we.setLineWidth(Z.wireframeLinewidth*ne()),ot.setMode(z.LINES)):ot.setMode(z.TRIANGLES);else if(V.isLine){let Be=Z.linewidth;Be===void 0&&(Be=1),we.setLineWidth(Be*ne()),V.isLineSegments?ot.setMode(z.LINES):V.isLineLoop?ot.setMode(z.LINE_LOOP):ot.setMode(z.LINE_STRIP)}else V.isPoints?ot.setMode(z.POINTS):V.isSprite&&ot.setMode(z.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)ot.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(_e.get("WEBGL_multi_draw"))ot.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Be=V._multiDrawStarts,Xn=V._multiDrawCounts,ct=V._multiDrawCount,vn=Fe?re.get(Fe).bytesPerElement:1,rs=Le.get(Z).currentProgram.getUniforms();for(let an=0;an<ct;an++)rs.setValue(z,"_gl_DrawID",an),ot.render(Be[an]/vn,Xn[an])}else if(V.isInstancedMesh)ot.renderInstances(rt,bt,V.count);else if(J.isInstancedBufferGeometry){const Be=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Xn=Math.min(J.instanceCount,Be);ot.renderInstances(rt,bt,Xn)}else ot.render(rt,bt)};function ut(I,G,J){I.transparent===!0&&I.side===Et&&I.forceSinglePass===!1?(I.side=Zt,I.needsUpdate=!0,Hr(I,G,J),I.side=li,I.needsUpdate=!0,Hr(I,G,J),I.side=Et):Hr(I,G,J)}this.compile=function(I,G,J=null){J===null&&(J=I),m=ve.get(J),m.init(G),x.push(m),J.traverseVisible(function(V){V.isLight&&V.layers.test(G.layers)&&(m.pushLight(V),V.castShadow&&m.pushShadow(V))}),I!==J&&I.traverseVisible(function(V){V.isLight&&V.layers.test(G.layers)&&(m.pushLight(V),V.castShadow&&m.pushShadow(V))}),m.setupLights();const Z=new Set;return I.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const ge=V.material;if(ge)if(Array.isArray(ge))for(let Re=0;Re<ge.length;Re++){const Ne=ge[Re];ut(Ne,J,V),Z.add(Ne)}else ut(ge,J,V),Z.add(ge)}),x.pop(),m=null,Z},this.compileAsync=function(I,G,J=null){const Z=this.compile(I,G,J);return new Promise(V=>{function ge(){if(Z.forEach(function(Re){Le.get(Re).currentProgram.isReady()&&Z.delete(Re)}),Z.size===0){V(I);return}setTimeout(ge,10)}_e.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let xn=null;function Wn(I){xn&&xn(I)}function Vl(){Ui.stop()}function Wl(){Ui.start()}const Ui=new Rd;Ui.setAnimationLoop(Wn),typeof self<"u"&&Ui.setContext(self),this.setAnimationLoop=function(I){xn=I,ee.setAnimationLoop(I),I===null?Ui.stop():Ui.start()},ee.addEventListener("sessionstart",Vl),ee.addEventListener("sessionend",Wl),this.render=function(I,G){if(G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(G),G=ee.getCamera()),I.isScene===!0&&I.onBeforeRender(b,I,G,A),m=ve.get(I,x.length),m.init(G),x.push(m),he.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),Q.setFromProjectionMatrix(he),Ee=this.localClippingEnabled,te=$.init(this.clippingPlanes,Ee),g=oe.get(I,v.length),g.init(),v.push(g),ee.enabled===!0&&ee.isPresenting===!0){const ge=b.xr.getDepthSensingMesh();ge!==null&&mo(ge,G,-1/0,b.sortObjects)}mo(I,G,0,b.sortObjects),g.finish(),b.sortObjects===!0&&g.sort(j,X),k=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,k&&Y.addToRenderList(g,I),this.info.render.frame++,te===!0&&$.beginShadows();const J=m.state.shadowsArray;me.render(J,I,G),te===!0&&$.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=g.opaque,V=g.transmissive;if(m.setupLights(),G.isArrayCamera){const ge=G.cameras;if(V.length>0)for(let Re=0,Ne=ge.length;Re<Ne;Re++){const Fe=ge[Re];ql(Z,V,I,Fe)}k&&Y.render(I);for(let Re=0,Ne=ge.length;Re<Ne;Re++){const Fe=ge[Re];Xl(g,I,Fe,Fe.viewport)}}else V.length>0&&ql(Z,V,I,G),k&&Y.render(I),Xl(g,I,G);A!==null&&(D.updateMultisampleRenderTarget(A),D.updateRenderTargetMipmap(A)),I.isScene===!0&&I.onAfterRender(b,I,G),st.resetDefaultState(),M=-1,y=null,x.pop(),x.length>0?(m=x[x.length-1],te===!0&&$.setGlobalState(b.clippingPlanes,m.state.camera)):m=null,v.pop(),v.length>0?g=v[v.length-1]:g=null};function mo(I,G,J,Z){if(I.visible===!1)return;if(I.layers.test(G.layers)){if(I.isGroup)J=I.renderOrder;else if(I.isLOD)I.autoUpdate===!0&&I.update(G);else if(I.isLight)m.pushLight(I),I.castShadow&&m.pushShadow(I);else if(I.isSprite){if(!I.frustumCulled||Q.intersectsSprite(I)){Z&&We.setFromMatrixPosition(I.matrixWorld).applyMatrix4(he);const Re=ie.update(I),Ne=I.material;Ne.visible&&g.push(I,Re,Ne,J,We.z,null)}}else if((I.isMesh||I.isLine||I.isPoints)&&(!I.frustumCulled||Q.intersectsObject(I))){const Re=ie.update(I),Ne=I.material;if(Z&&(I.boundingSphere!==void 0?(I.boundingSphere===null&&I.computeBoundingSphere(),We.copy(I.boundingSphere.center)):(Re.boundingSphere===null&&Re.computeBoundingSphere(),We.copy(Re.boundingSphere.center)),We.applyMatrix4(I.matrixWorld).applyMatrix4(he)),Array.isArray(Ne)){const Fe=Re.groups;for(let Xe=0,Ye=Fe.length;Xe<Ye;Xe++){const Oe=Fe[Xe],rt=Ne[Oe.materialIndex];rt&&rt.visible&&g.push(I,Re,rt,J,We.z,Oe)}}else Ne.visible&&g.push(I,Re,Ne,J,We.z,null)}}const ge=I.children;for(let Re=0,Ne=ge.length;Re<Ne;Re++)mo(ge[Re],G,J,Z)}function Xl(I,G,J,Z){const V=I.opaque,ge=I.transmissive,Re=I.transparent;m.setupLightsView(J),te===!0&&$.setGlobalState(b.clippingPlanes,J),Z&&we.viewport(C.copy(Z)),V.length>0&&kr(V,G,J),ge.length>0&&kr(ge,G,J),Re.length>0&&kr(Re,G,J),we.buffers.depth.setTest(!0),we.buffers.depth.setMask(!0),we.buffers.color.setMask(!0),we.setPolygonOffset(!1)}function ql(I,G,J,Z){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[Z.id]===void 0&&(m.state.transmissionRenderTarget[Z.id]=new bn(1,1,{generateMipmaps:!0,type:_e.has("EXT_color_buffer_half_float")||_e.has("EXT_color_buffer_float")?sn:hi,minFilter:kn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace}));const ge=m.state.transmissionRenderTarget[Z.id],Re=Z.viewport||C;ge.setSize(Re.z,Re.w);const Ne=b.getRenderTarget();b.setRenderTarget(ge),b.getClearColor(P),L=b.getClearAlpha(),L<1&&b.setClearColor(16777215,.5),b.clear(),k&&Y.render(J);const Fe=b.toneMapping;b.toneMapping=Ci;const Xe=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),m.setupLightsView(Z),te===!0&&$.setGlobalState(b.clippingPlanes,Z),kr(I,J,Z),D.updateMultisampleRenderTarget(ge),D.updateRenderTargetMipmap(ge),_e.has("WEBGL_multisampled_render_to_texture")===!1){let Ye=!1;for(let Oe=0,rt=G.length;Oe<rt;Oe++){const gt=G[Oe],bt=gt.object,tn=gt.geometry,ot=gt.material,Be=gt.group;if(ot.side===Et&&bt.layers.test(Z.layers)){const Xn=ot.side;ot.side=Zt,ot.needsUpdate=!0,jl(bt,J,Z,tn,ot,Be),ot.side=Xn,ot.needsUpdate=!0,Ye=!0}}Ye===!0&&(D.updateMultisampleRenderTarget(ge),D.updateRenderTargetMipmap(ge))}b.setRenderTarget(Ne),b.setClearColor(P,L),Xe!==void 0&&(Z.viewport=Xe),b.toneMapping=Fe}function kr(I,G,J){const Z=G.isScene===!0?G.overrideMaterial:null;for(let V=0,ge=I.length;V<ge;V++){const Re=I[V],Ne=Re.object,Fe=Re.geometry,Xe=Z===null?Re.material:Z,Ye=Re.group;Ne.layers.test(J.layers)&&jl(Ne,G,J,Fe,Xe,Ye)}}function jl(I,G,J,Z,V,ge){I.onBeforeRender(b,G,J,Z,V,ge),I.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,I.matrixWorld),I.normalMatrix.getNormalMatrix(I.modelViewMatrix),V.onBeforeRender(b,G,J,Z,I,ge),V.transparent===!0&&V.side===Et&&V.forceSinglePass===!1?(V.side=Zt,V.needsUpdate=!0,b.renderBufferDirect(J,G,Z,V,I,ge),V.side=li,V.needsUpdate=!0,b.renderBufferDirect(J,G,Z,V,I,ge),V.side=Et):b.renderBufferDirect(J,G,Z,V,I,ge),I.onAfterRender(b,G,J,Z,V,ge)}function Hr(I,G,J){G.isScene!==!0&&(G=$e);const Z=Le.get(I),V=m.state.lights,ge=m.state.shadowsArray,Re=V.state.version,Ne=B.getParameters(I,V.state,ge,G,J),Fe=B.getProgramCacheKey(Ne);let Xe=Z.programs;Z.environment=I.isMeshStandardMaterial?G.environment:null,Z.fog=G.fog,Z.envMap=(I.isMeshStandardMaterial?q:R).get(I.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&I.envMap===null?G.environmentRotation:I.envMapRotation,Xe===void 0&&(I.addEventListener("dispose",je),Xe=new Map,Z.programs=Xe);let Ye=Xe.get(Fe);if(Ye!==void 0){if(Z.currentProgram===Ye&&Z.lightsStateVersion===Re)return Kl(I,Ne),Ye}else Ne.uniforms=B.getUniforms(I),I.onBeforeCompile(Ne,b),Ye=B.acquireProgram(Ne,Fe),Xe.set(Fe,Ye),Z.uniforms=Ne.uniforms;const Oe=Z.uniforms;return(!I.isShaderMaterial&&!I.isRawShaderMaterial||I.clipping===!0)&&(Oe.clippingPlanes=$.uniform),Kl(I,Ne),Z.needsLights=Pf(I),Z.lightsStateVersion=Re,Z.needsLights&&(Oe.ambientLightColor.value=V.state.ambient,Oe.lightProbe.value=V.state.probe,Oe.directionalLights.value=V.state.directional,Oe.directionalLightShadows.value=V.state.directionalShadow,Oe.spotLights.value=V.state.spot,Oe.spotLightShadows.value=V.state.spotShadow,Oe.rectAreaLights.value=V.state.rectArea,Oe.ltc_1.value=V.state.rectAreaLTC1,Oe.ltc_2.value=V.state.rectAreaLTC2,Oe.pointLights.value=V.state.point,Oe.pointLightShadows.value=V.state.pointShadow,Oe.hemisphereLights.value=V.state.hemi,Oe.directionalShadowMap.value=V.state.directionalShadowMap,Oe.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Oe.spotShadowMap.value=V.state.spotShadowMap,Oe.spotLightMatrix.value=V.state.spotLightMatrix,Oe.spotLightMap.value=V.state.spotLightMap,Oe.pointShadowMap.value=V.state.pointShadowMap,Oe.pointShadowMatrix.value=V.state.pointShadowMatrix),Z.currentProgram=Ye,Z.uniformsList=null,Ye}function Yl(I){if(I.uniformsList===null){const G=I.currentProgram.getUniforms();I.uniformsList=Ia.seqWithValue(G.seq,I.uniforms)}return I.uniformsList}function Kl(I,G){const J=Le.get(I);J.outputColorSpace=G.outputColorSpace,J.batching=G.batching,J.batchingColor=G.batchingColor,J.instancing=G.instancing,J.instancingColor=G.instancingColor,J.instancingMorph=G.instancingMorph,J.skinning=G.skinning,J.morphTargets=G.morphTargets,J.morphNormals=G.morphNormals,J.morphColors=G.morphColors,J.morphTargetsCount=G.morphTargetsCount,J.numClippingPlanes=G.numClippingPlanes,J.numIntersection=G.numClipIntersection,J.vertexAlphas=G.vertexAlphas,J.vertexTangents=G.vertexTangents,J.toneMapping=G.toneMapping}function Rf(I,G,J,Z,V){G.isScene!==!0&&(G=$e),D.resetTextureUnits();const ge=G.fog,Re=Z.isMeshStandardMaterial?G.environment:null,Ne=A===null?b.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Wt,Fe=(Z.isMeshStandardMaterial?q:R).get(Z.envMap||Re),Xe=Z.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,Ye=!!J.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Oe=!!J.morphAttributes.position,rt=!!J.morphAttributes.normal,gt=!!J.morphAttributes.color;let bt=Ci;Z.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(bt=b.toneMapping);const tn=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,ot=tn!==void 0?tn.length:0,Be=Le.get(Z),Xn=m.state.lights;if(te===!0&&(Ee===!0||I!==y)){const un=I===y&&Z.id===M;$.setState(Z,I,un)}let ct=!1;Z.version===Be.__version?(Be.needsLights&&Be.lightsStateVersion!==Xn.state.version||Be.outputColorSpace!==Ne||V.isBatchedMesh&&Be.batching===!1||!V.isBatchedMesh&&Be.batching===!0||V.isBatchedMesh&&Be.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Be.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Be.instancing===!1||!V.isInstancedMesh&&Be.instancing===!0||V.isSkinnedMesh&&Be.skinning===!1||!V.isSkinnedMesh&&Be.skinning===!0||V.isInstancedMesh&&Be.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Be.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Be.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Be.instancingMorph===!1&&V.morphTexture!==null||Be.envMap!==Fe||Z.fog===!0&&Be.fog!==ge||Be.numClippingPlanes!==void 0&&(Be.numClippingPlanes!==$.numPlanes||Be.numIntersection!==$.numIntersection)||Be.vertexAlphas!==Xe||Be.vertexTangents!==Ye||Be.morphTargets!==Oe||Be.morphNormals!==rt||Be.morphColors!==gt||Be.toneMapping!==bt||Be.morphTargetsCount!==ot)&&(ct=!0):(ct=!0,Be.__version=Z.version);let vn=Be.currentProgram;ct===!0&&(vn=Hr(Z,G,V));let rs=!1,an=!1,Zs=!1;const _t=vn.getUniforms(),Ln=Be.uniforms;if(we.useProgram(vn.program)&&(rs=!0,an=!0,Zs=!0),Z.id!==M&&(M=Z.id,an=!0),rs||y!==I){we.buffers.depth.getReversed()?(xe.copy(I.projectionMatrix),Lp(xe),Dp(xe),_t.setValue(z,"projectionMatrix",xe)):_t.setValue(z,"projectionMatrix",I.projectionMatrix),_t.setValue(z,"viewMatrix",I.matrixWorldInverse);const pi=_t.map.cameraPosition;pi!==void 0&&pi.setValue(z,Te.setFromMatrixPosition(I.matrixWorld)),Ue.logarithmicDepthBuffer&&_t.setValue(z,"logDepthBufFC",2/(Math.log(I.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&_t.setValue(z,"isOrthographic",I.isOrthographicCamera===!0),y!==I&&(y=I,an=!0,Zs=!0)}if(V.isSkinnedMesh){_t.setOptional(z,V,"bindMatrix"),_t.setOptional(z,V,"bindMatrixInverse");const un=V.skeleton;un&&(un.boneTexture===null&&un.computeBoneTexture(),_t.setValue(z,"boneTexture",un.boneTexture,D))}V.isBatchedMesh&&(_t.setOptional(z,V,"batchingTexture"),_t.setValue(z,"batchingTexture",V._matricesTexture,D),_t.setOptional(z,V,"batchingIdTexture"),_t.setValue(z,"batchingIdTexture",V._indirectTexture,D),_t.setOptional(z,V,"batchingColorTexture"),V._colorsTexture!==null&&_t.setValue(z,"batchingColorTexture",V._colorsTexture,D));const Qs=J.morphAttributes;if((Qs.position!==void 0||Qs.normal!==void 0||Qs.color!==void 0)&&le.update(V,J,vn),(an||Be.receiveShadow!==V.receiveShadow)&&(Be.receiveShadow=V.receiveShadow,_t.setValue(z,"receiveShadow",V.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(Ln.envMap.value=Fe,Ln.flipEnvMap.value=Fe.isCubeTexture&&Fe.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&G.environment!==null&&(Ln.envMapIntensity.value=G.environmentIntensity),an&&(_t.setValue(z,"toneMappingExposure",b.toneMappingExposure),Be.needsLights&&Cf(Ln,Zs),ge&&Z.fog===!0&&K.refreshFogUniforms(Ln,ge),K.refreshMaterialUniforms(Ln,Z,O,W,m.state.transmissionRenderTarget[I.id]),Ia.upload(z,Yl(Be),Ln,D)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Ia.upload(z,Yl(Be),Ln,D),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&_t.setValue(z,"center",V.center),_t.setValue(z,"modelViewMatrix",V.modelViewMatrix),_t.setValue(z,"normalMatrix",V.normalMatrix),_t.setValue(z,"modelMatrix",V.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const un=Z.uniformsGroups;for(let pi=0,mi=un.length;pi<mi;pi++){const Jl=un[pi];H.update(Jl,vn),H.bind(Jl,vn)}}return vn}function Cf(I,G){I.ambientLightColor.needsUpdate=G,I.lightProbe.needsUpdate=G,I.directionalLights.needsUpdate=G,I.directionalLightShadows.needsUpdate=G,I.pointLights.needsUpdate=G,I.pointLightShadows.needsUpdate=G,I.spotLights.needsUpdate=G,I.spotLightShadows.needsUpdate=G,I.rectAreaLights.needsUpdate=G,I.hemisphereLights.needsUpdate=G}function Pf(I){return I.isMeshLambertMaterial||I.isMeshToonMaterial||I.isMeshPhongMaterial||I.isMeshStandardMaterial||I.isShadowMaterial||I.isShaderMaterial&&I.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(I,G,J){Le.get(I.texture).__webglTexture=G,Le.get(I.depthTexture).__webglTexture=J;const Z=Le.get(I);Z.__hasExternalTextures=!0,Z.__autoAllocateDepthBuffer=J===void 0,Z.__autoAllocateDepthBuffer||_e.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(I,G){const J=Le.get(I);J.__webglFramebuffer=G,J.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(I,G=0,J=0){A=I,S=G,T=J;let Z=!0,V=null,ge=!1,Re=!1;if(I){const Fe=Le.get(I);if(Fe.__useDefaultFramebuffer!==void 0)we.bindFramebuffer(z.FRAMEBUFFER,null),Z=!1;else if(Fe.__webglFramebuffer===void 0)D.setupRenderTarget(I);else if(Fe.__hasExternalTextures)D.rebindTextures(I,Le.get(I.texture).__webglTexture,Le.get(I.depthTexture).__webglTexture);else if(I.depthBuffer){const Oe=I.depthTexture;if(Fe.__boundDepthTexture!==Oe){if(Oe!==null&&Le.has(Oe)&&(I.width!==Oe.image.width||I.height!==Oe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(I)}}const Xe=I.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(Re=!0);const Ye=Le.get(I).__webglFramebuffer;I.isWebGLCubeRenderTarget?(Array.isArray(Ye[G])?V=Ye[G][J]:V=Ye[G],ge=!0):I.samples>0&&D.useMultisampledRTT(I)===!1?V=Le.get(I).__webglMultisampledFramebuffer:Array.isArray(Ye)?V=Ye[J]:V=Ye,C.copy(I.viewport),U.copy(I.scissor),w=I.scissorTest}else C.copy(se).multiplyScalar(O).floor(),U.copy(pe).multiplyScalar(O).floor(),w=de;if(we.bindFramebuffer(z.FRAMEBUFFER,V)&&Z&&we.drawBuffers(I,V),we.viewport(C),we.scissor(U),we.setScissorTest(w),ge){const Fe=Le.get(I.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+G,Fe.__webglTexture,J)}else if(Re){const Fe=Le.get(I.texture),Xe=G||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,Fe.__webglTexture,J||0,Xe)}M=-1},this.readRenderTargetPixels=function(I,G,J,Z,V,ge,Re){if(!(I&&I.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=Le.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&Re!==void 0&&(Ne=Ne[Re]),Ne){we.bindFramebuffer(z.FRAMEBUFFER,Ne);try{const Fe=I.texture,Xe=Fe.format,Ye=Fe.type;if(!Ue.textureFormatReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ue.textureTypeReadable(Ye)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=I.width-Z&&J>=0&&J<=I.height-V&&z.readPixels(G,J,Z,V,ze.convert(Xe),ze.convert(Ye),ge)}finally{const Fe=A!==null?Le.get(A).__webglFramebuffer:null;we.bindFramebuffer(z.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(I,G,J,Z,V,ge,Re){if(!(I&&I.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ne=Le.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&Re!==void 0&&(Ne=Ne[Re]),Ne){const Fe=I.texture,Xe=Fe.format,Ye=Fe.type;if(!Ue.textureFormatReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ue.textureTypeReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(G>=0&&G<=I.width-Z&&J>=0&&J<=I.height-V){we.bindFramebuffer(z.FRAMEBUFFER,Ne);const Oe=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Oe),z.bufferData(z.PIXEL_PACK_BUFFER,ge.byteLength,z.STREAM_READ),z.readPixels(G,J,Z,V,ze.convert(Xe),ze.convert(Ye),0);const rt=A!==null?Le.get(A).__webglFramebuffer:null;we.bindFramebuffer(z.FRAMEBUFFER,rt);const gt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Ip(z,gt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Oe),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,ge),z.deleteBuffer(Oe),z.deleteSync(gt),ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(I,G=null,J=0){I.isTexture!==!0&&(pr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),G=arguments[0]||null,I=arguments[1]);const Z=Math.pow(2,-J),V=Math.floor(I.image.width*Z),ge=Math.floor(I.image.height*Z),Re=G!==null?G.x:0,Ne=G!==null?G.y:0;D.setTexture2D(I,0),z.copyTexSubImage2D(z.TEXTURE_2D,J,0,0,Re,Ne,V,ge),we.unbindTexture()},this.copyTextureToTexture=function(I,G,J=null,Z=null,V=0){I.isTexture!==!0&&(pr("WebGLRenderer: copyTextureToTexture function signature has changed."),Z=arguments[0]||null,I=arguments[1],G=arguments[2],V=arguments[3]||0,J=null);let ge,Re,Ne,Fe,Xe,Ye,Oe,rt,gt;const bt=I.isCompressedTexture?I.mipmaps[V]:I.image;J!==null?(ge=J.max.x-J.min.x,Re=J.max.y-J.min.y,Ne=J.isBox3?J.max.z-J.min.z:1,Fe=J.min.x,Xe=J.min.y,Ye=J.isBox3?J.min.z:0):(ge=bt.width,Re=bt.height,Ne=bt.depth||1,Fe=0,Xe=0,Ye=0),Z!==null?(Oe=Z.x,rt=Z.y,gt=Z.z):(Oe=0,rt=0,gt=0);const tn=ze.convert(G.format),ot=ze.convert(G.type);let Be;G.isData3DTexture?(D.setTexture3D(G,0),Be=z.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(D.setTexture2DArray(G,0),Be=z.TEXTURE_2D_ARRAY):(D.setTexture2D(G,0),Be=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,G.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,G.unpackAlignment);const Xn=z.getParameter(z.UNPACK_ROW_LENGTH),ct=z.getParameter(z.UNPACK_IMAGE_HEIGHT),vn=z.getParameter(z.UNPACK_SKIP_PIXELS),rs=z.getParameter(z.UNPACK_SKIP_ROWS),an=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,bt.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,bt.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Fe),z.pixelStorei(z.UNPACK_SKIP_ROWS,Xe),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Ye);const Zs=I.isDataArrayTexture||I.isData3DTexture,_t=G.isDataArrayTexture||G.isData3DTexture;if(I.isRenderTargetTexture||I.isDepthTexture){const Ln=Le.get(I),Qs=Le.get(G),un=Le.get(Ln.__renderTarget),pi=Le.get(Qs.__renderTarget);we.bindFramebuffer(z.READ_FRAMEBUFFER,un.__webglFramebuffer),we.bindFramebuffer(z.DRAW_FRAMEBUFFER,pi.__webglFramebuffer);for(let mi=0;mi<Ne;mi++)Zs&&z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Le.get(I).__webglTexture,V,Ye+mi),I.isDepthTexture?(_t&&z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Le.get(G).__webglTexture,V,gt+mi),z.blitFramebuffer(Fe,Xe,ge,Re,Oe,rt,ge,Re,z.DEPTH_BUFFER_BIT,z.NEAREST)):_t?z.copyTexSubImage3D(Be,V,Oe,rt,gt+mi,Fe,Xe,ge,Re):z.copyTexSubImage2D(Be,V,Oe,rt,gt+mi,Fe,Xe,ge,Re);we.bindFramebuffer(z.READ_FRAMEBUFFER,null),we.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else _t?I.isDataTexture||I.isData3DTexture?z.texSubImage3D(Be,V,Oe,rt,gt,ge,Re,Ne,tn,ot,bt.data):G.isCompressedArrayTexture?z.compressedTexSubImage3D(Be,V,Oe,rt,gt,ge,Re,Ne,tn,bt.data):z.texSubImage3D(Be,V,Oe,rt,gt,ge,Re,Ne,tn,ot,bt):I.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,V,Oe,rt,ge,Re,tn,ot,bt.data):I.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,V,Oe,rt,bt.width,bt.height,tn,bt.data):z.texSubImage2D(z.TEXTURE_2D,V,Oe,rt,ge,Re,tn,ot,bt);z.pixelStorei(z.UNPACK_ROW_LENGTH,Xn),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,ct),z.pixelStorei(z.UNPACK_SKIP_PIXELS,vn),z.pixelStorei(z.UNPACK_SKIP_ROWS,rs),z.pixelStorei(z.UNPACK_SKIP_IMAGES,an),V===0&&G.generateMipmaps&&z.generateMipmap(Be),we.unbindTexture()},this.copyTextureToTexture3D=function(I,G,J=null,Z=null,V=0){return I.isTexture!==!0&&(pr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),J=arguments[0]||null,Z=arguments[1]||null,I=arguments[2],G=arguments[3],V=arguments[4]||0),pr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(I,G,J,Z,V)},this.initRenderTarget=function(I){Le.get(I).__webglFramebuffer===void 0&&D.setupRenderTarget(I)},this.initTexture=function(I){I.isCubeTexture?D.setTextureCube(I,0):I.isData3DTexture?D.setTexture3D(I,0):I.isDataArrayTexture||I.isCompressedArrayTexture?D.setTexture2DArray(I,0):D.setTexture2D(I,0),we.unbindTexture()},this.resetState=function(){S=0,T=0,A=null,we.reset(),st.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}}class Ml{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ie(e),this.density=t}clone(){return new Ml(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class X_ extends xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new rn,this.environmentIntensity=1,this.environmentRotation=new rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Ud{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Xc,this.updateRanges=[],this.version=0,this.uuid=An()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=An()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=An()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Xt=new N;class Cr{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix4(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.applyNormalMatrix(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.transformDirection(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ft(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=wn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=wn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=wn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=wn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array),r=ft(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Mt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Cr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Nd extends Rn{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Ie(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let vs;const ir=new N,Ms=new N,ys=new N,Ss=new fe,sr=new fe,Fd=new He,la=new N,rr=new N,ha=new N,Yh=new fe,Wo=new fe,Kh=new fe;class q_ extends xt{constructor(e=new Nd){if(super(),this.isSprite=!0,this.type="Sprite",vs===void 0){vs=new mt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ud(t,5);vs.setIndex([0,1,2,0,2,3]),vs.setAttribute("position",new Cr(n,3,0,!1)),vs.setAttribute("uv",new Cr(n,2,3,!1))}this.geometry=vs,this.material=e,this.center=new fe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ms.setFromMatrixScale(this.matrixWorld),Fd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ys.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ms.multiplyScalar(-ys.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;ua(la.set(-.5,-.5,0),ys,a,Ms,s,r),ua(rr.set(.5,-.5,0),ys,a,Ms,s,r),ua(ha.set(.5,.5,0),ys,a,Ms,s,r),Yh.set(0,0),Wo.set(1,0),Kh.set(1,1);let o=e.ray.intersectTriangle(la,rr,ha,!1,ir);if(o===null&&(ua(rr.set(-.5,.5,0),ys,a,Ms,s,r),Wo.set(0,1),o=e.ray.intersectTriangle(la,ha,rr,!1,ir),o===null))return;const c=e.ray.origin.distanceTo(ir);c<e.near||c>e.far||t.push({distance:c,point:ir.clone(),uv:pn.getInterpolation(ir,la,rr,ha,Yh,Wo,Kh,new fe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function ua(i,e,t,n,s,r){Ss.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(sr.x=r*Ss.x-s*Ss.y,sr.y=s*Ss.x+r*Ss.y):sr.copy(Ss),i.copy(e),i.x+=sr.x,i.y+=sr.y,i.applyMatrix4(Fd)}const Jh=new N,Zh=new at,Qh=new at,j_=new N,$h=new He,da=new N,Xo=new Gn,eu=new He,qo=new Ur;class eo extends Ge{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=eh,this.bindMatrix=new He,this.bindMatrixInverse=new He,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Pn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,da),this.boundingBox.expandByPoint(da)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Gn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,da),this.boundingSphere.expandByPoint(da)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xo.copy(this.boundingSphere),Xo.applyMatrix4(s),e.ray.intersectsSphere(Xo)!==!1&&(eu.copy(s).invert(),qo.copy(e.ray).applyMatrix4(eu),!(this.boundingBox!==null&&qo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,qo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new at,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===eh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ep?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;Zh.fromBufferAttribute(s.attributes.skinIndex,e),Qh.fromBufferAttribute(s.attributes.skinWeight,e),Jh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=Qh.getComponent(r);if(a!==0){const o=Zh.getComponent(r);$h.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(j_.copy(Jh).applyMatrix4($h),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Od extends xt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class yl extends Rt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Qt,h=Qt,d,u){super(null,a,o,c,l,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const tu=new He,Y_=new He;class to{constructor(e=[],t=[]){this.uuid=An(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new He)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new He;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:Y_;tu.multiplyMatrices(o,t[r]),tu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new to(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new yl(t,e,e,mn,nn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Od),this.bones.push(a),this.boneInverses.push(new He().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=n[s];e.boneInverses.push(o.toArray())}return e}}class Yc extends Mt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Es=new He,nu=new He,fa=[],iu=new Pn,K_=new He,ar=new Ge,or=new Gn;class Ha extends Ge{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Yc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,K_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Pn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Es),iu.copy(e.boundingBox).applyMatrix4(Es),this.boundingBox.union(iu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Gn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Es),or.copy(e.boundingSphere).applyMatrix4(Es),this.boundingSphere.union(or)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(ar.geometry=this.geometry,ar.material=this.material,ar.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),or.copy(this.boundingSphere),or.applyMatrix4(n),e.ray.intersectsSphere(or)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Es),nu.multiplyMatrices(n,Es),ar.matrixWorld=nu,ar.raycast(e,fa);for(let a=0,o=fa.length;a<o;a++){const c=fa[a];c.instanceId=r,c.object=this,t.push(c)}fa.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Yc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new yl(new Float32Array(s*this.count),s,this.count,ul,nn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class zd extends Rn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Ie(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ga=new N,Va=new N,su=new He,cr=new Ur,pa=new Gn,jo=new N,ru=new N;class Sl extends xt{constructor(e=new mt,t=new zd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ga.fromBufferAttribute(t,s-1),Va.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ga.distanceTo(Va);e.setAttribute("lineDistance",new qe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pa.copy(n.boundingSphere),pa.applyMatrix4(s),pa.radius+=r,e.ray.intersectsSphere(pa)===!1)return;su.copy(s).invert(),cr.copy(e.ray).applyMatrix4(su);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let _=f,g=p-1;_<g;_+=l){const m=h.getX(_),v=h.getX(_+1),x=ma(this,e,cr,c,m,v);x&&t.push(x)}if(this.isLineLoop){const _=h.getX(p-1),g=h.getX(f),m=ma(this,e,cr,c,_,g);m&&t.push(m)}}else{const f=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let _=f,g=p-1;_<g;_+=l){const m=ma(this,e,cr,c,_,_+1);m&&t.push(m)}if(this.isLineLoop){const _=ma(this,e,cr,c,p-1,f);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ma(i,e,t,n,s,r){const a=i.geometry.attributes.position;if(Ga.fromBufferAttribute(a,s),Va.fromBufferAttribute(a,r),t.distanceSqToSegment(Ga,Va,jo,ru)>n)return;jo.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(jo);if(!(c<e.near||c>e.far))return{distance:c,point:ru.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const au=new N,ou=new N;class J_ extends Sl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)au.fromBufferAttribute(t,s),ou.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+au.distanceTo(ou);e.setAttribute("lineDistance",new qe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Z_ extends Sl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Bd extends Rn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Ie(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const cu=new He,Kc=new Ur,ga=new Gn,ba=new N;class Jc extends xt{constructor(e=new mt,t=new Bd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ga.copy(n.boundingSphere),ga.applyMatrix4(s),ga.radius+=r,e.ray.intersectsSphere(ga)===!1)return;cu.copy(s).invert(),Kc.copy(e.ray).applyMatrix4(cu);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){const u=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let p=u,_=f;p<_;p++){const g=l.getX(p);ba.fromBufferAttribute(d,g),lu(ba,g,c,s,e,t,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let p=u,_=f;p<_;p++)ba.fromBufferAttribute(d,p),lu(ba,p,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function lu(i,e,t,n,s,r,a){const o=Kc.distanceSqToPoint(i);if(o<t){const c=new N;Kc.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class ns extends Rt{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class fi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);const h=n[s],u=n[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new fe:new N);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new N,s=[],r=[],a=[],o=new N,c=new He;for(let f=0;f<=e;f++){const p=f/e;s[f]=this.getTangentAt(p,new N)}r[0]=new N,a[0]=new N;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),u<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(Tt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,p))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Tt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let p=1;p<=e;p++)r[p].applyMatrix4(c.makeRotationAxis(s[p],f*p)),a[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class kd extends fi{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new fe){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=c-this.aX,f=l-this.aY;c=u*h-f*d+this.aX,l=u*d+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Q_ extends kd{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function El(){let i=0,e=0,t=0,n=0;function s(r,a,o,c){i=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,d){let u=(a-r)/l-(o-r)/(l+h)+(o-a)/h,f=(o-a)/h-(c-a)/(h+d)+(c-o)/d;u*=h,f*=h,s(a,o,u,f)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const _a=new N,Yo=new El,Ko=new El,Jo=new El;class Hd extends fi{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new N){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(_a.subVectors(s[0],s[1]).add(s[0]),l=_a);const d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(_a.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=_a),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(l.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),Yo.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,p,_,g),Ko.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,p,_,g),Jo.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,p,_,g)}else this.curveType==="catmullrom"&&(Yo.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),Ko.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),Jo.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return n.set(Yo.calc(c),Ko.calc(c),Jo.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new N().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function hu(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*i+t}function $_(i,e){const t=1-i;return t*t*e}function ex(i,e){return 2*(1-i)*i*e}function tx(i,e){return i*i*e}function xr(i,e,t,n){return $_(i,e)+ex(i,t)+tx(i,n)}function nx(i,e){const t=1-i;return t*t*t*e}function ix(i,e){const t=1-i;return 3*t*t*i*e}function sx(i,e){return 3*(1-i)*i*i*e}function rx(i,e){return i*i*i*e}function vr(i,e,t,n,s){return nx(i,e)+ix(i,t)+sx(i,n)+rx(i,s)}class ax extends fi{constructor(e=new fe,t=new fe,n=new fe,s=new fe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new fe){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(vr(e,s.x,r.x,a.x,o.x),vr(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ox extends fi{constructor(e=new N,t=new N,n=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new N){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(vr(e,s.x,r.x,a.x,o.x),vr(e,s.y,r.y,a.y,o.y),vr(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class cx extends fi{constructor(e=new fe,t=new fe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new fe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new fe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class lx extends fi{constructor(e=new N,t=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new N){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new N){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class hx extends fi{constructor(e=new fe,t=new fe,n=new fe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new fe){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(xr(e,s.x,r.x,a.x),xr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Gd extends fi{constructor(e=new N,t=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new N){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(xr(e,s.x,r.x,a.x),xr(e,s.y,r.y,a.y),xr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ux extends fi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new fe){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(hu(o,c.x,l.x,h.x,d.x),hu(o,c.y,l.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new fe().fromArray(s))}return this}}var dx=Object.freeze({__proto__:null,ArcCurve:Q_,CatmullRomCurve3:Hd,CubicBezierCurve:ax,CubicBezierCurve3:ox,EllipseCurve:kd,LineCurve:cx,LineCurve3:lx,QuadraticBezierCurve:hx,QuadraticBezierCurve3:Gd,SplineCurve:ux});class no extends mt{constructor(e=[new fe(0,-.5),new fe(.5,0),new fe(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Tt(s,0,Math.PI*2);const r=[],a=[],o=[],c=[],l=[],h=1/t,d=new N,u=new fe,f=new N,p=new N,_=new N;let g=0,m=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:g=e[v+1].x-e[v].x,m=e[v+1].y-e[v].y,f.x=m*1,f.y=-g,f.z=m*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:g=e[v+1].x-e[v].x,m=e[v+1].y-e[v].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(p)}for(let v=0;v<=t;v++){const x=n+v*h*s,b=Math.sin(x),E=Math.cos(x);for(let S=0;S<=e.length-1;S++){d.x=e[S].x*b,d.y=e[S].y,d.z=e[S].x*E,a.push(d.x,d.y,d.z),u.x=v/t,u.y=S/(e.length-1),o.push(u.x,u.y);const T=c[3*S+0]*b,A=c[3*S+1],M=c[3*S+0]*E;l.push(T,A,M)}}for(let v=0;v<t;v++)for(let x=0;x<e.length-1;x++){const b=x+v*e.length,E=b,S=b+e.length,T=b+e.length+1,A=b+1;r.push(E,S,A),r.push(T,A,S)}this.setIndex(r),this.setAttribute("position",new qe(a,3)),this.setAttribute("uv",new qe(o,2)),this.setAttribute("normal",new qe(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new no(e.points,e.segments,e.phiStart,e.phiLength)}}class Nr extends mt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new N,h=new fe;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){const f=n+d/t*s;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,c.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new qe(a,3)),this.setAttribute("normal",new qe(o,3)),this.setAttribute("uv",new qe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nr(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ft extends mt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],f=[];let p=0;const _=[],g=n/2;let m=0;v(),a===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new qe(d,3)),this.setAttribute("normal",new qe(u,3)),this.setAttribute("uv",new qe(f,2));function v(){const b=new N,E=new N;let S=0;const T=(t-e)/n;for(let A=0;A<=r;A++){const M=[],y=A/r,C=y*(t-e)+e;for(let U=0;U<=s;U++){const w=U/s,P=w*c+o,L=Math.sin(P),F=Math.cos(P);E.x=C*L,E.y=-y*n+g,E.z=C*F,d.push(E.x,E.y,E.z),b.set(L,T,F).normalize(),u.push(b.x,b.y,b.z),f.push(w,1-y),M.push(p++)}_.push(M)}for(let A=0;A<s;A++)for(let M=0;M<r;M++){const y=_[M][A],C=_[M+1][A],U=_[M+1][A+1],w=_[M][A+1];(e>0||M!==0)&&(h.push(y,C,w),S+=3),(t>0||M!==r-1)&&(h.push(C,U,w),S+=3)}l.addGroup(m,S,0),m+=S}function x(b){const E=p,S=new fe,T=new N;let A=0;const M=b===!0?e:t,y=b===!0?1:-1;for(let U=1;U<=s;U++)d.push(0,g*y,0),u.push(0,y,0),f.push(.5,.5),p++;const C=p;for(let U=0;U<=s;U++){const P=U/s*c+o,L=Math.cos(P),F=Math.sin(P);T.x=M*F,T.y=g*y,T.z=M*L,d.push(T.x,T.y,T.z),u.push(0,y,0),S.x=L*.5+.5,S.y=F*.5*y+.5,f.push(S.x,S.y),p++}for(let U=0;U<s;U++){const w=E+U,P=C+U;b===!0?h.push(P,P+1,w):h.push(P+1,P,w),A+=3}l.addGroup(m,A,b===!0?1:2),m+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ft(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class qs extends Ft{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new qs(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class io extends mt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),l(n),h(),this.setAttribute("position",new qe(r,3)),this.setAttribute("normal",new qe(r.slice(),3)),this.setAttribute("uv",new qe(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const x=new N,b=new N,E=new N;for(let S=0;S<t.length;S+=3)f(t[S+0],x),f(t[S+1],b),f(t[S+2],E),c(x,b,E,v)}function c(v,x,b,E){const S=E+1,T=[];for(let A=0;A<=S;A++){T[A]=[];const M=v.clone().lerp(b,A/S),y=x.clone().lerp(b,A/S),C=S-A;for(let U=0;U<=C;U++)U===0&&A===S?T[A][U]=M:T[A][U]=M.clone().lerp(y,U/C)}for(let A=0;A<S;A++)for(let M=0;M<2*(S-A)-1;M++){const y=Math.floor(M/2);M%2===0?(u(T[A][y+1]),u(T[A+1][y]),u(T[A][y])):(u(T[A][y+1]),u(T[A+1][y+1]),u(T[A+1][y]))}}function l(v){const x=new N;for(let b=0;b<r.length;b+=3)x.x=r[b+0],x.y=r[b+1],x.z=r[b+2],x.normalize().multiplyScalar(v),r[b+0]=x.x,r[b+1]=x.y,r[b+2]=x.z}function h(){const v=new N;for(let x=0;x<r.length;x+=3){v.x=r[x+0],v.y=r[x+1],v.z=r[x+2];const b=g(v)/2/Math.PI+.5,E=m(v)/Math.PI+.5;a.push(b,1-E)}p(),d()}function d(){for(let v=0;v<a.length;v+=6){const x=a[v+0],b=a[v+2],E=a[v+4],S=Math.max(x,b,E),T=Math.min(x,b,E);S>.9&&T<.1&&(x<.2&&(a[v+0]+=1),b<.2&&(a[v+2]+=1),E<.2&&(a[v+4]+=1))}}function u(v){r.push(v.x,v.y,v.z)}function f(v,x){const b=v*3;x.x=e[b+0],x.y=e[b+1],x.z=e[b+2]}function p(){const v=new N,x=new N,b=new N,E=new N,S=new fe,T=new fe,A=new fe;for(let M=0,y=0;M<r.length;M+=9,y+=6){v.set(r[M+0],r[M+1],r[M+2]),x.set(r[M+3],r[M+4],r[M+5]),b.set(r[M+6],r[M+7],r[M+8]),S.set(a[y+0],a[y+1]),T.set(a[y+2],a[y+3]),A.set(a[y+4],a[y+5]),E.copy(v).add(x).add(b).divideScalar(3);const C=g(E);_(S,y+0,v,C),_(T,y+2,x,C),_(A,y+4,b,C)}}function _(v,x,b,E){E<0&&v.x===1&&(a[x]=v.x-1),b.x===0&&b.z===0&&(a[x]=E/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new io(e.vertices,e.indices,e.radius,e.details)}}class so extends io{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new so(e.radius,e.detail)}}class is extends mt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],d=new N,u=new N,f=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){const v=[],x=m/n;let b=0;m===0&&a===0?b=.5/t:m===n&&c===Math.PI&&(b=-.5/t);for(let E=0;E<=t;E++){const S=E/t;d.x=-e*Math.cos(s+S*r)*Math.sin(a+x*o),d.y=e*Math.cos(a+x*o),d.z=e*Math.sin(s+S*r)*Math.sin(a+x*o),p.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),g.push(S+b,1-x),v.push(l++)}h.push(v)}for(let m=0;m<n;m++)for(let v=0;v<t;v++){const x=h[m][v+1],b=h[m][v],E=h[m+1][v],S=h[m+1][v+1];(m!==0||a>0)&&f.push(x,b,S),(m!==n-1||c<Math.PI)&&f.push(b,E,S)}this.setIndex(f),this.setAttribute("position",new qe(p,3)),this.setAttribute("normal",new qe(_,3)),this.setAttribute("uv",new qe(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new is(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class wl extends io{constructor(e=1,t=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,s,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new wl(e.radius,e.detail)}}class $i extends mt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],c=[],l=[],h=new N,d=new N,u=new N;for(let f=0;f<=n;f++)for(let p=0;p<=s;p++){const _=p/s*r,g=f/n*Math.PI*2;d.x=(e+t*Math.cos(g))*Math.cos(_),d.y=(e+t*Math.cos(g))*Math.sin(_),d.z=t*Math.sin(g),o.push(d.x,d.y,d.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),u.subVectors(d,h).normalize(),c.push(u.x,u.y,u.z),l.push(p/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=s;p++){const _=(s+1)*f+p-1,g=(s+1)*(f-1)+p-1,m=(s+1)*(f-1)+p,v=(s+1)*f+p;a.push(_,g,v),a.push(g,m,v)}this.setIndex(a),this.setAttribute("position",new qe(o,3)),this.setAttribute("normal",new qe(c,3)),this.setAttribute("uv",new qe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Tl extends mt{constructor(e=new Gd(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new N,c=new N,l=new fe;let h=new N;const d=[],u=[],f=[],p=[];_(),this.setIndex(p),this.setAttribute("position",new qe(d,3)),this.setAttribute("normal",new qe(u,3)),this.setAttribute("uv",new qe(f,2));function _(){for(let x=0;x<t;x++)g(x);g(r===!1?t:0),v(),m()}function g(x){h=e.getPointAt(x/t,h);const b=a.normals[x],E=a.binormals[x];for(let S=0;S<=s;S++){const T=S/s*Math.PI*2,A=Math.sin(T),M=-Math.cos(T);c.x=M*b.x+A*E.x,c.y=M*b.y+A*E.y,c.z=M*b.z+A*E.z,c.normalize(),u.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,d.push(o.x,o.y,o.z)}}function m(){for(let x=1;x<=t;x++)for(let b=1;b<=s;b++){const E=(s+1)*(x-1)+(b-1),S=(s+1)*x+(b-1),T=(s+1)*x+b,A=(s+1)*(x-1)+b;p.push(E,S,A),p.push(S,T,A)}}function v(){for(let x=0;x<=t;x++)for(let b=0;b<=s;b++)l.x=x/t,l.y=b/s,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Tl(new dx[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class fx extends Dt{static get type(){return"RawShaderMaterial"}constructor(e){super(e),this.isRawShaderMaterial=!0}}class it extends Rn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ie(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=_d,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _n extends it{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new fe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Tt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ie(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ie(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ie(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function xa(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function px(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function mx(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function uu(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=i[o+c]}return s}function Vd(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}class Fr{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break t}a=t.length;break n}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class gx extends Fr{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ts,endingEnd:Ts}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case As:r=e,o=2*t-n;break;case Ba:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case As:a=e,c=2*n-t;break;case Ba:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,p=(n-t)/(s-t),_=p*p,g=_*p,m=-u*g+2*u*_-u*p,v=(1+u)*g+(-1.5-2*u)*_+(-.5+u)*p+1,x=(-1-f)*g+(1.5+f)*_+.5*p,b=f*g-f*_;for(let E=0;E!==o;++E)r[E]=m*a[h+E]+v*a[l+E]+x*a[c+E]+b*a[d+E];return r}}class Wd extends Fr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(s-t),d=1-h;for(let u=0;u!==o;++u)r[u]=a[l+u]*d+a[c+u]*h;return r}}class bx extends Fr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Vn{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=xa(t,this.TimeBufferType),this.values=xa(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:xa(e.times,Array),values:xa(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new bx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Wd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new gx(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case wr:t=this.InterpolantFactoryMethodDiscrete;break;case Tr:t=this.InterpolantFactoryMethodLinear;break;case go:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return wr;case this.InterpolantFactoryMethodLinear:return Tr;case this.InterpolantFactoryMethodSmooth:return go}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&px(s))for(let o=0,c=s.length;o!==c;++o){const l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===go,r=e.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(s)c=!0;else{const d=o*n,u=d-n,f=d+n;for(let p=0;p!==n;++p){const _=t[d+p];if(_!==t[u+p]||_!==t[f+p]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const d=o*n,u=a*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}Vn.prototype.TimeBufferType=Float32Array;Vn.prototype.ValueBufferType=Float32Array;Vn.prototype.DefaultInterpolation=Tr;class js extends Vn{constructor(e,t,n){super(e,t,n)}}js.prototype.ValueTypeName="bool";js.prototype.ValueBufferType=Array;js.prototype.DefaultInterpolation=wr;js.prototype.InterpolantFactoryMethodLinear=void 0;js.prototype.InterpolantFactoryMethodSmooth=void 0;class Xd extends Vn{}Xd.prototype.ValueTypeName="color";class Hs extends Vn{}Hs.prototype.ValueTypeName="number";class _x extends Fr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t);let l=e*o;for(let h=l+o;l!==h;l+=4)$t.slerpFlat(r,0,a,l-o,a,l,c);return r}}class Gs extends Vn{InterpolantFactoryMethodLinear(e){return new _x(this.times,this.values,this.getValueSize(),e)}}Gs.prototype.ValueTypeName="quaternion";Gs.prototype.InterpolantFactoryMethodSmooth=void 0;class Ys extends Vn{constructor(e,t,n){super(e,t,n)}}Ys.prototype.ValueTypeName="string";Ys.prototype.ValueBufferType=Array;Ys.prototype.DefaultInterpolation=wr;Ys.prototype.InterpolantFactoryMethodLinear=void 0;Ys.prototype.InterpolantFactoryMethodSmooth=void 0;class Vs extends Vn{}Vs.prototype.ValueTypeName="vector";class Zc{constructor(e="",t=-1,n=[],s=ml){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=An(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(vx(n[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(Vn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const h=mx(c);c=uu(c,1,h),l=uu(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Hs(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],h=l.name.match(r);if(h&&h.length>1){const d=h[1];let u=s[d];u||(s[d]=u=[]),u.push(l)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,u,f,p,_){if(f.length!==0){const g=[],m=[];Vd(f,g,m,p),g.length!==0&&_.push(new d(u,g,m))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let d=0;d<l.length;d++){const u=l[d].keys;if(!(!u||u.length===0))if(u[0].morphTargets){const f={};let p;for(p=0;p<u.length;p++)if(u[p].morphTargets)for(let _=0;_<u[p].morphTargets.length;_++)f[u[p].morphTargets[_]]=-1;for(const _ in f){const g=[],m=[];for(let v=0;v!==u[p].morphTargets.length;++v){const x=u[p];g.push(x.time),m.push(x.morphTarget===_?1:0)}s.push(new Hs(".morphTargetInfluence["+_+"]",g,m))}c=f.length*a}else{const f=".bones["+t[d].name+"]";n(Vs,f+".position",u,"pos",s),n(Gs,f+".quaternion",u,"rot",s),n(Vs,f+".scale",u,"scl",s)}}return s.length===0?null:new this(r,c,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function xx(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Hs;case"vector":case"vector2":case"vector3":case"vector4":return Vs;case"color":return Xd;case"quaternion":return Gs;case"bool":case"boolean":return js;case"string":return Ys}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function vx(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=xx(i.type);if(i.times===void 0){const t=[],n=[];Vd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Ri={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class qd{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){const d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){const f=l[d],p=l[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null}}}const Mx=new qd;class ss{constructor(e){this.manager=e!==void 0?e:Mx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}ss.DEFAULT_MATERIAL_NAME="__DEFAULT";const Zn={};class yx extends Error{constructor(e,t){super(e),this.response=t}}class Al extends ss{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Ri.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Zn[e]!==void 0){Zn[e].push({onLoad:t,onProgress:n,onError:s});return}Zn[e]=[],Zn[e].push({onLoad:t,onProgress:n,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Zn[e],d=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=u?parseInt(u):0,p=f!==0;let _=0;const g=new ReadableStream({start(m){v();function v(){d.read().then(({done:x,value:b})=>{if(x)m.close();else{_+=b.byteLength;const E=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let S=0,T=h.length;S<T;S++){const A=h[S];A.onProgress&&A.onProgress(E)}m.enqueue(b),v()}},x=>{m.error(x)})}}});return new Response(g)}else throw new yx(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o===void 0)return l.text();{const d=/charset="?([^;"\s]*)"?/i.exec(o),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return l.arrayBuffer().then(p=>f.decode(p))}}}).then(l=>{Ri.add(e,l);const h=Zn[e];delete Zn[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=Zn[e];if(h===void 0)throw this.manager.itemError(e),l;delete Zn[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Sx extends ss{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ri.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=Ar("img");function c(){h(),Ri.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(d){h(),s&&s(d),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class Ex extends ss{constructor(e){super(e)}load(e,t,n,s){const r=this,a=new yl,o=new Al(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(r.withCredentials),o.load(e,function(c){let l;try{l=r.parse(c)}catch(h){if(s!==void 0)s(h);else{console.error(h);return}}l.image!==void 0?a.image=l.image:l.data!==void 0&&(a.image.width=l.width,a.image.height=l.height,a.image.data=l.data),a.wrapS=l.wrapS!==void 0?l.wrapS:Bn,a.wrapT=l.wrapT!==void 0?l.wrapT:Bn,a.magFilter=l.magFilter!==void 0?l.magFilter:Lt,a.minFilter=l.minFilter!==void 0?l.minFilter:Lt,a.anisotropy=l.anisotropy!==void 0?l.anisotropy:1,l.colorSpace!==void 0&&(a.colorSpace=l.colorSpace),l.flipY!==void 0&&(a.flipY=l.flipY),l.format!==void 0&&(a.format=l.format),l.type!==void 0&&(a.type=l.type),l.mipmaps!==void 0&&(a.mipmaps=l.mipmaps,a.minFilter=kn),l.mipmapCount===1&&(a.minFilter=Lt),l.generateMipmaps!==void 0&&(a.generateMipmaps=l.generateMipmaps),a.needsUpdate=!0,t&&t(a,l)},n,s),a}}class jd extends ss{constructor(e){super(e)}load(e,t,n,s){const r=new Rt,a=new Sx(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class ro extends xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ie(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class wx extends ro{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ie(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Zo=new He,du=new N,fu=new N;class Rl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new fe(512,512),this.map=null,this.mapPass=null,this.matrix=new He,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xl,this._frameExtents=new fe(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;du.setFromMatrixPosition(e.matrixWorld),t.position.copy(du),fu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(fu),t.updateMatrixWorld(),Zo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Zo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Tx extends Rl{constructor(){super(new Yt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Bs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Ax extends ro{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Tx}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const pu=new He,lr=new N,Qo=new N;class Rx extends Rl{constructor(){super(new Yt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new fe(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),lr.setFromMatrixPosition(e.matrixWorld),n.position.copy(lr),Qo.copy(n.position),Qo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Qo),n.updateMatrixWorld(),s.makeTranslation(-lr.x,-lr.y,-lr.z),pu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(pu)}}class Yd extends ro{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Rx}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Cx extends Rl{constructor(){super(new Qa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Kd extends ro{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.shadow=new Cx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Mr{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Px extends ss{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ri.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Ri.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),Ri.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Ri.add(e,c),r.manager.itemStart(e)}}class Jd{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=mu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=mu();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function mu(){return performance.now()}class Ix{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,a;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,s=this.valueSize,r=e*s+s;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)n[r+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,r,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const c=t*this._origIndex;this._mixBufferRegion(n,s,c,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){o.setValue(n,s);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,a=s;r!==a;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,s){$t.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){const a=this._workIndex*r;$t.multiplyQuaternionsFlat(e,a,e,t,e,n),$t.slerpFlat(e,t,e,t,e,a,s)}_lerp(e,t,n,s,r){const a=1-s;for(let o=0;o!==r;++o){const c=t+o;e[c]=e[c]*a+e[n+o]*s}}_lerpAdditive(e,t,n,s,r){for(let a=0;a!==r;++a){const o=t+a;e[o]=e[o]+e[n+a]*s}}}const Cl="\\[\\]\\.:\\/",Lx=new RegExp("["+Cl+"]","g"),Pl="[^"+Cl+"]",Dx="[^"+Cl.replace("\\.","")+"]",Ux=/((?:WC+[\/:])*)/.source.replace("WC",Pl),Nx=/(WCOD+)?/.source.replace("WCOD",Dx),Fx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Pl),Ox=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Pl),zx=new RegExp("^"+Ux+Nx+Fx+Ox+"$"),Bx=["material","materials","bones","map"];class kx{constructor(e,t,n){const s=n||ht.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ht{constructor(e,t,n){this.path=t,this.parsedPath=n||ht.parseTrackName(t),this.node=ht.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ht.Composite(e,t,n):new ht(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Lx,"")}static parseTrackName(e){const t=zx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);Bx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=ht.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[s];if(a===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ht.Composite=kx;ht.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ht.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ht.prototype.GetterByBindingType=[ht.prototype._getValue_direct,ht.prototype._getValue_array,ht.prototype._getValue_arrayElement,ht.prototype._getValue_toArray];ht.prototype.SetterByBindingTypeAndVersioning=[[ht.prototype._setValue_direct,ht.prototype._setValue_direct_setNeedsUpdate,ht.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_array,ht.prototype._setValue_array_setNeedsUpdate,ht.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_arrayElement,ht.prototype._setValue_arrayElement_setNeedsUpdate,ht.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_fromArray,ht.prototype._setValue_fromArray_setNeedsUpdate,ht.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Hx{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;const r=t.tracks,a=r.length,o=new Array(a),c={endingStart:Ts,endingEnd:Ts};for(let l=0;l!==a;++l){const h=r[l].createInterpolant(null);o[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=gd,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const s=this._clip.duration,r=e._clip.duration,a=r/s,o=s/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const s=this._mixer,r=s.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);const c=o.parameterPositions,l=o.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/a,l[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case np:for(let h=0,d=c.length;h!==d;++h)c[h].evaluate(a),l[h].accumulateAdditive(o);break;case ml:default:for(let h=0,d=c.length;h!==d;++h)c[h].evaluate(a),l[h].accumulate(s,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let s=this.time+e,r=this._loopCount;const a=n===tp;if(e===0)return r===-1?s:a&&(r&1)===1?t-s:s;if(n===md){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=t||s<0){const o=Math.floor(s/t);s-=t*o,r+=Math.abs(o);const c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){const l=e<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=s;if(a&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){const s=this._interpolantSettings;n?(s.endingStart=As,s.endingEnd=As):(e?s.endingStart=this.zeroSlopeAtStart?As:Ts:s.endingStart=Ba,t?s.endingEnd=this.zeroSlopeAtEnd?As:Ts:s.endingEnd=Ba)}_scheduleFading(e,t,n){const s=this._mixer,r=s.time;let a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,c=a.sampleValues;return o[0]=r,c[0]=t,o[1]=r+e,c[1]=n,this}}const Gx=new Float32Array(1);class Wa extends ts{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,a=e._propertyBindings,o=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let h=l[c];h===void 0&&(h={},l[c]=h);for(let d=0;d!==r;++d){const u=s[d],f=u.name;let p=h[f];if(p!==void 0)++p.referenceCount,a[d]=p;else{if(p=a[d],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,c,f));continue}const _=t&&t._propertyBindings[d].binding.parsedPath;p=new Ix(ht.create(n,f,_),u.ValueTypeName,u.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,c,f),a[d]=p}o[d].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const s=this._actions,r=this._actionsByClip;let a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=s.length,s.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,a=this._actionsByClip,o=a[r],c=o.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;const d=o.actionByRoot,u=(e._localRoot||this._root).uuid;delete d[u],c.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const s=this._bindingsByRootAndName,r=this._bindings;let a=s[t];a===void 0&&(a={},s[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[s],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[s]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Wd(new Float32Array(2),new Float32Array(2),1,Gx),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const s=t||this._root,r=s.uuid;let a=typeof e=="string"?Zc.findByName(s,e):e;const o=a!==null?a.uuid:e,c=this._actionsByClip[o];let l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=ml),c!==void 0){const d=c.actionByRoot[r];if(d!==void 0&&d.blendMode===n)return d;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;const h=new Hx(this,a,t,n);return this._bindAction(h,l),this._addInactiveAction(h,o,r),h}existingAction(e,t){const n=t||this._root,s=n.uuid,r=typeof e=="string"?Zc.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(s,e,r,a);const o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){const a=r.knownActions;for(let o=0,c=a.length;o!==c;++o){const l=a[o];this._deactivateAction(l);const h=l._cacheIndex,d=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,d._cacheIndex=h,t[h]=d,t.pop(),this._removeInactiveBindingsForAction(l)}delete s[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,c=o[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(const a in r){const o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const gu=new He;class Vx{constructor(e,t,n=0,s=1/0){this.ray=new Ur(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new bl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return gu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(gu),this}intersectObject(e,t=!0,n=[]){return Qc(e,this,n,t),n.sort(bu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Qc(e[s],this,n,t);return n.sort(bu),n}}function bu(i,e){return i.distance-e.distance}function Qc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Qc(r[a],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:al}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=al);function Zd(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new mt;let l=0;for(let h=0;h<i.length;++h){const d=i[h];let u=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(e){let f;if(t)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(t){let h=0;const d=[];for(let u=0;u<i.length;++u){const f=i[u].index;for(let p=0;p<f.count;++p)d.push(f.getX(p)+h);h+=i[u].attributes.position.count}c.setIndex(d)}for(const h in r){const d=_u(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,d)}for(const h in a){const d=a[h][0].length;if(d===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let _=0;_<a[h].length;++_)f.push(a[h][_][u]);const p=_u(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(p)}}return c}function _u(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){const h=i[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}const a=new e(r),o=new Mt(a,t,n);let c=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const d=c/t;for(let u=0,f=h.count;u<f;u++)for(let p=0;p<t;p++){const _=h.getComponent(u,p);o.setComponent(u+d,p,_)}}else a.set(h.array,c);c+=h.count*t}return s!==void 0&&(o.gpuType=s),o}function xu(i,e){if(e===ip)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Wc||e===bd){let t=i.getIndex();if(t===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===Wc)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class Wx extends ss{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Kx(t)}),this.register(function(t){return new Jx(t)}),this.register(function(t){return new rv(t)}),this.register(function(t){return new av(t)}),this.register(function(t){return new ov(t)}),this.register(function(t){return new Qx(t)}),this.register(function(t){return new $x(t)}),this.register(function(t){return new ev(t)}),this.register(function(t){return new tv(t)}),this.register(function(t){return new Yx(t)}),this.register(function(t){return new nv(t)}),this.register(function(t){return new Zx(t)}),this.register(function(t){return new sv(t)}),this.register(function(t){return new iv(t)}),this.register(function(t){return new qx(t)}),this.register(function(t){return new cv(t)}),this.register(function(t){return new lv(t)})}load(e,t,n,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=Mr.extractUrlBase(e);a=Mr.resolveURL(l,this.path)}else a=Mr.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Al(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Qd){try{a[Qe.KHR_BINARY_GLTF]=new hv(e)}catch(d){s&&s(d);return}r=JSON.parse(a[Qe.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new Sv(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const d=this.pluginCallbacks[h](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[d.name]=d,a[d.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const d=r.extensionsUsed[h],u=r.extensionsRequired||[];switch(d){case Qe.KHR_MATERIALS_UNLIT:a[d]=new jx;break;case Qe.KHR_DRACO_MESH_COMPRESSION:a[d]=new uv(r,this.dracoLoader);break;case Qe.KHR_TEXTURE_TRANSFORM:a[d]=new dv;break;case Qe.KHR_MESH_QUANTIZATION:a[d]=new fv;break;default:u.indexOf(d)>=0&&o[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function Xx(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const Qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class qx{constructor(e){this.parser=e,this.name=Qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const h=new Ie(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Wt);const d=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Kd(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Yd(h),l.distance=d;break;case"spot":l=new Ax(h),l.distance=d,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,ei(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class jx{constructor(){this.name=Qe.KHR_MATERIALS_UNLIT}getMaterialType(){return ri}extendParams(e,t,n){const s=[];e.color=new Ie(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Wt),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,yt))}return Promise.all(s)}}class Yx{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Kx{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new fe(o,o)}return Promise.all(r)}}class Jx{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class Zx{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class Qx{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Ie(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Wt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,yt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class $x{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class ev{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Ie().setRGB(o[0],o[1],o[2],Wt),Promise.all(r)}}class tv{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class nv{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Ie().setRGB(o[0],o[1],o[2],Wt),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,yt)),Promise.all(r)}}class iv{constructor(e){this.parser=e,this.name=Qe.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class sv{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_n}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class rv{constructor(e){this.parser=e,this.name=Qe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class av{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class ov{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class cv{constructor(e){this.name=Qe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=s.byteOffset||0,l=s.byteLength||0,h=s.count,d=s.byteStride,u=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,d,u,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*d);return a.decodeGltfBuffer(new Uint8Array(f),h,d,u,s.mode,s.filter),f})})}else return null}}class lv{constructor(e){this.name=Qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==fn.TRIANGLES&&l.mode!==fn.TRIANGLE_STRIP&&l.mode!==fn.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const h=l.pop(),d=h.isGroup?h.children:[h],u=l[0].count,f=[];for(const p of d){const _=new He,g=new N,m=new $t,v=new N(1,1,1),x=new Ha(p.geometry,p.material,u);for(let b=0;b<u;b++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,b),c.ROTATION&&m.fromBufferAttribute(c.ROTATION,b),c.SCALE&&v.fromBufferAttribute(c.SCALE,b),x.setMatrixAt(b,_.compose(g,m,v));for(const b in c)if(b==="_COLOR_0"){const E=c[b];x.instanceColor=new Yc(E.array,E.itemSize,E.normalized)}else b!=="TRANSLATION"&&b!=="ROTATION"&&b!=="SCALE"&&p.geometry.setAttribute(b,c[b]);xt.prototype.copy.call(x,p),this.parser.assignFinalMaterial(x),f.push(x)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Qd="glTF",hr=12,vu={JSON:1313821514,BIN:5130562};class hv{constructor(e){this.name=Qe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,hr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Qd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-hr,r=new DataView(e,hr);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===vu.JSON){const l=new Uint8Array(e,hr+a,o);this.content=n.decode(l)}else if(c===vu.BIN){const l=hr+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class uv{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const h in a){const d=$c[h]||h.toLowerCase();o[d]=a[h]}for(const h in e.attributes){const d=$c[h]||h.toLowerCase();if(a[h]!==void 0){const u=n.accessors[e.attributes[h]],f=Ls[u.componentType];l[d]=f.name,c[d]=u.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(d,u){s.decodeDracoFile(h,function(f){for(const p in f.attributes){const _=f.attributes[p],g=c[p];g!==void 0&&(_.normalized=g)}d(f)},o,l,Wt,u)})})}}class dv{constructor(){this.name=Qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class fv{constructor(){this.name=Qe.KHR_MESH_QUANTIZATION}}class $d extends Fr{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=s-t,d=(n-t)/h,u=d*d,f=u*d,p=e*l,_=p-l,g=-2*f+3*u,m=f-u,v=1-g,x=m-u+d;for(let b=0;b!==o;b++){const E=a[_+b+o],S=a[_+b+c]*h,T=a[p+b+o],A=a[p+b]*h;r[b]=v*E+x*S+g*T+m*A}return r}}const pv=new $t;class mv extends $d{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return pv.fromArray(r).normalize().toArray(r),r}}const fn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ls={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Mu={9728:Qt,9729:Lt,9984:rd,9985:wa,9986:fr,9987:kn},yu={33071:Bn,33648:za,10497:Cn},$o={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},$c={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},yi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},gv={CUBICSPLINE:void 0,LINEAR:Tr,STEP:wr},ec={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function bv(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new it({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:li})),i.DefaultMaterial}function Hi(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ei(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function _v(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){const d=e[l];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(s=!0),d.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){const d=e[l];if(n){const u=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):i.attributes.position;a.push(u)}if(s){const u=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):i.attributes.normal;o.push(u)}if(r){const u=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):i.attributes.color;c.push(u)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const h=l[0],d=l[1],u=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=d),r&&(i.morphAttributes.color=u),i.morphTargetsRelative=!0,i})}function xv(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function vv(i){let e;const t=i.extensions&&i.extensions[Qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+tc(t.attributes):e=i.indices+":"+tc(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+tc(i.targets[n]);return e}function tc(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function el(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Mv(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const yv=new He;class Sv{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Xx,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new jd(this.options.manager):this.textureLoader=new Px(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Al(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return Hi(r,o,s),ei(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,h]of a.children.entries())r(h,o.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Qe.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(Mr.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=$o[s.type],o=Ls[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new Mt(l,a,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=$o[s.type],l=Ls[s.componentType],h=l.BYTES_PER_ELEMENT,d=h*c,u=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,p=s.normalized===!0;let _,g;if(f&&f!==d){const m=Math.floor(u/f),v="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+m+":"+s.count;let x=t.cache.get(v);x||(_=new l(o,m*f,s.count*f/h),x=new Ud(_,f/h),t.cache.add(v,x)),g=new Cr(x,c,u%f/h,p)}else o===null?_=new l(s.count*c):_=new l(o,u,s.count*c),g=new Mt(_,c,p);if(s.sparse!==void 0){const m=$o.SCALAR,v=Ls[s.sparse.indices.componentType],x=s.sparse.indices.byteOffset||0,b=s.sparse.values.byteOffset||0,E=new v(a[1],x,s.sparse.count*m),S=new l(a[2],b,s.sparse.count*c);o!==null&&(g=new Mt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let T=0,A=E.length;T<A;T++){const M=E[T];if(g.setX(M,S[T*c]),c>=2&&g.setY(M,S[T*c+1]),c>=3&&g.setZ(M,S[T*c+2]),c>=4&&g.setW(M,S[T*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const u=(r.samplers||{})[a.sampler]||{};return h.magFilter=Mu[u.magFilter]||Lt,h.minFilter=Mu[u.minFilter]||kn,h.wrapS=yu[u.wrapS]||Cn,h.wrapT=yu[u.wrapT]||Cn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Qt&&h.minFilter!==Lt,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const a=s.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(d){l=!0;const u=new Blob([d],{type:a.mimeType});return c=o.createObjectURL(u),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(d){return new Promise(function(u,f){let p=u;t.isImageBitmapLoader===!0&&(p=function(_){const g=new Rt(_);g.needsUpdate=!0,u(g)}),t.load(Mr.resolveURL(d,r.path),p,void 0,f)})}).then(function(d){return l===!0&&o.revokeObjectURL(c),ei(d,a),d.userData.mimeType=a.mimeType||Mv(a.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),d});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Qe.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Qe.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[Qe.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Bd,Rn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new zd,Rn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return it}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let a;const o={},c=r.extensions||{},l=[];if(c[Qe.KHR_MATERIALS_UNLIT]){const d=s[Qe.KHR_MATERIALS_UNLIT];a=d.getMaterialType(),l.push(d.extendParams(o,r,t))}else{const d=r.pbrMetallicRoughness||{};if(o.color=new Ie(1,1,1),o.opacity=1,Array.isArray(d.baseColorFactor)){const u=d.baseColorFactor;o.color.setRGB(u[0],u[1],u[2],Wt),o.opacity=u[3]}d.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",d.baseColorTexture,yt)),o.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,o.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",d.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",d.metallicRoughnessTexture))),a=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Et);const h=r.alphaMode||ec.OPAQUE;if(h===ec.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===ec.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==ri&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new fe(1,1),r.normalTexture.scale!==void 0)){const d=r.normalTexture.scale;o.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&a!==ri&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==ri){const d=r.emissiveFactor;o.emissive=new Ie().setRGB(d[0],d[1],d[2],Wt)}return r.emissiveTexture!==void 0&&a!==ri&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,yt)),Promise.all(l).then(function(){const d=new a(o);return r.name&&(d.name=r.name),ei(d,r),t.associations.set(d,{materials:e}),r.extensions&&Hi(s,d,r),d})}createUniqueName(e){const t=ht.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[Qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Su(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],h=vv(l),d=s[h];if(d)a.push(d.promise);else{let u;l.extensions&&l.extensions[Qe.KHR_DRACO_MESH_COMPRESSION]?u=r(l):u=Su(new mt,l,t),s[h]={primitive:l,promise:u},a.push(u)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const h=a[c].material===void 0?bv(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],d=[];for(let f=0,p=h.length;f<p;f++){const _=h[f],g=a[f];let m;const v=l[f];if(g.mode===fn.TRIANGLES||g.mode===fn.TRIANGLE_STRIP||g.mode===fn.TRIANGLE_FAN||g.mode===void 0)m=r.isSkinnedMesh===!0?new eo(_,v):new Ge(_,v),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),g.mode===fn.TRIANGLE_STRIP?m.geometry=xu(m.geometry,bd):g.mode===fn.TRIANGLE_FAN&&(m.geometry=xu(m.geometry,Wc));else if(g.mode===fn.LINES)m=new J_(_,v);else if(g.mode===fn.LINE_STRIP)m=new Sl(_,v);else if(g.mode===fn.LINE_LOOP)m=new Z_(_,v);else if(g.mode===fn.POINTS)m=new Jc(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&xv(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),ei(m,r),g.extensions&&Hi(s,m,g),t.assignFinalMaterial(m),d.push(m)}for(let f=0,p=d.length;f<p;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return r.extensions&&Hi(s,d[0],r),d[0];const u=new At;r.extensions&&Hi(s,u,r),t.associations.set(u,{meshes:e});for(let f=0,p=d.length;f<p;f++)u.add(d[f]);return u})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Yt(Fn.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Qa(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ei(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),a=s,o=[],c=[];for(let l=0,h=a.length;l<h;l++){const d=a[l];if(d){o.push(d);const u=new He;r!==null&&u.fromArray(r.array,l*16),c.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new to(o,c)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let d=0,u=s.channels.length;d<u;d++){const f=s.channels[d],p=s.samplers[f.sampler],_=f.target,g=_.node,m=s.parameters!==void 0?s.parameters[p.input]:p.input,v=s.parameters!==void 0?s.parameters[p.output]:p.output;_.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",m)),c.push(this.getDependency("accessor",v)),l.push(p),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(d){const u=d[0],f=d[1],p=d[2],_=d[3],g=d[4],m=[];for(let v=0,x=u.length;v<x;v++){const b=u[v],E=f[v],S=p[v],T=_[v],A=g[v];if(b===void 0)continue;b.updateMatrix&&b.updateMatrix();const M=n._createAnimationTracks(b,E,S,T,A);if(M)for(let y=0;y<M.length;y++)m.push(M[y])}return new Zc(r,void 0,m)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const h=l[0],d=l[1],u=l[2];u!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(u,yv)});for(let f=0,p=d.length;f<p;f++)h.add(d[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new Od:l.length>1?h=new At:l.length===1?h=l[0]:h=new xt,h!==l[0])for(let d=0,u=l.length;d<u;d++)h.add(l[d]);if(r.name&&(h.userData.name=r.name,h.name=a),ei(h,r),r.extensions&&Hi(n,h,r),r.matrix!==void 0){const d=new He;d.fromArray(r.matrix),h.applyMatrix4(d)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new At;n.name&&(r.name=s.createUniqueName(n.name)),ei(r,n),n.extensions&&Hi(t,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,d=c.length;h<d;h++)r.add(c[h]);const l=h=>{const d=new Map;for(const[u,f]of s.associations)(u instanceof Rn||u instanceof Rt)&&d.set(u,f);return h.traverse(u=>{const f=s.associations.get(u);f!=null&&d.set(u,f)}),d};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){const a=[],o=e.name?e.name:e.uuid,c=[];yi[r.path]===yi.weights?e.traverse(function(u){u.morphTargetInfluences&&c.push(u.name?u.name:u.uuid)}):c.push(o);let l;switch(yi[r.path]){case yi.weights:l=Hs;break;case yi.rotation:l=Gs;break;case yi.position:case yi.scale:l=Vs;break;default:switch(n.itemSize){case 1:l=Hs;break;case 2:case 3:default:l=Vs;break}break}const h=s.interpolation!==void 0?gv[s.interpolation]:Tr,d=this._getArrayFromAccessor(n);for(let u=0,f=c.length;u<f;u++){const p=new l(c[u]+"."+yi[r.path],t.array,d,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(p),a.push(p)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=el(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof Gs?mv:$d;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Ev(i,e,t){const n=e.attributes,s=new Pn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new N(c[0],c[1],c[2]),new N(l[0],l[1],l[2])),o.normalized){const h=el(Ls[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new N,c=new N;for(let l=0,h=r.length;l<h;l++){const d=r[l];if(d.POSITION!==void 0){const u=t.json.accessors[d.POSITION],f=u.min,p=u.max;if(f!==void 0&&p!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),u.normalized){const _=el(Ls[u.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new Gn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function Su(i,e,t){const n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(const a in n){const o=$c[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){const a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return tt.workingColorSpace!==Wt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${tt.workingColorSpace}" not supported.`),ei(i,e),Ev(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?_v(i,e.targets,t):i})}var wv=(function(){var i="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var s=WebAssembly.validate(t)?e:i,r,a=WebAssembly.instantiate(o(s),{}).then(function(m){r=m.instance,r.exports.__wasm_call_ctors()});function o(m){for(var v=new Uint8Array(m.length),x=0;x<m.length;++x){var b=m.charCodeAt(x);v[x]=b>96?b-97:b>64?b-39:b+4}for(var E=0,x=0;x<m.length;++x)v[E++]=v[x]<60?n[v[x]]:(v[x]-60)*64+v[++x];return v.buffer.slice(0,E)}function c(m,v,x,b,E,S){var T=r.exports.sbrk,A=x+3&-4,M=T(A*b),y=T(E.length),C=new Uint8Array(r.exports.memory.buffer);C.set(E,y);var U=m(M,x,b,y,E.length);if(U==0&&S&&S(M,A,b),v.set(C.subarray(M,M+x*b)),T(M-T(0)),U!=0)throw new Error("Malformed buffer data: "+U)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},h={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},d=[],u=0;function f(m){var v={object:new Worker(m),pending:0,requests:{}};return v.object.onmessage=function(x){var b=x.data;v.pending-=b.count,v.requests[b.id][b.action](b.value),delete v.requests[b.id]},v}function p(m){for(var v="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(o(s))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+c.toString()+g.toString(),x=new Blob([v],{type:"text/javascript"}),b=URL.createObjectURL(x),E=0;E<m;++E)d[E]=f(b);URL.revokeObjectURL(b)}function _(m,v,x,b,E){for(var S=d[0],T=1;T<d.length;++T)d[T].pending<S.pending&&(S=d[T]);return new Promise(function(A,M){var y=new Uint8Array(x),C=u++;S.pending+=m,S.requests[C]={resolve:A,reject:M},S.object.postMessage({id:C,count:m,size:v,source:y,mode:b,filter:E},[y.buffer])})}function g(m){a.then(function(){var v=m.data;try{var x=new Uint8Array(v.count*v.size);c(r.exports[v.mode],x,v.count,v.size,v.source,r.exports[v.filter]),self.postMessage({id:v.id,count:v.count,action:"resolve",value:x},[x.buffer])}catch(b){self.postMessage({id:v.id,count:v.count,action:"reject",value:b})}})}return{ready:a,supported:!0,useWorkers:function(m){p(m)},decodeVertexBuffer:function(m,v,x,b,E){c(r.exports.meshopt_decodeVertexBuffer,m,v,x,b,r.exports[l[E]])},decodeIndexBuffer:function(m,v,x,b){c(r.exports.meshopt_decodeIndexBuffer,m,v,x,b)},decodeIndexSequence:function(m,v,x,b){c(r.exports.meshopt_decodeIndexSequence,m,v,x,b)},decodeGltfBuffer:function(m,v,x,b,E,S){c(r.exports[h[E]],m,v,x,b,r.exports[l[S]])},decodeGltfBufferAsync:function(m,v,x,b,E){return d.length>0?_(m,v,x,h[b],l[E]):a.then(function(){var S=new Uint8Array(m*v);return c(r.exports[h[b]],S,m,v,x,r.exports[l[E]]),S})}}})();class Tv extends Ex{constructor(e){super(e),this.type=sn}parse(e){const a=function(A,M){switch(A){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(M||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(M||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(M||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(M||""))}},d=function(A,M,y){M=M||1024;let U=A.pos,w=-1,P=0,L="",F=String.fromCharCode.apply(null,new Uint16Array(A.subarray(U,U+128)));for(;0>(w=F.indexOf(`
`))&&P<M&&U<A.byteLength;)L+=F,P+=F.length,U+=128,F+=String.fromCharCode.apply(null,new Uint16Array(A.subarray(U,U+128)));return-1<w?(A.pos+=P+w+1,L+F.slice(0,w)):!1},u=function(A){const M=/^#\?(\S+)/,y=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,C=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,U=/^\s*FORMAT=(\S+)\s*$/,w=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,P={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let L,F;for((A.pos>=A.byteLength||!(L=d(A)))&&a(1,"no header found"),(F=L.match(M))||a(3,"bad initial token"),P.valid|=1,P.programtype=F[1],P.string+=L+`
`;L=d(A),L!==!1;){if(P.string+=L+`
`,L.charAt(0)==="#"){P.comments+=L+`
`;continue}if((F=L.match(y))&&(P.gamma=parseFloat(F[1])),(F=L.match(C))&&(P.exposure=parseFloat(F[1])),(F=L.match(U))&&(P.valid|=2,P.format=F[1]),(F=L.match(w))&&(P.valid|=4,P.height=parseInt(F[1],10),P.width=parseInt(F[2],10)),P.valid&2&&P.valid&4)break}return P.valid&2||a(3,"missing format specifier"),P.valid&4||a(3,"missing image size specifier"),P},f=function(A,M,y){const C=M;if(C<8||C>32767||A[0]!==2||A[1]!==2||A[2]&128)return new Uint8Array(A);C!==(A[2]<<8|A[3])&&a(3,"wrong scanline width");const U=new Uint8Array(4*M*y);U.length||a(4,"unable to allocate buffer space");let w=0,P=0;const L=4*C,F=new Uint8Array(4),W=new Uint8Array(L);let O=y;for(;O>0&&P<A.byteLength;){P+4>A.byteLength&&a(1),F[0]=A[P++],F[1]=A[P++],F[2]=A[P++],F[3]=A[P++],(F[0]!=2||F[1]!=2||(F[2]<<8|F[3])!=C)&&a(3,"bad rgbe scanline format");let j=0,X;for(;j<L&&P<A.byteLength;){X=A[P++];const pe=X>128;if(pe&&(X-=128),(X===0||j+X>L)&&a(3,"bad scanline data"),pe){const de=A[P++];for(let Q=0;Q<X;Q++)W[j++]=de}else W.set(A.subarray(P,P+X),j),j+=X,P+=X}const se=C;for(let pe=0;pe<se;pe++){let de=0;U[w]=W[pe+de],de+=C,U[w+1]=W[pe+de],de+=C,U[w+2]=W[pe+de],de+=C,U[w+3]=W[pe+de],w+=4}O--}return U},p=function(A,M,y,C){const U=A[M+3],w=Math.pow(2,U-128)/255;y[C+0]=A[M+0]*w,y[C+1]=A[M+1]*w,y[C+2]=A[M+2]*w,y[C+3]=1},_=function(A,M,y,C){const U=A[M+3],w=Math.pow(2,U-128)/255;y[C+0]=Jr.toHalfFloat(Math.min(A[M+0]*w,65504)),y[C+1]=Jr.toHalfFloat(Math.min(A[M+1]*w,65504)),y[C+2]=Jr.toHalfFloat(Math.min(A[M+2]*w,65504)),y[C+3]=Jr.toHalfFloat(1)},g=new Uint8Array(e);g.pos=0;const m=u(g),v=m.width,x=m.height,b=f(g.subarray(g.pos),v,x);let E,S,T;switch(this.type){case nn:T=b.length/4;const A=new Float32Array(T*4);for(let y=0;y<T;y++)p(b,y*4,A,y*4);E=A,S=nn;break;case sn:T=b.length/4;const M=new Uint16Array(T*4);for(let y=0;y<T;y++)_(b,y*4,M,y*4);E=M,S=sn;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:v,height:x,data:E,header:m.string,gamma:m.gamma,exposure:m.exposure,type:S}}setDataType(e){return this.type=e,this}load(e,t,n,s){function r(a,o){switch(a.type){case nn:case sn:a.colorSpace=Wt,a.minFilter=Lt,a.magFilter=Lt,a.generateMipmaps=!1,a.flipY=!0;break}t&&t(a,o)}return super.load(e,r,n,s)}}const ef={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Ks{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Av=new Qa(-1,1,1,-1,0,1);class Rv extends mt{constructor(){super(),this.setAttribute("position",new qe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new qe([0,2,0,0,2,0],2))}}const Cv=new Rv;class Il{constructor(e){this._mesh=new Ge(Cv,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Av)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class tf extends Ks{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Dt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Rr.clone(e.uniforms),this.material=new Dt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Il(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Eu extends Ks{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class Pv extends Ks{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Iv{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new fe);this._width=n.width,this._height=n.height,t=new bn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:sn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new tf(ef),this.copyPass.material.blending=ai,this.clock=new Jd}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Eu!==void 0&&(a instanceof Eu?n=!0:a instanceof Pv&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new fe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Lv extends Ks{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ie}render(e,t,n){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}const Dv={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ie(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Ws extends Ks{constructor(e,t,n,s){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new fe(e.x,e.y):new fe(256,256),this.clearColor=new Ie(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new bn(r,a,{type:sn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const u=new bn(r,a,{type:sn});u.texture.name="UnrealBloomPass.h"+d,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const f=new bn(r,a,{type:sn});f.texture.name="UnrealBloomPass.v"+d,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),a=Math.round(a/2)}const o=Dv;this.highPassUniforms=Rr.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Dt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new fe(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=ef;this.copyUniforms=Rr.clone(h.uniforms),this.blendMaterial=new Dt({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Fa,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Ie,this.oldClearAlpha=1,this.basic=new ri,this.fsQuad=new Il(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new fe(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=Ws.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Ws.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Dt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new fe(.5,.5)},direction:{value:new fe(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(e){return new Dt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}Ws.BlurDirectionX=new fe(1,0);Ws.BlurDirectionY=new fe(0,1);const Uv={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Nv extends Ks{constructor(){super();const e=Uv;this.uniforms=Rr.clone(e.uniforms),this.material=new fx({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Il(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},tt.getTransfer(this._outputColorSpace)===dt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===$u?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===ed?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===td?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ol?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===nd?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===id&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}function Fv(i,e){const t=new Set;let n=!1,s=!1,r=!1,a=!1;const o={x:0,y:0};let c=0;addEventListener("keydown",u=>{t.add(u.code),u.code==="Space"&&(n=!0,u.preventDefault()),(u.code==="KeyF"||u.code==="KeyK")&&(s=!0),(u.code==="KeyE"||u.code==="Enter")&&(r=!0)}),addEventListener("keyup",u=>t.delete(u.code)),addEventListener("blur",()=>t.clear());const l=new Map;i.addEventListener("pointerdown",u=>{l.set(u.pointerId,{x:u.clientX,y:u.clientY}),i.setPointerCapture(u.pointerId)}),i.addEventListener("pointermove",u=>{const f=l.get(u.pointerId);if(!f)return;const p=u.pointerType==="mouse"?.005:.0065;o.x+=(u.clientX-f.x)*p,o.y+=(u.clientY-f.y)*p,f.x=u.clientX,f.y=u.clientY});const h=u=>l.delete(u.pointerId);i.addEventListener("pointerup",h),i.addEventListener("pointercancel",h),i.addEventListener("wheel",u=>{c+=Math.sign(u.deltaY)*.8,u.preventDefault()},{passive:!1}),i.addEventListener("contextmenu",u=>u.preventDefault());const d={x:0,y:0};if(e){const u=document.querySelector("#stick"),f=document.querySelector("#knob");let p=null,_=0,g=0;const m=52,v=(S,T)=>{f.style.transform=`translate(${S}px,${T}px)`};u.addEventListener("pointerdown",S=>{p=S.pointerId,u.setPointerCapture(p);const T=u.getBoundingClientRect();_=T.left+T.width/2,g=T.top+T.height/2}),u.addEventListener("pointermove",S=>{if(S.pointerId!==p)return;let T=S.clientX-_,A=S.clientY-g;const M=Math.hypot(T,A);M>m&&(T=T/M*m,A=A/M*m),v(T,A),d.x=T/m,d.y=-A/m});const x=S=>{S.pointerId===p&&(p=null,d.x=d.y=0,v(0,0))};u.addEventListener("pointerup",x),u.addEventListener("pointercancel",x);const b=(S,T,A)=>{const M=document.querySelector(S);M.addEventListener("pointerdown",y=>{y.stopPropagation(),T(M)})};b("#bJump",()=>{n=!0}),b("#bKneel",()=>{s=!0}),b("#bAct",()=>{r=!0});let E=!1;b("#bRun",S=>{E=!E,a=E,S.classList.toggle("on",E)})}return{poll(){let u=d.x,f=d.y;(t.has("KeyA")||t.has("ArrowLeft"))&&(u-=1),(t.has("KeyD")||t.has("ArrowRight"))&&(u+=1),(t.has("KeyW")||t.has("ArrowUp"))&&(f+=1),(t.has("KeyS")||t.has("ArrowDown"))&&(f-=1);const p={ix:u,iy:f,run:t.has("ShiftLeft")||t.has("ShiftRight")||a,jump:n,kneel:s,interact:r,look:{x:o.x,y:o.y},zoom:c};return n=s=r=!1,o.x=o.y=0,c=0,p}}}const Ll=/^(upperarm|lowerarm|hand|thumb|index|middle|ring|pinky)/,Dl=/^(hand|thumb|index|middle|ring|pinky)/,Ul=/^(neck|Head)/;function Or(i,e,t,{srgb:n=!0,repeat:s=[1,1]}={}){const r=document.createElement("canvas");r.width=i,r.height=e;const a=r.getContext("2d");t(a,i,e);const o=new ns(r);return o.wrapS=o.wrapT=Cn,o.repeat.set(...s),o.anisotropy=4,n&&(o.colorSpace=yt),o}const En=(()=>{let i=7;return()=>(i=i*16807%2147483647)/2147483647})();function ao(i,e,t,n,s,r=2){const a=i.getImageData(0,0,e,t),o=a.data;for(let c=0;c<t;c++)for(let l=0;l<e;l++){const h=(c*e+l)*4,d=(l%r===0?-1:0)+(c%r===0?-1:0),u=(En()-.5)*s+d*s*.35;o[h]=Math.max(0,Math.min(255,o[h]+u)),o[h+1]=Math.max(0,Math.min(255,o[h+1]+u)),o[h+2]=Math.max(0,Math.min(255,o[h+2]+u))}i.putImageData(a,0,0)}function wu(){return Or(256,256,(i,e,t)=>{i.fillStyle="#ece3cc",i.fillRect(0,0,e,t);for(let n=0;n<18;n++)i.fillStyle=`rgba(170,150,110,${.04+En()*.05})`,i.beginPath(),i.ellipse(En()*e,En()*t,20+En()*40,10+En()*30,En()*3,0,7),i.fill();ao(i,e,t,0,9,2)})}function Ov(){return Or(128,128,(i,e,t)=>{const n=i.createImageData(e,t);for(let s=0;s<t;s++)for(let r=0;r<e;r++){const a=(s*e+r)*4,o=((r+(s>>1))%2?10:-10)+(En()-.5)*8,c=((s+(r>>1))%2?10:-10)+(En()-.5)*8;n.data[a]=128+o,n.data[a+1]=128+c,n.data[a+2]=240,n.data[a+3]=255}i.putImageData(n,0,0)},{srgb:!1,repeat:[1,1]})}function nf(){return Or(256,512,(i,e,t)=>{i.fillStyle="#8a5a33",i.fillRect(0,0,e,t);const n=[[.06,.05,"#5a361b"],[.16,.02,"#e2cfa4"],[.2,.03,"#5a361b"],[.46,.08,"#6e4424"],[.72,.03,"#5a361b"],[.77,.02,"#e2cfa4"],[.86,.05,"#5a361b"]];for(const[r,a,o]of n)i.fillStyle=o,i.fillRect(r*e,0,a*e,t);for(const r of[.075,.105,.895,.925])i.fillStyle="#4a2c15",i.fillRect(0,r*t,e,t*.012);ao(i,e,t,0,30,2);const s=Math.round(t*.06);for(const[r,a]of[[0,1],[t-1,-1]]){i.clearRect(0,a>0?0:t-s,e,s);for(let o=0;o<e;o+=4){const c=s*(.65+En()*.35);i.fillStyle=En()<.15?"#e8dcc0":"#7a4c28",i.fillRect(o+1,a>0?s-c:t-s,2,c)}}})}let Gi=null;function zv(){if(Gi)return Gi;const i=nf().image,e=document.createElement("canvas");e.width=i.width,e.height=i.height;const t=e.getContext("2d");t.drawImage(i,0,0);const n=t.getImageData(0,0,e.width,e.height),s=n.data;for(let r=0;r<s.length;r+=4){const a=Math.min(255,(s[r]*.3+s[r+1]*.59+s[r+2]*.11)*1.9);s[r]=s[r+1]=s[r+2]=a}return t.putImageData(n,0,0),Gi=new ns(e),Gi.wrapS=Gi.wrapT=Cn,Gi.colorSpace=yt,Gi}function Bv(){return Or(128,64,(i,e,t)=>{i.fillStyle="#a0723f",i.fillRect(0,0,e,t);for(const[n,s,r]of[[.1,.12,"#6b4322"],[.42,.16,"#c49a5c"],[.78,.12,"#6b4322"]])i.fillStyle=r,i.fillRect(0,n*t,e,s*t);ao(i,e,t,0,26,2)})}function kv(){return Or(64,64,(i,e,t)=>{i.fillStyle="#6a4022",i.fillRect(0,0,e,t),ao(i,e,t,0,30,3)})}function Hv(i){const e=i.geometry,t=e.attributes.position,n=e.attributes.normal,s=e.attributes.skinIndex,r=e.attributes.skinWeight,a=e.attributes.uv,o=i.skeleton.bones.map(u=>u.name),c=t.count,l=new Array(c),h=new Float32Array(c*3);for(let u=0;u<c;u++){h[u*3]=t.getX(u),h[u*3+1]=t.getY(u),h[u*3+2]=t.getZ(u);const f=[r.getX(u),r.getY(u),r.getZ(u),r.getW(u)],p=[s.getX(u),s.getY(u),s.getZ(u),s.getW(u)];let _=0;for(let g=1;g<4;g++)f[g]>f[_]&&(_=g);l[u]=o[p[_]]||""}const d={};return i.skeleton.bones.forEach((u,f)=>{d[u.name]=new N().setFromMatrixPosition(i.skeleton.boneInverses[f].clone().invert())}),{g:e,P:t,N:n,SI:s,SW:r,UV:a,names:o,n:c,dom:l,pos:h,bone:d}}function va(i,e,t=.05){const n=new Map,s=(r,a,o)=>`${r},${a},${o}`;for(let r=0;r<i.n;r++){if(!e(r))continue;const a=s(Math.floor(i.pos[r*3]/t),Math.floor(i.pos[r*3+1]/t),Math.floor(i.pos[r*3+2]/t));(n.get(a)??n.set(a,[]).get(a)).push(r)}return{map:n,cell:t,key:s}}function Gv(i,e,t,n,s,r=6){const a=Math.floor(t/e.cell),o=Math.floor(n/e.cell),c=Math.floor(s/e.cell),l=[];for(let h=0;h<12&&l.length<r;h++){for(let d=-h;d<=h;d++)for(let u=-h;u<=h;u++)for(let f=-h;f<=h;f++){if(Math.max(Math.abs(d),Math.abs(u),Math.abs(f))!==h)continue;const p=e.map.get(e.key(a+d,o+u,c+f));if(p)for(const _ of p)l.push([_,Math.hypot(i.pos[_*3]-t,i.pos[_*3+1]-n,i.pos[_*3+2]-s)])}if(l.length>=r){h++;for(let d=-h;d<=h;d++)for(let u=-h;u<=h;u++)for(let f=-h;f<=h;f++){if(Math.max(Math.abs(d),Math.abs(u),Math.abs(f))!==h)continue;const p=e.map.get(e.key(a+d,o+u,c+f));if(p)for(const _ of p)l.push([_,Math.hypot(i.pos[_*3]-t,i.pos[_*3+1]-n,i.pos[_*3+2]-s)])}break}}return l.sort((h,d)=>h[1]-d[1]),l.slice(0,r)}function Pr(i,e,t,n=6){const s=t.length/3,r=new Uint16Array(s*4),a=new Float32Array(s*4),o=(c,l)=>[c.getX(l),c.getY(l),c.getZ(l),c.getW(l)];for(let c=0;c<s;c++){const l=Gv(i,e,t[c*3],t[c*3+1],t[c*3+2],n),h=new Map;for(const[f,p]of l){const _=1/(p+.01)**2,g=o(i.SI,f),m=o(i.SW,f);for(let v=0;v<4;v++)m[v]>0&&h.set(g[v],(h.get(g[v])||0)+_*m[v])}const d=[...h].sort((f,p)=>p[1]-f[1]).slice(0,4),u=d.reduce((f,p)=>f+p[1],0)||1;d.forEach(([f,p],_)=>{r[c*4+_]=f,a[c*4+_]=p/u})}return{si:r,sw:a}}function Nl(i,e,t,n,s=40,r){const a=new Float32Array(s).fill(-1);let o=0,c=0,l=0;const h=[];for(let u=0;u<i.n;u++){const f=i.pos[u*3+1];Math.abs(f-e)>t||!n(u)||(h.push(u),o+=i.pos[u*3],c+=i.pos[u*3+2],l++)}if(!l)return null;r?(o=r[0],c=r[1]):(o/=l,c/=l);for(const u of h){const f=i.pos[u*3]-o,p=i.pos[u*3+2]-c,_=(Math.atan2(p,f)+Math.PI*2)%(Math.PI*2),g=Math.floor(_/(Math.PI*2)*s)%s;a[g]=Math.max(a[g],Math.hypot(f,p))}for(let u=0;u<s;u++){let f=!1;for(let p=0;p<s;p++)if(a[p]<0){const _=a[(p+s-1)%s],g=a[(p+1)%s];(_>=0||g>=0)&&(a[p]=_>=0&&g>=0?(_+g)/2:Math.max(_,g),f=!0)}if(!f)break}const d=Float32Array.from(a);for(let u=0;u<s;u++)d[u]=Math.max(a[u],(a[(u+s-1)%s]+a[(u+1)%s])/2);return{r:d,cx:o,cz:c,bins:s}}const Fl=(i,e)=>{const t=(e%(Math.PI*2)+Math.PI*2)%(Math.PI*2)/(Math.PI*2)*i.bins,n=Math.floor(t)%i.bins,s=(n+1)%i.bins,r=t-Math.floor(t);return i.r[n]*(1-r)+i.r[s]*r};function Li(i,e,{positions:t,uvs:n,index:s,si:r,sw:a},o){const c=new mt;c.setAttribute("position",new qe(t,3)),c.setAttribute("uv",new qe(n,2)),c.setAttribute("skinIndex",new _l(r,4)),c.setAttribute("skinWeight",new qe(a,4)),c.setIndex(s),c.computeVertexNormals();const l=new eo(c,o);return l.castShadow=!0,l.receiveShadow=!0,l.frustumCulled=!1,l.position.copy(e.position),l.quaternion.copy(e.quaternion),l.scale.copy(e.scale),e.parent.add(l),l.bind(e.skeleton,e.bindMatrix),(e.userData.garments??=[]).push(l),l}function Xa(i,e,t){const n=[],s=t?e:e-1;for(let r=0;r<i-1;r++)for(let a=0;a<s;a++){const o=r*e+a,c=r*e+(a+1)%e,l=(r+1)*e+a,h=(r+1)*e+(a+1)%e;n.push(o,l,c,c,l,h)}return n}function Vv(i,e,t){const n=i.bone,s=Math.abs(n.lowerarm_l.x),r=Math.abs(n.hand_l.x),a=Math.abs(n.upperarm_l.x),o=s+(r-s)*.45,c=n.neck_01.y+.015,l=n.pelvis.y-.12,h=y=>{const C=i.dom[y],U=Math.abs(i.pos[y*3]),w=i.pos[y*3+1];return!(Dl.test(C)||Ul.test(C)&&w>c||w>c||w<l||U>o)},d=y=>{const C=Math.abs(i.pos[y*3]);return C>a+.04?.022+.04*Math.min(1,(C-a)/(o-a)):.03},u=i.g.index.array,f=new Map,p=[],_=[],g=[],m=[],v=[],x=y=>{if(f.has(y))return f.get(y);const C=p.length/3,U=d(y);return p.push(i.pos[y*3]+i.N.getX(y)*U,i.pos[y*3+1]+i.N.getY(y)*U,i.pos[y*3+2]+i.N.getZ(y)*U),_.push(i.pos[y*3]*1.5,i.pos[y*3+1]*1.5+i.pos[y*3+2]*1.5),g.push(i.SI.getX(y),i.SI.getY(y),i.SI.getZ(y),i.SI.getW(y)),m.push(i.SW.getX(y),i.SW.getY(y),i.SW.getZ(y),i.SW.getW(y)),f.set(y,C),b.push(y),C},b=[];for(let y=0;y<u.length;y+=3){const[C,U,w]=[u[y],u[y+1],u[y+2]];h(C)&&h(U)&&h(w)&&v.push(x(C),x(U),x(w))}const E=p.length/3,S=Array.from({length:E},()=>new Set),T=new Map;for(let y=0;y<v.length;y+=3)for(let C=0;C<3;C++){const U=v[y+C],w=v[y+(C+1)%3];S[U].add(w),S[w].add(U);const P=U<w?`${U}_${w}`:`${w}_${U}`;T.set(P,(T.get(P)||0)+1)}const A=new Uint8Array(E);for(const[y,C]of T)if(C===1){const[U,w]=y.split("_").map(Number);A[U]=A[w]=1}const M=Float32Array.from(p);for(let y=0;y<10;y++){const C=Float32Array.from(p);for(let U=0;U<E;U++){if(A[U]||!S[U].size)continue;const P=Math.abs(M[U*3])>a+.06?.25:.6;let L=0,F=0,W=0;for(const j of S[U])L+=C[j*3],F+=C[j*3+1],W+=C[j*3+2];const O=S[U].size;p[U*3]+=(L/O-C[U*3])*P,p[U*3+1]+=(F/O-C[U*3+1])*P,p[U*3+2]+=(W/O-C[U*3+2])*P}}for(let y=0;y<E;y++){const C=b[y],U=i.N.getX(C),w=i.N.getY(C),P=i.N.getZ(C),F=.026-((p[y*3]-i.pos[C*3])*U+(p[y*3+1]-i.pos[C*3+1])*w+(p[y*3+2]-i.pos[C*3+2])*P);F>0&&(p[y*3]+=U*F,p[y*3+1]+=w*F,p[y*3+2]+=P*F)}return Li(i,e,{positions:p,uvs:_,index:v,si:new Uint16Array(g),sw:new Float32Array(m)},t)}function Wv(i,e,t,n){const s=i.bone,r=s.pelvis.y+.1,a=s.foot_l.y+.05,o=30,c=44,l=v=>!Ll.test(i.dom[v])&&!Ul.test(i.dom[v])&&!/^clavicle/.test(i.dom[v]),h=[];for(let v=0;v<o;v++){const x=r+(a-r)*(v/(o-1));h.push(Nl(i,x,.035,l,c,[0,0])||h[h.length-1])}const d=[];for(let v=0;v<o;v++){const x=[];for(let E=0;E<c;E++){const S=E/c*Math.PI*2;let T=Fl(h[v],S);v>0&&(T=Math.max(T,d[v-1][E]*.995)),x.push(T)}const b=x.map((E,S)=>(x[(S+c-1)%c]+2*E+x[(S+1)%c])/4);d.push(b)}const u=[],f=[];for(let v=0;v<o;v++){const x=v/(o-1),b=r+(a-r)*x;for(let E=0;E<c;E++){const S=E/c*Math.PI*2,T=1+(.02+.07*x)*Math.sin(S*7+.6)*.5+.018*x*Math.sin(S*13),A=(d[v][E]+.045+.12*x*x)*T;u.push(Math.cos(S)*A,b,Math.sin(S)*A),f.push(E/c*2.5,x*1.6)}}const{si:p,sw:_}=Pr(i,t,u,8),g=i.names.indexOf("pelvis");for(let v=0;v<u.length/3;v++){const x=Math.floor(v/c)/(o-1),b=.32-.2*x,E=new Map;for(let A=0;A<4;A++)_[v*4+A]>0&&E.set(p[v*4+A],(E.get(p[v*4+A])||0)+_[v*4+A]*(1-b));E.set(g,(E.get(g)||0)+b);const S=[...E].sort((A,M)=>M[1]-A[1]).slice(0,4),T=S.reduce((A,M)=>A+M[1],0);for(let A=0;A<4;A++)p[v*4+A]=S[A]?S[A][0]:0,_[v*4+A]=S[A]?S[A][1]/T:0}const m=Li(i,e,{positions:u,uvs:f,index:Xa(o,c,!0),si:p,sw:_},n);return m.userData.radius=(v,x)=>{const b=Fn.clamp((v-r)/(a-r),0,1),E=Math.round(b*(o-1)),S=Math.round((x%(Math.PI*2)+Math.PI*2)%(Math.PI*2)/(Math.PI*2)*c)%c;return d[E][S]+.045+.12*b*b},m.userData.yTop=r,m}function Xv(i,e,t,n,s){const r=i.bone,a=r.pelvis.y+.07,o=.1,c=40,l=4,h=g=>!Ll.test(i.dom[g])&&!Ul.test(i.dom[g]),d=[],u=[];for(let g=0;g<l;g++){const m=a+o*(g/(l-1)-.5),v=Nl(i,m,.03,h,c,[0,0]);for(let x=0;x<c;x++){const b=x/c*Math.PI*2,E=Math.max(Fl(v,b)+.05,s.userData.radius(s.userData.yTop,b)+.012);d.push(Math.cos(b)*E,m,Math.sin(b)*E),u.push(x/c*6,g/(l-1))}}const f=Xa(l,c,!0);for(const[g,m]of[[1.05,.42],[1.25,.34]]){const v=d.length/3,x=8,b=3;for(let E=0;E<x;E++){const S=a-o/2-m*(E/(x-1));for(let T=0;T<b;T++){const A=g+(T-1)*.06,M=s.userData.radius(S,A)+.016;d.push(Math.cos(A)*M,S,Math.sin(A)*M),u.push(T/(b-1),1+E*.6)}}for(let E=0;E<x-1;E++)for(let S=0;S<b-1;S++){const T=v+E*b+S;f.push(T,T+b,T+1,T+1,T+b,T+b+1)}}const{si:p,sw:_}=Pr(i,t,d,8);return Li(i,e,{positions:d,uvs:u,index:f,si:p,sw:_},n)}function qv(i,e,t,n){const s=i.bone,r=o=>!Ll.test(i.dom[o])&&!/^Head/.test(i.dom[o]),a=[];{const o=[],h=s.calf_l.y+.06;for(let g=0;g<9;g++)o.push(.035+(.235-.035)*(g/8));const d=[];for(const g of o){const v=new Float32Array(60).fill(-9),x=new Float32Array(60).fill(9);let b=0;for(let O=0;O<i.n;O++){const j=i.pos[O*3],X=i.pos[O*3+1],se=i.pos[O*3+2];if(Math.abs(j-g)>.03||X<.3||!(r(O)||/^upperarm/.test(i.dom[O])&&j<.26)||/^Head/.test(i.dom[O]))continue;const pe=Math.min(59,Math.floor(X/1.8*60));v[pe]=Math.max(v[pe],se),x[pe]=Math.min(x[pe],se),X>b&&!/^neck/.test(i.dom[O])&&(b=X)}for(let O=58;O>=0;O--)v[O+1]>-9&&(v[O]=Math.max(v[O],v[O+1]-.004)),x[O+1]<9&&(x[O]=Math.min(x[O],x[O+1]+.004));const E=.045+.02*(g-.035)/.2,S=[],T=O=>v[Math.min(59,Math.max(0,Math.floor(O/1.8*60)))]+E,A=O=>x[Math.min(59,Math.max(0,Math.floor(O/1.8*60)))]-E,M=b-.1;for(let O=h;O<=M;O+=.03)S.push([O,T(O)]);const y=T(M),C=A(M),U=(y+C)/2,w=(y-C)/2,P=b+E-M;for(let O=1;O<12;O++){const j=O/12*Math.PI;S.push([M+Math.sin(j)*P,U+Math.cos(j)*w])}for(let O=M;O>=h-.04;O-=.03)S.push([O,A(O)]);const L=[0];for(let O=1;O<S.length;O++)L.push(L[O-1]+Math.hypot(S[O][0]-S[O-1][0],S[O][1]-S[O-1][1]));const F=L[L.length-1],W=[];for(let O=0;O<46;O++){const j=O/45*F;let X=1;for(;X<L.length-1&&L[X]<j;)X++;const se=(j-L[X-1])/Math.max(1e-6,L[X]-L[X-1]);W.push([g,S[X-1][0]+(S[X][0]-S[X-1][0])*se,S[X-1][1]+(S[X][1]-S[X-1][1])*se])}d.push(W)}const u=[],f=[];for(let g=0;g<46;g++)for(let m=0;m<9;m++){const v=d[m][g];u.push(v[0],v[1],v[2]),f.push(m/8,g/45)}const{si:p,sw:_}=Pr(i,t,u,8);a.push(Li(i,e,{positions:u,uvs:f,index:Xa(46,9,!1),si:p,sw:_},n))}{const l=s.spine_03.y+.02,h=s.pelvis.y-.02,d=.3,u=[],f=[];for(let g=0;g<7;g++)for(let m=0;m<48;m++){const v=m/48*Math.PI*2,b=h+(l-h)*(1+Math.cos(v))/2+d*(g/6-.5)*(.85+.15*Math.cos(v)),E=Nl(i,b,.03,r,40,[0,0]),S=(E?Fl(E,v):.18)+.06+.012*Math.sin(v*9+g);u.push(Math.cos(v)*S,b,Math.sin(v)*S),f.push(g/6*.5+.25,m/48*2.2)}const{si:p,sw:_}=Pr(i,t,u,8);a.push(Li(i,e,{positions:u,uvs:f,index:Xa(7,48,!0),si:p,sw:_},n))}return a}function jv(i,e,t,n){const s=[];for(const m of["l","r"]){const v=new RegExp(`^(foot|ball)_${m}`);let x=9,b=-9,E=9,S=-9,T=9;for(let se=0;se<i.n;se++)if(v.test(i.dom[se])){const pe=i.pos[se*3],de=i.pos[se*3+1],Q=i.pos[se*3+2];de<.05&&(x=Math.min(x,pe),b=Math.max(b,pe),E=Math.min(E,Q),S=Math.max(S,Q)),T=Math.min(T,de)}const A=(x+b)/2,M=(E+S)/2,y=(b-x)/2+.012,C=(S-E)/2+.015,U=20,w=[],P=[],L=[],F=T-.018,W=T+.006;for(const se of[W,F])for(let pe=0;pe<U;pe++){const de=pe/U*Math.PI*2,Q=Math.cos(de),te=Math.sin(de),Ee=1-.18*Math.max(0,-te);w.push(A+Q*y*Ee,se,M+te*C),P.push(Q*.5+.5,te*.5+.5)}const O=w.length/3;w.push(A,W,M,A,F,M),P.push(.5,.5,.5,.5);for(let se=0;se<U;se++){const pe=se,de=(se+1)%U;L.push(O,de,pe),L.push(O+1,U+pe,U+de),L.push(pe,de,U+pe,de,U+de,U+pe)}const{si:j,sw:X}=Pr(i,t,w,6);s.push(Li(i,e,{positions:w,uvs:P,index:L,si:j,sw:X},n))}const r=i.bone,a=r.foot_l.y,o=[[a-.01,a+.025],[.035,.055]],c=m=>{const v=i.dom[m];if(!/^(foot|ball|calf)_/.test(v))return!1;const x=i.pos[m*3+1];return o.some(([b,E])=>x>=b&&x<=E)},l=i.g.index.array,h=new Map,d=[],u=[],f=[],p=[],_=[],g=m=>{if(h.has(m))return h.get(m);const v=d.length/3,x=.008;return d.push(i.pos[m*3]+i.N.getX(m)*x,i.pos[m*3+1]+i.N.getY(m)*x,i.pos[m*3+2]+i.N.getZ(m)*x),u.push(i.pos[m*3]*8,i.pos[m*3+1]*8),f.push(i.SI.getX(m),i.SI.getY(m),i.SI.getZ(m),i.SI.getW(m)),p.push(i.SW.getX(m),i.SW.getY(m),i.SW.getZ(m),i.SW.getW(m)),h.set(m,v),v};for(let m=0;m<l.length;m+=3){const[v,x,b]=[l[m],l[m+1],l[m+2]];c(v)&&c(x)&&c(b)&&_.push(g(v),g(x),g(b))}return s.push(Li(i,e,{positions:d,uvs:u,index:_,si:new Uint16Array(f),sw:new Float32Array(p)},n)),s}function Yv(i,e,t){const n=i.bone;let s=0;for(let g=0;g<i.n;g++)/^Head/.test(i.dom[g])&&(s=Math.max(s,i.pos[g*3+1]));const r=n.Head.z,a=n.spine_03.y-.03,o=g=>{const m=i.dom[g],v=i.pos[g*3+1],x=i.pos[g*3+2],b=Math.abs(i.pos[g*3]);return!(!/^(Head|neck|spine_03|spine_02|clavicle|upperarm)/.test(m)||v<a||b>.24||x>r+.035&&v<s-.045&&v>n.Head.y-.06&&b<.075)},c=i.g.index.array,l=new Map,h=[],d=[],u=[],f=[],p=[],_=g=>{if(l.has(g))return l.get(g);const m=h.length/3,v=i.pos[g*3+1],x=v>n.Head.y-.02?.05:.055;return h.push(i.pos[g*3]+i.N.getX(g)*x,v+i.N.getY(g)*x,i.pos[g*3+2]+i.N.getZ(g)*x),d.push(i.pos[g*3]*2+.5,v*2),u.push(i.SI.getX(g),i.SI.getY(g),i.SI.getZ(g),i.SI.getW(g)),f.push(i.SW.getX(g),i.SW.getY(g),i.SW.getZ(g),i.SW.getW(g)),l.set(g,m),m};for(let g=0;g<c.length;g+=3){const[m,v,x]=[c[g],c[g+1],c[g+2]];o(m)&&o(v)&&o(x)&&p.push(_(m),_(v),_(x))}return Li(i,e,{positions:h,uvs:d,index:p,si:new Uint16Array(u),sw:new Float32Array(f)},t)}function Kv(i,e){const t=i.bone,n=Math.abs(t.lowerarm_l.x),s=Math.abs(t.hand_l.x),r=n+(s-n)*.4,a=e.geometry.attributes.position,o=t.neck_01.y-.01,c=t.foot_l.y+.08;for(let l=0;l<i.n;l++){const h=i.dom[l],d=Math.abs(i.pos[l*3]),u=i.pos[l*3+1];if(Dl.test(h)||/^(Head|neck|foot|ball)/.test(h)||u>o||u<c||d>r)continue;const f=/^thigh/.test(h)?.065:/^calf/.test(h)?u>c+.12?.035:.01:.028;a.setXYZ(l,i.pos[l*3]-i.N.getX(l)*f,u-i.N.getY(l)*f,i.pos[l*3+2]-i.N.getZ(l)*f)}a.needsUpdate=!0}function Jv(i){const e=new Map;for(const t of i.userData.garments||[])(e.get(t.material)??e.set(t.material,[]).get(t.material)).push(t);for(const[t,n]of e){if(n.length<2)continue;const s=Zd(n.map(a=>a.geometry),!1),r=new eo(s,t);r.castShadow=!0,r.receiveShadow=!0,r.frustumCulled=!1,r.position.copy(i.position),r.quaternion.copy(i.quaternion),r.scale.copy(i.scale),i.parent.add(r),r.bind(i.skeleton,i.bindMatrix);for(const a of n)a.removeFromParent(),a.geometry.dispose()}i.userData.garments=[]}function Tu(i,e,t,n){const s=[];i.traverse(a=>{a.isSkinnedMesh&&s.push(a)});const r={};e.skeleton.bones.forEach(a=>{r[a.name]=a});for(const a of s){const o=a.skeleton.bones.map(d=>r[d.name]||r.Head),c=new to(o,a.skeleton.boneInverses.map(d=>d.clone())),l=a.material.clone();t&&(l.color=new Ie(t),l.roughness=.75),l.side=Et,l.alphaTest=Math.max(l.alphaTest||0,.35),l.transparent=!1;const h=new eo(a.geometry,l);h.castShadow=!0,h.frustumCulled=!1,h.userData.part=n,h.position.copy(e.position),h.quaternion.copy(e.quaternion),h.scale.copy(e.scale),e.parent.add(h),h.bind(c,e.bindMatrix)}}function sf({baseGltf:i,hairGltf:e,beardGltf:t,female:n=!1,cover:s=!1,colors:r={}}){const a=i.scene;a.updateMatrixWorld(!0);let o=null;a.traverse(E=>{E.isSkinnedMesh&&(!o||E.geometry.attributes.position.count>o.geometry.attributes.position.count)&&(o=E)}),a.traverse(E=>{E.isMesh&&(E.castShadow=!0,E.receiveShadow=!0,E.frustumCulled=!1)});const c=Hv(o),l=Ov(),h=new it({name:"tunic",map:wu(),normalMap:l,normalScale:new fe(.12,.12),roughness:.92,side:Et,color:r.tunic??16777215}),d=new it({name:"mantle",map:nf(),normalMap:l,normalScale:new fe(.5,.5),roughness:.96,side:Et,alphaTest:.5,color:r.mantle??16777215}),u=new it({name:"sash",map:Bv(),normalMap:l,normalScale:new fe(.4,.4),roughness:.9,side:Et,color:r.sash??16777215}),f=new it({name:"leather",map:kv(),roughness:.65}),p=new it({name:"veil",map:wu(),normalMap:l,normalScale:new fe(.2,.2),roughness:.95,side:Et,color:r.veil??10465480}),g=va(c,E=>!Dl.test(c.dom[E])&&!/^Head/.test(c.dom[E])),m=va(c,E=>/^(spine|pelvis|clavicle|neck)/.test(c.dom[E])),v=va(c,E=>/^(pelvis|spine_01|thigh|calf|foot|ball)/.test(c.dom[E]));Vv(c,o,h);const x=Wv(c,o,v,h);Xv(c,o,g,u,x),qv(c,o,m,d),jv(c,o,va(c,E=>/^(foot|ball|calf)_/.test(c.dom[E]),.03),f),s&&Yv(c,o,p),Kv(c,o),Jv(o);const b=r.hair??2759184;return e&&!s&&Tu(e.scene,o,b,"hair"),t&&Tu(t.scene,o,b,"beard"),a.traverse(E=>{E.isMesh&&/Hair/.test(E.material?.name||"")&&(E.material=E.material.clone(),E.material.color=new Ie(b))}),a.userData.body=o,a}const tl=.55,Zv=1.75;class Qv{constructor(e,t=10){this.heightAt=e,this.cell=t,this.grid=new Map,this.list=[],this.stamp=0}key(e,t){return e*65536+t}add(e){e.cos=Math.cos(e.rot||0),e.sin=Math.sin(e.rot||0),e.mark=0;const t=Math.hypot(e.hx,e.hz),n=Math.floor((e.x-t)/this.cell),s=Math.floor((e.x+t)/this.cell),r=Math.floor((e.z-t)/this.cell),a=Math.floor((e.z+t)/this.cell);for(let o=n;o<=s;o++)for(let c=r;c<=a;c++){const l=this.key(o,c);(this.grid.get(l)??this.grid.set(l,[]).get(l)).push(e)}return this.list.push(e),e}local(e,t,n){const s=t-e.x,r=n-e.z;return[e.cos*s-e.sin*r,e.sin*s+e.cos*r]}top(e,t,n){if(!e.rampAxis)return e.y1;const s=e.rampAxis==="x"?(t/e.hx+1)/2:(n/e.hz+1)/2;return e.rampA+(e.rampB-e.rampA)*Math.min(1,Math.max(0,s))}near(e,t,n,s){const r=++this.stamp,a=Math.floor((e-n)/this.cell),o=Math.floor((e+n)/this.cell),c=Math.floor((t-n)/this.cell),l=Math.floor((t+n)/this.cell);for(let h=a;h<=o;h++)for(let d=c;d<=l;d++){const u=this.grid.get(this.key(h,d));if(u)for(const f of u)f.mark!==r&&(f.mark=r,s(f))}}groundAt(e,t,n=1/0,s=tl){let r=this.heightAt(e,t);return this.near(e,t,0,a=>{const[o,c]=this.local(a,e,t);if(Math.abs(o)>a.hx||Math.abs(c)>a.hz)return;const l=this.top(a,o,c);l<=n+s&&l>r&&(r=l)}),r}resolve(e,t,n,s){for(let r=0;r<3;r++){let a=!1;if(this.near(e,t,s+1,o=>{const[c,l]=this.local(o,e,t);if(Math.abs(c)>o.hx+s||Math.abs(l)>o.hz+s||this.top(o,Math.max(-o.hx,Math.min(o.hx,c)),Math.max(-o.hz,Math.min(o.hz,l)))<=n+tl||o.y0>=n+Zv)return;const d=Math.max(-o.hx,Math.min(o.hx,c)),u=Math.max(-o.hz,Math.min(o.hz,l));let f=c-d,p=l-u,_=Math.hypot(f,p),g=c,m=l;if(_>1e-5){if(_>=s)return;g=d+f/_*s,m=u+p/_*s}else{const v=o.hx-Math.abs(c),x=o.hz-Math.abs(l);v<x?g=Math.sign(c||1)*(o.hx+s):m=Math.sign(l||1)*(o.hz+s)}e=o.x+o.cos*g+o.sin*m,t=o.z-o.sin*g+o.cos*m,a=!0}),!a)break}return[e,t]}blocked(e,t,n){if(t<this.heightAt(e,n)+.25)return!0;let s=!1;return this.near(e,n,0,r=>{if(s)return;const[a,o]=this.local(r,e,n);Math.abs(a)>r.hx||Math.abs(o)>r.hz||t>r.y0&&t<this.top(r,a,o)+.2&&(s=!0)}),s}}const $v={ashlar:["large_sandstone_blocks_01",4,15785920],temple:["white_sandstone_blocks_02",3,16775146],walls:["white_sandstone_bricks",3,15390388],marble:["marble_01",3,16777215],plaster:["white_plaster_rough_01",3,15853526],plasterWarm:["plastered_stone_wall",3.5,14929840],clay:["clay_plaster",3,14203030],paving:["white_sandstone_blocks_02",2.4,16181974],rock:["rock_wall_08",4,14074789],cliff:["cliff_side",7,13224914],wood:["medieval_wood",2,13214330],field:["dry_ground_rocks",5,16777215]};function Ol(i,e,t,n=!0){const s=document.createElement("canvas");s.width=i,s.height=e,t(s.getContext("2d"),i,e);const r=new ns(s);return r.wrapS=r.wrapT=Cn,r.anisotropy=4,n&&(r.colorSpace=yt),r}let Au=11;const La=()=>(Au=Au*16807%2147483647)/2147483647;function eM(){return Ol(256,512,(i,e,t)=>{const n=["#2c3f8f","#6b2a6e","#a8242a","#efe6d0","#a8242a","#6b2a6e","#2c3f8f"];n.forEach((r,a)=>{i.fillStyle=r,i.fillRect(0,a/n.length*t,e,t/n.length+1)}),i.strokeStyle="#e4c063",i.lineWidth=2;for(let r=0;r<n.length;r++)for(let a=0;a<4;a++){const o=(a+.5)*e/4,c=(r+.5)*t/n.length,l=14;i.beginPath(),i.moveTo(o,c-l),i.lineTo(o+l,c),i.lineTo(o,c+l),i.lineTo(o-l,c),i.closePath(),i.stroke(),i.beginPath(),i.arc(o,c,4,0,7),i.stroke()}const s=i.getImageData(0,0,e,t);for(let r=0;r<s.data.length;r+=4){const a=(La()-.5)*18;s.data[r]+=a,s.data[r+1]+=a,s.data[r+2]+=a}i.putImageData(s,0,0)})}function tM(){return Ol(128,128,(i,e,t)=>{const n=i.createImageData(e,t),s=Array.from({length:60},()=>[La()*e,La()*t,4+La()*8]);for(let r=0;r<t;r++)for(let a=0;a<e;a++){let o=0,c=0;for(const[h,d,u]of s){let f=a-h,p=r-d;f-=Math.round(f/e)*e,p-=Math.round(p/t)*t;const _=Math.hypot(f,p);_<u&&(o+=f/u*(1-_/u),c+=p/u*(1-_/u))}const l=(r*e+a)*4;n.data[l]=128+o*60,n.data[l+1]=128+c*60,n.data[l+2]=230,n.data[l+3]=255}i.putImageData(n,0,0)},!1)}function nM(){return Ol(256,64,(i,e,t)=>{[["#b8432e","#e8d4a8"],["#2f5e8e","#e8d4a8"],["#c08a2e","#7a3b1f"],["#5b7d3a","#e8d4a8"]].forEach((s,r)=>{for(let a=0;a<8;a++)i.fillStyle=s[a%2],i.fillRect(r*64+a*8,0,8,t)})})}async function iM(i,{anisotropy:e=8}={}){const t=(a,o)=>i.loadAsync(a).then(c=>(c.wrapS=c.wrapT=Cn,c.anisotropy=e,o&&(c.colorSpace=yt),c)),n={};await Promise.all(Object.entries($v).map(async([a,[o,c,l]])=>{const[h,d,u]=await Promise.all([t(`assets/tex/${o}/diff.webp`,!0),t(`assets/tex/${o}/nor.webp`),t(`assets/tex/${o}/arm.webp`)]);n[a]=new it({map:h,normalMap:d,roughnessMap:u,aoMap:u,aoMapIntensity:.8,color:l,roughness:1,metalness:0}),n[a].userData.tile=c}));const s={};for(const[a,o]of[["grass","aerial_grass_rock"],["dry","dry_ground_rocks"],["road","rocky_trail"],["pave","cobblestone_floor_01"],["rock","cliff_side"]])s[a]=await t(`assets/tex/${o}/diff.webp`,!0);s.grassN=await t("assets/tex/aerial_grass_rock/nor.webp");const r=tM();return n.gold=new it({color:15905340,metalness:1,roughness:.34,normalMap:r,normalScale:new fe(.15,.15),envMapIntensity:.9,emissive:4860422,emissiveIntensity:.6}),n.gold.userData.tile=3,n.bronze=new it({color:11565630,metalness:.85,roughness:.42,normalMap:r,normalScale:new fe(.12,.12),emissive:2757638,emissiveIntensity:.5}),n.bronze.userData.tile=4,n.veil=new it({map:eM(),roughness:.85,side:Et}),n.veil.userData.tile=0,n.void=new ri({color:919814}),n.void.userData.tile=1,n.window=new it({color:2759182,emissive:16752704,emissiveIntensity:0,roughness:1}),n.window.userData.tile=1,n.lit=new it({color:3810322,emissive:16753992,emissiveIntensity:1.6,roughness:1}),n.lit.userData.tile=1,n.awning=new it({map:nM(),roughness:.9,side:Et}),n.awning.userData.tile=0,n.linen=new it({color:15919832,roughness:.9}),n.linen.userData.tile=1,n.darkWood=n.wood.clone(),n.darkWood.color=new Ie(7031344),n.darkWood.userData.tile=2,n.roof=n.plaster.clone(),n.roof.color=new Ie(14272424),n.roof.userData.tile=3,n.stoneDark=n.walls.clone(),n.stoneDark.color=new Ie(11902588),n.stoneDark.userData.tile=3,n.fieldStone=n.rock.clone(),n.fieldStone.color=new Ie(15917766),n.fieldStone.userData.tile=2.5,n.water=new _n({color:4885148,roughness:.18,metalness:0,transparent:!0,opacity:.85,clearcoat:.5,envMapIntensity:.7}),{M:n,ground:s}}const Ru=new He,sM=new $t,rM=new N,aM=new N(1,1,1),oM=new rn;class cM{constructor(e,t){this.M=e,this.solids=t,this.parts=new Map,this.noShadow=new Set(["void","window","lit","water"])}push(e,t){if(!this.M[e])throw new Error("material "+e);(this.parts.get(e)??this.parts.set(e,[]).get(e)).push(t)}tile(e){return this.M[e].userData.tile??3}box(e,t,n,s,r,a,o,c=0,{solid:l=!0,uv:h}={}){const d=o-a;if(d<=0||s<=0||r<=0)return;const u=new en(s,d,r),f=this.tile(e),p=u.attributes.uv;if(f>0){const _=[[r,d],[r,d],[s,r],[s,r],[s,d],[s,d]],g=(t*.37+n*.61)%7/f,m=a/f;for(let v=0;v<6;v++)for(let x=0;x<4;x++){const b=v*4+x;p.setXY(b,p.getX(b)*_[v][0]/f+g,p.getY(b)*_[v][1]/f+(v<2||v>3?m:0))}}else if(h)for(let _=0;_<p.count;_++)p.setXY(_,h[0]+p.getX(_)*h[2],h[1]+p.getY(_)*h[3]);Ru.compose(rM.set(t,(a+o)/2,n),sM.setFromEuler(oM.set(0,c,0)),aM.set(1,1,1)),u.applyMatrix4(Ru),this.push(e,u),l&&this.solids&&this.solids.add({x:t,z:n,hx:s/2,hz:r/2,rot:c,y0:a,y1:o})}cyl(e,t,n,s,r,a,{r1:o=s,seg:c=12,solid:l=!0,open:h=!1}={}){const d=a-r,u=new Ft(o,s,d,c,1,h),f=this.tile(e),p=u.attributes.uv;if(f>0)for(let _=0;_<p.count;_++)p.setXY(_,p.getX(_)*(2*Math.PI*Math.max(s,o))/f,p.getY(_)*d/f);u.translate(t,(r+a)/2,n),this.push(e,u),l&&this.solids&&this.solids.add({x:t,z:n,hx:s*.85,hz:s*.85,rot:0,y0:r,y1:a})}geom(e,t,n){n&&t.applyMatrix4(n),this.push(e,t.index?t:Cu(t))}stairs(e,t,n,s,r,a,o,c=0,{n:l}={}){const h=l??Math.max(2,Math.round((o-a)/.3)),d=(o-a)/h,u=r/h,f=Math.cos(c),p=Math.sin(c);for(let _=0;_<h;_++){const g=-r/2+u*(_+.5);this.box(e,t+p*g,n+f*g,s,u+.02,a-.6,a+d*(_+1),c)}}finish(e,{shadows:t=!0}={}){const n={};for(const[s,r]of this.parts){const a=Zd(r.map(c=>c.index?c:Cu(c)),!1);if(r.forEach(c=>c.dispose()),!a)continue;a.computeBoundingSphere();const o=new Ge(a,this.M[s]);o.castShadow=t&&!this.noShadow.has(s),o.receiveShadow=!0,o.matrixAutoUpdate=!1,o.updateMatrix(),e.add(o),n[s]=o}return this.parts.clear(),n}}function Cu(i){const e=i.attributes.position.count,t=new Array(e);for(let n=0;n<e;n++)t[n]=n;return i.setIndex(t),i}const ui={x0:-20,x1:92,z0:-60,z1:50,y:21},zl={x0:-24,x1:8,z0:-86,z1:-60},rf={x0:-145,x1:-100,z0:15,z1:60},Ir={x:18,z:122,w:18,d:10},Ht={x:-84,z:-132,r:22,h:10},Vt={x:-40,z:-150},hn={x:180,z:-10},Jt={x:128,z:-6},gn={x:262,z:40},nl={x:292,z:34},Lr={x:250,z:49,rot:-Math.PI/2},Zi=i=>114+Math.sin(i*.018)*7,jt=[[-150,-80],[-24,-80],[92,-60],[92,50],[72,92],[38,132],[-14,142],[-72,120],[-132,96],[-150,60]],af=new Set([1,2]),lM=[{seg:0,t:.47,name:"Porta de Genate"},{seg:9,t:.407,name:"Porta de Jafa"},{seg:4,t:.44,name:"Porta da Fonte"},{seg:5,t:.85,name:"Porta dos Essênios"}],of=[{w:4.5,pts:[[-91,-80],[-92,-96],[-86,-110],[-70,-116],[-56,-122],[-44,-129]]},{w:3.2,pts:[[-92,-100],[-104,-112],[-106,-128],[-98,-146],[-86,-150],[-80,-140]]},{w:5,pts:[[57,110],[78,112],[100,92],[112,60],[116,30],[124,8],[140,-4],[156,-12],[168,-20],[176,-18],[180,-10]]},{w:4.5,pts:[[-6,141],[10,168],[60,182],[110,184],[132,176]]},{w:4.5,pts:[[-150,3],[-190,6],[-240,0],[-300,-8]]},{w:4,pts:[[180,-10],[204,2],[226,20],[242,40],[262,40]]}],Da=[{w:6,pts:[[-150,3],[-100,2],[-60,0],[-34,2],[-28,10]]},{w:6,pts:[[-91,-80],[-84,-40],[-78,0],[-64,50],[-40,100],[-6,140]]},{w:5,pts:[[-34,60],[-10,70],[10,92],[18,116]]},{w:5,pts:[[-78,-40],[-50,-55],[-28,-66]]},{w:5,pts:[[-64,50],[-30,58],[0,62],[20,64]]},{w:5,pts:[[10,92],[40,100],[57,110]]}],oo=[{id:"templo",name:"Templo de Herodes",x:36,z:-4,r:50,spawn:[62,-42],look:[24,-7]},{id:"atrio",name:"Átrio das Mulheres",x:60,z:-7,r:9,spawn:[77,-7],look:[20,-7]},{id:"antonia",name:"Fortaleza Antônia",x:-8,z:-73,r:16},{id:"golgota",name:"Gólgota, o Lugar da Caveira",x:Ht.x,z:Ht.z,r:34,spawn:[-80,-104],look:[-84,-134]},{id:"sepulcro",name:"O Sepulcro no Jardim",x:Vt.x,z:Vt.z+14,r:18,spawn:[-46,-124],look:[-40,-142]},{id:"mirante",name:"Monte das Oliveiras",x:hn.x,z:hn.z,r:30,spawn:[hn.x-5.5,hn.z+1],look:[30,-7]},{id:"getsemani",name:"Getsêmani",x:Jt.x,z:Jt.z,r:18,spawn:[121,6],look:[131,-4]},{id:"cedrom",name:"Vale do Cedrom",x:114,z:40,r:18},{id:"siloe",name:"Tanque de Siloé",x:Ir.x,z:Ir.z,r:14,spawn:[10,108],look:[18,124]},{id:"palacio",name:"Palácio de Herodes",x:-122,z:30,r:26},{id:"betania",name:"Betânia",x:gn.x,z:gn.z,r:34,spawn:[244,40],look:[262,40]},{id:"cidade",name:"Cidade Alta",x:-80,z:10,r:60,spawn:[-78,4],look:[30,-6]}];function qa(i,e,t){let n=!1;for(let s=0,r=t.length-1;s<t.length;r=s++){const[a,o]=t[s],[c,l]=t[r];o>e!=l>e&&i<(c-a)*(e-o)/(l-o)+a&&(n=!n)}return n}function cf(i,e,t,n,s,r){const a=s-t,o=r-n,c=a*a+o*o,l=c?Math.max(0,Math.min(1,((i-t)*a+(e-n)*o)/c)):0;return Math.hypot(i-(t+a*l),e-(n+o*l))}function lf(i,e,t){let n=1/0;for(let s=0;s<t.length-1;s++)n=Math.min(n,cf(i,e,t[s][0],t[s][1],t[s+1][0],t[s+1][1]));return n}function ln(i,e,t=of){let n=1/0;for(const s of t)n=Math.min(n,lf(i,e,s.pts)-s.w/2);return n}const Ds=(i,e,t,n=0)=>i>t.x0-n&&i<t.x1+n&&e>t.z0-n&&e<t.z1+n,ja=(i,e)=>qa(i,e,jt)||Ds(i,e,ui)||Ds(i,e,zl),Ma=(i,e)=>{const t=Math.sin(i*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Pu=i=>i*i*(3-2*i);function hM(i,e){const t=Math.floor(i),n=Math.floor(e),s=i-t,r=e-n,a=Ma(t,n),o=Ma(t+1,n),c=Ma(t,n+1),l=Ma(t+1,n+1),h=Pu(s),d=Pu(r);return a+(o-a)*h+(c-a)*d+(a-o-c+l)*h*d}const Nt=(i,e,t=4)=>{let n=0,s=.5,r=1;for(let a=0;a<t;a++)n+=s*hM(i*r,e*r),r*=2,s*=.5;return n},Tn=(i,e,t)=>{const n=Math.min(1,Math.max(0,(t-i)/(e-i)));return n*n*(3-2*n)},Yi=(i,e,t,n,s,r)=>{const a=((i-t)/s)**2+((e-n)/r)**2;return Math.exp(-a*1.6)},uM=[[-185,-60],[-178,40],[-150,128],[-90,158],[-10,178],[60,172],[105,140],[Zi(140),140]];function hf(i,e){let n=9+((Nt(i*.008+3,e*.008-7)-.5)*9+(Nt(i*.03,e*.03)-.5)*2.2)*.8;n+=6*Yi(i,e,-100,15,85,95),n+=5*Yi(i,e,30,-10,80,90);const s=Zi(e),r=i-s;n-=10*Math.exp(-((r/30)**2)),n-=1.3*(1-Tn(1.2,3.4,Math.abs(r))),n+=55*Math.exp(-(((i-225)/85)**2))*Math.exp(-(((e+10)/190)**2))*(1+.08*Math.sin(e*.017)),n+=3*Yi(i,e,hn.x,hn.z,30,30);const a=lf(i,e,uM);n-=8*Math.exp(-((a/20)**2)),n+=Ht.h*Yi(i,e,Ht.x,Ht.z,Ht.r,Ht.r*.85),n+=8*Yi(i,e,Vt.x,Vt.z-8,30,15),n-=Math.max(0,-i-230)*.16,n+=Math.max(0,Math.hypot(i,e)-300)*.05*(i>0?1:0);const o=ln(i,e);return o<1.5&&(n-=.25*(1-Tn(-1,1.5,o))),n}const dM=[[hn.x,hn.z,18],[Jt.x,Jt.z,19],[gn.x,gn.z,36],[96,150,13],[128,128,10],[168,82,9]].map(([i,e,t])=>({x:i,z:e,r:t,h:fM(i,e)}));function fM(i,e){return hf(i,e)}function uf(i,e){let t=hf(i,e);for(const n of dM){const s=Math.hypot(i-n.x,e-n.z);s<n.r*2.2&&(t+=(n.h-t)*.85*Math.exp(-((s/(n.r*.75))**2)))}return t}const il=uf(Vt.x,Vt.z+10.5)-.1,pM=()=>il;function Me(i,e){let t=uf(i,e);const n=Math.abs(i-Vt.x),s=e-(Vt.z+8.5);return n<3.2&&s>-8.2&&s<1.5?t=Math.min(t,il-.4):n<12&&s>=0&&s<9&&(t=Math.min(t,il+Math.max(0,s-4)*.15+Math.max(0,n-9)*.3)),t}function mM(i,e,{lowQuality:t}){const s=t?250:320,r=new In(620,620,s,s).rotateX(-Math.PI/2);r.translate(20,0,0);const a=r.attributes.position,o=a.count,c=r.attributes.uv;for(let p=0;p<o;p++){const _=a.getX(p),g=a.getZ(p);a.setY(p,Me(_,g)),c.setXY(p,_/6,g/6)}r.computeVertexNormals();const l=r.attributes.normal,h=new Float32Array(o*4),d=new Float32Array(o*4);for(let p=0;p<o;p++){const _=a.getX(p),g=a.getZ(p);a.getY(p);const m=l.getY(p),v=ja(_,g)&&!Ds(_,g,ui,-1),x=1-Tn(-.6,1.2,ln(_,g)),b=v?1-Tn(-.8,1.4,ln(_,g,Da)):0,E=1-Tn(.6,.8,m),S=Yi(_,g,Ht.x+6,Ht.z+10,16,12)*1.4,T=Yi(_,g,Vt.x,Vt.z-6,16,6),A=Math.min(1,Math.max(E,S*.9,T)),M=Nt(_*.02+40,g*.02);let y=Tn(.55,.72,M)*.85+(ja(_,g)?.6:0);const C=Math.max(ur(_,g,160,58,16,10,.35),ur(_,g,92,124,13,9,-.2),ur(_,g,186,120,12,16,.1)),U=Math.max(ur(_,g,178,142,26,18,.15),ur(_,g,60,160,22,12,-.1));h[p*4]=Math.min(1,y),h[p*4+1]=A,h[p*4+2]=Math.max(x*(v?.3:1),0),h[p*4+3]=v?Math.max(.55,b):0,d[p*4]=C,d[p*4+1]=U,d[p*4+2]=0,d[p*4+3]=0}r.setAttribute("aSplatA",new Mt(h,4)),r.setAttribute("aSplatB",new Mt(d,4));const u=new it({map:e.grass,normalMap:e.grassN,normalScale:new fe(.6,.6),roughness:.97});u.onBeforeCompile=p=>{Object.assign(p.uniforms,{tDry:{value:e.dry},tRock:{value:e.rock},tRoad:{value:e.road},tPave:{value:e.pave}}),p.vertexShader=`attribute vec4 aSplatA; attribute vec4 aSplatB; varying vec4 vA; varying vec4 vB; varying vec3 vW;
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
      `)};const f=new Ge(r,u);return f.receiveShadow=!0,i.add(f),f}function ur(i,e,t,n,s,r,a){const o=Math.cos(a),c=Math.sin(a),l=i-t,h=e-n,d=o*l-c*h,u=c*l+o*h;return(1-Tn(s-2,s,Math.abs(d)))*(1-Tn(r-2,r,Math.abs(u)))}function gM(i){const r=[],a=[],o=[],c=new Ie(9079381),l=new Ie(10128040),h=new Ie(13218954),d=new Ie;for(let g=0;g<=40;g++){const m=g/40,v=290+1910*m*m;for(let x=0;x<128;x++){const b=x/128*Math.PI*2,E=20+Math.cos(b)*v,S=Math.sin(b)*v,T=Math.max(0,-Math.cos(b));let A=(Nt(E*.004+9,S*.004)-.35)*120*Tn(0,.3,m)+20;A=v<340?Math.min(A,Me(E,S)-2):A,A-=T**1.5*Tn(380,900,v)*260,r.push(E,A,S),d.copy(c).lerp(l,Tn(.1,.8,m)),A<-18&&d.copy(h),a.push(d.r,d.g,d.b)}}for(let g=0;g<40;g++)for(let m=0;m<128;m++){const v=g*128+m,x=g*128+(m+1)%128,b=(g+1)*128+m,E=(g+1)*128+(m+1)%128;o.push(v,x,b,x,E,b)}const u=new mt;u.setAttribute("position",new qe(r,3)),u.setAttribute("color",new qe(a,3)),u.setIndex(o),u.computeVertexNormals();const f=new Ge(u,new it({vertexColors:!0,roughness:1}));f.receiveShadow=!1,i.add(f);const p=Bl(7),_=new Ge(new In(9e3,9e3).rotateX(-Math.PI/2),new _n({color:4026266,roughness:.08,metalness:0,normalMap:p,normalScale:new fe(.25,.25),clearcoat:1,envMapIntensity:1.2}));return _.position.y=-22,i.add(_),{far:f,sea:_,wn:p}}function Bl(i=6){const t=document.createElement("canvas");t.width=t.height=256;const n=t.getContext("2d"),s=n.createImageData(256,256),r=(o,c)=>Math.sin(o*6.2832*3)*.5+Math.sin(c*6.2832*4+o*6.2832)*.5+Math.sin((o+c)*6.2832*5)*.35+Math.sin((o-c)*6.2832*7)*.2;for(let o=0;o<256;o++)for(let c=0;c<256;c++){const l=c/256,h=o/256,d=1/256,u=r(l+d,h)-r(l-d,h),f=r(l,h+d)-r(l,h-d),p=(o*256+c)*4;s.data[p]=128+u*40,s.data[p+1]=128+f*40,s.data[p+2]=255,s.data[p+3]=255}n.putImageData(s,0,0);const a=new ns(t);return a.wrapS=a.wrapT=Cn,a.repeat.set(i,i),a}function bM(i,e){const t=[];for(let d=-300;d<=300;d+=4)t.push([Zi(d),d]);const s=[],r=[],a=[];t.forEach(([d,u],f)=>{const[p,_]=t[Math.min(t.length-1,f+1)],[g,m]=t[Math.max(0,f-1)],v=p-g,x=_-m,b=Math.hypot(v,x),E=-x/b,S=v/b,T=Me(d,u)+.45;if(s.push(d+E*2.6,T,u+S*2.6,d-E*2.6,T,u-S*2.6),r.push(0,f*.8,1,f*.8),f<t.length-1){const A=f*2;a.push(A,A+2,A+1,A+1,A+2,A+3)}});const o=new mt;o.setAttribute("position",new qe(s,3)),o.setAttribute("uv",new qe(r,2)),o.setIndex(a),o.computeVertexNormals();const c=Bl(1);c.repeat.set(1,1);const l=e.water.clone();l.normalMap=c,l.normalScale=new fe(.6,.6),l.color=new Ie(4028040),l.roughness=.3,l.clearcoat=.3,l.envMapIntensity=.45,l.opacity=.8;const h=new Ge(o,l);return h.receiveShadow=!0,i.add(h),{mesh:h,wn:c}}const Ke=ui.y,ke=Ke+1.8,nt=ke+4.5,et=nt+3.6,Ce=-7,Iu=(i,e,t,n)=>{let s=1/0;for(let r=i;r<=e;r+=4)for(let a=t;a<=n;a+=4)s=Math.min(s,Me(r,a));return s};function nc(i,e,t,n,s,r=.42,a=!0){i.box("temple",e,t,r*3,r*3,n,n+.45,0,{solid:!1}),i.cyl("marble",e,t,r,n+.45,n+s-1,{r1:r*.9,seg:10}),i.cyl(a?"gold":"temple",e,t,r*.9,n+s-1,n+s-.3,{r1:r*1.55,seg:10,solid:!1}),i.box("temple",e,t,r*3.4,r*3.4,n+s-.3,n+s,0,{solid:!1})}function Lu(i,e,t,n,s,r){i.box("bronze",e,t,.12,2.6,n,n+s,r,{solid:!1});const a=Math.cos(r),o=Math.sin(r);for(const c of[-.075,.075])for(let l=0;l<4;l++)for(const h of[-.6,.6])i.box("gold",e+o*h+a*c,t+a*h-o*c,.05,.9,n+.5+l*(s-.8)/4,n+.5+l*(s-.8)/4+(s-1.4)/4,r,{solid:!1})}function Dn(i,e,t,n,s,r,a=.6){const o=Math.hypot(n-e,s-t),c=Math.max(1,Math.floor(o/a));for(let l=0;l<=c;l++){const h=l/c,d=new qs(.05,.55,5);d.translate(e+(n-e)*h,r+.27,t+(s-t)*h),i.geom("gold",d)}}function Si(i,e,t,n,s,r,a,o,c,l=[],h=7){const d=[s,...l.flat(),r];for(let u=0;u<d.length-1;u++){const f=d[u],p=d[u+1],g=u%2===0?o:o+h;p-f<=.01||g>=c||(t==="x"?i.box(e,(f+p)/2,n,p-f,a,g,c):i.box(e,n,(f+p)/2,a,p-f,g,c))}}function _M(i,e){const{x0:t,x1:n,z0:s,z1:r}=ui,a=(t+n)/2,o=(s+r)/2,c=n-t,l=r-s,h=Iu(t,n,s,r)-3;i.box("ashlar",a,o,c,l,h,Ke),i.box("paving",a,o,c-.2,l-.2,Ke-.05,Ke+.03,0,{solid:!1});for(const[k,ne,z,be]of[[a,s,c+.6,.6],[a,r,c+.6,.6],[t,o,.6,l+.6],[n,o,.6,l+.6]])i.box("ashlar",k,ne,z,be,Ke-1.2,Ke-.6,0,{solid:!1});const d=10,u=12,f=1.6,p=Ke+d,_=[[a-6,a+6]],g=[[24,34]];Si(i,"ashlar","x",s+f/2,t,n,f,Ke,p+1.2,[],7),Si(i,"ashlar","x",r-f/2,t,n,f,Ke,p+6.2,_,8),Si(i,"ashlar","z",t+f/2,s,r,f,Ke,p+1.2,g,7),Si(i,"ashlar","z",n-f/2,s,r,f,Ke,p+1.2,[],7);for(let k=t+2;k<n-1;k+=3.6)i.box("ashlar",k,s-.2,1.1,.4,Ke-9,p+1.2,0,{solid:!1}),Math.abs(k-a)>7&&i.box("ashlar",k,r+.2,1.1,.4,Ke-9,p+6.2,0,{solid:!1});for(let k=s+2;k<r-1;k+=3.6)i.box("ashlar",n+.2,k,.4,1.1,Ke-9,p+1.2,0,{solid:!1}),(k<22||k>36)&&i.box("ashlar",t-.2,k,.4,1.1,Ke-9,p+1.2,0,{solid:!1});const m=4,v=(k,ne,z,be,_e)=>{for(const we of[u*.45,u-.8]){const Ve=ne+z*we;for(let Le=be;Le<=_e;Le+=m)k==="x"?nc(i,Le,Ve,Ke,d,.42):nc(i,Ve,Le,Ke,d,.42);k==="x"?i.box("temple",(be+_e)/2,Ve,_e-be+1.4,1.1,p-.05,p+.8,0,{solid:!1}):i.box("temple",Ve,(be+_e)/2,1.1,_e-be+1.4,p-.05,p+.8,0,{solid:!1})}const Ue=ne+z*u/2;k==="x"?(i.box("darkWood",(be+_e)/2,Ue,_e-be+2,u,p+.8,p+1.1,0,{solid:!1}),i.box("roof",(be+_e)/2,Ue,_e-be+2,u+.4,p+1.1,p+1.6)):(i.box("darkWood",Ue,(be+_e)/2,u,_e-be+2,p+.8,p+1.1,0,{solid:!1}),i.box("roof",Ue,(be+_e)/2,u+.4,_e-be+2,p+1.1,p+1.6))};v("x",s+f,1,t+14,n-14),v("z",n-f,-1,s+14,r-24),v("z",t+f,1,s+14,r-24);{const k=[r-f-3,r-f-8,r-f-14,r-f-19.5],ne=[d,d+5,d+5,d];k.forEach((z,be)=>{for(let _e=t+4;_e<=n-4;_e+=m)nc(i,_e,z,Ke,ne[be],be===1||be===2?.55:.45)}),i.box("darkWood",a,r-f-4.5,c-4,7,p-.2,p+.2,0,{solid:!1}),i.box("roof",a,r-f-2.6,c-2,6.4,p+.2,p+.8),i.box("roof",a,r-f-17,c-2,6.6,p+.2,p+.8);for(const z of[r-f-6.4,r-f-15.6]){i.box("temple",a,z,c-6,.9,p+5,p+9);for(let be=t+6;be<n-6;be+=4)i.box("void",be,z,1.4,1,p+6,p+8.2,0,{solid:!1})}i.box("darkWood",a,r-f-11,c-6,10,p+8.8,p+9.1,0,{solid:!1}),i.box("roof",a,r-f-11,c-5,10.6,p+9.1,p+9.8),Dn(i,t+3,r-f-6,n-3,r-f-6,p+9.8,2.2)}for(const[k,ne]of[[t+7,s+7],[n-7,s+7]])i.box("roof",k,ne,14,14,p+1.1,p+1.6);const x={x0:0,x1:74,z0:-34,z1:20},b=x.x0-4,E=x.x1+4,S=x.z0-4,T=x.z1+4,A=(k,ne,z,be)=>{const _e=Math.hypot(z-k,be-ne),Ue=Math.floor(_e/1.4);for(let Ve=0;Ve<=Ue;Ve++){const Le=Ve/Ue;i.box("temple",k+(z-k)*Le,ne+(be-ne)*Le,.25,.25,Ke,Ke+1.3,0,{solid:!1})}const we=Math.atan2(z-k,be-ne);i.box("temple",(k+z)/2,(ne+be)/2,.3,_e,Ke+1.15,Ke+1.4,we),i.box("temple",(k+z)/2,(ne+be)/2,.3,_e,Ke+.1,Ke+.3,we,{solid:!1})};A(b,S,50,S),A(62,S,E,S),A(b,T,50,T),A(62,T,E,T),A(E,S,E,Ce-9),A(E,Ce+9,E,T),A(b,S,b,T),i.box("paving",(x.x0+x.x1)/2,(x.z0+x.z1)/2,x.x1-x.x0,x.z1-x.z0,Ke-.5,ke),i.stairs("paving",x.x1+1.5,Ce,16,3,Ke,ke,-Math.PI/2),i.stairs("paving",56,x.z0-1.5,8,3,Ke,ke,0),i.stairs("paving",56,x.z1+1.5,8,3,Ke,ke,Math.PI);const M={x0:4,x1:70,z0:-30,z1:16},y=12,C=2,U=[[54,59]],w=[[54,59]];Si(i,"temple","x",M.z0+C/2,M.x0,M.x1,C,ke,ke+y,U,8),Si(i,"temple","x",M.z1-C/2,M.x0,M.x1,C,ke,ke+y,w,8),Si(i,"temple","z",M.x1-C/2,M.z0,M.z1,C,ke,ke+y,[[Ce-3,Ce+3]],9),i.box("temple",M.x0+C/2,(M.z0+M.z1)/2,C,M.z1-M.z0,ke,ke+y);const P=(k,ne,z,be)=>{i.box("temple",k,ne,z,be,ke+9,ke+y+4),i.box("gold",k,ne,z+.3,be+.3,ke+y+4,ke+y+4.5,0,{solid:!1}),Dn(i,k-z/2,ne-be/2,k+z/2,ne-be/2,ke+y+4.5,1),Dn(i,k-z/2,ne+be/2,k+z/2,ne+be/2,ke+y+4.5,1)};P(M.x1-1,Ce,4,10),P(56.5,M.z0+1,9,4),P(56.5,M.z1-1,9,4);for(const k of[18,32])for(const ne of[M.z0+1,M.z1-1])P(k,ne,7,4);for(const k of[-1,1])Lu(i,M.x1-C-.12,Ce+k*4.3,ke,8.4,k*.1);i.box("gold",(M.x0+M.x1)/2,M.z0-.15,M.x1-M.x0,.4,ke+y-.6,ke+y-.2,0,{solid:!1}),i.box("gold",(M.x0+M.x1)/2,M.z1+.15,M.x1-M.x0,.4,ke+y-.6,ke+y-.2,0,{solid:!1}),i.box("gold",M.x1+.15,(M.z0+M.z1)/2,.4,M.z1-M.z0,ke+y-.6,ke+y-.2,0,{solid:!1});const L=52;for(const[k,ne]of[[M.x1-5,M.z0+5],[M.x1-5,M.z1-5],[L+5,M.z0+5],[L+5,M.z1-5]])i.box("temple",k,ne,7,7,ke,ke+6.5),i.box("void",k+(k>60?-3.55:3.55),ne,.2,1.6,ke,ke+2.6,0,{solid:!1});for(const[k,ne]of[[L+6,Ce-9],[L+6,Ce+9],[M.x1-8,Ce-9],[M.x1-8,Ce+9]]){i.box("temple",k,ne,1.4,1.4,ke,ke+.6),i.cyl("gold",k,ne,.16,ke+.6,ke+11,{seg:8});for(const[z,be]of[[.8,0],[-.8,0],[0,.8],[0,-.8]])i.box("gold",k+z/2,ne+be/2,Math.abs(z)+.12,Math.abs(be)+.12,ke+10.4,ke+10.55,0,{solid:!1}),i.cyl("gold",k+z,ne+be,.18,ke+10.55,ke+10.95,{r1:.38,seg:8,solid:!1}),e.flames.push([k+z,ke+11.25,ne+be,.45])}for(let k=Ce-13;k<=Ce+13;k+=2.2)if(Math.abs(k-Ce)>4)for(const ne of[M.x1-C-.7])i.cyl("bronze",ne,k,.35,ke,ke+.9,{r1:.18,seg:8,solid:!1});Si(i,"temple","z",L,M.z0+C,M.z1-C,2,ke,ke+y,[[Ce-3,Ce+3]],4.5+7.5),i.box("temple",L,Ce,3,12,ke+4.5+7.5,ke+y+5),i.box("gold",L+1.7,Ce,.3,12.4,ke+y+4.4,ke+y+5,0,{solid:!1}),Dn(i,L+1.5,Ce-6,L+1.5,Ce+6,ke+y+5,.8);for(const k of[-1,1])Lu(i,L-1.15,Ce+k*4.3,nt,7.2,k*.1);for(let k=0;k<15;k++){const ne=9-k*.38,z=ke+.3*(k+1),be=new Ft(ne,ne,z-ke+.5,28,1,!1,0,Math.PI),_e=be.attributes.uv;for(let Ue=0;Ue<_e.count;Ue++)_e.setXY(Ue,_e.getX(Ue)*ne*3.1/3,_e.getY(Ue));be.translate(L,(ke-.5+z)/2,Ce),i.geom("paving",be),i.solids.add({x:L+ne*.35,z:Ce,hx:ne*.35,hz:ne*.92,rot:0,y0:ke-.5,y1:z}),i.solids.add({x:L+ne*.8,z:Ce,hx:ne*.15,hz:ne*.55,rot:0,y0:ke-.5,y1:z})}i.box("paving",(M.x0+L)/2+1,Ce+0,L-M.x0-C,M.z1-M.z0-C*2,ke-.2,nt);for(const[k,ne]of[[M.z0+C,Ce-2.5],[Ce+2.5,M.z1-C]])i.box("temple",47,(k+ne)/2,.4,ne-k,nt,nt+1);i.box("temple",47,Ce,.4,5,nt,nt+1),i.solids.add({x:47,z:Ce,hx:.25,hz:(M.z1-M.z0)/2,rot:0,y0:nt-.5,y1:nt+3.2});for(const k of[M.z0+C+3,M.z1-C-3])for(const ne of[10,18,26])i.box("plasterWarm",ne+2,k,7,5.5,nt,nt+7),i.box("void",ne+2,k+(k<0?2.8:-2.8),1.4,.1,nt,nt+2.4,0,{solid:!1});const F=42,W=nt+4.2;i.box("rock",F,Ce,9,9,nt,nt+1.6),i.box("rock",F,Ce,8,8,nt+1.6,W),i.box("stoneDark",F,Ce,6,6,W,W+.25,0,{solid:!1});for(const[k,ne]of[[-3.6,-3.6],[3.6,-3.6],[-3.6,3.6],[3.6,3.6]])i.box("rock",F+k,Ce+ne,.8,.8,W,W+.9);i.solids.add({x:F,z:Ce+4.5+7,hx:1.7,hz:7,rot:0,y0:nt-.3,y1:W,rampAxis:"z",rampA:W,rampB:nt});{const k=new en(3.4,1,14),ne=k.attributes.position;for(let be=0;be<ne.count;be++){const _e=ne.getZ(be),Ue=ne.getY(be),we=(_e+7)/14;ne.setY(be,Ue>0?W-(W-nt)*we-nt:-.3)}k.computeVertexNormals();const z=k.attributes.uv;for(let be=0;be<z.count;be++)z.setXY(be,z.getX(be)*2,z.getY(be)*2);k.translate(F,nt,Ce+4.5+7),i.geom("rock",k)}e.flames.push([F-1.2,W+.6,Ce,1.4],[F+1.2,W+.5,Ce+.8,1.1],[F+.3,W+.6,Ce-1.1,1.2]),e.smoke.push([F,W+1.5,Ce]),e.lights.push([F,W+2.5,Ce,16742954,26]),i.cyl("bronze",38,Ce+9,1.2,nt,nt+1.1,{r1:.8,seg:16}),i.cyl("bronze",38,Ce+9,.8,nt+1.1,nt+2,{r1:1.7,seg:16,solid:!1});for(let k=0;k<4;k++)for(let ne=0;ne<2;ne++){const z=38+k*2.6,be=M.z0+C+4+ne*3;i.cyl("temple",z,be,.22,nt,nt+3,{seg:8}),i.box("darkWood",z,be,.25,3.2,nt+2.8,nt+3.1,0,{solid:!1})}for(let k=0;k<6;k++)i.box("bronze",38+k*1.6,M.z0+C+10,.5,.5,nt,nt+.12,0,{solid:!1});const O=32,j=8,X=26,se=Ce-15,pe=Ce+15,de=Ce-10,Q=Ce+10,te=et+28,Ee=et+22;i.box("marble",(4+O)/2,Ce,O-4,30,nt-.2,et),i.stairs("marble",O+1.8,Ce,20,3.6,nt,et,-Math.PI/2),i.box("marble",(j+X)/2,Ce,X-j,Q-de,et,Ee);for(const k of[-1,1]){i.box("marble",(j+X)/2,Ce+k*(10+2.5),X-j,5,et,et+15);for(let ne=0;ne<3;ne++)for(let z=j+2;z<X-1;z+=3.2)i.box("void",z,Ce+k*15.05,.7,.1,et+2.5+ne*4.6,et+4+ne*4.6,0,{solid:!1});i.box("gold",(j+X)/2,Ce+k*15.1,X-j,.3,et+14.6,et+15.2,0,{solid:!1})}i.box("marble",j-2,Ce,4,30,et,et+15);for(const k of[-1,1])for(let ne=j+3;ne<X-2;ne+=4)i.box("void",ne,Ce+k*10.05,.9,.1,et+17,et+19.5,0,{solid:!1});i.box("gold",(j+X)/2,Ce,X-j+.8,Q-de+.8,Ee-1.2,Ee,0,{solid:!1}),Dn(i,j,de,X,de,Ee),Dn(i,j,Q,X,Q,Ee),Dn(i,j,de,j,Q,Ee);const xe=Ce-4.5,he=Ce+4.5,Te=et+18;i.box("marble",(X+O)/2,(se+xe)/2,O-X,xe-se,et,te),i.box("marble",(X+O)/2,(he+pe)/2,O-X,pe-he,et,te),i.box("marble",(X+O)/2,Ce,O-X,he-xe,Te,te);for(let k=xe+.6;k<he;k+=1.6)i.box("gold",(X+O)/2,k,O-X,.3,Te-.5,Te,0,{solid:!1});i.box("gold",X+.1,Ce,.25,8,et,et+12,0,{solid:!1}),i.box("void",X+.25,Ce,.1,5.6,et,et+10.5,0,{solid:!1});for(const k of[-1,1])i.box("gold",X+1.4,Ce+k*3.7,2.6,.18,et,et+10.5,k*.6,{solid:!1});for(const k of[-1,1])i.box("veil",X+.42+.12*(k+1),Ce+k*1.55,.06,2.55,et,et+10.3,k*.1,{uv:[k<0?0:.5,0,.5,1],solid:!1});i.solids.add({x:X+.5,z:Ce,hx:.3,hz:2.8,rot:0,y0:et,y1:et+10.3}),e.veil=[X+1.2,et,Ce];{const k=[];for(let ne=0;ne<=40;ne++){const z=ne/40;k.push(new N(X+.35,et+12.6+Math.sin(z*Math.PI*5)*.45,Ce-6+12*z))}i.geom("gold",new Tl(new Hd(k),80,.09,5));for(let ne=0;ne<46;ne++){const z=ne/46,be=Ce-6+12*z,_e=et+12.6+Math.sin(z*Math.PI*5)*.45+(ne%2?.45:-.45),Ue=new Nr(.32,5);if(Ue.rotateY(Math.PI/2),Ue.rotateX(ne*1.7%1.2-.6),Ue.translate(X+.45,_e,be),i.geom("gold",Ue),ne%4===0)for(let we=0;we<7;we++){const Ve=new is(.11,6,4);Ve.translate(X+.5,_e-.35-we%3*.16,be+(we*.37%.4-.2)),i.geom("gold",Ve)}}}for(const k of[se+.8,se+5.5,xe-1.4,he+1.4,pe-5.5,pe-.8])i.box("marble",O+.25,k,.5,1.4,et,te-3.2,0,{solid:!1}),i.box("gold",O+.35,k,.7,1.8,te-3.2,te-2.2,0,{solid:!1});for(const k of[et+9,Te+.2])i.box("gold",O+.2,Ce,.4,30.2,k,k+.35,0,{solid:!1});i.box("gold",O+.3,Ce,.6,30.6,te-2.2,te-.6,0,{solid:!1}),i.box("gold",(X+O)/2,se-.25,O-X+.6,.5,te-2.2,te-.6,0,{solid:!1}),i.box("gold",(X+O)/2,pe+.25,O-X+.6,.5,te-2.2,te-.6,0,{solid:!1}),i.box("gold",O+.2,xe-.3,.4,.6,et,Te+.6,0,{solid:!1}),i.box("gold",O+.2,he+.3,.4,.6,et,Te+.6,0,{solid:!1}),i.box("marble",(X+O)/2,Ce,O-X+.4,30.4,te-.6,te+.9,0,{solid:!1}),Dn(i,O+.1,se,O+.1,pe,te+.9,.75),Dn(i,X,se,O,se,te+.9,.75),Dn(i,X,pe,O,pe,te+.9,.75);for(const k of[xe-3,he+3]){const ne=new $i(.8,.12,6,18);ne.rotateY(Math.PI/2),ne.translate(O+.55,Te-3,k),i.geom("gold",ne)}const We=Me(a,r+14);i.stairs("walls",a,r+7,12,14,We,Ke,Math.PI);for(const k of[-1,1])i.box("ashlar",a+k*6.8,r+7,1.6,14,We-1,Ke+1.1);const $e=Me(t-7,54);i.stairs("walls",t-6,44,7,20,$e,Ke,Math.PI),i.box("ashlar",t-6,29,8,10,$e-4,Ke);for(let k=0;k<3;k++)i.box("ashlar",t-6,54-k*7,7.6,1.4,$e-4,$e+2+k*1.5,0,{solid:!1});i.box("ashlar",t-9.6,37,.8,34,$e,Ke+1.1);{const k=zl,ne=(k.x0+k.x1)/2,z=(k.z0+k.z1)/2,be=Iu(k.x0,k.x1,k.z0,k.z1)-2,_e=Ke+13;i.box("walls",ne,z,k.x1-k.x0,k.z1-k.z0,be,_e),i.box("stoneDark",ne,z,k.x1-k.x0+.6,k.z1-k.z0+.6,_e-.6,_e,0,{solid:!1});const Ue=[[k.x0+3.5,k.z0+3.5,10],[k.x1-3.5,k.z0+3.5,10],[k.x0+3.5,k.z1-3.5,10],[k.x1-3.5,k.z1-3.5,16]];for(const[we,Ve,Le]of Ue){i.box("walls",we,Ve,7,7,be,_e+Le);for(let D=0;D<4;D++)for(let R=-1;R<=1;R++){const q=D<2?D?3.3:-3.3:R*2.2,re=D<2?R*2.2:D===2?3.3:-3.3;i.box("walls",we+q,Ve+re,1.1,1.1,_e+Le,_e+Le+1.2,0,{solid:!1})}for(let D=0;D<3;D++)i.box("void",we+3.55,Ve,.1,.6,_e-6+D*5,_e-4.5+D*5,0,{solid:!1})}for(let we=k.x0+8;we<k.x1-7;we+=2)for(const Ve of[k.z0+.3,k.z1-.3])i.box("walls",we,Ve,1,.6,_e,_e+1.1,0,{solid:!1});i.stairs("walls",k.x1-9,k.z1+4.5,5,9,Ke,Ke+6,Math.PI),i.box("void",k.x1-9,k.z1+.05,3,.1,Ke+6,Ke+9,0,{solid:!1}),i.box("walls",k.x1-9,k.z1+.9,5,1.8,Ke,Ke+6)}return{ZC:Ce,levels:{Y0:Ke,CHEL:ke,ISRAEL:nt,PORCH:et}}}let Du=4242;const lt=()=>(Du=Du*16807%2147483647)/2147483647,xM=i=>i[Math.floor(lt()*i.length)],Ua=10,ya=3.2,df=(i,e,t,n,s)=>{const r=Math.cos(s),a=Math.sin(s);let o=1/0,c=-1/0;for(const[l,h]of[[-1,-1],[1,-1],[-1,1],[1,1],[0,0]]){const d=l*t/2,u=h*n/2,f=Me(i+r*d+a*u,e-a*d+r*u);o=Math.min(o,f),c=Math.max(c,f)}return[o,c]},vt=(i,e,t,n,s)=>[i+Math.cos(t)*n+Math.sin(t)*s,e-Math.sin(t)*n+Math.cos(t)*s];function vM(i,e){const t=lM.map(n=>{const[s,r]=jt[n.seg],[a,o]=jt[(n.seg+1)%jt.length];return{...n,x:s+(a-s)*n.t,z:r+(o-r)*n.t}});e.gates=t;for(let n=0;n<jt.length;n++){let m=function(x,b){const E=s+l*(x+b)/2,S=r+h*(x+b)/2,T=b-x+.05,A=Math.min(Me(s+l*x,r+h*x),Me(s+l*b,r+h*b),Me(E,S)),y=Math.max(Me(s+l*x,r+h*x),Me(s+l*b,r+h*b),Me(E,S))+Ua;i.box("walls",E,S,T,ya,A-3,y,d),i.box("stoneDark",E+u*1.9,S+f*1.9,T,.8,A-3,A+1.8,d,{solid:!1}),i.box("walls",E+u*1.75,S+f*1.75,T,.5,y-.8,y-.3,d,{solid:!1});const C=Math.floor(T/2);for(let U=0;U<C;U++){const w=x+(U+.5)*(T/C);i.box("walls",s+l*w+u*1.3,r+h*w+f*1.3,1.1,.6,y,y+1.3,d)}i.box("walls",E-u*1.45,S-f*1.45,T,.3,y,y+.5,d,{solid:!1})};if(af.has(n))continue;const[s,r]=jt[n],[a,o]=jt[(n+1)%jt.length],c=Math.hypot(a-s,o-r),l=(a-s)/c,h=(o-r)/c,d=Math.atan2(l,h)+Math.PI/2;let u=h,f=-l;qa((s+a)/2+u*6,(r+o)/2+f*6,jt)&&(u=-u,f=-f);const p=t.find(x=>x.seg===n),_=p?p.t*c:-99,g=Math.ceil(c/9);for(let x=0;x<g;x++){const b=x/g*c,E=(x+1)/g*c;if(p&&E>_-3&&b<_+3){for(const[S,T]of[[b,_-3],[_+3,E]])T-S>.2&&m(S,T);continue}m(b,E)}const v=Math.max(1,Math.round(c/36));for(let x=0;x<=v;x++){const b=x/v*c;p&&Math.abs(b-_)<9||Uu(i,s+l*b+u*1.5,r+h*b+f*1.5,d,8,5.5)}if(p){for(const U of[-1,1])Uu(i,p.x+l*U*6.5+u*2,p.z+h*U*6.5+f*2,d,7,7);const x=Me(p.x,p.z),b=x+Ua+1;i.box("walls",p.x,p.z,6.2,ya+.4,x+6.2,b,d);const E=new $i(3.05,.35,6,16,Math.PI);E.rotateY(d+Math.PI/2),E.translate(p.x+u*1.9,x+3.6,p.z+f*1.9),i.geom("stoneDark",E);for(const U of[-1,1])i.box("darkWood",p.x+l*U*2.6-u*.5,p.z+h*U*2.6-f*.5,.2,1.4,x,x+5.8,d+U*1.2,{solid:!1});const S=p.x+l*13-u*(ya/2+1.4),T=p.z+h*13-f*(ya/2+1.4),A=Me(S,T),M=x+Ua-A,y=M/.3*.42,C=Math.atan2(l,h);i.stairs("walls",S+l*y/2,T+h*y/2,2.6,y,A,A+M,C)}}}function Uu(i,e,t,n,s,r){const[a,o]=df(e,t,s,s,n),c=o+Ua+r;i.box("walls",e,t,s,s,a-3,c,n),i.box("stoneDark",e,t,s+.5,s+.5,c-1.4,c-.9,n,{solid:!1});for(let l=0;l<4;l++)for(let h=-1;h<=1;h++){const d=l<2?(l?1:-1)*(s/2-.4):h*s/3.2,u=l<2?h*s/3.2:(l===2?1:-1)*(s/2-.4),[f,p]=vt(e,t,n,d,u);i.box("walls",f,p,1.1,1.1,c,c+1.3,n,{solid:!1})}for(let l=1;l<=2;l++)for(const h of[-1,1]){const[d,u]=vt(e,t,n,h*(s/2+.02),0);i.box("void",d,u,.1,.5,o+l*4.5,o+l*4.5+1.4,n,{solid:!1})}}function MM(i,e){for(const[a,o,c,l,h]of[[-142,-14,9,26,"Hípico"],[-133,-30,11,32,"Fasael"],[-121,-44,8,23,"Mariamne"]]){const d=Me(a,o);i.box("ashlar",a,o,c,c,d-2,d+l*.55),i.box("walls",a,o,c-1.2,c-1.2,d+l*.55,d+l),i.box("stoneDark",a,o,c+.3,c+.3,d+l*.55-.3,d+l*.55+.4,0,{solid:!1});for(let u=0;u<3;u++)for(const[f,p]of[[0,c/2-.58],[0,-c/2+.58],[c/2-.58,0],[-c/2+.58,0]])i.box(u===1&&h==="Fasael"?"lit":"void",a+f*1.01,o+p*1.01,f?.1:1,p?.1:1,d+l*.6+u*3.5,d+l*.6+u*3.5+1.6,0,{solid:!1});for(let u=-2;u<=2;u++)for(const[f,p]of[[u,1],[u,-1],[1,u],[-1,u]])i.box("walls",a+f*(f===1||f===-1?(c-1.2)/2-.3:(c-1.2)/5.5),o+p*(p===1||p===-1?(c-1.2)/2-.3:(c-1.2)/5.5),.9,.9,d+l,d+l+1.2,0,{solid:!1})}const t=rf,n=Math.min(Me(t.x0,t.z0),Me(t.x1,t.z1),Me(t.x0,t.z1),Me(t.x1,t.z0))-1,s=n+12;i.box("plaster",(t.x0+t.x1)/2,t.z0+5,t.x1-t.x0,10,n,s),i.box("plaster",(t.x0+t.x1)/2,t.z1-5,t.x1-t.x0,10,n,s),i.box("plaster",t.x0+4,(t.z0+t.z1)/2,8,t.z1-t.z0-20,n,s);for(const[a,o]of[[t.z0+10,33],[40,t.z1-10]])i.box("walls",t.x1-.8,(a+o)/2,1.6,o-a,n,n+6);i.box("roof",(t.x0+t.x1)/2,t.z0+5,t.x1-t.x0+.6,10.6,s,s+.4),i.box("roof",(t.x0+t.x1)/2,t.z1-5,t.x1-t.x0+.6,10.6,s,s+.4),i.box("roof",t.x0+4,(t.z0+t.z1)/2,8.6,t.z1-t.z0-20,s,s+.4);for(const a of[t.z0+.05,t.z1-.05,t.z0+10.05,t.z1-10.05])for(let o=t.x0+3;o<t.x1-2;o+=3.5)i.box(lt()<.2?"lit":"void",o,a,1,.12,n+7.5,n+9.5,0,{solid:!1});const r=n+.3;i.box("paving",(t.x0+t.x1)/2+4,(t.z0+t.z1)/2,t.x1-t.x0-8,t.z1-t.z0-20,n-1,r);for(let a=t.x0+11;a<t.x1-2;a+=3.4)for(const o of[t.z0+12,t.z1-12])i.box("marble",a,o,.9,.9,r,r+.4,0,{solid:!1}),i.cyl("marble",a,o,.3,r+.4,r+5.6,{seg:8}),i.box("gold",a,o,.8,.8,r+5.6,r+6,0,{solid:!1});i.box("roof",(t.x0+t.x1)/2+4,t.z0+11.6,t.x1-t.x0-8,3.6,r+6,r+6.4,0,{solid:!1}),i.box("roof",(t.x0+t.x1)/2+4,t.z1-11.6,t.x1-t.x0-8,3.6,r+6,r+6.4,0,{solid:!1});for(const a of[(t.z0+t.z1)/2-5,(t.z0+t.z1)/2+5])i.box("marble",-116,a,14,5,r,r+.5),e.pools.push([-116,a,12.6,3.6,r+.38]);e.palaceGarden={x0:t.x0+10,x1:t.x1-3,z0:t.z0+14,z1:t.z1-14}}function yM(i,e){const{x:t,z:n,w:s,d:r}=Ir,a=Me(t,n),o=a+1.2;for(let c=0;c<3;c++)i.box("walls",t,n,s+6-c*1,r+6-c*1,a-1,a+.4*(c+1));i.box("walls",t,n,s+3,r+3,a-1,o),i.box("paving",t,n,s,r,a-1.5,a+.25);for(let c=0;c<2;c++)i.box("paving",t,n,s+2-c*1,r+2-c*1,a-1,a+.25+(2-c)*.3,0,{solid:!1});e.pools.push([t,n,s+2.6,r+2.6,a+.85]);for(let c=0;c<=6;c++)for(const l of[-1,1]){const h=t-s/2-2+(s+4)*(c/6);i.cyl("marble",h,n+l*(r/2+4),.3,a,a+4.6,{seg:8})}for(const c of[-1,1])i.box("roof",t,n+c*(r/2+4),s+6,2.2,a+4.6,a+5.1,0,{solid:!1})}function Nu(i,e,t,n,s,r,a,o,c){const[l,h]=df(e,t,n,s,a),d=l-1.5,u=h+r*3.1+.4;i.box(o,e,t,n,s,d,u,a),i.box("roof",e,t,n+.3,s+.3,u,u+.28,a);const f=.22,p=.75;for(const[b,E,S,T]of[[0,s/2-f/2,n,f],[0,-s/2+f/2,n,f],[n/2-f/2,0,f,s],[-n/2+f/2,0,f,s]]){const[A,M]=vt(e,t,a,b,E);i.box(o,A,M,S,T,u+.28,u+.28+p,a,{solid:!1})}const _=(lt()-.5)*(n-2.4);let[g,m]=vt(e,t,a,_,s/2+.03);const v=Me(g,m);i.box("void",g,m,1.15,.08,v-.2,v+2.15,a,{solid:!1}),[g,m]=vt(e,t,a,_,s/2+.1),i.box("darkWood",g,m,1.6,.22,v+2.15,v+2.4,a,{solid:!1});const x=1+Math.floor(lt()*3);for(let b=0;b<x;b++){const E=Math.floor(lt()*4),S=Math.min(r,1+Math.floor(lt()*r)),T=h+S*3.1-1.6;if(T+.8>u)continue;const A=lt()<.12?"lit":"void",M=(lt()-.5)*.6,[y,C,U,w]=E===0?[M*n,s/2+.03,.55,.08]:E===1?[M*n,-s/2-.03,.55,.08]:E===2?[n/2+.03,M*s,.08,.55]:[-n/2-.03,M*s,.08,.55],[P,L]=vt(e,t,a,y,C);i.box(A,P,L,U,w,T,T+.8,a,{solid:!1})}if(lt()<.3&&r<=2){const b=lt()<.5?1:-1,E=Math.min(s-.6,(u-l)/.3*.33),[S,T]=vt(e,t,a,b*(n/2+.65),0);i.stairs(o,S,T,1.2,E,l,u+.28,a+Math.PI)}if(lt()<.22){const b=Math.min(3.4,n-1),E=Math.min(3,s-1);for(const[S,T]of[[-1,-1],[1,-1],[-1,1],[1,1]]){const[A,M]=vt(e,t,a,S*b/2+n/4-.3,T*E/2);i.box("darkWood",A,M,.16,.16,u+.28,u+2.5,a,{solid:!1})}for(let S=-2;S<=2;S++){const[T,A]=vt(e,t,a,n/4-.3+S*b/5,0);i.box("darkWood",T,A,.12,E+.6,u+2.4,u+2.55,a,{solid:!1})}if(lt()<.6){const[S,T]=vt(e,t,a,n/4-.3,0);i.box("awning",S,T,b,E,u+2.55,u+2.6,a,{solid:!1,uv:[Math.floor(lt()*4)/4,0,.25,1]})}}if(lt()<.25)for(let b=0;b<3;b++){const[E,S]=vt(e,t,a,-n/2+.8+b*.7,-s/2+.8);i.cyl("clay",E,S,.28,u+.28,u+1.05,{r1:.18,seg:8,solid:!1})}if(lt()<.18){const[b,E]=vt(e,t,a,_,s/2+.9),S=new In(2.6,1.8);S.rotateX(-Math.PI/2+.35),S.rotateY(a);const T=S.attributes.uv,A=Math.floor(lt()*4)/4;for(let M=0;M<T.count;M++)T.setXY(M,A+T.getX(M)*.25,T.getY(M));S.translate(b,v+2.7,E),i.geom("awning",S)}if(lt()<.12){const[b,E]=vt(e,t,a,n/2-.8,-s/2+.8);c.smoke.push([b,u+.8,E])}}function SM(i,e){const n=[];for(let o=0;o<jt.length;o++)af.has(o)||n.push([...jt[o],...jt[(o+1)%jt.length]]);const s=(o,c)=>Math.min(...n.map(([l,h,d,u])=>cf(o,c,l,h,d,u))),r=[(o,c)=>Ds(o,c,ui,9),(o,c)=>Ds(o,c,zl,7),(o,c)=>Ds(o,c,rf,6),(o,c)=>Math.hypot(o-Ir.x,c-Ir.z)<18,(o,c)=>o>-36&&o<-14&&c>16&&c<60,(o,c)=>o<-112&&c<-4&&c>-54];let a=0;for(let o=-150;o<92;o+=8.2)for(let c=-80;c<142;c+=8.2){const l=o+(lt()-.5)*3,h=c+(lt()-.5)*3;if(!qa(l,h,jt)||r.some(E=>E(l,h)))continue;const d=5.2+lt()*3.2,u=5+lt()*3,f=Math.max(d,u)/2;if(ln(l,h,Da)<f+.6||s(l,h)<f+3.6)continue;let p=1/0,_=l,g=h+1;for(const E of Da)for(let S=0;S<E.pts.length-1;S++){const[T,A]=E.pts[S],[M,y]=E.pts[S+1],C=M-T,U=y-A,w=C*C+U*U,P=Math.max(0,Math.min(1,((l-T)*C+(h-A)*U)/w)),L=T+C*P,F=A+U*P,W=Math.hypot(l-L,h-F);W<p&&(p=W,_=L,g=F)}const m=Math.atan2(_-l,g-h),v=p<28?m+(lt()-.5)*.08:Math.floor(lt()*4)*Math.PI/2,x=lt()<.55?1:lt()<.8?2:3,b=lt()<.55?"plaster":lt()<.75?"plasterWarm":"walls";if(Nu(i,l,h,d,u,x,v,b,e),lt()<.25){const[E,S]=vt(l,h,v,d/2+1.6,-u/4);ln(E,S,Da)>3&&qa(E,S,jt)&&Nu(i,E,S,3.2,u/2,1,v,b,e)}a++}return a}function EM(i){for(let e=-66;e<-38;e+=4.2)for(const t of[-1,1]){if(lt()<.25)continue;const n=1+t*4.6,s=Me(e,n);i.box("darkWood",e,n,3,1.2,s,s+.9,0,{solid:!0});for(const[c,l]of[[-1.4,-.6],[1.4,-.6],[-1.4,.6],[1.4,.6]])i.box("darkWood",e+c,n+l*t,.1,.1,s,s+2.4,0,{solid:!1});const r=new In(3.4,2);r.rotateX(-Math.PI/2+t*.25);const a=r.attributes.uv,o=Math.floor(lt()*4)/4;for(let c=0;c<a.count;c++)a.setXY(c,o+a.getX(c)*.25,a.getY(c));r.translate(e,s+2.5,n),i.geom("awning",r);for(let c=0;c<4;c++)i.cyl(xM(["clay","darkWood"]),e-1+c*.65,n,.22,s+.9,s+1.2,{r1:.28,seg:8,solid:!1})}}function wM(i,e){return vM(i,e),MM(i,e),yM(i,e),EM(i),SM(i,e)}let Fu=99;const pt=()=>(Fu=Fu*16807%2147483647)/2147483647;function es(i,e,t,n,s,r=.8,a="cliff"){const o=new so(s,1),c=o.attributes.position;for(let h=0;h<c.count;h++){const d=c.getX(h),u=c.getY(h),f=c.getZ(h),p=.75+Nt(d*.8+e,f*.8+u+n,3)*.6;c.setXYZ(h,d*p,u*p*r,f*p)}o.computeVertexNormals();const l=o.attributes.uv;for(let h=0;h<l.count;h++)l.setXY(h,l.getX(h)*s*2,l.getY(h)*s);o.translate(e,t,n),i.geom(a,o)}function Ya(i,e,t,n,s,r,a,o=[],c="cliff"){const l=new In(s,r,40,22),h=l.attributes.position;for(let u=0;u<h.count;u++){const f=h.getX(u),p=h.getY(u);let _=(Nt(f*.28+e,p*.3+t,4)-.5)*4.2+(Nt(f*1.2,p*1.6,3)-.5)*1.1+Math.sin(p*1.7+f*.3)*.18;const g=Math.min(1,(s/2-Math.abs(f))/3);_-=(1-g)*2.5,_-=Math.max(0,(p/(r/2))**3)*1.6;for(const m of o){const v=((f-m.x)/m.rx)**2+((p-m.y)/m.ry)**2;v<1&&(_-=m.depth*(1-v)**.7)}h.setZ(u,_)}l.computeVertexNormals();const d=l.attributes.uv;for(let u=0;u<d.count;u++)d.setXY(u,d.getX(u)*s/6,d.getY(u)*r/6);l.translate(0,a+r/2,0),l.rotateY(n),l.translate(e,0,t),i.geom(c,l)}function ic(i,e,t,n,s=0){const r=Me(e,t);i.box("darkWood",e,t,.26,.26,r-.6,r+n,s),i.box("darkWood",e,t,2.3,.22,r+n-1.25,r+n-.98,s,{solid:!1});for(let a=0;a<4;a++)es(i,e+Math.cos(a*1.6)*.5,r+.05,t+Math.sin(a*1.6)*.5,.32,.6,"fieldStone")}function TM(i,e){const{x:t,z:n}=Ht,s=.55,r=t+9,a=n+13.5,o=Me(r+3,a+4)-1.5;Ya(i,r,a,s,26,13,o,[{x:-4.2,y:1.4,rx:2.5,ry:2.1,depth:3.6},{x:4,y:1.6,rx:2.4,ry:2.2,depth:3.6},{x:.2,y:-1.2,rx:.9,ry:1.6,depth:1.4},{x:0,y:-4.2,rx:5.5,ry:.7,depth:1.2}]);for(const[l,h]of[[-4.2,1.4],[4,1.6]]){const d=new Nr(1.15,14);d.scale(1.15,1,1),d.translate(l,o+6.5+h,-3.3),d.rotateY(s),d.translate(r,0,a);const u=d.attributes.position;let f=!0;for(let p=0;p<u.count;p++)if(Me(u.getX(p),u.getZ(p))<u.getY(p)+.3){f=!1;break}f?i.geom("void",d):d.dispose()}i.solids.add({x:r-Math.sin(s)*2,z:a-Math.cos(s)*2,hx:12.5,hz:2.5,rot:s,y0:o-2,y1:o+12});for(let l=0;l<12;l++)es(i,r+(pt()-.5)*22,o+.3,a+2+pt()*4,.6+pt()*1.4,.7);ic(i,t-3.4,n-1,4.4,.08),ic(i,t,n,5.4),ic(i,t+3.4,n+.8,4.4,-.06);const c=Me(t,n);e.golgotha={cross:[t,c+1,n],top:c,face:[r,a,s,o]},i.box("wood",t,n+.16,.9,.06,c+5.55,c+5.95,0,{solid:!1});for(let l=0;l<18;l++){const h=pt()*6.28,d=4+pt()*10;es(i,t+Math.cos(h)*d,Me(t+Math.cos(h)*d,n+Math.sin(h)*d),n+Math.sin(h)*d,.4+pt()*.9,.6)}}function AM(i,e){const t=Vt.x,n=Vt.z+8.5,s=pM(),r=n-7.5,a=n-1,o=s+7;i.box("cliff",t-6.5,n-5,8,10,s-2,o),i.box("cliff",t+6.5,n-5,8,10,s-2,o),i.box("cliff",t,r-1.25,5,2.5,s-2,o),i.box("cliff",t,(r+n)/2,5,n-r,s+2.4,o),i.box("cliff",t-1.625,a+.5,1.75,1,s-2,s+2.4,0,{solid:!1}),i.box("cliff",t+1.625,a+.5,1.75,1,s-2,s+2.4,0,{solid:!1}),i.box("cliff",t,a+.5,1.5,1,s+2.05,s+2.4,0,{solid:!1}),i.solids.add({x:t-1.65,z:a+.5,hx:.85,hz:.5,rot:0,y0:s-2,y1:s+2.4}),i.solids.add({x:t+1.65,z:a+.5,hx:.85,hz:.5,rot:0,y0:s-2,y1:s+2.4}),i.solids.add({x:t,z:a+.5,hx:.8,hz:.5,rot:0,y0:s+2.05,y1:s+2.4}),i.box("cliff",t,(r+a)/2,5,a-r,s-1,s+.02),i.box("cliff",t-1.75,(r+a)/2-.4,1.5,4.8,s,s+.7),i.box("cliff",t+1.4,r+.6,2.2,1.2,s,s+.7),i.box("linen",t-1.75,r+2.4,.42,1.7,s+.7,s+.78,.04,{solid:!1}),i.box("linen",t-1.7,r+1,.36,.28,s+.7,s+.86,-.2,{solid:!1}),i.box("stoneDark",t-1.2,n+.35,7.5,.7,s-.3,s+.12,0,{solid:!1});{const u=new Ft(1.15,1.15,.45,22);u.rotateX(Math.PI/2);const f=u.attributes.uv;for(let p=0;p<f.count;p++)f.setXY(p,f.getX(p)*1.2,f.getY(p)*1.2);u.translate(t-3.6,s+1.15,n+.35),i.geom("cliff",u),i.solids.add({x:t-3.6,z:n+.35,hx:1.1,hz:.3,rot:0,y0:s,y1:s+2.3})}for(let u=0;u<16;u++)es(i,t+(pt()-.5)*20,o-.5+pt(),n-3-pt()*8,1.4+pt()*1.8,.6);for(const u of[-1,1])for(let f=0;f<4;f++)es(i,t+u*(10+pt()*2),s+f*1.6,n-2-pt()*6,1.5+pt(),.8);Ya(i,t,n-.05,0,21,3.2,o-1.6,[],"cliff");for(const u of[-1,1])Ya(i,t+u*6.6,n+.4,0,8.4,o-s+1.5,s-1.2,[],"cliff");e.tomb={X:t,FZ:n,g:s,stone:[t-3.6,s+1.1,n+.6],linen:[t-1.75,s+.8,r+1.8]},e.lights.push([t-.5,s+1.6,r+2.5,16769968,7,.6]);const c=(u,f,p,_)=>{const g=Math.hypot(p-u,_-f),m=Math.atan2(p-u,_-f)+Math.PI/2,v=(u+p)/2,x=(f+_)/2,b=Me(v,x);i.box("fieldStone",v,x,g,.6,b-.6,b+.9,m)};c(t-22,n+18,t-4,n+18),c(t+4,n+18,t+20,n+18),c(t+20,n+18,t+20,n+2);const l=t+9,h=n+9,d=Me(l,h);i.cyl("fieldStone",l,h,1.1,d-.5,d+.8,{seg:14}),i.box("darkWood",l,h,2.4,.12,d+2.1,d+2.25,0,{solid:!1});for(const u of[-1,1])i.box("darkWood",l+u*1.1,h,.12,.12,d+.8,d+2.25,0,{solid:!1});i.box("fieldStone",t-8,n+6,2,.6,Me(t-8,n+6),Me(t-8,n+6)+.47),e.bench=[t-8,Me(t-8,n+6),n+6],e.gardens.push({x:t,z:n+9,r:14})}function RM(i,e){const{x:t,z:n}=hn,s=Me(t,n)+.2,r=s+1.5;i.box("walls",t,n,16,14,s-3,r),i.stairs("walls",t-2,n+8.2,4,2.4,s-.4,r,Math.PI);for(const[l,h,d,u]of[[-7.8,0,.5,14],[0,-6.8,16,.5],[-6.1,6.8,3.8,.5],[3.8,6.8,8.4,.5],[7.8,0,.5,14]])i.box("walls",t+l,n+h,d,u,r,r+1);i.box("stoneDark",t-6.6,n,.8,7,r,r+.45,0,{solid:!1});const a=t+4,o=n-2.5,c=r+7;i.box("walls",a,o,5,5,r,c),i.box("stoneDark",a,o,5.4,5.4,c-.5,c,0,{solid:!1});for(const[l,h,d,u]of[[a,o-2.35,5,.3],[a+2.35,o,.3,5],[a,o+2.35,5,.3],[a-2.35,o+1.1,.3,2.8]])i.box("walls",l,h,d,u,c,c+1.05);for(let l=-2;l<=2;l++)for(const[h,d]of[[l*1.1,-2.35],[l*1.1,2.35],[2.35,l*1.1]])i.box("walls",a+h,o+d,.5,.45,c+1.05,c+1.6,0,{solid:!1});i.box("void",a-2.52,o+1.2,.08,1.1,r,r+2.1,0,{solid:!1}),i.stairs("walls",a+.6,o+3.4,1.6,4.4,r,r+3.5,-Math.PI/2),i.box("walls",a-3.7,o+3.4,3,1.8,r,r+3.5),i.stairs("walls",a-3.4,o+.5,1.6,4.8,r+3.5,c,Math.PI),i.box("walls",a-3.4,o-2.2,1.8,.7,r,c),i.box("walls",a-3.4,o-2.7,1.8,.3,c,c+1.05),i.box("walls",a-4.45,o-2.2,.3,.7,c,c+1.05),e.viewpoint=[a,c+1.6,o]}function CM(i,e){const{x:t,z:n}=Jt,s=Me(t,n);i.cyl("fieldStone",t+3,n+2,1.7,s-.3,s+.75,{seg:18});const r=new Ft(.85,.85,.42,18);r.rotateZ(Math.PI/2),r.translate(t+3.4,s+1.6,n+2),i.geom("fieldStone",r),i.box("darkWood",t+3,n+2,3.6,.2,s+1.55,s+1.75,.3,{solid:!1}),i.cyl("darkWood",t+3,n+2,.15,s+.75,s+2.2,{seg:6,solid:!1}),es(i,t-4,s+.2,n-3,1.6,.45,"fieldStone");const a=(x,b,E,S)=>{const T=Math.hypot(E-x,S-b),A=Math.ceil(T/4);for(let M=0;M<A;M++){const y=M/A,C=(M+1)/A,U=x+(E-x)*(y+C)/2,w=b+(S-b)*(y+C)/2,P=Me(U,w);if(ln(U,w)<2.5)continue;const L=Me(x+(E-x)*y,b+(S-b)*y),F=Me(x+(E-x)*C,b+(S-b)*C);i.box("fieldStone",U,w,T/A+.1,.7,Math.min(L,F,P)-.5,Math.max(L,F,P)+.8,Math.atan2(E-x,S-b)+Math.PI/2)}};a(t-16,n-14,t+16,n-14),a(t+16,n-14,t+16,n+14),a(t-16,n+14,t+16,n+14),a(t-16,n-14,t-16,n+14),e.groves.push({x:t,z:n,r:14,n:16,old:!0});const o=Zi(-34)-12,c=-34,l=Me(o,c);i.box("rock",o,c,6.5,6.5,l-1,l+6.5);for(const[x,b]of[[-3.3,-1.5],[-3.3,1.5],[3.3,-1.5],[3.3,1.5],[-1.5,-3.3],[1.5,-3.3],[-1.5,3.3],[1.5,3.3]])i.cyl("rock",o+x,c+b,.25,l,l+5.6,{seg:8,solid:!1});i.box("rock",o,c,6.9,6.9,l+5.6,l+6.6,0,{solid:!1}),i.box("rock",o,c,5,5,l+6.6,l+8.4),i.cyl("rock",o,c,2.2,l+8.4,l+9.4,{seg:16});const h=new qs(2,5.5,18),d=h.attributes.position;for(let x=0;x<d.count;x++){const b=d.getY(x),E=.75+.25*((b+2.75)/5.5);d.setX(x,d.getX(x)*(1-(1-E)*1.2)),d.setZ(x,d.getZ(x)*(1-(1-E)*1.2))}h.computeVertexNormals(),h.translate(o,l+12.15,c),i.geom("rock",h);for(let x=0;x<5;x++){const b=-70+x*13,E=Zi(b)-18,S=Me(E,b);Ya(i,E,b,Math.PI/2,9,5,S-1,[{x:0,y:-.6,rx:.7,ry:1,depth:1.6}],"cliff")}const u=22,f=117.8,p=Me(Zi(u),u)+.9,_=1.22;i.box("fieldStone",f,u,8.5,4.4,p,p+.55,_);for(const x of[-1,1]){const[b,E]=vt(f,u,_,x*3.8,0);i.box("fieldStone",b,E,1.2,4.6,p-2.5,p+.55,_,{solid:!1})}const g=Zi(56)-7,m=56,v=Me(g,m);i.box("fieldStone",g,m,3.2,1.2,v-.3,v+.75),e.pools.push([g,m,2.6,.7,v+.62])}function PM(i,e){const t=[];for(let d=0;d<26&&t.length<15;d++){const u=pt()*6.28,f=6+pt()*24,p=gn.x+Math.cos(u)*f,_=gn.z+Math.sin(u)*f;t.some(([g,m])=>Math.hypot(g-p,m-_)<9)||ln(p,_)<5||Math.hypot(p-Lr.x,_-Lr.z)<11||Math.hypot(p-nl.x,_-nl.z)<12||t.push([p,_])}for(const[d,u]of t){const f=pt()*.6-.3+(pt()<.5?0:Math.PI/2),p=5+pt()*2.5,_=4.5+pt()*2,[g,m]=[Math.min(...[[-1,-1],[1,1],[1,-1],[-1,1]].map(([E,S])=>Me(...vt(d,u,f,E*p/2,S*_/2)))),Math.max(...[[-1,-1],[1,1],[1,-1],[-1,1]].map(([E,S])=>Me(...vt(d,u,f,E*p/2,S*_/2))))],v=m+3.2;i.box("clay",d,u,p,_,g-1,v,f),i.box("roof",d,u,p+.4,_+.4,v,v+.3,f);let[x,b]=vt(d,u,f,0,_/2+.03);if(i.box("void",x,b,1.1,.08,Me(x,b)-.2,Me(x,b)+2,f,{solid:!1}),[x,b]=vt(d,u,f,p/2+.03,0),i.box(pt()<.4?"lit":"void",x,b,.08,.5,m+1.4,m+2.1,f,{solid:!1}),pt()<.7){for(const[M,y,C,U]of[[-p/2,_/2+2.5,.4,5],[p/2,_/2+2.5,.4,5],[-p/4-.6,_/2+5,p/2-1.2,.4]]){const[w,P]=vt(d,u,f,M,y),L=Me(w,P);i.box("clay",w,P,C,U,L-.5,L+1.4,f)}const[E,S]=vt(d,u,f,p/2-1,_/2+3),T=Me(E,S),A=new is(.75,10,6,0,Math.PI*2,0,Math.PI/2);A.translate(E,T,S),i.geom("clay",A),pt()<.5&&e.smoke.push([E,T+.8,S])}if(pt()<.45){const[E,S]=vt(d,u,f,-p/2-1.6,0),T=Me(E,S);for(const[A,M]of[[-1,-1],[1,-1],[-1,1],[1,1]]){const[y,C]=vt(E,S,f,A*1.2,M*1.6);i.box("darkWood",y,C,.15,.15,T,T+2.4,f,{solid:!1})}i.box("darkWood",E,S,2.6,3.4,T+2.35,T+2.5,f,{solid:!1}),e.vines.push([E,T+2.55,S,f])}}const n=96,s=150;Me(n,s);for(let d=0;d<22;d++){const u=d/22*Math.PI*2,f=(d+1)/22*Math.PI*2;if(d===5||d===6)continue;const p=n+Math.cos((u+f)/2)*8,_=s+Math.sin((u+f)/2)*8,g=Me(p,_);i.box("fieldStone",p,_,2.4,.7,g-.5,g+1.25,(u+f)/2+Math.PI/2)}i.box("fieldStone",n-10,s-4,3.4,3,Me(n-10,s-4)-.5,Me(n-10,s-4)+2.2),i.box("darkWood",n-10,s-4,4,3.6,Me(n-10,s-4)+2.2,Me(n-10,s-4)+2.45),e.pens.push({x:n,z:s,r:6.5});const r=128,a=128,o=Me(r,a);i.cyl("paving",r,a,6.5,o-.4,o+.15,{seg:26}),i.cyl("fieldStone",r,a,6.9,o-.4,o+.35,{seg:26,open:!0,solid:!1});for(let d=0;d<7;d++){const u=pt()*6.28,f=pt()*4;i.cyl("field",r+Math.cos(u)*f,a+Math.sin(u)*f,.45,o+.15,o+1.1,{r1:.3,seg:8,solid:!1})}const c=168,l=82,h=Me(c,l);i.cyl("fieldStone",c,l,2.6,h-1,h+5.5,{seg:16}),i.cyl("fieldStone",c,l,2.9,h+5.5,h+6.1,{seg:16,solid:!1}),i.box("void",c,l+2.62,.9,.1,h,h+1.8,0,{solid:!1}),e.vineyard={x:c,z:l,w:34,d:22};for(let d=18;d<66;d+=4.6){let u=null;for(let f=-110;f<=130;f+=3){let p=120,_=215;if(Me(p,f)>d||Me(_,f)<d){u=null;continue}for(let m=0;m<18;m++){const v=(p+_)/2;Me(v,f)<d?p=v:_=v}const g=(p+_)/2;if(u&&Math.hypot(u[0]-g,u[1]-f)<6&&ln(g,f)>3&&Math.abs(f-hn.z)+Math.abs(g-hn.x)>22&&Math.hypot(g-Jt.x,f-Jt.z)>18){const m=(u[0]+g)/2,v=(u[1]+f)/2,x=Math.hypot(u[0]-g,u[1]-f),b=Me(m,v),E=Me(u[0],u[1]),S=Me(g,f);Nt(g*.05,f*.05+d)>.36&&i.box("walls",m,v,x+.2,.5,Math.min(E,S,b)-.5,Math.max(E,S,b)+.4,Math.atan2(g-u[0],f-u[1])+Math.PI/2,{solid:!1})}u=[g,f]}}for(const[d,u]of[[-96,-104],[108,70],[30,176],[-200,6],[182,-22]]){const f=Me(d,u);i.cyl("fieldStone",d,u,.35,f-.2,f+1.4,{seg:8})}}function IM(i,e){const{x:t,z:n,rot:s}=Lr,r=5.4,a=4.4,o=.35,c=2.8,l=(v,x)=>vt(t,n,s,v,x);let h=1/0,d=-1/0;for(let v=-1;v<=1;v+=.5)for(let x=-1;x<=1;x+=.5){const b=Me(...l(v*r/2,x*a/2));h=Math.min(h,b),d=Math.max(d,b)}const u=d+.06,f=u+c,p=(v,x,b,E,S=h-1.2,T=f)=>{const[A,M]=l(v,x);i.box("clay",A,M,b,E,S,T,s)};p(0,-a/2-o/2,r+2*o,o),p(-r/2-o/2,0,o,a),p(r/2+o/2,0,o,a),p(-r/4-.35,a/2+o/2,r/2+.3,o),p(r/2-.65,a/2+o/2,1.3,o),p(.6,a/2+o/2,1.75,o,u+2.15,f);{const[v,x]=l(0,0);i.box("clay",v,x,r,a,h-1.2,u,s),i.box("roof",v,x,r+2*o+.3,a+2*o+.3,f,f+.3,s),i.box("darkWood",v,x,r,a,f-.18,f,s,{solid:!1})}for(let v=-2;v<=2;v++){const[x,b]=l(v*1.1,0);i.box("darkWood",x,b,.16,a+.6,f-.36,f-.18,s,{solid:!1})}{const[v,x]=l(.6,a/2+o+.05);i.box("darkWood",v,x,1.6,.2,u+2.15,u+2.35,s,{solid:!1})}{const[v,x]=l(-r/2-o-.01,-.6);i.box("void",v,x,.05,.6,u+1.6,u+2.1,s,{solid:!1})}const _=-.6,g=-a/2+.5;{const[v,x]=l(_,g);i.box("darkWood",v,x,2,.95,u,u+.38,s),i.box("linen",v,x,1.95,.9,u+.38,u+.47,s,{solid:!1});const[b,E]=l(_-.45,g);i.box("awning",b,E,1,.95,u+.47,u+.52,s,{solid:!1,uv:[.5,0,.25,1]})}{const[v,x]=l(r/2-.5,-a/2+.5);i.box("darkWood",v,x,.7,.6,u,u+.6,s),i.cyl("clay",v,x,.09,u+.6,u+.68,{r1:.06,seg:8,solid:!1}),e.flames.push([v,u+.74,x,.12]),e.lights.push([v,u+1,x,16756838,9,.5])}{const[v,x]=l(r/2-.45,.9);i.cyl("clay",v,x,.24,u,u+.7,{r1:.14,seg:10})}{const[v,x]=l(.6,.6);i.box("awning",v,x,1.4,.9,u,u+.02,s,{solid:!1,uv:[.75,0,.25,1]})}const m=s;e.intro={sit:[...l(_+.2,g+.62),u],yaw:m,door:l(.6,a/2-.2),out:l(.6,a/2+3.2),out2:l(.6,a/2+6.5),camIn:[...l(r/2-.4,a/2-.4),u+1.7],floor:u,houseW:l(0,0),nard:l(-r/2+.55,1.3)}}function LM(i,e){const{x:t,z:n}=nl,s=Me(t-3,n),r=s+4.2;i.box("cliff",t,n,6,7,s-2,r),i.box("void",t-3.02,n,.06,1.1,s,s+1.5,0,{solid:!1}),i.box("cliff",t-3.2,n,.5,2.4,s+1.5,s+1.9,0,{solid:!1});const a=new Ft(.85,.85,.35,18);a.rotateX(Math.PI/2),a.rotateY(Math.PI/2);const o=a.attributes.uv;for(let c=0;c<o.count;c++)o.setXY(c,o.getX(c),o.getY(c));a.translate(t-3.3,s+.85,n+1.9),i.geom("cliff",a),i.solids.add({x:t-3.3,z:n+1.9,hx:.2,hz:.85,rot:0,y0:s,y1:s+1.7});for(let c=0;c<7;c++)es(i,t-1+(pt()-.5)*5,r-.3,n+(pt()-.5)*6,1.1+pt(),.6);e.lazarus={x:t-5.2,z:n-1.4,face:[t-3,n],g:s}}function DM(i,e){LM(i,e),IM(i,e),TM(i,e),AM(i,e),RM(i,e),CM(i,e),PM(i,e)}const kl={value:0},UM=kl;function NM(i,{tint:e,wind:t=0,fill:n=.18,alpha:s}){const r=i.clone();r.side=Et,s!==void 0&&(r.alphaTest=s),r.map&&n&&(r.emissiveMap=r.map,r.emissive=new Ie(n,n,n));const a=e?new Ie(e):null;return r.onBeforeCompile=o=>{if(o.uniforms.uTime=kl,a&&(o.uniforms.uTint={value:a}),o.vertexShader=`uniform float uTime;
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
#endif`)}},r.customProgramCacheKey=()=>`v_${e}_${t}`,r}const Sa=new Ie;function FM({blades:i=7,h:e=.8,w:t=.07,spread:n=.22,base:s,tip:r,ear:a,bloom:o,center:c,seed:l=1}){let h=l*9301+49297;const d=()=>(h=h*16807%2147483647)/2147483647,u=[],f=[],p=(m,v,x,b)=>{u.push(m,v,x),Sa.set(b),f.push(Sa.r,Sa.g,Sa.b)};for(let m=0;m<i;m++){const v=d()*6.283,x=Math.sqrt(d())*n,b=Math.cos(v)*x,E=Math.sin(v)*x,S=e*(.6+d()*.5),T=.15+d()*.3,A=d()*6.283,M=b+Math.cos(A)*S*T,y=E+Math.sin(A)*S*T,C=v+1.57,U=Math.cos(C)*t/2,w=Math.sin(C)*t/2;if(p(b-U,0,E-w,s),p(b+U,0,E+w,s),p(M,S,y,r),a){const P=S*.82,L=b+(M-b)*.82,F=E+(y-E)*.82,W=.035;p(L-U*.9,P,F-w*.9,a),p(L+U*.9,P,F+w*.9,a),p(M,S+.14,y,a),p(L+U*.9,P,F+w*.9,a),p(L-U*.9,P,F-w*.9,a),p(L,P-W*3,F,a)}if(o&&m%2===0){const P=.07+d()*.03;for(let L=0;L<5;L++){const F=L/5*6.283,W=(L+1)/5*6.283;p(M,S+.01,y,c),p(M+Math.cos(F)*P,S+.03,y+Math.sin(F)*P,o),p(M+Math.cos(W)*P,S+.03,y+Math.sin(W)*P,o)}}}const _=new mt;_.setAttribute("position",new qe(u,3)),_.setAttribute("color",new qe(f,3));const g=new Float32Array(u.length);for(let m=0;m<g.length;m+=3)g[m+1]=1;return _.setAttribute("normal",new Mt(g,3)),_}function OM(i,e){const t=new it({vertexColors:!0,side:Et,roughness:.92,name:e});return t.onBeforeCompile=n=>{n.uniforms.uTime=kl,n.vertexShader=`uniform float uTime;
`+n.vertexShader.replace("#include <begin_vertex>",`
      #include <begin_vertex>
      vec2 wp = vec2(instanceMatrix[3].x, instanceMatrix[3].z);
      float sway = max(position.y, 0.) * ${i.toFixed(3)};
      float ph = uTime * 1.7 + wp.x * .29 + wp.y * .21;
      transformed.x += (sin(ph) + .4 * sin(uTime * 3.7 + wp.y)) * sway; transformed.z += cos(ph * .8) * sway * .7;`)},t.customProgramCacheKey=()=>"wind"+i,t}function zM(i,e,t,n,{lowQuality:s}){const r={};for(const w of e.scenes){w.updateMatrixWorld(!0);for(const P of w.children){const L=[];P.traverse(F=>{F.isMesh&&L.push({geometry:F.geometry,material:F.material,matrix:F.matrixWorld.clone()})}),r[P.name]=L}}{const w=[];for(let W=0;W<=12;W++){const O=W/12;w.push(new fe(Math.max(.02,Math.sin(Math.PI*Math.pow(O,.75))*1.05*(1-O*.35)),1.2+O*8.8))}const P=new no(w,9),L=P.attributes.position;for(let W=0;W<L.count;W++){const O=L.getX(W),j=L.getY(W),X=L.getZ(W),se=1+Math.sin(j*3.1+Math.atan2(X,O)*3)*.13+Math.sin(j*7.3)*.06;L.setX(W,O*se),L.setZ(W,X*se)}P.computeVertexNormals();const F=new Ft(.12,.18,1.6,6).translate(0,.8,0);r.Cypress=[{geometry:P,material:new it({name:"CypressFoliage",color:2901543,roughness:.9,flatShading:!0,emissive:726024}),matrix:new He},{geometry:F,material:new it({name:"CypressBark",color:5126698,roughness:1}),matrix:new He}]}const a=(w,P,L)=>{r[w]=[{geometry:FM(P),material:OM(L,w),matrix:new He}]};a("GrassClump",{blades:7,h:.75,base:5204514,tip:12173914,seed:1},.16),a("DryClump",{blades:6,h:.7,w:.05,base:8221760,tip:14733190,seed:2},.18),a("WheatClump",{blades:9,h:1,w:.04,spread:.18,base:10259002,tip:14269788,ear:15518570,seed:3},.2),a("PoppyClump",{blades:6,h:.42,w:.03,spread:.18,base:5204514,tip:7309874,bloom:14168607,center:1708040,seed:4},.16),a("AnemoneClump",{blades:6,h:.36,w:.03,spread:.18,base:5204514,tip:7309874,bloom:10640592,center:2758720,seed:5},.16),a("MustardClump",{blades:8,h:.55,w:.03,spread:.2,base:5795882,tip:8230452,bloom:15914042,center:13081114,seed:6},.16);const o=w=>/leav|leaf|grass|plant|fern|clover|petal|flower|bush/i.test(w.name||""),c=new Map,l=(w,P)=>{const L=w.uuid+JSON.stringify(P);return w.vertexColors?w:(c.has(L)||c.set(L,o(w)?NM(w,P):(()=>{const F=w.clone();return P.bark&&(F.color=new Ie(P.bark)),P.plain&&(F.map=null,F.flatShading=!0,F.roughness=.95),F})()),c.get(L))},h={olive:{models:["CommonTree_5","CommonTree_3"],leaf:{tint:10726804,wind:.02,fill:.2},bark:10127992,shadow:!0},oldOlive:{models:["CommonTree_2"],leaf:{tint:10134924,wind:.018,fill:.16},bark:9075304,shadow:!0},cypress:{models:["Cypress"],shadow:!0},almond:{models:["CommonTree_5"],leaf:{tint:15976404,wind:.02,fill:.3},bark:8018504,shadow:!0},bush:{models:["Bush_Common_Flowers"],leaf:{tint:7307077,wind:.03},shadow:!0},vine:{models:["Plant_7"],leaf:{tint:6261294,wind:.05},shadow:!1},grass:{models:["GrassClump"],shadow:!1},dryGrass:{models:["DryClump"],shadow:!1},wheat:{models:["WheatClump"],shadow:!1},poppy:{models:["PoppyClump"],shadow:!1},anemone:{models:["AnemoneClump"],shadow:!1},mustard:{models:["MustardClump"],shadow:!1},rock:{models:["Rock_Medium_1","Rock_Medium_2","Rock_Medium_3"],bark:13483942,plain:!0,shadow:!0},pebble:{models:["Pebble_Round_1","Pebble_Round_2","Pebble_Round_3"],bark:13220252,plain:!0,shadow:!1}},d=300,u=new Map;let f=2024;const p=()=>(f=f*16807%2147483647)/2147483647,_=new $t,g=new rn,m=new N,v=new N,x=n.reserved||[],b=(w,P,L)=>Math.hypot(w-Lr.x,P-Lr.z)>5.5&&!x.some(([F,W,O])=>Math.hypot(w-F,P-W)<O+1.5)&&!t.blocked(w,L+.6,P)&&!t.blocked(w+1.2,L+.6,P)&&!t.blocked(w-1.2,L+.6,P);function E(w,P,L,F,{sy:W=1,tilt:O=.05,y:j}={}){const X=h[w],se=X.models[Math.floor(p()*X.models.length)],pe=j??Me(P,L),de=new He().compose(m.set(P,pe-.05,L),_.setFromEuler(g.set((p()-.5)*O,p()*6.283,(p()-.5)*O)),v.set(F,F*W,F)),Q=`${w}|${se}|${Math.floor(P/d)},${Math.floor(L/d)}`;(u.get(Q)??u.set(Q,[]).get(Q)).push(de)}function S(w,P,L,F,W,O){let j=0,X=0;for(;j<P&&X++<P*30;){const se=L.x0+p()*(L.x1-L.x0),pe=L.z0+p()*(L.z1-L.z0),de=Me(se,pe);F(se,pe,de)&&(E(w,se,pe,W[0]+p()*(W[1]-W[0]),O),j++)}}const T=(w,P)=>!ja(w,P)&&ln(w,P)>2.5,A=(w,P)=>Math.hypot(w-hn.x,P-hn.z)>16&&Math.hypot(w-Ht.x,P-Ht.z)>13&&!(Math.abs(w-Vt.x)<13&&P>Vt.z-12&&P<Vt.z+12),M={x0:-280,x1:320,z0:-300,z1:300},y=s?.6:1;S("olive",150*y,{x0:122,x1:260,z0:-120,z1:140},(w,P,L)=>T(w,P)&&A(w,P)&&L>6&&Nt(w*.03,P*.03)>.38&&b(w,P,L)&&Math.hypot(w-gn.x,P-gn.z)>34,[.62,.9],{sy:.72}),S("olive",70*y,M,(w,P,L)=>T(w,P)&&A(w,P)&&Nt(w*.02+5,P*.02)>.55&&b(w,P,L)&&L>-2,[.6,.85],{sy:.7});for(const w of n.groves)S("oldOlive",w.n,{x0:w.x-w.r,x1:w.x+w.r,z0:w.z-w.r,z1:w.z+w.r},(P,L,F)=>ln(P,L)>2.5&&Math.hypot(P-w.x-3,L-w.z-2)>3.5&&b(P,L,F),[.85,1.05],{sy:.62});for(const w of n.gardens)S("olive",6,{x0:w.x-w.r,x1:w.x+w.r,z0:w.z-w.r*.6,z1:w.z+w.r*.6},(P,L,F)=>b(P,L,F)&&Math.abs(P-Vt.x)>3,[.55,.7],{sy:.72}),S("cypress",4,{x0:w.x-w.r,x1:w.x+w.r,z0:w.z-2,z1:w.z+w.r*.6},(P,L,F)=>b(P,L,F),[.9,1.1],{sy:1}),S("poppy",40,{x0:w.x-w.r,x1:w.x+w.r,z0:w.z-w.r*.5,z1:w.z+w.r*.6},(P,L,F)=>b(P,L,F),[1,1.4]),S("anemone",30,{x0:w.x-w.r,x1:w.x+w.r,z0:w.z-w.r*.5,z1:w.z+w.r*.6},(P,L,F)=>b(P,L,F),[1,1.4]);if(n.palaceGarden){const w=n.palaceGarden;S("cypress",10,w,(P,L,F)=>!t.blocked(P,F+3,L),[.8,1],{sy:1,tilt:.02})}S("cypress",40*y,M,(w,P,L)=>T(w,P)&&ln(w,P)<9&&A(w,P)&&b(w,P,L),[.8,1.15],{sy:1,tilt:.02}),S("almond",34,{x0:112,x1:146,z0:110,z1:146},(w,P,L)=>T(w,P)&&b(w,P,L)&&Math.hypot(w-128,P-128)>9,[.48,.62],{sy:.8}),S("almond",20*y,M,(w,P,L)=>T(w,P)&&A(w,P)&&b(w,P,L)&&Nt(w*.05,P*.05)>.62,[.45,.6],{sy:.8}),S("bush",120*y,M,(w,P,L)=>T(w,P)&&A(w,P)&&b(w,P,L),[.7,1.4]),S("rock",160*y,M,(w,P,L)=>T(w,P)&&b(w,P,L)&&(Nt(w*.04,P*.04)>.5||L>40),[.5,1.6]),S("rock",26,{x0:Ht.x-22,x1:Ht.x+22,z0:Ht.z-22,z1:Ht.z+22},(w,P,L)=>A(w,P)&&b(w,P,L),[.6,1.8]),S("pebble",260*y,M,(w,P,L)=>!ja(w,P)&&b(w,P,L),[.8,2.2]);for(const[w,P,L,F,W,O]of[[178,142,24,16,.15,3600],[60,160,20,10,-.1,1800]]){const j=Math.cos(W),X=Math.sin(W);for(let se=0;se<O*y;se++){const pe=(p()-.5)*2*L,de=(p()-.5)*2*F,Q=w+j*pe+X*de,te=P-X*pe+j*de;ln(Q,te)<2||E("wheat",Q,te,.85+p()*.3,{sy:1.1,tilt:.15})}}if(S("grass",s?6e3:11e3,M,(w,P,L)=>T(w,P)&&b(w,P,L)&&Nt(w*.05+2,P*.05)>.4&&Math.hypot(w-20,P)<300,[.9,1.5],{tilt:.15}),S("dryGrass",s?2e3:3800,M,(w,P,L)=>T(w,P)&&b(w,P,L)&&Nt(w*.04+8,P*.04)>.5,[.8,1.3],{tilt:.2}),S("poppy",1100*y,M,(w,P,L)=>T(w,P)&&b(w,P,L)&&Nt(w*.06+20,P*.06)>.52,[.9,1.4],{tilt:.2}),S("anemone",600*y,M,(w,P,L)=>T(w,P)&&b(w,P,L)&&Nt(w*.06-20,P*.06)>.55,[.9,1.3],{tilt:.2}),S("mustard",600*y,M,(w,P,L)=>T(w,P)&&b(w,P,L)&&Nt(w*.05+50,P*.05)>.56,[.9,1.3],{tilt:.2}),n.vineyard){const w=n.vineyard;for(let P=-w.w/2;P<w.w/2;P+=2.6)for(let L=-w.d/2;L<w.d/2;L+=1.4){const F=w.x+P,W=w.z+L+6;Math.hypot(F-w.x,W-w.z)<4||ln(F,W)<2||E("vine",F,W,.45+p()*.15,{tilt:.1})}}for(const[w,P,L]of n.vines)for(let F=0;F<4;F++)E("vine",w+(p()-.5)*2,L+(p()-.5)*2.6,.5,{y:P});const C=new He;let U=0;for(const[w,P]of u){const[L,F]=w.split("|"),W=h[L];for(const O of r[F]||[]){const j=new Ha(O.geometry,l(O.material,W.leaf&&o(O.material)?W.leaf:{bark:W.bark,plain:W.plain}),P.length);P.forEach((X,se)=>j.setMatrixAt(se,C.multiplyMatrices(X,O.matrix))),j.instanceMatrix.needsUpdate=!0,j.computeBoundingSphere(),j.castShadow=W.shadow,j.receiveShadow=!0,i.add(j),U++}}return{drawn:U,count:[...u.values()].reduce((w,P)=>w+P.length,0)}}function Hl(i){const e=new Map,t=new Map,n=i.clone();return ff(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;const r=s,a=e.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function ff(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)ff(i.children[n],e.children[n],t)}let Ou=777;const Ut=()=>(Ou=Ou*16807%2147483647)/2147483647;function BM(i,{sheepGltf:e,donkeyGltf:t},n,s){const r=[],a=e.scene,o=new Pn().setFromObject(a),c=o.getSize(new N),l=1.15/Math.max(c.x,c.z);a.traverse(M=>{M.isMesh&&(M.castShadow=!0,M.receiveShadow=!0,M.material=M.material.clone(),M.material.roughness=.95,M.material.color.r>.3&&M.material.color.setRGB(.93,.9,.84))});const h=[...n.pens.map(M=>({...M,n:12})),{x:70,z:200,r:14,n:14},{x:-120,z:-175,r:12,n:9}],d=[];a.updateMatrixWorld(!0),a.traverse(M=>{M.isMesh&&d.push(M)});const u=[];for(const M of h)for(let y=0;y<M.n;y++){const C=Ut()*6.28,U=Math.sqrt(Ut())*M.r,w=M.x+Math.cos(C)*U,P=M.z+Math.sin(C)*U,L=l*(.85+Ut()*.3);u.push({x:w,z:P,s:L,y:Me(w,P)-o.min.y*L,rot:Ut()*6.28,ph:Ut()*10})}const f=d.map(M=>{const y=new Ha(M.geometry,M.material,u.length);return y.castShadow=!0,y.receiveShadow=!0,y.frustumCulled=!1,i.add(y),{im:y,local:M.matrixWorld.clone()}}),p=new He,_=new $t,g=new rn,m=new N,v=new N,x=new He;let b=0;r.push(M=>{if(!(b++%2)){u.forEach((y,C)=>{const U=Math.max(0,Math.sin(M*.5+y.ph));p.compose(m.set(y.x,y.y-U*.04,y.z),_.setFromEuler(g.set(U*.12,y.rot+Math.sin(M*.07+y.ph)*.4,0)),v.set(y.s,y.s,y.s));for(const{im:w,local:P}of f)w.setMatrixAt(C,x.multiplyMatrices(p,P))});for(const{im:y}of f)y.instanceMatrix.needsUpdate=!0}});const E=Object.fromEntries(t.animations.map(M=>[M.name,M])),S=new Pn().setFromObject(t.scene),T=1.35/S.getSize(new N).y,A=()=>{const M=Hl(t.scene);return M.scale.setScalar(T),M.traverse(y=>{y.isMesh&&(y.castShadow=!0,y.frustumCulled=!1)}),i.add(M),M};for(const[M,y,C]of[[gn.x+4,gn.z+13,"Eating"],[gn.x+13,gn.z-9,"Idle_Headlow"],[-86,-96,"Idle"]]){const U=A();U.position.set(M,Me(M,y),y),U.rotation.y=Ut()*6.28;const w=new Wa(U);w.clipAction(E[C]||t.animations[0]).play(),w.update(Ut()*3),r.push((P,L)=>w.update(L))}{const M=of[3].pts,y=A(),C=new Wa(y);C.clipAction(E.Walk).play();const U=[];let w=0;for(let F=0;F<M.length-1;F++){const W=Math.hypot(M[F+1][0]-M[F][0],M[F+1][1]-M[F][1]);U.push(W),w+=W}let P=30,L=1;r.push((F,W)=>{C.update(W),P+=L*W*1.1,P>w-2?(P=w-2,L=-1):P<2&&(P=2,L=1);let O=P,j=0;for(;j<U.length-1&&O>U[j];)O-=U[j],j++;const[X,se]=M[j],[pe,de]=M[j+1],Q=O/U[j],te=X+(pe-X)*Q+1.2,Ee=se+(de-se)*Q;y.position.set(te,Me(te,Ee),Ee),y.rotation.y=Math.atan2((pe-X)*L,(de-se)*L)})}{const y=new mt;y.setAttribute("position",new qe([0,0,.18,-.45,.05,-.05,0,0,-.12,0,0,.18,.45,.05,-.05,0,0,-.12],3)),y.computeVertexNormals();const C=new Ha(y,new it({color:15921128,side:Et,roughness:.8}),26);C.frustumCulled=!1,i.add(C);const U=Array.from({length:26},()=>({r:25+Ut()*35,h:ui.y+30+Ut()*25,sp:.15+Ut()*.12,ph:Ut()*6.28,f:6+Ut()*4})),w=new He,P=new $t,L=new rn,F=new N,W=new N;r.push(O=>{U.forEach((j,X)=>{const se=O*j.sp+j.ph,pe=30+Math.cos(se)*j.r,de=-8+Math.sin(se)*j.r*.8,Q=j.h+Math.sin(O*.7+j.ph)*3,te=Math.sin(O*j.f+j.ph);w.compose(F.set(pe,Q,de),P.setFromEuler(L.set(0,-se,te*.05)),W.set(1.6,1+te*2.2,1.6)),C.setMatrixAt(X,w)}),C.instanceMatrix.needsUpdate=!0})}return(M,y)=>r.forEach(C=>C(M,y))}function zu(i){const e=document.createElement("canvas");e.width=e.height=64;const t=e.getContext("2d"),n=t.createRadialGradient(32,32,0,32,32,32);return i.forEach(([s,r])=>n.addColorStop(s,r)),t.fillStyle=n,t.fillRect(0,0,64,64),new ns(e)}function kM(i,e,t){const n=[];if(e.flames.length){const a=e.flames.length*7,o=new Float32Array(a*3),c=new Float32Array(a),l=new Float32Array(a);e.flames.forEach(([f,p,_,g],m)=>{for(let v=0;v<7;v++){const x=m*7+v;o.set([f+(Ut()-.5)*g*.5,p,_+(Ut()-.5)*g*.5],x*3),c[x]=Ut()*10,l[x]=g*(2.4+Ut()*1.6)}});const h=new mt;h.setAttribute("position",new Mt(o,3)),h.setAttribute("aSeed",new Mt(c,1)),h.setAttribute("aSize",new Mt(l,1));const d=new Dt({uniforms:{uTime:{value:0},uTex:{value:zu([[0,"#fff6d0"],[.25,"#ffc050"],[.6,"rgba(255,90,20,.55)"],[1,"rgba(255,40,0,0)"]])}},vertexShader:`attribute float aSeed; attribute float aSize; uniform float uTime; varying float vA;
        void main(){ float t = fract(uTime * (.9 + fract(aSeed) * .6) + aSeed);
          vec3 p = position + vec3(sin(aSeed*7. + uTime*3.)*.08, t * aSize * .35, cos(aSeed*5. + uTime*2.)*.08);
          vA = (1. - t) * smoothstep(0., .15, t);
          vec4 mv = modelViewMatrix * vec4(p, 1.); gl_PointSize = aSize * (1. - t * .6) * 220. / -mv.z; gl_Position = projectionMatrix * mv; }`,fragmentShader:"uniform sampler2D uTex; varying float vA; void main(){ vec4 c = texture2D(uTex, gl_PointCoord); gl_FragColor = vec4(c.rgb * 2.2, c.a * vA); }",transparent:!0,depthWrite:!1,blending:Fa}),u=new Jc(h,d);u.frustumCulled=!1,i.add(u),n.push(f=>{d.uniforms.uTime.value=f})}if(e.smoke.length){const a=e.smoke.length*10,o=new Float32Array(a*3),c=new Float32Array(a);e.smoke.forEach(([u,f,p],_)=>{for(let g=0;g<10;g++){const m=_*10+g;o.set([u,f,p],m*3),c[m]=g/10+Ut()*.05}});const l=new mt;l.setAttribute("position",new Mt(o,3)),l.setAttribute("aSeed",new Mt(c,1));const h=new Dt({uniforms:{uTime:{value:0},uTex:{value:zu([[0,"rgba(235,225,215,.55)"],[.6,"rgba(210,200,195,.22)"],[1,"rgba(200,190,190,0)"]])}},vertexShader:`attribute float aSeed; uniform float uTime; varying float vA;
        void main(){ float t = fract(uTime * .07 + aSeed);
          vec3 p = position + vec3(t * 5. + sin(t * 6. + aSeed * 20.) * .6, t * 16., t * 2.);
          vA = (1. - t) * smoothstep(0., .1, t);
          vec4 mv = modelViewMatrix * vec4(p, 1.); gl_PointSize = (2. + t * 9.) * 260. / -mv.z; gl_Position = projectionMatrix * mv; }`,fragmentShader:"uniform sampler2D uTex; varying float vA; void main(){ vec4 c = texture2D(uTex, gl_PointCoord); gl_FragColor = vec4(c.rgb, c.a * vA * .8); }",transparent:!0,depthWrite:!1,fog:!1}),d=new Jc(l,h);d.frustumCulled=!1,i.add(d),n.push(u=>{h.uniforms.uTime.value=u})}const s=Bl(2);for(const[r,a,o,c,l]of e.pools){const h=t.water.clone();h.normalMap=s,h.normalScale=new fe(.3,.3);const d=new Ge(new In(o,c).rotateX(-Math.PI/2),h);d.position.set(r,l,a),d.receiveShadow=!0,i.add(d)}n.push(r=>{s.offset.set(r*.02,r*.013)});for(const[r,a,o,c,l,h=1]of e.lights){const d=new Yd(c,40*h,l,1.6);d.position.set(r,a,o),i.add(d);const u=d.intensity;n.push(f=>{d.intensity=u*(.85+Math.sin(f*9+r)*.08+Math.sin(f*23+o)*.07)})}return r=>n.forEach(a=>a(r))}function pf(i){const e=i.intro,t=i.golgotha,n=i.tomb,s=i.lazarus,r=i.bench,a=e.out[0]-e.door[0],o=e.out[1]-e.door[1],c=Math.hypot(a,o),l=a/c,h=o/c,d=-h,u=l,f=(p,_)=>[e.out[0]+l*p+d*_,e.out[1]+h*p+u*_];return[{id:"cleopas",name:"Cléopas",proper:!0,kind:"male",hub:!0,at:f(1.6,-1.8),face:e.out,colors:{tunic:14735040,mantle:7307162},jaffa:[-140,6],jaffaFace:[-120,4],lines:[]},{id:"casa",name:"Marta",proper:!0,kind:"female",at:f(4.2,-4.6),face:f(1,-2),colors:{tunic:14207142,veil:9084088,mantle:11575440},lines:["Você gemia no sono... a sexta-feira de novo, não é? Ninguém nesta casa dorme direito desde que o desceram da cruz.",'Quando nosso irmão morreu, eu disse a ele: "Senhor, se estivesses aqui, Lázaro não teria morrido." E ele me respondeu: "Eu sou a ressurreição e a vida."',"Eu acreditei. Acredito. Mas agora quem está no túmulo é ele... ou estava. As mulheres voltaram do jardim dizendo que não está mais.","Maria quase não fala. Lázaro passa o dia lá no túmulo dele, na saída da aldeia. Fale com eles."]},{id:"maria",name:"Maria de Betânia",proper:!0,kind:"female",sit:!0,bench:!0,at:f(1.2,2.6),face:f(4,2.6),colors:{tunic:13615272,veil:6969994,mantle:9075354},lines:["Seis dias antes da Páscoa, eu quebrei o vaso de nardo e derramei nos pés dele. Judas reclamou do desperdício.","Ele me defendeu. Disse que eu tinha guardado o perfume para o dia do seu sepultamento. Eu não entendi.","Agora entendo. E ainda assim... ele também disse que era a ressurreição e a vida. Disse isso aqui, diante do túmulo do meu irmão."]},{id:"lazaro",name:"Lázaro",proper:!0,kind:"male",at:[s.x,s.z],face:s.face,y:void 0,colors:{tunic:15525072,mantle:9076848},lines:["Venho aqui todo dia. É estranho olhar para o próprio túmulo.","Eu sei como é lá dentro. O escuro. O cheiro. As faixas apertando os braços, o lenço no rosto.","Quando ouvi a voz dele chamando meu nome, eu saí amarrado. Tiveram que me desatar.","Se dizem que o túmulo dele está vazio, repare nas faixas. Um morto não se desamarra sozinho."]},{id:"pastor",name:"Pastor",kind:"male",at:[88,146],face:[96,150],colors:{tunic:12562060,mantle:10129280},lines:["Conto as ovelhas toda manhã. Hoje estão todas aqui.",'Ele dizia: "Ferirei o pastor, e as ovelhas se dispersarão." E foi assim. Os amigos dele sumiram como ovelhas no escuro.',"Mas pastor bom não abandona o rebanho. É o que eu acho."]},{id:"horto",name:"Homem do horto",kind:"male",at:[Jt.x-3,Jt.z+7],face:[Jt.x-4,Jt.z-3],colors:{tunic:11049080,mantle:8030832},lines:["Foi aqui, na quinta à noite. Eu dormia ali, perto da prensa.","Ele orava sozinho, junto daquela pedra. Três vezes voltou e encontrou os amigos dormindo.","Vieram com tochas, espadas e paus. Um dos doze ia na frente... e o cumprimentou com um beijo. Todos fugiram.","Levaram-no amarrado, descendo o Cedrom, para a cidade. Para a casa do sumo sacerdote."]},{id:"cambista",name:"Cambista",kind:"male",at:[38,31],face:[31,30],y:ui.y,colors:{tunic:12887146,mantle:5925434,sash:9056288},lines:["Não pise nas moedas! ...Ah, pode pisar. Desde segunda ninguém arrumou nada.",'Ele entrou aqui com um chicote de cordas. Virou as mesas, soltou as pombas. "A casa de meu Pai é casa de oração, e vocês fizeram dela um covil de ladrões!"','Os meninos gritavam "Hosana ao Filho de Davi!" E os chefes dos sacerdotes, com o rosto vermelho, já decidiam como acabar com ele.',"Pergunte ao sacerdote ali no pórtico o que aconteceu dentro do santuário na sexta. Ele não gosta de falar."]},{id:"sacerdote",name:"Sacerdote",kind:"priest",at:[66,-42],face:[30,-7],y:ui.y,lines:["Paz, peregrino. A festa acabou e você ainda está aqui?","Sexta, na hora do sacrifício da tarde, a terra tremeu. O véu do santuário se rasgou de alto a baixo. De alto a baixo, entende? Mão de homem rasga de baixo.","Antes disso, um dos seguidores dele veio devolver trinta moedas de prata. Jogou-as no santuário e saiu correndo. Era preço de sangue; não podiam voltar ao tesouro.","Ele foi julgado no Sinédrio de noite e levado ao pretório de manhã, ali, na fortaleza junto ao Templo. Pergunte lá."]},{id:"pretorio",name:"Mulher no pretório",kind:"female",at:[-35,-61],face:[-30,-65],colors:{tunic:12560778,veil:6969978,mantle:9075306},lines:["Eu estava aqui quando o trouxeram ao pretório. Açoitaram até não sobrar pele nas costas.",'Os soldados trançaram uma coroa de espinhos e o vestiram de púrpura. Ajoelhavam e cuspiam: "Salve, rei dos judeus!"','Pilatos lavou as mãos. O povo gritou "Barrabás!". E ele saiu por aquela rua, para a porta do norte, com a trave nas costas. Caiu no caminho.']},{id:"simao",name:"Simão de Cirene",proper:!0,kind:"male",at:[-95,-100],face:[-84,-128],colors:{tunic:10127978,mantle:5917242},lines:["Eu só vinha do campo. Os soldados me agarraram ali na porta e jogaram a trave nas minhas costas.","Ele não aguentava mais. Eu carreguei a cruz dele até lá em cima, no lugar que chamam de Caveira.","Ainda tenho farpas nas mãos. E não consigo esquecer como ele me olhou."]},{id:"soldado",name:"Soldado romano",kind:"soldier",at:[t.cross[0]+4.5,t.cross[2]+3],face:[t.cross[0],t.cross[2]],lines:["Circule, galileu. Não há mais nada para ver aqui.","...Três crucificados na sexta. O do meio morreu depressa. Não amaldiçoou ninguém. Pediu perdão por nós.",'Ao meio-dia o sol escureceu por três horas. O centurião bateu no peito: "Este era mesmo o Filho de Deus." Desde então, não fala com ninguém.',"O corpo? Um tal de José, homem do conselho, foi pedir a Pilatos. Levaram para um jardim aqui embaixo, perto da estrada."]},{id:"jose",name:"José de Arimateia",proper:!0,kind:"male",at:[n.X+10,n.FZ+13],face:[n.X,n.FZ],colors:{tunic:15788248,mantle:3820138,sash:11569728},lines:["Era o meu túmulo. Mandei talhar na rocha para mim. Nunca ninguém tinha sido posto ali.","Nicodemos trouxe quase cem libras de mirra e aloés. Envolvemos o corpo em linho, às pressas, antes do pôr do sol do sábado.","Selaram a pedra e puseram guardas. Agora o túmulo está aberto, e os chefes querem saber quem eu deixei entrar. Ninguém."]},{id:"guarda",name:"Guarda do sepulcro",kind:"soldier",at:[n.X+7.5,n.FZ+9],face:[n.X,n.FZ],lines:["Eu não vi nada! A gente estava dormindo. É isso. Dormindo.","Se alguém perguntar: os discípulos dele vieram de noite e levaram o corpo. Foi o que nos mandaram dizer... quer dizer, foi o que aconteceu.","A terra tremeu. Uma luz... Não. Não vou falar disso."]},{id:"mulher",name:"Mulher no jardim",kind:"female",at:[n.X-6,n.FZ+8],face:[n.X,n.FZ],colors:{tunic:13351316,veil:14866628,mantle:10125162},lines:["Viemos ao amanhecer com os perfumes, para o corpo. No caminho a gente se perguntava: quem vai rolar a pedra?","A pedra já estava rolada. O túmulo, vazio.",'Dois homens com roupas que brilhavam como relâmpago nos disseram: "Por que vocês procuram entre os mortos aquele que vive?"',"Contamos aos onze. Acharam que era delírio de mulher. Entre ali. Veja você mesmo."]},{id:"pedro",name:"Simão Pedro",proper:!0,kind:"male",sit:!0,at:[r[0],r[2]+.46],face:[r[0],r[2]+6],y:r[1],colors:{tunic:14208176,mantle:4872778},lines:["...Você também veio. Eu corri até aqui com João. Ele chegou primeiro, mas parou na entrada. Eu entrei.","Os lençóis estavam lá, deitados. E o lenço da cabeça não estava com eles. Estava enrolado, num lugar à parte.","Ele me disse que eu o negaria três vezes antes de o galo cantar. Eu jurei que morreria com ele. Na mesma noite... o galo cantou.","Se ele está vivo... como é que eu vou olhar para ele?"]},{id:"mercador",name:"Mercador",kind:"male",at:[-49.4,9.5],face:[-49.4,0],colors:{tunic:13677696,mantle:8014442,sash:11567184},lines:["Tâmaras! Figos de Betfagé! ...Ah, você é um dos galileus dele, não é? Fala como eles.","Barrabás passou por aqui ontem, rindo, com um figo meu na mão. Solto, no lugar do outro.","Agora dizem que os discípulos roubaram o corpo. Vocês? Que mal conseguiram ficar acordados numa noite?"]},{id:"tome",name:"Tomé",proper:!0,kind:"male",at:[-127,12],face:[-140,6],colors:{tunic:13155488,mantle:6961706},lines:["Túmulo vazio... As mulheres estão cansadas. Pedro está confuso. Alguém levou o corpo, é só isso.","Eu disse que íamos morrer com ele, lembra? E fugimos.","Se ele está vivo, por que não aparece? Eu só acredito se vir as marcas dos cravos com meus próprios olhos.","Cléopas está ali na porta, esperando você. Emaús... talvez seja melhor mesmo sair desta cidade por um tempo."]}]}function mf(i){const e=i.golgotha,t=i.tomb;i.veil;const n=i.intro,s=Jt.x,r=Jt.z;return[{id:"nardo",name:"o vaso de alabastro",at:[n.nard[0],null,n.nard[1]],r:1.6,mesh:"jar",lines:["Um vaso de alabastro quebrado no gargalo. Ainda guarda o cheiro do nardo puro.","A casa inteira ficou perfumada naquela noite. Perfume de rei. Perfume de sepultura."]},{id:"sangue",key:!0,name:"a pedra do horto",at:[s-4,null,r-3],r:2.6,mesh:"blood",lines:["Uma pedra baixa, lisa de tanto ser usada. Manchas escuras secaram nela.",'"Pai, se queres, afasta de mim este cálice." O suor dele caía como gotas de sangue.']},{id:"tochas",name:"as tochas apagadas",at:[s+9,null,r+11],r:2.2,mesh:"torches",lines:["Tochas queimadas, pisoteadas na terra. Muitos homens estiveram aqui.","No meio delas, um lençol de linho rasgado. Alguém fugiu sem ele."]},{id:"mesas",name:"as mesas viradas",at:[31,null,30],r:2.8,mesh:"tables",y:ui.y,lines:["Mesas de cambistas viradas, moedas espalhadas entre as lajes, uma gaiola de pombas aberta e vazia.",'"Está escrito: minha casa será chamada casa de oração."']},{id:"coroa",name:"a coroa de espinhos",at:[-30,null,-65],r:2.2,mesh:"crown",lines:["Uma coroa trançada de espinhos, jogada no chão do pátio.","Os espinhos ainda têm sangue seco."]},{id:"cruz",name:"a cruz do meio",at:e.cross,r:2.6,lines:["A madeira ainda tem manchas escuras. Os cravos foram arrancados; ficaram os buracos.",'Dois ladrões morreram ao lado dele. A um deles, ele prometeu: "Hoje estarás comigo no paraíso."']},{id:"placa",key:!0,name:"a placa da cruz",at:[e.cross[0]+1.3,null,e.cross[2]+1.1],r:2,mesh:"titulus",img:!0,lines:['A placa que pregaram acima da cabeça dele, em hebraico, grego e latim: "Jesus Nazareno, Rei dos Judeus".','Os chefes pediram a Pilatos: "Não escreva o rei dos judeus." Pilatos respondeu: "O que escrevi, escrevi."']},{id:"tunica",name:"a túnica",at:[-71,null,-113],r:2.2,mesh:"tunic",lines:["Uma túnica sem costura, tecida de alto a baixo numa peça só.",'Ao lado, dados de osso. Os soldados tiraram a sorte por ela, para não rasgá-la. "Repartiram entre si as minhas vestes."']},{id:"pedra",key:!0,name:"a pedra",at:t.stone,r:2.8,lines:["A pedra é enorme. Seriam precisos vários homens para rolá-la morro acima, para fora da canaleta.","O selo romano que a prendia está partido. E os guardas estavam aqui."]},{id:"lencois",key:!0,name:"os lençóis",at:[t.linen[0],t.linen[1],t.linen[2]+.6],r:1.3,lines:["Os lençóis de linho estão aqui, deitados onde o corpo estava, ainda com o cheiro de mirra e aloés.","Quem rouba um corpo e leva só o corpo, deixando as faixas?"]},{id:"sudario",key:!0,name:"o lenço",at:[t.linen[0]+.1,t.linen[1],t.linen[2]-.8],r:1,lines:["O lenço que cobria o rosto. Não está jogado com os lençóis: está enrolado, à parte.","Não parece obra de ladrão com pressa. Parece... arrumado."]}]}const gf=[{keys:["casa","maria","lazaro"],thought:"Marta, Maria, Lázaro... esta casa já viu um morto sair do túmulo.",hint:"Comece aqui mesmo, em Betânia. Marta está ali no quintal. E Lázaro... Lázaro sabe o que é um túmulo por dentro. Ele fica perto do dele, na saída da aldeia."},{keys:["horto","sangue"],thought:"Na quinta, depois da ceia, descemos ao horto das oliveiras, no pé do monte. Ele pediu que vigiássemos. Eu dormi.",hint:"E o horto, no pé do monte? Tem um homem que dorme lá, perto da prensa de azeite. E dizem que a pedra onde ele orou ainda está marcada."},{keys:["cambista","sacerdote","pretorio"],thought:"Levaram-no amarrado para a cidade. Do pátio do Templo ao pretório do governador, cada pedra ouviu alguma coisa.",hint:"No pátio do Templo, os cambistas ainda falam da segunda-feira. Um sacerdote anda pelo pórtico, calado demais. E no pretório, junto à fortaleza, uma mulher viu tudo."},{keys:["simao","soldado","placa"],thought:"Fora da muralha, ao norte, no lugar que chamam de Caveira. Eu fiquei longe. Longe demais.",hint:"Você teve coragem de subir na Caveira? O homem de Cirene que carregou a cruz anda pela porta do norte. E a placa que pregaram nela... dizem que ainda está lá."},{keys:["jose","guarda","mulher","pedro","pedra","lencois","sudario"],thought:"Um homem do conselho pediu o corpo. Um túmulo novo, num jardim ali perto. As mulheres foram lá hoje cedo.",hint:"O jardim. O túmulo de José, o do conselho. Entre lá dentro e olhe bem os panos. Pedro está sentado lá fora, sem dizer nada a ninguém."},{keys:["mercador","tome","pastor"],thought:"Ainda há quem fale disso pela cidade e pelos campos.",hint:"Tomé está aqui perto, resmungando. O mercador da rua principal também tem o que dizer. E o pastor, lá nos campos do sul, viu os amigos dele fugirem."}],Bu=new Set(gf.flatMap(i=>i.keys)),ku={lazaro:'Lázaro disse isso? "Um morto não se desamarra sozinho"... Ele sabe do que fala.',maria:"Maria guardou aquele perfume para o sepultamento dele. Como ela sabia?",casa:"Marta sempre foi a primeira a crer. Mesmo agora.",sangue:"Sangue na pedra... ele sabia o que vinha. Sabia, e ficou.",horto:"Um beijo. De um dos doze. Eu ainda não consigo dizer o nome.",cambista:"As mesas viradas... Na segunda-feira eu achei que ele ia tomar o Templo. Eu não entendi nada.",sacerdote:"De alto a baixo? O véu? Quem rasga uma coisa daquelas de alto a baixo?",pretorio:"Uma coroa de espinhos. Era assim que eles queriam o rei deles.",simao:"Nem fomos nós que carregamos a cruz dele. Foi um estranho que vinha do campo.",soldado:'Um centurião romano disse isso? "O Filho de Deus"?',placa:'"Rei dos Judeus", em três línguas. Pilatos zombou... e escreveu a verdade.',jose:"José do conselho, cuidando do corpo... e nós escondidos.",guarda:"Os guardas estão mentindo, isso eu sei. Mas mentindo para esconder o quê?",mulher:'"Por que procuram entre os mortos aquele que vive?"... Elas disseram isso para todos nós. Ninguém acreditou.',pedro:"Pedro está assim desde a noite do galo.",pedra:"Aquela pedra não se move por dentro.",lencois:"Os lençóis ficaram? Ladrão nenhum perde tempo desenrolando um morto.",sudario:"O lenço dobrado à parte... como quem acorda e arruma a cama.",tome:"Tomé. Sempre o último a acreditar e o primeiro a querer morrer com ele.",mercador:"Barrabás solto e ele na cruz. Que troca.",pastor:'"Ferirei o pastor, e as ovelhas se dispersarão." Ele avisou.'};function HM(i){const e=new At,t=new it({color:4863268,roughness:.9});for(let n=0;n<3;n++){const s=new Ge(new $i(.14+n*.006,.012,5,22),t);s.rotation.x=Math.PI/2+(n-1)*.12,s.rotation.y=n,e.add(s)}for(let n=0;n<46;n++){const s=n/46*Math.PI*2,r=new Ge(new qs(.006,.06,4),t);r.position.set(Math.cos(s)*.145,(n%3-1)*.012,Math.sin(s)*.145),r.lookAt(Math.cos(s)*.4,(n%5-2)*.2,Math.sin(s)*.4),r.rotateX(Math.PI/2),e.add(r)}return e.rotation.x=.25,e}function GM(i){const e=new At,t=new Ge(new so(.6,1),i.cliff);t.scale.set(1.3,.45,1),t.position.y=.1,e.add(t);const n=new Ge(new en(.7,.07,.5),new it({color:15129796,roughness:.95}));n.position.set(0,.36,0),n.rotation.y=.3,e.add(n);const s=n.clone();s.scale.set(.8,1,.85),s.position.y=.42,s.rotation.y=.2,e.add(s);const r=new it({color:15327433,roughness:.6});for(let a=0;a<3;a++){const o=new Ge(new en(.03,.03,.03),r);o.position.set(.45+a*.06,.32,.25-a*.05),o.rotation.set(a,a*2,0),e.add(o)}return e}let sc=null;function bf(){if(sc)return sc;const i=document.createElement("canvas");i.width=768,i.height=240;const e=i.getContext("2d");e.fillStyle="#b89a70",e.fillRect(0,0,768,240);for(let t=0;t<40;t++){e.strokeStyle=`rgba(90,60,30,${.08+Math.random()*.12})`,e.beginPath();const n=Math.random()*240;e.moveTo(0,n),e.bezierCurveTo(250,n+8,500,n-8,768,n+4),e.stroke()}return e.fillStyle="#2a1a0e",e.textAlign="center",e.textBaseline="middle",e.font="bold 40px serif",e.direction="rtl",e.fillText("ישוע הנצרי ומלך היהודים",384,48),e.direction="ltr",e.font="bold 30px serif",e.fillText("ΙΗΣΟΥΣ Ο ΝΑΖΩΡΑΙΟΣ Ο ΒΑΣΙΛΕΥΣ ΤΩΝ ΙΟΥΔΑΙΩΝ",384,120),e.font="bold 40px serif",e.fillText("IESVS NAZARENVS REX IVDAEORVM",384,192),e.strokeStyle="#5a3a1e",e.lineWidth=10,e.strokeRect(5,5,758,230),sc=i,i}function VM(){const i=new ns(bf());i.colorSpace=yt;const e=new At,t=new Ge(new en(.9,.29,.04),[0,0,0,0,0,0].map((s,r)=>r===4?new it({map:i,roughness:.9}):new it({color:9071176,roughness:.9})));t.position.set(0,.32,0),t.rotation.x=-.35,e.add(t);const n=new Ge(new en(.05,.4,.05),new it({color:5914672}));return n.position.set(0,.18,-.12),n.rotation.x=.4,e.add(n),e}function WM(){const i=new At,e=new it({color:15854296,roughness:.35}),t=new Ge(new no([[0,0],[.07,.01],[.09,.08],[.07,.17],[.03,.21],[.03,.22]].map(([s,r])=>new fe(s,r)),14),e);t.rotation.z=1.35,t.position.set(0,.07,0),i.add(t);for(let s=0;s<4;s++){const r=new Ge(new wl(.025),e);r.position.set(.2+s*.05,.015,s%2*.06-.03),i.add(r)}const n=new Ge(new Nr(.22,16).rotateX(-Math.PI/2),new it({color:6965800,transparent:!0,opacity:.45,roughness:.4}));return n.position.set(.18,.004,0),i.add(n),i}function XM(){const i=new At,e=new it({color:4852744,roughness:.35});for(let t=0;t<9;t++){const n=new Ge(new is(.05+Math.random()*.06,8,4),e);n.scale.y=.18,n.position.set((Math.random()-.5)*.9,0,(Math.random()-.5)*.7),i.add(n)}return i}function qM(i){const e=new At,t=new it({color:1314832,roughness:1});for(let r=0;r<4;r++){const a=new At,o=new Ge(new Ft(.025,.03,.8,6),i.darkWood);a.add(o);const c=new Ge(new Ft(.06,.04,.16,6),t);c.position.y=.44,a.add(c),a.rotation.set(Math.PI/2,0,r*1.3),a.position.set((r-1.5)*.45,.04,r%2*.4),e.add(a)}const n=new Ge(new In(.9,.6,4,3).rotateX(-Math.PI/2),new it({color:15261640,roughness:.95,side:Et})),s=n.geometry.attributes.position;for(let r=0;r<s.count;r++)s.setY(r,Math.random()*.06);return n.geometry.computeVertexNormals(),n.position.set(.3,.03,-.5),n.rotation.y=.6,e.add(n),e}function jM(i){const e=new At,t=(a,o,c,l)=>{const h=new At,d=new Ge(new en(1.6,.07,.8),i.darkWood);h.add(d);for(const[u,f]of[[-.7,-.32],[.7,-.32],[-.7,.32],[.7,.32]]){const p=new Ge(new en(.07,.7,.07),i.darkWood);p.position.set(u,-.38,f),h.add(p)}h.rotation.set(l,c,0),h.position.set(a,l?.42:.74,o),e.add(h)};t(0,0,.3,Math.PI/2),t(1.6,1.4,-.8,Math.PI),t(-1.8,1.2,1.1,0);const n=new Ft(.018,.018,.005,10);for(let a=0;a<40;a++){const o=new Ge(n,a%3?i.gold:i.bronze),c=Math.random()*6.28,l=Math.random()*2.6;o.position.set(Math.cos(c)*l+.3,.004,Math.sin(c)*l+.6),o.rotation.set(Math.random()*.3,0,Math.random()*.3),e.add(o)}const s=new At;for(let a=0;a<8;a++){const o=new Ge(new Ft(.01,.01,.4,4),i.wood),c=a/8*6.28;o.position.set(Math.cos(c)*.2,.2,Math.sin(c)*.2),s.add(o)}const r=new Ge(new Ft(.22,.22,.03,10),i.wood);return s.add(r),s.rotation.z=1.4,s.position.set(-.6,.2,1.6),e.add(s),e}function YM(i){const e=new At,t=new Ge(new Ft(.022,.026,2.3,6),i.darkWood);t.position.y=1.15,e.add(t);const n=new Ge(new qs(.04,.3,6),i.bronze);return n.position.y=2.45,e.add(n),e.rotation.z=.12,e}function KM(i,e,t,n){i.traverse(o=>{if(!o.isMesh)return;e==="soldier"&&(o.userData.part==="hair"||o.userData.part==="beard")&&(o.visible=!1);const c=o.material?.name,l=e==="soldier"?{tunic:11022890,mantle:9054754,sash:5913120}:e==="priest"?{tunic:16052454,mantle:15262420,sash:5917344}:t||{};c&&l[c]!==void 0&&(o.material=o.material.clone(),o.material.color=new Ie(l[c]),c==="mantle"&&(o.material.map=zv()))}),i.updateMatrixWorld(!0);let s=null;if(i.traverse(o=>{o.isBone&&o.name==="Head"&&(s=o)}),!s)return;const r=new N;s.getWorldPosition(r);const a=(o,c)=>{o.position.set(r.x,r.y+c,r.z),i.add(o),o.updateMatrixWorld(!0),s.attach(o)};if(e==="soldier"){const o=new Ge(new is(.135,14,8,0,Math.PI*2,0,Math.PI*.55),n.bronze);o.scale.set(1,1.05,1.12),a(o,.075);const c=new Ge(new en(.035,.09,.26),new it({color:10496544,roughness:.9}));a(c,.22);const l=new Ge(new $i(.14,.014,5,20),n.bronze);l.rotation.x=Math.PI/2,a(l,.075)}if(e==="priest"){const o=new it({color:16184040,roughness:.9}),c=new Ge(new Ft(.125,.13,.13,14),o);a(c,.17);for(let l=0;l<3;l++){const h=new Ge(new $i(.13,.022,6,18),o);h.rotation.x=Math.PI/2,a(h,.12+l*.045)}}}function JM(i){return[...pf(i).map(e=>[e.at[0],e.at[1],2.6]),...mf(i).map(e=>[e.at[0],e.at[2],3])]}function ZM(i){const{scene:e,camera:t,solids:n,heightAt:s,extras:r,clips:a,maleTpl:o,femaleTpl:c,M:l,player:h,hero:d,play:u,grade:f,isTouch:p}=i,_=B=>document.querySelector(B),g={wip:_("#wip"),wipBtn:_("#wipBtn"),img:_("#talkImg"),talk:_("#talk"),name:_("#talkName"),text:_("#talkText"),prompt:_("#prompt"),act:_("#bAct"),obj:_("#objective"),cap:_("#caption"),skip:_("#skip")},m=pf(r).map(B=>{const K=Hl(B.kind==="female"?c:o);KM(K,B.kind,B.colors,l),K.traverse(le=>{le.isMesh&&(le.castShadow=!1,le.receiveShadow=!0,le.frustumCulled=!1)});const oe=B.y??s(B.at[0],B.at[1]);K.position.set(B.at[0],oe,B.at[1]),K.rotation.y=Math.atan2(B.face[0]-B.at[0],B.face[1]-B.at[1]),e.add(K);const ve=new Wa(K),$=ve.clipAction(a[B.sit?"Sitting_Idle_Loop":"Idle_Loop"]),me=ve.clipAction(a[B.sit?"Sitting_Talking_Loop":"Idle_Talking_Loop"]);if(B.sit&&B.bench){const le=K.rotation.y,ue=B.at[0]-Math.sin(le)*.42,De=B.at[1]-Math.cos(le)*.42,ze=new Ge(new en(1.5,.47,.55),l.fieldStone);ze.position.set(ue,oe+.235,De),ze.rotation.y=le,ze.castShadow=!0,ze.receiveShadow=!0,e.add(ze),n.add({x:ue,z:De,hx:.75,hz:.28,rot:le,y0:oe,y1:oe+.47})}$.play(),ve.update(Math.random()*3);const Y=n.add({x:B.at[0],z:B.at[1],hx:.32,hz:.32,rot:0,y0:oe-.5,y1:oe+1.7});if(B.kind==="soldier"){const le=YM(l);le.position.set(B.at[0]+.55,oe,B.at[1]+.2),e.add(le)}return{...B,root:K,mixer:ve,idle:$,talk:me,y:oe,col:Y,baseYaw:K.rotation.y,kind:"npc",heard:!1}}),v=new Vx,x=new N(0,-1,0),b=e.children.filter(B=>B.isMesh&&!B.isInstancedMesh&&!B.isSkinnedMesh);function E(B,K,oe){v.set(new N(B,(oe??s(B,K))+3,K),x),v.far=8;const ve=v.intersectObjects(b,!1)[0];return ve?ve.point.y:oe??s(B,K)}const S=mf(r).map(B=>{const K=[B.at[0],B.y??B.at[1]??s(B.at[0],B.at[2]),B.at[2]];if(B.mesh){const oe={crown:()=>HM(),tunic:()=>GM(l),jar:WM,blood:XM,torches:()=>qM(l),tables:()=>jM(l),titulus:VM}[B.mesh],ve=oe(),$=E(K[0],K[2],B.y??K[1]);ve.position.set(K[0],$+(B.mesh==="crown"?.03:.005),K[2]),(B.mesh==="titulus"||B.mesh==="jar")&&(ve.rotation.y=Math.atan2(r.golgotha.cross[0]-K[0],r.golgotha.cross[2]-K[2])+Math.PI),ve.traverse(me=>{me.isMesh&&(me.castShadow=!0,me.receiveShadow=!0)}),e.add(ve),K[1]=$}return{...B,at:K,kind:"obj",heard:!1}}),T=new Ge(new Ft(1.15,1.15,.45,22).rotateX(Math.PI/2),l.cliff);T.position.set(r.tomb.X,r.tomb.g+1.15,r.tomb.FZ+.4),T.visible=!1,e.add(T);function A(B,K){const oe=document.createElement("canvas");oe.width=128,oe.height=128;const ve=oe.getContext("2d");ve.fillStyle=K?"rgba(40,26,12,.82)":"rgba(30,24,20,.7)",ve.strokeStyle=K?"#e8bf6a":"#f2e6cc",ve.lineWidth=6,ve.beginPath(),ve.arc(64,56,40,0,Math.PI*2),ve.fill(),ve.stroke(),ve.beginPath(),ve.moveTo(52,92),ve.lineTo(64,116),ve.lineTo(76,92),ve.closePath(),ve.fillStyle=K?"#e8bf6a":"#f2e6cc",ve.fill(),ve.fillStyle=K?"#ffe2a2":"#fff4dc",ve.font="bold 54px Georgia, serif",ve.textAlign="center",ve.textBaseline="middle",ve.fillText(B,64,B==="…"?46:58);const $=new ns(oe);return $.colorSpace=yt,$}const M={talk:A("…",!0),look:A("?",!0),lookOpt:A("?",!1),ready:A("!",!0)},y=B=>{const K=new q_(new Nd({map:B,transparent:!0,depthWrite:!1,depthTest:!1,fog:!1}));return K.renderOrder=20,K.visible=!1,e.add(K),K};for(const B of m)B.marker=y(M.talk);for(const B of S)B.marker=y(B.key?M.look:M.lookOpt);const C=m.find(B=>B.hub),U=Bu.size;let w="start";const P=[],L=()=>new Set([...m,...S].filter(B=>B.heard).map(B=>B.id)),F=()=>{const B=L();return[...Bu].filter(K=>B.has(K)).length},W=()=>F()>=U,O=()=>{const B=L();return gf.find(K=>K.keys.some(oe=>!B.has(oe)))};let j="";function X(B){j=B,se()}function se(){if(!j){g.obj.hidden=!0;return}g.obj.hidden=!1;let B=j;j==="chapters"&&(B=w==="start"?"Cléopas está lá fora, me esperando.":W()?"Já ouvi o bastante. Cléopas me espera na Porta de Jafa.":O().thought),g.obj.innerHTML=`<b>${B}</b>${w==="start"||w==="done"?"":`<span>Depoimentos e sinais: ${F()} de ${U}</span>`}`}function pe(){if(w==="start")return["Você acordou. Eu nem consegui dormir.","Tem alguma coisa fora do lugar hoje. As mulheres voltaram do jardim dizendo coisas sem pé nem cabeça. Pedro saiu correndo e voltou mudo.","Eu queria ir para casa, para Emaús, e esquecer. Mas não consigo partir sem entender o que está acontecendo.","Faça isso por nós dois: ouça quem estava lá. Aqui em Betânia, no horto, na cidade, onde ele morreu, onde o puseram. Veja com seus próprios olhos.","Vou na frente. Espero você na Porta de Jafa, na saída para Emaús. Depois me conte tudo."];if(W())return["E então? ...Pela sua cara, você ouviu tudo.","O sangue no horto, a placa na cruz, a pedra rolada, os panos arrumados, os guardas mentindo... nada disso se encaixa numa história de corpo roubado.","Nós esperávamos que fosse ele quem ia libertar Israel. E hoje já é o terceiro dia desde que tudo aconteceu.","Vem comigo para Emaús. São sessenta estádios. No caminho a gente tenta entender tudo isso."];const B=O(),K=L(),oe=U-F(),ve=P.filter(me=>ku[me]).slice(-1)[0],$=[];return!K.size||F()===0?$.push("Ainda não ouviu ninguém? Tudo bem. Eu também não sei por onde começar."):ve?$.push(ku[ve]):$.push("Interessante... continue."),$.push(B.hint),$.push(oe>6?"Ainda há muita gente para ouvir. Eu espero.":oe>1?`Faltam poucas coisas. Talvez ${oe}.`:"Falta só uma coisa. Eu sinto que falta."),$}let de=null;const Q=46;function te(B){B.hub&&(B.lines=pe()),de={who:B,lines:B.lines,i:0,shown:0},g.talk.hidden=!1,g.name.textContent=B.kind==="npc"?B.name:`Você examina ${B.name}`,B.img?(g.img.src=bf().toDataURL(),g.img.hidden=!1):g.img.hidden=!0,g.prompt.hidden=!0,g.act.hidden=!0,B.kind==="npc"&&B.idle.crossFadeTo(B.talk.reset().play(),.3,!1)}function Ee(){if(!de)return;const B=de.lines[de.i];if(de.shown<B.length){de.shown=B.length;return}de.i++,de.shown=0,de.i>=de.lines.length&&xe()}function xe(){const B=de.who;if(de=null,g.talk.hidden=!0,B.kind==="npc"&&B.talk.crossFadeTo(B.idle.reset().play(),.4,!1),B.hub){if(w==="start")w="met",C.moveWhenFar=!0;else if(W()){re();return}se();return}B.heard||(B.heard=!0,P.push(B.id)),se()}g.talk.addEventListener("pointerdown",B=>{B.stopPropagation(),Ee()});let he=null;const Te=r.intro,We=r.golgotha,$e=r.tomb,k=(B,K,oe)=>new N(B,K,oe),ne=k(Te.sit[0],Te.sit[2],Te.sit[1]),z=(B,K)=>s(B,K),be=Jt.x,_e=Jt.z,Ue=[{dur:5.2,fade:[1,1],caps:[[.4,"Primeiro dia da semana."],[2.6,"Betânia, ao amanhecer."]],cam:()=>[k(Te.camIn[0],Te.camIn[2],Te.camIn[1]),ne.clone().add(k(0,1,0))]},{dur:4.4,caps:[[.3,"Três dias. E eu não consigo parar de ver..."]],cam:B=>[k(Te.camIn[0],Te.camIn[2]-B*.1,Te.camIn[1]),ne.clone().add(k(0,1.05,0))]},{dur:3.8,mem:1,dark:.55,caps:[[.3,"Tochas no horto. Um beijo."]],cam:B=>[k(be-13+B*2.5,z(be,_e)+3,_e+11-B*2),k(be,z(be,_e)+2,_e)]},{dur:3.8,mem:1,dark:.2,caps:[[.3,'O pretório. A coroa de espinhos. "Crucifica-o!"']],cam:B=>[k(-31.6+B*.15,z(-31.6,-62.6)+1.05-B*.12,-62.6-B*.1),k(-30,z(-30,-65)+.05,-65)]},{dur:4.4,mem:1,dark:.45,caps:[[.3,"Ao meio-dia, trevas sobre a terra."],[2.2,'"Está consumado."']],cam:B=>[k(We.cross[0]+8-B,We.top+1.2,We.cross[2]+8-B),k(We.cross[0],We.top+4.2,We.cross[2])]},{dur:3.8,mem:1,dark:.3,sealed:1,caps:[[.3,"Uma pedra sobre a entrada. O sábado em silêncio."]],cam:B=>[k($e.X+.6,$e.g+1.3,$e.FZ+3.6-B*.3),k($e.X,$e.g+1,$e.FZ)]},{dur:3.4,caps:[[.4,"...e mesmo assim, algo está estranho."]],player:"Sitting_Exit",cam:B=>[k(Te.camIn[0],Te.camIn[2],Te.camIn[1]),ne.clone().add(k(0,1+B*.15,0))]},{dur:4.6,walk:[Te.door,Te.out],cam:()=>{const B=Te.out2;return[k(B[0]+1.5,z(B[0],B[1])+2.4,B[1]+1.5),h.position.clone().add(k(0,1.4,0))]}}];function we(){he={shots:Ue,i:0,t:0,onEnd:Ve},document.body.classList.add("cine"),g.skip.hidden=!1,h.position.copy(ne),d.rotation.y=0,h.rotation.y=0,i.setHeroYaw(Te.yaw),u("Sitting_Idle_Loop",{fade:0}),Le()}function Ve(){T.visible=!1,he=null,document.body.classList.remove("cine"),g.skip.hidden=!0,g.cap.classList.remove("on"),f.uMem.value=0,f.uFade.value=0,f.uDark.value=0;const B=Te.out;h.position.set(B[0],n.groundAt(B[0],B[1],s(B[0],B[1])+1),B[1]),i.setHeroYaw(Te.yaw),i.resetCam(Te.yaw+Math.PI),X("chapters")}function Le(){const B=he.shots[he.i];he.t=0,he.capI=0,g.cap.classList.remove("on"),f.uFlash.value=B.mem||he.shots[he.i-1]?.mem?1:0,T.visible=!!B.sealed,B.player&&u(B.player,{once:!0,fade:.2}),B.wip&&(g.wip.hidden=!1),B.walk&&(he.walk={pts:B.walk,k:0},u("Walk_Loop",{fade:.3}))}function D(B){const K=he.shots[he.i];for(he.t+=B,Math.min(1,he.t/K.dur),f.uMem.value=Fn.damp(f.uMem.value,K.mem?1:0,6,B),f.uDark.value=Fn.damp(f.uDark.value,K.dark||0,4,B),f.uFlash.value=Math.max(0,f.uFlash.value-B*2.4),K.black?f.uFade.value=1:K.fade?f.uFade.value=1-Math.min(1,Math.max(0,(he.t-2.2)/1.6)):K.end?f.uFade.value=Math.min(1,he.t/.8):f.uFade.value=Math.max(0,f.uFade.value-B*2);K.caps&&he.capI<K.caps.length&&he.t>=K.caps[he.capI][0];)g.cap.textContent=K.caps[he.capI][1],g.cap.classList.add("on"),he.capI++;if(he.t>K.dur-.5&&g.cap.classList.remove("on"),K.tick&&K.tick(he.t,B),he.walk){const $=he.walk,me=$.pts[$.k],Y=h.position,le=me[0]-Y.x,ue=me[1]-Y.z,De=Math.hypot(le,ue);if(De<.15)$.k<$.pts.length-1?$.k++:(he.walk=null,u("Idle_Loop"));else{const ze=Math.min(De,1.6*B);Y.x+=le/De*ze,Y.z+=ue/De*ze,Y.y=n.groundAt(Y.x,Y.z,Y.y),i.setHeroYaw(Math.atan2(le,ue))}}const[oe,ve]=K.cam(he.t);if(he.t>=K.dur){if(he.i++,he.i>=he.shots.length){const $=he.onEnd;return $(),null}Le()}return{pos:oe,look:ve}}const R=[[-150,3.5],[-168,5],[-190,6],[-215,3]];function q(B,K){for(let $=0;$<B.length-1;$++){const[me,Y]=B[$],[le,ue]=B[$+1],De=Math.hypot(le-me,ue-Y);if(K<=De)return[me+(le-me)*K/De,Y+(ue-Y)*K/De,Math.atan2(le-me,ue-Y)];K-=De}const[oe,ve]=B[B.length-1];return[oe,ve,-Math.PI/2]}function re(){w="done",se();const B=C,K=B.mixer.clipAction(a.Walk_Loop);B.idle.stop(),B.talk.stop(),K.reset().play();const oe=[B.root.position.x,B.root.position.z],ve=[oe,...R],$=ve.map(([ue,De],ze)=>[ue,De+1.3]);u("Walk_Loop",{fade:.3});let me=0;const Y=(ue,De)=>{me+=De*1.45;const[ze,st,H]=q(ve,me),[ye,ee]=q($,Math.max(0,me-.2));B.root.position.set(ze,s(ze,st),st),B.root.rotation.y=H,B.baseYaw=H,h.position.set(ye,s(ye,ee),ee),i.setHeroYaw(H)},le=()=>h.position.clone().lerp(B.root.position,.5);he={shots:[{dur:7.5,tick:Y,cam:ue=>{const De=le();return[De.clone().add(k(7-ue*.25,2.2+ue*.12,4.5)),De.clone().add(k(-5,1.1,0))]}},{dur:1.6,tick:Y,end:1,cam:ue=>{const De=le();return[De.clone().add(k(5.2-ue*.2,3.1,4.5)),De.clone().add(k(-6,1.1,0))]}},{dur:8,black:1,caps:[[.4,"Naquele mesmo dia, dois deles iam para um povoado chamado Emaús, a sessenta estádios de Jerusalém..."],[4.4,"...e conversavam sobre tudo o que tinha acontecido."]],cam:()=>[t.position.clone(),le()]},{dur:1/0,black:1,wip:1,cam:()=>[t.position.clone(),le()]}],i:0,t:0,onEnd:()=>{}},document.body.classList.add("cine"),Le()}g.wipBtn.addEventListener("click",()=>{g.wip.hidden=!0,he=null,document.body.classList.remove("cine"),g.cap.classList.remove("on"),f.uFade.value=0;const B=C;B.mixer.stopAllAction(),B.idle.reset().play(),B.root.position.set(-148,s(-148,9),9),B.baseYaw=B.root.rotation.y=Math.atan2(30,-2),h.position.set(-143,s(-143,5),5),i.setHeroYaw(Math.PI/2),i.resetCam(-Math.PI/2),u("Idle_Loop",{fade:.3}),X("A estrada para Emaús continua na próxima fase. Jerusalém está aberta para explorar.")}),g.skip.addEventListener("click",()=>{he&&he.onEnd===Ve&&Ve()});const ce=new N;function ie(B,K,oe){if(he||de)for(const Y of[...m,...S])Y.marker.visible=!1;for(const Y of m){const le=Y.root.position.distanceTo(h.position);Y.root.visible=le<95||!!he,Y.root.visible&&Y.mixer.update(B);let De=(de?.who===Y?Math.atan2(h.position.x-Y.root.position.x,h.position.z-Y.root.position.z):Y.baseYaw)-Y.root.rotation.y;De=Math.atan2(Math.sin(De),Math.cos(De)),Y.root.rotation.y+=De*Math.min(1,B*4)}if(he)return he.shots[he.i]?.black&&(f.uFade.value=1),{lock:!0,cam:D(B)};if(de){if(de.shown=Math.min(de.lines[de.i].length,de.shown+B*Q),g.text.textContent=de.lines[de.i].slice(0,Math.floor(de.shown)),g.talk.classList.toggle("ready",de.shown>=de.lines[de.i].length),(K.interact||K.jump)&&Ee(),de?.who){const Y=de.who,le=Y.kind==="npc"?Y.root.position:ce.set(Y.at[0],0,Y.at[2]);i.setHeroYaw(Math.atan2(le.x-h.position.x,le.z-h.position.z))}return{lock:!0}}if(C.moveWhenFar&&C.root.position.distanceTo(h.position)>30){const[Y,le]=C.jaffa,ue=s(Y,le);C.moveWhenFar=!1,C.col.y0=C.col.y1=-1e9,C.root.position.set(Y,ue,le),C.y=ue,C.baseYaw=C.root.rotation.y=Math.atan2(C.jaffaFace[0]-Y,C.jaffaFace[1]-le),C.col=n.add({x:Y,z:le,hx:.32,hz:.32,rot:0,y0:ue-.5,y1:ue+1.7})}const ve=(Y,le)=>Y>le?0:Math.min(1,.18+.82*Math.pow(1-Math.max(0,Y-3)/(le-3),1.6));for(const Y of m){const le=Y.hub?w!=="done":w!=="start"&&!Y.heard,ue=Y.root.position.distanceTo(h.position),De=Y.hub?400:45;if(Y.marker.visible=le&&ue<De&&ue>.9,!Y.marker.visible)continue;Y.hub&&(Y.marker.material.map=w==="start"||W()?M.ready:M.talk),Y.marker.material.opacity=Y.hub?Math.max(.55,ve(ue,60)):ve(ue,De);const ze=1+Math.sin(oe*2.4+Y.at[0])*.06,st=(Y.hub?.55+Math.min(1.6,ue/60):.55)*ze;Y.marker.scale.set(st,st,1),Y.marker.position.set(Y.root.position.x,Y.root.position.y+(Y.sit?1.75:2.2)+Math.sin(oe*1.8+Y.at[1])*.05,Y.root.position.z)}for(const Y of S){const le=Math.hypot(Y.at[0]-h.position.x,Y.at[2]-h.position.z);if(Y.marker.visible=w!=="start"&&!Y.heard&&le<35&&le>.6,!Y.marker.visible)continue;Y.marker.material.opacity=ve(le,35)*(Y.key?1:.8);const ue=(Y.key?.45:.36)*(1+Math.sin(oe*2.4+Y.at[0])*.06);Y.marker.scale.set(ue,ue,1),Y.marker.position.set(Y.at[0],Y.at[1]+1.05+Math.sin(oe*1.6+Y.at[2])*.08,Y.at[2])}let $=null,me=1/0;for(const Y of m){const le=Math.hypot(Y.root.position.x-h.position.x,Y.root.position.z-h.position.z);le<2.6&&Math.abs(Y.y-h.position.y)<2&&le<me&&(me=le,$=Y)}for(const Y of S){const le=Math.hypot(Y.at[0]-h.position.x,Y.at[2]-h.position.z);le<Y.r&&Math.abs(Y.at[1]-h.position.y)<2.6&&le<me&&(me=le,$=Y)}if($){const Y=$.kind==="npc"?"Falar com":"Examinar";g.prompt.hidden=!1,g.prompt.innerHTML=`${p?"":"<kbd>E</kbd> "}${Y} <b>${$.kind==="npc"&&!$.proper?$.name.toLowerCase():$.name}</b>${$.heard&&!$.hub?" <i>·</i>":""}`,g.act.hidden=!p,g.act.textContent=$.kind==="npc"?"FALAR":"OLHAR",K.interact&&te($)}else g.prompt.hidden=!0,g.act.hidden=!0;return{lock:!1}}return{update:ie,startIntro:we,skipIntro:()=>Ve(),npcs:m,objs:S,get busy(){return!!he||!!de},get stage(){return w},setObjective:X,startEnding:re}}const co=matchMedia("(pointer: coarse)").matches||"ontouchstart"in window;co&&document.body.classList.add("touch");const yr=new URLSearchParams(location.search),Js=co||yr.has("low"),Hu=document.querySelector("#msg"),zr=i=>{Hu&&(Hu.textContent=i)},lo=()=>new Promise(i=>setTimeout(i,0)),Gt=new W_({antialias:!1,powerPreference:"high-performance"});Gt.setPixelRatio(Math.min(devicePixelRatio,Js?1.35:2));Gt.setSize(innerWidth,innerHeight);Gt.shadowMap.enabled=!0;Gt.shadowMap.type=Zu;Gt.toneMapping=ol;Gt.toneMappingExposure=.92;document.body.appendChild(Gt.domElement);const Ot=new X_,_f=new Ie(15125439);Ot.fog=new Ml(_f,.0016);const xf=i=>i<1?55+(1-i)*40:55,Kt=new Yt(xf(innerWidth/innerHeight),innerWidth/innerHeight,.1,3200),Gl=document.querySelector("#bar i"),ho=new qd;ho.onProgress=(i,e,t)=>{Gl.style.width=`${e/t*80}%`};const QM=new Wx(ho).setMeshoptDecoder(wv),$M=new jd(ho);let Gu=0;const e1=i=>(Gu++,Gl.style.width=`${Math.min(80,Gu*8)}%`,i),Ei=async i=>e1(await QM.loadAsync(`assets/models/${i}.glb`));async function t1(){return new Tv(ho).loadAsync("assets/sky/sunset.hdr")}zr("carregando modelos e texturas…");const[n1,i1,s1,r1,a1,o1,c1,l1,vf,h1]=await Promise.all([Ei("nature"),Ei("hero_base"),Ei("hair_long"),Ei("hair_beard"),Ei("animations"),Ei("donkey"),Ei("sheep"),Ei("hero_female"),t1(),iM($M,{anisotropy:Js?4:8})]),{M:Br,ground:u1}=h1,Mf=new N(.78,.5,.4).normalize();vf.mapping=Oa;const d1=new qc(Gt);Ot.environment=d1.fromEquirectangular(vf).texture;Ot.environmentIntensity=.6;const di=new Kd(16765856,3.6);di.castShadow=!0;const Vu=Js?1536:2048;di.shadow.mapSize.set(Vu,Vu);Object.assign(di.shadow.camera,{left:-70,right:70,top:70,bottom:-70,near:1,far:400});di.shadow.bias=-4e-4;di.shadow.normalBias=.08;Ot.add(di,di.target);Ot.add(new wx(13025516,9335642,.85));const yf={uTime:{value:0},uSun:{value:Mf.clone()},uFog:{value:_f}},uo=new Ge(new is(2800,40,20),new Dt({uniforms:yf,side:Zt,depthWrite:!1,fog:!1,vertexShader:"varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }",fragmentShader:`
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
    }`}));uo.frustumCulled=!1;uo.renderOrder=-10;Ot.add(uo);zr("erguendo Jerusalém…");await lo();mM(Ot,u1,{lowQuality:Js});const f1=gM(Ot),p1=bM(Ot,Br),Pi=new Qv(Me),fo=new cM(Br,Pi),Hn={flames:[],smoke:[],lights:[],pools:[],gardens:[],groves:[],vines:[],pens:[]};_M(fo,Hn);zr("construindo a cidade…");await lo();const Wu=wM(fo,Hn);DM(fo,Hn);fo.finish(Ot);zr("plantando oliveiras…");await lo();Hn.reserved=JM(Hn);const Xu=zM(Ot,n1,Pi,Hn,{lowQuality:Js}),m1=BM(Ot,{sheepGltf:c1,donkeyGltf:o1},Hn),g1=kM(Ot,Hn,Br);Br.lit.emissiveIntensity=2.2;zr("vestindo o peregrino…");await lo();const Di=sf({baseGltf:i1,hairGltf:s1,beardGltf:r1}),b1=Hl(Di),_1=sf({baseGltf:l1,cover:!0,colors:{tunic:14207142,veil:9084088,mantle:11575440}}),Ii=new At;Ii.add(Di);Ot.add(Ii);const Sf=new Wa(Di),Ef=Object.fromEntries(a1.animations.map(i=>[i.name,i])),x1={},v1=i=>x1[i]??=Sf.clipAction(Ef[i]);let Ea=null;function Ki(i,{once:e=!1,fade:t=.2,speed:n=1}={}){const s=v1(i);return s.timeScale=n,Ea===s||(s.reset(),s.setLoop(e?md:gd,1/0),s.clampWhenFinished=e,s.enabled=!0,Ea&&Ea.crossFadeTo(s,t,!1),s.play(),Ea=s),s}Ki("Idle_Loop");const M1=Fv(Gt.domElement,co);let Nn=0,Ai=.18,zn=6.5,ii=0,$n=0,wi=!0,rc=0,ws=!1,Un=0,Ji=0;const ti=new N,qu=new N;function po(i,e,t,n,s){const r=s??Pi.groundAt(i,e,Me(i,e)+30);Ii.position.set(i,r,e),Ji=r,ii=Math.atan2(t-i,n-e),Di.rotation.y=ii,Nn=ii+Math.PI,$n=0,wi=!0,ws=!1,ti.set(i,r+1.55,e),Kt.position.set(i-Math.sin(ii)*zn,r+3,e-Math.cos(ii)*zn)}const ju=oo.find(i=>i.id==="mirante"),y1=()=>{po(ju.spawn[0],ju.spawn[1],30,-7),Ai=.26,zn=8.5};y1();const S1=new bn(innerWidth,innerHeight,{type:sn,samples:Js?2:4}),ci=new Iv(Gt,S1),Dr={tDiffuse:{value:null},uMem:{value:0},uFade:{value:0},uFlash:{value:0},uDark:{value:0},uTime:{value:0}};ci.addPass(new Lv(Ot,Kt));ci.addPass(new Ws(new fe(innerWidth/2,innerHeight/2),.22,.55,.95));ci.addPass(new Nv);const wf=new tf({uniforms:Dr,vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }",fragmentShader:`uniform sampler2D tDiffuse; uniform float uMem, uFade, uFlash, uDark, uTime; varying vec2 vUv;
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
      c.rgb *= 1. - uFade; gl_FragColor = c; }`});ci.addPass(wf);for(const i of Object.keys(Dr))Dr[i]=wf.uniforms[i];addEventListener("resize",()=>{Gt.setSize(innerWidth,innerHeight),ci.setSize(innerWidth,innerHeight),Kt.aspect=innerWidth/innerHeight,Kt.fov=xf(Kt.aspect),Kt.updateProjectionMatrix()});const sl=document.querySelector("#place");let Yu=null,rl=0;const E1=i=>{sl.querySelector("b").textContent=i.name,sl.classList.add("on"),rl=4},Ka=document.querySelector("#menu"),w1=document.querySelector("#places");for(const i of oo.filter(e=>e.spawn)){const e=document.createElement("button");e.type="button",e.textContent=i.name,e.addEventListener("click",()=>{po(i.spawn[0],i.spawn[1],...i.look||[i.x,i.z]),Ka.hidden=!0}),w1.appendChild(e)}document.querySelector("#mapBtn").addEventListener("click",()=>{Ka.hidden=!Ka.hidden});document.querySelector("#closeMenu").addEventListener("click",()=>{Ka.hidden=!0});const Sr=ZM({scene:Ot,camera:Kt,solids:Pi,heightAt:Me,extras:Hn,clips:Ef,maleTpl:b1,femaleTpl:_1,M:Br,player:Ii,hero:Di,play:Ki,grade:Dr,isTouch:co,setHeroYaw:i=>{ii=i,Di.rotation.y=i},resetCam:i=>{Nn=i,Ai=.22,zn=6.5,ti.copy(Ii.position).add(gr.set(0,1.55,0)),Ji=Ii.position.y}}),ac=1.7,oc=4.2,Ku=7,T1=.36,Na=new Jd,Vi=new N,gr=new N,dr=new N;function Tf(i){const e=M1.poll(),t=Sr.update(i,e,Na.elapsedTime);Dr.uTime.value=Na.elapsedTime,t.lock&&(e.ix=e.iy=0,e.jump=!1,e.kneel=!1,t.cam&&(e.look.x=e.look.y=0)),Nn-=e.look.x,Ai=Fn.clamp(Ai+e.look.y,-.35,1.25),zn=Fn.clamp(zn+e.zoom,2.5,22),e.kneel&&(ws=!ws);const n=Math.min(1,Math.hypot(e.ix,e.iy));n>.1&&(ws=!1),Vi.set(0,0,0).addScaledVector(gr.set(-Math.sin(Nn),0,-Math.cos(Nn)),e.iy).addScaledVector(gr.set(Math.cos(Nn),0,-Math.sin(Nn)),e.ix),Vi.lengthSq()>1e-4&&Vi.normalize();const s=n<.05?0:n<.5?ac:e.run?Ku:oc;Un=Fn.damp(Un,s,10,i);const r=Ii.position;if(t.cam&&(Un=0),Un>.05){let d=r.x+Vi.x*Un*i,u=r.z+Vi.z*Un*i;const f=Me(d,u)-Me(r.x,r.z),p=Math.hypot(d-r.x,u-r.z);p>1e-4&&f/p>1.25&&Me(d,u)>r.y+tl&&(d=r.x,u=r.z),[d,u]=Pi.resolve(d,u,r.y,T1);const _=Math.hypot(d-20,u);_>285&&(d=20+(d-20)*285/_,u=u*285/_),r.x=d,r.z=u;let m=Math.atan2(Vi.x,Vi.z)-ii;m=Math.atan2(Math.sin(m),Math.cos(m)),ii+=m*Math.min(1,i*12),Di.rotation.y=ii}const a=t.cam?r.y:Pi.groundAt(r.x,r.z,r.y);if(e.jump&&wi&&!ws&&($n=6.6,wi=!1),wi&&a<r.y-.65&&(wi=!1),wi?r.y=a>r.y?a:Fn.damp(r.y,a,18,i):($n-=20*i,r.y+=$n*i,r.y<=a&&$n<=0&&(r.y=a,wi=!0,rc=$n<-7?.35:.15,$n=0)),Ji=Fn.damp(Ji,r.y,22,i),Math.abs(Ji-r.y)>1.2&&(Ji=r.y),Di.position.y=Ji-r.y,rc-=i,!t.cam)if(ws)Ki("Fixing_Kneeling",{fade:.4,speed:.15});else if(!wi)Ki($n>1?"Jump_Start":"Jump_Loop",{once:$n>1,fade:.12});else if(rc>0)Ki("Jump_Land",{once:!0,fade:.08});else if(Un>.15){const d=Un>oc+.8?"Sprint_Loop":Un>ac+.9?"Jog_Fwd_Loop":"Walk_Loop",u=d==="Sprint_Loop"?Ku:d==="Jog_Fwd_Loop"?oc:ac;Ki(d,{speed:Fn.clamp(Un/u,.6,1.3)})}else Ki("Idle_Loop");Sf.update(i),ti.lerp(gr.set(r.x,r.y+1.55,r.z),1-Math.exp(-12*i)),dr.set(Math.sin(Nn)*Math.cos(Ai),Math.sin(Ai),Math.cos(Nn)*Math.cos(Ai));let o=zn;for(let d=1;d<=14;d++){const u=d/14*zn;if(Pi.blocked(ti.x+dr.x*u,ti.y+dr.y*u,ti.z+dr.z*u)){o=Math.max(.6,u-.5);break}}qu.copy(ti).addScaledVector(dr,o),t.cam?(Kt.position.copy(t.cam.pos),Kt.lookAt(t.cam.look),ti.copy(r).add(gr.set(0,1.55,0))):(Kt.position.lerp(qu,o<zn?1:1-Math.exp(-14*i)),Kt.lookAt(ti)),di.position.copy(r).addScaledVector(Mf,180),di.target.position.copy(r);const c=Na.elapsedTime;yf.uTime.value=c,uo.position.copy(Kt.position),UM.value=c,f1.wn.offset.set(c*.004,c*.003),p1.wn.offset.set(0,-c*.25),m1(c,i),g1(c);let l=null,h=1/0;for(const d of oo){const u=Math.hypot(r.x-d.x,r.z-d.z);u<d.r&&u/d.r<h&&(h=u/d.r,l=d)}l&&l!==Yu&&!t.cam&&E1(l),Yu=l,rl-=i,rl<0&&sl.classList.remove("on")}function Af(){const i=Math.min(Na.getDelta(),.05);Tf(i),ci.render(),requestAnimationFrame(Af)}Gl.style.width="100%";document.querySelector("#loading").classList.add("done");if(yr.has("at")){Sr.skipIntro();const i=oo.find(e=>e.id===yr.get("at"));i?.spawn&&po(i.spawn[0],i.spawn[1],...i.look||[i.x,i.z])}else yr.get("intro")==="0"?Sr.skipIntro():Sr.startIntro();window.__game={player:Ii,camera:Kt,scene:Ot,solids:Pi,extras:Hn,houses:Wu,flora:Xu,teleport:po,story:Sr,setCam:(i,e,t)=>{Nn=i,Ai=e,zn=t},advance:(i=1,e=1/30)=>{for(let t=0;t<i;t++)Tf(e);ci.render()},view:(i,e,t,n,s,r)=>{Kt.position.set(i,e,t),Kt.lookAt(n,s,r),ci.render()},info:()=>{Gt.info.autoReset=!1,Gt.info.reset(),ci.render();const i={houses:Wu,flora:Xu.drawn,calls:Gt.info.render.calls,tris:Gt.info.render.triangles};return Gt.info.autoReset=!0,i}};yr.has("shot")||Af();
