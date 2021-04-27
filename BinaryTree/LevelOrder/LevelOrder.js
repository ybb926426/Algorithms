// bfs 层序遍历
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

const levelOrder = (root) => {
  if (root == null) { return [] };
  let queue = [root], res = [];

  while(queue.length) {
    const length = queue.length, ans = [], temp = [];
    for(let i = 0; i < length; i++) {
      ans.push(queue[i].val);
      if (queue[i].left) {
        temp.push(queue[i].left)
      }
      if (queue[i].right) {
        temp.push(queue[i].right)
      }
    }
    queue = temp;
    res.push(ans);
  }

  return res;
}