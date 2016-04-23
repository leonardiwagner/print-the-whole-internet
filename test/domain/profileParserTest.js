'use strict'

let chai = require('chai')
let should = chai.should()

let experiencesParser = require('../../src/domain/parsers/experiencesParser')
let skillsParser = require('../../src/domain/parsers/skillsParser')

describe('profile parser tests', () => {
    it('should return -1 when the value is not present', () => {
      [1,2,3].indexOf(5).should.equal(-1);
      [1,2,3].indexOf(0).should.equal(-1);
    });
});
