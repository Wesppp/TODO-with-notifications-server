const express = require('express');
const jsonParser = express.json();
const asyncHandler = require("express-async-handler");
const { parseAccessToken } = require('../middleware/parseAccessToken')
const userController = require('../controllers/user-controller')
const folderController = require('../controllers/folder-controller')

const router = express.Router()

router.route("/users/folders/:id").get(jsonParser, asyncHandler(userController.getUserFolders));
router.route("/folders/tasks/:id").get(jsonParser, asyncHandler(folderController.getFolderTasks));
router.route("/folders").post(parseAccessToken, jsonParser, asyncHandler(folderController.create));
router.route("/folders").put(jsonParser, asyncHandler(folderController.update));
router.route("/folders/:id").delete(parseAccessToken, asyncHandler(folderController.delete));

module.exports = router