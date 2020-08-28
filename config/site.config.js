const path = require('path');
const fs = require('fs');

let ROOT = process.env.PWD;

if (!ROOT) {
    ROOT = process.cwd();
}

const config = {
    // Your website's name, used for favicon meta tags
    site_name: 'Site',

    // Your website's description, used for favicon meta tags
    site_description: 'A modern site',

    viewport: 'width=device-width,initial-scale=1',

    favicon: path.join(ROOT, './src/favicon/favicon.png'),

    dev_host: 'localhost',

    port: process.env.PORT || 8000,

    env: process.env.NODE_ENV,
    root: ROOT,
    paths: {
        config: 'config',
        src: 'src',
        dist: '../build',
    },
    package: JSON.parse(
        fs.readFileSync(path.join(ROOT, '/package.json'), {
            encoding: 'utf-8'
        }),
    ),
};

module.exports = config;
