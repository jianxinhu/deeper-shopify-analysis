'use strict';

const Controller = require('egg').Controller;

const parser = require('ua-parser-js');
const libQQwry = require('lib-qqwry');
const qqwry = libQQwry.init();
qqwry.speed();

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async d() {
    const {
      query,
    } = this.ctx.request;

    console.log(`header:${JSON.stringify(this.ctx.headers)}`);
    const ua = parser(this.ctx.headers['user-agent']);
    // const { ip } = qqwry.searchIP(this.ctx.request.ip);

    console.log(`ip:${JSON.stringify(this.ctx.request.ip)}`);
    console.log(`ua:${JSON.stringify(ua)}`);

    // console.log('GET!');
    const imageBufferData = Buffer.alloc(1);
    await this.ctx.service.deeperEvents.save({
      ip: '',
      ua: JSON.stringify(ua),
      ...query,
    });
    this.ctx.body = imageBufferData;
    this.ctx.response.type = 'image/png';
  }
}

module.exports = HomeController;
