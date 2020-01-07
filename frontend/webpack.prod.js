const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    output: {
        path: path.resolve('./build/'),
        filename: 'myapp.js',
    },
    mode: 'production',
});