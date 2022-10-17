const express = require('express');
const jsonParser = express.json();
const asyncHandler = require("express-async-handler");
const { parseAccessToken } = require('../middleware/parseAccessToken')
const userController = require('../controllers/user-controller')
const authController = require('../controllers/auth-controller')

const router = express.Router()

router.route("/users/login").post(jsonParser, asyncHandler(authController.login))
router.route("/users/logout").post(jsonParser, asyncHandler(authController.logout))
router.route("/users/registration").post(jsonParser, asyncHandler(authController.registration))
router.route("/users/notification-settings").put(parseAccessToken, jsonParser, asyncHandler(userController.changeNotificationsSettings))

module.exports = router