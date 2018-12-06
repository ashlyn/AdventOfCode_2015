import {
  default as Day1
}
from './solutions/day1';
import {
  default as Day2
} from './solutions/day2';

window.onload = () => {
  const readFile = (file, handler) => {
    return () => {
      var inputText = new XMLHttpRequest();
      inputText.open('get', file);
      inputText.onreadystatechange = () => handler(inputText.responseText);
      inputText.send();
    };
  };

  const handlers = [
    Day1,
    Day2
  ];

  for (var i = 0; i < handlers.length; i++) {
    const day = `day${i+1}`;
    var button = document.getElementById(day);
    button.addEventListener('click', readFile(`./inputs/${day}.txt`, handlers[i]));
  }

  console.log("HI");
}