'use strict'

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: '172.17.0.2:9200',
  //log: 'trace'
});


let add = (profile) =>{
  return new Promise((resolve, reject) => {
    client.index({
      index: 'printthewholeinternet',
      type: 'page',
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