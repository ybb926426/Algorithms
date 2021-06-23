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
 * @return {number}
 */
// 方法一
const maxDepth = (root) => {
  if (root == null) return 0;

  return Math.max(maxDepth(root.left), maxDepth(root.right))+1;
};

// 方法二 维护一个队列
const maxDepth2 = (root) => {
  if (root == null) return 0;
    let queue = [], result = 0;
    queue.push(root);
    while(queue.length) {
      let temp = []
      for(let i = 0; i < queue.length; i++) {
        if (queue[i].left) {
          temp.push(queue[i].left);
        }
        if (queue[i].right) {
          temp.push(queue[i].right);
        }
      }
      result++;
      queue = temp;
    }
    return result;
}