const webpack = require('webpack');
const cssnano = require('cssnano');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = require('./site.config');

const hmr = new webpack.HotModuleReplacementPlugin();

const optimizeCss = new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: cssnano,
    cssProcessorPluginOptions: {
        preset: [
            'default',
            {
                discardComments: {
                    removeAll: true,
                },
            },
        ],
    },
    canPrint: true,
});

const clean = new CleanWebpackPlugin();

const cssExtract = new MiniCssExtractPlugin({
    filename: './css/style.[contenthash].css',
});

const htmlPlugin = new HTMLWebpackPlugin({
    filename: "index.html",
    template: path.join(config.root, config.paths.src, "index.html"),
    meta: {
        viewport: config.viewport,
    },
    title: config.site_name,
});

const favicons = new WebappWebpackPlugin({
    logo: config.favicon,
    prefix: 'images/favicons/',
    favicons: {
        appName: config.site_name,
        appDescription: config.site_description,
        icons: {
            android: true,
            appleIcon: true,
            appleStartup: false,
            coast: false,
            favicons: true,
            firefox: false,
            windows: false,
            yandex: false,
        },
    },
});

module.exports = [
    clean,
    cssExtract,
    htmlPlugin,
    fs.existsSync(config.favicon) && favicons,
    config.env === 'production' && optimizeCss,
    config.env === 'development' && hmr,
].filter(Boolean);
