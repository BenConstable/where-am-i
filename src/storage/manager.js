/*
 * Service locator for different storage adapaters.
 *
 * Available adapters are:
 *
 *     - variable: Simple non-persistent variable cache
 *     - localstorage (default): Use localStorage to persist data
 */



var VarStorageAdapter = require('./var-storage-adapter')
  , LocalStorageAdapter = require('./local-storage-adapter')
  , Manager = require('../util/manager')
  , m = new Manager()



m
    .register('variable', new VarStorageAdapter())
    .register('localstorage', new LocalStorageAdapter())
    .setDefault('variable')



module.exports = m
