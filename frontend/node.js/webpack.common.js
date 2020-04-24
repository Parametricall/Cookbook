const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleTracker = require('webpack-bundle-tracker');


module.exports = {
    context: __dirname,

    entry: './src/FormSelector.jsx',
    output: {
        library: "Cookbook",
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        },
            {test: /\.(css)$/, use: ['style-loader', 'css-loader']}
        ],

    },
    resolve: {
            extensions: ['.jsx', '.js']
        },
    plugins: [
        new HtmlWebpackPlugin({
            template: '../templates/frontend/index.html'
        }),
        new BundleTracker({filename: './webpack-stats.json'})
    ]
};

