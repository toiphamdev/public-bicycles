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

const getBicycleByPlace = async (req, res) => {
  try {
    let data = await bicycleService.getBicycleByPlaceService(req.query);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getAllTypeBicycle = async (req, res) => {
  try {
    let data = await bicycleService.getAllTypeBicycleService();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const createTypeBicycle = async (req, res) => {
  try {
    let data = await bicycleService.createTypeCycleService(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const updateBicycle = async (req, res) => {
  try {
    let data = await bicycleService.updateBicycleService(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const deleteBicycle = async (req, res) => {
  try {
    let data = await bicycleService.deleteBicycleService(req.query);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getBicycleByName = async (req, res) => {
  try {
    let data = await bicycleService.getBicycleByNameService(req.query);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createBicycle,
  createTypeCycle,
  getBicycleByPlaceId,
  getAllTypeBicycle,
  createTypeBicycle,
  updateBicycle,
  deleteBicycle,
  getBicycleByPlace,
  getBicycleByName,
};
