const folderService = require('../services/folder-service')

exports.create = async function(req, res) {  
  try {
    const folder = await folderService.create(req.user._id, req.body)
    res.send(folder)
  } catch(err) {
    throw err
  }
}

exports.delete = async function(req, res) {  
  try {
    const folder = await folderService.delete(req.user._id, req.params.id)
    res.send(folder)
  } catch(err) {
    throw err
  }
}

exports.getFolderTasks = async function(req, res) {
  try {
    const tasks = await folderService.getFolderTasks(req.params.id)
    res.send(tasks)
  } catch(err) {
    throw err
  }
}

exports.update = async function(req, res) {
  try {
    const folder = await folderService.update(req.body)
    res.send(folder)
  } catch(err) {
    throw err
  }
}