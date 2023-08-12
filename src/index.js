let now = new Date();

let currentDate = document.querySelector(".currentDate");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

currentDate.innerHTML = `${day}, ${month} ${date} ${hours}:${minutes}`;

//
function searchPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `89d5c75b01ad14d48730b8ddfc9ae984`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherConditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

//
function displayWeatherConditions(response) {
  let iconElement = document.querySelector("#icon");
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#maxTemp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#minTemp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#sunrise").innerHTML = response.data.sys.sunrise;
  document.querySelector("#sunset").innerHTML = response.data.sys.sunset;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  console.log(response.data);
}

function citySearch(event) {
  event.preventDefault();
  let apiKey = `89d5c75b01ad14d48730b8ddfc9ae984`;
  let city = document.querySelector(`#city-search`).value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySearch);

//
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//
let currentLocationButton = document.querySelector("#homePin");
currentLocationButton.addEventListener("click", getCurrentLocation);
