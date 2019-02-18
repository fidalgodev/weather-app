import axios from 'axios';

export default class Others {
  constructor() {
    this.others = [];
  }

  async getWeather(ids) {
    const proxy = process.env.PROXY;
    const api = process.env.APIKEY;
    const promises = ids.map(id =>
      axios.get(
        `${proxy}api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${api}`
      )
    );
    const data = await Promise.all(promises);
    data.forEach(res => {
      const weather = {
        name: res.data.name,
        country: res.data.sys.country,
        weather: {
          temp: res.data.main.temp,
          temp_max: res.data.main.temp_max,
          temp_min: res.data.main.temp_min,
          name: res.data.weather[0].main,
          icon: res.data.weather[0].icon,
        },
      };
      this.others.push(weather);
    });
  }
}
