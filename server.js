require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3500;
const bodyParser = require('body-parser');
const path = require('path');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true})
.then((result) => console.log('connected to db'))
.catch((err) => console.log('error is' + err));
app.use(cors());
app.use(bodyParser.json());
{
  // Set static folder
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}
app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});