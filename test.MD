TS 优势
* 静态类型检查 可以在开发人员编写脚本时检测错误
* 可读性和易维护性 从js动态弱类型检查到ts强类型检查，增加了静态类型，类，模块，接口和类型注解。接口和类型提示使代码更具可读性。同时编译检查让项目更具维护性
* 更好的协作

type和interface
相同点
- 都可以描述一个对象或者函数
- 都允许扩展 （extends）
不同点
- interface能够合并声明
- type 可以声明基本类型别名，联合类型，元祖等类型
- type 语句中还可以使用 typeof 获取实例的 类型进行赋值

React
React15架构
- Reconciler（协调器）负责找出变化的组件
- Renderer（渲染器）负责将变化的组件渲染到页面上
- Reconciler（协调器）
  - 当有变化更新时，Reconilier会做如下工作
    - 调用函数组件、或class组件的render方法，将返回的jsx转化为虚拟DOM
    - 将虚拟DOM和上次更新时的虚拟DOM对比
    - 找出本次更新中变化的DOM
    - 通知renderer将变化的虚拟DOM渲染到页面上
- Renderer（渲染器）
  - 在每次更新变化时，Renderer接收到Reconciler的通知，将变化的组件渲染到页面（宿主环境）

React15的缺点
- 递归更新的缺点，更新一旦开始，便无法被中断，如果节点深度过深，递归更新超出16ms，用户交互就回卡顿；
- React16 采用可中断的异步更新来代替15的同步更新

React16架构
- Scheduler（调度器）调度任务的优先级，高级任务优先进入Reconciler中
- Reconciler（协调器）负责找出变化的组件
- Renderer（渲染器）负责将变化的组件渲染到页面上

- Scheduler （调度器）
  - react16内部实现了 requestIdleCallback 的 polyfill，（requestIdleCallback主要是用来判断浏览器是否有剩余时间，然后通知）；但是由于该api的浏览器兼容性以及触发频率不稳定，比如切换tab之后，之前tab注册的requestIdleCallback触发频率会变得很低；基于以上原因，react实现了更完备的 requestIdleCallback 的 polyfill，即Scheduler，除了在空闲时间触发回调功能外，还提供了多种调度优先级任务设置
- Reconlier（协调器）
  - React15采用的是递归处理虚拟DOM的，因此无法中断；react16的dom更新工作由递归变成了可以中断的循环过程，主要是在while循环时通过 shouldYield 判断当前是否有剩余时间； react16中，Reconiler和Renderer不再是交替工作，当scheduler将任务交给Reconciler后，Reconciler会为变化的虚拟DOM打上代表 增/删/更新 的标记；整个Scheduler和Reconciler的工作都是在内存中进行的，只有当所有的组件都完成Reconciler的工作，才会同意交给Renderer。
- Renderer（渲染器）
  - Renderer根据Reconciler为虚拟DOM打上标记，同步执行对应的DOM操作；

  其中 Scheduler和Reconciler是可以被中断的，比如当前帧没有剩余时间或者尤其他更高优先任务

Fiber含义
- 作为架构来说，之前react15的Reconciler采用递归的方式进行，数据保存在递归调用栈中，所以被称为 stack Reconciler。react16的Reconciler基于Fiber节点实现，被称为Fiber Reconciler
- 作为静态数据结构来说，每个Fiber节点对一个 React element，保存了该组件的类型，对应Dom节点的信息等
- 作为动态的工作单元来说，每个Fiber节点保存了本次更新中该组件的状态，要执行的工作

双缓存Fiber树
- 双缓存：在内存中构建并直接替换的一种技术
- react16采用双缓存来完成Fiber树的构建和替换 -- 对应着dom树的创建和更新
- 在react中最多会有两棵Fiber树，一棵是当前屏幕上显示内容对应的Fiber（current fiber），另一颗是正在内存中构建的Fiber树（workInProgress Fiber），通过alternate连接；
- React应用的根节点通过current指针在不同的Fiber树的RootFiber切换来完成current Fiber树指向的切换。
- 即当 workInProgress Fiber树构建完成交给Renderer渲染到页面上后，应用根节点的current指针指向workInProgress Fiber树，此时的workInProgress Fiber树就变成了current Fiber树；
- 每次状态更新都会产生新的 workInprogress fiber 树，通过current和workInProgress树的替换，完成DOM更新；

## render阶段
### '递'阶段
  首先从rootFiber开始深度优先遍历，为遍历到的每个Fiber节点调用beginWork方法
  该方法会根据传入的Fiber节点创建子Fiber节点，并将这两个Fiber节点连接起来
  当遍历到叶子节点也就是没有子组件的时候就会进入下个 ‘归’ 阶段
### '归'阶段
  在‘归’阶段会调用completeWork方法处理Fiber节点
  当某个Fiber节点执行完completeWork，如果其存在sibling节点即兄弟Fiber节点的时候，会进入其兄弟Fiber节点的‘递’阶段
  如果不存在兄弟Fiber节点，会进入父Fiber的归阶段
  递和归阶段会交错执行直到归到rootFiber节点，到此render阶段的工作就结束了
