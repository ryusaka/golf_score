const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin').TsconfigPathsPlugin
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: './src/app/index.tsx',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '/src/static'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    port: 11000,
    host: '0.0.0.0',
    // proxy: {
    //   '**': {
    //     target: 'http://0.0.0.0:11111',
    //     changeOrigin: true,
    //   },
    // },
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader'
    }]
  },
  resolve: {
    modules: ['src/app', 'src/common', 'node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/static/base.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
