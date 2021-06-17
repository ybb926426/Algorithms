// 原地合并 空间复杂度 O(1)
const MergeSortedArray = (nums1, m, nums2, n) => {
  let i = m - 1, j = n - 1, k = m + n -1;

  while(i >= 0 || j >= 0) {
    if (i < 0) {
      nums1[k--] = nums2[j--];
    } else if (j < 0) {
      nums1[k--] = nums1[i--];
    } else if (nums1[i] < nums2[j]) {
      nums1[k--] = nums2[j--];
    } else {
      nums1[k--] = nums1[i--];
    }
  }
  return nums1;
}
// 空间复杂度 O(n)
const MergeSortedArray2 = (nums1, m, nums2, n) => {
  let len1 = 0, len2 = 0;
  const sorted = new Array(m + n).fill(0);
  let current;

  while(len1 < m || len2 < n) {
    if (len1 === m) {
      current = nums2[len2++];
    } else if (len2 === n) {
      current = nums1[len1++]
    } else if (nums1[len1] < nums2[len2]) {
      current = nums1[len1++];
    } else {
      current = nums2[len2++]
    }
    sorted[p1 + p2 -1] = current;
  }
  for(let i = 0; i != m + n; i++) {
    nums1[i] = sorted[i];
  }
}