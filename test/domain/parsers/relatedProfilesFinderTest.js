'use strict'

let should = require('chai').should()

let profileParser = require('../../../src/domain/profileParser')

describe('related profiles finder', () => {

    let profile

    before(() => {
        let fs = require('fs')
        const html = fs.readFileSync(__dirname + '/profiles/profile1.html', 'utf8')
        profile = profileParser.parse(html)
    })

  it('should read related profiles links', () => {
    profile.relatedProfiles.peopleAlsoViewed.length.should.equal(10)
      profile.relatedProfiles.similar.length.should.equal(12)
  })

})
