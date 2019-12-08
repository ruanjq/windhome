---
title: VirtualDOM 算法实现
lang: zh-CN
---

# VirtualDOM 算法实现

## 什么是VirtualDOM
`VirtualDOM`是通过js对象的数据结构，模拟真实的DOM对象，通过`render` 方法渲染成真实的`dom`,再通过`Diff` 算法,对比对象差异,通过patch方法 将补丁更新到差异的DOM上。

::: tip
DOM Diff 算法比较2个虚拟DOM的区别，找出区别创建补丁，返回一个patch对象，根据补丁更新DOM
本质是比较两个对象的区别，
算法。深度优先递归比较，
规则：
当节点类型相同时，比较属性是否相同，生成一个属性的补丁包 {type:"ATTRS",attrs:{class:"list-group"}}
新的DOM节点不存在 {type:"REMOVE",index:xxx}
节点类型不相同,直接采用替换模式 {type:"REPLACE",newNode:newNode}
文本改变 {type:"TEXT",text:newText}
:::

## index.html
```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>virtualDOM 算法实现</title>
    <style></style>
</head>
<body>
    <div id="root"></div>
    <script src="./element.js"></script>
    <script src="./diff.js"></script>
    <script src="./patch.js"></script>
    <script>
        let virtualDom = createtElment('ul',{class:"list"},[
            createtElment("li",{class:"item"},['a']),
            createtElment("li",{class:"item"},['b']),
            createtElment("li",{class:"item"},['c'])
        ]);

        let virtualDom2 = createtElment('ul',{class:"list-group"},[
            createtElment("li",{class:"item"},['1']),
            createtElment("li",{class:"item"},['b']),
            createtElment("div",{class:"item"},['3']),
        ]);

        let el = render(virtualDom);

        renderDom(el,document.getElementById("root"));
        console.log(virtualDom);
        console.log(el);

        let patchs = diff(virtualDom,virtualDom2);
        console.log(patchs);

        patch(el,patchs);
    </script>
</body>
</html>
```


## element.js
```javascript
function createtElment(type,props,children){
    return new Element(type,props,children);
}

function Element(type,props,children){
    this.type = type;
    this.props = props;
    this.children = children;
}

function setAttr(node,key,value){
    switch(key){
        case "value":  //node 是一个input 或者 textarea
            if(node.tagName.toUpperCase() === "INPUT" || node.tagName.toUpperCase() === "TEXTAREA"){
                node.value = value;
            } else{
                node.setAttribute(key,value);
            }
            break;
        case "style":
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(key,value);
            break
    }
}


// render 方法将 virtualDom 转化为 真实DOM
function render(eleObj){
    let el = document.createElement(eleObj.type);
    for(let key in eleObj.props){
        // 设置属性
        setAttr(el,key,eleObj.props[key])
    }
    eleObj.children.forEach(child => {
        let childNode;
        if(child instanceof Element){
            childNode = render(child);
        } else {
            childNode = document.createTextNode(child);
        }
        el.appendChild(childNode);
    });
    return el;
}

function renderDom(el,target){
    target.appendChild(el);
}
```

## diff 算法
```javascript
function diff(oldTree,newTree){

    let patches = {}; // 补丁包对象
     
    let index = 0;  // 从顶层索引为0的位置开始对比

    // 递归树，比较后的结果放到补丁包中
    treeWalk(oldTree,newTree,index,patches);
    return patches;
}

function dirrAttr(oldAttrs,newAttrs){
    let patch = {};

    // 判断新旧属性
    for(let key in oldAttrs){
        if(oldAttrs[key] != newAttrs[key]){
            patch[key] = newAttrs[key];
        }
    }
    for(let key in newAttrs){
        if(!oldAttrs.hasOwnProperty(key)){
            patch[key] = newAttrs[key];
        }
    } 
    return patch;
}

const ATTRS = "ATTRS";
const TEXT = "TEXT";
const REMOVE = "REMOVE";
const REPLACE = "REPLACE";
let Index = 0;
function diffChildren(oldChildren,newChildren,index,patches){
    oldChildren.forEach((child,idx) => {
        // TODO 索引
        treeWalk(child,newChildren[idx],++Index,patches);
    });
}

function isString(node){
    return Object.prototype.toString.call(node) === "[object String]";
}


function treeWalk(oldTree,newTree,index,patches) {

    // 小补丁包
    let currentPatch = [];
    if(!newTree){
        currentPatch.push({type:REMOVE,index:index});
    } else if(isString(oldTree) && isString(newTree)){ // 文本节点
        if(oldTree !== newTree){
            currentPatch.push({type:TEXT,text:newTree});
        }
    } else if(oldTree.type === newTree.type){
        // 比较属性是否更改
        let attrs = dirrAttr(oldTree.props,newTree.props);

        if(Object.keys(attrs).length > 0){
            currentPatch.push({type:ATTRS,attrs});
        }

        // 比较子对象
        diffChildren(oldTree.children,newTree.children,index,patches);
    } else{
        // 节点替换情况
        currentPatch.push({type:REPLACE,newTree});
    }

    if(currentPatch.length > 0){
        // 大补丁包
        patches[index] = currentPatch;
    }
}
```

## patch 差异补丁
```javascript
// 根据补丁对象，更新DOM

let allPatches;
let index = 0;

function patch(node, patches) {
    allPatches = patches;
    walk(node);
}

function walk(node) {

   
    let currentPatch = allPatches[index++];
    console.log(currentPatch)
    let childNodes = node.childNodes;

    childNodes.forEach(child => walk(child));
    if (currentPatch) {
        doPatch(node, currentPatch);
    }
}

function doPatch(node, patches) {
    patches.forEach(patch => {
        switch (patch.type) {
            case ATTRS:
                for(let key in patch.attrs){
                    let value =  patch.attrs[key];
                    if(value){
                        setAttr(node,key,value);
                    }
                }
                break;
            case TEXT:
                node.textContent = patch.text;
                break;
            case REPLACE:
                let newNode;
                if(patch.newTree instanceof Element){
                    newNode = render(patch.newTree);
                } else {
                    newNode = document.createTextNode(patch.newTree);
                }
                node.parentNode.replaceChild(newNode,node);
                break;
            case REMOVE:
                node.parentNode.removeChild(node);
                break;
            default:
                break;    
        }
    });
}
```