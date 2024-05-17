class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
  show () {
    console.log(this.val);
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  // 插入节点
  insert (val) {
    const newNode = new TreeNode(val);
    if (this.root == null) {
      this.root = newNode;
    } else {
      const current = this.root;
      const parent = null;
      while (current) {
        parent = current;
        if (val < current.val) {
          current = current.left;
          if (!current) {
            parent.left = newNode;
          }
        } else {
          current = current.right;
          if (!current) {
            parent.right = newNode;
          }
        }
      }
    }
  }

  // 前序遍历
  preOrder (node) {
    if (node) {
      node.show();
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  }
  // 中序遍历
  midOrder (node) {
    if (node) {
      this.midOrder(node.left);
      node.show();
      this.midOrder(node.right);
    }
  }
  // 后序遍历
  laterOrder (node) {
    if (node) {
      this.laterOrder(node.left);
      this.laterOrder(node.right);
      node.show();
    }
  }
  // 层序遍历
  levelOrder () {
    if (this.root) {
      const queue = [this.root];
      while (queue.length) {
        const node = queue.shift();
        node.show(nodeode.val);
        if (node.left !== null) {
          queue.push(node.left);
        }
        if (node.right !== null) {
          queue.push(node.right);
        }
      }
    }
  }
  // 查找节点
  getNode (val) {
    return this._getNode(this.root, val);
  }
  _getNode (node, val) {
    if (node == null) return null;
    if (node.val === val) {
      return node;
    } else if (node.val > val) {
      return this._getNode(node.left, val);
    } else {
      return this._getNode(node.right, val);
    }
  }

  // 删除节点
  remove (node, val) {
    if (node === null) return null;

    if (val < node.val) {
      node.left = this.remove(node.left, val);
    } else if (val > node.val) {
      node.right = this.remove(node.right, val);
    } else {
      // 情况1：叶子节点
      if (node.left === null && node.right === null) {
        return null;
      }
      // 情况2：只有一个子节点
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }
      // 情况3：有两个子节点
      let minNode = this.getMinNode(node.right);
      node.val = minNode.val;
      node.right = this.remove(node.right, minNode.val);
    }
    return root;
  }

  // 最小节点
  getMinNode () {
    if (this.root) {
      var current = this.root;
      while (current) {
        if (!current.left) {
          return current;
        }
        current = current.left;
      }
    }
  }
  // 最大节点
  getMaxNode (root) {
    // if (root === null) return -Infinity;
    // const leftMax = maxValue(root.left);
    // const rightMax = maxValue(root.right);

    // return Math.max(root.val, leftMax, rightMax);

    if (root === null) return -Infinity;

    let maxVal = -Infinity;
    const queue = [root];
    while (queue.length) {
      const node = queue.shift();
      maxVal = Math.max(node.val, maxVal);

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
  // 获取深度
  getDeep (node, deep) {
    deep = deep || 0;
    if (node === null) {
      return deep;
    }
    deep++;
    dleft = this.getDeep(node.left, deep);
    dright = this.getDeep(node.right, deep);
    return Math.max(dleft, dright);
  }
}

function TreeRebuild (pre, mid) {
  if (pre.length === 0 || mid.length === 0) {
    return null;
  }
  if (pre.length === 1) {
    return new TreeNode(pre[0]);
  }
  const root = pre[0];
  const rootIndex = mid.indexOf(root);

  const midLeft = mid.slice(0, rootIndex);
  const midRight = mid.slice(rootIndex + 1);

  const preLeft = pre.slice(1, rootIndex + 1);
  const preRight = pre.slice(rootIndex + 1);

  node.left = TreeRebuild(preLeft, midLeft);
  node.right = TreeRebuild(preRight, midRight);

  return node;
}

function isSymmetric (root) {
  return _isSymmetric(root, root);
}

function _isSymmetric (node1, node2) {
  if (node1 === null && node2 === null) {
    return true;
  }
  if (node1 === null || node2 === null) {
    return false;
  }
  if (node1.val !== node2.val) {
    return false;
  }
  return _isSymmetric(node1.left, node2.right) && _isSymmetric(node1.right, node2.left);
}

function mirrorTree (root) {
  if (root === null) {
    return null;
  }
  const temp = root.right;
  root.right = root.left;
  root.left = temp;
  mirrorTree(root.left);
  mirrorTree(root.right);
}

function maxDepth(root) {
  if (root === null) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

function minDepth (root) {
  if (root === null) return 0;
  if (root.left === null && root.right === null) return 1;

  const leftDepth = root.left !== null ? minDepth(root.left) : Infinity;
  const rightDepth = root.right !== null ? minDepth(root.right) : Infinity;

  return Math.min(leftDepth, rightDepth) + 1;
}

function isBalanced (root) {
  return _isBalanced(root) !== -1;
}
function _isBalanced(node) {
  if (node === null) return 0;
  const left = _isBalanced(node.left);
  const right = _isBalanced(node.right);

  if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
    return -1;
  }
  return Math.max(left, right) + 1;
}

// 链表

class LinkNode {
  constructor (data) {
    this.data = data;
    this.next = null;
  }
}
class LinkNodeList {
  constructor () {
    this.head = null;
    this.size = 0;
  }
  append(data) {
    const newNode = new LinkNode(data);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
      this.size++;
    }
  }
  insert(data, index) {
    if (index < 0 || index > this.size) {
      throw new Error('index out of range');
    }
    const newNode = new LinkNode(data);
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      let previous = null;
      let count = 0;
      while (count < index) {
        previous = current;
        current = current.next;
        count++;
      }
      newNode.next = current;
      previous.next = newNode;
    }
  }
  removeAt(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds');
    }
    let current = this.head;
    if (index === 0) {
      this.head = current.next;
    } else {
      let previous = null;
      let count = 0;
      while (count < index) {
        previous = current;
        current = current.next;
        count++;
      }
      previous.next = current.next;
    }
  }
  remove(data) {
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
  print () {
    let current = this.head;
    let str = '';
    while (current) {
      str += current.data + ' -> ';
      current = current.next;
    }
    console.log(str);
  }
}

