import renderOutput from '../utils/render';

const part1 = (input) => {
  var currentFloor = 0;
  for (var i = 0; i < input.length; i++) {
    if (input[i] === "(") currentFloor++;
    else currentFloor--;
  }
  return currentFloor;
};

const part2 = (input) => {
  var currentFloor = 0;
  for (var i = 0; i < input.length; i++) {
    if (input[i] === "(") currentFloor++;
    else currentFloor--;

    if (currentFloor === -1) return i + 1;
  }
};

export default (input) => renderOutput(part1(input), part2(input));