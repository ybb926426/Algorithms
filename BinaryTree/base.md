# 二叉

二叉树是是一种常见的树形结构，它的每个节点最多只有两个子节点，称为左子节点和右子节点；二叉树是一种递归定义的数据结构，它要么为空，要么由一个根节点和两个互不相交的子树组成，两个子树分别称为左子树和右子树。

## 结构

二叉树的每个节点包含以下部分

- 数据域：存储节点的数据信息
- 左指针：指向左子节点的指针
- 右指针：指向右子节点的指针

## 性质

- 节点的度：节点拥有的子树数量。在二叉树中，节点的度最大为2
- 树的度：树中节点的最大度数。二叉树中树的度为2
- 叶节点: 度为0的节点,即没有子节点的节点
- 父节点
- 子节点
- 兄弟节点
- 路径：从一个节点到另一个节点所经过的节点序列
- 路径长度：路径上边的数量
- 树的高度或深度

## 二叉树遍历

- 前序遍历：先访问根节点，然后递归遍历左子树，再递归遍历右子树
- 中序遍历：先递归遍历左子树，然后访问根节点，再递归遍历右子树
- 后序遍历：先递归遍历左子树,然后递归遍历右子树,最后访问根节点
- 层序遍历：按照从上到下、从左到右的顺序逐层访问节点

## 存储结构

- 顺序存储:使用数组来存储二叉树的节点,通常适用于完全二叉树。父节点和子节点的索引有一定的关系
- 链式存储:使用节点结构来存储二叉树的节点,每个节点包含数据域和指向左右子节点的指针

## 应用

- 二叉搜索树
- 平衡二叉树

## 变体

- 满二叉树：除了叶子节点外,每个节点都有两个子节点
- 完全二叉树：除了最后一层外,其他层的节点都是满的,且最后一层的节点尽可能靠左
- 线索二叉树：利用节点的空指针来存储前驱和后继节点的信息,便于快速遍历
- 哈夫曼树：一种带权路径长度最短的二叉树,用于数据压缩和编码

### 完全二叉树

完全二叉树是一种特殊的二叉树,它满足以下两个条件

- 除了最后一层外,其他各层的节点数都达到最大值,即每一层都是满的
- 最后一层的节点都集中在左侧,右侧的节点不存在或者为空

一些公式

- 第n层的节点最多为2^n个节点
- n层二叉树最多有 2^0+...+2^n=2^(n+1) - 1 个节点
- 第一个非叶子节点：length/2
- 一个节点的孩子节点：2n、2n+1

基本结构

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
