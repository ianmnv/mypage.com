// //// CONTACT INFO
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

// //// HEADER

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

////// MOVING TO SECTIONS

const nav = document.querySelector(".nav");

nav.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav-links")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

////// Changing opacity for anchors when hover
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

////// STICKY NAVEGATION

const header = document.querySelector("header");

const s2Callback = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky-nav");
  else nav.classList.remove("sticky-nav");
};

const objOpts = {
  root: null,
  threshold: 0,
};

const observer = new IntersectionObserver(s2Callback, objOpts);

observer.observe(header);
