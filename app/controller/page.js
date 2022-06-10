'use strict';

const Controller = require('egg').Controller;
const fs = require("fs")
const path = require('path')

class PageController extends Controller {
  async react() {
    console.log('react')
    const { ctx } = this;
    await ctx.render('index');
  }

}

module.exports = PageController;
