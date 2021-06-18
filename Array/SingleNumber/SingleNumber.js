// 使用异或 空间复杂度O(1)
const SingleNumber = (nums) => {
  let result = 0;
  nums.forEach(value => {
    result = result ^ value;
  })
  return result;
}

// 利用hash表
const SingleNumberHash = (nums) => {
  const map = new Map();
  for(let i = 0; i < nums.length; i++) {
    let count = map.get(nums[i]);
    !count ? count = 1 : count++;
    map.set(nums[i], count);
  }
  for(let key of map.keys()) {
    console.log(key);
    let count = map.get(key);
    if (count == 1) {
      return key;
    }
  }
  return -1;
}