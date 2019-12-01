/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "6e0191feecb33f70733a1487e656f945"
  },
  {
    "url": "about/index.html",
    "revision": "1f2c7651cc0a4ee112c5215abaa33548"
  },
  {
    "url": "assets/css/0.styles.b5ce2c7d.css",
    "revision": "a8562925d2b80ed9c94937c89147358d"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.413b11b3.js",
    "revision": "176a108e2f6e9538d5adc760d07da35b"
  },
  {
    "url": "assets/js/11.3de5cacb.js",
    "revision": "aff8c03e01a4b4ae321a6fdc165428b8"
  },
  {
    "url": "assets/js/12.e9085bbb.js",
    "revision": "0074975b24dcf8c1fbf0ad5da31ef04e"
  },
  {
    "url": "assets/js/13.b72e8796.js",
    "revision": "6a107b6705a37c0167aaf742864683a2"
  },
  {
    "url": "assets/js/14.a2e0e20a.js",
    "revision": "f5fa5a21bd47a87d3bc5e763a6f77e29"
  },
  {
    "url": "assets/js/15.716c91b1.js",
    "revision": "9028d6d2749e886dab8c372d29bba365"
  },
  {
    "url": "assets/js/16.17be6855.js",
    "revision": "c5866a29b99efb9cfed83c10ab5b0c28"
  },
  {
    "url": "assets/js/17.fc87ffdf.js",
    "revision": "3eb3187336b5d3bd50dbbc112cca08c1"
  },
  {
    "url": "assets/js/18.935c79c2.js",
    "revision": "46f1f55203e081ee0e7ad53b13f0af77"
  },
  {
    "url": "assets/js/19.458b5bd3.js",
    "revision": "143bc29e4c380c12e6d004e4a77f448a"
  },
  {
    "url": "assets/js/2.95d78339.js",
    "revision": "4d0e2310418fe6c452fdcedc6b3cf9e2"
  },
  {
    "url": "assets/js/20.8204409f.js",
    "revision": "02fbbc5d52b1edccb1dd19a6df657a0d"
  },
  {
    "url": "assets/js/21.42c198ce.js",
    "revision": "53931c6eeddbd27c8da0dd03973ed3e4"
  },
  {
    "url": "assets/js/22.db76a9fe.js",
    "revision": "850e51485f6eff654bd8248fee1657d2"
  },
  {
    "url": "assets/js/23.8abf12bf.js",
    "revision": "b2c77b18f7cdf79e45106db67349176d"
  },
  {
    "url": "assets/js/24.9f17d044.js",
    "revision": "a770a72b1c8d238fd564f61ba8ba48b9"
  },
  {
    "url": "assets/js/25.7c83f312.js",
    "revision": "2fe67b4caf7d76342ff2975f1cf63898"
  },
  {
    "url": "assets/js/26.a75dd43a.js",
    "revision": "c50ded5ac0d0cd6b6eb5dca5d37bef5e"
  },
  {
    "url": "assets/js/27.f7682b51.js",
    "revision": "afaeeeebb5267433a04ce61b4d3d2839"
  },
  {
    "url": "assets/js/3.753f14db.js",
    "revision": "8ddbc32b1a38e79dac511b7605c3283a"
  },
  {
    "url": "assets/js/4.27273fae.js",
    "revision": "bda02bea43c94b104caddadee4f5184b"
  },
  {
    "url": "assets/js/5.d0cbf2a2.js",
    "revision": "a959bef381d64587dca00a817df25022"
  },
  {
    "url": "assets/js/6.0a073fb2.js",
    "revision": "24fd89260f82944b2d4050d366b15558"
  },
  {
    "url": "assets/js/7.038da977.js",
    "revision": "618b464d03e6c9f6e6b092feecced65a"
  },
  {
    "url": "assets/js/8.fe66fbfd.js",
    "revision": "85cea57fb9c263abf84eaf078c633a99"
  },
  {
    "url": "assets/js/9.092c4a53.js",
    "revision": "a2a4ea7c1adf21e35ad8b6e30e880cfb"
  },
  {
    "url": "assets/js/app.ade7c8ce.js",
    "revision": "49ff11d53a1cf747022eb84486c44bbd"
  },
  {
    "url": "blog/index.html",
    "revision": "c1b3bad6616224104f8ee7e21a5d80a0"
  },
  {
    "url": "front/HTMLCSS/index.html",
    "revision": "8d833e6f1e772da10804b5c0a1e17fb5"
  },
  {
    "url": "front/HTMLCSS/loading.html",
    "revision": "f80924d3811ab3cb44f418b066ade391"
  },
  {
    "url": "front/HTMLCSS/mixin.html",
    "revision": "78833c1cd3d4ce98d330e1861b9dda13"
  },
  {
    "url": "front/index.html",
    "revision": "e52e9f204bde33369b548d8553e81e21"
  },
  {
    "url": "front/JavaScript/binrayTree.html",
    "revision": "73e1b26054abd40cefc9898cabf080bd"
  },
  {
    "url": "front/JavaScript/gulp_config.html",
    "revision": "e9d03bd0ba13c270978643ae39b65a0b"
  },
  {
    "url": "front/JavaScript/index.html",
    "revision": "444d79e4e523fd30344c365a21f4bb93"
  },
  {
    "url": "front/JavaScript/interview.html",
    "revision": "3d6980d3a88afc452cbc3c09138562b6"
  },
  {
    "url": "front/JavaScript/number.html",
    "revision": "c67c55a18ab240c69653cee7cefa6f82"
  },
  {
    "url": "front/JavaScript/plugins.html",
    "revision": "8fd876a97d4dcb13444b9922efe4fa18"
  },
  {
    "url": "front/JavaScript/promise.html",
    "revision": "8dc51e9a820500bb2d1dbcc0d689126c"
  },
  {
    "url": "front/JavaScript/sort.html",
    "revision": "a6b1e5339e6c4f6e6bcec5eec9019f1c"
  },
  {
    "url": "front/JavaScript/subscribeArray.html",
    "revision": "f2f3fffa4ab0f3bcf18246331df9a9fa"
  },
  {
    "url": "images/front/4441825-83691114260e46e2.jpg",
    "revision": "326db1abc944e774b3dbbe79bb1890c7"
  },
  {
    "url": "images/front/4441825-a35b03613a0c19aa.jpg",
    "revision": "07b7f87ce648c0d80b5ef0443dc3d1f9"
  },
  {
    "url": "images/icons/logo_128x128.png",
    "revision": "12ef348efadbe4513b60248108c1a611"
  },
  {
    "url": "images/icons/logo_256x256.png",
    "revision": "e1f2b7e6e6dbe0bc8f68ad2b53b9dacf"
  },
  {
    "url": "images/icons/logo_36x36.png",
    "revision": "91bd191dbf5e7dd41e23ed5f30d7269e"
  },
  {
    "url": "images/loading/leaf_01.png",
    "revision": "fad46424a075cb09975236ac786f6275"
  },
  {
    "url": "images/loading/leaf_02.png",
    "revision": "e4bcebd23e6e931071131f5046cd56f3"
  },
  {
    "url": "images/loading/right_bottom.png",
    "revision": "db38d89ad0ba33ae0f352155f8c57845"
  },
  {
    "url": "images/loading/top_left_01.png",
    "revision": "2540782dbdcb8469d7f5b730dff122f2"
  },
  {
    "url": "images/loading/top_left_02.png",
    "revision": "72d0b3bb841dfb020f9aa486b6762c36"
  },
  {
    "url": "images/loading/top_left_03.png",
    "revision": "1ec4248417676f557b6c2611d57d4ad6"
  },
  {
    "url": "images/loading/top_left.png",
    "revision": "917a7229fbddfd56fcfb9d6e9d68cdac"
  },
  {
    "url": "index.html",
    "revision": "c20a68aaf1b3319cf16c0b91e4bccc9a"
  },
  {
    "url": "resume/index.html",
    "revision": "948cf40f90cef77a46f11db24a120b18"
  },
  {
    "url": "server/index.html",
    "revision": "2ba69a10a28c63007ad91105b984038f"
  },
  {
    "url": "server/nodejs/index.html",
    "revision": "e84e27f21fbaf4526280fa4619e70060"
  },
  {
    "url": "server/nodejs/request.html",
    "revision": "dc45cede64e6fbac9faa32b1595e0065"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
