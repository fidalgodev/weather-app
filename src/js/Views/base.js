// DOM Elements
export const elements = {
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
  <div class="loader">Loading...</div>
  `;
  parent.innerHTML = markup;
};

// Clear loader on defined div
export const clearLoader = parent => {
  parent.innerHTML = '';
};

// Render error inside parent div
export const renderError = (parent, msg) => {
  const markup = `
    <div class="error__message">
      ${msg}
    </div>
  `;
  parent.innerHTML = markup;
};
