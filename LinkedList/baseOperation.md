# 链表的基本操作

## 常见算法题

- 基本结构
- 从头到尾打印链表
- 反转链表
- 复杂链表的复制
- 合并两个排序的链表
- 链表倒数第k个节点
- 链表中环的入口
- 两个链表的第一个公共节点(相交链表)
- 链表中倒数第k个节点
- 删除链表中的节点or重复的节点
- 排序链表 ⭐⭐⭐
- 通过链表的后续遍历判断回文链表问题
- 合并 K 个升序链表 ⭐⭐⭐⭐
- 回文链表

## 基本结构

```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
// 要实现的基本功能：链表末尾添加节点、指定位置插入/删除节点、删除指定数据的节点、获取指定位置的节点数据
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  // 链表末尾添加节点
  append (data) {
    const newNode = new Node(data);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while(current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }
  // 在链表指定位置插入节点
  insert (data, index) {
    if (index < 0 || index > this.size) {
      throw new Error('Index out of bounds');
    }
    const newNode = new Node(data);
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      let previous = null;
      let i = 0;
      while (i < index) {
        previous = current;
        current = current.next;
        i++;
      }
      newNode.next = current;
      previous.next = newNode;
    }
  }
  // 删除指定位置的节点
  removeAt (index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds');
    }
    let current = this.head;
    if (index === 0) {
      this.head = current.next;
    } else {
      let previous = null;
      let i = 0;
      while (i < index) {
        previous = current;
        current = current.next;
        i++;
      }
      previous.next = current.next;
    }
  }
  // 删除指定数据的节点
  remove (data) {
    let current = this.head;
    let previous = null;
    while (current) {
      if (current.data === data) {
        if (previous === null) {
          this.head = current.next;
        } else {
          previous.next = current.next;
        }
      }
      previous = current;
      current = current.next;
    }
  }
  // 获取指定位置的节点数据
  get (index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of range');
    }
    let current = this.head;
    let i = 0;
    while(i < index) {
      current = current.next;
      i++;
    }
    return current.data
  }
  // 清空链表
  clean () {
    this.head = null;
    this.size = 0;
  }
  // 打印链表数据
  print () {
    let current = this.head;
    let result = '';
    while (current) {
      result += current.data + ' ';
      current = current.next;
    }
    console.log(result.trim());
  }
}
```

## 从头到尾打印链表

```js
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head) {
  if (!head) {
    throw new Error('head is null');
  }
  const arr = [];
  while (head) {
    arr.unshift(head.data);
    head = head.next;
  }
  return arr;
}
```

## 反转链表

输入一个链表，反转链表后，输出新链表的表头

- 原地排序法
- 头插法

```js
// 1->2->3->4->5->NULL
function reverseList(head) {
  // let current = null;
  // let headNode = head;
  // while (head && head.next) {
  //   current = head.next;
  //   head.next = current.next;
  //   current.next = head;
  //   headNode = current;
  // }
  // return headNode;

  let prev = null;
  let current = head;
  while (current !== null) {
    let temp = current.next;
    current.next = prev;
    prev = current;
    current = temp;
  }
  return prev;
}
```

```js
// 1->2->3->4->5->NULL
function reverseList(head) {
  if (head === null || head.next === null) {
    return head;
  }
  const newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
}
```

### 应用场景和扩展

- 判断回文链表：回文链表是指正向遍历和反向遍历得到的序列相同的链表。我们可以利用反转链表思想来判断一个链表是否为回文链表
  - 找到链表中间节点
  - 反转链表的后半部分
  - 同时遍历前半部分和反转后的后半部分，比较对应的节点值是否相等
  - 如果遍历完成且所有对应节点的值都相等，则链表为回文链表
- 反转部分链表：有时我们可能只需要反转链表的一部分,而不是整个链表。例如,给定一个链表和两个位置 m 和 n,我们需要反转位置 m 到位置 n 之间的节点。这可以通过以下步骤实现
  - 找到位置m的前一个节点prev和位置m节点的start
  - 反转从start开始的n-m+1个节点
  - 将 prev 的 next 指针指向反转后的子链表的头节点,将反转后的子链表的尾节点的 next 指针指向位置 n+1 的节点
