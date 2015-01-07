const test = require('tape')
const path = require('path')
const dtj  = require('./')

const jsonRes = {
  barDir: [
    'file1',
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

test('dtj', function(t) {
  t.plan(2)
  dtj(path.resolve('./test'), function(err, res) {
    t.ifError(err, 'no err')
    t.deepEqual(res, jsonRes)
  })
})
