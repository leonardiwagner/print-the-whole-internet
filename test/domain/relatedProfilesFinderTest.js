'use strict'

let should = require('chai').should()

describe('related profiles finder', () => {

  it('should read related profiles links', () => {
    let fs = require('fs')
    const html = fs.readFileSync(__dirname + '/parsers/profiles/profile1.html', 'utf8')
    let relatedProfilesFinder = require('../../src/domain/relatedProfilesFinder')
    const relatedProfiles = relatedProfilesFinder.getRelatedProfiles(html)

    relatedProfiles.length.should.equal(22)
  })

})
