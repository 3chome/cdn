importScripts(
  "https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.3/workbox/workbox-sw.js"
);
workbox.setConfig({
  modulePathPrefix: "https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.3/workbox/",
});
const {
  core: core,
  precaching: precaching,
  routing: routing,
  strategies: strategies,
  expiration: expiration,
  cacheableResponse: cacheableResponse,
  backgroundSync: backgroundSync,
} = workbox;
const {
  CacheFirst: CacheFirst,
  NetworkFirst: NetworkFirst,
  NetworkOnly: NetworkOnly,
  StaleWhileRevalidate: StaleWhileRevalidate,
} = strategies;
const { ExpirationPlugin: ExpirationPlugin } = expiration;
const { CacheableResponsePlugin: CacheableResponsePlugin } = cacheableResponse;
const cacheSuffixVersion = "-210113a",
  maxEntries = 100;
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((e) =>
      Promise.all(
        e.map((e) => {
          if (e.includes("disqus-cdn-cache")) return caches.delete(e);
          if (e.includes("disqus-img-cache")) return caches.delete(e);
          if (!e.includes(cacheSuffixVersion)) return caches.delete(e);
        })
      )
    )
  );
});
core.setCacheNameDetails({
  prefix: "dl.186526.xyz",
  suffix: cacheSuffixVersion,
});
core.skipWaiting();
core.clientsClaim();
precaching.cleanupOutdatedCaches();
routing.registerRoute(
  /.*cdn\.jsdelivr\.net/,
  new CacheFirst({
    cacheName: "static-immutable" + cacheSuffixVersion,
    fetchOptions: { mode: "cors", credentials: "omit" },
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      }),
    ],
  })
);
routing.registerRoute(
  /.*i\.186526\.xyz/,
  new CacheFirst({
    cacheName: "static-immutable" + cacheSuffixVersion,
    fetchOptions: { mode: "cors", credentials: "omit" },
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      }),
    ],
  })
);
routing.registerRoute(
  /.*fonts\.googleapis\.com/,
  new CacheFirst({
    cacheName: "static-immutable" + cacheSuffixVersion,
    fetchOptions: { mode: "cors", credentials: "omit" },
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      }),
    ],
  })
);
routing.registerRoute(
  /.*fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: "static-immutable" + cacheSuffixVersion,
    fetchOptions: { mode: "cors", credentials: "omit" },
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      }),
    ],
  })
);
routing.registerRoute("/sw.js", new StaleWhileRevalidate());
routing.registerRoute(
  /\/cdn-sources*/,
  new CacheFirst({
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 3,
      }),
    ],
    cacheName: "Static Sources",
  })
);
routing.registerRoute(
  /\*?preview/,
  new strategies.StaleWhileRevalidate({
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 4,
      }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
    cacheName: "File",
  })
);
routing.registerRoute(/\\\?*/, new workbox.strategies.NetworkOnly());
routing.setDefaultHandler(
  new strategies.StaleWhileRevalidate({
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 4,
      }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
    cacheName: "List",
  })
);
