const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./site.config');

const sourceMap = config.env !== 'production';

const html = {
    test: /\.(html)$/,
    use: [{
            loader: 'ejs-loader',
            options: {
                esModule: false,
            },
        },
        {
            loader: 'extract-loader'
        },
        {
            loader: 'html-loader',
            options: {
                interpolate: true,
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
    exclude: /fonts/,
    use: [
        'file-loader?name=img/[name].[hash].[ext]&esModule=false',
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
    html,
    js,
    css,
    sass,
    images,
    fonts,
];
