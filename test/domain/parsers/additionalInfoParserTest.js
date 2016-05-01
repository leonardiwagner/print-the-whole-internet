'use strict'

let should = require('chai').should()

let profileParser = require('../../../src/domain/profileParser')

describe('additional info parser tests', () => {
  let profile;

  before(() => {
    let fs = require('fs')
    const html = fs.readFileSync(__dirname + '/profiles/profile1.html', 'utf8')
    profile = profileParser.parse(html)
  })

  it('should parse interests', () => {
    profile.additionalInfo.interests.length.should.equal(8)
    profile.additionalInfo.interests[0].should.equal('Programación')
  })

  it('should parse personal details', () => {
    profile.additionalInfo.personalInfo.length.should.equal(2)
    profile.additionalInfo.personalInfo[0].description.should.equal('Birthday')
    profile.additionalInfo.personalInfo[0].content.should.equal('March 14')
  })

})
