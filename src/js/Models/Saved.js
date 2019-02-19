export default class Saved {
  constructor() {
    this.saved = [];
  }

  // Add a new location
  addLocation(id) {
    // Add new location id to saved object
    this.saved.push(id);

    // Save to localstorage
    this.saveLocal();

    return id;
  }

  // Remove all
  deleteAllLocations() {
    this.saved = [];

    // update localstorage
    this.saveLocal();
  }

  // Remove a favorite location
  deleteLocation(id) {
    const index = this.saved.findIndex(el => el === id);

    // Remove from array of saved
    this.saved.splice(index, 1);

    // update localstorage
    this.saveLocal();
  }

  // Check if location is favorite already
  checkifSaved(id) {
    return this.saved.findIndex(el => el === id) !== -1;
  }

  checkSaved() {
    return this.saved.length;
  }

  // Save to local storage
  saveLocal() {
    localStorage.setItem('savedlocations', JSON.stringify(this.saved));
  }

  // Read data from local storage
  readLocal() {
    // Get data from the local storage
    const saved = JSON.parse(localStorage.getItem('savedlocations'));

    // If local storage has data, save to the object
    if (saved) this.saved = saved;
  }
}
