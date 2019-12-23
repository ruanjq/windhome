(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{236:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"前端常见的面试题-二"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前端常见的面试题-二"}},[t._v("#")]),t._v(" 前端常见的面试题(二)")]),t._v(" "),a("h2",{attrs:{id:"实现一个极简的模板引擎"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#实现一个极简的模板引擎"}},[t._v("#")]),t._v(" 实现一个极简的模板引擎")]),t._v(" "),a("p",[t._v("实现render函数,返回符合预期")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("render")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"我是{{name}},年龄{{age}}"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Beliver"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    age"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("18")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 输出 我是Believer,年龄18")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 思路,使用正则表达式匹配,正则表达式默认使是贪婪模式,如果实现惰性匹配,则需要在量词后面添加?符号即可")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果使用了贪婪模式,会匹配到最后一个}}，而不是第一个结束的}}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("render")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("tpl"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("data")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" tpl"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/\\{\\{(.+?)\\}\\}/g")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("$"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("$"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// $1 表示匹配的字符结果,$2 表示匹配括号内的关键词")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("$"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"浏览器eventloop-和-node-js-中的事件循环有什么区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#浏览器eventloop-和-node-js-中的事件循环有什么区别"}},[t._v("#")]),t._v(" 浏览器Eventloop 和 Node.js 中的事件循环有什么区别")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("浏览器的事件循环机制是基于HTML5 规范，Node.js 事件循环是基于 libuv 库实现的")])]),t._v(" "),a("li",[a("p",[t._v("Node.js 事件循环有6个阶段，分别为,"),a("code",[t._v("timers")]),t._v("、"),a("code",[t._v("I/O callbacks")]),t._v("、"),a("code",[t._v("idle")]),t._v("、"),a("code",[t._v("perpare")]),t._v("、"),a("code",[t._v("poll 轮询")]),t._v("、"),a("code",[t._v("check")]),t._v("、"),a("code",[t._v("close callbacks")])])]),t._v(" "),a("li",[a("p",[t._v("相比浏览器,"),a("code",[t._v("Node.js")]),t._v(" 多了 "),a("code",[t._v("setImmediate(宏任务)")]),t._v(" 和 "),a("code",[t._v("process.nextTick(微任务这两种异步操作)")])])]),t._v(" "),a("li",[a("p",[t._v("在浏览器中,"),a("code",[t._v("微任务队列")]),t._v("是在每个"),a("code",[t._v("宏任务")]),t._v("执行完成之后执行，而在Node.js 中,"),a("code",[t._v("微任务")]),t._v("在事件循环的各个阶段之间执行,也就是一个阶段执行完毕，就会去执行微任务队列")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);