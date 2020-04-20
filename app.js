const API_ID = '2f95ca5293897235cbb0bfaf45a1e734';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_ID}`;
const API_ICON = 'https://openweathermap.org/img/wn/';
const DEFAULT_CITY = 'khulna,bd';

const mainImg = document.getElementById('main-img');
const temp = document.getElementById('temp');
const city = document.getElementById('city');
const description = document.getElementById('description');
const search = document.getElementById('search');

window.onload = () => {
  navigator.geolocation.getCurrentPosition(
    (success) => {
      getWeatherData(null, success.coords);
    },
    (error) => {
      getWeatherData();
    }
  );
  search.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      if (e.target.value) {
        getWeatherData(e.target.value);
      } else {
        alert('Please enter valid city name');
      }
      e.target.value = '';
    }
  });
};

getWeatherData = (city = DEFAULT_CITY, coords) => {
  let url = API_URL;

  city === null
    ? (url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}`)
    : (url = `${url}&q=${city}`);

  axios
    .get(url)
    .then(({ data }) => {
      let weather = {
        name: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        humidity: data.main.humidity,
        icon: data.weather[0].icon,
        description: data.weather[0].description,
        windSpd: data.wind.speed,
      };

      SetWeatherData(weather);
    })
    .catch((e) => {
      console.log(e);
    });
};

SetWeatherData = (weather) => {
  mainImg.src = `${API_ICON}${weather.icon}.png`;
  temp.innerHTML = weather.temp;
  city.innerHTML = `${weather.name} , ${weather.country}`;
  description.innerHTML = weather.description;
};
