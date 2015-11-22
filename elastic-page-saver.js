var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'elasticsearch:9200',
  log: 'trace'
});


let savePage = (url, html) =>{

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
