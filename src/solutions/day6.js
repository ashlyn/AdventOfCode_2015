import renderOutput from "../utils/render";

const instructionPattern = /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/;

const turnOnKey = 'turn on';
const turnOffKey = 'turn off';
const toggleKey = 'toggle';

const parseInstruction = (line) => {
  const match = instructionPattern.exec(line);
  if (!match) return;
  return {
    action: match[1],
    startX: parseInt(match[2]),
    startY: parseInt(match[3]),
    stopX: parseInt(match[4]),
    stopY: parseInt(match[5]),
  };
};

const part1 = (input) => {
  let lights = [...Array(1000)].map(e => Array(1000).fill(false));
  input.trim()
    .split("\n")
    .map(parseInstruction)
    .forEach(instruction => {
      if (!instruction) return;
      for (var x = instruction.startX; x <= instruction.stopX; x++) {
        for (var y = instruction.startY; y <= instruction.stopY; y++) {
          lights[x][y] = part1NewLightStatus(instruction.action, lights[x][y]);
        }
      }
    });
  return lights.reduce((sum, row) => {
    return sum + row.reduce((rowSum, light) => {
      return rowSum + light;
    }, 0);
  }, 0);
};

const part2 = (input) => {
  let lights = [...Array(1000)].map(e => Array(1000).fill(0));
  input.trim()
    .split("\n")
    .map(parseInstruction)
    .forEach(instruction => {
      if (!instruction) return;
      for (var x = instruction.startX; x <= instruction.stopX; x++) {
        for (var y = instruction.startY; y <= instruction.stopY; y++) {
          lights[x][y] = part2NewLightStatus(instruction.action, lights[x][y]);
        }
      }
    });
  return lights.reduce((sum, row) => {
    return sum + row.reduce((rowSum, light) => {
      return rowSum + light;
    }, 0);
  }, 0);
};

const part1NewLightStatus = (action, light) => {
  switch (action) {
    case turnOnKey:
      return true;
    case turnOffKey:
      return false;
    case toggleKey:
      return !light;
    default:
      return !!light;
  }
};

const part2NewLightStatus = (action, light) => {
  switch (action) {
    case turnOnKey:
      return light + 1;
    case turnOffKey:
      return Math.max(0, light - 1);
    case toggleKey:
      return light + 2;
    default:
      return light;
  }
};

export default (input) => {
  renderOutput(part1(input), part2(input));
};
