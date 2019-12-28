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
- 第一次握手: 客户端给服务端发送一个`SYN`报文,并指明客户端的初始化序列号(ISN). 此时客户端处于`SYN_SENT`状态.（Synchronize Sequence Numbers）

- 第二次握手：服务端收到`SYN`报文之后,会以自己的`SYN`作为应答，并指定自己的初始化序列号ISN,同时会把客户端的`ISN+1`作为`ACK`的值，表示已经收到了客户端的`SYN`，此时服务器处于`SYN_RCVD`的状态

- 第三次握手,客户端收到`SYN`报文后,会发送一个`ACK`报文,当然,也是一样把服务器的`ISN+1`作为`ACK`的值，表示已经收到了服务端的`SYN`报文,此时客户端处于`ESTABLISHED` 状态

- 服务器收到ACK 报文之后,也处于`ESTABLISHED` 状态，此时，双方建立链接，TCP握手结束


|客户端(Client)状态|建立连接（三次握手）|服务端(Server)状态|
|:--:|:--:|:--:|
|`CLOSED`|&nbsp;|`LISTEN`|
|&nbsp;|SYN报文,seq=k  ---->|&nbsp;|
|`SYN_SENT`|&nbsp;|&nbsp;|
|&nbsp;|<---- SYN 报文,ACK=seq(k)+1,seq=y|&nbsp;|
|&nbsp;|&nbsp;|`SYN_RCVD`|
|&nbsp;|ACK=y+1  ----->|&nbsp;|
|`ESTABLISHED`|&nbsp;|`ESTABLISHED`|


