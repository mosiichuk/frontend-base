const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./site.config');
const path = require('path');

const sourceMap = config.env !== 'production';

const html = {
    test: /\.(html)$/,
    use: [
        {
            loader: 'html-loader',
            options: {
                interpolate: true,
                removeComments: true,
            },
        },
    ],
};

const js = {
    test: /\.js(x)?$/,
    exclude: /node_modules/,
    use: [{
        loader: 'babel-loader'
    }],
};

const styleLoader = {
    loader: 'style-loader'
};

const cssLoader = {
    loader: 'css-loader',
    options: {
        sourceMap,
    },
};

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: [
            require('autoprefixer')(),
        ],
        sourceMap,
    },
};

const groupCssMediaQueriesLoader = {
    loader: "group-css-media-queries-loader",
    options: {
        sourceMap,
    },
};

const css = {
    test: /\.css$/,
    use: [
        config.env === 'production' ? MiniCssExtractPlugin.loader : styleLoader,
        cssLoader,
        groupCssMediaQueriesLoader,
        postcssLoader,
    ],
};

const sass = {
    test: /\.s[c|a]ss$/,
    use: [
        config.env === 'production' ? MiniCssExtractPlugin.loader : styleLoader,
        cssLoader,
        groupCssMediaQueriesLoader,
        postcssLoader,
        {
            loader: 'sass-loader',
            options: {
                sourceMap,
            },
        },
    ],
};

const imageLoader = {
    loader: 'image-webpack-loader',
    options: {
        disable: config.env === 'development',
        gifsicle: {
            interlaced: false,
        },
        optipng: {
            optimizationLevel: 7,
        },
        pngquant: [
            '65-90',
            4,
        ],
        mozjpeg: {
            progressive: true,
        }
    },
};

const images = {
    test: /\.(gif|png|jpe?g|svg)$/,
    include: [
        path.resolve(__dirname, '../src/img/')
    ],
    use: [
        'file-loader?name=img/[name].[hash].[ext]&esModule=false',
        imageLoader
    ]
};

const icons = {
    test: /\.(gif|png|jpe?g|svg)$/,
    include: [
        path.resolve(__dirname, '../src/icons/')
    ],
    use: [
        'file-loader?name=icons/[name].[hash].[ext]&esModule=false',
        imageLoader
    ]
};

const fonts = {
    test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
    exclude: [
        /img/,
        /icons/
    ],
    use: [{
        loader: 'file-loader?name=fonts/[name].[hash].[ext]&esModule=false',
    },],
};

module.exports = [
    html,
    js,
    css,
    sass,
    images,
    icons,
    fonts,
];
