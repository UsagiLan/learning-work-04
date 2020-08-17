const path = require('path');
const merge = require('webpack-merge');
const apiMocker = require('mocker-api');

const { getContentBaseConfig, clearConsole, consoleServer } = require('./webpack.func.js');
const getCommonConfig = require('./webpack.common.js');
const { webpackConfig: { host } } = require('../fangfe.config.js')

module.exports = merge(getCommonConfig(false), {
	devServer: {
		contentBase: getContentBaseConfig(),
		open: host ? false : true,
		hot: true,
		host: host ? host : '0.0.0.0',
		useLocalIp: true,
		//clientLogLevel: 'none',
		//disableHostCheck: true,
		stats: 'errors-only',
		before(app) {
			// apiMocker(app, path.resolve('./mock/index'), {
			//   proxy: {
			//     '/repos//*': 'https://api.github.com/',
			//   },
			//   changeHost: true,
			// })
		},
		after(app) {
			setTimeout(() => {
				clearConsole();
  			consoleServer();
			}, 1500);
		}
	}
});