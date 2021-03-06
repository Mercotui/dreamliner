const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  resolve: {
    roots: [
      path.resolve('./src'),
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'DREAMLINER',
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
      contentBase: './dist',
      host: '0.0.0.0',
      port: 8080,
      disableHostCheck: true,
  }
};
