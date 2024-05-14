# 二叉树的基本操作

## 基本结构

```js
function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
}

Node.prototype = {
  show: function () {
    console.log(this.data)
  }
}

function Tree() {
  this.root = null;
}

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
          return
        }
      } else {
        current = current.right;
        if (!current) {
          parent.right = node;
          return
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
    var current = this.root;
    while (current) {
      if (!current.right) {
        return current;
      }
      current = current.right;
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
  }
}
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
}
```

```js
// 迭代
var preoderTraversal = function (root) {
    if (!root) {
        return [];
    }

    const result = []
    const stack = []
    stack.push(root)
    while (stack.length > 0) {
        const node = stack.pop()
        result.push(node.val)

        if (node.right) {
            stack.push(node.right)
        }
        if (node.left) {
            stack.push(node.left)
        }
    }
}
```

### 中序遍历

```js
// 迭代
var inorderTraversal = function (root) {
    const result = []
    const stack = []
    let current = root

    while (current || stack.length > 0) {
        while (current) {
            stack.push(current)
            current = current.left
        }
        current = stack.pop()
        result.push(current.val)
        current = current.right
    }

    return result
}
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
- 找到root在中序遍历的位置 -> 左子树的长度和右子树的长度
- 截取左子树的中序遍历、右子树的中序遍历
- 截取左子树的前序遍历、右子树的前序遍历
- 递归重建二叉树

```js
function treeRebuild(pre, vin) {
    if (pre.length === 0) {
        return null;
    }

    if (pre.length === 1) {
        return new TreeNode(pre[0])
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
    return isSymmetricHandel(root, root)
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
    return isSymmetricHandel(node1.left, node2.right) && isSymmetricHandel(node1.right, node2.left);
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
function maxDepth(root) {
    return !root ? 0 : Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
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

## 平衡二叉树

平衡二叉树是指每个子树的深度之差不超过1

思路

- 后续遍历二叉树
- 在遍历二叉树每个节点前都会遍历其左右子树
- 比较左右子树的深度，若差值大于1，则返回一个标记-1表示当前子树不平衡
- 左右子树有一个不是平衡的，或左右子树插值大于1，则整棵树不平衡
- 若左右子树平衡，返回当前树的深度（左右子树的深度最大值+1）

```js
function isBalance(root) {
    return isBalanceHandel(root) != -1;
}
function isBalanceHandel(root) {
    if (!root) {
        return 0;
    }
    const left = isBalanceHandel(root.left);
    const right =  isBalanceHandel(root.right);
    if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
        return -1
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
    arr.push('#');
  }
  else {
    arr.push(pRoot.val);
    Serialize(pRoot.left, arr);
    Serialize(pRoot.right, arr);
  }
  return arr.join(',');
}
```
