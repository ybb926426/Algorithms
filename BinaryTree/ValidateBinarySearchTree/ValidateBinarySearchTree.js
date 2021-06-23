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
//  中序遍历
// 二叉搜索树中序遍历得到的值构成的序列一定是一个升序的
var isValidBST = function(root) {
  let stack = [];
  let inOrder = -Infinity;

  while(stack.length || root != null) {
    while(root != null) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    // 如果中序遍历得到的节点的值小于等于前一个 inorder，说明不是二叉搜索树
    if (root.val <= inOrder) {
      return false;
    }
    inOrder = root.val;
    root = root.right;
  }
};

// 递归算法
// 设计一个递归函数 helper(root, lower, upper) 来递归判断，
// 函数表示考虑以 root 为根的子树，判断子树中所有节点的值是否都在 (l,r)(l,r) 的范围内（注意是开区间）。
// 如果 root 节点的值 val 不在 (l,r)(l,r) 的范围内说明不满足条件直接返回，
// 否则我们要继续递归调用检查它的左右子树是否满足，如果都满足才说明这是一棵二叉搜索树

var isValidBSTRecursion = function(root) {
  return helper(root, -Infinity, Infinity);
}
var helper = function(root, lower, upper) {
  if (root == null) return true;
  if (root.val <= lower || root.val >= upper) {
    return false;
  }
  return helper(root.left, lower, root.val) && helper(root.right, root.val, upper);
}