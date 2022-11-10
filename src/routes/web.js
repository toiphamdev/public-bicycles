const express = require('express');
const userController = require('../controllers/UserController');
const { accessMidleware } = require('../middleware/JWTMidleware');
const allcodeController = require('../controllers/AllcodeController');
const placeController = require('../controllers/PlaceController');

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

  //place
  router.get('/api/get-all-place', placeController.getAllPlace);
  router.get('/api/get-detail-place', placeController.getDetailPlaceById);
  router.get(
    '/api/get-place-by-province',
    placeController.getPlaceByProvinceId
  );

  app.use('/', router);
};
module.exports = initWebRoutes;
