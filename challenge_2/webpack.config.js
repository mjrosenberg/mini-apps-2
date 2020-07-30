const path = require('path');
module.exports = {
  entry: './client/app.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
        {
            test: /\.jsx$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },],
  }
};