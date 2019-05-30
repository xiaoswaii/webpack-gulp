const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main:['./src/index.js','./src/test.js'],
        scss_style:'./src/style.js',
        pic:'./src/file.js',
    },
    output: {
        filename: '[name][hash].js',
        path: path.resolve(__dirname, './dist/'),
    },
    plugins:[
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            inject: 'head'
        })
    ],
    module:{
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name][hash].[ext]',
                    },
                  },
                ],
            },
            {
                test:/\.html$/,
                use:["html-loader"]
            }, 
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({ //利用 extractPlugin 實例裡的 extract 來建立 Loader
                    use: [
                        'css-loader', 
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }],
            }
        ]
    }
};