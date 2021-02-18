const path = require('path');

const config = require('./site.config');
const loaders = require('./webpack.loaders');
const plugins = require('./webpack.plugins');

module.exports = {
    context: path.join(config.root, config.paths.src),
    entry: {
        main: path.join(config.root, config.paths.src, '/app.js'),
    },
    output: {
        publicPath: '',
        filename: './js/bundle.[chunkhash].js',
        path: path.resolve(__dirname, config.paths.dist)
    },
    mode: ['production', 'development'].includes(config.env) ?
        config.env :
        'development',
    devtool: config.isProduction ?
        'source-map' :
        'eval-cheap-module-source-map',
    devServer: {
        contentBase: path.join(config.root, config.paths.src),
        watchContentBase: true,
        hot: true,
        open: true,
        port: config.port,
        host: config.dev_host,
        overlay: true,
    },
    target: config.isProduction ? "browserslist" : "web",
    module: {
        rules: loaders,
    },
    plugins,
}
