#### 用法
###### 在webpack配置里面加

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: 'auto-inject-loader',
            options: {
              autoImport: [
                {
                  name: 'localSocket',
                  paths: 'src/lib/core/index.js'
                }
              ]
            }
          }
        ]
      }
    ]
  }
}
```


## auto-inject-loader 
### Options
#### `autoImport`

Type: `Array`
name: 当前在页面使用的变量
paths: 变量定义所在哪个文件路径下

eg:
#### 在vue组件页面的js部分生成如下
    import localSocket from 'src/lib/core/index.js'

注意事项:
  1. 如果项目使用了eslint校验，需要在eslintrc.js 添加 
  ```js 
  globals: {
    localSocket: true // 此处localSocket即是在options里面定义的name
  }
  ```
