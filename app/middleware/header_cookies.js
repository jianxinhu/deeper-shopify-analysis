'use strict';
module.exports = () => {
  return async function(ctx, next) {
    // try {

    const cookie = ctx.headers.cookie;
    const str = cookie.split('; ');
    const result = {};
    for (const i in str) {
      const cur = str[i].split('=');
      result[cur[0]] = cur[1];
    }

    ctx.headerCookes = result;
    console.log(`header cookie:${JSON.stringify(result)}`);
    await next();
  };
};
