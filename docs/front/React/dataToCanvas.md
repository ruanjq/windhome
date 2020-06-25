---
sideBarTitle: React Canvas 组件
title: dataToCanvas 组件
lang: zh-CN
---


# React dataToCanvas 组件


## 组件代码
```javascript

import React, { useRef, useEffect, FC } from "react";

// dataToCanvas.tsx
/**
 * @description 加载图片链接
 * @param src
 */
export const loadImg = (src: string): Promise<any> => {
  if (src === "") {
    return Promise.reject("img src empty");
  }
  return new Promise((resolve, reject) => {
    let image = new Image();

    // 加载图片的时候记得设置允许跨域
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = function () {
      resolve(image);
    };

    image.onerror = function (e) {
      console.error("load img err", e);
      reject();
    };
    image.src = src;
  });
};

/**
 * @description 加载所有图片
 * @param arrSrc
 */
export const ArrLoadImg = (arrSrc: string[]): Promise<any> => {
  let arrLoadImgPromise: any = [];
  arrSrc.forEach((item) => {
    arrLoadImgPromise.push(loadImg(item));
  });
  return Promise.all(arrLoadImgPromise);
};

/**
 * @description 文本换行处理，并返回实际文字所占据的高度
 * @param context  canvas ctx
 * @param text  文本数据
 * @param x x坐标位置
 * @param y y坐标位置
 * @param maxWidth  最大宽度
 * @param lineHeight  行高
 * @param row  显示的行数
 */
const textEllipsis = (
  context: any,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: any,
  row: number
) => {
  if (
    typeof text !== "string" ||
    typeof x !== "number" ||
    typeof y !== "number"
  ) {
    return;
  }
  let canvas = context.canvas;

  if (typeof maxWidth === "undefined") {
    maxWidth = (canvas && canvas.width) || 300;
  }

  if (typeof lineHeight === "undefined") {
    // 有些情况取值结果是字符串，比如 normal。所以要判断一下
    let getLineHeight = window.getComputedStyle(canvas).lineHeight;
    let reg = /^[0-9]+.?[0-9]*$/;
    lineHeight = reg.test(getLineHeight) ? getLineHeight : 20;
  }

  // 字符分隔为数组
  let arrText = text.split("");
  // 文字最终占据的高度，放置在文字下面的内容排版，可能会根据这个来确定位置
  let textHeight = 0;
  // 每行显示的文字
  let showText = "";
  // 控制行数
  let limitRow = row;
  let rowCount = 0;

  for (let n = 0; n < arrText.length; n++) {
    let singleText = arrText[n];
    let connectShowText = showText + singleText;
    // 没有传控制的行数，那就一直换行
    let isLimitRow = limitRow ? rowCount === limitRow - 1 : false;
    let measureText = isLimitRow ? connectShowText + "..." : connectShowText;
    let metrics = context.measureText(measureText);
    let textWidth = metrics.width;

    if (textWidth > maxWidth && n > 0 && rowCount !== limitRow) {
      let canvasShowText = isLimitRow ? measureText : showText;
      context.fillText(canvasShowText, x, y);
      showText = singleText;
      y += lineHeight;
      textHeight += lineHeight;
      rowCount++;
      if (isLimitRow) {
        break;
      }
    } else {
      showText = connectShowText;
    }
  }
  if (rowCount !== limitRow) {
    context.fillText(showText, x, y);
  }

  let textHeightValue =
    rowCount < limitRow ? textHeight + lineHeight : textHeight;
  return textHeightValue;
};

/**
 * @description 获取屏幕像素设备比例
 * @param context
 */
const getPixelRatio = (context: any) => {
  let backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;
  return (window.devicePixelRatio || 1) / backingStore;
};

/**
 * @description 绘制圆形图片
 * @param ctx  canvas ctx
 * @param img  img 对象
 * @param x   x坐标
 * @param y   y坐标
 * @param width  图片宽度
 */
const circleImg = (
  ctx: any,
  img: HTMLImageElement,
  x: number,
  y: number,
  width: number
) => {
  ctx.save();
  const r = width / 2;
  const d = 2 * r;
  const cx = x + r;
  const cy = y + r;
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.clip();
  ctx.drawImage(img, x, y, d, d);
  ctx.restore();
};

/**
 * @description 绘制圆形边框样式
 * @param ctx  canvas ctx
 * @param x  x坐标
 * @param y  y坐标
 * @param width width 宽度
 * @param borderStyle  边框样式
 */
const drawCircleBorder = (
  ctx: any,
  x: number,
  y: number,
  width: number,
  borderStyle: any
) => {
  ctx.save();
  const r = width / 2;
  const cx = x + r;
  const cy = y + r;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  for (const attr in borderStyle) {
    const value = borderStyle[attr];
    ctx[attr] = value;
  }
  ctx.stroke();
  ctx.restore();
};

type DataType = "text" | "images" | "linearGradient" | undefined;

export interface ILinearGradient {
  type?: DataType;
  linearGradienAxis?: [number, number, number, number];
  colorStops?: [[number, string], [number, string]];
  fillRect?: [number, number, number, number];
}

export interface IImages {
  type?: DataType;
  src?: string;
  size?: number[];
  position?: number[];
  circle?: boolean;
  circleBorder?: {
    lineWidth: number;
    strokeStyle: string;
  };
}

export interface IText {
  type?: DataType;
  text?: string;
  position?: number[];
  style?: {
    fillStyle?: string;
    fontSize?: number;
    ellipsis?: boolean;
    lineHeight?: number;
    maxWidth?: number;
    row?: number;
  };
}

export interface IDataItem extends IImages, ILinearGradient, IText {
  [index: string]: any;
}

export interface IDataToCanvasProps {
  id: string;
  data: Array<IDataItem>;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  onFinish?: (canvas?: any) => void;
}

const DataToCanvas: FC<IDataToCanvasProps> = (props) => {
  const fontFamily =
    "'-apple-system-font, Helvetica Neue, Helvetica, sans-serif'";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    id = "canvas",
    width = 375,
    height = 667,
    style,
    onFinish = (v: any) => {},
    data,
  } = props;
  const startDraw = async (
    dataSource: IDataItem[],
    ctx: CanvasRenderingContext2D,
    ratio: number
  ) => {
    /**
     * @description 绘制文本类型
     * @param item
     */
    const drawText = async (item: IDataItem) => {
      ctx.textAlign = `left`;
      ctx.fillStyle = item.style.fillStyle;
      ctx.font = `${item.style.fontSize * ratio}px ${fontFamily}`;
      if (item.style.ellipsis) {
        textEllipsis(
          ctx,
          item.text,
          item.position[0] * ratio,
          item.position[1] * ratio,
          item.style.maxWidth * ratio,
          item.style.lineHeight * ratio,
          item.style.row
        );
      } else {
        ctx.fillText(
          item.text,
          item.position[0] * ratio,
          item.position[1] * ratio
        );
      }
      ctx.save();
      ctx.restore();
      return Promise.resolve();
    };

    /**
     * @description 绘制图片类型
     * @param item
     */
    const drawImages = async (item: IDataItem) => {
      try {
        const imgNode = await loadImg(item.src);
        item.imgNode = imgNode;
        // 判断是否画圆形
        if (item.circle) {
          circleImg(
            ctx,
            item.imgNode,
            item.position[0] * ratio,
            item.position[1] * ratio,
            item.size[0] * ratio
          );
          // 绘制圆形边框
          if (item.circleBorder) {
            if (item.circleBorder.lineWidth) {
              item.circleBorder.lineWidth = item.circleBorder.lineWidth * ratio;
            }
            drawCircleBorder(
              ctx,
              item.position[0] * ratio,
              item.position[1] * ratio,
              item.size[0] * ratio,
              item.circleBorder
            );
          }
        } else {
          ctx.drawImage(
            item.imgNode,
            item.position[0] * ratio,
            item.position[1] * ratio,
            item.size[0] * ratio,
            item.size[1] * ratio
          );
        }
        return Promise.resolve();
      } catch (error) {
        // 图片加载失败不阻塞后面的绘制过程
        return Promise.resolve();
      }
    };

    /**
     * @description 绘制渐变样式
     * @param item
     */
    const drawLinearGradient = async (item: IDataItem) => {
      if (item.linearGradienAxis.length === 4) {
        const linearGradienAxis: any = item.linearGradienAxis.map(
          (arrItem: number) => arrItem * ratio
        );
        const fillRect: any = item.fillRect.map(
          (arrItem: number) => arrItem * ratio
        );
        const linearGrad = ctx.createLinearGradient.apply(
          ctx,
          linearGradienAxis
        );
        linearGrad.addColorStop.apply(linearGrad, item.colorStops[0]); //第一个参数表示关键颜色的位置0表示起始位置,1表示终点位置,第二个参数表示关键颜色的颜色。
        linearGrad.addColorStop.apply(linearGrad, item.colorStops[1]);
        ctx.fillStyle = linearGrad;
        ctx.fillRect.apply(ctx, fillRect);
        ctx.save();
        ctx.restore();
      }
      return Promise.resolve();
    };

    if (dataSource.length > 0) {
      const copyData: any = dataSource.slice(0);
      (async function drawQueue(copyDataSource) {
        const item = copyDataSource.shift();
        if (item) {
          switch (item.type) {
            case "images":
              try {
                await drawImages(item);
              } catch (error) {}
              break;
            case "linearGradient":
              try {
                await drawLinearGradient(item);
              } catch (error) {}
              break;
            case "text":
              try {
                await drawText(item);
              } catch (error) {}
              break;
            default:
              break;
          }
          drawQueue(copyDataSource);
        } else {
          onFinish(document.getElementById(id));
        }
      })(copyData);
    } else {
      onFinish(document.getElementById(id));
    }
  };

  useEffect(() => {
    const canvas: any = canvasRef.current || null;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (context) {
      let ratio = getPixelRatio(context);
      ratio = ratio > 2 ? 2 : ratio; // 最大用2倍
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // 绘制前先清空画布
      context.clearRect(0, 0, canvas.width, canvas.height);
      startDraw(data, context, ratio);
    }
  });

  return data ? <canvas id={id} ref={canvasRef} style={style} /> : null;
};

export default DataToCanvas;
```

