const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let conf = {
    entry: './src/app.js',
    output: {
        filename: './js/bundle.js'
    },
    devServer: {
        overlay: true
    },
    optimization: {
        minimizer: [new UglifyJsPlugin({}), new OptimizeCSSAssetsPlugin({})],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            sourceMap: true
                        }
                    },
                    "sass-loader"
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                exclude: '/img/',
                use: [{
                    loader: 'file-loader',
                    query: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'fonts/',
                    },
                }],
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'file-loader',
                options: {
                    limit: 100000,
                    outputPath: './fonts'
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: './css/style.bundle.css',
        })
    ]
}

module.exports = (env, options) => {
    conf.devtool = options.mode === 'production' ?
        false :
        'cheap-module-eval-source-map';
    return conf;
};