![三次握手流程](https://raw.githubusercontent.com/HIT-Alibaba/interview/master/img/tcp-connection-made-three-way-handshake.png "三次握手流程")


## `OSI` 7层网络模型
OSI是 `Open System Interconnection`的缩写,国际化标准化组织(ISO)制定了OSI模型,定义了不同互联网的标准,是设计和描述计算机网络通信的基本框架。
|参考模型(从上往下)|各层含义|
|:--:|:--:|
|应用层|为应用程序提供服务,比如`HTTP`,`FTP`,`SMTP`,`POP3`等|
|表示层|数据格式转换翻译，数据加密，解密，压缩解压缩|
|会话层|不同机器之间的用户建立及管理会话|
|传输层|建立管理和维护端到端的链接,TCP,UDP|
|网络层|IP处理及路由选择|
|数据链路层|物理地址，网卡交换机|
|物理层|光纤线缆通信比特流传输|

## 四次挥手
TCP链接的断开需要发送4个包,因此称为4次挥手(Four-way handshake),也叫改进的三次握手,客户端和服务器均可主动发起挥手动作。在socket编程中,任何一方执行close() 操作即可产生挥手操作

### 第一次挥手(FIN=1,seq=x)
假设客户端想要关闭链接,客户端发送一个`FIN`标志位为1的包，表示自己已经没有数据可以发送了,但是仍然可以接收数据。发送完毕后，客户端进入FIN_WAIT_1 状态

### 第二次挥手(ACK=1,ACKnum=x+1)
服务端确认客户端的FIN 包,发送一个确认包,表明自己接收到了客户端关闭链接的请求,但还没有准本好关闭连接。
发送完毕后。服务端进入CLOSE_WAIT状态,客户端接收到这个确认包之后进入FIN_WAIT_2状态,等待服务器端关闭连接。

### 第三次挥手(FIN=,seq=y)
服务端准备好关闭连接时候,向客户端发送结束连接请求,FIN置位1。发送完毕后,服务端进入LAST_ACK状态,等待来自客户端最后一个ACK。

### 第四次挥手(ACK=1,ACKnum=y+1)
客户端收到服务端发送的FIN报文,向服务端发送ACK报文,ACMnum=y+1,然后客户端进入TIME_WAIT状态,服务端收到客户端ACK报文后，就关闭连接。此时，客户端等待2MSL后依然没有收到回复,则证明服务端已正常关闭,客户端也可以关闭连接了.

|客户端(Client)状态|断开连接（四次挥手）|服务端(Server)状态|
|:--:|:--:|:--:|
|`ESTABLISHED`|&nbsp;|`ESTABLISHED`|
|&nbsp;|FIN,ACK=1,seq=x  ---->|&nbsp;|
|`FIN_WAIT_1`|&nbsp;|&nbsp;|
|&nbsp;|<---- ACK ack=x+1 seq=1|&nbsp;|
|`FIN_WAIT_2`|&nbsp;|`CLOSE_WAIT`|
|&nbsp;|<---- ACK ack=x+1 seq=1|&nbsp;|
|&nbsp;|&nbsp;|`LAST_ACK`|
|&nbsp;|ACK,ACK=seq+1,seq=ack  ---->|&nbsp;|
|`TIME_WAIT`|&nbsp;|`CLOSE`|

![TCP/IP4次挥手](/images/front/img_982e17a3dba88e42a9accfab0aca1ef2.png "TCP\/IP4次挥手")

::: 计算规则
- seq: 为序列号
- ack: 为应答码
- seq = 对方上次的ack(首次发送时seq为系统随机生成)
- ack = 对方的seq+1(无数据传输时) 或者seq+L(报文数据的长度L)
- 参考 [TCP的三次握手和四次挥手](https://segmentfault.com/a/1190000014213178)
:::



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



## 将一个ts代码实现的继承，其中有私有属性和静态属性
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


## 手动封装一个jsonp函数，要求能每秒支持百万并发
```javascript
var jsonp = (function(){
    var callbackId = 1;
    window.jsonpCallbackMap = {};
    function jsonp(params){
        var url = params.url;
        var data = params.data;
        var timeout = params.timeout || 10000;
        var callbackName = "callbck"+Date.now() + "" + callbackId;
        var scriptNode = null;
        return new Promise(function(resolve,reject){
            var qs = /\?/g.test(url) ? "&" : "?";
            for(var key in data){
                qs += (key + "=" + data[key]) + "&";
            }
            url += qs;
            url += "callback=jsonpCallbackMap."+callbackName;
            callbackId++;
            
            scriptNode = createScript(url);

            window["jsonpCallbackMap"][callbackName] = function(result){
                resolve(result);
                desctory();
            }

            scriptNode.timer = setTimeout(function(){
                reject("timeout");
                desctory();
            },timeout);

            scriptNode.addEventListener("error",function(){
                reject();
            });

            function desctory(){
                delete window["jsonpCallbackMap"][callbackName];
                scriptNode.remove();
                clearTimeout(scriptNode.timer);
            }

            function createScript(url){
                var script = document.createElement("script");
                script.src = url;
                document.getElementsByTagName("head")[0].appendChild(script);
                return script;
            }
        });
    }
    return jsonp;
})();

for(let i = 0; i < 10; i++){
    jsonp({
        url:"https://activity.rosegal.com/api/formteam-api/check-form-team",
        // url:"https://www.windhome.com",
        data:{
            a:"1",
            b:"2",
        },
        timeout:5000
    }).then(function(res){
        console.log(res);
    }).catch(function(err){
        console.log(err);
    });
}
```

## 拓展Function.prototype实现一个AOP
AOP(面向切面编程 Aspect Oriented Programming)主要是将一些与核心业务逻辑模板无关的功能抽取出来，这些功能包括日志统计,安全控制,或者是异常处理等等。
实现方案:通过拓展Function.prototype来“动态植入”到业务逻辑模块中,保持业务逻辑的纯净度和高内聚
```javascript
// 现在有一个eat 方法,那么如何在eat 方法之前和之后分别beforeEat,afterEat函数，
// 使依次输出 买菜做饭，吃饭中,,,, 洗碗,打扫卫生...

function beforeEat(){
    console.log("买菜做饭,,,,,,");
}

function eat(name){
    console.log(name + "吃饭中.....");
    return "success";
}

function afterEat(){
    console.log("洗碗,打扫卫生,,,,");
}

Function.prototype.before = function(fn){
    var _this = this;
    return function(){
        fn.apply(this,arguments);
        return _this.apply(this,arguments);
    }
}

Function.prototype.after = function(fn){
    var _this = this;
    return function(){
        var r = _this.apply(this,arguments);
        fn.apply(this,arguments);
        return r;
    }
}

eat = eat.before(beforeEat).after(afterEat);


var result = eat("Believer");
// 买菜做饭,,,,,,
// Believer吃饭中.....
// 洗碗,打扫卫生,,,,
// success

```