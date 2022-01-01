const { readInputFile } = require('./utils/readInputFile');

/**
 * --- Day 3: Binary Diagnostic ---
 */

const partOne = async () => {
  const readings = await readInputFile('03').then((result) => result.split('\n'));

  const gammaBits = [];
  const epsilonBits = [];
  for (let positionIndex = 0; positionIndex < readings[0].length; positionIndex++) {
    const count = {};
    for (let readingIndex = 0; readingIndex < readings.length; readingIndex++) {
      const bit = readings[readingIndex][positionIndex];
      if (!count[bit]) {
        count[bit] = 0;
      }
      count[bit]++;
    }
    const mostCommonBit = Object.keys(count).reduce((a, b) => (count[a] > count[b] ? a : b));
    gammaBits.push(mostCommonBit);
    epsilonBits.push(mostCommonBit === '0' ? '1' : '0');
  }

  const gammaReading = parseInt(gammaBits.join(''), 2);
  const epsilonReading = parseInt(epsilonBits.join(''), 2);

  console.log('Power consumption:', gammaReading * epsilonReading);
};

// partOne();

/**
 * --- Part Two ---
 */

const getRelevantReading = (readings, getBitToKeep) => {
  let potentialReadings = [...readings];
  let readingLength = potentialReadings[0].length;
  for (let positionIndex = 0; positionIndex < readingLength; positionIndex++) {
    const count = {};
    if (potentialReadings.length === 1) {
      return potentialReadings;
    }
    for (let readingIndex = 0; readingIndex < potentialReadings.length; readingIndex++) {
      const bit = potentialReadings[readingIndex][positionIndex];
      if (!count[bit]) {
        count[bit] = 0;
      }
      count[bit]++;
    }
    const bitToKeep = getBitToKeep(count);
    potentialReadings = potentialReadings.filter((reading) => reading[positionIndex] === bitToKeep);
  }

  return potentialReadings;
};

const partTwo = async () => {
  const readings = await readInputFile('03').then((result) => result.split('\n'));

  const oxygenReadings = getRelevantReading(readings, (count) =>
    Object.keys(count).reduce((a, b) => {
      if (count[a] === count[b]) {
        return '1';
      }
      return count[a] > count[b] ? a : b;
    }),
  );
  const cO2Readings = getRelevantReading(readings, (count) =>
    Object.keys(count).reduce((a, b) => {
      if (count[a] === count[b]) {
        return '0';
      }
      return count[a] < count[b] ? a : b;
    }),
  );

  const oxygenReading = parseInt(oxygenReadings[0], 2);
  const cO2Reading = parseInt(cO2Readings[0], 2);

  console.log('Life support rating:', oxygenReading * cO2Reading);
};

partTwo();
