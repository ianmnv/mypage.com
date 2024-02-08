// Selecting html elements
const info = document.querySelector(".contact-info");
const overLay = document.querySelector(".overlay");

info.classList.add("hidden");

document
  .querySelector(".contact-button")
  .addEventListener("click", function () {
    info.classList.remove("hidden");
    overLay.classList.remove("hidden");
  });

const closeInfo = function () {
  info.classList.add("hidden");
  overLay.classList.add("hidden");
};

document.querySelector(".close-info").addEventListener("click", closeInfo);

overLay.addEventListener("click", closeInfo);

// CLOCK

const clock = document.querySelector(".clock");

setInterval(() => {
  const now = new Date();

  clock.textContent = new Intl.DateTimeFormat(navigator.language, {
    timeStyle: "medium",
  }).format(now);
}, 1000);

// POEM

const poemCont = document.querySelector(".poem");

const backOpacity = function () {
  poemCont.style.backgroundImage = this;
  poemCont.style.backgroundSize = "cover";
};

poemCont.addEventListener(
  "mouseover",
  backOpacity.bind("url(img/city-at-night.jpg)")
);

poemCont.addEventListener("mouseout", backOpacity.bind("none"));

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

// Objects practice

/*

const myObject = {
  name: "Ian",
  currentJob: "Customer Service",
};

const expectations = {
  mainGoal: "Earn more money",
  howToAchive: "Change of carrer",
  ultimateGoal: "Become an athlete",
};
expectations.car = "Porsche 911";

const goalsFusion = Object.assign({}, myObject, expectations);

goalsFusion.mainGoal = "Become an athlete";
goalsFusion.ultimateGoal = "Earn a lot of money while enjoying what I do";

myObject.currentJob = "Developer";
console.log(myObject, "myObj");
console.log(goalsFusion, "fusion");

*/

// Advance DOM in practice

// Gets the entire HTML (head and body)
console.log(document.documentElement);

// Gets all elements with the same tag name (HTML collection)
console.log(document.getElementsByTagName("a"));

// Gets all elements with the same class name (HTML collection)
console.log(document.getElementsByClassName("nav-links"));
