---
sideBarTitle: Number 数字
title: JavaScript Number 数字
lang: zh-CN
---

#JavaScript Number 数字
JavaScript 只有一种数值类型：number(数字)，包含整数和浮点数，JavaScript 的数字类型是基于IEE754规范标准来实现的，该标准通常也被称为浮点数。JavaScript使用的是'双精度'格式,即64位二进制
。

## 数字语法
JavaScript中数字常量一般用十进制表示。例如：
````javascript
var a = 42;
var b = 42.3

// 数字前面的0可以省略
var a = 0.42;
var b = .42

// 数字后面的0也可以省略
var a = 42.0;
var b = 42.;
````

## 整数检测
要检测一个值是否为是整数,可以使用ES6中的Number.isInteger() 方法
````javascript
Number.isInteger(42);    // true
Number.isInteger(42.000);    // true
Number.isInteger(42.25);    // false
````
也可以为 ES6 之前的版本 polyfill Number.isInteger(..) 方法：
````javascript
if(!Number.isInteger){
    Number.isIneger = function(num){
        return typeof num === "number" && number % 1 === 0
    }
}
````

## 特殊的数字NaN
如果数学运算中操作的数不是数字类型(或者无法解析为常规的十进制或十六进制数字),就无法返回一个有效的数字,这种情况下返回值为NaN.
例如：
````javascript
var a = 2 / "foo";  // NaN
typeof a === "number";  //true 
````
NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，reflexive，即 x === x 不
成立）的值。而 NaN != NaN 为 true，很奇怪吧！
````javascript
var a = 2 / "foo";
a == NaN; // false
a === NaN; // false
````
如何来检测它呢，很简单，可以使用内建的全局工具函数 isNaN(..) 来判断一个值是否是 NaN。
然而操作起来并非这么容易。isNaN(..) 有一个严重的缺陷，它的检查方式过于死板，就
是“检查参数是否不是 NaN，也不是数字”。但是这样做的结果并不太准确
````javascript
var a = 2 / "foo";
var b = "foo";
a; // NaN
b; "foo"
window.isNaN( a ); // true
window.isNaN( b ); // true——晕！
````
很明显 "foo" 不是一个数字，但是它也不是 `NaN`。这个 bug 自 `JavaScript` 问世以来就一直存
在，至今已超过 19 年。
从 ES6 开始我们可以使用工具函数 Number.isNaN(..)。ES6 之前的浏览器的 polyfill 如下：

````javascript
if (!Number.isNaN) {
    Number.isNaN = function(n) {
        return (typeof n === "number" && window.isNaN(n));
    }
}
var a = 2 / "foo";
var b = "foo";
Number.isNaN( a ); // true
Number.isNaN( b ); // false——好！
````
实际上还有一个更简单的方法，即利用 NaN 不等于自身这个特点。`NaN` 是 `JavaScript` 中唯
一一个不等于自身的值。
于是我们可以这样：
````javascript
if (!Number.isNaN) {
    Number.isNaN = function(n) {
        return n !== n;
    }
}
````
::: danger Note
很多 JavaScript 程序都可能存在 NaN 方面的问题，所以我们应该尽量使用 `Number.isNaN(..)`
这样可靠的方法，无论是系统内置还是 `polyfill`
如果你仍在代码中使用 `isNaN(..)`，那么你的程序迟早会出现 bug。
:::


## 无穷数 Infinity
在JavaScript 编程语言中,如果一个数字除以0,那么结果为Infinity(即Number.POSITIVE_INFNITY),同样如果一个负数除以0,结果为-Infinity(即Number.NEGATIVE_INFINITY)
````javascript
var a = 1 / 0; // Infinity
var b = -1 / 0; // -Infinity
````    

window 全局对象中提供 isFinite 检测是否一个有穷数字， ES6中, Number 对象提供 Number.isFinity() 方法来检测传入的参数是否是一个有穷数字(finity number)
````javascript
Number.isFinite(Infinity);  // false
Number.isFinite(NaN);       // false
Number.isFinite(-Infinity); // false

Number.isFinite(0);         // true
Number.isFinite(2e64);      // true

Number.isFinite('0');       // false, would've been true with
                            // global isFinite('0')
Number.isFinite(null);      // false, would've been true with
                            // global isFinite(null)

// polyfill
Number.isFinite = Number.isFinite || function(value) {
    return typeof value === 'number' && isFinite(value);
}                            
````

::: danger 注意
和全局的 isFinite() 函数相比，这个方法不会强制将一个非数值的参数转换成数值，这就意味着，只有数值类型的值，且是有穷的（finite），才返回 true。
:::


## MAX_SAFE_INTEGER、MAX_VALUE
ES6中,Number 对象引入2个常量 Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER,表示js 整数的最小和最大安全整数范围,即  [ -2^53+1 , 2^53-1 ] 这个范围
````javascript
Math.pow(2, 53) === Math.pow(2, 53) + 1 // true
````
Number.MAX_VALUE 则表示js里最大的数值，比这更大则表示Infinity,与之对应的是Number.MIN_VALUE

::: danger 注意
2^53 是 js 内置的最大的整数值（不安全），2^53 + 1 会被舍入成 2^53 ：
:::