const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Головний файл
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // Очищення dist перед кожною збіркою
  },
  module: {
    rules: [
      {
        test: /\.html$/i, // Для роботи з HTML
        loader: 'html-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Для зображень
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]', // Шлях для збереження зображень
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // Плагіни для HTML
    new HtmlWebpackPlugin({
      template: './src/pages/index.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/photo.html',
      filename: 'photo.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/news.html',
      filename: 'news.html',
    }),
    // Плагін для копіювання статичних файлів (зображення)
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/images'), // Звідки
          to: 'assets/images', // Куди в dist
        },
      ],
    }),
  ],
  devServer: {
    static: './dist',
    open: true, // Автоматично відкривати браузер
    port: 9000, // Порт сервера
  },
};
