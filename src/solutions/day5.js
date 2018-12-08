import renderOutput from "../utils/render";

const repeatedPairPattern = /[a-z]*([a-z][a-z])[a-z]*\1[a-z]*/;
const repeatWithOneBetweenPattern = /[a-z]*([a-z])[a-z]\1[a-z]*/;

const solve = (input) => {
  const words = input.trim().split("\n");
  const part1 = words.filter(isNiceForPart1).length;
  const part2 = words.filter(isNiceForPart2).length;
  return {
    part1,
    part2,
  };
};

const isNiceForPart1 = (word) => {
  return hasAtLeastThreeVowels(word) &&
         hasRepeatedLetter(word) &&
         doesNotHaveInvalidString(word);
};

const isNiceForPart2 = (word) => {
  return repeatedPairPattern.test(word) &&
    repeatWithOneBetweenPattern.test(word);
}

const hasAtLeastThreeVowels = (word) => {
  return word.split('').filter(letter => "aeiou".indexOf(letter) !== -1)
    .length >= 3;
};

const hasRepeatedLetter = (word) => {
  return word.split('').reduce((hasDuplicate, currentLetter, i, word) => {
    if (i === 0) return false;
    const previousLetter = word[i - 1];
    return hasDuplicate || currentLetter === previousLetter;
  }, false);
};

const doesNotHaveInvalidString = (word) => {
  const invalidSubstrings = ["ab", "cd", "pq", "xy"];
  return invalidSubstrings.every(i => word.indexOf(i) === -1);
};

export default (input) => {
  const solutions = solve(input);
  renderOutput(solutions.part1, solutions.part2);
}