## 什么是设计模式
模式是一种可复用的解决方案，用于解决软件设计中遇到的常见问题

换个通俗的说法：设计模式是解决某个特定场景下对各种问题的解决方案，因此，当我们遇到合适的场景，我们可能会条件反射一样自然而然想到符合这种场景的设计模式

## 单例模式
保证一个类仅有一个示例，并提供一个访问他的全局访问点。实现的放法为先判断实例存在与否，如果存在直接返回，如果不存在就创建了再返会，这就确保了一个类只有一个实例对象
- 试用场景：一个单一对象。比如：弹窗，无论点击多少次，弹窗只应该被创建一次
```javascript
class CreateUser {
  constructor(name) {
    this.name = name;
    this.getName();
  }
  getName() {
    return this.name;
  }
}
var ProxyMode = (function() {
  var instance = null;
  return function(name) {
    if (!instance) {
      instance = new CreateUser(name);
    }
    return instance;
  }
})();
// 测试单体模式的实例
var a = new ProxyMode('aaa');
var b = new ProxyMode('bbb');
console.log(a === b); // 因为单体模式是只实例化一次，所以下面的实例是相等的
```

## 策略模式
定义一系列的算法，把他们一个个封装起来，并且使他们可以相互替换或相互转换
- 一个基于策略模式的程序至少由两部分组成：
  - 一组策略类（可变），封装了具体算法，并负责具体的计算过程
  - 环境类 （context 不变）context接受客户的请求，随后将请求委托给一个策略类
- 什么时候使用
  - 各判断条件下的策略相互独立且可复用
  - 策略内部逻辑相对复杂
  - 策略需要灵活组合
```javascript
/* 策略类 */
var levelOBJ = {
  "A": function(money) {
    return money * 4;
  },
  "B": function(money) {
    return money * 3;
  },
  "C": function(money) {
    return money * 2;
  },
}
/*环境类*/
var calculateBouns = function(level, money) {
  return levelOBJ[level](money);
}
console.log(calculateBouns('A',10000)); // 40000
```

## 发布-订阅模式
事件发布/订阅模式（PubSub）在异步编程中帮助我们完成更松的解耦，甚至在MVC，MVVM的架构中以及设计模式中也少不了发布-订阅模式的参与

优点：在异步编程中实现更深的解耦

缺点：如果过多的使用发布订阅模式，会增加维护的难度
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

## 装饰器模式
给一个函数赋能，增强它的某种能力，它能动态的添加对象的行为（动态地给函数赋能）
```javascript
// AOP 装饰函数
Function.prototype.before = function (fn) {
  const self = this;
  return function () {
    fn.apply(new(self), arguments);
    return fn.apply(new(self), arguments)
  }
}
Function.prototype.after = function (fn) {
  const self = this;
  return function () {
    fn.apply(new(self), arguments);
    return fn.apply(new(self), arguments)
  }
}
```
## 适配器模式
采用适配器模式，将不同的数据结构适配成展示组件所能接受的数据结构

主要用于解决两个接口之间不匹配的问题
```javascript
// 老接口
const zhejiangCityOld = (function () {
  return [
    {
      name: 'hangzhou',
      id: 11,
    },
    {
      name: 'jinhua',
      id: 12
    }
  ]
})()
console.log(getZhejiangCityOld())
// 新接口希望是下面形式
{
  hangzhou: 11,
  jinhua: 12,
}
const adaptor = (function() {
  const obj = {};
  for(let city of zhejiangCityOld) {
    obj[city.name] = city.id
  }
  return obj;
})()
```

## 代理模式
所谓的代理模式就是为一个对象找一个替代对象，以便对源对象进行访问
常用的虚拟代理形式：某一个花销很大的操作，可以通过虚拟代理的方式延迟到这种需要它的时候才去创建
- 保护代理
- 虚拟代理
  - 图片预加载
  ```javascript
  const myImage = (function () {
    const imageNode = document.createElement('img');
    document.body.appendChild(imageNode);
    return {
      setSrc: function (src) {
        iamgeNode.src = src;
      }
    }
  })()
  const proxyImage = (function () {
    const image = new Image();
    image.onload = function() {
      myImage.setSrc(this.src);
    }
    return {
      setSrc: function(src) {
        myImage.setSrc('loading.jpg');
        img.src = src;
      }
    }
  })()
  proxyImage.setSrc('http://loaded.jpg');
  ```
- 缓存代理
  - 缓存代理实现乘积计算
  ```javascript
  const mult = function() {
    let a = 1;
    for(let i = 0, l; l = arguments[i++];) {
      a = a * l;
    }
    return a;
  }
  const proxyMult = (function() {
    const cache = {};
    return function() {
      const tag = Array.prototype.join.call(arguments, ',');
      if (cache[tag]) {
        return cache[tag]
      }
      cache[tag] = mult.apply(this, arguments);
      return cache[tag];
    }
  })();
  proxyMult(1, 2, 3, 4) // 24
  proxyMult(1, 2, 3, 4) // 24
  ```
