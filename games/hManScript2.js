"use strict";

//// Selecting HTML elements

// Buttons
const generateWordBtn = document.querySelector(".generateBtn");
// Containers
const secretWordContainer = document.querySelector(".randomWordContainer");
const keyBoardContainer = document.querySelector(".keyBoard-container");

// 1. Display consonants as buttons
const consonants = [
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "q",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "z",
];

// Clear keyboard container first
keyBoardContainer.innerHTML = "";

consonants.forEach((el, i) => {
  const html = `<button class="keyButton btns" id="${i}">${el.toUpperCase()}</button>`;

  keyBoardContainer.insertAdjacentHTML("beforeend", html);

  const playWithButtons = function (index) {
    let buttons = keyBoardContainer.querySelectorAll(".keyButton");
    buttons[index].addEventListener("click", function () {
      console.log(index);
    });
  };

  playWithButtons(i);
});

// 2. Display random word using the game info
const gameInfo = {
  words: [
    "Developer",
    "JavaScript",
    "Web-Development",
    "Objects",
    "Arrays",
    "TypeScript",
    "React",
    "Google",
    "Functions",
    "Methods",
    "Keys",
    "Variables",
    "Back-end",
    "Front-end",
    "Computer",
    "Coding",
    "Programming",
    "Angular",
  ],
  attempts: 8,
  currentWord: [],
};

// Get a random word from obj.words and spread the word into an array
const getRandomWord = function (obj) {
  return (obj.currentWord = [
    ...obj.words[Math.trunc(Math.random() * obj.words.length)],
  ]);
};

console.log(getRandomWord(gameInfo));
console.log(gameInfo.currentWord[0]);
