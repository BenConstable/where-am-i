/*
 * Service for geo-locating users and working with their location.
 *
 *
 * Usage:
 *
 *     var WhereAmI = require('where-am-i')
 *
 *     // Store the user's location in localstorage. See src/storage/manager.ks for
 *     // the list of available adapters
 *
 *     var help = WhereAmI()
 *
 *     help.findMe(
 *         function (place) {
 *             // Success! See src/place.js for the 'place' API
 *         },
 *         function (err) {
 *             // Error. 'err' contains error data
 *         },
 *         true // Attempt to use stored location. 'true' by default
 *     )
 *
 *     // Add your own storage or locator adapter. See the src/storage/ and
 *     // src/locators/ directories for the API and examples
 *
 *     WhereAmI.addStorageAdapter('mystorage', new MyStorage())
 *     WhereAmI.addLocatorAdapter('mylocator', new MyLocator())
 */



var locatorAdapterManager = require('./locators/manager')
  , storageAdapterManager = require('./storage/manager')


function WhereAmI(locator, storage) {
    if (typeof locator === 'undefined') {
        this.locator = locatorAdapterManager.fetchDefault()
    } else {
        this.locator = locatorAdapterManager.fetch(locator)
    }

    if (typeof storage === 'undefined') {
        this.storage = storageAdapterManager.fetchDefault()
    } else {
        this.storage = storageAdapterManager.fetch(storage)
    }
}

WhereAmI.prototype.findMe = function (success, err, fromStorage) {
    if (typeof fromStorage === 'undefined') {
        fromStorage = true
    }

    if (!fromStorage || !this.storage.hasLocated()) {
        var that = this

        this.locator.locate(
            function (place) {
                success(that.storage.putPlace(place))
            },
            function (data) {
                err(data)
            }
        )
    } else {
        success(this.storage.getPlace())
    }
}

WhereAmI.addStorageAdapter = function (key, adapter) {
    storageAdapterManager.register(key, adapter)

    return this
}

WhereAmI.addLocatorAdapter = function (key, adapter) {
    locatorAdapterManager.register(key, adapter)

    return this
}



module.exports = WhereAmI
