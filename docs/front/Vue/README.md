---
sideBarTitle: Vue 面试题
title: Vue 高级面试题(一)
lang: zh-CN
---

# Vue 高级面试题(一)

## vue 的生命周期
![vue 的生命周期](/images/front/vue_lifecycle.png "vue 的生命周期")

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
参考：[VirtualDOM 算法实现](https://www.windhome.win/front/Vue/virtualDOM.html)
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


## babel 编译原理
`babel`的主要功能就是将代码以字符串的形式传递给它，然后`babel` 内部进行编译转换，返回一段新的代码字符串(以及sourceMap)，输入ES6语言，转换ES5
**编译步骤分为以下3个阶段**
- parse 解析，将输入的代码解析为源代码抽象语法树`(AST Abstract Syntax Tree，是源代码语法结构的一种抽象表现形式，以树状的数据结构表示，树上的每个节点都表示源代码的一种结构)`，首先会将代码进行分词，将整段代码分割为语法单元数组，如（空白，注释，字符串，数字，标识符，运算符，括号），然后再进行语义分析，
- transform 转换，根据一定规则将抽象语法树进行转换
- generator 生成，使用`bebal-generator`插件将转换后的抽象语法树生成普通ES5代码字符串

## Vue是如何对template 模板进行编译的
总结为三个过程,parse、optimize、render
- parse 解析template，将字符串的template 转换为`AST (Abstract Syntax Tree) ` 抽象语法树，得到指令，class ，style 等数据，`Vue` 对AST定义了三种类型,`Type 1: ASTElement`、`Type:2 ASTExpression`、`Type:3 ASTText`,假设我们有一个元素 `<div id="test">texttext</div>`在 parse 完之后会变成如下的结构并返回
```javascript
ele1 = {
    type:1,
    tag:"div",
    attrList:[{name:"id",value:"test"}],
    attrsMap:{id:"test"},
    parent:undefined,
    children:[{
        type:3,
        text:"texttext"
    }],
    plain: true,
    attrs: [{name: "id", value: "'test'"}]
}
```
- optimize 优化，将parse解析的AST进行静态内容的优化，标记所有的静态和非静态节点，在`Diff patch`的时候跳过静态内容的对比，达到优化的目的，（静态内容指的是和数据没有关系，不需要每次都属性的内容），经过optmizite 优化后，AST对象每个节点都会新增一个`static`属性 
- `generator`生成`render`：render 方法最终得到了一个函数字符串，它递归了AST树，为不同的AST节点创建不同的内部调用方法，如render函数字符串中会出现 _c，_v，_s，_q 方法，通过这些函数，render 函数最终会返回一个VNode节点，在_update 的时候对比原来的VNode,找出对应的patches 对象，进而更新DOM
参考：[Template 模板编译](https://segmentfault.com/a/1190000015886547)


## Vue如何自定义指令
```javascript

// 注册
Vue.directive('my-directive',{
    bind:function(){},
    inserted:function(){},
    update:function(){},
    componentUpdated:function(){},
    unbind:function(){},
});

// 注册指令函数
Vue.directive('my-directive',function(){
     // 这里将会被 `bind` 和 `update` 调用
});

// 获取指令
var myDirective = Vue.directive('my-directive');
```

## keep-alive实现原理
`keep-alive`是`Vue`内置组件，它能够将不活动的组件保存在内存中，不被销毁，不会被渲染到真实的DOM中。提供exclude和include2个属性，进行动态缓存，也可以结合vue-router 来使用，
它提供2个生命钩子`created`和`destroyed`钩子,
- create 会创建一个cache对象，保存VNode节点：
- destroyed 删除this.cache中缓存的VNode实例

**源代码**
```javascript
// src/core/components/keep-alive.js
export default {
  name: 'keep-alive',
  abstract: true, // 判断当前组件虚拟dom是否渲染成真是dom的关键

  props: {
    include: patternTypes, // 缓存白名单
    exclude: patternTypes, // 缓存黑名单
    max: [String, Number] // 缓存的组件实例数量上限
  },

  created () {
    this.cache = Object.create(null) // 缓存虚拟dom
    this.keys = [] // 缓存的虚拟dom的健集合
  },

  destroyed () {
    for (const key in this.cache) { // 删除所有的缓存
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    // 实时监听黑白名单的变动
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  render () {
    // 先省略...
  }
}
```


## 聊一聊Vuex原理
**Vuex 主要的核心为5个部分组成**
- state:负责存储属性状态,当注册store 实例后,可通过`this.$store.属性名`来访问状态，且状态为响应式
- getter:修改 `state` 属性,存放一些组件公用方法,且返回值会被缓存起来，当依赖的值发生改变，返回值会重新计算
- mutation: 同步方法，负责修改state数据，由 `commit` 提交过来的操作执行mutation 方法
- action：可以是异步调用的方法, 提交至 `mutation` 间接修改 `state`,在组件内可以通过 `dispatch` 方法或者 `mapAction` 调用

**原理**

- 首先通过 `Vue.use(store)` 注册实例,store 为一棵单一的状态树

- store 类的构造函数会有一个 `install` 方法，当前是否已经注册，只允许注册一次,未注册则赋值全局 `Vue` 变量

- 接着会调用一个 `applyMinxin` 方法，通过 `vue.minxin` 方法往所有的组件注册Vue 生命周期的 `beforeCreate` 方法,钩子函数执行的逻辑代码为 将组件内options 的 属性绑定到根实例 `this.store` 属性上面，这样就不用通过options 属性或者父组件option 调用

- 接下来会执行`installModule` 和 `resetStoreVM` 方法，`installModule` 方法为递归调用的方法，循环注册 mutation, action, getter,

- `resetStoreVM` resetStoreVM 方法内部定义一个私有变量_VM,它是Vue的一个实例,它会保留旧的State 树以及 getter 数据，内部方法会判断旧的vm 对象，并将oldVM.store 重置为null
