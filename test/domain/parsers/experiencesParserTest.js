'use strict'

let chai = require('chai')
let should = chai.should()

let profileParser = require('../../../src/domain/profileParser')

describe('experiences parser tests', () => {
  let profile;

  before(() => {
    let fs = require('fs')
    const html = fs.readFileSync(__dirname + '/profiles/profile1.html', 'utf8')
    profile = profileParser.parse(html)
  })

  it('should parse current experience date', () => {
    const experience = profile.experiences[0];

    experience.durationStartDate.toString().should.equal(new Date(2015, 7, 1).toString())
    experience.isPresent = true
  });

  it('should parse previous experience date', () => {
    const experience = profile.experiences[6];

    experience.durationStartDate.toString().should.equal(new Date(2012, 9, 1).toString())
    experience.durationEndDate.toString().should.equal(new Date(2013, 5, 1).toString())
    experience.isPresent = false
  });
});
