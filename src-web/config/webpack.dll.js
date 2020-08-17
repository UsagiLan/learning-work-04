const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { getFangfeConfig, getBannerTpl } = require('./webpack.func.js');
const { webpackConfig } = getFangfeConfig();

module.exports = function(env, argv) {
  const pluginsArr = [
    new ProgressBarPlugin({
      summary: false,
      clear: !!env.production
    }),
    new webpack.DllPlugin({
      path:path.join(__dirname,'../build','dll','manifest.json'),
      name: '[name]',
      context: path.resolve(__dirname),
    }),
  ];

  if(env.production) {
    const bannerTpl = getBannerTpl();
    pluginsArr.push(
      new webpack.BannerPlugin({
        banner: bannerTpl
      })
    );
  }

  if(!Array.isArray(webpackConfig.dllArr) || !webpackConfig.dllArr.length ) {
    console.log(chalk.red.bold('dllArr不是有效数组，或空数组!'));
    return
  }

  return {
    mode: env.production ? 'production' : 'development',
    stats: {
      children: false,
      entrypoints: false,
      modules: false,
      errors: true,
      errorDetails: true,
    },
    entry: {
      dll: webpackConfig.dllArr,
    },
    output: {
      path: path.join(__dirname, '../build','dll'),
      filename: '[name].js',
      library: '[name]',
    },
    plugins: pluginsArr,
  };
};