---
title: HTTP 网络协议
lang: zh-CN
---

# HTTP 网络协议


## HTTP 请求报文
一个HTTP请求报文由以下四部分组成：`请求行(request line)`,`消息头部(header)`,`空行`,`请求正文`
如下请求报文：
```html

POST /index.html HTTP/1.1
HOST: www.xxx.com
User-Agent: Mozilla/5.0(Windows NT 6.1;rv:15.0) Firefox/15.0

username=admin&pwd=123456qw

```

### 1:请求行
请求行由 `请求方法`,`URL` 和 `HTTP协议版本`3个部分组成
例如：
```html
GET /index.html HTTP/1.1
```

**常见的HTTP协议的请求方法有**
- GET 获取资源
- POST 往服务器提交数据,传输实体主体
- PUT 创建或修改数据
- HEAD 获取报文首部
- DELETE 删除数据
- OPTIONS 询问服务器是否支持HTTP请求方法

### 2:请求头部
请求头部由关键字/值对组成,每行一对,关键字和值用英文冒号:分割. 请求头部用于告知服务器有关于客户端的信息。

- 通用头部(General Header)
- 请求头部(Request Header)
- 响应头部(Responce Header)
- 实体头部(Entity Header Fields)


### 3:空行
最后一个请求头之后是一个空行,发送回车符和换行符,通知服务器以下不再有请求头

### 4:请求数据
请求数据不在`POST`方法使用,适用于需要客户填写表单的场合,与请求数据相关的最常使用的请求头是`Content-Type`和`Content-Length`

## HTTP 响应报文
HTTP 响应报文由4个部分组成 `响应行`,`响应头`, `空行`,`响应体`
如下响应报文：
```html

HTTP/1.1 200 OK
Content-Encoding: gzip
Content-Type: text/html;charset=utf-8

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Document</title>
</head>
<body>
    <p>this is http response</p>
</body>
</html>

```

### 1:响应行
响应行包含以下几部分
- HTTP-Version 服务器HTTP协议的版本
- Status-Code 服务器发回的响应状态代码
- Reason-Phrase 状态代码的文本描述





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
- 如果是HTTPS协议的话,三次握手过程还会进行数字证书的校验以及加密密钥的生成。

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



## 常见的HTTP 状态码
```
1xx: 状态信息码,表示服务端已经接收了客户端的请求,客户端可继续发送请求
    100（Continue/继续）
    101（Switching Protocols/转换协议）

2XX: 成功状态码
    200 请求OK
    204 No Content 没有内容
    206 Partial Content 局部内容

3XX: 跳转
    301: (Permanently Moved) 永久重定向
    302：(Temporarily Moved ) 临时重定向

4xx：用户指定客户端的错误
    400（Bad Request/错误请求）：指出客户端请求中的语法错误
    401（Unauthorized/未授权）：表示客户端在授权头信息中没有有效的身份信息时，访问收到密码保护的页面。这个授权必须包含一个WWW-Authenticate的授权信息头
    403（Forbidden/禁止）：表示除非拥有授权，否则服务器拒绝提供所请求的资源。
    404（Not Found）：无法找到资源

5xx：用户指定服务器的错误
    500 (Internal Server Error/内部服务器错误)：是常用的“服务器错误”状态
    502 (Bad Gateway/错误的网关)：被用于充当代理或网关的服务器；该状态指出接收服务器接收到远端服务器的错误响应。
```
