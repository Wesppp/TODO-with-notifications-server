const Folder = require('../models/folder')
const User = require('../models/user')
const Task = require('../models/task')
const createError = require('http-errors')

function mapFolderItems(arr, field) {
  return arr.items.map(el => ({
      ...el[field]._doc
  }))
}

exports.create = async function (userId ,newFolder) {
  try {
    const user = await User.findById(userId)
    const repeatFolder = await Folder.find({title: newFolder.title})

    if (!repeatFolder.length) {
      const folder = new Folder({
        title: newFolder.title,
        tasks: {items: []}
      })
    
      await folder.save()
      await user.addFolder(folder)
    
      return folder
    } else {
      throw createError(400, "You can't create a folder with the same names")
    }
  } catch(err) {
    throw err
  }
}

exports.delete = async function(userId, folderId) {
  try {
    const user = await User.findById(userId)
    user.removeFolder(folderId)
  
    const folder = await Folder.findById(folderId)
    folder.tasks.items.forEach(t => {
      Task.findByIdAndRemove(t.taskId.toString(), function (err, res) {
        if (err) console.log(err)
      })
    })
  
    await Folder.deleteOne({_id: folderId})
  
    return folder
  } catch(err) {
    throw err
  }
}

exports.getFolderTasks = async function(folderId) {
  try {
    const folder = await Folder.findById(folderId)
      .populate('tasks.items.taskId')
    const tasks = mapFolderItems(folder.tasks, 'taskId')
    return tasks
  } catch(err) {
    throw err
  }
}

exports.update = async function(newFolderData) {
  try {
    const {_id} = newFolderData
    delete newFolderData
    await Folder.findByIdAndUpdate(_id, newFolderData)
    const folder = await Folder.findById(_id)
  
    return folder
  } catch(err) {
    throw err
  }
}