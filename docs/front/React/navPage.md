---
sideBarTitle: React NavPage 组件
title:  NavPage 组件
lang: zh-CN
---


# React NavPage 组件


## 组件源码
```javascript
import useScroll from "../hooks/useScroll"
import React, { RefObject, useState, useRef, useEffect, useImperativeHandle, forwardRef, useMemo } from "react"

export interface navPageProps<T = string | number, S = RefObject<HTMLElement> | string> {
  scrollContainer: S;
  scrollNavContainer: S;
  keyList?: Array<T>
  floorIdPrefix?: string
  navIdPrefix?: string
  children?: any
  height: number;
  fixedStyle?: React.CSSProperties
  onChange?(key?: T): void
}


export interface floorOffsetTopMapProps {
  [propsName: string]: number;
}

export interface navPageUtilProps<T = string | number, S = RefObject<HTMLElement> | string> {
  floorOffsetTopMap?: floorOffsetTopMapProps,
  mergeStyle(style: React.CSSProperties): React.CSSProperties
  getOffsetLeft?(elment: HTMLElement): number
  getOffsetTop?(elment: HTMLElement): number
  getFloorOffsetTop?(keyList: Array<T>, floorIdPrefix: string): floorOffsetTopMapProps
  getActiveFloorKey?(keyList: Array<T>, floorIdPrefix: string, clientHeight: number, scrollTop: number): T
  scrollToNav?(scrollNavContainer: S, key: T, navIdPrefix: string): void
  scrollToFloor?(scrollElment: HTMLElement, key: T, floorIdPrefix: string, navHeight: number): void
  getNavNodeByKey(key: T, navIdPrefix: string): HTMLElement | null
  getNavFloorByKey(key: T, floorIdPrefix: string): HTMLElement | null
}


export class NavPageUtil implements navPageUtilProps{
  floorOffsetTopMap = null
  mergeStyle(fixedStyle) {
    return {
      position: "fixed",
      left: 0,
      right: 0,
      top: 0,
      ...fixedStyle
    }
  }
  getOffsetLeft(elment) {
    let offsetLeft = 0;
    while (elment != window.document.body && elment != null) {
      offsetLeft += elment.offsetLeft;
      elment = (elment.offsetParent as HTMLElement);
    }
    return offsetLeft;
  }
  getOffsetTop(elment) {
    let offsetTop = 0;
    while (elment != window.document.body && elment != null) {
      offsetTop += elment.offsetTop;
      elment = (elment.offsetParent as HTMLElement);
    }
    return offsetTop;
  }
  getFloorOffsetTop(keyList, floorIdPrefix) {
    let maps = {}
    keyList.forEach((item: any) => {
      const idName = `${floorIdPrefix}${item}`
      const floorElement: HTMLElement | null = document.getElementById(idName)
      if (floorElement) {
        maps[idName] = this.getOffsetTop(floorElement)
      }
    })
    return maps
  }
  getActiveFloorKey(keyList, floorIdPrefix, clientHeight, scrollTop) {
    if(!this.floorOffsetTopMap){
      this.floorOffsetTopMap = this.getFloorOffsetTop(keyList, floorIdPrefix)
    }
    let floorIdNames: string = floorIdPrefix;
    for (let floor in this.floorOffsetTopMap) {
      if ((this.floorOffsetTopMap[floor] - clientHeight) < scrollTop) {
        floorIdNames = floor;
      }
    }
    return floorIdNames.split(floorIdPrefix)[1]
  }
  getNavNodeByKey(key, navIdPrefix) {
    return document.getElementById(`${navIdPrefix}${key}`)
  }
  getNavFloorByKey(key, floorIdPrefix) {
    return document.getElementById(`${floorIdPrefix}${key}`)
  }
  scrollToNav(scrollNavContainer, key, navIdPrefix) {
    let scrollNavElement = null
    if (typeof scrollNavContainer === "string") {
      scrollNavElement = document.querySelector(scrollNavContainer)
    } else {
      scrollNavElement = scrollNavContainer.current
    }
    if (scrollNavElement) {
      const navNode = this.getNavNodeByKey(key, navIdPrefix)
      if (navNode) {
        const overflowWidthRight = navNode.offsetLeft - scrollNavElement.scrollLeft + navNode.clientWidth - scrollNavElement.clientWidth
        const overflowWidthLeft = navNode.offsetLeft - scrollNavElement.scrollLeft
        if (overflowWidthRight > 0) {
          const scrollWidth = Math.abs(overflowWidthRight) >= navNode.clientWidth ? overflowWidthRight : navNode.clientWidth
          scrollNavElement.scrollTo(scrollNavElement.scrollLeft + scrollWidth, 0)
        } else if (overflowWidthLeft < 0) {
          scrollNavElement.scrollTo(scrollNavElement.scrollLeft - Math.abs(navNode.clientWidth), 0)
        }
      }
    }
  }
  scrollToFloor(scrollElment, key, floorIdPrefix, navHeight = 0) {
    const floorNode = this.getNavFloorByKey(key, floorIdPrefix)
    if (key && scrollElment && floorNode) {
      const offsetTop = this.getOffsetTop(floorNode)
      scrollElment.scrollTo(0, offsetTop - navHeight)
    }
  }
}

const NavPage = (props: navPageProps, ref: React.Ref<any>) => {
  let { children, scrollContainer, floorIdPrefix, keyList = [], scrollNavContainer, navIdPrefix,height = 0, onChange = () => { }, fixedStyle = {} } = props
  const [navStyle, setNavStyle] = useState<React.CSSProperties>({})
  const disScrollRef = useRef(false)
  const navRef = useRef<any>(null)
  const scrollInfo = useScroll(scrollContainer, 50)
  const navPageUtilInstanceRef = useRef<navPageUtilProps>(new NavPageUtil())

  const navPageUtil = useMemo(() => {
    return navPageUtilInstanceRef.current
  },[navPageUtilInstanceRef])

  const handleScrollToNav = (key) => {
    navPageUtil.scrollToNav(scrollNavContainer, key, navIdPrefix)
  }

  const handleScrollToFloor = (key) => {
    setDisScroll(true)
    navPageUtil.scrollToFloor(scrollInfo.scrollElement, key, floorIdPrefix, height)
    handleScrollToNav(key)
  }

  const setDisScroll = (status: boolean) => {
    disScrollRef.current = status
  }
  const getDisScroll = (): boolean => {
    return disScrollRef.current
  }

  useImperativeHandle(ref, () => ({
    scrollToFloor: handleScrollToFloor,
    scrollToNav: handleScrollToNav,
    scrollTo(key: string | number){
      handleScrollToNav(key);
      handleScrollToFloor(key);
    }
  }))

  useEffect(() => {
    const navNode: HTMLElement = navRef.current
    if (navNode) {
      const navRect = navNode.getBoundingClientRect()
      if (navRect.top <= 0 && navStyle.position !== "fixed") {
        const mergeStyle = navPageUtil.mergeStyle(fixedStyle)
        setNavStyle(mergeStyle)
      } else if(navRect.top > 0 && navStyle.position === "fixed") {
        setNavStyle(fixedStyle)
      }
    }
  }, [scrollInfo, navStyle])

  useEffect(() => {
    if (!getDisScroll()) {
      const activeFloorKey = navPageUtil.getActiveFloorKey(keyList, floorIdPrefix, scrollInfo.clientHeight, scrollInfo.scrollTop)
      if (activeFloorKey) {
        handleScrollToNav(activeFloorKey)
        onChange(activeFloorKey)
      }
    }
    setDisScroll(false)
  }, [scrollInfo])


  return <div ref={navRef} style={{ height: height+"px" }}>
    <div style={navStyle}>{children}</div>
  </div>
}

export default forwardRef(NavPage)

```


