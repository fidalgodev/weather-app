import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const proxy = process.env.PROXY;
    try {
      const res = await axios.get(
        `${proxy}https://get-cities-ids.herokuapp.com/?q=${this.query}`
      );
      // Save the data on the object
      this.results = res.data;
    } catch (err) {
      console.log(err);
    }
  }
}
