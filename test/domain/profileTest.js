'use strict'

const should = require('chai').should()
const profile = require('../../src/domain/profile')

describe('profile tests', () => {
    it('should bring all related profiles', () => {
        const profileObj = {
            relatedProfiles: {
                peopleAlsoViewed: [1, 2, 3],
                similar: [4, 5, 6]
            }
        }

        const result = profile.getRelatedProfiles(profileObj)

        result.should.deep.equal([1, 2, 3, 4, 5, 6])
    })
})
