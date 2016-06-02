'use strict'

let should = require('chai').should()

let profileParser = require('./../../../src/domain/profileParser/profileParser')

describe('experiences profileParser tests', () => {
  let profile;

  before(() => {
    let fs = require('fs')
    const html = fs.readFileSync(__dirname + '/profiles/profile1.html', 'utf8')
    profile = profileParser.parse(html)
  })

  it('should parse experiences info', () => {
    const experiences = profile.experiences;

    experiences.length.should.equal(10)

    experiences[0].title.should.equal('Web Developer')
    experiences[0].company.should.equal('Patagonian Tech')
    experiences[0].description.should.equal('Ruby on Rails development and Bootstrap')
    experiences[0].durationStart.should.equal('August 2015')
    experiences[0].durationEnd.should.equal('Present')
    experiences[0].locality.should.equal('')
  })

  it('should parse current experience date', () => {
    const experience = profile.experiences[0];

    experience.durationStartDate.toString().should.equal(new Date(2015, 7, 1).toString())
    experience.isPresent = true
  })

  it('should parse previous experience date', () => {
    const experience = profile.experiences[6];

    experience.durationStartDate.toString().should.equal(new Date(2012, 9, 1).toString())
    experience.durationEndDate.toString().should.equal(new Date(2013, 5, 1).toString())
    experience.isPresent = false
  })
})
