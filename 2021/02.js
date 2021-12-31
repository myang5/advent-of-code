const { readInputFile } = require('./utils/readInputFile');

/**
 * --- Day 2: Dive! ---
 */

const partOne = async () => {
  const instructions = await readInputFile('02').then((result) => result.split('\n'));

  let position = 0;
  let depth = 0;
  instructions.forEach((instruction) => {
    const [direction, amount] = instruction.split(' ');
    switch (direction) {
      case 'forward': {
        position += Number(amount);
        break;
      }
      case 'up': {
        depth -= Number(amount);
        break;
      }
      case 'down': {
        depth += Number(amount);
        break;
      }
      default: {
        break;
      }
    }
  });
  console.log('Product of position and depth:', position * depth);
};

// partOne();

/**
 * --- Part Two ---
 */
const partTwo = async () => {
  const instructions = await readInputFile('02').then((result) => result.split('\n'));

  let aim = 0;
  let position = 0;
  let depth = 0;
  instructions.forEach((instruction) => {
    const [direction, amount] = instruction.split(' ');
    switch (direction) {
      case 'forward': {
        position += Number(amount);
        depth += Number(amount) * aim;
        break;
      }
      case 'up': {
        aim -= Number(amount);
        break;
      }
      case 'down': {
        aim += Number(amount);
        break;
      }
      default: {
        break;
      }
    }
  });
  console.log('Product of position and depth:', position * depth);
};

partTwo();
