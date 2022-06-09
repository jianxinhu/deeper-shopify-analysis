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

  async general(session_id, email, remark = '') {
    const cid = `${(new Date()).getTime()}_${_.pad(_.random().toString(), 0)}`;
    const DISCOUNT_CODE = [
      '6VPAK2QSXTNV', // 50
      'QKF2Z2EVA4XF', // 40
      'ZTYTFEVZ0SRG', // 30
      'A7AY5HYJZSFJ', // 20
      'C237684CNVRQ', // 10
    ];

    const result = await this.save({
      cid,
      session_id,
      email,
      remark,
      code: _.shuffle(DISCOUNT_CODE)[0],
      status: CODE_STATUS.CREATE,
    });
    return _.pick(result.toJSON(), [ 'cid', 'code' ]);
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
