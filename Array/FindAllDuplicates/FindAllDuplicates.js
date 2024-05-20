var findDuplicates = function(nums) {
  const n = nums.length;
  const ans = [];
  for (let i = 0; i < n; ++i) {
    const x = Math.abs(nums[i]);
    if (nums[x - 1] > 0) {
      nums[x - 1] = -nums[x - 1];
    } else {
      ans.push(x);
    }
  }
  return ans;
}

const findAllDuplicates = (nums) => {
  const map = new Map(), array = [];

  for(let i = 0; i < nums.length; i++) {
    let count = map.get(nums[i]);
    count ? count++ : count = 1;
    map.set(nums[i], count)
  }
  map.forEach((value, key) => {
    console.log(value, key);
    if (value > 1) {
      array.push(key);
    }
  })
  return array;
}