const orderService = require('../services/OrderService');
const createOrder = async (req, res) => {
  try {
    let data = await orderService.createOrderService(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = async (req, res) => {
  try {
    let data = await orderService.updateOrderService(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getOrder = async (req, res) => {
  try {
    let data = await orderService.getOrderByUserService(req.query);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getOrderPrice = async (req, res) => {
  try {
    let data = await orderService.getOrderPriceByUserService(req.query);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createOrder,
  getOrderPrice,
  getOrder,
  updateOrder,
};
