var assert = require('assert')
  , Place = require('../src/place')



describe('Place', function () {
    it('should have a lat and lng', function () {
        var p = new Place({
            lat: 123
          , lng: 156
        })

        assert.equal(p.lat, 123)
        assert.equal(p.lng, 156)
    })

    it('should be able to accept a country object', function () {
        var p = new Place({
            country: {
                iso : 'GB'
              , name: 'United Kingdom'
              , region: 'Europe'
            }
        })

        assert.equal(p.country.iso, 'GB')
        assert.equal(p.country.name, 'United Kingdom')
        assert.equal(p.country.region, 'Europe')
    })

    it('should be able to accept a country ISO', function () {
        var p = new Place({
            iso : 'GB'
        })

        assert.equal(p.country.iso, 'GB')
        assert.equal(p.country.name, 'United Kingdom')
        assert.equal(p.country.region, 'Europe')
    })

    it('should handle an invalid country ISO', function () {
        var p = new Place({
            iso : 'GBTG'
        })

        assert(p.country !== null && typeof p.country === 'object')

        var p1 = new Place({
            iso : false
        })

        assert(p1.country !== null && typeof p1.country === 'object')
    })

    it('should handle no country or ISO', function () {
        var p = new Place({})

        assert(p.country !== null && typeof p.country === 'object')
    })

    it('should check if a location is in a country', function () {
        var p = new Place({
            iso : 'GB'
        })

        assert(p.inCountry('GB'))
        assert(p.inCountry(['GB']))
        assert(p.inCountry(['GB', 'FR']))

        assert(!p.inCountry('FR'))
        assert(!p.inCountry(['FR']))
        assert(!p.inCountry(['FR', 'DE']))

        var p1 = new Place({})

        assert(!p1.inCountry('GB'))
        assert(!p1.inCountry(['GB']))
        assert(!p1.inCountry(['GB', 'FR']))
    })

    it('should check if a location is in a region', function () {
        var p = new Place({
            iso : 'GB'
        })
        assert(p.inRegion('Europe'))
        assert(p.inRegion(['Europe']))
        assert(p.inRegion(['Europe', 'Asia']))
        assert(p.inRegion('EuROPe   '))
        assert(p.inRegion(['EuROPe   ']))

        assert(!p.inRegion('Asia'))
        assert(!p.inRegion(['Asia']))
        assert(!p.inRegion(['Asia', 'North America']))
        assert(!p.inRegion('AsiA   '))
        assert(!p.inRegion(['AsiA   ']))

        assert(!p.inRegion('not a region'))
        assert(!p.inRegion(['not a region']))
    })
})
