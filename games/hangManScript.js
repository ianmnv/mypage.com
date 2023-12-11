"use strict";

// BUTTONS
// Generate random word button
const generateWordBtn = document.querySelector(".generateBtn");
// Individual letter button
const keyBtns = document.querySelector(".keyButton");

// Displayed word and hidden
const currentWordEl = document.querySelector(".currentWord");

// Keyboard of consonants
const keyBcontainer = document.querySelector(".keyBoard-container");

// Displaying individual buttons
const alphabet = [
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

keyBcontainer.innerHTML = "";

for (let i = 0; i < alphabet.length; i++) {
  const html = `<div class="individualKey"><button class="keyButton btns">${alphabet[
    i
  ].toUpperCase()}</button></div>`;

  keyBcontainer.insertAdjacentHTML("beforeend", html);

  (function (index) {
    let buttons = keyBcontainer.querySelectorAll(".keyButton");
    buttons[index].addEventListener("click", function () {
      console.log("Button clicked:", alphabet[index]);

      // 1. Remove underscore with the correct letter if it is included in the current word

      const curWordToArr = [...mainObj.currentWord];
      const curWordEl = [...currentWordEl.textContent];

      // Function that escapes minus sign
      const escapeMinusSign = function (string) {
        return string.replace(/-/g, "\\$&");
      };
      const escapeArr = curWordToArr.map(escapeMinusSign);

      // const curWordMap = curWordEl.map((el) => {
      //   for (let i = 0; i < escapeArr.length; i++) {
      //     if (alphabet[index].toUpperCase() === escapeArr[i].toUpperCase()) {
      //       return escapeArr[i].toUpperCase();
      //     } else {
      //       return el[i].toUpperCase();
      //     }
      //   }
      // });

      // for (let i = 0; i < escapeArr.length; i++) {
      //   if (curWordEl[i].toUpperCase() === escapeArr[i].toUpperCase()) {
      //     console.log(curWordEl[i], escapeArr[i]);
      //   }
      // }

      // 2. Display it in the page
      // currentWordEl.textContent = curWordMap;

      // Converting the current word as an array to an expression
      // const arrInExp = new RegExp(`[${escapeArr.join("")}]`, "gi"); // (NOT USING IT AS WELL)

      // 3. If the consonant is not included in the current word, alert
    });
  })(i);
}

// Build object words and displaying random word
const mainObj = {
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
  currentWord: "",
};

// Gets a random word from array of words
function getRandomWord(obj) {
  const theCurrentW = (obj.currentWord =
    obj.words[Math.trunc(Math.random() * obj.words.length)]);

  const newWord = [];
  for (let i = 0; i < theCurrentW.length; i++) {
    newWord.push(theCurrentW[i].toLocaleUpperCase());
  }
  // Research more about regular expressions
  const changeCon = new RegExp(`[${alphabet.join("")}]`, "gi");
  return newWord.join("").replace(changeCon, "_");
}

currentWordEl.textContent = getRandomWord(mainObj);

// Handler function to generate new random word
generateWordBtn.addEventListener("click", function () {
  currentWordEl.textContent = getRandomWord(mainObj);
});

// Loop over each button and wait for an event to happen
// console.log(typeof keyBtns, keyBtns.textContent);
// for (const [key, value] of keyBtns) {
//   console.log(key, value);
// }

/* Study with Dad
const amigos = ["Erick", "Marco", "David", "Pedro", "Homero"];
console.log(amigos);

const agrega1Amigo = amigos.push("Pepe");
console.log(amigos);

const quitaAmigo = amigos.pop();
console.log(amigos);
console.log(quitaAmigo);

const agregaOtroAmigo = amigos.unshift("Messi");
console.log(amigos);

console.log(amigos.shift(), amigos);
*/
