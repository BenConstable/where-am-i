/*
 * Function to convert a string to all uppercase, without whitespace.
 *
 * Usage:
 *
 *     var uppercase = require('uppercase')
 *
 *     uppercase('hello world   ') // 'HELLOWORLD'
 */



function uppercase(str) {
    return str.replace(/ /g, '').toUpperCase()
}



module.exports = uppercase
