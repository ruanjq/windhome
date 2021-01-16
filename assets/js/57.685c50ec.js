(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{164:function(n,t,e){"use strict";e.r(t);var s=e(2),i=Object(s.a)({},(function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[e("h1",{attrs:{id:"前端静态博客项目使用nginx-服务托管"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#前端静态博客项目使用nginx-服务托管"}},[n._v("#")]),n._v(" 前端静态博客项目使用nginx 服务托管")]),n._v(" "),e("h1",{attrs:{id:"build-代码"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#build-代码"}},[n._v("#")]),n._v(" build 代码")]),n._v(" "),e("p",[n._v("进入"),e("code",[n._v("windhome")]),n._v("根目录 项目运行"),e("code",[n._v("yarn docs:build")]),n._v(" ,会将源代码打包编译到目录"),e("code",[n._v("windhome\\docs\\.vuepress\\dist")]),n._v(", 这个目录会对应到"),e("code",[n._v("nginx server")]),n._v(" 的 "),e("code",[n._v("root")]),n._v(" 配置目录")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("yarn docs:build\n")])])]),e("p",[e("img",{attrs:{src:"/images/front/dist.png",alt:"build 代码",title:"build 代码"}})]),n._v(" "),e("h2",{attrs:{id:"下载并安装nginx服务"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#下载并安装nginx服务"}},[n._v("#")]),n._v(" 下载并安装nginx服务")]),n._v(" "),e("p",[e("a",{attrs:{href:"http://nginx.org/en/download.html",target:"_blank",rel:"noopener noreferrer"}},[n._v("下载稳定版nginx"),e("OutboundLink")],1)]),n._v(" "),e("h2",{attrs:{id:"nginx-conf-新增一个server配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#nginx-conf-新增一个server配置"}},[n._v("#")]),n._v(" nginx.conf 新增一个server配置")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v('server {\n  listen       8006;\n  server_name  localhost;\n\n  #charset koi8-r;\n\n  #access_log  logs/host.access.log  main;\n\n  location / {\n    # root 跟目录指向后台dist 目录文件夹\n    root   "E:\\Projects\\FengyProjects\\windhome\\docs\\.vuepress\\dist";\n    index  index.html index.htm index.shtml;\n  }\n\n  #error_page  404              /404.html;\n\n  # redirect server error pages to the static page /50x.html\n  #\n  error_page   500 502 503 504  /50x.html;\n  location = /50x.html {\n      root   html;\n  }\n\n  # proxy the PHP scripts to Apache listening on 127.0.0.1:80\n  #\n  #location ~ \\.php$ {\n  #    proxy_pass   http://127.0.0.1;\n  #}\n  # 这段代码配置代理，转发服务端api请求\n  location ~ \\/api\\/ {\n      proxy_pass   https://api.windhome.win;\n  }\n}\n\n')])])]),e("h2",{attrs:{id:"配置hosts-文件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置hosts-文件"}},[n._v("#")]),n._v(" 配置hosts 文件")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("127.0.0.1       dev.windhome.win\n")])])]),e("h2",{attrs:{id:"启动nginx服务"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#启动nginx服务"}},[n._v("#")]),n._v(" 启动nginx服务")]),n._v(" "),e("ul",[e("li",[n._v("进入"),e("code",[n._v("nginx")]),n._v(" 安装目录，双击"),e("code",[n._v("nginx.exe")]),n._v(", 启动服务")]),n._v(" "),e("li",[n._v("浏览器运行 "),e("code",[n._v("http:/dev.windhome.win:8006")]),n._v(", 查看nginx服务是否配置成功")])]),n._v(" "),e("h2",{attrs:{id:"nginx服务注册window-服务开机自动启动"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#nginx服务注册window-服务开机自动启动"}},[n._v("#")]),n._v(" nginx服务注册window 服务开机自动启动")]),n._v(" "),e("p",[n._v("电脑重启后，每次都需要重新启动nginx 服务，很麻烦，所以推荐将 nginx服务注册window 服务开机自动启动")]),n._v(" "),e("h3",{attrs:{id:"安装windows服务包装器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装windows服务包装器"}},[n._v("#")]),n._v(" 安装windows服务包装器")]),n._v(" "),e("p",[n._v("Windows 服务包装器（Windows service wrapper），用于把.exe文件注册为windows服务。比如把nginx.exe注册为windows服务，这样做的好处是，每次启动nginx时不用在命令行中输入命令，而且可以随windows系统启动而启动。不用担心服务器意外重启，服务挂掉。\n下载地址："),e("a",{attrs:{href:"https://repo.jenkins-ci.org/releases/com/sun/winsw/winsw/1.18/winsw-1.18-bin.exe",target:"_blank",rel:"noopener noreferrer"}},[n._v("https://repo.jenkins-ci.org/releases/com/sun/winsw/winsw/1.18/winsw-1.18-bin.exe"),e("OutboundLink")],1)]),n._v(" "),e("h3",{attrs:{id:"配置nginx"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置nginx"}},[n._v("#")]),n._v(" 配置nginx")]),n._v(" "),e("p",[n._v("将下载到的winsw-1.18-bin.exe更名为service.exe，放到nginx根目录下，\n在该目录下新增文件 service.xml，修改service.xml配置如下：")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v('&lt;service&gt; \n    &lt;id&gt;nginx&lt;/id&gt;\n    &lt;name&gt;Nginx Service&lt;/name&gt;\n    &lt;description&gt;Nginx Service&lt;/description&gt;\n    &lt;logpath&gt;D:\\nginx-1.18.0\\logs&lt;/logpath&gt;  \n    &lt;log mode="roll-by-size"&gt;   \n        &lt;sizeThreshold&gt;10240&lt;/sizeThreshold&gt;\n        &lt;keepFiles&gt;8&lt;/keepFiles&gt;\n    &lt;/log&gt;\n    &lt;executable&gt;D:\\nginx-1.18.0\\nginx.exe&lt;/executable&gt;  \n    &lt;startarguments&gt;-p D:\\nginx-1.18.0&lt;/startarguments&gt;\n    &lt;stopexecutable&gt;D:\\nginx-1.18.0\\nginx.exe&lt;/stopexecutable&gt;\n    &lt;stoparguments&gt;-p D:\\nginx-1.18.0 -s stop&lt;/stoparguments&gt;\n&lt;/service&gt;\n\n\n')])])]),e("p",[n._v("以"),e("code",[n._v("管理员身份打开cmd命令行")]),n._v("，进入nginx根目录，\n在"),e("code",[n._v("nginx")]),n._v("安装目录下执行"),e("code",[n._v("service.exe install")]),n._v("，即可生成"),e("code",[n._v("windows服务")]),n._v("，卸载命令："),e("code",[n._v("service.exe uninstall")])]),n._v(" "),e("p",[e("img",{attrs:{src:"/images/front/nginx.png",alt:"配置nginx",title:"配置nginx"}})]),n._v(" "),e("p",[e("img",{attrs:{src:"/images/front/nginx1.png",alt:"配置nginx",title:"配置nginx"}})])])}),[],!1,null,null,null);t.default=i.exports}}]);