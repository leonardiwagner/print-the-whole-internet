'use strict';

var cheerio = require('cheerio');


var fs = require('fs')
fs.readFile('hole.html', 'utf8', function (err,data) {
  var $ = cheerio.load(data);

  var name = $(".profile-overview-content .full-name").text()
  var locality = $(".profile-overview-content .locality").text()
  var industry = $(".profile-overview-content .industry").text()
  var summary = $("#background .summary").text()

  $("#background-experience > div").each(function(i, elem) {
    //fruits[i] = $(this).text();
    var title = $(this).find("h4").text();
    var company = $(this).find("header > h5").text();
    var description = $(this).find(".description").text();
    var durationStart = $(this).find(".experience-date-locale time:first-child").text();
    var durationEnd = $(this).find(".experience-date-locale time:last-child").text();
    var locality = $(this).find(".experience-date-locale .locality").text();

    console.log("bring it back", locality)
  });

  $(".skill-pill").each(function(i, elem){
    var count = $(this).find(".num-endorsements").attr("data-count")
    var title = $(this).find(".endorse-item-name").text()
    //it may have some recommendation
  })

  




});