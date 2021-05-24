// 快速排序也是利用分治思想
// 思想是 如果要排序数组中下标p到r之间的一组数据，我们选择p到r之间的任意一个数据作为 pivot（分区点）

const QuickSort = (arr) => {
  const length = arr.length;
  // 递归出口就是数组长度为1
  if (arr.length <= 1) return arr;
  //获取中间值的索引，使用Math.floor向下取整；
  let index = Math.floor(length / 2);
  // 使用splice截取中间值，第一个参数为截取的索引，第二个参数为截取的长度；
  // 如果此处使用 pivot=arr[index]; 那么将会出现无限递归的错误；
  // splice影响原数组
  let pivot = arr.splice(index, 1)[0], left = [], right = [];

  for(let i = 0; i < arr.length; i++) {
    if (pivot > arr[i]) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return QuickSort(left).concat([pivot], QuickSort(right));
}