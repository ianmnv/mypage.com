////// CONTACT INFO
// const info = document.querySelector(".contact-info");
// const overLay = document.querySelector(".overlay");

// info.classList.add("hidden");

// document
//   .querySelector(".contact-button")
//   .addEventListener("click", function () {
//     info.classList.remove("hidden");
//     overLay.classList.remove("hidden");
//   });

// const closeInfo = function () {
//   info.classList.add("hidden");
//   overLay.classList.add("hidden");
// };

// document.querySelector(".close-info").addEventListener("click", closeInfo);

// overLay.addEventListener("click", closeInfo);

////// CLOCK

const clock = document.querySelector(".clock");

setInterval(() => {
  const now = new Date();

  clock.textContent = new Intl.DateTimeFormat(navigator.language, {
    timeStyle: "short",
  }).format(now);
}, 1000);

////// POEM

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

// //// MOVING TO SECTIONS

const nav = document.querySelector(".nav");

nav.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav-links")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// //// Changing opacity for anchors when hover
const checkingOp = function (e) {
  if (e.target.classList.contains("nav-links")) {
    const currentLink = e.target;
    const siblings = currentLink.closest(".nav").querySelectorAll(".nav-links");

    siblings.forEach((el) => {
      if (el !== currentLink) {
        el.style.opacity = this;
      }
    });
  }
};

nav.addEventListener("mouseover", checkingOp.bind(0.7));
nav.addEventListener("mouseout", checkingOp.bind(1));

// Hovering my img
const imgIan = document.querySelector(".imgIan");

const imgCallB = function () {
  alert("Yep, that's me 😏");
  imgIan.removeEventListener("mouseenter", imgCallB);
};

imgIan.addEventListener("mouseenter", imgCallB);

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
// console.log(document.documentElement);

// // Gets all elements with the same tag name (HTML collection)
// console.log(document.getElementsByTagName("a"));

// // Gets all elements with the same class name (HTML collection)
// console.log(document.getElementsByClassName("nav-links"));
