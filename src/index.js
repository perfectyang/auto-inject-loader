let loaderUtils = require('loader-utils')
let valiation = require('schema-utils')
const transtJs = require('./transt')

function loader (source) {
  let cb = this.async()
  let options = loaderUtils.getOptions(this)
  let schema = {
    type: 'object',
    properties: {
      default: {
        type: 'string'
      },
      autoImport: {
        type: 'array'
      }
    }
  }
  valiation(schema, options, 'auto-import')
  const outCode = transtJs(source, options)
  cb(null, outCode)
}

module.exports = loader
