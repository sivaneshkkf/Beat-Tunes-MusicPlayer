if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const f=e=>n(e,o),d={module:{uri:o},exports:c,require:f};i[o]=Promise.all(r.map((e=>d[e]||f(e)))).then((e=>(s(...e),c)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"android-chrome-192x192.png",revision:"b3732f87c14d26ce2d4e634c14484aa4"},{url:"android-chrome-512x512.png",revision:"cfc7b44336f31cb5093ff4fb03fbb7e1"},{url:"apple-touch-icon.png",revision:"9f695d3cfe4cd96d2cd031fcad1537de"},{url:"assets/browser-erbewC32.js",revision:null},{url:"assets/image-607ZzaSj.png",revision:null},{url:"assets/index-D6R-R_On.js",revision:null},{url:"assets/index-gki_JvZ5.css",revision:null},{url:"favicon-16x16.png",revision:"356d256d9b74ebba003fc1aa0934fc16"},{url:"favicon-32x32.png",revision:"ae9e80ae58786a5b702fea0911307a66"},{url:"index.html",revision:"bdb4a7d21ec02f480ccf91bcb1ca3840"},{url:"registerSW.js",revision:"172ce467386a0134d9b6b791fb181e25"},{url:"android-chrome-192x192.png",revision:"b3732f87c14d26ce2d4e634c14484aa4"},{url:"android-chrome-512x512.png",revision:"cfc7b44336f31cb5093ff4fb03fbb7e1"},{url:"manifest.webmanifest",revision:"283b463362917e1334471f903a1faece"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
