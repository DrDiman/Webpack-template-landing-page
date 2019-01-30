const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index-bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: './postcss.config.js' } },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/images/*',
        to: 'images/[name].[ext]',
      },
      {
        from: 'src/index.html',
        to: './[name].[ext]',
      },
    ]),
    new ImageminPlugin({
      optipng: { optimizationLevel: 7 },
      pngquant: { strip: true },
      gifsicle: { optimizationLevel: 3 },
      jpegtran: { progressive: true },
      plugins: [
        imageminMozjpeg({
          quality: 25,
        }),
      ],
    }),
    new WebpackNotifierPlugin(),
  ],
};
