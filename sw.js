if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const d=e=>n(e,o),f={module:{uri:o},exports:c,require:d};i[o]=Promise.all(r.map((e=>f[e]||d(e)))).then((e=>(s(...e),c)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/browser-erbewC32.js",revision:null},{url:"assets/index-D6R-R_On.js",revision:null},{url:"assets/index-gki_JvZ5.css",revision:null},{url:"index.html",revision:"8635fbfb96893c29d900a99d41ffda24"},{url:"registerSW.js",revision:"172ce467386a0134d9b6b791fb181e25"},{url:"android-chrome-192x192.png",revision:"b3732f87c14d26ce2d4e634c14484aa4"},{url:"android-chrome-512x512.png",revision:"cfc7b44336f31cb5093ff4fb03fbb7e1"},{url:"apple-touch-icon.png",revision:"9f695d3cfe4cd96d2cd031fcad1537de"},{url:"favicon-32x32.png",revision:"ae9e80ae58786a5b702fea0911307a66"},{url:"favicon.ico",revision:"22b55361b9876aad554441d95e2f259c"},{url:"manifest.webmanifest",revision:"ac603d7b09270ace81d0b8b2a7fd5efb"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
