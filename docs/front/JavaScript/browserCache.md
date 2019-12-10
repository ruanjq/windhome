---
title: 浏览器缓存原理
lang: zh-CN
---

# 浏览器的缓存原理


## 什么是缓存
浏览器的缓存：简单来说就是将已经请求下载过的资源文件备份一份到客户端本地，当再次请求资源的时候从客户端本地读取，不再通过网络请求服务端获取。


## 缓存的作用
- 减少网络传输的损耗
- 降低服务器压力
- 提升客户端用户体验


## 常见的缓存方式
**常见的浏览器缓存方式**
- Service Worker
- Memory Cache
- Disk Cache
- Push Cache


### Service Worker
`Services Work` 是`HTML5` 的一个API 标准，它独立运行于浏览器的一个单一线程，主要用来做持久的离线缓存，可以处理客户端与服务端的请求的代理拦截。
js 多线程还有一项技术 WebWorker,它和WebWork 相比


**相同点**
- 独立于JS主线程的运行环境
- 无法操作DOM, 通过`postMessage` 接口江数据发送给js主线程
- 不会阻塞 JS 主线程的代码运行

**区别点**
- Service Worker 是浏览器中的一个进程，而不是线程，它存在于浏览器全局运行环境中
- `Service Worker` 是一项持久化的技术,只要不清空浏览器缓存,`Service Worker` 缓存就不会被销毁
- `Web Worker` 是临时的,页面刷新线程内的操作就会被销毁，又得重新执行一遍
- 出于安全考虑, `Service Worker` 只能运行与localhost 或者HTTPS 的环境
- `Service Worker` 内部API大都采用 `Promise` 封装的

**使用方式**
- 注册 sw.js 文件
```javascript
if('serviceWorker' in window.navigator){
    navigator.serviceWorker.register("./sw.js",{scope:"./"}).then(registration => {

    })
}
```

- 页面通信
```javascript
// sw.js
this.addEventListener("message",function(event){
    event.source.postMessage("this message is from sw.js,to page");
});

// index.js
navigator.serviceWorker.addEventListener("message",function(e){
    console.log(e.data); // this message is from sw.js,to page
});
```

### Memory Cache
`Memory Cache` 表示内存中的缓存，其特点是`容量小,读取高效,持续性短`,会随着进程释放而释放.所以在内存使用率低，缓存小尺寸资源时候,会优先以`Memory Cache` 为有限，否则使用`Disk Cache`

### Disk Cache
`Disk Cache` 即磁盘中的缓存，特点是`容量大,读取缓慢，持续性长`

### Push Cache
`Push Cache` 是HTTP2.0中的内容,缓存时间也很短暂,只在会话(Session)中存在，一旦会话结束就会被释放。


## 缓存策略
浏览器每次向服务器发起`HTTP`请求获得资源后,会根据不同情况(Service Worker、Push Cache 、HTTP Header 的缓存标识字段) 将资源缓存起来。
浏览器缓存策略分为`强制缓存`和`协商缓存`,通过设置HTTP Header 来实现。

### 强制缓存
当浏览器发起 `HTTP` 请求时,会依次查找上述缓存位置中是否存在缓存资源并通过缓存标识字段`Expires`或`Cache-Control` 来验证缓存资源是否过期.
- Expires 是服务端在响应请求时候规定资源的失效时间
- Cache-Control 表示服务端在响应请求时候规定资源是否需要被缓存以及缓存的有效时间。
![浏览器缓存策略](/images/front/cache1.png "浏览器缓存策略")

**Cache-Control 主要参数如下**
![浏览器缓存策略](/images/front/cache2.png "浏览器缓存策略")

**Cache-Control 和 Expires 的区别**
- Expires 是HTTP1.0的字段,Cache-Control 是HTTP1.1的字段
- Cache-Control 优先级高于Expires，单位为秒

::: danger
若是命中缓存(即存在缓存资源并且缓存未过期),则浏览器响应状态码为200时候,直接使用缓存资源作为返回结果,不在发起HTTP 请求,若存在缓存资源并且缓存已过期,则进入`协商缓存`
:::

### 协商缓存
协商缓存采用HTTP Header中的 `Last-Modified` 和 `Etag` 字段控制

![浏览器缓存策略](/images/front/cache3.png "浏览器缓存策略")

- `Last-Modified` 是服务端响应请求时用来说明资源的最后修改时间，与之对应的是`If-Modified-Since`字段，在协商缓存过程中,HTTP 请求Header 中会带上`If—Modified-Since` 字段,值为`Last-Modified`。

- 当服务端接受到带有`If-Modified-Since`,会将`If-Modified-Since`的值与请求资源的最后修改时间做对比,如果相同，则说明资源没有被修改，此时 HTTP 响应给客户端的状态码 `HTTP Status Code 304(Not Modified)`,浏览器继续使用缓存资源,如果最后修改时间比较新,则返回最新修改的资源,响应状态码 `HTTP Status Code 200` 更新`Last-Modified` 的值

- `Etag` 是服务端在响应请求时用来说明资源的唯一标识。与之对应的是`If-None—Match`字段，在协商缓存中,浏览器发送HTTP 请求Header 中会带上`If-None-Match` 字段，值为 `Etag`属性的值

- 当服务端接受到带有 `If-None-Match` 字段的值,会将值与请求对应的资源唯一标识对比，如果结果相同,说明资源没有新的修改,则返回 `HTTP Status Code 304`,浏览器继续使用缓存资源,如果不相同,则说明被修改, `HTTP Status Code 200`,返回最新资源, 更新`Etag` 的值。

**Last-Modified 和 Etag 的区别**
- Last-Modified 属于HTTP1.0的字段,而Etag是HTTP1.1的字段
- 当 Last-Modified 和 Etag 同时存在时,Etag 的优先级要高于 Last-Modified

::: tip
**Etag 的出现主要是为了解决Last-Modified 存在的问题**
- Last-Modified 标注的修改时间只能精确到秒,如果文件在1s中修改多次，它将不能准确标注文件的最后修改时间
- 如果打开本地缓存文件,即时没有对文件进行修改,但是Last-Modified却改变了，导致文件无法使用缓存
:::


## 流程图
![浏览器缓存策略](/images/front/cache4.png "浏览器缓存策略")


## 解决方案
- 1：使用构建工具(webpack、gulp)在静态资源路径后面添加版本标识参数：如 xxx/dist/index.js?v=34n45js9
- 2: 使用构建工具打包的时候将文件名以hash值方式命名，如果文件名有修改，打包编译后文件名每次都会修改