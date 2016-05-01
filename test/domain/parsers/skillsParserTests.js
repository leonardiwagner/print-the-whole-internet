'use strict'

let should = require('chai').should()

let profileParser = require('../../../src/domain/profileParser')

describe('language parser tests', () => {
  let profile;

  before(() => {
    let fs = require('fs')
    const html = fs.readFileSync(__dirname + '/profiles/profile1.html', 'utf8')
    profile = profileParser.parse(html)
  })

  it('should read skills', () => {
      profile.skills.length.should.equal(49)
  })

  it('should read skill info', () => {
      profile.skills[0].title.should.equal('MySQL')
      profile.skills[0].count.should.equal(13)
  })

})
