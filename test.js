const test = require('tape')
const path = require('path')
const dto  = require('./')

const jsonRes = {
  barDir: [
    '.file1',
    'file2',
    'file3'
  ],
  binDir: {
    blaDir: ['file7']
  },
  fooDir: [
    'file4',
    'file5',
    'file6'
  ]
}

const jsonResNoDot = {
  barDir: [
    'file2',
    'file3'
  ],
  binDir: {
    blaDir: ['file7']
  },
  fooDir: [
    'file4',
    'file5',
    'file6'
  ]
}

test('dto', function(t) {
  t.plan(2)
  dto(path.resolve('./test'), function(err, res) {
    t.ifError(err, 'no err')
    t.deepEqual(res, jsonRes)
  })
})

test('dto should accept opts', function(t) {
  t.plan(2)
  dto({path: path.resolve('./test')}, function(err, res) {
    t.ifError(err, 'no err')
    t.deepEqual(res, jsonRes)
  })
})

test('dto({dot: false})', function(t) {
  t.plan(2)
  dto({path: path.resolve('./test'), noDot: true}, function(err, res) {
    t.ifError(err, 'no err')
    t.deepEqual(res, jsonResNoDot)
  })
})
