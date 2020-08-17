const fs = require('fs');
const glob = require('glob');
const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');
const url = require('url');
const address = require('address');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const NamedidChunkEntrymoduleWebpackPlugin = require('namedid-chunk-entrymodule-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const fangfeConfig = require('../fangfe.config.js');
const { projectType, styleType, browserlist } = fangfeConfig;
const { entryPages, enableCommon, enableDll, cssModule, minimize } = fangfeConfig.webpackConfig;

const htmlWebpackPluginArr = [];

/**
 * 获取contentBase
 * @return {Array}
 */
function getContentBaseConfig() {
    const arr = enableDll ? ["../src/pages", "../build"] : ["../src/pages"];
    return arr.map((item) => path.join(__dirname, item));
}

/**
 * 获取entry配置
 * @param  {Boolean} isProduction 是否为生产环境
 * @return {Array}                entry配置信息
 */
function getEntryConfig(isProduction) {
    const entryObj = {};  
    const dirList = glob.sync((entryPages || 'src/pages/*'), {});

    dirList.forEach((dir, index) => {
      let dirKeyStr = dir.replace(/src\//,'')+'/index';
      entryObj[`${dirKeyStr}`] = [`./${dir}`];
      //entryObj[dirKeyStr] = [`./${dir}`];
      
      let filename = `${dirKeyStr}.html`;
      if (!isProduction) {
        let arr = dir.split('/');
        filename = `${arr[arr.length-1]}/index.html`;
      }

      let chunks = enableCommon ? ['vendor/vendor', dirKeyStr] : [dirKeyStr];
      let template = path.resolve(__dirname,'./templates/webpack-dev-tpl.html');
      if (fs.existsSync(dir+'/index.html')) {
        template = `${dir}/index.html`
      }

      htmlWebpackPluginArr.push(
        new HtmlWebpackPlugin({
          title: enableDll ? '模板文件hasDll' : '模板文件',
          filename,
          chunks,
          template
        })
      );
    });
    return entryObj;
}

/**
 * 插件配置列表
 * @param  {Boolean} isProduction 是否为生产环境
 * @return {[type]}               [description]
 */
function getPluginsConfig(isProduction) {
  const pluginsConfig = [
    new CleanWebpackPlugin({
      //verbose: true,
      cleanOnceBeforeBuildPatterns: ['pages/*', 'vendor/*'],
    }),
    new ProgressBarPlugin({
      summary: false,
      clear: true //!!isProduction
    }),
    // ...htmlWebpackPluginArr,
    //new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ];
  if (enableDll) {
    if (fs.existsSync('./build/dll')) {
      const manifestObj = require('../build/dll/manifest.json');
      const dllObj = new webpack.DllReferencePlugin({
        context: path.resolve(__dirname),
        manifest: manifestObj
      });
      pluginsConfig.splice(2, 0, dllObj);
    } else {
      let dllShell = (isProduction && projectType == 'react') ? 'npm run dll:min' : 'npm run dll';
      console.log(chalk.red('dll文件不存在,请先执行') + chalk.green.bold(`${dllShell}`) + chalk.red('!'));
    } 
  }
  if (projectType == 'vue') {
    const VueLoaderPlugin = require('vue-loader/lib/plugin');
    pluginsConfig.splice(2, 0, new VueLoaderPlugin());
  }

  if (isProduction) {
    pluginsConfig.push(
      //keep module.id stable when vendor modules does not change
      new webpack.HashedModuleIdsPlugin(),
      new NamedidChunkEntrymoduleWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        //chunkFilename: '[id].css'
      })
    );
    minimize && pluginsConfig.push(new OptimizeCssAssetsPlugin());
  } else {
    pluginsConfig.push(
      //热加载插件
      new webpack.HotModuleReplacementPlugin(),
      //当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息)
      new webpack.NamedModulesPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        //chunkFilename: '[id].css'
      })
    );
  }
  return pluginsConfig;
}

/**
 * 配置Loader
 * @param  {Boolean} isProduction 是否为生产环境
 * @param  {String}  projectType  项目类型
 * @return {Array}                配置Loader数组
 */
