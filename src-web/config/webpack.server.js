const path = require('path');
const express = require('express');
const webpack = require('webpack');
const merge = require('webpack-merge');
const apiMocker = require('mocker-api');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const morgan = require('morgan');
const chalk = require('chalk');

const getCommonConfig = require('./webpack.common.js');
const { getFangfeConfig, clearConsole, consoleServer } = require('./webpack.func.js');
const { webpackConfig } = getFangfeConfig();

const log = console.log;
const common = getCommonConfig(false);
//const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

const entryObjKeys = Object.keys(common.entry);
const entryObj = {};
entryObjKeys.forEach((value,index) => {
  let arr = common.entry[value];
  arr.unshift(hotMiddlewareScript)
  entryObj[value] = arr;
});
//清除 entry重新赋值
delete common.entry;
const config = merge(common, {
	entry: entryObj
});

const compiler = webpack(config);
const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
	logLevel: 'error',
});

const app = express();
  app.set('views', path.join(__dirname, 'templates'));
	app.set('view engine', 'ejs');
app.use(morgan(function (tokens, req, res) {
	let str = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ');
  return chalk.gray(str);
}));
app.use(webpackDevMiddlewareInstance);
webpackDevMiddlewareInstance.waitUntilValid(function(){
	clearConsole();
	consoleServer();
  //log(chalk.green('server is success! please visit it!'));
});
app.use(webpackHotMiddleware(compiler, {
	log: function(text){ log(chalk.cyan(text)) },
	path:'/__webpack_hmr',
	heartbeat: 10 * 1000
}));
app.use(express.static('build'));
  app.get("/", function(req, res) {
		res.render('page-dev-tpl',{
			title:'列表页',
			message:'请选择你需要进入的页面',
			listObj: getListObj(),
		})
		//res.sendFile(__dirname + '/index.html');
	});
apiMocker(app, path.resolve('mock/index.js'));
app.listen(webpackConfig.port, function(err, result){
	if(err){
		return log(chalk.red(err));
	}
	//log(chalk.green(`\nListening at ${chalk.cyan(`http://${localhost}:${webpackConfig.port}/`)} \n`));
});

  function getListObj(){
		let keys = Object.keys(config.entry);
		return keys.map((key) => {
			let arr = key.split('/');
			return {
				url: arr[1],
				text: arr[1]
			}
			// let urlStr = `${key.replace('pages','')}`;
			// return {
			// 	url:urlStr,
			// 	text: urlStr.replace(/\//g, '')
			// };
		});
	}
