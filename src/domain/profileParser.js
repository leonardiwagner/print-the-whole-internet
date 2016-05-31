'use strict';

const cheerio = require('cheerio')

const educationsParser = require('./parsers/educationsParser')
const experiencesParser = require('./parsers/experiencesParser')
const coursesParser = require('./parsers/coursesParser')
const projectsParser = require('./parsers/projectsParser')
const honorsParser = require('./parsers/honorsParser')
const languagesParser = require('./parsers/languagesParser')
const organizationsParser = require('./parsers/organizationsParser')
const basicProfileParser = require('./parsers/basicProfileParser')
const skillsParser = require('./parsers/skillsParser')
const publicationsParser = require('./parsers/publicationsParser')
const additionalInfoParser = require('./parsers/additionalInfoParser')
const relatedProfilesFinder = require('./parsers/relatedProfilesFinder')

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
