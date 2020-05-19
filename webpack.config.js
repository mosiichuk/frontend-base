const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
        './src/app.js'
    ],
    output: {
        filename: './js/bundle.js'
    },
    module: {
        rules: [{
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, '/src/js'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: 'env'
                    }
                }
            },
            {
                test: /\.(sass|scss)$/,
                include: path.resolve(__dirname, 'src/sass'),
                use: ExtractTextPlugin.extract({
                  use: [{
                      loader: "css-loader",
                      options: {
                        sourceMap: true,
                        minimize: true,
                        url: false
                      }
                    },
                    {
                      loader: "sass-loader",
                      options: {
                        sourceMap: true
                      }
                    }
                  ]
                })
              }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: './css/style.bundle.css',
            allChunks: true,
        }),
        new CopyWebpackPlugin({
            patterns: [{
                    from: './src/favicon/',
                    to: './favicon'
                },
                {
                    from: './src/fonts/',
                    to: './fonts'
                },
                {
                    from: './src/img/',
                    to: './img'
                },
            ]
        }),
    ]
};
