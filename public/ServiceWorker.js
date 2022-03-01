/* eslint-disable no-restricted-globals */

var cacheStaticName = "static-v-1.1";

const cacheStaticFiles = [
    "/",
    "index.html",
    "robots.txt",
    "ServiceWorker.js",
    "asset-manifest.json",
    "static/css/main.00f2c435.css",
    "static/css/main.00f2c435.css.map",
    "static/js/787.774729bc.chunk.js",
    "static/js/787.774729bc.chunk.js.map",
    "static/js/main.3d67b0db.js",
    "static/js/main.3d67b0db.js.LICENSE.txt",
    "static/js/main.3d67b0db.js.map",
    "static/media/NewNote.2dce5ddca7e6c979fa4c.png",
    "static/media/Template1.c17cd0ff43214e93d1f7.png",
    "static/media/Template2.0b739e0d3a063921a78a.png",
    "android-chrome-192x192.png",
    "android-chrome-512x512.png",
    "apple-touch-icon.png",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "favicon.ico",
    "site.webmanifest"
];

const cacheInmutableName = "inmutable-v-1.1";


self.addEventListener("install", (e) => {

    const cacheStaticPromise = caches.open(cacheStaticName).then((cache) => {
        return cache.addAll(cacheStaticFiles);
    });

    const cacheInmutablePromise = caches.open(cacheInmutableName).then((cache) => {
        return cache.addAll([
            "https://use.fontawesome.com/releases/v5.15.4/webfonts/fa-solid-900.woff2",
            "https://use.fontawesome.com/releases/v5.15.4/css/all.css"
        ]);
    });

    e.waitUntil(Promise.all([cacheInmutablePromise, cacheStaticPromise]));
});



self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
        .then((res) => {
            if (res) {
                return res;
            };
            return fetch(e.request)
            .then((res) => {
                return caches.open(cacheStaticName).then((cache) => {
                    cache.put(e.request.url, res.clone());
                    return res;
                })
            })
        })
        .catch(() => {
            console.log('There have been an error with fetching data in ServiceWorker.js');
        })
    );
});


self.addEventListener('activate', (e) => {
    console.log('Activating new service worker...');

    const cacheAllowList = [cacheStaticName];

    e.waitUntil(
        caches.keys()
        .then((cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheAllowList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    };
                })
            );
        }))
    );
});

cacheStaticName = "static-v-1.2";