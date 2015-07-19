/*
 * Storage adapter to store a location in a variable.
 */



function VarStorageAdapter() {
    this.place = null
}

VarStorageAdapter.prototype.hasLocated = function () {
    return this.place !== null
}

VarStorageAdapter.prototype.putPlace = function (place) {
    this.place = place

    return this.place
}

VarStorageAdapter.prototype.getPlace = function () {
    return this.place
}



module.exports = VarStorageAdapter
