---
title: 4种常见排序算法
lang: zh-CN
---

# 4种常见排序算法(快速,插入,选择,冒泡)

## 1:快速排序
```javascript

// 快速排序算法
function quickSort(arr){
 
    if(arr.length <= 1){
        return arr;
    }
    let middle = Math.ceil((arr.length/2));
    let temp = arr.splice(middle, 1)[0];;
    let left = [];
    let right = [];
    for(let i = 0; i < arr.length; i++){
        if(temp > arr[i]){
            left.push(arr[i]);
        } else{
            right.push(arr[i]);
        }
    }
    // console.log(arr);
    return quickSort(left).concat([temp], quickSort(right));
}
```

## 2:选择排序
```javascript
// 选择排序算法
// 找到最小的数字，并记录下标，
function selectSort(arr){
    for(let j = 0; j < arr.length - 1; j++){
        let min = j;
        for(let i = j + 1; i < arr.length; i++){
            if(arr[i] < arr[min]){
                min = i;
            }
        }
        let temp = arr[j];
        arr[j] = arr[min];
        arr[min] = temp;
    }
    return arr;
}
```


## 3:插入排序
```javascript
// 插入排序算法
function insetSort(arr){
    for(let i = 1; i < arr.length; i++){
        let j = i;
        while(j > 0){
            if(arr[j] < arr[j-1]){
                let temp = arr[j-1];
                arr[j-1] = arr[j];
                arr[j] = temp;
                j--;
            } else{
                break;
            }
        }
    }
    return arr;
}
```


## 4:冒泡排序
```javascript
// 冒泡排序算法
function bubbleSort(arr){
    for(let j = arr.length - 1; j > 0; j --){
        for(let i = 0; i < j; i++){
            if(arr[i] > arr[i+1]){
                var temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
            }
        }
    }
        
    return arr;
}
```

```javascript
var arr = [1,9,7,6,4,8];
// console.log(selectSort(arr));
// console.log(bubbleSort(arr));
// console.log(insetSort(arr));
console.log(selectSort(arr));
```