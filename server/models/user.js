const {Schema, model} = require('mongoose')

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
    },
    lastVisitDate: {
        type: Date,
        required: true
    },
    isNotifications: {
        type: Boolean,
        required: true
    },
    folders: {
        items: [
            {
                folderId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'Folder'
                }
            }
        ]
    }
})

user.methods.addFolder = function(folder) {
    const items = [...this.folders.items]
    items.push({
        folderId: folder._id
    })

    this.folders = {items}
    return this.save()
}

user.methods.removeFolder = function(id) {
    let items = [...this.folders.items]
    const idx = items.findIndex(p => p.folderId.toString() === id.toString())

    if (items[idx]) {
        items = items.filter(p => p.folderId.toString() !== id.toString())
    }

    this.folders = {items}
    return this.save()
}

user.methods.updateLastVisitDate = function(date) {
    this.lastVisitDate = date
    return this.save()
}

user.methods.updateIsNotification = function(isNotification) {
    this.isNotifications = isNotification
    return this.save()
}

module.exports = model('User', user)