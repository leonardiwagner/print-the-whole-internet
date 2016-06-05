'use strict'

let should = require('chai').should()

let profileParser = require('./../../../src/domain/profileParser/profileParser')

describe('projects profileParser tests', () => {
  let profile;

  before(() => {
    let fs = require('fs')
    const html = fs.readFileSync(__dirname + '/profiles/profile1.html', 'utf8')
    profile = profileParser.parse(html)
  })

  it('should read projects', () => {
      profile.projects.length.should.equal(7)
  })

  it('should read project info', () => {
    const project = profile.projects[0]
    project.title.should.equal('Ynnova SMS')
    project.date.toString().should.equal(new Date(2014, 3, 1).toString())
  })

})
