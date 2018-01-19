const webpack = require('webpack');
const path = require('path');

const babelLoaderQuery = {
  cacheDirectory: 'babel_cache',
  presets: ['react', 'es2015']
}

module.exports = {
  entry: path.join(__dirname, 'react', 'app-client.js'),
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'react'),
        loader: ['babel-loader?' + JSON.stringify(babelLoaderQuery)],
      }
    ]
  },
  plugins: [
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
  ]
};
