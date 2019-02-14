export default class Forecast {
  constructor(id) {
    this.id = id;
  }

  getID() {
    return this.id;
  }

  static info() {
    return 'This is a test';
  }
}
