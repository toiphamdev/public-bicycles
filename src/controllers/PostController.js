const postService = require('../services/PostService');
const getAllPost = async (req, res) => {
  try {
    let data = await postService.getAllPostService(req.query);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getPost = async (req, res) => {
  try {
    let data = await postService.getPostService(req.query);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getHomePost = async (req, res) => {
  try {
    let data = await postService.getHomePostService();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getDetailPost = async (req, res) => {
  try {
    let data = await postService.getDetailPostService(req.query.id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (req, res) => {
  try {
    let data = await postService.createPostService(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const updatePost = async (req, res) => {
  try {
    let data = await postService.updatePostService(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  try {
    let data = await postService.deletePostService(req.query.id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllPost,
  getHomePost,
  getDetailPost,
  createPost,
  deletePost,
  updatePost,
  getPost,
};
