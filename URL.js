// packages
const axios = require('axios');

// URL will store needed information for compiling URL before API call
const URL = function(key = "", baseURL, dataIndex, text, value){
  if (!key.length) {
  	this.key = "";
  }else {
  	this.key = "&apikey="+key;
  }
  this.baseURL = baseURL;
  this.url;
  // index of object to pull desired data from
  this.dataIndex = dataIndex;
  // key needed for capturing text to display for each <li>
  this.text = text;
  // value needed for capturing id
  this.value = value;
  this.numOfResults = 10;
}

// put the HTTP endpoint together with needed parameters
URL.prototype.compileURL = function(query){
  if (!query) return "";

  if (this.key === ""){
  	let compiledUrl = this.baseURL+query
    this.url = compiledUrl;
  }else{
    this.url = this.baseURL+query+this.key;
  }
};

// fires off api call
// callback function from Autocomplete.updateDropdown
URL.prototype.getAPI = function(query, getResults, updateDropdownCB){
  axios
    .get(this.url)
    .then(response => {

      //grab needed index of response data
      let resData = response.data
      let objKey = Object.keys(resData)[this.dataIndex]

      // const rows = response.data[objKey];
      const rows = response.data[objKey];

      // iterate over rows of data
      const APIresults = rows.map(item => ({
        text: item[this.text],
        value: item[this.value]
      }))

      // data array is set to value of APIresults array
      let data = APIresults;
      // filter results
      let results = getResults(query, data);
      results = results.slice(0, this.numOfResults);
      //callback function from Autocomplete
      updateDropdownCB(results);
    })
    .catch(error => {
     console.log(error);
    });
}

export default URL;


/*
const updateDropdownCB = (results) => console.log(results);
// Test 1 - Github
let data = new URL ("", "https://api.github.com/search/users?q=", 2, "login", "id");
console.log(data);

data.compileURL('foo', data.key);
console.log(data);

data.getAPI('foo', updateDropdownCB);

//Test 2 - OMDB
let data = new URL (keys.OMDB.apiKey, "http://www.omdbapi.com/?s=", 0, "Title", "imdbID");
console.log(data);

data.compileURL('foo', data.key);
console.log(data);

data.getAPI('foo', updateDropdownCB);
*/

