---
title: Less mixins
lang: zh-CN
---

#  基于Less 封装的一些通用 mixin 函数

## close icon 关闭图标
* 参数说明
@width 斜边长度
@weight 粗细度
@color  背景颜色
```css
.close(@width:18px,@weight:2px,@color:@colorRed){
	position: relative;
	transform: rotate(45deg);
	&::before{
		content: '';
		display: block; position: absolute; display: block;
		width: @width; 
		height: @weight; 
		background: @color;
		left: 50%; top: 50%;
		transform: translate3d(-50%,-50%,0);
	}
	&::after{
		content: '';
		display: block; position: absolute;display: block;
		width: @weight; height: @width; 
		background: @color; 
		left: 50%; top: 50%; transform:translate3d(-50%,-50%,0);
	}
}
```


## 箭头样式

* 参数说明
@width 箭头长度
@weight 箭头粗细度
@color  背景颜色
@direction 方向
```css

// 
.arrowcommon(@color:@colorRed,@width:5,@height:2){
	content: '';
	width: @width;
	height: @width;
	display: block; position: absolute;
	border-top: @height solid @color;
	border-left: @height solid @color;
	left: 50%; top: 50%; 
}

// 朝左
.arrows(@color,@direction,@width,@height) when (@direction = "left"){
	position: relative;
	&::before{
        .arrowcommon(@color,@width,@height);
        transform: rotate(-45deg);
        margin-left: ceil(-(@width - @height - @width/2)/2);
        margin-top: ceil(-(@width + @height)/2);
	}
}

// 朝右
.arrows(@color,@direction,@width,@height) when (@direction = "right"){
	position: relative;
	&::before{
		.arrowcommon(@color,@width,@height);
		transform: rotate(135deg);
		margin-left: ceil(-(@width + @height + @width/2)/2);
		margin-top: ceil(-(@width + @height)/2);
	}
}

// 朝上
.arrows(@color,@direction,@width,@height) when (@direction = "top"){
	position: relative;
	&::before{
		.arrowcommon(@color,@width,@height);
		transform: rotate(45deg);
		margin-left: ceil(-(@width + @height)/2);
		margin-top: ceil(-(@width + @height - @width/2)/2);
	}
}

// 朝下
.arrows(@color,@direction,@width,@height) when (@direction = "bottom"){
	position: relative;
	&::before{
		.arrowcommon(@color,@width,@height);
		transform: rotate(-135deg);
		margin-left: ceil(-(@width + @height)/2);
		margin-top: ceil(-(@width + @height + @width/2)/2);
	}
}
```