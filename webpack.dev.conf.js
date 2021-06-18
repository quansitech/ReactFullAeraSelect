const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');


module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        index: './src/app.js',
        // Util: './src/Util.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
        // libraryTarget: 'commonjs2'
    },
    devServer: {
        port: 3030,
        proxy: {
            '/api': {
                target: 'https://wd.t4tstudio.com/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/Center': {
                target: 'https://api.t4tstudio.com/Center',
                changeOrigin: true,
                pathRewrite: {
                    '^/Center': ''
                }
            }
        }
    }
});