- 代理和被代理对象的一致性
```javascript

```

## 责任链模式
类似于多米诺骨牌，请求第一个条件，会持续执行后续的条件，知道返回结果为止；
```javascript
// 场景: 某电商针对已付过定金的用户有优惠政策, 在正式购买后, 已经支付过 500 元定金的用户会收到 100 元的优惠券, 200 元定金的用户可以收到 50 元优惠券, 没有支付过定金的用户只能正常购买。

// orderType: 表示订单类型, 1: 500 元定金用户；2: 200 元定金用户；3: 普通购买用户
// pay: 表示用户是否已经支付定金, true: 已支付；false: 未支付
// stock: 表示当前用于普通购买的手机库存数量, 已支付过定金的用户不受此限制
const order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500 元定金预购, 得到 100 元优惠券');
  } else {
    return 'nextSuccess';
  }
}
const order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200 元定金预购, 得到 100 元优惠券');
  } else {
    return 'nextSuccess';
  }
}
const orderCommon = function (orderType, pay, stock) {
  if ((orderType === 3 || !pay) && stock > 0) {
    console.log('普通购买, 无优惠券')
  } else {
    console.log('库存不够, 无法购买')
  }
}
Function.prototype.after = function (fn) {
  const self = this;
  return function() {
    const result = self.apply(self, arguments)
    if (result === 'nextSuccess') {
      return fn.apply(self, arguments) // 这里 return 别忘记了~
    }
  }
}
const order = order500.after(order200).after(orderCommon)

order(3, true, 500) // 普通购买, 无优惠券
```

## 观察者模式
- 场景一 当观察的数据对象发生变化时，自动调用相应的函数。比如vue的双向绑定
```javascript
var obj = {
  data: { list: [] }
}
Object.defineProperty(obj, 'list', {
  get() {
    return this.data['list'];
  },
  set(val) {
    console.log('值被更改了');
    this.data['list'] = val;
  }
})
```
```javascript
// Proxy/Reflect 是 ES6 引入的新特性, 也可以使用其完成观察者模式, 示例如下(效果同上):
var obj = {
  value: 0
}
var proxy = new Proxy(obj, {
  set: function(target, key, value, receiver) {
    console.log('调用相应函数')
    Reflect.set(target, key, value, receiver)
  }
})
obj.value = 1; // 调用相应的函数
```
- 场景二 当调用对象里的某个方法时，就回调用相应的访问逻辑。比如给测试框架赋能的spy函数
```javascript
// 下面来实现 sinon 框架的 spy 函数
const sinon = {
  analyze: {},
  spy: function (obj, fnName) {
    const that = this;
    const oldFn = Object.getOwnPropertyDescriptor(obj, fnName).value;
    Object.defineProperty(obj, fnName, {
      value: function() {
        oldFn()
        if (that.analyze[fnName]) {
          that.analyze[fnName].count = ++that.analyze[fnName].count
        } else {
          that.analyze[fnName] = {}
          that.analyze[fnName].count = 1
        }
        console.log(`${fnName} 被调用了 ${that.analyze[fnName].count} 次`)
      }
    })
  }
}
const obj = {
  someFn: function() {
    console.log('my name is someFn')
  }
}
sinon.spy(obj, 'someFn')
obj.someFn()
// my name is someFn
// someFn 被调用了 1 次
obj.someFn()
// my name is someFn
// someFn 被调用了 2 次
```

## 总结各设计模式的关键词
<table><tbody>
  <tr>
    <th>设计模式</th><th>特点</th><th>案例</th>
  </tr>
  <tr>
    <td>单例模式</td>
    <td>一个类只能构造出唯一实例</td>
    <td>弹框层的实践</td>
  </tr>
  <tr>
    <td>策略模式</td>
    <td>根据不同参数可以命中不同的策略</td>
    <td>动画库里的算法函数</td>
  </tr>
  <tr>
    <td>代理模式</td>
    <td>代理对象和本体对象具有一致的接口</td>
    <td>图片预加载</td>
  </tr>
  <tr>
    <td>迭代器模式</td>
    <td>能获取聚合对象的顺序和元素</td>
    <td>each([1, 2, 3], cb)</td>
  </tr>
  <tr>
    <td>发布-订阅模式</td>
    <td>PubSub</td>
    <td></td>
  </tr>
  <tr>
    <td>职责链模式</td>
    <td>通过请求第一个条件，会持续执行后续的条件，直到返回结果为止</td>
    <td>if else 优化</td>
  </tr>
  <tr>
    <td>装饰者模式</td>
    <td>动态地给函数赋能</td>
    <td></td>
  </tr>
  <tr>
    <td>适配者模式</td>
    <td>一种数据结构改成另一种数据结构</td>
    <td>枚举值接口变更</td>
  </tr>
  <tr>
    <td>观察者模式</td>
    <td>当观察对象发生变化时自动调用相关函数</td>
    <td>vue 双向绑定</td>
  </tr>
</table>