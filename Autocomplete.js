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

const init = 

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
    // empties out <ul>
    this.listEl.innerHTML = '';
    // appends 10 results items <li> based on current query
    this.listEl.appendChild(this.createResultsEl(results));
  }

  // Autocomplete.prototype.createResultsEl
  createResultsEl(results) {
    // create a document fragement
    const fragment = document.createDocumentFragment();
    // iterate through results array
    results.forEach((result) => {
      // el = <li>
      const el = document.createElement('li');
      // <li class="result" textContent=`${result.text}`>
      // assign values to <li> so text displayed is results[i],result.text
      Object.assign(el, {
        className: 'result',
        textContent: result.text,
      });

      // Pass the value to the onSelect callback
      // on click listener added to each <li.result>
      el.addEventListener('click', (event) => {
        // onSelect object created, value is set to this.options
        const { onSelect } = this.options;
        // if onSelect is a function, call it and pass result.value
        if (typeof onSelect === 'function') onSelect(result.value);
      });
      // each <li> appended to document fragment
      fragment.appendChild(el);
    });
    // returns fragment with up to 10 results <li>
    return fragment;
  }

  createQueryInputEl() {
    // inputEl = <input>
    const inputEl = document.createElement('input');
    // <input type="search" name="query" autocomplete="off">
    // assign values of object to inputEl
    Object.assign(inputEl, {
      type: 'search',
      name: 'query',
      autocomplete: 'off',
    });
    // adds event listener to call function when value of <input> changes 
    inputEl.addEventListener('input', event =>
      // creates new filtered results array
      this.onQueryChange(event.target.value));
    // returns inputEl with added value and functionality
    // createQueryInputEl(); = inputEl;
    return inputEl;
  }

  // Autocomplete.prototype.init
  init() {
    // Build query input
    // creates <input> 
    this.inputEl = this.createQueryInputEl();
    // appends <input> to rootEl of this instance of Autocomplete
    this.rootEl.appendChild(this.inputEl)

    // Build results dropdown
    // this.listEl creates <ul>
    this.listEl = document.createElement('ul');
    // ul is assigned className results
    Object.assign(this.listEl, { className: 'results' });
    // ul.results is appended to rootEl of this instance of Autocomplete
    this.rootEl.appendChild(this.listEl);
  }
}
