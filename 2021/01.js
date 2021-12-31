const fs = require('fs');
const path = require('path');

/**
 * --- Day 1: Sonar Sweep ---
 */

// (async () => {
//   const depths = await fs.promises
//     .readFile(path.resolve(__dirname, './01-input.txt'), 'utf8')
//     .then((result) => result.split('\n').map(Number));

//   let increases = 0;
//   for (let i = 1; i < depths.length; i++) {
//     if (depths[i] > depths[i - 1]) {
//       increases++;
//     }
//   }
//   console.log('Number of increases:', increases);
// })();

/**
 * --- Part Two ---
 */

const sumInRange = (depths, start, end) => {
  let sum = 0;
  for (let i = start; i <= end; i++) {
    sum += depths[i];
  }
  return sum;
};

(async () => {
  const depths = await fs.promises
    .readFile(path.resolve(__dirname, './01-input.txt'), 'utf8')
    .then((result) => result.split('\n').map(Number));

  let increases = 0;
  let windowStart = 0;
  let windowEnd = 2;
  let previousResult = sumInRange(depths, windowStart, windowEnd);
  while (windowEnd < depths.length) {
    const currentResult = sumInRange(depths, windowStart, windowEnd);
    if (currentResult > previousResult) {
      increases++;
    }
    previousResult = currentResult;
    windowStart++;
    windowEnd++;
  }
  console.log('Number of increases:', increases);
})();
