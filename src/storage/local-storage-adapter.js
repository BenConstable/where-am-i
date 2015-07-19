/*
 * Storage adapter to store a location in localStorage.
 */



var Place = require('../place')



function LocalStorageAdapter() {
    this.key = 'where_am_i_place'
}

LocalStorageAdapter.prototype.hasLocated = function () {
    return localStorage.getItem(this.key) !== null
}

LocalStorageAdapter.prototype.putPlace = function (place) {
    localStorage.setItem(this.key, JSON.stringify(place))

    return place
}

LocalStorageAdapter.prototype.getPlace = function () {
    return new Place(JSON.parse(localStorage.getItem(this.key)))
}



module.exports = LocalStorageAdapter
