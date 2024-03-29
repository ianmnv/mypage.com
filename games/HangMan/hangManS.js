"use strict";

//// Selecting HTML elements

// Elements
const attemptsEl = document.querySelector(".numbOfAtt");
const totalWordsEl = document.querySelector(".totalWords");
const guessedWordsEl = document.querySelector(".guessedWords");
// Buttons
const generateWordBtn = document.querySelector(".generateBtn");
// Containers
const randomWordContainer = document.querySelector(".randomWordContainer");
const keyBoardContainer = document.querySelector(".keyBoard-container");
const interactiveCont = document.querySelector(".interactiveContainer");

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

function dontCopy() {
  alert(
    `Please don't claim this project as yours, I leave this repository in the open-source community so people see my work or for people to have a new idea for a project.`
  );

  const message = document.createElement("div");

  message.innerHTML = `<p class="messageText">It is generally considered unethical and a violation of intellectual property rights to claim someone else's work as their own.
  <br>
  In the open-source community and software development in general,
  attribution and respect for licenses are crucial. Check commits for the real creator. <br>
  <a href="https://github.com/ianmnv">Where everything started</a></p>

 <button class="btn--message messageText">Got it!</button>`;
  message.classList.add("message");

  document.querySelector("body").prepend(message);

  document.querySelector(".btn--message").addEventListener("click", () => {
    message.remove();
    alert("It's play time!");
  });
}
dontCopy();

const gameInfo = {
  words: [],
  currentWord: [],
  playersArray: [],
  attempts: 0,
  guessedWords: 0,

  // We need this function to play again
  setWords() {
    this.words = [
      "JavaScript",
      "TypeScript",
      "React",
      "Angular",
      // "Developer",
      // "Web-Development",
      "Git-bash",
      "Google",
      "Methods",
      "Objects",
      "Arrays",
      "Functions",
      "Keys",
      // "Variables",
      "Back-end",
      "Front-end",
      // "Computer",
      "Coding",
      // "Programming",
    ];
  },
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

// Functions that only have to be called once
gameInfo.setWords();
gameInfo.howManyWords();

const init = (obj) => {
  obj.getRandomWord();
  obj.replaceWithUnderscore();
  obj.checkForAttempts();
};

const updateUI = function () {
  // Clearing random word container
  randomWordContainer.innerHTML = "";
  // Export the current word to the HTML
  gameInfo.playersArray.forEach((el) => {
    // "el" is a string type
    const secretWordHTML = `<span class="currentWord">${el.toUpperCase()}</span>`;
    randomWordContainer.insertAdjacentHTML("beforeend", secretWordHTML);
  });

  attemptsEl.textContent = gameInfo.attempts;
  totalWordsEl.textContent = gameInfo.manyOfWords;
};

const deleteWord = function (words) {
  const currentWordStr = [...gameInfo.currentWord].join("");
  const findIndex = words.findIndex((word) => word === currentWordStr);
  console.log(words, findIndex);
  words.splice(findIndex, 1);
};

// First state of the game
function refreshUI(obj) {
  init(obj);
  updateUI();
  deleteWord(obj.words);
}
refreshUI(gameInfo);

// Functions for handlers
function playAgainFun(btn, title) {
  btn.addEventListener("click", () => {
    gameInfo.guessedWords = 0;
    guessedWordsEl.textContent = gameInfo.guessedWords;

    keyBoardContainer.style.display = "grid";

    document.querySelector("h2").classList.remove("gameFinished");

    title.innerHTML =
      "<h1>THE HANGMAN GAME</h1> <h2>(WEB DEVELOPMENT EDITION)</h2>";

    gameInfo.setWords();
    refreshUI(gameInfo);
    dontCopy();
  });
}

// 3.2.1
function checkAttempts() {
  let text;
  if (gameInfo.attempts === 0) {
    text = `YOU LOST THE GAME! 😭`;
  } else if (gameInfo.words.length === 0) {
    text = `GAME FINISHED! 🎉🙉`;
  }
  // Hide keyboard
  keyBoardContainer.style.display = "none";
  // Change title container
  const titleCont = document.querySelector(".titleContainer");
  const finishHTML = `<h2 class="gameFinished">${text}<br> 
    You guessed ${gameInfo.guessedWords} out of ${gameInfo.manyOfWords} words. <br>
    <button class="btns generateBtn" id="playAgainBtn">Play again! 👾</button></h2>`;
  titleCont.innerHTML = finishHTML;

  const playAgainBtn = document.getElementById("playAgainBtn");
  // 5. Re-start the game
  playAgainFun(playAgainBtn, titleCont);
}

function checkWords(objOfWords) {
  if (objOfWords.length > 0) {
    refreshUI(gameInfo);
  } else if (objOfWords.length === 0) {
    checkAttempts();
  }
}

function keyCallBack(e) {
  if (!e.target.classList.contains("keyButton")) return;

  const button = e.target.textContent;
  const currentWord = gameInfo.currentWord;
  const playersArray = gameInfo.playersArray;
  let subtractionFlag = false;

  currentWord.forEach((_, i) => {
    // 3.1 If IT IS included
    if (button.includes(currentWord[i].toUpperCase())) {
      // Display consonant in the UI
      playersArray[i] = playersArray[i].replace("_", button);

      //// 3.1.1 If currentWord is fully correct
      if (
        currentWord.every(
          (letter, i) => letter.toUpperCase() === playersArray[i].toUpperCase()
        )
      ) {
        // Add one to the key property "guessedWords"
        gameInfo.guessedWords++;
        guessedWordsEl.textContent = gameInfo.guessedWords;

        checkWords(gameInfo.words);
      }
      // 3.2 If IT IS NOT included
    } else if (currentWord.every((letter) => letter.toUpperCase() !== button)) {
      if (!subtractionFlag) {
        // Count minus one to attempts
        gameInfo.attempts--;
        attemptsEl.textContent = gameInfo.attempts;

        subtractionFlag = true;

        // And change button colors
        e.target.classList.add("btnWrong");

        // Reset button color after sometime
        setTimeout(() => e.target.classList.remove("btnWrong"), 1000);

        if (gameInfo.attempts === 0) checkAttempts();
      }
    }
  });

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

keyBoardContainer.addEventListener("click", keyCallBack.bind());

//// 4. Generate new word and skip the current one
generateWordBtn.addEventListener("click", () => {
  checkWords(gameInfo.words);
});
