const db = require('../models');

const getAllPlaceService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Place.findAll({
        attribute: ['src', 'id'],
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
          errMessage: 'get place success!',
          data: data,
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: 'get place failed!',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getDetailPlaceService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter!',
        });
      } else {
        let res = db.Place.findOne({
          where: {
            id: id,
          },
        });
        if (res) {
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

module.exports = {
  getAllPlaceService,
  getDetailPlaceService,
};
