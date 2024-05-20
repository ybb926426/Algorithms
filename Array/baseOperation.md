# 数组基本操作

## 双指针

- 调整数组顺序使奇数位于偶数前面
- 和为 S 的两个数字
- 和为 S 的连续正整数序列

## N 数之和问题

- 两数之和
- 三数之和
- 四数之和

## 二维数组

- 构建乘积数组
- 顺时针打印矩阵

## 数据统计

- 数组中出现次数超过数组长度一半的数字
- 连续子数组的最大和
- 扑克牌顺子
- 第一个只出现一次的字符

## 其他

- 数组中重复的数据

### 数组中只出现一次的数

一个整型数组里除了两个数字之外,其他的数字都出现了两次。请写程序找出这两个只出现一次的数字

思路

- 对数组中所有数字进行异或运算,得到的结果就是两个只出现一次的数字的异或结果(异或操作的特点: 任何数与 0 异或,结果都是它本身;任何数与自己异或,结果都是 0)
- 找到异或结果中第一个为 1 的位置,记为第 n 位
- 以第 n 位是否为 1,将数组分为两个子数组
- 对两个子数组分别进行异或运算,得到的结果就是两个只出现一次的数字

```js
function findNumbers(nums) {}
```

### 数组中重复的数据

给你一个长度为 n 的整数数组 nums ，其中 nums 的所有整数都在范围 [1, n] 内，且每个整数出现 一次 或 两次 。请你找出所有出现 两次 的整数，并以数组形式返回

你必须设计并实现一个时间复杂度为 O(n) 且仅使用常量额外空间的算法解决此问题。

例如：

nums = [4,3,2,7,8,2,3,1] 输出 [2, 3]
nums = [1,1,2] 输出 [1]

```js
// 对于长度为 nnn 的数组，使用哈希表的时间复杂度是 O(n)，符合题目要求，但是空间复杂度是 O(n)，不符合题目要求的常数空间
// 为了将空间复杂度降低到常数，不能额外创建哈希表，只能原地修改数组
// 思路与算法
//
function findDuplicates(nums) {
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    const index = Math.abs(nums[i]) - 1;
    if (nums[index] < 0) {
      res.push(index + 1);
    } else {
      nums[index] = -nums[index];
    }
  }
  return res;
}
```

### 调整数组顺序使奇数位于偶数前面

给定一个整数数组，将数组元素进行调整，使得所有奇数元素都位于数组的前半部分，所有偶数元素都位于数组的后半部分。

<!-- - 调整后,奇数和奇数、偶数和偶数之间的相对位置应当保持不变 -->

- 函数应当返回调整后的数组
- 函数不能使用额外的空间,必须在原地修改输入数组

解决方案：使用双指针方法解决

- 定义两个指针 left 和 right，分别指向数组的开头和结尾
- 从左到右遍历数组，当遇到偶数数组时，将其移动到数组的末尾
- 移动偶数元素的过程中,使用 right 指针指向数组末尾的位置,将偶数元素与 right 指针指向的元素进行交换
- 交换后,right 指针向左移动一位,表示数组末尾的偶数元素已经就位
- 重复步骤 2-4,直到 left 指针和 right 指针相遇

```js
// [1, 2, 3, 4]
function reorderArray(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    // 找到左侧的偶数元素
    while (nums[left] % 2 !== 0) {
      left++;
    }
    // 找到右侧的奇数元素
    while (nums[right] % 2 === 0) {
      right--;
    }
    console.log(left, right);
    // 交换左侧的偶数元素和右侧的奇数元素
    if (left < right) {
      // let temp = nums[left];
      // nums[left] = nums[right];
      // nums[right] = temp;
      [nums[left], nums[right]] = [nums[right], nums[left]];
    }
  }

  return nums;
}
```

### 和为 S 的两个数字

输入一个递增排序的数组和一个数字 S，在数组中查找两个数，使得他们的和正好是 S，如果有多对数字的和等于 S，输出两个数的乘积最小的

思路：

- 定义两个指针，一个指向数组起使位置(left)，一个指向数组末尾位置(right)
- 计算两个指针指向的数字的和（Sum）
- 如果 sum 等于目标值 S,则找到了一对符合条件的数字,记录下这对数字
- 如果 sum 小于目标值 S,则将左指针右移一位,继续查找
- 如果 sum 大于目标值 S,则将右指针左移一位,继续查找
- 重复上述过程,直到两个指针相遇
- 如果找到多对符合条件的数字,则返回乘积最小的那一对

