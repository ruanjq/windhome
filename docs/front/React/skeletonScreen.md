---
sideBarTitle: React 骨架屏加载
title:  React 骨架屏加载
lang: zh-CN
---

# React 骨架屏加载

## 作用
- `Skeleton Screen` 提升用户体验及loading加载效果

## SkeletonScreen hook 组件
```tsx
import React, { memo, useEffect, useState, useCallback } from 'react'
import { unmountComponentAtNode, render } from 'react-dom'
import './skeletonScreen.less'

interface SkeletonScreenContentProps {
  className: string
  children: any
  loading: boolean
  onUnMount(e:any):void
}

let skeletonScreenContainer: HTMLElement | null = null
const SkeletonScreenContent: any = (props: SkeletonScreenContentProps) => {
  const { className, children, loading, onUnMount = () => {} } = props

  const [hideClassName, setHideClassName] = useState('')
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setHideClassName('skeleton-screen_transition_leave')
      }, 150)
      setTimeout(() => {
        onUnMount()
      }, 400)
    } else {
    }
  }, [loading, onUnMount])
  return (
    <div className={`skeleton-screen skeleton-screen_transition ${hideClassName} ${className}`}>
      {children}
    </div>
  )
}

interface SkeletonScreenProps{
  className: string
  children: any
  loading: boolean
}

const SkeletonScreen = memo((props: SkeletonScreenProps) => {
  const { className, children, loading } = props

  const unMount = () => {
    if (skeletonScreenContainer) {
      unmountComponentAtNode(skeletonScreenContainer)
      skeletonScreenContainer.remove()
      skeletonScreenContainer = null
    }
  }

  const handleUnMount = useCallback(() => {
    unMount()
  }, [])

  useEffect(() => {
    if (!skeletonScreenContainer) {
      skeletonScreenContainer = document.createElement('div')
      skeletonScreenContainer.className = 'skeleton-screen-container'
      document.body.insertAdjacentElement('afterbegin', skeletonScreenContainer)
    }

    return unMount
  }, [])

  useEffect(() => {
    render(
      <SkeletonScreenContent
        onUnMount={handleUnMount}
        className={className}
        children={children}
        loading={loading}
      />,
      skeletonScreenContainer
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, children, className])

  return null
})
export default SkeletonScreen
```

```less
// skeletonScreen.less

// 背景色
.skeleton-screen_bg {
  background-color: rgba(219, 217, 216, 0.6) !important;
}

// 背景色+动画效果
.skeleton-screen_bg_animation {
  .skeleton-screen_bg;
  background-image: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100% !important;
  background-position: 100% 50% !important;
  animation: skeleton-loading 1.2s ease infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}

.skeleton-screen {
  background: rgb(247, 248, 249);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 999;
  overflow: hidden !important;
}

.skeleton-screen_transition {
  opacity: 1;
  visibility: visible;
  transition: all 0.2s ease-out;
}

.skeleton-screen_transition_leave {
  visibility: hidden;
  opacity: 0;
}
```

## API 文档说明
### SkeletonScreenProps  参数说明
|属性|说明|类型|默认值|
|:--|:--|:--|:--|
|className|自定义样式名称|`string`|无|
|children|自定义导航栏元素|`React.ReactNode`|无|
|loading|加载状态|`boolean`|`false`|

## 调用方式
```tsx
import React, { memo } from 'react'
import SkeletonScreen from './common'
import './skeletonScreenDetails.less'

const SkeletonScreenDetails = memo((props: any) => {
  const { loading = false } = props
  return (
    <SkeletonScreen
      loading={loading}
      className="skeleton-screen_seckill_details seckill-details-wrap"
    >
      <div className="slider-banner-wrap">
        <div className="scroll-item skeleton-screen_bg_animation"></div>
        <div className="custom-slide-dots skeleton-screen_bg"></div>
      </div>
      <div className="time-wrap skeleton-screen_bg_animation"></div>
      <div className="goods-info">
        <h3 className="goods-title skeleton-screen_bg_animation">&nbsp;</h3>
        <div className="goods-stock">
          <div className="sold-qyt skeleton-screen_bg"></div>
          <div className="stock-qyt skeleton-screen_bg"></div>
        </div>
      </div>
      <div className="goods-desc">
        <div className="title skeleton-screen_bg_animation"></div>
        <div className="goods-img skeleton-screen_bg_animation"></div>
      </div>
      <div className="seckill-details-foot-btn-wrap">
        <div className="more-btn skeleton-screen_bg"></div>
        <div className="order-btn skeleton-screen_bg_animation"></div>
        <div className="order-btn skeleton-screen_bg_animation"></div>
      </div>
    </SkeletonScreen>
  )
})

export default SkeletonScreenDetails
```

```less
// skeletonScreenDetails.less

// 写具体页面的样式
.skeleton-screen_seckill_details {
  .scroll-item {
    width: 145px;
    height: 24px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    border-radius: 24px;
  }

  .custom-slide-dots {
    width: 35px;
  }

  .goods-title {
    height: 22px;
    width: 60%;
  }

  .sold-qyt,
  .stock-qyt {
    width: 40px;
    height: 20px;
  }

  .goods-desc {
    .title {
      width: 60%;
      height: 20px;
    }

    .goods-img {
      width: 100%;
      height: 400px;
    }
  }

  .more-btn {
    height: 35px;
  }
}
```

## 预览效果图
### 设计稿
![React 骨架屏加载](/images/front/details.png "")

### loading 效果
![React 骨架屏加载](/images/front/skeletonScreen.gif "")

### 整体效果
![React 骨架屏加载](/images/front/skeletonScreenDetails.gif "")