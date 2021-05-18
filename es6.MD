## 使用箭头函数注意点
- 箭头函数内的this对象就是定义时所在的对象，而不是使用时所在的对象
- 不可以当做构造函数，也就是说，不可以使用new命令
- 不可以使用arguments对象，该对象在函数体内不存在，如果要用，可以用rest参数代替
- 不可以使用yield命令，因此箭头函数不能用于Generator函数中

## es6
- let/const
- 箭头函数
- iterator 迭代器
- 解构赋值
- 剩余/扩展运算符
- 对象属性/方法简写
- for of 循环
  - for of 循环可以用来遍历iterate可迭代对象，返回键值
    - 只能用在可迭代对象上，获取的是迭代器返回的value值； 
    - 只遍历当前对象不会遍历它的原型链
    - 对于数组的遍历，只返回数组下标对应的属性值
  - for in 循环主要是为了遍历对象而生，键名
    - 可以获取所有对象的键名
    - 会遍历对象的整个原型链，性能差
    - 会返回数组中的所有可枚举属性（包括原型链上可枚举的属性）
- Promise
- ES6 Module
- 函数默认值
- Proxy
- Object.assign
  - 是浅拷贝，对于值是引用类型的属性，拷贝仍旧是他的引用
  - 可以拷贝 Symbol 属性
  - 不能拷贝不可枚举的属性
  - 保证target始终是一个对象，如果传入基本数据类型，会转为基本包装类型，null/undefined传入会报错


## css放头部，js放尾部的原因
- css放头部
  - 在加载html生成DOM tree的时候，就可以同时对DOM tree进行渲染
  - 可以防止闪跳，白屏或者布局混乱
- js放尾部
  - js可能会改变DOM tree的结构，所以需要一个稳定的DOM tree
  - js加载后会立即执行，同时会阻塞后面的资源加载

## tree-shaking实现原理
  - ES6 Module 引入进行静态分析，故而编译的时候正确判断到底加载了哪些模块
  - 静态分析程序流，判断哪些模块和变量未被使用或者引用，进而删除对应的代码

  - 利用了 es6 的模块特性
    - 只能作为模块顶层的语句出现
    - import 的模块名只能是字符串常量
    - import binding 是 immutable（不可改变的） 的

## flex 布局
  - flex: 1 ; flex是 flex-grow，flex-shrink，flex-basis的缩写，默认是 0 1 auto；
    - flex-grow 属性定义项目的放大比例，默认是0，即如果存在剩余空间，也不放大
    - flex-shrink 属性定义了项目的缩小比例，默认是1，即如果空间不足，该项目将缩小
    - flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小
  - flex-flow 是 flex-direction 属性和 flex-wrap 属性的简写形式，默认是 row nowrap；

## 实现一个发布订阅Event
```javascript
let event = {
  list: {},
  on(key, fn) {
    if (!this.list[key]) {
      this.list[key] = [];
    }
    this.list[key].push(fn);
  },
  emit(key, fn) {
    // 第一个参数是对应的key值
    // 直接用数组的shift方法取出
    let key = [].shift.call(arguments), fns = this.list[key];
    // 如果缓存列表里没有函数就返回false
    if (!fns || fns.length === 0) {
      return false;
    }
    // 遍历key值对应的缓存列表
    // 依次执行函数的方法
    fns.forEach(fn => {
      fn.apply(this, arguments);
    })
  },
  remove(key, fn) {
    // 加入了取消订阅的方法
    let fns = this.list[key];
    // 如果缓存列表中没有函数，返回false
    if (!fns) return false;
    // 如果没有传对应函数的话
    // 就会将key值对应缓存列表中的函数都清空掉
    if (!fn) {
      fns && (fns.length = 0)
    } else {
      // 遍历缓存列表，看看传入的fn与哪个函数相同
      // 如果相同就直接从缓存列表中删掉即可
      fns.forEach((cb, i) => {
        if (cb === fn) {
          fn.splice(i, 1);
        }
      })
    }
  }
}

```

```javascript

function EventEmitter() {
  this._events = Object.create(null);
}
//默认最大监听数
EventEmitter.defaultMaxListeners = 10;
// on方法，该方法用于订阅事件，在旧版本的node.js中是addListener方法，它们是同一个函数
// flag标记是一个订阅方法的插入标识，如果为'true'就视为插入在数组的头部
EventEmitter.prototype.on = EventEmitter.prototype.addListener = function(type, listener, flag) {
  if (!this._events) {
    this._events = Object.create(null);
  }
  if (this._event[type]) {
    if (flag) {
      this._events[type].unshift(listener);
    } else {
      this._events[type].push(listener);
    }
  } else {
    this._events[type] = [listener];
  }
  //绑定事件，触发newListener  不是newListener 就应该让newListener执行以下
  if (type !== 'newListener') {
    this.emit('newListener', type);
  }
}
// emit方法就是将订阅方法取出执行，使用call方法来修正this的指向，使其指向子类的实例。
EventEmitter.prototype.emit = function (type, ...args) {
  if (this._events[type]) {
    this._events[type].forEach(fn => fn.call(this, ...args))
  }
}
// once方法非常有趣，它的功能是将事件订阅“一次”，当这个事件触发过就不会再次触发了。其原理是将订阅的方法再包裹一层函数，在执行后将此函数移除即可
EventEmitter.prototype.once = function (type, listener) {
  let _this = this;
  // 中间函数，在调用完之后立即删除订阅
  function only() {
    listener();
    _this.removeListener(type, only);
  }
  // origin保存原回调的引用，用于remove时的判断
  only.origin = listener;
  this.on(type, only);
}
// off方法即为退订，原理同观察者模式一样，将订阅方法从数组中移除即可。
EventEmitter.prototype.off = EventEmitter.prototype.removeListener = function(type, listener) {
  if (this._enents[type]) {
    this._events[type] = this._events[type].filter(fn => {
      return fn !== listener && fn.origin !== listener
    })
  }
}
EventEmitter.prototype.removeAllListener = function () {
  this._events = Object.create(null);
}
// 此方法，调用on方法将标记传为true（插入订阅方法在头部）即可。
EventEmitter.prototype.prependListener = function (type, listener) {
  this.on(type, listener, true);
};

module.exports = EventEmitter;

```