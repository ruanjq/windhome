---
sideBarTitle: 前端BFF框架
title: 前端BFF框架
lang: zh-CN
---

[[toc]]

# 前端BFF框架

## 什么是BFF
`BFF BackEnds For Frontends`(服务于后端的前端)单词的缩写,主要用于服务前端的后端应用程序,来解决多终端业务耦合问题。适用于目前比较流行的`中台化`，`微服务`项目场景，通过`BFF`层聚合`Service`接口，提供给不同终端调用。

## BFF优势与劣势
### 优势
* `数据服务`与`BFF`分离,降低了项目的复杂度,解耦了业务逻辑
* 前后端彻底分离，技术栈`Node.js`语言同一，支持多个终端业务场景
* 后端微服务架构专注服务场景设计，解耦业务逻辑代码
* `BFF`，`微服务`独立部署运行，依赖性大大降低
* 减少了前端的`HTTP`请求数量
* 提高了前端岗位在项目开发中的角色地位，前端熟悉后端技术范围，熟悉项目业务。
* 解决前端`跨域`问题
....

### 劣势
* 对前端开发人员的职责要求更高了,增加了开发成本,`BFF项目`,`前端项目`,都由前端开发人员编写
* `BFF`层转发接口增加接口响应时间
* `Error`排查复杂度增加了，涉及`BFF`,`微服务`2个平台
* 业务异常处理需保持统一，统一格式化业务异常的返回内容，需要保证端到端测试

对比优势和劣势的内容，总得来说，BFF框架还是客观的，很明显优势大于劣势。

## BFF技术栈
`Koa2`、`Typescript`、`Routing-controllers`、`Typedi`、`class-validator`、`grpc`、`Log4js`

- [Koa](https://koajs.com/) 基于`Node.js`封装的开源框架，能快速搭建Web应用程序，Koa2支持全新的ES规范(`async`,`await`)
- [Typescript](https://www.tslang.cn/index.html) 是`Javascript`类型的超集,支持类型校验，接口声明，泛型，Class扩展等多多种特性，弥补了`Javascript`的不足之处,它可以编译为纯的`Javascript`,可以在任何浏览器，任何计算机和任何操作系统运行，并且开源,前端圈流行一句话：“任何优秀的项目都可以用`Typescript`实现,任何能用`JavaScript`实现的应用，最终都会用`Typescript`实现。”
- [Routing-controllers](https://www.npmjs.com/package/routing-controllers) 基于`Node.js`封装的框架，处理路由和控制器的行为，通过装饰器特性更方便的进行路由配置，请求参数校验，中间件的处理，支持`express.js`和`koa.js`.
- [typedi](https://www.npmjs.com/package/typedi) 是一个` dependency injection`依赖注入的工具，类似比较成熟的`JAVA`中的依赖注入特性,将有依赖关系的类放到容器中,然后解析出类的实例，目的是实现类的解耦
- [class-validator](https://www.npmjs.com/package/class-validator) 对参数进行类型校验的工具库，通过装饰器模式的特性，能够高效的验证参数类型。
- [grpc](https://grpc.io/)  gRPC是Google开源的一套现代高性能RPC框架,可以在任何环境中运行。它可以有效地连接服务和跨数据中心可插入支持负载平衡、跟踪、健康检查和验证。它也适用于最后一英里的分布式计算连接设备,移动应用程序和浏览器的后端服务。
- [Log4js]() `Javascript`的`Log`日志管理插件







