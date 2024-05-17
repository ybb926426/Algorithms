# 二叉树的基本操作

## 常见算法题

- 二叉树的基本操作 ⭐⭐
- 二叉树的中序遍历 ⭐⭐
- 二叉树的前序遍历 ⭐⭐
- 二叉树的后序遍历 ⭐⭐
- 二叉树的层次遍历 ⭐⭐
- 重建二叉树 ⭐⭐
- 对称二叉树 ⭐⭐
- 二叉树的镜像 ⭐⭐
- 二叉树的最大深度 ⭐⭐
- 二叉树的最小深度 ⭐⭐
- 平衡二叉树 ⭐⭐
- 序列化和反序列化二叉树 ⭐⭐⭐
- 二叉树的最近公共祖先
- 二叉搜索树中的搜索
- 删除二叉搜索树中的节点 ⭐⭐⭐
- 完全二叉树的节点个数 ⭐⭐⭐
- 二叉树的锯齿形层次遍历
- 二叉搜索树中第 K 小的元素

## 基本结构

```js
function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
}

Node.prototype = {
  show: function () {
    console.log(this.data);
  },
};

function Tree() {
  this.root = null;
}
// 要实现的基本功能：插入节点、前序遍历、中序遍历、后续遍历、层序遍历、查找节点、删除节点、最大节点、最小节点
Tree.prototype = {
  insert: function (data) {
    const node = new Node(data, null, null);
    if (!this.root) {
      this.root = node;
      return;
    }
    const current = this.root;
    const parent = null;

    while (current) {
      parent = current;

      if (data < current.data) {
        current = current.left;
        if (!current) {
          parent.left = node;
          return;
        }
      } else {
        current = current.right;
        if (!current) {
          parent.right = node;
          return;
        }
      }
    }
  },
  preOrder: function (node) {
    if (node) {
      node.show();
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  },
  middleOrder: function (node) {
    if (node) {
      this.middleOrder(node.left);
      node.show();
      this.middleOrder(node.right);
    }
  },
  laterOrder: function (node) {
    if (node) {
      this.laterOrder(node.left);
      this.laterOrder(node.right);
      node.show();
    }
  },
  // 层序遍历
  levelOrder: function (node) {
    if (node) {
      const queue = [this.root];
      while (queue.length > 0) {
        const node = queue.shift();
        node.show(ode.val);

        if (node.left !== null) {
          queue.push(node.left);
        }
        if (node.right !== null) {
          queue.push(node.right);
        }
      }
    }
  },
  getMin: function () {
    var current = this.root;
    while (current) {
      if (!current.left) {
        return current;
      }
      current = current.left;
    }
  },
  getMax: function () {
    if (this.root == null) {
      return -Infinity;
    }
    const queue = [this.root];
    let maxVal = -Infinity;
    while (queue.length > 0) {
      const node = queue.shift();
      maxVal = Math.max(node.val, maxVal);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  },
  getDeep: function (node, deep) {
    deep = deep || 0;
    if (node === null) {
      return deep;
    }
    deep++;
    var dleft = this.getDeep(node.left, deep);
    var dright = this.getDeep(node.right, deep);
    return Math.max(dleft, dright);
  },
  getNode: function (data, node) {
    if (node) {
      if (data === node.data) {
        return node;
      } else if (data < node.data) {
        return this.getNode(data, node.left);
      } else {
        return this.getNode(data, node.right);
      }
    } else {
      return null;
    }
  },
  // 如果根节点为空,直接返回null。
  // 如果要删除的节点值小于当前节点的值，递归地在左子树中删除该节点
  // 如果要删除的节点值大于当前节点的值，递归地在右子树中删除该节点
  // 如果要删除的节点值等于当前节点的值
  // 情况1：当前节点没有左右子树，直接删除即可，返回null
  // 情况2：当前节点只有一个子节点，用子节点替换当前节点即可
  // 情况3：当前节点有两个节点：需要找到右子树中的最小节点作为替换，然后递归地删除该最小节点
  remove(node, val) {
    if (node === null) {
      return null;
    }
    if (val < node.data) {
      this.remove(node.left, val);
    } else if (val > node.data) {
      this.remove(node.right, val);
    } else {
      // 情况1 当前节点没有左右子树，直接删除即可，返回null
      if (node.left === null && node.right === null) {
        return null;
      }
      // 情况2：只有一个子节点
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }
      // 情况3：当前节点有两个子节点
      let minNode = this.getMin(node.right);
      node.val = minNode.data;
      this.remove(node.right, minNode.data);
    }
  },
};
```

## 二叉树遍历

### 前序遍历

```js
// 递归
var preoderTraversal = function (node, array = []) {
  if (node) {
    array.push(node.data);
    preoderTraversa(node.left, array);
    preoderTraversa(node.right, array);
  }
  return array;
};
```

```js
// 迭代
var preoderTraversal = function (root) {
  if (!root) {
    return [];
  }

  const result = [];
  const stack = [];
  stack.push(root);
  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);

    if (node.right) {
      stack.push(node.right);
    }
    if (node.left) {
      stack.push(node.left);
    }
  }
};
```