## 调用方式
```tsx
import React, { useRef, useEffect, FC } from "react";

export default function App() {
  const canvasData: Array<IDataItem> = [
    {
      type: "images",
      position: [0, 0],
      src:
        "https://big-c.oss-cn-hangzhou.aliyuncs.com/cms/img/uhma03zug7d1o7jdmvxlg69bx0y1tnym%E5%B0%81?t=" +
        Date.now(),
      size: [375, 667]
    },
    {
      type:"linearGradient",
      linearGradienAxis:[0, 497, 0, 667],
      colorStops:[[0.0, 'rgba(0,0,0,0)'],[1.0, 'rgba(0,0,0,0.8)']],
      fillRect:[0, 497, 375, 170]
    },
    {
      type: "images",
      position: [280, 567],
      src:
        "https://big-c.oss-cn-hangzhou.aliyuncs.com/gfqjd/genQRCode/1a2361b97358724d3912140037eb8592.jpg?t=" +
        Date.now(),
      size: [74, 74],
      circle: true,
      circleBorder: {
        lineWidth: 4,
        strokeStyle: "#FFF"
      }
    },
    {
      type: "images",
      position: [20, 567],
      src:
        "https://big-c.oss-cn-hangzhou.aliyuncs.com/cms/img/jhlmranjuhhxblv29udh5v6qx6oxxhfe%E5%B0%81?t=" +
        Date.now(),
      size: [74, 74],
      circle: true,
      circleBorder: {
        lineWidth: 2,
        strokeStyle: "#FFF"
      }
    },
    {
      type: "text",
      position: [110, 590],
      text: "未***",
      style: {
        fillStyle: '#FFF',
        fontSize: 20,
        ellipsis: true,
        lineHeight: 15,
        maxWidth: 150,
        row: 1
      }
    },
    {
      type: "text",
      position: [110, 613],
      text: "邀您扫一扫，参与活动",
      style: {
        fillStyle: "#FFF",
        fontSize: 12
      }
    }
  ];

  const onFinish = (canvas: HTMLCanvasElement) => {
    console.log(canvas);
    // 获取图片base64字符
    const dataUrl = canvas.toDataURL('image/jpeg', 1.0)
    // ...
  };

  const filteremoji = (str = '') => {
    const ranges = ['\ud83c[\udf00-\udfff]', '\ud83d[\udc00-\ude4f]', '\ud83d[\ude80-\udeff]']
    return str.replace(new RegExp(ranges.join('|'), 'g'), '')
  }

  const id = "canvas";

  return (
    <DataToCanvas
      id={id}
      width={canvasData[0].size && canvasData[0].size[0]}
      height={canvasData[0].size && canvasData[0].size[1]}
      data={canvasData}
      onFinish={onFinish}
    />
  );
}
```
![canvas 绘制图片](/images/front/dataToCanvas2.png "")


