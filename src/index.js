//weather
let celsiusTemperature = null;

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
  console.log(response.data);
}

//search engine
let apiKey = "5cd3854388db274e217fd69a4769c1e5";

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#searchingCity");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios(apiUrl).then(showData);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios(apiUrl).then(showData);
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
