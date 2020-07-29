const path = require('path');
module.exports = {
  entry: './client/app.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
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
};