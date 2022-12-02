const db = require('../models');
const createBicycleService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.type || !data.placeId) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      } else {
        let res = await db.Bicycle.create({
          ...data,
          isLocked: false,
          isRentting: false,
        });
        if (res) {
          resolve({
            errCode: 0,
            errMessage: 'create bicycle success',
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: 'create bicycle failed',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const createTypeCycleService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.image || !data.price) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      } else {
        let res = db.TypeCycle.create({
          ...data,
        });
        if (res) {
          resolve({
            errCode: 0,
            errMessage: 'Create type cycle success',
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: 'Create type cycle failed',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getBicycleByPlaceIdService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.placeId || !data.page || !data.size) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      } else {
        const page = +data.page;
        const size = +data.size;
        let res = await db.Bicycle.findAndCountAll({
          where: {
            placeId: data.placeId,
            isRentting: false,
          },
          limit: size,
          offset: (page - 1) * size,
          include: [
            {
              model: db.TypeCycle,
              as: 'typeData',
            },
          ],
          raw: false,
          nest: true,
        });
        if (res && res.rows.length > 0) {
          res.rows.map((item) => {
            if (item.typeData.image) {
              item.typeData.image = Buffer.from(
                item.typeData.image,
                'base64'
              ).toString('binary');
            }
            return item;
          });
        }
        if (res) {
          resolve({
            errCode: 0,
            errMessage: 'get bicycle success',
            data: res,
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: 'get  bicycle failed',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createBicycleService,
  createTypeCycleService,
  getBicycleByPlaceIdService,
};
