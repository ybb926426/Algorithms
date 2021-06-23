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
// 从底至顶（提前阻断）
// 思路是对二叉树做先序遍历，从底至顶返回子树最大高度，若判定某子树不是平衡树则 “剪枝” ，直接向上返回
var isBalanced = function(root) {
  return helper(root) != -1;
};

const helper = (root) => {
  if (root == null) return 0;
  let left = helper(root.left);
  if (left == -1) return -1;
  let right = helper(root.right);
  if (right == -1) return -1;
  return Math.abs(left - right) < 2 ? Math.max(left, right) + 1 : -1;
}

// 从顶至底（暴力法）
const isBalancedViolence = (root) => {
  if (root == null) return true;
  return Math.abs(depth(root.left) - depth(root.right)) <= 1 && isBalancedViolence(root.left) && isBalancedViolence(root.right);
}

const depth = (root) => {
  if (root == null) return 0;
  return Math.max(depth(root.left), depth(root.right)) + 1;
}