## 调用方式
```javascript
import React, { useState, useRef, useEffect } from "react";

import NavPage from "../components/NavPage"


export default function NavPageDemo() {
  const data = [{
    section_id: 1,
    list: "楼层1"
  }, {
    section_id: 2,
    list: "楼层2"
  }, {
    section_id: 3,
    list: "楼层3"
  }, {
    section_id: 4,
    list: "楼层4"
  },{
    section_id: 5,
    list: "楼层5"
  },{
    section_id: 6,
    list: "楼层6"
  },{
    section_id: 7,
    list: "楼层7"
  }]
  const keyList = data.map(item =>  item.section_id)
  const [currentKey, setCurrentKey] = useState(0)
  const scrollNavRef = useRef(null)
  const fixedNavRef = useRef(null)

  const handleChangeActive = (key) => {
    setCurrentKey(+key)
  }

  const handleClick = (key) => {
    setCurrentKey(+key)
    fixedNavRef.current.scrollToFloor(+key);
  }

  // 设置默认key
  useEffect(() => {
    setTimeout(() => {
      const defaultKey = 5
      setCurrentKey(defaultKey)
      fixedNavRef.current.scrollTo(+defaultKey);
    });
  },[])
  
  const floorIdPrefix = "J_section"
  const navIdPrefix = "J_nav_item"
  return <div id="J_nav_page_demo" style={{ height: "100%", overflow: "auto" }}>
    <div style={{ height: "200px" }}><h2>React Nav Page Demo</h2></div>

    <NavPage fixedStyle={styleFixedStyle} height={60} ref={fixedNavRef}  onChange={handleChangeActive} floorIdPrefix={floorIdPrefix} scrollContainer="#J_nav_page_demo" scrollNavContainer={scrollNavRef} navIdPrefix={navIdPrefix} keyList={keyList}>
      <nav style={styleNavWrap}>
        <ul ref={scrollNavRef} style={styleScrollNav}>
          {data.map((item: any) => {
            return <li style={{...styleNavItem,...Object.assign({},item.section_id === currentKey ? styleCurrent : {})}} id={`${navIdPrefix}${item.section_id}`} onClick={e => handleClick(item.section_id)} className={` ${item.section_id === currentKey ? 'current' : ''}`} key={item.section_id}>
              {item.list}
            </li>
          })}
        </ul>
      </nav>
    </NavPage>
    {
      data.map((item:any) => {
        return <div key={item.section_id} id={`${floorIdPrefix}${item.section_id}`} style={styleFloorItem}><h2>{item.list}</h2></div>
      })
    }
  </div>
}

const styleNavWrap:React.CSSProperties = {backgroundColor:"red"}
const styleFixedStyle:React.CSSProperties = {zIndex:999}
const styleScrollNav:React.CSSProperties = {height: "60px", overflow:"auto",whiteSpace: "nowrap"}
const styleNavItem:React.CSSProperties = {display: "inline-block", lineHeight:"60px", width:"100px", textAlign:"center"}
const styleFloorItem :React.CSSProperties= { height: "600px", border: "1px solid red", backgroundColor: "gray" }
const styleCurrent :React.CSSProperties= {
  backgroundColor:"gray"
}
```


## API 文档说明

### NavPageProps  参数说明
|属性|说明|类型|默认值|
|:--|:--|:--|:--|
|scrollContainer|滚动容器|`RefObject<HTMLElement> | string`|无|
|keyList|key数组|`number[] | string []`|无|
|floorIdPrefix|楼层区块`id`名称前缀|`string`||
|navIdPrefix|导航栏`id`名称前缀|`string`|无|
|children|自定义导航栏元素|`React.ReactNode`|无|
|height|导航栏高度，单位px|`number`|0|
|fixedStyle|固定顶部样式|`React.CSSProperties`|{position: "fixed",left: 0,right: 0,top: 0,}|
|onChange|滚动的时候key变更回调|`function(key){}`|

### 父组件调用的方法
|方法名|参数名|说明|
|:--|:--|:--|
|scrollToFloor|`key: number| string`|设置当前floor|
|scrollToNav|`key: number| string`|设置当前nav|
|scrollTo|`key: number| string`|同时设置 nav和floor|