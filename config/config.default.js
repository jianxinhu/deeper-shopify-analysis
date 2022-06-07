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
    url: 'mongodb://deeper@cluster0-shard-00-00.5l1mr.mongodb.net:27017,cluster0-shard-00-01.5l1mr.mongodb.net:27017,cluster0-shard-00-02.5l1mr.mongodb.net:27017/deeper-shopify-analysis?ssl=true&replicaSet=atlas-xy0wym-shard-0&readPreference=primary&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1',
    options: {
      user: 'deeper',
      pass: 'fDpA875QchMl8GVA',
      auth: {
        authSource: 'admin',
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
