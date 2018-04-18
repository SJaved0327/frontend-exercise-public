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

URL.prototype.compileURL = function(query, key){
  if (!query) return "";

  if (key === ""){
  	let compiledUrl = this.baseURL+query
    return compiledUrl
  }
  
  return this.baseURL+query+key; 
};

const data = new URL ("", "https://api.github.com/search/users?q=");
console.log(data);

data.url = data.compileURL('foo', data.key);
console.log(data);