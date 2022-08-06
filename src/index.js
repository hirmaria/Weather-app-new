//forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let days = response.data.daily;

  let forecastHTML = `<div class="row">`;
  days.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
<div class="col-2">
          <div class="weater-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt="."
            width="42px"
          />
          <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}°</span>
            <span class="weather-forecast-temperature-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>
        </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//weather
let celsiusTemperature = null;

function getForecast(coordinates) {
  let apiKey = "5cd3854388db274e217fd69a4769c1e5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios(apiUrl).then(displayForecast);
}

function showData(response) {
  let tempElement = document.querySelector("#temp");
  celsiusTemperature = response.data.main.temp;
  tempElement.innerHTML = Math.round(celsiusTemperature);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name + ", " + response.data.sys.country;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;

  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

//search engine

function search(city) {
  let apiKey = "5cd3854388db274e217fd69a4769c1e5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios(apiUrl).then(showData);
}
function searchCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#searchingCity");
  search(cityElement.value);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5cd3854388db274e217fd69a4769c1e5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showData);
}

function searchGeo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

//if searching the city

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

//if getting geolocation

let getGeo = document.querySelector("#getGeo");
getGeo.addEventListener("click", searchGeo);

//date
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let day = document.querySelector("#day");
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = "0" + hour;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = "0" + minute;
}
let sentence = month + ", " + date + " " + hour + ":" + minute;
let currentDate = document.querySelector("#date");

day.innerHTML = days[now.getDay()];
currentDate.innerHTML = sentence;

//unit conversion

function showCelsius(event) {
  event.preventDefault();
  let tempCelsius = document.querySelector("#temp");
  tempCelsius.innerHTML = Math.round(celsiusTemperature);
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

function showFahrenheit(event) {
  event.preventDefault();
  let tempFahrenheit = document.querySelector("#temp");
  tempFahrenheit.innerHTML = Math.round(celsiusTemperature * 1.8 + 32);
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

//*1.8+32
//-32)/1.8
search("Kyiv");
