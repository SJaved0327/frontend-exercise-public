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

  // Autocomplete.prototype.onQueryChange
  onQueryChange(query) {
    // Get data for the dropdown
    // if query is defined, this returns filtered results array 
    let results = this.getResults(query, this.options.data);
    // since numOfResults = 10, results array is cut down to 10 items (index 0-9)
    results = results.slice(0, this.options.numOfResults);
    // value of results are passed  
    this.updateDropdown(results);
  }

  /**
   * Given an array and a query, return a filtered array based on the query.
   */
  // Autocomplete.prototype.getResults
  // query and data values passed through 
  getResults(query, data) {
    // if query is not defined, return empty array
    if (!query) return [];

    // Filter for matching strings
    // if query is defined:
    // new filterd array results is created against data array
    let results = data.filter((item) => {
      // each index of data array is matched against current query, if data item contains query, it is returned to results filtered array
      return item.text.toLowerCase().includes(query.toLowerCase());
    });
    // getResults(); = return results
    return results;
  }

  // Autocomplete.prototype.updateDropdown
  // value of filtered results array with 10 items are passed
  updateDropdown(results) {
    // 
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

  // Autocomplete.prototype.init
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
