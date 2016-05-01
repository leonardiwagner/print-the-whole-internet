'use strict'

let chai = require('chai')
let should = chai.should()

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
    });

    it('should parse experiences info', () => {
      const experiences = profile.experiences;

      experiences.length.should.equal(10)

      experiences[0].title.should.equal('Web Developer')
      experiences[0].company.should.equal('Patagonian Tech')
      experiences[0].description.should.equal('Ruby on Rails development and Bootstrap')
      experiences[0].durationStart.should.equal('August 2015')
      experiences[0].durationEnd.should.equal('Present')
      experiences[0].locality.should.equal('')
    });
});
