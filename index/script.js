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

// //// SECTION 1 STORY

// Hovering my img
const imgIan = document.querySelector(".imgIan");

const imgCallB = function () {
  alert("Yep, that's me 😏");
  imgIan.removeEventListener("mouseenter", imgCallB);
};

imgIan.addEventListener("mouseenter", imgCallB);

////// SLIDER
const btnRight = document.getElementById("btn-right");
const btnLeft = document.getElementById("btn-left");

const sliders = document.querySelectorAll(".slide");

let curSlide = 0;
const maxSlides = sliders.length - 1;

const goToSlide = function (slide) {
  sliders.forEach((s, i) => {
    s.style.transform = `translateX(${120 * (i - slide)}%)`;
  });
};

goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlides) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

const previousSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlides;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", previousSlide);

// SLIDER ARROW BTNS
document.addEventListener("keydown", function (e) {
  e.key === "ArrowRight" && nextSlide();
  e.key === "ArrowLeft" && previousSlide();
});

// LOCATIONS

const locationCont = document.querySelector(".s1-slide-child");
locationCont.innerHTML = `
<h1 class='map-title'>LOCATIONS:</h1>

<div class='map-div'>
  <div class='map-countries'>
    <button class='map-btn-country' data-country='mx'>MEXICO</button>
    <button class='map-btn-country' data-country='ca'>CANADA</button>
  </div>

  <div class='map-cities map-city-mx'>
    <button class='map-btn-mx map-btn-city' data-city='0'>CDMX</button>
    <button class='map-btn-mx map-btn-city' data-city='1'>Beautiful cities</button>
  </div> 

  <div class='map-cities map-city-ca'>
    <button class='map-btn-ca map-btn-city' data-city='3'>Vancouver</button>
    <button class='map-btn-ca map-btn-city' data-city='4'>Favorite places</button>
  </div>

  <div id='map-info'></div>
</div>
`;

const countriesCont = document.querySelector(".map-countries");
const cities = document.querySelectorAll(".map-cities");

cities.forEach((c) => c.classList.add("hidden"));

countriesCont.addEventListener("click", function (e) {
  if (!e.target.classList.contains("map-btn-country")) return;

  cities.forEach((c) => c.classList.add("hidden"));
  document
    .querySelectorAll(".map-btn-country")
    .forEach((c) => c.classList.remove("map-active"));

  const target = e.target;
  const country = target.dataset.country;

  document.querySelector(`.map-city-${country}`).classList.remove("hidden");
  target.classList.add("map-active");
});

const citysInfo = {
  0: `Mexico City is by far my favorite city because here my whole childhood happen, my family is here and 90% of my friends, 
  also in Mexico City you will never get bored since there's a lot to do here 
  but since it's a very popular city it can also be chaotic because through time a lot of time have arrived.`,
  1: `In my first place of my favorite places in Mexico, I find Quintana Roo top-notch for having beautiful beaches, beautiful places to go like Cancun, Holbox, Tulum and a lot of party`,
};

const callBCities = function (e) {
  const target = e.target;

  document
    .querySelectorAll(".map-btn-city")
    .forEach((c) => c.classList.remove("map-active"));
  target.classList.add("map-active");

  const mapDiv = document.getElementById("map-info");
  mapDiv.innerHTML = "";

  const infoEl = document.createElement("div");
  infoEl.innerHTML = `<p>${citysInfo[0]}</p>`;
  infoEl.style.fontSize = "2rem";
  infoEl.style.padding = "2rem";
  mapDiv.style.width = "100%";
  mapDiv.append(infoEl);
};

const mxCity = document.querySelector(".map-city-mx");
const caCity = document.querySelector(".map-city-ca");

mxCity.addEventListener("click", callBCities);
caCity.addEventListener("click", callBCities);

////// MAP

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      const coords = [latitude, longitude];

      const map = L.map("map").setView(coords, 13);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup("A pretty CSS popup.<br> Easily customizable.")
        .openPopup();
    },
    function () {
      alert("Can't get location");
    }
  );
}

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
