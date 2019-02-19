import { elements } from './base';

// Render Initial view
export const renderHome = () => {
  const markup = `
    <div class="current">
      <div class="title">
        <svg class="title__icon">
          <use xlink:href="./img/symbol-defs.svg#icon-location"></use>
        </svg>
        <h1 class="title__text">Current Location</h1>
      </div>
      <div class="main__weather">

      </div>
    </div>
    <div class="other">
      <div class="title">
        <svg class="title__icon">
          <use xlink:href="./img/symbol-defs.svg#icon-map"></use>
        </svg>
        <h1 class="title__text">Other Locations</h1>
      </div>
      <div class="cities">
      </div>
      <button class="add__city">
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
  <h2 class="main__weather__city">${result.name}, ${result.country}</h2>
    <div class="main__weather__details">
      <img
        src="./img/weather/${result.weather.icon}.svg"
        class="main__weather__details--icon"
      />
      <div class="main__weather__details--temp">${result.weather.temp}ºC</div>
    </div>
    <div class="main__weather__text">
      <div class="main__weather__text--phrase">${result.weather.name}</div>
      <div class="main__weather__text--minmax">${
        result.weather.temp_min
      }ºC <span class="dot">•</span> ${result.weather.temp_max}ºC</div>
    </div>
  `;
    container.insertAdjacentHTML('afterBegin', markup);
  }

  // If weather of other location
  if (place === 'other') {
    markup = `
    <div class="cities__weather" data-id="${result.id}">
      <div class="cities__weather__name">${result.name}, ${result.country}</div>
      <div class="cities__weather__details">
        <img
          src="./img/weather/${result.weather.icon}.svg"
          class="cities__weather__details--icon"
        />
        <div class="cities__weather__details__text">
          <div class="cities__weather__details__text--phrase">
            ${result.weather.name}
          </div>
          <div class="cities__weather__details__text--minmax">
            ${result.weather.temp_min}ºC <span class="dot">•</span> ${
      result.weather.temp_max
    }ºC
          </div>
        </div>
        <div class="cities__weather__details__temp">
          ${result.weather.temp}ºC
        </div>
      </div>
    </div>
  `;
    container.insertAdjacentHTML('beforeEnd', markup);
  }
};

export const renderDeleteAll = parent => {
  const markup = `
  <button class="remove remove__all">Remove all Locations</button>`;
  parent.insertAdjacentHTML('beforeBegin', markup);
};
