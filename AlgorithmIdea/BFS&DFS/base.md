# 深度优先搜索和广度优先搜索

## 深度优先搜索

深度优先搜索（DFS）是一种图的遍历算法，它从一个起始节点开始，沿着一条路径尽可能深地探索图中的节点，直到无法继续探索为止，然后回溯到上一个节点，继续探索其他路径。

DFS通常用于解决连通性问题、查找路径、拓扑排序等问题

基本思想：

- 选择一个起使节点，将其标记为已访问
- 递归地访问起始节点的一个未被访问过的邻居节点，将其标记为已访问，并继续探索该邻居节点的邻居节点
- 当无法继续探索时，回溯到上一个节点，继续探索其他未被访问过的邻居节点
- 重复步骤2和步骤3，直到所有节点都被访问过

特点：

- 使用栈(通常通过递归实现)来存储待访问的节点，保证了深度优先的顺序
- 每个节点只会被访问一次，避免了重复访问
- 在探索完一条路径后，再回溯到上一个节点，继续探索其他路径，保证了深度优先的特性

```js
// 伪代码
function DFS(graph, node, visited):
  mark node as visited

  for each neighbor of node:
    if neighbor is not visited:
      DFS(graph, neighbor, visited)
```

复杂度：

- 时间复杂度：O(V+E)，其中V为节点数，E为边数(最坏情况下,DFS需要访问图中的所有节点和边)
- 空间复杂度：O(V)，其中V为节点数(因为需要使用栈(递归调用栈)来存储节点)

应用场景

- 连通性问题 DFS可以用于判断图是否连通,以及找到图的连通分量
- 查找路径 DFS可以用于查找从起始节点到目标节点的一条路径(不一定是最短路径)
- 拓扑排序 DFS可以用于对有向无环图进行拓扑排序
- 查找桥和割点 DFS可以用于查找图中的桥(删除后会导致图不连通的边)和割点(删除后会导致图不连通的节点)

## 广度优先搜索

广度优先搜索（BFS）是一种遍历或搜索数据结构(如图或树)的算法

广度优先搜索是一种图的遍历算法,它从一个起始节点开始,逐层探索图中的节点,直到找到目标节点或遍历完整个图。BFS通常用于解决最短路径问题、连通性问题以及层次遍历等问题

基本思想：

- 选择一个起始节点，将其加入队列中
- 从队列中取出一个节点，访问该节点的所有未被访问过的邻接节点，将它们加入队列中
- 重复步骤2，直到队列为空或找到目标节点

特点

- 使用队列来存储待访问的节点，保证了先进先出的顺序
- 每个节点只会被访问一次，避免了重复访问
- 在访问完一层节点后，再访问下一层节点，保证了逐层探索的特性

应用场景：

- 最短路径问题：在无权图中，BFS可以用于寻找从起使节点到目标节点的最短路径
- 连通性问题：BFS可以用于判断图是否连通，以及找到图的连通分量
- 层次遍历：BFS可以按照层次的顺序遍历图或树，常用于打印树的层次结构

## DFS和BFS的共同点和区别

DFS和BFS的共同点：

- 都是用于遍历图或树结构的算法
- 都可以用于解决连通性问题、查找路径等问题
- 都需要使用某种数据结构来存储待访问的节点，以避免重复访问
- 时间复杂度都是O(V+E)，其中V为节点数，E为边数

区别

- 遍历顺序不同：DFS是深度优先，尽可能深地探索一条路径，然后回溯；BFS是广度优先，逐层探索节点
- 数据结构不同：DFS通常使用栈(递归调用栈)来存储待访问的节点；BFS使用队列来存储待访问的节点
- 适用场景不同：DFS适合解决需要探索所有可能路径的问题，如查找路径、判断连通性等；BFS适合解决最短路径、层次遍历等
- 空间复杂度不同:DFS 的空间复杂度与树或图的深度有关,最坏情况下为 O(V);BFS 的空间复杂度与树或图的最大宽度有关,最坏情况下为 O(V)

下面是一个使用 DFS 和 BFS 解决同一个问题的示例,以便更好地理解它们的区别

问题:给定一个二叉树,找到从根节点到目标节点的路径

```js
// DFS
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
function findPathDFS(root, target, path = []) {
  if (!root) {
    return null;
  }

  path.push(root.val);

  if (root.val === target) {
    return path;
  }

  const leftPath = findPathDFS(root.left, target, path);
  if (leftPath) {
    return leftPath;
  }
  const rightPath = findPathDFS(root.right, target, path);
  if (rightPath) {
    return rightPath;
  }

  path.pop();
  return null;
}
```

```js
function findPathBFS(root, target) {
  if (!root) {
    return null;
  }

  const queue = [[root, [root.val]]];

  while (queue.length > 0) {
    const [node, path] = queue.shift();
    if (node.val === target) {
      return path;
    }

    if (node.left) {
      queue.push([node.left, [...path, node.left.val]]);
    }

    if (node.right) {
      queue.push([node.right, [...path, node.right.val]]);
    }
  }

  return null;
}
```
