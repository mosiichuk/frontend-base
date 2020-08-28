const path = require('path');

const config = require('./site.config');
const loaders = require('./webpack.loaders');
const plugins = require('./webpack.plugins');

module.exports = {
    context: path.join(config.root, config.paths.src),
    entry: [
        path.join(config.root, config.paths.src, '/app.js'),
    ],
    output: {
        filename: './js/bundle.[hash].js',
        path: path.resolve(__dirname, config.paths.dist)
    },
    mode: ['production', 'development'].includes(config.env) ?
        config.env :
        'development',
    devtool: config.env === 'production' ?
        'hidden-source-map' :
        'cheap-eval-source-map',
    devServer: {
        contentBase: path.join(config.root, config.paths.src),
        watchContentBase: true,
        hot: true,
        open: true,
        port: config.port,
        host: config.dev_host,
        overlay: true,
    },
    module: {
        rules: loaders,
    },
    plugins,
};
