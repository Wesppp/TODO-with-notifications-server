const {Schema, model} = require('mongoose')

const folder = new Schema({
    title: {
        type: String,
        required: true
    },
    tasks: {
      items: [
        {
          taskId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Task'
          }
        }
      ]
    }
})

folder.methods.addTask = function(task) {
  const items = [...this.tasks.items]
  items.push({
    taskId: task._id
  })

  this.tasks = {items}
  return this.save()
}

folder.methods.removeTask = function(id) {
  let items = [...this.tasks.items]
  const idx = items.findIndex(p => p.taskId.toString() === id.toString())

  if (items[idx]) {
      items = items.filter(p => p.taskId.toString() !== id.toString())
  }

  this.tasks = {items}
  return this.save()
}

module.exports = model('Folder', folder)