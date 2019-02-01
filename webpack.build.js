const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin').TsconfigPathsPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    bundle: [
      '@babel/polyfill',
      './src/app/index.tsx',
    ],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.[hash].js',
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [{
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          presets: [
            '@babel/preset-react',
            ['@babel/preset-env', {
              targets: {
                browsers: ['last 2 versions', '> 1%'],
              },
              modules: false,
              useBuiltIns: 'usage',
            }],
          ],
          plugins: [
            ['@babel/plugin-proposal-decorators', { 'legacy': true }],
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-function-bind',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-transform-modules-commonjs',
          ],
        },
      }, {
        loader: 'ts-loader' ,
      }]
    }]
  },
  resolve: {
    modules: ['src/app', 'src/common', 'node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'TARGET_ENV': JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new CopyWebpackPlugin([{
      from: 'src/static',
      to: '[path]/[name].[hash].[ext]',
      ignore: ['serviceWorker.js', '**/.DS_Store', 'base.html'],
    }, {
      from: 'src/static',
    }]),
    new HtmlWebpackPlugin({
      template: 'src/static/base.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
