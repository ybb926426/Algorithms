# TS 优势

- 静态类型检查 可以在开发人员编写脚本时检测错误
- 可读性和易维护性 从 js 动态弱类型检查到 ts 强类型检查，增加了静态类型，类，模块，接口和类型注解。接口和类型提示使代码更具可读性。同时编译检查让项目更具维护性
- 更好的协作

## type 和 interface

相同点

- 都可以描述一个对象或者函数
- 都允许扩展 （extends）
  不同点
- interface 能够合并声明
- type 可以声明基本类型别名，联合类型，元祖等类型
- type 语句中还可以使用 typeof 获取实例的 类型进行赋值

## React

React15 架构

- Reconciler（协调器）负责找出变化的组件
- Renderer（渲染器）负责将变化的组件渲染到页面上
- Reconciler（协调器）
  - 当有变化更新时，Reconilier 会做如下工作
    - 调用函数组件、或 class 组件的 render 方法，将返回的 jsx 转化为虚拟 DOM
    - 将虚拟 DOM 和上次更新时的虚拟 DOM 对比
    - 找出本次更新中变化的 DOM
    - 通知 renderer 将变化的虚拟 DOM 渲染到页面上
- Renderer（渲染器）
  - 在每次更新变化时，Renderer 接收到 Reconciler 的通知，将变化的组件渲染到页面（宿主环境）

React15 的缺点

- 递归更新的缺点，更新一旦开始，便无法被中断，如果节点深度过深，递归更新超出 16ms，用户交互就回卡顿；
- React16 采用可中断的异步更新来代替 15 的同步更新

React16 架构

- Scheduler（调度器）调度任务的优先级，高级任务优先进入 Reconciler 中
- Reconciler（协调器）负责找出变化的组件
- Renderer（渲染器）负责将变化的组件渲染到页面上

- Scheduler （调度器）
  - react16 内部实现了 requestIdleCallback 的 polyfill，（requestIdleCallback 主要是用来判断浏览器是否有剩余时间，然后通知）；但是由于该 api 的浏览器兼容性以及触发频率不稳定，比如切换 tab 之后，之前 tab 注册的 requestIdleCallback 触发频率会变得很低；基于以上原因，react 实现了更完备的 requestIdleCallback 的 polyfill，即 Scheduler，除了在空闲时间触发回调功能外，还提供了多种调度优先级任务设置
- Reconlier（协调器）
  - React15 采用的是递归处理虚拟 DOM 的，因此无法中断；react16 的 dom 更新工作由递归变成了可以中断的循环过程，主要是在 while 循环时通过 shouldYield 判断当前是否有剩余时间； react16 中，Reconiler 和 Renderer 不再是交替工作，当 scheduler 将任务交给 Reconciler 后，Reconciler 会为变化的虚拟 DOM 打上代表 增/删/更新 的标记；整个 Scheduler 和 Reconciler 的工作都是在内存中进行的，只有当所有的组件都完成 Reconciler 的工作，才会同意交给 Renderer。
- Renderer（渲染器）

  - Renderer 根据 Reconciler 为虚拟 DOM 打上标记，同步执行对应的 DOM 操作；

  其中 Scheduler 和 Reconciler 是可以被中断的，比如当前帧没有剩余时间或者尤其他更高优先任务

Fiber 含义

- 作为架构来说，之前 react15 的 Reconciler 采用递归的方式进行，数据保存在递归调用栈中，所以被称为 stack Reconciler。react16 的 Reconciler 基于 Fiber 节点实现，被称为 Fiber Reconciler
- 作为静态数据结构来说，每个 Fiber 节点对一个 React element，保存了该组件的类型，对应 Dom 节点的信息等
- 作为动态的工作单元来说，每个 Fiber 节点保存了本次更新中该组件的状态，要执行的工作

双缓存 Fiber 树

- 双缓存：在内存中构建并直接替换的一种技术
- react16 采用双缓存来完成 Fiber 树的构建和替换 -- 对应着 dom 树的创建和更新
- 在 react 中最多会有两棵 Fiber 树，一棵是当前屏幕上显示内容对应的 Fiber（current fiber），另一颗是正在内存中构建的 Fiber 树（workInProgress Fiber），通过 alternate 连接；
- React 应用的根节点通过 current 指针在不同的 Fiber 树的 RootFiber 切换来完成 current Fiber 树指向的切换。
- 即当 workInProgress Fiber 树构建完成交给 Renderer 渲染到页面上后，应用根节点的 current 指针指向 workInProgress Fiber 树，此时的 workInProgress Fiber 树就变成了 current Fiber 树；
- 每次状态更新都会产生新的 workInprogress fiber 树，通过 current 和 workInProgress 树的替换，完成 DOM 更新；

## render 阶段

### '递'阶段

首先从 rootFiber 开始深度优先遍历，为遍历到的每个 Fiber 节点调用 beginWork 方法
该方法会根据传入的 Fiber 节点创建子 Fiber 节点，并将这两个 Fiber 节点连接起来
当遍历到叶子节点也就是没有子组件的时候就会进入下个 ‘归’ 阶段

### '归'阶段

