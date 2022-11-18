const placeService = require('../services/PlaceService');
const getAllPlace = async (req, res) => {
  try {
    let data = await placeService.getAllPlaceService();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getDetailPlaceById = async (req, res) => {
  try {
    let data = await placeService.getDetailPlaceService(req.query.id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getPlaceByProvinceId = async (req, res) => {
  try {
    let data = await placeService.getPlaceByProvinceIdService(req.query);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getPlaceSelected = async (req, res) => {
  try {
    let data = await placeService.getPlaceSelectedService(req.query);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const updatePlace = async (req, res) => {
  try {
    let data = await placeService.updatePlaceService(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllPlace,
  getDetailPlaceById,
  getPlaceByProvinceId,
  getPlaceSelected,
  updatePlace,
};
