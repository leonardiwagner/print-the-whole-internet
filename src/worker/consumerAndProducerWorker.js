'use strict'

let crawler = require('./crawler')

crawler.setProfileToStartCrawling().then(() => {
  setInterval(() => {
    crawler.crawl(true)
  }, 2000)
})