// 反转链表
// 原地排序法
// 1 -> 2 -> 3 -> null
function reverseList (head) {
  
}
// 头插法
// 1 -> 2 -> 3 -> 4 -> null

// newhead = 1 -> null
// current = 2 -> 3 -> 4 -> null

// newhead = 2 -> 1 -> null
// current = 3 -> 4 -> null

function reverseList2 (head) {
  let newHead = null; // 新链表的头节点
  let current = head; // 当前遍历的节点

  while (current !== null) {
    let next = current.next; // 保存当前节点的下一个节点
    current.next = newHead; // 将当前节点的next指针指向新链表的头节点
    newHead = current; // 更新新链表的头节点为当前节点
    current = next; // 移动当前节点到原链表的下一个节点
  }

  return newHead; // 返回反转后的链表头节点
}

// 复杂链表的复制

function copyRandomList (head) {
  if (head === null) {
    return null;
  }

  const map = new Map();
  let current = head;
  // 第一次遍历：复制节点并建立原节点到新节点的映射
  while (current !== null) {
    map.set(current, new LinkNode(current.val));
    current = current.next;
  }

  current = head;
  // 第二次遍历：建立新节点的next指针和random指针
  while (current !== null) {
    map.get(current).next = map.get(current.next) || null;
    map.get(current).random = map.get(current.random) || null;
    current = current.next;
  }

  return map.get(head);
}

// 合并两个排序的链表
function merge (p1, p2) {
  if (p1 === null && p2 === null) {
    return null;
  }
  if (p1 === null) {
    return p2;
  }
  if (p2 === null) {
    return p1;
  }
  let head = null;
  if (p1.val < p2.val) {
    head = p1;
    head.next = merge(p1.next, p2);
  } else {
    head = p2;
    head.next = merge(p1, p2.next);
  }
  return head;
}

// 输入一个链表，输出该链表中倒数第k个结点
function findKthToTail (head, k) {
  if (head === null || k <= 0) {
    return null;
  }
  let front = head;
  let behind = head;
  let count = 1;
  while (front.next) {
    count++;
    front = front.next;
    if (count > k) {
      behind = behind.next;
    }
  }
  return (k <= index) && behind;
}

// 链表中环的入口
function EntryNodeOfLoop (head) {
  if (head === null || head.next === null) {
    return null;
  }

  // 快慢指针 判断是否有环
  let fast = head;
  let slow = head;
  while (fast !== slow) {
    if (fast === null || fast.next === null) {
      return null;
    }
    fast = fast.next.next;
    slow = slow.next;
  }

  // 获取环的长度
  
}