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