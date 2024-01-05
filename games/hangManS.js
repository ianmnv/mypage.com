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

// Part of first problem
consonants.forEach((el, i) => {
  const html = `<button class="keyButton btns" id="${i}">${el.toUpperCase()}</button>`;

  keyBoardContainer.insertAdjacentHTML("beforeend", html);

  const playWithButtons = function (index) {
    let buttons = keyBoardContainer.querySelectorAll(".keyButton");

    //// 2. Create event listener function for each consonant button
    buttons[index].addEventListener("click", function () {
      const currentWord = gameInfo.currentWord;
      const playersArray = gameInfo.playersArray;

      // 3. Checks if button consonant is included in the current word
      currentWord.forEach((_, i) => {
        // 3.1 If YES, display consonant in the UI
        if (
          currentWord[i].toUpperCase().includes(consonants[index].toUpperCase())
        ) {
          playersArray[i] = playersArray[i].replace(
            "_",
            consonants[index].toUpperCase()
          );
        } // 3.2 If NO, take one from attempts
      });
      updateUI();
    });
  };

  playWithButtons(i);
});

//// 4. Display random word using the game info
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

  // Get a random word from gameInfo.words and spread the word into an array
  getRandomWord() {
    this.currentWord = [
      ...this.words[Math.trunc(Math.random() * this.words.length)],
    ];
  },

  // Replace consonants with underscores
  replaceWithUnderscore() {
    this.playersArray = this.currentWord.map((el) => {
      for (let i = 0; i < consonants.length; i++) {
        if (consonants[i].toUpperCase().includes(el.toUpperCase())) {
          el = el.replace(new RegExp(consonants[i], "gi"), "_");
        }
      }
      return el;
    });
  },
};

// First state of the game
const init = (obj) => {
  obj.getRandomWord();
  obj.replaceWithUnderscore();
};
init(gameInfo);

// Updates UI
const updateUI = function () {
  // Clearing container
  randomWordContainer.innerHTML = "";
  // Exporting the current word to the HTML
  gameInfo.playersArray.forEach((el, i) => {
    // "el" is a string type
    const secretWordHTML = `<span class="currentWord secretWord--${i}">${el.toUpperCase()}</span>`;
    randomWordContainer.insertAdjacentHTML("beforeend", secretWordHTML);
  });

  console.log(gameInfo.currentWord, "current word");
  console.log(gameInfo.playersArray, "player's array");
};
updateUI();

/* GENERATE NEW WORD BUTTON */
generateWordBtn.addEventListener("click", () => {
  init(gameInfo);
  updateUI();
});
