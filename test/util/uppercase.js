var assert = require('assert')
  , uppercase = require('../../src/util/uppercase')



describe('uppercase', function () {
    it('should uppercase all letters', function () {
        assert.equal(uppercase('hello'), 'HELLO')
    })

    it('should strip spaces', function () {
        assert.equal(uppercase(' he ll o    '), 'HELLO')
    })
})
