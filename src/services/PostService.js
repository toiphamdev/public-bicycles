const db = require('../models');
const _ = require('lodash');

const getHomePostService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Post.findAll({
        attributes: ['src', 'id'],
        limit: 8,
      });
      if (data && data.length > 0) {
        data.map((item) => {
          item.src = Buffer.from(item.src, 'base64').toString('binary');
          return item;
        });
      }
      if (data) {
        resolve({
          errCode: 0,
          errMessage: 'get post success!',
          data: data,
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: 'get post failed!',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getDetailPostService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter!',
        });
      } else {
        let res = await db.Post.findOne({
          where: {
            id: id,
          },
        });
        if (!_.isEmpty(res)) {
          resolve({
            errCode: 0,
            errMessage: 'Success!',
            data: res,
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: 'Failled',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllPostService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.page || !data.size) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter!',
        });
      } else {
        const page = +data.page;
        const size = +data.size;
        let res = await db.Post.findAndCountAll({
          attributes: ['src', 'id', 'altText', 'caption'],
          limit: size,
          offset: (page - 1) * size,
          nest: true,
          raw: false,
        });
        if (res && res.rows.length > 0) {
          res.rows.map((item) => {
            item.src = Buffer.from(item.src, 'base64').toString('binary');
            return item;
          });
        }
        if (res) {
          resolve({
            errCode: 0,
            errMessage: 'get place success!',
            data: res,
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: 'get place failed!',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllPostService,
  getHomePostService,
  getDetailPostService,
};
