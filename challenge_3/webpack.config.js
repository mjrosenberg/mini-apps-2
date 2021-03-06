const path = require('path');
module.exports = {
  entry: './client/app.jsx',
  output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js',
      chunkFilename: '[id].js',
      publicPath: ''
  },
  resolve: {
      extensions: ['.js', '.jsx']
  },
  module: {
      rules: [
          {
              test: /\.jsx$/,
              loader: 'babel-loader',
              exclude: /node_modules/
          },
      ],
  }
}