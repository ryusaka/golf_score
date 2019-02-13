const ForkTsChecker = require('fork-ts-checker-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin').TsconfigPathsPlugin

module.exports = {
  mode: 'production',
  target: 'node',
  entry: {
    bundle: './src/api/server.ts',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'server.js',
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.ts$/,
      use: [{
        loader: 'ts-loader' ,
        options: {
          transpileOnly: true,
        },
      }]
    }]
  },
  resolve: {
    modules: ['src/api', 'node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()]
  },
  plugins: [
    new ForkTsChecker(),
  ]
}