在‘归’阶段会调用 completeWork 方法处理 Fiber 节点
当某个 Fiber 节点执行完 completeWork，如果其存在 sibling 节点即兄弟 Fiber 节点的时候，会进入其兄弟 Fiber 节点的‘递’阶段
如果不存在兄弟 Fiber 节点，会进入父 Fiber 的归阶段
递和归阶段会交错执行直到归到 rootFiber 节点，到此 render 阶段的工作就结束了

#### beginWork

- beginWork 的工作是传入当前的 Fiber 节点，创建子 Fiber 节点并关联起来
- react 通过 current === null 来判断是 mount 还是 update
- update 时： 如果 current 存在，在满足一定条件会复用 current 节点，这样就能克隆 current.child 作为 workInProgress.child，而不需要新建 workInProgress.child
- mount 时，除 fiberRootNode 以外，current===null，会根据 fiber.tag 不同，创建不同的 Fiber 节点

#### completeWork

- 类似 beginWork，completeWork 也是针对不同 fiber.tag 调用不同的处理逻辑

## commit 阶段 （即 Renderer 的工作流程）

### before mutation 阶段 （执行 DOM 操作前）

### mutation 阶段 （执行 DOM 操作）

### layout 阶段 （执行 DOM 操作后）

## Diff 算法

## React 最新生命周期

- react16 之后有三个生命周期被废弃
- componentWillMount
- componentWillReceiveProps
- componentWillUpdate
- 16.8 声明周期分为 3 个阶段
- 挂载阶段
- constructor 构造函数，最先被执行，我们通常在构造函数里初始化 state 对象或者给自定义的方法绑定 this
- getDerivedStateFromProps： static getDerivedStateFromProps(nextProps, prevState)，这是个静态方法，当我们接收到新的属性想去修改我们的 state，我们可以使用 getDerivedStateFromProps
- render：render 函数是纯函数，只返回需要渲染的东西，不应该包含其他业务逻辑，可以返回原生的 DOM，React 组件，fragment，Portals，字符串和数字，boolean 和 null 等内容
- componentDidMount 组件装载后调用，此时我们可以获取到 DOM 及节点并操作，比如对 canvas，svg，服务器请求，订阅都可以写在这个里面，但是记得在 componentWillUnmount 中取消订阅
- 更新阶段
- getDerivedStateFromProps：此方法在更新挂载阶段都可能会调用
- shouldComponentUpdate： shouldComponentUpdate(nextProps, nextState)，有两个参数 nextProps 和 nextState，表示新的属性和变化之后的 state，返回一个布尔值，true 表示会触发重新渲染，false 表示不会触发重新渲染，默认返回 true，我们通常利用此声明周期来优化 React 程序性能；
- render 更新阶段也会触发此生命周期
- getSnapshotBeforeUpdate： getSnapshotBeforeUpdate(prevProps, prevState)，这个方法在 render 之后，componentDidUpdate 之前调用，有两个参数 prevProps 和 prevState，表示之前的属性 props 和 state，这个函数有个返回值，会作为第三个参数传给 componentDidUpdate，如果不想有返会值，可以返回 null，此生命周期必须和 componentDidUpdate 搭配使用； 可以在更新之前获取最新的渲染数据，它的调用是在 render 之后， update 之前
- componentDidUpdate：componentDidUpdate(prevProps, prevState, snapshot)，该方法在 getSnapshotBeforeUpdate 之后调用，有三个参数 prevProps， prevState， snapshot，表示之前的 props，之前的 state 和 snapshot，第三个参数是 getSnapshotBeforeUpdate 返回的，如果触发某些回调函数需要用到 DOM 元素的状态，则将比对或计算过程迁移至 getSnapshotBeforeUpdate，然后在 compoentDidUpdate 中统一触发回调或更新状态
- 卸载阶段
- componentWillUnmount 当我们的组件被卸载或者销毁了就回调用，我们可以在这个函数里清除一些定时器，取消网络请求，清理无效的 DOM 元素等垃圾清理工作

## setState 到底是异步还是同步?

- setState 只在合成事件和钩子函数中是异步的，在原生时间和 setTimeout 中都是同步的
- setState 的异步并不是说内部的代码实现是异步实现的，其实本身执行过程和代码都是同步的，只是在合成事件 he 钩子函数的调用顺序是在更新之前，导致在合成事件和钩子函数中没发立马拿到更新后的值，形成了所谓的异步，可以通过第二个参数 callback，在回调中拿到更新后的结果
- setState 在合成事件和生命周期钩子中，批量更新前面设置的 key，会被后面的所覆盖，最终只会执行一次更新；

## redux 中间件原理

- redux 核心，就是控制和管理所有数据输入输出，因此有了 dispatch，dispatch 是一个纯函数，就是单纯的派发 action 来更改数据
- 本质上是对 dispatch 做一层封装；redux 把这个封装的入口写成了一个函数，叫 applyMiddleware，主要就是改造 dispatch，产生真假 dispatch

```javascript
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
  console.log("dispatching", action);
  next(action);
};

const applyMiddleware = function (middleware) {
  let next = store.dispatch;
  store.dispatch = middleware(store)(next);
};
applyMiddleware(dispatchAndLog);

// 多个中间件串联
function applyMiddleware(middlewares) {
  middlewares = middlewares.slice();
  middlewares.reverse();

  let dispatch = store.dispatch;
  middlewares.forEach((middleware) => {
    dispatch = middleware(store)(dispatch);
  });

  return Object.assign({}, store, { dispatch });
}
```
