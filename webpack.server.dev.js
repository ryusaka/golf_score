const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin').TsconfigPathsPlugin
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  watch: true,
  mode: 'development',
  entry: './src/api/server.ts',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: `${__dirname}/built`,
    filename: 'server.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
      enforce: 'pre',
      loader: 'tslint-loader',
      test: /\.ts$/,
      exclude: [
        /node_modules/,
      ],
      options: {
        emitErrors: true,
      }
    },{
      test: /\.ts$/,
      use: 'ts-loader',
    }],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
}
