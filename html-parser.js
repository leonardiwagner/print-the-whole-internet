'use strict';

let cheerio = require('cheerio');

let findLinksInPage = (url, html) => {
  let $ = cheerio.load(html);
  let links = $("a");

  let normalizedLinks = [];
  links.each((_, link) => {
    //let normalizedLink = normalizeUrl(url, );
    link = $(link).attr('href');
    if(link && link.startsWith("/wiki"))
    {
      normalizedLinks.push("https://en.wikipedia.org" + link);
    }
  });

  return normalizedLinks;
};

let getCategories = categoriesList => {

};

let serializeHtml = html => {
  let $ = cheerio.load(html);

  let body = $("#content");

  let subTitles = [];
  body.find("h2").each((_, link) => subTitles.push($(link).text().replace("[edit]","")))

  let images = [];
  body.find("img").each((_, image) => images.push($(image).attr('src')))

  let categories = [];
  body.find('#mw-normal-catlinks ul li a').each((_, category) => categories.push($(category).attr('href')))


  return {
    'pageTitle': $(body).find('h1').text(),
    //'body': $(body).text(),
    'subTitles': subTitles,
    'images': images,
    'categories': categories
  }
}



module.exports = {
  findLinksInPage: findLinksInPage,
  serializeHtml: serializeHtml
}