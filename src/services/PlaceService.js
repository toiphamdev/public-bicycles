const db = require('../models');
const _ = require('lodash');
const genarate = require('../utils/genarateOTP');

const getAllPlaceService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Place.findAll({
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
        let res = await db.Place.findOne({
          where: {
            id: id,
          },
        });
        if (res && res.src) {
          res.src = Buffer.from(res.src, 'base64').toString('binary');
        }
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

const getPlaceByProvinceIdService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.page || !data.size || !data.provinceId) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter!',
        });
      } else {
        const page = +data.page;
        const size = +data.size;
        if (data.provinceId === 'ALL') {
          let res = await db.Place.findAndCountAll({
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
        } else {
          let res = await db.Place.findAndCountAll({
            attributes: ['src', 'id', 'altText', 'caption'],
            where: {
              provinceId: data.provinceId,
            },
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
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getPlaceSelectedService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.provinceId) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter!',
        });
      } else {
        let res = await db.Place.findAll({
          attributes: ['id', 'altText'],
          where: {
            provinceId: data.provinceId,
          },
        });
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

const updatePlaceService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.descriptionMarkdown ||
        !data.descriptionHTML ||
        !data.altText
      ) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      } else {
        let res = await db.Place.update(
          {
            descriptionHTML: data.descriptionHTML,
            descriptionMarkdown: data.descriptionMarkdown,
            altText: data.altText,
            caption: data.caption,
            src: data.src,
          },
          {
            where: {
              id: data.id,
            },
          }
        );
        if (res) {
          resolve({
            errCode: 0,
            errMessage: 'update success',
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: 'Update failed',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const createPlaceService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.provinceId ||
        !data.descriptionMarkdown ||
        !data.descriptionHTML ||
        !data.altText
      ) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      } else {
        let keywords = genarate.generateKeywords(data.altText);
        let res = await db.Place.create({
          provinceId: data.provinceId,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
          altText: data.altText,
          src: data.src,
          caption: data.caption,
          keywords: keywords,
        });
        if (res) {
          resolve({
            errCode: 0,
            errMessage: 'Create success',
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: 'Create failed',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deletePlaceService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      } else {
        let res = db.Place.destroy({
          where: {
            id: id,
          },
        });
        if (res) {
          resolve({
            errCode: 0,
            errMessage: 'Delete place success!',
          });
        } else {
          resolve({
            errCode: 0,
            errMessage: 'Delete place failed!',
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
  getPlaceByProvinceIdService,
  getPlaceSelectedService,
  updatePlaceService,
  createPlaceService,
  deletePlaceService,
};
