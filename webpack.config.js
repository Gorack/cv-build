const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isDevelopmentMode = argv.mode === 'development';

  return {
    entry: {
      main: './src/ts/index.ts'
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].bundle.js'
    },
    performance: {
      hints: false,
    },
    devtool: isDevelopmentMode ? 'inline-source-map' : false,
    devServer: {
      contentBase: path.join(__dirname, 'build'),
      compress: true,
      port: 9000,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'file-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "autoprefixer"
                    ],
                  ],
                },
              },
            },
            'sass-loader'
          ]
        },
        {
          test: /\.ts(x)?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                context: path.resolve(__dirname, "src/"),
                outputPath: '/',
                publicPath: './',
                useRelativePaths: true
              }
            }
          ]
        },
        {
          test: /\.font\.js/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
            'webfonts-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new CopyPlugin({
        patterns: [
          {from: "./src/index.html", to: ""},
          { from: "./src/assets/favicons", to: "assets/favicons" },
          { from: "./src/assets/images", to: "assets/images" }
        ],
      }),
      new webpack.ProvidePlugin({})
    ],
    resolve: {
      extensions: [
        '.tsx',
        '.ts',
        '.js'
      ],
      alias: {
        src: path.resolve(__dirname, './src/')
      }
    }
  };
};
