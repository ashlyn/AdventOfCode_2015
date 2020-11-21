const renderOutput = (part1, part2) => {
  var output = document.getElementById('output');
  output.innerHTML = `
    <p><b>Part 1:</b> ${part1}</p>
    <p><b>Part 2:</b> ${part2}</p>
  `;
};

export default renderOutput;