## API 文档说明

### DataToCanvas 组件属性
|属性|说明|类型|默认值|
|:--|:--|:--|:--|
|id|绘制canvas元素id|`string`|canvas|
|style|canvas画布 css 样式|`CSSProperties`||
|width|canvas 画布宽度,通常获取data数据第一个元素的size[0]|`number`|375|
|height|canvas 画布宽度,通常获取data数据第一个元素的size[1]|`number`|667|
|data|绘制canvas 的data 数据集合|`Array<IDataItem>`|[]|
|onFinish|canvas绘制结束后的回调函数|`Function(value: HTMLCanvasElement)`||

### IDataItem 接口说明
`IDataItem` 继承 `IImages` `ILinearGradient` `IText`
|属性|说明|类型|默认值|
|:--|:--|:--|:--|
|type|绘制的类型，`text`、`images`、`linearGradient` 3种取值|`string`||

### IImages 接口说明
|属性|说明|类型|默认值|
|:--|:--|:--|:--|
|type|`images`|`string`||
|src|图片链接地址，注意图片跨域情况，通常在图片链接添加随机数防止canvas绘制报错|`string`||
|position|元素绘制的位置，相对于canvas画布尺寸 [x距离,y距离]|`number[]`||
|size|当type类型为`images`时候设置绘制图片元素的宽度和高度 [宽度,高度] |`number[]`||
|circle|当type类型为`images`时候是否设置绘制图片类型为圆形|`boolean`||
|circleBorder|当type类型为`images`且`circle`为`true`时候设置边框样式,详见`circleBorder`接口说明|`object`||

