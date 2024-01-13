"use strict";

//// Selecting HTML elements

// Elements
const attemptsHTML = document.querySelector(".numbOfAtt");
const totalWordsEl = document.querySelector(".totalWords");
const guessedWordsEl = document.querySelector(".guessedWords");
// Buttons
const generateWordBtn = document.querySelector(".generateBtn");
// Containers
const randomWordContainer = document.querySelector(".randomWordContainer");
const keyBoardContainer = document.querySelector(".keyBoard-container");

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
    "Git-bash",
  ],
  currentWord: [],
  playersArray: [],
  attempts: 0,
  manyOfWords: 0,

  // Get a random word from gameInfo.words
  getRandomWord() {
    this.currentWord = [
      ...this.words[Math.trunc(Math.random() * this.words.length)],
    ];
  },

  // Replace consonants with underscores
  replaceWithUnderscore() {
    this.playersArray = this.currentWord.map((letter) => {
      consonants.forEach((con) => {
        if (con.toUpperCase().includes(letter.toUpperCase())) {
          // letter = letter.replace(new RegExp(con, "gi"), "_");
          letter = letter.replace(con, "_");
        }
      });
      return letter;
    });
  },

  // Attempts is the length of the current word - 2
  checkForAttempts() {
    this.attempts = this.currentWord.length - 2;
  },

  // Total of words array length
  howManyWords() {
    this.manyOfWords = this.words.length;
  },
};

// First state of the game
const init = (obj) => {
  obj.getRandomWord();
  obj.replaceWithUnderscore();
  obj.checkForAttempts();
  obj.howManyWords();
};
init(gameInfo);

// Updates UI
const updateUI = function () {
  // Clearing random word container
  randomWordContainer.innerHTML = "";
  // Export the current word to the HTML
  gameInfo.playersArray.forEach((el, i) => {
    // "el" is a string type
    const secretWordHTML = `<span class="currentWord secretWord--${i}">${el.toUpperCase()}</span>`;
    randomWordContainer.insertAdjacentHTML("beforeend", secretWordHTML);
  });

  // Setting the attempts for the current word
  attemptsHTML.textContent = gameInfo.attempts;
  totalWordsEl.textContent = gameInfo.manyOfWords;
};
updateUI();

/* Start of event handlers */

// Clear keyboard container first
keyBoardContainer.innerHTML = "";

//// 1. Display consonants as buttons
consonants.forEach((el, i) => {
  const html = `<button class="keyButton btns" id="${i}">${el.toUpperCase()}</button>`;

  keyBoardContainer.insertAdjacentHTML("beforeend", html);

  const playWithButtons = function (index) {
    let buttons = keyBoardContainer.querySelectorAll(".keyButton");

    //// 2. Create event listener for each consonant button
    buttons[index].addEventListener("click", function () {
      const currentWord = gameInfo.currentWord;
      const playersArray = gameInfo.playersArray;
      let subtractionFlag = false;

      checkWord();

      // 3. Checks if button consonant is included in the current word
      currentWord.forEach((_, i) => {
        // 3.1 If IT IS included, display consonant in the UI
        if (
          consonants[index].toUpperCase().includes(currentWord[i].toUpperCase())
        ) {
          playersArray[i] = playersArray[i].replace(
            "_",
            consonants[index].toUpperCase()
          );
          checkWord();
        } else if (
          currentWord.every(
            (letter) => letter.toUpperCase() !== consonants[index].toUpperCase()
          )
        ) {
          // 3.2 If IT IS NOT
          if (!subtractionFlag) {
            // Count minus one to attempts
            gameInfo.attempts--;
            attemptsHTML.textContent = gameInfo.attempts;
            subtractionFlag = true;

            // And change button colors
            buttons[index].classList.add("btnWrong");
          }
        }
      });

      updateUI();

      //// 3.1.1 If currentWord is fully correct, call init and updateUI functions, plus reset button colors
      function checkWord() {
        if (
          currentWord.every(
            (letter, i) =>
              letter.toUpperCase() === playersArray[i].toUpperCase()
          )
        ) {
          console.log("Add one to the score my boy!");
        }
      }
    });
  };

  playWithButtons(i);
});

const guessedWord = function () {};

//// 4. Generate new word and skip the current one
generateWordBtn.addEventListener("click", () => {
  init(gameInfo);
  updateUI();
});
