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
