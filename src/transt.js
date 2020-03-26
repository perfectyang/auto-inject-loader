const t = require('@babel/types')
const parser = require('@babel/parser')
const generate = require('@babel/generator').default
const traverse = require('@babel/traverse').default
function generateDeclaration(cur) {
  return t.importDeclaration([
    t.importDefaultSpecifier(t.identifier(cur.name))
  ], t.stringLiteral(cur.paths))
}


function transtJs (code, options) {
  const autoImport = options.autoImport
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: [
      'dynamicImport'
    ]
  })
  let arr = []
  const keys = autoImport.map(cur => cur.name)
  const tem = {}
  traverse(ast, {
    Identifier (path) {
      const name = path.node.name
      if (keys.includes(name) && !(name in tem)) {
        arr.push(name)
        tem[name] = name
      }
    }
  })
  if (arr.length) {
    const importTpl = autoImport.filter(cur => arr.includes(cur.name)).map(obj => generateDeclaration(obj))
    ast.program.body.unshift(...importTpl)
  }
  return generate(ast).code
}
module.exports = transtJs
