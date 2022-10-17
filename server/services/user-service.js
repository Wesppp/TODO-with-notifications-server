const User = require('../models/user')

function mapUserItems(arr, field) {
  return arr.items.map(el => ({
      ...el[field]._doc
  }))
}

exports.getUserFolders = async function (userId) {
  try {
    const user = await User.findById(userId)
      .populate('folders.items.folderId')
    const folders = mapUserItems(user.folders, 'folderId')
    return folders
  } catch(err) {
    console.log(err);
    throw err
  }
}

exports.changeNotificationsSettings = async function (isNotifications, user) {
  try {
    const { isNotifications: value } = isNotifications;
    user.updateIsNotification(value)
  } catch(err) {
    throw err
  }
}