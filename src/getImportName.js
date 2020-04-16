const fs = require('fs')
const path = require('path')
const t = require('@babel/types')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default

function readText (url) {
  const text = fs.readFileSync(path.join(url.basePath || '', url.paths), 'utf8')
  return text
}

function getImportName (url) {
  const code = readText(url)
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: [
      'dynamicImport'
    ]
  })
  const collectName = new Set()
  let defaultName
  traverse(ast, {
    ExportNamedDeclaration (path) {
      const node = path.node.declaration
      if (node && t.isVariableDeclaration(node)) { // 变量式函数声明
        collectName.add(node.declarations[0].id.name)
      } else if (node && t.isFunctionDeclaration(node)) { // 函数式声明
        collectName.add(node.id.name)
      }
    },
    ExportDefaultDeclaration (path) {
      const node = path.node.declaration
      if (node) {
        if (t.isIdentifier(node)) {
          defaultName = node.name
        } else if (t.isFunctionDeclaration(node)) {
          defaultName = node.id.name
        }
      }
    }
  })
  const fnNames = [...collectName].map(name => {
    return {
      key: 'normal',
      name
    }
  })
  fnNames.unshift({
    key: 'default',
    name: defaultName
  }) // 默认第一个值为default
  return fnNames
}
module.exports = getImportName
