/*
 * Location service to find a user via http://freegeoip.net/.
 */



var Request = require('../util/request')
  , Place = require('../place')



function FreeGeoIp() {}

FreeGeoIp.prototype.locate = function (success, err) {
    var req = new Request('//freegeoip.net/json/')
      , that = this

    req.send(
        function (resp) {
            success(that.createPlace(resp))
        }
      , function (resp) {
            err(resp)
        }
    )
}

FreeGeoIp.prototype.createPlace = function (data) {
    return new Place({
        lat: data.latitude
      , lng: data.longitude
      , iso: data.country_code
    })
}



module.exports = FreeGeoIp
