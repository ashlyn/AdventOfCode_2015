import renderOutput from '../utils/render';
import day7Input from '../../inputs/day7.txt';

const maxSignal = 65535;

var opPattern = /([a-z]*?|[0-9]*?)\s*(AND|OR|RSHIFT|LSHIFT|NOT)?\s*([a-z]+|[0-9]+)\s*->\s*([a-z]+|[0-9]+)\s*\n?/g;

const ops = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  RSHIFT: (a, b) => a >>> b,
  LSHIFT: (a, b) => a << b,
  NOT: (_a, b) => ~b,
};

const conditionalParseInt = (value) => {
  var parsed = parseInt(value);
  return isNaN(parsed) ? value : parsed;
};

const parseInstruction = ([, ...parts]) => {
  return parts.map((i) => {
    var op = ops[i];
    if (op) return op;
    return conditionalParseInt(i);
  });
};

const dependenciesMet = ([wire1, op, wire2], values) => {
  if (!op && !isNaN(wire2)) return true;
  if (!op && values[wire2] !== undefined) return true;

  if ((!isNaN(wire1) || values[wire1] !== undefined) && (!isNaN(wire2) || values[wire2] !== undefined)) return true;

  return false;
};

const calculateValues = (allInstructions, initialValues = {}) => {
  const values = { ...initialValues };
  let instructions = [...allInstructions];
  let index = -1;
  do {
    index = instructions.findIndex((i) => dependenciesMet(i, values));
    const instruction = instructions[index];
    const [wire1, op, wire2, output] = instruction;
    const operand1 = values[wire1] !== undefined ? values[wire1] : wire1;
    const operand2 = values[wire2] !== undefined ? values[wire2] : wire2;
    let value = !op ? operand2 : op(operand1, operand2);
    values[output] = value & maxSignal;
    instructions.splice(index, 1);
  } while (instructions.length && index > -1);
  if (instructions.length) console.error(`Failed to process ${instructions.length} instructions.`);
  return values;
};

const finalWire = 'a';

const part1 = (instructions) => {
  const values = calculateValues(instructions);
  return values[finalWire];
};

const part2 = (instructions, part1Result) => {
  // remove instruction overwritten by assigning part 1 to b
  const overwrittenInstruction = instructions.findIndex((i) => !i[0] && !i[1] && !isNaN(i[2]) && i[3] == 'b');
  instructions.splice(overwrittenInstruction, 1);
  const values = calculateValues(instructions, { b: part1Result ? part1Result : part1(day7Input) });
  return values[finalWire];
};

export default () => {
  const instructions = [...day7Input.trim().matchAll(opPattern)].map(parseInstruction);
  const part1Result = part1([...instructions]);
  renderOutput(part1Result, part2([...instructions], part1Result));
};
