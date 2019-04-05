// Models
import Search from './Models/Search';
import Saved from './Models/Saved';
import Current from './Models/Current';
import Others from './Models/Others';
import Forecast from './Models/Forecast';

// Dark
import DarkMode from './Models/Dark';

// Views
import * as base from './Views/base';
import * as searchView from './Views/searchView';
import * as homeView from './Views/homeView';
import * as forecastView from './Views/forecastView';

// CSS
import '../css/main.scss';

// Global App state
const state = {};
// Leak state to global object for developing porpuses
// window.state = state;

// --- CONTROLLERS ---

// - DARK MODE CONTROLLER -
const darkmodeController = () => {
  const checkbox = document.querySelector('input[name=checkbox]');
  if (state.darkMode.dark === 0) {
    base.elements.body.classList.remove('dark');
    checkbox.checked = false;
  } else if (state.darkMode.dark === 1) {
    base.elements.body.classList.add('dark');
    checkbox.checked = true;
  }
};

// - CURRENT LOCATION CONTROLLER -
const currentController = async () => {
  // Render Loader
  const parent = document.querySelector('.main__weather');
  base.renderLoader(parent);

  // Create state if its not created
  if (!state.current) state.current = new Current();

  // Get current coords if they are not on state already
  if (state.current.coordAvailable() < 2) {
    await state.current.getCoords();
  }

  // Get weather for current location
  if (state.current.coordAvailable() === 2) {
    await state.current.getWeather();

    // Clear loader
    base.clearLoader(parent);

    // Add data set
    parent.setAttribute('data-id', state.current.coords);

    // Render weather
    homeView.renderWeather(state.current, parent, 'main');
  }
};

// - OTHER LOCATIONs CONTROLLER -
const otherController = () => {
  // Get parent div
  const parent = document.querySelector('.cities');

  // If there are no saved locations, display message
  if (state.saved.checkSaved() === 0) {
    base.renderError(
      parent,
      'You have no saved cities. Click the button above to add them!'
    );
    return;
  }

  // Create state for others object if doesnt exist
  if (!state.others) state.others = new Others();

  // If there is weather already fetched, clean it
  if (state.others.weatherPresent() > 0) state.others.clearWeather();

  // Render Loader
  base.renderLoader(parent);

  // Get weather to all saved cities
  state.saved.saved.forEach(async (location, i, arr) => {
    const weather = await state.others.getWeather(location);
    homeView.renderWeather(weather, parent, 'other');
    // if last iteration, clear loader
    if (i === arr.length - 1) {
      base.clearLoader(parent);
      // Render delete button
      homeView.renderDeleteAll(parent);
    }
  });
};

// - FORECAST CONTROLLER -
// Other param is true if forecast is from other city and not the current location
const forescastController = async (current, data, other) => {
  // if there is data, create a new forecast object
  if (current && data) state.forecast = new Forecast(current, data);

  // render initial view
  forecastView.renderView(current, data, other);

  // loader
  const parent = document.querySelector('.days');
  base.renderLoader(parent);

  // get forecast from api
  await state.forecast.getForecast();

  // render each day
  state.forecast.weather.forEach(el => forecastView.renderResult(el, parent));

  // Clear loader
  base.clearLoader(parent);
};

// - SEARCH CONTROLLER -
async function searchController(e) {
  e.preventDefault();

  // Get value from input
  if (!this.value) return;
  state.search = new Search(this.value);

  // Show loader on page
  const parent = document.querySelector('.search__results');
  base.renderLoader(parent);

  // Get results
  await state.search.getResults();

  // Clear Loader
  base.clearLoader(parent);

  // Clear Previous Search
  searchView.clearSearch();

  // If no results
  if (!state.search.results) {
    const msg = 'There were no results, sorry!';
    base.renderError(parent, msg);
  }

  // Otherwise, show them
  else {
    state.search.results.forEach(res => {
      // If location is saved, pass true on 2nd parameter
      const isSaved = state.saved.checkifSaved(res.id);
      searchView.renderResults(res, isSaved);
    });
  }
}

// - SAVED LOCATIONS CONTROLLER -
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
    darkmodeController();
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
  const cityCard = e.target.closest('.cities__weather');
  const currentCard = e.target.closest('.main__weather');
  const removeBtn = e.target.closest('.remove');
  const removeBtnAll = e.target.closest('.remove__all');
  const checkbox = e.target.closest('input[name=checkbox]');

  if (checkbox) {
    if (checkbox.checked) {
      state.darkMode.dark = 1;
      state.darkMode.saveLocal();
      base.elements.body.classList.add('dark');
    } else {
      state.darkMode.dark = 0;
      state.darkMode.saveLocal();
      base.elements.body.classList.remove('dark');
    }
  }

  // if remove clicked
  if (removeBtnAll) {
    state.saved.deleteAllLocations();
    // Render home
    base.clearUI();
    homeView.renderHome();
    currentController();
    otherController();
  }

  // if remove clicked
  if (removeBtn && removeBtn.dataset.id) {
    const id = [parseInt(removeBtn.dataset.id, 10)];
    state.saved.deleteLocation(id);
    // Render home
    base.clearUI();
    homeView.renderHome();
    darkmodeController();
    currentController();
    otherController();
  }

  if (closeBtn) {
    // Render home
    base.clearUI();
    homeView.renderHome();
    darkmodeController();
    currentController();
    otherController();
  }

  // If city card clicked
  if (cityCard && cityCard.dataset.id) {
    const id = [parseInt(cityCard.dataset.id, 10)];
    const current = state.others.returnWeather(id);
    forescastController(current, id, true);
  }

  // If current card clicked
  if (currentCard && currentCard.dataset.id) {
    const coords = currentCard.dataset.id.split(',').map(JSON.parse);
    const { current } = state;
    if (coords.length === 2) forescastController(current, coords, false);
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

  // - DARK MODE -
  state.darkMode = new DarkMode();
  state.darkMode.readLocal();
  darkmodeController();

  // Create saved object on page load
  state.saved = new Saved();

  // Read data from the local storage
  state.saved.readLocal();

  // Call current weather and other cities controller
  currentController();
  otherController();
});
