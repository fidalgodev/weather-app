import { elements } from './base';

// Render Initial view
export const renderView = (name, data, other) => {
  const markup = `
    <div class="forecast open">
      <button class="close-popup animated fadeIn delay-1s">
        <svg class="close-popup--icon">
          <use xlink:href="./img/symbol-defs.svg#icon-plus"></use>
        </svg>
      </button>
      <div class="title animated fadeIn">
        <svg class="title__icon">
          <use xlink:href="./img/symbol-defs.svg#icon-location"></use>
        </svg>
        <h1 class="title__text">
          ${name}
        </h1>
      </div>
      <div class="title__text--subtitle animated fadeIn">Forecast for the next 5 days</div>
      ${
        other
          ? `<button class="remove animated fadeIn delay-1s" data-id='${data}'>Remove from Saved</button>`
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
    <div class="cities__weather animated fadeIn">
      <div class="cities__weather__name animated fadeIn">${result.date}</div>
      <div class="cities__weather__details">
        <img
          src="./img/weather/${result.icon}.svg"
          class="cities__weather__details--icon animated fadeIn"
        />
        <div class="cities__weather__details__text">
          <div class="cities__weather__details__text--phrase animated fadeIn">
            ${result.name}
          </div>
          <div class="cities__weather__details__text--minmax animated fadeIn">
            ${result.temp_min}ºC <span class="dot">•</span> ${result.temp_max}ºC
          </div>
        </div>
        <div class="cities__weather__details__temp animated fadeIn">
          ${result.temp}ºC
        </div>
      </div>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', markup);
};
