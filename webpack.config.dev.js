/*
    1.配置樣式資源 (css.less 含提取css為單一文件,這個專案是配置less)
    2.配置圖片資源
    3.配置html資源 (含讀結構(html-loader)、複製結構(HtmlWebpackPlugin))
    4.配置靜態其他資源 (icon font ..)
    5.js兼容性
    6.css兼容性
    7.eslint
    8.devServer
    9.HMR
    10.source map
*/

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 從js提取css為一個獨立檔案

module.exports = {
  devtool: 'eval-source-map',
  entry: './src/index.js',
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      // loader配置
      {
        // 處理less資源
        test: /\.less$/,
        use: [
          'css-hot-loader',
          // 從JS提取CSS成單獨文件，再額外引入html
          MiniCssExtractPlugin.loader,
          'css-loader',
          // css兼容性處理
          {
            // 還需要再package.json中定義browserslist
            // (預設是看dev環境，如想改成production，要加上process.env.NODE_ENV = 'production')
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              // eslint-disable-next-line
              plugins: () => [require('postcss-preset-env')()],
            },
          },
          'less-loader',
        ],
      },
      {
        // 處理css資源
        test: /\.css$/,
        use: [
          'css-hot-loader',
          // 從JS提取CSS成單獨文件，再額外引入html
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        // 處理圖片資源
        test: /\.(jpg|png|gif)$/,
        // 使用一個loader，可以直接使用loader
        // url-loader 與 file-loader 為依存關係
        // url-loader:將圖片大小於limit的轉成base64,在插入built.js
        // file-loader:大於limit的就交給file-loader複製到指定輸出路徑
        loader: 'url-loader',
        options: {
          // url-loader 屬性
          // 小於8kb的圖片
          limit: 8 * 1024,
          // file-loader 屬性
          // 給圖片重新命名
          // [name]原檔名
          // [ext]原擴展名
          name: '[name].[ext]',
          // 複製到輸出路徑的路徑(build/img/)
          outputPath: 'imgs/',
          // 打包文件的引用路徑
          publicPath: 'imgs/',
          // 解決跟html-loader之間的問題，html-loader讀取完後，接下來會交由url-loader處理但是兩個模塊化方式不一樣
          // 所以這把es6模組化的方式關掉讓他們統一
          esModule: false,
        },
      },
      {
        // 處裡其他資源
        exclude: /\.(css|js|jsx|ejs|html|less|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          // 複製到輸出路徑的路徑(build/img/)
          outputPath: 'media/',
          // 打包文件的引用路徑
          publicPath: 'media/',
        },
      },
      // js 兼容性處理
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(js|jsx)$/,
        // 注意：只檢查自己的代碼就好，所以要把node_modules除外
        exclude: /node_modules/,
        loader: 'eslint-loader',
        // 優先執行
        enforce: 'pre',
        options: {
          // 自動修復eslint的錯誤(警告還是會有)
          fix: true,
        },
      },
    ],
  },
  plugins: [
    // plugins的配置
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './public/index.html'),
    }),
    // 提取css plugin
    new MiniCssExtractPlugin({
      // 定義提取出的css檔名
      filename: 'css/built.css',
    }),
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'public/'),
    compress: true,
    port: 3000,
    open: true,
    hot: true,
  },
};
