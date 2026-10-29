// Caches the game after the first load so the demo starts offline; a new build version replaces the old cache.
const cacheName = "shawarma247-1.3-demo-10291343";
const contentToCache = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png",
  "Build/pwa.loader.js", "Build/pwa.framework.js.unityweb", "Build/pwa.data.unityweb", "Build/pwa.wasm.unityweb"];
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(cacheName).then(c => c.addAll(contentToCache))); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== cacheName).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
    if (res.ok && new URL(e.request.url).origin === location.origin) { const copy = res.clone(); caches.open(cacheName).then(c => c.put(e.request, copy)); }
    return res;
  })));
});
