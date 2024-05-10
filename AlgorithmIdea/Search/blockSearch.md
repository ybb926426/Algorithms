# 分块查找

分块查找也被称为索引顺序查找，是一种用于在大型数据集中快速查找目标值的算法，结合了顺序查找和二分查找的思想，将数据集分成多个块来提高查找效率

## 思想

- 将大型数据集分成多个块,每个块包含一定数量的元素
- 对每个块建立一个索引表,记录每个块中的最大值或最小值
- 使用二分查找在索引表中查找目标值所在的块
- 在找到的块中使用顺序查找来查找目标值

## 复杂度

分块查找的时间复杂度介于 O(n) 和 O(log n) 之间,其中 n 是数据集的大小。具体的时间复杂度取决于块的大小和数据分布情况。当块的大小合适时,分块查找可以显著提高查找效率

```js
function blockSearch(arr, target, blockSize) {
    const n = arr.length;
    const numBlocks = Math.ceil(n / blockSize);
    const indexTable = [];

    // 建立索引表
    for (let i = 0; i < numBlocks; i++) {
        indexTable.push(arr[i * blockSize]);
    }
    // 使用二分查找确定目标值所在的块
    let blockIndex = binarySearch(indexTable, target);
    if (blockIndex === -1) {
        blockIndex = numBlocks - 1;
    }
    // 在块内使用顺序查找查找目标值
    const startIndex = blockIndex * blockSize;
    const endIndex = Math.min(startIndex + blockSize, n);
    for (let i = startIndex; i < endIndex; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2)

        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return right;
}
```
