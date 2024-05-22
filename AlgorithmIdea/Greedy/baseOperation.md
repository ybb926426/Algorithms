# 贪心算法

## 买卖股票类问题

- [买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii)
- [买卖股票的最佳时机含手续费](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock)

## 货币选择问题

- [零钱兑换](https://leetcode.cn/problems/coin-change/description/)
- [零钱兑换 II](https://leetcode.cn/problems/coin-change-2)

贪心算法与动态规划的不同在于它对每个子问题的解决方案都作出选择，不能回退，动态规划则会保存以前的运算结果，并根据以前的结果对当前进行选择，有回退功能，而回溯算法就是大量的重复计算来获得最优解

## 分发饼干

假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。对每个孩子 i ，都有一个胃口值 gi ，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j ，都有一个尺寸 sj 。如果 sj >= gi ，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值

注意：

你可以假设胃口值为正。 一个小朋友最多只能拥有一块饼干。

示例1：

```yaml
输入: [1,2,3], [1,1]

输出: 1

解释: 
你有三个孩子和两块小饼干，3个孩子的胃口值分别是：1,2,3。
虽然你有两块小饼干，由于他们的尺寸都是1，你只能让胃口值是1的孩子满足。
所以你应该输出1。
```

示例2：

```yaml
输入: [1,2], [1,2,3]

输出: 2

解释: 
你有两个孩子和三块小饼干，2个孩子的胃口值分别是1,2。
你拥有的饼干数量和尺寸都足以让所有孩子满足。
所以你应该输出2.
```

思路：

- 优先使用最小的饼干满足最小的胃口
- 孩子胃口，饼干大小从小到大排序
- 优先满足胃口小的孩子，满足后换一个胃口大的
- 使用糖果进行尝试，满足后换下一个大饼干

```js
function findContentChildren(g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let num = 0;
  let cookie = 0;
  let child = 0;

  while (cookie < s.length && child < g.length) {
    if (s[cookie] >= g[child]) {
      num++;
      child++;
    }
    cookie++;
  }
  return num;
}
```
