const express = require('express');
const userController = require('../controllers/UserController');
const { accessMidleware } = require('../middleware/JWTMidleware');
const allcodeController = require('../controllers/AllcodeController');
const placeController = require('../controllers/PlaceController');
const postController = require('../controllers/PostController');
const bicycleController = require('../controllers/BicycleController');
const orderController = require('../controllers/OrderController');

const router = express.Router();
let initWebRoutes = (app) => {
  router.post('/api/create-new-user', userController.createNewUser);
  router.post('/api/login', userController.handleUserLogin);
  router.post('/api/logout', userController.handleUserLogout);
  router.post(
    '/api/update-user-info',
    accessMidleware,
    userController.updateUserInfo
  );

  router.post('/api/send-otp', userController.sendMailOTP);
  router.post('/api/login-with-otp', userController.loginWithOTP);
  router.get('/api/get-notify', userController.getNotify);
  router.put('/api/update-notify', userController.updateNotify);

  //allcode
  router.get('/api/get-allcode', allcodeController.getAllcode);
  router.get('/', (req, res) => {
    res.send('Toouir gì làm khó a!');
  });

  //post

  router.get('/api/get-home-post', postController.getHomePost);
  router.get('/api/get-detail-post', postController.getDetailPost);
  router.get('/api/get-all-post', postController.getAllPost);
  router.get('/api/get-post', postController.getPost);
  router.put('/api/update-post-by-id', postController.updatePost);
  router.post('/api/create-post', postController.createPost);
  router.delete('/api/delete-post', postController.deletePost);

  //place
  router.get('/api/get-all-place', placeController.getAllPlace);
  router.get('/api/get-detail-place', placeController.getDetailPlaceById);
  router.get(
    '/api/get-place-by-province',
    placeController.getPlaceByProvinceId
  );
  router.get('/api/get-place-selected', placeController.getPlaceSelected);
  router.put('/api/update-place-by-id', placeController.updatePlace);
  router.post('/api/create-place', placeController.createPlace);
  router.delete('/api/delete-place', placeController.deletePlace);

  //bicycles
  router.post('/api/create-bicycle', bicycleController.createBicycle);
  router.put('/api/update-bicycle', bicycleController.updateBicycle);
  router.post('/api/create-type-bicycle', bicycleController.createTypeCycle);
  router.get(
    '/api/get-bicycle-by-place',
    bicycleController.getBicycleByPlaceId
  );
  router.get(
    '/api/get-bicycle-by-place-admin',
    bicycleController.getBicycleByPlace
  );
  router.get('/api/get-bicycle-by-name', bicycleController.getBicycleByName);
  app.use('/', router);
  router.get('/api/get-all-type-bicycle', bicycleController.getAllTypeBicycle);
  router.post('/api/create-type', bicycleController.createTypeBicycle);
  router.delete('/api/delete-bicycle', bicycleController.deleteBicycle);
  //order
  router.post('/api/create-order', orderController.createOrder);
  router.post('/api/update-order', orderController.updateOrder);
  router.get('/api/get-order-price', orderController.getOrderPrice);
  router.get('/api/get-order', orderController.getOrder);
};
module.exports = initWebRoutes;
