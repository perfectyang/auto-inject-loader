let loaderUtils = require('loader-utils')
let valiation = require('schema-utils')
const transtJs = require('./transt')
const {isIncludes} = require('./utils')
function loader (source) {
  let cb = this.async()
  let options = loaderUtils.getOptions(this)
  let schema = {
    type: 'object',
    properties: {
      autoImport: {
        type: 'array'
      }
    }
  }
  valiation(schema, options, 'auto-inject')

  const val = isIncludes(options.autoImport, (cur) => {
    return (cur.basePath + '/' + cur.paths) === this.resourcePath
  })
  if (!val) {
    const outCode = transtJs(source, options)
    cb(null, outCode)
  } else {
    cb(null, source)
  }

}

module.exports = loader
