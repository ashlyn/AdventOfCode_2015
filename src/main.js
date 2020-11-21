import { default as Day1 } from './solutions/day1';
import { default as Day2 } from './solutions/day2';
import { default as Day3 } from './solutions/day3';
import { default as Day4 } from './solutions/day4';
import { default as Day5 } from './solutions/day5';
import { default as Day6 } from './solutions/day6';
import { default as Day7 } from './solutions/day7';
import { default as Day8 } from './solutions/day8';

const handlers = [Day1, Day2, Day3, Day4, Day5, Day6, Day7, Day8];

window.onload = () => {
  for (var i = 0; i < handlers.length; i++) {
    const day = `day${i + 1}`;
    var button = document.getElementById(day);
    button.addEventListener('click', handlers[i]);
  }
};
