'use strict';
const { string } = require('yargs');
const baseModel = require('../lib/baseModel');

module.exports = app => (baseModel(app, {
  modelName: 'deeper_events',
  props: {
    from:{
      type: String,
      default: 'google',
    },
    utm_source: {
      type: String,
      default: '',
    },
    utm_medium: {
      type: String,
      default: '',
    },
    utm_campaign: {
      type: String,
      default: '',
    },
    session_id: {
      type: String,
      default: '',
    },
    event_name: {
      type: String,
      default: '',
    },
    event_value: {
      type: String,
      default: '',
    },
  },
}));
