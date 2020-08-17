const webpack = require('webpack');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const getCommonConfig = require('./webpack.common.js');

module.exports = function(env, argv) {
  return merge(getCommonConfig(!!env.production), {
    mode: 'production',
    devtool: 'none',
    plugins: [
			new BundleAnalyzerPlugin()
    ]
  });
};