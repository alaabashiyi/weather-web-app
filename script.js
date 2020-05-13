const searchBtn = document.querySelector(".search_btn");
const searchText = document.querySelector(".search");
let globalData;

// gets data from weatherstack API
async function getData(cityName) {
  const response = await fetch(
    `http://api.weatherstack.com/current?access_key=a87447e5eb839c5122024c73c89902f6&query=${cityName}`
  );
  const data = await response.json().then((dat) => {
    return dat;
  });

  globalData = data;
  setLocationInfo();
}

// sets all needed data in it's place
function setLocationInfo() {
  [...document.querySelectorAll(".container span")].forEach((li) => {
    let prop = li.getAttribute("class");
    let type = li.getAttribute("data-type");

    li.innerText = globalData[type][prop];
  });
  skyChanges();

  globalData = "";
}

// changes the sky look according to the weather status
function skyChanges() {
  if (globalData.current["is_day"] == "no") {
    document.querySelector(".sky").style.background = "var(--night-sky)";

    document.querySelector(
      ".weather-icon"
    ).src = `./icons/${globalData.current.weather_code}-night.png`;
    document.querySelector(".is_day").innerText = "Night";
  } else if (globalData.current["is_day"] == "yes") {
    document.querySelector(".sky").style.background = "var(--day-sky)";

    document.querySelector(
      ".weather-icon"
    ).src = `../icons/${globalData.current.weather_code}.png`;
    document.querySelector(".is_day").innerText = "Day";
  }
}

// Shortcut for event listeners
function startSearch() {
  getData(searchText.value);
  searchText.value = "";
  document.querySelector("body").classList.remove("show-nav");
}

// search event listener
searchBtn.addEventListener("click", startSearch);

document.querySelector("#search").addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    startSearch();
  }
});

// menu event listener
document.querySelector("#toggle").addEventListener("click", (e) => {
  document.querySelector("body").classList.toggle("show-nav");
});

getData("Rio");
