# 回溯算法

回溯的处理思想，有点类似枚举搜索。我们枚举所有的解，找到满足期望的解。为了有规律的枚举所有可能的解，避免遗漏和重复，我们把问题求解的过程分为多个阶段，每个阶段，我们都会面对一个岔路口，我们先随意选一条路走，当发现这条路走不通的时候，就回退到上一个岔路口，另选一种走法继续走
应用场景
- 深度优先搜索算法
- 正则表达式匹配
- 编译原理中的语法分析

举例
八皇后问题（每个棋子所在的行、列、对角线都不能有另一个棋子）
```javascript
const result = []; //全局或成员变量,下标表示行,值表示queen存储在哪一列
const cal8Queens = (row) => { // 调用方式：cal8queens(0);
  if (row == 8) { // 8个棋子都放置好了，打印结果
    printQueens(result);
    return; // 8行棋子都放好了，已经没法再往下递归了，所以就return
  }
  for (let column = 0; column < 8; ++column) { // 每一行都有8中放法
    if (isOk(row, column)) { // 有些放法不满足要求
      result[row] = column;  // 第row行的棋子放到了column列
      cal8Queens(row + 1); // 考察下一行
    }
  }
}
const isOk = (row, column) => {
  let leftup = column - 1, right = column + 1;
  for(let i = row - 1; i>= 0; --i) { // 逐行往上考察每一行
    if (result[i] == column) return false; // 第i行的column列有棋子吗？
    if (leftup >= 0) { // 考察左上对角线：第i行leftup列有棋子吗？
      if (result[i] == leftup) return false;
    }
    if (rightup < 8) { // 考察右上对角线：第i行rightup列有棋子吗？
      if (result[i] == rightup) return false;
    }
    --leftup; ++rightup
  }
  return true;
}
const printQueues = (result) => {
  for(let row = 0; row < 8; ++row) {
    for (let column = 0; column < 8; ++column) {
      if (result[row] == column) {
        console.log('Q');
      } else {
        console.log('*');
      }
    }
  }
}
```

0-1 背包

我们有一个背包，背包总的承载重量是 Wkg。现在我们有 n 个物品，每个物品的重量不等，并且不可分割。我们现在期望选择几件物品，装载到背包中。在不超过背包所能装载重量的前提下，如何让背包中物品的总重量最大
```javascript
// cw表示当前已经装进去的物品的重量和；i表示考察到哪个物品了；
// w背包重量；items表示每个物品的重量；n表示物品个数
// 假设背包可承受重量100，物品个数10，物品重量存储在数组a中，那可以这样调用函数：
// f(0, 0, a, 10, 100)
const f = (i, cw, items, n, w) => {
  if (cw == w || i == n) { // cw==w表示装满了;i==n表示已经考察完所有的物品
    if (cw > maxW) maxW = cw;
  }
  f(i + 1, cw, items, n, w);
  if (cw + items[i] <= w) { // 已经超过可以背包承受的重量的时候，就不要再装了
    f(i + 1, cw + items[i], items, n, w);
  }
}
```