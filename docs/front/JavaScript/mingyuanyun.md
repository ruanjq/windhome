---
title: 明源云Web前端面试题
lang: zh-CN
---


# 明源云Web前端面试题



## 第一题
```html
<pre>
怎样让(a===1 && a===2 && a===3)的值为true?
if(a === 1 && a === 2 && a === 3){
    console.log("hahahahha);
}
</pre>
<script>
    var a = {
        val:[1,2,3]
        toString:function(){
            return this.val.shift();
        }
    }
</script>
```

## 第二题
```javascript
// This 对象的理解
var User = {
    count:1,
    getCount:function(){
        return this.count;
    }
}
console.log(User.getCount()); // what?
var func = User.getCount;
console.log(func());  // what?

// 第一个输出结果为1
// 第二个输出结果为undefined
```

## 第三题
```html
<pre>
如何解决跨域问题?

1:使用第三方服务器做代理，如：Nginx
2:使用jsonp 跨域访问
3:使用iframes访问，然后再通过PostMessage 消息传递
4:服务端设置响应头部字段，Access-Control-Allow-Origin 为目标域名或者为*
</pre>
```

## 第四题
<pre>
如何设置浏览器缓存与不缓存两种。

缓存：
HTTP1.0 header响应头部设置Expires缓存时间
HTTP1.1 header响应头部设置 Cache-Control 为Max-Age:3000ms,单位为毫秒

不缓存
HTTP1.0 header 响应头部设置Expires 设置为0
HTTP1.1 header 设置Cache-Control 为no-store
</pre>

## 第五题
```javascript
// 实现一个函数clone，可以对JavaScript中的5种主要数据类型进行值复制

function clone(obj){
    let result = Array.isArray(obj) ? [] : {};
    for(let key in obj){
        let val = obj[key]
        if(typeof val === "object"){
            result[key] = clone(val);
        }else{
            result[key] = val;
        }
    }
    return result;
}   
```

## 第六题
```html
<pre>
代码实现（有几种实现）
var arr = [
    {
        id:1,
        children:[...] | null
    },
    ...
]
变量arr是一个object数组，数组元素为object，有2个属性
id：数字类型
children：有两种类型，一种是数组，结构类似于变量arr；一种是null
请用代码实现从变量arr中提取出孙子元素的id组成一个一维数组，如[1,2,3,...]
</pre>
<script>

// 递归方式
function getIds(arr){
    let result = [];
    if(arr && Array.isArray(arr)){
        (function rec(argsArr){
            argsArr.forEach(item => {
                result.push(item.id);
                let children = item.children;
                if(children && Array.isArray(children)){
                    rec(children);
                }
            });
        })(arr);
    }
    return result;
}

// 非递归方式
function getIds(arr){
    let result = [];
    if(arr && Array.isArray(arr)){
        arr.forEach(item =>{
            result.push(item.id);
            let children = item.children;
            let queue = [];
            if(children){
                queue.push(children);
            }
            let queueItem = queue.shift();
            while(queueItem){
                queueItem.forEach(childrenItem =>{
                    result.push(childrenItem.id);
                    if(childrenItem.children){
                        queue.push(childrenItem.children);
                    }
                })
                queueItem = queue.shift();
            }
        })
    }
    return result;
}
</script>
```

## 第七题
```html
<pre>
不可变数组的范围求和
给定一个整数数组nums，计算出从i个元素到第j个元素的和（i<=j），包括nums[i]和nums[j].
例子：
const nums = Object.freeze([-2,0,3,-5,2,-1]);
sumRange(0,2) // 1
sumRange(2,5) // -1
sumRange(0,5) // -3
注意：
假定数组的值不会改变（如上面代码，nums因为Object.freeze的缘故可读不可写）
sumRange可能会被使用多次，求不同范围的值
数组规模可能很大（比如超过10000个数），注意运行时间
</pre>
<script>
    function sumRange(i,j){
        let sums = [];
        sums[0] = 0;
        nums.forEach((item,i) => {
            sums[i+1] = sums[i] + item;
        });
        return sums[j+1] - sums[i];
    }    
</script>
```

## 第八题
```html
<pre>
实现一个LazyMan，可以按照以下方式调用
LazyMan("Hank") 输出
Hi！This is Hank!

LazyMan("Hank").sleep(10).eat("dinner"); 输出
Hi! This is Hank!
// 等待10秒...
Wake up after 10
Eat dinner~

LazyMan("Hank").eat("dinner").eat("supper") 输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan("Hank").sleepFirst(5).eat("supper") 输出
// 等待5秒
Wake up after 5
Hi This is Hank!
Eat supper

以此类推
</pre>
<script>
    var LazyMan = function(name){
        class _LazyMan{
            constructor(name){
                this.queue = [];
                let fn = () =>{
                    console.log("Hi This is " + name + "!");
                    this.excutor();
                }
                this.queue.push(fn);
                setTimeout(() => {
                    this.excutor();
                })
            }

            excutor(){
                let fn = this.queue.shift();
                fn && fn();
            }

            sleep(time){
                let fn = () =>{
                    setTimeout(() =>{
                        this.excutor();
                    },time * 1000)
                }
                this.queue.push(fn);
                return this;
            }

            sleepFirst(time){
                let fn = () =>{
                    setTimeout(() =>{
                        this.excutor();
                    },time * 1000)
                }
                this.queue.unshift(fn);
                return this;
            }

            eat(name){
                let fn = () =>{
                    console.log("Eat" + name + "~");
                    this.excutor();
                }
                this.queue.push(fn);
                return this;
            }

        }

        return new _LazyMan(name); 
    }
</script>    
```