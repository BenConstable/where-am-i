var assert = require('assert')
  , countries = require('../../src/util/country-data').countries
  , regions = require('../../src/util/country-data').regions



describe('countries', function () {
    it('should contain GB data in GB', function () {
        assert.equal(countries.GB.name, 'United Kingdom')
        assert.equal(countries.GB.region, 'Europe')
        assert.equal(countries.GB.iso, 'GB')
    })

    it('should contain USA data in US', function () {
        assert.equal(countries.US.name, 'United States')
        assert.equal(countries.US.region, 'North America')
        assert.equal(countries.US.iso, 'US')
    })
})

describe('regions', function () {
    it('should contain European countries in Europe', function () {
        assert(regions.EUROPE.indexOf('GB') !== -1)
        assert(regions.EUROPE.indexOf('FR') !== -1)
        assert(regions.EUROPE.indexOf('US') === -1)
    })

    it('should contain North American countries in North America', function () {
        assert(regions.NORTHAMERICA.indexOf('GB') === -1)
        assert(regions.NORTHAMERICA.indexOf('FR') === -1)
        assert(regions.NORTHAMERICA.indexOf('US') !== -1)
    })
})
