import { elements } from './base';

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

export const renderCurrent = result => {
  const markup = `
  <h2 class="main__weather__city">${result.name}, ${result.country}</h2>
    <div class="main__weather__details">
      <img
        src="./img/weather/iconfinder_weather-01_1530392.svg"
        class="main__weather__details--icon"
      />
      <div class="main__weather__details--temp">${result.weather.temp}º</div>
    </div>
    <div class="main__weather__text">
      <div class="main__weather__text--phrase">${result.weather.name}</div>
      <div class="main__weather__text--minmax">${result.weather.temp_min}º - ${
    result.weather.temp_max
  }º</div>
    </div>
  `;
  const container = document.querySelector('.main__weather');
  container.innerHTML = markup;
};

// export const renderLocation = result => {};
