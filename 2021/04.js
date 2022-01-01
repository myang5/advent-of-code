const { readInputFile } = require('./utils/readInputFile');

/**
 * --- Day 4: Giant Squid ---
 */

const getBoardsFromInput = async () => {
  const input = await readInputFile('04');
  const [numbers, ...rawBoards] = input.split('\n\n');
  const bingoNumbers = numbers.split(',');
  const boards = rawBoards.map((boards) =>
    boards.split('\n').map((board) =>
      board
        .split(' ')
        .filter((string) => string.trim().length)
        .map((number) => [number, false]),
    ),
  );
  return [bingoNumbers, boards];
};

const getDoesBoardHaveBingo = (board) => {
  let isHorizontalBingo = false;
  for (const row of board) {
    const isRowBingo = row.every((number) => {
      return number[1];
    });
    if (isRowBingo) {
      isHorizontalBingo = true;
      break;
    }
  }
  if (isHorizontalBingo) {
    console.log('isHorizontalBingo');
    return true;
  }

  let isVerticalBingo = false;
  for (let i = 0; i < board[0].length; i++) {
    const isColumnBingo = board.every((row) => row[i][1]);
    if (isColumnBingo) {
      isVerticalBingo = true;
      break;
    }
  }
  if (isVerticalBingo) {
    console.log('isVerticalBingo');
    return true;
  }

  return false;
};

const getBoardWithBingo = async () => {
  const [bingoNumbers, boards] = await getBoardsFromInput();
  for (const bingoNumber of bingoNumbers) {
    for (const board of boards) {
      for (const row of board) {
        for (const number of row) {
          if (number[0] === bingoNumber) {
            number[1] = true;
          }
        }
      }
      const doesBoardHaveBingo = getDoesBoardHaveBingo(board);
      if (doesBoardHaveBingo) {
        return [board, bingoNumber];
      }
    }
  }
};

const getScore = (board, bingoNumber) => {
  return (
    board.reduce((sum, row) => {
      let currentSum = row.reduce(
        (rowSum, number) => (!number[1] ? rowSum + Number(number[0]) : rowSum),
        0,
      );
      return sum + currentSum;
    }, 0) * Number(bingoNumber)
  );
};

const partOne = async () => {
  const [board, bingoNumber] = await getBoardWithBingo();
  console.log(`Score:`, getScore(board, bingoNumber));
};

// partOne();

/**
 * --- Part Two ---
 */

const getLastBoardWithBingo = async () => {
  const [bingoNumbers, boards] = await getBoardsFromInput();
  let lastBingoNumberCalled;
  let bingoBoard;
  for (const bingoNumber of bingoNumbers) {
    for (let i = boards.length - 1; i > 0; i--) {
      const board = boards[i];
      for (const row of board) {
        for (const number of row) {
          if (number[0] === bingoNumber) {
            number[1] = true;
          }
        }
      }
      const doesBoardHaveBingo = getDoesBoardHaveBingo(board);
      if (doesBoardHaveBingo) {
        lastBingoNumberCalled = bingoNumber;
        bingoBoard = boards.splice(i, 1)[0];
      }
    }
  }
  return [bingoBoard, lastBingoNumberCalled];
};

const partTwo = async () => {
  const [board, bingoNumber] = await getLastBoardWithBingo();
  console.log(`Score:`, getScore(board, bingoNumber));
};

partTwo();
