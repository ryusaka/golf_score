const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin').TsconfigPathsPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    bundle: [
      '@babel/polyfill',
      './src/app/index.tsx',
    ],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.[hash].js'
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
            'react-hot-loader/babel',
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
    new HtmlWebpackPlugin({
      template: 'src/static/base.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
