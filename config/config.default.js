/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
const fs = require('fs');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    proxy: true,
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1654571054243_3763';

  // add your middleware config here
  config.middleware = [ 'headerCookies' ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mongoose = {
    url: 'mongodb://deeper-shopify-analysis@165.227.193.14:27017/deeper-shopify-analysis',
    options: {
      user: 'deeper-shopify-analysis',
      pass: 'PR9ijb7uzds77A',
      auth: {
        authSource: 'deeper-shopify-analysis',
      },
      auto_reconnect: true,
      poolSize: 10,
    },
  };


  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(appInfo.baseDir, 'logs'),
  };

  config.security = {
    csrf: {
      ignoreJSON: false,
      cookieName: 'csrfToken',
      sessionName: 'csrfToken',
      headerName: 'x-csrf-token',
    },
    xframe: {
      enable: false,
    },
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
    root: [
      path.join(appInfo.baseDir, 'app/view'),
      path.join(appInfo.baseDir, 'frontend/build'),
    ].join(',')
  };

  config.static = {
    prefix: '',
    dir: [path.join(appInfo.baseDir, 'app/public'), path.join(appInfo.baseDir, 'frontend/build')]
  }

  return {
    ...config,
    ...userConfig,
  };
};