### 中序遍历

```js
// 迭代
var inorderTraversal = function (root) {
  const result = [];
  const stack = [];
  let current = root;

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }

  return result;
};
```

### 后序遍历

```js
// 迭代
```

## 二叉树重建

输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字

例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回

思路

- 前序遍历：根节点 + 左子树前序遍历 + 右子树前序遍历
- 中序遍历：左子树中序遍历 + 根节点 + 右字数中序遍历
- 后序遍历：左子树后序遍历 + 右子树后序遍历 + 根节点

根据上面规律

- 前序遍历找到根节点
- 找到 root 在中序遍历的位置 -> 左子树的长度和右子树的长度
- 截取左子树的中序遍历、右子树的中序遍历
- 截取左子树的前序遍历、右子树的前序遍历
- 递归重建二叉树

```js
function treeRebuild(pre, vin) {
  if (pre.length === 0) {
    return null;
  }

  if (pre.length === 1) {
    return new TreeNode(pre[0]);
  }

  const rootValue = pre[0];
  const rootIndex = vin.indexOf(rootValue);

  const vinLeft = vin.slice(0, rootIndex);
  const vinRight = vin.slice(rootIndex + 1);

  const preLeft = pre.slice(1, rootIndex + 1);
  const preRight = pre.slice(rootIndex + 1);
  const node = new TreeNode(rootValue);

  node.left = treeRebuild(preLeft, vinLeft);
  node.right = treeRebuild(preRight, vinRight);
  return node;
}
```

## 对称二叉树

```js
function isSymmetric(root) {
  return isSymmetricHandel(root, root);
}

function isSymmetricHandel(node1, node2) {
  if (node1 === null && node2 === null) {
    return true;
  }
  if (node1 === null || node2 === null) {
    return false;
  }
  if (node1.val !== node2.val) {
    return false;
  }
  return (
    isSymmetricHandel(node1.left, node2.right) &&
    isSymmetricHandel(node1.right, node2.left)
  );
}
```

## 二叉树的镜像

```yaml
源二叉树
8
/  \
6   10
/ \  / \
5  7 9 11
镜像二叉树
8
/  \
10   6
/ \  / \
11 9 7  5
```

```js
function mirror(root) {
  if (root) {
    const temp = root.right;
    root.right = root.left;
    root.left = temp;
    mirror(root.right);
    mirror(root.left);
  }
}
```

## 二叉树的最大深度

```js
// 递归
function maxDepth(root) {
  return !root ? 0 : Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}
// 迭代
function maxDepthIterate(root) {
  if (!root) {
    return 0;
  }
  const queue = [root];
  let depth = 0;
  while (queue.length > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    depth++;
  }
  return depth;
}
```

## 二叉树的最小深度

二叉树的最小深度是指从根节点到最近叶子节点的最短路径上的节点数

深度优先 + 分治

- 左右子树都不为空：左子树深度和右子树最小深度的最小值 + 1
- 左树为空：右子树最小深度的最小值 + 1
- 右树为空：左子树最小深度 + 1

```js
function minDepth(root) {
  if (!root) {
    return 0;
  }
  if (!root.left) {
    return 1 + minDepth(root.right);
  }
  if (!root.right) {
    return 1 + minDepth(root.left);
  }

  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
}
```

层序遍历

```js
function minDepth(root) {
  if (root === null) return 0;

  const queue = [root];
  let depth = 1;
  while (queue.length > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (node.left === null && node.right === null) {
        return depth;
      }

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    depth++;
  }

  return depth;
}
```

## 平衡二叉树

平衡二叉树是指每个子树的深度之差不超过 1

思路

- 后续遍历二叉树
- 在遍历二叉树每个节点前都会遍历其左右子树
- 比较左右子树的深度，若差值大于 1，则返回一个标记-1 表示当前子树不平衡
- 左右子树有一个不是平衡的，或左右子树插值大于 1，则整棵树不平衡
- 若左右子树平衡，返回当前树的深度（左右子树的深度最大值+1）

```js
function isBalance(root) {
  return isBalanceHandle(root) != -1;
}
function isBalanceHandle(root) {
  if (!root) {
    return 0;
  }
  const left = isBalanceHandle(root.left);
  const right = isBalanceHandle(root.right);
  if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
    return -1;
  }
  return Math.max(left, right) + 1;
}
```

## 请实现两个函数，分别用来序列化和反序列化二叉树

思路

- 若一个二叉树是不完全的，我们至少需要两个遍历才能将它重建
- 但这种方式仍然有一定的局限性，比如二叉树中不能出现重复节点
- 如果二叉树是一颗完全二叉树，我们只需要知道前序遍历即可将它重建
- 因此在序列化二叉树时，可以将空节点使用特殊符号存储起来，这样可以模拟一颗完全二叉树的前序遍历
- 在重建二叉树时，遇到特殊符号时当作空节点处理

