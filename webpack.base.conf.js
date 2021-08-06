const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ],
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test:/\.svg/,
                use: ['svg-inline-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.ejs')
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'react-full-area-select.css',
        }),
        // new CommonsChunkPlugin({
        //     name: 'common',
        //     chunks: ['index', 'Qrcode', 'QrcodeScanner', 'Util']
        //   }),
        new CleanWebpackPlugin()
    ],
    optimization:{
        usedExports: false
    },
    // externals:{
    //     "@ant-design/icons": "ant-design/icons",
    //     react: "react",
    //     "react-dom": "react-dom",
    //     uuid: "uuid",
    //     "qrcode.react": "qrcode.react"
    // }
};
