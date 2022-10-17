require('dotenv').config({path: __dirname + '/.env'});
const { DB_PASSWORD, PORT } = process.env
const express = require("express");
const app = express();
const session = require('express-session')
const mongoose = require('mongoose')
const cors = require('cors')

const { parseAccessToken } = require('./middleware/parseAccessToken')
const { handleErrors } = require('./middleware/errorHandler')
const { sendNotifications } = require('./middleware/sendNotifications')
const { sessionConfig } = require('./config/session')

const authRouter = require('./routes/auth-route')
const userRouter = require('./routes/user-routes')
const folderRouter = require('./routes/folder-routes')
const taskRouter = require('./routes/task-routes')

app.set('trust proxy', 1)
app.use(session(sessionConfig))

app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', folderRouter)
app.use('/api', taskRouter)

app.use(parseAccessToken, sendNotifications)

app.use(handleErrors) 

async function start() {
  try {
    await mongoose.connect(`mongodb+srv://Misha:${DB_PASSWORD}@cluster0.8cynq.mongodb.net/notification-sender`, {
      useNewUrlParser: true
    }) 

    app.use(cors())
    const server = app.listen(PORT, (error) => {
      if (error) return console.log(`Error: ${error}`);
      console.log(`Server listening on port ${server.address().port}`);
    });

  } catch(e) {
    console.log(e)
  }
}

start()