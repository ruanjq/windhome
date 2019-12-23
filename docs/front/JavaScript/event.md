---
title: 发布订阅模式
lang: zh-CN
---


## 发布订阅模式
撸一个发布订阅模式代码
```javascript

var myEvent = (function () {
    var eventNotDefinedMsg = "subscibe function arguments event value is not a defined";

    var fnNotDefinedMsg = "subscibe arguments callback is null";

    function MyEvent() {
        this.subs = {
            emitArr:[],
            broadcastArr:[]
        };
    }

    // 订阅事件
    MyEvent.prototype.on = function (event, fn) {
        if(typeof fn === "function"){
            this.subs["emitArr"].push({
                event: event,
                fn: fn
            });

            this.excutor(event,this.subs["broadcastArr"],fn);
        }
    }

    MyEvent.prototype.excutor = function(event,queue,hanlder){
        if (!event) {
            throw new Error(eventNotDefinedMsg);
        } else {
            var each = function (item) {
                if (item.event === event) {
                    if(typeof hanlder === "object"){
                        item.fn.call(this, hanlder, this);
                    } else if(typeof hanlder === "function"){
                        hanlder.call(this,item.data);
                    }
                }
            }
            queue.forEach(each.bind(this));
        }
    }


    
    MyEvent.prototype.emit = function (event, data) {
        this.excutor(event, this.subs["emitArr"],data);
    }

    // 移除订阅事件
    MyEvent.prototype.remove = function (event, fn) {
        if (!event) {
            throw new Error(eventNotDefinedMsg);
            return;
        }
        if (typeof fn === "function") {
            var removeEach = function (item, index) {
                if (item.event === event && item.fn === fn) {
                    this.subs["emitArr"].splice(index, 1);
                    return true;
                }
            }
            this.subs["emitArr"].some(removeEach.bind(this));
        } else {
            console.warn(fnNotDefinedMsg);
        }
    }

   
    MyEvent.prototype.once = function (event, fn) {
        function on(data, target) {
            fn.call(this, data, target);
            this.remove(event, on);
        }
        this.on(event, on);
    }

    MyEvent.prototype.broadcast = function(event,data){
        this.subs["broadcastArr"].push({
            event: event,
            data: data
        });
    }

    return new MyEvent();
})();
```