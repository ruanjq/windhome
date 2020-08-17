---
sideBarTitle: React CountDown 组件
title:  CountDown 组件
lang: zh-CN
---


# React CountDown 组件


## hook代码
```javascript
import React, { useState, useRef, useEffect } from "react";
import useCountDown from "./useCountDown"
export type precision = "days" | "hours" | "minutes" | "seconds"

export type TConvertTime = {
  [propsName in precision]: string
}

export const fixTime = (num:number) => {
  return (num < 10 ? "0" : "") + num;
}

export const convertTime = (leftTime: number): TConvertTime => {
  let result: TConvertTime = {
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  }

  let seconds = leftTime;
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  result = {
    days: fixTime(days),
    hours: fixTime(hours % 24),
    minutes: fixTime(minutes % 60),
    seconds: fixTime(seconds % 60),

  }
  return result
}


export interface CountDownProps {
  template: string
  leftTime?: number
  precision?: precision
  style?:React.CSSProperties
  onFinish?(): void
}



export const CountDown = (props: CountDownProps) => {
  const { template, leftTime = 0, precision = "hours", style = {}, onFinish = () => { }} = props
  const leftNum = useCountDown(leftTime)
  let time: TConvertTime = {
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  }
  if (leftNum <= 0) {
    onFinish()
  } else {
    if (precision !== "seconds") {
      time = convertTime(leftNum)
    }
    switch (precision) {
      case "hours":
        const hours = parseInt(time.hours) + parseInt(time.days) * 24
        time.hours = fixTime(hours)
        break;
      case "minutes":
        const hours2 = parseInt(time.hours) + parseInt(time.days) * 24
        time.minutes = fixTime(parseInt(time.minutes) + hours2 * 60)
        break;
      case "seconds":
        time.seconds = fixTime(leftNum)
        break;
      default:
        break
    }
  }

  const replaceTemplate = template.replace(/%H/, time.hours).replace(/%M/, time.minutes).replace(/%S/, time.seconds)
  return <div style={style} dangerouslySetInnerHTML={{ __html: replaceTemplate }} />
}


// 测试用例
const App = () => {
  const countDownTemplate = `
    <div class="count-down">
      <span class="num">%H</span>
      <span class="text">时</span>
      <span class="num">%M</span>
      <span class="text">分</span>
      <span class="num">%S</span>
      <span class="text">秒</span>
    </div>
  `
  const handleCountDownFinish = () => {
    console.log("倒计时结束")
  }
  return <div>
    <CountDown template={countDownTemplate} leftTime={diffTime} precision="hours" onFinish={handleCountDownFinish}/>
  </div>
}

```



## API 文档说明

### CountDownProps  参数说明
|属性|说明|类型|默认值|
|:--|:--|:--|:--|
|template|倒计时模板样式|`string`|无|
|leftTime|剩余秒数|`number`|无|
|precision|倒计时精确度,参考 `precision`类型说明|`precision`|`hours`|
|style|组件css 样式|`React.CSSProperties`|无|
|onFinish|倒计时结束回调|`function`|无|

### precision 类型说明
|类型|说明|
|:--|:--|
|`days`|精确到天数|
|`hours`|精确到小时|
|`minutes`|精确到分钟|
|`seconds`|精确到秒数|
