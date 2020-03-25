const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleTracker = require('webpack-bundle-tracker');


module.exports = {
    context: __dirname,

    entry: './src/create_recipe.js',
    output: {
        path: path.resolve('./static/assets/bundles/'),
        filename: '[name]-[hash].js',
    },

    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.(css)$/, use: ['style-loader', 'css-loader']}
        ]
    },

    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: '../templates/frontend/index.html'
        }),
        new BundleTracker({filename: './webpack-stats.json'})
    ]
};

