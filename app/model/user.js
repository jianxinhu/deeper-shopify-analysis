'use strict';
const baseModel = require('../lib/baseModel');

module.exports = app => (baseModel(app, {
  modelName: 'deeper_events',
  props: {
    event_name: String,
  },
}));
