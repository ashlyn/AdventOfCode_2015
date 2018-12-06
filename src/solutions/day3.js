import renderOutput from '../utils/render';

const directions = {
  north: "^",
  south: "v",
  east: ">",
  west: "<",
};

const getNewPosition = (current, direction) => {
  switch (direction) {
    case directions.north:
      return { ...current,
        y: current.y - 1
      };
    case directions.south:
      return { ...current,
        y: current.y + 1
      };
    case directions.east:
      return { ...current,
        x: current.x + 1
      };
    case directions.west:
      return { ...current,
        x: current.x - 1
      };
    default:
      return current;
  }
}

const keyForHouse = (house) => `${house.x}-${house.y}`;

const solve = (input) => {
  const part1Houses = new Set();
  const part2Houses = new Set();

  var currentSoloSanta = {
    x: 0,
    y: 0
  };
  var currentRealSanta = {
    x: 0,
    y: 0
  };
  var currentRoboSanta = {
    x: 0,
    y: 0
  };

  part1Houses.add(keyForHouse(currentSoloSanta));
  part2Houses.add(keyForHouse(currentRealSanta));
  for (var i = 0; i < input.length; i++) {
    var part2HouseKey = "";
    if (i % 2) {
      currentRealSanta = getNewPosition(currentRealSanta, input[i]);
      part2HouseKey = keyForHouse(currentRealSanta);
    } else {
      currentRoboSanta = getNewPosition(currentRoboSanta, input[i]);
      part2HouseKey = keyForHouse(currentRoboSanta);
    }
    currentSoloSanta = getNewPosition(currentSoloSanta, input[i]);
    part1Houses.add(keyForHouse(currentSoloSanta));
    part2Houses.add(part2HouseKey);
  }
  return {
    part1: part1Houses.size,
    part2: part2Houses.size,
  };
};

export default (input) => {
  const solutions = solve(input.trim());
  renderOutput(solutions.part1, solutions.part2);
}