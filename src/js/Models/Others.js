import axios from 'axios';

export default class Others {
  constructor() {
    this.others = [];
  }

  async getWeather(id) {
    const proxy = process.env.PROXY;
    const api = process.env.APIKEY;
    const res = await axios.get(
      `${proxy}api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${api}`
    );
    const weather = {
      id: res.data.id,
      name: res.data.name,
      country: res.data.sys.country,
      weather: {
        temp: Math.round(res.data.main.temp),
        temp_max: Math.round(res.data.main.temp_max),
        temp_min: Math.round(res.data.main.temp_min),
        name: res.data.weather[0].main,
        icon: res.data.weather[0].icon,
      },
    };
    this.others.push(weather);
    return weather;
  }

  returnWeather(id) {
    const i = parseInt(id, 10);
    const index = this.others.findIndex(el => el.id === i);
    return this.others[index];
  }

  weatherPresent() {
    return this.others.length;
  }

  clearWeather() {
    this.others = [];
  }
}
