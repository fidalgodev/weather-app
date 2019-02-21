import { elements } from './base';

// Render Initial view
export const renderHome = () => {
  const markup = `
    <div class="darkmode">
    <span class="darkmode__text">Dark Mode:</span>
    <input name= "checkbox" type="checkbox" id="switch" class="switch" /><label for="switch">Toggle</label>
    </div>
    <div class="current noselect">
      <div class="title animated fadeIn">
        <svg class="title__icon">
          <use xlink:href="./img/symbol-defs.svg#icon-location"></use>
        </svg>
        <h1 class="title__text">Current Location</h1>
      </div>
      <div class="main__weather animated fadeIn">

      </div>
    </div>
    <div class="other">
      <div class="title animated fadeIn">
        <svg class="title__icon">
          <use xlink:href="./img/symbol-defs.svg#icon-map"></use>
        </svg>
        <h1 class="title__text">Other Locations</h1>
      </div>
      <div class="cities">
      </div>
      <button class="add__city animated fadeIn">
        <svg class="add__city--icon">
          <use xlink:href="./img/symbol-defs.svg#icon-plus"></use>
        </svg>
      </button>
    </div>
  `;
  elements.container.innerHTML = markup;
};

// Render the weather
// Gets the weather, the container where it shoudl get placed, and if it's the main weather or the other for other location
export const renderWeather = (result, container, place) => {
  let markup;

  // If weather of main location
  if (place === 'main') {
    markup = `
  <h2 class="main__weather__city animated fadeIn">${result.name}, ${
      result.country
    }</h2>
    <div class="main__weather__details">
      <img
        src="./img/weather/${result.weather.icon}.svg"
        class="main__weather__details--icon animated fadeIn"
      />
      <div class="main__weather__details--temp animated fadeIn">${
        result.weather.temp
      }ºC</div>
    </div>
    <div class="main__weather__text">
      <div class="main__weather__text--phrase animated fadeIn">${
        result.weather.name
      }</div>
      <div class="main__weather__text--minmax animated fadeIn">${
        result.weather.temp_min
      }ºC <span class="dot">•</span> ${result.weather.temp_max}ºC</div>
    </div>
  `;
    container.insertAdjacentHTML('afterbegin', markup);
  }

  // If weather of other location
  if (place === 'other') {
    markup = `
    <div class="cities__weather animated fadeIn noselect" data-id="${
      result.id
    }">
      <div class="cities__weather__name animated fadeIn">${result.name}, ${
      result.country
    }</div>
      <div class="cities__weather__details">
        <img
          src="./img/weather/${result.weather.icon}.svg"
          class="cities__weather__details--icon animated fadeIn"
        />
        <div class="cities__weather__details__text">
          <div class="cities__weather__details__text--phrase animated fadeIn">
            ${result.weather.name}
          </div>
          <div class="cities__weather__details__text--minmax animated fadeIn">
            ${result.weather.temp_min}ºC <span class="dot">•</span> ${
      result.weather.temp_max
    }ºC
          </div>
        </div>
        <div class="cities__weather__details__temp animated fadeIn">
          ${result.weather.temp}ºC
        </div>
      </div>
    </div>
  `;
    container.insertAdjacentHTML('beforeend', markup);
  }
};

export const renderDeleteAll = parent => {
  const markup = `
  <button class="remove remove__all animated fadeIn delay-1s">Remove all Locations</button>`;
  parent.insertAdjacentHTML('afterend', markup);
};
