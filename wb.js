// workbox 2.x 是将 workbox 核心内容放在 workbox-sw node_modules 包里维护的
// workbox 3.x 开始是将 workbox 核心 lib 放在 CDN 维护
// 当然也可以挪到自己的 CDN 维护
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-alpha.3/workbox-sw.js');

if (workbox) {
  console.log(`Yay! workbox is loaded 🎉`);

  workbox.routing.registerRoute(
    new RegExp('.*\.html'),
    workbox.strategies.networkFirst()
  );

  workbox.routing.registerRoute(
    new RegExp('.*\.(?:js|css)'),
    workbox.strategies.cacheFirst()
  );

  workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif)/g,
    new workbox.strategies.CacheFirst({
      cacheName: 'my-image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60, // 最大的缓存数，超过之后则走 LRU 策略清除最老最少使用缓存
          maxAgeSeconds: 30 * 24 * 60 * 60, // 这只最长缓存时间为 30 天
        })
      ]
    })
  );
} else {
  console.log(`Boo! workbox didn't load 😬`);
}