```js
function findNumbersWithSum(array, sum) {
  if (!array || array.length < 2) {
    return [];
  }
  let left = 0;
  let right = array.length - 1;
  let result = [];
  let minProduct = Number.MAX_SAFE_INTEGER;
  while (left < right) {
    let currentSum = array[left] + array[right];
    if (currentSum === sum) {
      let product = array[left] * array[right];
      if (product < minProduct) {
        minProduct = product;
        result = [array[left], array[right]];
      }
      left++;
      right--;
    } else if (currentSum < sum) {
      left++;
    } else {
      right--;
    }
  }
}
```

### 三数之和

给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组
答案中不可以包含重复的三元组

例如：

```yaml
给定数组 nums = [-1, 0, 1, 2, -1, -4]

满足要求的三元组集合为：
[
[-1, 0, 1],
[-1, -1, 2]
]
```

思路

- 为了方便去重，我们首先将数组排序
- 对数组进行遍历，取当前遍历的数 [nums[i]] 为一个基准数，遍历数后面的数组为寻找数组
- 在寻找数组中设定两个起点，最左侧的 left(i+1)和最右侧的 right(length-1)
- 判断 nums[i] + nums[left] + nums[right]是否等于 0，如果等于 0，加入结果，并分别将 left 和 right 移动一位
- 如果结果大于 0，将 right 向左移动一位，向结果逼近
- 如果结果小于 0，将 left 向右移动一位，向结果逼近

```js
function threeSum(nums) {
  const result = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (nums[left] === nums[left + 1]) {
          left++;
        }
        left++;
        while (nums[right] === nums[right - 1]) {
          right--;
        }
        right--;
      } else if (sum > 0) {
        right--;
      } else {
        left++;
      }
    }
  }
  return result;
}
```

### 两数之和

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素

示例：

给定 nums = [2, 7, 11, 15], target = 9

```js
var twoSum = function (nums, target) {
  const map = {};
  if (Array.isArray(nums)) {
    for (let i = 0; i < nums.length; i++) {
      if (map[target - nums[i]] != undefined) {
        return [map[target - nums[i]], i];
      } else {
        map[nums[i]] = i;
      }
    }
  }
  return [];
};
```

### 扑克牌顺子

扑克牌中随机抽 5 张牌，判断是不是一个顺子，即这 5 张牌是不是连续的
2-10 为数字本身，A 为 1，J 为 11...大小王可以看成任何数字，可以把它当作 0 处理

思路

- 数组排序
- 遍历数组
- 若为 0，记录 0 的个数加 1
- 若不为 0，记录和下一个元素的间隔
- 最后比较 0 的个数和间隔数，间隔数>0 的个数则不能构成顺子
- 注意中间如果有两个元素相等则不能构成顺子

```js
function IsContinuous(numbers) {
  if (numbers && numbers.length > 0) {
    numbers.sort((a, b) => a - b);
    let kingNum = 0;
    let spaceNum = 0;
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] === 0) {
        kingNum++;
      } else {
        const space = numbers[i + 1] - numbers[i];
        if (space === 0) {
          return false;
        } else {
          space += space - 1;
        }
      }
    }
    return kingNum - spaceNum >= 0;
  }
  return false;
}
```

### 最长连续序列

最长连续序列问题是指在一个未排序的整数数组中,找出最长的连续元素序列(至少包含两个数)的长度

例如,给定数组[100, 4, 200, 1, 3, 2],最长的连续元素序列是[1, 2, 3, 4]。它的长度为 4

思路

- 将数组转换为哈希表或集合,以便在常数时间内判断元素是否存在
- 遍历数组中的每个元素
  - 如果当前元素的前一个数不在哈希表中,说明当前元素可能是连续序列的起点
  - 从当前元素开始,不断检查下一个连续的数是否在哈希表中,统计连续序列的长度
  - 更新最长连续序列的长度
- 返回最长连续序列的长度

复杂度

时间复杂度为 O(n),其中 n 是数组的长度。因为我们只需要遍历数组一次,对于每个元素,检查它的连续序列的操作是常数时间的
空间复杂度为 O(n)

