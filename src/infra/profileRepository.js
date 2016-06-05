'use strict'

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'elasticsearch:9200',
  //log: 'trace'
});


let add = (profile) =>{
  return new Promise((resolve, reject) => {
    client.index({
      index: 'linklies',
      type: 'profile',
      body: profile
    }, function (error, response) {
      if(error) reject(error)
      else resolve(response)
    });
  })
}

module.exports = {
  add: add
}