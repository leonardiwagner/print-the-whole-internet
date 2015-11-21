'use strict';

let logger = require('winston');

let queue = require('./../queue');
let pageReader = require('./../page-reader');
let htmlParser = require('./../html-parser')




let getUrlContent = url => {
  return pageReader
    .readUrl(url)
    .then(body => {
      return new Promise((resolve, reject) => {
        queue.setContent('page', url, body)
          .then(resolve(body))
          .catch(e => reject(e))
      })
    })
    .catch(e => console.log("erro while reading ulr " + url, e))
};





let readUrlAndReturnItsLinks = url => {
  getUrlContent(url).then(function(body){
    logger.log('info', '> read ' + url);

    let links = htmlParser.findLinksInPage(url, body);



    let saveLinksFunctions = links.map(link => {
      return queue.set('link', link);
    })

    Promise.all(saveLinksFunctions).then(a => {
      logger.log('info', '> > ' + links.length + ' saved ');
    })

  })
    .catch(e => console.log("erro while reading dasdsadaulr " + url, e))
};

readUrlAndReturnItsLinks("https://www.wikipedia.org");


//let getUrlContent = url => {
//
//  return readUrl(url)
//    .then(links => {
//      winston.log('info', '>> found: ' + links.length + ' links from ' + url);
//      return links.map(link => getLinksFromUrl(link));
//    })
//    .catch(e =>  winston.log('error', e));
//};
//
//getLinksFromUrl()
//  .then(links => {
//    //console.log("moar links", links.length)
//    links.forEach(link => getLinksFromUrl(link))
//  })
//  .catch(err => console.log("erro2", err));