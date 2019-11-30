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
    "revision": "4ae0f2dbe7f5ddb4c520e1c859b4fc94"
  },
  {
    "url": "about/index.html",
    "revision": "7039b84dd9bc1078528deaea1e02cdcb"
  },
  {
    "url": "assets/css/0.styles.f1e9e868.css",
    "revision": "a2dc1e5dc535f569908cc51f6ee16e74"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.34d46fba.js",
    "revision": "3cd1acaac561fbb214210b0438ba1649"
  },
  {
    "url": "assets/js/11.562dbb59.js",
    "revision": "a7a121ec1c064cb1085cd3fb4ae32fa5"
  },
  {
    "url": "assets/js/12.c5165c8d.js",
    "revision": "f5c68e9984632a76abf830d132761f1f"
  },
  {
    "url": "assets/js/13.0bbcc8f6.js",
    "revision": "9da7a7430c76733a20072ce3b9dffd8b"
  },
  {
    "url": "assets/js/14.d08d4209.js",
    "revision": "47b902ce7b34a85171020016305368f0"
  },
  {
    "url": "assets/js/15.06ef5206.js",
    "revision": "76657773417d153e39987481c4d6f8e7"
  },
  {
    "url": "assets/js/16.17be6855.js",
    "revision": "c5866a29b99efb9cfed83c10ab5b0c28"
  },
  {
    "url": "assets/js/17.e25bf4d7.js",
    "revision": "43f8f09f29468c20378e5abc318b29f4"
  },
  {
    "url": "assets/js/18.b1e3621f.js",
    "revision": "b2ca9e6b3d4757948a60680e8c2068a4"
  },
  {
    "url": "assets/js/19.ea568e46.js",
    "revision": "f01300bea42fd6f7437ecfbcb8c54e8d"
  },
  {
    "url": "assets/js/2.95d78339.js",
    "revision": "4d0e2310418fe6c452fdcedc6b3cf9e2"
  },
  {
    "url": "assets/js/20.d21609a2.js",
    "revision": "abce970fa926518c75802e5d39694646"
  },
  {
    "url": "assets/js/21.dcb3dce9.js",
    "revision": "b15e11167b2eda28ef64bc3a8dd32a82"
  },
  {
    "url": "assets/js/22.2196377e.js",
    "revision": "afd3c6352d446d99ec3629095169bc45"
  },
  {
    "url": "assets/js/23.9afa2d49.js",
    "revision": "74acd1c91274c1390c98647f126e10ae"
  },
  {
    "url": "assets/js/24.94d90030.js",
    "revision": "385ef06ae0c7bd303a0b4a4976af3cc4"
  },
  {
    "url": "assets/js/25.eee1a6b4.js",
    "revision": "a06aced4b864bc0544e95a21f0eb8884"
  },
  {
    "url": "assets/js/26.20ec517e.js",
    "revision": "b870c4843d6f0be88b592f48276fadbc"
  },
  {
    "url": "assets/js/3.52ffc598.js",
    "revision": "adedf55830fd757b84e4fc49b5983a1f"
  },
  {
    "url": "assets/js/4.8b0169bb.js",
    "revision": "4513fd9ce8ec2f6e21408ea72d4db8c7"
  },
  {
    "url": "assets/js/5.784ad048.js",
    "revision": "861d177d815becf935c2ac0ddad4e576"
  },
  {
    "url": "assets/js/6.0a073fb2.js",
    "revision": "24fd89260f82944b2d4050d366b15558"
  },
  {
    "url": "assets/js/7.04fc8b7b.js",
    "revision": "2c4907acc5d2aa87da7166292b5b0cbe"
  },
  {
    "url": "assets/js/8.6f4fbbda.js",
    "revision": "75ac0158a0703e8f4c95a4561a7179e2"
  },
  {
    "url": "assets/js/9.b43be6e9.js",
    "revision": "b131f70d23f661e889dac571b7e65d31"
  },
  {
    "url": "assets/js/app.7f10cb63.js",
    "revision": "d4b7b3f14a97c620fb13e8439f9c0cfe"
  },
  {
    "url": "blog/index.html",
    "revision": "b4b85b08d35399c17cb26378c3767bc6"
  },
  {
    "url": "front/HTMLCSS/index.html",
    "revision": "96440a4dcbe19caca2aac7c240c916c6"
  },
  {
    "url": "front/HTMLCSS/loading.html",
    "revision": "50da5d8f8cc53093fa24c4d6be3fd370"
  },
  {
    "url": "front/HTMLCSS/mixin.html",
    "revision": "f9a523f2f159b219f62b278d21425ac6"
  },
  {
    "url": "front/index.html",
    "revision": "0de4f24ffbc1e488951d2f03adb54211"
  },
  {
    "url": "front/JavaScript/binrayTree.html",
    "revision": "e828cf17cd975eaa874606fe262a856d"
  },
  {
    "url": "front/JavaScript/gulp_config.html",
    "revision": "47c581e1dca63216cacb22ed43272b1a"
  },
  {
    "url": "front/JavaScript/index.html",
    "revision": "8d2f988f80789b2ecb0eeb061fc91e08"
  },
  {
    "url": "front/JavaScript/interview.html",
    "revision": "6341f47d3fe5055a4db93a0822ce95d5"
  },
  {
    "url": "front/JavaScript/number.html",
    "revision": "54a958597ffe16e2061528cb0dcfc5e0"
  },
  {
    "url": "front/JavaScript/plugins.html",
    "revision": "cff7f68cc3849389fabcad9557646a3b"
  },
  {
    "url": "front/JavaScript/promise.html",
    "revision": "e2fd6273703e281ea381d42d31a8abb9"
  },
  {
    "url": "front/JavaScript/sort.html",
    "revision": "9d021b609a358fe7fc2963ddc44af3ea"
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
    "revision": "8c57bf83034463b2f0a34659d24fb06e"
  },
  {
    "url": "resume/index.html",
    "revision": "503eb62e39cbc45ac4c33ee65cf5a771"
  },
  {
    "url": "server/index.html",
    "revision": "3d204aa34ab8ca0a08bea9741d33acdf"
  },
  {
    "url": "server/nodejs/index.html",
    "revision": "1d12dd37694807e8bfd6ab17c30fa049"
  },
  {
    "url": "server/nodejs/request.html",
    "revision": "05bcc7766a0d91b0d24c76c46e07a06a"
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
