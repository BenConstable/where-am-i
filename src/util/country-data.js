/*
 * Fetch country data from the included JSON file, and format it for use in the
 * location library.
 *
 * Exports an object with:
 *
 *     - countries: A hash of country objects, keyed by 2-letter ISO code
 *     - regions:   A hash or region names (uppercase, no whitespace), each with
 *                  an array of 2-letter ISO country codes in those regions
 */



var source = require('../../data/countries.json')
  , uppercase = require('./uppercase')



function CountryData(source) {
    this.source = source
}

CountryData.prototype.countriesByCode = function () {
    var res = {}

    for (var i = 0; i < this.source.length; i++) {
        var country = this.source[i]

        res[country.iso] = country
    }

    return res
}

CountryData.prototype.countryCodesByRegion = function () {
    var res = {}

    for (var i = 0; i < this.source.length; i++) {
        var country = this.source[i]
          , region = uppercase(country.region)

        if (typeof res[region] === 'undefined') {
            res[region] = []
        }

        res[region].push(country.iso)
    }

    return res
}



var c = new CountryData(source)

module.exports = {
    countries: c.countriesByCode()
  , regions: c.countryCodesByRegion()
}
