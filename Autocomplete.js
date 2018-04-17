/*
Thoughts:

const options = (data, options = {}) => {
  this.numOfResults = 10;
  this.data = data;
}

const Autocomplete = (rootEl, options) => {
  this.rootEl = rootEl;
  this.options = options
}


*/



// establish Autocomplete class
export default class Autocomplete {
  // rootEl and options object are passed into each instance of Autocomplete
  constructor(rootEl, options = {}) {
    // options object is assigned values ...
    // this.options.numOfResults = 10;
    // this.options.data = [];
    // this.options.{values of passed in object}
    options = Object.assign({ numOfResults: 10, data: [] }, options);
    // values of rootEl and options copied and assigned to instance of Autocomplete
    Object.assign(this, { rootEl, options });
    // init function called
    this.init();
  }

  onQueryChange(query) {
    // Get data for the dropdown
    let results = this.getResults(query, this.options.data);
    results = results.slice(0, this.options.numOfResults);

    this.updateDropdown(results);
  }

  /**
   * Given an array and a query, return a filtered array based on the query.
   */
  getResults(query, data) {
    if (!query) return [];

    // Filter for matching strings
    let results = data.filter((item) => {
      return item.text.toLowerCase().includes(query.toLowerCase());
    });

    return results;
  }

  updateDropdown(results) {
    this.listEl.innerHTML = '';
    this.listEl.appendChild(this.createResultsEl(results));
  }

  createResultsEl(results) {
    const fragment = document.createDocumentFragment();
    results.forEach((result) => {
      const el = document.createElement('li');
      Object.assign(el, {
        className: 'result',
        textContent: result.text,
      });

      // Pass the value to the onSelect callback
      el.addEventListener('click', (event) => {
        const { onSelect } = this.options;
        if (typeof onSelect === 'function') onSelect(result.value);
      });

      fragment.appendChild(el);
    });
    return fragment;
  }

  createQueryInputEl() {
    const inputEl = document.createElement('input');
    Object.assign(inputEl, {
      type: 'search',
      name: 'query',
      autocomplete: 'off',
    });

    inputEl.addEventListener('input', event =>
      this.onQueryChange(event.target.value));

    return inputEl;
  }

  init() {
    // Build query input
    this.inputEl = this.createQueryInputEl();
    this.rootEl.appendChild(this.inputEl)

    // Build results dropdown
    this.listEl = document.createElement('ul');
    Object.assign(this.listEl, { className: 'results' });
    this.rootEl.appendChild(this.listEl);
  }
}
