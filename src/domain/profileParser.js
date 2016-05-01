'use strict';

let cheerio = require('cheerio')

let educationsParser = require('./parsers/educationsParser')
let experiencesParser = require('./parsers/experiencesParser')
let coursesParser = require('./parsers/coursesParser')
let projectsParser = require('./parsers/projectsParser')
let honorsParser = require('./parsers/honorsParser')
let languagesParser = require('./parsers/languagesParser')
let organizationsParser = require('./parsers/organizationsParser')
let basicProfileParser = require('./parsers/basicProfileParser')
let skillsParser = require('./parsers/skillsParser')

module.exports = {
  parse: (html) => {
    let $ = cheerio.load(html)

    let profile = basicProfileParser.parse($)
    profile.educations = educationsParser.parse($)
    profile.experiences = experiencesParser.parse($)
    profile.courses = coursesParser.parse($)
    profile.projects = projectsParser.parse($)
    profile.honors = honorsParser.parse($)
    profile.languages = languagesParser.parse($)
    profile.organizations = organizationsParser.parse($)
    profile.skills = skillsParser.parse($)

    return profile
  }
}
