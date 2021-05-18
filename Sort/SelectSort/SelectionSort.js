// 选择排序和插入排序实现思路类似，分为已排序和未排序区间
// 但是选择排序每次会从未排序区间找到最小元素，将其放到已排序区间的末尾

// 选择排序不是稳定排序算法，主要是因为每次都要找到剩余未排序中的最小值，并和前面的元素交换位置，破坏了稳定性

const SelectionSort = (arr) => {
  let length = arr.length, temp = 0;
  if (length <= 1) return;

  for(let i = 0; i < length; i++) {
    temp = i;
    for(let j = i + 1; j < length; j++) {
      if (arr[j] < arr[temp]) {
        temp = j;
      }
    }
    if (temp !== i) {
      [arr[i], arr[temp]] = [arr[temp], arr[i]]
    }
  }
}