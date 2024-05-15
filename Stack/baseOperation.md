# 栈的操作

## 基本结构实现

### 数组

```js
class Stack {
  constructor() {
    this.items = [];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  push(item) {
    this.items.push(item);
  }

  pop () {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.pop();
  }

  peek () {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  size () {
    return this.items.length;
  }

  clear () {
    this.items = [];
  }

  print () {
    console.log(this.items.toString());
  }
}
```

### 链表

```js
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class Stack {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  isEmpty() {
    return this.head === null;
  }

  push (item) {
    const newNode = new Node(item);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  pop () {
    if (this.isEmpty()) {
      return null;
    }
    const value = this.head.value;
    this.top = this.head.next;
    this.size--;
    return value;
  }

  peek () {
    if (this.isEmpty()) {
      return null;
    }
    return this.top.value;
  }

  size () {
    return this.size;
  }

  clear () {
    this.top = null;
    this.size = 0;
  }

  print () {
    if (this.isEmpty()) {
      return null;
    }
    let current = this.head;
    let str = '';
    while (current) {
      str += current.value + ' ';
      current = current.next;
    }
    console.log(str);
  }
}
```

## 使用两个栈实现先入先出队列

```js
class Queue {
  constructor() {
    this.instack = new Stack();
    this.outstack = new Stack();
  }
  // 将元素 x 推到队列的末尾
  push (value) {
    this.instack.push(value);
  }
  // 从队列的开头移除并返回元素
  pop () {
    if (this.outstack.isEmpty()) {
      if (this.instack.isEmpty()) {
        return null;
      }
      while (this.instack.length > 0) {
        this.outStack.push(this.instack.pop());
      }
    }
    return this.outstack.pop();
  }
  // 返回队列开头的元素
  peek () {
    if (this.outstack.isEmpty()) {
      if (this.instack.isEmpty()) {
        return null;
      }
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack[this.outStack.length - 1];
  }
  empty () {
    return this.instack.isEmpty() && this.outstack.isEmpty();
  }
  size () {
    return this.instack.size() + this.outstack.size();
  }
}
```

## 包含min函数的栈

定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））

思路

- 定义两个栈：一个栈用于存储数据，另一个栈用于存储每次数据进栈时栈的最小值.
- 每次数据进栈时，将此数据和最小数据栈的栈定元素比较，将二者比较的较小值再次村存储最小值栈
- 数据栈出栈，最小值栈也出栈
- 这样最小值栈的栈顶永远是当前栈的最小值

```js
class Stack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push (value) {
    this.stack.push(value);
    if (this.minStack.length === 0 || node < min()) {
      this.minStack.push(value);
    } else {
      this.minStack.push(min());
    }
  }

  pop () {
    this.minStack.pop();
    return this.stack.pop();
  }

  peek () {
    var length = this.stack.length;
    return this.stack[this.stack.length - 1];
  }

  min () {
    var length = this.minStack.length;
    return length > 0 ? this.minStack[this.minStack.length - 1] : null;
  }
}
```

## 栈的压入、弹出序列
