const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`;
const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");

const getWeather = async (city) => {
  weather.innerHTML = `<h2> Loading... <h2>`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  return showWeather(data);
};

const showWeather = (data) => {
  if (data.cod == "404") {
    weather.innerHTML = `<h2> City Not Found <h2>`;
    return;
  }
  weather.innerHTML = `
        <section class="data">
        <div class="col1">
          <div class="img">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="img" />
          </div>
          <div class="">
            <h2>${data.main.temp} ℃</h2>
            <h4>${data.weather[0].main}</h4>
          </div>
        </div>
        <div class="col2">
          <div class="col">
            <h3>Wind</h3>
            <h4>${data.wind.speed} km/h</h4>
          </div>
          <div class="col">
            <h3>Humidity</h3>
            <h4>${data.main.humidity} %</h4>
          </div>
          <div class="col">
            <h3>Air Pressure</h3>
            <h4>${data.main.pressure} hPa</h4>
          </div>
        </div>
      </section>
    `;
};

form.addEventListener("submit", function (event) {
  getWeather(search.value);
  event.preventDefault();
});
