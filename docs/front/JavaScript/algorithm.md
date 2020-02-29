---
title: 光速软件算法面试题
lang: zh-CN
---

# 光速软件算法面试题

## TreeNode 查询
```html
    <pre>
    TreeNode 查询
    已知有如下⼀个树状数据结构：
    let tree = {
        id: '1',
        label: 'first',
        children: [
            {
                id: '2',
                label: 'second'
            },{
                id: '3',
                label: 'third',
                children: [{
                    id: '4',
                    label: 'fourth'
                },{
                    id: '5',
                    label: 'fifth'
                }]
            }
        ]
    };
    ```
    请实现⼀个查询函数，通过输⼊Tree 的 Root Node 和 Id，返回与其匹配的节点，函数原型如
    下（注意：请不要在函数内部直接⽤ console.log 打印出来）：
    findNodeById(root: TreeNode, id: string): TreeNode;
   </pre>

    <script>
        let tree = {
            id: '1',
            label: 'first',
            children: [
                {
                    id: '2',
                    label: 'second'
                },{
                    id: '3',
                    label: 'third',
                    children: [{
                        id: '4',
                        label: 'fourth'
                    },{
                        id: '5',
                        label: 'fifth'
                    }]
                }
            ]
        };
        function findNodeById(n, i) {
            var result = null;
            (function rec(node,id){
                if(node){
                    if(node.id === id){
                        result = node;
                        return;
                    } else {
                        if(node.children){
                            node.children.forEach(function(item,index){
                                rec(item,id);
                            });
                        }
                    }
                }
            })(n,i);
            return result;
        }
        console.log(findNodeById(tree,'3'));
    </script>
```

## 字符串 Parse

```html
<pre>
    字符串 Parse
    请设计⼀个字符串 parse 函数，可以将输⼊的字符串分解为对应的树状结构，⽐如：
    例⼦1：
    let input = 'int';
    let result = parse(intput);
    // result 结果为：
    // {
    //      type: 'int'
    // };
    例⼦2：
    let input = 'Array<bool>';
    let result = parse(intput);
    // {
    //      type: 'Array',
    //      typeArgs: [{
    //          type: 'bool'
    //      }]
    // };
    例⼦3：
    let input = 'Array<Array<string>>';
    let result = parse(intput);
    // {
    //      type: 'Array',
    //      typeArgs: [{
    //          type: 'Array',
    //          typeArgs: [{
    //              type: 'string'
    //          }]
    //      }]
    // };
    例⼦4：
    let input = 'Map<string, Array<bool>>';
    let result = parse(intput);
    // {
    //      type: 'Map',
    //      typeArgs: [{
    //          type: 'string'
    //      }, {
    //          type: 'Array',
    //          typeArgs: [{
    //              type: 'bool'
    //          }]
    //      }]
    // };
    同理，该 parse 函数可以分解如下任意情况，⽐如：
    "int"
    "string"
    "bool"
    "Array<int>"
    "Array<Array<int>>"
    "Array<Array<Array<int>>>"
    "Map<string, Map<string, bool>>"
    "Map<Map<string, bool>, bool>"
</pre>
<script>
    //     {type: "string", pid: 1, id: 2}
    // 1: {type: "string", pid: 3, id: 4}
    // 2: {type: "bool", pid: 3, id: 5}
    // 3: {type: "Map", pid: 1, id: 3}
    // 4: {type: "Map", pid: 0, id: 1}
    //           1    2      3    4      5
    var input ="Map<Map<string, bool>, bool>";

    var result = parse(input);
    function parse(str){
        var reg = /^(\w+)<?(.*)>/;
        var arr = [];
        var id = 1;

        // 生成list 数据结构，并确认父子关系
        (function rec(s,pid){
            var obj = {
                type:"",
                pid:pid,
                id:id
            }
            id++;
            if(s && typeof s === "string"){
                s = s.trim();
                var match = s.match(reg);
                if(match){
                    if(match[1]){
                        obj["type"] = match[1];
                    }
                    if(match[2]){
                        var str_arr = split(match[2]);
                        console.log(str_arr);
                        str_arr.forEach(function(str_item,index){
                            rec(str_item,obj.id);
                        })
                    }
                } else {
                    obj["type"] = s;   
                }
                arr.push(obj);
            } 
        })(str,0);


        // 生成tree 数据结构
        function toTree(data){
            var map = {};
            var result = [];
            // 根据id 生成map
            data.forEach(function(item){
                map[item.id] = item;
            });

            // 生成集合
            data.forEach(function(item){
                var parent = map[item.pid];
                if(parent){
                    if(!Array.isArray(parent.typeArgs)){
                        parent.typeArgs = [];
                    }
                    delete item.id;
                    delete item.pid;
                    parent.typeArgs.push(item)
                } else{
                    delete item.id;
                    delete item.pid;
                    result.push(item);
                }
            });
            return result;
        }
        // console.log(arr);
        console.log(toTree(arr)[0])
    }

    // 根据逗号分隔字符串
    function split(str){
        var result = [];
        var arr = str.split(",");
        arr.forEach(function(item,i){
            if(item.indexOf("<") === -1 && item.indexOf(">") === -1){
                result.push(item);
            } else if(item.indexOf("<") > -1){
                result.push(item + "," + arr[i + 1]);
            }
        })
        return result;
    }
</script>
```