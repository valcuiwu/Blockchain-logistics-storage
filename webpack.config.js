
const resolve = require("path").resolve

// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require("vue-loader/lib/plugin")

module.exports = {
  // 1 入口起点
   /* 
   入口详细配置
    1 单入口
      entry : './src/index.js'     
      打包形成一个chunk 名字默认是main.js
    2 多入口(数组)
      entry : ['./scr/index.js','./src/add.js']
      只有在HMR里才能让html热更新生效
    3 多入口（对象）
      entry : {
        index : './src/index.js',
        add : './src/add.js'
      }
      有几个入口文件就生产几个chunk，输出几个bandel文件
      特殊情况 entry:{index:['./src/index.js','./src/map.js'],add : './src/add.js'};
   */
  entry: './src/index.js',
  // 2 输入路径
  /*
  
  output : {
    文件名称 制定文件夹下的文件路径
     filename : 'js/[name].js'
    输出文件目录 例如vue的dist
     path : resolve(__dirname,'dist')
    所有输出资源引入的公共路径前缀 ’img/a.png' ---> '/img/a.png'   '/'前面是服务器根路径   一般用于开发环境
     publicPath : '/'   ’img/a.png' ---> '/img/a.png'
     publicPath : './'   ’img/a.png' ---> './img/a.png'
  }
  
  */
  output: {
    // 输出文件名
    // filename : "js/build.js" 输出到 build/js/build.js
    filename: "build.js",
    // 输出路径 绝对路径
    // __dirname  node.js的变量，代表当前文件目录的绝对路径
    path: resolve(__dirname, 'build')
    // library 输出一个库，为你的入口做导出。
    /**
      library: {
         // 指定库名称
        name: 'package',
        // 指定库的暴露方式
        type: 'var'|'commonjs'|'umd'|'amd|'module'
      }
   */
  },
  // loader 的配置
  module: {
    rules:[
        {test:/\.vue$/, use: 'vue-loader'},
        {test:/\.css$/, use: ['style-loader','css-loader']},
        {test:/\.scss$/, use: ['style-loader','css-loader','sass-loader',]},
        {test:/\.(jpg|png|gif|bmp|jpeg)$/, loader: 'url-loader'},
        {test:/\.(ttf|eot|svg|woff|woff2)$/,use: 'url-loader'}
    ]//模块规则
  },
  // 插件
  // 下载 引入 使用
  plugins: [
    // 详细的插件配置
    // 默认创建一个html文件，引入，打包输出所有资源
    new HtmlWebpackPlugin(
      {
        // 复制'./src/index.html'文件，并且引入js和css
        template: './src/index.html'
      }
    )  ,// 打包输出HTML
    new VueLoaderPlugin()
  ],
  // 模式，是开发模式production还是生产环境development
  mode: 'development',
  // 开发服务器
  // 需要下载webpack-dev-server
  devServer: {
    // npx webpack-dev-server 会在内存中编译打包，没有输出，实时监听
    // 运行目录
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩 使代码更小
    compress: true,
    // 端口号
    port: 8080,
    // 自动打开浏览器
    open : true
  }
}
