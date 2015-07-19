/*
 * Simple manager class. Allows registration and fetching of different services.
 *
 * Usage:
 *
 *     var Manager = require('manager')
 *
 *     var m = new Manager()
 *
 *     m.register('a', new ServiceA()).register('b', new ServiceB())
 *     m.setDefault('a')
 *
 *     m.fetch('a').doSomethingOnA()
 *     m.fetch('b').doSomethingOnB()
 *     m.fetchDefault().doSomethingOnA()
 */



function Manager() {
    this.services = {}
    this.defaultService = null
}

Manager.prototype.register = function (key, service) {
    this.services[key] = service

    return this
}

Manager.prototype.fetch = function (key) {
    if (typeof this.services[key] !== 'undefined') {
        return this.services[key]
    } else {
        throw new Error('Service ' + key + ' is not registered')
    }
}

Manager.prototype.fetchDefault = function () {
    if (this.defaultService !== null) {
        return this.fetch(this.defaultService)
    } else {
        throw new Error('Default service not set')
    }
}

Manager.prototype.setDefault = function (key) {
    if (typeof this.services[key] !== 'undefined') {
        this.defaultService = key
        return this
    } else {
        throw new Error('Service ' + key + ' is not registered')
    }
}



module.exports = Manager
