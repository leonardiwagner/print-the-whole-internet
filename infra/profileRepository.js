var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'elasticsearch:9200',
  log: 'trace'
});


let add = (profileId, profile) =>{

  client.index({
    index: 'printthewholeinternet',
    type: 'page',
    body: {
      url: 'Test 1',
      tags: ['y', 'z'],
      published: true,
    }
  }, function (error, response) {

  });

}

module.exports = {
  add: add
}