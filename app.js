


function displayWeather(data) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = data.name;
  temperatureElement.innerHTML = Math.round(data.main.temp) + "°C";
  dateElement.innerHTML = formatDate(data.dt * 1000);

   let iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  iconElement.setAttribute("src", iconUrl);
  iconElement.setAttribute("alt", data.weather[0].description);

  
  getForecast(data.coord);
}


function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `
        <div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="" width="42" />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}°</span>
            <span class="weather-forecast-temperature-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>
        </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}


function getWeather(city) {
  let apiKey = "001bc651977f4b024af4d84282b0f02a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
   
  axios.get(apiUrl).then(function (response) {
    displayWeather(response.data);
  });
}


function getForecast(coordinates) {
  let apiKey = "001bc651977f4b024af4d84282b0f02a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


let cityList = document.querySelector("#cityList");
cityList.addEventListener("click", function (event) {
  event.preventDefault();
  let selectedCity = event.target.textContent;
  getWeather(selectedCity);
});


let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", function () {
  let cityName = document.querySelector("#city-input").value;
  getWeather(cityName);
});

getWeather("Kigali");

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", function () {
  
  navigator.geolocation.getCurrentPosition(function (position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "001bc651977f4b024af4d84282b0f02a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(function (response) {
      displayWeather(response.data);
    });
  });
});




function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}


function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

