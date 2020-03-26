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
  const tem = {}
  traverse(ast, {
    Identifier (path) {
      autoImport.forEach(cur => {
        if (path.node.name === cur.name && !(cur.name in tem)) {
          arr.push(cur)
          tem[cur.name] = cur.name
        }
      })
    }
  })
  if (arr.length) {
    const importTpl = arr.map(cur => generateDeclaration(cur))
    ast.program.body.unshift(...importTpl)
  }
  return generate(ast).code
}
module.exports = transtJs
