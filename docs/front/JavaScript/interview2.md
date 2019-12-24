---
title: 前端常见的面试题(二)
lang: zh-CN
---


# 前端常见的面试题(二)

## 实现一个极简的模板引擎
实现render函数,返回符合预期

```javascript
render("我是{{name}},年龄{{age}}",{
    name:"Beliver",
    age:18
})

// 输出 我是Believer,年龄18

// 思路,使用正则表达式匹配,正则表达式默认使是贪婪模式,如果实现惰性匹配,则需要在量词后面添加?符号即可
// 如果使用了贪婪模式,会匹配到最后一个}}，而不是第一个结束的}}
function render(tpl,data){
    return tpl.replace(/\{\{(.+?)\}\}/g,function($1,$2){
        // $1 表示匹配的字符结果,$2 表示匹配括号内的关键词
        return data[$2];
    });
}
```

## 浏览器Eventloop 和 Node.js 中的事件循环有什么区别
- 浏览器的事件循环机制是基于HTML5 规范，Node.js 事件循环是基于 libuv 库实现的

- Node.js 事件循环有6个阶段，分别为,`timers`、`I/O callbacks`、`idle`、`perpare`、`poll 轮询`、`check`、`close callbacks`
- 相比浏览器,`Node.js` 多了 `setImmediate(宏任务)` 和 `process.nextTick(微任务这两种异步操作)`

- 在浏览器中,`微任务队列`是在每个`宏任务`执行完成之后执行，而在Node.js 中,`微任务`在事件循环的各个阶段之间执行,也就是一个阶段执行完毕，就会去执行微任务队列


## 网络协议分层模型
- OSI 7层模型: (应用层，表示层，会话层，传输层，网络层，数据链路层，物理层)
- TCP/IP 4层模型：（应用层，传输层，网络层，数据链路层）
 

## TCP 特性
- `TCP` 是一种面向连接的单播协议,在发送数据前，通信双方必须建立在彼此的一条链接上
- 在一个`TCP`连接中,仅有两方进行彼此通信，广播和多播不能用于TCP
- TCP 并不能保证数据一定会被对方接受到

## TCP/IP 三次握手
所谓三次握手`(Three-way Handshake)`是指建立一个TCP连接时，需要客户端和服务端总共发送3个包。

【三次握手的目的】
- 确认客户端和服务端,接受数据和发送数据的能力是否正常
- 指定自己的初始化序列号,为后面的可靠传送做准备
- 如果是HTTPS协议的话,三次握手过程海慧进行数字证书的校验以及加密密钥的生成。

【三次握手流程】
- 第一次握手: 客户端给服务端发送一个`SYN`报文,并指明客户端的初始化序列号(ISN). 此时客户端处于`SYN_SEND`状态.（Synchronize Sequence Numbers）

- 第二次握手：服务端收到`SYN`报文之后,会以自己的`SYN`作为应答，并指定自己的初始化序列号ISN,同时会把客户端的`ISN+1`作为`ACK`的值，表示已经收到了客户端的`SYN`，此时服务器处于`SYN_REVD`的状态

- 第三次握手,客户端收到`SYN`报文后,会发送一个`ACK`报文,当然,也是一样把服务器的`ISN+1`作为`ACK`的值，表示已经收到了服务端的`SYN`报文,此时客户端处于`ESTABLISHED` 状态

- 服务器收到ACK 报文之后,也处于`ESTABLISHED` 状态，此时，双方建立链接，TCP握手结束

![三次握手流程](https://raw.githubusercontent.com/HIT-Alibaba/interview/master/img/tcp-connection-made-three-way-handshake.png "三次握手流程")


## 用ES3实现一个bind函数
```javascript
Function.prototype.myBind = function(){
    var _self = this;
    var argumentsWrap = arguments;
    return function(){
        var args = [].slice.apply(argumentsWrap,[1]);
        return _self.apply(argumentsWrap[0],args);
    }
}


//调用方式
var name = "bb";
var test = {
    name:"aa",
    say:function(){
        console.log(this.name);
    }
}

var s = test.say.myBind(window);
s(); // bb
```

## 用ES3实现一个apply 函数
```javascript
Function.prototype.myApply = function(){
    var args = [];
    var ctx = arguments[0] || window;
    ctx.__fn__ = this;

    // 难点解析 - 接受不定长参数,使用 eval 传递参数执行
    for(var i = 1; i < arguments.length; i++){
        args.push("arguments["+i+"]");
    }
    var result = eval('ctx.__fn__('+args+')');
    delete ctx.__fn__;
    return result;

}

//调用方式
var name = "bb";
var test = {
    name:"aa",
    say:function(){
        console.log(this.name);
    }
}

test.say.myApply(window);   //  b 

```



## 将一个ts代码实现的继承，其中有私有属性和静态属性，请用es5来实现它，
```javascript
(function(){
    
    function Animal(){
        // 私有属性
        var color = "黄色";
        this.name = "动物";
        this.makeSound = function(sound){
            console.log(sound);
        }
    }

    Animal.prototype.running = function(){
        console.log(this.name,"奔跑中");
    }

    // 静态属性
    Animal.weight = "30kg";


    // 继承方式1，构造函数绑定
    function Cat(){
        this.name = "小猫咪";
        // 构造函数继承不能访问 父类 prototype的属性和方法
        Animal.apply(this,arguments);
    }

    var c = new Cat();
    c.makeSound("喵喵喵");
    // c.running();  报错，无法访问
    console.log(Cat.weight);


    // 继承方式2 prototype 模式(常见)
    function Dog(){
        this.name = "大毛";
    }

    Dog.prototype = new Animal();
    Dog.prototype.constructor = Dog;

    var dog = new Dog();
    dog.running();
    dog.makeSound("汪汪汪")

})();

```


## 手动封装一个jsonp函数，要求能支持百万并发
```javascript
function jsonp(params){
    var url = params.url;
    var data = params.data;
    var callbackId = "callbck"+Date.now();
    var scriptNode = null;
    return new Promise(function(resolve,reject){
        var qs = /\?/g.test(url) ? "&" : "?";
        for(var key in data){
            qs += (key + "=" + data[key]) + "&";
        }
        url += qs;
        url += "callback=" + callbackId;
        scriptNode = createScript(url);

        scriptNode.addEventListener("error",function(){
            reject();
        });

        window[callbackId] = function(result){
            resolve(result);
            delete window.callbackId;
            scriptNode.remove();
        }

        function createScript(url){
            var script = document.createElement("script");
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
            return script;
        }
    });
}

jsonp({
    url:"https://www.baidu.com",
    data:{
        a:"1",
        b:"2"
    }
}).then(function(res){
    console.log(res);
});
```



## 用node实现一个CORS的中间件
```javascript
app.use((req, res) => {
    res.header('Access-Control-Allow-Origin','*');//设置跨域需要的响应头。
})
```



这是第一轮笔试题。第二轮，根据你的简历，开始问源码，用过vuex，就问他怎么实现的？问的很深的那种！还有网络安全，tcp的原理是什么，怎么实现的等。