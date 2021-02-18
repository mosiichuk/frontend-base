const path = require('path');
const fs = require('fs');
const glob = require('glob');
const webpack = require("webpack");
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const config = require('./site.config');
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const optimizeCss = new CssMinimizerPlugin({
    minimizerOptions: {
        preset: [
            'default',
            {
                discardComments: {removeAll: true},
            },
        ],
    },
});

const clean = new CleanWebpackPlugin();

const cssExtract = new MiniCssExtractPlugin({
    filename: './style.[contenthash].css',
});

const generateHTMLPlugins = () => glob.sync('./src/**/*.html')
    .filter(dir => !dir.includes("partials"))
    .map((dir) => {
        const filename = path.basename(dir);

        return new HTMLWebpackPlugin({
            filename,
            template: path.join(config.root, dir),
            meta: {
                viewport: config.viewport,
            },
            title: config.site_name,
            description: config.site_description
        });
    });

const favicons = new FaviconsWebpackPlugin({
    logo: config.favicon,
    prefix: './img/favicons/',
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

const env = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.PWD': JSON.stringify(process.env.PWD),
    'process.env.PORT': JSON.stringify(process.env.PORT),
});

module.exports = [
    clean,
    env,
    cssExtract,
    ...generateHTMLPlugins(),
    fs.existsSync(config.favicon) && favicons,
    config.isProduction && optimizeCss,
].filter(Boolean);
