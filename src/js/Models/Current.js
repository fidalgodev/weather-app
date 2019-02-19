import axios from 'axios';
import { renderError, clearLoader } from '../Views/base';

// Turn navigator.getCurrentPosition in a Promise
function getCurrentLocation(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      ({ code, message }) =>
        reject(
          Object.assign(new Error(message), { name: 'PositionError', code })
        ),
      options
    );
  });
}

// Div of main weather
const parent = document.querySelector('.main__weather');

// Class for the current weather
export default class Current {
  constructor() {
    this.coords = [];
  }

  // Get coords of current location
  async getCoords() {
    try {
      const data = await getCurrentLocation({
        enableHighAccuracy: true,
        maximumAge: 0,
      });
      this.coords = [data.coords.latitude, data.coords.longitude];
    } catch (err) {
      // If error
      // Clear loader
      clearLoader(parent);

      // Render error
      renderError(parent, 'You have to enable the location.');
    }
  }

  // Check if coords are on the object
  coordAvailable() {
    return this.coords.length;
  }

  // Get weather for current location
  async getWeather() {
    const proxy = process.env.PROXY;
    const api = process.env.APIKEY;
    try {
      const res = await axios.get(
        `${proxy}api.openweathermap.org/data/2.5/weather?lat=${
          this.coords[0]
        }&lon=${this.coords[1]}&units=metric&appid=${api}`
      );
      // Save the data on the object
      this.name = res.data.name;
      this.country = res.data.sys.country;
      this.weather = {
        temp: res.data.main.temp,
        temp_max: res.data.main.temp_max,
        temp_min: res.data.main.temp_min,
        name: res.data.weather[0].main,
        icon: res.data.weather[0].icon,
      };
    } catch (err) {
      // Clear loader
      clearLoader(parent);

      // Render error
      renderError(parent, 'There was some problem getting the weather');
    }
  }
}
