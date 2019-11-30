---
title: 手写Promise
lang: zh-CN
---

# 自定义实现Promise


```javascript
class MyPromise {
    constructor(callback) {
        this.status = "pending";
        this.successFully = [];
        this.failed = [];
        let resolve = data => {
            if (this.status === "pending") {
                this.status = "resolved";
                this.value = data;
                this.successFully.forEach(fn => fn(data));
            }
        }

        let reject = err => {
            if (this.status === "pending") {
                this.status = "rejected";
                this.value = err;
                self.failed.forEach(fn => fn(err));
            }
        }
        try {
            callback(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onResolved, onRejected) {
        /* switch (this.status) {
            case "pending":
                if (typeof onResolved === "function") this.successFully.push(onResolved);
                if (typeof onRejected === "function") this.failed.push(onRejected);
                break;
            case "resolved":
                if (typeof onResolved === "function") onResolved(this.value);
                break;
            case "rejected":
                if (typeof onRejected === "function") onRejected(this.value);
                break;
        } */

        onResolved = typeof onResolved === "function" ? onResolved : function(v){}
        onRejected = typeof onRejected === "function" ? onRejected : function(r){}
        if(this.status === "resolved"){
            return new Promise((resolve,reject) => {
                try {
                    let x = onResolved(this.value);
                    if(x instanceof Promise){
                        x.then(resolve,reject);
                    }
                    resolve(x);
                } catch (error) {
                    reject(error);
                }
            });
        }
        if(this.status === "rejected"){
            return new Promise((resolve,reject) => {
                try {
                    let x = onRejected(this.value);
                    if(x instanceof Promise){
                        x.then(resolve,reject);
                    }
                } catch (error) {
                    reject(error);
                }
            });
        }
        if(this.status === "pending"){
            return new Promise((resolve,reject) => {
                this.successFully.push((value) => {
                    try {
                        let x = onResolved(this.value);
                        if(x instanceof Promise){
                            x.then(resolve,reject);
                        }
                        resolve(x);
                    } catch (error) {
                        reject(error);
                    }
                });

                this.failed.push((value) => {
                    try {
                        let x = onRejected(this.value);
                        if(x instanceof Promise){
                            x.then(resolve,reject);
                        }
                    } catch (error) {
                        reject(error);
                    }
                });
            });
        }
 
    }
}

var pm = new MyPromise(function (resolve, reject) {
    var a = 6;
    setTimeout(function () {
        if (a > 5) {
            resolve("hh");
        } else {
            reject("ww");
        }
    }, 1000);
});

pm.then(function (msg) {
    console.log("第一个then");
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log("回调数据");
            reject(1);
        },2000);
    });
}).then(function(n){
    console.log("第二个promise then",);
},function(){
    console.log("失败了")
});
```


