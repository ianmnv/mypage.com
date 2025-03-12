"use strict";

// //// SECTION 2 REPOSITORIES

// BUTTON TITLES
const section2Btns = document.querySelectorAll(".btns-s2");
const allH3 = document.querySelectorAll(".sec2-h3");
const icons = document.querySelectorAll(".icons");
const sec2Content = document.querySelectorAll(".sect2");

section2Btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    // STYLE TITLE
    section2Btns.forEach((btn) => btn.classList.remove("btn-title-active"));
    btn.classList.add("btn-title-active");

    allH3.forEach((h3) => h3.classList.remove("s2-h3-active"));

    btn.querySelector(".sec2-h3").classList.add("s2-h3-active");

    // arrow point right
    // m8.25 4.5 7.5 7.5-7.5 7.5

    // arrow point down
    // m19.5 8.25-7.5 7.5-7.5-7.5

    icons.forEach((i) => i.setAttribute("d", "m8.25 4.5 7.5 7.5-7.5 7.5"));

    const dataNum = btn.dataset.number;

    const icon = document.querySelector(`.arrow-icon-${dataNum}`);
    icon.setAttribute("d", "m19.5 8.25-7.5 7.5-7.5-7.5");

    // DISPLAY CONTENT
    sec2Content.forEach((s) => s.classList.add("hidden"));
    const section = document.querySelector(`.s2-cont-${dataNum}`);
    section.classList.remove("hidden");
  });
});

////// INFO OF REPOS

const items = document.querySelectorAll(".sec2-items");
const anchors = document.querySelectorAll(".sec2-a");

const contentCallback = function (e) {
  if (!e.target.classList.contains("sec2-a")) return;

  // Display info of repo
  const dataContent = e.target.dataset.content;
  items.forEach((i) => i.classList.add("hidden"));

  const item = document.querySelector(`.content-${dataContent}`);
  item.classList.remove("hidden");
  item.classList.add("content-active");

  // Change color of anchor
  anchors.forEach((a) => a.classList.remove("content-active"));
  if (e.target.classList.contains("sec2-a"))
    e.target.classList.add("content-active");
};

// GAMES CONTENT
const gameBtnsContain = document.querySelector(".s2-game-btns");
gameBtnsContain.addEventListener("mouseover", contentCallback);

// WEBSITES CONTENT
const webBtnsContain = document.querySelector(".s2-webs-btns");
webBtnsContain.addEventListener("mouseover", contentCallback);

// APPS CONTENT
const appBtnsContain = document.querySelector(".s2-apps-btns");
appBtnsContain.addEventListener("mouseover", contentCallback);

////// Absolute element on Section 2

const message = document.createElement("div");

message.innerHTML = `<p>
Hover through the repositories to check its info, if you wanna check
the actual repo, click on them.
</p>
<button class="btn-abs">Got it!</button>`;
message.classList.add("absolute");
document.getElementById("section-2").prepend(message);

const messageBtn = document.querySelector(".btn-abs");
messageBtn.addEventListener("click", () => message.remove());
