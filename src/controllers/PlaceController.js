const placeService = require('../services/PlaceService');
const getAllPlace = async (req, res) => {
  try {
    let data = await placeService.getAllPlaceService({
      attribute: ['id', 'src'],
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllPlace,
};
