const webpack = require('webpack');
const merge = require('webpack-merge');
const getCommonConfig = require('./webpack.common.js');
const { getBannerTpl } = require('./webpack.func.js');

module.exports = function(env, argv) {

  const bannerTpl = getBannerTpl();
  return merge(getCommonConfig(!!env.production), {
    mode: 'production',
    devtool: 'none',
    plugins: [
      new webpack.BannerPlugin({
        banner: bannerTpl
      })
    ]
  });
};