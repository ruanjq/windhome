---
title: H5与Native的交互原理
lang: zh-CN
---


# H5与Native的交互原理

## 介绍
大部分App开发过程中,都会采用`Hybrid App`模式进行开发，入比较流行的`Cordova`技术，`WX App`,`阿里Weex`,`React Native`，这些app 部分都嵌入了H5页面，由于`H5`和`Native`采用不同的开发技术，那么就涉及到2者之间进行如何通信交互的问题。

## IOS与H5通信
iOS 有2种`webview`, ios8以上推出了`WKWwevView`,低于ios8 用的是`UIWebView`,WKWebView性能上高于`UIWebView`

### iOS调用H5
`Native`调用`JavaScript`语言,是通过`UIWebview`组件的`stringByEvaluatingJavaScriptFromString`方法实现,该方法返回js脚本的执行结果。
```javascript
// Swift
webview.stringByEvaluatingJavaScriptFromSring("Math.random()");

// OC
[webView stringByEvaluatingJavaScriptFromString:@"Math.random();"];
```

### H5调用iOS
`JavaScript`调用`Native`,并没有现成的API可以使用,需要借助iframe实现,原理是在`UIWebView`内发起的所有网络请求,都可以通过`delegate`函数在`Native`层得到通知,所以只需要劫持`UIWebView的所有请求`

```javascript
// JS 端关键代码
var url = 'jsbridge://doAction?title=分享标题&desc=分享描述&link=http%3A%2F%2Fwww.baidu.com';
var iframe = document.createElement('iframe');
iframe.style.width = '1px';
iframe.style.height = '1px';
iframe.style.display = 'none';
iframe.src = url;
document.body.appendChild(iframe);
setTimeout(function() {
    iframe.remove();
}, 100);

// OC端关键代码
func webView(webView: UIWebView, shouldStartLoadWithRequest request: NSURLRequest, navigationType: UIWebViewNavigationType) -> Bool {
    print("shouldStartLoadWithRequest")
    let url = request.URL
    let scheme = url?.scheme
    let method = url?.host
    let query = url?.query

    if url != nil && scheme == "jsbridge" {
        print("scheme == \(scheme)")
        print("method == \(method)")
        print("query == \(query)")

        switch method! {
            case "getData":
                self.getData()
            case "putData":
                self.putData()
            case "gotoWebview":
                self.gotoWebview()
            case "gotoNative":
                self.gotoNative()
            case "doAction":
                self.doAction()
            case "configNative":
                self.configNative()
            default:
                print("default")
        }

        return false
    } else {
        return true
    }
}
```

## Android与H5通信


### Android调用H5
在Android 使用`WebView`的loadUrl方法调用`JS` 代码字符串

```javascript
// 调用js中的JSBridge.trigger() 方法
webView.loadUrl("javascript:JSBridge.trigger('webviewReady')");
```

### H5调用Android

有2种比较好的方式：
- 和iOS一样,通过iframe(Android 端通过`shouldOverrideUrlLoading`方法对url协议进行解析)
- 往`WebView`页面里注入原生js代码,使用`addJavaScriptInterFace`方法实现

```javascript

// JAVA 代码
class JSInterface{

    @JavascriptInterface 
    public String getUserData(){
        return "UserData";
    }
}

webView.addJavascriptInterface(new JSInterface(),"AndroidJS")  //浏览器window环境中注入了AndroidJS全局对象

// JS 代码
AndroidJS.getUserData()    // UserData
```


## 总结
**Native 调用 H5 方式**
- 【Android】 通过`webView.loadUrl("javascript:JSBridge.trigger('webviewReady')")`
- 【Android】往`WebView`页面里注入原生js代码,使用`addJavaScriptInterFace`方法实现
- 【iOS】 通过`webview.stringByEvaluatingJavaScriptFromSring("Math.random()");`

**H5 调用 Native 方式**
- 【Android】 H5通过iframe 发起网络请求协议,Andriod 端通过`shouldOverrideUrlLoading` 方法拦截
- 【Android】 通过`addJavaScriptInterFace` 方式忘WebView注入全局window 对象
- 【iOS】 通过iframe 协议拦截形式处理对应逻辑
