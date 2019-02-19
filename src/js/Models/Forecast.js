import axios from 'axios';
import moment from 'moment';

export default class Forecast {
  constructor(name, data) {
    this.name = name;
    this.data = data;
  }

  async getForecast() {
    const proxy = process.env.PROXY;
    const api = process.env.APIKEY;
    let query;
    if (this.data.length === 1) {
      query = `${proxy}api.openweathermap.org/data/2.5/forecast?id=${
        this.data[0]
      }&units=metric&appid=${api}`;
    } else {
      query = `${proxy}api.openweathermap.org/data/2.5/forecast?lat=${
        this.data[0]
      }&lon=${this.data[1]}&units=metric&appid=${api}`;
    }
    try {
      const res = await axios.get(`${proxy}${query}`);

      // Get only 1 result for each day since API returns data each 3 hours for 5 days
      // Not the most elegant way here
      const weather = res.data.list.reduce((acc, el, i) => {
        if ([0, 7, 15, 23, 31, 39].includes(i)) {
          const data = {
            date: moment
              .unix(el.dt)
              .utc()
              .format('dddd, Do MMMM'),
            temp: Math.round(el.main.temp),
            temp_max: Math.round(el.main.temp_max),
            temp_min: Math.round(el.main.temp_min),
            name: el.weather[0].main,
            icon: el.weather[0].icon,
          };
          acc.push(data);
        }
        return acc;
      }, []);
      this.weather = weather;
    } catch (err) {
      console.log(err);
    }
  }
}
