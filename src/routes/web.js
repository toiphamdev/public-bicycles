const express = require('express');
const userController = require('../controllers/UserController');
const { accessMidleware } = require('../middleware/JWTMidleware');
const allcodeController = require('../controllers/AllcodeController');
const placeController = require('../controllers/PlaceController');
const postController = require('../controllers/PostController');
const bicycleController = require('../controllers/BicycleController');

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

  //allcode
  router.get('/api/get-allcode', allcodeController.getAllcode);
  router.get('/', (req, res) => {
    res.send('Toouir gì làm khó a!');
  });

  //post

  router.get('/api/get-home-post', postController.getHomePostService);
  router.get('/api/get-detail-post', postController.getDetailPostService);
  router.get('/api/get-all-post', postController.getAllPostService);

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
  router.post('/api/create-type-bicycle', bicycleController.createTypeCycle);
  router.get(
    '/api/get-bicycle-by-place',
    bicycleController.getBicycleByPlaceId
  );
  app.use('/', router);
};
module.exports = initWebRoutes;
