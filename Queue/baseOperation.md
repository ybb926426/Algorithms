# 队列的操作

## 基本结构实现

### 数组

```js
class Queue {
  constructor() {
    this.items = [];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items.shift();
  }

  peek() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[0];
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }

  print() {
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

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }
  // 1->2->3->4
  enqueue(value) {
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    const value = this.front.value;
    this.front = this.front.next;
    this.size--;
    if (this.isEmpty()) {
      this.rear = null;
    }
    return value;
  }

  peek () {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.front.value;
  }

  size () {
    return this.size;
  }

  clear () {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  print () {
    if (this.isEmpty()) {
      console.log("Queue is empty");
      return;
    }
    let current = this.front;
    let str = "";
    while (current) {
      str += current.value + " ";
      current = current.next;
    }
    console.log(str.trim());
  }
}
```

## 滑动窗口的最大值

给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口 k 内的数字。滑动窗口每次只向右移动一位。 返回滑动窗口最大值

```yaml
输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
输出: [3,3,5,5,6,7] 
解释: 
  滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

思路

- 使用一个双端队列(队列两面都可以进出)，用于存储处于窗口中的值的下标，保证窗口头部元素永远是窗口最大值
- 当前进入

```js
function maxSlidingWindow (nums, k) {
  const deque = []; // 双端队列,存储元素的下标
  const result = []; // 存储结果

  for (let i = 0; i < nums.length; i++) {
    // 移除队列中不在窗口内的元素下标
    while (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }

    // 移除队列中比当前元素小的元素下标
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    // 将当前元素下标加入队列
    deque.push(i);
    // 当窗口完全进入数组时,将队列头部元素对应的值加入结果数组
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  return result;

  // const windowArr = [];
  // const result = [];

  // for (let i = 0; i < nums.length; i++) {
  //   if (i - windowArr[0] > k - 1) {
  //     windowArr.shift();
  //   }
  //   let j = windowArr.length - 1;
  //   while (j >= 0 && nums[windowArr[j]] <= nums[i]) {
  //     j--;
  //     windowArr.pop();
  //   }
  //   windowArr.push(i);
  //   if (i >= k - 1) {
  //     result.push(nums[window[0]]);
  //   }
  // }
  // return result;
}
```
