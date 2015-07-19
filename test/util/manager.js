var assert = require('assert')
  , Manager = require('../../src/util/manager')



describe('Manager', function () {
    it('should register and retrieve a service', function () {
        var m = new Manager()
        m.register('test', { hello: 'world' })
        assert.equal(m.fetch('test').hello, 'world')
    })

    it('should throw an error if a service isn\'t registered', function () {
        var m = new Manager()
        m.register('test', { hello: 'world' })
        assert.throws(function () {
            m.fetch('error')
        })
    })

    it('should set a service as the default', function () {
        var m = new Manager()
        m.register('test', { hello: 'world' })
        m.setDefault('test')
        assert.equal(m.fetchDefault().hello, 'world')
    })

    it('should throw an error when trying to set a default service that doesn\'t exist', function () {
        var m = new Manager()
        m.register('test', { hello: 'world' })
        assert.throws(function () {
            m.setDefault('error')
        })
    })

    it('should throw an error when trying to fetch the default service when one isn\'t set', function () {
        var m = new Manager()
        m.register('test', { hello: 'world' })
        assert.throws(function () {
            m.fetchDefault()
        })
    })
})
