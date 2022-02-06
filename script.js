function getDate(now) {
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let month = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let day = week[now.getDay()];
  let day1 = week[now.getDay()+1];
  let day2 = week[now.getDay()+2];
  let day3 = week[now.getDay()-4];
  let day4 = week[now.getDay()-3];
  let day5 = week[now.getDay()-2];
  
  
  let date = now.getDate();
  let mth = month[now.getMonth()];
  let year = now.getFullYear();
  let time = now.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });


  let currentDay = document.querySelector("#day");
  let currentDate = document.querySelector("#date");
  let currentTime = document.querySelector("#time");
  let dayOne = document.querySelector("#day1");
  let dayTwo = document.querySelector("#day2");
  let dayThree = document.querySelector("#day3");
  let dayFour = document.querySelector("#day4");
  let dayFive = document.querySelector("#day5");
  dayOne.innerHTML = day1;
  dayTwo.innerHTML = day2;
  dayThree.innerHTML = day3;
  dayFour.innerHTML = day4;
  dayFive.innerHTML = day5;

  currentDay.innerHTML = day;
  currentDate.innerHTML = `${date} ${mth} ${year}`;
  currentTime.innerHTML = time;
}

let now = new Date();
getDate(now);

function showCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${inputCity.value}`;
  let apiKey = "be8656293d91357ab62994903e952e45";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`;
  axios.get(urlApi).then(showWeather);
}

function showWeather(response) {
  console.log(response);
  let temp = Math.round(response.data.main.temp);
  let inputTemp = document.querySelector("#current-temp");
  inputTemp.innerHTML = `${temp}`;
  let humidity = response.data.main.humidity;
  let humidityValue = document.querySelector("#humidity-value");
  humidityValue.innerHTML = `${humidity}%`;
  let wind = Math.round(response.data.wind.speed * 3.6);
  let windValue = document.querySelector("#wind-value");
  windValue.innerHTML = `${wind} km/h`;
  document.querySelector("#current-city").innerHTML = response.data.name;
}

let search = document.querySelector("#search-button");
search.addEventListener("click", showCity);

function searchPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let current = document.querySelector("#current-button");
current.addEventListener("click", getCurrentPosition);

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  let defaultCity = document.querySelector("#current-city");
  console.log(defaultCity);
}
searchCity("Milan");



let cityName ="Milan"
let myKey = "be8656293d91357ab62994903e952e45";
let apiFiveDayLink =`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${myKey}`;





