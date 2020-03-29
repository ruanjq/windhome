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


## 高阶函数防抖,节流
防抖函数和节流函数本质是不一样的。防抖函数是将多次执行变为最后一次执行或第一次执行，节流函数是将多次执行变成每隔一段时间执行。
```html
<button id="J_throttle">throttle test</button>
<button id="J_debounce">debounce test</button>
<script>
// timer 版本
function throttle(fn, delay) {
    var canRun = true;
    return function () {
        if (!canRun) return;
        var context = this,
            arg = arguments;
        canRun = false;
        setTimeout(function () {
            fn.apply(context, arg);
            canRun = true;
        }, delay);
    }
}

// 时间戳版本
function throttle(fn,delay){
    var preTime = 0;
    return function(){
        var now = Date.now();
        if(now - preTime >= delay){
            fn.apply(this,arguments);
            preTime = now;
        }
    }
}



// 时间戳+timer 优化版本
function throttle(fn,delay){
    let preTime = 0,
        timer = null;
    return function (...args) {
        let now = Date.now();
        // 没有剩余时间 || 修改了系统时间
        console.log(now - preTime);
        if(now - preTime >= delay || preTime > now){
            if(timer){
                clearTimeout(timer);
                timer = null;
            }
            preTime = now;
            fn.apply(this,args);
        } else if(!timer){
            timer = setTimeout(()=>{
                preTime = Date.now();
                timer = null;
                fn.apply(this,args)
            },delay);
        }
    }
}



function debounce(fn, delay) {
    var timer = null;
    return function () {
        var context = this,
            arg = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, arg);
            timer = null;
        }, delay);
    }
}

var t1 = throttle(function () {
    // console.log(111);
}, 1000);

var d1 = debounce(function () {
    console.log(111);
}, 1000);

// 无论点击多次，点击多块，每隔1s 执行一次
document.getElementById("J_throttle").addEventListener("click",function(){
    t1();
}, false);

// 1s 内连续点击多次只执行一次
document.getElementById("J_debounce").addEventListener("click", function () {
    d1();
}, false);
```

## common.js 和 ES6中模块引入的区别
```javascript
- `CommonJS`是一种模块规范,最初被应用于`Node.js` 成为`Nodejs`的模块规范，它有4个重要的环境变量为模块化的实现提供支持：`module`,`exports`,`require`,`global`
- `ES6 Module` 是基于ES6规范实现的模块化功能，主要有2个命令构成 `export`和`import`
- 这2这的主要差别为：
- CommonJS模块输出的是一个值得拷贝,ES6模块输出的是值得引用
- CommonJS模块是运行时加载，ES6模块是斌阿姨时输出接口
- CommonJS是单个值导出,ES6 Module可以导出多个
- CommonJS的动态语法可以写在判断里，ES6 Module静态语法只能写在顶层
- CommonJS的this指向当前模块，ES6 Module的this是undefined
```