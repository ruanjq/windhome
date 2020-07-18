---
title: Android7.0 whistle 抓包HTTPS证书无效解决方法
lang: zh-CN
---

# Android7.0 whistle 抓包HTTPS证书无效解决方法

## 背景原因
最近做小程序h5开发，调试过程中发现android 系统微信7.0以上版本无法抓取https 请求日志，查阅资料得出以下结论：
- 安卓系统 7.0 以上版本，微信 7.0 以下版本，微信会信任系统提供的证书
- 安卓系统 7.0 以上版本，微信 7.0 以上版本，微信只信任它自己配置的证书列表

所以在`android`系统中`whistle`抓包工具中才无法获取`https`相关日志，**苹果`IOS`系统则默认会信任用户安装的证书，没有这个问题**

## 解决方式
**注意：前提`android`手机需要获取`root`权限，具体`root`方法请查阅相关资料**
这里以`小米8`手机为例：

### 获取root权限方法
- [解锁小米手机](http://www.miui.com/unlock/index.html)
- [下载miui开发版](https://www.miui.com/download-345.html),并安装开发版系统
- 获取`ROOT`权限 开发版系统安装完成后，依次执行 **手机管家->权限->ROOT权限管理->开启root权限**

### 证书文件重新命名
此过程是将证书文件`rootCA.crt`重新命名为`hash`值文件，文件名`hash.0`，以`.0`后缀结尾,`hash`通过以下命令方式计算得来
- `w2 start`启动[whistle](http://wproxy.org/whistle/)抓包工具并下载`rootCA.crt`证书文件
- 计算`hash`值，打开`终端cmd`窗口，运行以下命令,
```bash
openssl x509 -subject_hash_old -in rootCA.crt
```
得到如下结果 `e2bbc20f`即为该文件的`hash`值
```bash
BelieverdeMacBook-Pro:Downloads ruanjq$ openssl x509 -subject_hash_old -in rootCA.crt
e2bbc20f
-----BEGIN CERTIFICATE-----
MIID9DCCAtygAwIBAgIBATANBgkqhkiG9w0BAQsFADCBhTEhMB8GA1UEAxMYd2hp
c3RsZS4xNTU0ODA0MTMzNDkxODkxMQswCQYDVQQGEwJDTjELMAkGA1UECBMCWkox
CzAJBgNVBAcTAkhaMSQwIgYDVQQKExsxNTU0ODA0MTMzNDkxODkxLndwcm94eS5v
cmcxEzARBgNVBAsTCndwcm94eS5vcmcwHhcNMTgwNDA5MTAwMjEzWhcNMjkwNDA5
MTAwMjEzWjCBhTEhMB8GA1UEAxMYd2hpc3RsZS4xNTU0ODA0MTMzNDkxODkxMQsw
CQYDVQQGEwJDTjELMAkGA1UECBMCWkoxCzAJBgNVBAcTAkhaMSQwIgYDVQQKExsx
NTU0ODA0MTMzNDkxODkxLndwcm94eS5vcmcxEzARBgNVBAsTCndwcm94eS5vcmcw
ggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQD5vm4twleqKMCQbdD7BbRH
k4CwJL79Bpj8Nl7z9En3KTc6emfYqVd2VejXqRky0zVi90HGG9sEXQikQBb8Gmm9
qIGQ2wtUMTCHuLUOnfaNCqX0Tfd8Ln29yl0hHSln5b+PyUcFs+nGHmNcgdEQVIAe
lGQO77iChU3Sm8jLm7m8KDygPG+lctF5key2o+EOY4bKfrR3w+eB1lCIpkVUDmkF
i0YL0igWRCvqVQSjVsEFmNXtSptf2KEo4vJt1Nkxg3TTUl31p00LQg9utlpCcAps
7bYyBH6ZtOZHdxLKw9YHcOXkwFki6fbd3kZkkSBr2rHHo+RzsO+OzFJ76ob+Be7t
AgMBAAGjbTBrMAwGA1UdEwQFMAMBAf8wCwYDVR0PBAQDAgL0MDsGA1UdJQQ0MDIG
CCsGAQUFBwMBBggrBgEFBQcDAgYIKwYBBQUHAwMGCCsGAQUFBwMEBggrBgEFBQcD
CDARBglghkgBhvhCAQEEBAMCAPcwDQYJKoZIhvcNAQELBQADggEBAH+vvldg9cdC
a+cuCYRMHDdSB1UoLyChSmVZepnHMoKy1ut/9qzyBY/VPjHydZsPtxlvi/zT1dFq
bHnXeJGy2FI2K9mP9HYs7kH5SAOP5L6u/VFzJnH3VyEDhVkSqGI0BaSt2cDx7fJO
g72qanafk6ppAhwbh+4O0KxjxiNfs0McV7zNPOGa5iNr/l2JtpIFkNk6k982KT5I
tIw9hC1lv/w8iGJ3I4FOcJIsG9VrmkJ17yWteGKQrKvCs5flQ8w2kVlwQckODghj
Cd3a10/wXQpMGJj+EfQCAd4XK2E3zfEHOfDJMuadoV1VVt4NS6jwpfijlLnJm/Yn
ULeLrERu7Ow=
-----END CERTIFICATE-----
BelieverdeMacBook-Pro:Downloads ruanjq$
```
- 将`rootCA.crt`文件重新命令为`hash.0`,(比如我这里就改为 `e2bbc20f`,直接通过电脑重新命名文件即可，不需要通过命令方式)

### 证书文件添加到系统证书目录
证书文件添加到系统证书目录有`2种`方式：
- 手机安装`RE文件管理器（Root Explorer）`，通过`RE文件管理器`将`hash.0`证书文件复制到系统证书目录`/system/etc/security/cacerts/`下面
- 安装`adb`开发工具，通过命令的形式将文件`push`到目录`/system/etc/security/cacerts/`下面

#### `RE文件管理器`方式
- 将`hash.0`证书文件发送到手机文件
- 下载并安装`RE文件管理器`，并将该软件开启`root`权限
- 进入RootExplorer管理器，将`hash.0`证书文件复制到`/system/etc/security/cacerts/`文件夹下，并把文件的权限设置成rw-r-r-
- 重启手机，进入 设置——系统安全——加密与凭据--信任的凭证——系统标签 里查看证书是否开启状态

#### `adb`工具方式
- 下载并安装`adb`工具，这里以`mac`电脑为例
```bash
brew install Caskroom/cask/android-platform-tools # 没有安装homebrew的先安装homebrew
```
- `adb`工具安装完成后,依次执行以下操作(以下命令运行没有报任何错误，则代表证书push成功)
```bash
adb devices # 测试adb是否安装成功，成功了会出现设备的hash值
adb root
adb disable-verity # 禁用系统验证
adb push e2bbc20f.0 /system/etc/security/cacerts # 安装证书到安卓系统证书目录
adb root
```
- 重启手机，进入 设置——系统安全——加密与凭据--信任的凭证——系统标签 里查看证书是否开启状态

## 验证安装成功
重启手机，进入 设置——系统安全——加密与凭据--信任的凭证——系统标签 里查看证书，本人这里装了2个证书，自己电脑和公司电脑
![Android7.0 whistle 抓包HTTPS证书无效解决方法](/images/front/certificate.jpg "Android7.0 whistle 抓包HTTPS证书无效解决方法")

## 注意
- 其他抓包工具`Charles`,`Fiddler`等方法类似，本质的方法是将用户证书添加到系统证书目录，系统证书会默认信任获取`HTTPS`请求日志。
- 获取`root`权限过程中可能会导致手机异常情况，请谨慎操作。