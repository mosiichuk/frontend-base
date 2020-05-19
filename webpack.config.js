const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
                        },
                        {
                            loader: "sass-loader",
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
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