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

  it('should read languages', () => {
      profile.languages.length.should.equal(1)
      profile.languages[0].title.should.equal('Inglés')
      profile.languages[0].proficiency.should.equal('')
  })

})
