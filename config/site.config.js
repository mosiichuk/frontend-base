const path = require('path');

let ROOT = process.env.PWD;

if (!ROOT) {
    ROOT = process.cwd();
}

const config = {
    site_name: 'Site',
    site_description: 'A modern site',
    viewport: 'width=device-width,initial-scale=1',
    favicon: path.join(ROOT, './src/favicon/favicon.png'),
    dev_host: 'localhost',
    port: process.env.PORT || 8000,
    env: process.env.NODE_ENV,
    isProduction: process.env.NODE_ENV === 'production',
    root: ROOT,
    paths: {
        config: 'config',
        src: 'src',
        dist: '../dist',
    },
};

module.exports = config;
