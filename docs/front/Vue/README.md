---
sideBarTitle: VUE
title: Vue 高级面试题(一)
lang: zh-CN
---

# Vue 高级面试题(一)

## 聊聊Object.defineProperty
```javascript
// 语法 Object.defineProperty(obj, prop, descriptor)
var test = {b:2,c:3};
var test = {b:2,c:3};
(function(){
    var bValue;
    Object.defineProperty(test,"a",{
        configurable:true,  // 配置对象属性是否可以被删除
        enumerable:true,   // 当属性值为true时候,该属性才可以再for...in 和Object.keys中枚举,默认为false
        writable:true,  // 当writable 属性值为true时,value 值才能被赋值运算符改变
        get:function(){
            return bValue;
            console.log("get 方法");
        },
        set:function(){
            bValue = val;
            console.log("set方法");
            
        }
    })
})()
console.log(test);
```

## Object.defineProperty和Proxy的区别
**Object.defineProperty**
- 不能监听数组长度length属性的变化
- 不能监听对象的添加，所以vue 必须先data 声明属性才有响应式效果,
- 只能劫持对象的属性,因此需要对每个属性进行遍历

**Proxy**
- 可以监听数组长度length属性的变化
- 可以监听对象的添加
- 可以代理整个对象,不需要每个属性都遍历，提高代码性能


## Vue的模板引擎
Vue使用mustache模板引擎,实现一个简易的模板引擎
```javascript
var tpl = "您好，我叫{{name}},今年{{age}}岁";
var data = {
    name:"hhh",
    age:"20"
}
function render(tpl,data){
    // 正则分组括号匹配,默认为贪婪模式，在量词后面添加?号表示惰性匹配
    return tpl.replace(/\{\{(.+?)\}\}/g,function($1,$2){
        // $1 表示匹配的完整字符串
        // $2 表示匹配括号内的关键词
        return data[$2];
    });
}

render(tpl,data);
```

## 你认为Vue 的核心是什么
- 1：数据驱动
- 2：组件思想
- 3：MVVM 模式
- 4：声明式开发，简洁的模板预发

## 单向数据流和双向数据流的理解
- 单向数据流指的是父组件只能通过props属性对应的属性值传给子组件，子组件值更新父组件无法收到更新
- 双向数据流指的是父子组件可以互相传递数据,父组件修改值，子组件动态更新，子组件修改值，父组件也能动态响应更新
如何通过v-model, .sync 来实现双向数据流


## 什么是双向数据绑定,MVVM原理是什么
双向数据绑定指的是数据模型（Module）和视图（Views）之间的双向绑定，其原理是采用数据劫持，并结合发布订阅模式的方式来实现
**MVVM原理**
- Vue先遍历所有data 属性（发布者）用Object.defineProperty劫持这些属性将其转为getter setter 数据响应式，Observer(数据劫持);
- Observer监听数据 然后给每个属性对应new Dep(),通过发布订阅模式,notify通知数据更新
- Compile 类编译模板当正则替换数据时候添加new Watcher监听对象，通知属性值更新
- Watcher 类观察者，声明一个update 方法，当新值和旧值不相等时，通过callback对dom更新


## 什么是虚拟DOM
虚拟DOM 是通过JS对象数据结构模拟真实的DOM结构，通过算法实现DOM的创建和渲染，通过diff 算法对比DOM 差异，能提升页面的性能，减少DOM 回流操作


## Vue 中如何实现一个虚拟DOM,
```javascript

// <ul id='list'>
//   <li class='item'>Item 1</li>
//   <li class='item'>Item 2</li>
//   <li class='item'>Item 3</li>
// </ul>

// 对应的JS 对象为
var element = {
    tagName:"ul",
    props:{
        id:"list"
    },
    children:[
        { tagName:"li",props:{class:"item"},children:["Item 1"]},
        { tagName:"li",props:{class:"item"},children:["Item 2"]},
        { tagName:"li",props:{class:"item"},children:["Item 3"]},
    ]
}

class VNode{
    constructor(data){
        this.data = data;
    }

    render(){

    }

    patch(){
        // 对比vnode 和oldVnode是否有差异，然后生成真实DOM
    }

}
```

## Diff 算法
Diff 流程图
当数据发生改变时候，set 方法会调用Dep.notify 通知订阅者调用`watcher` `update` 方法，接着会调用`patch`给真实的DOM 打补丁，更新相应的视图。
![Diff 流程图](https://user-gold-cdn.xitu.io/2018/5/19/163777930be304eb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1 "Diff 流程图")

## Vue.nextTick实现原理
`DOM` 更新完毕后执行的一个回调
简单来说就是利用浏览器事件循环机制，首先属性修改是同步执行，当主线程执行栈为空的时候，浏览器事件循环`eventloop` 会去读取异步队列，当遇到nextTick 方法时候，会开启一个异步队列缓存改变的数据，而`Vue`是异步更新DOM的，当更新DOM执行完毕后，再读取 nextTick 队列执行，`Vue`在内部执行异步队列会尝试使用原生的`Promise.then` 和 `MessageChannel`方法，如果不支持，则采用`setTimeout(fn,0)` 代替，此时通过 Vue.nextTick 获取到改变后的 DOM 。通过 setTimeout(fn, 0) 也可以同样获取到。
```javascript
    // 改变数据
    vm.message = "changed";

     // 并不会得到'changed'
    console.log(vm.$el.textContent);

    //这样可以，nextTick里面的代码会在DOM更新后执行
    Vue.nextTick(function(){
        console.log(vm.$el.textContent) //可以得到'changed'
    })
```
![Vue.nextTick](https://segmentfault.com/img/bV17xC?w=423&h=512 "")
`Vue`


