const Task = require('../models/task')
const Mail = require('../services/mail')
const { getDaysBetweenDates } = require('../helpers/getDaysBetweenDates')

exports.sendNotifications = async function(req, res, next) {
  const user = req.user
  const lastVisitDate = req.user.lastVisitDate.toLocaleDateString("en-US")
  const currentDate = (new Date()).toLocaleDateString("en-US")
  const tasks = await Task.find({authorId: user._id})

  if (lastVisitDate !== currentDate && tasks.length && user.isNotifications) { 
    let message = '';
    let grid = '';
    tasks.forEach(task => {
      let markup = `
        <div 
          style="text-align: center; background: aliceblue; padding: 0.8rem; border-radius: 25px; word-break: break-all;">
          <h5>${task.description}</h5>
          <p>${getDaysBetweenDates(currentDate, task.date) + ' days before the deadline' || 'The deadline has expired!'}</p>
        </div>
      `
      grid += markup
    });
    message = `
    <div 
      style="display: grid; grid-template-columns: 1fr 1fr 1fr; grid-template-rows: 1fr 1fr; margin-bottom: 15px; grid-gap: 1rem;">
      ${grid}
    </div>
    `

    await Mail.send(user.email, 'Notification', 'Tasks', 
    `
      <h3 style="text-align: center;">About task deadlines</h3>
      ${message}
    `)

    user.updateLastVisitDate(currentDate)
  }

  next();
}