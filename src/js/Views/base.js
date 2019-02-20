// DOM Elements
export const elements = {
  body: document.querySelector('body'),
  container: document.querySelector('.container'),
  // currentLocation: document.querySelector('.current'),
  // otherLocations: document.querySelector('.other'),
};

// Clear the whole UI
export const clearUI = () => {
  elements.container.innerHTML = '';
};

// Render loader inside div passed
export const renderLoader = parent => {
  const markup = `
  <div class="loader">
    <div class="one"></div>
    <div class="two"></div>
  </div>
  `;
  parent.insertAdjacentHTML('afterbegin', markup);
};

// Clear loader on defined div
export const clearLoader = parent => {
  const loader = parent.querySelector('.loader');
  parent.removeChild(loader);
};

// Render error inside parent div
export const renderError = (parent, msg) => {
  const markup = `
    <div class="error__message">
      ${msg}
    </div>
  `;
  parent.insertAdjacentHTML('afterbegin', markup);
};
