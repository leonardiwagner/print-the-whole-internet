'use strict';

let cheerio = require('cheerio');

let parseInfoFromHtml = html => {
  let $ = cheerio.load(html);

  let body = $('#wrapper');

  let name = $('#name .full-name').text();
  let headline = $('#headline .title').text();
  let location = $('#location .locality').text();
  let industry = $('#location .industry').text();

  let summary = $('#summary-item .description').text();

  return {
    'name': name,
    'headline': headline,
    'location': location,
    'industry': industry,
    'summary': summary
  }
}



module.exports = {
  parseInfoFromHtml: parseInfoFromHtml
}