'use strict';
const _ = require('loadsh');
const Service = require('../lib/baseService');

const CODE_STATUS = {
  CREATE: 'create',
  FILL: 'fill',
  APPLY: 'apply',
};


class activityEvent extends Service {
  constructor(ctx) {
    super(ctx, {
      modelKey: 'DeeperDiscountUsage',
      isSoftDelete: false,
    });
  }

  async general(session_id, email, cid) {

    const exists = await this.findOne({ cid });
    if (exists) {
      return { code: '' };
    }
    const DISCOUNT_CODE = [
      'H6BKJW90Y9CS',
      'C237684CNVRQ',
      'A7AY5HYJZSFJ',
      'ZTYTFEVZ0SRG',
      '6VPAK2QSXTNV',
      'QKF2Z2EVA4XF',
      'A7AY5HYJZSFJ',
    ];

    const result = await this.save({
      cid,
      session_id,
      email,
      code: _.shuffle(DISCOUNT_CODE)[0],
      status: CODE_STATUS.CREATE,
    });
    return _.pick(result.toJSON(), [ 'code' ]);
  }

  async fill(session_id, cid, code, email) {
    const result = await this.save({
      cid,
      session_id,
      email,
      code,
      remark: '',
      status: CODE_STATUS.FILL,
    });
    return result;
  }

  async apply(session_id, cid, code, email) {
    const result = await this.save({
      cid,
      session_id,
      email,
      code,
      remark: '',
      status: CODE_STATUS.APPLY,
    });
    return result;
  }

}

module.exports = activityEvent;
