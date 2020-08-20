const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, { //合并
    mode: 'development',
    devServer: {
        contentBase: './dist', //本地服务器所加载文件的目录
        port: '8088',
        inline: true, //文件更改后实时刷新
        historyApiFallback: true, //设置为true，所有的跳转都将指向index.html
        hot: true,
        proxy: {

        }
    },
    devtool: 'source-map', //会生成对于调试的完整的.map文件，但同时会减慢打包速度
})