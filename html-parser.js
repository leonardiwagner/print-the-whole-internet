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



let normalizeUrl = (parentUrl, url) => {
  if(url === undefined){
    return null;
  }else if(url.substr(0,2) === '//') {
    let protocol = parentUrl.toLowerCase().substr(0, 5) === 'https' ? 'https' : 'http';
    return protocol + ':' + url;
  } else if(url.substr(0,1) === '/'){
    return parentUrl + url;
  }else{
    return null;
  }
};

module.exports = {
  findLinksInPage: findLinksInPage
}