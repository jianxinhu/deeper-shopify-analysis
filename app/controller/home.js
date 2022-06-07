'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async d() {
    console.log('GET!');
    const imageBufferData = Buffer.alloc(1);
    this.ctx.body = imageBufferData;
    this.ctx.response.type = 'image/png';
  }
}

module.exports = HomeController;
