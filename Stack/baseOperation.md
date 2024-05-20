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

问题描述：给定一个压入序列pushed和弹出序列popped。每个序列中的值都不重复。只有当它的压入顺序可以是我们所能得到的、且栈中的元素是popped所指定的顺序时,才返回true;否则,返回false

解决思路：

- 借助一个辅助栈来模拟压入和弹出过程
- 遍历压入序列pushed，将元素依次压入辅助栈中
- 每次压入元素后，检查栈顶元素是否和弹出序列popped的当前元素相等，如果相等,则将栈顶元素弹出,并将popped的指针向后移动一位
- 最后,如果辅助栈为空,说明压入、弹出序列是合法的,返回true;否则,返回false

```js
// pushed [1, 2, 3, 4, 5]
// popped [4, 5, 3, 2, 1]
function validateStackSequences (pushed, popped) {
  const stack = [];
  let i = 0;
  for (let j = 0; j < pushed.length; j++) {
    stack.push(pushed[j]);
    while (stack.length > 0 && stack[stack.length - 1] === popped[i]) {
      stack.pop();
      i++;
    }
  }
  return stack.length === 0;
}
```

## 有效的括号

```js
function isValid (s) {
  const stack = [];
  const map = {
    "(": ")",
    "[": "]",
    "{": "}"
  }
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char in map) {
      // 如果是左括号,压入栈中
      stack.push(char);
    } else {
      // 如果是右括号,判断栈是否为空
      if (stack.length === 0) {
        return false;
      }
      const popVal = stack.pop();
      if (map[popVal] !== char) {
        return false;
      }
    }
  }
  // 最后,检查栈是否为空
  return stack.length === 0;
}
```

## 简化路径

问题描述: 给你一个字符串 path ，表示指向某一文件或目录的 Unix 风格 绝对路径 （以 '/' 开头），请你将其转化为更加简洁的规范路径

在 Unix 风格的文件系统中，一个点（.）表示当前目录本身；此外，两个点 （..） 表示将目录切换到上一级（指向父目录）；两者都可以是复杂相对路径的组成部分。任意多个连续的斜杠（即，'//'）都被视为单个斜杠 '/' 。 对于此问题，任何其他格式的点（例如，'...'）均被视为文件/目录名称

例如:

- path = "/home/" 输出： "/home" 解释： 注意，最后一个目录名后面没有斜杠
- path = "/../" 输出： "/" 解释： 从根目录向上一级是不可行的，因为根目录是你可以到达的最高
- path = "/home//foo/" 输出： "/home/foo" 解释： 在规范路径中，多个连续斜杠需要用一个斜杠替换
- path = "/a/./b/../../c/" 输出： "/c"

解决思路: 我们可以使用栈数据结构来解决这个问题。将路径按照"/"分割成多个部分,然后遍历每个部分

- 如果遇到 ".."且栈不为空，则将栈顶元素弹出，表示返回上一级目录
- 如果遇到 "." 或者空字符串，则不做任何操作，继续遍历下一个部分
- 如果遇到其他字符串，则将其压入栈中，表示进入下一级目录

```js
function simplifyPath(path) {
  const stack = [];
  const parts = path.split('/');

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part === '..') {
      // 如果遇到".."且栈不为空,则将栈顶元素弹出
      if (stack.length > 0) {
        stack.pop();
      }
    } else if (part !== '.' && part !== '') {
      // 如果遇到其他字符串,则将其压入栈中
      stack.push(part);
    }
  }

  // 将栈中的元素用"/"连接起来
  return '/' + stack.join('/');
}
```
