import renderOutput from '../utils/render';
import day2Input from '../../inputs/day2.txt';

const ribbonAmount = ({ length, width, height }) => {
  const sides = [2 * (length + width), 2 * (length + height), 2 * (width + height)];
  const shortestPerimeter = sides.sort((a, b) => a - b)[0];
  const bowLength = length * width * height;
  return shortestPerimeter + bowLength;
};

const wrappingPaperAmount = ({ length, width, height }) => {
  const sides = [length * width, length * height, width * height];
  const smallestSide = sides.sort((a, b) => a - b)[0];
  const surfaceArea = sides.reduce((total, side) => total + 2 * side, 0);
  return surfaceArea + smallestSide;
};

const dimensions = (present) => {
  const values = present.split('x');
  return {
    length: parseInt(values[0], 10),
    width: parseInt(values[1], 10),
    height: parseInt(values[2], 10),
  };
};

const solve = (input) => {
  const presents = input
    .trim()
    .split('\n')
    .map((p) => dimensions(p));
  const materialAmounts = presents.map((p) => {
    return {
      wrappingPaper: wrappingPaperAmount(p),
      ribbon: ribbonAmount(p),
    };
  });
  return materialAmounts.reduce(
    (total, current) => {
      return {
        wrappingPaper: total.wrappingPaper + current.wrappingPaper,
        ribbon: total.ribbon + current.ribbon,
      };
    },
    {
      wrappingPaper: 0,
      ribbon: 0,
    },
  );
};

export default () => {
  const solutions = solve(day2Input);
  renderOutput(solutions.wrappingPaper, solutions.ribbon);
};
