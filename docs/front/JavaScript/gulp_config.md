---
title: gulp 打包构建配置
lang: zh-CN
---

#  [gulp 多页项目打包构建配置](https://github.com/ruanjq/summary/tree/master/gulp_config)



## 1：安装 node
直接下载安装包，安装`node`：  [https://nodejs.org/en/](https://nodejs.org/en/)

检查是否安装成功 =>
```bash
$ node -v

$ npm -v
```

## 2：全局安装 gulp 和 yarn
```bash
$ npm install -g gulp yarn
```

检查安装成功 =>
```bash
$ gulp -v

$ yarn -V
```

## 3：在当前 gulp_config 目录下安装 node_modules
```bash
$ yarn
```
#### or

```bash
$ npm install
```

`node_modules` 目录是不提交git远程，所以当你 `checkout` 代码下来以后，没有此目录的情况下，也需要执行以上命令 


## 4：配置文件说明

|文件名|说明|
|:--|:--|
|`config_hanlder.js`|事件处理器配置模块|
|`config_less.js`|less 样式编译模块|
|`config_md5.js`|css、js 文件添版本号构建模块|
|`config_path.js`|项目打包路径配置|
|`config_process.js`|开发环境配置|
|`config_script.js`|script 脚本文件配置模块|
|`config_socket.js`|dev 开发模式下 socket 推送错误消息|
|`config_sprite.js`|雪碧图配置模块|
|`config_template.js`|html 模板打包配置|
|`rev-manifest-skin2.js`|md5 版本号 json 映射文件，skin2 根据config_path 配置项目结构自动生成|
|`gulpfile.js`|gulpfile.js入口主文件配置|

## 5：核心依赖插件说明

|查件名称|说明|
|:--|:--|
|`chalk`|美化 log 提示信息|
|`gulp-changed`|dev watch 模式下只监听改动的文件，防止全局执行|
|`socket.io`|socket 通信提示错误消息到浏览器客户端|
|`gulp.spritesmith`|gulp雪碧图合并插件|
|`gulp-debug`|gulp 调试输出日志信息|
|`gulp-rev-collector-v` `gulp-rev-v`|文件md5版本号配置|


## 6：开始使用
#### 开发模式
```bash
$ npm run dev
```

#### 生成模式
```bash
$ npm run build
```
> build 生产模式下，雪碧图文件夹不存在则会成功跳过

#### 生成雪碧图命令
```bash
$ npm run sprite 文件夹名称参数
```
> dev 开发模式下，雪碧图文件夹不存在则会提示错误信息


## 7：开发模式下浏览器客户端 socket 输出调试信息配置代码
### 7.1：客户端代码
```html
<!-- 引入 socket.io.min.js 文件 -->
<script src="socket.io.min.js"></script>
<script>
    !(function (params) {
		// 监听socket 端口地址，端口号对应config_socket.js 配置文件中的端口号
        var socket = io.connect('http://localhost:8877',{ reconnection: false });
        socket.on('gulpError', function (data) {
            if(data.msg){
                removeNode();
                document.getElementsByTagName("head")[0].insertAdjacentHTML('beforeend',data.msg)
            }
        });
        socket.on('gulpSuccess', function (data) {
            if(data.msg){
                removeNode();
            }
        });
        function removeNode(){
            var gulpNode =  document.getElementById("gulp-notification-style")
            if(gulpNode){
                gulpNode.remove();
            }
        }
  })();
</script>
```
### 7.2：服务端代码
```javascript
let chalk = require('chalk');
let util = require("util");
let has_error = false;
let msgFormat = (title, err) => {
    let msg = new Error(err).toString();
    msg = msg.replace(/\n/g, '\\A ').replace(/'/g, "\"");
    title = title.replace(/\n/g, '\\A ').replace(/'/g, "\"");
	// body:before{content:""}  content 伪类内容注入错误消息
    return util.format('<style id="gulp-notification-style">body:before { background: rgba(0, 0, 0, 0.8);'+
	'padding: 15px; 'position: fixed; left: 0; right: 0;top: 0; bottom: 0; z-index: 99999;' +
        'overflow-y: auto;  color: red; font-size: 16px;' +
        'white-space: pre-wrap; font-family: monospace;' +
        'content: \'%s %s\';}</style>', title, msg);
}
module.exports = {
    error: (title, err) => {
        if (global.socket_client) {
            has_error = true;
            global.socket_client.emit('gulpError', { msg: msgFormat(title, err, "error") });
        }
        console.log(chalk.bold.red(title, err));
    },
    info: info => {
        console.log(chalk.bold.green(info));
    },
    success:() => {
        // 监听客户端编译成功，删除页面错误提示信息
        if (global.socket_client && has_error) {
            has_error = false;
            global.socket_client.emit('gulpSuccess', { msg: "编译成功" });
        }
    }
}
```

## [8.GitHub 项目源代码](https://github.com/ruanjq/summary/tree/master/gulp_config)



