require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to db'))


app.use(express.json())
const announcmentsRouter = require('./routes/announcementsRoute')
app.use('/announcements',announcmentsRouter)
const bikesRouter = require('./routes/bikesRoute')
app.use('/bikes',bikesRouter)
const repairsRouter = require('./routes/repairsRoute')
app.use('/repairs',repairsRouter)
const usersRouter = require('./routes/usersRoute')
app.use('/users',usersRouter)

app.listen(4000, () => console.log('Server Started'))