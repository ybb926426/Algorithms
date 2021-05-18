
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