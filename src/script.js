//current time
let now = new Date();

function formattedDate(now) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
  let dayIndex = now.getDay();
  let monthIndex = now.getMonth();

  return `${days[dayIndex]} 
  ${months[monthIndex]} ${now.getDate()}`;
}

function formattedTime(now) {
  function fullMinutes() {
    if (now.getMinutes() < 10) {
      return `0${now.getMinutes()}`;
    }
    return now.getMinutes();
  }

  function fullHours() {
    if (now.getHours() < 10) {
      return `0${now.getHours()}`;
    }
    return now.getHours();
  }

  return `${fullHours()}:${fullMinutes()}`;
}

let currentDate = document.getElementById("current-date");
currentDate.innerHTML = formattedDate(now);
let currentTime = document.getElementById("current-time");
currentTime.innerHTML = formattedTime(now);

//Onload city weather
window.addEventListener("load", (event) => {
  returnWeatherAPI("London");
});

// City search input
function changeData(event) {
  event.preventDefault();
  let searchedCityInput = document.getElementById("search-input").value;
  returnWeatherAPI(searchedCityInput);
}

function returnWeatherAPI(searchedCity) {
  let apiKey = "a96f5721c6287ed7127e00501efd3d4f";
  let city = searchedCity;
  let tempUnit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=${tempUnit}`;
  axios.get(apiUrl).then(infoUpdate);
}

function infoUpdate(response) {
  changeMainCity(response);
  changeMainTemperature(response);
  changeWeatherDescription(response);
  changeHumidityInfo(response);
  changeWindSpeedInfo(response);
}

function changeMainCity(response) {
  let cityHeader = document.getElementById("main-city");
  let cityName = `${response.data.name}, ${response.data.sys.country}`;
  cityHeader.innerHTML = `${cityName}`;
}

function changeMainTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector(".cTemp");
  mainTemp.innerHTML = `${temp}`;
}

function changeWeatherDescription(response) {
  let weatherDescription = response.data.weather[0].main;
  let weatherDescriptionElement = document.getElementById(
    "weather-description"
  );
  weatherDescriptionElement.innerHTML = `${weatherDescription}`;
}

function changeHumidityInfo(response) {
  let humidityInfo = response.data.main.humidity;
  let humidityInfoElement = document.getElementById("humidity-info");
  humidityInfoElement.innerHTML = `Humidity: ${humidityInfo}%`;
}
function changeWindSpeedInfo(response) {
  let windSpeedInfo = Math.round(3.6 * response.data.wind.speed);
  let windSpeedInfoElement = document.getElementById("wind-speed-info");
  windSpeedInfoElement.innerHTML = `Wind: ${windSpeedInfo}km/h`;
}

let searchForm = document.getElementById("search-city");
searchForm.addEventListener("submit", changeData);

////Temp C/F conversion
function tempCheck() {
  if (document.querySelector(".cTemp")) {
    changeHeaderCtoF();
  } else {
    changeHeaderFtoC();
  }
}

function convertTemperatureCtoF() {
  let cTempString = document.querySelector(".cTemp").innerText;
  let cTemp = parseInt(cTempString, 10);
  let fTemp = Math.round((cTemp * 9) / 5 + 32);
  return fTemp;
}

function convertTemperatureFtoC() {
  let fTempString = document.querySelector(".fTemp").innerText;
  let fTemp = parseInt(fTempString, 10);
  let cTemp = Math.round(((fTemp - 32) * 5) / 9);
  return cTemp;
}

// function changeHeaderCtoF() {
//   let fTemp = convertTemperatureCtoF();
//   let h2 = document.querySelector("h2");
//   h2.innerHTML = `<span class = "fTemp"> ${fTemp} </span> °F`;
//   convertTemperatureButton.innerHTML = "°C";
// }
// function changeHeaderFtoC() {
//   let cTemp = convertTemperatureFtoC();
//   let h2 = document.querySelector("h2");
//   h2.innerHTML = `<span class = "cTemp"> ${cTemp} </span> °C`;
//   convertTemperatureButton.innerHTML = "°F";
// }

function changeHeaderCtoF() {
  let fTemp = convertTemperatureCtoF();
  let mainCityTemp = document.getElementById("main-city-temp");
  mainCityTemp.innerHTML = `<span class = "fTemp"> ${fTemp} </span> °F`;
  convertTemperatureButton.innerHTML = "°C";
}

function changeHeaderFtoC() {
  let cTemp = convertTemperatureFtoC();
  let mainCityTemp = document.getElementById("main-city-temp");
  mainCityTemp.innerHTML = `<span class = "cTemp"> ${cTemp} </span> °C`;
  convertTemperatureButton.innerHTML = "°F";
}

let convertTemperatureButton = document.getElementById(
  "temperature-unit-button"
);
convertTemperatureButton.addEventListener("click", tempCheck);

// Current Geolocation
function getCurrentGeoLocationWeather(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "a96f5721c6287ed7127e00501efd3d4f";
  let tempUnits = "metric";

  let currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${tempUnits}`;

  axios.get(currentWeatherApiUrl).then(infoUpdate);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getCurrentGeoLocationWeather);
}

let currentLocationButton = document.getElementById("current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
