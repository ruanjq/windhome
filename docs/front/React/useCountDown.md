---
sideBarTitle: React Hook useCountDown 
title: React Hook useCountDown 
lang: zh-CN
---


# React Hook useCountDown 倒计时


## hook代码
```javascript
import React, { useState, useRef, useEffect } from "react";

export const useCountDown = (leftSecond: number): number => {
  const [leftTime, setLeftTime] = useState<number>(leftSecond - 1)
  const leftSecondRef = useRef<number>(leftSecond - 1)
  useEffect(() => {
    if (leftSecondRef.current > 0) {
      let leftSecondCurrent = leftSecondRef.current
      let timerId:number| null = null;
      const run = () => {
        if (leftSecondCurrent <= 0) {
          return () => {
            timerId && clearTimeout(timerId);
          };
        }
        leftSecondCurrent = leftSecondCurrent - 1
        setLeftTime(leftSecondCurrent);
        timerId = setTimeout(run, 1000);
      };
      timerId = setTimeout(run, 1000);
      return () => {
        timerId && clearTimeout(timerId);
      };
    }
  }, [leftSecondRef]);
  return leftTime
}

// hook 测试用例
const App = () => {
  const useCount = useCountDown(100)
  // useCount 99
  // useCount 98
  // useCount 97
  // ... 
  // useCount 0
  return <div>{useCount}</div>
}

```



## API 文档说明

### useCountDown Hook 参数说明
|属性|说明|类型|默认值|
|:--|:--|:--|:--|
|leftSecond|剩余秒数|`number`|无|

