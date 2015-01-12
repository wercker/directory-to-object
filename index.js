
const walk   = require('fs-walk')
const assert = require('assert')

module.exports = dto

// directory-to-object
// @param {Object|String} opts
// @param {Function} cb
function dto(opts, cb) {
  opts = 'string' == typeof opts
    ? {path: opts}
    : opts

  const path = opts.path || process.cwd()
  cb = cb || function(){}

  assert.equal(typeof path, 'string')
  assert.equal(typeof cb, 'function')

  saveDirs(path, {}, function(err, res) {
    if (err) return cb(err)
    saveFiles(path, opts, res, cb)
  })
}

// Save directory structure.
// @param {String} path
// @param {Object} obj
// @param {Function} cb
function saveDirs(path, obj, cb) {
  var currDir = ''
  var root    = ''

  walk.walk(path, walkFn, function(err) {
    if (err) return cb(err)
    cb(null, obj)
  })

  function walkFn(baseDir, filename, stat, next) {
    if (!root) root = baseDir
    baseDir = stripLeadingSlash(baseDir.split(root)[1])

    if (!baseDir) return next()
    if (obj[baseDir]) return next()

    if (baseDir != currDir) currDir = baseDir

    if (stat.isDirectory()) {
      setObject(baseDir, obj, {})
      return next()
    }

    setObject(baseDir, obj, [])
    next()
  }
}

// Save filenames in dir structure.
// @param {String} path
// @param {Object} opts
// @param {Object} obj
// @param {Function} cb
function saveFiles(path, opts, obj, cb) {
  const noDot = opts.noDot
  var root  = ''

  walk.walk(path, walkFn, function (err) {
    if (err) cb(err)
    cb(null, obj)
  })

  function walkFn(baseDir, filename, stat, next) {
    if (!root) root = baseDir
    baseDir = stripLeadingSlash(baseDir.split(root)[1])

    if (stat.isDirectory()) return next()
    if (noDot) {
      if (/^\./.test(filename)) return next()
    }
    pushArr(baseDir, obj, filename)
    next()
  }
}

// Remove the leading slash from a url
// @param {String} str
function stripLeadingSlash(str) {
  if (str.substr(0, 1) == '/') return str.substr(1)
  return str
}

// Set a nested value on an object.
// @param {String} path
// @param {Object} obj
// @param {Any} value
function setObject(path, obj, val) {
  path = path.split('/')
  path.forEach(function(subPath) {
    obj = obj[subPath] = obj[subPath] || val
  })
}

// Push a value to an array nested in an object.
// @param {String} path
// @param {Object} opts
// @param {Object} obj
// @param {Any} value
function pushArr(path, obj, val) {
  path = path.split('/')
  path.forEach(function(subPath) {
    if (Array.isArray(obj[subPath])) return obj[subPath].push(val)
    obj = obj[subPath]
  })
}
