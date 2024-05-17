/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
// 方法一：深度优先搜索
var isSameTree = function(p, q) {
  if (p == null && q == null) return true;
  if (p == null || q == null) return false;
  if (p.val != q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
// 方法一：广度优先搜索
// 在BFS的实现中,我们使用两个队列分别存储两棵树的节点。我们同时遍历两个队列,比较对应节点的值是否相等,以及它们的左右子节点是否同时存在。如果在遍历过程中发现任何不匹配的情况,就返回false。如果遍历结束后两个队列都为空,则说明两棵树完全相同,返回true
var isSameTreeBreadth = function(p, q) {
  if (p == null && q == null) return true;
  if (p == null || q == null) return false;

  const queue1 = [p];
  const queue2 = [q];
  while (queue1.length && queue2.length) {
    const node1 = queue1.shift();
    const node2 = queue2.shift();
    if (node1.val !== node2.val) return false;

    if (node1.left !== null && node2.left !== null) {
      queue1.push(node1.left);
      queue2.push(node2.left);
    } else if (node1.left !== node2.left) {
      return false;
    }

    if (node1.right !== null && node2.right !== null) {
      queue1.push(node1.right);
      queue2.push(node2.right);
    } else if (node1.right !== node2.right) {
      return false;
    }
  }
  return queue1.length === 0 && queue2.length === 0;
}