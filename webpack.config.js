const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  plugins: [
    new HtmlWebpackPlugin({
      title: 'DREAMLINER-YTR',
      meta: {viewport: 'width=device-width, initial-scale=1'}
    }),
    new FaviconsWebpackPlugin('src/logo.png'),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },

  output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
  },
  mode: 'development',
  devServer: {
      contentBase: './dist'
  }
};
