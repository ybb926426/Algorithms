# 动态规划

动态规划算法通过将原问题分解为相对简单的子问题的方式来求解复杂问题，动态规划常常适用于有重叠子问题和最优子结构性质的问题，它可以避免重复计算，从而提高了算法的效率。

动态规划比较适合用来求解罪有问题，比如求最大值，最小值等；它可以非常显著地降低时间复杂度，提高代码的执行效率；

## 基本思想

- 将原问题分解为若干子问题，子问题之间可能存在重叠
- 定义状态和状态转移方程，状态表示问题的局部解,状态转移方程描述了状态之间的关系
- 按照一定的顺序计算状态值,通常使用递推或者迭代的方式
- 最终根据状态值得到原问题的解

## 特点

- 将原问题分解为子问题，子问题之间可能存在重叠
- 使用额外的数据结构(通常是数组或哈希表)，来保存子问题的解，避免重复计算
- 按照一定顺序（通常是自底向上或者自顶向下）计算状态值
- 时间复杂度通常是多项式级别，空间复杂度取决于状态数量

## 前提条件

- 最优子结构(Optimal Substructure)
- 重叠子问题(Overlapping Subproblems)
- 无后效性(No Aftereffect)
  - 子问题的解一旦确定,就不再改变,不受在这之后、包含它的更大的问题的求解决策影响
  - 例如,在最长公共子序列问题中,一旦确定了text1[0:i]和text2[0:j]的最长公共子序列,它就不会受到之后的决策影响
- 子问题独立(Independence of Subproblems)
- 状态转移方程(State Transition Equation)

## 应用

- 斐波那契数列
- 最长子公共序列
- 最长递增子序列
- 0-1 背包问题
- 矩阵链乘法
- 最短路径问题
- 编辑距离

## 举例

使用动态规划求解斐波那契数列

```js
function fib(n) {
    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}
```

最长子公共序列

```js
// 给定两个字符串text1和text2,返回这两个字符串的最长公共子序列的长度。如果不存在公共子序列,返回0
// 例如,"ace"是"abcde"的子序列,但"aec"不是"abcde"的子序列。 两个字符串的公共子序列是这两个字符串所共同拥有的子序列
// 输入:text1 = "abcde",text2 = "ace" 输出:3 解释:最长公共子序列是"ace",它的长度为3

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;

    // 定义二维数组dp，dp[i][j]表示text1[0:i]和text2[0:j]的最长公共子序列的长度
    const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0))

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                // 如果当前字符相等,则在前一个状态的基础上加1
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                // 如果当前字符不相等,则取前一个状态的最大值
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
}
```

一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 10 级的台阶总共有多少种跳法

```js
const mapCache = new Map();
function numWays(n) {
    if (n === 0) {
        return 0;
    }
    if (n <= 2) {
        return n;
    }

    if (mapCache.has(n)) {
        return mapCache.get(n);
    } else {
        mapCache.set(n, numWays(n - 1) + numWays(n - 2));
        return mapCache.get(n);
    }
}
```
