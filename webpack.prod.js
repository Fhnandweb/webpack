const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //清理dist文件夹插件

const path = require('path');
const glob = require('glob');
//消除无用的css
const PurifyCssWebpack = require('purifycss-webpack');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map', //会生成对于调试的完整的.map文件，但同时会减慢打包速度
    plugins: [
        new CleanWebpackPlugin(),
        new PurifyCssWebpack({
            paths: glob.sync(path.join(__dirname, 'src/index.html')) //同步扫描所有html文件中所引用的css
        })
    ]
})