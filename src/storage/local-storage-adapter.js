/*
 * Storage adapter to store a location in localStorage.
 */



var Place = require('../place')



function LocalStorageAdapter() {
    this.key = 'where_am_i_place'
}

LocalStorageAdapter.prototype.hasLocated = function () {
    if (localStorage.getItem(this.key)) {
        try {
            JSON.parse(localStorage.getItem(this.key))
            return true
        } catch (e) {
            return false
        }
    } else {
        return false
    }
}

LocalStorageAdapter.prototype.putPlace = function (place) {
    localStorage.setItem(this.key, JSON.stringify(place))

    return place
}

LocalStorageAdapter.prototype.getPlace = function () {
    return new Place(JSON.parse(localStorage.getItem(this.key)))
}



module.exports = LocalStorageAdapter
