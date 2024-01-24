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
    // "JavaScript",
    // "TypeScript",
    "React",
    "Angular",
    // "Developer",
    // "Web-Development",
    // "Git-bash",
    "Google",
    // "Methods",
    // "Objects",
    "Arrays",
    // "Functions",
    "Keys",
    // "Variables",
    // "Back-end",
    // "Front-end",
    // "Computer",
    // "Coding",
    // "Programming",
  ],
  currentWord: [],
  playersArray: [],
  attempts: 0,
  guessedWords: 0,

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
          // We use the regular expression because it matches any letter regardless of the Case (uppercase or lowercase)
          letter = letter.replace(new RegExp(con, "gi"), "_");
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

// Calling only once so totalWordsEl doesn't change
gameInfo.howManyWords();

// First state of the game
const init = (obj) => {
  obj.getRandomWord();
  obj.replaceWithUnderscore();
  obj.checkForAttempts();
};
init(gameInfo);

// Updates UI
const updateUI = function () {
  // Clearing random word container
  randomWordContainer.innerHTML = "";
  // Export the current word to the HTML
  gameInfo.playersArray.forEach((el) => {
    // "el" is a string type
    const secretWordHTML = `<span class="currentWord">${el.toUpperCase()}</span>`;
    randomWordContainer.insertAdjacentHTML("beforeend", secretWordHTML);
  });

  // Setting the attempts for the current word
  attemptsHTML.textContent = gameInfo.attempts;
  totalWordsEl.textContent = gameInfo.manyOfWords;
};
updateUI();

// Functions for handlers
function deleteWord(splice) {
  const currentWordStr = [...gameInfo.currentWord].join("");
  const findIndex = splice.findIndex((word) => word === currentWordStr);
  splice.splice(findIndex, 1);
}
deleteWord(gameInfo.words);

function callback(e) {
  if (!e.target.classList.contains("keyButton")) return;

  if (gameInfo.words) {
    const button = e.target.textContent;
    const currentWord = gameInfo.currentWord;
    const playersArray = gameInfo.playersArray;
    let subtractionFlag = false;

    currentWord.forEach((_, i) => {
      // 3.1 If IT IS included, display consonant in the UI
      if (button.includes(currentWord[i].toUpperCase())) {
        playersArray[i] = playersArray[i].replace("_", button);

        //// 3.1.1 If currentWord is fully correct
        if (
          currentWord.every(
            (letter, i) =>
              letter.toUpperCase() === playersArray[i].toUpperCase()
          )
        ) {
          playersArray[i] = playersArray[i].replace("_", button);

          // Add one to the key property "guessedWords"
          gameInfo.guessedWords++;
          guessedWordsEl.textContent = gameInfo.guessedWords;

          // Call init and updateUI functions
          init(gameInfo);
          updateUI();

          // Delete that word from words array
          deleteWord(gameInfo.words);
        }
        // 3.2 If IT IS NOT included
      } else if (
        currentWord.every((letter) => letter.toUpperCase() !== button)
      ) {
        if (!subtractionFlag) {
          // Count minus one to attempts
          gameInfo.attempts--;
          attemptsHTML.textContent = gameInfo.attempts;

          subtractionFlag = true;

          // And change button colors
          e.target.classList.add("btnWrong");

          // Reset button color after sometime
          setTimeout(() => e.target.classList.remove("btnWrong"), 1000);
        }
      }
    });
  }
  updateUI();
}

// Clear keyboard container first
keyBoardContainer.innerHTML = "";

//// 1. Display consonants as buttons
consonants.forEach((el, i) => {
  const html = `<button class="keyButton btns" id="${i}">${el.toUpperCase()}</button>`;

  keyBoardContainer.insertAdjacentHTML("beforeend", html);
});

/* Event handlers */

keyBoardContainer.addEventListener("click", callback.bind());

//// 4. Generate new word and skip the current one
generateWordBtn.addEventListener("click", () => {
  init(gameInfo);
  updateUI();
});
