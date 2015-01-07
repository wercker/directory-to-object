# directory-to-object
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

Analyze a directory structure and return a `json` representation. Expects a flat
folder structure with either files or directories.

## Installation
```bash
$ npm install directory-to-object
```

## Usage
```js
const dto  = require('directory-to-object')
const path = require('path')

dto(path.resolve('./test'), (err, res) => console.log(res))
// {
//   fooDir: [file1, file2, file3],
//   barDir: [file4, file5, file6]
// }
```

## Why?
When parsing several directories of files it's nice to _just_ have to
provide a path rather than creating an index object manually. This is useful
for creating static sites out of markdown files.

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/directory-to-object.svg?style=flat-square
[npm-url]: https://npmjs.org/package/directory-to-object
[downloads-image]: http://img.shields.io/npm/dm/directory-to-object.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/directory-to-object
