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

 