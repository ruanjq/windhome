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
- `TCP` 提供一种面向连接的，可靠的字节流服务
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