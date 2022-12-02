const bicycleService = require('../services/BicycleService');

const createBicycle = async (req, res) => {
  try {
    let data = await bicycleService.createBicycleService(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const createTypeCycle = async (req, res) => {
  try {
    let data = await bicycleService.createTypeCycleService(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getBicycleByPlaceId = async (req, res) => {
  try {
    let data = await bicycleService.getBicycleByPlaceIdService(req.query);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createBicycle,
  createTypeCycle,
  getBicycleByPlaceId,
};
