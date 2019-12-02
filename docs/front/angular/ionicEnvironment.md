---
title: Ioinc项目环境搭建
lang: zh-CN
---


# Ioinc项目环境搭建（安卓）

## 安装eclipse和JDK
下载`eclipse`和`JDK`、解压`Eclipse`、并安装`JDK`、生成如下目录、我是安装在C盘路径

![Ioinc项目环境搭建](/images/ionic/01.png "Ioinc项目环境搭建")

## 配置jdk环境变量
- 系统变量
- 新建 JAVA_HOME 变量.

变量值填写jdk的安装目录（本人是C:\Program Files\Java\jdk1.8.0_25)

系统变量→寻找 Path 变量→编辑

在变量值最后输入 `%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;`

::: danger Note
（注意原来Path的变量值末尾有没有;号，如果没有，先输入；号再输入上面的代码）
:::


系统变量→新建 CLASSPATH 变量

变量值填写  .;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar（注意最前面有一点）

系统变量配置完毕

检验是否配置成功运行cmd 输入 javac 若如图所示则说明安装和配置成功。
![Ioinc项目环境搭建](/images/ionic/02.png "Ioinc项目环境搭建")



## 安装 Android SDK
下载eclipse 安卓开发插件SDK、并配置好虚拟机ADV(详细教程请点击以下链接查看
[http://blog.csdn.net/u013440660/article/details/42290467](http://blog.csdn.net/u013440660/article/details/42290467))

 
## 配置ADV虚拟机
该步骤是配置ADV虚拟机的路径、默认是C盘

```
系统变量-->新建变量

变量名 `ANDROID_SDK_HOME`

变量值  D:\ProgramFiles\eclipse\Android\android-avd
```


##配置ANDROID_HOME变量

变量名 `ANDROID_HOME`

变量值`D:\Program Files\eclipse\Android\android-sdk`（对应SDK路径）

修改系统变量中PATH变量值在后面添加（注意用英文分号分割）

`%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools;`

## 安装nodeJS
下载nodeJS、并安装、在CMD输入npm  -version显示如图、则说明安装成功
```bash
npm  -version
```
![Ioinc项目环境搭建](/images/ionic/03.png "Ioinc项目环境搭建")


##安装cordova
安装cordova,输入命令 `npm install -g cordova` 检测安装是否成功可输入 `cordova –version` 命令出现如图所示、则说明安装成功
```bash
npm install -g cordova
```
![Ioinc项目环境搭建](/images/ionic/04.png "Ioinc项目环境搭建")


## 安装ionic
输入命令 `npm install -g ionic`  检测安装是否成功可输入 `ionic –version` 命令出现如图所示、则说明安装成功
```bash
npm install -g ionic
```
![Ioinc项目环境搭建](/images/ionic/05.png "Ioinc项目环境搭建")



## 安装ant 打包环境

下载`ant`打包软件、并配置环境变量、到官方主页 [http://ant.apache.org](http://ant.apache.org) 下载新版、并配置环境变量

系统变量-->新建变量

变量名  ANT_HOME

变量值  D:\ProgramFiles\apache-ant-1.9.4

在PATH环境中添加变量值、为ant解压后的bin的路径（前面用英文分号分割、对应ant下bin路径）

D:\ProgramFiles\apache-ant-1.9.4\bin;

验证ant安装是否成功、输入如下命令：ant如果出现如下内容，说明安装成功：
![Ioinc项目环境搭建](/images/ionic/06.png "Ioinc项目环境搭建")


## 创建myApp项目
进入你要创建项目的路径：输入如下命令创建myApp项目
```bash
ionic start myApp
```
创建成功后可在myApp 目录下出现5个文件夹   打包好的工程放在platforms里面
![Ioinc项目环境搭建](/images/ionic/07.png "Ioinc项目环境搭建")

文件夹详解:

`www`  : 开发的 HTML5 ; CSS ; JS 文件都拷贝到这下面

`plugins` :  存放的是插件、以后文件,摄像头等插件都下载到这里

`merges`: 我也没用过  以后知道了再补上

`platforms`: 存放的是编译好后的android文件 ,(如果这个文件夹为空,需要你在命令行编译一次才能生成.、别急、接着往下看

`.cordova`: 存放的是配置文件

## add platform
进入myApp文件夹、输入如下命令添加安卓平台

```bash
Ionic platform add android
```
添加安装平台、注意安装cordova的时候、`project.properties`
配置文件里面的target值、默认为19、如果你安装安卓SDK插件的时候没有安装该版本、可用记事本打开`project.properties`配置文件、手动修改该值
Android.batlist targets 查看android安装的API插件版本
```bash
Android.batlist targets
```

![Ioinc项目环境搭建](/images/ionic/08.png "Ioinc项目环境搭建")
 
## build
使用该命令  `Ionic build android`  将项目打包成apk文件
```bash
Ionic build android
```

 
## run
输入命令`Ionic run android`在安卓虚拟机上运行该项目
```bash
Ionic run android
```
![Ioinc项目环境搭建](/images/ionic/09.png "Ioinc项目环境搭建")