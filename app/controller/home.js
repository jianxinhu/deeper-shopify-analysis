'use strict';

const Controller = require('egg').Controller;

const parser = require('ua-parser-js');
const libQQwry = require('lib-qqwry');
const qqwry = libQQwry.init();
qqwry.speed();

class HomeController extends Controller {
  async d() {
    const {
      query,
    } = this.ctx.request;

    console.log(`header:${JSON.stringify(this.ctx.headers)}`);
    const ua = parser(this.ctx.headers['user-agent']);
    const ga = this.ctx.cookies.get('_ga');
    console.log(`ga:${ga} ua:${JSON.stringify(ua)}`);
    const imageBufferData = Buffer.alloc(1);
    await this.ctx.service.deeperEvents.save({
      ip: this.ctx.request.ip,
      ua: JSON.stringify(ua),
      ...query,
    });
    this.ctx.body = imageBufferData;
    this.ctx.response.type = 'image/png';
  }

  // Get Discout code by ranbom
  async c() {
    const { session_id, email } = this.ctx.request.query;
    const result = await this.service.deeperDiscountUsage.general(
      session_id,
      email,
      this.ctx.request.ip
    );
    this.ctx.body = result;
  }

  async cf() {
    const { session_id, email, code } = this.ctx.request.query;
    await this.service.deeperDiscountUsage.fill(
      session_id,
      this.ctx.request.ip,
      code,
      email
    );
    this.ctx.body = { success: 'ok' };
  }

  async ca() {
    const { session_id, email, code } = this.ctx.request.query;
    await this.service.deeperDiscountUsage.apply(
      session_id,
      this.ctx.request.ip,
      code,
      email
    );
    this.ctx.body = { success: 'ok' };
  }
}

module.exports = HomeController;
