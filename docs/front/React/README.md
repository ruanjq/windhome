---
sideBarTitle: React 面试题
title: React 面试题(一)
lang: zh-CN
---

# React 面试题(一)

## 什么是React
`React` 是一个用于构建用户界面的 `JavaScript` 库,通过`JSX`语法声明式编程方式编写函数组件，


## React 生命周期
`React` 生命周期分为三个阶段,`挂载阶段`，`更新阶段`，`卸载阶段`，`错误阶段`
- 挂载阶段：`constructor`->`static getDerivedStateFromProps`->`render`->`componentDidMount`
- 更新阶段：`static getDerivedStateFromProps`->`shouldComponentUpdate`->`render`->`getSnapshotBeforeUpdate`->`componentDidUpdate`
- 卸载阶段：`componentWillUnMount`
- 错误阶段：`static getDerivedStateFromError`,`componentDidCatch`

![React 生命周期](/images/front/react.png "React 声明周期")

::: tip 参考以下文档
[React生命周期](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
:::

## setState为什么要设计成异步的
- 保持内部的一致性，即使`state`是同步更新，`props`也不是
- 将`state`的更新延缓到最后批量合并更新再去渲染对于应用的性能优化是有极大的好处，如果每次的状态都去重新渲染真实的`DOM`,那么它将带来巨大的性能消耗。

## setState异步设计原理及应用场景
异步的作用是提高性能，降低冗余。简单的说，因为`state`具有更新队列，将所有的更新都累计到最后进行批量合并再去渲染可以极大提高应用的性能。`React`为了解决跨平台问题，在`JSX`中封装了一套事件机制，代理了原生的事件，像在`JSX`的`render`方法中返回的`dom`中添加的`onClick`,`onFocus`等方法都是合成事件，所以**setState并不是真正意义的异步操作，仅仅只是模拟了异步行为**，实现是通过`isBatchingUpdates`来判断是先存进`state队列`还是直接更新，为`true`则执行异步操作，`false`则直接更新,典型的例子为使用`setTimeout`定时器更新时，则直接使用同步操作，

## setState总结
- `setState`只在合成事件和钩子函数中是**异步**的，在原生事件和`setTimeout`中都是同步的
- `setState`的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新执行之前，导致在合成事件和钩子函数中无法立即得到更新的值，形成了所谓的“异步”，当然可以通过第二个参数`setState(particalState,callback)`中的callback拿到更新后的结果。
- `setState`的批量更新操作也是建立在“异步”(合成事件，钩子函数)之上的，在原生事件和`setTimeout`中不会批量更新，在“异步”中如果对同一个值进行多次`setState`,`setState`的批量更新策略会对齐进行覆盖，去最后一次的执行，如果是同时`setState`多个不同的值，在更新时会对其进行合并批量更新。


## 什么是受控组件和非受控组件
受控组件和非受控组件通常指的是`form`表单中的组件元素，就形式上来说，受控组件就是为某个`form`表单组件添加`value`属性；非受控组件就是没有添加`value`属性的组件；
- 受控组件：通过使用组件的`onChange`事件改变表单元素的`value`,受控组件的优势在于，可以非常容易实现对用户的输入验证，或者对用户交互做拦截处理。
- 非受控组件: 非受控组件相对于普通的`React`组件或者`受控组件`来说是一种反模式，`非受控组件`不受`React`的状态控制(`state或props`)，非受控组件一般没什么用途，其值并非受父组件控制，它的值受其自身控制，但是，我们可以对其添加一个`ref`属性，这样可以获得`非受控组件`渲染后底层`DOM`元素的访问。
- `React`组件应当只接受状态的改变而改变，虽然使用`受控组件`在代码量上有所增加，但推荐使用`受控组件`,`受控组件`的状态由`React`控制，可以更好的控制数据流，在用户输入时更够更新组件状态。

