// DOM Elements
export const elements = {
  container: document.querySelector('.container'),
  // currentLocation: document.querySelector('.current'),
  // otherLocations: document.querySelector('.other'),
};

export const clearUI = () => {
  elements.container.innerHTML = '';
};

export const renderLoader = parent => {
  const markup = `
  <div class="loader">Loading...</div>
  `;
  parent.innerHTML = markup;
};

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

// export default elements;
