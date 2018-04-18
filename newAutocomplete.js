// packages
const axios = require('axios');
// imports
import keys from './keys.json';
// ============================== //

const OMDB = "http://www.omdbapi.com/?s=";

const URL = (key, baseURL) => {
  this.key = "&apikey="+key;
  this.baseURL = baseURL
  this.url = this.compileURL();
}

URL.prototype.compileURL = (query, numOfResults, key, baseURL) => {
  return url
}

// packages
const axios = require('axios');
// imports
import keys from './keys.json';
// ============================== //

// // OMDB
//   const rows = response.data.Search;
//   console.log(`rows: ${rows}`);
//   // OMDB
//   const APIresults = rows.map(item => ({
//     text: item.Title,
//     value: item.imdbID
//   }))

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
};

// where query gets passed for the first time
Autocomplete.prototype.onQueryChange = function(query){
  // Get data for the dropdown
  /* At this point, query can be passed into API call to generate data to then pass along */
  //if data is not defined, pass in query for API call
  if (!this.options.data.length){
    // pass query and this.options.numOfResults into compileURL to build request url
    //const url = this.compileURL(query, this.numOfResults, keys);
    const { compileURL } = this.options;
    console.log(compileURL);

    let url = compileURL(query, this.numOfResults);
    // axios GET call
    axios
      .get(url)
      .then(response => {
        //GITHUB
        const rows = response.data.items;
        // iterate over rows of data to pull user login name and user id
        const APIresults = rows.map(login => ({
          text: login.login,
          value: login.id
        }))
        // data array is set to value of APIresults array
        let data = APIresults;
        //use same code snippet
        let results = this.getResults(query, data);
        results = results.slice(0, this.numOfResults);
        this.updateDropdown(results);
      })
      .catch(error => {
       console.log(error);
      });
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
