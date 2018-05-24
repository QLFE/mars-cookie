const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/cookie.js',
  output: {
    library: 'cookie',
    libraryTarget: 'umd',
    filename: 'cookie.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};