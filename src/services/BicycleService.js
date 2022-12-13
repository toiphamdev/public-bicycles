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
        let res = await db.TypeCycle.create({
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

const getAllTypeBicycleService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.TypeCycle.findAll({
        attribute: ['image', 'id', 'name'],
      });
      if (res && res.length > 0) {
        res.map((item) => {
          if (item.image) {
            item.image = Buffer.from(item.image, 'base64').toString('binary');
          }
          return item;
        });
      }
      if (res) {
        resolve({
          errCode: 0,
          errMessage: 'success',
          data: res,
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: 'failed',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateBicycleService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      } else {
        let res = await db.Bicycle.update(
          {
            ...data,
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
            errMessage: 'update failed',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteBicycleService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      } else {
        let res = await db.Bicycle.destroy({
          where: {
            id: data.id,
          },
        });
        if (res) {
          resolve({
            errCode: 0,
            errMessage: 'delete success',
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: 'delete failed',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getBicycleByPlaceService = (data) => {
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

const getBicycleByNameService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters!',
        });
      } else {
        let res = await db.Bicycle.findOne({
          where: {
            name: data.name,
          },
          include: [
            {
              model: db.TypeCycle,
              as: 'typeData',
            },
          ],
          raw: false,
          nest: true,
        });
        if (res) {
          res.typeData.image = Buffer.from(
            res.typeData.image,
            'base64'
          ).toString('binary');
          resolve({
            errCode: 0,
            errMessage: 'success',
            data: res,
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: 'failed',
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
  getAllTypeBicycleService,
  createTypeCycleService,
  updateBicycleService,
  deleteBicycleService,
  getBicycleByPlaceService,
  getBicycleByNameService,
};
