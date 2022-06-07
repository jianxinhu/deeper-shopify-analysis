'use strict';
const Service = require('../lib/baseService');
class activityEvent extends Service {
  constructor(ctx) {
    super(ctx, {
      modelKey: 'DeeperEvents',
      isSoftDelete: false,
    });
  }
}

module.exports = activityEvent;
