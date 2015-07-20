/*
 * Simple request class. Wraps XMLHttpRequest with an easier-to-use API.
 *
 * Assumes all responses are JSON. Non-JSON responses will invoke the error
 * callback.
 *
 * Usage:
 *
 *     var Request = require('request')
 *
 *     // Second param is optional, GET requests are default
 *
 *     var req = new Request('http://url.com', { method: 'GET' })
 *
 *     req.send(
 *         function (data) {
 *             // Request was successful
 *         },
 *         function (data) {
 *             // Request failed
 *         }
 *     )
 */



function Request(url, opts) {
    this.url = url
    this.method = typeof opts !== 'undefined' ? (opts.method || 'GET') : 'GET'
}

Request.prototype.send = function (success, error) {
    var req = new XMLHttpRequest()

    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            try {
                var resp = JSON.parse(req.responseText)

                if (req.status === 200) {
                    success(resp, req.status)
                } else {
                    error(resp, req.status)
                }
            } catch (e) {
                error({ message: 'Response was not valid JSON' }, undefined)
            }
        }
    }

    req.open(this.method, this.url, true)
    req.send()
}



module.exports = Request
