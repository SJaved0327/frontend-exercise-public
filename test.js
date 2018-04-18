// packages
const axios = require('axios');

// Github Users
const URL = function(key, baseURL){
  if (!key.length) {
  	this.key = "";
  }else {
  	this.key = "&apikey="+key;
  }
  this.baseURL = baseURL
  this.url 
}

URL.prototype.compileURL = function(query){
  if (!query) return "";

  if (this.key === ""){
  	let compiledUrl = this.baseURL+query
    this.url = compiledUrl;
  }else{
    this.url = this.baseURL+query+this.key;
  }
};

//callback function from Autocomplete
URL.prototype.getAPI = function(query, updateDropdownCB){
  axios
    .get(this.url)
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
      //callback function from Autocomplete
      updateDropdownCB(results);
    })
    .catch(error => {
     console.log(error);
    });

}

URL.prototype.getResults = function(query, data){
  // if query is not defined, return empty array
  if (!query) return [];
  // new filterd array results is created against data array
  let results = data.filter((item) => {
    return item.text.toLowerCase().includes(query.toLowerCase());
  });
  return results;
}

const updateDropdownCB = (results) => {console.log(results)}

const data = new URL ("", "https://api.github.com/search/users?q=");
console.log(data);

data.compileURL('foo', data.key);
console.log(data);

data.getAPI('foo', updateDropdownCB);


