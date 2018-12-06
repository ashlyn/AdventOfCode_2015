import renderOutput from '../utils/render';

const wrappingPaperAmount = ({
  length,
  width,
  height
}) => {
  const sides = [
    length * width,
    length * height,
    width * height,
  ];
  const smallestSide = sides.sort((a, b) => a - b)[0];
  const surfaceArea = sides.reduce((total, side) => total + (2 * side), 0);
  return (surfaceArea + smallestSide);
};

const dimensions = (present) => {
  const values = present.split("x");
  return {
    length: values[0],
    width: values[1],
    height: values[2],
  };
}

const part1 = (input) => {
  const presents = input.trim().split("\n").map(p => dimensions(p));
  const wrappingPaperAmounts = presents.map(p => wrappingPaperAmount(p));
  return wrappingPaperAmounts.reduce((total, amount) => total + amount, 0);
};

export default (input) => renderOutput(part1(input), '');