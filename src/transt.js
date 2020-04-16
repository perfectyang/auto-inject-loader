const t = require('@babel/types')
const parser = require('@babel/parser')
const generate = require('@babel/generator').default
const traverse = require('@babel/traverse').default
const getImportName = require('./getImportName')
const {isIncludes} = require('./utils')

function generateDeclaration (url, names) {
  const temArr = []
  names.forEach(cur => {
    console.log('bllss要------', cur)
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
  console.log('arr', arr)
  if (arr.length) { // 其中有 [[], [xx, xxxx]]
    console.log('arr', arr)
    const importTpl = arr.map(({url, names}) => generateDeclaration(url, names))
    ast.program.body.unshift(...importTpl)
  }
  return generate(ast).code
}

// const testTpl = `
// import surveyApi from '@/api/survey'
// export default {
//   name: 'outline',
//   components: {
//     datas: () => import('./datas.vue'),
//     ProjectHeader: () => import('index/component/project-header.vue'),
//     dragQs: () => import('index/component/drag-qs/index.vue'),
//     importOutline: () => import('index/component/import-outline/index.vue')
//   },
//   provide () {
//     return {
//       parentDatas: this
//     }
//   },
//   data () {
//     return {
//       surveyInfo: {},
//       surveyList: [],
//       originList: [],
//       test: getUserAvatorBackgroundColor(),
//       loading: false
//     }
//   },
//   created () {
//     myDefalult
//     this.highFnSurveyView()
//     myDefalult
//     getProjectPath('a')
//   },
//   computed: {
//     exportOutLine () {
//       myDefalult
//       getEnvStaticPath.on('emit')
//       return link
//     }
//   },
//   methods: {
//     success (file) {
//       hasUsableFlash
//       console.log('aa', file)
//     },
//     importOutLine () {
//       this.$refs.importOutline.dialogVisible = true
//     },
//     highFnSurveyView () {
//       this.loading = true
//       this.surveyView().then(rs => (this.loading = false), reason => (this.loading = false))
//       const getEnvHostname = '1111'
//     },
//     surveyView () {
//       return surveyApi.surveyView({
//         project_id: getQueryString('project_id'),
//         is_update_redis: 1
//       }).then(rs => {
//         this.surveyInfo = rs.project
//         this.originList = rs.list
//         this.surveyList = toTwoArr(rs.list)
//         return rs
//       }, reason => {
//         return Promise.reject(null)
//       })
//     }
//   }
// }

// `

// const newCode = transtJs(testTpl, {
//   autoImport: [
//     {
//       basePath: path.join(__dirname, '../'),
//       paths: 'utils/index.js'
//     },
//     {
//       basePath: path.join(__dirname, '../'),
//       paths: 'utils/env.js'
//     }
//   ]
// })
// console.log('newCode', newCode)

module.exports = transtJs
