const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./site.config');

const sourceMap = config.env !== 'production';

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

const css = {
    test: /\.css$/,
    use: [
        config.env === 'production' ? MiniCssExtractPlugin.loader : styleLoader,
        cssLoader,
        postcssLoader,
    ],
};

const sass = {
    test: /\.s[c|a]ss$/,
    use: [
        config.env === 'production' ? MiniCssExtractPlugin.loader : styleLoader,
        cssLoader,
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
        pngquant: {
            quality: '65-90',
            speed: 4,
        },
        mozjpeg: {
            progressive: true,
        }
    },
};

const images = {
    test: /\.(gif|png|jpe?g|svg)$/,
    exclude: /fonts/,
    use: [
        'file-loader?name=images/[name].[hash].[ext]',
        imageLoader
    ]
};

const fonts = {
    test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
    exclude: /img/,
    use: [{
        loader: 'file-loader',
        query: {
            name: '[name].[hash].[ext]',
            outputPath: 'fonts/',
        },
    }, ],
};

module.exports = [
    js,
    css,
    sass,
    images,
    fonts,
];
