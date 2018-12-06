import md5 from 'md5';
import renderOutput from '../utils/render';

const part1Pattern = "00000";
const part2Pattern = "000000";

const solve = (input) => {
  var part1 = 0;
  var part2 = 0;
  var i = 1; {
    while (i > 0) {
      const hash = md5(`${input}${i}`);
      if (hash.startsWith(part1Pattern) && !part1) part1 = i;
      if (hash.startsWith(part2Pattern) && !part2) part2 = i;
      if (part1 && part2) return {
        part1,
        part2
      };
      i++;
    }
  }
};

export default (input) => {
  const solutions = solve(input.trim());
  renderOutput(solutions.part1, solutions.part2);
}