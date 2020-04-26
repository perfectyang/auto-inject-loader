#### 用法

###### 在 webpack 配置里面加

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [resolve("src")],
        use: [
          "thread-loader",
          "cache-loader",
          {
            loader: "babel-loader",
          },
          {
            loader: "auto-inject-loader",
            options: {
              autoImport: [
                {
                  // name: 'localSocket',
                  paths: "src/lib/core/index.js",
                },
              ],
            },
          },
        ],
      },
    ],
  },
};
```

## auto-inject-loader

### Options

#### `autoImport`

Type: `Array`
name: 当前在页面使用的变量
paths: 变量定义所在哪个文件路径下

#### eg:

src/lib/core/index.js 里面的函数

```
export function add () {}
function localSocket () {}
export default localSocket
```

#### 会在 js 部分生成如下

    当前js内容使用到localSocket, add 方法，则会自动生成如下
    import localSocket, {add} from 'src/lib/core/index.js'

注意事项:

1. 如果  项目使用了 eslint 校验，需要在 eslintrc.js 添加

```js
globals: {
  localSocket: true; // 此处localSocket即是在options里面定义的name
}
```
