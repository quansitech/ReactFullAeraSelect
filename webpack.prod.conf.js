const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');

module.exports = merge(baseConfig, {
    mode: 'production',
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
        // libraryTarget: 'commonjs2'
    },
});