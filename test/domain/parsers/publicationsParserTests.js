'use strict'

let should = require('chai').should()

let profileParser = require('../../../src/domain/profileParser')

describe('publications parser tests', () => {
  let profile;

  before(() => {
    let fs = require('fs')
    const html = fs.readFileSync(__dirname + '/profiles/profile1.html', 'utf8')
    profile = profileParser.parse(html)
  })

  it('should read publciations', () => {
      profile.publications.length.should.equal(1)
  })

  it('should read publication info', () => {
    const publication = profile.publications[0]

    publication.title.should.equal('La cara más peligrosa de Internet')
    publication.date.toString().should.equal(new Date(2011, 9, 26).toString())
  })

})
