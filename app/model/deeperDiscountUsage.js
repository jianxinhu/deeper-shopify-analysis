'use strict';
const baseModel = require('../lib/baseModel');

module.exports = app => (baseModel(app, {
  modelName: 'deeper_discount_usage',
  props: {
    session_id: String,
    cid: String,
    email: {
      type: String,
      default: '',
    },
    remark: String,
    code: String,
    status: String,
  },
}));