#### beginWork
- beginWork的工作是传入当前的Fiber节点，创建子Fiber节点并关联起来
- react通过 current === null 来判断是mount还是update
 - update时： 如果current存在，在满足一定条件会复用current节点，这样就能克隆current.child作为workInProgress.child，而不需要新建workInProgress.child
 - mount时，除fiberRootNode以外，current===null，会根据fiber.tag不同，创建不同的Fiber节点
#### completeWork
- 类似beginWork，completeWork也是针对不同fiber.tag调用不同的处理逻辑

 
## commit阶段 （即Renderer的工作流程）
### before mutation阶段 （执行DOM操作前）
### mutation阶段 （执行DOM操作）
### layout阶段 （执行DOM操作后）


## Diff算法


## React最新生命周期
- react16之后有三个生命周期被废弃
 - componentWillMount
 - componentWillReceiveProps
 - componentWillUpdate
- 16.8声明周期分为3个阶段
 - 挂载阶段
  - constructor构造函数，最先被执行，我们通常在构造函数里初始化state对象或者给自定义的方法绑定this
  - getDerivedStateFromProps： static getDerivedStateFromProps(nextProps, prevState)，这是个静态方法，当我们接收到新的属性想去修改我们的state，我们可以使用getDerivedStateFromProps
  - render：render函数是纯函数，只返回需要渲染的东西，不应该包含其他业务逻辑，可以返回原生的DOM，React组件，fragment，Portals，字符串和数字，boolean和null等内容
  - componentDidMount 组件装载后调用，此时我们可以获取到DOM及节点并操作，比如对canvas，svg，服务器请求，订阅都可以写在这个里面，但是记得在componentWillUnmount中取消订阅
 - 更新阶段
  - getDerivedStateFromProps：此方法在更新挂载阶段都可能会调用
  - shouldComponentUpdate： shouldComponentUpdate(nextProps, nextState)，有两个参数 nextProps和nextState，表示新的属性和变化之后的state，返回一个布尔值，true表示会触发重新渲染，false表示不会触发重新渲染，默认返回true，我们通常利用此声明周期来优化React程序性能；
  - render 更新阶段也会触发此生命周期
  - getSnapshotBeforeUpdate： getSnapshotBeforeUpdate(prevProps, prevState)，这个方法在render之后，componentDidUpdate之前调用，有两个参数prevProps和prevState，表示之前的属性props和state，这个函数有个返回值，会作为第三个参数传给componentDidUpdate，如果不想有返会值，可以返回null，此生命周期必须和componentDidUpdate搭配使用； 可以在更新之前获取最新的渲染数据，它的调用是在 render 之后， update 之前
  - componentDidUpdate：componentDidUpdate(prevProps, prevState, snapshot)，该方法在getSnapshotBeforeUpdate之后调用，有三个参数prevProps， prevState， snapshot，表示之前的props，之前的state和snapshot，第三个参数是getSnapshotBeforeUpdate返回的，如果触发某些回调函数需要用到DOM元素的状态，则将比对或计算过程迁移至getSnapshotBeforeUpdate，然后在compoentDidUpdate中统一触发回调或更新状态
 - 卸载阶段
 - componentWillUnmount 当我们的组件被卸载或者销毁了就回调用，我们可以在这个函数里清除一些定时器，取消网络请求，清理无效的DOM元素等垃圾清理工作

## setState到底是异步还是同步?
- setState只在合成事件和钩子函数中是异步的，在原生时间和setTimeout中都是同步的
- setState的异步并不是说内部的代码实现是异步实现的，其实本身执行过程和代码都是同步的，只是在合成事件he钩子函数的调用顺序是在更新之前，导致在合成事件和钩子函数中没发立马拿到更新后的值，形成了所谓的异步，可以通过第二个参数callback，在回调中拿到更新后的结果
- setState在合成事件和生命周期钩子中，批量更新前面设置的key，会被后面的所覆盖，最终只会执行一次更新；

## redux 中间件原理
- redux核心，就是控制和管理所有数据输入输出，因此有了dispatch，dispatch是一个纯函数，就是单纯的派发action来更改数据
- 本质上是对dispatch做一层封装；redux把这个封装的入口写成了一个函数，叫applyMiddleware，主要就是改造dispatch，产生真假dispatch

```javascript
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
  console.log('dispatching', action)
  next(action)
}

const applyMiddleware = function(middleware) {
  let next = store.dispatch;
  store.dispatch = middleware(store)(next);
}
applyMiddleware(dispatchAndLog);

// 多个中间件串联
function applyMiddleware(middlewares) {
  middlewares = middlewares.slice();
  middlewares.reverse();

  let dispatch = store.dispatch;
  middlewares.forEach(middleware => {
    dispatch = middleware(store)(dispatch)
  })

  return Object.assign({}, store, { dispatch })
}
```