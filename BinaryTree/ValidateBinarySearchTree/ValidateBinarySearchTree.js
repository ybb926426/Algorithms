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
 var isValidBST = function(root) {
  let stack = [], inOrder = -Infinity;

  while(root.length || root!= null) {
    
    while(root !== null) {
      stack.push(root);
      root = root.left;
    }

    root = stack.pop();

    if (root.val < inOrder) {
      return false;
    }
    inOrder = root.val;
    root = root.right;
  }
  return true;
};