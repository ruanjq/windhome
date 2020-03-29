---
title: 前端常见的面试题(一)
lang: zh-CN
---


# 前端常见的面试题(一)

## JavaScript规定了几种语言类型
```javascript
7种,6种基本类型,1种引用类型，Number,String,Boolean,Object,Undeifned,Null,Smbol(ES6)
```

## JavaScript 对象的底层数据结构是什么
```javascript
线性类型：数组，链表，队列(First In First Out),栈(First In Last Out)
非线性：树，图
参考：http://www.alloyteam.com/2015/09/brief-javascript-data-structures-and-algorithms-the-array/
```


## Symbol在实际开发中的
```javascript
// Symobl 是ES6中提出来的，为了解决对象属性字段名重名冲突的问题,表示独一无二的值
// 参考 http://es6.ruanyifeng.com/#docs/symbol 
// 参考 https://segmentfault.com/a/1190000015262174
(function () {
    var root = this;
    var SymbolPolyfill = function Symbol(description) {
        if (this instanceof SymbolPolyfill) throw new TypeError('Symbol is not a constructor');

        var descString = description === undefined ? undefined : String(description);

        var symbol = Object.create(null);

        Object.defineProperties(symbol, {
            '__Description__': {
                value: descString,
                writable: false,
                enumerable: false,
                configurable: false
            }
        });
        return symbol;
    }
    root.SymbolPolyfill = SymbolPolyfill;
})();
```


## JavaScript 中的变量在内存中的存储形式
```javascript
堆，栈，堆栈，队列的概念
堆：是一种经过排序的树形数据结构，堆发生在程序运行是，而不是再编译时，可以随心访问数据，堆有2个性质
1:堆总是一颗完全二叉树
2:堆中某个节点的值，总是不大于或不小于其父节点的值
栈：先进后出
队列：先进先出
```

## 基本类型对应的内置对象
```javascript
string --> String
boolean ---> Boolean
number ----> Number
symbol ----> Symbol

```

## 可能发生隐式类型转换的场景以及转换规则，应如何避免或巧妙应用
```javascript
数字与字符串+-号操作，.点符号运算的时候可能会当成对象，if条件判断表达式会隐式转为Boolean类型
```


##  0.1 + 0.2 == 0.3; 为什么输出 false 

JavaScript 出现小数精度丢失的原因 JavaScript 采用IEEE754规范,计算机而矜持存储十进制的小数时不能完整的表示小数,那如何判断0.1+0.2 === 0.3 呢:
常见的做法是设置一个误差范围值,通常称为"机器精度",对于`JavaScript`的数字来说,该值通常是 2^-52 (2.220446049250313e-16),从ES6开始,该值定义在 `Number.EPSILON` 中,我们可以直接调用,也可以为ES6之前的版本写polyfill
```javascript
if(!Number.EPSILON){
    Number.EPSILON =  Math.pow(2,-52);
}
```
可以使用 Number.EPSILON 来比较两个数字是否相等（在指定的误差范围内）：

````javascript
function numbersCloseEnoughToEqual(n1,n2) {
 return Math.abs( n1 - n2 ) < Number.EPSILON;
}
var a = 0.1 + 0.2;
var b = 0.3;
numbersCloseEnoughToEqual( a, b ); // true
numbersCloseEnoughToEqual( 0.0000001, 0.0000002 ); // false
````

## 原型和原型链
```javascript
[原型规则]:
1:所有的引用类型(数组，对象，函数)都具有扩展属性的特性
2:偶有的引用类型(数组，对象，函数)都有一个__proto__(隐式原型)对象
3:所有的函数都有一个prototype显示原型,属性值也是一个普通对象
4:所有的引用类型(数组，对象，函数)的隐式原型都指向其构造函数的显示原型,即：obj.__proto__ === Object.protoptye
5:函数的prototype属性的构造函数指向函数的本身
6:原型链的最顶端 Object.prototype.__proto__ === null
```
![原型和原型链](/images/front/prototype.jpeg "原型和原型链")

