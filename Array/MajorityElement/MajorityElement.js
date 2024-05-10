const majorityElement = (nums) => {
  const map = {};
  nums.forEach(value => {
    if (!map[value]) {
      map[value] = 1;
    } else {
      map[value] += 1;
    }
  })

  for(let key in map) {
    if (map[key] > nums.length / 2) {
      return key;
    }
  }
  return null;
}

const majorityElement2 = (nums) => {
  if (!nums || nums.length <= 0) return;
  let count = 0, current = nums[0];
  for(let i = 0; i < nums.length; i++) {
    if (nums[i] === current) {
      count++;
    } else {
      count--;
      if (count === 0) {
        current = nums[i];
        count++;
      }
    }
  }
  return current;
}