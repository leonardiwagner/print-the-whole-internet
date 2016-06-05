'use strict';

const cheerio = require('cheerio')

const educationsParser = require('./educationsParser')
const experiencesParser = require('./experiencesParser')
const coursesParser = require('./coursesParser')
const projectsParser = require('./projectsParser')
const honorsParser = require('./honorsParser')
const languagesParser = require('./languagesParser')
const organizationsParser = require('./organizationsParser')
const basicProfileParser = require('./basicProfileParser')
const skillsParser = require('./skillsParser')
const publicationsParser = require('./publicationsParser')
const additionalInfoParser = require('./additionalInfoParser')
const relatedProfilesFinder = require('./relatedProfilesFinder')

module.exports = {
  parse: (html) => {
    const $ = cheerio.load(html)

    const profile = basicProfileParser.parse($)
    profile.educations = educationsParser.parse($)
    profile.experiences = experiencesParser.parse($)
    profile.courses = coursesParser.parse($)
    profile.projects = projectsParser.parse($)
    profile.honors = honorsParser.parse($)
    profile.languages = languagesParser.parse($)
    profile.organizations = organizationsParser.parse($)
    profile.skills = skillsParser.parse($)
    profile.publications = publicationsParser.parse($)
    profile.additionalInfo = additionalInfoParser.parse($)
    profile.relatedProfiles = relatedProfilesFinder.find($)

    return profile
  }
}
