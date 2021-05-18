// 冒泡排序是原地排序算法
// 冒泡排序是稳定的排序算法
// 时间复杂度 O(n2)
const BubbleSort = (arr) => {
  let length = arr.length;
  if (length <= 1) return;
  for(let i = 0; i < length; i++) {
    // 提前退出冒泡循环的标志位
    let flag = false;
    for(let j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        flag = true;
      }
    }
    if (!flag) break;
  }
}
