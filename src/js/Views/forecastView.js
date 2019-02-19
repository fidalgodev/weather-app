import { elements } from './base';

// Render Initial view
export const renderView = (name, data, other) => {
  const markup = `
    <div class="forecast open">
      <button class="close-popup">
        <svg class="close-popup--icon">
          <use xlink:href="./img/symbol-defs.svg#icon-plus"></use>
        </svg>
      </button>
      <div class="title">
        <svg class="title__icon">
          <use xlink:href="./img/symbol-defs.svg#icon-location"></use>
        </svg>
        <h1 class="title__text">
          ${name}
        </h1>
      </div>
      <div class="title__text--subtitle">Forecast for the next 5 days</div>
      ${
        other
          ? `<button class="remove" data-id='${data}'>Remove from Saved</button>`
          : ''
      }
      <div class="days">
      </div>
    </div>
  `;
  elements.container.innerHTML = markup;
};

// Render each result
export const renderResult = (result, container) => {
  const markup = `
    <div class="cities__weather">
      <div class="cities__weather__name">${result.date}</div>
      <div class="cities__weather__details">
        <img
          src="./img/weather/${result.icon}.svg"
          class="cities__weather__details--icon"
        />
        <div class="cities__weather__details__text">
          <div class="cities__weather__details__text--phrase">
            ${result.name}
          </div>
          <div class="cities__weather__details__text--minmax">
            ${result.temp_min}ºC <span class="dot">•</span> ${result.temp_max}ºC
          </div>
        </div>
        <div class="cities__weather__details__temp">
          ${result.temp}ºC
        </div>
      </div>
    </div>
  `;
  container.insertAdjacentHTML('beforeEnd', markup);
};
