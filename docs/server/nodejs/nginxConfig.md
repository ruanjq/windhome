# 前端静态博客项目使用nginx 服务托管


# build 代码
进入`windhome `根目录 项目运行`yarn docs:build` ,会将源代码打包编译到目录`windhome\docs\.vuepress\dist`, 这个目录会对应到`nginx server` 的 `root` 配置目录
```
yarn docs:build
```
![build 代码](/images/front/dist.png "build 代码")


## 下载并安装nginx服务
[下载稳定版nginx](http://nginx.org/en/download.html)


## nginx.conf 新增一个server配置
``` 
server {
  listen       8006;
  server_name  localhost;

  #charset koi8-r;

  #access_log  logs/host.access.log  main;

  location / {
    # root 跟目录指向后台dist 目录文件夹
    root   "E:\Projects\FengyProjects\windhome\docs\.vuepress\dist";
    index  index.html index.htm index.shtml;
  }

  #error_page  404              /404.html;

  # redirect server error pages to the static page /50x.html
  #
  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
      root   html;
  }

  # proxy the PHP scripts to Apache listening on 127.0.0.1:80
  #
  #location ~ \.php$ {
  #    proxy_pass   http://127.0.0.1;
  #}
  # 这段代码配置代理，转发服务端api请求
  location ~ \/api\/ {
      proxy_pass   https://api.windhome.win;
  }
}

``` 


## 配置hosts 文件
```
127.0.0.1       dev.windhome.win
```

## 启动nginx服务
- 进入`nginx` 安装目录，双击`nginx.exe`, 启动服务
- 浏览器运行 `http:/dev.windhome.win:8006`, 查看nginx服务是否配置成功


## nginx服务注册window 服务开机自动启动
电脑重启后，每次都需要重新启动nginx 服务，很麻烦，所以推荐将 nginx服务注册window 服务开机自动启动

###  安装windows服务包装器
Windows 服务包装器（Windows service wrapper），用于把.exe文件注册为windows服务。比如把nginx.exe注册为windows服务，这样做的好处是，每次启动nginx时不用在命令行中输入命令，而且可以随windows系统启动而启动。不用担心服务器意外重启，服务挂掉。
下载地址：[https://repo.jenkins-ci.org/releases/com/sun/winsw/winsw/1.18/winsw-1.18-bin.exe](https://repo.jenkins-ci.org/releases/com/sun/winsw/winsw/1.18/winsw-1.18-bin.exe)

###  配置nginx 
将下载到的winsw-1.18-bin.exe更名为service.exe，放到nginx根目录下，
在该目录下新增文件 service.xml，修改service.xml配置如下：
```
&lt;service&gt; 
    &lt;id&gt;nginx&lt;/id&gt;
    &lt;name&gt;Nginx Service&lt;/name&gt;
    &lt;description&gt;Nginx Service&lt;/description&gt;
    &lt;logpath&gt;D:\nginx-1.18.0\logs&lt;/logpath&gt;  
    &lt;log mode="roll-by-size"&gt;   
        &lt;sizeThreshold&gt;10240&lt;/sizeThreshold&gt;
        &lt;keepFiles&gt;8&lt;/keepFiles&gt;
    &lt;/log&gt;
    &lt;executable&gt;D:\nginx-1.18.0\nginx.exe&lt;/executable&gt;  
    &lt;startarguments&gt;-p D:\nginx-1.18.0&lt;/startarguments&gt;
    &lt;stopexecutable&gt;D:\nginx-1.18.0\nginx.exe&lt;/stopexecutable&gt;
    &lt;stoparguments&gt;-p D:\nginx-1.18.0 -s stop&lt;/stoparguments&gt;
&lt;/service&gt;


```
以`管理员身份打开cmd命令行`，进入nginx根目录，
在`nginx`安装目录下执行`service.exe install`，即可生成`windows服务`，卸载命令：`service.exe uninstall`

![配置nginx](/images/front/nginx.png "配置nginx")

![配置nginx](/images/front/nginx1.png "配置nginx")



