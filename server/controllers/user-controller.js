const userService = require('../services/user-service')

exports.getUserFolders = async function(req, res) {
  try {
    const folders = await userService.getUserFolders(req.params.id)
    res.send(folders)
  } catch (err) {
    throw err
  }
}

exports.changeNotificationsSettings = async function(req, res) {
  try {
    await userService.changeNotificationsSettings(req.body, req.user)
  } catch (err) {
    throw err
  }
}