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
 * @param {number} targetSum
 * @return {boolean}
 */
// 方法一 广度优先搜索

// 思路及算法
// 首先我们可以想到使用广度优先搜索的方式，记录从根节点到当前节点的路径和，以防止重复计算。
// 这样我们使用两个队列，分别存储将要遍历的节点，以及根节点到这些节点的路径和即可。

var hasPathSum = function(root, targetSum) {
  if (root == null) return false;

  let queNode = [], queVal = [];

  queNode.push(root);
  queVal.push(root.val);

  while(queNode.length > 0) {
    let now = queNode.shift();
    let temp = queVal.shift();

    if (now.left == null && now.right == null) {
      if (temp == targetSum) {
        return true;
      }
      // continue;
    }
    if (now.left != null) {
      queNode.push(now.left);
      queVal.push(now.left.val + temp);
    }
    if (now.right != null) {
      queNode.push(now.right);
      queVal.push(now.right.val + temp);
    }
  }
  return false;
};

// 第二种方法 递归

// 若当前节点就是叶子节点，那么我们直接判断 sum 是否等于 val 即可（因为路径和已经确定，就是当前节点的值，我们只需要判断该路径和是否满足条件）。
// 若当前节点不是叶子节点，我们只需要递归地询问它的子节点是否能满足条件即可

var hasPathSumRecuration = function(root, targetSum) {
  if (root == null) return false;
  if (root.left == null && root.right == null) return targetSum == root.val;
  return hasPathSumRecuration(root.left, targetSum - root.val) || hasPathSumRecuration(root.right, targetSum - root.val);
}