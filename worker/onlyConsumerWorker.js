'use strict'

let crawler = require('./crawler')

setInterval(() => {
  crawler.crawl(false)
}, 2000)