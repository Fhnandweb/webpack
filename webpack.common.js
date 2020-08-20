const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //模板插件
//const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css分离插件 webpack4不支持
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //css分离插件 webpack4支持

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    //单入口
    //entry: path.join(__dirname, "/src/index"), //打包的入口文件
    // 多入口
    entry: {
        index: path.join(__dirname, "/src/index"),
        two: path.join(__dirname, "/src/two")
    },
    output: {
        path: path.join(__dirname, "/dist"), //打包后的文件存放地址
        filename: "[name].js", //打包后的文件名
        publicPath: '/',
    },
    module: {
        rules: [{
                test: /\.css$/, //匹配.css结尾的文件
                //use: ['style-loader', 'css-loader', 'postcss-loader'] //需要用到的loader，loader编译是从右到左
                // 分离css
                // use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../' //设置公共路径
                        },
                    },
                    'css-loader', 'postcss-loader'
                ],

            },
            {
                test: /\.(scss|sass)$/,
                use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|svg|gif)$/, //图片处理
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192, //限制转为base64图片的大小,单位字节，8192约为8kb
                        outputPath: 'imgs', //打包后图片存放的文件夹
                    }
                }]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.BannerPlugin('fhn的注解'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '/src/index.html'),
            favicon: path.join(__dirname, '/src/assets/imgs/favicon.ico'),
        }), //new一个实例，传入参数
        new webpack.HotModuleReplacementPlugin(), //热更新插件
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css',
            publicPath: '/dist'
        }), //将css分离到dist
    ],
    performance: {
        hints: false, //图片过大时的提醒
    }
}