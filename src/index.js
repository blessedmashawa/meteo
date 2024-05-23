async function refreshWeather(response) {
  const { temperature, city, time, condition, wind } = response.data;
  const temperatureElement = document.querySelector("#temperature");
  const cityElement = document.querySelector("#city");
  const descriptionElement = document.querySelector("#description");
  const humidityElement = document.querySelector("#humidity");
  const windSpeedElement = document.querySelector("#wind-speed");
  const timeElement = document.querySelector("#time");
  const iconElement = document.querySelector("#icon");

  cityElement.innerHTML = city;
  timeElement.innerHTML = formatDate(new Date(time * 1000));
  descriptionElement.innerHTML = condition.description;
  humidityElement.innerHTML = ${temperature.humidity}%;
  windSpeedElement.innerHTML = ${wind.speed}km/h;
  temperatureElement.innerHTML = Math.round(temperature.current);
  iconElement.innerHTML = <img src="${condition.icon_url}" class="weather-app-icon" />;
}

function formatDate(date) {
  const options = { weekday: 'long', hour: 'numeric', minute: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

async function searchCity(city) {
  const apiKey = "1c939d2cc33o50d8fct040a48f51e6bd";
  const apiUrl = https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey};

  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      refreshWeather(data);
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function handleSearchSubmit(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

const searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
