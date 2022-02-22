
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
  let date = now.getDate();
  let day = week[now.getDay()];
  let mth = month[now.getMonth()];
  let year = now.getFullYear();
  let time = now.toLocaleString("it-IT", {
    hour:"numeric",
    minute: "numeric",
  })
  ;


  let currentDay = document.querySelector("#day");
  let currentDate = document.querySelector("#date");
  let currentTime = document.querySelector("#time");
  

  currentDay.innerHTML = day;
  currentDate.innerHTML = `${date} ${mth} ${year}`;
  currentTime.innerHTML = time;
}

let now = new Date();
getDate(now);

function formatDay(timestamp){
  let date = new Date(timestamp *1000);
  let day = date.getDay();
  let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];


return days[day];
}


function showCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${inputCity.value}`;
  let apiKey = "be8656293d91357ab62994903e952e45";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`;
  axios.get(urlApi).then(showWeather);
}

function displayForecast(response){
  let forecast = response.data.daily;





let forecastElement = document.querySelector("#forecast");
let forecastHTML =`<div class="row">`;

forecast.forEach(function(forecastDay, index)
{

  if (index < 6 ){
forecastHTML = forecastHTML + `
              <div class="col-2">
                ${formatDay(forecastDay.dt)}
                <div>
                <img
                  src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                  alt=""width="42"
                /></div>
                <div class="forecast-temperature">
                  <span class="forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
                  <span class="forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
                </div>
              </div>
            `;}
})

forecastHTML=forecastHTML+`</div>`;

forecastElement.innerHTML=forecastHTML;
}




function getForecast(coordinates){
  console.log(coordinates);
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
console.log(apiUrl);
axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
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
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
celsiusTemperature = response.data.main.temp
getForecast(response.data.coord);

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



function displayCelsiusTemperature (event){
  event.preventDefault();
  let celsiusElement = document.querySelector("#current-temp");
  celsiusElement.innerHTML = Math.round(celsiusTemperature);

}


