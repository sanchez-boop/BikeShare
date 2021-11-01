const path = require('path');           
const PORT = process.env.PORT || 5000; 
const express = require('express');
require('dotenv').config();

const URI = "mongodb+srv://:BikeNGold:<COP4331C>@bikengold.mnuxx.mongodb.net/BikeNGold?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient; 
client.connect();

app.set('port', (process.env.PORT || 5000));
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}
app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});
app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});