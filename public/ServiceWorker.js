/* eslint-disable no-restricted-globals */


const cacheStatic = "static-v-1.1";
const cacheInmutable = "inmutable-v-1.3";

// Change elements
self.addEventListener("install", (e) => {
    console.log(e);
    const cacheStaticPromise = caches.open(cacheStatic).then((cache) => {
        return cache.addAll([
            "/service-worker.js",
            "/favicon.ico",
            "/manifest.json",
            "/logo192.png"
        ]);
    });

    const cacheInmutablePromise = caches.open(cacheInmutable).then((cache) => {
        return cache.addAll([
            "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
            "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
            "https://unpkg.com/react/umd/react.production.min.js",
            "https://unpkg.com/react-dom/umd/react-dom.production.min.js",
            "https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
        ]);
    });

    e.waitUntil(Promise.all([cacheInmutablePromise, cacheStaticPromise]));
});
