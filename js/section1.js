"use strict";

// //// SECTION 1 STORY

// Hovering my img
const imgIan = document.querySelector(".imgIan");
let me;

const imgCallB = function () {
  me = document.createElement("p");
  me.textContent = "Yep, that's me 😏";
  me.classList.add("img-text");
  imgIan.before(me);
};

imgIan.addEventListener("mouseover", imgCallB);
imgIan.addEventListener("mouseout", () => me.remove());

////// SLIDER
const btnRight = document.getElementById("btn-right");
const btnLeft = document.getElementById("btn-left");

const sliders = document.querySelectorAll(".slide");

let curSlide = 0;
const maxSlides = sliders.length - 1;

const goToSlide = function (slide) {
  sliders.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
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

//// MAP CLASS
const locationCont = document.querySelector(".s1-slide-child");
const citysInfo = {
  0: [
    `Mexico City is by far my favorite city because here my whole childhood happen, my family is here and 90% of my friends, 
  also in Mexico City you will never get bored since there's a lot to do here and because you'll find amazing food very easy 
  but since it's a very popular city it can also be chaotic because through time a lot of people have arrived.`,
    [[19.3753973, -99.1366977]],
  ],
  1: [
    `1. I find Quintana Roo top-notch for having beautiful beaches, 
    beautiful places to go like Cancun, Holbox, Tulum and a lot of party. <br> <br> 
  2. In second place we have Oaxaca [mostly all beaches] because this state is rich in culture, 
  festivals and food here is just amazing, many of famous dishes in Mexico come from Oaxaca. <br> <br>
  3. Puebla also enters in this list for the colorful city it has, 
  for the delicious food you can find here and the friendly people same as in all places in Mexico (almost 😬). <br> <br>
  4. In Jalisco, we have Puerto Vallarta and Manzanillo for having great weather, 
  great beaches as well and fun atmosphere and of course great food as well.`,
    [
      [21.1213783, -86.9388046],
      [15.8748973, -97.0976379],
      [19.0400289, -98.2745829],
      [20.6408555, -105.2655067],
    ],
  ],
  2: [
    `Vancouver is just an amazing, modern, clean, filled with nature city, I liked every day living there, 
    was there for 4.3 years but in my personal opinion it also has a lot
  to build like culture and local food, 
  I say this because since most of the people in there are from different countries there's no really culture and it's clear as the air it is missing, 
  probably many people will disagree with me but that's my personal opinion
  on Van, I'm not saying it's not amazing but in countries there's always that is something missing even in Mexico; 
  loved the parks, the city but since I come from a huge city, Vancouver was kinda empty for me lol.`,
    [[49.2577062, -123.2063038]],
  ],
  3: [
    `1. Whistler 😍: Small town but with an incredible views from the top of the mountians, 
  for skiing and mountain bike is just perfect (risky, but perfect) with delicious restaurants around (only went to 3 tho). <br> <br>
  2. North Vancouver also has a beautiful view to the city 
  and mostly in summer there are a lot of festivals and events in that area which makes it perfect to socialize. <br> <br>
  3. Victoria is also another super small city but very beautiful everywhere you walk or go, mostly all Vancouver island is very pretty. 
  There are also very good restaurants but the one that showed up the most was 'Milestones', kinda miss that restaurant.`,
    [
      [50.1041188, -123.0839148],
      [49.3151148, -123.0909845],
      [48.4262073, -123.379822],
    ],
  ],
};

class Map {
  #map;
  #countriesCont;
  #cities;
  mxCity;
  caCity;
  markers = [];
  currentMarker;

  constructor(citiesInfo) {
    this._displayMapInfo();
    this.#countriesCont.addEventListener("click", this._countryBtns.bind(this));
    this.citiesInfo = citiesInfo;
    this.mxCity.addEventListener("click", this.callBCities.bind(this));
    this.caCity.addEventListener("click", this.callBCities.bind(this));
    this._getLocation();
  }

  // MAP INFO
  _displayMapInfo() {
    locationCont.innerHTML = `
    <h1 class='map-title'>LOCATIONS:</h1>
    
    <div class='map-div'>
      <div class='map-countries'>
        <button class='map-btn-country' data-country='mx'>MEXICO</button>
        <button class='map-btn-country' data-country='ca'>CANADA</button>
      </div>
    
      <div class='map-cities map-city-mx hidden'>
        <button class='map-btn-mx map-btn-city' data-city='0'>CDMX</button>
        <button class='map-btn-mx map-btn-city' data-city='1'>Favorite places</button>
      </div> 
    
      <div class='map-cities map-city-ca hidden'>
        <button class='map-btn-ca map-btn-city' data-city='2'>Vancouver</button>
        <button class='map-btn-ca map-btn-city' data-city='3'>Favorite places</button>
      </div>
    
      <div id='map-info'></div>
    </div>
    `;

    this.#countriesCont = document.querySelector(".map-countries");
    this.#cities = document.querySelectorAll(".map-cities");

    this.mxCity = document.querySelector(".map-city-mx");
    this.caCity = document.querySelector(".map-city-ca");
  }

  _countryBtns(e) {
    if (!e.target.classList.contains("map-btn-country")) return;

    this.#cities.forEach((c) => c.classList.add("hidden"));

    document
      .querySelectorAll(".map-btn-country")
      .forEach((c) => c.classList.remove("map-active"));

    const target = e.target;
    const country = target.dataset.country;

    document.querySelector(`.map-city-${country}`).classList.remove("hidden");
    target.classList.add("map-active");
  }

  // Display city info
  callBCities(e) {
    if (!e.target.classList.contains("map-btn-city")) return;

    const target = e.target;

    document
      .querySelectorAll(".map-btn-city")
      .forEach((c) => c.classList.remove("map-active"));
    target.classList.add("map-active");

    const mapDiv = document.getElementById("map-info");
    mapDiv.innerHTML = "";

    const dataCity = target.dataset.city;

    const cityInfos = `<p>${this.citiesInfo[dataCity][0]}</p>`;
    mapDiv.innerHTML = cityInfos;

    //// Display marker on map

    /// cdmx
    // [19.3753973, -99.1366977]

    /// Quintana Roo, Oaxaca, Puebla, Puerto Vallarta
    // [21.1213783,-86.9388046], [15.8748973,-97.0976379], [19.0400289,-98.2745829], [20.6408555,-105.2655067]

    /// Vancouver
    // [49.2577062,-123.2063038]

    /// Whistler, North Vancouver, Victoria
    // [50.1041188,-123.0839148], [49.3151148,-123.0909845], [48.4262073,-123.379822]

    this.removeMarker();

    const lats = [];
    const lngs = [];

    this.citiesInfo[dataCity][1].forEach((arr, i) => {
      lats.push(arr[0]);
      lngs.push(arr[1]);

      const [lat, lng] = arr;
      this.addMarker([lat, lng], i + 1 + "");
    });

    const maxLat = Math.max(...lats);
    const maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats);
    const minLng = Math.min(...lngs);

    this.#map
      .fitBounds(
        [
          [maxLat, maxLng],
          [minLat, minLng],
        ],
        { padding: [100, 100] }
      )
      .setZoom(6);
  }

  ////// MAP ITSELF
  // Reverse geocoding `https://geocode.xyz/${lat},${lng}?geoit=json`

  _getLocation() {
    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        alert("Can't load map");
      }
    );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];

    this.#map = L.map("map").setView(coords, 6);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.#map);
  }

  addMarker(coords, msg) {
    this.currentMarker = L.marker(coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          minWidth: 10,
          autoClose: false,
          className: "map-popup",
        })
      )
      .setPopupContent(msg)
      .openPopup();

    this.markers.push(this.currentMarker);
  }

  removeMarker() {
    this.markers.forEach((marker) => {
      if (marker) this.#map.removeLayer(marker);
    });
  }
}

const newMap = new Map(citysInfo);
