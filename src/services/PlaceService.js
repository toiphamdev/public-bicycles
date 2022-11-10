const db = require('../models');

const getAllPlaceService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Place.findAll();
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

module.exports = {
  getAllPlaceService,
};
