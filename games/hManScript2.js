"use strict";

//// Selecting HTML elements

// Buttons
const generateWordBtn = document.querySelector(".generateBtn");
// Containers
const randomWordContainer = document.querySelector(".randomWordContainer");
const keyBoardContainer = document.querySelector(".keyBoard-container");

//// 1. Display consonants as buttons
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

  //// 3. Create event listener function for each button and compares the secret word
  const playWithButtons = function (index) {
    let buttons = keyBoardContainer.querySelectorAll(".keyButton");
    buttons[index].addEventListener("click", function () {
      console.log(typeof consonants[index], consonants[index], index);

      const playersArray = gameInfo.playersArray;

      const replaceConsonants = playersArray.map((el, i) => {
        if (consonants[index].toUpperCase() === currentWord[i].toUpperCase()) {
          el = el.replace("_", consonants[index].toUpperCase());
        }
        return el;
      });

      randomWordContainer.innerHTML = "";

      replaceConsonants.forEach((el, i) => {
        const secretWordHTML = `<span class="currentWord secretWord--${i}">${el.toUpperCase()}</span>`;

        randomWordContainer.insertAdjacentHTML("beforeend", secretWordHTML);
      });
    });
  };

  playWithButtons(i);
});

//// 2. Display random word using the game info
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
  playersArray: [],
};

// Get a random word from gameInfo.words and spread the word into an array
const getRandomWord = function (obj) {
  return (obj.currentWord = [
    ...obj.words[Math.trunc(Math.random() * obj.words.length)],
  ]);
};
getRandomWord(gameInfo);

const currentWord = gameInfo.currentWord;
// Replace consonants with underscores
const replaceWithUnderscore = function (arr) {
  return arr.map((el) => {
    for (let i = 0; i < consonants.length; i++) {
      if (el.toUpperCase().includes(consonants[i].toUpperCase())) {
        el = el.replace(new RegExp(consonants[i], "gi"), "_");
      }
    }
    return el;
  });
};
gameInfo.playersArray = replaceWithUnderscore(currentWord);

// Cleaning container first
randomWordContainer.innerHTML = "";
// Exporting the current word to the HTML
gameInfo.playersArray.forEach((el, i) => {
  // "el" is a string type
  const secretWordHTML = `<span class="currentWord secretWord--${i}">${el.toUpperCase()}</span>`;

  randomWordContainer.insertAdjacentHTML("beforeend", secretWordHTML);
});
