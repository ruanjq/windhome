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
    "revision": "e830f7c5b54a3c3a7cdeddba8880110b"
  },
  {
    "url": "about/index.html",
    "revision": "ba4dd7875f85f1bb000fb0644d50699f"
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
    "url": "assets/js/10.b4e4654c.js",
    "revision": "90820f994b4ddcc2902d9c279822ca1d"
  },
  {
    "url": "assets/js/11.d079a6c7.js",
    "revision": "798a792fa07f86a605bb20f505b05e88"
  },
  {
    "url": "assets/js/12.60ffc9ad.js",
    "revision": "c38375fe1369d71352d3cc2c8fd6cc86"
  },
  {
    "url": "assets/js/13.34afe5d6.js",
    "revision": "9fdf69b15052007ad9737991fed49794"
  },
  {
    "url": "assets/js/14.d371ab2b.js",
    "revision": "084811a01c4c5816e7ea9f41bc7c4fd6"
  },
  {
    "url": "assets/js/15.e6b13f1f.js",
    "revision": "a618664e412311fc88420a7d82f709f7"
  },
  {
    "url": "assets/js/16.24c70772.js",
    "revision": "e90f2a5fae3501ef88f43339040f0952"
  },
  {
    "url": "assets/js/17.a07d4707.js",
    "revision": "ed4218131eacad96fb55a4760539d13b"
  },
  {
    "url": "assets/js/18.ad3b352b.js",
    "revision": "b54b6e9ff7c2306f22a4bd4c1240f06e"
  },
  {
    "url": "assets/js/19.d2753181.js",
    "revision": "13ef838f8d9c590ccb14f04b81eae49e"
  },
  {
    "url": "assets/js/2.afa07bce.js",
    "revision": "4ebbf6dfb00947010a9371f17d940bd9"
  },
  {
    "url": "assets/js/20.325c811c.js",
    "revision": "ce4a4d6abd5b1a95738f2aa9416750fd"
  },
  {
    "url": "assets/js/21.881d385c.js",
    "revision": "d25ade154ec657eddf92e949ad242288"
  },
  {
    "url": "assets/js/22.ff86084a.js",
    "revision": "043f2730849b6632664c8985385f707a"
  },
  {
    "url": "assets/js/3.24bf461f.js",
    "revision": "4743ee20a1880eaaa8f7dfc234b10b34"
  },
  {
    "url": "assets/js/4.99c0aa16.js",
    "revision": "3bd09bd9aebaddaca0440d85be64356b"
  },
  {
    "url": "assets/js/5.08572364.js",
    "revision": "1e29b328955555619eef364612737dda"
  },
  {
    "url": "assets/js/6.3fe5af81.js",
    "revision": "7bfaee9d1e18b94d59343c9cb716b9b4"
  },
  {
    "url": "assets/js/7.6b325a93.js",
    "revision": "5df8c20d5da7f49732191bd948c7b9fe"
  },
  {
    "url": "assets/js/8.dcdf6597.js",
    "revision": "72067139b9005ec597d885d34b773d08"
  },
  {
    "url": "assets/js/9.81de2957.js",
    "revision": "4f753346de1adaa8fc454a2f04110121"
  },
  {
    "url": "assets/js/app.45aecf7c.js",
    "revision": "ce4816d08cc4217a0a1b6f5f6f2ec18d"
  },
  {
    "url": "blog/index.html",
    "revision": "6286d88bad55637372cd2ce0d9b6d64a"
  },
  {
    "url": "front/index.html",
    "revision": "93b6892a5185298a602e8cb55ab83cba"
  },
  {
    "url": "front/JavaScript/binrayTree.html",
    "revision": "3c20690076505c2c708138ca1ff99c3d"
  },
  {
    "url": "front/JavaScript/gulp_config.html",
    "revision": "d58f03058e36fa6f8c9ba8781d6f13c1"
  },
  {
    "url": "front/JavaScript/index.html",
    "revision": "8df39b6b7cb9e0160ecee68ce83c7ac9"
  },
  {
    "url": "front/JavaScript/interview.html",
    "revision": "f3cba74a074c297b71269482d1d9e947"
  },
  {
    "url": "front/JavaScript/number.html",
    "revision": "407a2e658afdfb4b112ac930c9ccbe50"
  },
  {
    "url": "front/JavaScript/plugins.html",
    "revision": "7230e4a99d7933b62e05b2955fff8c4d"
  },
  {
    "url": "front/JavaScript/promise.html",
    "revision": "d19b321ee5ffc2f6359c4d79dae5b434"
  },
  {
    "url": "front/JavaScript/sort.html",
    "revision": "8aa34e3532d93c3a226904f3b13cf3c9"
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
    "revision": "4f8e5273bc75db1c3644c37c1f927ba9"
  },
  {
    "url": "resume/index.html",
    "revision": "50219347f0297293f5c8c6efd8c46239"
  },
  {
    "url": "server/index.html",
    "revision": "07635e2493292c4241ece0a3b925e7ce"
  },
  {
    "url": "server/nodejs/index.html",
    "revision": "e2dea208a8c54d3a6d2bfd777d5642fb"
  },
  {
    "url": "server/nodejs/request.html",
    "revision": "ef1d0291d6fa9113a750845b8eff9e44"
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
