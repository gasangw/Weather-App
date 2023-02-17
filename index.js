const BTN = document.querySelector('button');
const Container = document.querySelector('.wrapper');
const MainContainer = document.querySelector('.details');
const weatherDetails = document.createElement('div');
const Description = document.createElement('p');
const Img = document.createElement('p');

const searchCity = (query) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=5ac9ee1e2d2df30507ea5dfca1419a9c`;
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
    //   console.log(response);
      Container.innerHTML = `
      <h2 class="city">${response.name}</h2>
      <div class="country-details">
          <small class="country">Country: ${response.sys.country}</small>
          <small class="timezone">Timezone: ${response.timezone}</small>
      </div>
      <div class="more-details">
          <ul>
              <li>Max-Temp: ${response.main.temp_max}</li>
              <li>Min-Temp: ${response.main.temp_min}</li>
              <li>Humidity: ${response.main.humidity}</li>
          </ul>
      `;
      // eslint-disable-next-line array-callback-return
      response.weather.map((data) => {
        Img.innerHTML = data.icon;
        Description.innerHTML = data.description;
      });
      weatherDetails.append(Description, Img);
      Container.appendChild(weatherDetails);
      MainContainer.appendChild(Container);
    });
};

window.onload = () => {
  const InputVal = document.getElementById('searchVal');
  BTN.addEventListener('click', (e) => {
    e.preventDefault();
    searchCity(InputVal.value);
  });
};
