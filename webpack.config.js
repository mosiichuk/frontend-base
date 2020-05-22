const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

let conf = {
    entry: './src/app.js',
    output: {
        filename: './js/bundle.js'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            hash: true
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
}

module.exports = (env, options) => {
    conf.devtool = options.mode === 'production' ?
        false :
        'cheap-module-eval-source-map';
    return conf;
};