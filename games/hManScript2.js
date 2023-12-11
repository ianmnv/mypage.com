"use strict";

// Selecting HTML elements

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
});

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
  currentWord: "",
};
