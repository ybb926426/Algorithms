// 二叉搜索树的范围和

// 方法一：深度优先搜索
var rangeSumBST = function(root, low, high) {
  if (!root) {
    return 0;
  }
  if (root.val > high) {
    return rangeSumBST(root.left, low, high);
  }
  if (root.val < low) {
    return rangeSumBST(root.right, low, high);
  }
  return root.val + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high);
}
// 方法二：广度优先搜索（层序遍历）
var rangeSumBST2 = function(root, low, high) {
  let sum = 0;
  const queue = [root];

  while(queue.length) {
    const node = queue.shift();
    if (!node) {
      continue
    }
    if (node.val > high) {
      queue.push(node.left);
    } else if (node.val < low) {
      queue.push(node.right);
    } else {
      sum += node.val;
      queue.push(node.left);
      queue.push(node.right);
    }
  }

  return sum;
}