function getRulesConfig(isProduction) {
  let cssUseConfigArr = [
    (projectType == 'vue' ? 'vue-style-loader' : 'style-loader'),
    {
      loader: 'css-loader',
      options: { modules: cssModule }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: (loader) => {
          const arr = [
            require('postcss-import')(),
            require('autoprefixer')({
              overrideBrowserslist: browserlist || ['last 2 versions']
            }),
            // require('postcss-adaptive')({
            //   remUnit: 75
            // })
          ];
          if (projectType == 'vue' || projectType == 'h5') {
            arr.push(require('postcss-adaptive')({remUnit: 75}))
          }
          return arr;
        }
      }
    }
  ];

  if (styleType == 'less') {
    cssUseConfigArr.push({
      loader: "less-loader",
      options: {
        javascriptEnabled: true
      }
    });
  } else if (styleType == 'scss') {
    cssUseConfigArr.push({
      loader: "sass-loader", 
      options: {
        sourceMap: true
      }
    });
    //cssUseConfigArr.push('sass-loader');
  }

  if (true || isProduction) {
    cssUseConfigArr.splice(0, 1, MiniCssExtractPlugin.loader);
  }

  const rulesConfig = [
    // {
    //   test: /\.(jsx?|vue)$/,
    //   loader: 'eslint-loader',
    //   enforce: 'pre',
    //   exclude: /(node_modules|build)/,
    //   options: {
    //     formatter: require('eslint-friendly-formatter'),
    //   }
    // },
    {
      test: /\.(tsx|js|ts|jsx)?$/,
      include: path.resolve(__dirname, '../src'),
      exclude: path.resolve(__dirname, '../node_modules'),
      use: [
        {loader: 'babel-loader'},
        {loader: 'ts-loader'}
      ]
    }, {
      test: /\.(jpe?g|png|gif)$/,
      //use: ['file-loader'],
      use: [{
        loader: 'file-handler-loader',
        options: {
          threshold: 5 * 1024 // 小于等于 5KB 的图片转化为 base64
        }
      }]
    }, {
      test: /\.(css|less|s[a|c]ss)$/,
      use: cssUseConfigArr,
    }
  ];
  if(projectType == 'vue') {
    rulesConfig.unshift({
      test: /\.vue$/,
      use: {
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false,// ignore space
          extractCSS: true,// extract css
          transformToRequire: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      }
    })
  }
  return rulesConfig;
}

/**
 * 获取Banner信息
 * @return {String} 拼接个人信息
 */
function getBannerTpl() {
  const { baseConfg } = getFangfeConfig();
  const bannerTpl = `
    @project:${baseConfg.projectName}
    @author:${baseConfg.author}
    @email:${baseConfg.email}
  `;
  //@time:${(new Date).toLocaleString()}
  return bannerTpl;
}

/**
 * 获取fangfe.config文件信息
 * @return {Object} 配置信息
 */
function getFangfeConfig () {
  const { webpackConfig, ...baseConfg } = fangfeConfig;
  return {
    webpackConfig,
    baseConfg
  }
}

//清空命令行console
function clearConsole() {
  if (process.env.CLEAR_CONSOLE !== 'none') {
    process.stdout.write(
      process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H',
    );
  }
}

/**
 * 格式URL
 * @param  {String} protocol        协议
 * @param  {String} host            域名
 * @param  {String|Number} port     端口
 * @param  {String} pathname        路径
 * @return {Object}                 封装的方法
 */
function prepareUrls(protocol= 'http', host='0.0.0.0', port='8080', pathname = '/') {
  let configPort = fangfeConfig.webpackConfig.port;
  configPort && (port = configPort);
  const formatUrl = hostname =>
    url.format({
      protocol,
      hostname,
      port,
      pathname
    })
  const prettyPrintUrl = hostname =>
    url.format({
      protocol,
      hostname,
      port: chalk.bold(port),
      pathname
    })

  const isUnspecifiedHost = host === '0.0.0.0' || host === '::'
  let prettyHost, lanUrlForConfig
  let lanUrlForTerminal = chalk.gray('unavailable')
  if (isUnspecifiedHost) {
    prettyHost = 'localhost'
    try {
      // This can only return an IPv4 address
      lanUrlForConfig = address.ip()
      if (lanUrlForConfig) {
        // Check if the address is a private ip
        // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
        if (
          /^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(
            lanUrlForConfig
          )
        ) {
          // Address is private, format it for later use
          lanUrlForTerminal = prettyPrintUrl(lanUrlForConfig)
        } else {
          // Address is not private, so we will discard it
          lanUrlForConfig = undefined
        }
      }
    } catch (_e) {
      // ignored
    }
  } else {
    prettyHost = host
    lanUrlForConfig = host
    lanUrlForTerminal = prettyPrintUrl(lanUrlForConfig)
  }
  const localUrlForTerminal = prettyPrintUrl(prettyHost)
  const localUrlForBrowser = formatUrl(prettyHost)
  return {
    lanUrlForConfig,
    lanUrlForTerminal,
    localUrlForTerminal,
    localUrlForBrowser
  }
}

//输出服务访问IP
function consoleServer() {
  const urls = prepareUrls();
  let copied = '';
  // if (isFirstCompile) {
  //   require('clipboardy').write(urls.localUrlForBrowser);
  //   copied = chalk.dim('(copied to clipboard)');
  // }
  console.log(
    [
      `  App running at:`,
      `  - Local:   ${chalk.cyan(urls.localUrlForTerminal)} ${copied}`,
      `  - Network: ${chalk.cyan(urls.lanUrlForTerminal)}`,
    ].join('\n'),
  );
}

module.exports = {
  getContentBaseConfig,
  getEntryConfig,
  getPluginsConfig,
  getRulesConfig,
  getBannerTpl,
  getFangfeConfig,
  clearConsole,
  consoleServer
};