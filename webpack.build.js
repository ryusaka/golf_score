const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin').TsconfigPathsPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: './src/app/index.tsx',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js'
  },
  devtool: 'source-map',
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
    new CopyWebpackPlugin([{
      from: 'src/static',
    }]),
    new HtmlWebpackPlugin({
      template: 'src/static/base.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
