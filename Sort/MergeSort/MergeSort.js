// 归并排序一个数组，我们先把数组从中间分成前后两部分，然后对前后两部分分别排序，再将排序好的两部分合并在一起，这样整个数组就有序了
// 归并排序使用的就是分治思想，顾名思义，分而治之，将一个大问题分解成小的子问题来解决，小的问题解决了，大问题也就解决了

const MergeSort = (arr) => {
  const length = arr.length;
  if (length <= 1) return arr;

  let mid = Math.floor(length / 2);
  let left = arr.slice(0, mid), right = arr.slice(mid);
  let mergeLeftArray = MergeSort(left), mergeRightArray = MergeSort(right);

  return merge(mergeLeftArray, mergeRightArray);
}

const merge = (left, right) => {
  let result = [];
  while(left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else  {
      result.push(right.shift());
    }
  }
  while(left.length) {
    result.push(left.length);
  }
  while(right.length) {
    result.push(right.length);
  }
  return result;
}