const Folder = require('../models/folder')
const Task = require('../models/task')

exports.create = async function (folderId, newTask, user) {
  try {
    const { date, description } = newTask
    
    const folder = await Folder.findById(folderId)
    const task = new Task({
      description: description,
      date: date,
      status: 'todo',
      authorId: user._id,
      email: user.email 
    })
    
    await task.save()
    await folder.addTask(task)
    return task

  } catch(err) {
    throw err
  }
}

exports.delete = async function(folderId, taskId) {
  const folder = await Folder.findById(folderId)
  folder.removeTask(taskId)

  const task = await Task.findById(taskId)
  await Task.deleteOne({_id: taskId})

  return task
}

exports.update = async function(newTaskData) {
  const {_id} = newTaskData
  delete newTaskData
  await Task.findByIdAndUpdate(_id, newTaskData)
  const task = await Task.findById(_id)

  return task
}