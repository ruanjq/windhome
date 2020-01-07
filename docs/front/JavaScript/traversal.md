---
title: 深度优先/广度优先遍历
lang: zh-CN
---


# 深度优先`(DFS Depth-First-Search)`/广度优先`(Breadth First Search)`遍历数据结构


![深度优先/广度优先遍历](/images/front/tree.png "深度优先/广度优先遍历")
```javascript
var data = [
    {
        id:0,
        pid:"",
        children:[{
            id:1,
            pid:0,
            children:[
                {id:2,pid:1,children:[{id:3,pid:2}]},
                {id:4,pid:1}
            ]},
            {id:5,pid:0},
            {id:6,pid:0,children:[{id:7,pid:6},{id:8,pid:6}]},
            {id:9,pid:0}
        ]
    }
]
 
// 深度优先遍历递归方式
function deepTraversal1(data,result){
    if(data instanceof Array){
        for(let i = 0; i < data.length; i++){
            var item = data[i];
            result.push({
                id:item["id"],
                pid:item["pid"]
            });
            if(item.children){
                deepTraversal1(item["children"],result)
            }
        }
    }
    return result;
}

// 深度优先遍历非递归方式
function deepTraversal2(data){
    var result = [];
    if(data instanceof Array){
        var task = [];
        for(let i = 0; i < data.length; i++){
            var item = data[i];
            task.push(item);
            while(task.length > 0){
                var tItem = task.pop();
                result.push({
                    id:tItem["id"],
                    pid:tItem["pid"]
                });
                var children = tItem.children;
                if(children instanceof Array){
                    for(let j = children.length - 1; j >= 0; j--){
                        let childrenItem = children[j];
                        task.push(childrenItem);
                    }
                }
            }
        }
    }
    return result;
}


// 广度优先遍历非递归方式
function wideTraversal3(data){
    var result = [];
    if(data instanceof Array){
        var queue = [];
        for(let i = 0; i < data.length; i++){
            var item = data[i];
            result.push({
                id:item["id"],
                pid:item["pid"]
            });
            queue.push(item);
            while(queue.length > 0){
                var qItem = queue.shift();
                var children = qItem.children;
                if(children instanceof Array){
                    for(let j = 0; j < children.length; j++){
                        let childrenItem = children[j];
                        result.push({
                            id:childrenItem["id"],
                            pid:childrenItem["pid"]
                        });
                        if(childrenItem.children){
                            console.log(childrenItem);
                            queue.push(childrenItem);
                        }
                    }

                }
            }
        }
    }
    return result;
}

var result1 = deepTraversal1(data,[]);
// 0 1 2 3 4 5 6 7 8 9
var result2 = deepTraversal2(data);
// 0 1 2 3 4 5 6 7 8 9
var result3 = wideTraversal3(data);
// 0 1 5 6 9 2 4 7 8 3
console.log(result1);
console.log(result2);
console.log(result3);
```