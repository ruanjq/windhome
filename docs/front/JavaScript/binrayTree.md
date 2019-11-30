---
title: 搜索二叉树
lang: zh-CN
---

# 搜索二叉树

搜索二叉树特点
* 若左子树不为空，则左子树上所有的节点值均小于它根节点的值
* 若右子树不为空，则右子树上所有的节点的值均大于它跟节点的值
* 左右子树也分别为二叉树
* 没有键值相等的节点
    
二叉树遍历（根节点位置不一样）
- 1：前序遍历     根节点-> 左节点->右节点
- 2：中序遍历     左节点->根节点->右节点
- 3：后序遍历     左节点->右节点->根节点



```javascript
class Node {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class binrayTree {

    constructor() {
        this.root = null;
    }
    insert(data) {
        let n = new Node(data, null, null);
        if (this.root === null) {
            this.root = n;
        } else {
            let current = this.root;
            while (true) {
                if (n.data < current.data) {
                    if (current.left != null) {
                        current = current.left;
                    } else {
                        current.left = n;
                        break;
                    }
                } else {
                    if (current.right != null) {
                        current = current.right;
                    } else {
                        current.right = n;
                        break;
                    }
                }
            }
        }
    }

    // 前序遍历
    preOrder() {
        let result = [];
        (function iteration(node){
            if (node !== null) {
                result.push(node.data);
                iteration(node.left);
                iteration(node.right);
            }
        })(this.root);
        return result;
    }

    // 中序遍历
    inOrder() {
        let result = [];
        (function iteration(node){
            if (node !== null) {
                iteration(node.left);
                result.push(node.data);
                iteration(node.right);
            }
        })(this.root);
        return result;
    }
    // 后序遍历
    postOrder() {
        let result = [];
        (function iteration(node){
            if (node !== null) {
                iteration(node.left);
                iteration(node.right);
                result.push(node.data);
            }
        })(this.root);
        return result;
    }

    getMaxValue(){
        let current = this.root;
        let maxv = current.data;
        while(current.right !== null){
            current = current.right;
            if(current.data > maxv){
                maxv = current.data;
            }
        }
        return maxv;
    }

    getMinValue(){
        let current = this.root;
        let minv = current.data;
        while(current.left !== null){
            current = current.left;
            if(current.data < minv){
                minv = current.data;
            }
        }
        return minv;
    }

    getNode(data){
        let result = null;
        let current = this.root;
        while(current != null){
            if(data > current.data){
                current = current.right;
            } else if(data < current.data) {
                current = current.left;
            } else{
                result = current;
                break;
            }
        }
        return result;
    }


}

let bst = new binrayTree();
bst.insert(12);
bst.insert(99)
bst.insert(1)
bst.insert(8)
bst.insert(9)
bst.insert(18)
bst.insert(16)
bst.insert(20);
bst.insert(22);
console.log('bst:', bst);

console.log("-----------前序-------",bst.preOrder());
console.log("-----------中序-------",bst.inOrder());
console.log("-----------后序-------",bst.postOrder());

console.log("最大值：",bst.getMaxValue());
console.log("最小值：",bst.getMinValue());

console.log(bst.getNode(20));
```
