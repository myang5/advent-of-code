const { readInputFile } = require('./utils/readInputFile');

/**
 * --- Day 5: Hydrothermal Venture ---
 */

const getLines = () => {
  return readInputFile('05').then((result) =>
    result
      .split('\n')
      .map((line) => line.split(' -> ').map((coordinates) => coordinates.split(',').map(Number))),
  );
};

const getCoordinatesInLine = (limits, getCoordinateString) => {
  const coordinates = [];
  const lowerLimit = Math.min(...limits);
  const upperLimit = Math.max(...limits);
  for (let i = 0; i <= upperLimit - lowerLimit; i++) {
    coordinates.push(getCoordinateString(lowerLimit + i));
  }
  return coordinates;
};

const isHorizontalLine = (line) => {
  const [[x1, y1], [x2, y2]] = line;
  return x1 === x2;
};
const getCoordinatesInHorizontalLine = (line) => {
  const [[x1, y1], [x2, y2]] = line;
  return getCoordinatesInLine([y1, y2], (diff) => `${x1},${diff}`);
};
const isVerticalLine = (line) => {
  const [[x1, y1], [x2, y2]] = line;
  return y1 === y2;
};
const getCoordinatesInVerticalLine = (line) => {
  const [[x1, y1], [x2, y2]] = line;
  return getCoordinatesInLine([x1, x2], (diff) => `${diff},${y1}`);
};

const getQualifyingPoints = (overlaps) =>
  Object.keys(overlaps).filter((key) => overlaps[key] > 1).length;

const partOne = async () => {
  const lines = await getLines();

  const coordinateOverlaps = {};

  lines.forEach((line) => {
    let coordinates;
    if (isHorizontalLine(line)) {
      coordinates = getCoordinatesInHorizontalLine(line);
    } else if (isVerticalLine(line)) {
      coordinates = getCoordinatesInVerticalLine(line);
    }

    if (coordinates) {
      coordinates.forEach((coordinate) => {
        if (!coordinateOverlaps[coordinate]) {
          coordinateOverlaps[coordinate] = 0;
        }
        coordinateOverlaps[coordinate]++;
      });
    }
  });

  const qualifyingPoints = getQualifyingPoints(coordinateOverlaps);
  console.log('Number of points with at least 2 lines overlapping', qualifyingPoints);
  return qualifyingPoints;
};

partOne();

/**
 * --- Part Two ---
 */

const partTwo = async () => {
  const lines = await getLines();

  const coordinateOverlaps = {};

  let coordinates;
  lines.forEach((line) => {
    const [[x1, y1], [x2, y2]] = line;
    if (isHorizontalLine(line)) {
      coordinates = getCoordinatesInHorizontalLine(line);
    } else if (isVerticalLine(line)) {
      coordinates = getCoordinatesInVerticalLine(line);
    } else {
      coordinates = [];
      const slope = (x1 - x2) / (y1 - y2);
      const startX = x1 < x2 ? x1 : x2;
      const startY = x1 < x2 ? y1 : y2;
      let numberOfPoints = Math.abs(x1 - x2);
      while (numberOfPoints >= 0) {
        coordinates.push(`${startX + numberOfPoints},${startY + numberOfPoints * slope}`);
        numberOfPoints--;
      }
    }
    coordinates.forEach((coordinate) => {
      if (!coordinateOverlaps[coordinate]) {
        coordinateOverlaps[coordinate] = 0;
      }
      coordinateOverlaps[coordinate]++;
    });
  });

  const qualifyingPoints = getQualifyingPoints(coordinateOverlaps);
  console.log('Number of points with at least 2 lines overlapping', qualifyingPoints);
};

partTwo();
