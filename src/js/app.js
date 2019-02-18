// Models
import Search from './Models/Search';
import Saved from './Models/Saved';
import Current from './Models/Current';
import Others from './Models/Others';

// Views
import * as base from './Views/base';
import * as searchView from './Views/searchView';
import * as homeView from './Views/homeView';

// CSS
import '../css/main.scss';

const state = {};
window.state = state;

// --- CONTROLLERS ---

// - CURRENT LOCATION CONTROLLER -
const currentController = async () => {
  // Render Loader
  const parent = document.querySelector('.main__weather');
  base.renderLoader(parent);

  // Get current coords if they are not on state already
  if (!state.current) {
    state.current = new Current();
    await state.current.getCoords();
  }

  // Get weather for current location
  if (state.current.coords.length > 0) {
    await state.current.getWeather();
    // Clear loader
    base.clearLoader(parent);

    // Render weather
    homeView.renderWeather(state.current, parent, 'main');
  }
};

// - OTHER LOCATIONs CONTROLLER -
const otherController = async () => {
  // Render Loader
  const parent = document.querySelector('.cities');
  base.renderLoader(parent);

  // Create state for others object
  if (!state.others) {
    state.others = new Others();
  }
  state.others = new Others();
  // Get weather to all saved cities
  await state.others.getWeather(state.saved.saved);

  // Clear loader when finished
  base.clearLoader(parent);

  // Render weather
  state.others.others.forEach(weather =>
    homeView.renderWeather(weather, parent, 'other')
  );
};

// - SEARCH CONTROLLER -
async function searchController(e) {
  e.preventDefault();

  // Get value from input
  if (!this.value) return;
  state.search = new Search(this.value);

  try {
    // Show loader on page
    const parent = document.querySelector('.search__results');
    base.renderLoader(parent);
    // Get results
    await state.search.getResults();

    // Clear Loader
    base.clearLoader(parent);

    // If no results
    if (!state.search.results) {
      const msg = 'There were no results, sorry!';
      base.renderError(parent, msg);
      return;
    }

    // Show results
    state.search.results.forEach(res => {
      const isSaved = state.saved.checkifSaved(res.id);
      searchView.renderResults(res, isSaved);
    });
  } catch (err) {
    console.log(err);
  }
}

// - SAVED LOCATIONS CONTROLLER -
// gets the if the location
const savedController = id => {
  // If no state, create
  if (!state.saved) state.saved = new Saved();

  // if location isn't saved already, save it
  if (!state.saved.checkifSaved(id)) {
    // add the location
    state.saved.addLocation(id);
    // save to local storage
    state.saved.saveLocal();
    // render home when added
    homeView.renderHome();
    currentController();
    otherController();
  }
  // if its saved, remove
  else {
    // delete location
    state.saved.deleteLocation(id);
    // Remove background color
    searchView.removeSaved(id);
    // update local storage
    state.saved.saveLocal();
  }
};

// --- EVENT LISTENERS ---
base.elements.container.addEventListener('click', e => {
  const closeBtn = e.target.closest('.close-popup');
  const addCityBtn = e.target.closest('.add__city');
  const searchItem = e.target.closest('.search__results__single');

  if (closeBtn) {
    // Render home
    base.clearUI();
    homeView.renderHome();
    currentController();
    otherController();
  }

  if (addCityBtn) {
    // Clear UI
    base.clearUI();
    // Render search view
    searchView.renderSearch();

    // Get form and add event listener to it
    const form = document.querySelector('.search__form');
    const input = document.querySelector('.search__form__input');
    form.addEventListener('submit', searchController);
    input.addEventListener('change', searchController);
  }

  if (searchItem) {
    const id = parseInt(searchItem.dataset.id, 10);
    savedController(id);
  }
});

// On page load
window.addEventListener('load', () => {
  // Render Home
  base.clearUI();
  homeView.renderHome();
  // Create saved object on page load
  state.saved = new Saved();

  // Read data from the local storage
  state.saved.readLocal();

  // Call current weather and other cities controller
  currentController();
  otherController();
});
