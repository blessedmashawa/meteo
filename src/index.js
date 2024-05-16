function showTemprature(response) {
   let temperatureElement = document.querySelector("#temperature");
   let temperature = response.data.temperature.current;
   let cityElement = document.querySelector("#city");
   let descriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windSpeedElement = document.querySelector("#wind-speed");
   let timeElement = document.querySelector("#time");
   let date = new Date(response.data.time * 1000);
   let iconElement = document.querySelector("#emoji");
 
   cityElement.innerHTML = response.data.city;
   timeElement.innerHTML = formatDate(date);
   descriptionElement.innerHTML = response.data.condition.description;
   humidityElement.innerHTML = ${response.data.temperature.humidity}%;
   windSpeedElement.innerHTML = ${response.data.wind.speed}km/h;
   temperatureElement.innerHTML = Math.round(temperature);
   iconElement.innerHTML = <img src="${response.data.condition.icon_url}" class="weather-app-icon" />;
 }
 
 function formatDate(date) {
   let minutes = date.getMinutes();
   let hours = date.getHours();
   let days = [
     "Sunday",
     "Monday",
     "Tuesday",
     "Wednesday",
     "Thursday",
     "Friday",
     "Saturday",
   ];
   let day = days[date.getDay()];
 
   if (minutes < 10) {
     minutes = 0${minutes};
   }
 
   return ${day} ${hours}:${minutes};
 }
 
 function searchCity(city) {
   let apiKey = "1c939d2cc33o50d8fct040a48f51e6bd";
   let apiUrl = https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey};
   axios.get(apiUrl).then(showTemprature);
 }
 
 function handleSearchSubmit(event) {
   event.preventDefault();
   let input = document.querySelector("#searchInput");
 
   searchCity(input.value);
 }
 
 let searchElement = document.querySelector("#search");
 searchElement.addEventListener("submit", handleSearchSubmit);
 
 searchCity("Gweru");
