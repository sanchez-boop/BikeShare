require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to db'))

app.use(express.json())

app.use(express.urlencoded({extended: false}));
app.use(express.static('build'));
if (process.env.NODE_ENV === "production"){
  app.get('/', (req, res) => {
    res.send('Hello World');
  });
}

const announcmentsRouter = require('./routes/announcementsRoute')
app.use('/announcements',announcmentsRouter)
const bikesRouter = require('./routes/bikesRoute')
app.use('/bikes',bikesRouter)
const repairsRouter = require('./routes/repairsRoute')
app.use('/repairs',repairsRouter)
const usersRouter = require('./routes/usersRoute')
app.use('/users',usersRouter)

app.listen(process.env.PORT|| port, () => console.log('Server Started'))