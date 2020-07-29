const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: './client/app.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    // chunkFilename: '[id].js',
    // publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  //maybe add css loaders if it doesn't work
  module: {
    rules: [
        {
            test: /\.jsx$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },
    ]
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './public/index.html'
  //   }),
  // ]
};