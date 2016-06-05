'use strict'

let should = require('chai').should()

let profileParser = require('./../../../src/domain/profileParser/profileParser')

describe('courses profileParser tests', () => {
  let profile;

  before(() => {
    let fs = require('fs')
    const html = fs.readFileSync(__dirname + '/profiles/profile1.html', 'utf8')
    profile = profileParser.parse(html)
  })

  it('should read courses', () => {
      profile.courses.length.should.equal(2)
  })

  it('should read course info', () => {
    const course = profile.courses[0]
    course.title.should.equal('Independent Coursework')
    course.items.length.should.equal(4)
    course.items[0].should.equal('PHP Developer')
  })

})
