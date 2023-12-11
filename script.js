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

// Objects practice

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
