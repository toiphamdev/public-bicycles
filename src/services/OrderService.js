const db = require('../models');

const createOrderService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.bicycleId || !data.userEmail) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter',
        });
      } else {
        let time = new Date().getTime();
        let order = await db.Order.create({
          bicycleId: data.bicycleId,
          userEmail: data.userEmail,
          isPay: false,
          time: time,
        });
        let bicycle = await db.Bicycle.update(
          {
            isRentting: true,
            isLocked: false,
          },
          {
            where: {
              id: data.bicycleId,
            },
          }
        );
        let notify = await db.Notification.create({
          title: 'Thuê xe thành công',
          description: 'Cảm ơn quý khách đã sử dụng dịch vụ của app.',
          type: 'ONE',
          userEmail: data.userEmail,
          read: false,
        });
        if (order && bicycle) {
          resolve({
            errCode: 0,
            errMessage: 'create order success',
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: 'create order failed',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateOrderService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.bicycleId || !data.id) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameter',
        });
      } else {
        let time = new Date().getTime();
        let order = await db.Order.update(
          {
            isPay: true,
            time: time,
            price: data.price,
          },
          {
            where: {
              id: data.id,
            },
          }
        );
        let bicycle = await db.Bicycle.update(
          {
            isRentting: false,
          },
          {
            where: {
              id: data.bicycleId,
            },
          }
        );
        let notify = await db.Notification.create({
          title: 'Trả xe thành công',
          description: 'Cảm ơn quý khách đã sử dụng dịch vụ của app.',
          type: 'ONE',
          userEmail: data.userEmail,
          read: false,
        });
        if (order && bicycle) {
          resolve({
            errCode: 0,
            errMessage: 'update order success',
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

const getOrderPriceByUserService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.userEmail) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      } else {
        let res = await db.Order.findAll({
          limit: 8,
          order: ['createdAt'],
          where: {
            userEmail: data.userEmail,
            isPay: true,
          },
        });
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
            data: res,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getOrderByUserService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.userEmail) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      } else {
        let res = await db.Order.findAll({
          where: {
            userEmail: data.userEmail,
            isPay: false,
          },
          include: [{ model: db.Bicycle, as: 'bicycleData' }],
          raw: false,
          nest: true,
        });
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
            data: res,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createOrderService,
  getOrderByUserService,
  getOrderPriceByUserService,
  updateOrderService,
};
