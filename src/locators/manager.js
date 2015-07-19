/*
 * Service locator for different locators.
 *
 * Available adapters are:
 *
 *     - freegeoip (default): Locate a user via Free Geo IP
 */



var FreeGeoIp = require('./free-geo-ip')
  , Manager = require('../util/manager')
  , m = new Manager()



m
    .register('freegeoip', new FreeGeoIp())
    .setDefault('freegeoip')



module.exports = m
