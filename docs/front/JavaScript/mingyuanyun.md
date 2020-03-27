---
title: 明源云Web前端面试题
lang: zh-CN
---


# 明源云Web前端面试题



## 第一题
```html
<pre>
怎样让(a===1 && a===2 && a===3)的值为true?
if(a === 1 && a === 2 && a === 3){
    console.log("hahahahha);
}
</pre>
<script>
    var a = {
        val:[1,2,3]
        toString:function(){
            return this.val.shift();
        }
    }
</script>
```

## 第二题
```javascript
// This 对象的理解
var User = {
    count:1,
    getCount:function(){
        return this.count;
    }
}
console.log(User.getCount()); // what?
var func = User.getCount;
console.log(func());  // what?

// 第一个输出结果为1
// 第二个输出结果为undefined
```

## 第三题
```html
<pre>
如何解决跨域问题?

1:使用第三方服务器做代理，如：Nginx
2:使用jsonp 跨域访问
3:使用iframes访问，然后再通过PostMessage 消息传递
4:服务端设置响应头部字段，Access-Control-Allow-Origin 为目标域名或者为*
</pre>
```

## 第四题
<pre>
如何设置浏览器缓存与不缓存两种。

缓存：
HTTP1.0 header响应头部设置Expires缓存时间
HTTP1.1 header响应头部设置 Cache-Control 为Max-Age:3000ms,单位为毫秒

不缓存
HTTP1.0 header 响应头部设置Expires 设置为0
HTTP1.1 header 设置Cache-Control 为no-store
</pre>

## 第五题
```javascript
// 实现一个函数clone，可以对JavaScript中的5种主要数据类型进行值复制

function clone(obj){
    let result = Array.isArray(obj) ? [] : {};
    for(let key in obj){
        let val = obj[key]
        if(typeof val === "object"){
            result[key] = clone(val);
        }else{
            result[key] = val;
        }
    }
    return result;
}   
```