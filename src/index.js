let loaderUtils = require('loader-utils')
let valiation = require('schema-utils')
const compiler = require('vue-template-compiler')
const transtJs = require('./transt')

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
  valiation(schema, options, 'auto-import')
  let vuecontent = compiler.parseComponent(source)
  if (vuecontent.script) {
    const outCode = transtJs(vuecontent.script.content, options)
    const styleTpl = vuecontent.styles.map(style => {
      return `<${style.type} ` + `${style.lang ? 'lang="' + style.lang + '"' : '' }` + ` ${style.scoped ? 'scoped' : ''}>${style.content}</${style.type}>`
    }).join('\n')
    const allTpl = `
    <template>
    ${vuecontent.template.content}
    </template>
    <script>
    ${outCode}
    </script>
    ${styleTpl}
    `
    cb(null, allTpl)
  } else {
    cb(null, source)
  }
}

export default loader
