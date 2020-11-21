import renderOutput from '../utils/render';
import day8Input from '../../inputs/day8.txt';

const slashEscape = /\\\\/g;
const quoteEscape = /\\"/g;
const hexEscape = /\\x([a-fA-F0-9]{2})/g;

const fwdSlashEScape = /\//g;
const semiEscape = /;/g;

const singleSlashEscape = /\\/g;

const replaceChars = (_match, p1) => String.fromCharCode(parseInt(p1, 16));

const decodeString = (str) => {
  const withoutQuotes = str.substring(1, str.length - 1);
  const withReplacements = withoutQuotes
    .replace(slashEscape, '/')
    .replace(quoteEscape, ';')
    .replace(hexEscape, replaceChars)
    .replace(fwdSlashEScape, '\\')
    .replace(semiEscape, '"');
  return withReplacements;
};

const encodeString = (str) => {
  const withReplacements = str
    .replace(singleSlashEscape, '/')
    .replaceAll('"', ';')
    .replace(semiEscape, '\\"')
    .replace(fwdSlashEScape, '\\\\');
  const quoted = `"${withReplacements}"`;
  return quoted;
};

const part1 = (input) => input.map((i) => i.length - decodeString(i).length).reduce((a, b) => a + b, 0);

const part2 = (input) => input.map((i) => encodeString(i).length - i.length).reduce((a, b) => a + b, 0);

export default () => {
  const inputArr = day8Input.trim().split('\n');
  const part1Result = part1(inputArr);
  const part2Result = part2(inputArr);
  renderOutput(part1Result, part2Result);
};
