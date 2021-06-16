const threeSum = function(nums) {
  const result = [];

  // 对原数组排序
  nums.sort((a, b) => a - b);

  for(let i = 0, n = nums - 2; i < n; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1, right = nums.length - 1;

    while(left < right) {
      let s = nums[i] + nums[left] + nums[right];
      if (s < 0) {
        left++;
      } else if (s > 0) {
        right++;
      } else {
        result.push(nums[i], nums[left], nums[right]);
        while(left < right && nums[left] === nums[left + 1]) {
          left++;
        }
        while(left < right && nums[right] === nums[right - 1]) {
          right--;
        }
        left++;
        right--;
      }
    }
  }

  return result;
}

// 快速排序
const quickSort = (nums) => {
  const length = nums.length;

  if (length <= 1) return nums;
   
  let middle = Math.floor(length / 2)
  let left = [], right = [], pivot = nums.splice(middle, 1)[0];
  console.log(pivot);

  for(let i = 0; i < nums.length; i++) {
    if (pivot > nums[i]) {
      left.push(nums[i]);
    } else {
      right.push(nums[i]);
    }
  }

  return quickSort(left).concat([pivot], quickSort(right))
}