```js
function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let longestStreak = 0;

  for (const num of numSet) {
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentStreak++;
      }

      longestStreak = Math.max(longestStreak, currentStreak);
    }
  }

  return longestStreak;
}
```

### 数组/数组中出现次数超过数组长度一半的数字

在一个长度为n的数组中,有一个数字出现的次数超过了数组长度的一半。请找出这个数字

示例：

输入: [1, 2, 3, 2, 2, 2, 5, 4, 2] 输出: 2

方法一:哈希表统计法

```js
function majorityElement (nums) {
  const countMap = new Map();
  const majority = Math.floor(nums.length / 2);

  for (const num of nums) {
    countMap.set(num, (countMap.get(num) || 0) + 1);
    if (countMap.get(num) > majority) {
      return num;
    }
  }
}
// 时间复杂度:O(n),其中n是数组的长度。 空间复杂度:O(n),使用了哈希表来存储数字出现的次数
```

方法二:Boyer-Moore投票算法

- 初始化候选数candidate为数组的第一个元素,计数器count为1
- 遍历数组,对于每个元素:
  - 如果计数器为0,将当前元素设为候选数,计数器设为1
  - 如果当前元素与候选数相同,计数器加1。
  - 如果当前元素与候选数不同,计数器减1。
- 由于出现次数超过数组长度一半的数字一定存在,因此遍历结束后的候选数就是目标数字

```js
// Boyer-Moore投票算法的思想是:将数组中的数字两两抵消,最后剩下的数字就是出现次数超过数组长度一半的数字
function majorityElement (nums) {
  let candidate = nums[0];
  let count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (count === 0) { // 如果计数器为0,将当前元素设为候选数,计数器设为1
      candidate = nums[i];
      count = 1;
    } else if (nums[i] === candidate) { // 如果当前元素与候选数相同,计数器加1
      count++;
    } else { // 如果当前元素与候选数不同,计数器减1
      count--;
    }
  }
}
// 时间复杂度:O(n),其中n是数组的长度。 空间复杂度:O(1),只使用了常数级别的额外空间
```

### 四数之和

给定一个包含 n 个整数的数组 nums 和一个目标值 target,判断 nums 中是否存在四个元素 a,b,c 和 d,使得 a + b + c + d 的值与 target 相等?找出所有满足条件且不重复的四元组

示例: 输入: nums = [1, 0, -1, 0, -2, 2], target = 0 输出: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]

解题思路: 四数之和可以通过将问题转化为三数之和,再应用双指针的方法来解决。具体步骤如下

- 对数组进行排序,方便后续的双指针操作
- 使用四重循环,固定前两个数字 a 和 b,将问题转化为在子数组中寻找两个数 c 和 d,使得 a + b + c + d = target
- 对于固定的 a 和 b,使用双指针在子数组中寻找 c 和 d
  - 初始化左指针 left 指向 b 的下一个位置,右指针 right 指向数组的末尾
  - 计算当前四数之和 sum = a + b + nums[left] + nums[right]
  - 如果 sum 等于 target,将当前四元组加入结果集,并移动左右指针以避免重复
  - 如果 sum 小于 target,移动左指针使 sum 增大
  - 如果 sum 大于 target,移动右指针使 sum 减小
- 在循环过程中,注意跳过重复的数字以避免产生重复的四元组

```js
function fourSum (nums, target) {
  const result = [];
  const len = nums.length;

  if (len < 4) {
    return result;
  }

  nums.sort((a, b) => a - b);

  for (let i = 0; i < len - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    for (let j = i + 1; j < len - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) {
        continue;
      }

      let left = j + 1;
      let right = len - 1;

      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];

        if (sum === target) {
          result.push([nums[i], nums[j], nums[left], nums[right]]);
          left++;
          right--;
          while (left < right && nums[left] === nums[left - 1]) {
            left++;
          }
          while (left < right && nums[right] === nums[right + 1]) {
            right--;
          }
        } else if (sum < target) {
          left++;
        } else {
          right--;
        }
      }
    }
  }
}
```

### 在排序数组中查找数字

- 线性查找
- 二分查找
- 二分查找变体

```js
// [1, 2, 3, 4, 5]
function search (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
```
