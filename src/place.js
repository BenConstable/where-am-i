/*
 * A Place is a individual location. It has a lat, long and country info.
 *
 * You can also check if a Place is in a certain country or region.
 *
 * See the readme for the list of available regions.
 *
 * Usage:
 *
 *     var Place = require('place')
 *
 *     // Data is the result of a Free Geo IP API call
 *
 *     var p = new Place({lat: '', lng: '', iso: ''})
 *
 *     p.lat // 51.123
 *     p.lng // 1.456
 *
 *     p.country.iso // GB
 *     p.country.name // United Kingdom
 *     p.country.region // Europe
 *
 *     p.inCountry('GB') // true
 *     p.inCountry(['GB', 'DE']) // true
 *     p.inCountry(['DE', 'FR']) // false
 *
 *     p.inRegion('Europe') // true
 *     p.inRegion(['Europe', 'North America']) // true
 *     p.inRegion(['North America', 'South America']) // false
 */



var countries = require('./util/country-data').countries
  , regions = require('./util/country-data').regions
  , uppercase = require('./util/uppercase')



function Place(data) {
    this.lat = data.lat
    this.lng = data.lng

    if (typeof data.iso !== undefined) {
        this.country = countries[data.iso]
    } else {
        this.country = data.country
    }
}

Place.prototype.inCountry = function (cs) {
    if (!(cs instanceof Array)) {
        cs = [cs]
    }

    return cs.indexOf(this.country.iso) !== -1
}

Place.prototype.inRegion = function (rs) {
    if (!(rs instanceof Array)) {
        rs = [rs]
    }

    for (var i = 0; i < rs.length; i++) {
        var r = uppercase(rs[i])

        if (typeof regions[r] !== 'undefined') {
            if (regions[r].indexOf(this.country.iso) !== -1) {
                return true
            }
        }
    }

    return false
}



module.exports = Place
