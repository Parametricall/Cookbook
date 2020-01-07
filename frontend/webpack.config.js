let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let BundleTracker = require('webpack-bundle-tracker');
require("regenerator-runtime/runtime");


module.exports = {
    context: __dirname,

    entry: './src/create_recipe.js',


    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.(css)$/, use: ['style-loader', 'css-loader']}
        ]
    },

    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'templates/frontend/index.html'
        }),
        new BundleTracker({filename: './webpack-stats.json'})
    ]
};

