#where-am-i

> Simple wrapper around several client-side geolocation APIs

*Note - This is still a work in progress!*

##Installation

###NPM (for Browserify)

```
$ npm install --save where-am-i
```

###Browser

Just include the [`dist/where-am-i.min.js`](https://github.com/BenConstable/where-am-i/blob/master/dist/where-am-i.min.js)
file in a script tag on your page.

##Usage

###Via Browserify

```js
var WhereAmI = require('where-am-i')
  , help = new WhereAmI()

help.findMe(
    function (place) {
        // Located successfully!
        console.log(place.lat)
        console.log(place.lng)
        console.log(place.country.name)
    }
  , function (err) {
        // Could not locate!
    }
)
```

###Via script

```html
<script src="dist/where-am-i.min.js"></script>
<script>
    var help = new WhereAmI()

    help.findMe(
        function (place) {
            // Located successfully!
            console.log(place.lat)
            console.log(place.lng)
            console.log(place.country.name)
        }
      , function (err) {
            // Could not locate!
        }
    )
</script>
```

[UMD](https://github.com/umdjs/umd) is supported for AMD and Node-style module
loaders.

###Example

Checkout [the example](https://github.com/BenConstable/where-am-i/blob/master/example/index.html)
for more usage. You can run the example in your browser like:

```
$ git clone git@github.com:BenConstable/where-am-i.git
$ cd where-am-i/
$ npm install
$ [node_modules/.bin/]gulp example
```

##API

####`WhereAmI` object

#####`var w = new WhereAmI([locator], [storage])`

The constructor accepts 2 parameters. The first is the geolocation service to
use, and the second is the caching backend to use. Both parameters are optional,
with sensible defaults.

Available gelocation services:

* `freegeoip` (default): Locate via http://freegeoip.net/

Availble caches:

* `localstorage` (default): Store the geolocation result in local storage
* `variable`: Store the geolocation in a local variable

#####`w.findMe(success, error, [fromStorage])`

Locate a user. Accepts success and error callbacks, and optionally overriding
the option to retrieve the data from storage if it exists (true by default). E.g:

```js
w.findMe(
    function (place) {}
  , function (err) {}
)
```

#####`WhereAmI.addLocatorAdapter(key, service)`

Register a new geolocation adapter for use with the service.

The locator should provide `locate(success, err)` method. See the [Free Geo IP](https://github.com/BenConstable/where-am-i/blob/master/src/locators/free-geo-ip.js) adapter for an example.

#####`WhereAmI.addStorageAdapter(key, service)`

Register a new storage adapter for use with the service.

The storage adapter should provide `hasLocated()`, `putPlace(place)` and `getPlace()`
methods. See the [local storage](https://github.com/BenConstable/where-am-i/blob/master/src/storage/local-storage-adapter.js) adapter for an example.

####`Place` object

#####`p.lat`

The geolocated latitude.

#####`p.lng`

The geolocated longitude.

#####`p.country.iso`

The geolocated [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) country
code (e.g GB).

#####`p.country.name`

The geolocated country name (e.g United Kingdom).

#####`p.country.region`

The geolocated country region. Possible values are:

* Africa
* Antarctica
* Asia
* Europe
* North America
* Oceania
* South America

#####`p.inCountry(isoCodes)`

Check if the geolocated result is in the given country. Accepts an [ISO](https://en.wikipedia.org/wiki/ISO_3166-1)
code, or an array of codes.

#####`p.inRegion(regions)`

Check if the geolocated result is in the given region (see possible values above).
Accepts a single region, or an array of regions. Each region can have an case and
any amount of whitespace. E.g:

```js
p.inRegion('North America')
p.inRegion('NORTH AMERICA')
p.inRegion('nOrTHAMerica')
p.inRegion(['North America', 'Europe'])
```

##License

MIT © Ben Constable
