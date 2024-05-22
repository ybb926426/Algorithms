# 基本操作

## 表示数值的字符串

请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。 例如，字符串"+100","5e2","-123","3.1416"和"-1E-16"都表示数值。 但是"12e","1a3.14","1.2.3","+-5"和"12e+4.3"都不是

思路

- 只能出现数字、符号位、小数点、指数位
- 小数点、指数位符号只能出现一次、且不能出现在开头结尾
- 指数位出现后，小数点不允许在出现
- 符号位只能出现在开头和指数位后面

```js
function isNumeric(s) {
  if(!s) {
    return false;
  }
  let hasPoint = false;
  let hasExp = false;

  for (let i = 0; i < s.length; i++) {
    const target = s[i];
    if (target >= 0 && target <= 9) {
      continue;
    } else if (target === 'e' || target === 'E') {
      if (hasExp || i === 0 || i === s.length - 1) {
        return false;
      } else {
        hasExp = true;
        continue;
      }
    } else if (target === '.') {
      if (hasPoint || i === 0 || i === s.length - 1) {
        return false;
      } else {
        hasPoint = true;
        continue;
      }
    } else if (target === '+' || target === '-') {
      if (i === 0 || s[i - 1] === 'e' || s[i - 1] === 'E') {
        continue;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}
```

## 替换空格

请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy。则经过替换之后的字符串为We%20Are%20Happy

```js
function replaceSpace(str) {
  return str.split(' ').join('%20');
}
function replaceSpace2(str) {
  return str.replace(/\s/g, '%20');
}
// 允许出现多个空格，多个空格用一个20%替换：
function replaceSpace2(str) {
  return str.replace(/\s+/g, '%20');
}
```

## 正则表达式匹配

## 字符串的排列

输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba

思路

- 使用回溯法
- 记录一个字符(temp)，用于存储当前需要进入排列的字符
- 记录一个字符串(current)，用于记录当前已经排列好的字符串
- 记录一个队列，用于存储还未被排列的字符串

## 字符串翻转

输入一个英文句子，翻转句子中单词的顺序，但单词内字符的顺序不变。为简单起见，标点符号和普通字母一样处理。例如输入字符串"I am a student."，则输出"student. a am I"。

```js
function reverse(str) {
  if (!str) {
    return '';
  }
  return str.split(' ').reverse().join(' ')
}
```

## 左旋转字符串

字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如输入字符串"abcdefg"和数字2，该函数将返回左旋转2位得到的结果"cdefgab"

```js
function LeftRotateString(str, n) {
  if (!str) {
    return '';
  } else {
    return (str + str).substr(n, str.length);
  }
}
```

## 字符流中第一个不重复的字符

```js
function firstUniqChar(str) {
  
}
```

## 括号生成

数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合

回溯的过程

- 如果当前已经放置的左括号数量小于n，我们可以选择放置一个左括号
- 递归地调用backtrace函数，将open + 1，将close保持不变，并在当前括号组合字符串的末尾添加一个左括号
- 如果当前已经放置的右括号数量小于已经放置的左括号数量，我们可以选择放置一个右括号，我们递归调用backtrack函数,将open的值保持不变,close的值加1,并在当前括号组合字符串current的末尾添加一个右括号')'

```js
// 回溯
function generateParenthesis (n) {
  const result = [];

  function backtrace(open, close, current) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }

    if (open < n) {
      backtrace(open + 1, close, current + '(')
    }
    if (close < open) {
      backtrace(open, close + 1, current + ')')
    }
  }

  backtrace(0, 0, '');
  return result;
}
```

## 最长公共前缀

编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，返回空字符串 ""。

例子1: 输入: strs = ["flower", "flow", "flight"] 输出: "fl" 解释: 这三个字符串的最长公共前缀是"fl"
例子2: 输入: strs = ["dog", "racecar", "car"] 输出: "" 解释: 这三个字符串没有公共前缀,因此返回空字符串""

```js
function longestCommonPrefix(strs) {
  if (!strs || !strs.length) {
    return '';
  }

  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
      if (prefix === '') {
        return '';
      }
    }
  }
  return prefix;
}
```

## 最长回文子串

指在一个给定的字符串中找到最长的回文子串。回文是指一个字符串正序和倒序读取都是一样的,例如"level"、"noon"等

例如,对于字符串"babad",最长的回文子串是"bab",对于字符串"cbbd",最长的回文子串是"bb"

```js
function longestPalindrome (s) {
  if (s.length < 2) {
    return s;
  }

  let start = 0;
  let maxLength = 1;

  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const currentLength = right - left + 1;
      if (currentLength > maxLength) {
        start = left;
        maxLength = currentLength;
      }
      left--;
      right++;
    }
  }
  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i); // 处理奇数长度的回文
    expandAroundCenter(i, i + 1); // 处理偶数长度的回文
  }
  return s.substring(start, start + maxLength);
}
```

## 有符号整数反转
