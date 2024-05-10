# 二分查找

二分查找算法(Binary Search Algorithm) 是一种在有序数组中查找目标值的高效算法

基本思想是：将数组不断地二分，每次将目标值和数组的中间元素进行比较，根据比较结果决定是左半边还是右半边继续查找，直到找到目标值或确定那个目标值不存在为止

时间复杂度为O(logn)，相比线性查找O(n)效率更高，但是,二分查找算法要求数组必须是有序的,否则无法正确工作

```js
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1; // // 目标值在右半部分,更新左边界
        } else {
            right = mid - 1; // 目标值在左半部分,更新右边界
        }
    }
    return -1; // 未找到目标值,返回 -1
}
```
