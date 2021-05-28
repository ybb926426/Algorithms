const SIZE = 256;
/**
 * 坏字符
 * @param {*} char  是模式串
 * @param {*} m  模式串的长度
 * @param {*} bc  散列表
 */
function generateBC(char, m, bc) {
  for(let i = 0; i < SIZE; ++i) {
    bc[i] = -1; // 初始化bc
  }
  for(let i = 0; i < m; ++i) {
    let ascii = char[i]; // 计算b[i]的ASCII值
    bc[ascii] = i;
  }
}

function bm(char, n, b, m) {
  let bc = Array(SIZE).fill('');// 记录模式串中每个字符最后出现的位置
  generateBC(b, m, bc);
  let suffix = Array(m).fill(-1);
  let prefix = Array(m).fill(false);
  generateGS(b, m, suffix, prefix);
  let i = 0;
  while(i < n - m) {
    let j;
    for (j = m - 1; j >= 0; --j) {
      if (a[i+j] != b[j]) break;
    }
    if (j < 0) {
      return i;
    }
    let x = j - bc[a[i+j]], y = 0;
    if (j < m-1) {
      y = moveByGS(j, m, suffix, prefix);
    }
    i = i + Math.max(x, y);
  }
  return -1;
}

function generateGS(b, m, suffix, prefix) {
  for(let i = 0; i < m; ++i) {
    suffix[i] = -1;
    prefix[i] = false;
  }
  for (let i = 0; i < m - 1; ++i) {
    let j = i, k = 0;
    while(j >= 0 && b[j] == b[m-1-k]) {
      --j;
      ++k;
      suffix[k] = j + 1;
    }
    if (j == -1) prefix[k] = true;
  }
}

function moveByGS(j, m, suffix, prefix) {
  let k = m - 1- j;
  if (suffix[k] != -1) return j - suffix[k] + 1;
  for (let r = j + 2; r <= m - 1; ++r) {
    if (prefix[m - r] == true) {
      return r;
    }
  }
  return m;
}