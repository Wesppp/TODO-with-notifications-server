const taskService = require('../services/task-service')

exports.create = async function(req, res) {  
  try {
    const task = await taskService.create(req.params.folderId, req.body, req.user)
    res.send(task)
  } catch(e) {
    res.send(e)
  }
}

exports.delete = async function(req, res) {  
  try {
    const task = await taskService.delete(req.params.folderId, req.params.taskId)
    res.send(task)
  } catch(e) {
    res.send(e)
  }
}

exports.update = async function(req, res) {
  try {
    const task = await taskService.update(req.body)
    res.send(task)
  } catch(e) {
    res.send(e)
  }
}