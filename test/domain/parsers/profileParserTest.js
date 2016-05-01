'use strict'

let should = require('chai').should()

let profileParser = require('../../../src/domain/profileParser')

describe('profile parser tests', () => {
    let profile;

    before(() => {
      let fs = require('fs')
      const html = fs.readFileSync(__dirname + '/profiles/profile1.html', 'utf8')
      profile = profileParser.parse(html)
    })

    it('should parse basic profile info', () => {
      profile.name.should.equal("Ivan Schwindt Ruby on Rails Developer");
      profile.locality.should.equal("Argentina");
      profile.industry.should.equal("Internet");
      profile.summary.length.should.equal(913);
      profile.connectionsCount.should.equal(395);
    })

    
})
