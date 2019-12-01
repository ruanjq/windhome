---
title: JS数据订阅队列
lang: zh-CN
---


# JS数据订阅队列
有这么一个业务场景,客户端通过`web scoket` 订阅数据，展示到页面，但是页面展示需要停留一段时间，而订阅的数据是不确定有多少条，需要保证每条都要数据有序的在页面停留足够的时间才展示下一条，不能出现数据拥堵，重叠展示。

```javascript
function SubsrcibeQueue() {
    this.dataSource = [];
    this.size = this.dataSource.length;
    this.executing = false;
}


// 入队
SubsrcibeQueue.prototype.enqueue = function (data, callback) {
    this.dataSource.push({
        data: data,
        callback: callback
    });
    // 绑定通知
    if (this.executing === false) {
        this.executing = true;
        this.raiseMyEvent();
    }
}

// 出队
SubsrcibeQueue.prototype.dequeue = function () {
    var item = this.dataSource.shift();
    return item;
}

// 监听
SubsrcibeQueue.prototype.raiseMyEvent = function () {
    var _self = this;
    (function loop() {
        var item = _self.dequeue();
        if (item) {
            _self.callback(item.data, function () {
                loop();
            });
        } else {
            _self.executing = false;
            return;
        }
    })();
}

var sq = new SubsrcibeQueue();

// 接受订阅数据执行的回调函数逻辑
sq.callback = function (data, resolve) {
    console.log(data);
    setTimeout(function () {
        // 执行完毕 resolve 标识
        if (typeof resolve === "function") resolve();
    }, 1000);
}

var data = {
    status: 200,
    msg: "success",
    data: {
        content: "哈哈哈"
    }
}

// webscoket 添加数据，初始化10条
for (let i = 0; i < 10; i++) {
    sq.enqueue(data);
}
```