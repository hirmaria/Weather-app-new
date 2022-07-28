//weather

function showTemperature(response) {
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name + ", " + response.data.sys.country;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
}

let apiKey = "5cd3854388db274e217fd69a4769c1e5";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;

axios(apiUrl).then(showTemperature);

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
day.innerHTML = days[now.getDay()];

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
currentDate.innerHTML = sentence;
