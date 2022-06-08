'use strict';
const _ = require('lodash');
const {
  Service,
} = require('egg');
class BaseServices extends Service {
  constructor(ctx, opts) {
    super(ctx);
    const {
      modelKey,
      defaultAdatper,
      isSoftDelete = false,
      ...options
    } = opts;

    this.isSoftDelete = isSoftDelete;

    // 把 options 绑定到 this
    Object.assign(this, options);

    if (modelKey) {
      this.model = ctx.model[modelKey];
    }
    this.__adatper = defaultAdatper;
    this.__query = this.model.find();
    this.defaulutSortedKey = '-createdAt';
    this.defaultOrderMapping = {
      createdAt: 'createdAt',
      '-createdAt': '-createdAt',
    };
  }

  defaultOrderMapper(orderMapper = {}) {
    this.defaultOrderMapping = Object.assign(this.defaultOrderMapping, orderMapper);
  }
  defaultQuery({
    startAt,
    endAt,
    select,
    ...where
  }) {
    const createdAtRange = {
      $lte: Number.isInteger(Number(endAt)) ? (new Date(endAt * 1000)) : new Date(),
      $gte: Number.isInteger(Number(startAt)) ? (new Date(startAt * 1000)) : 0,
    };
    const __where = _.pickBy(where, v => (v && Boolean(v !== '')));
    _.set(__where, 'createdAt', createdAtRange);
    this.__query = this.__query.find(Object.assign(
      __where,
      this.isSoftDelete ? {
        _deleteAt: {
          $eq: 0,
        },
      } : {}
    ));

    if (select) {
      this.__query = this.__query.select(select);
    }


    return this.__query;
  }

  sortBy(key) {
    this.__query.sort(this.defaultOrderMapping[key] || this.defaultOrderMapping[this.defaulutSortedKey]);
  }

  async findOne(where = {}, options = {}) {
    const {
      sortKey,
      include,
      adatper,
      raw = false,
      ...opts
    } = options;

    this.defaultQuery(where, opts);
    this.sortBy(sortKey);
    let r = await this.__query.findOne().exec();

    if (include) {
      r = await this.model.populate(r, include);
    }

    const schemaAdatper = adatper || this.__adatper;
    if ((!raw) && schemaAdatper) {
      r = schemaAdatper(r);
    }

    return r;
  }


  // 查询所在记录
  async findAll(where = {}, options = {}) {
    const {
      page,
      limit,
      sortKey,
      adatper,
      include,
    } = options;

    this.defaultQuery(where);
    this.sortBy(sortKey);
    let results;
    if ((typeof page) !== 'undefined' && (typeof limit) !== 'undefined') {
      const skip = (page - 1) * limit;
      const count = await this.__query.count();
      this.__query.skip(Number(skip));
      this.__query.limit(Number(limit));
      let data = await this.__query.find().exec();

      if (include) {
        data = await this.model.populate(data, include);
      }

      const schemaAdatper = this.__adatper || adatper;
      if (schemaAdatper) {
        data = data.map(schemaAdatper);
      }

      results = {
        count,
        data: data || [],
        page_index: Number(page),
        page_size: Number(limit),
        pages: Math.ceil(count / limit),
      };
    } else {
      results = await this.__query.exec();
      if (include) {
        results = await this.model.populate(results, include);
      }

      const schemaAdatper = this.__adatper || adatper;
      if (schemaAdatper) {
        results = results.map(schemaAdatper);
      }
    }
    return results;
  }


  async get(_id, opts = {}) {
    const {
      adatper = this.__adatper,
      include,
      raw = false,
      ...options
    } = opts;

    let result = await this.defaultQuery({}, options).findOne({
      _id,
    });

    if (include) {
      result = await this.model.populate(result, include);
    }

    const schemaAdatper = adatper;
    if ((!raw) && schemaAdatper && result) {
      result = schemaAdatper(result);
    }
    return result;
  }

  //   保存
  async save(params) {
    const {
      objectId,
      ...data
    } = params;
    const {
      model,
    } = this;
    let doc = new model();

    if (objectId) {
      doc = await model.findOne({
        _id: objectId,
      });

      if (!doc) {
        throw new Error('object not found');
      }
    }

    Object.entries(data).map(([ key, value ]) => ((value !== null && value !== 'undefined' && value !== undefined) && (doc.set(key, value))));
    doc = await doc.save();
    return doc;
  }

  findOneAndUpdate(conditions, update, options = {}) {
    return this.model.findOneAndUpdate(conditions, update, options);
  }

  // 删除
  async remove(_id) {
    const {
      model,
    } = this;

    let result;
    if (this.isSoftDelete) {
      result = await model.update({
        _id,
      }, {
        _deleteAt: (new Date()).getTime(),
      });
    } else {
      result = await model.remove({
        _id,
      });
    }
    return result;
  }

}

module.exports = BaseServices;
