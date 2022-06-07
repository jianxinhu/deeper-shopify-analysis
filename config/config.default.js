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
    client: {
      url: 'mongodb://deeper-shopify-analysis:PR9ijb7uzds77A@165.227.193.14:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=deeper-shopify-analysis&authMechanism=SCRAM-SHA-256',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