### IText 接口说明
|属性|说明|类型|默认值|
|:--|:--|:--|:--|
|type|`text`|`string`||
|text|绘制的文本文案,可支持最大宽度，行数显示，超过长度和行数显示省略号,详细参考`style`属性说明|`string`||
|position|元素绘制的位置，相对于canvas画布尺寸 [x距离,y距离]|`number[]`||
|style|文本样式,详见`style属性说明`接口说明|`object`||

### ILinearGradient 接口说明
|属性|说明|类型|默认值|
|:--|:--|:--|:--|
|type|`linearGradient`|`string`||
|linearGradienAxis|对应canvas api [`CanvasRenderingContext2D.createLinearGradient()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createLinearGradient) 方法的参数|`number[]`|
|colorStops|对应canvas api [`CanvasGradient.addColorStop()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasGradient/addColorStop) 方法的参数,二维数组|`number[]`||
|fillRect|对应canvas api [`CanvasRenderingContext2D.fillRect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillRect) 方法的参数|`number[]`||


### circleBorder 属性说明
|属性|说明|类型|默认值|
|:--|:--|:--|:--|
|lineWidth|边框类型|`number`||
|strokeStyle|边框填充背景|`string`||

### style属性说明(当type为text 文本类型设置样式)
|属性|说明|类型|默认值|
|:--|:--|:--|:--|
|fillStyle|文本颜色|`string`||
|ellipsis|是否显示省略号|`boolean`||
|lineHeight|当`ellipsis`为`true`时候设置行高|`number`||
|maxWidth|当`ellipsis`为`true`时候设置最大宽度|`number`||
|row|当`ellipsis`为`true`时候设置行数|`number`||

::: danger 常见错误
- loadImg 加载图片的时候记得设置允许跨域 `image.setAttribute("crossOrigin", "anonymous")`
- 跨域图片`src`图片路径后面记得添加随机数，否则调用 `canvas.toDataURL`会出现意想不到的错误
- 绘制 `canvas` 需要获取屏幕像素设备比例动态计算实际的宽度，高度，像素大小,详见`getPixelRatio`方法
- 小程序canvas绘制`text`的时候如果文案有emoji表情包，在ios端则会绘制失败，需要过滤表情包特殊字符详见`filteremoji`函数
:::