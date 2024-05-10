// 背包0-1
function bag01 (max, n, items) {
    let maxW = 0;
    const fun01 = (i, cw, items, n, max) => {
        if (i === n || cw === max)
        {
            if (cw > maxW)
            {
                maxW = cw;
            }
            return;
        }
        fun01(i + 1, cw, items, n, max);
        if (cw + items[i] <= max)
        {
            fun01(i + 1, cw + items[i], items, n, max);
        }
    }
    fun01(0, 0, items, n, max);
    return maxW;
}

function findAllDuplicates(nums) {
    const map = new Map();
    for(let i = 0; i < nums.length; i++) {
        let count = map.get(nums[i]);
        count ? count++ : count = 1;
        map.set(nums[i], count);
    }
    const array = [];
    map.forEach((value, key) => {
        if (value > 1) {
            array.push(key)
        }
    })
    return key;
}

function findAllDuplicates1(nums) {
    const array = [];

    for(let i = 0; i < nums.length; i++) {
        const index = Math.abs(nums[i]);
        if (nums[index] < 0) {
            array.push(Math.abs(index));
        } else {
            nums[index] = -nums[index];
        }
    }

    return array;
}

function firstMissingPositive(nums) {

}

function majorityElement(nums) {
    nums.sort((a, b) => b - a);
    return nums[Math.floor(nums.length / 2)];
}

function majorityElement1(nums) {
    let half = nums.length / 2;
    let obj = {}
    for(let i = 0; i < nums.length; i++) {
        let num = nums[i];
        obj[num] = obj[num] ? obj[num] + 1 : 1;
        if (obj[num] > half) {
            return num;
        }
    }
}

function MergeSortedArray(nums1, m, nums2, n) {
    let p1 = 0, p2 = 0;
    const array = new Array(m + n).fill(0);
    let cur;
    while(p1 < m || p2 < n) {
        if (p1 === m) {
            cur = nums2[p2++];
        } else if (p2 === n) {
            cur = nums1[p1++];
        } else if (nums1[p1] < nums2[p2]) {
            cur = nums1[p1++];
        } else {
            cur = nums2[p2++];
        }
        array[p1 + p2 - 1] = cur;
    }
    return array;
}