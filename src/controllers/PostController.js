const postService = require('../services/PostService');
const getAllPostService = async (req, res) => {
  try {
    let data = await postService.getAllPostService(req.query);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getHomePostService = async (req, res) => {
  try {
    let data = await postService.getHomePostService();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getDetailPostService = async (req, res) => {
  try {
    let data = await postService.getDetailPostService(req.query.id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllPostService,
  getHomePostService,
  getDetailPostService,
};
