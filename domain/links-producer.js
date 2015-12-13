'use strict';

let htmlParser = require('./wikipedia-html-parser');
let queue = require('./../infra/queue')('links');
let pageReader = require('./../infra/webpage-reader');
let logger = require('winston');

var getLinksFromPage = (link) => {
  return pageReader.readUrl(link).then(body => {
    var links = htmlParser.findLinksInPage(link, body);
    return links;
  }).catch(err => { throw err; });
};

module.exports = {
  generateMoreLinksFromLink:(finishCallback) => {
    queue.get()
      .then(link => {
        return getLinksFromPage(link)
      }).then(links => {
        let saveLinksIntoQueueFunctions = links.map(link => {
        return queue.set(link)
      });

      return Promise.all(saveLinksIntoQueueFunctions);
    }).then(links => {
      logger.info("links producer: total of " + links.length + " saved on queue");
      finishCallback();
    }).catch(err => { logger.error("links producer", err); });
  }
};