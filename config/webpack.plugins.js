const webpack = require('webpack');
const cssnano = require('cssnano');
const path = require('path');
const fs = require('fs');
const glob = require('glob');

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
            title: config.site_name
        });
    });

const provider = new webpack.ProvidePlugin({
    Swiper: 'swiper',
    'window.Swiper': 'swiper',
});

const favicons = new WebappWebpackPlugin({
    logo: config.favicon,
    prefix: 'img/favicons/',
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
    provider,
    clean,
    cssExtract,
    ...generateHTMLPlugins(),
    fs.existsSync(config.favicon) && favicons,
    config.env === 'production' && optimizeCss,
    config.env === 'development' && hmr,
].filter(Boolean);
