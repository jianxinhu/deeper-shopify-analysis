'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/d', controller.home.d);
  router.get('/c_g', controller.home.c);
  router.get('/c_f', controller.home.cf);
  router.get('/c_a', controller.home.ca);
  router.get('/*', controller.page.react)
};
