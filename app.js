




let date = new Date();
let daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let minutesOfHour = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "60"
];

let today = date.getDay();
let currentHour = date.getHours();
let currentMinutes = date.getMinutes();
let currentDay = daysOfTheWeek[today];
let minuteInstant = minutesOfHour[currentMinutes];
let currentTime = document.querySelector("#currentDay-hour");

currentTime.innerHTML = `${currentDay} ${currentHour}: ${minuteInstant} minutes`;




function displayWeatherCondition(response) {
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#number-celsius").innerHTML = Math.round(
    response.data.main.temp
  );

  
}


let buttonSearch = document.querySelector("#searchButton");

buttonSearch.addEventListener("click", searchButtonClicked);


function searchButtonClicked(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "bd652b91d2fb3900a40f02b4f3dd58fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let currentButton = document.querySelector("#currentButton");

function currentButtonClicked(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

currentButton.addEventListener("click", currentButtonClicked);

function searchLocation(position) {
  let apiKey = "bd652b91d2fb3900a40f02b4f3dd58fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}
searchCity("New York");