- K 个一组反转链表
- 合并两个有序链表：给定两个有序链表,我们需要将它们合并成一个新的有序链表
  - 创建一个虚拟头节点 dummy,作为合并后链表的头节点
  - 使用两个指针 p1 和 p2 分别指向两个有序链表的头节点
  - 比较 p1 和 p2 指向的节点的值,将较小的节点添加到合并后的链表中,并将对应指针向后移动一步
  - 重复以上步骤,直到其中一个链表遍历完成
  - 将剩余的节点添加到合并后的链表中

## 复杂链表的复制

输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针指向任意一个节点）返回结果为复制后复杂链表的head

思路

```js
function CopyRandomList (head) {
  if (!head) {
    return null;
  }
  const map = new Map();
  let current = head;

  while (current !== null) {
    const copyNode = new Node(current.val);
    map.set(current, copyNode);
    current = current.next;
  }

  current = head;
  while (current !== null) {
    map.get(current).next = map.get(current.next) || null;
    map.get(current).random = map.get(current.random) || null;
    current = current.next;
  }

  return map.get(head);
}
```

## 合并两个排序的链表

输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则

```js
function merge(pHead1, pHead2) {
  if (!pHead1) {
    return pHead2;
  }
  if (!pHead2) {
    return pHead1;
  }
  let head = null;
  if (pHead1.val < pHead2.val) {
    head = pHead1;
    head.next = merge(pHead1.next, pHead2);
  } else {
    head = pHead2;
    head.next = merge(pHead1, pHead2.next);
  }
  return head;
}
```

## 链表倒数第k个节点

输入一个链表，输出该链表中倒数第k个结点。

思路：

- 循环到链表末尾找到length，再找到length-k节点，需要循环两次
- 优化
  - 设定两个节点，间距相差k个节点，当前面的节点到达终点，取后面的节点
  - 前面的节点到达k后，后面的节点才出发

```js
function findKthToTail(head, k) {
  if (!head || k <= 0) {
    return null;
  }
  let front = head;
  let behind = head;
  let index = 1;
  while (front.next) {
    index++
    front = front.next;
    if (index > k) {
      behind = behind.next;
    }
  }
  return (k <= index) && behind;
}
```

## 链表中环的入口

给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null。

思路

- 声明两个指针p1和p2
- 判断链表是否有环：P1 P2 从头部出发，P1走两步，P2走一步，如果可以相遇，则环存在
- 从环内某个节点开始计数，再回到此节点时得到链表环的长度length
- p1 和 p2 回到head节点，让 P1 先走 length 步 ，当P2和P1相遇时即为链表环的起点

