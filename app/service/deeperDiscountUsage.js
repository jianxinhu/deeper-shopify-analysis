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

    const times = await this.model.count({ cid });
    if (times >= 10) {
      return { code: '' };
    }
    const DISCOUNT_CODE = [
      { code: '6VPAK2QSXTNV', off: '50' }, // 50
      { code: 'QKF2Z2EVA4XF', off: '40' }, // 40
      { code: 'ZTYTFEVZ0SRG', off: '30' }, // 30
      { code: 'A7AY5HYJZSFJ', off: '20' }, // 20
      // 'C237684CNVRQ', // 10
    ];
    const target = _.shuffle(DISCOUNT_CODE)[0];

    await this.save({
      cid,
      session_id,
      email,
      code: target.code,
      status: CODE_STATUS.CREATE,
    });
    return target;
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
