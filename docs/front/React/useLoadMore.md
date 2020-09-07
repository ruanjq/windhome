---
sideBarTitle: React 滚动分页加载组件
title:  React useLoadMore hook
lang: zh-CN
---

# React useLoadMore hook

## hook 组件代码
```tsx
import { useEffect, useState, RefObject } from 'react'
import useScroll from './useScroll'

interface UseLoadMorePorps {
  ref: RefObject<HTMLElement> | string
  throttleNum?: number
  distanceToLoadMore?: number
}

const useLoadMore = (props: UseLoadMorePorps) => {
  const { ref, throttleNum = 300, distanceToLoadMore = 5 } = props
  const [refreshing, setRefreshing] = useState(false)
  const scrollInfo = useScroll(ref, throttleNum)
  useEffect(() => {
    const { scrollTop, clientHeight, scrollHeight, direction } = scrollInfo
    if (
      scrollTop > 0 &&
      direction === 'down' &&
      Math.ceil(scrollTop + clientHeight + distanceToLoadMore) >= Math.ceil(scrollHeight)
    ) {
      setRefreshing(true)
    } else {
      setRefreshing(false)
    }
  }, [scrollInfo, distanceToLoadMore])
  return refreshing
}

export default useLoadMore
```

## API 文档说明
### UseLoadMorePorps  参数说明
|属性|说明|类型|默认值|
|:--|:--|:--|:--|
|ref|滚动的容器元素|`RefObject<HTMLElement> | string`|无|
|throttleNum|节流间隔,单位毫秒|`React.ReactNode`|`300`|
|distanceToLoadMore|距离底部多少距离触发加载事件,单位px|`number`|`5`|


## 调用方式
```tsx
import React, { useEffect, useState, memo, useRef, useCallback } from 'react'
import useLoadMore from './useLoadMore'

// 引入hook
// 当hook返回值为true，触发加载事件，
// 当返回值为false，不触发加载
const checkLoadMore = useLoadMore({ ref: '#J_my_order', distanceToLoadMore: 80 })

const fetchData = () => {
  // load data
}

useEffect(() => {
  if (checkLoadMore) {
    fetchData()
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [checkLoadMore])
```