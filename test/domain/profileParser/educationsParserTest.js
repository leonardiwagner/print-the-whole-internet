'use strict'

let should = require('chai').should()

let profileParser = require('./../../../src/domain/profileParser/profileParser')

describe('educations profileParser tests', () => {
  let profile;

  before(() => {
    let fs = require('fs')
    const html = fs.readFileSync(__dirname + '/profiles/profile1.html', 'utf8')
    profile = profileParser.parse(html)
  })

  it('should parse educations', () => {
    profile.educations.length.should.equal(2)
  })

  it('should parse education info', () => {
    const education = profile.educations[0]

    education.title.should.equal('Universidad Nacional del Comahue')
    education.degree.should.equal('Licenciatura en ciencias de la computación')
    education.startYear.should.equal('2012')
    education.endYear.should.equal('2013')
    education.durationYears.should.equal(1)
    education.description.should.equal('')
    education.majors[0].should.equal('Informatics')
  })

})
