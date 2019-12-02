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
    "revision": "c8fb2d557a9c2e6d8cda77a0efc1b11f"
  },
  {
    "url": "about/index.html",
    "revision": "dbc0acaae51bebc95285b695d29fc18b"
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
    "url": "assets/js/10.8d8e0ffa.js",
    "revision": "b20cbb078dad32157647abe5ada25d61"
  },
  {
    "url": "assets/js/11.562dbb59.js",
    "revision": "a7a121ec1c064cb1085cd3fb4ae32fa5"
  },
  {
    "url": "assets/js/12.cd8c7eb7.js",
    "revision": "d3a7cb8b43567e698a100177955432fd"
  },
  {
    "url": "assets/js/13.89d5b5b1.js",
    "revision": "e0a663cf668e682e62f84bbb9fee0881"
  },
  {
    "url": "assets/js/14.f377d550.js",
    "revision": "8bc32256d42ab0c600023852c03e67e8"
  },
  {
    "url": "assets/js/15.9d7c9b3a.js",
    "revision": "a054e11db8dec072967a6664ab307b80"
  },
  {
    "url": "assets/js/16.95fa64cf.js",
    "revision": "336bf1b3c01ab5da2c5ac1f4d5c2d831"
  },
  {
    "url": "assets/js/17.ff95c09d.js",
    "revision": "2b7ef1ec2ec9e442a1746ccb42e403e2"
  },
  {
    "url": "assets/js/18.65c7eb74.js",
    "revision": "ca58423f6e9cc0a258e98b7353a90eff"
  },
  {
    "url": "assets/js/19.af9d5a3d.js",
    "revision": "11937d4a38229d2ea812cd629a93e091"
  },
  {
    "url": "assets/js/2.95d78339.js",
    "revision": "4d0e2310418fe6c452fdcedc6b3cf9e2"
  },
  {
    "url": "assets/js/20.c88ecf25.js",
    "revision": "36e30b28099ce9f310cbe0ea141a6d13"
  },
  {
    "url": "assets/js/21.694edc9a.js",
    "revision": "2d45dedd6f654953a5b1062751285e03"
  },
  {
    "url": "assets/js/22.db76a9fe.js",
    "revision": "850e51485f6eff654bd8248fee1657d2"
  },
  {
    "url": "assets/js/23.c508088d.js",
    "revision": "fec576c6eae6bd02c1774c2d051aa5e4"
  },
  {
    "url": "assets/js/24.d0ba5bc1.js",
    "revision": "807d9a7afb5ac6d27db43368e59e730e"
  },
  {
    "url": "assets/js/25.46248e44.js",
    "revision": "678852e35d786ed1638e84bc05c9e81d"
  },
  {
    "url": "assets/js/26.27d7faff.js",
    "revision": "20c39d137668c8bd51de71a41d634747"
  },
  {
    "url": "assets/js/27.dd33be0b.js",
    "revision": "7a0542eb9971acf711b0148bd3fae8b4"
  },
  {
    "url": "assets/js/28.859f2654.js",
    "revision": "1d84c148b4f1164d5701b37d3c67fe0c"
  },
  {
    "url": "assets/js/29.e62eb9e7.js",
    "revision": "de11a1c8eef286dd39b1e99b1bdb64c3"
  },
  {
    "url": "assets/js/3.fa451c5b.js",
    "revision": "3cf56ebd43f4a090d59e6ea915dfaa0a"
  },
  {
    "url": "assets/js/30.6f7be0a2.js",
    "revision": "5310b31a2dae0038da5cf0dcecc22edd"
  },
  {
    "url": "assets/js/31.a9c8e4d4.js",
    "revision": "79bfee037773c91f2d5f9a4846887d4a"
  },
  {
    "url": "assets/js/32.5b3b6aa4.js",
    "revision": "1d598dc9c9ccc81aff9cf827ff2c58bc"
  },
  {
    "url": "assets/js/33.b55fcbde.js",
    "revision": "8d0fd7642f1ed1ddd0af6e0d3d352d9f"
  },
  {
    "url": "assets/js/4.a33b7501.js",
    "revision": "74a63c44013b0d77c22e1358cd62ac85"
  },
  {
    "url": "assets/js/5.55e7ea90.js",
    "revision": "16b01d0dcbe38154d2bae4a91e3b5052"
  },
  {
    "url": "assets/js/6.883fd9ed.js",
    "revision": "959a0b9ed72de8cf3fdd95d804fb7978"
  },
  {
    "url": "assets/js/7.18cf05cf.js",
    "revision": "b6b3be4fe637e224baf9e2a394d86e48"
  },
  {
    "url": "assets/js/8.031e04f9.js",
    "revision": "ad26ffb4b5525441248dc3ffbd5305dc"
  },
  {
    "url": "assets/js/9.a45a3a59.js",
    "revision": "f80db59c74879f70910fc0bb68adf2e8"
  },
  {
    "url": "assets/js/app.a6a1697c.js",
    "revision": "5a7e112e93d351787e22241eaff780d4"
  },
  {
    "url": "blog/index.html",
    "revision": "04964b52e22b74c337e33b095dfe4485"
  },
  {
    "url": "front/angular/index.html",
    "revision": "72fa7723a8221be3a4851241503bbc3d"
  },
  {
    "url": "front/angular/ionicDemo.html",
    "revision": "1e2cc0431a3bcfde2ca6c56545814f40"
  },
  {
    "url": "front/angular/ionicEnvironment.html",
    "revision": "18771a9b3cf12027f539f4215665728d"
  },
  {
    "url": "front/HTMLCSS/index.html",
    "revision": "4855e912fdf729b4ac5177932ef8d0ed"
  },
  {
    "url": "front/HTMLCSS/loading.html",
    "revision": "df0d0d9360df2f7f3e5290e7b76d0a88"
  },
  {
    "url": "front/HTMLCSS/mixin.html",
    "revision": "3d5d454a315d870b02b0fb3dd5e5c8c1"
  },
  {
    "url": "front/index.html",
    "revision": "adaa4ea38a4e272ab66813c568598318"
  },
  {
    "url": "front/JavaScript/binrayTree.html",
    "revision": "71ef1d0119d12d0dad7f532682820815"
  },
  {
    "url": "front/JavaScript/gulp_config.html",
    "revision": "7f783c749dfb5aac2eedfd32f6d65e72"
  },
  {
    "url": "front/JavaScript/index.html",
    "revision": "74cf77ae154647748cd3b85c42d4fd11"
  },
  {
    "url": "front/JavaScript/interview.html",
    "revision": "13976568eaffb72e1caabbc3dc32a28a"
  },
  {
    "url": "front/JavaScript/number.html",
    "revision": "b116cd45f3241cee91f8685e7b673eb4"
  },
  {
    "url": "front/JavaScript/plugins.html",
    "revision": "26f612d81c9f91d54335cbd4a959ec91"
  },
  {
    "url": "front/JavaScript/promise.html",
    "revision": "5b3abedb75744ba64ae074f6bdde8f48"
  },
  {
    "url": "front/JavaScript/sort.html",
    "revision": "98292fdbfeb4a9c993dd7f4ec3ef3952"
  },
  {
    "url": "front/JavaScript/subscribeArray.html",
    "revision": "a876251bf7c79bb4df7864f8a0ebfad3"
  },
  {
    "url": "front/react/index.html",
    "revision": "d7c6f6581023ef6703edb887fd855d56"
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
    "url": "images/front/angular_blog.png",
    "revision": "eee6b3156aa2b8bd7de9e54d5297d0b1"
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
    "url": "images/ionic/01.png",
    "revision": "a4e00a5adb69ed5c160517c0d39bd1be"
  },
  {
    "url": "images/ionic/02.png",
    "revision": "9368ac6cc5f7f701a027ba1b7c4192e2"
  },
  {
    "url": "images/ionic/03.png",
    "revision": "c4a75c41557e0837fd27f6ed1cf29ce7"
  },
  {
    "url": "images/ionic/04.png",
    "revision": "fae95ae013d37d0f998ba62e3898b005"
  },
  {
    "url": "images/ionic/05.png",
    "revision": "b5ea57ca218a68d980b27b0e45e8023e"
  },
  {
    "url": "images/ionic/06.png",
    "revision": "c5ddc41d4195b03896475b1ee864295a"
  },
  {
    "url": "images/ionic/07.png",
    "revision": "dad014d87d01e68581cb5bcc729db3e9"
  },
  {
    "url": "images/ionic/08.png",
    "revision": "3405f8550ecb101c3cf513436a09a4ae"
  },
  {
    "url": "images/ionic/09.png",
    "revision": "3d6f7765e7d446ae41a99c304cb95922"
  },
  {
    "url": "images/life.jpg",
    "revision": "e6f49b0a12a6a1e324c36dc3ef2be76b"
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
    "revision": "e991bd2a32adee23bc9da36df075a520"
  },
  {
    "url": "life/index.html",
    "revision": "5cc0f26c56823565ed1bc45e1a1edcb9"
  },
  {
    "url": "resume/index.html",
    "revision": "b97a8f8d18f7d9c29fa98b191b47a051"
  },
  {
    "url": "server/index.html",
    "revision": "1e7faf0d723e1dd658882ba09fc9c447"
  },
  {
    "url": "server/nodejs/12306.html",
    "revision": "77acca94b29261498d6d28d36cecb370"
  },
  {
    "url": "server/nodejs/index.html",
    "revision": "fc18e569b078ed93c35fb4369ad540aa"
  },
  {
    "url": "server/nodejs/request.html",
    "revision": "ed5400d83556fdb89735028e429b58a4"
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
