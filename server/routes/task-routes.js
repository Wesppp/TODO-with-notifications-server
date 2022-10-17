const express = require('express');
const jsonParser = express.json();
const asyncHandler = require("express-async-handler");
const { parseAccessToken } = require('../middleware/parseAccessToken')
const taskController = require('../controllers/task-controller')

const router = express.Router()

router.route("/tasks/:folderId").post(parseAccessToken, jsonParser, asyncHandler(taskController.create));
router.route("/tasks").put(jsonParser, asyncHandler(taskController.update));
router.route("/tasks/:folderId/:taskId").delete(parseAccessToken, asyncHandler(taskController.delete));

module.exports = router