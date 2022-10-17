const express = require('express');
const jsonParser = express.json();
const asyncHandler = require("express-async-handler");
const authController = require('../controllers/auth-controller')

const router = express.Router()

router.route("/auth/mail-confirmation/:token").get(jsonParser, asyncHandler(authController.confirmation));
router.route("/auth/refresh-token").post(jsonParser, asyncHandler(authController.refreshTokens));

module.exports = router