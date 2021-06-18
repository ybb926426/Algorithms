const findAllDuplicates1 = (nums) => {
  const res = [];

  for(let i = 0; i < nums.length; i++) {
    const index = Math.abs(nums[i]) - 1;
    if (nums[index] < 0) {
      res.push(Math.abs(index) + 1);
    } else {
      nums[index] = -nums[index];
    }
  }

  return res;
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