```js
function EntryNodeOfLoop(pHead) {
  if (!phead || !pHead.next) {
    return null;
  }
  let p1 = pHead.next;
  let p2 = pHead.next.next;
  // 判断是否有环
  while (p1 !== p2) {
    if (p2 === null || p2.next === null) {
      return null
    }
    p1 = p1.next;
    p2 = p2.next.next;
  }

  // 获取环的长度
  let temp = p1;
  let length = 1;
  p1 = p1.next;
  while (temp !== p1) {
    p1 = p1.next;
    length++;
  }
  // 找到公共点
  p1 = p2 = pHead;
  while (length-- > 0) {
    p2 = p2.next;
  }
  while (p1 !== p2) {
    p1 = p1.next;
    p2 = p2.next;
  }
  return p1;
}
```

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function detectCycle(head) {
  if (head === null || head.next === null) {
    return null;
  }

  // 判断链表是否有环
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      break;
    }
  }

  // 如果链表无环,返回null
  if (fast === null || fast.next === null) {
    return null;
  }

  // 计算环的长度
  let length = 0;
  let temp = slow;
  do {
    temp = temp.next;
    length++;
  } while (temp !== slow);

  // 找到环的入口节点
  let p1 = head;
  let p2 = head;
  for (let i = 0; i < length; i++) {
    p1 = p1.next;
  }
  while (p1 !== p2) {
    p1 = p1.next;
    p2 = p2.next;
  }

  return p1;
}
```

## 两个链表的第一个公共节点

输入两个链表，找出它们的第一个公共结点

思路

- 先找到两个链表的长度
- 让长一点的链表先走length1-length2步，让长链表和短链表的起点相同
- 两个链表一起前进，比较获得第一个相等的元素

```js
function FindFirstCommonNode(pHead1, pHead2) {
  if (!pHead1 || !pHead2) {
    return null;
  }
  let longList, shortList, interval;
  let len1 = getLength(pHead1);
  let len2 = getLength(pHead2);
  if (len1 > len2) {
    longList = pHead1;
    shortList = pHead2;
    interval = len1 - len2;
  } else if {
    longList = pHead2;
    shortList = pHead1;
    interval = len2 - len1;
  }
  while (interval-- > 0) {
    longList = longList.next;
  }
  while (longList) {
    if (longList === shortList) {
      return longList;
    }
    longList = longList.next;
    shortList = shortList.next;
  }
  return null;
}
function getLength (head) {
  let length = 0;
  let current = head;
  while (current) {
    current = current.next;
    length++;
  }
  return length;
}
```

## 删除链表中的节点

给定单链表的头指针和要删除的指针节点，在O(1)时间内删除该节点。

- 删除的节点不是尾部节点 - 将next节点覆盖当前节点
- 删除的节点是尾部节点且等于头节点，只剩一个节点 - 将头节点置为null
- 删除的节点是尾节点且前面还有节点 - 遍历到末尾的前一个节点删除

```js
function deleteNode(head, node) {
  if (head === null || node === null) {
    return head;
  }
  if (node.next) {
    node.val = node.next.val;
    node.next = node.next.next;
  } else if (head === node) {
    node = null;
    head = null;
  } else {
    let current = head;
    while (current.next !== node) {
      current = current.next;
    }
    current.next = null;
  }
  return head;
}
```

## 删除链表中的重复的节点

思路1

- 存储链表中元素出现的次数
- 用一个map存储每个节点出现的次数
- 删除出现次数大于1的节点

```js
function deleteDuplicates(pHead) {
  if (pHead === null || pHead.next === null) {
    return pHead;
  }
  const map = new Map();
  let current = pHead;
  while (current) {
    if (map.has(current.val)) {
      map.set(current.val, map.get(current.val) + 1);
    } else {
      map.set(current.val, 1);
    }
    current = current.next;
  }

  current = pHead;
  let prev = null;
  while (current) {
    const val = map.get(current.val);
    if (val > 1) {
      if (current === pHead) {
        pHead = pHead.next;
        current = pHead;
      } else {
        prev.next = current.next;
        current = prev.next;
      }
    } else {
      prev = current;
      current = current.next;
    }
  }
  return pHead;
}
```

思路2

- 重新比较连接数组
- 链表是排好顺序的，所以重复元素都会相邻出现 递归链表
- 当前节点或当前节点的next为空，返回该节点
- 当前节点是重复节点：找到后面第一个不重复的节点
- 当前节点不重复：将当前的节点的next赋值为下一个不重复的节点

```js
function deleteDuplication (pHead) {
  if (!pHead || !pHead.next) {
    return pHead;
  } else if (pHead.val === pHead.next.val) {
    let templateNode = pHead.next;
    while (templateNode && templateNode.val === pHead.val) {
      templateNode = templateNode.next;
    }
    return deleteDuplication(templateNode);
  } else {
    pHead.next = deleteDuplication(pHead.next);
    return pHead;
  }
}
```

## 排序链表

```js
function sortList(head) {
  if (head === null || head.next === null) {
    return head;
  }
  // 快慢指针找到中间节点
  let fast = head;
  let slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  const mid = slow.next;
  slow.next = null;

  const left = sortList(head);
  const right = sortList(mid);

  return merge(left, right);
}

function merge(left, right) {
  const dummy = new ListNode(0);
  let current = dummy;

  while (left !== null && right !== null) {
    if (left.val < right.val) {
      current.next = 
    }
  }
}

```

## 通过链表的后续遍历判断回文链表问题

## 回文链表

## 合并 K 个升序链表 ⭐⭐⭐⭐
