import renderOutput from '../utils/render';

const part1 = (input) => {
  var currentFloor = 0;
  for (var i = 0; i < input.length; i++) {
    if (input[i] === "(") currentFloor++;
    else currentFloor--;
  }
  return currentFloor;
};

export default (input) => renderOutput(part1(input), '');