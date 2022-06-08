/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1654571054243_3763';

  // add your middleware config here
  config.middleware = [];

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

  return {
    ...config,
    ...userConfig,
  };
};
