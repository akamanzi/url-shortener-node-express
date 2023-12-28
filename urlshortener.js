const NodeCache = require('node-cache');
const myCasche = new NodeCache();
function urlMapper(url) {
  hash = Math.floor(Math.random() * 1000);//.toString(36).slice(2, 7);
  let success = myCasche.set(hash, url) 
  if (success){
    return hash;
  }
}

function getFullUrl(short_url){
  fullUrl = myCasche.get(short_url)
  return (fullUrl != undefined) ? fullUrl : 'Not Found';
  
}

module.exports = {getFullUrl, urlMapper};