const BTN = document.querySelector('.material-symbols-outlined');
const InputSection = document.getElementById('searchVal');
const Wrapper = document.querySelector('.container');
const Container = document.querySelector('.wrapper');
const weatherDetails = document.createElement('div');
const Description = document.createElement('p');
const Img = document.createElement('img');
weatherDetails.classList.add('des-img');
Img.classList.add('icon');

const searchCity = (query) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=5ac9ee1e2d2df30507ea5dfca1419a9c&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      Container.innerHTML = `
      <h3 class="city">Weather in ${response.name}</h3>
      <div class="country-details">
          <small class="country"><b>Country:</b> ${response.sys.country}</small>
          <small class="timezone"><b>Timezone:</b> ${response.timezone}</small>
      </div>
      <div class="firstContent">
           <h4>${response.main.temp}&deg;C</h4>
      </div>
      <div>
          <ul class="more-details">
          <li><b>Max-Temp:</b> ${response.main.temp_max} &deg;C</li>
          <li><b>Min-Temp:</b> ${response.main.temp_min} &deg;C</li>
          <li><b>Humidity:</b> ${response.main.humidity} %</li>
          <li><b>Wind Speed:</b> ${response.wind.speed} meter/sec</li>
          <li><b>Pressure:</b> ${response.main.pressure} hPa</li>
          </ul>
      </div>`;
      // eslint-disable-next-line array-callback-return
      response.weather.map((data) => {
        Img.src = ` http://openweathermap.org/img/wn/${data.icon}.png`;
        Description.innerHTML = data.description;
      });
      weatherDetails.append(Img, Description);
      Container.append(weatherDetails);
    });
};

const clearInput = () => {
  InputSection.value = '';
};

window.onload = () => {
  Container.style.display = 'none';
  Wrapper.style.display = 'block';
  const InputVal = document.getElementById('searchVal');
  BTN.addEventListener('click', (e) => {
    e.preventDefault();
    searchCity(InputVal.value);
    Container.style.display = 'block';
    Wrapper.style.display = '';
    clearInput();
  });
};
