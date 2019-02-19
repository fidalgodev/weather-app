import axios from 'axios';
import { renderError, clearLoader } from '../Views/base';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  // Get results from query
  async getResults() {
    const proxy = process.env.PROXY;
    try {
      const res = await axios.get(
        `${proxy}https://get-cities-ids.herokuapp.com/?q=${this.query}`
      );
      // Save the data on the object
      this.results = res.data;
    } catch (err) {
      const parent = document.querySelector('.search__results');
      // Clear loader
      clearLoader(parent);

      // Render error
      renderError(parent, 'There was a problem while searching');
    }
  }
}
