import renderOutput from "../utils/render";

const hasAtLeastThreeVowelsPattern = /[a-z]*[aeiou]{1}[a-z]*[aeiou]{1}[a-z]*[aeiou]{1}[a-z]*/;
const repeatedLetterPattern = /[a-z]*([a-z])\1[a-z]*/;
const containsInvalidSubstringPattern = /[a-z]*(ab|cd|pq|xy)[a-z]*/;

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
  return hasAtLeastThreeVowelsPattern.test(word) &&
    repeatedLetterPattern.test(word) &&
    !containsInvalidSubstringPattern.test(word);
};

const isNiceForPart2 = (word) => {
  return repeatedPairPattern.test(word) &&
    repeatWithOneBetweenPattern.test(word);
}

export default (input) => {
  const solutions = solve(input);
  renderOutput(solutions.part1, solutions.part2);
}