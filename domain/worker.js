'use strict';

var linksProducer = require('./links-producer');

let runningWorkers = 0;

setInterval(() => {
  runningWorkers++;
  linksProducer.generateMoreLinksFromLink(() => runningWorkers--);
  console.log("links producer parallel workers ", runningWorkers);
}, 1000)
