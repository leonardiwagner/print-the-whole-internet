'use strict';

let logger = require('winston');

let queue = require('./../queue');
let pageReader = require('./../page-reader');
let htmlParser = require('./../html-parser');


let concurrentJobs = 0;

let runQuery = () => {
  queue.get('link').then(url =>{
    concurrentJobs++;
    logger.info("> Start processing link", url)

    pageReader.readUrl(url).then(body => {

      let x = htmlParser.serializeHtml(body);
      console.log(x)
      return;


      logger.info("> > Saving content", url)

      queue.setContent('page', url, body).then(() =>{
        logger.info("> > Content saved", url)

        let links = htmlParser.findLinksInPage(url, body);
        logger.info("> > Links found", links.length)
        let saveLinksFunctions = links.map(link => {
          return queue.set('link', link);
        })

        Promise.all(saveLinksFunctions).then(a => {
          logger.info('> > Links ' + links.length + ' saved ');
          concurrentJobs--;
        }).catch(e => console.log(e.stack));
      }).catch(e => console.log(e.stack));
    }).catch(e => console.log(e.stack));
  }).catch(e => console.log("error in run query", e.stack))
};

setInterval(()=>{
  runQuery();
  logger.info("Concurrent jobs", concurrentJobs);
},500)



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
