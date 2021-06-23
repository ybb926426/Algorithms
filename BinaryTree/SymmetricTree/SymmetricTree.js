/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */

//  方法一：递归 （深度遍历优先）
var isSymmetric = function(root) {
  return check(root, root);
};

var check = function(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val != q.val) return false;
  return check(p.left, q.right) && check(p.right, q.left);
}

//  方法二：队列实现 （广度遍历优先）
var isSymmetricQueue = function(root) {
  if (root == null) return true;
  const queue = [];
  queue.push(root.left, root.right); // 起初入列两个子树
  // 队列清空就结束，没有节点可入列了
  while (queue.length) {
    const levelSize = queue.length;
    for(let i = 0; i < levelSize; i += 2) { // 当前层的节点成对出列
      const left = queue.shift();
      const right = queue.shift(); // 出列一对节点

      // 一个存在 一个不存在
      if ((left && right == null) || (right && left == null)) {
        return false;
      }

      if (right && left) {
        if (left.val != right.val) return false;

        queue.push(left.left, right.right); // 推入下一层的一对节点
        queue.push(left.right, right.left); // 推入下一层的一对节点
      }
    }
  }
  return true;
}

