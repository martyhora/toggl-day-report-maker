"use strict";

const path = require('path');
const config = require('./buildConfig');

const isProduction = config.env === 'production';

const webpackConfig = {
    entry: {
        'app': './app/app.js'        
    },
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: [ path.join(__dirname, 'app') ],
                loader: 'babel-loader'
            }
        ]
    },   
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.js'
      }
    },
};

if (!isProduction) {
    webpackConfig.devtool = "sourcemap";
    webpackConfig.debug = true;        
} else {
    const UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");

    webpackConfig.plugins = webpackConfig.plugins || [];
    webpackConfig.plugins.push(new UglifyJsPlugin({ minimize: true }));
}

module.exports = webpackConfig;