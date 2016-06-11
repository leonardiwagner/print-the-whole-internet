'use strict'

const should = require('chai').should()

const consumer = require('../../src/service/consumerService')

describe.only('consumer service tests', () => {
  it('should execute producer', function(done){
    this.timeout(5000)

    const result = producer.produce('https://www.linkedin.com/in/bruno-von-lasperg-a308862a')
      .then(x => {
        console.log('vai corinthians', x)
        done();
      }).catch(x => {
        console.log("error" , x)
        done()
      })
  })
})