::: tip 参考以下文档：
[JS中的原型规则与原型链](https://www.cnblogs.com/YiNongLee/p/9335506.html)

[彻底理解JavaScript原型链](https://www.jianshu.com/p/686b61c4a43d)
:::

## instanceof 的底层实现原理 
```javascript
function instanceOf(L,R){
    var proto_l = L.__proto__;
    var proto_r = R.prototype;
    while(true){
        if(proto_l === null){
            return false;
        } else if(proto_l === proto_r){
            return true;
        }
        proto_l = proto_l.__proto__;
    }
    return false;
}
```
## 实现继承的几种方式以及他们的优缺点
```javascript
1:原型链prototype继承,原型链继承通过 Sub.prototype = new Parent，构造函数原型上的熟悉在构造函数的实例上是共享的，即没有实现私有化
2:构造函数继承  
function Super(){}
function Sub(){Super.call(this)} 
实现了属性的私有话,但是子类无法方位父类原型上的属性
```
## 描述 new 一个对象的详细过程,并手动实现一个new 方法
```javascript
1:创建一个空对象
2:获取构造函数
3:链接到原型
4:绑定this
5:返回一个空对象
参考：https://www.jianshu.com/p/9cee6a703e01
function create(){
    let obj = new Object();
    let Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    let result = Constructor.apply(obj,arguments);
    return typeof result === "object" ? result : obj;
}
function People(name,age){
    this.name = name;
    this.age = age;
}
create(People,'Rose',10);
```
## 理解ES6 Class 构造函数以及继承的底层实现原理
```javascript
class Cart extends{
    constructor(){
        super();
    }
}
```
## 实现一个函数,使其输出: mul(2)(3)(4)
```javascript
var currying = function(fn){
    var _args = [].slice.call(arguments,1);
    let rec = function(){
        if(arguments.length != 0){
            _args = _args.concat([].slice.call(arguments))
            return rec;
        }
    }
    rec.toString = function(){
        if(typeof fn === "function"){
            return fn.apply(null,_args);
        }
    }
    return rec;
}

var sum = currying(function(){
    var args = [].slice.call(arguments);
    return args.reduce(function(a,b){
        return a+b;
    });
});

console.log(sum(20, 10)(5,5)(5));

```
## 递归测试
```javascript
function total(x){
    if(x === 1){
        return 1;
    }
    var result = x + total(x - 1);
    return result;
}
console.log(total(4));
```
## 什么是事件代理
```javascript
/**
* 事件代理是利用事件冒泡特性,将事件绑定到父元素上面，利用event，target判* 断是否等于目标元素，从而进行事件执行,具有以下优点
* 1:减少监听器
* 2:可以实现动态监听
**/
var ul = document.getElementById("list");
ul.addEventListener("click",function(e){
    var l = e.target;
    while(l.tagName.toUpperCase() !== "LI"){
        l = l.parentNode;
        if(l === ul){
            l = null;
            break;
        }
    }
    if(l){
        console.log("点击了ul的li");
    }
});
```
## 箭头函数和普通函数的区别
```javascript
1：箭头函数不能被new 实例创建
2: 箭头函数没有prototype 对象
3：箭头函数参数没有arguments对象
4：箭头函数this 指向外层函数的上下文this 对象
```
## 正则实现对数字每3位增加逗号
```javascript
// API 版本
(123456789.987654).toLocalString('en-US');

/**
* 正则方式
* 1:位置开头不能是逗号,  (?!^)
* 2:从后面算起每3个数字的前面位置新增逗号(?=(\d{3})+$)
* 3:将规则拼接起来
*
**/

"123456789.987654".replace(/(?!\b)(?=(\d{3})+\b)/g,",");

```

## js 正则查找排除某个字符
```javascript
// 排除2
var reg = /.[^a]*/g
```

## Webpack 和 gulp,grunt 区别
```javascript
1：grunt和gulp 基于任务流的task任务打包
2：webpack基于模块工具Bunlder
```

## webpack 打包过程(主要围绕模块进行讲解)
```javascript
1: 读取文件,分析模块的依赖配置
2: 对依赖的模块进行解析，深度遍历
3：将解析的模块，使用不同的loader 进行处理
4：编译模块，生成抽象语法树ABT
5：遍历ABT,输出js 文件
```

## webpack打包优化
```javascript
1：体积较大的文件使用webpack-bundle-analyzer插件 在plugins:[new BundleAnalyzerPlugin()]添加即可
2：第三方js 或者css 使用CDN 外链
3：压缩混淆代码，服务器开启gzip工具压缩
4：模块化的引入，如：
import {chain, cloneDeep} from 'lodash';
// 可以改写为
import chain from 'lodash/chain';
import cloneDeep from 'lodash/cloneDeep';
```

## 谈谈你对Vuex的理解
```javascript
Vuex包含的5个重要属性,state,getter,mutation,action,module
1:state:负责存储数据，存储状态，当注册store实例后，可以通过,this.$store.xx来访问数据,且数据为响应式
2:getter:修改state属性的方法，存放组件一些公共方法，它的返回值会被依赖缓存起来，当依赖值发生改变时候会重新计算
3:mutation 更改Vuex中store状态的唯一方式是提交mutation,同步代码
4:action 包含任意一部的操作，通过提交mutation间接更改状态，组件可以通过method dispatch出发
5:moudle 将store 分割成模块，每个模块都有对应的getter,mutation,action,state,将moudle注册到Vuex实例上
```
## Vue声明周期 
```javascript
beforeCreate -> created -> beforeMount -> mounted -> beforeUpdate -> updated -> beforeDestory -> destoryed
```

## Vue DOM渲染的过程和原理
```javascript
1:new Vue 初始化Vue实例
2:通过三种渲染模式Render、el、template生成Render 函数
3:通过Watcher监听数据变化
4:当数据变化时候，通过Render生成VNode
5;通过patchVNode对比前后变化,通过diff进行更新,添加,删除等操作生成真实的DOM节点
```

## http三次握手
```javascript
1:客户端发送SYN报文标识给服务端
2:服务端接收，返回SYN+ACK报文给客户端
3:客户端发送带ACK报文标识给服务端
```

## 简单介绍一下MVVM模式
```javascript
1:new MVVM() 初始化实例
2:Observer   通过DefineProperty 劫持属性
3:Compile    初始化模板指令
4:Dep        通过Observer劫持的属性发布订阅，通知相关事件
5:Watcher    监听事件
6:Update     根据Watcher 监听的数据更新模板
```


## Vue中组件的通信方式
```javascript
1:父组件通过props向子组件传递数据,用一个形象的比喻来说,父子组件之间的数据相当于自上而下的水管子,只能从上往下流,不能逆流,这也正是Vue的设计理念：单项数据流
2:$emit: 子组件触发消息传递给父组件回调函数绑定执行
3:父组件调用子组件的方法：this.$refs.子组件名称.方法名
4:子组件调用父组件方法: this.$parent.方法名
5:同级之间的通信使用vuex进行管理
6:使用事件总线 EventBus
7:使用$bordcast和$dispatch 事件
```

## 说说你项目中遇到的难点
```javascript
1:PWA接入，学习相关技术文档，项目实践
2:多属性商品切换
3:交互体验
4:购物车交互逻辑
5:网站性能优化
6:canvas 雪花效果
```



## 浏览器的渲染过程
```javascript
1：http请求加载资源
2: parse 解析HTML，css
3：构建render tree
4：compute style，合成
5: layout 布局，repaint重绘，reflow回流
6：呈现页面
```



## v-for循环时为什么要加key
```javascript
vue虚拟DOM中，数据发生变化时候，需要找到对应的DOM进行更新，新增key可以给个唯一标识,为了高效的更新虚拟DOM
```



## 客路旅行web前端面试题
请根据以下例子，实现异步的compose 函数  compose(...functions)
```javascript
/**
 * 
 * 客路旅行web前端面试题压轴题，请根据以下例子，实现异步的compose 函数  compose(...functions)
 * 
 *  Example ---------------------------
 *  
 *  function add1(n,callback){
        setTimeout(function(){
            callback(null,n+1)
        },10);
    }

    function mul3(n,callback){
        setTimeout(function(){
            callback(null,n*3);
        },10);
    }
    
    var add1mul3 = compose(mul3,add1);
    add1mul3(4,function(err,result){
        // result now equals 15
    })
 *  
 */


function add1(n,callback){
    setTimeout(function(){
        callback(null,n+1)
    },10);
}

function mul3(n,callback){
    setTimeout(function(){
        callback(null,n*3);
    },10);
}

 

function compose(){
    let argsFn = [].slice.apply(arguments);
    let promiseArr = argsFn.map( fn => {
        return function(n){
            return new Promise((resolve,reject) => {
                fn(n,function(obj,number){
                    resolve(number);
                });
            });
        }
    });

    function excutor(arr,value){
        return new Promise((resolve,reject) => {
            try {
                (function rec(a,v) {
                    if(a.length === 0){
                        return resolve(v);
                    }
                    let fn = a.pop();
                    fn(v).then(function(num){
                        rec(a,num);
                    });
                })(arr,value);
            } catch (error) {
                return resolve(error);
            }
        });
    }

    return function(x,cb){
        excutor(promiseArr,x).then(function(result){
            if(result instanceof Error){
                cb(result,undefined);
            }else {
                cb(null,result);
            }
        });
    }
}
 
var add1mul3 = compose(mul3,add1);
add1mul3(4,function(err,result){
    console.log(result);
})
```


## 实现以下算法将数组截取
```javascript
/**
* 原数组['a','b','c','d'] 
* 写一个方法
* fn(['a','b','c','d'],2) 输出结果[['a','b'],['c','d']]
* fn(['a','b','c','d'],3) 输出结果[['a','b','c'],['d']]
*
**/
function fn(arr,length){
    var result = [];
    (function rec(a,len){
        if(a.length <= len){
            result.push(a);
            return;
        }
        let temp = a.splice(0,len);
        result.push(temp);
        rec(a,len);
    })(arr,length);
    return result;
}
```


## 自定义实现call
```javascript
let Person = {
    name: 'Tom',
    say() {
        console.log(`我叫${this.name}`)
    }
}
let Person2 = {
    name:"qr"
}
window.name = "Bob";

console.log(Person.say());
console.log(Person.say.call());


Function.prototype.mycall = function(){
    let args = [...arguments];
    let ctx = args.splice(0,1)[0];
    let otherArgs = args.splice(0);
    ctx = ctx || window;
    ctx.__fn__ = this;
    let result = ctx.__fn__(...otherArgs);
    delete ctx.__fn__;
    return result;
}

console.log(Person.say.mycall(Person2));
var timeCallback = function(x,y,z){
    console.log("set timeout mycall==",this.name,x,y,z);
}   
setTimeout(function(){
    timeCallback.mycall(Person,"x","y","z");
},1000);


var callback = function(){
    console.log(this);
}
setTimeout(callback.bind(Person),3000);
```



## 双飞燕布局
```html
<style>
* {
    margin: 0;
    padding: 0;
}

#left {
    float: left;
    /*只设置浮动,不设宽度*/
    height: 500px;
    width: 100px;
    background-color: #f00;

    margin-left: -100%;  
}

#right {
    overflow: hidden;
    /*触发bfc*/
    height: 500px;
    width: 100px; margin-left: -100px;  
    float: right;
    background-color: #0f0;
}

#center {
    height: 500px;
    background: gray;
    float: left;
    width: 100%; 
}

#parent {
    overflow: hidden;
    position: relative;
    
}
#center-inner{ padding-left: 100px; padding-right: 100px;}
</style>
<div id="parent">
    <div id="center">
        <div id="center-inner">双飞燕布局 中间内容自适应</div>
    </div>
    <div id="left">左列不定宽</div>
    <div id="right">右列自适应</div>
</div>
```


## 圣杯布局
```html
<style>
    *{
        margin: 0;
        padding: 0;
    }
    
    #parent{
        position: relative; overflow: hidden;
        padding-left: 100px; padding-right: 100px;
    }
    #center{
        float: left; position: relative;
        height: 500px; background: gray; width: 100%;
    }

    
    #left{
        float: left; width: 100px; height: 500px; 
        background: red; left: -100px;
        position: relative; margin-left: -100%;  
    }

    #right{
        float: right; width: 100px; height: 500px; 
        background: green;  position: relative;
        margin-left: -100px; right: -100px;
    }
</style>
<div id="parent">
    <div id="center"> 中间内容自适应  </div>
    <div id="left">左列不定宽</div>
    <div id="right">右列自适应</div>
</div>
```


## 高性能渲染10万条数据
```html
<div id="container"></div>
<script>
/**
 *  requestAnimationFrame 可以根据性能渲染执行，
 *  不要使用setTimeout，
 * 
 * */

    //需要插入的容器
    let ul = document.getElementById('container');
    // 插入十万条数据
    let total = 100000;
    // 一次插入 20 条
    let once = 20;
    //总页数
    let page = total / once
    //每条记录的索引
    let index = 0;
    //循环加载数据
    function loop(curTotal, curIndex) {
        if (curTotal <= 0) {
            return false;
        }
        //每页多少条
        let pageCount = Math.min(curTotal, once);
        window.requestAnimationFrame(function () {
            let fragment = document.createDocumentFragment();
            for (let i = 0; i < pageCount; i++) {
                let li = document.createElement('li');
                li.innerText = curIndex + i + ' : ' + ~~(Math.random() * total)
                fragment.appendChild(li)
            }
            ul.appendChild(fragment)
            loop(curTotal - pageCount, curIndex + pageCount)
        })
    }
    loop(total, index);
</script>
```


## Vue 项目后端权限如何控制
```javascript
1: router 基础配置 404，login 不需要权限的页面
2：通过router.beforeEach() 钩子函数拦截路由
3: 判断登录用户的类型，添加 mate,role 属性判断
4：通过router.addRouters 方法动态注册该用户的router 权限信息
```


## Vue 项目中keep-alive作用是什么
```html
1：包含在 <keep-alive :is="currentView"> 中创建的组件,会多出2个生命周期的钩子函数，activated与deactivated
2: activated:组件被激活时调用，组件第一次渲染的时候也会被调用,之后每次激活时候也会被调用
3：deactivated:组件停用时候会调用
4：keep-alive 通常配合router-view使用，会将整个路由页面一切缓存下来
5：2.1.0版本以后新增 include 属性允许组件有条件的缓存,支持逗号分隔，正则匹配，或者数组表示
<!-- template -->
<keep-alive>
    <router-view v-if="$router.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$router.meta.keepAlive"></router-view>
<script>
    new Router({
        routes: [
            {
                name: 'a',
                path: '/a',
                component: A,
                meta: {
                    keepAlive: true
                }
            },
            {
                name: 'b',
                path: '/b',
                component: B
            }
        ]
    })
</script>
```



## 输出以下代码的执行结果
```javascript
async function test(){
    console.log(1);
    
    await test2();

    console.log(300);

    let x = await 200;
    console.log(x);
}

async function test2(){
    console.log(400);
}

console.log(0);
test();
console.log(2);

// 输出结果为  0  1  400  2  300  200
// test 执行结果返回一个Promise 对象resolve 状态
// x 的执行结果返回的是一个具体的值
// async 语法声明的函数为宏任务函数,
// await 语句会阻塞下面语句的执行
```


## 手动实现js 数组 Map 方法
```javascript
function myMap(arr,fn){
    let result = [];
    for(let i = 0; i < arr.length; i++){
        let x = fn.call(arr,arr[i],i);
        result.push(x);
    }
    return result;
}
var a = [1,2,3,4];
var b = myMap(a,function(item){
    return item + 2;
})
console.log(b);
``` 

## Vuejs Hooks 