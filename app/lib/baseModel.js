'use strict';
const moment = require('moment');
const createSchema = ({
  mongoose,
}, {
  modelName,
  props,
  index,
  pre_save,
  method,
  virtual,
  options = {},
}) => {
  const baseModel = new mongoose.Schema(Object.assign(props, {
    _deleteAt: {
      type: Number,
      default: 0,
    },
  }), Object.assign({
    collection: modelName, // 默认使用 modelName 作为 collection 名
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }, options));

  if (pre_save) {
    baseModel.pre('save', pre_save);
  }

  if (method) {
    Object.keys(method).forEach(k => {
      baseModel.method(k, method[k]);
    });
  }


  if (index) {
    Object.keys(index).forEach(k => {
      baseModel.path(k).index(index[k]);
    });
  }

  if (virtual) {
    Object.keys(virtual).forEach(k => {
      baseModel.virtual(k, virtual[k]);
    });
  }


  baseModel.set('toJSON', {
    getters: true,
    virtuals: true,
    transform: (doc, obj) => {
      obj.objectId = obj._id;
      delete obj._deleteAt;
      delete obj.__v;
      delete obj._id;
      delete obj.id;
      obj.createdAt = moment(obj.createdAt).format('YYYY-MM-DD HH:mm');
      obj.updatedAt = moment(obj.updatedAt).format('YYYY-MM-DD HH:mm');
      return obj;
    },
  });
  return mongoose.model(modelName, baseModel);
};

module.exports = createSchema;
