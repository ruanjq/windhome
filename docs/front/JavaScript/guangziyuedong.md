---
title: 光子跃动前端面试题
lang: zh-CN
---

# 光子跃动前端面试题


## 第一题
```javascript
// 请输出以下代码的执行结果
// 时间为预约面试时间
for(var i = 0; i <= 5; i++){
    setTimeout(function(){
        console.log(1,new Date(),i);
    }, i * 1000)
}
console.log(2,new Date(),i);

// 假设面试时间为2020-02-20 20:00:00,则上面代码分别输出
// 2 2020-02-20 20:00:00 6
// 1 2020-02-20 20:00:00 6
// 1 2020-02-20 20:00:01 6
// 1 2020-02-20 20:00:02 6
// 1 2020-02-20 20:00:03 6
// 1 2020-02-20 20:00:04 6
// 1 2020-02-20 20:00:05 6
```

## 第二题
```javascript
// 请输出以下代码的执行结果
b()
function b(){
    console.log(1);
}
function b(){
    console.log(2);
}
var b = 3;
console.log(b);
console.log(a);
let a = 'a';

// 由于var关键词声明的变量会提升到作用域最顶层，所以以上代码的实际编译为
/**
var b
function b(){
    console.log(1);
}
function b(){
    console.log(2);
}
b();
b = 3;
console.log(b);
console.log(a);
所以依次输出
2
3
报错 a Cannot access 'a' before initialization
**/
```

## 第三题
```javascript
// 请写出以下代码语句的执行结果
var a = {
    a:1,
    b:"1",
    c:[1],
    d:{
        name:"d"
    }
}
for(let key in a){
    console.log(Object.prototype.toString(a[key]));
}

// [object Object]
// [object Object]
// [object Object]
// [object Object]
```


## 第四题
```javascript
// 请写出以下代码的执行结果
1 + "1"
2 * "2"
[1,2] + [2,1]
"a" + + "b"

// "11"
// 4
// "1,22,1"
// aNaN 第4个表达式可拆解为  ”a“ + (+"b"),由于b为非数字类型，所以得到NaN，所以最后输出aNaN


// [object Object]
// [object Object]
// [object Object]
// [object Object]
```


## 第五题
```javascript
// 已知以下数组，编写一个程序将数组扁平化并除去其中重复部分数据，最后得到一个升序且不重复的数组
const arr = [[1,2,2],[3,4,5,5],[6,7,8,9,[11,12,[14]]],18]

// 解法1
function arrFlatUniqueSort(arr){
    if(arr && arr instanceof Array){
        let arrStr = arr.toString();
        let newArr = arrStr.split(",");
        let set = new Set(newArr);
        let uniqueArr = Array.from(set);
        return uniqueArr.map(item =>parseInt(item)).sort((a,b) =>{a - b});
    }
}

// 解法2
function arrFlatUniqueSort(arr){
    let newArr = [];
    (function rec(arr){
        if(arr && arr instanceof Array){
            arr.forEach(item =>{
                if(item instanceof Array){
                    rec(item);
                }else{
                    newArr.push(item);
                }
            });
        }
    })(arr);
    let set = new Set(newArr);
    let uniqueArr = Array.from(set);
    return uniqueArr.sort((a,b) =>{a - b});
}

// 解法3
function arrFlatUniqueSort(arr){
    if(arr && arr instanceof Array){
        let newArr = (arr) =>{
            return arr.reduce((pre,cur,index,arr) => {
                return pre.concat(Array.isArray(cur) ? newArr(cur) : cur)
            },[]);
        } 
        let set = new Set(newArr(arr));
        let uniqueArr = Array.from(set);
        return uniqueArr.sort((a,b) =>{a - b});
    }
}

arrFlatUniqueSort(arr);

```