```js
function Serialize(pRoot, arr = []) {
  if (!pRoot) {
    arr.push("#");
  } else {
    arr.push(pRoot.val);
    Serialize(pRoot.left, arr);
    Serialize(pRoot.right, arr);
  }
  return arr.join(",");
}

function Deserialize(str) {
  if (!str) {
    return null;
  }
  return deserialize(str.split(","));
}
function deserialize(arr) {
  let node = null;
  const current = arr.shift();
  if (current !== '#') {
    node = new TreeNode(current);
    node.left = deserialize(arr);
    node.right = deserialize(arr);
  }
}
```

## 二叉树的最近公共祖先

最近公共祖先(Lowest Common Ancestor, LCA) 是指在二叉树中，给定两个节点p和q，找到他们的最近公共祖先节点。最近公共祖先节点是指在二叉树中同时拥有节点p和节点q作为后代的最深节点

使用递归方式解决：对于每个节点，我们判断它是否为p或q中的一个，然后递归地在它地左右子树中查找p和q

```js
// 如果根节点为空或者根节点等于p或q,直接返回根节点。这是递归的终止条件
// 
function lowestCommonAncestor(root, p, q) {
  if (root === null || root === p || root === q) {
    return root;
  }

  // 递归地在左子树中查找p和q地最近公共祖先
  const left = lowestCommonAncestor(root.left, p, q);
  // 递归地在右子树中查找p和q的最近公共祖先
  const right = lowestCommonAncestor(root.right, p, q);
  // 如果左子树和右子树都找到了p或q,说明当前节点就是最近公共祖先
  if (left !== null && right !== null) {
    return root;
  }
  // 如果左子树找到了p或q,而右子树没有找到,返回左子树的结果
  if (left !== null) {
    return left;
  }
  // 如果右子树找到了p或q,而左子树没有找到,返回右子树的结果
  if (right !== null) {
    return right;
  }
  // 如果左右子树都没有找到p或q,返回null
  return null;
}
```

## 二叉搜索树中的搜索

```js
```

## 验证二叉搜索树

给定一个二叉树，判断其是否是一个有效的二叉搜索树

二叉搜索树(Binary Search Tree)是一种特殊的二叉树，满足下列约束条件：

- 对于任意节点，其左子树的所有节点的值都小于该节点的值
- 对于任意节点，其右子树的所有节点的值都大于该节点的值
- 左右子树也必须是二叉搜索树

```js
function isValidBST(root) {
  // 递归函数，验证当前节点是否满足二叉树性质
  function validate(node, min, max) {
    if (node === null) {
      return true;
    }

    if (node.val <= min || node.val >= max) {
      return false;
    }

    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
  }

  return validate(root, -Infinity, Infinity);
}
```

## 完全二叉树的节点个数

除了最后一层外,其他层的节点都是满的,且最后一层的节点尽可能靠左

```js
// 可以利用完全二叉树的特性,使用二分查找的思想来优化节点个数的计算过程
function countNodes(root) {
  if (root === null) {
    return 0;
  }

  // 计算左子树高度
  let leftHeight = 0;
  let leftNode = root;
  while (leftNode !== null) {
    leftHeight++;
    leftNode = leftNode.left;
  }
  // 计算右子树高度
  let rightHeight = 0;
  let rightNode = root;
  while (rightNode !== null) {
    rightHeight++;
    rightNode = rightNode.right;
  }
  // 如果左右子树高度相等，说明是一颗满二叉树
  if (leftHeight === rightHeight) {
    return Math.pow(2, leftHeight) - 1;
  }

  // 如果左右子树高度不相等，递归计算左右子树的节点个数
  return 1 + countNodes(root.left) + countNodes(root.right);

}
```

## 二叉树的锯齿形层次遍历

锯齿形层次遍历是一种特殊的二叉树遍历方式，其特点是：

- 第一层从左到右遍历
- 第二层从右到左遍历
- 第三层再从左到右遍历
- 以此类推，交替进行

实现思路

- 利用两个栈来实现锯齿形层次遍历
- 一个栈用于存储奇数层的节点
- 另一个栈用于存储偶数层的节点

```js
function zigzagLevelOrder(root) {
  if (root === null) {
    return [];
  }

  const result = [];
  const oddStack = [];
  const evenStack = [];
  let isOddLevel = true;

  oddStack.push(root);

  while (oddStack.length > 0 || evenStack.length > 0) {
    const currentLevelNodes = [];

    if (isOddLevel) {
      // 奇数层：从左到右遍历
      while (oddStack.length > 0) {
        const node = oddStack.pop();
        currentLevelNodes.push(node.val);

        if (node.left !== null) {
          evenStack.push(node.left);
        }
        if (node.right !== null) {
          evenStack.push(node.right);
        }
      }
    } else {
      // 偶数层：从右到左遍历
      while (evenStack.length > 0) {
        const node = evenStack.pop();
        currentLevelNodes.push(node.val);

        if (node.right !== null) {
          oddStack.push(node.right);
        }
        if (node.left !== null) {
          oddStack.push(node.left);
        }
      }
    }
    result.push(currentLevelNodes); 
    isOddLevel = !isOddLevel;
  }

  return result;
}
```

## 二叉搜索树中第 K 小的元素
