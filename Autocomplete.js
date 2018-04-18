// packages
const axios = require('axios');
// imports
// import keys from './keys.json';
import URL from './URL'
// ============================== //

// establish Autocomplete class
const Autocomplete = function(rootEl, options = {}){
  // rootEl and options object are passed into each instance of Autocomplete
  this.numOfResults = 10;
  this.rootEl = rootEl;
  // options object is assigned values ...
  options = Object.assign({ data: [] }, options);
  Object.assign(this, { options });
  // init function called
  this.init();
  this.url = new URL ("", "https://api.github.com/search/users?q=", 2, "login", "id");
  console.log(this.url);
};

// where query gets passed for the first time
Autocomplete.prototype.onQueryChange = function(query){
  // Get data for the dropdown
  //if data is not defined, pass in query for API call
  if (!this.options.data.length){    
    // compile URl to ready it for API call
    this.url.compileURL(query);
    // axios GET call
    this.url.getAPI(query, this.getResults.bind(this), this.updateDropdown.bind(this))

  }else{
    // if query is defined, returns filtered results array and builds dropdown
    let results = this.getResults(query, this.options.data);
    results = results.slice(0, this.numOfResults);
    this.updateDropdown(results);
  }
};

  /**
   * Given an array and a query, return a filtered array based on the query.
   */
Autocomplete.prototype.getResults = function(query, data){
  // if query is not defined, return empty array
  if (!query) return [];
  // new filterd array results is created against data array
  let results = data.filter((item) => {
    return item.text.toLowerCase().includes(query.toLowerCase());
  });
  return results;
}

// value of filtered results array with 10 items are passed
Autocomplete.prototype.updateDropdown = function(results){
  // empties out <ul>
  this.listEl.innerHTML = '';
  // appends 10 results items <li> based on current query
  this.listEl.appendChild(this.createResultsEl(results));
}

Autocomplete.prototype.createResultsEl = function(results){
  // create a document fragement
  const fragment = document.createDocumentFragment();
  // iterate through results array
  results.forEach((result) => {
    const el = document.createElement('li');
    Object.assign(el, {
      className: 'result',
      textContent: result.text,
    });
    //give el data-attribute of current index to track it
    el.setAttribute('data-number', results.indexOf(result));
    // Pass the value to the onSelect callback
    // on click listener added to each <li.result>
    el.addEventListener('click', (event) => {
      // onSelect object created, value is set to this.options
      const { onSelect } = this.options;
      console.log(onSelect);
      // if onSelect is a function, call it and pass result.value
      if (typeof onSelect === 'function') onSelect(result.value);
    });
    // each <li> appended to document fragment
    fragment.appendChild(el);
  });
  // returns fragment with up to 10 results <li>
  return fragment;
}

Autocomplete.prototype.createQueryInputEl = function(){
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
Autocomplete.prototype.init = function(){
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

export default Autocomplete;