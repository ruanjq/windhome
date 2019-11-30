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
    "revision": "9e5c527c5edcbcd8846e2d643b3668c0"
  },
  {
    "url": "about/index.html",
    "revision": "20447b037e09276fa48abf03e0c73a5a"
  },
  {
    "url": "assets/css/0.styles.7b09acb8.css",
    "revision": "94b3561ecce952fabad14ba933533396"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.74b1efeb.js",
    "revision": "65848e140d5faea72c92980dc871831a"
  },
  {
    "url": "assets/js/11.e2a1e2cb.js",
    "revision": "5eab3fb2a03a3f8b77dec8d4430d9ba3"
  },
  {
    "url": "assets/js/12.2a1e6baa.js",
    "revision": "08d1e2a969b2e61c4911a24635a92a75"
  },
  {
    "url": "assets/js/13.07f56c72.js",
    "revision": "e0a4d12205bd9eb2e439f2722cc529be"
  },
  {
    "url": "assets/js/14.7f8c7eb5.js",
    "revision": "54227da9995456be99e5c6b6d29abe0d"
  },
  {
    "url": "assets/js/15.9d5251f0.js",
    "revision": "213471679f6c1903813efeaad147e591"
  },
  {
    "url": "assets/js/16.4cfcd66d.js",
    "revision": "4f94b08c8b55e121fbc65322173a489f"
  },
  {
    "url": "assets/js/17.ccf85d0e.js",
    "revision": "f3a2c0cd7bdeedfef25bf73071e6ac4d"
  },
  {
    "url": "assets/js/18.369d6e4e.js",
    "revision": "522450f9f3543f7fb4680b89cda9b796"
  },
  {
    "url": "assets/js/19.0eab6e7a.js",
    "revision": "268083bd046e0173773ec5ee0ac2da61"
  },
  {
    "url": "assets/js/2.afa07bce.js",
    "revision": "4ebbf6dfb00947010a9371f17d940bd9"
  },
  {
    "url": "assets/js/20.8ca7d1cd.js",
    "revision": "f43c1a36ba1477b99f69594b2c096a03"
  },
  {
    "url": "assets/js/3.24bf461f.js",
    "revision": "4743ee20a1880eaaa8f7dfc234b10b34"
  },
  {
    "url": "assets/js/4.60ab305a.js",
    "revision": "8bd0ef4ea3133913677bab0c5661c1ad"
  },
  {
    "url": "assets/js/5.08572364.js",
    "revision": "1e29b328955555619eef364612737dda"
  },
  {
    "url": "assets/js/6.f4f84f28.js",
    "revision": "0b5fe6b82e93ec773e7d7939d993232f"
  },
  {
    "url": "assets/js/7.d1e44a03.js",
    "revision": "d8b79741a8296003ce54c6907292aae8"
  },
  {
    "url": "assets/js/8.d890b8fa.js",
    "revision": "de6999667c3c7ca48d2ffa201ca1988c"
  },
  {
    "url": "assets/js/9.fbc06794.js",
    "revision": "8ca1a8c41e03c8462415b45a87bbf4e5"
  },
  {
    "url": "assets/js/app.cbbf1717.js",
    "revision": "b42131f6f5c2944456144536e13d72e1"
  },
  {
    "url": "blog/index.html",
    "revision": "4600139bd63e6dafdd092794bc8e2bae"
  },
  {
    "url": "front/index.html",
    "revision": "78585e9a89841601cdd50e4cdd775069"
  },
  {
    "url": "front/JavaScript/gulp_config.html",
    "revision": "8d6e658c2a1438ca1b6c5f7cf264636d"
  },
  {
    "url": "front/JavaScript/index.html",
    "revision": "626a2485fb4dd2c3a567e65aaa71d806"
  },
  {
    "url": "front/JavaScript/interview.html",
    "revision": "bfe57e1620f27cd16299a4c1514dbf8a"
  },
  {
    "url": "front/JavaScript/plugins.html",
    "revision": "cc598cd0c796d10580b78574d94b1bc7"
  },
  {
    "url": "front/JavaScript/promise.html",
    "revision": "29b01511458afacf9760add450999239"
  },
  {
    "url": "front/JavaScript/sort.html",
    "revision": "e487491ef154a9269f59f6b5ce727ed6"
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
    "revision": "4f380d194f761509922761552d79e512"
  },
  {
    "url": "resume/index.html",
    "revision": "71131fbbc94a146f0d0d997d1ba629b0"
  },
  {
    "url": "server/index.html",
    "revision": "c4a9d5b33aedf74e6e17fb4e6c6c3c93"
  },
  {
    "url": "server/nodejs/index.html",
    "revision": "c34fa83f6810b9fdbee01db6a69f8d61"
  },
  {
    "url": "server/nodejs/request.html",
    "revision": "612c002ec2986985c4694e206ab78dfd"
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
