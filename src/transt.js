const t = require('@babel/types')
const parser = require('@babel/parser')
const generate = require('@babel/generator').default
const traverse = require('@babel/traverse').default
const getImportName = require('./getImportName')
const {isIncludes} = require('./utils')

function generateDeclaration (url, names) {
  const temArr = []
  names.forEach(cur => {
    if (cur.key === 'normal') {
      temArr.push(
        t.importSpecifier(t.identifier(cur.name), t.identifier(cur.name))
      )
    } else if (cur.key === 'default') {
      temArr.unshift(
        t.importDefaultSpecifier(t.identifier(cur.name))
      )
    }
  })
  return t.importDeclaration(temArr, t.stringLiteral(url))
}

function transtJs (code, options) {
  const autoImport = options.autoImport
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: [
      'dynamicImport'
    ]
  })
  const srcUrl = autoImport.map(cur => cur)
  const keys = srcUrl.map(url => ({url: url.paths, names: getImportName(url)}))
  let arr = keys.map(key => ({url: key.url, names: []}))
  const tem = {}
  traverse(ast, {
    Identifier (path) {
      const name = path.node.name
      keys.forEach((key, idx) => {
        const value = isIncludes(key.names, (cur) => String(cur.name) === String(name))
        if (value && !(name in tem)) {
          arr[idx].names.push(value)
          tem[name] = name
        }
      })
    }
  })
  arr = arr.filter(cur => cur.names.length)
  if (arr.length) { // 其中有 [[], [xx, xxxx]]
    const importTpl = arr.map(({url, names}) => generateDeclaration(url, names))
    ast.program.body.unshift(...importTpl)
  }
  return generate(ast).code
}

module.exports = transtJs
