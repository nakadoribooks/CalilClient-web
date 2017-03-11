var webpack = require('webpack');
var path = require('path');

var config = {
  devtool: "eval",
  context: __dirname + '/source',
  entry: {
    'application': './main.js'
  },
  output: {
    path: __dirname + '/public/javascript',
    filename: '[name].js'
  },
  resolve: {
      extensions: ['.js']
  },
  plugins: [],
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  }

};

module.exports = config;
